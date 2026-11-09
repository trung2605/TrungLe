import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaBolt, 
  FaRocket, 
  FaCogs, 
  FaUsers, 
  FaReceipt, 
  FaCheckCircle, 
  FaArrowUp 
} from 'react-icons/fa';
import { useCustomTheme } from '../../contexts/ThemeContext';

const SERVICES_SUBNAV_SECTIONS = [
  { id: 'overview', icon: FaBolt, labelVi: 'Tổng quan', labelEn: 'Overview', targetId: 'overview' },
  { id: 'case-study', icon: FaRocket, labelVi: 'Dự án Flagship', labelEn: 'Flagships', targetId: 'case-study' },
  { id: 'saas', icon: FaCogs, labelVi: '13 Module SaaS', labelEn: '13 SaaS Modules', targetId: 'saas' },
  { id: 'team', icon: FaUsers, labelVi: 'Kỹ sư Cốt lõi', labelEn: 'Core Bench', targetId: 'team-section' },
  { id: 'pricing', icon: FaReceipt, labelVi: 'Báo giá & Ký quỹ', labelEn: 'Pricing & Escrow', targetId: 'pricing-section' },
  { id: 'process', icon: FaCheckCircle, labelVi: 'Quy trình', labelEn: 'Process', targetId: 'process-section' },
];

export const ServicesSubnav = () => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useCustomTheme();
  const isEn = (i18n.language || 'vi').startsWith('en');
  const [activeSection, setActiveSection] = useState('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Robust Scrollspy: Theo dõi vị trí thực tế bằng getBoundingClientRect()
  useEffect(() => {
    const handleScroll = () => {
      // Toggle nút lên đầu trang
      setShowScrollTop(window.scrollY > 400);

      // Nếu đang trong quá trình click cuộn mượt thì tạm không ghi đè
      if (isClickScrollingRef.current) return;

      // Nếu ở sát đỉnh trang (< 200px) thì luôn active Tổng quan
      if (window.scrollY < 200) {
        setActiveSection('overview');
        return;
      }

      // Quét các section từ dưới lên để tìm section đang hiển thị trên viewport
      for (let i = SERVICES_SUBNAV_SECTIONS.length - 1; i >= 0; i--) {
        const item = SERVICES_SUBNAV_SECTIONS[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Nếu đỉnh section đã chạm hoặc vượt qua mốc nhìn (khoảng 240px từ mép trên)
          if (rect.top <= 240) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    handleScroll();

    // Lắng nghe sự kiện click từ Navigation dropdown menu
    const handleSubnavEvent = (e) => {
      if (e.detail) {
        const match = SERVICES_SUBNAV_SECTIONS.find(s => s.id === e.detail || s.targetId === e.detail);
        if (match) {
          setActiveSection(match.id);
        }
      }
    };
    window.addEventListener('services-subnav-change', handleSubnavEvent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('services-subnav-change', handleSubnavEvent);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Sync hash khi mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = SERVICES_SUBNAV_SECTIONS.find(s => s.id === hash || s.targetId === hash);
      if (match) {
        setActiveSection(match.id);
      }
    }
  }, []);

  const scrollToSection = (sec) => {
    setActiveSection(sec.id);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (sec.id === 'overview') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    const element = document.getElementById(sec.targetId);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -160 });
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 160;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      window.history.replaceState(null, '', `#${sec.targetId}`);
    }
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.history.replaceState(null, '', window.location.pathname);
    setActiveSection('overview');
  };

  const activeBg = '#F5C242';
  const activeText = '#18181B';

  return (
    <nav
      aria-label="Services Sub Navigation"
      style={{
        position: 'fixed',
        top: '58px',
        left: 0,
        right: 0,
        zIndex: 42,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 12px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 8px',
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#222227' : '#FAF8F3',
          border: '2px solid #18181B',
          boxShadow: '4px 4px 0px #18181B',
          maxWidth: 'calc(100vw - 24px)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {SERVICES_SUBNAV_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          const label = isEn ? sec.labelEn : sec.labelVi;

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '5px',
                border: isActive ? '1.5px solid #18181B' : '1.5px solid transparent',
                backgroundColor: 'transparent',
                color: isActive ? activeText : 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'color 0.18s ease',
                whiteSpace: 'nowrap',
                outline: 'none',
                zIndex: 1,
                flexShrink: 0,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeServicesSubnavCapsule"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '4px',
                    background: activeBg,
                    zIndex: -1,
                    boxShadow: '2px 2px 0px #18181B',
                  }}
                />
              )}
              <Icon size={12} style={{ color: isActive ? activeText : 'currentColor' }} />
              <span>{label}</span>
            </button>
          );
        })}

        {/* Nút nhỏ quay lại đầu trang tiện lợi */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title={isEn ? "Scroll to top" : "Lên đầu trang"}
            aria-label="Scroll to top"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '4px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaArrowUp size={11} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default ServicesSubnav;
