import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaPlay,
  FaPause,
  FaCheckCircle,
} from 'react-icons/fa';
import { WordReveal, KenBurnsSlides, MagneticWrap } from '../../animations/InteractiveEffects';

const DECODE_STEPS = [
  {
    num: '01',
    badgeVi: 'Bước 01 / 04 • Technical BA & Elicitation',
    badgeEn: 'Step 01 / 04 • Technical BA & Elicitation',
    titleVi: 'Khảo sát thực địa & Chuẩn hóa SRS theo Karl Wiegers',
    titleEn: 'Field Elicitation & Karl Wiegers Atomic SRS',
    descVi:
      'Khảo sát trực tiếp từ quy trình và biểu mẫu vận hành thật của doanh nghiệp. Áp dụng quy tắc Zero-Manage để phân rã yêu cầu thô thành 370+ Atomic Functional Requirements, 85 Business Rules (BR-xx) và tự động hóa 139+ sơ đồ Visual Paradigm (.vpp).',
    descEn:
      'Conduct direct field elicitation from real operational templates. Apply the Zero-Manage Rule to refine raw needs into 370+ Atomic Functional Requirements, 85 Business Rules (BR-xx), and 139+ Visual Paradigm (.vpp) UML diagrams.',
    metrics: ['370+ Atomic FRs', '85 Business Rules', '139+ UML Diagrams'],
    img: '/docs/images/DA-D19-06.png',
    captionVi: 'Màn hình phân quyền Multi-Tenant RBAC & đặc tả SRS trên hệ thống BrandHub',
    captionEn: 'Multi-Tenant RBAC & atomic SRS implementation on BrandHub',
  },
  {
    num: '02',
    badgeVi: 'Bước 02 / 04 • Clean Architecture & High-Load DB',
    badgeEn: 'Step 02 / 04 • Clean Architecture & High-Load DB',
    titleVi: 'Kiến trúc .NET 8 / Spring Boot 3 & Truy vấn GIN < 8ms',
    titleEn: '.NET 8 / Spring Boot 3 & Sub-8ms PostgreSQL GIN',
    descVi:
      'Thiết kế hệ thống phân tầng Clean Architecture và cụm 7 Microservices chịu tải cao. Tối ưu 61 bảng PostgreSQL với GIN Index phản hồi dưới 8ms trên 1,1 triệu bản ghi đấu giá VPA, kết hợp khóa phân tán Redis Lock và hàng đợi RabbitMQ DLQ 0% mất tin.',
    descEn:
      'Architect layered Clean Architecture and 7-microservice clusters. Optimize 61 PostgreSQL tables with GIN indexes for sub-8ms queries over 1.1M+ VPA auction records, paired with Redis distributed locks and zero-loss RabbitMQ DLQ.',
    metrics: ['< 8ms GIN Query', '1.1M+ VPA Records', '0% Loss RabbitMQ DLQ'],
    img: '/docs/images/biensovip_real_plates.png',
    captionVi: 'Kho 26 trang biển số thực tế trên Biensovip.com với bộ lọc GIN Index dưới 8ms',
    captionEn: '26-page live plate inventory on Biensovip.com with sub-8ms GIN filtering',
  },
  {
    num: '03',
    badgeVi: 'Bước 03 / 04 • AI Pipeline & VietQR Settlement',
    badgeEn: 'Step 03 / 04 • AI Pipeline & VietQR Settlement',
    titleVi: 'Tích hợp AI GraphRAG, Acoustic DSP & VietQR 0đ Phí',
    titleEn: 'AI GraphRAG, 10-Metric DSP & Zero-Fee VietQR Webhook',
    descVi:
      'Xây dựng luồng đối soát cọc ngân hàng VietQR động khớp lệnh trong 0.5 giây không tốn phí cổng trung gian. Tích hợp trợ lý AI DeepSeek/Llama 3 GraphRAG tư vấn 24/7 và pipeline chấm điểm giọng nói 10 chỉ số âm học (Acoustic DSP + Whisper).',
    descEn:
      'Engineer dynamic VietQR bank webhook reconciliation settling deposits in 0.5s with zero gateway fees. Integrate 24/7 DeepSeek/Llama 3 GraphRAG advisors and a 10-metric acoustic voice DSP pipeline.',
    metrics: ['< 0.5s VietQR Match', '0đ Gateway Fee', '10-Metric Voice DSP'],
    img: '/docs/images/biensovip_home_real.png',
    captionVi: 'Sàn Biensovip.com vận hành thực tế với luồng đặt cọc VietQR tự động 0.5s',
    captionEn: 'Live Biensovip.com marketplace with 0.5s automated VietQR deposit checkout',
  },
  {
    num: '04',
    badgeVi: 'Bước 04 / 04 • E2E Verification & Production SLA',
    badgeEn: 'Step 04 / 04 • E2E Verification & Production SLA',
    titleVi: 'Kiểm thử 2.500+ Test Cases, 320+ Playwright E2E & Bàn giao',
    titleEn: '2,500+ Test Cases, 320+ Playwright E2E & Production Delivery',
    descVi:
      'Mọi yêu cầu nguyên tử trong SRS đều được truy vết hai chiều tới hơn 2.500 kịch bản kiểm thử và 320+ file Playwright E2E tự động. Triển khai Docker Linux VPS 24/7 kèm nhật ký kiểm toán bất biến SHA-256 và cam kết bảo hành kỹ thuật 60 ngày.',
    descEn:
      'Every atomic requirement traces bi-directionally to 2,500+ QA test cases and 320+ automated Playwright E2E suites. Deployed on 24/7 Docker Linux VPS with immutable SHA-256 audit logs and a 60-day warranty.',
    metrics: ['2,500+ Test Cases', '320+ Playwright E2E', '193/193 Game Tests'],
    img: '/docs/images/DA-D19-12.png',
    captionVi: 'Bảng điều khiển giám sát hàng đợi bất đồng bộ & Telemetry thực tế của BrandHub',
    captionEn: 'Live async queue telemetry & E2E verification dashboard on BrandHub',
  },
];

const FOUR_PILLARS = [
  {
    num: '01',
    nameVi: 'Sàn Thương Mại Tải Cao & Đấu Giá Quốc Gia',
    nameEn: 'High-Load Marketplace & National Auction Engine',
    descVi: 'Biensovip.com: Đồng bộ 1,1 triệu bản ghi đấu giá VPA, máy trạng thái 4-Tab FSM, lọc GIN <8ms và đối soát cọc VietQR <0.5s.',
    descEn: 'Biensovip.com: 1.1M+ VPA auction records, 4-Tab FSM lifecycle, sub-8ms GIN search, and <0.5s VietQR webhook settlement.',
    peekImg: '/docs/images/biensovip_real_dashboard.png',
    highlights: [
      {
        titleVi: '1,1M+ Bản ghi VPA & Máy trạng thái 4-Tab FSM',
        titleEn: '1.1M+ VPA Records & 4-Tab Finite State Machine',
        textVi: 'Quản lý vòng đời biển số qua 4 trạng thái (Kho Sẵn Có, Đấu Giá VPA, Đang Giữ Cọc Redis Lock 15p, Đã Bán) kèm 57 Use Cases & 85 Business Rules.',
        textEn: 'Full plate lifecycle across 4 FSM states with 15-min Redis distributed locks, backed by 57 Use Cases and 85 Business Rules.',
      },
      {
        titleVi: 'TikTok Live 9:16 Studio & Mạng lưới 14 CTV',
        titleEn: 'TikTok Live 9:16 Studio & 14-Agent UTM Portal',
        textVi: 'Tích hợp công cụ phát sóng TikTok Live 9:16 (Safe-Zone Overlay, F1–F6 Soundboard), chấm điểm Phong Thủy 4 trụ và tự động chia hoa hồng UTM.',
        textEn: 'Built-in 9:16 TikTok Live overlay & F1-F6 soundboard, 4-pillar Feng Shui engine, and automated UTM affiliate ledger.',
      },
    ],
    cards: [
      {
        titleVi: 'Trung Tâm Quản Trị & Kho 26 Trang Thực Tế',
        titleEn: 'Live Admin Command Center & 26-Page Inventory',
        metaVi: '.NET 8 Clean Architecture · 61 Bảng PostgreSQL · Redis Lock',
        metaEn: '.NET 8 Clean Architecture · 61 PostgreSQL Tables · Redis Lock',
        textVi: 'Giao diện quản trị thực tế đã ghi nhận 150 biển bán thành công (tỷ lệ chốt 33.3%), 6.380+ lượt tìm kiếm và nhật ký kiểm toán SHA-256 bất biến.',
        textEn: 'Production admin dashboard tracking 150 sold plates (33.3% conversion), 6,380+ searches, and immutable SHA-256 audit logs.',
        slides: [
          '/docs/images/biensovip_real_dashboard.png',
          '/docs/images/biensovip_real_plates.png',
          '/docs/images/biensovip_real_audit.png',
        ],
      },
      {
        titleVi: 'Sàn Giao Dịch, Phong Thủy 4 Trụ & Cổng CTV',
        titleEn: 'Marketplace, 4-Pillar Numerology & Affiliate Portal',
        metaVi: 'React 19 · VietQR Webhook <0.5s · DeepSeek RAG 24/7',
        metaEn: 'React 19 · VietQR Webhook <0.5s · DeepSeek RAG 24/7',
        textVi: 'Khách hàng tra cứu hợp mệnh, so sánh 2–4 biển song song, xem video TikTok thực tế và đặt cọc VietQR tự động khớp lệnh sau 0.5 giây.',
        textEn: 'Buyers evaluate 4-pillar compatibility, compare 2-4 plates side by side, watch embedded TikTok clips, and settle deposits in 0.5s.',
        slides: [
          '/docs/images/biensovip_home_real.png',
          '/docs/images/biensovip_real_fengshui.png',
          '/docs/images/biensovip_real_ctv.png',
          '/docs/images/biensovip_real_comparison.png',
        ],
      },
    ],
    ctaPrimaryVi: 'Xem Hồ Sơ Dự Án #26',
    ctaPrimaryEn: 'View Case Study #26',
    ctaPrimaryUrl: '/projects/26',
    ctaSecondaryVi: 'Mở Trang Thật Biensovip.com ↗',
    ctaSecondaryEn: 'Visit Live Biensovip.com ↗',
    ctaSecondaryUrl: 'https://biensovip.com',
    driveUrl: 'https://drive.google.com/drive/u/0/folders/1Co2k-tGTlGEEEJ1jY04arhtNMuqyW4gu',
    driveLabelVi: 'Hồ sơ BA & FSM Google Drive',
    driveLabelEn: 'BA & FSM Google Drive',
  },
  {
    num: '02',
    nameVi: 'Hệ Sinh Thái 7 Microservices & AI Đa Kênh',
    nameEn: '7-Microservices Omnichannel & GraphRAG Platform',
    descVi: 'BrandHub (brandhub.id.vn): Chuẩn hóa 141 Atomic FRs, cụm 7 Microservices Spring Boot 3, RabbitMQ DLQ 0% mất tin và 79 màn hình Mobile.',
    descEn: 'BrandHub (brandhub.id.vn): 141 Atomic FRs, 7 Spring Boot 3 microservices, zero-loss RabbitMQ DLQ, and 79 React Native screens.',
    peekImg: '/docs/images/DA-D19-01.png',
    highlights: [
      {
        titleVi: '109 Yêu cầu thô → 141 Atomic FRs & 2.500+ Test Cases',
        titleEn: '109 Raw Needs → 141 Atomic FRs & 2,500+ Test Cases',
        textVi: 'Bóc tách từ mẫu vận hành thật của agency truyền thông thành 141 chức năng nguyên tử trên 6 tác nhân, kiểm chứng bởi 320+ file Playwright E2E.',
        textEn: 'Refined from real media agency templates into 141 atomic functions across 6 actors, verified by 320+ Playwright E2E test files.',
      },
      {
        titleVi: '7 Microservices, RabbitMQ DLQ & Neo4j GraphRAG',
        titleEn: '7 Microservices, RabbitMQ DLQ & Neo4j GraphRAG',
        textVi: 'Tự động lên lịch và xuất bản đồng loạt lên 5 mạng xã hội (Facebook, TikTok, Instagram, Threads, Zalo) với cơ chế Exponential Backoff 0% rớt bài.',
        textEn: 'Schedules and dispatches content across 5 social networks with RabbitMQ Dead Letter Queue protection and GraphRAG brand voice.',
      },
    ],
    cards: [
      {
        titleVi: 'Command Center Đa Kênh & Trình Xuất Bản 5 MXH',
        titleEn: 'Multichannel Command Center & 5-Platform Publisher',
        metaVi: 'Java 21 Spring Boot 3 · Spring Cloud Gateway · OAuth2',
        metaEn: 'Java 21 Spring Boot 3 · Spring Cloud Gateway · OAuth2',
        textVi: 'Không gian làm việc hợp nhất cho Agency, Brand và Creator: soạn thảo 1 lần, tự động căn chỉnh định dạng và đăng đồng thời lên 5 nền tảng.',
        textEn: 'Unified workspace for Agencies, Brands, and Creators: author once, auto-format aspect ratios, and publish across 5 social channels.',
        slides: [
          '/docs/images/DA-D19-01.png',
          '/docs/images/DA-D19-03.png',
          '/docs/images/DA-D19-08.png',
          '/docs/images/DA-D19-09.png',
        ],
      },
      {
        titleVi: 'Pipeline AI GraphRAG & Giám Sát Hàng Đợi RabbitMQ',
        titleEn: 'Python FastAPI GraphRAG & RabbitMQ Telemetry',
        metaVi: 'Python FastAPI · Neo4j + ChromaDB · 320+ Playwright E2E',
        metaEn: 'Python FastAPI · Neo4j + ChromaDB · 320+ Playwright E2E',
        textVi: 'Sinh nội dung tự động bám sát Brand Guidelines bằng Llama 3 / Claude, phân quyền Multi-Tenant 4 cấp và theo dõi tiến độ hàng đợi thời gian thực.',
        textEn: 'Context-aware copywriting adhering to Brand Guidelines via Llama 3 / Claude, 4-tier multi-tenant isolation, and live queue telemetry.',
        slides: [
          '/docs/images/DA-D19-04.png',
          '/docs/images/DA-D19-05.png',
          '/docs/images/DA-D19-06.png',
          '/docs/images/DA-D19-12.png',
        ],
      },
    ],
    ctaPrimaryVi: 'Xem Hồ Sơ Dự Án #14',
    ctaPrimaryEn: 'View Case Study #14',
    ctaPrimaryUrl: '/projects/14',
    ctaSecondaryVi: 'Trải Nghiệm BrandHub.id.vn ↗',
    ctaSecondaryEn: 'Visit BrandHub.id.vn ↗',
    ctaSecondaryUrl: 'https://brandhub.id.vn',
    driveUrl: 'https://drive.google.com/drive/folders/1CjfeDVfT30N12sL61ZIaIECzalY8bJIY?usp=sharing',
    driveLabelVi: 'Kho SRS 141 FRs Google Drive',
    driveLabelEn: '141 FRs SRS Google Drive',
  },
  {
    num: '03',
    nameVi: 'AI Voice DSP SaaS & Nghiên Cứu Khoa Học ICTA 2026',
    nameEn: 'AI Voice DSP SaaS & ICTA 2026 Published Research',
    descVi: 'The MC Hub (10-Metric Acoustic DSP, 87 MCs tháng đầu) & Bài báo quốc tế ThreadLearn AI (1.5B QLoRA đạt 73.3% sửa lỗi bất đồng bộ JS).',
    descEn: 'The MC Hub (10-Metric Acoustic DSP, 87 MCs in month 1) & ICTA 2026 ThreadLearn AI paper (1.5B QLoRA reaching 73.3% JS bug repair).',
    peekImg: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png',
    highlights: [
      {
        titleVi: 'The MC Hub: 10 Chỉ số Âm học DSP & 116 Atomic FRs',
        titleEn: 'The MC Hub: 10-Metric Acoustic DSP & 116 Atomic FRs',
        textVi: 'Phân tích cao độ (F0), tốc độ nói, độ ngân, tỷ lệ ngập ngừng và phát âm tiếng Việt qua Whisper + Librosa; thu hút 87 MC và 20 gói trả phí tháng đầu.',
        textEn: 'Evaluates pitch contour, speaking rate, disfluency, and Vietnamese pronunciation via Whisper + Librosa; 87 MCs onboarded in month 1.',
      },
      {
        titleVi: 'ThreadLearn AI: Đồng tác giả bài báo quốc tế ICTA 2026',
        titleEn: 'ThreadLearn AI: ICTA 2026 International Paper Co-Author',
        textVi: 'Fine-tune mô hình Qwen2.5-Coder 1.5B bằng QLoRA kết hợp BM25 + AST RAG, đạt tỷ lệ sửa lỗi bất đồng bộ JavaScript 73.3% (vượt GPT-3.5 65.0%).',
        textEn: 'Fine-tuned Qwen2.5-Coder 1.5B with QLoRA and BM25 + AST RAG, achieving 73.3% fix rate on JS concurrency bugs (surpassing GPT-3.5).',
      },
    ],
    cards: [
      {
        titleVi: 'The MC Hub: Phòng Luyện Giọng AI & Chấm Điểm DSP',
        titleEn: 'The MC Hub: AI Voice Coaching & 10-Metric DSP Studio',
        metaVi: 'React 19 · Spring Boot 3.3 · Python FastAPI DSP · 139 UMLs',
        metaEn: 'React 19 · Spring Boot 3.3 · Python FastAPI DSP · 139 UMLs',
        textVi: '69 màn hình React 19, 47 Controllers, 51 MongoDB Collections và hệ thống bài tập thở bụng, đọc kịch bản teleprompter thời gian thực.',
        textEn: '69 React 19 screens, 47 Spring Boot controllers, 51 MongoDB collections, and real-time teleprompter acoustic diagnostics.',
        slides: [
          'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png',
          'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png',
        ],
      },
      {
        titleVi: 'ThreadLearn AI: Kiến Trúc AST RAG & Kết Quả Thực Nghiệm',
        titleEn: 'ThreadLearn AI: AST RAG Pipeline & Benchmark Results',
        metaVi: 'Qwen2.5-Coder 1.5B · QLoRA · BM25 + AST RAG · ICTA 2026',
        metaEn: 'Qwen2.5-Coder 1.5B · QLoRA · BM25 + AST RAG · ICTA 2026',
        textVi: 'Trích xuất đồ thị AST và mẫu Race-Condition trong JavaScript/Node.js, giảm độ trễ suy luận trên GPU cục bộ và đạt 73.3% độ chính xác.',
        textEn: 'AST graph extraction and race-condition pattern detector for JavaScript/Node.js, reaching 73.3% repair accuracy on local GPU.',
        slides: [
          'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579605/my-website/assets/projects/screenshots/slide_07_pipeline.png',
          'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579607/my-website/assets/projects/screenshots/slide_11_main_results.png',
        ],
      },
    ],
    ctaPrimaryVi: 'Xem Dự Án The MC Hub #11',
    ctaPrimaryEn: 'View The MC Hub #11',
    ctaPrimaryUrl: '/projects/11',
    ctaSecondaryVi: 'Đọc Bài Báo ThreadLearn AI →',
    ctaSecondaryEn: 'Read ThreadLearn Paper →',
    ctaSecondaryUrl: '/blog/threadlearn-javascript-concurrency-bugs',
  },
  {
    num: '04',
    nameVi: 'Hệ Sinh Thái 12 Game 3D TikTok Live & Giải Pháp Doanh Nghiệp',
    nameEn: '12 TikTok Live 3D Games & Enterprise Software Suite',
    descVi: 'Tương tác TikTok Live 9:16 thời gian thực (193/193 automated tests), cổng việc làm AI JobFinder (56 FRs) và hệ thống y tế – giáo dục.',
    descEn: 'Real-time 9:16 3D TikTok Live games (193/193 automated tests), JobFinder AI portal (56 FRs), and enterprise healthcare/education apps.',
    peekImg: '/docs/images/tiktok_live_3d.jpg',
    highlights: [
      {
        titleVi: '12 Game 3D Tương Tác TikTok Live & AdminTong 21 Biểu Đồ',
        titleEn: '12 Real-Time 3D TikTok Live Games & 21-Chart AdminTong',
        textVi: 'Kết nối TikTok Live WebSocket nhận quà tặng, bình luận để điều khiển nhân vật 3D thời gian thực (Cúng Chùa Online 3D, Cuộc Đua Kỳ Thú 3D).',
        textEn: 'Ingests live TikTok gift and comment streams via WebSockets to drive real-time 3D physics and a 21-chart ApexCharts analytics center.',
      },
      {
        titleVi: 'JobFinder AI (56 FRs), Dola Bakery & Cổng Học Bổng Úc',
        titleEn: 'JobFinder AI (56 FRs), Dola Bakery & Australia Study Portal',
        textVi: 'Từ cổng tuyển dụng tích hợp Elasticsearch 8.x & PayOS HMAC-SHA256 đến ứng dụng di động React Native và hệ thống quản trị đa chi nhánh.',
        textEn: 'Spans Elasticsearch 8.x recruitment platforms with PayOS webhooks to React Native mobile apps and multi-branch ERP systems.',
      },
    ],
    cards: [
      {
        titleVi: 'Hệ Sinh Thái 12 Game 3D TikTok Live Thời Gian Thực',
        titleEn: '12-Game Real-Time 3D TikTok Live Interactive Ecosystem',
        metaVi: 'Three.js / WebGL · Socket.IO · 193/193 Automated Tests',
        metaEn: 'Three.js / WebGL · Socket.IO · 193/193 Automated Tests',
        textVi: 'Tối ưu khung hình 9:16 mượt mà trên phiên live đông người xem, tích hợp bộ điều khiển AdminTong 21 biểu đồ doanh thu và kiểm thử tự động 100%.',
        textEn: 'Optimized 9:16 WebGL rendering for high-concurrency streams, backed by a 21-chart revenue dashboard and 193/193 passing tests.',
        slides: ['/docs/images/tiktok_live_3d.jpg'],
      },
      {
        titleVi: 'Báo Giá Thiết Kế Website & SaaS Trọn Gói Đà Nẵng',
        titleEn: 'Turnkey Web, E-Commerce & SaaS Engineering Studio',
        metaVi: 'SynapForge Studio · Hợp Đồng Ký Quỹ 40/60 · Bảo Hành 60 Ngày',
        metaEn: 'SynapForge Studio · 40/60 Escrow · 60-Day Warranty',
        textVi: 'Làm việc trực tiếp 1-1 cùng Lê Trí Trung và đội ngũ 5 kỹ sư FPT: bàn giao trọn gói mã nguồn, tích hợp VietQR 0đ phí và trợ lý AI.',
        textEn: 'Work directly 1-on-1 with Le Tri Trung and our 5 FPT engineers: full source-code handover, zero-fee VietQR, and custom AI agents.',
        slides: [
          '/branding/preview-dich-vu-hero.png',
          '/branding/preview-dich-vu-redis.png',
        ],
      },
    ],
    ctaPrimaryVi: 'Xem Dự Án TikTok 3D #30',
    ctaPrimaryEn: 'View TikTok 3D #30',
    ctaPrimaryUrl: '/projects/30',
    ctaSecondaryVi: 'Xem Báo Giá Dịch Vụ Web →',
    ctaSecondaryEn: 'Explore Web Services →',
    ctaSecondaryUrl: '/dich-vu',
  },
];

const REAL_LIFE_MOMENTS = [
  {
    id: 'hackathon-champion',
    shape: 'is-hole',
    badgeVi: 'GIẢI THƯỞNG & HỌC THUẬT • 2024 – 2026',
    badgeEn: 'HONORS & RESEARCH • 2024 – 2026',
    titleVi: 'Quán Quân Hackathon CV 2026 & Chung Kết InnoCodeCamp',
    titleEn: 'Hackathon CV 2026 Winner & InnoCodeCamp National Finalist',
    whenVi: 'FPT Education × SIT Singapore · ICTA 2026 Co-Author',
    whenEn: 'FPT Education × SIT Singapore · ICTA 2026 Co-Author',
    descVi:
      'Đạt giải Nhất Hackathon Computer Vision 2026, đồng tác giả bài báo quốc tế ICTA 2026, Đội trưởng Chung kết Toàn quốc InnoCodeCamp 2025 và Top 5 ResFes.',
    descEn:
      '1st Place Winner at Hackathon Computer Vision 2026, ICTA 2026 international paper co-author, InnoCodeCamp 2025 National Finalist Team Leader.',
    photos: [
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1787394791/my-website/assets/Certificate/AI_Computer_Vision.png',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962667/my-website/assets/activities/Dreamers_Innocode_Camp.png',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962644/my-website/assets/Certificate/Event/DreamersResfres.png',
    ],
    ctaVi: 'Xem 10 Giải Thưởng & 42+ Chứng Chỉ',
    ctaEn: 'View 10 Honors & 42+ Certificates',
    link: '/achievements?tab=prizes',
  },
  {
    id: 'international-exchange',
    shape: 'is-arch',
    badgeVi: 'TRAO ĐỔI QUỐC TẾ & ĐẠI HỌC FPT',
    badgeEn: 'GLOBAL EXCHANGE & FPT UNIVERSITY',
    titleVi: 'Trao Đổi Sinh Viên Malaysia & Kỹ Sư CNTT ĐH FPT',
    titleEn: 'Malaysia Student Exchange & FPT Software Engineering',
    whenVi: 'TAR UMT Kuala Lumpur · Đại học FPT Đà Nẵng (GPA 3.3/4.0)',
    whenEn: 'TAR UMT Kuala Lumpur · FPT University Da Nang (GPA 3.3/4.0)',
    descVi:
      'Đại diện sinh viên tham gia chương trình trao đổi quốc tế tại Malaysia, thực tập sinh dự án doanh nghiệp tại FPT Software và sở hữu IELTS 6.0.',
    descEn:
      'Selected for the international exchange program at TAR UMT Malaysia, completed enterprise OJT at FPT Software, and holds IELTS 6.0.',
    photos: [
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962693/my-website/assets/educationMemories/Malaysia_Memory.jpg',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962692/my-website/assets/educationMemories/FPT_Memory_1.jpg',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962695/my-website/assets/slider/SliderImg1.jpg',
    ],
    ctaVi: 'Xem Hành Trình Học Vấn',
    ctaEn: 'Explore Academic Journey',
    link: '/achievements?tab=education',
  },
  {
    id: 'leadership-community',
    shape: 'is-curve',
    badgeVi: 'LÃNH ĐẠO CỘNG ĐỒNG & SỰ KIỆN',
    badgeEn: 'COMMUNITY LEADERSHIP & PUBLIC SPEAKING',
    titleVi: 'MC 50+ Sự Kiện Lớn & Sáng Lập Quỹ The Dreamers',
    titleEn: 'Host of 50+ Major Events & Founder of The Dreamers',
    whenVi: '600 – 1.000+ Khán giả · Trọng tài AI & Robotics 2025',
    whenEn: '600 – 1,000+ Audience · Chief Referee AI & Robotics 2025',
    descVi:
      'Trực tiếp dẫn dắt hơn 50 hội thảo, gala (600–1.000+ người), làm Trọng tài trưởng giải FPTU AI & Robotics và điều hành tổ chức thiện nguyện 30+ thành viên.',
    descEn:
      'Hosted 50+ conferences and galas (600–1,000+ attendees), served as Chief Referee for FPTU AI & Robotics, and founded a 30+ member charity.',
    photos: [
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962672/my-website/assets/activities/Gala_HonTanDatViet.jpg',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962685/my-website/assets/activities/AI_Robotics_Referee.jpg',
      'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962670/my-website/assets/activities/Dreamers_Charity_Fundraising.jpg',
    ],
    ctaVi: 'Xem 18+ Hoạt Động Thực Tế',
    ctaEn: 'View 18+ Real Activities',
    link: '/achievements?tab=activities',
  },
];

export const InteractiveDecodeShowcase = ({ isEn }) => {
  const prefersReducedMotion = useReducedMotion();

  // State for Section 1: Decode Portal Stage
  const [activeDecodeStep, setActiveDecodeStep] = useState(0);
  const [autoCycleDecode, setAutoCycleDecode] = useState(true);

  // State for Section 2: 4 Pillars Accordion + Floating Peek Lens
  const [openPillarIdx, setOpenPillarIdx] = useState(0);
  const peekLensRef = useRef(null);
  const [peekImg, setPeekImg] = useState(FOUR_PILLARS[0].peekImg);
  const [peekVisible, setPeekVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !autoCycleDecode) return;
    const timer = setInterval(() => {
      setActiveDecodeStep((prev) => (prev + 1) % DECODE_STEPS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [autoCycleDecode, prefersReducedMotion]);

  // Smooth cursor tracking for the floating circular photo peek lens
  useEffect(() => {
    if (prefersReducedMotion) return;
    const lens = peekLensRef.current;
    if (!lens) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let rafId = null;

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      lens.style.left = `${currentX}px`;
      lens.style.top = `${currentY}px`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
    };
  }, [prefersReducedMotion]);

  const currentStep = DECODE_STEPS[activeDecodeStep] || DECODE_STEPS[0];

  return (
    <div>
      {/* ============================================================
          SECTION A: DECODE PORTAL STAGE (GIAIMAMANHAI .decode STYLE)
         ============================================================ */}
      <section style={{ paddingBottom: '72px' }}>
        <div
          style={{
            backgroundColor: '#18181B',
            color: '#FAF8F3',
            borderRadius: '32px',
            border: '2px solid #18181B',
            boxShadow: '7px 7px 0px #F5C242',
            padding: 'clamp(28px, 4.5vw, 52px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Title, Progress Bar, Step Pills */}
            <div>
              <span
                className="sticky-note-tag"
                style={{
                  backgroundColor: '#F5C242',
                  color: '#18181B',
                  transform: 'rotate(-1.5deg)',
                  marginBottom: '16px',
                }}
              >
                ★ {isEn ? 'HOW WE ENGINEER & DECODE' : 'GIẢI MÃ QUY TRÌNH KỸ NGHỆ'}
              </span>

              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(26px, 3.6vw, 42px)',
                  fontWeight: 800,
                  lineHeight: 1.14,
                  color: '#F5C242',
                  margin: '0 0 14px 0',
                }}
              >
                <WordReveal
                  text={
                    isEn
                      ? 'From Raw Business Needs to Sub-8ms Production'
                      : 'Từ Bài Toán Nghiệp Vụ Đến Hệ Thống Chạy Thật'
                  }
                />
              </h2>

              <p
                style={{
                  fontSize: '15.5px',
                  lineHeight: 1.62,
                  color: '#D4D4D8',
                  margin: '0 0 22px 0',
                  maxWidth: '46ch',
                }}
              >
                {isEn
                  ? 'Every project at SynapForge follows a strict 4-stage lifecycle combining Karl Wiegers Requirement Engineering with high-load architecture and automated Playwright verification.'
                  : 'Mỗi dự án tại SynapForge đều đi qua 4 bước khép kín: kết hợp chuẩn đặc tả yêu cầu phần mềm Karl Wiegers với kiến trúc chịu tải cao và kiểm thử tự động.'}
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: 'rgba(255, 255, 255, 0.16)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}
              >
                <motion.div
                  animate={{ width: `${((activeDecodeStep + 1) / DECODE_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: '100%',
                    backgroundColor: '#F5C242',
                    borderRadius: '999px',
                  }}
                />
              </div>

              {/* Interactive Step Switcher Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                {DECODE_STEPS.map((st, idx) => {
                  const isActive = idx === activeDecodeStep;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => {
                        setActiveDecodeStep(idx);
                        setAutoCycleDecode(false);
                      }}
                      data-cursor={isEn ? `Step ${st.num}` : `Bước ${st.num}`}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: '1.5px solid #F5C242',
                        backgroundColor: isActive ? '#F5C242' : 'transparent',
                        color: isActive ? '#18181B' : '#FAF8F3',
                        cursor: 'pointer',
                        transition: 'all 0.22s ease',
                      }}
                    >
                      {isEn ? `Step ${st.num}` : `Bước ${st.num}`}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setAutoCycleDecode((v) => !v)}
                  aria-label={autoCycleDecode ? 'Tạm dừng tự chuyển' : 'Bật tự chuyển'}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#F5C242',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {autoCycleDecode ? <FaPause size={11} /> : <FaPlay size={11} />}
                </button>
              </div>
            </div>

            {/* Right Column: Circular Portal Window + Sculpted Panel */}
            <div className="decode-portal-stage">
              <div
                className="decode-portal-window"
                data-cursor={isEn ? 'Next Step ↻' : 'Bước tiếp ↻'}
                onClick={() => setActiveDecodeStep((prev) => (prev + 1) % DECODE_STEPS.length)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={currentStep.img}
                  alt={isEn ? currentStep.titleEn : currentStep.titleVi}
                  style={{
                    transform: `rotate(${activeDecodeStep * 6 - 4}deg) scale(1.06)`,
                  }}
                />
              </div>

              <div className="decode-portal-panel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.num}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        color: '#D97706',
                        letterSpacing: '0.06em',
                        marginBottom: '8px',
                      }}
                    >
                      {isEn ? currentStep.badgeEn : currentStep.badgeVi}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(20px, 2.4vw, 26px)',
                        fontWeight: 800,
                        lineHeight: 1.25,
                        color: 'var(--color-ink)',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {isEn ? currentStep.titleEn : currentStep.titleVi}
                    </h3>

                    <p
                      style={{
                        fontSize: '14.5px',
                        lineHeight: 1.62,
                        color: 'var(--color-ink-soft)',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {isEn ? currentStep.descEn : currentStep.descVi}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      {currentStep.metrics.map((m, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '999px',
                            backgroundColor: '#FDE68A',
                            color: '#18181B',
                            border: '1.5px solid #18181B',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          ✓ {m}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-ink-soft)',
                      }}
                    >
                      📷 {isEn ? currentStep.captionEn : currentStep.captionVi}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION B: 4 INTERACTIVE PILLARS ACCORDION + PHOTO PEEK LENS
          (Modeled after giaimamanhai.vercel.app .themes + Il .slides)
         ============================================================ */}
      <section style={{ paddingBottom: '72px', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '24px',
          }}
        >
          <div>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              ❖ {isEn ? '4 INTERACTIVE ARCHITECTURE PILLARS' : '4 CHỦ ĐỀ HỆ THỐNG & HỒ SƠ THỰC CHIẾN'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.6vw, 42px)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--color-ink)',
                margin: '6px 0 0 0',
              }}
            >
              <WordReveal
                text={
                  isEn
                    ? 'Click Any Pillar to Inspect Live Screenshots & BA Specs'
                    : 'Bấm Vào Từng Chủ Đề Để Xem Ảnh Thật & Hồ Sơ BA'
                }
              />
            </h2>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '21px',
              fontWeight: 700,
              color: 'var(--color-ink-soft)',
            }}
          >
            {isEn
              ? 'hover to peek photo • click to expand gallery ↘'
              : 'rê chuột để soi ảnh thật • bấm để mở kho ảnh ↘'}
          </span>
        </div>

        {/* Floating Circular Photo Peek Lens (follows cursor on desktop) */}
        <div
          ref={peekLensRef}
          className={`theme-peek-lens ${peekVisible ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          <img src={peekImg} alt="" />
        </div>

        {/* 4 Accordion Rows */}
        <div
          style={{
            borderTop: '2px solid var(--color-border-strong)',
          }}
          onPointerLeave={() => setPeekVisible(false)}
        >
          {FOUR_PILLARS.map((pillar, idx) => {
            const isOpen = openPillarIdx === idx;
            return (
              <div
                key={pillar.num}
                className={`theme-accordion-item ${isOpen ? 'is-open' : ''}`}
              >
                {/* Clickable Row Header */}
                <div
                  className="theme-accordion-row"
                  data-cursor={isOpen ? (isEn ? 'Close' : 'Đóng') : (isEn ? 'Expand' : 'Mở xem')}
                  onPointerEnter={() => {
                    setPeekImg(pillar.peekImg);
                    setPeekVisible(true);
                  }}
                  onClick={() => setOpenPillarIdx(isOpen ? -1 : idx)}
                >
                  {/* Left: Title + Desc + Giant Gradient Number */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        fontWeight: 800,
                        color: 'var(--color-ink)',
                        margin: '0 0 8px 0',
                        paddingRight: '56px',
                      }}
                    >
                      {isEn ? pillar.nameEn : pillar.nameVi}
                    </h3>
                    <p
                      style={{
                        fontSize: '14.5px',
                        lineHeight: 1.55,
                        color: 'var(--color-ink-soft)',
                        maxWidth: '42ch',
                        margin: 0,
                      }}
                    >
                      {isEn ? pillar.descEn : pillar.descVi}
                    </p>
                    <span className="theme-giant-num" aria-hidden="true">
                      {pillar.num}
                    </span>
                  </div>

                  {/* Right: 2 Staggered Sub-Highlights + Rotating Plus Button */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                      gap: '20px',
                      paddingRight: '60px',
                      alignItems: 'start',
                    }}
                  >
                    {pillar.highlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        style={{
                          marginTop: hIdx === 1 ? 'clamp(0px, 2.5vw, 32px)' : '0px',
                          backgroundColor: 'var(--color-card-bg)',
                          border: '1.5px solid var(--color-border-strong)',
                          borderRadius: '20px',
                          padding: '16px 18px',
                          boxShadow: '3px 3px 0px #18181B',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: '#2563EB',
                            marginBottom: '4px',
                          }}
                        >
                          0{idx * 2 + hIdx + 1}.
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '15.5px',
                            fontWeight: 800,
                            color: 'var(--color-ink)',
                            marginBottom: '6px',
                            lineHeight: 1.3,
                          }}
                        >
                          {isEn ? hl.titleEn : hl.titleVi}
                        </div>
                        <p
                          style={{
                            fontSize: '13.5px',
                            lineHeight: 1.5,
                            color: 'var(--color-ink-soft)',
                            margin: 0,
                          }}
                        >
                          {isEn ? hl.textEn : hl.textVi}
                        </p>
                      </div>
                    ))}
                  </div>

                  <span className="theme-plus-btn" aria-hidden="true">
                    +
                  </span>
                </div>

                {/* Expandable 28px-Rounded Showcase Drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                      onPointerEnter={() => setPeekVisible(false)}
                    >
                      <div className="tp-rounded-drawer">
                        {pillar.cards.map((card, cIdx) => (
                          <div
                            key={cIdx}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px',
                            }}
                          >
                            <KenBurnsSlides
                              images={card.slides}
                              alt={isEn ? card.titleEn : card.titleVi}
                              aspectRatio="16/10"
                              borderRadius="20px"
                              cursorLabel={isEn ? 'Slide Photo' : 'Đổi ảnh'}
                            />
                            <div
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#F5C242',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {isEn ? card.metaEn : card.metaVi}
                            </div>
                            <h4
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '18px',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                margin: 0,
                                lineHeight: 1.3,
                              }}
                            >
                              {isEn ? card.titleEn : card.titleVi}
                            </h4>
                            <p
                              style={{
                                fontSize: '13.5px',
                                lineHeight: 1.55,
                                color: '#D4D4D8',
                                margin: 0,
                              }}
                            >
                              {isEn ? card.textEn : card.textVi}
                            </p>
                          </div>
                        ))}

                        {/* Right Column inside Drawer: Arch Dome Action Card (.tp-arch-callout) */}
                        <aside className="tp-arch-callout">
                          <div
                            style={{
                              width: '58px',
                              height: '58px',
                              borderRadius: '50%',
                              backgroundColor: '#18181B',
                              color: '#F5C242',
                              display: 'grid',
                              placeItems: 'center',
                              fontFamily: 'var(--font-pixel)',
                              fontSize: '22px',
                              fontWeight: 700,
                              border: '2px solid #18181B',
                              marginTop: '4px',
                            }}
                          >
                            #{pillar.num}
                          </div>

                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '17px',
                                fontWeight: 800,
                                color: '#18181B',
                                marginBottom: '6px',
                              }}
                            >
                              {isEn ? 'Live Demo & BA Dossier' : 'Trải Nghiệm & Hồ Sơ BA'}
                            </div>
                            <p
                              style={{
                                fontSize: '13px',
                                lineHeight: 1.5,
                                color: '#27272A',
                                margin: 0,
                              }}
                            >
                              {isEn
                                ? 'Inspect full architecture diagrams, atomic SRS requirements, and live production deployment.'
                                : 'Xem trực tiếp kiến trúc hệ thống, tài liệu SRS nguyên tử và bản chạy thực tế.'}
                            </p>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              width: '100%',
                            }}
                          >
                            <Link
                              to={pillar.ctaPrimaryUrl}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '10px 16px',
                                borderRadius: '999px',
                                backgroundColor: '#18181B',
                                color: '#FFFFFF',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11.5px',
                                fontWeight: 700,
                                textDecoration: 'none',
                              }}
                            >
                              <span>{isEn ? pillar.ctaPrimaryEn : pillar.ctaPrimaryVi}</span>
                              <FaArrowRight size={10} />
                            </Link>

                            {pillar.ctaSecondaryUrl.startsWith('http') ? (
                              <a
                                href={pillar.ctaSecondaryUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '9px 14px',
                                  borderRadius: '999px',
                                  backgroundColor: '#FAF8F3',
                                  color: '#18181B',
                                  border: '1.5px solid #18181B',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                <span>{isEn ? pillar.ctaSecondaryEn : pillar.ctaSecondaryVi}</span>
                                <FaExternalLinkAlt size={10} />
                              </a>
                            ) : (
                              <Link
                                to={pillar.ctaSecondaryUrl}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '9px 14px',
                                  borderRadius: '999px',
                                  backgroundColor: '#FAF8F3',
                                  color: '#18181B',
                                  border: '1.5px solid #18181B',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                <span>{isEn ? pillar.ctaSecondaryEn : pillar.ctaSecondaryVi}</span>
                              </Link>
                            )}

                            {pillar.driveUrl && (
                              <a
                                href={pillar.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '6px',
                                  padding: '7px 12px',
                                  borderRadius: '999px',
                                  backgroundColor: '#A7E8BD',
                                  color: '#18181B',
                                  border: '1.5px solid #18181B',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10.5px',
                                  fontWeight: 700,
                                  textDecoration: 'none',
                                }}
                              >
                                <FaFolderOpen size={11} />
                                <span>{isEn ? pillar.driveLabelEn : pillar.driveLabelVi}</span>
                              </a>
                            )}
                          </div>
                        </aside>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          SECTION C: SCULPTED REAL-PHOTO MOMENTS GALLERY
          (Modeled after giaimamanhai.vercel.app .acts: hole, arch, curve)
         ============================================================ */}
      <section style={{ paddingBottom: '72px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '26px',
          }}
        >
          <div>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              📸 {isEn ? 'AUTHENTIC MOMENTS & FIELDWORK' : 'HÌNH ẢNH THỰC TẾ & DẤU ẤN HÀNH TRÌNH'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.5vw, 40px)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: 'var(--color-ink)',
                margin: '6px 0 0 0',
              }}
            >
              <WordReveal
                text={
                  isEn
                    ? 'Beyond the Code: Hackathons, Global Exchange & Stage'
                    : 'Phía Sau Những Dòng Code: Đấu Trường, Quốc Tế & Sân Khấu'
                }
              />
            </h2>
          </div>

          <MagneticWrap>
            <Link
              to="/achievements"
              className="btn-robin-dark"
              data-cursor={isEn ? 'All Proofs' : 'Xem tất cả'}
            >
              <span className="plus-box">★</span>
              <span>{isEn ? 'VIEW ALL ACHIEVEMENTS' : 'XEM TOÀN BỘ THÀNH TÍCH'}</span>
            </Link>
          </MagneticWrap>
        </div>

        <div className="act-sculpted-grid">
          {REAL_LIFE_MOMENTS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`act-sculpted-card ${item.shape}`}
              data-cursor={isEn ? 'Explore ↗' : 'Khám phá ↗'}
            >
              {/* Top Photo Slideshow Layer */}
              <div style={{ position: 'relative', width: '100%' }}>
                <KenBurnsSlides
                  images={item.photos}
                  alt={isEn ? item.titleEn : item.titleVi}
                  aspectRatio="16/10"
                  borderRadius="0px"
                  intervalMs={3800 + idx * 500}
                  cursorLabel={isEn ? 'Switch Photo' : 'Xem ảnh thật'}
                />
              </div>

              {/* Sculpted Rounded / Pill / Arch Content Card */}
              <div className="act-sculpted-overlay">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: idx === 0 ? '#F5C242' : idx === 1 ? '#A7E8BD' : '#FCE7F3',
                    color: '#18181B',
                    border: '1.5px solid #18181B',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 800,
                    marginBottom: '8px',
                  }}
                >
                  <FaCheckCircle size={10} />
                  <span>{isEn ? item.badgeEn : item.badgeVi}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '19px',
                    fontWeight: 800,
                    lineHeight: 1.28,
                    color: '#18181B',
                    margin: '0 0 6px 0',
                  }}
                >
                  {isEn ? item.titleEn : item.titleVi}
                </h3>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#D97706',
                    marginBottom: '8px',
                  }}
                >
                  {isEn ? item.whenEn : item.whenVi}
                </div>

                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.52,
                    color: '#3F3F46',
                    margin: '0 0 14px 0',
                  }}
                >
                  {isEn ? item.descEn : item.descVi}
                </p>

                <Link
                  to={item.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    backgroundColor: '#18181B',
                    color: '#FAF8F3',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <span>{isEn ? item.ctaEn : item.ctaVi}</span>
                  <FaArrowRight size={10} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InteractiveDecodeShowcase;
