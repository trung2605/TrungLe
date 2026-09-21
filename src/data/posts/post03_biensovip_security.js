export const post03 = {
  id: 3,
  slug: "biensovip-solo-mvp-30-days-security-scope",
  date: "2026-08-28",
  tags: ["Freelance", ".NET 8", "React 19", "Security", "DeepSeek AI", "DevOps"],
  readTime: "11 min read",

  titleVi: "Giao MVP Marketplace Solo Trong 30 Ngày: Quyết Định Bảo Mật Loại Trừ Cổng Thanh Toán & Tích Hợp DeepSeek AI",
  excerptVi: "Hành trình một mình thiết kế, xây dựng và đưa Biensovip.com lên production trong 30 ngày: phân định phạm vi bảo mật thực tế để triệt tiêu rủi ro PCI-DSS, luồng đối soát cọc 2 bước và tích hợp trợ lý AI tư vấn biển số, kèm hình ảnh minh họa thực tế.",
  contentVi: `## Bối Cảnh & Thách Thức Khi Làm Solo Developer

Là một kỹ sư phần mềm làm việc trực tiếp với khách hàng doanh nghiệp, một trong những thử thách lớn nhất không phải là việc gõ phím viết code như thế nào, mà là **xác định ranh giới sản phẩm (Product Scoping)** để bàn giao đúng hạn mà vẫn đảm bảo tính bảo mật và giá trị kinh doanh cốt lõi.

![Giao diện trang chủ sàn thương mại điện tử Biensovip.com](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png)

Vào tháng 5/2026, tôi nhận hợp đồng độc quyền xây dựng **[Biensovip.com](https://biensovip.com)** — sàn thương mại điện tử giao dịch và đấu giá biển số xe đẹp — với cam kết: **Bàn giao bản MVP chạy được trên môi trường production trong vòng đúng 30 ngày**, thực hiện hoàn toàn độc lập (solo) từ phân tích nghiệp vụ, thiết kế cơ sở dữ liệu, backend .NET 8, frontend React 19 cho đến hạ tầng VPS và bảo mật.

Bài viết này chia sẻ cách tôi phân định phạm vi kỹ thuật, lý do có chủ đích loại trừ cổng thanh toán trực tuyến, và cách tích hợp trợ lý DeepSeek AI để tạo ra khác biệt cho sản phẩm.

* **Sản phẩm đang vận hành thực tế**: [Biensovip.com](https://biensovip.com)
* **Kho mã nguồn backend**: [github.com/BienSoDep/biensovip-backend](https://github.com/BienSoDep/biensovip-backend)

---

## 1. Bản Đồ Kiến Trúc: Clean Architecture Cho Solo Developer

Khi làm dự án một mình với thời gian gấp, cạm bẫy lớn nhất là viết code "mì ăn liền" (spaghetti code) trong một project monolithic không phân lớp. Sau vài tuần, khi khách hàng đổi yêu cầu, bạn sẽ bị chôn vùi trong đống bug phát sinh.

Để vừa đi nhanh vừa giữ codebase sạch, tôi áp dụng **Clean Architecture** với .NET 8 gồm 4 project tách biệt:

\`\`\`
src/
├── Biensovip.Domain/          # Entity lõi, Value Objects, Domain Events (Zero external dependencies)
├── Biensovip.Application/     # Use Cases, DTOs, FluentValidation, MediatR Commands/Queries
├── Biensovip.Infrastructure/  # EF Core DbContext, PostgreSQL, Cloudinary, AWS SES, DeepSeek Client
└── Biensovip.Api/             # Minimal APIs, JWT Middleware, Rate Limiting, OpenAPI Swagger
\`\`\`

Frontend được xây dựng với **React 19 + Vite + TailwindCSS**, kết hợp **TanStack Query** để quản lý server state caching, loại bỏ hoàn toàn boilerplate code quản lý loading/error state.

---

## 2. Quyết Định Bảo Mật Quan Trọng Nhất: Không Tích Hợp Cổng Thanh Toán

Hầu hết mọi người khi nghe đến "Marketplace / E-commerce" đều nghĩ ngay đến việc tích hợp Stripe, VNPay, MoMo hay ZaloPay. Tuy nhiên, tôi đã chủ động thuyết phục khách hàng **loại bỏ cổng thanh toán trực tuyến** trong giai đoạn MVP.

### Lý Do Kỹ Thuật & Pháp Lý:
1. **Giá trị giao dịch rất lớn**: Giá trị một biển số đẹp dao động từ 40 triệu đến hàng tỷ đồng. Tiền đặt cọc tối thiểu thường từ 5 đến 50 triệu đồng. Các cổng thanh toán trực tuyến áp mức phí từ **1.5% đến 2.5%**, đồng nghĩa mỗi giao dịch cọc mất từ vài trăm nghìn đến hàng triệu đồng tiền phí cổng vô ích.
2. **Rủi ro Chargeback và Gian lận Thẻ**: Với tài sản giá trị cao, tội phạm mạng thường dùng thẻ tín dụng trộm cắp (stolen credit cards) để thanh toán. Nếu bị tra soát (chargeback), chủ sàn không chỉ mất tiền mà còn bị khóa tài khoản ngân hàng merchant.
3. **Gánh nặng tuân thủ PCI-DSS**: Việc xử lý thẻ tín dụng đòi hỏi hệ thống phải tuân thủ tiêu chuẩn bảo mật dữ liệu thẻ thanh toán (PCI-DSS), yêu cầu kiểm toán an ninh định kỳ và gia tăng chi phí hạ tầng vượt xa ngân sách của một MVP 30 ngày.

### Giải Pháp Thay Thế: Luồng Xác Thực Chuyển Khoản 2 Lớp (Manual Confirmation Flow)

![Giao diện quản trị Admin duyệt giao dịch và đối soát 2 bước](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579613/my-website/assets/projects/screenshots/vl8kafmfubidwk3mugcb.png)

\`\`\`
   Khách Hàng                         Hệ Thống Biensovip                   Ngân Hàng / Kế Toán
       │                                       │                                     │
       │── 1. Bấm đặt cọc giữ chỗ biển ───────►│                                     │
       │                                       │ (Sinh mã Memo cọc: BSV-43A-99999)   │
       │◄─ 2. Trả về mã VietQR động ──────────│                                     │
       │      (chứa sẵn số tiền & Memo)        │                                     │
       │                                       │                                     │
       │── 3. Quét QR chuyển khoản ─────────────────────────────────────────────────►│
       │                                       │                                     │
       │                                       │── 4. Webhook thông báo giao dịch ───┤
       │                                       │◄─ 5. Kế toán đối chiếu sao kê ──────┤
       │                                       │                                     │
       │                                       │── 6. Chuyển trạng thái 'DEPOSITED'  │
       │◄─ 7. Nhận Email xác nhận cọc ─────────│      (Khóa vĩnh viễn biển số)       │
\`\`\`

Ưu điểm vượt trội của giải pháp này:
* **Chi phí giao dịch = 0 VNĐ** (sử dụng chuyển khoản ngân hàng qua VietQR chuẩn NAPAS 24/7).
* **Rủi ro lừa đảo = 0%** vì nhân viên đối soát chỉ duyệt khi tiền thực tế đã vào tài khoản công ty.
* **Tiết kiệm 5 ngày phát triển** tích hợp và kiểm thử webhook phức tạp của cổng thanh toán bên thứ ba.

---

## 3. Tích Hợp Trợ Lý DeepSeek AI Tư Vấn Biển Số Thông Minh

Để tạo điểm nhấn công nghệ cho nền tảng, tôi tích hợp chatbot tư vấn tự động sử dụng **DeepSeek API** thông qua mô hình RAG nhẹ (Retrieval-Augmented Context).

### Kỹ Thuật Prompt Injection Guard & Context Binding:
Thay vì để chatbot trả lời chung chung hoặc "bịa số" (hallucination), tôi cấu hình system prompt nắm rõ quy luật phong thủy biển số Việt Nam (ngũ hành, quẻ dịch, số nút) và truyền danh sách biển số đang sẵn sàng vào ngữ cảnh:

\`\`\`csharp
public async Task<string> GenerateConsultationAsync(string userMessage, UserPreferences pref)
{
    var relevantPlates = await _plateRepository.GetTopAvailableByBudgetAsync(pref.BudgetMin, pref.BudgetMax);
    
    var systemPrompt = $"""
        Bạn là chuyên gia tư vấn biển số xe của sàn Biensovip.
        Quy tắc nghiêm ngặt:
        - Chỉ gợi ý các biển số CÓ THẬT trong kho sau: {string.Join(", ", relevantPlates.Select(p => p.CleanPlateNumber))}
        - Tuyệt đối không tự ý bịa đặt biển số không có trong danh sách trên.
        - Phân tích ý nghĩa phong thủy theo tuổi, mệnh ngũ hành của khách hàng.
        - Khuyến khích khách hàng bấm vào nút xem chi tiết để đặt cọc giữ chỗ.
        """;
        
    return await _deepSeekClient.ChatCompletionAsync(systemPrompt, userMessage);
}
\`\`\`

Kết quả: Khách hàng vào web không chỉ xem danh sách số khô khan mà có thể trò chuyện: *"Mình sinh năm 1993 mệnh Kiếm Phong Kim, muốn tìm biển đầu Đà Nẵng giá dưới 100 triệu"*, chatbot sẽ phân tích số hợp mệnh và lọc đúng biển trong kho.

---

## 4. Triển Khai Thực Tế Trên VPS: 0đ Chi Phí Bản Quyền

Toàn bộ hệ thống production được đóng gói bằng Docker và vận hành trên 1 VPS Ubuntu 2 CPU / 4GB RAM với chi phí dưới $10/tháng:

\`\`\`yaml
# docker-compose.prod.yml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on: [api, web]

  api:
    image: biensovip-api:latest
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Host=postgres;Database=biensovip;Username=...
    depends_on: [postgres]

  postgres:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
\`\`\`

- **Reverse Proxy**: Nginx xử lý SSL termination tự động với Certbot (Let's Encrypt), cấu hình HTTP/2 và nén Brotli/Gzip.
- **Backend Container**: ASP.NET Core 8 chạy trên Alpine Linux image siêu nhẹ (< 120MB).
- **Database**: PostgreSQL 16 cấu hình connection pooling qua Npgsql.
- **Email Service**: AWS Simple Email Service (SES) với tỉ lệ vào inbox 99.8%.

---

## 5. Kết Quả Sau 30 Ngày

- **Giao đúng tiến độ ngày thứ 29**: Toàn bộ 12 core use-cases và 3 non-functional requirements (bảo mật, tốc độ, SEO) hoàn tất.
- **Hiệu năng ấn tượng**: Điểm Google Lighthouse đạt **98/100** trên desktop và **94/100** trên mobile.
- **Khách hàng hài lòng**: Sàn đi vào hoạt động chính thức tại **[biensovip.com](https://biensovip.com)** và bắt đầu tiếp nhận giao dịch thực tế ngay trong tuần đầu tiên ra mắt.

*Bài học lớn nhất*: Làm sản phẩm không phải là cố gắng nhồi nhét mọi công nghệ thời thượng vào hệ thống, mà là biết từ bỏ những thứ rủi ro cao và dồn lực vào những tính năng mang lại giá trị tức thì cho khách hàng.`,

  titleEn: "Shipping a Production Marketplace Solo in 30 Days: Architecture, Security Scoping, and Zero Payment Gateway",
  excerptEn: "The journey of designing, building, and deploying Biensovip.com solo in 30 days: pragmatic security scoping to eliminate PCI-DSS overhead, 2-step deposit verification, and DeepSeek AI consultation integration, backed by live production screenshots.",
  contentEn: `## Engineering Context & The Solo Delivery Challenge

As a software engineer delivering enterprise solutions directly to commercial clients, the most demanding hurdle is rarely the physical act of coding — it is **rigorous product boundary enforcement (Product Scoping)** to ensure on-time delivery without compromising security or commercial integrity.

![Biensovip.com Production Marketplace Homepage](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png)

In May 2026, I undertook the solo contract to architect and deploy **[Biensovip.com](https://biensovip.com)** — a digital trading platform for premium vehicle license plates — under an uncompromising constraint: **Deliver a fully operational, production-ready MVP in exactly 30 days**, operating entirely solo across domain requirements, database schemas, .NET 8 backend, React 19 frontend, and cloud VPS deployment.

Here is how I scoped the technical architecture, why I deliberately eliminated online payment gateways, and how I integrated DeepSeek AI to differentiate the platform.

* **Live Platform**: [Biensovip.com](https://biensovip.com)
* **Backend Repository**: [github.com/BienSoDep/biensovip-backend](https://github.com/BienSoDep/biensovip-backend)

---

## 1. Architectural Blueprint: Clean Architecture for Solo Speed

Under tight solo deadlines, the temptation to write monolithic spaghetti code is high. However, requirement pivots will swiftly drown the project in regressions.

I adopted **Clean Architecture** in .NET 8 across 4 decoupled projects:

\`\`\`
src/
├── Biensovip.Domain/          # Core entities, value objects, domain events (Zero dependencies)
├── Biensovip.Application/     # CQRS MediatR handlers, FluentValidation rules, DTOs
├── Biensovip.Infrastructure/  # EF Core DbContext, PostgreSQL, Cloudinary, AWS SES, DeepSeek client
└── Biensovip.Api/             # Minimal APIs, JWT middleware, rate limiting, OpenAPI Swagger
\`\`\`

The frontend was built on **React 19 + Vite + TailwindCSS**, backed by **TanStack Query** for automatic server state cache invalidation.

---

## 2. Decisive Security Scoping: Excluding Online Payment Gateways

Most e-commerce discussions default to integrating Stripe or payment gateways. However, I actively persuaded the client to **omit online payment gateways** for the MVP.

### Technical & Commercial Rationale:
1. **High Ticket Sizes**: Vehicle plates trade between $1,500 and $100,000. Deposits range from $200 to $2,000. Payment gateway commissions (1.5% to 2.5%) would leak hundreds of dollars per transaction unnecessarily.
2. **Chargeback & Card Fraud Risks**: High-value digital assets are prime targets for stolen credit cards. Reversal chargebacks jeopardize merchant accounts.
3. **PCI-DSS Compliance Overhead**: Direct card processing imposes stringent PCI-DSS audit regulations, increasing infrastructure complexity beyond a 30-day timeline.

### Pragmatic Alternative: 2-Step VietQR Bank Verification

![Admin transaction reconciliation and 2-step verification modal](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579613/my-website/assets/projects/screenshots/vl8kafmfubidwk3mugcb.png)

\`\`\`
   Buyer                               Biensovip Platform                    Bank / Accountant
     │                                         │                                      │
     │── 1. Clicks "Reserve & Deposit" ───────►│                                      │
     │                                         │ (Issues unique memo: BSV-43A-99999)  │
     │◄─ 2. Renders dynamic VietQR ────────────│                                      │
     │      (embedded sum & memo token)        │                                      │
     │                                         │                                      │
     │── 3. Transfers funds via Mobile Banking ──────────────────────────────────────►│
     │                                         │                                      │
     │                                         │── 4. Transaction notification ───────┤
     │                                         │◄─ 5. Reconciles bank statement ──────┤
     │                                         │                                      │
     │                                         │── 6. Transitions status to DEPOSITED │
     │◄─ 7. Receives confirmation email ───────│      (Asset locked indefinitely)     │
\`\`\`

This workflow:
* Incurs **0% gateway transaction fees** (utilizing instant interbank NAPAS transfers).
* Eliminates **fraud risk completely**, as reservations confirm only when cash is credited to the company account.
* Saved 5 full development days of gateway webhook integration and webhook idempotency handling.

---

## 3. DeepSeek AI Consultation Agent Integration

To elevate user engagement, I integrated **DeepSeek API** using lightweight retrieval-augmented prompting:

\`\`\`csharp
public async Task<string> GenerateConsultationAsync(string userMessage, UserPreferences pref)
{
    var relevantPlates = await _plateRepository.GetTopAvailableByBudgetAsync(pref.BudgetMin, pref.BudgetMax);
    
    var systemPrompt = $"""
        You are an expert vehicle license plate consultant for Biensovip.
        Strict Rules:
        - Recommend ONLY authentic plates currently available in inventory: {string.Join(", ", relevantPlates.Select(p => p.CleanPlateNumber))}
        - Never hallucinate nonexistent plate combinations.
        - Provide numerological analysis based on the customer's birth year.
        - Guide the user to click the detail link to secure their reservation.
        """;
        
    return await _deepSeekClient.ChatCompletionAsync(systemPrompt, userMessage);
}
\`\`\`

---

## 4. Production VPS Deployment & Hardening

The production environment was containerized with Docker Compose on an Ubuntu VPS ($10/month budget):
* **Nginx Reverse Proxy**: Automatic Let's Encrypt TLS termination, HTTP/2, Brotli compression.
* **Minimal .NET 8 Container**: Packaged in an ultra-slim Alpine Linux image (< 120MB).
* **Hardened PostgreSQL**: Secured within internal Docker network bridges, unreachable from public WAN.

---

## 5. Summary & 30-Day Delivery Retrospective

* Shipped to production on Day 29 with all core workflows operational.
* Achieved **98/100 Google Lighthouse** score on desktop.
* Proved that successful product delivery is defined by **disciplined scope exclusion and laser focus on high-impact business value**.`
};
