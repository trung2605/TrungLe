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
  { id: 'case-study', icon: FaRocket, labelVi: 'Dự án thực tế', labelEn: 'Case Study', targetId: 'case-study' },
  { id: 'saas', icon: FaCogs, labelVi: 'Tính năng SaaS', labelEn: 'SaaS Features', targetId: 'saas' },
  { id: 'team', icon: FaUsers, labelVi: 'Đội ngũ Dev', labelEn: 'Team 5 Devs', targetId: 'team-section' },
  { id: 'pricing', icon: FaReceipt, labelVi: 'Bảng giá', labelEn: 'Pricing', targetId: 'pricing-section' },
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

  const activeBg = isDarkMode ? '#ffffff' : '#000000';
  const activeText = isDarkMode ? '#000000' : '#ffffff';

  return (
    <nav
      aria-label="Services Sub Navigation"
      style={{
        position: 'fixed',
        top: '68px',
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
          gap: '4px',
          padding: '4px 6px',
          borderRadius: '9999px',
          backgroundColor: isDarkMode ? 'rgba(18, 18, 22, 0.88)' : 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDarkMode ? '0 10px 32px rgba(0, 0, 0, 0.6)' : '0 8px 30px rgba(0, 0, 0, 0.08)',
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
                padding: '7px 13px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: 'transparent',
                color: isActive ? activeText : 'var(--color-ink-soft)',
                fontSize: '12.5px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'color 0.18s ease',
                whiteSpace: 'nowrap',
                outline: 'none',
                zIndex: 1,
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.color = 'var(--color-ink-soft)';
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeServicesSubnavCapsule"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9999px',
                    backgroundColor: activeBg,
                    zIndex: -1,
                    boxShadow: isDarkMode ? '0 2px 12px rgba(255, 255, 255, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.22)',
                  }}
                />
              )}
              <Icon size={13} style={{ color: isActive ? activeText : 'currentColor' }} />
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
