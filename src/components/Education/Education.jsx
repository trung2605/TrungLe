import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaStar, 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheckCircle, 
  FaLaptopCode, 
  FaGraduationCap, 
  FaGlobeAmericas, 
  FaRocket,
  FaMapMarkerAlt,
  FaUsers,
  FaBriefcase,
  FaAward,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import MemoryGallery from './MemoryGallery';
import './Education.scss';

const CATEGORY_CONFIG = {
  'main': {
    color: '#059669',
    lightBg: '#ecfdf5',
    border: '#a7f3d0',
    icon: FaRocket,
    category: 'startup',
    labelVi: 'Khởi nghiệp & Tech Lead',
    labelEn: 'Startup & Tech Lead',
    locationVi: 'Đà Nẵng, Việt Nam',
    locationEn: 'Da Nang, Vietnam',
    roleTagVi: 'Quản lý kỹ thuật & Nhà sáng lập',
    roleTagEn: 'Technical Lead & Founder',
    metrics: [
      { labelVi: 'Quy mô đội ngũ', labelEn: 'Team Size', val: '5 Kỹ sư phần mềm' },
      { labelVi: 'Sản phẩm vận hành', labelEn: 'Live Product', val: 'biensovip.com' },
      { labelVi: 'Hiệu năng hệ thống', labelEn: 'Performance', val: 'Uptime 99.98% · <8ms DB' }
    ]
  },
  'feature/enterprise-ojt': {
    color: '#d97706',
    lightBg: '#fffbeb',
    border: '#fde68a',
    icon: FaLaptopCode,
    category: 'enterprise',
    labelVi: 'Kinh nghiệm Doanh nghiệp (FSoft)',
    labelEn: 'Enterprise Experience (FSoft)',
    locationVi: 'FPT Software Đà Nẵng',
    locationEn: 'FPT Software Da Nang',
    roleTagVi: 'Thực tập sinh OJT xuất sắc',
    roleTagEn: 'Distinction OJT Intern',
    metrics: [
      { labelVi: 'Môi trường làm việc', labelEn: 'Environment', val: 'Agile / Scrum chuẩn FSoft' },
      { labelVi: 'Nền tảng công nghệ', labelEn: 'Tech Platform', val: 'OutSystems Reactive Web' },
      { labelVi: 'Đánh giá thực tập', labelEn: 'OJT Rating', val: 'Passed (Xuất sắc)' }
    ]
  },
  'academic/cs-research': {
    color: '#7c3aed',
    lightBg: '#faf5ff',
    border: '#ddd6fe',
    icon: FaGraduationCap,
    category: 'academic',
    labelVi: 'Đại học & Nghiên cứu AI',
    labelEn: 'University & AI Research',
    locationVi: 'Đại học FPT Đà Nẵng',
    locationEn: 'FPT University Da Nang',
    roleTagVi: 'Khoa học Máy tính & AI',
    roleTagEn: 'Computer Science & AI',
    metrics: [
      { labelVi: 'Giải thưởng Hackathon', labelEn: 'Hackathon Award', val: 'Quán Quân CV 2026' },
      { labelVi: 'Nghiên cứu khoa học', labelEn: 'Scientific Research', val: 'Top 5 ResFes Toàn Quốc' },
      { labelVi: 'Điểm trung bình tích lũy', labelEn: 'Cumulative GPA', val: 'GPA 3.3/4.0 (8.2/10)' }
    ]
  },
  'global/mobility-exchange': {
    color: '#2563eb',
    lightBg: '#eff6ff',
    border: '#bfdbfe',
    icon: FaGlobeAmericas,
    category: 'global',
    labelVi: 'Giao lưu Trao đổi Quốc tế',
    labelEn: 'Global Mobility & Exchange',
    locationVi: 'Kuala Lumpur, Malaysia',
    locationEn: 'Kuala Lumpur, Malaysia',
    roleTagVi: 'Sinh viên trao đổi FPTU',
    roleTagEn: 'FPTU Exchange Student',
    metrics: [
      { labelVi: 'Tổ chức giáo dục', labelEn: 'Institution', val: 'TAR UMT Malaysia' },
      { labelVi: 'Ngôn ngữ làm việc', labelEn: 'Working Language', val: 'Tiếng Anh chuyên ngành' },
      { labelVi: 'Kỹ năng nâng cao', labelEn: 'Core Gain', val: 'Hội nhập đa văn hóa' }
    ]
  },
  'foundation/stem-roots': {
    color: '#0891b2',
    lightBg: '#ecfeff',
    border: '#a5f3fc',
    icon: FaStar,
    category: 'roots',
    labelVi: 'Nền tảng học vấn cơ bản',
    labelEn: 'Educational Foundation',
    locationVi: 'THPT Phan Châu Trinh, Đà Nẵng',
    locationEn: 'Phan Chau Trinh High School',
    roleTagVi: 'Tốt nghiệp loại Xuất sắc',
    roleTagEn: 'Graduated with Honors',
    metrics: [
      { labelVi: 'Điểm tốt nghiệp', labelEn: 'Graduation GPA', val: '9.0 / 10.0' },
      { labelVi: 'Năng lực cốt lõi', labelEn: 'Core Strength', val: 'Toán học & Giải thuật logic' },
      { labelVi: 'Định hướng ban đầu', labelEn: 'Career Orientation', val: 'Kỹ thuật Phần mềm' }
    ]
  }
};

const MILESTONE_LINKS = {
  1: [
    {
      type: 'service',
      titleVi: 'Gói Dịch Vụ Web & SaaS Automation',
      titleEn: 'Web Development & SaaS Services',
      descVi: 'Bảng giá 3 gói dịch vụ thực chiến (Khởi nghiệp, Tốc hành, Chuyên nghiệp) với đội ngũ 5 kỹ sư',
      descEn: 'Pricing and full-scope packages for SME commerce websites & SaaS automation',
      path: '/dich-vu',
      badgeVi: 'Bảng Giá Dịch Vụ',
      badgeEn: 'Service Packages',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png',
      isExternal: false,
      color: '#059669',
      bg: '#ecfdf5'
    },
    {
      type: 'project',
      titleVi: 'Case Study: Biensovip — Sàn Biển Số Đẹp',
      titleEn: 'Case Study: Biensovip Marketplace',
      descVi: 'Nền tảng thực tế xử lý 100+ visits/ngày, VietQR webhook <0.5s, Clean Architecture .NET 8 & PostgreSQL',
      descEn: 'Production marketplace with 100+ daily visits, automated VietQR, Clean Architecture .NET 8 & PostgreSQL',
      path: '/projects/26',
      badgeVi: 'Dự Án Tiêu Biểu',
      badgeEn: 'Flagship Project',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png',
      isExternal: false,
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      type: 'external',
      titleVi: 'Trải Nghiệm Live: biensovip.com',
      titleEn: 'Live Production: biensovip.com',
      descVi: 'Khám phá trực tiếp website thương mại đang hoạt động do chính team xây dựng và vận hành',
      descEn: 'Directly explore the active production marketplace deployed and operated by our team',
      path: 'https://biensovip.com',
      badgeVi: 'Sản Phẩm Đang Chạy',
      badgeEn: 'Live Website',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png',
      isExternal: true,
      color: '#d97706',
      bg: '#fffbeb'
    }
  ],
  2: [
    {
      type: 'project',
      titleVi: 'Dự Án: Book Shop — OutSystems Enterprise',
      titleEn: 'Project: Book Shop — OutSystems App',
      descVi: 'Ứng dụng thương mại điện tử doanh nghiệp phát triển trên nền tảng OutSystems Reactive Web trong kỳ OJT FSoft',
      descEn: 'Enterprise e-commerce application built with OutSystems Reactive Web during enterprise OJT at FSoft',
      path: '/projects/5',
      badgeVi: 'Dự Án OJT',
      badgeEn: 'OJT Project',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962636/my-website/assets/projects/BookShopOutsystems.png',
      isExternal: false,
      color: '#d97706',
      bg: '#fffbeb'
    },
    {
      type: 'service',
      titleVi: 'Dịch Vụ: Phát Triển Phần Mềm Doanh Nghiệp',
      titleEn: 'Services: Enterprise Software Delivery',
      descVi: 'Quy trình chuẩn Agile / Scrum FSoft được áp dụng trực tiếp vào các dự án khách hàng của đội ngũ',
      descEn: 'Enterprise Agile / Scrum workflow applied directly to our client software development packages',
      path: '/dich-vu',
      badgeVi: 'Giải Pháp Đội Ngũ',
      badgeEn: 'Team Solution',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870966/my-website/assets/projects/screenshots/4-web-form-automation.png',
      isExternal: false,
      color: '#059669',
      bg: '#ecfdf5'
    }
  ],
  3: [
    {
      type: 'project',
      titleVi: 'Dự Án: ThreadLearn AI (Quán Quân Hackathon 2026)',
      titleEn: 'Project: ThreadLearn AI (Champion 2026)',
      descVi: 'Mô hình AI 1.5B tham số fine-tuned kết hợp RAG AST phát hiện và sửa lỗi concurrency JavaScript vượt trội GPT-3.5',
      descEn: 'Fine-tuned 1.5B LLM with AST RAG pipeline outperforming GPT-3.5 at fixing JS concurrency bugs',
      path: '/projects/24',
      badgeVi: 'Quán Quân Hackathon',
      badgeEn: 'Hackathon Champion',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579605/my-website/assets/projects/screenshots/slide_07_pipeline.png',
      isExternal: false,
      color: '#7c3aed',
      bg: '#faf5ff'
    },
    {
      type: 'project',
      titleVi: 'Dự Án: Website Khoa Y Dược Phan Châu Trinh',
      titleEn: 'Project: Faculty of Nursing & Tech Website',
      descVi: 'Website chính thức xây dựng cho trường đại học với vanilla JS Web Components (team 6 devs)',
      descEn: 'Official university department site built with Web Components for a real client',
      path: '/projects/25',
      badgeVi: 'Dự Án Khách Hàng',
      badgeEn: 'Client Project',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789580947/my-website/assets/projects/screenshots/nursing_orgchart2.png',
      isExternal: false,
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      type: 'blog',
      titleVi: 'Bài Viết Kỹ Thuật: Nghiên Cứu ThreadLearn AI',
      titleEn: 'Technical Article: ThreadLearn AI Research',
      descVi: 'Phân tích chi tiết quy trình huấn luyện QLoRA, AST parsing và kết quả benchmark học thuật',
      descEn: 'In-depth breakdown of QLoRA fine-tuning, AST retrieval pipeline, and benchmark results',
      path: '/blog/threadlearn',
      badgeVi: 'Bài Viết Kỹ Thuật',
      badgeEn: 'Tech Deep-Dive',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579607/my-website/assets/projects/screenshots/slide_11_main_results.png',
      isExternal: false,
      color: '#0891b2',
      bg: '#ecfeff'
    }
  ],
  4: [
    {
      type: 'certificate',
      titleVi: 'Chứng Chỉ Trao Đổi Quốc Tế (TAR UMT Malaysia)',
      titleEn: 'International Student Mobility Certificate',
      descVi: 'Chứng nhận hoàn thành chương trình trao đổi học thuật quốc tế tại Kuala Lumpur, Malaysia',
      descEn: 'Certificate of completion for academic mobility program in Kuala Lumpur, Malaysia',
      path: '/achievements?tab=certificates',
      badgeVi: 'Chứng Chỉ Quốc Tế',
      badgeEn: 'Global Certificate',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962693/my-website/assets/educationMemories/Malaysia_Memory.jpg',
      isExternal: false,
      color: '#2563eb',
      bg: '#eff6ff'
    },
    {
      type: 'project',
      titleVi: 'Tổ Chức The Dreamers — Dự Án Xã Hội & Công Nghệ',
      titleEn: 'The Dreamers — Community Tech Initiative',
      descVi: 'Sáng lập và quản lý tổ chức sinh viên đưa công nghệ và kỹ năng đến với trẻ em có hoàn cảnh khó khăn',
      descEn: 'Founded and lead student organization teaching tech skills to underprivileged youth',
      path: '/projects/3',
      badgeVi: 'Tổ Chức Xã Hội',
      badgeEn: 'Community Project',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579570/my-website/assets/projects/screenshots/pic_1_of_131.jpg',
      isExternal: false,
      color: '#059669',
      bg: '#ecfdf5'
    }
  ],
  5: [
    {
      type: 'prize',
      titleVi: 'Bảng Thành Tích & Giải Thưởng Học Thuật',
      titleEn: 'Academic Honors & Competition Awards',
      descVi: 'Xem danh sách toàn bộ huy chương, học bổng và các giải thưởng học thuật đạt được',
      descEn: 'Explore the full list of medals, scholarships, and academic honors received',
      path: '/achievements?tab=prizes',
      badgeVi: 'Giải Thưởng Học Thuật',
      badgeEn: 'Academic Awards',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962694/my-website/assets/educationMemories/PCT_Graduation_Memory.jpg',
      isExternal: false,
      color: '#0891b2',
      bg: '#ecfeff'
    },
    {
      type: 'projects',
      titleVi: 'Khám Phá Toàn Bộ Danh Mục 10+ Dự Án',
      titleEn: 'Explore Full 10+ Projects Portfolio',
      descVi: 'Tổng hợp đầy đủ các dự án phần mềm từ đồ án nền tảng đến các hệ thống thương mại thực tế',
      descEn: 'Comprehensive portfolio spanning foundational apps to active production platforms',
      path: '/projects',
      badgeVi: 'Tất Cả Dự Án',
      badgeEn: 'All Projects',
      image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579568/my-website/assets/projects/screenshots/yfy17yiopbaz9vlzvv1m.png',
      isExternal: false,
      color: '#7c3aed',
      bg: '#faf5ff'
    }
  ]
};

const Education = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { education = [] } = useTranslatedData();
  const [searchParams] = useSearchParams();

  const [selectedMilestoneId, setSelectedMilestoneId] = useState(education[0]?.id || 1);
  const [filterCategory, setFilterCategory] = useState('all');

  // Handle milestone query param from other pages
  useEffect(() => {
    const milestoneParam = searchParams.get('milestone');
    if (milestoneParam) {
      const parsed = parseInt(milestoneParam, 10);
      if (!isNaN(parsed) && education.some(e => e.id === parsed)) {
        setSelectedMilestoneId(parsed);
      }
    }
  }, [searchParams, education]);

  // Filter education items
  const filteredEducation = education.filter(item => {
    if (filterCategory === 'all') return true;
    const cfg = CATEGORY_CONFIG[item.branch];
    return cfg?.category === filterCategory;
  });

  const activeEdu = education.find(e => e.id === selectedMilestoneId) || education[0];
  const activeIdx = education.findIndex(e => e.id === selectedMilestoneId);
  const activeCfg = CATEGORY_CONFIG[activeEdu?.branch] || CATEGORY_CONFIG['main'];
  const activeLinks = MILESTONE_LINKS[activeEdu?.id] || [];

  const handlePrev = () => {
    if (activeIdx > 0) {
      setSelectedMilestoneId(education[activeIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIdx < education.length - 1) {
      setSelectedMilestoneId(education[activeIdx + 1].id);
    }
  };

  return (
    <div style={{ paddingTop: '28px', paddingBottom: '96px' }}>

      {/* SECTION INTRO */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 14px', 
          borderRadius: '50px', 
          backgroundColor: '#ecfdf5', 
          fontSize: '12px', 
          fontFamily: 'var(--font-sans, sans-serif)',
          fontWeight: '600',
          color: '#059669', 
          marginBottom: '12px' 
        }}>
          <FaBriefcase size={12} />
          {isEn ? "Career & Professional Milestones" : "Lộ Trình Năng Lực & Kinh Nghiệm Thực Chiến"}
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: '700', letterSpacing: '-0.5px', margin: '0 0 10px 0', color: '#0f172a' }}>
          {isEn ? "Professional Experience & Academic Journey" : "Hành Trình Sự Nghiệp & Nền Tảng Học Vấn"}
        </h2>
        <p style={{ fontSize: '15.5px', color: '#475569', margin: 0, maxWidth: '820px', lineHeight: '1.65' }}>
          {isEn
            ? "A comprehensive overview tailored for Recruiters and Hiring Managers — tracking my journey from leading a 5-engineer startup and interning at FPT Software, to academic research and hackathon championships at FPT University."
            : "Hồ sơ năng lực tổng hợp dành cho Nhà tuyển dụng — phản ánh trọn vẹn lộ trình phát triển từ vai trò Tech Lead dẫn dắt 5 kỹ sư khởi nghiệp, kinh nghiệm thực tập tại FPT Software, đến các giải thưởng Quán quân và đề tài nghiên cứu AI tại Đại học FPT."}
        </p>
      </div>

      {/* EXECUTIVE CAREER DOSSIER CONTAINER (LIGHT THEME) */}
      <div className="career-dossier-wrapper">
        <div className="dossier-card">

          {/* Dossier Top Bar */}
          <div className="dossier-topbar">
            <div className="dossier-status-pill">
              <span className="live-dot" />
              <span>
                {isEn 
                  ? "Current Status: Active Tech Lead & Full-Stack Engineer in Da Nang" 
                  : "Trạng thái hiện tại: Tech Lead & Kỹ sư trưởng tại Đà Nẵng"}
              </span>
            </div>

            <div className="dossier-counter">
              <FaAward style={{ color: '#059669', marginRight: '6px' }} />
              <span>
                {isEn 
                  ? `${education.length} Milestones Verified` 
                  : `${education.length} Cột mốc thực chiến`}
              </span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-filter-bar">
            <span className="filter-title">{isEn ? "FILTER BY AREA:" : "LỌC THEO LĨNH VỰC:"}</span>
            <div className="filter-buttons-scroll">
              <button
                onClick={() => setFilterCategory('all')}
                className={`category-btn ${filterCategory === 'all' ? 'active' : ''}`}
              >
                {isEn ? `All Milestones (${education.length})` : `Tất cả giai đoạn (${education.length})`}
              </button>
              <button
                onClick={() => setFilterCategory('startup')}
                className={`category-btn ${filterCategory === 'startup' ? 'active' : ''}`}
              >
                <span className="btn-indicator" style={{ backgroundColor: '#059669' }} />
                {isEn ? "Startup & Tech Lead" : "Khởi nghiệp & Tech Lead"}
              </button>
              <button
                onClick={() => setFilterCategory('enterprise')}
                className={`category-btn ${filterCategory === 'enterprise' ? 'active' : ''}`}
              >
                <span className="btn-indicator" style={{ backgroundColor: '#d97706' }} />
                {isEn ? "FPT Software (OJT)" : "Doanh nghiệp (FPT Software)"}
              </button>
              <button
                onClick={() => setFilterCategory('academic')}
                className={`category-btn ${filterCategory === 'academic' ? 'active' : ''}`}
              >
                <span className="btn-indicator" style={{ backgroundColor: '#7c3aed' }} />
                {isEn ? "University & AI Research" : "Đại học & Nghiên cứu AI"}
              </button>
              <button
                onClick={() => setFilterCategory('global')}
                className={`category-btn ${filterCategory === 'global' ? 'active' : ''}`}
              >
                <span className="btn-indicator" style={{ backgroundColor: '#2563eb' }} />
                {isEn ? "Global Exchange (Malaysia)" : "Trao đổi Quốc tế (Malaysia)"}
              </button>
              <button
                onClick={() => setFilterCategory('roots')}
                className={`category-btn ${filterCategory === 'roots' ? 'active' : ''}`}
              >
                <span className="btn-indicator" style={{ backgroundColor: '#0891b2' }} />
                {isEn ? "High School Foundation" : "Nền tảng phổ thông (THPT)"}
              </button>
            </div>
          </div>

          {/* Main Dossier Content Layout */}
          <div className="dossier-layout">

            {/* Left Column: Milestones Stream */}
            <div className="milestones-sidebar">
              <div className="sidebar-header">
                <span>{isEn ? "CAREER TIMELINE" : "DANH SÁCH CỘT MỐC"}</span>
                <span className="count-badge">{filteredEducation.length}</span>
              </div>

              <div className="milestones-list">
                {filteredEducation.map((edu) => {
                  const isSelected = edu.id === selectedMilestoneId;
                  const cfg = CATEGORY_CONFIG[edu.branch] || CATEGORY_CONFIG['main'];
                  const IconComp = cfg.icon;

                  return (
                    <motion.div
                      key={edu.id}
                      layout
                      onClick={() => setSelectedMilestoneId(edu.id)}
                      className={`milestone-item-card ${isSelected ? 'selected' : ''}`}
                      style={{
                        borderColor: isSelected ? cfg.color : '#e2e8f0',
                        backgroundColor: isSelected ? '#ffffff' : '#f8fafc'
                      }}
                    >
                      {/* Left color bar indicator */}
                      <div 
                        className="active-indicator-bar" 
                        style={{ backgroundColor: cfg.color, opacity: isSelected ? 1 : 0 }} 
                      />

                      <div className="item-content">
                        <div className="item-top-row">
                          <span 
                            className="item-category-tag"
                            style={{ backgroundColor: cfg.lightBg, color: cfg.color, borderColor: cfg.border }}
                          >
                            <IconComp size={10} style={{ marginRight: '4px' }} />
                            {isEn ? cfg.labelEn : cfg.labelVi}
                          </span>

                          <span className="item-status-pill">
                            {edu.status === 'Current' 
                              ? (isEn ? 'Present' : 'Hiện tại') 
                              : (isEn ? 'Completed' : 'Hoàn thành')}
                          </span>
                        </div>

                        <h4 className="item-org-name">{edu.school}</h4>
                        <div className="item-role-title">{edu.degree}</div>

                        <div className="item-footer-row">
                          <span className="item-duration">
                            <FaCalendarAlt size={11} style={{ marginRight: '5px', color: '#64748b' }} />
                            {edu.duration}
                          </span>
                          {edu.gpa && (
                            <span className="item-gpa-badge">
                              {edu.gpa}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Executive Detail Dossier */}
            <div className="milestone-detail-view">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEdu?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="detail-inner"
                >
                  {/* Detail Header */}
                  <div className="detail-header-card">
                    <div className="detail-meta-pills">
                      <span 
                        className="category-badge-large"
                        style={{ backgroundColor: activeCfg.lightBg, color: activeCfg.color, borderColor: activeCfg.border }}
                      >
                        <activeCfg.icon size={13} style={{ marginRight: '6px' }} />
                        {isEn ? activeCfg.labelEn : activeCfg.labelVi}
                      </span>

                      <span className="role-tag-pill">
                        {isEn ? activeCfg.roleTagEn : activeCfg.roleTagVi}
                      </span>
                    </div>

                    <h3 className="detail-org-heading">{activeEdu?.school}</h3>
                    <div className="detail-role-heading">{activeEdu?.degree}</div>

                    {/* Metadata strip */}
                    <div className="detail-info-strip">
                      <div className="info-cell">
                        <FaCalendarAlt className="info-icon" />
                        <div>
                          <div className="info-label">{isEn ? "Duration" : "Thời gian"}</div>
                          <div className="info-val">{activeEdu?.duration}</div>
                        </div>
                      </div>

                      <div className="info-cell">
                        <FaMapMarkerAlt className="info-icon" />
                        <div>
                          <div className="info-label">{isEn ? "Location" : "Địa điểm"}</div>
                          <div className="info-val">{isEn ? activeCfg.locationEn : activeCfg.locationVi}</div>
                        </div>
                      </div>

                      <div className="info-cell">
                        <FaUsers className="info-icon" />
                        <div>
                          <div className="info-label">{isEn ? "Status / Result" : "Kết quả / Đánh giá"}</div>
                          <div className="info-val" style={{ color: activeCfg.color, fontWeight: '600' }}>
                            {activeEdu?.gpa || (isEn ? "Verified" : "Đã xác thực")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quantitative Impact & Key Metrics */}
                  {activeCfg.metrics && (
                    <div className="metrics-cards-row">
                      {activeCfg.metrics.map((m, i) => (
                        <div key={i} className="metric-box">
                          <div className="metric-title">{isEn ? m.labelEn : m.labelVi}</div>
                          <div className="metric-value">{m.val}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Contributions & Achievements */}
                  {activeEdu?.highlights && activeEdu.highlights.length > 0 && (
                    <div className="achievements-section">
                      <h4 className="section-title">
                        <FaCheckCircle style={{ color: activeCfg.color, marginRight: '8px' }} />
                        {isEn ? "Key Responsibilities & Measurable Impact" : "Trách Nhiệm Cốt Lõi & Thành Tựu Thực Tế"}
                      </h4>
                      <div className="highlights-list">
                        {activeEdu.highlights.map((item, idx) => (
                          <div key={idx} className="highlight-row">
                            <div className="check-bullet" style={{ color: activeCfg.color }}>
                              ✓
                            </div>
                            <div className="highlight-text">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Core Competencies & Tech Stack */}
                  {activeEdu?.techStack && activeEdu.techStack.length > 0 && (
                    <div className="competencies-section">
                      <h4 className="section-title">
                        {isEn ? "Core Competencies & Technologies" : "Năng Lực Chuyên Môn & Công Nghệ"}
                      </h4>
                      <div className="tags-flex">
                        {activeEdu.techStack.map((tech) => (
                          <span key={tech} className="skill-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CROSS-LINKING: Linked Products, Projects & Services */}
                  {activeLinks && activeLinks.length > 0 && (
                    <div className="linked-products-section">
                      <h4 className="section-title">
                        <FaRocket style={{ color: activeCfg.color, marginRight: '8px' }} />
                        {isEn ? "Related Products, Services & Live Projects" : "Sản Phẩm Thực Tế & Dịch Vụ Liên Quan"}
                      </h4>
                      <div className="linked-cards-grid">
                        {activeLinks.map((item, idx) => {
                          const CardInner = (
                            <div className="linked-card-inner">
                              {item.image && (
                                <div className="card-thumb-wrap">
                                  <img
                                    src={item.image}
                                    alt={isEn ? item.titleEn : item.titleVi}
                                    loading="lazy"
                                    className="card-thumb-img"
                                  />
                                  <span className="card-floating-badge" style={{ backgroundColor: item.bg, color: item.color }}>
                                    {isEn ? item.badgeEn : item.badgeVi}
                                  </span>
                                  {item.isExternal ? (
                                    <span className="card-floating-icon" title="External link">
                                      <FaExternalLinkAlt size={10} />
                                    </span>
                                  ) : (
                                    <span className="card-floating-icon">
                                      <FaArrowRight size={10} />
                                    </span>
                                  )}
                                </div>
                              )}
                              <div className="card-content-wrap">
                                {!item.image && (
                                  <div className="card-top">
                                    <span className="card-badge" style={{ backgroundColor: item.bg, color: item.color }}>
                                      {isEn ? item.badgeEn : item.badgeVi}
                                    </span>
                                    {item.isExternal ? (
                                      <FaExternalLinkAlt size={11} style={{ color: '#94a3b8' }} />
                                    ) : (
                                      <FaArrowRight size={11} style={{ color: '#94a3b8' }} />
                                    )}
                                  </div>
                                )}
                                <h5 className="card-title">{isEn ? item.titleEn : item.titleVi}</h5>
                                <p className="card-desc">{isEn ? item.descEn : item.descVi}</p>
                                <div className="card-action" style={{ color: item.color }}>
                                  <span>{isEn ? "Explore Now" : "Khám phá ngay"}</span>
                                  <FaArrowRight size={10} />
                                </div>
                              </div>
                            </div>
                          );

                          return item.isExternal ? (
                            <a
                              key={idx}
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="linked-product-card"
                            >
                              {CardInner}
                            </a>
                          ) : (
                            <Link
                              key={idx}
                              to={item.path}
                              className="linked-product-card"
                            >
                              {CardInner}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Executive Summary */}
                  {activeEdu?.description && (
                    <div className="executive-summary-card">
                      <div className="summary-title">
                        {isEn ? "Executive Overview" : "Đánh Giá & Tóm Tắt Tổng Quan"}
                      </div>
                      <div className="summary-content">
                        <Markdown>{activeEdu.description}</Markdown>
                      </div>
                    </div>
                  )}

                  {/* Step Navigation Controls */}
                  <div className="dossier-navigation">
                    <button
                      onClick={handlePrev}
                      disabled={activeIdx === 0}
                      className="step-btn"
                    >
                      <FaArrowLeft size={11} />
                      <span>{isEn ? "Previous Milestone" : "Cột mốc trước"}</span>
                    </button>

                    <span className="step-tracker">
                      {isEn ? "Milestone" : "Giai đoạn"} <strong>{activeIdx + 1}</strong> / {education.length}
                    </span>

                    <button
                      onClick={handleNext}
                      disabled={activeIdx === education.length - 1}
                      className="step-btn"
                    >
                      <span>{isEn ? "Next Milestone" : "Cột mốc tiếp theo"}</span>
                      <FaArrowRight size={11} />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Campus Memories Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #e2e8f0', 
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)', 
          borderRadius: '24px', 
          padding: '40px 32px' 
        }}
      >
        <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#059669', marginBottom: '8px' }}>
          {t('education.memoriesLabel')}
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '700', lineHeight: '1.2', letterSpacing: '-0.5px', color: '#0f172a', marginBottom: '24px' }}>
          {t('education.memoriesTitle')}
        </h2>
        <MemoryGallery />
      </motion.div>
    </div>
  );
};

export default Education;
