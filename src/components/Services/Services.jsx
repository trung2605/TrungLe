import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaRocket, 
  FaFileContract, 
  FaReceipt, 
  FaArrowRight, 
  FaCommentDots, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaSearch, 
  FaRobot, 
  FaQrcode, 
  FaCogs, 
  FaChartLine, 
  FaSyncAlt, 
  FaStar,
  FaBolt,
  FaGraduationCap,
  FaUserTie,
  FaLaptopCode,
  FaCode,
  FaAward,
  FaServer,
  FaDownload,
  FaEnvelope,
  FaShareAlt,
  FaBalanceScale,
  FaUsers,
  FaClock,
  FaTag,
  FaLightbulb,
  FaProjectDiagram
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { 
  CostConcernSVG, 
  TrustConcernSVG, 
  TechComplexitySVG, 
  TaxConcernSVG,
  Step1ScopeSVG,
  Step2DesignSVG,
  Step3CodingSVG,
  Step4TestingSVG,
  Step5HandoverSVG
} from './ServiceSVGs';
import infographicTeam from '../../assets/landing/infographic_team.png';
import ServicesSubnav from '../ServicesSubnav/ServicesSubnav';
import './Services.scss';

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05
    }
  }
};

const cardPop = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const BIENSOVIP_SHOTS = [
  {
    titleVi: "Admin Dashboard: 150 biển đã bán, tỷ lệ chốt 33.3%",
    titleEn: "Live Admin Dashboard: 150 Sold, 33.3% Conversion Rate",
    url: "/docs/images/biensovip_real_dashboard.png"
  },
  {
    titleVi: "Quản trị Kho 26 trang: Lọc 8ms & Sinh ảnh AI",
    titleEn: "26-Page Inventory CMS: 8ms Query & AI Mockup Generator",
    url: "/docs/images/biensovip_real_plates.png"
  },
  {
    titleVi: "Cổng Mạng lưới CTV: 14 CTV & Mã UTM định danh",
    titleEn: "Affiliate Portal: 14 Live Agents & Unique UTM Tracking",
    url: "/docs/images/biensovip_real_ctv.png"
  },
  {
    titleVi: "Nhật ký Hệ thống Bất biến & Giám sát Rủi ro",
    titleEn: "Immutable Audit Log & Agent Risk Monitoring",
    url: "/docs/images/biensovip_real_audit.png"
  },
  {
    titleVi: "Công cụ Quản trị Phong thủy 4 trụ cột & Ngũ hành",
    titleEn: "4-Pillar Numerology & Elemental Admin Suite",
    url: "/docs/images/biensovip_real_fengshui.png"
  },
  {
    titleVi: "Phân tích 96 phiên So sánh Đa biển & 6.380 lượt tìm kiếm",
    titleEn: "Analytics: 96 Comparison Sessions & 6.380 Keyword Searches",
    url: "/docs/images/biensovip_real_comparison.png"
  },
  {
    titleVi: "Giao diện Sàn Biensovip.com: 3.240 biển số & Cổng cọc VietQR",
    titleEn: "Live Marketplace: 3,240 Plates & Real-time VietQR Flow",
    url: "/docs/images/biensovip_home_real.png"
  }
];

const BRANDHUB_SHOTS = [
  {
    titleVi: "Dashboard Quản trị: Chiến dịch Influencer & Telemetry thời gian thực",
    titleEn: "Core Dashboard: Influencer Campaigns & Real-time Task Telemetry",
    url: "/docs/images/DA-D19-01.png"
  },
  {
    titleVi: "Báo cáo Hiệu suất: Phân tích chỉ số chiến dịch & Giám sát tiến độ",
    titleEn: "Performance Analytics: Campaign KPIs & Asynchronous Workload Metrics",
    url: "/docs/images/DA-D19-02.png"
  },
  {
    titleVi: "Omnichannel Social Publisher: Không gian lập lịch đăng bài tự động đa kênh",
    titleEn: "Omnichannel Social Publisher: Scheduling & Multi-platform Publishing",
    url: "/docs/images/DA-D19-03.png"
  },
  {
    titleVi: "Pipeline AI Thông Minh: Sinh nội dung tự động đa định dạng với RAG Context",
    titleEn: "AI Content Automation: Context-aware Generation via Python FastAPI & RAG",
    url: "/docs/images/DA-D19-04.png"
  },
  {
    titleVi: "Kiến trúc Microservices: Spring Boot 3, RabbitMQ DLQ & Docker Cluster",
    titleEn: "Microservices Architecture: Spring Boot 3, RabbitMQ DLQ & Docker Infrastructure",
    url: "/docs/images/DA-D19-05.png"
  },
  {
    titleVi: "Phân quyền Tổ chức Đa cấp: Agency, Doanh nghiệp, Nhãn hàng & CTV",
    titleEn: "Multi-tenant Access Control: Agency, Enterprise & Brand Management",
    url: "/docs/images/DA-D19-06.png"
  },
  {
    titleVi: "Quy trình Phê duyệt Nội dung & Tương tác Cộng tác Trực quan",
    titleEn: "Collaborative Review & Approval Workflow Interface",
    url: "/docs/images/DA-D19-07.png"
  },
  {
    titleVi: "Trình chỉnh sửa nội dung đa kênh & Tối ưu hóa định dạng MXH",
    titleEn: "Multichannel Content Editor & Social Platform Auto-Formatting",
    url: "/docs/images/DA-D19-08.png"
  },
  {
    titleVi: "Quản lý Tài khoản MXH & OAuth đa nền tảng (Facebook, TikTok, Instagram, Threads, Zalo)",
    titleEn: "Connected Social Accounts & Unified Multi-Platform OAuth Gateway",
    url: "/docs/images/DA-D19-09.png"
  },
  {
    titleVi: "Bảng điều khiển tác vụ Asynchronous & Giám sát hàng đợi RabbitMQ",
    titleEn: "Async Task Management & RabbitMQ Queue Telemetry Dashboard",
    url: "/docs/images/DA-D19-12.png"
  }
];



const OTHER_TEAM_PROJECTS = [
  {
    id: "biensovip",
    title: "Biensovip.com",
    badgeVi: "Dự Án Doanh Nghiệp Khách Hàng",
    badgeEn: "Client Enterprise Project",
    leadVi: "Team 5 Kỹ sư triển khai bàn giao",
    leadEn: "Delivered by 5-Engineer Team",
    descVi: "Sàn thương mại điện tử chuyên biệt biển số xe: 3.240 biển số, lọc 8ms, cổng thanh toán VietQR tự động.",
    descEn: "High-performance e-commerce marketplace: 3,240 plates, 8ms query response, automated VietQR gateway.",
    tech: [".NET 8", "React 19", "VietQR", "PostgreSQL", "Tailwind"],
    linkUrl: "/projects/26"
  },
  {
    id: "stemgo",
    title: "STEMGO (stemgo.net)",
    badgeVi: "Dự Án EdTech AI Nhóm",
    badgeEn: "Team AI EdTech Platform",
    leadVi: "KS Hà Văn Ân (Full-stack & AI)",
    leadEn: "Eng. Ha Van An (Full-stack & AI)",
    descVi: "Nền tảng học lập trình gamified tích hợp AI Tutor Gemini, hỗ trợ giải thích code và phản hồi bài tập theo thời gian thực.",
    descEn: "Gamified coding platform with Gemini AI Tutor for real-time code debugging and interactive feedback.",
    tech: ["Next.js", "Gemini AI", "Node.js", "WebSockets", "MongoDB"],
    linkUrl: "https://stemgo.net",
    isExternal: true
  },
  {
    id: "uninest",
    title: "UniNest Platform",
    badgeVi: "Dự Án Nhà Trọ Sinh Viên",
    badgeEn: "Student Housing Platform",
    leadVi: "KS Nguyễn Thành Lộc (Team Lead)",
    leadEn: "Eng. Nguyen Thanh Loc (Team Lead)",
    descVi: "Nền tảng ghép phòng và kết nối sinh viên Đại học FPT: ASP.NET Core Clean Architecture, xác thực sinh viên và tìm kiếm thông minh.",
    descEn: "Student housing & roommate matching: ASP.NET Core Clean Architecture, verified student IDs & smart matching.",
    tech: ["ASP.NET Core", "C# Clean Arch", "PostgreSQL", "React", "Docker"],
    linkUrl: "#"
  },
  {
    id: "vivucar",
    title: "VivuCar Enterprise",
    badgeVi: "Dự Án Quản Trị Xe Du Lịch",
    badgeEn: "Car Rental & Analytics",
    leadVi: "KS Nguyễn Minh Tuấn (Team Lead)",
    leadEn: "Eng. Nguyen Minh Tuan (Team Lead)",
    descVi: "Hệ thống quản lý thuê xe & Dashboard báo cáo: Tích hợp Hive AI kiểm duyệt bằng lái, trích xuất báo cáo Excel/PDF tự động.",
    descEn: "Fleet management & reporting dashboard: Hive AI license verification, automated enterprise Excel/PDF export.",
    tech: [".NET 8", "EF Core", "Hive AI", "Excel/PDF Engine", "SQL Server"],
    linkUrl: "#"
  },
  {
    id: "vtry",
    title: "V-Try 3D Fitting",
    badgeVi: "Dự Án Computer Vision 3D",
    badgeEn: "3D Fitting Computer Vision",
    leadVi: "KS Nguyễn Chơn Phước (Full-stack)",
    leadEn: "Eng. Nguyen Chon Phuoc (Full-stack)",
    descVi: "Giao diện thử đồ 3D thế hệ mới: Kết hợp React/Next.js cùng MediaPipe AI ước lượng hình thể và dựng khung avatar 3D tương tác.",
    descEn: "Next-gen 3D virtual fitting room: React/Next.js with MediaPipe AI for 3D body mesh estimation.",
    tech: ["Next.js", "MediaPipe AI", "Three.js", "TypeScript", "FastAPI"],
    linkUrl: "#"
  }
];

const TEAM_MEMBERS = [
  {
    name: "Lê Trí Trung",
    roleVi: "Tech Lead & Solutions Architect",
    roleEn: "Tech Lead & Solutions Architect",
    highlightVi: "Chủ nhiệm kỹ thuật & Trực tiếp làm việc 1-1 với khách hàng",
    highlightEn: "Technical Lead & Direct 1-on-1 Client Engagement",
    eduVi: "Đại học FPT Đà Nẵng • Cựu Kỹ sư FPT Software",
    eduEn: "FPT University • Ex-FPT Software Engineer",
    achievementsVi: [
      "Quán quân Hackathon Computer Vision 2026 (FPT Education)",
      "Top 5 Nghiên cứu khoa học ResFes toàn quốc (Báo cáo ICTA 2026)",
      "Trực tiếp thiết kế & vận hành sàn Biensovip.com, The MC Hub, ThreadLearn"
    ],
    achievementsEn: [
      "Champion of Hackathon Computer Vision 2026 (FPT Education)",
      "Top 5 National Scientific Research ResFes (ICTA 2026 paper)",
      "Directly architected & operating Biensovip.com, The MC Hub, ThreadLearn"
    ],
    skills: [".NET 8", "Java Spring Boot", "React 19", "Python FastAPI", "VietQR", "PostgreSQL", "Redis"],
    cvUrl: "/Team_CV/CV_Le-Tri-Trung_Tech-Lead.pdf",
    color: "#dceeb1"
  },
  {
    name: "Hà Văn Ân",
    roleVi: "Full-stack & AI Integration Engineer",
    roleEn: "Full-stack & AI Integration Engineer",
    highlightVi: "Chuyên sâu Next.js App Router, Tích hợp AI DeepSeek/Gemini & RAG",
    highlightEn: "Next.js App Router, AI DeepSeek/Gemini Integration & RAG",
    eduVi: "Đại học FPT Đà Nẵng • Cựu Kỹ sư FPT Software",
    eduEn: "FPT University • Ex-FPT Software Intern",
    achievementsVi: [
      "Cựu kỹ sư FPT Software (Warehouse Inventory Systems & WebSockets)",
      "Tác giả nền tảng học tập STEMGO (stemgo.net) tích hợp AI Tutor Gemini",
      "Đồng tác giả nghiên cứu ThreadLearn: Fine-tuned LLM đạt tỷ lệ fix bug 73.3%"
    ],
    achievementsEn: [
      "Ex-FPT Software Intern (Warehouse Inventory Systems & WebSockets)",
      "Author of STEMGO (stemgo.net) gamified platform with Gemini AI Tutor",
      "Co-author of ThreadLearn AI research: 73.3% bug-fixing benchmark"
    ],
    skills: ["Next.js", "React", "Node.js", "Python FastAPI", "DeepSeek / Gemini", "Tailwind", "MongoDB"],
    cvUrl: "/Team_CV/CV_Ha-Van-An_Fullstack-AI.pdf",
    color: "#c5b0f4"
  },
  {
    name: "Nguyễn Thành Lộc",
    roleVi: "Backend .NET & AI Data Pipeline Engineer",
    roleEn: "Backend .NET & AI Data Pipeline Engineer",
    highlightVi: "Chuyên sâu ASP.NET Core Clean Architecture & Pipeline cào dữ liệu AI",
    highlightEn: "ASP.NET Core Clean Architecture & AI Data Ingestion Pipelines",
    eduVi: "Đại học FPT Đà Nẵng (GPA 3.5/4.0) • Cựu Kỹ sư FPT Software",
    eduEn: "FPT University (GPA 3.5/4.0) • Ex-FPT Software Intern",
    achievementsVi: [
      "AI Team Lead dự án BrandHub (Hệ thống AI Brand Intelligence & RAG pipeline)",
      "Team Lead UniNest (Nền tảng ghép phòng & sinh viên ASP.NET Core)",
      "Chứng chỉ chuyên môn AI Agents Using RAG and LangChain (Coursera 2026)"
    ],
    achievementsEn: [
      "AI Team Lead at BrandHub (AI-Driven Brand Intelligence & RAG pipeline)",
      "Team Lead at UniNest (Student Housing & Roommate ASP.NET Core platform)",
      "Coursera Certification: AI Agents Using RAG & LangChain (2026)"
    ],
    skills: ["ASP.NET Core", "C# Clean Arch", "FastAPI", "RAG LangChain", "Data Crawling", "PostgreSQL"],
    cvUrl: "/Team_CV/CV_Nguyen-Thanh-Loc_Backend-AI.pdf",
    color: "#f4ecd6"
  },
  {
    name: "Nguyễn Minh Tuấn",
    roleVi: "Backend .NET & Enterprise Systems Engineer",
    roleEn: "Backend .NET & Enterprise Systems Engineer",
    highlightVi: "Chứng chỉ Microsoft Professional • Core .NET 8 & Dashboard Báo Cáo",
    highlightEn: "Microsoft Certified Professional • Core .NET 8 & Analytics Dashboards",
    eduVi: "Đại học FPT Đà Nẵng • Cựu Kỹ sư FPT Software",
    eduEn: "FPT University • Ex-FPT Software Intern",
    achievementsVi: [
      "Chứng chỉ quốc tế: Microsoft Certified: Back-End Developer Professional (08/2026)",
      "Cựu kỹ sư FPT Software (Chuyển đổi hệ thống C# sang ASP.NET Core Web API + Vite)",
      "Team Lead dự án VivuCar (Dashboard xuất Excel/PDF, Voucher, Hive AI, API DVC BCA)"
    ],
    achievementsEn: [
      "International Cert: Microsoft Certified Back-End Developer Professional (2026)",
      "Ex-FPT Software Intern (Legacy C# migration to ASP.NET Core Web API + Vite)",
      "Team Lead of VivuCar (Excel/PDF Reporting Dashboard, Voucher, Hive AI, Gov APIs)"
    ],
    skills: [".NET 8", "EF Core", "SQL Server", "PostgreSQL", "Hive AI", "PDF/Excel Export", "Docker"],
    cvUrl: "/Team_CV/CV_Nguyen-Minh-Tuan_DotNet-Backend.pdf",
    color: "#c8e6cd"
  },
  {
    name: "Nguyễn Chơn Phước",
    roleVi: "Java Backend & DevOps / Real-time Engineer",
    roleEn: "Java Backend & DevOps / Real-time Engineer",
    highlightVi: "Chuyên sâu Java Spring Boot, Socket.IO Real-time & Hạ Tầng Uptime 24/7",
    highlightEn: "Java Spring Boot, Socket.IO Real-time & 24/7 Uptime Infrastructure",
    eduVi: "Đại học FPT Đà Nẵng • Finalist InnoCodeCamp FPT",
    eduEn: "FPT University • Finalist InnoCodeCamp FPT",
    achievementsVi: [
      "Cựu kỹ sư Acronic Solutions (Hệ thống giám sát Anti-DDoS, Socket.IO IPC, Nginx/Linux 24/7)",
      "Kỹ sư Full-stack Danatour (Java Spring Boot, JWT, tối ưu chỉ mục PostgreSQL)",
      "Dự án V-Try (Giao diện 3D React/Next.js kết hợp MediaPipe ước lượng hình thể AI)"
    ],
    achievementsEn: [
      "Ex-Acronic Solutions Intern (Anti-DDoS SPA Dashboard, Socket.IO IPC, Linux/Nginx 24/7)",
      "Full-stack Engineer at Danatour (Java Spring Boot, JWT, PostgreSQL indexing)",
      "V-Try 3D Virtual Fitting project (React/Next.js + MediaPipe Computer Vision)"
    ],
    skills: ["Java Spring Boot", "Socket.IO", "TypeScript", "Docker", "Linux / Nginx", "MediaPipe 3D"],
    cvUrl: "/Team_CV/CV_Nguyen-Chon-Phuoc_Java-DevOps.pdf",
    color: "#efd4d4"
  }
];


const SAAS_MODULES = [
  {
    id: "lead_funnel",
    category: "sales",
    num: "01",
    iconName: "FaCogs",
    metricVi: "Độ trễ < 30s",
    metricEn: "Latency < 30s",
    titleVi: "Phễu Thu Thập & Phân Luồng Lead Tức Thời",
    titleEn: "Instant Lead Funnel & Automated Routing",
    descVi: "Phân loại khách hàng theo độ nóng và bắn thông báo Telegram/Zalo trong 30s...",
    descEn: "Auto-routes hot leads to Telegram/Zalo in 30s for instant conversion...",
    specsVi: [
      "Webhook Zalo & Telegram Bot thời gian thực",
      "Gắn thẻ phân loại khách hàng tiềm năng tự động"
    ],
    specsEn: [
      "Real-time Telegram & Zalo Webhook bots",
      "Automated lead intent tagging and dispatch"
    ],
    techVi: "Webhook API • Telegram Bot",
    techEn: "Webhook API • Telegram Bot",
    image: "/docs/images/biensovip_admin_analytics.png",
    captionVi: "Phễu phân tích lead thực tế & định tuyến thông báo Telegram tức thì từ hệ thống Biensovip",
    captionEn: "Live lead attribution funnel & instant Telegram dispatch from Biensovip",
    painPointVi: "Khách hàng có ý định mua thường tham khảo nhiều nơi cùng lúc. Nếu phản hồi chậm quá 15 phút, tỷ lệ chốt giảm hơn 70%. Hệ thống này tự động phân tích cấp độ nóng của khách và đẩy thông báo thẳng về Telegram / Zalo của chủ shop trong dưới 30 giây để tiếp cận ngay khi khách còn đang trên trang.",
    painPointEn: "Potential buyers evaluate multiple options at once. Delays beyond 15 minutes drop deal closure rates by over 70%. This automated funnel scores lead intent and fires instant webhooks to Telegram/Zalo in under 30 seconds to engage prospects while they are still active on-site.",
    workflowVi: [
      { step: "01", title: "Khách tương tác trên website", desc: "Người mua bấm giữ cọc, yêu cầu tư vấn giá hoặc để lại thông tin liên hệ trên trang sản phẩm." },
      { step: "02", title: "Phân loại & Định tuyến tức thời", desc: "Hệ thống gắn thẻ độ nóng (Hỏi giá, Giữ cọc, Chốt gấp) và bắn Webhook bảo mật về Telegram/Zalo chủ shop." },
      { step: "03", title: "Tiếp cận & Chốt đơn trong 30s", desc: "Chủ shop mở thông báo có sẵn số điện thoại, nhu cầu cụ thể và lịch sử duyệt web để gọi điện chốt ngay." }
    ],
    workflowEn: [
      { step: "01", title: "Visitor Engagement", desc: "Customer reserves, requests price breakdown, or submits inquiry directly on the product page." },
      { step: "02", title: "Intent Scoring & Webhook Routing", desc: "Engine tags intent level (Price Inquiry, Reservation, Urgent) and fires secure webhooks to Telegram/Zalo." },
      { step: "03", title: "Immediate 30s Conversion", desc: "Merchant receives comprehensive dossier with phone number and browsing history to close deal instantly." }
    ]
  },
  {
    id: "vietqr_reconcile",
    category: "sales",
    num: "02",
    iconName: "FaQrcode",
    metricVi: "0% Phí cổng • Khớp cọc 0.5s",
    metricEn: "0% Fee • 0.5s Match",
    titleVi: "Thanh Toán & Đối Soát VietQR Động 0đ",
    titleEn: "Zero-Fee Dynamic VietQR Settlement",
    descVi: "Sinh VietQR động, webhook ngân hàng khớp cọc 0.5s với 0đ phí cổng trung gian...",
    descEn: "Dynamic VietQR with 0.5s bank webhook reconciliation and 0% gateway fees...",
    specsVi: [
      "Tiết kiệm 100% chi phí trung gian thanh toán",
      "Đối soát tự động không cần kiểm tra sao kê thủ công"
    ],
    specsEn: [
      "Eliminates 100% third-party gateway commissions",
      "Automated bank ledger match without manual audits"
    ],
    techVi: "VietQR API • Bank Webhook",
    techEn: "VietQR API • Bank Webhook",
    image: "/docs/images/biensovip_home_real.png",
    captionVi: "Cổng cọc VietQR động và luồng đối soát tự động không qua trung gian trên sàn Biensovip.com",
    captionEn: "Dynamic VietQR deposit checkout and zero-fee bank webhook reconciliation on Biensovip.com",
    painPointVi: "Sử dụng cổng thanh toán bên thứ ba vừa tốn 1.5% - 2.5% phí giao dịch, vừa bị giữ tiền đối soát 3-7 ngày. Nếu yêu cầu khách chuyển khoản thủ công thì nhân viên phải mở app ngân hàng dò từng dòng sao kê rất dễ sót. VietQR động giải quyết triệt để 2 vấn đề này với 0đ phí cổng.",
    painPointEn: "Third-party payment gateways charge 1.5% - 2.5% fees and hold payouts for 3-7 days. Manual bank transfers force employees to manually cross-check statements. Dynamic VietQR deposits directly to your bank account with zero gateway fee.",
    workflowVi: [
      { step: "01", title: "Sinh mã VietQR động chính xác", desc: "Khi khách bấm cọc, hệ thống sinh mã VietQR nhúng chuẩn xác số tiền và mã định danh đơn hàng duy nhất." },
      { step: "02", title: "Webhook ngân hàng khớp cọc 0.5s", desc: "Khách quét mã thanh toán bằng bất kỳ app ngân hàng nào, webhook báo có tức thì trong 0.5 giây." },
      { step: "03", title: "Tự động đổi trạng thái & Gửi biên nhận", desc: "Đơn hàng tự động chuyển sang 'Đã Cọc', kho tự động khóa và email biên lai điện tử được gửi ngay cho khách." }
    ],
    workflowEn: [
      { step: "01", title: "Dynamic VietQR Generation", desc: "Generates tailored QR code containing exact payment sum and unique transaction identifier." },
      { step: "02", title: "0.5s Bank Webhook Reconciliation", desc: "Buyer scans via any banking application; bank webhook confirms settlement in 0.5 seconds." },
      { step: "03", title: "Order Finalization & Receipt", desc: "Order status switches to 'Reserved', inventory locks instantly, and digital receipt is emailed." }
    ]
  },
  {
    id: "inventory_lock",
    category: "sales",
    num: "03",
    iconName: "FaSyncAlt",
    metricVi: "Khóa kho 8ms • Triệt tiêu trùng đơn",
    metricEn: "8ms Lock • Zero Conflicts",
    titleVi: "Quản Lý Kho & Khóa Trạng Thái Real-time",
    titleEn: "Real-time Stock Locking & Multi-device Sync",
    descVi: "Khóa phân tán Redis 8ms, đồng bộ trạng thái kho độc bản tức thời qua WebSockets...",
    descEn: "Redis 8ms distributed locking syncing unique stock in real time across devices...",
    specsVi: [
      "Khóa phân tán Redis Lock độ trễ 8ms",
      "Đồng bộ Socket.IO thời gian thực đa thiết bị"
    ],
    specsEn: [
      "Redis distributed locking with 8ms latency",
      "Real-time Socket.IO multi-device state sync"
    ],
    techVi: "Redis Lock • Socket.IO",
    techEn: "Redis Lock • Socket.IO",
    image: "/docs/images/biensovip_real_plates.png",
    captionVi: "Giao diện quản lý kho 26 trang với cơ chế khóa phân tán Redis Lock độ trễ 8ms",
    captionEn: "26-page inventory CMS powered by Redis distributed locks with 8ms latency",
    painPointVi: "Đối với mặt hàng giá trị cao hoặc độc bản (biển số đẹp, ô tô, bất động sản, đồ sưu tầm), việc 2 khách hàng cùng đặt cọc một sản phẩm trong cùng một phút sẽ gây tranh chấp, bồi thường cọc và tổn hại uy tín thương hiệu. Khóa phân tán Redis Lock triệt tiêu 100% rủi ro này.",
    painPointEn: "For high-value or one-of-a-kind inventory, simultaneous deposits from concurrent buyers trigger double bookings, refund friction, and reputation loss. Redis distributed locks eliminate race conditions with 8ms response.",
    workflowVi: [
      { step: "01", title: "Tạo khóa phân tán tạm thời", desc: "Ngay khi khách đầu tiên mở màn hình thanh toán, Redis Lock tạm giữ sản phẩm trong 10 phút." },
      { step: "02", title: "Phát sóng WebSocket toàn hệ thống", desc: "Toàn bộ khách hàng khác trên mọi thiết bị đang xem sản phẩm đó thấy trạng thái đổi sang 'Đang giữ chỗ'." },
      { step: "03", title: "Xác nhận khóa cứng hoặc Tự động mở", desc: "Nếu cọc thành công, sản phẩm khóa vĩnh viễn; nếu hết 10 phút chưa thanh toán, hệ thống tự động nhả lại kho." }
    ],
    workflowEn: [
      { step: "01", title: "Temporary Distributed Lock", desc: "As first shopper opens deposit modal, Redis Lock reserves the item for a 10-minute window." },
      { step: "02", title: "Real-time WebSocket Broadcast", desc: "State updates across all live browser sessions globally, displaying 'Currently In Checkout'." },
      { step: "03", title: "Permanent Lock or Auto-Release", desc: "Permanently marked 'Sold' upon deposit, or automatically returned to pool if checkout expires." }
    ]
  },
  {
    id: "ai_advisory",
    category: "ai",
    num: "04",
    iconName: "FaRobot",
    metricVi: "DeepSeek RAG • Trực đêm 24/7",
    metricEn: "DeepSeek RAG • 24/7 Support",
    titleVi: "Trợ Lý AI CSKH & Tư Vấn Phong Thủy 24/7",
    titleEn: "24/7 DeepSeek AI Advisory & Recommendations",
    descVi: "Trợ lý AI DeepSeek RAG phân tích ngũ hành và hướng dẫn khách cọc 24/7...",
    descEn: "DeepSeek RAG AI advisor evaluating criteria and guiding checkout 24/7...",
    specsVi: [
      "Mô hình DeepSeek RAG tích hợp dữ liệu kho",
      "Tự động tính toán phong thủy và điều hướng cọc"
    ],
    specsEn: [
      "DeepSeek RAG architecture trained on inventory",
      "Automated compatibility scoring and checkout routing"
    ],
    techVi: "DeepSeek RAG • Vector Search",
    techEn: "DeepSeek RAG • Vector Search",
    image: "/docs/images/biensovip_real_fengshui.png",
    captionVi: "Module phân tích ngũ hành, độ hợp tuổi và tích hợp trợ lý AI DeepSeek RAG 24/7",
    captionEn: "4-Pillar numerology engine and private DeepSeek RAG AI consultant running 24/7",
    painPointVi: "Hơn 40% lượt truy cập diễn ra vào ban đêm (sau 22h) hoặc ngày nghỉ lễ khi đội ngũ tư vấn viên không trực. Khách hàng có nhu cầu hỏi chi tiết về thông số, sự phù hợp phong thủy hay chính sách sẽ thoát trang nếu không có câu trả lời. AI RAG trực 24/7 giải quyết bài toán này.",
    painPointEn: "Over 40% of high-intent traffic arrives after 10 PM or holidays when human staff is offline. Inquiries left unanswered cause abandoned sessions. Our private DeepSeek RAG agent provides expert advisory 24/7.",
    workflowVi: [
      { step: "01", title: "Huấn luyện AI trên kho dữ liệu riêng", desc: "Mô hình DeepSeek được nhúng tri thức toàn bộ danh mục sản phẩm, chính sách giá và luật tư vấn riêng." },
      { step: "02", title: "Hội thoại tự nhiên & Phân tích nhu cầu", desc: "Khách đặt câu hỏi tự do bằng tiếng Việt, AI tính toán tương hợp (ngũ hành, ngân sách) và trả lời chuyên sâu." },
      { step: "03", title: "Điều hướng cọc & Bàn giao nhân sự", desc: "AI cung cấp link đặt cọc trực tiếp, hoặc thông báo tóm tắt cuộc trò chuyện cho nhân viên khi khách cần hỗ trợ đặc biệt." }
    ],
    workflowEn: [
      { step: "01", title: "Private Catalog Ingestion", desc: "DeepSeek model is fine-tuned and indexed with domain logic, specs, and pricing guidelines." },
      { step: "02", title: "Semantic Dialogue & Need Analysis", desc: "Customer inquires naturally; AI performs semantic retrieval and delivers consultative guidance." },
      { step: "03", title: "Deposit Routing & Lead Handover", desc: "AI offers direct deposit CTA or summarizes chat context for human agents when requested." }
    ]
  },
  {
    id: "mockup_gen",
    category: "ai",
    num: "05",
    iconName: "FaLaptopCode",
    metricVi: "Xuất 50+ ảnh/phút",
    metricEn: "50+ Banners/Min",
    titleVi: "Công Cụ Sinh Ảnh Mockup Hàng Loạt",
    titleEn: "Batch Social Media Mockup Generator",
    descVi: "Tiến trình 1-click xuất hàng loạt ảnh mockup sản phẩm chuẩn tỉ lệ mạng xã hội...",
    descEn: "1-click batch rendering for multi-ratio social media cards and watermarks...",
    specsVi: [
      "Hỗ trợ đa tỉ lệ 1:1, 9:16 cho Facebook, Zalo, TikTok",
      "Tự động đóng dấu watermark logo và mã QR"
    ],
    specsEn: [
      "Multi-ratio export (1:1, 9:16) for social feeds",
      "Automated logo watermarking and contact QR"
    ],
    techVi: "HTML5 Canvas • Batch Renderer",
    techEn: "HTML5 Canvas • Batch Renderer",
    image: "/docs/images/biensovip_real_plates.png",
    captionVi: "Công cụ xuất mockup ảnh tự động chuẩn tỉ lệ đăng Facebook/TikTok tích hợp trong CMS",
    captionEn: "Automated multi-ratio social media mockup generator built directly into admin CMS",
    painPointVi: "Mỗi khi có sản phẩm mới về kho, nhân viên phải mất 10-15 phút cắt ghép hình ảnh, chèn logo, chèn giá và mã QR liên hệ lên Photoshop. Với hàng trăm sản phẩm, điều này tốn hàng tuần lễ công sức. Công cụ 1-click HTML5 Canvas sinh hàng chục ảnh hoàn chỉnh chỉ trong vài giây.",
    painPointEn: "Pasting products into Photoshop, adding logos, prices, and contact QRs consumes 15 minutes per item. For large inventories, this is a massive operational drag. Our 1-click Canvas engine renders complete banners in seconds.",
    workflowVi: [
      { step: "01", title: "Tích chọn sản phẩm trong CMS", desc: "Chọn 1 hoặc toàn bộ danh sách sản phẩm cần đăng bài truyền thông từ bảng điều khiển kho." },
      { step: "02", title: "Ghép khung & Đóng dấu tự động", desc: "Hệ thống HTML5 Canvas tự động áp template mockup, đóng logo mờ (watermark) và sinh mã QR quét liên hệ." },
      { step: "03", title: "Xuất file chuẩn đa tỉ lệ mạng xã hội", desc: "Tải về trọn bộ ảnh chuẩn tỉ lệ 1:1 (bài đăng Facebook/Zalo) và 9:16 (Story/TikTok) sắc nét 2K." }
    ],
    workflowEn: [
      { step: "01", title: "Batch Selection in CMS", desc: "Select single or multiple inventory items requiring marketing creative from admin table." },
      { step: "02", title: "Automated Compositing & Watermark", desc: "Canvas engine renders branded frames, dynamic pricing, watermarks, and contact QRs." },
      { step: "03", title: "Multi-Ratio High-Res Export", desc: "Downloads production-ready 1:1 (Feed) and 9:16 (Stories/Reels) graphic assets in 2K resolution." }
    ]
  },
  {
    id: "email_builder",
    category: "ai",
    num: "06",
    iconName: "FaEnvelope",
    metricVi: "Email Automation 100%",
    metricEn: "100% Automated Flows",
    titleVi: "Email Builder Kéo Thả & Luồng Chăm Sóc Tự Động",
    titleEn: "Drag & Drop Email Builder & Nurture Sequences",
    descVi: "Trình kéo thả email tự động kích hoạt gửi hóa đơn, biên lai cọc và CSKH...",
    descEn: "Visual drag & drop canvas with auto-triggers for receipts and retention...",
    specsVi: [
      "Thiết kế kéo thả trực quan không cần biết code",
      "Kích hoạt tự động theo vòng đời giao dịch"
    ],
    specsEn: [
      "Visual drag & drop canvas without coding",
      "Automated transaction lifecycle triggers"
    ],
    techVi: "Canvas Builder • SMTP Engine",
    techEn: "Canvas Builder • SMTP Engine",
    image: "/docs/images/biensovip_real_dashboard.png",
    captionVi: "Trung tâm quản trị vận hành tích hợp kịch bản email giao dịch & chăm sóc khách hàng tự động",
    captionEn: "Admin dashboard featuring automated transactional email pipelines and lifecycle marketing",
    painPointVi: "Các doanh nghiệp nhỏ thường tốn hàng triệu đồng tiền gói thuê dịch vụ email marketing hàng tháng mà chỉ dùng để gửi vài chục email xác nhận cọc. Email Builder nội bộ cho phép tự thiết kế kéo thả và gửi email tự động qua máy chủ riêng không tốn phí duy trì.",
    painPointEn: "Small businesses pay high SaaS subscriptions for external email tools just to send order receipts. Our native Drag & Drop Email Builder sends triggered receipts, invoices, and follow-ups via your private SMTP at zero recurring software cost.",
    workflowVi: [
      { step: "01", title: "Kéo thả giao diện email trực quan", desc: "Tùy biến bố cục, màu sắc thương hiệu, chèn logo và các biến thông tin động ({ten_khach}, {ma_don}, {so_tien})." },
      { step: "02", title: "Thiết lập kịch bản kích hoạt tự động", desc: "Kích hoạt tự động khi khách cọc thành công, khi hợp đồng được ký hoặc gửi email nhắc nhở sau 7 ngày." },
      { step: "03", title: "Phát hành qua SMTP riêng an toàn", desc: "Hệ thống gửi thư qua máy chủ SMTP có chứng chỉ DKIM/SPF chống vào hòm spam, theo dõi tỉ lệ mở thực tế." }
    ],
    workflowEn: [
      { step: "01", title: "Visual Drag & Drop Design", desc: "Customize layouts, brand typography, logo, and dynamic tags ({customer_name}, {order_id})." },
      { step: "02", title: "Lifecycle Trigger Setup", desc: "Automate triggers on successful deposit, contract signing, or 7-day post-sale follow-up." },
      { step: "03", title: "Private SMTP Dispatch & Deliverability", desc: "Dispatches via private SMTP configured with SPF/DKIM for high inbox placement and open tracking." }
    ]
  },
  {
    id: "ctv_portal",
    category: "retention",
    num: "07",
    iconName: "FaUserTie",
    metricVi: "Quản lý CTV tự động",
    metricEn: "Auto Affiliate Ops",
    titleVi: "Cổng Mạng Lưới Cộng Tác Viên & Hoa Hồng",
    titleEn: "Affiliate Network & Transparent Commission Portal",
    descVi: "Cấp link UTM định danh cho môi giới, tự động cộng hoa hồng và rút tiền 1-click...",
    descEn: "Unique UTM referral tracking with real-time wallet ledger and 1-click payout...",
    specsVi: [
      "Định danh doanh số chính xác theo từng link UTM",
      "Bảng điều khiển theo dõi hoa hồng và rút tiền 1-click"
    ],
    specsEn: [
      "Precise referral attribution via unique UTMs",
      "Commission dashboard with 1-click payout workflow"
    ],
    techVi: "UTM Attribution • Wallet Ledger",
    techEn: "UTM Attribution • Wallet Ledger",
    image: "/docs/images/biensovip_real_ctv.png",
    captionVi: "Cổng quản trị 14 cộng tác viên thực tế với cơ chế định danh UTM và bảng kê hoa hồng minh bạch",
    captionEn: "Affiliate portal managing 14 live brokers with unique UTM tracking and commission ledger",
    painPointVi: "Mô hình bán hàng qua mạng lưới cộng tác viên thường bị đứt gãy vì tính toán hoa hồng thủ công bằng Excel chậm trễ, dễ nhầm lẫn và thiếu minh bạch khiến CTV nghi ngờ chủ shop giấu đơn. Cổng CTV tự động trao quyền cho CTV theo dõi số dư thời gian thực.",
    painPointEn: "Affiliate sales networks break down when commission reconciliation is manual, delayed, and opaque. Brokers lose trust and move elsewhere. This portal provides transparent real-time wallet tracking and individual UTM links.",
    workflowVi: [
      { step: "01", title: "Cấp link UTM định danh cá nhân", desc: "Mỗi cộng tác viên có link giới thiệu riêng biệt chứa mã UTM để đăng bài quảng bá lên mạng xã hội." },
      { step: "02", title: "Ghi nhận hoa hồng tức thì khi có cọc", desc: "Khi khách vào qua link của CTV và hoàn tất cọc, hoa hồng được hệ thống tính toán và cộng thẳng vào ví số dư." },
      { step: "03", title: "Duyệt lệnh rút tiền minh bạch 1-click", desc: "CTV bấm lệnh rút tiền về tài khoản ngân hàng, chủ shop duyệt chi trên bảng kê đối soát có lưu vết đầy đủ." }
    ],
    workflowEn: [
      { step: "01", title: "Unique UTM Provisioning", desc: "Each broker receives a unique tracking link containing their personal referral code." },
      { step: "02", title: "Instant Ledger Attribution", desc: "When referred visitors reserve an item, the commission is credited instantly to the broker's balance." },
      { step: "03", title: "1-Click Payout Approval", desc: "Brokers request withdrawal; administrators approve payouts with complete audit logs and bank export." }
    ]
  },
  {
    id: "audit_security",
    category: "retention",
    num: "08",
    iconName: "FaShieldAlt",
    metricVi: "Bảo mật chống thất thoát",
    metricEn: "Immutable Audit Trail",
    titleVi: "Bảo Mật Chống Thất Thoát Dữ Liệu & Khách VIP",
    titleEn: "Immutable Audit Log & VIP Data Leak Prevention",
    descVi: "Ghi lại lịch sử mọi thao tác sửa giá, xóa đơn, ngăn chặn rò rỉ số điện thoại khách VIP...",
    descEn: "Cryptographic SHA-256 audit trail with IP tracing to protect VIP records...",
    specsVi: [
      "Nhật ký thao tác minh bạch, không thể chỉnh sửa hay xóa dấu vết",
      "Phân quyền xem số điện thoại và dữ liệu khách hàng VIP"
    ],
    specsEn: [
      "Non-repudiable cryptographic logging with IP",
      "Multi-role RBAC protecting VIP customer records"
    ],
    techVi: "Nhật Ký Bảo Mật • Phân Quyền Nhân Viên",
    techEn: "Audit Trail Hash • RBAC Controls",
    image: "/docs/images/biensovip_real_audit.png",
    captionVi: "Nhật ký kiểm toán hệ thống bất biến, ghi lại chi tiết IP, thời gian và hành vi của từng tài khoản",
    captionEn: "Immutable security audit log tracing IP, timestamps, and granular admin action records",
    painPointVi: "Nỗi lo lớn của chủ doanh nghiệp là nhân viên nội bộ tự ý sửa giá sản phẩm thấp đi để trục lợi, xóa dấu vết đơn hàng hoặc copy trộm danh sách số điện thoại khách VIP mang sang cho đối thủ. Hệ thống lưu vết bảo mật tự động ghi lại từng lượt bấm xem số điện thoại, sửa giá kèm địa chỉ mạng và thời gian chính xác, giúp chủ shop kiểm soát 100% tài sản kinh doanh.",
    painPointEn: "Internal risk is severe: rogue staff altering prices for kickbacks, deleting traces, or stealing VIP customer records. Our SHA-256 cryptographic audit trail records every database mutation with timestamp and IP, tamper-proof against deletion.",
    workflowVi: [
      { step: "01", title: "Ghi nhận mọi lượt xem & chỉnh sửa", desc: "Bất kỳ nhân viên nào mở xem số điện thoại khách, thay đổi giá hay xuất file đều được hệ thống ghi vết tức thì." },
      { step: "02", title: "Lưu vết bất biến không thể xóa sửa", desc: "Nhật ký được bảo mật tuyệt đối; không ai có thể vào xóa hay sửa lại lịch sử thao tác." },
      { step: "03", title: "Cảnh báo khi có hành vi bất thường", desc: "Tự động gửi thông báo cho chủ shop khi phát hiện nhân viên tải hàng loạt thông tin khách hàng hoặc đăng nhập bất thường." }
    ],
    workflowEn: [
      { step: "01", title: "Action Interception & Logging", desc: "Middleware intercepts phone number views, price edits, and data exports with user IP and timestamp." },
      { step: "02", title: "Cryptographic Tamper-Proof Chain", desc: "Logs are cryptographically hashed; not even super-admins can erase or alter historical audit trails." },
      { step: "03", title: "Anomaly Detection & Immediate Alert", desc: "Automated alert flags suspicious bulk export requests or administrative logins from unrecognized IPs." }
    ]
  },
  {
    id: "social_proof",
    category: "retention",
    num: "09",
    iconName: "FaStar",
    metricVi: "Tăng 3x thời gian ở lại trang",
    metricEn: "3x On-Site Engagement",
    titleVi: "Tra Cứu Ý Nghĩa Phong Thủy & Kích Thích Mua Hàng",
    titleEn: "Fengshui Numerology & Live Social Proof",
    descVi: "Công cụ chấm điểm hợp mệnh và thông báo có người đang xem/vừa đặt cọc...",
    descEn: "Interactive numerology calculator and live buyer tickers stimulating FOMO...",
    specsVi: [
      "Bộ tính điểm hợp tuổi, hợp mệnh theo ngày tháng năm sinh",
      "Hiển thị số người đang cùng xem và thông báo chốt đơn thực tế"
    ],
    specsEn: [
      "4-pillar elemental scoring algorithm",
      "Live concurrent viewer counts and order tickers"
    ],
    techVi: "Tra Cứu Tương Tác • Thông Báo Thời Gian Thực",
    techEn: "4-Pillar Numerology • Live Ticker",
    image: "/docs/images/biensovip_real_comparison.png",
    captionVi: "Số liệu phân tích hơn 6.380 lượt tìm kiếm và các yếu tố kích thích tỷ lệ chuyển đổi thực tế",
    captionEn: "Analytics tracking 6,380+ customer searches and live conversion-boosting triggers",
    painPointVi: "Khách hàng vào website thấy yên ắng thường có tâm lý dè chừng, sợ lừa đảo hoặc phân vân chần chừ không muốn cọc ngay. Các công cụ tra cứu giá trị gia tăng (như phong thủy, hợp mệnh) giữ khách ở lại trang lâu gấp 3 lần, kết hợp thông báo hoạt động mua bán thực tế kích thích quyết định xuống cọc nhanh chóng.",
    painPointEn: "Shoppers entering a static, lifeless site feel cautious and postpone deposit commitments. Interactive valuation tools triple visitor dwell time, while live activity tickers create authentic social proof and FOMO.",
    workflowVi: [
      { step: "01", title: "Khách nhập năm sinh tra cứu", desc: "Khách nhập ngày sinh để xem ngay bản phân tích độ hợp tuổi, hợp mệnh với từng sản phẩm." },
      { step: "02", title: "Hiển thị điểm số & Lời khuyên", desc: "Bảng điểm rõ ràng giúp khách an tâm và thêm yêu thích sản phẩm." },
      { step: "03", title: "Nhắc nhở nhẹ nhàng để cọc ngay", desc: "Góc màn hình hiện thông báo có người đang cùng xem sản phẩm, tạo động lực để khách không bỏ lỡ." }
    ],
    workflowEn: [
      { step: "01", title: "Interactive Attribute Evaluation", desc: "Visitors input criteria to generate personalized affinity scores tailored to specific items." },
      { step: "02", title: "Visual Scoring & Emotional Buy-In", desc: "Multi-axis compatibility charts foster emotional conviction and highlight unique value propositions." },
      { step: "03", title: "Verified Real-time Tickers", desc: "Subtle indicators display concurrent live viewers and recent verified reservation notifications." }
    ]
  },
  {
    id: "comparison_social",
    category: "retention",
    num: "10",
    iconName: "FaBalanceScale",
    metricVi: "So sánh 2-4 món cùng lúc",
    metricEn: "Multi-Item Radar & Video",
    titleVi: "So Sánh Sản Phẩm Song Song & Nhúng Video Clip",
    titleEn: "Multi-Item Comparison & Social Video Embeds",
    descVi: "Khách dễ dàng đặt 2-4 sản phẩm lên bàn cân so sánh giá và xem video thực tế...",
    descEn: "Side-by-side spec comparison matrix with authentic video review embeds...",
    specsVi: [
      "Bảng đối chiếu thông số, mức giá rõ ràng trên một màn hình",
      "Gắn video quay thực tế từ TikTok/Reels giúp khách tin tưởng tuyệt đối"
    ],
    specsEn: [
      "Side-by-side spec and compatibility radar",
      "Native TikTok/Reels video embeds for authenticity"
    ],
    techVi: "Bảng So Sánh • Nhúng Video TikTok/Reels",
    techEn: "Matrix Comparison • Native Video",
    image: "/docs/images/biensovip_real_comparison.png",
    captionVi: "Ma trận đối chiếu đa sản phẩm song song và tính năng nhúng video thực tế từ TikTok/Reels",
    captionEn: "Side-by-side multi-item comparison matrix with integrated TikTok/Reels video embeds",
    painPointVi: "Khách hàng thường đắn đo giữa 2-3 món hàng cùng tầm giá. Nếu phải mở nhiều tab rồi quay qua quay lại, khách rất dễ mỏi mắt và bỏ đi. Bảng so sánh đặt các sản phẩm lên cùng một màn hình đối chiếu, kèm video quay thực tế giúp khách tự tin đưa ra quyết định mua hàng ngay.",
    painPointEn: "Buyers torn between several comparable items get fatigued opening multiple tabs and abandon the process. A side-by-side radar matrix contrasts attributes cleanly on one screen, enriched with video clips for full transparency.",
    workflowVi: [
      { step: "01", title: "Bấm chọn các món cần so sánh", desc: "Khách bấm nút 'So sánh' trên 2-4 sản phẩm đang cân nhắc." },
      { step: "02", title: "Xem bảng đối chiếu trực quan", desc: "Màn hình hiển thị song song giá cả, đặc điểm nổi bật và ưu nhược điểm của từng món." },
      { step: "03", title: "Xem video thật & Bấm cọc luôn", desc: "Xem clip quay cận cảnh sản phẩm và bấm nút đặt cọc ngay trên bảng so sánh." }
    ],
    workflowEn: [
      { step: "01", title: "Add to Comparison Matrix", desc: "Shoppers click the comparison icon across 2 to 4 candidate products from catalog cards." },
      { step: "02", title: "Side-by-Side Spec & Score Radar", desc: "Tabular matrix contrasts price, dimensions, rarity, and compatibility scores in parallel." },
      { step: "03", title: "Embedded Authentic Video & Checkout", desc: "Shoppers watch authentic TikTok/Reels review videos directly on-page and click instant deposit." }
    ]
  },
  {
    id: "omnichannel_publisher",
    category: "omnichannel",
    num: "11",
    iconName: "FaShareAlt",
    systemBadgeVi: "Công nghệ BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "5 MXH • Không lo mất bài",
    metricEn: "5 Platforms • 0% Loss DLQ",
    titleVi: "Đăng Bài Tự Động Lên 5 Mạng Xã Hội Đồng Thời",
    titleEn: "Omnichannel Auto-Publisher & RabbitMQ DLQ Pipeline",
    descVi: "Soạn nội dung 1 lần, tự động lên lịch đăng đồng loạt lên Facebook, TikTok, Instagram, Threads, Zalo...",
    descEn: "Dispatches scheduled content to 5 social channels via RabbitMQ DLQ with zero message loss...",
    specsVi: [
      "Kết nối chính thức: Facebook, TikTok, Instagram, Threads, Zalo",
      "Cơ chế tự động gửi lại nếu mạng chập chờn — Cam kết không mất bài"
    ],
    specsEn: [
      "Unified OAuth gateway: Facebook, TikTok, Instagram, Threads, Zalo",
      "RabbitMQ Dead Letter Queue (DLQ) with exponential backoff retry"
    ],
    techVi: "Tự Động Đăng Bài • Bộ Xử Lý Chống Rớt Tin",
    techEn: "Spring Boot 3 • RabbitMQ DLQ",
    image: "/docs/images/DA-D19-03.png",
    captionVi: "Giao diện lập lịch đăng bài tự động đa kênh và bảng điều khiển telemetry hàng đợi RabbitMQ từ hệ thống BrandHub",
    captionEn: "Live omnichannel scheduling console and RabbitMQ async queue telemetry from BrandHub platform",
    painPointVi: "Doanh nghiệp hoặc chủ shop bán hàng đa kênh thường mất 3-5 tiếng mỗi ngày chỉ để copy-paste bài viết sang từng Fanpage, TikTok hay Zalo. Nhiều khi mạng lag hoặc nền tảng lỗi khiến bài không đăng được mà không hề hay biết. Hệ thống này giúp bạn chỉ cần viết 1 lần, đặt giờ hẹn là bài tự động xuất hiện trên cả 5 nền tảng, có sự cố sẽ tự động gửi lại đến khi thành công.",
    painPointEn: "Managing dozens of brand social pages manually drains 4-6 hours daily in repetitive copy-pasting, risking network dropouts and inconsistent campaign timing. Our Omnichannel Publisher leverages Spring Boot 3 and RabbitMQ DLQ with exponential retry, guaranteeing zero message loss and seamless scheduled dispatches across 5 social channels.",
    workflowVi: [
      { step: "01", title: "Soạn bài viết 1 lần duy nhất", desc: "Viết bài và gắn ảnh/video, hệ thống tự căn chỉnh kích thước chuẩn cho Facebook, TikTok, Instagram, Threads, Zalo." },
      { step: "02", title: "Chọn ngày giờ xuất bản", desc: "Đặt lịch đăng bài theo khung giờ vàng nhiều người xem nhất trong ngày." },
      { step: "03", title: "Hệ thống tự động phát hành & Báo cáo", desc: "Đến giờ hẹn, bài tự đăng lên mọi kênh; có thông báo kết quả và đường link xem trực tiếp." }
    ],
    workflowEn: [
      { step: "01", title: "Single-Editor Multi-Channel Authoring", desc: "Draft marketing copy once, fine-tune aspect ratios and tags for Facebook, TikTok, Instagram, Threads, and Zalo." },
      { step: "02", title: "RabbitMQ Async Queue Orchestration", desc: "Payloads route through RabbitMQ with Dead Letter Queue protection, retrying dynamically under rate limits." },
      { step: "03", title: "Concurrent Publish & Telemetry Verification", desc: "Posts dispatches concurrently; dashboard tracks live status and records returned post IDs from each platform API." }
    ]
  },
  {
    id: "ai_brand_rag",
    category: "ai",
    num: "12",
    iconName: "FaRobot",
    systemBadgeVi: "Công nghệ BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "AI Viết Bài Chuẩn Gu",
    metricEn: "RAG Llama 3 • 1.2s Fast",
    titleVi: "Trợ Lý AI Viết Bài Tự Động Theo Đúng Phong Cách Riêng",
    titleEn: "Context-Aware AI RAG & Brand-Voice Engine",
    descVi: "AI học toàn bộ thông tin sản phẩm và giọng văn của thương hiệu, tự động viết bài quảng cáo trong 1 giây...",
    descEn: "Python FastAPI RAG pipeline synthesizing context-aware SEO captions tailored by platform...",
    specsVi: [
      "Ghi nhớ thông tin sản phẩm, chính sách giá và từ ngữ thương hiệu riêng",
      "Tự động biến tấu bài viết: TikTok giật tít thu hút, Facebook chi tiết thuyết phục"
    ],
    specsEn: [
      "ChromaDB semantic retrieval + Groq Llama 3 with Claude fallback",
      "Dynamic tone-of-voice adaptation strictly following Brand Guidelines"
    ],
    techVi: "Trí Tuệ Nhân Tạo AI • Bộ Nhớ Thông Minh",
    techEn: "FastAPI • LangChain • ChromaDB",
    image: "/docs/images/DA-D19-04.png",
    captionVi: "Pipeline AI sinh nội dung tự động thông minh bằng Python FastAPI tích hợp RAG và kiểm soát văn phong thương hiệu",
    captionEn: "AI content automation pipeline with Python FastAPI, RAG context injection, and Brand-Voice compliance",
    painPointVi: "Thuê nhân viên viết content thường tốn 8-15 triệu/tháng nhưng người mới vào viết hay bị lệch gu, sai thông tin sản phẩm hoặc cạn ý tưởng. Trợ lý AI này được 'dạy' riêng bằng chính bảng giá và phong cách thương hiệu của bạn, chỉ cần nhập ý tưởng sơ lược là AI viết ngay hàng chục bài quảng cáo hấp dẫn chỉ trong 1-2 giây.",
    painPointEn: "Hiring creative copywriters incurs heavy payroll while brand voice fluctuates wildly across channels. Content creators waste hours adapting formats for TikTok vs. LinkedIn. Our Python FastAPI RAG pipeline embeds your brand manual into vector storage, generating channel-perfect copy adhering strictly to brand identity in 1.2s.",
    workflowVi: [
      { step: "01", title: "Nạp thông tin thương hiệu vào AI", desc: "Đưa tài liệu giới thiệu shop, bảng giá và các bài viết mẫu thành công nhất vào bộ nhớ của AI." },
      { step: "02", title: "Nhập ý tưởng sản phẩm muốn bán", desc: "Chủ shop chỉ cần nhập 1 câu: 'Hôm nay giảm giá biển tam hoa cho khách Đà Nẵng'." },
      { step: "03", title: "Nhận bài viết hoàn chỉnh tức thì", desc: "AI xuất ngay 3 phiên bản bài viết hay, chuẩn SEO, có sẵn hashtag để đăng luôn." }
    ],
    workflowEn: [
      { step: "01", title: "Brand Guidelines Ingestion into ChromaDB", desc: "Digitizes brand identity manuals, catalog specs, and negative keywords into vector embeddings." },
      { step: "02", title: "Semantic Retrieval & Dual-LLM Generation", desc: "LangChain extracts relevant context; Groq Llama 3 generates lightning-fast drafts with Claude fallback." },
      { step: "03", title: "Platform-Specific Copy Formatting", desc: "Delivers tailored variations instantly: short hooks for TikTok, detailed Facebook copy, and professional LinkedIn tone." }
    ]
  },
  {
    id: "multitenant_rbac",
    category: "retention",
    num: "13",
    iconName: "FaUsers",
    systemBadgeVi: "Công nghệ BrandHub",
    systemBadgeEn: "BrandHub System",
    metricVi: "Phân quyền an toàn 4 cấp",
    metricEn: "Multi-Tenant • 4-Tier RBAC",
    titleVi: "Phân Quyền Làm Việc Cho Quản Lý, Nhân Viên & Khách Hàng",
    titleEn: "Multi-Tenant Enterprise RBAC & Workspace Segregation",
    descVi: "Tạo không gian làm việc riêng biệt cho từng chi nhánh, quản lý ai được xem tiền, ai chỉ được soạn bài...",
    descEn: "Multi-tenant workspace isolation for Agencies, Brands, KOLs, and external partners...",
    specsVi: [
      "Bảo mật tài khoản nhiều lớp, chống xâm nhập trái phép",
      "Tách biệt hoàn toàn dữ liệu giữa các nhãn hàng, chi nhánh khác nhau"
    ],
    specsEn: [
      "Spring Cloud Gateway JWT tokens & Redis rate-limiting access control",
      "Strict data tenancy isolation between autonomous brands and agency units"
    ],
    techVi: "Phân Quyền Đa Cấp • Bảo Mật Cấp Doanh Nghiệp",
    techEn: "Spring Cloud Gateway • RBAC",
    image: "/docs/images/DA-D19-06.png",
    captionVi: "Màn hình phân quyền tổ chức đa cấp Multi-tenant (Agency, Doanh nghiệp, Brand, CTV) trên nền tảng BrandHub",
    captionEn: "Enterprise multi-tenant organizational structure and granular role-based access control interface in BrandHub",
    painPointVi: "Khi mở rộng thêm chi nhánh hoặc thuê cộng tác viên bên ngoài, việc dùng chung một tài khoản rất nguy hiểm: người ngoài có thể thấy hết doanh thu mật, hoặc nhân viên mới vô tình xóa mất dữ liệu quan trọng. Hệ thống phân quyền chặt chẽ giúp mỗi người chỉ thấy đúng việc của mình: người viết bài chỉ thấy bài, kế toán mới thấy tiền.",
    painPointEn: "Scaling businesses and agencies managing multiple clients face severe security risks when sharing shared logins, risking client data leaks across competing brands or accidental resource deletion. Our Multi-Tenant RBAC architecture enforces strict data isolation and granular 4-tier permissions via Spring Cloud Gateway.",
    workflowVi: [
      { step: "01", title: "Tạo tài khoản theo vai trò", desc: "Tạo tài khoản riêng cho từng nhân viên: Quản trị viên, Nhân viên bán hàng, Người duyệt bài hoặc Cộng tác viên." },
      { step: "02", title: "Phân quyền xem dữ liệu", desc: "Giới hạn quyền hạn: Nhân viên chỉ thấy đơn của mình, không thấy tổng doanh thu của công ty." },
      { step: "03", title: "An tâm mở rộng quy mô", desc: "Quản lý hàng chục nhân sự và chi nhánh trên một phần mềm duy nhất mà không lo lộ lọt bí mật kinh doanh." }
    ],
    workflowEn: [
      { step: "01", title: "Workspace Provisioning & Tenant Separation", desc: "Agency provisions dedicated workspaces for each brand; data is logically segregated at database layer." },
      { step: "02", title: "Granular Role-Based Assignment", desc: "Assign specific roles: Admin, Editor, Reviewer, and Affiliate Partner with restricted read/write scopes." },
      { step: "03", title: "Gateway Authentication & Cross-Tenant Shield", desc: "Spring Cloud Gateway validates JWT tokens with Redis rate-limiting, blocking cross-tenant data leaks." }
    ]
  }
];

const Services = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const navigate = useNavigate();

  const [lightboxImg, setLightboxImg] = useState(null);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('manday');
  const [activeSaasCategory, setActiveSaasCategory] = useState('all');
  const [selectedSaasFeature, setSelectedSaasFeature] = useState(null);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null);
        } else if (selectedSaasFeature) {
          setSelectedSaasFeature(null);
        } else if (showWorkflowModal) {
          setShowWorkflowModal(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  }, [lightboxImg, selectedSaasFeature, showWorkflowModal]);

  // Lock body scroll when modal or lightbox is active
  useEffect(() => {
    if (selectedSaasFeature || showWorkflowModal || lightboxImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSaasFeature, showWorkflowModal, lightboxImg]);

  const scrollToContact = () => {
    navigate('/contact');
  };

  
    const getSaasIcon = (iconName) => {
    switch (iconName) {
      case 'FaCogs': return <FaCogs size={18} />;
      case 'FaQrcode': return <FaQrcode size={18} />;
      case 'FaSyncAlt': return <FaSyncAlt size={18} />;
      case 'FaRobot': return <FaRobot size={18} />;
      case 'FaLaptopCode': return <FaLaptopCode size={18} />;
      case 'FaEnvelope': return <FaEnvelope size={18} />;
      case 'FaUserTie': return <FaUserTie size={18} />;
      case 'FaShieldAlt': return <FaShieldAlt size={18} />;
      case 'FaStar': return <FaStar size={18} />;
      case 'FaBalanceScale': return <FaBalanceScale size={18} />;
      case 'FaShareAlt': return <FaShareAlt size={18} />;
      case 'FaUsers': return <FaUsers size={18} />;
      default: return <FaBolt size={18} />;
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -140 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="services-page" style={{ paddingTop: '52px' }}>
      <ServicesSubnav />
      {/* TERMINAL PROMPT HEADER - Desktop only */}
      <div className="terminal-prompt hidden md:flex">
        <span className="prompt-sym">$</span>
        <span className="prompt-cmd">web-dev --team "1 Leader + 4 Devs" --location "Da Nang"</span>
        <span className="prompt-tag">→ ready for projects</span>
      </div>

      {/* 1. HERO SECTION */}
      <section id="overview" className="hero-section" style={{ scrollMarginTop: '170px' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="badge-pill"
        >
          <span className="pulse-dot" />
          <span>{isEn ? "Team 5 Da Nang Engineers • Flexible • 100% On-Time" : "Team 5 Kỹ Sư Đà Nẵng • Làm Việc Linh Hoạt • Cam Kết Đúng Deadline"}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-title"
        >
          {isEn ? (
            <>SaaS Automation & High-Converting Websites:<br /><span className="text-accent-underline">Engineered for Shops & Scalable Growth</span></>
          ) : (
            <>Website & Tự Động Hóa SaaS Cho Chủ Shop:<br /><span className="text-accent-underline">Tự Động Bán Hàng - Chốt Đơn - Tối Ưu Chi Phí</span></>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-subtitle"
        >
          {isEn
            ? "Turnkey web systems & SaaS automation engineered by 1 Lead Architect + 4 Senior Engineers. Turn your website into an automated sales, VietQR settlement, and 24/7 AI-driven operation engine. Transparent civil contracts, zero tax hassle."
            : "Giải pháp thiết kế website kết hợp Tự Động Hóa SaaS (SaaS Automation) từ Team 1 Leader + 4 Kỹ Sư Đà Nẵng. Tự động hóa phễu bán hàng, đối soát VietQR 0đ phí, quản lý kho thời gian thực và CSKH bằng AI. Hợp đồng dân sự rõ ràng, không lo thủ tục thuế!"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-cta-group"
        >
          <button onClick={scrollToContact} className="btn-pill-primary">
            <FaRocket size={14} /> {isEn ? "Book Free Consultation" : "Nhận Tư Vấn Miễn Phí Ngay"}
          </button>
          <button onClick={scrollToPricing} className="btn-pill-secondary">
            {isEn ? "View Pricing & Specs" : "Xem Bảng Giá & Quy Trình"} <FaArrowRight size={12} />
          </button>
        </motion.div>

        <motion.div 
          className="saas-tags-row"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={cardPop} className="saas-tag"><FaCogs /> {isEn ? "SaaS Automation Architecture" : "Chuyên Sâu Tự Động Hóa SaaS"}</motion.span>
          <motion.span variants={cardPop} className="saas-tag"><FaQrcode /> {isEn ? "Zero-Fee Dynamic VietQR" : "Đối Soát VietQR Tự Động 0đ"}</motion.span>
          <motion.span variants={cardPop} className="saas-tag"><FaRobot /> {isEn ? "24/7 DeepSeek AI Sales Agent" : "Trợ Lý AI Bán Hàng 24/7"}</motion.span>
          <motion.span variants={cardPop} className="saas-tag"><FaSyncAlt /> {isEn ? "Real-time Multi-device Sync" : "Đồng Bộ Kho Đa Thiết Bị"}</motion.span>
        </motion.div>

        <motion.div 
          className="trust-bar"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardPop} className="trust-item">
            <FaCheckCircle /> {isEn ? "100% On-Time Guarantee" : "Cam Kết Đúng Hạn (Phạt nếu trễ)"}
          </motion.div>
          <motion.div variants={cardPop} className="trust-item">
            <FaFileContract /> {isEn ? "Civil Contract by Leader" : "Hợp Đồng Dân Sự Rõ Ràng"}
          </motion.div>
          <motion.div variants={cardPop} className="trust-item">
            <FaReceipt /> {isEn ? "Zero Client Tax Burden" : "Khách KHÔNG lo Thuế TNCN"}
          </motion.div>
          <motion.div variants={cardPop} className="trust-item">
            <FaShieldAlt /> {isEn ? "6 - 12 Months Free Warranty" : "Bảo Hành Miễn Phí 6 - 12 Tháng"}
          </motion.div>
        </motion.div>
      </section>

      {/* 2. FLAGSHIP PROJECTS SHOWCASE: BIENSOVIP & BRANDHUB */}
      <section id="case-study" className="section-container" style={{ scrollMarginTop: '170px' }}>
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "DUAL FLAGSHIP SHOWCASE" : "HAI DỰ ÁN TRỌNG ĐIỂM TIÊU BIỂU"}</div>
          <h2 className="section-heading">
            {isEn ? "Proven Engineering Delivery: Commercial Product & Capstone Platform" : "Hai Sản Phẩm Trọng Điểm Khẳng Định Năng Lực Của Team"}
          </h2>
          <p className="section-desc">
            {isEn 
              ? "Directly explore our two crowning achievements: The commercial e-commerce marketplace (Biensovip.com) and our team's flagship microservices capstone platform (BrandHub) — presented side-by-side with full technical architectures."
              : "Khám phá trực tiếp hai sản phẩm nổi bật của team mà không cần chuyển tab: Sàn thương mại điện tử chuyên biệt bàn giao cho doanh nghiệp Đà Nẵng (Biensovip.com) và Đồ án tốt nghiệp trọng điểm kiến trúc Microservices & AI đa kênh (BrandHub)."}
          </p>
        </motion.div>

        {/* 2. BALANCED 2-COLUMN FLAGSHIP CARDS (GỌN GÀNG, KHÔNG DÀI TRANG) */}
        <div className="flagship-cards-grid">
          {/* CARD 1: BIENSOVIP */}
          <motion.div 
            className="flagship-summary-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            onClick={() => navigate('/projects/26', { state: { from: 'services' } })}
          >
            <div className="card-browser-bar">
              <div className="browser-dots">
                <span /><span /><span />
              </div>
              <div className="browser-domain">https://biensovip.com</div>
              <div className="browser-status live">
                <span className="dot" />
                {isEn ? "LIVE PRODUCTION" : "ĐANG CHẠY THẬT"}
              </div>
            </div>

            <div className="card-media-wrap">
              <img 
                src={BIENSOVIP_SHOTS[0].url} 
                alt="Biensovip Marketplace" 
                className="card-cover-img"
              />
              <div className="card-media-overlay">
                <span className="overlay-pill">
                  <FaSearch size={12} />
                  {isEn ? "Click to view full architecture & gallery" : "Bấm để xem chi tiết & thư viện ảnh"}
                </span>
              </div>
            </div>

            <div className="card-body-wrap">
              <div className="card-category-badge client">
                {isEn ? "ENTERPRISE CLIENT • DA NANG" : "KHÁCH HÀNG DOANH NGHIỆP • ĐÀ NẴNG"}
              </div>

              <h3 className="card-title">Biensovip.com — Sàn Giao Dịch Biển Số Đẹp</h3>
              <p className="card-desc">
                {isEn 
                  ? "Production high-performance marketplace managing thousands of high-value plates with sub-8ms composite search and 0% transaction fee auto VietQR deposit webhook."
                  : "Hệ thống sàn bán hàng trực tuyến quản lý hàng chục nghìn sản phẩm giá trị cao: khách gõ tìm kiếm ra ngay tức thì, nhận cọc tự động qua ngân hàng 0đ phí và tự động chốt đơn."}
              </p>

              <div className="card-highlights-list">
                <div className="highlight-item">
                  <FaBolt className="hl-icon" />
                  <span><strong>{isEn ? "Sub-8ms Multi-filter" : "Tìm kiếm tức thời <8ms"}:</strong> Gõ đến đâu ra ngay đến đó</span>
                </div>
                <div className="highlight-item">
                  <FaQrcode className="hl-icon" />
                  <span><strong>{isEn ? "VietQR 0% Fee" : "Nhận cọc VietQR 0đ phí"}:</strong> Khớp tiền về tài khoản sau 0.5s</span>
                </div>
                <div className="highlight-item">
                  <FaEnvelope className="hl-icon" />
                  <span><strong>{isEn ? "Drag-Drop Email" : "Gửi email xác nhận tự động"}:</strong> Kèm hóa đơn, không tốn phí duy trì</span>
                </div>
                <div className="highlight-item">
                  <FaUsers className="hl-icon" />
                  <span><strong>{isEn ? "Affiliate Portal" : "Quản lý 14 cộng tác viên"}:</strong> Tự động tính hoa hồng bán hàng</span>
                </div>
              </div>

              <div className="card-mini-kpis">
                <div className="mini-kpi">
                  <span className="kpi-val">&lt; 8ms</span>
                  <span className="kpi-lbl">{isEn ? "Search speed" : "Tốc độ lọc"}</span>
                </div>
                <div className="mini-kpi">
                  <span className="kpi-val">0% / 0đ</span>
                  <span className="kpi-lbl">{isEn ? "Gateway fee" : "Phí giao dịch"}</span>
                </div>
                <div className="mini-kpi">
                  <span className="kpi-val">98/100</span>
                  <span className="kpi-lbl">Lighthouse</span>
                </div>
              </div>

              <div className="card-action-bar">
                <button 
                  type="button"
                  className="btn-open-detail"
                  onClick={(e) => { e.stopPropagation(); navigate('/projects/26', { state: { from: 'services' } }); }}
                >
                  <span>{isEn ? "View Complete Details" : "Xem Chi Tiết Dự Án"}</span>
                  <FaArrowRight size={12} />
                </button>

                <a 
                  href="https://biensovip.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-card-live"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{isEn ? "Live Site" : "Trang Thật"}</span>
                  <FaExternalLinkAlt size={11} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: BRANDHUB */}
          <motion.div 
            className="flagship-summary-card brandhub-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            onClick={() => navigate('/projects/14', { state: { from: 'services' } })}
          >
            <div className="card-browser-bar">
              <div className="browser-dots">
                <span /><span /><span />
              </div>
              <div className="browser-domain">https://github.com/BrandHubOrganization</div>
              <div className="browser-status capstone">
                <span className="dot" />
                {isEn ? "CAPSTONE PLATFORM" : "ĐỒ ÁN TRỌNG ĐIỂM"}
              </div>
            </div>

            <div className="card-media-wrap">
              <img 
                src={BRANDHUB_SHOTS[0].url} 
                alt="BrandHub Platform" 
                className="card-cover-img"
              />
              <div className="card-media-overlay">
                <span className="overlay-pill brandhub-pill">
                  <FaProjectDiagram size={12} />
                  {isEn ? "Click to view 7 Microservices & 5 Devs" : "Bấm để xem 7 Microservices & 5 Kỹ sư"}
                </span>
              </div>
            </div>

            <div className="card-body-wrap">
              <div className="card-category-badge capstone">
                {isEn ? "CAPSTONE PLATFORM • 5-ENGINEER TEAM" : "ĐỒ ÁN TỐT NGHIỆP TRỌNG ĐIỂM • TEAM 5 KỸ SƯ FPT"}
              </div>

              <h3 className="card-title">BrandHub — Omnichannel Social Media & AI</h3>
              <p className="card-desc">
                {isEn 
                  ? "Enterprise-grade microservices system engineered by our 5-engineer team to automate omnichannel publishing across 5 platforms with AI copywriting & resilient message queuing."
                  : "Nền tảng tự động hóa truyền thông đa kênh: viết 1 bài tự động đăng lên cả 5 mạng xã hội, tích hợp AI thông minh viết bài chuẩn thương hiệu và cam kết không bao giờ bị mất bài."}
              </p>

              <div className="card-highlights-list">
                <div className="highlight-item">
                  <FaServer className="hl-icon purple" />
                  <span><strong>{isEn ? "7 Microservices" : "Hệ thống chịu tải cao"}:</strong> Hoạt động ổn định 24/7</span>
                </div>
                <div className="highlight-item">
                  <FaCogs className="hl-icon purple" />
                  <span><strong>{isEn ? "Resilient RabbitMQ" : "Đăng bài 5 mạng xã hội"}:</strong> Tự động gửi lại nếu mạng lỗi, 0% rớt bài</span>
                </div>
                <div className="highlight-item">
                  <FaRobot className="hl-icon purple" />
                  <span><strong>{isEn ? "AI Context RAG" : "Trợ lý AI viết bài tự động"}:</strong> Đúng văn phong thương hiệu, hút khách</span>
                </div>
                <div className="highlight-item">
                  <FaUsers className="hl-icon purple" />
                  <span><strong>{isEn ? "5-Dev Bench" : "Đội ngũ 5 Kỹ sư FPT"}:</strong> Trực tiếp phát triển, bảo hành chu đáo</span>
                </div>
              </div>

              <div className="card-mini-kpis brandhub-kpis">
                <div className="mini-kpi">
                  <span className="kpi-val">07</span>
                  <span className="kpi-lbl">{isEn ? "Services" : "Dịch vụ"}</span>
                </div>
                <div className="mini-kpi">
                  <span className="kpi-val">0%</span>
                  <span className="kpi-lbl">{isEn ? "Loss (DLQ)" : "Mất tin (DLQ)"}</span>
                </div>
                <div className="mini-kpi">
                  <span className="kpi-val">05 Devs</span>
                  <span className="kpi-lbl">{isEn ? "Full Team" : "5 Kỹ Sư"}</span>
                </div>
              </div>

              <div className="card-action-bar">
                <button 
                  type="button"
                  className="btn-open-detail brandhub-btn"
                  onClick={(e) => { e.stopPropagation(); navigate('/projects/14', { state: { from: 'services' } }); }}
                >
                  <span>{isEn ? "View Complete Details" : "Xem Chi Tiết Dự Án"}</span>
                  <FaArrowRight size={12} />
                </button>

                <a 
                  href="https://github.com/BrandHubOrganization" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-card-live"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>GitHub</span>
                  <FaExternalLinkAlt size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* 3. SAAS AUTOMATION DEEP DIVE — MINIMALIST TASTE-SKILL COMPLIANT */}
      <section id="saas" className="section-container saas-showcase-section" style={{ scrollMarginTop: '170px' }}>
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "CORE SPECIALIZATION" : "LĨNH VỰC TRỌNG TÂM"}</div>
          <h2 className="section-heading">{isEn ? "SaaS Automation: Turning Your Website into a 24/7 Sales Engine" : "Tự Động Hóa SaaS: Biến Website Thành Cỗ Máy Bán Hàng & Vận Hành Tự Động 24/7"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We engineer lean enterprise SaaS automation and omnichannel distribution engines drawn directly from our verified production platforms (Biensovip & BrandHub) — eliminating manual repetitive tasks, syncing 5 social channels, and running autonomous 24/7 conversion pipelines."
              : "Chúng tôi không chỉ dựng website tĩnh đơn thuần. Trọng tâm cốt lõi là xây dựng các giải pháp Tự động hóa SaaS (SaaS Automation) tinh gọn đúc kết từ các hệ thống thực tế (Biensovip & BrandHub), giải phóng 80% thời gian vận hành, đồng bộ 5 mạng xã hội và nhân đôi tỉ lệ chuyển đổi tự động 24/7."}
          </p>

          {/* MINIMALIST KPI STRIP */}
          <div className="saas-kpi-strip">
            <div className="kpi-box">
              <span className="kpi-num">80%</span>
              <span className="kpi-txt">{isEn ? "Manual Work Eliminated" : "Giải phóng việc thủ công"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">&lt; 0.5s</span>
              <span className="kpi-txt">{isEn ? "VietQR Match Latency" : "Khớp cọc VietQR tức thời"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">0 ₫</span>
              <span className="kpi-txt">{isEn ? "Gateway Transaction Fee" : "Phí cổng trung gian"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">05</span>
              <span className="kpi-txt">{isEn ? "Omnichannel Synced" : "Kênh MXH đồng bộ tự động"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">0%</span>
              <span className="kpi-txt">{isEn ? "Loss Rate (RabbitMQ DLQ)" : "Tỷ lệ mất tin (RabbitMQ DLQ)"}</span>
            </div>
            <div className="kpi-sep"></div>
            <div className="kpi-box">
              <span className="kpi-num">24/7</span>
              <span className="kpi-txt">{isEn ? "Autonomous Operations" : "Vận hành tự động xuyên đêm"}</span>
            </div>
          </div>

          {/* MINIMALIST CATEGORY FILTER TABS */}
          <div className="saas-category-tabs">
            <button 
              className={`cat-tab ${activeSaasCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSaasCategory('all')}
            >
              {isEn ? "All Modules (13)" : "Tất Cả Module (13)"}
            </button>
            <button 
              className={`cat-tab ${activeSaasCategory === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveSaasCategory('sales')}
            >
              {isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc"}
            </button>
            <button 
              className={`cat-tab ${activeSaasCategory === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveSaasCategory('ai')}
            >
              {isEn ? "AI & Automation" : "AI & Tự Động Hóa"}
            </button>
            <button 
              className={`cat-tab ${activeSaasCategory === 'omnichannel' ? 'active' : ''}`}
              onClick={() => setActiveSaasCategory('omnichannel')}
            >
              {isEn ? "Omnichannel & Social" : "Đa Kênh & Mạng Xã Hội"}
            </button>
            <button 
              className={`cat-tab ${activeSaasCategory === 'retention' ? 'active' : ''}`}
              onClick={() => setActiveSaasCategory('retention')}
            >
              {isEn ? "Retention & Operations" : "Tương Tác & Vận Hành"}
            </button>
          </div>
        </motion.div>

        {/* REFINED EDITORIAL SHOWCASE GRID */}
        <motion.div 
          className="saas-features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          key={activeSaasCategory}
        >
          {SAAS_MODULES
            .filter(item => activeSaasCategory === 'all' || item.category === activeSaasCategory)
            .map((feat) => {
              return (
                <motion.div 
                  key={feat.id}
                  variants={cardPop} 
                  whileHover={{ y: -3, transition: { duration: 0.18 } }} 
                  className="saas-feature-card"
                  onClick={() => setSelectedSaasFeature(feat)}
                  role="button"
                  tabIndex={0}
                  aria-label={isEn ? `View details for ${feat.titleEn}` : `Xem chi tiết tính năng ${feat.titleVi}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedSaasFeature(feat);
                    }
                  }}
                >
                  {/* Card Top Row: Monochrome Icon + Number + Subtle Metric Pill */}
                  <div className="card-top-row">
                    <div className="feature-icon-box">
                      {getSaasIcon(feat.iconName)}
                    </div>
                    <div className="card-top-meta">
                      {feat.systemBadgeVi && (
                        <span className="card-system-badge">
                          {isEn ? feat.systemBadgeEn : feat.systemBadgeVi}
                        </span>
                      )}
                      <span className="card-number">{feat.num}</span>
                      <span className="card-metric-pill">
                        {isEn ? feat.metricEn : feat.metricVi}
                      </span>
                    </div>
                  </div>

                  {/* Card Visual Preview Thumbnail */}
                  <div className="card-preview-thumb">
                    <img 
                      src={feat.image} 
                      alt={isEn ? feat.titleEn : feat.titleVi}
                      loading="lazy" 
                    />
                    <div className="thumb-hover-overlay">
                      <FaSearch size={11} />
                      <span>{isEn ? "Preview..." : "Xem demo..."}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="card-title">
                    {isEn ? feat.titleEn : feat.titleVi}
                  </h3>

                  {/* Simplified Capability Description with ... */}
                  <p className="card-desc">
                    {isEn ? feat.descEn : feat.descVi}
                  </p>

                  {/* Footer: Quiet Tech Stack Chip & Quick Link */}
                  <div className="card-footer-row">
                    <div className="feature-chip">
                      <FaCode size={11} style={{ marginRight: '5px', opacity: 0.6 }} />
                      <span>{isEn ? feat.techEn : feat.techVi}</span>
                    </div>
                    <span className="card-explore-link">
                      {isEn ? "Details..." : "Chi tiết..."} <FaArrowRight size={10} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </section>

      {/* 4. EMPATHY & PROBLEM/SOLUTION */}
      <section className="section-container">
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "EMPATHY" : "THẤU HIỂU NỖI LO"}</div>
          <h2 className="section-heading">{isEn ? "What Anxieties Stop You From Making a Website?" : "Bạn Lo Lắng Gì Khi Bắt Đầu Làm Website?"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We understand non-technical owners have legitimate concerns. Here is how our team eliminates every single one of them."
              : "Chúng tôi thấu hiểu những băn khoăn thực tế của chủ cửa hàng khi chưa từng làm việc với đội ngũ lập trình."}
          </p>
        </motion.div>

        <motion.div 
          className="empathy-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-ink)' }} />
            <div className="card-svg-wrap">
              <CostConcernSVG />
            </div>
            <div className="card-body">
              <span className="card-num">01 / COST CONCERN</span>
              <h3 className="card-title">{isEn ? "Afraid it's too expensive?" : "Chi Phí Quá Đắt Đỏ?"}</h3>
              <p className="fear-text">{isEn ? "Agencies frequently quote 20 - 50M VND with bloated overhead." : "Nhiều bên báo giá 20-40 triệu kèm nhiều chi phí phát sinh khiến chủ shop e ngại."}</p>
              <div className="solution-box">
                <strong>{isEn ? "Our Commitment: " : "Giải pháp: "}</strong>
                {isEn ? "Calculated strictly on actual man-day effort. Over 75% invested directly in your product, starting at just 11.5M VND with 20-30% startup subsidies." : "Báo giá theo man-day công việc thực tế, chính sách trợ giá 20-30% cho chủ shop, hơn 75% chi phí dồn vào sản phẩm thật."}
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
            <div className="card-svg-wrap">
              <TrustConcernSVG />
            </div>
            <div className="card-body">
              <span className="card-num">02 / TRUST & RELIABILITY</span>
              <h3 className="card-title">{isEn ? "Fear of abandonment?" : "Sợ Bị Lừa Hoặc Bỏ Rơi?"}</h3>
              <p className="fear-text">{isEn ? "Freelancers who disappear after receiving deposit or delivering buggy code." : "Nhiều freelancer làm xong mất hút, website gặp trục trặc không ai sửa."}</p>
              <div className="solution-box">
                <strong>{isEn ? "Our Commitment: " : "Giải pháp: "}</strong>
                {isEn ? "Transparent civil contract signed by Leader Le Tri Trung with explicit delay penalties and 6-12 months free warranty." : "Hợp đồng dân sự do Leader Lê Trí Trung đứng tên pháp lý. Có điều khoản phạt trễ tiến độ theo ngày, nghiệm thu ưng ý mới thanh toán."}
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
            <div className="card-svg-wrap">
              <TechComplexitySVG />
            </div>
            <div className="card-body">
              <span className="card-num">03 / TECHNICAL COMPLEXITY</span>
              <h3 className="card-title">{isEn ? "Not tech-savvy?" : "Công Nghệ Quá Phức Tạp?"}</h3>
              <p className="fear-text">{isEn ? "Confusing English admin dashboards that require a coder to edit product prices." : "Giao diện quản trị khó hiểu, mỗi lần đổi giá hay thêm sản phẩm lại phải gọi thợ."}</p>
              <div className="solution-box">
                <strong>{isEn ? "Our Commitment: " : "Giải pháp: "}</strong>
                {isEn ? "100% intuitive Vietnamese admin panel. Includes 1-on-1 personalized video screen recordings. Manageable in 10 minutes." : "Cổng quản trị 100% Tiếng Việt tối giản, tặng kèm video quay màn hình hướng dẫn 1-1, ai cũng tự cập nhật sản phẩm sau 10 phút."}
              </div>
            </div>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
            <div className="card-svg-wrap">
              <TaxConcernSVG />
            </div>
            <div className="card-body">
              <span className="card-num">04 / LEGAL & TAX</span>
              <h3 className="card-title">{isEn ? "Tax paperwork worries?" : "Rắc Rối Thuế & Giấy Tờ?"}</h3>
              <p className="fear-text">{isEn ? "Worried about Personal Income Tax withholding compliance when hiring freelancers." : "Lo ngại việc thuê cá nhân lập trình sẽ phát sinh vướng mắc với cơ quan thuế."}</p>
              <div className="solution-box">
                <strong>{isEn ? "Our Commitment: " : "Giải pháp: "}</strong>
                {isEn ? "Our team self-declares and remits all Personal Income Tax directly with the state. Zero tax hassle for you." : "Team chúng tôi tự chủ động kê khai và nộp thuế TNCN đầy đủ theo quy định pháp luật. Khách hàng hoàn toàn an tâm!"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. WHY CHOOSE US — LIVE AUDITED METRICS & INFOGRAPHIC */}
      <section className="section-container">
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "PROVEN TRACK RECORD" : "MINH CHỨNG THỰC TẾ TỪ HỆ THỐNG VẬN HÀNH"}</div>
          <h2 className="section-heading">{isEn ? "Why Over 100+ Shop Owners Choose Our Team" : "Tại Sao Hơn 100+ Chủ Shop Đã Tin Tưởng Chúng Tôi?"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We don't sell empty promises. Here are the actual, verified operational metrics achieved on our production client platforms."
              : "Chúng tôi chứng minh năng lực bằng số liệu đo lường thực tế. Dưới đây là các chỉ số vận hành được trích xuất trực tiếp từ Bảng điều khiển quản trị (Admin Dashboard) của hệ thống Biensovip đang hoạt động tại Đà Nẵng."}
          </p>
        </motion.div>

        {/* LIVE METRICS CARDS (DATA EXTRACTED FROM BIENSOVIP /admin/tong-quan) */}
        <motion.div 
          className="live-metrics-banner"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="metrics-banner-header">
            <div className="source-tag">
              <span className="live-pulse" />
              <span>{isEn ? "LIVE METRICS: BIENSOVIP.COM/ADMIN/TONG-QUAN (RECENT 30 DAYS)" : "SỐ LIỆU ĐO LƯỜNG THỰC TẾ: BẢNG QUẢN TRỊ BIENSOVIP.COM (30 NGÀY GẦN NHẤT)"}</span>
            </div>
            <span className="audit-status">
              <FaShieldAlt size={11} style={{ marginRight: '6px' }} />
              {isEn ? "Audited via Live Admin API" : "Dữ liệu đối soát hệ thống thật"}
            </span>
          </div>

          <motion.div 
            className="metrics-kpi-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={cardPop} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-num">37.5%</span>
                <span className="kpi-trend positive">+125% MoM</span>
              </div>
              <div className="kpi-label">{isEn ? "Lead-to-Order Conversion" : "Tỉ Lệ Chốt / Liên Hệ"}</div>
              <div className="kpi-sub">
                {isEn 
                  ? "3.5x higher than average e-commerce benchmark (~8-10%) via automated funnel." 
                  : "Gấp 3.5 lần trung bình ngành TMĐT (8-10%) nhờ tự động hóa phễu và báo giá minh bạch."}
              </div>
            </motion.div>

            <motion.div variants={cardPop} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-num">+300%</span>
                <span className="kpi-trend positive">
                  <FaChartLine size={10} style={{ marginRight: '4px' }} />
                  {isEn ? "Growth" : "Tăng Trưởng"}
                </span>
              </div>
              <div className="kpi-label">{isEn ? "Inquiry & Booking Growth" : "Tăng Trưởng Yêu Cầu & Cọc"}</div>
              <div className="kpi-sub">
                {isEn 
                  ? "Sub-8ms dynamic search and smart categories drove high qualified buyer engagement." 
                  : "Lượng khách chủ động liên hệ tăng gấp 4 lần ngay sau khi triển khai hệ thống lọc tức thời <8ms."}
              </div>
            </motion.div>

            <motion.div variants={cardPop} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-num">36+ Đơn</span>
                <span className="kpi-trend neutral">14 Trang Admin</span>
              </div>
              <div className="kpi-label">{isEn ? "Closed Deals & Catalog" : "Giao Dịch Đã Chốt & Quản Trị"}</div>
              <div className="kpi-sub">
                {isEn 
                  ? "36 high-value plates closed, managing active catalog across 14 admin pages with zero conflicts." 
                  : "Đã xử lý 36 giao dịch thành công, quản lý kho 280+ sản phẩm mượt mà với 14 trang quản trị."}
              </div>
            </motion.div>

            <motion.div variants={cardPop} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-num">93+ Lần</span>
                <span className="kpi-trend positive">100% Tự Động</span>
              </div>
              <div className="kpi-label">{isEn ? "Automated Comparison & AI" : "Tự Động Phân Tích & Đối Chiếu"}</div>
              <div className="kpi-sub">
                {isEn 
                  ? "Auto-computed Five Elements (Kim/Moc/Thuy/Hoa/Tho) matches and multi-plate comparisons." 
                  : "Hệ thống tự giải toán phong thủy ngũ hành theo năm sinh khách hàng và đối chiếu trực quan."}
              </div>
            </motion.div>
          </motion.div>

          {/* VERIFIED AUDIT TRUST BAR */}
          <div className="metrics-trust-bar">
            <div className="trust-item">
              <FaCheckCircle className="trust-icon success" />
              <span>{isEn ? "100% automated deposit matching via VietQR Webhook (0 fee)" : "Khớp cọc tự động 100% qua VietQR Webhook (0đ phí cổng)"}</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <FaShieldAlt className="trust-icon info" />
              <span>{isEn ? "Zero-data-leak SHA-256 audit ledger protection" : "Nhật ký đối soát SHA-256 bảo vệ toàn vẹn dữ liệu"}</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <FaStar className="trust-icon warning" />
              <span>{isEn ? "Partner satisfaction rating: 5.0 / 5.0" : "Đánh giá hài lòng từ đối tác: 5.0 / 5.0"}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="infographic-card"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <img 
            src={infographicTeam} 
            alt="Infographic mô hình 1 Leader + 4 Devs" 
            className="infographic-img"
            onClick={() => setLightboxImg(infographicTeam)}
            title="Bấm để xem phóng to"
          />
        </motion.div>

        <motion.div 
          className="pillars-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={cardPop} className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">01</div>
              <h4>{isEn ? "1 Leader + 4 Devs Model" : "Mô Hình Chuyên Nghiệp"}</h4>
            </div>
            <p>{isEn ? "1 Leader coordinates directly with you, while 4 specialized developers execute frontend, backend, UI/UX, and testing." : "Team 1 Leader + 4 Devs kiểm soát quy trình chặt chẽ, code review từng pull request, CI/CD tự động."}</p>
          </motion.div>

          <motion.div variants={cardPop} className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">02</div>
              <h4>{isEn ? "Simple Civil Contract" : "Hợp Đồng Dân Sự Đơn Giản"}</h4>
            </div>
            <p>{isEn ? "Transparent contracting. Leader Le Tri Trung takes legal accountability for quality and timeline." : "Ký kết minh bạch, dễ dàng. Leader đứng tên pháp lý chịu trách nhiệm cam kết tiến độ và chất lượng."}</p>
          </motion.div>

          <motion.div variants={cardPop} className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">03</div>
              <h4>{isEn ? "Zero Client Tax Hassle" : "Khách KHÔNG Lo Thuế TNCN"}</h4>
            </div>
            <p>{isEn ? "We self-declare and remit our own PIT taxes. Zero administrative paperwork for shop owners." : "Chúng tôi tự kê khai và nộp thuế thu nhập cá nhân đầy đủ. Chủ shop không phải lo thủ tục kế toán rắc rối."}</p>
          </motion.div>

          <motion.div variants={cardPop} className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">04</div>
              <h4>{isEn ? "Maximum Value Efficiency" : "Cơ Chế Giá Trị Tối Ưu"}</h4>
            </div>
            <p>{isEn ? "Over 75% of your investment flows directly into software craft, licensed plugins, and high-speed hosting." : "Hơn 75% chi phí đầu tư trực tiếp vào lập trình và tài nguyên cao cấp (theme, plugin, server xịn), mang lại giá trị thực."}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 5.5. CORE ENGINEERING TEAM (100% FPT UNIVERSITY — EX-FPT SOFTWARE) */}
      <section id="team-section" className="section-container team-bench-section" style={{ scrollMarginTop: '170px' }}>
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "VERIFIED ENGINEERING TEAM" : "ĐỘI NGŨ KỸ SƯ CHÍNH QUY"}</div>
          <h2 className="section-heading">
            {isEn ? "Meet Our 5 Engineers: 100% FPT University — Ex-FPT Software" : "Đội Ngũ 05 Kỹ Sư Thực Chiến: 100% Đại Học FPT — Cựu FPT Software"}
          </h2>
          <p className="section-desc">
            {isEn
              ? "No agency middlemen, no sales markups. You collaborate directly 1-on-1 with Tech Lead Le Tri Trung alongside 4 dedicated engineers specializing in .NET 8, Java Spring Boot, Next.js, and AI automation."
              : "Xóa bỏ hoàn toàn chi phí sales trung gian. Khách hàng làm việc trực tiếp 1-1 với Tech Lead Lê Trí Trung cùng 4 kỹ sư chuyên trách, sở hữu chứng chỉ quốc tế và kinh nghiệm thực chiến dày dặn tại FPT Software."}
          </p>
        </motion.div>

        {/* Highlight Trust Stats */}
        <motion.div 
          className="team-trust-banner"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="trust-stat">
            <span className="stat-value">05</span>
            <span className="stat-label">{isEn ? "Engineers In Da Nang" : "Kỹ Sư Chính Quy Tại Đà Nẵng"}</span>
          </div>
          <div className="stat-divider" />
          <div className="trust-stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">{isEn ? "FPT University Software Engineers" : "Đại Học FPT Chuyên Ngành SE"}</span>
          </div>
          <div className="stat-divider" />
          <div className="trust-stat">
            <span className="stat-value">4 / 5</span>
            <span className="stat-label">{isEn ? "Ex-FPT Software Interns" : "Đã Thực Tập & Làm Việc Tại FPT Software"}</span>
          </div>
          <div className="stat-divider" />
          <div className="trust-stat">
            <span className="stat-value">01</span>
            <span className="stat-label">{isEn ? "Microsoft Certified Professional" : "Chứng Chỉ Quốc Tế Microsoft Pro"}</span>
          </div>
        </motion.div>

        {/* 5 Members Grid */}
        <motion.div 
          className="team-members-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div 
              key={idx} 
              className={`team-member-card ${idx === 0 ? 'lead-card' : ''}`}
              variants={cardPop}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="card-top-stripe" />
              <div className="member-card-body">
                <div className="member-header">
                  <div className="member-avatar-box">
                    {idx === 0 ? <FaUserTie size={22} /> : idx === 1 ? <FaLaptopCode size={22} /> : idx === 2 ? <FaCode size={22} /> : idx === 3 ? <FaAward size={22} /> : <FaServer size={22} />}
                  </div>
                  <div className="member-meta">
                    <div className="member-role-badge">{isEn ? member.roleEn : member.roleVi}</div>
                    <h3 className="member-name">{member.name}</h3>
                  </div>
                </div>

                <div className="member-edu-tag">
                  <FaGraduationCap size={13} />
                  <span>{isEn ? member.eduEn : member.eduVi}</span>
                </div>

                <p className="member-highlight">
                  {isEn ? member.highlightEn : member.highlightVi}
                </p>

                <div className="member-achievements-list">
                  {(isEn ? member.achievementsEn : member.achievementsVi).map((ach, aIdx) => (
                    <div key={aIdx} className="achievement-row">
                      <FaCheckCircle className="check-icon" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="member-skills-row">
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-pill">{skill}</span>
                  ))}
                </div>

                <div className="member-card-footer">
                  <a
                    href={member.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-member-cv"
                  >
                    <FaFileContract size={13} />
                    <span>{isEn ? "View Verified CV" : "Xem CV Kỹ Sư"}</span>
                    <FaExternalLinkAlt size={10} />
                  </a>

                  {idx === 0 && (
                    <Link
                      to="/achievements?tab=education&milestone=1"
                      className="btn-lead-milestone"
                    >
                      <FaAward size={13} />
                      <span>{isEn ? "Lead Dossier" : "Hồ Sơ Năng Lực"}</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Flagship Collaborative Team Deliverable: BrandHub */}
        <motion.div
          className="team-flagship-collaborative-card"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="collaborative-badge-row">
            <span className="collab-pill">
              <FaUsers size={12} />
              {isEn ? "FLAGSHIP COLLABORATIVE DELIVERABLE" : "SẢN PHẨM HỢP TÁC CHUNG TIÊU BIỂU"}
            </span>
            <span className="collab-tag">
              {isEn ? "100% In-house Engineering • 5 Dedicated Engineers" : "100% Nội Lực Đội Ngũ • 5 Kỹ Sư FPT"}
            </span>
          </div>

          <div className="collaborative-content-split">
            <div className="collab-text">
              <h3>BrandHub — Omnichannel Social Media & AI Intelligence</h3>
              <p>
                {isEn 
                  ? "A living proof of our team's synchronized delivery: 5 engineers co-architected 7 microservices across 16 Agile sprints (32 weeks), closing 430+ Jira tasks. From resilient RabbitMQ queues to Neo4j GraphRAG and polyglot persistence, this platform verifies our enterprise engineering caliber."
                  : "Minh chứng rõ nét nhất cho khả năng tác chiến đồng bộ của đội ngũ: Cả 5 kỹ sư đã cùng kiến trúc 7 microservices qua 16 sprint Agile (32 tuần), hoàn thành 430+ task Jira. Từ hàng đợi RabbitMQ Dead Letter Queue đến GraphRAG Neo4j và phân quyền Multi-tenant, hệ thống khẳng định chuẩn mực kỹ thuật cao nhất của team."}
              </p>

              <div className="collab-metrics-strip">
                <div className="metric-chip"><strong>07</strong> {isEn ? "Services" : "Dịch vụ"}</div>
                <div className="metric-chip"><strong>32</strong> {isEn ? "Weeks (16 Sprints)" : "Tuần (16 Sprints)"}</div>
                <div className="metric-chip"><strong>430+</strong> {isEn ? "Jira Tasks" : "Tasks Jira"}</div>
                <div className="metric-chip"><strong>05</strong> {isEn ? "Social Networks" : "Mạng Xã Hội"}</div>
                <div className="metric-chip"><strong>0%</strong> {isEn ? "Message Loss (DLQ)" : "Mất tin (DLQ)"}</div>
              </div>
            </div>

            <div className="collab-actions">
              <button
                onClick={() => {
                  const el = document.getElementById('brandhub-showcase');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-collab-view"
              >
                <FaRocket size={13} />
                <span>{isEn ? "Deep-Dive BrandHub Showcase" : "Khám Phá Chi Tiết BrandHub"}</span>
                <FaArrowRight size={11} />
              </button>

              <Link
                to="/projects/14"
                className="btn-collab-dossier"
              >
                <FaExternalLinkAlt size={11} />
                <span>{isEn ? "Project Case Study #14" : "Hồ Sơ Dự Án #14"}</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Other Notable Team Projects */}
        <motion.div
          className="other-team-projects-block"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="sub-header-row">
            <div>
              <span className="sub-eyebrow">{isEn ? "PROVEN PORTFOLIO" : "HỆ THỐNG THỰC TẾ"}</span>
              <h3 className="sub-title">{isEn ? "Other Notable Projects Developed by Our Engineers" : "Các Dự Án Nhóm & Hệ Thống Khác Đội Ngũ Đã Triển Khai"}</h3>
            </div>
          </div>

          <div className="other-projects-grid">
            {OTHER_TEAM_PROJECTS.map((proj) => (
              <div key={proj.id} className="other-project-card">
                <div className="card-top-meta">
                  <span className="proj-badge">{isEn ? proj.badgeEn : proj.badgeVi}</span>
                  <span className="proj-lead">{isEn ? proj.leadEn : proj.leadVi}</span>
                </div>
                <h4 className="proj-title">{proj.title}</h4>
                <p className="proj-desc">{isEn ? proj.descEn : proj.descVi}</p>
                <div className="proj-tech-row">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-badge">{t}</span>
                  ))}
                </div>
                {proj.linkUrl && proj.linkUrl !== '#' && (
                  <div className="proj-footer">
                    {proj.isExternal ? (
                      <a href={proj.linkUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                        <span>{isEn ? "Visit Live Site" : "Truy Cập Trực Tiếp"}</span>
                        <FaExternalLinkAlt size={10} />
                      </a>
                    ) : (
                      <Link to={proj.linkUrl} className="proj-link">
                        <span>{isEn ? "View Details" : "Xem Chi Tiết"}</span>
                        <FaArrowRight size={10} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Callout: Full Dossier Download */}
        <motion.div 
          className="team-download-dossier-box"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="dossier-info">
            <FaShieldAlt size={30} className="dossier-icon" />
            <div>
              <h4>{isEn ? "Download Comprehensive Company Profile & Technical Quotation (PDF)" : "Tải Về Hồ Sơ Năng Lực Kỹ Thuật & Báo Giá 3 Gói Dịch Vụ (PDF)"}</h4>
              <p>{isEn ? "Official 5-page dossier: Detailed Man-day effort breakdown, verified live Biensovip.com metrics, and guaranteed SLAs." : "Bản PDF 5 trang chính thức: Bóc tách minh bạch chi phí theo Man-day, minh chứng năng lực thực tế Biensovip.com và cam kết tiến độ."}</p>
            </div>
          </div>
          <a
            href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-download-pdf-profile"
          >
            <FaDownload size={14} />
            <span>{isEn ? "Download PDF Profile (5 Pages)" : "Tải PDF Hồ Sơ Năng Lực (5 Trang)"}</span>
          </a>
        </motion.div>
      </section>

      {/* 5. TRANSPARENT PRICING SECTION (FROM EXCEL) */}
      <section id="pricing-section" className="section-container" style={{ scrollMarginTop: '170px' }}>
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "TRANSPARENT QUOTATION" : "BẢNG GIÁ MINH BẠCH"}</div>
          <h2 className="section-heading">{isEn ? "Engineered Packages for Small Businesses" : "Các Gói Dịch Vụ Thiết Kế Web Phù Hợp Từng Giai Đoạn"}</h2>
          <p className="section-desc">
            {isEn 
              ? "Calculated transparently on actual engineering man-days with a 50% discount policy applied for small shop owners."
              : "Chi phí tính minh bạch theo man-day công việc thực tế, đã áp dụng chính sách trợ giá 50% cho chủ shop khởi nghiệp."}
          </p>
        </motion.div>

        <motion.div 
          className="pricing-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Plan 1 */}
          <motion.div 
            className="pricing-card"
            variants={cardPop}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
            <div className="card-inner">
              <div className="plan-badge-row">
                <span className="plan-tag">GÓI 1 DEV</span>
              </div>
              <h3 className="plan-title">{isEn ? "Starter MVP" : "Gói MVP Khởi Nghiệp"}</h3>
              <p className="plan-desc">{isEn ? "Best for small boutiques, single product lines, or launching fast to test the market." : "Phù hợp cho cá nhân, shop mới mở, cần ra mắt web nhanh để bán hàng và thử nghiệm thị trường với chi phí tiết kiệm nhất."}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
                <div className="price-num">11.500.000₫</div>
                <div className="price-speed">
                  <FaClock size={11} style={{ marginRight: '6px' }} />
                  {isEn ? "Average timeline: ~1.5 - 2 months" : "Thời gian thực hiện: ~1.5 - 2 tháng"}
                </div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "Tailored UI/UX matching brand identity" : "Giao diện thiết kế theo yêu cầu, chuẩn nhận diện thương hiệu"}</li>
                <li><FaCheckCircle /> {isEn ? "100% Mobile & Tablet Responsive" : "Tương thích 100% điện thoại, iPad, máy tính"}</li>
                <li><FaCheckCircle /> {isEn ? "Product/service catalog & contact inquiry form" : "Danh mục sản phẩm/dịch vụ, trang giới thiệu, form liên hệ"}</li>
                <li><FaCheckCircle /> {isEn ? "Floating Hotline, Zalo & Messenger buttons" : "Nút gọi Hotline, chat Zalo, Messenger nổi tiện lợi"}</li>
                <li><FaCheckCircle /> {isEn ? "Google SEO Ready + Free SSL Certificate" : "Chuẩn SEO Google cơ bản, chứng chỉ bảo mật SSL"}</li>
                <li><FaCheckCircle /> {isEn ? "Free Cloud VPS/Domain setup & hosting optimization" : "Hỗ trợ kết nối tên miền & cấu hình hosting tối ưu chi phí"}</li>
                <li><FaCheckCircle /> {isEn ? "6 Months Free Technical Warranty" : "Bảo hành kỹ thuật & sửa lỗi miễn phí 6 tháng"}</li>
              </ul>

              <button onClick={scrollToContact} className="btn-select-plan">
                {isEn ? "Choose Starter MVP" : "Chọn Gói Khởi Nghiệp"}
              </button>
            </div>
          </motion.div>

          {/* Plan 2 */}
          <motion.div 
            className="pricing-card featured"
            variants={cardPop}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-ink)' }} />
            <div className="card-inner">
              <div className="plan-badge-row">
                <span className="plan-tag">GÓI 2 DEVS</span>
                <span className="highlight-chip">{isEn ? "RECOMMENDED • 2 DEVS" : "ĐỀ XUẤT • 2 KỸ SƯ"}</span>
              </div>
              <h3 className="plan-title">{isEn ? "Fast MVP (2 Devs)" : "Gói MVP Tốc Hành (2 Devs)"}</h3>
              <p className="plan-desc">{isEn ? "Two engineers working in parallel on frontend and backend to accelerate delivery with rock-solid quality." : "Dành cho shop cần ra mắt chuyên nghiệp với quy trình chuẩn. Hai kỹ sư phụ trách song song Frontend & Backend, tối ưu chất lượng và tiến độ!"}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
                <div className="price-num">18.500.000₫</div>
                <div className="price-speed">
                  <FaClock size={11} style={{ marginRight: '6px' }} />
                  {isEn ? "Average timeline: ~1.5 - 2 months (2 Devs)" : "Thời gian thực hiện: ~1.5 - 2 tháng (2 Kỹ sư)"}
                </div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "All features from Starter MVP" : "Toàn bộ tính năng của Gói Khởi Nghiệp"}</li>
                <li><FaCheckCircle /> <strong>{isEn ? "2 Engineers Working Simultaneously (Frontend & Backend)" : "2 Kỹ sư code song song Frontend & Backend"}</strong></li>
                <li><FaCheckCircle /> {isEn ? "Dynamic VietQR Payment Integration" : "Tích hợp cổng thanh toán VietQR động tự điền số tiền"}</li>
                <li><FaCheckCircle /> {isEn ? "Order Tracking & Telegram/Zalo notification webhook" : "Quản lý đơn hàng tinh gọn, thông báo qua Telegram/Zalo Webhook"}</li>
                <li><FaCheckCircle /> {isEn ? "Admin CMS Panel for products & pricing" : "Cổng quản trị nội dung dễ dùng (sản phẩm, giá, đơn hàng)"}</li>
                <li><FaCheckCircle /> {isEn ? "Free Lifetime Cloud VPS & SSL Setup" : "Miễn phí cài đặt Cloud VPS & chứng chỉ SSL trọn đời"}</li>
                <li><FaCheckCircle /> {isEn ? "8 Months Free Technical Warranty" : "Bảo hành kỹ thuật & hỗ trợ vận hành 8 tháng"}</li>
              </ul>

              <button onClick={scrollToContact} className="btn-select-plan is-featured">
                {isEn ? "Choose Fast MVP" : "Chọn Gói Tốc Hành"}
              </button>
            </div>
          </motion.div>

          {/* Plan 3 */}
          <motion.div 
            className="pricing-card"
            variants={cardPop}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
            <div className="card-inner">
              <div className="plan-badge-row">
                <span className="plan-tag">FULL SCOPE (5 DEVS)</span>
              </div>
              <h3 className="plan-title">{isEn ? "Full Enterprise E-Commerce" : "Gói Chuyên Nghiệp Toàn Diện"}</h3>
              <p className="plan-desc">{isEn ? "Complete e-commerce platform with automated payment, inventory, multi-roles and AI assistant." : "Dành cho thương hiệu, sàn giao dịch, cửa hàng lớn cần tính năng thanh toán tự động, quản lý kho và trợ lý AI thông minh."}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
                <div className="price-num">33.000.000₫</div>
                <div className="price-speed">
                  <FaClock size={11} style={{ marginRight: '6px' }} />
                  {isEn ? "Average timeline: ~2 - 2.5 months (5 Devs)" : "Thời gian thực hiện: ~2 - 2.5 tháng (Team 5 kỹ sư)"}
                </div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "Full E-Commerce / Marketplace: Cart, Orders, Stock" : "Đầy đủ nền tảng Sàn TMĐT / Marketplace: Giỏ hàng, đơn hàng, tồn kho"}</li>
                <li><FaCheckCircle /> {isEn ? "Multi-gateway: VietQR Webhook auto-match, VNPay" : "Tích hợp đa phương thức: VietQR Webhook tự động khớp lệnh, VNPay"}</li>
                <li><FaCheckCircle /> <strong>{isEn ? "Integrated AI Assistant (DeepSeek API) 24/7" : "Tích hợp Trợ lý AI (DeepSeek API) tư vấn & tra cứu 24/7"}</strong></li>
                <li><FaCheckCircle /> {isEn ? "Advanced Admin Dashboard with Analytics" : "Bảng điều khiển quản trị chuyên sâu (Dashboard phân tích doanh thu)"}</li>
                <li><FaCheckCircle /> {isEn ? "Full Source Code Handover & Tech Docs" : "Bàn giao toàn bộ mã nguồn (Full Source Code) & tài liệu kỹ thuật"}</li>
                <li><FaCheckCircle /> {isEn ? "Top Google SEO optimization & CDN <1s" : "Tối ưu SEO Google chuyên sâu, CDN tăng tốc độ tải trang <1s"}</li>
                <li><FaCheckCircle /> {isEn ? "12 Months Priority Warranty & 24/7 Support" : "Bảo hành kỹ thuật ưu tiên 12 tháng + Hỗ trợ trực tiếp 24/7"}</li>
              </ul>

              <button onClick={scrollToContact} className="btn-select-plan">
                {isEn ? "Consult Enterprise" : "Tư Vấn Gói Toàn Diện"}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* NEGOTIATION & STARTUP SUBSIDY HOOK BANNER */}
        <motion.div 
          className="negotiation-banner"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="banner-top-row">
            <div className="banner-badge">
              <FaTag size={11} style={{ marginRight: '6px' }} />
              <span>{isEn ? "FLEXIBLE BUDGET NEGOTIATION POLICY" : "CHÍNH SÁCH THƯƠNG LƯỢNG & ĐÀM PHÁN GIÁ LINH HOẠT"}</span>
            </div>
            <span className="sub-tag">
              <FaAward size={11} style={{ marginRight: '5px' }} />
              {isEn ? "Startup Subsidies 20% – 30%" : "Trợ giá khởi nghiệp 20% – 30%"}
            </span>
          </div>
          <h3 className="banner-title">
            {isEn 
              ? "Worried about the cost? We customize scope to fit your exact budget!"
              : "Bảng giá trên là mức niêm yết chuẩn — Chúng tôi hoàn toàn sẵn sàng đàm phán linh hoạt theo ngân sách của bạn!"}
          </h3>
          <p className="banner-desc">
            {isEn
              ? "We understand non-technical shops have different launch constraints. You don't have to take a rigid bundle: our team can split features into modular phases so you only pay for what brings immediate sales, saving up to 30%."
              : "Chúng tôi hiểu mỗi chủ shop có nguồn lực và ưu tiên khác nhau khi bắt đầu. Bạn KHÔNG cần phải mua một gói cồng kềnh: Team sẵn sàng bóc tách tính năng theo từng giai đoạn (modular scope) để bạn chỉ trả tiền cho những gì thực sự tạo ra doanh thu ngay, tiết kiệm tối đa chi phí."}
          </p>
          <div className="banner-actions">
            <button onClick={scrollToContact} className="btn-negotiate">
              <FaCommentDots /> {isEn ? "Negotiate Custom Budget" : "Trao Đổi Thương Lượng Ngân Sách Riêng"}
            </button>
            <button onClick={() => setShowWorkflowModal(true)} className="btn-learn-pricing">
              <FaFileContract /> {isEn ? "See Man-Day Breakdown & Contract Terms" : "Xem Cách Tính Man-day & Ký Hợp Đồng"}
            </button>
            <a 
              href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-download-pdf"
              download
            >
              <FaArrowRight /> {isEn ? "Download PDF Profile (LaTeX)" : "Tải Hồ Sơ Năng Lực & Báo Giá (PDF)"}
            </a>
          </div>
        </motion.div>

        {/* Policies */}
        <motion.div 
          className="policy-box"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="policy-header">
            <FaShieldAlt size={18} />
            <span>{isEn ? "Transparent Policy Guarantees (Extracted from Contract Model)" : "Chính Sách Cam Kết Minh Bạch (Trích Từ Hợp Đồng Thực Tế)"}</span>
          </div>
          <div className="policy-grid">
            <div className="policy-cell">
              <strong>1. {isEn ? "Safe Payment Milestones" : "Lộ Trình Thanh Toán An Toàn"}:</strong><br />
              {isEn ? "Deposit 30 - 50% upon signing civil contract. Remaining balance is paid only after inspecting and approving the live website." : "Khách hàng đặt cọc 30 - 50% khi ký hợp đồng. Chỉ thanh toán phần còn lại sau khi đã nghiệm thu hài lòng trên môi trường thực tế."}
            </div>
            <div className="policy-cell">
              <strong>2. {isEn ? "Timeline Commitment" : "Cam Kết Thưởng Sớm / Phạt Trễ"}:</strong><br />
              {isEn ? "Contract specifies daily penalty deductions for unexcused delays, ensuring your business launch date is fully respected." : "Hợp đồng ghi rõ điều khoản bồi thường phạt trừ tiền nếu bàn giao trễ hạn đã thống nhất; thưởng nếu hoàn thành sớm trước thời hạn."}
            </div>
            <div className="policy-cell">
              <strong>3. {isEn ? "Flexible Upgrade" : "Lộ Trình Nâng Cấp Linh Hoạt"}:</strong><br />
              {isEn ? "Start with the MVP package today and expand to full e-commerce later without re-writing your codebase from scratch." : "Chủ shop hoàn toàn có thể bắt đầu với gói MVP để tiết kiệm chi phí, sau này nâng cấp lên gói Đầy Đủ mà không cần đập đi xây lại!"}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. 5-STEP PROCESS */}
      <section id="process-section" className="section-container" style={{ scrollMarginTop: '170px' }}>
        <motion.div 
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">{isEn ? "WORK PROCESS" : "QUY TRÌNH 5 BƯỚC"}</div>
          <h2 className="section-heading">{isEn ? "5 Steps to Your Perfect Website" : "Quy Trình 5 Bước Đến Website Hoàn Hảo"}</h2>
          <p className="section-desc">
            {isEn 
              ? "From empathetic listening to verified code delivery. Transparent every step of the way."
              : "Từ sự lắng nghe thấu hiểu đến quy trình bàn giao code chuẩn mực, minh bạch trong từng giai đoạn."}
          </p>
        </motion.div>

        <motion.div 
          className="process-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="process-card">
            <div className="step-svg-box">
              <Step1ScopeSVG />
            </div>
            <span className="step-tag">BƯỚC 01</span>
            <h4 className="step-name">{isEn ? "1. Empathy & Scope" : "1. Lắng Nghe & Tư Vấn"}</h4>
            <p className="step-detail">{isEn ? "Analyze products, target buyers, and essential shop workflows." : "Tìm hiểu kỹ sản phẩm và khách hàng mục tiêu để chọn tính năng thiết thực nhất."}</p>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="process-card">
            <div className="step-svg-box">
              <Step2DesignSVG />
            </div>
            <span className="step-tag">BƯỚC 02</span>
            <h4 className="step-name">{isEn ? "2. Visual Mockup" : "2. Thiết Kế Giao Diện"}</h4>
            <p className="step-detail">{isEn ? "Modern UI/UX layout crafted and approved before writing code." : "Lên bản mẫu giao diện trực quan chuẩn mobile để chủ shop duyệt trước khi lập trình."}</p>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="process-card">
            <div className="step-svg-box">
              <Step3CodingSVG />
            </div>
            <span className="step-tag">BƯỚC 03</span>
            <h4 className="step-name">{isEn ? "3. Clean Coding" : "3. Lập Trình Chuẩn"}</h4>
            <p className="step-detail">{isEn ? "Clean code, sub-1s loading speed, and multi-layer security." : "Lập trình sạch sẽ, bảo mật cao, tối ưu tốc độ tải trang dưới 1 giây mượt mà."}</p>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="process-card">
            <div className="step-svg-box">
              <Step4TestingSVG />
            </div>
            <span className="step-tag">BƯỚC 04</span>
            <h4 className="step-name">{isEn ? "4. Strict QA / CI/CD" : "4. Kiểm Thử Nghiêm Ngặt"}</h4>
            <p className="step-detail">{isEn ? "Tested across iPhone, Android, iPad, and desktop browsers." : "Thử nghiệm đặt hàng, thanh toán trên iPhone, Android và máy tính, không để lọt lỗi."}</p>
          </motion.div>

          <motion.div variants={cardPop} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="process-card">
            <div className="step-svg-box">
              <Step5HandoverSVG />
            </div>
            <span className="step-tag">BƯỚC 05</span>
            <h4 className="step-name">{isEn ? "5. Handover & Warranty" : "5. Bàn Giao & Bảo Hành"}</h4>
            <p className="step-detail">{isEn ? "1-on-1 video guide, keys handover, and 24/7 warranty activation." : "Gửi video hướng dẫn 1-1, bàn giao quyền sở hữu hoàn toàn và bảo hành 24/7."}</p>
          </motion.div>
        </motion.div>

        {/* PROCESS TO QUOTATION & CONTRACT CTA BANNER */}
        <motion.div 
          className="process-cta-banner"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="cta-banner-text">
            <h4>{isEn ? "Want to see how your money is broken down and calculated?" : "Bạn muốn hiểu rõ số tiền của mình được sử dụng và tính toán như thế nào?"}</h4>
            <p>{isEn ? "We believe in radical engineering transparency. See how engineering man-days translate directly into software craftsmanship and strict delay/bonus contract clauses." : "Minh bạch tuyệt đối trong từng dòng code và chi phí: Xem chi tiết cách tính Man-day từ file Báo Giá Excel, quy trình giải ngân an toàn 40/60 và điều khoản phạt trễ tiến độ."}</p>
          </div>
          <button onClick={() => setShowWorkflowModal(true)} className="btn-open-workflow-modal">
            <FaFileContract /> {isEn ? "Explore Quotation & Contract Workflow" : "Khám Phá Quy Trình Báo Giá & Hợp Đồng"}
          </button>
        </motion.div>
      </section>

      {/* Lightbox for Infographic & Screenshots */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out'
            }}
          >
            <div style={{ position: 'relative', maxWidth: '1060px', width: '100%' }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setLightboxImg(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: 0,
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '22px',
                  cursor: 'pointer'
                }}
              >
                <FaTimes />
              </button>
              <img 
                src={lightboxImg} 
                alt="Enlarged Preview" 
                style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 20px 48px rgba(0,0,0,0.6)' }} 
              />
            </div>
          </motion.div>
        )}

        {/* WORKFLOW & QUOTATION BREAKDOWN MODAL (FROM EXCEL) */}
        {showWorkflowModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="workflow-modal-backdrop"
            onClick={() => setShowWorkflowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="workflow-modal-dialog"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-top-bar">
                <div className="modal-title-group">
                  <span className="modal-tag">BẢNG BÓC TÁCH MINH BẠCH</span>
                  <h3>{isEn ? "Quotation & Contract Workflow (From Excel Model)" : "Quy Trình Báo Giá & Ký Hợp Đồng Chi Tiết (Trích Từ Excel)"}</h3>
                </div>
                <button onClick={() => setShowWorkflowModal(false)} className="btn-close-modal">
                  <FaTimes />
                </button>
              </div>

              {/* TABS */}
              <div className="modal-tabs">
                <button 
                  className={`modal-tab ${activeModalTab === 'manday' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('manday')}
                >
                  <FaCogs /> {isEn ? "1. How Man-Days Are Priced" : "1. Bóc Tách Man-day & Đánh Đổi Giá Trị"}
                </button>
                <button 
                  className={`modal-tab ${activeModalTab === 'contract' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('contract')}
                >
                  <FaFileContract /> {isEn ? "2. Contract & 40/60 Payment" : "2. Hợp Đồng & Cọc 40/60"}
                </button>
                <button 
                  className={`modal-tab ${activeModalTab === 'penalty' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('penalty')}
                >
                  <FaShieldAlt /> {isEn ? "3. Early Bonus / Delay Penalty" : "3. Thưởng Sớm / Phạt Trễ"}
                </button>
                <button 
                  className={`modal-tab ${activeModalTab === 'upgrade' ? 'active' : ''}`}
                  onClick={() => setActiveModalTab('upgrade')}
                >
                  <FaSyncAlt /> {isEn ? "4. Feature Request & Upgrades" : "4. Phát Sinh FR & Nâng Cấp Sau"}
                </button>
              </div>

              {/* TAB CONTENT */}
              <div className="modal-body-content">
                {activeModalTab === 'manday' && (
                  <div className="tab-pane">
                    <div className="alert-info-box">
                      <strong>
                        <FaLightbulb size={12} style={{ marginRight: '6px' }} />
                        {isEn ? "Core Value Exchange:" : "Số tiền của bạn được đánh đổi thế nào?"}
                      </strong>
                      <p>{isEn 
                        ? "You are paying for genuine engineering hours, zero-bloat Clean Architecture code, dedicated Cloud VPS servers, and guaranteed delivery — not agency sales commissions." 
                        : "Khách hàng đầu tư trực tiếp vào giờ công kỹ sư thực tế, mã nguồn sạch không dùng template rác, máy chủ Cloud VPS tốc độ cao và cam kết nghiệm thu thực tế — không phải gánh chi phí văn phòng hay hoa hồng sales."}
                      </p>
                    </div>

                    <div className="modal-table-wrap">
                      <table className="excel-table">
                        <thead>
                          <tr>
                            <th>Hạng Mục Phân Bổ</th>
                            <th>Gói MVP (1-2 Devs)</th>
                            <th>Gói Toàn Diện (Full Scope)</th>
                            <th>Ghi Chú Giá Trị Thực Tế</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Phạm Vi Chức Năng</strong></td>
                            <td>UC01 - UC12 + NFR01-03 (12 Use Case cốt lõi)</td>
                            <td>UC01 - UC26 + NFR01-03 (26 Use Case đầy đủ)</td>
                            <td>Đầy đủ sàn TMĐT, VietQR, AI DeepSeek</td>
                          </tr>
                          <tr>
                            <td><strong>Khối Lượng Kỹ Sư</strong></td>
                            <td>23 Man-day công việc</td>
                            <td>63 - 75 Man-day công việc</td>
                            <td>Frontend, Backend, Database, QA/QC</td>
                          </tr>
                          <tr>
                            <td><strong>Chiết Khấu Trợ Giá Dev</strong></td>
                            <td><span className="badge-discount">-50% Đơn Giá Thị Trường</span></td>
                            <td><span className="badge-discount">-50% Đơn Giá Thị Trường</span></td>
                            <td>Chính sách trợ giá cho chủ shop khởi nghiệp</td>
                          </tr>
                          <tr>
                            <td><strong>Hạ Tầng Máy Chủ (VPS)</strong></td>
                            <td>Tặng trọn gói 1 năm Cloud Server</td>
                            <td>Tặng trọn gói 1 năm Cloud Server</td>
                            <td>Máy chủ riêng biệt, IP tĩnh, SSL bảo mật</td>
                          </tr>
                          <tr>
                            <td><strong>Đàm Phán Thực Tế</strong></td>
                            <td><strong>Có Thể Thương Lượng</strong></td>
                            <td><strong>Có Thể Thương Lượng</strong></td>
                            <td>Bóc tách tính năng linh hoạt theo ngân sách</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeModalTab === 'contract' && (
                  <div className="tab-pane">
                    <h4>Lộ Trình Ký Hợp Đồng Dân Sự & Thanh Toán An Toàn 40/60</h4>
                    <p className="tab-desc">Khách hàng hoàn toàn an tâm: Tiền của bạn chỉ được thanh toán toàn bộ sau khi đã tận mắt kiểm tra hệ thống hoạt động ổn định trên môi trường thực tế.</p>
                    
                    <div className="timeline-cards">
                      <div className="timeline-card">
                        <div className="t-badge">GIAI ĐOẠN 1</div>
                        <h5>Ký Hợp Đồng Dân Sự & Đặt Cọc 40%</h5>
                        <p>Leader Lê Trí Trung đứng tên đại diện pháp lý, ký hợp đồng có đầy đủ phụ lục yêu cầu kỹ thuật, mốc deadline và điều khoản cam kết bồi thường.</p>
                      </div>
                      <div className="timeline-card">
                        <div className="t-badge">GIAI ĐOẠN 2</div>
                        <h5>Triển Khai & Báo Cáo Tiến Độ Từng Sprint</h5>
                        <p>Team cập nhật link chạy thử nghiệm định kỳ, chủ shop theo dõi trực quan các màn hình đang hoàn thiện trên điện thoại.</p>
                      </div>
                      <div className="timeline-card highlight">
                        <div className="t-badge success">GIAI ĐOẠN 3</div>
                        <h5>Nghiệm Thu Môi Trường Thật & Thanh Toán 60% Còn Lại</h5>
                        <p>Chỉ khi toàn bộ tính năng đặt hàng, thanh toán VietQR hoạt động mượt mà và chủ shop hài lòng 100%, mới tiến hành thanh toán phần còn lại.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'penalty' && (
                  <div className="tab-pane">
                    <h4>Quy Chế Thưởng Hoàn Thành Sớm / Phạt Bồi Thường Trễ Tiến Độ</h4>
                    <p className="tab-desc">Cam kết tiến độ bằng văn bản rõ ràng, đảm bảo kế hoạch khai trương bán hàng của bạn không bao giờ bị trì hoãn.</p>
                    
                    <div className="penalty-grid-modal">
                      <div className="penalty-card green">
                        <div className="p-header">THƯỞNG HOÀN THÀNH SỚM</div>
                        <ul>
                          <li><strong>2 Ngày Ân Hạn:</strong> Tránh sai số nhỏ về lịch biểu.</li>
                          <li><strong>Thưởng Theo Ngày:</strong> Mỗi ngày sớm hơn thỏa thuận (sau ân hạn), khách thưởng một khoản % giá trị hợp đồng để động viên team tăng ca thần tốc.</li>
                          <li><strong>Có Mức Trần Tối Đa:</strong> Minh bạch giới hạn tối đa ngay trong hợp đồng.</li>
                        </ul>
                      </div>
                      <div className="penalty-card red">
                        <div className="p-header">PHẠT BỒI THƯỜNG TRỄ HẠN</div>
                        <ul>
                          <li><strong>Cam Kết Bồi Thường:</strong> Nếu chậm tiến độ do lỗi chủ quan của dev, dev chịu phạt trừ tiền theo từng ngày trễ.</li>
                          <li><strong>Trừ Trực Tiếp:</strong> Tiền phạt được trừ thẳng vào khoản thanh toán cuối cùng khi nghiệm thu.</li>
                          <li><strong>Bảo Vệ Chủ Shop:</strong> Đảm bảo chủ shop không bao giờ chịu thiệt hại về cơ hội kinh doanh.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'upgrade' && (
                  <div className="tab-pane">
                    <h4>Quy Chế Xử Lý Feature Request (FR) & Nâng Cấp Hệ Thống Sau Này</h4>
                    <p className="tab-desc">Lộ trình nâng cấp linh hoạt: Bạn có thể bắt đầu với gói MVP chi phí tối thiểu, sau này mở rộng quy mô khi doanh thu tăng trưởng.</p>
                    
                    <div className="upgrade-details">
                      <div className="detail-item">
                        <h5>1. Bổ sung tính năng phát sinh (Feature Request - FR)</h5>
                        <p>Trong quá trình làm, nếu bạn nảy ra ý tưởng mới ngoài hợp đồng ban đầu, Leader sẽ lập tức bóc tách thành Man-day độc lập, báo giá cụ thể để bạn quyết định trước khi code, tuyệt đối không có chi phí ẩn.</p>
                      </div>
                      <div className="detail-item">
                        <h5>2. Cơ chế mua MVP trước, nâng cấp Đầy Đủ sau (+20% phụ phí)</h5>
                        <p>Nếu bạn chọn làm MVP trước, sau này nâng cấp lên sàn lớn trên hệ thống đang chạy thật (Production), chi phí sẽ áp dụng hệ số +20% do team phải đọc lại code, kiểm thử đa luồng và đảm bảo không làm gián đoạn khách hàng đang mua sắm.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="modal-footer-bar">
                <a 
                  href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-modal-download"
                  download
                >
                  <FaArrowRight /> {isEn ? "Download Full Company Profile (PDF)" : "Tải Tài Liệu Báo Giá & Hồ Sơ Năng Lực (PDF)"}
                </a>
                <button onClick={() => { setShowWorkflowModal(false); scrollToContact(); }} className="btn-modal-contact">
                  <FaCommentDots /> {isEn ? "Contact Leader for Negotiation" : "Thương Lượng Ngân Sách Với Leader"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SAAS FEATURE DEEP DIVE MODAL */}
        {selectedSaasFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="saas-detail-modal-backdrop"
            onClick={() => setSelectedSaasFeature(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="saas-detail-modal-dialog"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="saas-modal-header">
                <div className="saas-modal-meta">
                  <span className="modal-num-badge">MODULE {selectedSaasFeature.num}</span>
                  <span className="modal-meta-dot">•</span>
                  <span className="modal-cat-badge">
                    {selectedSaasFeature.category === 'sales' 
                      ? (isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc")
                      : selectedSaasFeature.category === 'ai'
                      ? (isEn ? "AI & Automation" : "AI & Tự Động Hóa")
                      : selectedSaasFeature.category === 'omnichannel'
                      ? (isEn ? "Omnichannel & Social" : "Đa Kênh & Mạng Xã Hội")
                      : (isEn ? "Retention & Operations" : "Tương Tác & Vận Hành")}
                  </span>
                  <span className="modal-metric-pill">
                    {isEn ? selectedSaasFeature.metricEn : selectedSaasFeature.metricVi}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedSaasFeature(null)} 
                  className="saas-modal-close-btn"
                  aria-label="Close modal"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              {/* Modal Two-Column Split Body */}
              <div className="saas-modal-body">
                {/* Left Column: Visual Screenshot & Verification */}
                <div className="saas-modal-visual-col">
                  <div 
                    className="screenshot-container"
                    onClick={() => setLightboxImg(selectedSaasFeature.image)}
                    title={isEn ? "Click to view full image in lightbox" : "Bấm để phóng to ảnh kích thước gốc"}
                  >
                    <img 
                      src={selectedSaasFeature.image} 
                      alt={isEn ? selectedSaasFeature.titleEn : selectedSaasFeature.titleVi}
                      className="screenshot-img"
                    />
                    <div className="screenshot-zoom-overlay">
                      <FaSearch size={13} />
                      <span>{isEn ? "Click to view full image" : "Bấm phóng to ảnh thực tế"}</span>
                    </div>
                  </div>

                  <div className="screenshot-caption">
                    <FaCheckCircle className="caption-verified-icon" />
                    <span>{isEn ? selectedSaasFeature.captionEn : selectedSaasFeature.captionVi}</span>
                  </div>

                  <div className="deployment-meta-card">
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "System Origin:" : "Nguồn chứng thực:"}</span>
                      <span className="deploy-value status-origin">
                        {selectedSaasFeature.systemBadgeVi 
                          ? (isEn ? "BrandHub Enterprise Architecture" : "Hệ thống BrandHub Thực tế")
                          : (isEn ? "Biensovip Production Platform" : "Hệ thống Sàn Biensovip")}
                      </span>
                    </div>
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Tech Engine:" : "Hạ tầng kỹ thuật:"}</span>
                      <span className="deploy-value font-mono">{isEn ? selectedSaasFeature.techEn : selectedSaasFeature.techVi}</span>
                    </div>
                    <div className="deploy-row">
                      <span className="deploy-label">{isEn ? "Deliverable Status:" : "Trạng thái bàn giao:"}</span>
                      <span className="deploy-value status-verified">Production Verified</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Business Pain Point & 3-Step Execution */}
                <div className="saas-modal-content-col">
                  <h2 className="saas-modal-title">
                    {isEn ? selectedSaasFeature.titleEn : selectedSaasFeature.titleVi}
                  </h2>

                  {/* Section 1: Pain Point */}
                  <div className="saas-modal-card-block painpoint-block">
                    <div className="block-eyebrow">
                      {isEn ? "BUSINESS PAIN POINT & ARCHITECTURAL SOLUTION" : "BÀI TOÁN KINH DOANH & GIẢI PHÁP NỀN TẢNG"}
                    </div>
                    <p className="block-paragraph">
                      {isEn ? selectedSaasFeature.painPointEn : selectedSaasFeature.painPointVi}
                    </p>
                  </div>

                  {/* Section 2: 3-Step Workflow */}
                  <div className="saas-modal-card-block workflow-block">
                    <div className="block-eyebrow">
                      {isEn ? "3-STEP AUTOMATED EXECUTION WORKFLOW" : "QUY TRÌNH TỰ ĐỘNG HÓA 3 BƯỚC"}
                    </div>
                    <div className="steps-flow-container">
                      {(isEn ? selectedSaasFeature.workflowEn : selectedSaasFeature.workflowVi).map((wf, idx) => (
                        <div key={idx} className="step-flow-item">
                          <div className="step-badge">{wf.step}</div>
                          <div className="step-info">
                            <h4 className="step-title">{wf.title}</h4>
                            <p className="step-desc">{wf.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3: Technical Specs */}
                  <div className="saas-modal-card-block specs-block">
                    <div className="block-eyebrow">
                      {isEn ? "TECHNICAL DELIVERABLES & GUARANTEES" : "TIÊU CHÍ KỸ THUẬT & BÀN GIAO MÃ NGUỒN"}
                    </div>
                    <ul className="modal-specs-list">
                      {(isEn ? selectedSaasFeature.specsEn : selectedSaasFeature.specsVi).map((spec, sIdx) => (
                        <li key={sIdx}>
                          <span className="spec-dot" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Section 4: Dual Action CTAs */}
                  <div className="saas-modal-actions-bar">
                    <a 
                      href="https://zalo.me/84912158715" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-action-zalo"
                    >
                      <FaCommentDots size={14} />
                      <span>{isEn ? "Chat 1-1 with Tech Lead (Zalo)" : "Nhắn Zalo 1-1 Với Tech Lead"}</span>
                    </a>

                    <button 
                      onClick={() => {
                        const featTitle = selectedSaasFeature.titleVi;
                        setSelectedSaasFeature(null);
                        navigate('/contact', { state: { service: featTitle } });
                      }} 
                      className="btn-action-quote"
                    >
                      <span>{isEn ? "Request Quotation & Scope" : "Để Lại Thông Tin Báo Giá"}</span>
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
                    </AnimatePresence>
    </div>
  );
};

export default Services;
