import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaBolt, FaQrcode, FaEnvelope, FaUsers, FaArrowRight, FaExternalLinkAlt, FaProjectDiagram, FaServer, FaCogs, FaRobot } from 'react-icons/fa';
import { fadeInUp, BIENSOVIP_SHOTS, BRANDHUB_SHOTS } from './servicesData';

export const FlagshipShowcase = ({ isEn }) => {
  const navigate = useNavigate();

  return (
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

      {/* 2. BALANCED 2-COLUMN FLAGSHIP CARDS */}
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
  );
};
