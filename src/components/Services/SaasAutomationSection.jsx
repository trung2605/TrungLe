import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCogs, 
  FaQrcode, 
  FaSyncAlt, 
  FaRobot, 
  FaLaptopCode, 
  FaEnvelope, 
  FaUserTie, 
  FaShieldAlt, 
  FaStar, 
  FaBalanceScale, 
  FaShareAlt, 
  FaUsers, 
  FaBolt, 
  FaSearch, 
  FaCode, 
  FaArrowRight 
} from 'react-icons/fa';
import { fadeInUp, staggerContainer, cardPop, SAAS_MODULES } from './servicesData';

export const getSaasIcon = (iconName) => {
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

export const SaasAutomationSection = ({
  isEn,
  activeSaasCategory,
  setActiveSaasCategory,
  onSelectFeature
}) => {
  return (
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
                onClick={() => onSelectFeature(feat)}
                role="button"
                tabIndex={0}
                aria-label={isEn ? `View details for ${feat.titleEn}` : `Xem chi tiết tính năng ${feat.titleVi}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectFeature(feat);
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
  );
};
