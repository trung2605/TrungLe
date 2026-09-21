import React, { useState } from 'react';
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
  FaQrcode
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
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
            <>Professional Websites for Small Businesses:<br /><span className="text-accent-underline">Fast, Aesthetic & Cost-Effective</span></>
          ) : (
            <>Website Chuyên Nghiệp Cho Chủ Shop Nhỏ:<br /><span className="text-accent-underline">Nhanh - Đẹp - Tối Ưu Chi Phí</span></>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-subtitle"
        >
          {isEn
            ? "Turnkey web development engineered by 1 Lead Architect + 4 Senior Developers. Complete civil contracts, zero tax headaches. You focus on selling, we handle the tech."
            : "Giải pháp thiết kế website trọn gói từ Team 1 Leader + 4 Kỹ Sư Công Nghệ Đà Nẵng. Hợp đồng dân sự rõ ràng, không lo thủ tục thuế — bạn chỉ cần tập trung bán hàng!"}
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

              <div className="showcase-cta-row">
                <a 
                  href="https://biensovip.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-view-live"
                >
                  {isEn ? "Explore Live Marketplace" : "Trải Nghiệm Sàn Thực Tế"} <FaExternalLinkAlt size={12} />
                </a>
                <span className="metric-badge">⚡ Lighthouse: 98/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EMPATHY & PROBLEM/SOLUTION */}
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
            <div className="card-body">
              <span className="card-num">01 / COST CONCERN</span>
              <h3 className="card-title">{isEn ? "Afraid it's too expensive?" : "Chi Phí Quá Đắt Đỏ?"}</h3>
              <p className="fear-text">{isEn ? "Agencies frequently quote 20 - 50M VND with bloated overhead." : "Nhiều bên báo giá 20-40 triệu kèm nhiều chi phí phát sinh khiến chủ shop e ngại."}</p>
              <div className="solution-box">
                <strong>{isEn ? "Our Commitment: " : "Giải pháp: "}</strong>
                {isEn ? "Calculated strictly on actual man-day effort. Over 75% invested directly in your product, starting at just 5.5M VND." : "Báo giá theo man-day công việc thực tế, gói MVP khởi nghiệp chỉ từ 5.5 triệu, hơn 75% chi phí dồn vào sản phẩm thật."}
              </div>
            </div>
          </div>

          <div className="empathy-card">
            <div className="card-stripe" style={{ backgroundColor: BLOCK_COLORS[1] }} />
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

      {/* 4. WHY CHOOSE US — INFOGRAPHIC */}
      <section className="section-container">
        <div className="section-header">
          <div className="section-eyebrow">{isEn ? "TEAM ARCHITECTURE" : "MÔ HÌNH HOẠT ĐỘNG"}</div>
          <h2 className="section-heading">{isEn ? "Why Over 100+ Shop Owners Choose Our Team" : "Tại Sao Hơn 100+ Chủ Shop Đã Tin Tưởng Chúng Tôi?"}</h2>
          <p className="section-desc">
            {isEn 
              ? "The perfect synergy between agile freelance pricing and disciplined software house engineering."
              : "Mô hình kết hợp tinh gọn: Linh hoạt về chi phí, kỷ luật về quy trình kỹ thuật và cam kết deadline."}
          </p>
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
                <span className="price-label">{isEn ? "Turnkey Investment" : "Chi Phí Trọn Gói"}</span>
                <div className="price-num">5.500.000₫</div>
                <div className="price-speed">⚡ {isEn ? "Delivered in 7 - 10 working days" : "Bàn giao trong 7 - 10 ngày"}</div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "Modern UI/UX Tailored Design" : "Giao diện hiện đại, chuẩn nhận diện thương hiệu"}</li>
                <li><FaCheckCircle /> {isEn ? "100% Mobile & Tablet Responsive" : "Tương thích 100% điện thoại, iPad, máy tính"}</li>
                <li><FaCheckCircle /> {isEn ? "Product Catalog & Order Contact Form" : "Danh mục sản phẩm, trang giới thiệu, form đặt hàng"}</li>
                <li><FaCheckCircle /> {isEn ? "Floating Zalo / Messenger / Call buttons" : "Nút gọi Hotline, chat Zalo, Messenger nổi tiện lợi"}</li>
                <li><FaCheckCircle /> {isEn ? "Google SEO Ready + Free SSL Certificate" : "Tối ưu chuẩn SEO Google cơ bản, chứng chỉ SSL bảo mật"}</li>
                <li><FaCheckCircle /> {isEn ? "6 Months Free Technical Warranty" : "Bảo hành sửa lỗi kỹ thuật miễn phí 6 tháng"}</li>
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
                <span className="highlight-chip">{isEn ? "POPULAR • 2X SPEED" : "ĐỀ XUẤT • 2X TỐC ĐỘ"}</span>
              </div>
              <h3 className="plan-title">{isEn ? "Fast MVP (2 Devs)" : "Gói MVP Tốc Hành (2 Devs)"}</h3>
              <p className="plan-desc">{isEn ? "Two engineers working simultaneously to accelerate delivery for urgent shop openings or campaigns." : "Dành cho shop cần khai trương gấp hoặc chạy chiến dịch. Hai lập trình viên code song song, rút ngắn 50% thời gian!"}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Investment" : "Chi Phí Trọn Gói"}</span>
                <div className="price-num">8.900.000₫</div>
                <div className="price-speed">🚀 {isEn ? "Superfast in 4 - 6 working days" : "Siêu tốc chỉ trong 4 - 6 ngày"}</div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "All features from Starter MVP" : "Toàn bộ tính năng của Gói Khởi Nghiệp"}</li>
                <li><FaCheckCircle /> <strong>{isEn ? "2 Engineers Working Simultaneously" : "2 Kỹ sư code song song, tiến độ thần tốc"}</strong></li>
                <li><FaCheckCircle /> {isEn ? "Dynamic VietQR Payment Integration" : "Tích hợp mã thanh toán VietQR động tự điền số tiền"}</li>
                <li><FaCheckCircle /> {isEn ? "Order Tracking & Email/Zalo notification" : "Quản lý đơn hàng tinh gọn, thông báo qua Email/Zalo"}</li>
                <li><FaCheckCircle /> {isEn ? "Free 1 Year Cloud VPS Hosting Setup" : "Tặng 1 năm Cloud Server tốc độ cao + cài đặt tên miền"}</li>
                <li><FaCheckCircle /> {isEn ? "8 Months Free Technical Warranty" : "Bảo hành kỹ thuật miễn phí 8 tháng"}</li>
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
                <span className="plan-tag">FULL SCOPE</span>
              </div>
              <h3 className="plan-title">{isEn ? "Full Enterprise E-Commerce" : "Gói Chuyên Nghiệp Toàn Diện"}</h3>
              <p className="plan-desc">{isEn ? "Complete e-commerce platform with automated payment, inventory, multi-roles and AI assistant." : "Dành cho thương hiệu, sàn giao dịch, cửa hàng lớn cần tính năng thanh toán tự động, quản lý kho và trợ lý AI thông minh."}</p>

              <div className="plan-pricing-row">
                <span className="price-label">{isEn ? "Turnkey Investment" : "Chi Phí Trọn Gói"}</span>
                <div className="price-num">16.500.000₫</div>
                <div className="price-speed">⭐ {isEn ? "Turnkey in 15 - 20 working days" : "Trọn gói trong 15 - 20 ngày"}</div>
              </div>

              <ul className="features-list">
                <li><FaCheckCircle /> {isEn ? "Full E-Commerce: Cart, Orders, Inventory" : "Đầy đủ sàn TMĐT: Giỏ hàng, tồn kho, đơn hàng đa trạng thái"}</li>
                <li><FaCheckCircle /> {isEn ? "Multi-gateway: VietQR, VNPay, Bank transfers" : "Tích hợp đa cổng thanh toán: VietQR, VNPay, chuyển khoản"}</li>
                <li><FaCheckCircle /> <strong>{isEn ? "DeepSeek AI Sales Consultation Agent" : "Tích hợp Trợ lý AI DeepSeek tư vấn bán hàng 24/7"}</strong></li>
                <li><FaCheckCircle /> {isEn ? "Advanced Admin Dashboard with Sales Analytics" : "Cổng quản trị chuyên sâu, biểu đồ doanh thu và khách hàng"}</li>
                <li><FaCheckCircle /> {isEn ? "Top Google SEO optimization & Ultra caching" : "Tối ưu SEO Google chuyên sâu, tốc độ tải dưới 0.8 giây"}</li>
                <li><FaCheckCircle /> {isEn ? "12 Months Free 24/7 Priority Warranty" : "Bảo hành 12 tháng + Hỗ trợ kỹ thuật ưu tiên 24/7"}</li>
              </ul>

              <button onClick={scrollToContact} className="btn-select-plan">
                {isEn ? "Consult Enterprise" : "Tư Vấn Gói Toàn Diện"}
              </button>
            </div>
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
            <span className="step-tag">BƯỚC 01</span>
            <h4 className="step-name">{isEn ? "1. Empathy & Scope" : "1. Lắng Nghe & Tư Vấn"}</h4>
            <p className="step-detail">{isEn ? "Analyze products, target buyers, and essential shop workflows." : "Tìm hiểu kỹ sản phẩm và khách hàng mục tiêu để chọn tính năng thiết thực nhất."}</p>
          </div>

          <div className="process-card">
            <span className="step-tag">BƯỚC 02</span>
            <h4 className="step-name">{isEn ? "2. Visual Mockup" : "2. Thiết Kế Giao Diện"}</h4>
            <p className="step-detail">{isEn ? "Modern UI/UX layout crafted and approved before writing code." : "Lên bản mẫu giao diện trực quan chuẩn mobile để chủ shop duyệt trước khi lập trình."}</p>
          </div>

          <div className="process-card">
            <span className="step-tag">BƯỚC 03</span>
            <h4 className="step-name">{isEn ? "3. Clean Coding" : "3. Lập Trình Chuẩn"}</h4>
            <p className="step-detail">{isEn ? "Clean code, sub-1s loading speed, and multi-layer security." : "Lập trình sạch sẽ, bảo mật cao, tối ưu tốc độ tải trang dưới 1 giây mượt mà."}</p>
          </div>

          <div className="process-card">
            <span className="step-tag">BƯỚC 04</span>
            <h4 className="step-name">{isEn ? "4. Strict QA / CI/CD" : "4. Kiểm Thử Nghiêm Ngặt"}</h4>
            <p className="step-detail">{isEn ? "Tested across iPhone, Android, iPad, and desktop browsers." : "Thử nghiệm đặt hàng, thanh toán trên iPhone, Android và máy tính, không để lọt lỗi."}</p>
          </div>

          <div className="process-card">
            <span className="step-tag">BƯỚC 05</span>
            <h4 className="step-name">{isEn ? "5. Handover & Warranty" : "5. Bàn Giao & Bảo Hành"}</h4>
            <p className="step-detail">{isEn ? "1-on-1 video guide, keys handover, and 24/7 warranty activation." : "Gửi video hướng dẫn 1-1, bàn giao quyền sở hữu hoàn toàn và bảo hành 24/7."}</p>
          </div>
        </div>
      </section>

      {/* 7. CONSULTATION BOOKING & DIRECT CONNECT */}
      <section id="consultation-form" className="section-container">
        <div className="consultation-card">
          <div className="leader-box">
            <div className="leader-row">
              <img src={NewAvatar} alt="Lê Trí Trung - Leader" className="avatar" />
              <div>
                <h3>Lê Trí Trung</h3>
                <p>Team Leader & Software Architect (Đà Nẵng)</p>
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
      </AnimatePresence>
    </div>
  );
};

export default Services;
