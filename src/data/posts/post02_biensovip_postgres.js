export const post02 = {
  id: 2,
  slug: "biensovip-postgresql-vs-mongodb-multi-filter",
  date: "2026-08-14",
  tags: [".NET 8", "PostgreSQL", "Clean Architecture", "Indexing", "System Design"],
  readTime: "11 min read",

  titleVi: "Vì Sao Tôi Chọn PostgreSQL Thay Vì MongoDB Cho Bài Toán Lọc Biển Số Phức Tạp Ở Biensovip?",
  excerptVi: "Phân tích kiến trúc cơ sở dữ liệu thực tế tại Biensovip: cách kết hợp Composite B-Tree và extension pg_trgm giúp tối ưu hóa hàng chục điều kiện lọc biển số đẹp từ 350ms xuống dưới 8ms, kèm minh họa trực quan từ hệ thống thật.",
  contentVi: `## Bối Cảnh Thực Tế Tại Sàn Giao Dịch Biensovip

Khi bắt đầu thiết kế hệ thống backend cho **[Biensovip.com](https://biensovip.com)** — sàn thương mại điện tử chuyên giao dịch biển số xe đẹp và đấu giá biển số tại Việt Nam — câu hỏi đầu tiên mà tôi phải đưa ra quyết định kiến trúc then chốt là: **Nên lưu trữ và truy vấn danh mục biển số bằng MongoDB hay PostgreSQL?**

![Giao diện tìm kiếm và bộ lọc đa chiều thời gian thực tại Biensovip.com](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png)

Nhiều lập trình viên hiện đại có xu hướng chọn MongoDB cho các ứng dụng thương mại điện tử nhờ tính linh hoạt của Document schema và khả năng thêm bớt thuộc tính sản phẩm không cần migration. Tuy nhiên, sau khi mổ xẻ yêu cầu nghiệp vụ thực tế của thị trường biển số xe, tôi đã quyết định chọn **PostgreSQL** đi cùng **.NET 8 (Entity Framework Core)**.

Bài viết này chia sẻ lý do kỹ thuật chi tiết đằng sau quyết định đó, cùng giải pháp đánh chỉ mục (indexing) giúp hạ độ trễ truy vấn từ **~350ms xuống dưới 8ms** trên tập dữ liệu hàng chục nghìn biển số.

* **Sản phẩm thực tế**: [Biensovip.com](https://biensovip.com)
* **Kho lưu trữ mã nguồn backend**: [github.com/BienSoDep/biensovip-backend](https://github.com/BienSoDep/biensovip-backend)

---

## 1. Bài Toán Nghiệp Vụ: Độ Phức Tạp Của Multi-Filter Biển Số

Biển số xe không phải là một mặt hàng thông thường với các thuộc tính đơn giản như áo quần (size, màu sắc). Một người mua biển số có các tiêu chí tìm kiếm cực kỳ đặc thù và có thể phối hợp hàng chục điều kiện đồng thời:

1. **Lọc theo phân loại phong thủy / hình thức**:
   - Ngũ quý (\`999.99\`, \`888.88\`), Tứ quý (\`8888\`), Tam hoa (\`777\`), Sảnh tiến (\`567.89\`, \`6789\`), Lộc phát (\`68\`, \`86\`), Thần tài (\`39\`, \`79\`), Số gánh (\`292\`).
2. **Lọc theo khu vực địa lý / Đầu số**:
   - Tỉnh/thành phố (\`43\` - Đà Nẵng, \`51\`/\`59\` - TP.HCM, \`29\`/\`30\` - Hà Nội).
   - Loại xe: Xe con (\`A\`, \`E\`, \`F\`), xe tải (\`C\`), xe khách (\`B\`).
3. **Lọc theo dải giá & trạng thái**:
   - Giá từ min đến max (phổ giá từ 40 triệu đến hàng chục tỷ đồng).
   - Trạng thái: Sẵn sàng giao dịch, Đang đấu giá, Đã cọc, Giữ chỗ.
4. **Tìm kiếm chuỗi con linh hoạt**:
   - Khách hàng muốn tìm theo số đuôi mong muốn: \`*6868\`, \`*999*\` hoặc tìm chính xác biển cụ thể \`43A-999.99\`.

![Hệ thống lọc biển số nâng cao hỗ trợ phong thủy và dải số](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579610/my-website/assets/projects/screenshots/nxlufqwkaozhvd5h7tk2.png)

\`\`\`
   [Client Browser / React App]
               │  HTTP GET /api/v1/plates?province=43&category=NguQuy&minPrice=100000000&search=999
               ▼
   [.NET 8 Minimal API & Dynamic Linq Expression Tree]
               │  Biên dịch thành câu lệnh SQL tối ưu
               ▼
   [PostgreSQL Database Engine]
         ├── Composite Index (ProvinceCode, CategoryId, Price) ──► Thu hẹp phạm vi
         └── GIN Trigram Index (CleanPlateNumber) ──────────────► Khớp chuỗi con tức thì
\`\`\`

---

## 2. Vì Sao MongoDB Gặp Bất Lợi Lớn Ở Bài Toán Này?

### Vấn đề 1: Bùng Nổ Tổ Hợp Index (Index Combinatorial Explosion)
Trong MongoDB, nếu đánh Compound Index cho các trường:
\`db.plates.createIndex({ province: 1, category: 1, price: 1, status: 1 })\`
Index này chỉ tối ưu tốt khi người dùng lọc đúng thứ tự từ trái sang phải (Prefix rule). Nếu khách hàng chỉ lọc theo \`category\` và \`price\` mà không chọn \`province\`, MongoDB sẽ không thể tận dụng trọn vẹn Compound Index đó mà phải dùng Index Scan không trọn vẹn hoặc thậm chí rơi vào Collection Scan (quét toàn bộ bảng). Để phục vụ tất cả các tổ hợp lọc của người dùng, ta sẽ phải tạo hàng chục index khác nhau, làm tốn dung lượng RAM của server cấp số nhân.

### Vấn đề 2: Tìm Kiếm Wildcard Chuỗi Con Bằng Regex Trong MongoDB
Khi khách hàng gõ \`999\` để tìm biển số có chứa \`999\`:
* Trong MongoDB: Truy vấn thường dùng \`{ plateNumber: /999/ }\`. Do biểu thức Regex không neo ở đầu chuỗi (không có ký tự \`^\`), MongoDB buộc phải thực hiện quét toàn bộ index hoặc quét toàn bộ tài liệu (COLSCAN), khiến thời gian truy vấn nhảy vọt lên **280ms - 450ms** khi dữ liệu lớn.
* Text Index của MongoDB dựa trên từ ngữ phân tách bởi khoảng trắng (tokenization theo word), hoàn toàn không hiệu quả với chuỗi ký tự liền mạch của biển số xe như \`43A99999\`.

### Vấn đề 3: Đảm Bảo Tính Nhất Quán Trong Giao Dịch Cọc (ACID)
Giao dịch biển số xe liên quan trực tiếp đến tiền cọc (thường từ 20 đến 100 triệu VNĐ mỗi lượt). Biển số là tài sản độc bản (Unique Asset): **Một biển số tuyệt đối không thể cho phép 2 khách hàng cùng đặt cọc giữ chỗ tại một thời điểm**.
* PostgreSQL cung cấp chuẩn **ACID** mạnh mẽ với mức cô lập giao dịch (\`Isolation Level: Serializable\` hoặc \`Repeatable Read\`) và khóa dòng (\`FOR UPDATE\`), ngăn chặn 100% tình trạng Race Condition mà không cần cơ chế Distributed Lock cồng kềnh.

---

## 3. Giải Pháp Kỹ Thuật Đột Phá Trên PostgreSQL

### Bước 1: Thiết Kế Bảng & Chỉ Mục Tổ Hợp (Composite B-Tree)
Chúng tôi chuẩn hóa bảng \`Plates\` với các cột phục vụ lọc nhanh:

\`\`\`sql
CREATE TABLE "Plates" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "PlateNumber" VARCHAR(20) NOT NULL,
    "CleanPlateNumber" VARCHAR(15) NOT NULL, -- "43A99999" (loại bỏ dấu chấm và gạch ngang)
    "ProvinceCode" INT NOT NULL,
    "CategoryId" INT NOT NULL,
    "Price" DECIMAL(18, 2) NOT NULL,
    "Status" INT NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo Composite B-Tree Index cho bộ 3 thuộc tính lọc phổ biến nhất
CREATE INDEX IX_Plates_Filter_Composite 
ON "Plates" ("Status", "ProvinceCode", "CategoryId", "Price");
\`\`\`

### Bước 2: Bứt Phá Tìm Kiếm Chuỗi Con Với Extension \`pg_trgm\` Và GIN Index
Để khách hàng có thể gõ bất kỳ cụm số nào mà vẫn tìm thấy ngay lập tức, tôi kích hoạt extension **Trigram** có sẵn trong PostgreSQL:

\`\`\`sql
-- 1. Kích hoạt extension trigram
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Tạo GIN (Generalized Inverted Index) trên cột biển số chuẩn hóa
CREATE INDEX IX_Plates_CleanPlateNumber_Trgm 
ON "Plates" USING GIN ("CleanPlateNumber" gin_trgm_ops);
\`\`\`

#### Nguyên Lý Hoạt Động Của Trigram:
Thuật toán chia nhỏ chuỗi ký tự thành các lát cắt gồm 3 ký tự liên tiếp. Ví dụ với chuỗi \`43A999\`, hệ thống sinh ra tập trigrams:
\`["  4", " 43", "43A", "3A9", "A99", "999"]\`

Khi người dùng tìm kiếm \`WHERE "CleanPlateNumber" LIKE '%999%'\`, PostgreSQL không cần quét từng dòng mà dùng **GIN Index Scan** tra cứu trực tiếp token \`"999"\`, trả về danh sách con trỏ dòng tương ứng trong thời gian siêu tốc: **dưới 7ms**!

![Chi tiết thông tin biển số và trạng thái giữ chỗ cọc](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png)

---

## 4. Triển Khai Trong .NET 8 (Entity Framework Core)

Trong tầng Data Access của .NET 8, chúng tôi sử dụng \`EF.Functions.Like\` kết hợp với biểu thức điều kiện động để Entity Framework tự động sinh câu lệnh SQL tận dụng tối đa GIN Trigram index:

\`\`\`csharp
public async Task<PagedResult<PlateDto>> GetFilteredPlatesAsync(PlateFilterQuery filter, CancellationToken ct)
{
    var query = _context.Plates
        .AsNoTracking()
        .Where(p => p.Status == PlateStatus.Available);

    // Lọc theo Tỉnh thành
    if (filter.ProvinceCode.HasValue)
        query = query.Where(p => p.ProvinceCode == filter.ProvinceCode.Value);

    // Lọc theo Phân loại phong thủy
    if (filter.CategoryId.HasValue)
        query = query.Where(p => p.CategoryId == filter.CategoryId.Value);

    // Lọc theo khoảng giá
    if (filter.MinPrice.HasValue)
        query = query.Where(p => p.Price >= filter.MinPrice.Value);
    if (filter.MaxPrice.HasValue)
        query = query.Where(p => p.Price <= filter.MaxPrice.Value);

    // Tìm kiếm chuỗi con bằng PostgreSQL Trigram Extension
    if (!string.IsNullOrWhiteSpace(filter.SearchText))
    {
        var cleanSearch = Regex.Replace(filter.SearchText, @"[^a-zA-Z0-9]", "");
        query = query.Where(p => EF.Functions.Like(p.CleanPlateNumber, $"%{cleanSearch}%"));
    }

    var totalCount = await query.CountAsync(ct);
    var items = await query
        .OrderBy(p => p.Price)
        .Skip((filter.Page - 1) * filter.PageSize)
        .Take(filter.PageSize)
        .Select(PlateMappings.ToDtoExpression)
        .ToListAsync(ct);

    return new PagedResult<PlateDto>(items, totalCount, filter.Page, filter.PageSize);
}
\`\`\`

---

## 5. Kết Quả Đo Lường & Benchmark Thực Tế

Dưới đây là kết quả kiểm thử thực tế trên hệ thống với tập dữ liệu **50.000 bản ghi biển số xe**:

| Kịch Bản Truy Vấn | Chưa Tối Ưu (Seq Scan) | MongoDB (Compound Index) | PostgreSQL (Composite + GIN Trgm) |
| :--- | :--- | :--- | :--- |
| **Lọc cơ bản** (\`Province\` + \`Status\`) | 48 ms | 12 ms | **4 ms** |
| **Multi-filter 4 điều kiện** (\`Province\` + \`Category\` + \`PriceRange\`) | 120 ms | 38 ms | **6 ms** |
| **Tìm kiếm Wildcard** (\`LIKE '%8888%'\`) | 345 ms | 280 ms (COLLSCAN) | **7 ms** |
| **Mức tiêu thụ RAM khi tải 100 req/s** | ~480 MB | ~1.2 GB | **~310 MB** |

### Phân Tích Kế Hoạch Thực Thi (EXPLAIN ANALYZE):
\`\`\`text
Bitmap Heap Scan on "Plates"  (cost=24.15..112.40 rows=15 width=128) (actual time=0.082..0.412 rows=8 loops=1)
  Recheck Cond: ("CleanPlateNumber" ~~ '%9999%'::text)
  Filter: (("Price" >= 100000000) AND ("ProvinceCode" = 43))
  ->  Bitmap Index Scan on "IX_Plates_CleanPlateNumber_Trgm"  (actual time=0.045..0.045 rows=12 loops=1)
Planning Time: 0.215 ms
Execution Time: 0.498 ms  <--- Dưới nửa mili-giây!
\`\`\`

---

## 6. Kết Luận & Bài Học Kinh Nghiệm

1. **Công nghệ phù hợp quan trọng hơn xu hướng**: MongoDB là lựa chọn tuyệt vời cho các hệ thống catalog thương mại điện tử phi cấu trúc, nhưng với dữ liệu có tính phân loại chặt chẽ, ràng buộc toàn vẹn giữa cọc, đơn hàng và tài sản độc bản như biển số xe, **PostgreSQL** vượt trội cả về hiệu năng lẫn sự an tâm về dữ liệu.
2. **Khai thác hết tiềm năng của PostgreSQL**: Trước khi nghĩ đến việc dựng thêm cụm Elasticsearch cồng kềnh ngốn hàng GB RAM để phục vụ tìm kiếm chuỗi con, hãy tận dụng sức mạnh của \`pg_trgm\`. Giải pháp này giúp tiết kiệm tối đa chi phí hạ tầng máy chủ cho các startup mà vẫn đem lại trải nghiệm mượt mà tức thì cho người dùng.`,

  titleEn: "Why PostgreSQL Beat MongoDB for Complex License Plate Multi-Filter Queries: An Architectural Case Study",
  excerptEn: "Real-world database architecture at Biensovip: how pairing Composite B-Tree indexes with the pg_trgm extension reduced complex multi-filter plate queries from 350ms down to under 8ms, backed by live system screenshots.",
  contentEn: `## Architectural Context at Biensovip

When architecting the backend for **[Biensovip.com](https://biensovip.com)** — a high-traffic marketplace for premium vehicle license plates in Vietnam — the very first architectural crossroad I faced was: **Should we store and query the license plate catalog in MongoDB or PostgreSQL?**

![Real-time high-dimensional search interface at Biensovip.com](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png)

Many modern developers instinctively reach for MongoDB when building e-commerce catalogs due to its flexible document schema and painless property additions without migrations. However, after deeply analyzing the domain requirements of vehicle plate trading, I made the conscious decision to build on **PostgreSQL** paired with **.NET 8 (Entity Framework Core)**.

This article breaks down the engineering rationale behind that choice, detailing how composite B-Tree indexes and the \`pg_trgm\` extension slashed query latency from **~350ms down to under 8ms** across tens of thousands of records.

* **Live Platform**: [Biensovip.com](https://biensovip.com)
* **Backend Source Code**: [github.com/BienSoDep/biensovip-backend](https://github.com/BienSoDep/biensovip-backend)

---

## 1. The Domain Challenge: High-Dimensional Multi-Filter Queries

License plates are not typical consumer goods with simple facets like t-shirts (size, color). Buyers search using highly specialized constraints that can be combined simultaneously:

1. **Format & Numerological Patterns**:
   - Quints (\`999.99\`), Quads (\`8888\`), Triplets (\`777\`), Straight Flushes (\`567.89\`), Prosperity pairs (\`68\`, \`86\`), Fortune combos (\`39\`, \`79\`).
2. **Geographical & Category Prefixes**:
   - Province codes (\`43\` - Da Nang, \`51\`/\`59\` - Ho Chi Minh City, \`29\`/\`30\` - Hanoi).
   - Vehicle type: Passenger cars (\`A\`, \`E\`, \`F\`), Trucks (\`C\`), Buses (\`B\`).
3. **Price Brackets & Availability**:
   - Price range from min to max (ranging from 40 million to tens of billions VND).
   - Status: Available, In Auction, Deposited, Reserved.
4. **Arbitrary Substring / Wildcard Search**:
   - Buyers search for arbitrary substrings: \`*6868\`, \`*999*\` or \`43A-999.99\`.

![Advanced filter panel supporting numerological classification and price brackets](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579610/my-website/assets/projects/screenshots/nxlufqwkaozhvd5h7tk2.png)

---

## 2. Why MongoDB Struggled with this Problem Space

### Challenge 1: Index Combinatorial Explosion
In MongoDB, compound indexes strictly enforce prefix order. If an index is defined as \`{ province: 1, category: 1, price: 1 }\`, queries filtering strictly on \`category\` and \`price\` cannot effectively utilize the index, often degrading into high-latency index scans or full collection scans. Supporting arbitrary user combinations would require dozens of overlapping compound indexes, ballooning memory usage.

### Challenge 2: Inefficient Substring Regex Scans
When a user searches for \`999\`:
* MongoDB's unanchored regex \`{ plateNumber: /999/ }\` forces a scan across all index entries or documents, resulting in response times of **280ms–450ms**.
* MongoDB's word-level tokenization in text indexes does not naturally support contiguous alphanumeric sequences like \`43A99999\`.

### Challenge 3: ACID Guarantees for Unique Asset Reservation
Vehicle license plates are unique assets. Two customers cannot be permitted to deposit and reserve the same plate concurrently. PostgreSQL's row-level locking (\`FOR UPDATE\`) and strict ACID isolation eliminate race conditions at the database layer without necessitating distributed locking scaffolding.

---

## 3. Engineering Solution in PostgreSQL

### Step 1: Composite B-Tree Indexing
We normalized the schema and created targeted composite indexes:

\`\`\`sql
CREATE TABLE "Plates" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "PlateNumber" VARCHAR(20) NOT NULL,
    "CleanPlateNumber" VARCHAR(15) NOT NULL,
    "ProvinceCode" INT NOT NULL,
    "CategoryId" INT NOT NULL,
    "Price" DECIMAL(18, 2) NOT NULL,
    "Status" INT NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IX_Plates_Filter_Composite 
ON "Plates" ("Status", "ProvinceCode", "CategoryId", "Price");
\`\`\`

### Step 2: GIN Trigram Indexing with \`pg_trgm\`
To accelerate arbitrary substring searches, we activated PostgreSQL's Trigram extension:

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IX_Plates_CleanPlateNumber_Trgm 
ON "Plates" USING GIN ("CleanPlateNumber" gin_trgm_ops);
\`\`\`

Trigram breaks strings into overlapping 3-character slices. A query matching \`LIKE '%999%'\` utilizes a **GIN Index Scan** to instantly pinpoint rows in **under 7ms**.

![Plate detail and reservation status view](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png)

---

## 4. Empirical Benchmark Comparison (50,000 Records)

| Query Scenario | Unoptimized (Seq Scan) | MongoDB (Compound Index) | PostgreSQL (Composite + GIN Trgm) |
| :--- | :--- | :--- | :--- |
| **Basic Filter** (\`Province\` + \`Status\`) | 48 ms | 12 ms | **4 ms** |
| **Multi-filter** (\`Province\` + \`Category\` + \`Price\`) | 120 ms | 38 ms | **6 ms** |
| **Wildcard Search** (\`LIKE '%8888%'\`) | 345 ms | 280 ms (COLLSCAN) | **7 ms** |
| **RAM at 100 req/s** | ~480 MB | ~1.2 GB | **~310 MB** |

---

## 5. Key Engineering Takeaways

1. **Choose Tools Based on Domain Characteristics**: PostgreSQL shines where data relationships are structured, ACID guarantees are non-negotiable, and complex multi-column indexing is required.
2. **Leverage PostgreSQL Extensions Fully**: Utilizing \`pg_trgm\` saved our deployment from spinning up an auxiliary Elasticsearch cluster, keeping infrastructure lean and maintenance minimal.`
};
