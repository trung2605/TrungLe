import { 
  FaSearch, 
  FaQrcode, 
  FaEnvelope, 
  FaBell, 
  FaShareAlt, 
  FaBalanceScale, 
  FaUsers 
} from 'react-icons/fa';

export const STATUS_COLORS = {
  'Active':         { bg: '#c8e6cd', color: '#000000' },
  'In Development': { bg: '#dceeb1', color: '#000000' },
  'Completed':      { bg: '#e6e6e6', color: '#000000' },
};

export const STATUS_KEY = { 
  'Active': 'active', 
  'In Development': 'inDevelopment', 
  'Completed': 'completed' 
};

export const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

export const PROJECT_MILESTONE_MAP = {
  26: {
    milestoneId: 1,
    titleVi: "Đội Ngũ Kỹ Sư Đà Nẵng (Khởi Nghiệp Đa Công Nghệ)",
    titleEn: "Da Nang Engineering Team (Multi-Tech Startup)",
    roleVi: "Tech Lead & Kỹ Sư Trưởng",
    roleEn: "Tech Lead & Chief Engineer",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0"
  },
  14: {
    milestoneId: 3,
    titleVi: "Đại học FPT Đà Nẵng (Capstone Project Khóa 19)",
    titleEn: "FPT University Da Nang (Graduation Capstone)",
    roleVi: "Tech Lead & Solutions Architect (Team 5 Kỹ sư)",
    roleEn: "Tech Lead & Solutions Architect (5-Engineer Team)",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe"
  },
  24: {
    milestoneId: 3,
    titleVi: "Đại học FPT Đà Nẵng (AI Research)",
    titleEn: "FPT University Da Nang (AI Research)",
    roleVi: "Cử nhân KHMT & Quán Quân Hackathon 2026",
    roleEn: "CS Student & Hackathon Champion 2026",
    color: "#7c3aed",
    bg: "#faf5ff",
    border: "#ddd6fe"
  },
  5: {
    milestoneId: 2,
    titleVi: "FPT Software (FSoft Đà Nẵng)",
    titleEn: "FPT Software (FSoft Da Nang)",
    roleVi: "Thực tập sinh Software Developer (OJT)",
    roleEn: "Software Developer Intern (OJT)",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a"
  },
  25: {
    milestoneId: 3,
    titleVi: "Đại học FPT Đà Nẵng",
    titleEn: "FPT University Da Nang",
    roleVi: "Dự án khách hàng thực tế (Team 6 devs)",
    roleEn: "Client Web Project (6-dev team)",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe"
  },
  3: {
    milestoneId: 4,
    titleVi: "Trao Đổi Quốc Tế & Hoạt Động Xã Hội",
    titleEn: "Global Exchange & Community Leadership",
    roleVi: "Sáng lập The Dreamers Organization",
    roleEn: "Founder of The Dreamers Organization",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0"
  },
  28: {
    milestoneId: 1,
    titleVi: "Khởi Nghiệp EdTech & Sản Phẩm Số",
    titleEn: "EdTech Startup & Digital Products",
    roleVi: "Backend Architect & Trưởng nhóm",
    roleEn: "Backend Architect & Team Lead",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc"
  },
  29: {
    milestoneId: 3,
    titleVi: "Đại học FPT Đà Nẵng (Mobile & Cloud IoT)",
    titleEn: "FPT University Da Nang (Mobile & Cloud IoT)",
    roleVi: "Full-Stack & Mobile Developer",
    roleEn: "Full-Stack & Mobile Developer",
    color: "#0284c7",
    bg: "#f0f9ff",
    border: "#bae6fd"
  }
};

export const BRANDHUB_METRICS = [
  { value: "07", labelVi: "Microservices & Modules", labelEn: "Microservices & Modules", subVi: "Độc lập phân tán", subEn: "Distributed Services" },
  { value: "32", labelVi: "Tuần phát triển (16 Sprints)", labelEn: "Weeks (16 Agile Sprints)", subVi: "Quy trình FSoft chuẩn", subEn: "Standard Agile / Scrum" },
  { value: "430+", labelVi: "Tasks Jira hoàn thành", labelEn: "Completed Jira Tasks", subVi: "Spec → Plan → Code → Test", subEn: "Spec → Plan → Code → Test" },
  { value: "05", labelVi: "Mạng xã hội tích hợp", labelEn: "Social Platforms Synced", subVi: "FB, TikTok, Insta, Threads, Zalo", subEn: "FB, TikTok, Insta, Threads, Zalo" },
  { value: "0%", labelVi: "Tỷ lệ mất tin nhắn (DLQ)", labelEn: "Publishing Loss Rate", subVi: "RabbitMQ Retry lũy thừa", subEn: "Exponential Backoff DLQ" }
];

export const BRANDHUB_MICROSERVICES = [
  {
    id: "gateway",
    name: "brandhub-api-gateway",
    tag: "Port 8080 • Định Tuyến & Bảo Mật",
    tech: "Spring Cloud Gateway • WebFlux • JWT • Redis",
    descVi: "Cổng định tuyến tập trung, xác thực JWT phân tán, bảo vệ chống brute-force và Redis Rate Limiting.",
    descEn: "Unified entry gateway, distributed JWT authentication, brute-force protection & Redis rate limiting."
  },
  {
    id: "business",
    name: "brandhub-business-service",
    tag: "Port 8081 • Nghiệp Vụ Cốt Lõi",
    tech: "Java 21 • Spring Boot 3.3.5 • PostgreSQL • MongoDB",
    descVi: "Quản trị nghiệp vụ cốt lõi: Multi-tenant, phân quyền Agency/Brand/CTV, quy trình duyệt nội dung & thanh toán.",
    descEn: "Core domain logic: Multi-tenancy, Agency/Brand/Collaborator ACL, approval workflows & billing."
  },
  {
    id: "ai",
    name: "brandhub-ai-service",
    tag: "Port 8082 • AI & GraphRAG",
    tech: "Python FastAPI • ChromaDB • Neo4j • Groq Llama 3",
    descVi: "RAG học giọng điệu thương hiệu (Brand Voice), GraphRAG phân tích quan hệ KOL/Hashtag, sinh ảnh Stability AI.",
    descEn: "Brand voice RAG synthesis, Neo4j GraphRAG for KOL/trend detection, Stability AI visual generation."
  },
  {
    id: "publisher",
    name: "brandhub-publisher-service",
    tag: "Port 8083 • Xuất Bản Đa Kênh Async",
    tech: "Spring Boot 3 • RabbitMQ DLQ • Social Media APIs",
    descVi: "Tiêu thụ hàng đợi RabbitMQ, lập lịch tự động đăng bài lên Facebook, TikTok, Instagram, Threads, Zalo với DLQ retry.",
    descEn: "RabbitMQ consumer, auto-publishes to Facebook, TikTok, Instagram, Threads, Zalo with DLQ retries."
  },
  {
    id: "web",
    name: "brandhub-web-dashboard",
    tag: "Port 5173 / 3000 • Web App",
    tech: "React 18 • TypeScript • Vite • Tailwind CSS",
    descVi: "Dashboard điều khiển tập trung, quản lý chiến dịch, Kanban phê duyệt bài viết, lịch đăng bài trực quan.",
    descEn: "Unified admin portal, campaign manager, Kanban content approval board & visual calendar scheduler."
  },
  {
    id: "mobile",
    name: "brandhub-mobile-app",
    tag: "iOS & Android Companion",
    tech: "React Native • Expo • Push Notifications",
    descVi: "Ứng dụng di động đồng bộ thời gian thực, duyệt bài viết nhanh, nhận thông báo tiến độ chiến dịch tức thời.",
    descEn: "Real-time companion app for instant content approvals and push notifications on mobile."
  },
  {
    id: "infra",
    name: "brandhub-infrastructure",
    tag: "DevOps & Cụm Cloud",
    tech: "Docker Compose • AWS EC2 • GitHub Actions • Nginx",
    descVi: "Toàn bộ cụm container điều phối qua Docker Compose, CI/CD tự động kiểm thử và deploy lên AWS EC2.",
    descEn: "Full container cluster orchestrated via Docker Compose, automated CI/CD and AWS EC2 deployment."
  }
];

export const BRANDHUB_TEAM_ROLES = [
  {
    name: "Lê Trí Trung",
    roleVi: "Tech Lead & Solutions Architect",
    roleEn: "Tech Lead & Solutions Architect",
    avatarIcon: "FaUserTie",
    contributionsVi: [
      "Kiến trúc tổng thể hệ thống 7 Microservices & điều phối sprint Agile/Scrum",
      "Xây dựng Spring Cloud Gateway (WebFlux, JWT token, Redis rate-limiting)",
      "Thiết kế hàng đợi RabbitMQ Dead Letter Queue (DLQ) retry lũy thừa chống mất tin nhắn 100%",
      "Cụm hạ tầng Docker Compose & cấu hình triển khai AWS EC2 production"
    ],
    contributionsEn: [
      "Overall 7-microservice architecture & Agile/Scrum sprint coordination",
      "Spring Cloud Gateway engineering (WebFlux, JWT, Redis rate limiting)",
      "RabbitMQ DLQ with exponential backoff retry ensuring 100% zero message loss",
      "Docker Compose cluster orchestration & AWS EC2 production deployment"
    ],
    tech: ["Spring Cloud Gateway", "RabbitMQ DLQ", "Docker Compose", "AWS EC2", "Java 21"],
    color: "#dceeb1"
  },
  {
    name: "Hà Văn Ân",
    roleVi: "Fullstack & AI Integration Engineer",
    roleEn: "Fullstack & AI Integration Engineer",
    avatarIcon: "FaLaptopCode",
    contributionsVi: [
      "Phát triển AI Microservice bằng Python FastAPI độc lập phục vụ sinh nội dung",
      "Tích hợp RAG Pipeline học ngữ điệu thương hiệu (Brand Voice) qua LangChain",
      "Kết nối LLM Groq (Llama 3 siêu tốc) và cơ chế Fallback an toàn sang Claude",
      "Xây dựng các module giao diện Web Dashboard bằng React 18, TypeScript & Vite"
    ],
    contributionsEn: [
      "Python FastAPI AI microservice engineering for automated content generation",
      "RAG pipeline with LangChain to capture and synthesize brand voice",
      "Dual LLM engine: Groq (Llama 3 high-throughput) with Claude fallback",
      "React 18 + TypeScript + Vite web dashboard module implementation"
    ],
    tech: ["Python FastAPI", "LangChain", "Groq Llama 3", "React 18", "TypeScript"],
    color: "#c5b0f4"
  },
  {
    name: "Nguyễn Thành Lộc",
    roleVi: "AI Team Lead & Data Pipelines",
    roleEn: "AI Team Lead & Data Pipelines",
    avatarIcon: "FaCode",
    contributionsVi: [
      "Trưởng nhóm AI dự án BrandHub, thiết kế pipeline tìm kiếm ngữ nghĩa RAG",
      "Xây dựng kiến trúc GraphRAG: Kết hợp ChromaDB (semantic search) + Neo4j (đồ thị quan hệ KOL/Brand/Hashtag)",
      "Thiết kế thuật toán phân tích xu hướng (Trend Detection) đa chiều",
      "Pipeline cào và tiền xử lý dữ liệu mạng xã hội quy mô lớn"
    ],
    contributionsEn: [
      "BrandHub AI Team Lead, architected semantic RAG retrieval pipelines",
      "GraphRAG architecture: ChromaDB (semantic vector) + Neo4j (KOL/Brand/Hashtag multi-hop graph)",
      "Multidimensional trend detection algorithm engineering",
      "Large-scale social data ingestion, crawling, and preprocessing pipelines"
    ],
    tech: ["GraphRAG", "Neo4j", "ChromaDB", "FastAPI", "Python", "Data Crawling"],
    color: "#f4ecd6"
  },
  {
    name: "Nguyễn Minh Tuấn",
    roleVi: "Backend Systems & Analytics Engineer",
    roleEn: "Backend Systems & Analytics Engineer",
    avatarIcon: "FaAward",
    contributionsVi: [
      "Kiến trúc Polyglot Persistence: PostgreSQL (giao dịch ACID, billing) + MongoDB (schema bài đăng linh hoạt)",
      "Thiết kế database schema tối ưu hóa phân quyền đa cấp Multi-tenant (Agency/Brand/CTV)",
      "Xây dựng Analytics Dashboard bóc tách KPI hiệu suất chiến dịch theo thời gian thực",
      "Module trích xuất báo cáo chuyên sâu định dạng Excel/PDF tự động"
    ],
    contributionsEn: [
      "Polyglot Persistence: PostgreSQL (ACID billing transactions) + MongoDB (dynamic social post schemas)",
      "Multi-tenant schema design for Agency, Enterprise, Brand, and Collaborator tiers",
      "Real-time campaign KPI analytics and reporting dashboard backend",
      "Automated enterprise Excel/PDF report generation engine"
    ],
    tech: ["PostgreSQL", "MongoDB", "Spring Boot 3", "Multi-tenant", "PDF/Excel Engine"],
    color: "#c8e6cd"
  },
  {
    name: "Nguyễn Chơn Phước",
    roleVi: "Java Backend & DevOps / Real-time Engineer",
    roleEn: "Java Backend & DevOps / Real-time Engineer",
    avatarIcon: "FaServer",
    contributionsVi: [
      "Xây dựng Publisher Service tích hợp API xuất bản 5 nền tảng: Facebook, TikTok, Instagram, Threads, Zalo",
      "Tích hợp Socket.IO và WebSockets cập nhật trạng thái đăng bài thời gian thực lên Dashboard",
      "Thiết lập CI/CD pipeline tự động hóa với GitHub Actions kiểm thử & build Docker",
      "Giám sát cụm server, cảnh báo tức thời qua Telegram Bot và cấu hình Nginx Reverse Proxy"
    ],
    contributionsEn: [
      "Publisher Service integrating social APIs: Facebook, TikTok, Instagram, Threads, Zalo",
      "Socket.IO & WebSockets for real-time publishing status telemetry to dashboard",
      "Automated CI/CD pipeline using GitHub Actions for testing and containerization",
      "Server cluster monitoring, Telegram Bot automated alerts & Nginx reverse proxy"
    ],
    tech: ["Spring Boot 3", "Socket.IO", "Social APIs", "GitHub Actions", "Nginx", "Telegram Bot"],
    color: "#efd4d4"
  }
];

export const BIENSOVIP_SPECS = [
  {
    icon: FaSearch,
    titleVi: "Lọc đa tiêu chí dưới 8ms (PostgreSQL GIN Index)",
    titleEn: "Sub-8ms Multi-filter Query (PostgreSQL GIN Index)",
    descVi: "Tìm kiếm tức thời giữa hàng chục nghìn biển số theo định dạng ngũ quý, sảnh tiến, lộc phát và dải giá, phản hồi dưới 8ms không giật lag.",
    descEn: "Instant search across tens of thousands of plates by lucky numbers and price ranges with sub-8ms response."
  },
  {
    icon: FaQrcode,
    titleVi: "Cổng cọc VietQR tự động & Khóa độc bản",
    titleEn: "Automated VietQR Deposit & Concurrency Lock",
    descVi: "Khớp lệnh cọc qua Webhook ngân hàng dưới 0.5s với 0đ phí cổng trung gian. Khóa phân tán Redis 15 phút triệt tiêu 100% rủi ro bán trùng.",
    descEn: "Matches deposits in <0.5s via bank webhook with 0% fee. 15-minute Redis distributed lock prevents concurrent double deposits."
  },
  {
    icon: FaEnvelope,
    titleVi: "Soạn Email Marketing Kéo-Thả (UC27)",
    titleEn: "Drag & Drop Email Builder (UC27)",
    descVi: "Trình thiết kế email trực quan, kết nối Gmail/SMTP doanh nghiệp với 0đ phí phát sinh, tự động gửi hóa đơn và biên lai điện tử.",
    descEn: "Visual drag & drop email designer connected to private SMTP at zero recurring cost, auto-sending receipts."
  },
  {
    icon: FaBell,
    titleVi: "Thông báo biển mới theo nhu cầu & Broadcast",
    titleEn: "Smart Match Alerts & 1-Click Broadcast",
    descVi: "Tự động gửi email/Zalo thông báo khi có biển số đúng yêu cầu của khách; cho phép admin phát thông báo ưu đãi xả kho 1-click.",
    descEn: "Instant push notification when matching inventory arrives; 1-click bulk campaign broadcasts."
  },
  {
    icon: FaShareAlt,
    titleVi: "Nhúng Video TikTok/Reels & Sinh ảnh Mockup AI",
    titleEn: "Social Video Embeds & Batch Mockup Generator",
    descVi: "Gán video thực tế sản phẩm từ TikTok/Reels tăng uy tín, kèm công cụ 1-click sinh hàng loạt ảnh mockup sản phẩm chuẩn kích thước MXH.",
    descEn: "Embeds authentic short videos with 1-click batch rendering of multi-ratio social media cards."
  },
  {
    icon: FaBalanceScale,
    titleVi: "Phong thủy 4 trụ & Ma trận so sánh đa biển",
    titleEn: "4-Pillar Numerology & Side-by-Side Comparison",
    descVi: "Công cụ chấm điểm hợp mệnh theo ngũ hành và ngày sinh; ma trận đối chiếu 3 biển số song song giúp tăng 35% tỷ lệ chốt cọc.",
    descEn: "Interactive numerology affinity score plus side-by-side spec comparison matrix lifting conversion by 35%."
  },
  {
    icon: FaUsers,
    titleVi: "Cổng Mạng Lưới 14 Cộng Tác Viên (CTV)",
    titleEn: "Affiliate Portal with 14 Live Brokers",
    descVi: "Cấp link UTM định danh riêng, ví hoa hồng tự động ghi nhận khi khách cọc và quy trình duyệt lệnh rút tiền minh bạch 1-click.",
    descEn: "Unique UTM referral attribution, automated wallet commission ledger, and 1-click payout verification."
  }
];

export const BIENSOVIP_GALLERY = [
  {
    src: "/docs/images/biensovip_home_real.png",
    titleVi: "Trang Chủ Biensovip & Cổng Tìm Kiếm Biển Số Siêu Tốc <8ms",
    titleEn: "Biensovip Portal & Sub-8ms Fast License Plate Search",
    tag: "MARKETPLACE PORTAL"
  },
  {
    src: "/docs/images/biensovip_real_dashboard.png",
    titleVi: "Admin Dashboard: Telemetry 150 Biển Đã Bán & Tỷ Lệ Chốt Cọc 33.3%",
    titleEn: "Admin Dashboard: 150 Sold Plates & 33.3% Conversion Rate",
    tag: "ANALYTICS & METRICS"
  },
  {
    src: "/docs/images/biensovip_real_plates.png",
    titleVi: "Quản Trị Kho Biển Số (26 Trang): Phân Loại & Sinh Ảnh Mockup Hàng Loạt",
    titleEn: "Plate Inventory Manager (26 Pages): Multi-Filter & Batch Mockups",
    tag: "INVENTORY MGMT"
  },
  {
    src: "/docs/images/biensovip_real_ctv.png",
    titleVi: "Cổng Quản Trị 14 Cộng Tác Viên (CTV) & Cấp Link UTM Định Danh",
    titleEn: "Affiliate Portal: 14 Brokers & Unique UTM Referral Tracking",
    tag: "AFFILIATE SYSTEM"
  },
  {
    src: "/docs/images/biensovip_real_audit.png",
    titleVi: "Nhật Ký Hệ Thống Bất Biến (Audit Trail) & Giám Sát Rủi Ro PCI-DSS",
    titleEn: "Immutable Audit Log Trail & Security Risk Monitoring",
    tag: "SECURITY & AUDIT"
  },
  {
    src: "/docs/images/biensovip_real_fengshui.png",
    titleVi: "Bộ Công Cụ Quản Trị Phong Thủy 4 Trụ & Chấm Điểm Hợp Mệnh Ngũ Hành",
    titleEn: "4-Pillar Feng Shui Rules Engine & Affinity Scoring Module",
    tag: "FENG SHUI ENGINE"
  },
  {
    src: "/docs/images/biensovip_real_comparison.png",
    titleVi: "Phân Tích 96 Phiên So Sánh Đa Biển & 6.380 Lượt Tìm Kiếm Người Dùng",
    titleEn: "Multi-Plate Comparison Analytics & 6,380 Search Queries",
    tag: "SEARCH INTELLIGENCE"
  }
];

export const BRANDHUB_GALLERY = [
  {
    src: "/docs/images/DA-D19-01.png",
    titleVi: "Dashboard Quản Trị Chiến Dịch & Telemetry Đa Kênh Thời Gian Thực",
    titleEn: "Campaign Command Dashboard & Real-time Multichannel Telemetry",
    tag: "COMMAND CENTER"
  },
  {
    src: "/docs/images/DA-D19-02.png",
    titleVi: "Báo Cáo Hiệu Suất Chiến Dịch & Biểu Đồ Tăng Trưởng Chỉ Số Tương Tác",
    titleEn: "Campaign Analytics & Multi-channel Engagement Growth Metrics",
    tag: "ANALYTICS"
  },
  {
    src: "/docs/images/DA-D19-03.png",
    titleVi: "Lập Lịch Xuất Bản Tự Động Đa Nền Tảng (FB, TikTok, IG, Threads, Zalo)",
    titleEn: "Automated Multichannel Calendar Publishing Scheduler",
    tag: "SCHEDULER"
  },
  {
    src: "/docs/images/DA-D19-04.png",
    titleVi: "Studio AI Sinh Bài Viết Theo Ngữ Điệu Thương Hiệu (Brand Voice RAG)",
    titleEn: "AI Content Generation Studio with Brand Voice RAG Context",
    tag: "AI STUDIO"
  },
  {
    src: "/docs/images/DA-D19-05.png",
    titleVi: "Kiến Trúc Hạ Tầng Cụm Microservices & Điều Phối Docker Container",
    titleEn: "Microservices Infrastructure Cluster & Container Orchestration",
    tag: "INFRASTRUCTURE"
  },
  {
    src: "/docs/images/DA-D19-06.png",
    titleVi: "Phân Quyền Tổ Chức Đa Cấp Multi-Tenant (Agency / Brand / CTV)",
    titleEn: "Multi-Tenant Access Control & Brand Organization Matrix",
    tag: "MULTI-TENANT"
  },
  {
    src: "/docs/images/DA-D19-07.png",
    titleVi: "Bảng Kanban Quản Lý Quy Trình Soạn Thảo & Duyệt Bài Đa Cấp",
    titleEn: "Kanban Board for Multi-tier Content Review & Approval Pipeline",
    tag: "KANBAN WORKFLOW"
  },
  {
    src: "/docs/images/DA-D19-08.png",
    titleVi: "Trình Soạn Thảo Đa Phương Tiện Chuẩn Hóa Khung Kích Thước Từng MXH",
    titleEn: "Rich Media Post Editor with Social Aspect-Ratio Presets",
    tag: "RICH EDITOR"
  },
  {
    src: "/docs/images/DA-D19-09.png",
    titleVi: "Trung Tâm Kết Nối & Xác Thực OAuth 5 Nền Tảng Mạng Xã Hội",
    titleEn: "OAuth Connection Center for 5 Integrated Social Networks",
    tag: "OAUTH INTEGRATION"
  },
  {
    src: "/docs/images/DA-D19-12.png",
    titleVi: "Bảng Giám Sát Hàng Đợi RabbitMQ Async & Cơ Chế Dead Letter Queue (DLQ)",
    titleEn: "RabbitMQ Async Queue Monitoring & Dead Letter Queue Handler",
    tag: "RABBITMQ MONITOR"
  }
];
