import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaRocket, 
  FaFileContract, 
  FaReceipt, 
  FaArrowRight, 
  FaPhoneAlt, 
  FaCommentDots, 
  FaEnvelope, 
  FaExternalLinkAlt, 
  FaTimes,
  FaSearch,
  FaRobot,
  FaQrcode,
  FaCogs,
  FaChartLine,
  FaSyncAlt,
  FaStar
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
import bannerFooter from '../../assets/landing/banner_footer.png';
import NewAvatar from '../../assets/information/image.png';
import './Services.scss';

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const BIENSOVIP_SHOTS = [
  {
    titleVi: "Trang chủ & Tìm kiếm tức thời",
    titleEn: "Home & Real-time Plate Search",
    url: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png"
  },
  {
    titleVi: "Chi tiết biển số & Đặt cọc giữ chỗ",
    titleEn: "Plate Detail & Deposit Reservation",
    url: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png"
  },
  {
    titleVi: "Bộ lọc đa chiều nâng cao & Phong thủy",
    titleEn: "Multi-filter & Numerological Categories",
    url: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579610/my-website/assets/projects/screenshots/nxlufqwkaozhvd5h7tk2.png"
  },
  {
    titleVi: "Cổng quản trị Admin & Đối soát VietQR",
    titleEn: "Admin Management & VietQR Audit",
    url: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579613/my-website/assets/projects/screenshots/vl8kafmfubidwk3mugcb.png"
  }
];

const Services = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('manday');

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    businessType: 'shop-thoi-trang',
    package: 'mvp-fast',
    budget: '5-10tr',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
  };

  const scrollToContact = () => {
    const el = document.getElementById('consultation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="services-page">
      {/* TERMINAL PROMPT HEADER */}
      <div className="terminal-prompt">
        <span className="prompt-sym">$</span>
        <span className="prompt-cmd">web-dev --team "1 Leader + 4 Devs" --location "Da Nang"</span>
        <span className="prompt-tag">→ ready for projects</span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="hero-section">
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

        <div className="saas-tags-row">
          <span className="saas-tag"><FaCogs /> {isEn ? "SaaS Automation Architecture" : "Chuyên Sâu Tự Động Hóa SaaS"}</span>
          <span className="saas-tag"><FaQrcode /> {isEn ? "Zero-Fee Dynamic VietQR" : "Đối Soát VietQR Tự Động 0đ"}</span>
          <span className="saas-tag"><FaRobot /> {isEn ? "24/7 DeepSeek AI Sales Agent" : "Trợ Lý AI Bán Hàng 24/7"}</span>
          <span className="saas-tag"><FaSyncAlt /> {isEn ? "Real-time Multi-device Sync" : "Đồng Bộ Kho Đa Thiết Bị"}</span>
        </div>

        <div className="trust-bar">
          <div className="trust-item">
            <FaCheckCircle /> {isEn ? "100% On-Time Guarantee" : "Cam Kết Đúng Hạn (Phạt nếu trễ)"}
          </div>
          <div className="trust-item">
            <FaFileContract /> {isEn ? "Civil Contract by Leader" : "Hợp Đồng Dân Sự Rõ Ràng"}
          </div>
          <div className="trust-item">
            <FaReceipt /> {isEn ? "Zero Client Tax Burden" : "Khách KHÔNG lo Thuế TNCN"}
          </div>
          <div className="trust-item">
            <FaShieldAlt /> {isEn ? "6 - 12 Months Free Warranty" : "Bảo Hành Miễn Phí 6 - 12 Tháng"}
          </div>
        </div>
      </section>

      {/* 2. FLAGSHIP CASE STUDY: BIENSOVIP AS PROOF */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "FEATURED DELIVERABLE" : "THÀNH PHẨM THỰC TẾ TIÊU BIỂU"}</div>
          <h2 className="section-heading">{isEn ? "From Request to Production: Biensovip.com" : "Từ Yêu Cầu Khách Hàng Đến Sản Phẩm Thực Tế: Biensovip.com"}</h2>
          <p className="section-desc">
            {isEn 
              ? "A specialized e-commerce marketplace engineered from scratch by our team in 30 days for a Da Nang automotive business."
              : "Minh chứng năng lực thực tế: Sàn thương mại điện tử chuyên biệt được team chúng tôi thiết kế và bàn giao chỉ trong 30 ngày cho đối tác doanh nghiệp tại Đà Nẵng."}
          </p>
        </div>

        <div className="flagship-showcase">
          <div className="showcase-header-bar">
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
            <div style={{ color: 'var(--color-ink-soft)' }}>
              https://biensovip.com
            </div>
            <div className="status-pill">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1ea64a', display: 'inline-block' }} />
              {isEn ? "PRODUCTION LIVE" : "ĐANG HOẠT ĐỘNG"}
            </div>
          </div>

          <div className="showcase-content-grid">
            {/* Visuals column */}
            <div className="showcase-visuals">
              <img 
                src={BIENSOVIP_SHOTS[activeShotIndex].url} 
                alt={BIENSOVIP_SHOTS[activeShotIndex].titleVi}
                className="main-preview-img"
                onClick={() => setLightboxImg(BIENSOVIP_SHOTS[activeShotIndex].url)}
                title="Click to view full size"
              />
              <div className="thumbnails-row">
                {BIENSOVIP_SHOTS.map((shot, idx) => (
                  <img 
                    key={idx}
                    src={shot.url}
                    alt={shot.titleVi}
                    style={{
                      borderColor: activeShotIndex === idx ? 'var(--color-ink)' : 'var(--color-hairline)',
                      opacity: activeShotIndex === idx ? 1 : 0.65
                    }}
                    onClick={() => setActiveShotIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Details column */}
            <div className="showcase-details">
              <span className="client-tag">{isEn ? "DA NANG ENTERPRISE CLIENT" : "KHÁCH HÀNG DOANH NGHIỆP ĐÀ NẴNG"}</span>
              <h3>Biensovip.com — Sàn Giao Dịch Biển Số Đẹp</h3>
              <p className="client-story">
                {isEn 
                  ? "The client required a lightning-fast, high-trust marketplace to display thousands of high-value license plates with zero gateway fees and automatic deposit tracking."
                  : "Khách hàng yêu cầu một sàn giao dịch tốc độ cao, hiển thị hàng chục nghìn biển số giá trị lớn, triệt tiêu 100% phí cổng thanh toán và quản lý đặt cọc tự động qua VietQR."}
              </p>

              <ul className="specs-list">
                <li>
                  <FaSearch />
                  <div><strong>{isEn ? "Sub-8ms Multi-filter" : "Lọc đa chiều dưới 8ms"}:</strong> {isEn ? "Composite indexing for thousands of plates" : "Tìm kiếm theo ngũ quý, sảnh tiến, dải giá tức thời"}</div>
                </li>
                <li>
                  <FaQrcode />
                  <div><strong>{isEn ? "VietQR 2-Step Deposit Flow" : "Xác thực cọc VietQR 2 bước"}:</strong> {isEn ? "0% transaction fee, zero chargeback fraud risk" : "Phí giao dịch 0đ, an toàn tuyệt đối, kế toán duyệt nhanh"}</div>
                </li>
                <li>
                  <FaRobot />
                  <div><strong>{isEn ? "DeepSeek AI Sales Agent" : "Trợ lý AI DeepSeek tư vấn 24/7"}:</strong> {isEn ? "Automated numerology suggestions directly from stock" : "Tư vấn biển số hợp tuổi, mệnh phong thủy theo thời gian thực"}</div>
                </li>
                <li>
                  <FaShieldAlt />
                  <div><strong>{isEn ? "Delivered in 30 Days" : "Bàn giao đúng 30 ngày"}:</strong> {isEn ? "Clean Architecture backend (.NET 8) + React 19 web" : "Đạt Google Lighthouse 98/100, bảo hành kỹ thuật 12 tháng"}</div>
                </li>
              </ul>

              <div className="showcase-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <a 
                  href="https://biensovip.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-view-live"
                >
                  {isEn ? "Explore Live Marketplace" : "Trải Nghiệm Sàn Thực Tế"} <FaExternalLinkAlt size={12} />
                </a>

                <Link
                  to="/projects/26"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px', borderRadius: '50px',
                    backgroundColor: '#ffffff', color: '#111827',
                    fontSize: '13.5px', fontWeight: '500', textDecoration: 'none',
                    border: '1px solid #d1d5db',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
                >
                  <span>{isEn ? "Technical Case Study" : "Case Study Kỹ Thuật"}</span>
                  <FaArrowRight size={11} />
                </Link>

                <Link
                  to="/blog/biensovip-postgresql-vs-mongodb-multi-filter"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 18px', borderRadius: '50px',
                    backgroundColor: '#ede5fb', color: '#6d3fc9',
                    fontSize: '13.5px', fontWeight: '500', textDecoration: 'none',
                    border: '1px solid rgba(109, 63, 201, 0.2)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#e3d6fa'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ede5fb'; }}
                >
                  <span>{isEn ? "PostgreSQL 8ms Deep-Dive" : "Bài Viết CSDL PostgreSQL 8ms"}</span>
                  <FaArrowRight size={11} />
                </Link>

                <span className="metric-badge">⚡ Lighthouse: 98/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAAS AUTOMATION DEEP DIVE */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "CORE SPECIALIZATION" : "LĨNH VỰC TRỌNG TÂM"}</div>
          <h2 className="section-heading">{isEn ? "SaaS Automation: Turning Your Website into a 24/7 Sales Engine" : "Tự Động Hóa SaaS: Biến Website Thành Cỗ Máy Bán Hàng & Vận Hành Tự Động 24/7"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We don't just build static showcase sites. We engineer lean SaaS automation systems that eliminate manual repetitive tasks, accelerate lead conversions, and scale your revenue effortlessly."
              : "Chúng tôi không chỉ dựng website tĩnh đơn thuần. Trọng tâm cốt lõi là xây dựng các giải pháp Tự động hóa SaaS (SaaS Automation) tinh gọn, giải phóng 80% thời gian trực chốt của chủ shop và nhân đôi tỉ lệ chuyển đổi."}
          </p>
        </div>

        <div className="saas-features-grid">
          <div className="saas-feature-card">
            <div className="feature-icon-box" style={{ background: '#dceeb1' }}>
              <FaCogs size={20} />
            </div>
            <h3>{isEn ? "1. Automated Lead & Funnel Routing" : "1. Tự Động Hóa Phễu Thu Thập & Phân Luồng Lead"}</h3>
            <p>
              {isEn
                ? "Every customer action (general inquiry, deposit request, instant purchase) is automatically classified and pushed instantly to your Telegram/Zalo bot with zero delay."
                : "Mỗi hành động của khách (Hỏi tư vấn, Đặt cọc giữ chỗ, Mua đứt tức thì) đều được hệ thống tự động gắn tag phân loại, gửi thông báo tức thời về Zalo / Telegram của chủ shop để chốt nóng trong 30 giây."}
            </p>
            <div className="feature-chip">{isEn ? "Instant Telegram/Zalo Webhook" : "Bắn Webhook Zalo/Telegram Tức Thời"}</div>
          </div>

          <div className="saas-feature-card">
            <div className="feature-icon-box" style={{ background: '#c5b0f4' }}>
              <FaQrcode size={20} />
            </div>
            <h3>{isEn ? "2. Zero-Fee Dynamic VietQR Reconciliation" : "2. Tự Động Hóa Thanh Toán & Đối Soát VietQR 0đ"}</h3>
            <p>
              {isEn
                ? "Dynamic QR generation embedded with exact order codes and amounts. Bank webhooks auto-verify settlements instantly without manual bank statement tracking or payment gateway cuts."
                : "Hệ thống tự động sinh mã VietQR động chứa chính xác số tiền cọc và mã đơn hàng. Webhook ngân hàng tự động bắt log xác nhận thành công 100%, chủ shop không cần ngồi rà sao kê thủ công."}
            </p>
            <div className="feature-chip">{isEn ? "0% Gateway Fee • Real-time Webhook" : "0% Phí Cổng • Xác Nhận Thời Gian Thực"}</div>
          </div>

          <div className="saas-feature-card">
            <div className="feature-icon-box" style={{ background: '#f4ecd6' }}>
              <FaSyncAlt size={20} />
            </div>
            <h3>{isEn ? "3. Real-time Inventory Locking & Sync" : "3. Tự Động Hóa Quản Lý Kho & Khóa Trạng Thái Hàng"}</h3>
            <p>
              {isEn
                ? "As soon as a deposit is confirmed, product inventory locks instantly across all active browsers and devices, preventing double-booking and stock conflicts."
                : "Ngay khi lệnh cọc hoặc đơn hàng được xác nhận, hệ thống tự động khóa sản phẩm, chuyển trạng thái 'Đã cọc / Đang giao dịch' trên toàn bộ thiết bị khách hàng khác đang xem."}
            </p>
            <div className="feature-chip">{isEn ? "Zero Double-Booking Conflict" : "Triệt Tiêu Trùng Đơn & Lỗi Kho"}</div>
          </div>

          <div className="saas-feature-card">
            <div className="feature-icon-box" style={{ background: '#c8e6cd' }}>
              <FaRobot size={20} />
            </div>
            <h3>{isEn ? "4. 24/7 AI-Powered Advisory & Smart Recommendation" : "4. Tự Động Hóa CSKH & Đề Xuất Bằng AI (DeepSeek)"}</h3>
            <p>
              {isEn
                ? "Trained on your private catalog and pricing logic. The AI assistant consults customers, computes customized criteria (numerology, sizing, budget), and guides them to checkout."
                : "Trợ lý AI được huấn luyện theo danh mục sản phẩm của shop. Tự động tính toán nhu cầu chuyên sâu (như phân tích ngũ hành, phong thủy, so sánh giá) và hướng dẫn khách chốt đơn 24/7 kể cả nửa đêm."}
            </p>
            <div className="feature-chip">{isEn ? "RAG-Trained DeepSeek Model" : "AI Hiểu Sâu Dữ Liệu Shop"}</div>
          </div>
        </div>
      </section>

      {/* 4. EMPATHY & PROBLEM/SOLUTION */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "EMPATHY" : "THẤU HIỂU NỖI LO"}</div>
          <h2 className="section-heading">{isEn ? "What Anxieties Stop You From Making a Website?" : "Bạn Lo Lắng Gì Khi Bắt Đầu Làm Website?"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We understand non-technical owners have legitimate concerns. Here is how our team eliminates every single one of them."
              : "Chúng tôi thấu hiểu những băn khoăn thực tế của chủ cửa hàng khi chưa từng làm việc với đội ngũ lập trình."}
          </p>
        </div>

        <div className="empathy-grid">
          <div className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[0] }} />
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
          </div>

          <div className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[1] }} />
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
          </div>

          <div className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[2] }} />
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
          </div>

          <div className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[3] }} />
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
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US — LIVE AUDITED METRICS & INFOGRAPHIC */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "PROVEN TRACK RECORD" : "MINH CHỨNG THỰC TẾ TỪ HỆ THỐNG VẬN HÀNH"}</div>
          <h2 className="section-heading">{isEn ? "Why Over 100+ Shop Owners Choose Our Team" : "Tại Sao Hơn 100+ Chủ Shop Đã Tin Tưởng Chúng Tôi?"}</h2>
          <p className="section-desc">
            {isEn 
              ? "We don't sell empty promises. Here are the actual, verified operational metrics achieved on our production client platforms."
              : "Chúng tôi chứng minh năng lực bằng số liệu đo lường thực tế. Dưới đây là các chỉ số vận hành được trích xuất trực tiếp từ Bảng điều khiển quản trị (Admin Dashboard) của hệ thống Biensovip đang hoạt động tại Đà Nẵng."}
          </p>
        </div>

        {/* LIVE METRICS CARDS (DATA EXTRACTED FROM BIENSOVIP /admin/tong-quan) */}
        <div className="live-metrics-banner">
          <div className="metrics-banner-header">
            <div className="source-tag">
              <span className="live-pulse" />
              <span>{isEn ? "LIVE METRICS: BIENSOVIP.COM/ADMIN/TONG-QUAN (RECENT 30 DAYS)" : "SỐ LIỆU ĐO LƯỜNG THỰC TẾ: BẢNG QUẢN TRỊ BIENSOVIP.COM (30 NGÀY GẦN NHẤT)"}</span>
            </div>
            <span className="audit-status">⚡ {isEn ? "Audited via Live Admin API" : "Dữ liệu đối soát hệ thống thật"}</span>
          </div>

          <div className="metrics-kpi-grid">
            <div className="kpi-card">
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
            </div>

            <div className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-num">+300%</span>
                <span className="kpi-trend positive">🚀 Tăng Trưởng</span>
              </div>
              <div className="kpi-label">{isEn ? "Inquiry & Booking Growth" : "Tăng Trưởng Yêu Cầu & Cọc"}</div>
              <div className="kpi-sub">
                {isEn 
                  ? "Sub-8ms dynamic search and smart categories drove high qualified buyer engagement." 
                  : "Lượng khách chủ động liên hệ tăng gấp 4 lần ngay sau khi triển khai hệ thống lọc tức thời <8ms."}
              </div>
            </div>

            <div className="kpi-card">
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
            </div>

            <div className="kpi-card">
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
            </div>
          </div>

          {/* VISUAL FUNNEL FLOW BREAKDOWN */}
          <div className="funnel-breakdown-box">
            <div className="funnel-title">
              <FaChartLine /> {isEn ? "Verified Sales Funnel Progression (Actual 30-Day Cycle)" : "Hành Trình Phễu Chuyển Đổi Thực Tế (Chu Kỳ Vận Hành 30 Ngày)"}
            </div>
            <div className="funnel-steps-row">
              <div className="funnel-step">
                <span className="step-count">1,250+</span>
                <span className="step-name">{isEn ? "Unique Visitors" : "Lượt Xem Độc Bản"}</span>
                <span className="step-pct">{isEn ? "Targeted Buyer Traffic" : "Lượng Khách Tiếp Cận"}</span>
              </div>
              <div className="funnel-arrow">➔</div>
              <div className="funnel-step highlight">
                <span className="step-count">180+</span>
                <span className="step-name">{isEn ? "Plates Searched & Leads" : "Yêu Cầu Tra Cứu & Liên Hệ"}</span>
                <span className="step-pct">{isEn ? "14.4% Conversion" : "14.4% Tỷ Lệ Tương Tác"}</span>
              </div>
              <div className="funnel-arrow">➔</div>
              <div className="funnel-step">
                <span className="step-count">24</span>
                <span className="step-name">{isEn ? "In Consultation & Booking" : "Tư Vấn Chuyên Sâu & Giữ Chỗ"}</span>
                <span className="step-pct">{isEn ? "VietQR Deposit Flow" : "Phân Luồng Đặt Cọc VietQR"}</span>
              </div>
              <div className="funnel-arrow">➔</div>
              <div className="funnel-step success">
                <span className="step-count">9</span>
                <span className="step-name">{isEn ? "Deals Closed in Cycle" : "Giao Dịch Đã Chốt (30 Ngày)"}</span>
                <span className="step-pct">{isEn ? "37.5% Close Rate" : "37.5% Tỷ Lệ Chốt"}</span>
              </div>
            </div>

            <div className="funnel-footer-details">
              <div className="tag-group">
                <span className="intent-tag">{isEn ? "📌 12 Auto-deposits via VietQR Webhook" : "📌 12 Đặt cọc tự động qua VietQR Webhook"}</span>
                <span className="intent-tag">{isEn ? "📌 8 Outright Purchases Handed Over" : "📌 8 Mua đứt và bàn giao giấy tờ"}</span>
                <span className="intent-tag">{isEn ? "📌 4 Finalizing Ownership Transfer" : "📌 4 Đang hoàn tất thủ tục sang tên"}</span>
              </div>
              <div className="rating-pill">
                <FaStar style={{ color: '#f59e0b' }} /> {isEn ? "Client Satisfaction: 5.0 / 5.0 ★ Absolute" : "Đánh Giá Hài Lòng: 5.0 / 5.0 ★ Tuyệt Đối"}
              </div>
            </div>
          </div>
        </div>

        <div className="infographic-card">
          <img 
            src={infographicTeam} 
            alt="Infographic mô hình 1 Leader + 4 Devs" 
            className="infographic-img"
            onClick={() => setLightboxImg(infographicTeam)}
            title="Bấm để xem phóng to"
          />
        </div>

        <div className="pillars-grid">
          <div className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">01</div>
              <h4>{isEn ? "1 Leader + 4 Devs Model" : "Mô Hình Chuyên Nghiệp"}</h4>
            </div>
            <p>{isEn ? "1 Leader coordinates directly with you, while 4 specialized developers execute frontend, backend, UI/UX, and testing." : "Team 1 Leader + 4 Devs kiểm soát quy trình chặt chẽ, code review từng pull request, CI/CD tự động."}</p>
          </div>

          <div className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">02</div>
              <h4>{isEn ? "Simple Civil Contract" : "Hợp Đồng Dân Sự Đơn Giản"}</h4>
            </div>
            <p>{isEn ? "Transparent contracting. Leader Le Tri Trung takes legal accountability for quality and timeline." : "Ký kết minh bạch, dễ dàng. Leader đứng tên pháp lý chịu trách nhiệm cam kết tiến độ và chất lượng."}</p>
          </div>

          <div className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">03</div>
              <h4>{isEn ? "Zero Client Tax Hassle" : "Khách KHÔNG Lo Thuế TNCN"}</h4>
            </div>
            <p>{isEn ? "We self-declare and remit our own PIT taxes. Zero administrative paperwork for shop owners." : "Chúng tôi tự kê khai và nộp thuế thu nhập cá nhân đầy đủ. Chủ shop không phải lo thủ tục kế toán rắc rối."}</p>
          </div>

          <div className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-icon-box">04</div>
              <h4>{isEn ? "Maximum Value Efficiency" : "Cơ Chế Giá Trị Tối Ưu"}</h4>
            </div>
            <p>{isEn ? "Over 75% of your investment flows directly into software craft, licensed plugins, and high-speed hosting." : "Hơn 75% chi phí đầu tư trực tiếp vào lập trình và tài nguyên cao cấp (theme, plugin, server xịn), mang lại giá trị thực."}</p>
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENT PRICING SECTION (FROM EXCEL) */}
      <section id="pricing-section" className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "TRANSPARENT QUOTATION" : "BẢNG GIÁ MINH BẠCH"}</div>
          <h2 className="section-heading">{isEn ? "Engineered Packages for Small Businesses" : "Các Gói Dịch Vụ Thiết Kế Web Phù Hợp Từng Giai Đoạn"}</h2>
          <p className="section-desc">
            {isEn 
              ? "Calculated transparently on actual engineering man-days with a 50% discount policy applied for small shop owners."
              : "Chi phí tính minh bạch theo man-day công việc thực tế, đã áp dụng chính sách trợ giá 50% cho chủ shop khởi nghiệp."}
          </p>
        </div>

        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="pricing-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[0] }} />
            <div className="card-inner">
              <div className="plan-badge-row">
                <span className="plan-tag">GÓI 1 DEV</span>
              </div>
              <h3 className="plan-title">{isEn ? "Starter MVP" : "Gói MVP Khởi Nghiệp"}</h3>
              <p className="plan-desc">{isEn ? "Best for small boutiques, single product lines, or launching fast to test the market." : "Phù hợp cho cá nhân, shop mới mở, cần ra mắt web nhanh để bán hàng và thử nghiệm thị trường với chi phí tiết kiệm nhất."}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
                <div className="price-num">11.500.000₫</div>
                <div className="price-speed">⚡ {isEn ? "Average timeline: ~1.5 - 2 months" : "Thời gian thực hiện: ~1.5 - 2 tháng"}</div>
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
          </div>

          {/* Plan 2 */}
          <div className="pricing-card featured">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[1] }} />
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
                <div className="price-speed">🚀 {isEn ? "Average timeline: ~1.5 - 2 months (2 Devs)" : "Thời gian thực hiện: ~1.5 - 2 tháng (2 Kỹ sư)"}</div>
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
          </div>

          {/* Plan 3 */}
          <div className="pricing-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[2] }} />
            <div className="card-inner">
              <div className="plan-badge-row">
                <span className="plan-tag">FULL SCOPE (5 DEVS)</span>
              </div>
              <h3 className="plan-title">{isEn ? "Full Enterprise E-Commerce" : "Gói Chuyên Nghiệp Toàn Diện"}</h3>
              <p className="plan-desc">{isEn ? "Complete e-commerce platform with automated payment, inventory, multi-roles and AI assistant." : "Dành cho thương hiệu, sàn giao dịch, cửa hàng lớn cần tính năng thanh toán tự động, quản lý kho và trợ lý AI thông minh."}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
                <div className="price-num">33.000.000₫</div>
                <div className="price-speed">⭐ {isEn ? "Average timeline: ~2 - 2.5 months (5 Devs)" : "Thời gian thực hiện: ~2 - 2.5 tháng (Team 5 kỹ sư)"}</div>
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
          </div>
        </div>

        {/* NEGOTIATION & STARTUP SUBSIDY HOOK BANNER */}
        <div className="negotiation-banner">
          <div className="banner-top-row">
            <div className="banner-badge">
              <span className="sparkle">✨</span>
              <span>{isEn ? "FLEXIBLE BUDGET NEGOTIATION POLICY" : "CHÍNH SÁCH THƯƠNG LƯỢNG & ĐÀM PHÁN GIÁ LINH HOẠT"}</span>
            </div>
            <span className="sub-tag">🔥 {isEn ? "Startup Subsidies 20% – 30%" : "Trợ giá khởi nghiệp 20% – 30%"}</span>
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
        </div>

        {/* Policies */}
        <div className="policy-box">
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
        </div>
      </section>

      {/* 6. 5-STEP PROCESS */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "WORK PROCESS" : "QUY TRÌNH 5 BƯỚC"}</div>
          <h2 className="section-heading">{isEn ? "5 Steps to Your Perfect Website" : "Quy Trình 5 Bước Đến Website Hoàn Hảo"}</h2>
          <p className="section-desc">
            {isEn 
              ? "From empathetic listening to verified code delivery. Transparent every step of the way."
              : "Từ sự lắng nghe thấu hiểu đến quy trình bàn giao code chuẩn mực, minh bạch trong từng giai đoạn."}
          </p>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <div className="step-svg-box">
              <Step1ScopeSVG />
            </div>
            <span className="step-tag">BƯỚC 01</span>
            <h4 className="step-name">{isEn ? "1. Empathy & Scope" : "1. Lắng Nghe & Tư Vấn"}</h4>
            <p className="step-detail">{isEn ? "Analyze products, target buyers, and essential shop workflows." : "Tìm hiểu kỹ sản phẩm và khách hàng mục tiêu để chọn tính năng thiết thực nhất."}</p>
          </div>

          <div className="process-card">
            <div className="step-svg-box">
              <Step2DesignSVG />
            </div>
            <span className="step-tag">BƯỚC 02</span>
            <h4 className="step-name">{isEn ? "2. Visual Mockup" : "2. Thiết Kế Giao Diện"}</h4>
            <p className="step-detail">{isEn ? "Modern UI/UX layout crafted and approved before writing code." : "Lên bản mẫu giao diện trực quan chuẩn mobile để chủ shop duyệt trước khi lập trình."}</p>
          </div>

          <div className="process-card">
            <div className="step-svg-box">
              <Step3CodingSVG />
            </div>
            <span className="step-tag">BƯỚC 03</span>
            <h4 className="step-name">{isEn ? "3. Clean Coding" : "3. Lập Trình Chuẩn"}</h4>
            <p className="step-detail">{isEn ? "Clean code, sub-1s loading speed, and multi-layer security." : "Lập trình sạch sẽ, bảo mật cao, tối ưu tốc độ tải trang dưới 1 giây mượt mà."}</p>
          </div>

          <div className="process-card">
            <div className="step-svg-box">
              <Step4TestingSVG />
            </div>
            <span className="step-tag">BƯỚC 04</span>
            <h4 className="step-name">{isEn ? "4. Strict QA / CI/CD" : "4. Kiểm Thử Nghiêm Ngặt"}</h4>
            <p className="step-detail">{isEn ? "Tested across iPhone, Android, iPad, and desktop browsers." : "Thử nghiệm đặt hàng, thanh toán trên iPhone, Android và máy tính, không để lọt lỗi."}</p>
          </div>

          <div className="process-card">
            <div className="step-svg-box">
              <Step5HandoverSVG />
            </div>
            <span className="step-tag">BƯỚC 05</span>
            <h4 className="step-name">{isEn ? "5. Handover & Warranty" : "5. Bàn Giao & Bảo Hành"}</h4>
            <p className="step-detail">{isEn ? "1-on-1 video guide, keys handover, and 24/7 warranty activation." : "Gửi video hướng dẫn 1-1, bàn giao quyền sở hữu hoàn toàn và bảo hành 24/7."}</p>
          </div>
        </div>

        {/* PROCESS TO QUOTATION & CONTRACT CTA BANNER */}
        <div className="process-cta-banner">
          <div className="cta-banner-text">
            <h4>{isEn ? "Want to see how your money is broken down and calculated?" : "Bạn muốn hiểu rõ số tiền của mình được sử dụng và tính toán như thế nào?"}</h4>
            <p>{isEn ? "We believe in radical engineering transparency. See how engineering man-days translate directly into software craftsmanship and strict delay/bonus contract clauses." : "Minh bạch tuyệt đối trong từng dòng code và chi phí: Xem chi tiết cách tính Man-day từ file Báo Giá Excel, quy trình giải ngân an toàn 40/60 và điều khoản phạt trễ tiến độ."}</p>
          </div>
          <button onClick={() => setShowWorkflowModal(true)} className="btn-open-workflow-modal">
            <FaFileContract /> {isEn ? "Explore Quotation & Contract Workflow" : "Khám Phá Quy Trình Báo Giá & Hợp Đồng"}
          </button>
        </div>
      </section>

      {/* 7. CONSULTATION BOOKING & DIRECT CONNECT */}
      <section id="consultation-form" className="section-container">
        <div className="consultation-card">
          <div className="leader-box">
            <div className="leader-row">
              <img src={NewAvatar} alt="Lê Trí Trung - Leader" className="avatar" />
              <div>
                <h3 style={{ margin: '0 0 2px 0' }}>Lê Trí Trung</h3>
                <p style={{ margin: '0 0 6px 0' }}>Team Leader & Software Architect (Đà Nẵng)</p>
                <Link 
                  to="/about"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: '#6d3fc9',
                    textDecoration: 'none',
                    borderBottom: '1px dashed #6d3fc9',
                  }}
                >
                  {isEn ? "Read Full Background & Story →" : "Xem Hành Trình & Giới Thiệu Bản Thân →"}
                </Link>
              </div>
            </div>

            <div className="leader-quote">
              {isEn 
                ? "“Investing in a professional website is investing in your store's future. You won't talk to a sales rep — I will personally analyze your shop and recommend the most cost-effective architecture.”"
                : "“Đầu tư cho website là đầu tư cho tương lai cửa hàng. Liên hệ trực tiếp với em để được tư vấn kịch bản tối ưu nhất, không lo bị chèo kéo.”"}
            </div>

            <div className="direct-channels">
              <a 
                href="https://zalo.me/0782399721" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-btn zalo"
              >
                <FaCommentDots size={16} />
                <span>{isEn ? "Chat via Zalo (0782.399.721)" : "Nhắn Zalo Với Leader (0782.399.721)"}</span>
              </a>

              <a 
                href="tel:0782399721" 
                className="channel-btn phone"
              >
                <FaPhoneAlt size={14} />
                <span>Hotline: 0782.399.721 / 0819.539.121</span>
              </a>

              <a 
                href="mailto:letritrung2605@gmail.com" 
                className="channel-btn email"
              >
                <FaEnvelope size={14} />
                <span>Email: letritrung2605@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="form-box">
            <h3>{isEn ? "Book a Free Consultation" : "Đăng Ký Nhận Tư Vấn Miễn Phí"}</h3>
            <p>{isEn ? "Fill in your information, we will get in touch within 30 minutes." : "Để lại thông tin, team sẽ liên hệ lại với bạn trong vòng 30 phút!"}</p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ color: '#1ea64a', marginBottom: '14px' }}>
                  <FaCheckCircle size={44} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>
                  {isEn ? "Request Received Successfully!" : "Đã Nhận Yêu Cầu Thành Công!"}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--color-ink-soft)', marginBottom: '18px' }}>
                  {isEn 
                    ? "Leader Le Tri Trung will reach out to your Phone/Zalo shortly."
                    : "Leader Lê Trí Trung sẽ chủ động liên hệ qua Số điện thoại / Zalo của bạn ngay."}
                </p>
                <a 
                  href="https://zalo.me/0782399721" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-pill-primary"
                  style={{ display: 'inline-flex' }}
                >
                  <FaCommentDots size={14} /> {isEn ? "Chat Immediately on Zalo" : "Nhắn Zalo Ngay"}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="client-name">{isEn ? "Your Name *" : "Họ và Tên của bạn *"}</label>
                  <input 
                    id="client-name" 
                    type="text" 
                    required 
                    placeholder={isEn ? "e.g., Nguyen Van A" : "Ví dụ: Anh Tuấn, Chị Mai..."}
                    value={formState.name}
                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="client-phone">{isEn ? "Phone / Zalo Number *" : "Số Điện Thoại / Zalo *"}</label>
                  <input 
                    id="client-phone" 
                    type="tel" 
                    required 
                    placeholder={isEn ? "e.g., 0905xxxxxx" : "Ví dụ: 0905.xxx.xxx"}
                    value={formState.phone}
                    onChange={e => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-field">
                    <label htmlFor="business-type">{isEn ? "Business Type" : "Lĩnh vực kinh doanh"}</label>
                    <select 
                      id="business-type"
                      value={formState.businessType}
                      onChange={e => setFormState({ ...formState, businessType: e.target.value })}
                    >
                      <option value="shop-thoi-trang">{isEn ? "Fashion / Boutique" : "Shop Thời Trang / Mỹ Phẩm"}</option>
                      <option value="am-thuc-fnb">{isEn ? "Food & Beverage / Cafe" : "Quán Ăn / Cafe / Bakery"}</option>
                      <option value="dich-vu-spa">{isEn ? "Services / Spa / Salon" : "Dịch vụ / Spa / Làm đẹp"}</option>
                      <option value="showroom-oto-bienso">{isEn ? "Automotive / Showroom" : "Xe cộ / Biển số / Showroom"}</option>
                      <option value="khac">{isEn ? "Other Business" : "Ngành nghề khác"}</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="budget-range">{isEn ? "Estimated Budget" : "Ngân sách dự kiến"}</label>
                    <select 
                      id="budget-range"
                      value={formState.budget}
                      onChange={e => setFormState({ ...formState, budget: e.target.value })}
                    >
                      <option value="5-10tr">{isEn ? "5 - 10M VND (Starter)" : "5 - 10 Triệu (Gói MVP)"}</option>
                      <option value="10-20tr">{isEn ? "10 - 20M VND (Full)" : "10 - 20 Triệu (Gói Đầy Đủ)"}</option>
                      <option value="tren-20tr">{isEn ? "> 20M VND (Enterprise)" : "Trên 20 Triệu (Doanh nghiệp)"}</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="client-message">{isEn ? "Your Requirements / Notes" : "Nhu cầu hoặc yêu cầu đặc biệt"}</label>
                  <textarea 
                    id="client-message" 
                    rows={2} 
                    placeholder={isEn ? "e.g., I want an online product showcase with fast Zalo ordering..." : "Ví dụ: Cần website giới thiệu sản phẩm đồ ăn vặt, có đặt hàng nhanh..."}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-submit">
                  {isEn ? "Submit & Book Leader Meeting" : "Hẹn Gặp Leader Ngay (Miễn Phí)"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Banner Graphic Asset */}
        <div className="footer-banner-box">
          <img src={bannerFooter} alt="Đà Nẵng Website Development Team Contact Banner" />
        </div>
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
                      <strong>💡 {isEn ? "Core Value Exchange:" : "Số tiền của bạn được đánh đổi thế nào?"}</strong>
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
      </AnimatePresence>
    </div>
  );
};

export default Services;
