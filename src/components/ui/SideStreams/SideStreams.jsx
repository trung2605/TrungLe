import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaRocket, 
  FaUsers, 
  FaAward, 
  FaCogs, 
  FaQrcode, 
  FaShieldAlt,
  FaEyeSlash,
  FaEye,
  FaArrowRight,
  FaClock,
  FaChevronUp,
  FaChevronDown,
  FaCheck
} from 'react-icons/fa';
import './SideStreams.scss';

// SẢN PHẨM CODE THỰC TẾ (CÓ ẢNH PREVIEW THẬT & BULLETS TÍNH NĂNG CHI TIẾT)
const PRODUCT_ITEMS = [
  {
    id: 'p1',
    tag: 'SÀN GIAO DỊCH SAAS',
    title: 'Sàn Biển Số VIP Đà Nẵng',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png',
    tech: 'Java 17 • PostgreSQL • VietQR',
    metric: '14 Trang Admin',
    descVi: 'Sàn giao dịch số đẹp 280+ sản phẩm đang hoạt động thực tế tại Đà Nẵng.',
    descEn: 'Live marketplace managing 280+ VIP plates operating in Da Nang.',
    bulletsVi: [
      'Bộ lọc tức thời siêu tốc <8ms',
      'Tự động giải toán phong thủy ngũ hành',
      'Khớp cọc tự động qua VietQR 0đ phí'
    ],
    bulletsEn: [
      'Sub-8ms instant catalog search',
      'Automated Five Elements feng-shui math',
      'Automated VietQR deposit matching'
    ],
    link: '/du-an'
  },
  {
    id: 'p2',
    tag: 'BẢNG QUẢN TRỊ ADMIN',
    title: 'Admin Dashboard Đối Soát',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579610/my-website/assets/projects/screenshots/nxlufqwkaozhvd5h7tk2.png',
    tech: 'Spring Boot • Clean Arch',
    metric: '36+ Đơn Đã Chốt',
    descVi: 'Trung tâm quản trị vận hành kho hàng, dòng tiền và lịch sử giao dịch.',
    descEn: 'Centralized admin hub for stock, cashflow, and transaction audits.',
    bulletsVi: [
      'Quản lý 280+ sản phẩm & cập nhật giá real-time',
      'Nhật ký kiểm toán SHA-256 bảo vệ dữ liệu',
      'Thông báo đơn hàng qua Telegram Webhook'
    ],
    bulletsEn: [
      '280+ live inventory & instant price updates',
      'SHA-256 audit trail protecting ledger',
      'Instant order alerts via Telegram webhook'
    ],
    link: '/du-an'
  },
  {
    id: 'p3',
    tag: 'CỬA HÀNG TMĐT',
    title: 'Dola Bakery E-Commerce',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962632/my-website/assets/projects/DolaBakery.png',
    tech: 'React • Node.js • Cloud VPS',
    metric: 'Tải Trang <0.8s',
    descVi: 'Website bán hàng thời trang/bánh ngọt cao cấp, tối ưu chuyển đổi phễu.',
    descEn: 'High-conversion boutique bakery shop optimized for buyer conversions.',
    bulletsVi: [
      'Điểm Google Lighthouse 98/100 tuyệt đối',
      'Giỏ hàng & phân loại sản phẩm mượt mà',
      'Tương thích 100% điện thoại và máy tính bảng'
    ],
    bulletsEn: [
      'Perfect 98/100 Google Lighthouse score',
      'Smooth smart cart & intuitive categories',
      '100% responsive on mobile and tablets'
    ],
    link: '/du-an'
  },
  {
    id: 'p4',
    tag: 'B2B MARKETPLACE',
    title: 'AgriLink Sàn Nông Sản',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579596/my-website/assets/projects/screenshots/dash-01-admin-dashboard.png',
    tech: 'Fullstack • Analytics Dashboard',
    metric: 'Báo Cáo Tự Động',
    descVi: 'Sàn thương mại kết nối nông sản số lượng lớn, phân quyền tài khoản đa cấp.',
    descEn: 'B2B agricultural trading portal with multi-role access control.',
    bulletsVi: [
      'Dashboard thống kê doanh thu & biểu đồ tự động',
      'Cơ chế phân quyền Buyer / Seller / Admin rõ ràng',
      'Tìm kiếm và lọc mặt hàng theo vùng miền'
    ],
    bulletsEn: [
      'Automated sales analytics & dynamic charts',
      'Strict Buyer / Seller / Admin role guards',
      'Regional farm produce query filters'
    ],
    link: '/du-an'
  },
  {
    id: 'p5',
    tag: 'TRỢ LÝ AI CSKH 24/7',
    title: 'AI Voice & CSKH Agent Hub',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png',
    tech: 'DeepSeek LLM • SSE Streaming',
    metric: 'Tư Vấn 24/7',
    descVi: 'Trợ lý AI tự động giải đáp thắc mắc, phân loại khách hàng và dẫn dắt phễu mua hàng.',
    descEn: 'Automated AI assistant answering inquiries and guiding sales funnel.',
    bulletsVi: [
      'Truy xuất tri thức nghiệp vụ riêng biệt bằng RAG',
      'Phản hồi streaming tức thời dưới 1 giây',
      'Tự động thu thập thông tin khách tiềm năng'
    ],
    bulletsEn: [
      'Custom domain RAG knowledge retrieval',
      'Instant sub-second streaming tokens',
      'Automated qualified lead capture'
    ],
    link: '/du-an'
  },
  {
    id: 'p6',
    tag: 'HỆ THỐNG ERP QUẢN TRỊ KHO',
    title: 'Phần Mềm Quản Lý Kho & Đơn',
    image: 'https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962640/my-website/assets/projects/BakeryManagementSystem.png',
    tech: 'Java Spring • PostgreSQL Database',
    metric: 'Khớp Kho 100%',
    descVi: 'Hệ thống quản lý biến động xuất nhập tồn kho đa điểm, không lo thất thoát.',
    descEn: 'Multi-node warehouse inventory management with zero discrepancies.',
    bulletsVi: [
      'Tự động đồng bộ số lượng tồn kho theo đơn hàng',
      'Xuất hóa đơn & báo cáo đối soát nhanh gọn',
      'Mã nguồn sạch Clean Architecture bảo trì dễ dàng'
    ],
    bulletsEn: [
      'Real-time stock deduction upon orders',
      'One-click invoices & reconciliation export',
      'Maintainable Clean Architecture codebase'
    ],
    link: '/du-an'
  }
];

// CÁC GÓI DỊCH VỤ CUNG CẤP (PRICING & PACKAGES VỚI BULLETS QUYỀN LỢI CHI TIẾT)
const PACKAGE_ITEMS = [
  {
    id: 'pkg1',
    tag: 'GÓI 1 DEV',
    title: 'Gói MVP Khởi Nghiệp',
    price: '11.500.000₫',
    timeline: '~1.5 - 2 tháng',
    badge: 'Tiết Kiệm Nhất',
    descVi: 'Phù hợp cho cá nhân, shop mới mở cần ra mắt web nhanh để bán hàng.',
    descEn: 'Best for new boutiques testing the market with minimum capital.',
    bulletsVi: [
      'Thiết kế giao diện chuẩn nhận diện thương hiệu',
      'Google SEO chuẩn + Miễn phí chứng chỉ SSL',
      'Tặng cài đặt Cloud VPS & bảo hành 6 tháng'
    ],
    bulletsEn: [
      'Tailored branded UI matching your style',
      'Google SEO ready + Free SSL Certificate',
      'Free Cloud VPS setup + 6 Months Warranty'
    ],
    icon: FaRocket,
    color: '#0284c7'
  },
  {
    id: 'pkg2',
    tag: 'GÓI 2 DEVS • ĐỀ XUẤT',
    title: 'Gói MVP Tốc Hành',
    price: '18.500.000₫',
    timeline: '~1.5 tháng (2 Devs)',
    badge: 'Bán Chạy Nhất',
    descVi: '2 Kỹ sư phụ trách song song Frontend & Backend, tối ưu chất lượng và tiến độ!',
    descEn: '2 Parallel Engineers on FE & BE, ensuring swift delivery & solid code.',
    bulletsVi: [
      '2 Kỹ sư code song song Frontend & Backend',
      'Tích hợp VietQR tự động điền số tiền & khớp cọc',
      'Quản lý đơn hàng & bảo hành kỹ thuật 8 tháng'
    ],
    bulletsEn: [
      '2 Parallel Engineers code simultaneously',
      'Dynamic VietQR auto payment integration',
      'Order management & 8 Months Warranty'
    ],
    icon: FaUsers,
    color: '#16a34a'
  },
  {
    id: 'pkg3',
    tag: 'FULL SCOPE (5 DEVS)',
    title: 'Gói Chuyên Nghiệp Toàn Diện',
    price: '33.000.000₫',
    timeline: '~2 - 2.5 tháng',
    badge: 'Cao Cấp Nhất',
    descVi: 'Dành cho thương hiệu, sàn giao dịch cần thanh toán tự động và trợ lý AI thông minh.',
    descEn: 'Complete enterprise platform with automated payment, inventory and AI.',
    bulletsVi: [
      'Đầy đủ sàn TMĐT: Giỏ hàng, đơn hàng, tồn kho',
      'Tích hợp Trợ lý AI DeepSeek tư vấn 24/7',
      'Bàn giao 100% Full Source Code & bảo hành 12 tháng'
    ],
    bulletsEn: [
      'Full E-Commerce: Cart, Orders, Stock, Roles',
      'Integrated DeepSeek AI Assistant 24/7',
      '100% Full Source Code Handover + 12M Support'
    ],
    icon: FaAward,
    color: '#8b5cf6'
  },
  {
    id: 'pkg4',
    tag: 'TRỢ GIÁ KHỞI NGHIỆP',
    title: 'Bóc Tách Modular Scope',
    price: 'Giảm 20% – 30%',
    timeline: 'Theo Từng Phase',
    badge: 'Đàm Phán Linh Hoạt',
    descVi: 'Không cần mua gói cồng kềnh: chia nhỏ tính năng để chỉ trả tiền cho phần ra đơn ngay.',
    descEn: 'Split features into modular phases so you only pay for immediate sales.',
    bulletsVi: [
      'Tùy chỉnh phạm vi tính năng theo ngân sách thực tế',
      'Tiết kiệm trực tiếp 20% - 30% chi phí khởi nghiệp',
      'Nâng cấp bổ sung module dần khi shop có lãi'
    ],
    bulletsEn: [
      'Customize feature scope to your exact budget',
      'Save 20% - 30% on initial launch investment',
      'Scale additional modules as revenue grows'
    ],
    icon: FaCogs,
    color: '#f59e0b'
  },
  {
    id: 'pkg5',
    tag: 'NÂNG CẤP SAAS',
    title: 'Tích Hợp VietQR & AI Chatbot',
    price: 'Từ 4.500.000₫',
    timeline: '3 - 7 ngày',
    badge: 'Triển Khai Nhanh',
    descVi: 'Nâng cấp trang web sẵn có của bạn với cổng tự động hóa và trợ lý AI thông minh.',
    descEn: 'Upgrade your existing website with automated VietQR and AI CSKH.',
    bulletsVi: [
      'Cổng VietQR Webhook tự động 0đ phí duy trì',
      'Bot CSKH AI trả lời tin nhắn & phân luồng khách',
      'Bàn giao nhanh chóng không gián đoạn bán hàng'
    ],
    bulletsEn: [
      '0-fee automated VietQR Webhook payment',
      'AI customer support bot routing leads',
      'Swift deployment without sales downtime'
    ],
    icon: FaQrcode,
    color: '#0d9488'
  },
  {
    id: 'pkg6',
    tag: 'HỢP ĐỒNG & BẢO HÀNH',
    title: 'Cam Kết SLA & Bảo Hành',
    price: 'Bảo Hành 6 - 12 Tháng',
    timeline: 'SLA Hỗ Trợ 24/7',
    badge: 'An Tâm 100%',
    descVi: 'Hợp đồng dân sự rõ ràng, bảo vệ quyền lợi tối đa, không lo thủ tục thuế rườm rà.',
    descEn: 'Clear civil contract, guaranteed SLA and zero tax complexity.',
    bulletsVi: [
      'Hợp đồng dân sự rõ ràng, cam kết đúng deadline',
      'Khách hàng KHÔNG lo thủ tục thuế TNCN phức tạp',
      'Đội ngũ kỹ thuật hỗ trợ trực tiếp 24/7'
    ],
    bulletsEn: [
      'Clear civil contract with deadline penalties',
      'Zero tax complexity for individual clients',
      '24/7 priority direct engineering support'
    ],
    icon: FaShieldAlt,
    color: '#d97706'
  }
];

const SideStreams = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isEn = (i18n.language || 'vi').startsWith('en');
  
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const saved = localStorage.getItem('side_streams_visible');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const animFrameRef = useRef(null);

  // High-precision float positions to prevent integer rounding freeze on scaled viewports
  const leftPosRef = useRef(0);
  const rightPosRef = useRef(0);
  const isHoveredLeftRef = useRef(false);
  const isHoveredRightRef = useRef(false);

  const toggleVisibility = () => {
    const next = !isVisible;
    setIsVisible(next);
    try {
      localStorage.setItem('side_streams_visible', JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const handlePackageClick = () => {
    navigate('/dich-vu');
    setTimeout(() => {
      const el = document.getElementById('pricing-plans') || document.querySelector('.pricing-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // ROBUST 60FPS AUTO-SCROLL LOOP WITH SEAMLESS HALF-HEIGHT RESET
  useEffect(() => {
    if (!isVisible) return;

    const scrollSpeed = 0.75; // px per frame

    const step = () => {
      // 1. Auto-scroll LEFT stream (Products)
      if (!isHoveredLeftRef.current && leftTrackRef.current) {
        const el = leftTrackRef.current;
        const halfHeight = el.scrollHeight / 2;

        if (halfHeight > 50) {
          leftPosRef.current += scrollSpeed;
          if (leftPosRef.current >= halfHeight) {
            leftPosRef.current -= halfHeight;
          }
          el.scrollTop = leftPosRef.current;
        }
      }

      // 2. Auto-scroll RIGHT stream (Packages)
      if (!isHoveredRightRef.current && rightTrackRef.current) {
        const el = rightTrackRef.current;
        const halfHeight = el.scrollHeight / 2;

        if (halfHeight > 50) {
          rightPosRef.current += scrollSpeed;
          if (rightPosRef.current >= halfHeight) {
            rightPosRef.current -= halfHeight;
          }
          el.scrollTop = rightPosRef.current;
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    // Auto-resume when window loses or regains focus
    const handleWindowBlur = () => {
      isHoveredLeftRef.current = false;
      isHoveredRightRef.current = false;
    };
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isVisible]);

  // Sync position when user manually scrolls or wheels
  const handleLeftScroll = () => {
    if (leftTrackRef.current && isHoveredLeftRef.current) {
      leftPosRef.current = leftTrackRef.current.scrollTop;
      const halfHeight = leftTrackRef.current.scrollHeight / 2;
      if (halfHeight > 50) {
        if (leftPosRef.current >= halfHeight) {
          leftPosRef.current -= halfHeight;
          leftTrackRef.current.scrollTop = leftPosRef.current;
        } else if (leftPosRef.current <= 0) {
          leftPosRef.current += halfHeight;
          leftTrackRef.current.scrollTop = leftPosRef.current;
        }
      }
    }
  };

  const handleRightScroll = () => {
    if (rightTrackRef.current && isHoveredRightRef.current) {
      rightPosRef.current = rightTrackRef.current.scrollTop;
      const halfHeight = rightTrackRef.current.scrollHeight / 2;
      if (halfHeight > 50) {
        if (rightPosRef.current >= halfHeight) {
          rightPosRef.current -= halfHeight;
          rightTrackRef.current.scrollTop = rightPosRef.current;
        } else if (rightPosRef.current <= 0) {
          rightPosRef.current += halfHeight;
          rightTrackRef.current.scrollTop = rightPosRef.current;
        }
      }
    }
  };

  // Click arrow controls to scroll smoothly
  const scrollLeftBy = (amount) => {
    if (leftTrackRef.current) {
      leftPosRef.current += amount;
      const halfHeight = leftTrackRef.current.scrollHeight / 2;
      if (halfHeight > 50 && leftPosRef.current >= halfHeight) {
        leftPosRef.current -= halfHeight;
      } else if (halfHeight > 50 && leftPosRef.current < 0) {
        leftPosRef.current += halfHeight;
      }
      leftTrackRef.current.scrollTo({ top: leftPosRef.current, behavior: 'smooth' });
    }
  };

  const scrollRightBy = (amount) => {
    if (rightTrackRef.current) {
      rightPosRef.current += amount;
      const halfHeight = rightTrackRef.current.scrollHeight / 2;
      if (halfHeight > 50 && rightPosRef.current >= halfHeight) {
        rightPosRef.current -= halfHeight;
      } else if (halfHeight > 50 && rightPosRef.current < 0) {
        rightPosRef.current += halfHeight;
      }
      rightTrackRef.current.scrollTo({ top: rightPosRef.current, behavior: 'smooth' });
    }
  };

  const onMouseEnterLeft = () => {
    isHoveredLeftRef.current = true;
  };
  const onMouseLeaveLeft = () => {
    isHoveredLeftRef.current = false;
    if (leftTrackRef.current) {
      leftPosRef.current = leftTrackRef.current.scrollTop;
    }
  };

  const onMouseEnterRight = () => {
    isHoveredRightRef.current = true;
  };
  const onMouseLeaveRight = () => {
    isHoveredRightRef.current = false;
    if (rightTrackRef.current) {
      rightPosRef.current = rightTrackRef.current.scrollTop;
    }
  };

  // Duplicate items for seamless continuous looping
  const duplicatedProducts = [...PRODUCT_ITEMS, ...PRODUCT_ITEMS];
  const duplicatedPackages = [...PACKAGE_ITEMS, ...PACKAGE_ITEMS];

  return (
    <>
      {/* TOGGLE BUTTON FIXED BOTTOM RIGHT */}
      <button 
        className="side-streams-toggle" 
        onClick={toggleVisibility}
        title={isVisible ? (isEn ? "Hide side streams" : "Ẩn 2 dải banner hai bên") : (isEn ? "Show side streams" : "Hiện 2 dải banner hai bên")}
        aria-label="Toggle Side Streams"
      >
        {isVisible ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
        <span>{isVisible ? (isEn ? "Hide Feeds" : "Ẩn Banner") : (isEn ? "Show Feeds" : "Hiện Banner")}</span>
      </button>

      {isVisible && (
        <div className="side-streams-container" aria-hidden="true">
          {/* CỘT TRÁI: SẢN PHẨM CODE THỰC TẾ (CÓ ẢNH PREVIEW & BULLETS) */}
          <aside className="side-stream left-stream">
            <div className="stream-header">
              <div className="header-info">
                <span className="live-dot pulse-blue" />
                <span className="stream-title">{isEn ? "REAL CODE PRODUCTS" : "SẢN PHẨM CODE THỰC TẾ"}</span>
              </div>
              <div className="scroll-controls">
                <button 
                  onClick={() => scrollLeftBy(-260)} 
                  className="btn-arrow-nav"
                  title={isEn ? "Scroll up" : "Cuộn lên"}
                  aria-label="Scroll products up"
                >
                  <FaChevronUp size={10} />
                </button>
                <button 
                  onClick={() => scrollLeftBy(260)} 
                  className="btn-arrow-nav"
                  title={isEn ? "Scroll down" : "Cuộn xuống"}
                  aria-label="Scroll products down"
                >
                  <FaChevronDown size={10} />
                </button>
              </div>
            </div>

            <div className="scroll-hint-bar">
              <span>{isEn ? "Scroll freely to explore products" : "Tự do lăn chuột để xem các sản phẩm"}</span>
            </div>

            <div 
              className="stream-track-wrap interactive-scroll"
              ref={leftTrackRef}
              onMouseEnter={onMouseEnterLeft}
              onMouseLeave={onMouseLeaveLeft}
              onScroll={handleLeftScroll}
            >
              <div className="stream-track">
                {duplicatedProducts.map((item, index) => (
                  <Link 
                    to={item.link} 
                    key={`${item.id}-${index}`} 
                    className="stream-card product-preview-card"
                  >
                    <div className="preview-image-box">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        loading="lazy" 
                        className="preview-img"
                      />
                      <span className="metric-chip">{item.metric}</span>
                    </div>

                    <div className="card-info">
                      <div className="card-tag-row">
                        <span className="card-tag">{item.tag}</span>
                      </div>
                      <h4 className="card-title">{item.title}</h4>
                      <div className="tech-badge">{item.tech}</div>
                      
                      <p className="card-desc">
                        {isEn ? item.descEn : item.descVi}
                      </p>

                      <ul className="card-feature-bullets">
                        {(isEn ? item.bulletsEn : item.bulletsVi).map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <FaCheck className="bullet-icon" size={9} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="card-action-btn">
                        <span>{isEn ? "Explore Project" : "Khám Phá Chi Tiết"}</span>
                        <FaArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* CỘT PHẢI: CÁC GÓI DỊCH VỤ CUNG CẤP (PRICING & PACKAGES) */}
          <aside className="side-stream right-stream">
            <div className="stream-header">
              <div className="header-info">
                <span className="live-dot pulse-green" />
                <span className="stream-title">{isEn ? "SERVICE PACKAGES" : "CÁC GÓI DỊCH VỤ"}</span>
              </div>
              <div className="scroll-controls">
                <button 
                  onClick={() => scrollRightBy(-260)} 
                  className="btn-arrow-nav"
                  title={isEn ? "Scroll up" : "Cuộn lên"}
                  aria-label="Scroll packages up"
                >
                  <FaChevronUp size={10} />
                </button>
                <button 
                  onClick={() => scrollRightBy(260)} 
                  className="btn-arrow-nav"
                  title={isEn ? "Scroll down" : "Cuộn xuống"}
                  aria-label="Scroll packages down"
                >
                  <FaChevronDown size={10} />
                </button>
              </div>
            </div>

            <div className="scroll-hint-bar">
              <span>{isEn ? "Scroll freely to explore pricing" : "Tự do lăn chuột để xem các gói dịch vụ"}</span>
            </div>

            <div 
              className="stream-track-wrap interactive-scroll"
              ref={rightTrackRef}
              onMouseEnter={onMouseEnterRight}
              onMouseLeave={onMouseLeaveRight}
              onScroll={handleRightScroll}
            >
              <div className="stream-track">
                {duplicatedPackages.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={`${item.id}-${index}`} 
                      className="stream-card package-card"
                      onClick={handlePackageClick}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="card-top-row">
                        <span className="card-tag">{item.tag}</span>
                        <span className="badge-chip">{item.badge}</span>
                      </div>

                      <div className="package-headline">
                        <div className="icon-wrap" style={{ color: item.color }}>
                          <Icon size={14} />
                        </div>
                        <h4 className="package-title">{item.title}</h4>
                      </div>

                      <div className="price-box">
                        <div className="price-tag" style={{ color: item.color }}>
                          {item.price}
                        </div>
                        <div className="timeline-tag">
                          <FaClock size={10} />
                          <span>{item.timeline}</span>
                        </div>
                      </div>

                      <p className="card-desc">
                        {isEn ? item.descEn : item.descVi}
                      </p>

                      <ul className="card-feature-bullets">
                        {(isEn ? item.bulletsEn : item.bulletsVi).map((bullet, bIdx) => (
                          <li key={bIdx}>
                            <FaCheck className="bullet-icon success" size={9} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="card-action-btn is-service">
                        <span>{isEn ? "View Pricing & Terms" : "Xem Báo Giá & Quy Trình"}</span>
                        <FaArrowRight size={10} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default SideStreams;
