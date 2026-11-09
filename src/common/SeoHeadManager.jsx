import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://trung2605.github.io';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const ROUTE_META = {
  '/': {
    titleVi: 'Lê Trí Trung | Founder, Technical BA & Software Architect | SynapForge Studio',
    titleEn: 'Le Tri Trung | Founder, Technical BA & Software Architect | SynapForge Studio',
    descVi: 'Lê Trí Trung, Founder, Head of Technology & Technical BA tại SynapForge Venture Studio Đà Nẵng. Chuyên sâu SRS Karl Wiegers (370+ Atomic FRs), Clean Architecture (.NET 8 & Java 21 Spring Boot 3), Biensovip.com (1.1M+ VPA records), BrandHub (7 Microservices) & The MC Hub.',
    descEn: 'Le Tri Trung, Founder, Head of Technology & Technical BA at SynapForge Venture Studio. Specialized in Karl Wiegers SRS (370+ Atomic FRs), Clean Architecture (.NET 8 & Java 21 Spring Boot 3), Biensovip.com, BrandHub & The MC Hub.',
    breadcrumbVi: 'Trang Chủ',
    breadcrumbEn: 'Home',
  },
  '/dich-vu': {
    titleVi: 'Dịch Vụ Thiết Kế Website, SaaS & AI Automation Đà Nẵng | SynapForge Studio',
    titleEn: 'Turnkey Web, SaaS & AI Automation Services | SynapForge Venture Studio',
    descVi: 'Đội ngũ 5 kỹ sư FPT Đà Nẵng do Lê Trí Trung dẫn dắt: Thiết kế Website thương mại, sàn đấu giá, tích hợp VietQR đối soát <0.5s 0đ phí, AI Agent CSKH 24/7 và đặc tả BA/SRS chuẩn doanh nghiệp.',
    descEn: '5-Engineer Venture Studio in Da Nang led by Le Tri Trung: Turnkey e-commerce & SaaS engineering, <0.5s zero-fee VietQR webhook settlement, 24/7 AI Agents, and Karl Wiegers BA/SRS specification.',
    breadcrumbVi: 'Dịch Vụ & Giải Pháp',
    breadcrumbEn: 'Services & Solutions',
  },
  '/projects': {
    titleVi: 'Danh Mục 25+ Dự Án Thực Chiến: Biensovip, BrandHub, The MC Hub | Lê Trí Trung',
    titleEn: '25+ Production Projects: Biensovip, BrandHub, The MC Hub | Le Tri Trung',
    descVi: 'Khám phá hơn 25 dự án phần mềm của Lê Trí Trung: Sàn biển số Biensovip.com (1,1M+ bản ghi VPA), BrandHub (7 Microservices, 141 FRs), The MC Hub (10-Metric Acoustic DSP) và 12 Game 3D TikTok Live.',
    descEn: 'Explore 25+ production software projects by Le Tri Trung: Biensovip.com (1.1M+ VPA auction records), BrandHub (7 Microservices, 141 FRs), The MC Hub (10-Metric Acoustic DSP), and 12 TikTok Live 3D Games.',
    breadcrumbVi: 'Dự Án Thực Chiến',
    breadcrumbEn: 'Projects',
  },
  '/about': {
    titleVi: 'Về Lê Trí Trung: Hành Trình Từ FPT Software Đến Founder SynapForge Studio',
    titleEn: 'About Le Tri Trung: From FPT Software to Founder @ SynapForge Venture Studio',
    descVi: 'Hồ sơ năng lực Lê Trí Trung (2005): Founder & Head of Technology tại SynapForge Venture Studio, Quán quân Hackathon Computer Vision 2026, Đồng tác giả bài báo quốc tế ICTA 2026, IELTS 6.0.',
    descEn: 'Biography & dossier of Le Tri Trung: Founder & Head of Technology at SynapForge Venture Studio, Hackathon Computer Vision 2026 Winner, ICTA 2026 Co-Author, IELTS 6.0.',
    breadcrumbVi: 'Giới Thiệu',
    breadcrumbEn: 'About',
  },
  '/achievements': {
    titleVi: 'Thành Tích, 42+ Chứng Chỉ Quốc Tế & Giải Thưởng | Lê Trí Trung',
    titleEn: 'Achievements, 42+ Certifications & Honors | Le Tri Trung',
    descVi: 'Tổng hợp học vấn Đại học FPT (GPA 3.3/4.0), trao đổi sinh viên quốc tế Malaysia, Quán quân Hackathon Computer Vision 2026, bài báo ICTA 2026 và hơn 42 chứng chỉ công nghệ quốc tế (IBM, Meta, CertNexus, UC Irvine, IELTS 6.0).',
    descEn: 'Academic track record at FPT University (GPA 3.3/4.0), Malaysia student exchange, Hackathon Computer Vision 2026 Champion, ICTA 2026 paper, and 42+ international certifications.',
    breadcrumbVi: 'Thành Tích & Chứng Chỉ',
    breadcrumbEn: 'Achievements & Credentials',
  },
  '/blog': {
    titleVi: 'Blog Kỹ Thuật: Kiến Trúc Hệ Thống, Technical BA (SRS) & AI Engineering | Lê Trí Trung',
    titleEn: 'Engineering Blog: System Architecture, Technical BA (SRS) & AI | Le Tri Trung',
    descVi: '13 bài phân tích kỹ thuật chuyên sâu từ dự án thực tế: Chuẩn hóa 141 Atomic FRs theo Karl Wiegers, tối ưu PostgreSQL GIN Index dưới 8ms trên Biensovip, RabbitMQ DLQ 0% loss trên BrandHub và QLoRA LLM.',
    descEn: '13 deep-dive engineering case studies: Standardizing 141 Atomic FRs per Karl Wiegers, sub-8ms PostgreSQL GIN indexing on Biensovip, RabbitMQ DLQ resilience on BrandHub, and QLoRA LLM fine-tuning.',
    breadcrumbVi: 'Blog Kỹ Thuật',
    breadcrumbEn: 'Engineering Blog',
  },
  '/resume': {
    titleVi: 'CV & Hồ Sơ Năng Lực Song Ngữ (Technical BA & Software Architect) | Lê Trí Trung',
    titleEn: 'Interactive Resume & BA/SRS Portfolio (EN/VI PDF) | Le Tri Trung',
    descVi: 'Xem trực tuyến và tải xuống CV Tiếng Anh (Technical BA & Product Architect) và CV Tiếng Việt (Software Engineer & System Architect) cập nhật 11/2026 của Lê Trí Trung kèm kho tài liệu BA Google Drive.',
    descEn: 'View and download Le Tri Trung’s latest English CV (Technical BA & Product Architect) and Vietnamese CV (Software Engineer & System Architect) with verified Google Drive BA/SRS repositories.',
    breadcrumbVi: 'Hồ Sơ CV & BA Portfolio',
    breadcrumbEn: 'Resume & BA Dossier',
  },
  '/contact': {
    titleVi: 'Liên Hệ Tư Vấn Kỹ Thuật & Báo Giá Dự Án 1-1 | Lê Trí Trung | SynapForge',
    titleEn: 'Contact & Direct 1-on-1 Architecture Consultation | Le Tri Trung | SynapForge',
    descVi: 'Liên hệ trực tiếp Lê Trí Trung qua Hotline/Zalo (+84) 912 158 715 hoặc Email letritrung2605@gmail.com tại Hải Châu & Ngũ Hành Sơn, Đà Nẵng để nhận tư vấn kiến trúc phần mềm, BA/SRS và báo giá website.',
    descEn: 'Connect directly with Le Tri Trung via Hotline/Zalo (+84) 912 158 715 or Email letritrung2605@gmail.com in Da Nang, Vietnam for software architecture, Technical BA, and turnkey web development.',
    breadcrumbVi: 'Liên Hệ',
    breadcrumbEn: 'Contact',
  },
};

const setOrCreateMeta = (selector, attrName, attrValue, content) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setOrCreateLink = (rel, href, extraAttrs = {}) => {
  const selector = extraAttrs.hreflang
    ? `link[rel="${rel}"][hreflang="${extraAttrs.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    Object.entries(extraAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const SeoHeadManager = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'vi').startsWith('en');

  useEffect(() => {
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;

    // Update html lang attribute for accessibility & search engines
    document.documentElement.lang = isEn ? 'en' : 'vi';

    // Always keep canonical & hreflang tags synced with current route
    setOrCreateLink('canonical', canonicalUrl);
    setOrCreateLink('alternate', canonicalUrl, { hreflang: 'vi-VN' });
    setOrCreateLink('alternate', canonicalUrl, { hreflang: 'en-US' });
    setOrCreateLink('alternate', canonicalUrl, { hreflang: 'x-default' });
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    // Dynamic routes (/projects/:id and /blog/:slug) manage their own specific title/desc/schema
    const routeConfig = ROUTE_META[cleanPath];
    if (!routeConfig) return;

    const title = isEn ? routeConfig.titleEn : routeConfig.titleVi;
    const desc = isEn ? routeConfig.descEn : routeConfig.descVi;

    document.title = title;
    setOrCreateMeta('meta[name="description"]', 'name', 'description', desc);
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', desc);
    setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', DEFAULT_IMAGE);
    setOrCreateMeta('meta[property="twitter:title"]', 'property', 'twitter:title', title);
    setOrCreateMeta('meta[property="twitter:description"]', 'property', 'twitter:description', desc);

    // Inject route-level BreadcrumbList JSON-LD for top-level routes
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement:
        cleanPath === '/'
          ? [
              {
                '@type': 'ListItem',
                position: 1,
                name: isEn ? 'Home' : 'Trang Chủ',
                item: `${SITE_URL}/`,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 1,
                name: isEn ? 'Home' : 'Trang Chủ',
                item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: isEn ? routeConfig.breadcrumbEn : routeConfig.breadcrumbVi,
                item: canonicalUrl,
              },
            ],
    };

    let script = document.getElementById('route-seo-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'route-seo-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(breadcrumbJsonLd);
  }, [pathname, isEn]);

  return null;
};

export default SeoHeadManager;
