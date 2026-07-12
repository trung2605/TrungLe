# Portfolio Impact Upgrade — Kế hoạch & Nhật ký

Tài liệu tham chiếu lâu dài cho đợt nâng cấp portfolio nhằm gây ấn tượng mạnh với nhà tuyển dụng, không dùng backend riêng, đảm bảo không giật lag.

## Mục tiêu

1. Case-study project sâu hơn: highlights, challenge, gallery nhiều ảnh.
2. Skill taxonomy có radar/bar chart tương tác — bấm vào skill lọc ra đúng project liên quan.
3. Screenshot thật cho các project có thể chụp được (live URL hoặc chạy local đơn giản).
4. Motion polish có kiểm soát — chỉ transform/opacity, không thêm engine animation nặng.

## Thư viện đã research & chọn

| Nhu cầu | Thư viện | Lý do chọn |
|---|---|---|
| Skill radar/bar chart | **Recharts** (mới cài) | SVG-based, nhẹ, tree-shakeable, API React-native, không cần canvas/WebGL nặng |
| Screenshot tự động | **Playwright** (đã có sẵn — dùng lại cho e2e) | Không cần cài Puppeteer riêng, đã quen thuộc với site |
| Case-study grid | CSS Grid tự build | Site đã có pattern bento-grid (`gridColumn: span 2`) ở Projects, tái dùng |
| Scroll-driven motion | **Framer Motion** (đã cài, dùng toàn site) | Không thêm engine animation thứ 2 |

**Cố tình KHÔNG dùng**: GSAP, Three.js, Lottie, hay bất kỳ 3D/particle library nào — vì site đã có Framer Motion làm animation engine chính, thêm 1 engine thứ 2 tăng bundle size + rủi ro xung đột timing mà không cần thiết cho mục tiêu "ấn tượng nhưng không lag".

## Nguyên tắc perf ("không giật lag")

- Mọi animation mới: chỉ `transform`/`opacity`.
- `viewport={{ once: true }}` cho mọi `whileInView` — không re-trigger khi cuộn qua lại.
- Chart chỉ mount khi vào viewport, không render ngay từ đầu nếu nằm dưới fold.
- Ảnh mới: Cloudinary `f_auto,q_auto` + `loading="lazy"` (convention đã có từ trước).

## Screenshot — project nào có, project nào không

### Có thể chụp tự động (đã làm)
- **5 project có `liveUrl` thật**: Job Finder, Dola Bakery, Web Form Automation, Book Shop OutSystems, Bakery Management System — chụp trực tiếp từ URL live.
- **SwiftBid** (frontend React, `Multi-threat-project/swiftbid-frontend/`): chạy `npm start` local để chụp — chỉ chụp được phần UI không cần backend (login/landing).

### Không tự động chụp (setup quá phức tạp — cần Docker/Flutter/.NET/API key riêng)
- **AgriLink** — cần Docker Compose (Postgres) + .env đầy đủ.
- **BrandHub** — microservices, cần Docker Compose 7 service + Postgres/Mongo/Redis/RabbitMQ.
- **Yarnia** — backend .NET cần MongoDB + JWT/AWS S3/PayOS keys.
- **WeatherTracking** — Flutter + Firebase project riêng, không phải web app.

Nếu muốn có ảnh đẹp cho 4 dự án này, cách nhanh nhất: tự chụp màn hình tay khi chạy local (bạn đã có sẵn môi trường dev), rồi gửi ảnh để tôi upload Cloudinary + gắn vào `data.js`.

### 12 project còn lại
Giữ nguyên ảnh hiện có trong `data.js` (không có source code local rõ ràng để tự động chụp).

## Data model mới trong `data.js`

### Project entry mở rộng (field mới, không phá field cũ)
```js
{
  // ...các field cũ giữ nguyên (id, title, role, duration, image, description, techStack, githubUrl, liveUrl, status)...
  category: "Full-Stack" | "Frontend" | "Automation" | "Low-Code",
  highlights: ["...", "..."],   // 2-4 điểm nổi bật
  challenge: "...",             // vấn đề dự án giải quyết
  screenshots: [img1, img2],    // gallery ảnh — [] nếu không chụp được
}
```

### Skill taxonomy (mảng mới)
```js
export const skillTaxonomy = [
  { id: "react", label: "React", category: "Frontend", proficiency: 85, projectIds: [1, 5, 11] },
  // ...
];
```
`proficiency` (0-100) suy luận từ số lượng/độ sâu project dùng skill đó — **bạn nên tự tinh chỉnh lại con số này sau nếu muốn chính xác hơn theo cảm nhận thật của bạn**.

## Checklist tiến độ

- [x] Phần 1 — Mở rộng data model (`category`, `highlights`, `challenge`, `screenshots`) cho toàn bộ 18 project + UI hiển thị ở `ProjectDetail.jsx` và badge category ở `Projects.jsx`
- [x] Phần 2 — Skill taxonomy (14 kỹ năng) + Recharts bar chart tương tác, click filter theo skill ở `/projects`
- [x] Phần 3 — Screenshot tự động: **4/5** liveUrl chụp thành công (Job Finder, Dola Bakery, Web Form Automation, Bakery Management System). Book Shop OutSystems liveUrl redirect về trang chủ marketing OutSystems (không vào được app thật) — bỏ qua, giữ ảnh cũ. SwiftBid không chụp (theo quyết định ban đầu, cần chạy local phức tạp hơn dự kiến, ROI thấp)
- [x] Phần 4 — Motion polish: parallax nhẹ cho hero image ở `ProjectDetail.jsx` (transform-only, tôn trọng prefers-reduced-motion), gallery screenshot stagger reveal khi vào viewport

## Kết quả thực tế khác với dự kiến ban đầu

- **Book Shop OutSystems**: `liveUrl` hiện có trỏ tới trang marketing OutSystems.com (có cookie banner), không phải app thật — có thể link đã hết hạn hoặc cần đăng nhập trước. Không sửa `liveUrl` (không muốn đoán URL đúng), chỉ bỏ qua screenshot cho project này.
- **Dola Bakery live demo**: nền tảng Sapo theme-demo chèn 1 thanh toolbar preview cố định phía trên — đã xử lý bằng cách clip ảnh chụp (crop 56px trên cùng) thay vì ẩn qua CSS (selector CSS không khớp được).
- **Bakery Management System**: URL Vercel hiển thị nội dung trùng với Dola Bakery — có thể 2 project chia sẻ cùng codebase demo hoặc alias domain. Ảnh vẫn hợp lý về mặt chủ đề (cùng bakery), đã dùng.

## Việc cần bạn làm sau khi tôi hoàn thành

- Xác nhận/sửa lại nội dung `highlights`/`challenge` tôi viết dựa trên `techStack`/`description` có sẵn — tôi không bịa số liệu kết quả cụ thể, chỉ mô tả định tính.
- Tinh chỉnh `proficiency` trong `skillTaxonomy` nếu muốn phản ánh đúng hơn.
- Nếu muốn ảnh đẹp cho AgriLink/BrandHub/Yarnia/WeatherTracking: tự chụp màn hình rồi gửi, tôi upload + gắn vào data.
