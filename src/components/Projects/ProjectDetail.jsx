import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCalendarAlt, 
  FaUser, 
  FaTags, 
  FaArrowLeft, 
  FaRocket, 
  FaArrowRight, 
  FaBookOpen, 
  FaGraduationCap,
  FaChevronRight,
  FaHome,
  FaInfoCircle,
  FaImages,
  FaCogs,
  FaUsers,
  FaSearch,
  FaQrcode,
  FaEnvelope,
  FaBell,
  FaShareAlt,
  FaBalanceScale,
  FaServer,
  FaProjectDiagram,
  FaCheckCircle,
  FaTimes,
  FaUserTie,
  FaLaptopCode,
  FaCode,
  FaAward,
  FaLightbulb,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import TechIcon from '../../common/TechIcon';

const STATUS_COLORS = {
  'Active':         { bg: '#c8e6cd', color: '#000000' },
  'In Development': { bg: '#dceeb1', color: '#000000' },
  'Completed':      { bg: '#e6e6e6', color: '#000000' },
};

const STATUS_KEY = { 'Active': 'active', 'In Development': 'inDevelopment', 'Completed': 'completed' };

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const PROJECT_MILESTONE_MAP = {
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
  }
};

const BRANDHUB_METRICS = [
  { value: "07", labelVi: "Microservices & Modules", labelEn: "Microservices & Modules", subVi: "Độc lập phân tán", subEn: "Distributed Services" },
  { value: "32", labelVi: "Tuần phát triển (16 Sprints)", labelEn: "Weeks (16 Agile Sprints)", subVi: "Quy trình FSoft chuẩn", subEn: "Standard Agile / Scrum" },
  { value: "430+", labelVi: "Tasks Jira hoàn thành", labelEn: "Completed Jira Tasks", subVi: "Spec → Plan → Code → Test", subEn: "Spec → Plan → Code → Test" },
  { value: "05", labelVi: "Mạng xã hội tích hợp", labelEn: "Social Platforms Synced", subVi: "FB, TikTok, Insta, Threads, Zalo", subEn: "FB, TikTok, Insta, Threads, Zalo" },
  { value: "0%", labelVi: "Tỷ lệ mất tin nhắn (DLQ)", labelEn: "Publishing Loss Rate", subVi: "RabbitMQ Retry lũy thừa", subEn: "Exponential Backoff DLQ" }
];

const BRANDHUB_MICROSERVICES = [
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

const BRANDHUB_TEAM_ROLES = [
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

const BIENSOVIP_SPECS = [
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

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { projects, posts = [] } = useTranslatedData();
  const project = projects.find(p => String(p.id) === id);
  const milestoneData = project ? PROJECT_MILESTONE_MAP[project.id] : null;

  const [selectedImage, setSelectedImage] = useState(null);

  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroSpring = { stiffness: 200, damping: 30 };
  const heroImgY = useSpring(useTransform(heroScroll, [0, 1], [0, prefersReducedMotion ? 0 : 60]), heroSpring);

  // Determine back navigation destination
  const fromServices = location.state?.from === 'services' || document.referrer?.includes('/dich-vu');

  const relatedPosts = (posts || []).filter(pItem => {
    if (!project) return false;
    if (project.id === 26 && pItem.slug?.includes('biensovip')) return true;
    if (project.id === 14 && pItem.slug?.includes('brandhub')) return true;
    if (pItem.relatedProjectId && String(pItem.relatedProjectId) === String(project.id)) return true;
    const itemTags = pItem.tags || [];
    const projTechs = (project.tags || []).concat(project.technologies || []).concat(project.techStack || []);
    return itemTags.some(t => projTechs.some(pt => pt.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(pt.toLowerCase())));
  });

  // Dynamic SEO for Project Detail
  useEffect(() => {
    if (project) {
      const pageTitle = `${project.title} — ${isEn ? "Detailed Architecture & Interactive Dossier" : "Chi Tiết Dự Án & Hồ Sơ Kỹ Thuật"} | Lê Trí Trung`;
      document.title = pageTitle;

      const desc = project.description || (isEn ? "Production software system architecture and case study by Le Tri Trung" : "Hồ sơ kỹ thuật và kiến trúc hệ thống thực tế bởi Lê Trí Trung");
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', pageTitle);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
      if (project.image) {
        const ogImg = document.querySelector('meta[property="og:image"]');
        if (ogImg) ogImg.setAttribute('content', project.image);
      }

      // Breadcrumb JSON-LD Structured Data
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": isEn ? "Home" : "Trang Chủ",
            "item": "https://trung2605.github.io/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": fromServices ? (isEn ? "Services" : "Dịch Vụ") : (isEn ? "Projects" : "Dự Án"),
            "item": fromServices ? "https://trung2605.github.io/dich-vu" : "https://trung2605.github.io/projects"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `https://trung2605.github.io/projects/${project.id}`
          }
        ]
      };

      let script = document.getElementById('project-breadcrumb-jsonld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'project-breadcrumb-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(breadcrumbData);

      return () => {
        const existingScript = document.getElementById('project-breadcrumb-jsonld');
        if (existingScript) existingScript.remove();
      };
    }
  }, [project, isEn, fromServices]);

  if (!project) {
    return (
      <div style={{ paddingTop: '64px', paddingBottom: '96px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#888888', marginBottom: '24px' }}>{t('projects.notFound')}</p>
        <button
          onClick={() => navigate('/projects')}
          style={{ padding: '10px 24px', borderRadius: '50px', border: '1.5px solid #000000', background: '#000000', color: '#fff', cursor: 'pointer', fontSize: '15px' }}
        >
          {t('projects.backToProjects')}
        </button>
      </div>
    );
  }

  const status = STATUS_COLORS[project.status] || { bg: '#f7f7f5', color: '#000000' };
  const accentColor = BLOCK_COLORS[(project.id - 1) % BLOCK_COLORS.length];
  const isBrandHub = Number(project.id) === 14;
  const isBienSoVip = Number(project.id) === 26;

  // Authentic Image Gallery with Functional Purpose Titles (KHÔNG ĐẶT TÊN CHUNG CHUNG)
  let galleryItems = [];
  if (isBienSoVip) {
    galleryItems = [
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
  } else if (isBrandHub) {
    galleryItems = [
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
  } else if (project.screenshots && project.screenshots.length > 0) {
    galleryItems = project.screenshots.map((src, i) => ({
      src,
      titleVi: `${project.title} — Module chức năng chi tiết #${i + 1}`,
      titleEn: `${project.title} — Functional Module View #${i + 1}`,
      tag: `VIEW #${i + 1}`
    }));
  }

  return (
    <div style={{ paddingTop: '28px', paddingBottom: '96px', maxWidth: '1160px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>

      {/* 1. PROFESSIONAL BREADCRUMB & BACK ACTION */}
      <motion.nav 
        aria-label="Breadcrumb"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
          padding: '12px 18px',
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
        }}
      >
        <ol style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, gap: '8px', flexWrap: 'wrap' }}>
          <li style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Link 
              to="/" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              <FaHome size={12} />
              <span>{isEn ? "Home" : "Trang chủ"}</span>
            </Link>
          </li>

          <li style={{ color: '#94a3b8', fontSize: '11px', display: 'flex', alignItems: 'center' }}>
            <FaChevronRight size={9} />
          </li>

          {fromServices ? (
            <li style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Link 
                to="/dich-vu" 
                style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >
                {isEn ? "Services" : "Dịch vụ"}
              </Link>
            </li>
          ) : (
            <li style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Link 
                to="/projects" 
                style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >
                {isEn ? "Projects" : "Dự án"}
              </Link>
            </li>
          )}

          <li style={{ color: '#94a3b8', fontSize: '11px', display: 'flex', alignItems: 'center' }}>
            <FaChevronRight size={9} />
          </li>

          <li style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span 
              aria-current="page"
              style={{ 
                fontSize: '13px', 
                color: '#0f172a', 
                fontWeight: 650, 
                maxWidth: '280px', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap' 
              }}
            >
              {project.title}
            </span>
          </li>
        </ol>

        {/* Quick return button */}
        <button
          onClick={() => fromServices ? navigate('/dich-vu#case-study') : navigate('/projects')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '50px',
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            fontSize: '12.5px',
            fontWeight: 550,
            color: '#334155',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0f172a'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#0f172a'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#334155'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <FaArrowLeft size={10} />
          <span>{fromServices ? (isEn ? "Back to Services" : "Về Trang Dịch Vụ") : (isEn ? "Back to Projects" : "Về Danh Sách Dự Án")}</span>
        </button>
      </motion.nav>

      {/* 2. HERO MEDIA & TITLE HEADER */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0f172a',
          marginBottom: '28px',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(20px, 4vw, 36px)',
          boxShadow: '0 12px 36px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '115%', 
            objectFit: 'cover', 
            y: heroImgY, 
            filter: 'brightness(0.55)' 
          }}
        />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(15, 23, 42, 0.2) 100%)',
        }} />

        {/* Top Badges */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span style={{
            padding: '4px 12px', borderRadius: '50px',
            fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.4px', textTransform: 'uppercase',
            backgroundColor: status.bg, color: status.color,
            fontWeight: 700,
          }}>
            {STATUS_KEY[project.status] ? t(`projects.statuses.${STATUS_KEY[project.status]}`) : project.status}
          </span>

          {isBrandHub && (
            <span style={{
              padding: '4px 12px', borderRadius: '50px',
              fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
              backgroundColor: '#6366f1', color: '#ffffff',
              fontWeight: 700, textTransform: 'uppercase',
            }}>
              Capstone Platform • 5 Devs
            </span>
          )}

          {isBienSoVip && (
            <span style={{
              padding: '4px 12px', borderRadius: '50px',
              fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
              backgroundColor: '#10b981', color: '#ffffff',
              fontWeight: 700, textTransform: 'uppercase',
            }}>
              Enterprise Client • Live Production
            </span>
          )}
        </div>

        {/* Project Title & Summary */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <h1 style={{
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
            fontSize: 'clamp(24px, 4vw, 42px)',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 10px 0',
          }}>
            {project.title}
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#cbd5e1',
            margin: 0,
            lineHeight: 1.55,
          }}>
            {isBrandHub 
              ? (isEn ? "Omnichannel brand content management platform powered by 7 microservices, RabbitMQ async queuing, and Python FastAPI RAG intelligence." : "Hệ thống quản trị và phân phối nội dung đa kênh tự động gồm 7 microservices, hàng đợi RabbitMQ chống mất tin và AI sinh bài chuẩn SEO.")
              : isBienSoVip
              ? (isEn ? "Production e-commerce marketplace handling thousands of high-value plates with sub-8ms GIN queries and 0% transaction fee auto VietQR settlement." : "Sàn thương mại điện tử chuyên biệt quản lý hàng chục nghìn biển số xe giá trị lớn, tìm kiếm đa chiều <8ms và đối soát cọc VietQR 0đ phí.")
              : project.role}
          </p>
        </div>

        {/* Accent line at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: accentColor }} />
      </motion.div>

      {/* 3. SEAMLESS IN-PAGE QUICK NAVIGATION BAR */}
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '36px',
          borderBottom: '1px solid #e2e8f0',
          scrollbarWidth: 'none',
          position: 'sticky',
          top: '20px',
          zIndex: 30,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          paddingTop: '8px',
          paddingLeft: '4px',
          paddingRight: '4px',
        }}
      >
        <button
          onClick={() => document.getElementById('section-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '50px',
            fontSize: '13.5px',
            fontWeight: 600,
            border: '1.5px solid #0f172a',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          <FaInfoCircle size={13} style={{ color: '#dceeb1' }} />
          <span>{isEn ? "1. Overview & Problem" : "1. Tổng Quan & Bài Toán"}</span>
        </button>

        <button
          onClick={() => document.getElementById('section-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '50px',
            fontSize: '13.5px',
            fontWeight: 600,
            border: '1.5px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <FaImages size={13} style={{ color: '#6366f1' }} />
          <span>{isEn ? "2. Real UI & Experience" : "2. Hình Ảnh & Giao Diện"}</span>
        </button>

        <button
          onClick={() => document.getElementById('section-architecture')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '50px',
            fontSize: '13.5px',
            fontWeight: 600,
            border: '1.5px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
        >
          <FaCogs size={13} style={{ color: '#059669' }} />
          <span>{isEn ? "3. Architecture & Solutions" : "3. Kiến Trúc & Giải Pháp"}</span>
        </button>

        {isBrandHub && (
          <button
            onClick={() => document.getElementById('section-team')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '50px',
              fontSize: '13.5px',
              fontWeight: 600,
              border: '1.5px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.borderColor = '#94a3b8'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
          >
            <FaUsers size={13} style={{ color: '#7c3aed' }} />
            <span>{isEn ? "4. 5-Engineer Team" : "4. Đội Ngũ 5 Kỹ Sư"}</span>
          </button>
        )}
      </div>

      {/* 4. FULL CONTINUOUS PRODUCTION DOSSIER (KHÔNG CHIA TRANG / TAB ẨN) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>

        {/* SECTION 1: TỔNG QUAN & BÀI TOÁN KINH DOANH */}
        <section id="section-overview" style={{ scrollMarginTop: '90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaInfoCircle size={18} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#0284c7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Phần 1 • System Overview & Context
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                {isEn ? "Overview & Business Problem" : "Tổng Quan & Bài Toán Nghiệp Vụ"}
              </h2>
            </div>
          </div>

          <div 
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '32px', alignItems: 'start' }}
            className="project-detail-grid"
          >
            {/* Left Content: PROBLEM SOLVING & BUSINESS VALUE FIRST */}
            <div>
              {/* 1. BÀI TOÁN THỰC TẾ & THÁCH THỨC CẦN GIẢI QUYẾT (ĐƯA LÊN ĐẦU TIÊN) */}
              {project.challenge && (
                <div style={{ 
                  backgroundColor: '#fffbeb', 
                  borderRadius: '20px', 
                  border: '1.5px solid #fde68a', 
                  padding: '26px', 
                  marginBottom: '24px',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FaExclamationTriangle size={13} />
                    </div>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '11.5px',
                      letterSpacing: '0.6px', textTransform: 'uppercase',
                      color: '#b45309', fontWeight: 800,
                    }}>
                      {isEn ? "1. Real-World Business Problem & Challenge" : "1. Bài Toán Nghiệp Vụ & Thách Thức Cần Giải Quyết"}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#78350f', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                    {isEn ? "The actual bottleneck requiring custom software engineering:" : "Nút thắt thực tế trong vận hành đòi hỏi phải xây dựng giải pháp phần mềm:"}
                  </h4>
                  <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#92400e', margin: 0, fontWeight: 450 }}>
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* 2. KẾT QUẢ ĐẠT ĐƯỢC & GIẢI PHÁP ĐÃ GIẢI QUYẾT (HIGHLIGHTS THỰC TIỄN) */}
              {project.highlights && project.highlights.length > 0 && (
                <div style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '20px', 
                  border: '1.5px solid #e2e8f0', 
                  padding: '28px', 
                  marginBottom: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FaLightbulb size={14} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {isEn ? "2. Practical Solutions Delivered & Key Milestones" : "2. Giải Pháp Đã Hiện Thực & Giá Trị Thực Tế Đạt Được"}
                    </h3>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {project.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14.5px', lineHeight: '1.65', color: '#334155' }}>
                        <FaCheckCircle style={{ color: '#10b981', flexShrink: 0, marginTop: '3px' }} size={16} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. BỐI CẢNH & PHẠM VI XÂY DỰNG CHI TIẾT */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '28px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 650, color: '#0f172a', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaInfoCircle style={{ color: '#2563eb' }} size={16} />
                  <span>{isEn ? "3. System Scope & Engineering Context" : "3. Bối Cảnh Hệ Thống & Phạm Vi Thực Hiện"}</span>
                </h3>
                <div style={{ fontSize: '15px', lineHeight: '1.75', color: '#475569' }}>
                  <ReactMarkdown>{project.description}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Right Meta Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Role & Scope */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', textTransform: 'uppercase', color: '#64748b', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaUser size={10} /> {t('projects.role')}
                </p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                  {project.role}
                </p>
              </div>

              {/* Timeline */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', border: '1px solid #e2e8f0', padding: '20px' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', textTransform: 'uppercase', color: '#64748b', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaCalendarAlt size={10} /> {t('projects.timeline')}
                </p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: 0 }}>
                  {project.duration}
                </p>
              </div>

              {/* Links Action Card */}
              <div style={{ backgroundColor: '#0f172a', borderRadius: '18px', padding: '22px', color: '#ffffff' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', textTransform: 'uppercase', color: '#94a3b8', margin: '0 0 14px 0' }}>
                  {isEn ? "Direct Access" : "Truy Cập Nhanh"}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '11px 18px', borderRadius: '50px', backgroundColor: '#10b981', color: '#ffffff',
                        fontSize: '13.5px', fontWeight: 600, textDecoration: 'none',
                      }}
                    >
                      <span>{isEn ? "Open Live Site" : "Trải Nghiệm Hệ Thống Thật"}</span>
                      <FaExternalLinkAlt size={11} />
                    </a>
                  )}

                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: '11px 18px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff',
                        fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <FaGithub size={14} />
                      <span>{isEn ? "View Source Code" : "Xem Mã Nguồn GitHub"}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Milestone Box */}
              {milestoneData && (
                <div style={{
                  backgroundColor: milestoneData.bg,
                  borderRadius: '18px',
                  padding: '20px',
                  border: `1px solid ${milestoneData.border}`,
                }}>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', fontWeight: '700',
                    letterSpacing: '0.5px', textTransform: 'uppercase', color: milestoneData.color,
                    margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <FaGraduationCap size={13} /> {isEn ? "Verified Milestone" : "Cột Mốc Kỹ Thuật Đã Xác Thực"}
                  </p>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                    {isEn ? milestoneData.titleEn : milestoneData.titleVi}
                  </h4>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 12px 0' }}>
                    {isEn ? milestoneData.roleEn : milestoneData.roleVi}
                  </p>
                  <Link
                    to={`/achievements?tab=education&milestone=${milestoneData.milestoneId}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '12px', fontWeight: '600', color: milestoneData.color, textDecoration: 'none',
                    }}
                  >
                    <span>{isEn ? "View Milestone Dossier" : "Xem Chi Tiết Cột Mốc"}</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: HÌNH ẢNH & GIAO DIỆN THỰC TẾ (GALLERY ĐẦY ĐỦ CÓ TÊN CHỨC NĂNG CHUẨN) */}
        <section id="section-gallery" style={{ scrollMarginTop: '90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaImages size={18} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Phần 2 • Verified User Experience & Modules
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                {isEn ? "Production Screenshots & Functional Interfaces" : "Hình Ảnh & Giao Diện Chức Năng Thực Tế"}
              </h2>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px' }}>
            <p style={{ fontSize: '14.5px', color: '#64748b', margin: '0 0 24px 0' }}>
              {isEn 
                ? "Every screenshot showcases live functional workflows. Click any image to open high-definition inspection mode." 
                : "Tất cả ảnh minh chứng giao diện chức năng đang hoạt động thực tế. Nhấp vào bất kỳ ảnh nào để phóng to chi tiết độ nét cao."}
            </p>

            {galleryItems.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
                {galleryItems.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImage(item.src)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'; }}
                  >
                    <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                      <img 
                        src={item.src} 
                        alt={isEn ? item.titleEn : item.titleVi} 
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <div style={{ padding: '14px 16px', backgroundColor: '#ffffff', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
                      <div>
                        {item.tag && (
                          <span style={{ 
                            display: 'inline-block',
                            fontSize: '10.5px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontWeight: 700,
                            color: '#6366f1',
                            backgroundColor: '#eef2ff',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            marginBottom: '6px'
                          }}>
                            {item.tag}
                          </span>
                        )}
                        <h4 style={{ fontSize: '13.5px', fontWeight: 650, color: '#0f172a', margin: 0, lineHeight: 1.45 }}>
                          {isEn ? item.titleEn : item.titleVi}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '4px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#2563eb', fontWeight: 700 }}>
                          {isEn ? "ZOOM HD ↗" : "PHÓNG TO HD ↗"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                <p>{isEn ? "No screenshots currently uploaded for this repository." : "Chưa có hình ảnh bổ sung cho dự án này."}</p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: KIẾN TRÚC & GIẢI PHÁP KỸ THUẬT */}
        <section id="section-architecture" style={{ scrollMarginTop: '90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCogs size={18} />
            </div>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Phần 3 • Technical Architecture & Blueprint
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                {isEn ? "Architecture & Technical Solutions" : "Kiến Trúc & Giải Pháp Kỹ Thuật"}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Tech Stack Chips Card */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <FaTags style={{ color: '#2563eb' }} size={16} />
                <h3 style={{ fontSize: '18px', fontWeight: 650, color: '#0f172a', margin: 0 }}>
                  {isEn ? "Core Technology Ecosystem" : "Hệ Sinh Thái Công Nghệ Sử Dụng"}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '8px 18px', borderRadius: '50px',
                      fontSize: '13.5px', fontWeight: 500,
                      color: '#0f172a', backgroundColor: '#f8fafc',
                      border: '1px solid #cbd5e1',
                    }}
                  >
                    <TechIcon tech={tech} size={14} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* BRANDHUB 7 MICROSERVICES BLUEPRINT */}
            {isBrandHub && (
              <>
                {/* Telemetry banner */}
                <div style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px',
                  backgroundColor: '#0f172a', borderRadius: '20px', padding: '24px', color: '#ffffff'
                }}>
                  {BRANDHUB_METRICS.map((met, mIdx) => (
                    <div key={mIdx} style={{ textAlign: 'center', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '26px', fontWeight: 700, color: '#dceeb1' }}>{met.value}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#f8fafc', marginTop: '4px' }}>{isEn ? met.labelEn : met.labelVi}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{isEn ? met.subEn : met.subVi}</div>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '50px',
                      fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', backgroundColor: '#eef2ff', color: '#6366f1', fontWeight: 700
                    }}>
                      <FaProjectDiagram size={11} />
                      {isEn ? "7 INDEPENDENT CLOUD-NATIVE MICROSERVICES" : "KIẾN TRÚC 7 MICROSERVICES ĐỘC LẬP"}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 650, color: '#0f172a', margin: '10px 0 6px 0' }}>
                      {isEn ? "Domain Separation: Java Spring Boot, Python FastAPI & RabbitMQ" : "Phân Tách Domain Rõ Ràng: Java Spring Boot, Python FastAPI & RabbitMQ"}
                    </h3>
                    <p style={{ fontSize: '14.5px', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                      {isEn 
                        ? "Engineered with strict microservices patterns: API Gateway routes and protects with JWT + Redis, Java handles resilient message queueing, and Python powers semantic RAG."
                        : "Kiến trúc chuẩn doanh nghiệp: Spring Cloud Gateway phân luồng và bảo mật qua JWT + Redis, Publisher xử lý hàng đợi RabbitMQ chống mất tin, và FastAPI xử lý tìm kiếm ngữ nghĩa RAG."}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {BRANDHUB_MICROSERVICES.map(srv => (
                      <div key={srv.id} style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{srv.name}</span>
                        </div>
                        <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#6366f1', marginBottom: '10px', fontWeight: 600 }}>{srv.tag}</div>
                        <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '50px', backgroundColor: '#e2e8f0', color: '#334155', fontSize: '11.5px', marginBottom: '10px', fontWeight: 500 }}>{srv.tech}</div>
                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{isEn ? srv.descEn : srv.descVi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* BIENSOVIP 7 PRODUCTION SPECS & FEATURES */}
            {isBienSoVip && (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px' }}>
                <div style={{ marginBottom: '22px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '50px',
                    fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700
                  }}>
                    <FaCheckCircle size={11} />
                    {isEn ? "7 CORE PRODUCTION CAPABILITIES" : "7 NĂNG LỰC SẢN XUẤT THỰC CHIẾN ĐƯỢC CHỨNG MINH"}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 650, color: '#0f172a', margin: '10px 0 6px 0' }}>
                    {isEn ? "Architectural Innovations Powering Biensovip.com" : "Các Đổi Mới Kỹ Thuật Đang Vận Hành Trực Tiếp Tại Biensovip.com"}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  {BIENSOVIP_SPECS.map((spec, sIdx) => {
                    const SpecIcon = spec.icon;
                    return (
                      <div key={sIdx} style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', gap: '14px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <SpecIcon size={16} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '14.5px', fontWeight: 650, color: '#0f172a', margin: '0 0 6px 0' }}>
                            {isEn ? spec.titleEn : spec.titleVi}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                            {isEn ? spec.descEn : spec.descVi}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: 5-ENGINEER MATRIX (ONLY FOR BRANDHUB) */}
        {isBrandHub && (
          <section id="section-team" style={{ scrollMarginTop: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#faf5ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaUsers size={18} />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Phần 4 • Engineering Ownership & FPT Bench Matrix
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {isEn ? "5-Engineer FPT Bench Matrix" : "Ma Trận Phân Công & Trách Nhiệm 5 Kỹ Sư FPT"}
                </h2>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px' }}>
              <p style={{ fontSize: '14.5px', color: '#475569', margin: '0 0 24px 0', lineHeight: 1.6 }}>
                {isEn 
                  ? "100% created and delivered by our 5-engineer bench across 16 rigorous Agile sprints. Each component was owned end-to-end by dedicated engineers."
                  : "100% thành quả tự chủ của nhóm 5 kỹ sư chính quy qua 16 sprint kiểm thử khắt khe. Mỗi module được một kỹ sư chuyên trách kiến trúc và hiện thực hoá."}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {BRANDHUB_TEAM_ROLES.map((mem, rIdx) => (
                  <div key={rIdx} style={{ padding: '22px', borderRadius: '18px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <div style={{ 
                        width: '42px', height: '42px', borderRadius: '12px', 
                        backgroundColor: mem.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', flexShrink: 0 
                      }}>
                        {mem.avatarIcon === 'FaUserTie' ? <FaUserTie size={17} /> : mem.avatarIcon === 'FaLaptopCode' ? <FaLaptopCode size={17} /> : mem.avatarIcon === 'FaCode' ? <FaCode size={17} /> : mem.avatarIcon === 'FaAward' ? <FaAward size={17} /> : <FaServer size={17} />}
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#6366f1', fontWeight: 650, textTransform: 'uppercase' }}>
                          {isEn ? mem.roleEn : mem.roleVi}
                        </span>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '2px 0 0 0' }}>
                          {mem.name}
                        </h4>
                      </div>
                    </div>

                    <ul style={{ margin: '0 0 16px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                      {(isEn ? mem.contributionsEn : mem.contributionsVi).map((item, iIdx) => (
                        <li key={iIdx} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                          <FaCheckCircle style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} size={13} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '14px', borderTop: '1px solid #e2e8f0' }}>
                      {mem.tech.map((t, tIdx) => (
                        <span key={tIdx} style={{ padding: '3px 10px', borderRadius: '50px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#475569' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 5. RELATED ENGINEERING DEEP-DIVES FROM BLOG */}
      {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '48px',
            padding: '28px 32px',
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <FaBookOpen style={{ color: '#6d3fc9' }} size={16} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>
              {isEn ? "Engineering Deep-Dives & Architecture" : "Phân Tích Kiến Trúc Kỹ Thuật (Blog Chuyên Sâu)"}
            </span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 650, color: '#0f172a', margin: '0 0 16px 0' }}>
            {isEn ? "Read the engineering case studies behind this project:" : "Đọc các bài viết phân tích chuyên sâu về hệ thống này:"}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {relatedPosts.map(pItem => (
              <Link
                key={pItem.slug}
                to={`/blog/${pItem.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '18px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6d3fc9'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(109,63,201,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {pItem.tags?.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', padding: '2px 8px', borderRadius: '50px', backgroundColor: '#ede5fb', color: '#6d3fc9' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {pItem.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 14px 0', lineHeight: '1.5' }}>
                    {pItem.excerpt ? `${pItem.excerpt.slice(0, 110)}...` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: '#6d3fc9', marginTop: 'auto' }}>
                  <span>{isEn ? "Read Article" : "Đọc Bài Viết"}</span>
                  <FaArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* 6. CALL-TO-ACTION BANNER TO SERVICES & CONTACT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: '40px',
          padding: '36px',
          borderRadius: '24px',
          backgroundColor: '#111827',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#dceeb1' }}>
          <FaRocket size={11} /> {isEn ? "Need a similar high-performance system?" : "Cần xây dựng hệ thống website / SaaS tương tự?"}
        </div>
        <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 650, margin: 0, lineHeight: '1.3' }}>
          {isEn
            ? "Looking to build a production-grade web or SaaS platform with proven scalability?"
            : "Bạn muốn sở hữu một hệ thống website / SaaS thương mại với độ hoàn thiện cao tương tự?"}
        </h3>
        <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0, maxWidth: '720px', lineHeight: '1.6' }}>
          {isEn
            ? "Our 5-engineer team in Da Nang specializes in high-performance web systems, SaaS automation, and VietQR integration. Direct 1-on-1 collaboration with Tech Lead Lê Trí Trung."
            : "Đội ngũ 5 kỹ sư tại Đà Nẵng chuyên xây dựng Website thương mại, SaaS Automation và cổng VietQR tự động. Làm việc trực tiếp 1-1 với Tech Lead Lê Trí Trung, cam kết deadline và chất lượng production."}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
          <Link
            to="/dich-vu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: '#6d3fc9', color: '#ffffff',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span>{isEn ? "View Services & Manday Pricing" : "Xem Dịch Vụ & Báo Giá Manday"}</span>
            <FaArrowRight size={12} />
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
              fontSize: '14px', fontWeight: '500', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          >
            <span>{isEn ? "Direct 1-on-1 Consultation" : "Đặt Lịch Tư Vấn 1-1"}</span>
          </Link>
        </div>
      </motion.div>

      {/* 7. OTHER PROJECTS */}
      <OtherProjects current={project} />

      {/* LIGHTBOX MODAL FOR SCREENSHOTS */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '1100px', width: '100%', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Screenshot Zoom" 
              style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '12px' }} 
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute', top: '-14px', right: '-14px',
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: '#ffffff', border: 'none', color: '#0f172a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <FaTimes size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const OtherProjects = ({ current }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { projects } = useTranslatedData();
  const others = projects.filter(p => p.id !== current.id).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid #e6e6e6' }}
    >
      <p style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        color: '#888888', marginBottom: '28px',
      }}>
        {t('projects.otherProjects')}
      </p>
      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {others.map((p) => {
          const s = STATUS_COLORS[p.status] || { bg: '#f7f7f5', color: '#000000' };
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/projects/${p.id}`)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '4px', backgroundColor: BLOCK_COLORS[(p.id - 1) % BLOCK_COLORS.length] }} />
              <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '50px',
                  fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                  backgroundColor: s.bg, marginBottom: '8px', width: 'fit-content'
                }}>
                  {STATUS_KEY[p.status] ? t(`projects.statuses.${STATUS_KEY[p.status]}`) : p.status}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#000000', margin: '0 0 14px 0', lineHeight: 1.4 }}>{p.title}</h3>
                
                {/* Quick Connect Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dich-vu');
                    }}
                    style={{
                      padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      color: '#6d3fc9', backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#6d3fc9'; e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f3e8ff'; e.currentTarget.style.color = '#6d3fc9'; }}
                  >
                    Dịch Vụ
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/contact');
                    }}
                    style={{
                      padding: '5px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      color: '#0369a1', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0284c7'; e.currentTarget.style.color = '#ffffff'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#e0f2fe'; e.currentTarget.style.color = '#0369a1'; }}
                  >
                    Liên Hệ
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
