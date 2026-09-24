import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaSearch, FaCheckCircle, FaCommentDots, FaArrowRight } from 'react-icons/fa';

export const SaasFeatureModal = ({
  feature,
  isEn,
  onClose,
  onOpenLightbox,
  onSelectService
}) => {
  if (!feature) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="saas-detail-modal-backdrop"
      onClick={onClose}
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
            <span className="modal-num-badge">MODULE {feature.num}</span>
            <span className="modal-meta-dot">•</span>
            <span className="modal-cat-badge">
              {feature.category === 'sales' 
                ? (isEn ? "Sales & Cashflow" : "Dòng Tiền & Chốt Cọc")
                : feature.category === 'ai'
                ? (isEn ? "AI & Automation" : "AI & Tự Động Hóa")
                : feature.category === 'omnichannel'
                ? (isEn ? "Omnichannel & Social" : "Đa Kênh & Mạng Xã Hội")
                : (isEn ? "Retention & Operations" : "Tương Tác & Vận Hành")}
            </span>
            <span className="modal-metric-pill">
              {isEn ? feature.metricEn : feature.metricVi}
            </span>
          </div>
          <button 
            onClick={onClose} 
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
              onClick={() => onOpenLightbox(feature.image)}
              title={isEn ? "Click to view full image in lightbox" : "Bấm để phóng to ảnh kích thước gốc"}
            >
              <img 
                src={feature.image} 
                alt={isEn ? feature.titleEn : feature.titleVi}
                className="screenshot-img"
              />
              <div className="screenshot-zoom-overlay">
                <FaSearch size={13} />
                <span>{isEn ? "Click to view full image" : "Bấm phóng to ảnh thực tế"}</span>
              </div>
            </div>

            <div className="screenshot-caption">
              <FaCheckCircle className="caption-verified-icon" />
              <span>{isEn ? feature.captionEn : feature.captionVi}</span>
            </div>

            <div className="deployment-meta-card">
              <div className="deploy-row">
                <span className="deploy-label">{isEn ? "System Origin:" : "Nguồn chứng thực:"}</span>
                <span className="deploy-value status-origin">
                  {feature.systemBadgeVi 
                    ? (isEn ? "BrandHub Enterprise Architecture" : "Hệ thống BrandHub Thực tế")
                    : (isEn ? "Biensovip Production Platform" : "Hệ thống Sàn Biensovip")}
                </span>
              </div>
              <div className="deploy-row">
                <span className="deploy-label">{isEn ? "Tech Engine:" : "Hạ tầng kỹ thuật:"}</span>
                <span className="deploy-value font-mono">{isEn ? feature.techEn : feature.techVi}</span>
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
              {isEn ? feature.titleEn : feature.titleVi}
            </h2>

            {/* Section 1: Pain Point */}
            <div className="saas-modal-card-block painpoint-block">
              <div className="block-eyebrow">
                {isEn ? "BUSINESS PAIN POINT & ARCHITECTURAL SOLUTION" : "BÀI TOÁN KINH DOANH & GIẢI PHÁP NỀN TẢNG"}
              </div>
              <p className="block-paragraph">
                {isEn ? feature.painPointEn : feature.painPointVi}
              </p>
            </div>

            {/* Section 2: 3-Step Workflow */}
            <div className="saas-modal-card-block workflow-block">
              <div className="block-eyebrow">
                {isEn ? "3-STEP AUTOMATED EXECUTION WORKFLOW" : "QUY TRÌNH TỰ ĐỘNG HÓA 3 BƯỚC"}
              </div>
              <div className="steps-flow-container">
                {(isEn ? feature.workflowEn : feature.workflowVi).map((wf, idx) => (
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
                {(isEn ? feature.specsEn : feature.specsVi).map((spec, sIdx) => (
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
                onClick={() => onSelectService(feature.titleVi)} 
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
  );
};
