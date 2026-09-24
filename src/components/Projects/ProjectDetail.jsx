import { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaRocket, 
  FaArrowRight, 
  FaBookOpen, 
  FaChevronRight,
  FaHome,
  FaInfoCircle,
  FaImages,
  FaCogs,
  FaUsers,
  FaCheckCircle,
  FaTimes,
  FaLightbulb,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

import { 
  STATUS_COLORS, 
  STATUS_KEY, 
  BLOCK_COLORS, 
  PROJECT_MILESTONE_MAP, 
  BRANDHUB_METRICS, 
  BRANDHUB_MICROSERVICES, 
  BRANDHUB_TEAM_ROLES, 
  BIENSOVIP_SPECS,
  BIENSOVIP_GALLERY,
  BRANDHUB_GALLERY
} from './projectDetailData';
import ProjectDetailSidebar from './ProjectDetailSidebar';
import { ProjectGallerySection, ProjectArchitectureSection, ProjectTeamSection } from './ProjectSections';
import OtherProjects from './OtherProjects';


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

  let galleryItems = [];
  if (isBienSoVip) {
    galleryItems = BIENSOVIP_GALLERY;
  } else if (isBrandHub) {
    galleryItems = BRANDHUB_GALLERY;
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
            <ProjectDetailSidebar 
              project={project} 
              isEn={isEn} 
              t={t} 
              milestoneData={milestoneData} 
            />
          </div>
        </section>

        {/* SECTION 2: HÌNH ẢNH & GIAO DIỆN THỰC TẾ */}
        <ProjectGallerySection 
          galleryItems={galleryItems} 
          isEn={isEn} 
          onSelectImage={(src) => setSelectedImage(src)} 
        />

        {/* SECTION 3: KIẾN TRÚC & GIẢI PHÁP KỸ THUẬT */}
        <ProjectArchitectureSection 
          project={project} 
          isEn={isEn} 
          isBrandHub={isBrandHub} 
          isBienSoVip={isBienSoVip} 
          brandhubMetrics={BRANDHUB_METRICS} 
          brandhubMicroservices={BRANDHUB_MICROSERVICES} 
          biensovipSpecs={BIENSOVIP_SPECS} 
        />

        {/* SECTION 4: 5-ENGINEER MATRIX (ONLY FOR BRANDHUB) */}
        {isBrandHub && (
          <ProjectTeamSection 
            isEn={isEn} 
            teamRoles={BRANDHUB_TEAM_ROLES} 
          />
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
      <OtherProjects currentProjectId={project.id} allProjects={projects} />

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

export default ProjectDetail;

