import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaShieldAlt, 
  FaRocket, 
  FaFileContract, 
  FaReceipt, 
  FaArrowRight, 
  FaTimes, 
  FaCogs, 
  FaQrcode, 
  FaRobot, 
  FaSyncAlt, 
  FaChartLine, 
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
import ServicesSubnav from '../ServicesSubnav/ServicesSubnav';
import { fadeInUp, staggerContainer, cardPop } from './servicesData';
import { FlagshipShowcase } from './FlagshipShowcase';
import { SaasAutomationSection } from './SaasAutomationSection';
import { TeamBenchSection } from './TeamBenchSection';
import { PricingSection } from './PricingSection';
import { PricingWorkflowModal } from './PricingWorkflowModal';
import { SaasFeatureModal } from './SaasFeatureModal';
import './Services.scss';

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
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      <FlagshipShowcase isEn={isEn} />

      {/* 3. SAAS AUTOMATION DEEP DIVE */}
      <SaasAutomationSection 
        isEn={isEn}
        activeSaasCategory={activeSaasCategory}
        setActiveSaasCategory={setActiveSaasCategory}
        onSelectFeature={(feat) => setSelectedSaasFeature(feat)}
      />

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

        {/* LIVE METRICS CARDS */}
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

      {/* 5.5. CORE ENGINEERING TEAM */}
      <TeamBenchSection isEn={isEn} />

      {/* 5. TRANSPARENT PRICING SECTION */}
      <PricingSection 
        isEn={isEn}
        onSelectPlan={scrollToContact}
        onOpenWorkflowModal={() => setShowWorkflowModal(true)}
      />

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

        {/* WORKFLOW & QUOTATION BREAKDOWN MODAL */}
        <PricingWorkflowModal
          isOpen={showWorkflowModal}
          isEn={isEn}
          activeModalTab={activeModalTab}
          setActiveModalTab={setActiveModalTab}
          onClose={() => setShowWorkflowModal(false)}
          onContact={() => { setShowWorkflowModal(false); scrollToContact(); }}
        />

        {/* SAAS FEATURE DEEP DIVE MODAL */}
        <SaasFeatureModal
          feature={selectedSaasFeature}
          isEn={isEn}
          onClose={() => setSelectedSaasFeature(null)}
          onOpenLightbox={(img) => setLightboxImg(img)}
          onSelectService={(serviceTitle) => {
            setSelectedSaasFeature(null);
            navigate('/contact', { state: { service: serviceTitle } });
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Services;
