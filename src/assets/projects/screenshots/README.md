# Screenshot folders

Mỗi folder ứng với 1 project trong `src/data.js` (theo id). Thả ảnh screenshot vào đúng folder, đặt tên tự do (vd `01.png`, `02.png`...).

## Cách chụp

- **Có live URL thật** (Job Finder, Dola Bakery, Web Form Automation, Book Shop OutSystems, Bakery Management System): mở link trong `liveUrl` ở data.js, chụp trực tiếp.
- **Không có live URL, có source local**: cần bạn tự `npm start`/`flutter run`/... rồi chụp — nhiều project cần `.env`, DB, API key riêng không có sẵn trong repo, an toàn nhất là bạn tự chạy.
- **Không có source local rõ ràng hoặc quá phức tạp để tự động hoá** (AgriLink/BrandHub/Yarnia/WeatherTracking cần Docker/mobile emulator, ThreadLearn cần model+GPU): chụp tay hoặc dùng ảnh có sẵn.

## Sau khi có ảnh

Báo Claude "đã bỏ ảnh vào folder X" — sẽ import vào `data.js` thay `image: TikTokUIImage` placeholder bằng ảnh thật.
