export const post10 = {
  id: 10,
  slug: "the-dreamers-engineering-transparency-non-profit-platforms",
  date: "2025-09-28",
  tags: ["Social Impact", "Web Development", "Audit Trails", "Security", "Community", "Full Stack"],
  readTime: "7 min read",

  titleVi: "The Dreamers: Khi Kỹ Thuật Phần Mềm Trở Thành Cầu Nối Minh Bạch Cho Các Hoạt Động Thiện Nguyện",
  excerptVi: "Cách tôi xây dựng nền tảng The Dreamers: Số hóa quy trình quản lý tình nguyện viên, giải quyết bài toán minh bạch tài chính quyên góp bằng cơ chế Hash Audit Trail bất biến và phát hiện gian lận biên lai.",
  contentVi: `## Sứ Mệnh Của "The Dreamers"

Trong các hoạt động xã hội và cứu trợ cộng đồng, rào cản lớn nhất ngăn cản người dân đóng góp không phải là sự thờ ơ, mà là **nỗi lo sợ về sự thiếu minh bạch tài chính**:
* Tiền quyên góp đã được chuyển đến đúng người cần giúp đỡ chưa?
* Tại sao báo cáo tài chính của các quỹ từ thiện thường chỉ là các file Excel hoặc sao kê sơ sài cuối đợt?
* Làm sao ngăn chặn việc chỉnh sửa số liệu giao dịch trong cơ sở dữ liệu sau khi tiền đã vào tài khoản?

**The Dreamers** ra đời với mục tiêu trở thành nền tảng số hóa toàn diện cho các tổ chức thiện nguyện và nhóm tình nguyện trẻ: Tự động hóa lịch trình tình nguyện viên, công khai minh bạch 100% dòng tiền theo thời gian thực (Real-time Financial Transparency), và cung cấp bằng chứng giải ngân có thể kiểm chứng độc lập.

![Hoạt động thiện nguyện và cứu trợ cộng đồng thực tế của tổ chức The Dreamers](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579570/my-website/assets/projects/screenshots/pic_1_of_131.jpg)

---

## 1. Kiến Trúc Sổ Cái Minh Bạch (Cryptographic Audit Trail)

Để đảm bảo rằng một khi giao dịch quyên góp hoặc khoản chi giải ngân đã được ghi nhận vào hệ thống thì **không một ai (kể cả quản trị viên hệ thống có quyền truy cập root database) có thể âm thầm chỉnh sửa số tiền**, tôi đã triển khai cơ chế **Hash Chain Audit Trail** lấy cảm hứng từ cấu trúc khối:

\`\`\`
   [Giao dịch N - 1]                 [Giao dịch N]                     [Giao dịch N + 1]
   ┌───────────────────────┐         ┌───────────────────────┐         ┌───────────────────────┐
   │ ID: 104               │         │ ID: 105               │         │ ID: 106               │
   │ Amount: 500,000 VND   │         │ Amount: 2,000,000 VND │         │ Amount: 150,000 VND   │
   │ Timestamp: 14:02:10   │         │ Timestamp: 14:05:32   │         │ Timestamp: 14:10:01   │
   │ PrevHash: 8a7f...     │         │ PrevHash: 3b1e...     │◄────────│ PrevHash: 9f4c...     │
   │ CurrentHash: 3b1e...  │────────►│ CurrentHash: 9f4c...  │         │ CurrentHash: e2a8...  │
   └───────────────────────┘         └───────────────────────┘         └───────────────────────┘
\`\`\`

### Cơ Chế Hoạt Động:
Mỗi bản ghi giao dịch chứa một trường \`CurrentHash\` được tính toán bằng thuật toán SHA-256 từ:
\`CurrentHash = SHA256(TransactionId + CampaignId + Amount + Timestamp + PrevHash)\`

\`\`\`javascript
const crypto = require('crypto');

function computeTransactionHash(tx, prevHash) {
  const payload = \`\${tx.id}|\${tx.campaignId}|\${tx.amount}|\${tx.timestamp}|\${prevHash}\`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

async function verifyLedgerIntegrity(campaignId) {
  const transactions = await db.Donations.findAll({
    where: { campaignId },
    order: [['id', 'ASC']]
  });

  let expectedPrevHash = "GENESIS_HASH_ROOT";
  for (const tx of transactions) {
    const computedHash = computeTransactionHash(tx, expectedPrevHash);
    if (computedHash !== tx.currentHash) {
      // Dấu hiệu cơ sở dữ liệu đã bị can thiệp trái phép từ bên ngoài!
      throw new Error(\`CẢNH BÁO BẢO MẬT: Phát hiện sai lệch số liệu tại bản ghi ID \${tx.id}!\`);
    }
    expectedPrevHash = tx.currentHash;
  }
  return true; // Dữ liệu toàn vẹn 100%
}
\`\`\`

Bất kỳ hành vi chỉnh sửa trực tiếp số tiền trong database (ví dụ sửa 2,000,000 thành 500,000) sẽ lập tức phá vỡ chuỗi băm (broken hash chain) của toàn bộ các giao dịch tiếp theo. Hệ thống kiểm toán tự động chạy mỗi 15 phút sẽ phát hiện và kích hoạt cảnh báo tức thì.

---

## 2. Thuật Toán Điều Phối & Ngăn Ngừa Xung Đột Lịch Tình Nguyện

Một vấn đề nan giải khác của các chiến dịch xã hội là quản lý tình nguyện viên:
* Một tình nguyện viên đăng ký tham gia nhiều ca trực cùng lúc (Double-booking).
* Quản lý phân bổ không đều khiến một điểm cứu trợ thừa người trong khi điểm khác lại thiếu nhân lực.

Tôi đã xây dựng thuật toán kiểm tra khoảng thời gian giao nhau (**Interval Intersection Validation**):

\`\`\`javascript
function hasTimeConflict(newShift, existingShifts) {
  const newStart = new Date(newShift.startTime).getTime();
  const newEnd = new Date(newShift.endTime).getTime();

  return existingShifts.some(shift => {
    const start = new Date(shift.startTime).getTime();
    const end = new Date(shift.endTime).getTime();
    // Điều kiện giao nhau: max(start1, start2) < min(end1, end2)
    return Math.max(newStart, start) < Math.min(newEnd, end);
  });
}
\`\`\`

Kết hợp với cơ chế giới hạn số lượng tham gia theo thời gian thực (Real-time Slot Capacity Reservation) sử dụng Redis Lock, hệ thống đảm bảo không bao giờ xảy ra tình trạng nhận quá số lượng tình nguyện viên cho phép tại mỗi địa bàn tiếp tế.

---

## 3. Xác Thực Minh Chứng Giải Ngân & Phòng Chống Gian Lận Ảnh

Khi đội ngũ thiện nguyện mua lương thực, thuốc men và trao quà cho người dân, họ phải tải hóa đơn VAT và hình ảnh trao quà thực tế lên ứng dụng.

Để ngăn chặn việc dùng ảnh cũ chụp từ nhiều năm trước hoặc lấy ảnh trên mạng:
1. **Kiểm Tra Metadata EXIF**: Trích xuất tọa độ GPS và thời gian chụp từ file ảnh gốc để đối chiếu với địa điểm chiến dịch và thời gian giải ngân thực tế.
2. **Loại Bỏ Dữ Liệu Nhạy Cảm**: Trước khi công khai ảnh lên bảng tin cộng đồng, hệ thống tự động xóa bỏ thông tin nhạy cảm của người nhận (che thông tin CCCD hoặc số điện thoại trên hóa đơn) để đảm bảo quyền riêng tư.

![Đội ngũ tình nguyện viên phối hợp điều phối trao tặng quà tại địa bàn](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579573/my-website/assets/projects/screenshots/pic_10_of_131.jpg)

---

## 4. Tác Động Xã Hội: Công Nghệ Vì Cộng Đồng

Dự án The Dreamers đã chứng minh một điều quan trọng đối với bản thân tôi: **Lập trình không chỉ là công việc kinh doanh hay tối ưu hóa lợi nhuận cho doanh nghiệp, mà còn có sức mạnh kiến tạo niềm tin và lan tỏa lòng nhân ái trong xã hội.**

Khi công nghệ mang lại sự minh bạch tuyệt đối, sự hoài nghi biến mất, nhường chỗ cho sự chung tay của hàng ngàn con người vì một cuộc sống tốt đẹp hơn.`,

  titleEn: "The Dreamers: Engineering Transparent Donation and Volunteering Platforms for Social Impact",
  excerptEn: "How I engineered The Dreamers platform: Digitizing volunteer management, establishing financial transparency for donations through cryptographic hash-chained audit trails, and mitigating fraudulent disbursement receipts.",
  contentEn: `## The Mission Behind "The Dreamers"

In charitable initiatives and community disaster relief, the primary barrier preventing donors from contributing is not apathy, but **acute skepticism regarding financial transparency**:
* Did donated funds reach the vulnerable individuals on the ground?
* Why do financial statements often consist of fragmented, post-campaign spreadsheets?
* How can a platform guarantee that internal database figures were not quietly doctored?

**The Dreamers** was architected to empower grassroots non-profits and student volunteer organizations: Streamlining volunteer coordination, ensuring 100% real-time financial transparency, and providing cryptographically auditable disbursement records.

![The Dreamers Community Disaster Relief and Grassroots Initiatives](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579570/my-website/assets/projects/screenshots/pic_1_of_131.jpg)

---

## 1. Cryptographic Audit Trail Architecture

To guarantee that once a donation or expense is committed, **no entity (including system administrators with direct database access) can silently alter transaction figures**, I instituted a **Hash-Chained Audit Trail**:

\`\`\`
   [Transaction N - 1]               [Transaction N]                   [Transaction N + 1]
   ┌───────────────────────┐         ┌───────────────────────┐         ┌───────────────────────┐
   │ ID: 104               │         │ ID: 105               │         │ ID: 106               │
   │ Amount: 500,000 VND   │         │ Amount: 2,000,000 VND │         │ Amount: 150,000 VND   │
   │ Timestamp: 14:02:10   │         │ Timestamp: 14:05:32   │         │ Timestamp: 14:10:01   │
   │ PrevHash: 8a7f...     │         │ PrevHash: 3b1e...     │◄────────│ PrevHash: 9f4c...     │
   │ CurrentHash: 3b1e...  │────────►│ CurrentHash: 9f4c...  │         │ CurrentHash: e2a8...  │
   └───────────────────────┘         └───────────────────────┘         └───────────────────────┘
\`\`\`

### Mathematical Cryptographic Linking:
Each financial record calculates its \`CurrentHash\` via SHA-256:
\`CurrentHash = SHA256(TransactionId + CampaignId + Amount + Timestamp + PrevHash)\`

\`\`\`javascript
const crypto = require('crypto');

function computeTransactionHash(tx, prevHash) {
  const payload = \`\${tx.id}|\${tx.campaignId}|\${tx.amount}|\${tx.timestamp}|\${prevHash}\`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

async function verifyLedgerIntegrity(campaignId) {
  const transactions = await db.Donations.findAll({
    where: { campaignId },
    order: [['id', 'ASC']]
  });

  let expectedPrevHash = "GENESIS_HASH_ROOT";
  for (const tx of transactions) {
    const computedHash = computeTransactionHash(tx, expectedPrevHash);
    if (computedHash !== tx.currentHash) {
      // Cryptographic tampering detected!
      throw new Error(\`SECURITY BREACH: Ledger tampering detected at Record ID \${tx.id}!\`);
    }
    expectedPrevHash = tx.currentHash;
  }
  return true; // Ledger verified intact
}
\`\`\`

Any direct mutation of row values in PostgreSQL instantly breaks the cryptographic chain across all subsequent entries, triggering immediate alerts in automated integrity verification jobs.

---

## 2. Volunteer Scheduling & Interval Conflict Resolution

Volunteer resource allocation frequently suffers from coordination chaos:
* Overlapping volunteer shift registrations (double-booking).
* Imbalanced volunteer distribution across disparate field relief centers.

We instituted an **Interval Intersection Algorithm**:

\`\`\`javascript
function hasTimeConflict(newShift, existingShifts) {
  const newStart = new Date(newShift.startTime).getTime();
  const newEnd = new Date(newShift.endTime).getTime();

  return existingShifts.some(shift => {
    const start = new Date(shift.startTime).getTime();
    const end = new Date(shift.endTime).getTime();
    // Overlap condition: max(start1, start2) < min(end1, end2)
    return Math.max(newStart, start) < Math.min(newEnd, end);
  });
}
\`\`\`

Paired with atomic slot reservations in Redis, double-booking and site overcrowding were completely eliminated.

---

## 3. Disbursement Proof Verification & Anti-Fraud Measures

When volunteers purchase relief supplies, VAT invoices and on-site distribution photos must be submitted:
1. **EXIF Metadata Auditing**: Analyzing image EXIF headers for genuine capture timestamps and geolocation coordinates to cross-reference with active emergency zones.
2. **Automated Privacy Redaction**: Personal identifying data (national ID card numbers or telephone numbers on receipts) is automatically blurred prior to public distribution on donor timelines.

---

## 4. Engineering with Social Purpose

The Dreamers demonstrated a principle central to my development ethos: **Software engineering extends beyond commercial optimization; it holds the immense potential to restore public trust and amplify civic goodwill.**`
};
