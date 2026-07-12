-- Kịch bản này sẽ tạo CSDL, 4 bảng chính, và các chỉ mục (Indexes)
-- Sử dụng InnoDB để hỗ trợ Transaction và Foreign Keys
-- Sử dụng utf8mb4 để hỗ trợ đầy đủ Unicode

-- ----------
-- BƯỚC 1: TẠO CSDL VÀ SỬ DỤNG NÓ
-- ----------
DROP DATABASE IF EXISTS swiftbid_db;
CREATE DATABASE swiftbid_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
USE swiftbid_db;

-- ----------
-- BƯỚC 2: TẠO BẢNG
-- ----------

-- Bảng 1: Người dùng
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Lưu mật khẩu đã được băm (hashed)',
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE users
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry TIMESTAMP NULL;

-- Bảng 2: Sản phẩm
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seller_id BIGINT NOT NULL COMMENT 'Khóa ngoại tới users(id)',
    name VARCHAR(255) NOT NULL,
    description TEXT,
    initial_price DECIMAL(19, 4) NOT NULL COMMENT 'Giá khởi điểm',
    image_url VARCHAR(1024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (seller_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 3: Phiên đấu giá (Bảng cốt lõi)
CREATE TABLE auctions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL COMMENT 'Khóa ngoại tới products(id)',
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    
    current_highest_bid_amount DECIMAL(19, 4) NOT NULL COMMENT 'Giá cao nhất hiện tại',
    current_highest_bidder_id BIGINT NULL COMMENT 'Khóa ngoại tới users(id)',
    
    status ENUM('PENDING', 'ACTIVE', 'ENDED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    
    version INT NOT NULL DEFAULT 0 COMMENT 'Dành cho Optimistic Locking của JPA',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ràng buộc: Một sản phẩm chỉ có thể được đấu giá trong 1 phiên duy nhất
    UNIQUE KEY uk_product_id (product_id), 
    
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (current_highest_bidder_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng 4: Lịch sử Đặt giá
CREATE TABLE bids (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    auction_id BIGINT NOT NULL COMMENT 'Khóa ngoại tới auctions(id)',
    user_id BIGINT NOT NULL COMMENT 'Khóa ngoại tới users(id)',
    bid_amount DECIMAL(19, 4) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (auction_id) REFERENCES auctions(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------
-- BƯỚC 3: TẠO CHỈ MỤC (INDEXES) ĐỂ TĂNG HIỆU SUẤT
-- ----------

-- Tăng tốc độ tìm kiếm các phiên đấu giá đang 'ACTIVE'
CREATE INDEX idx_auctions_status ON auctions(status);

-- Tăng tốc độ tìm kiếm các phiên đấu giá sắp kết thúc (cho Scheduled Job)
CREATE INDEX idx_auctions_end_time ON auctions(end_time);

-- Tăng tốc độ lấy lịch sử đặt giá cho một phiên đấu giá cụ thể
CREATE INDEX idx_bids_auction_id ON bids(auction_id);

-- TTăng tốc độ tìm tất cả các phiên đặt giá của một người dùng
CREATE INDEX idx_bids_user_id ON bids(user_id);




-- Script tạo bảng cho Spring Session JDBC trên MySQL
CREATE TABLE SPRING_SESSION (
    PRIMARY_ID CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),
    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);

CREATE TABLE SPRING_SESSION_ATTRIBUTES (
    SESSION_PRIMARY_ID CHAR(36) NOT NULL,
    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES BLOB NOT NULL,
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;



CREATE TABLE user_details (
    -- Khóa chính này CŨNG LÀ khóa ngoại
    user_id BIGINT PRIMARY KEY, 
    
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    address TEXT,
    
    -- Trường này sẽ lưu URL từ Cloudinary
    avatar_url VARCHAR(512), 
    
    CONSTRAINT fk_user_details_user
        FOREIGN KEY (user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE -- Nếu User bị xóa, UserDetail cũng bị xóa
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


USE swiftbid_db;

CREATE TABLE auction_details (
    -- Khóa chính này CŨNG LÀ khóa ngoại trỏ tới auctions(id)
    auction_id BIGINT PRIMARY KEY, 
    
    -- Mô tả về phiên đấu giá (khác với mô tả sản phẩm)
    auction_description TEXT, 
    
    -- Đối tượng mục tiêu (ví dụ: "Nhà sưu tầm", "Doanh nghiệp",...)
    target_audience VARCHAR(255), 
    
    -- Các điều khoản & điều kiện bổ sung
    additional_terms TEXT,
    
    -- Trường này sẽ lưu URL banner từ Cloudinary
    banner_image_url VARCHAR(512), 
    
    CONSTRAINT fk_auction_details_auction
        FOREIGN KEY (auction_id) 
        REFERENCES auctions(id)
        ON DELETE CASCADE -- Nếu Auction bị xóa, Detail cũng bị xóa
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


USE swiftbid_db;

-- 1. Xóa cột 'role' ENUM cũ khỏi bảng users (NẾU CÓ)
-- (Bỏ qua nếu bạn chưa tạo cột này)
-- ALTER TABLE users DROP COLUMN role;

-- 2. Tạo bảng 'roles' (MỚI)
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT 'Tên vai trò: ADMIN, SELLER, USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tạo bảng 'user_roles' (Bảng trung gian N-N)
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Thêm dữ liệu vai trò (QUAN TRỌNG)
INSERT INTO roles (name) VALUES ('ADMIN'); -- ID 1
INSERT INTO roles (name) VALUES ('SELLER'); -- ID 2
INSERT INTO roles (name) VALUES ('USER');   -- ID 3




USE swiftbid_db;

-- Dữ liệu mẫu cho bảng chi tiết phiên đấu giá
-- (Giả định rằng bạn đã có các phiên đấu giá với ID 1, 2, và 3)

INSERT INTO auction_details (
    auction_id, 
    auction_description, 
    target_audience, 
    additional_terms, 
    banner_image_url
) 
VALUES 
(
    1, -- Tương ứng với Auction 1 (Đang hoạt động - Máy ảnh Sony)
    'Phiên đấu giá đặc biệt cho máy ảnh Sony A7 III. Đây là cơ hội hiếm có để sở hữu thiết bị chuyên nghiệp với giá khởi điểm hấp dẫn. Máy còn như mới, fullbox.',
    'Nhiếp ảnh gia chuyên nghiệp, Người sáng tạo nội dung, YouTubers',
    'Người thắng cuộc phải thanh toán trong vòng 24 giờ. Miễn phí vận chuyển toàn quốc. Hàng không được hoàn trả sau khi đã xác nhận.',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1678886400/auction_banners/sony_a7iii_banner.jpg'
),
(
    2, -- Tương ứng với Auction 2 (Sắp diễn ra - Laptop Dell)
    'Siêu phẩm Laptop Dell XPS 15 sắp lên sàn! Cấu hình mạnh mẽ cho lập trình viên và designer. Đừng bỏ lỡ phiên đấu giá vào ngày mai.',
    'Lập trình viên, Designer đồ họa, Doanh nhân',
    'Sản phẩm còn bảo hành chính hãng 6 tháng. Vui lòng kiểm tra kỹ thông số kỹ thuật trước khi đặt giá.',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1678886500/auction_banners/dell_xps15_banner.jpg'
),
(
    3, -- Tương ứng với Auction 3 (Đã kết thúc - Bàn phím Filco)
    'Phiên đấu giá cho bàn phím cơ Filco Majestouch 2 đã kết thúc. Cảm ơn sự tham gia của mọi người.',
    'Người yêu bàn phím cơ (Mech Keys Enthusiast), Game thủ',
    'Phiên đấu giá đã kết thúc. Sản phẩm đã được bàn giao cho người thắng cuộc.',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1678886600/auction_banners/filco_keyboard_banner.jpg'
);

ALTER TABLE user_details ADD COLUMN balance DECIMAL(19,4) DEFAULT 0;





USE swiftbid_db;

INSERT INTO products (
    seller_id, 
    name, 
    description, 
    initial_price, 
    image_url
) VALUES 
(
    7, 
    'Đồng hồ cơ Omega Seamaster 300', 
    'Phiên bản kỷ niệm, hộp số 42mm, chống nước 300m, dây thép không gỉ. Tình trạng 9/10.', 
    150000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Macbook Pro M3 Max 2024', 
    'Cấu hình mạnh nhất, RAM 36GB, SSD 1TB. Thiết bị hoàn hảo cho lập trình và thiết kế đồ họa.', 
    65000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Bức tranh sơn dầu "Hoàng Hôn Biển"', 
    'Tác phẩm độc bản của họa sĩ Nguyễn Văn A, kích thước 100x70cm, phong cách hiện đại ấn tượng.', 
    15000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Chai rượu vang đỏ Lafite Rothschild 2010', 
    'Dòng vang cao cấp từ Bordeaux, Pháp. Bảo quản trong điều kiện lý tưởng. Phù hợp cho nhà sưu tầm.', 
    95000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Điện thoại iPhone 15 Pro Max 512GB', 
    'Bản Quốc tế, tình trạng hoàn hảo 99%, đã dán bảo vệ màn hình và camera. Màu Titan Tự Nhiên.', 
    25000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Ghế gaming Herman Miller Aeron', 
    'Ghế công thái học cao cấp, size B, màu Carbon. Lưới thoáng khí, phù hợp cho làm việc lâu dài.', 
    32000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Máy ảnh Sony A7R V (Body Only)', 
    'Độ phân giải 61MP, chống rung 8 bước. Máy chỉ mới chụp 500 shots. Lựa chọn tuyệt vời cho studio.', 
    68000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Xe đạp đua Carbon Specialized Tarmac', 
    'Khung carbon FACT 10r, Group set Shimano Ultegra. Kích thước 54cm. Trọng lượng nhẹ.', 
    45000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Cặp vé VIP xem concert BlackPink 2026', 
    'Vị trí sát sân khấu (Hàng A1, ghế 5-6). Cặp vé hiếm, chỉ dành cho fan hâm mộ chân chính.', 
    18000000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
),
(
    7, 
    'Bộ sách "Tư Duy Nhanh và Chậm" (Bản giới hạn)', 
    'Bộ sách triết lý kinh doanh kinh điển, bìa cứng, có chữ ký của tác giả. Tình trạng mới 100%.', 
    500000.00, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUVpPrtYPeLXYcOI6CuBLXqbUJb2To2_8JJA&s'
);