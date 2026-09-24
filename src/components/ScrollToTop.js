import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Route metadata mapping for Vietnamese and English
 */
const ROUTE_SEO = {
  "/": {
    titleVi: "Lê Trí Trung — Tech Lead & Full-Stack Engineer | Portfolio",
    titleEn: "Le Tri Trung — Tech Lead & Full-Stack Engineer | Portfolio",
    descVi: "Tech Lead dẫn dắt đội 5 kỹ sư tại Đà Nẵng — chuyên thiết kế Website kinh doanh, SaaS Automation, tích hợp AI Agent và vận hành sàn thương mại điện tử thực chiến.",
    descEn: "Tech Lead directing a 5-engineer team in Da Nang — specialized in high-performance web development, SaaS automation, AI agents, and production marketplace systems.",
    keywords: "Lê Trí Trung, Tech Lead, Full-Stack Engineer, Da Nang, Java Spring Boot, React, SaaS Automation, AI Agent, Biensovip, BrandHub"
  },
  "/dich-vu": {
    titleVi: "Dịch Vụ Thiết Kế Website & Tự Động Hóa SaaS | Team 5 Kỹ Sư Đà Nẵng",
    titleEn: "Web Development & SaaS Automation Services | Da Nang 5-Dev Team",
    descVi: "Dịch vụ phát triển website và giải pháp SaaS Automation tinh gọn từ Team 5 Kỹ Sư Đà Nẵng: VietQR 0đ phí, quản lý kho 8ms, đồng bộ 5 mạng xã hội và CSKH tự động 24/7.",
    descEn: "Turnkey web systems & SaaS automation by our 5-engineer bench: 0% fee VietQR reconciliation, 8ms Redis stock locking, 5-social omnichannel auto-publishing, and 24/7 AI advisory.",
    keywords: "thiết kế website Đà Nẵng, tự động hóa SaaS, VietQR đối soát tự động, AI Agent bán hàng, BrandHub, Biensovip, lập trình web doanh nghiệp"
  },
  "/services": {
    titleVi: "Dịch Vụ Thiết Kế Website & Tự Động Hóa SaaS | Team 5 Kỹ Sư Đà Nẵng",
    titleEn: "Web Development & SaaS Automation Services | Da Nang 5-Dev Team",
    descVi: "Dịch vụ phát triển website và giải pháp SaaS Automation tinh gọn từ Team 5 Kỹ Sư Đà Nẵng: VietQR 0đ phí, quản lý kho 8ms, đồng bộ 5 mạng xã hội và CSKH tự động 24/7.",
    descEn: "Turnkey web systems & SaaS automation by our 5-engineer bench: 0% fee VietQR reconciliation, 8ms Redis stock locking, 5-social omnichannel auto-publishing, and 24/7 AI advisory.",
    keywords: "thiết kế website Đà Nẵng, tự động hóa SaaS, VietQR đối soát tự động, AI Agent bán hàng, BrandHub, Biensovip, lập trình web doanh nghiệp"
  },
  "/projects": {
    titleVi: "Dự Án Thực Chiến & Sản Phẩm Đã Bàn Giao | Lê Trí Trung",
    titleEn: "Production Projects & Delivered Systems | Le Tri Trung",
    descVi: "Danh mục các dự án và sản phẩm phần mềm thực tế: Sàn giao dịch Biensovip.com, nền tảng phân phối đa kênh BrandHub, hệ thống AI Computer Vision, JobFinder...",
    descEn: "Portfolio of production systems and client applications: Biensovip.com marketplace, BrandHub omnichannel SaaS, AI Computer Vision platforms, and enterprise web solutions.",
    keywords: "dự án phần mềm, Biensovip, BrandHub, Microservices Spring Boot, React, dự án thực tế"
  },
  "/projects/26": {
    titleVi: "Biensovip.com — Sàn Biển Số Đẹp, Lọc 8ms & Cổng VietQR 0đ | Lê Trí Trung",
    titleEn: "Biensovip.com — High-Performance Marketplace & VietQR Flow | Le Tri Trung",
    descVi: "Hồ sơ kiến trúc sàn TMĐT Biensovip: Quản lý hàng chục nghìn biển số, PostgreSQL GIN Index < 8ms, cổng nhận cọc VietQR 0đ phí và khóa kho phân tán Redis Lock.",
    descEn: "Production case study of Biensovip.com: 3,240+ plates, sub-8ms PostgreSQL queries, zero-fee VietQR webhook settlement, and Redis distributed stock locks.",
    keywords: "Biensovip, sàn biển số đẹp, PostgreSQL GIN index, VietQR đối soát tự động, Redis distributed lock, React 19, .NET 8"
  },
  "/projects/14": {
    titleVi: "BrandHub — Nền Tảng Omnichannel 5 MXH, AI RAG & Microservices | Team 5 Kỹ Sư",
    titleEn: "BrandHub — Omnichannel Social Publisher & AI RAG Platform | Le Tri Trung",
    descVi: "Đồ án trọng điểm kiến trúc 7 Microservices (Spring Boot 3 + Python FastAPI): Tự động hóa đăng bài 5 MXH, RabbitMQ DLQ chống mất bài và AI RAG chuẩn giọng thương hiệu.",
    descEn: "Enterprise microservices capstone by 5-dev team: Automated publishing across 5 social platforms, RabbitMQ DLQ retry, and context-aware AI RAG brand voice synthesis.",
    keywords: "BrandHub, Omnichannel social publisher, Microservices Spring Boot 3, RabbitMQ DLQ, Python FastAPI RAG, Docker cluster"
  },
  "/about": {
    titleVi: "Giới Thiệu & Hành Trình Kỹ Sư | Lê Trí Trung",
    titleEn: "About Me & Engineering Journey | Le Tri Trung",
    descVi: "Tìm hiểu về Lê Trí Trung — Tech Lead, Kỹ sư phần mềm, Quán quân Hackathon Computer Vision 2026, cựu thực tập sinh FPT Software và người sáng lập The Dreamers.",
    descEn: "Discover Le Tri Trung's background — Tech Lead, Software Engineer, FPT University Hackathon Champion 2026, ex-FPT Software intern, and community founder.",
    keywords: "Lê Trí Trung giới thiệu, Kỹ sư FPT, Tech Lead Đà Nẵng, Hackathon Champion"
  },
  "/achievements": {
    titleVi: "Thành Tích, Giải Thưởng & Chứng Chỉ Kỹ Thuật | Lê Trí Trung",
    titleEn: "Achievements, Honors & Professional Certifications | Le Tri Trung",
    descVi: "Bảng tổng hợp giải thưởng, học bổng đại học FPT, chứng chỉ chuyên môn quốc tế và các hoạt động cộng đồng của Lê Trí Trung.",
    descEn: "Comprehensive dossier of awards, FPT University honors, international technical certifications, and social impact leadership by Le Tri Trung.",
    keywords: "giải thưởng lập trình, chứng chỉ IBM RAG LangChain, FPT University, học bổng"
  },
  "/blog": {
    titleVi: "Blog Kỹ Thuật & Kiến Trúc Phần Mềm | Lê Trí Trung",
    titleEn: "Engineering Blog & Software Architecture Insights | Le Tri Trung",
    descVi: "Bài viết chuyên sâu về kiến trúc Microservices, RabbitMQ Dead Letter Queue, tối ưu hóa PostgreSQL vs MongoDB, kinh nghiệm triển khai SaaS thực chiến.",
    descEn: "In-depth engineering articles on Microservices, RabbitMQ DLQ fault tolerance, PostgreSQL vs MongoDB indexing, and production SaaS design patterns.",
    keywords: "blog kỹ thuật, kiến trúc phần mềm, RabbitMQ DLQ, PostgreSQL GIN Index, Spring Boot 3"
  },
  "/contact": {
    titleVi: "Liên Hệ & Đặt Lịch Tư Vấn Kỹ Thuật 1-1 | Lê Trí Trung",
    titleEn: "Contact & 1-on-1 Technical Consultation | Le Tri Trung",
    descVi: "Kết nối trực tiếp 1-1 với Tech Lead Lê Trí Trung để nhận tư vấn kỹ thuật, báo giá phát triển website, hệ thống SaaS hoặc thảo luận cơ hội hợp tác.",
    descEn: "Connect 1-on-1 directly with Tech Lead Le Tri Trung for engineering consultation, custom web/SaaS quotations, or recruitment opportunities.",
    keywords: "liên hệ Lê Trí Trung, tư vấn thiết kế web, tuyển dụng software engineer"
  },
  "/resume": {
    titleVi: "Hồ Sơ Năng Lực (CV) & Kỹ Năng Chuyên Môn | Lê Trí Trung",
    titleEn: "Curriculum Vitae (CV) & Technical Competencies | Le Tri Trung",
    descVi: "Xem và tải CV chính thức của Lê Trí Trung — Tech Lead, Java Spring Boot, React, Python FastAPI, kinh nghiệm triển khai Cloud và điều phối dự án.",
    descEn: "View and download the official CV of Le Tri Trung — Tech Lead, Java Spring Boot, React, Python FastAPI, cloud infrastructure, and Agile team management.",
    keywords: "CV Lê Trí Trung, Resume Software Engineer, Java Developer CV"
  }
};

/**
 * ScrollToTop component ensures:
 * 1. Window scrolls to top or target hash on route changes.
 * 2. Document title, meta description, and Open Graph tags update dynamically for SEO.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');

  // Dynamic SEO & Title Management
  useEffect(() => {
    // 1. Determine base route info
    let routeInfo = ROUTE_SEO[pathname];

    if (!routeInfo) {
      if (pathname.startsWith('/projects/')) {
        routeInfo = {
          titleVi: "Chi Tiết Dự Án & Hồ Sơ Kỹ Thuật | Lê Trí Trung",
          titleEn: "Project Technical Deep-Dive | Le Tri Trung",
          descVi: "Hồ sơ kiến trúc chi tiết, sơ đồ hệ thống, công nghệ sử dụng và kết quả thực tế của dự án.",
          descEn: "Detailed technical blueprint, architecture specs, and production results of the project.",
          keywords: "dự án kỹ thuật, chi tiết mã nguồn, production showcase"
        };
      } else if (pathname.startsWith('/blog/')) {
        routeInfo = {
          titleVi: "Bài Viết Kỹ Thuật & Kiến Trúc | Lê Trí Trung Blog",
          titleEn: "Technical Article & Architecture | Le Tri Trung Blog",
          descVi: "Phân tích kỹ thuật chi tiết, bài học thực chiến và giải pháp tối ưu hệ thống phần mềm.",
          descEn: "Detailed architectural analysis, lessons learned, and system optimization techniques.",
          keywords: "bài viết kỹ thuật, software architecture, technical deep-dive"
        };
      } else {
        routeInfo = {
          titleVi: "Lê Trí Trung — Tech Lead & Full-Stack Engineer",
          titleEn: "Le Tri Trung — Tech Lead & Full-Stack Engineer",
          descVi: "Tech Lead dẫn dắt đội 5 kỹ sư tại Đà Nẵng — chuyên thiết kế Website kinh doanh và SaaS Automation.",
          descEn: "Tech Lead directing a 5-engineer team in Da Nang — specialized in web systems and SaaS automation.",
          keywords: "Lê Trí Trung, Tech Lead, Da Nang"
        };
      }
    }

    // 2. Set document.title
    const pageTitle = isEn ? routeInfo.titleEn : routeInfo.titleVi;
    document.title = pageTitle;

    // 3. Helper to update or create meta tags
    const updateMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const pageDesc = isEn ? routeInfo.descEn : routeInfo.descVi;
    updateMetaTag('name', 'description', pageDesc);
    updateMetaTag('name', 'keywords', routeInfo.keywords || "Lê Trí Trung, Tech Lead, Software Engineer, Da Nang");
    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', pageDesc);
    updateMetaTag('property', 'twitter:title', pageTitle);
    updateMetaTag('property', 'twitter:description', pageDesc);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + pathname);

    // Update html lang attribute
    document.documentElement.lang = isEn ? 'en' : 'vi';

  }, [pathname, isEn]);

  // Scroll position handling
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      // Delay slightly for React render tree
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          if (window.__lenis) {
            window.__lenis.scrollTo(element, { offset: -140 });
          } else {
            const top = element.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      // Scroll to top of the page on route change without hash
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;