import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaTrophy, FaUsers, FaArrowUp } from 'react-icons/fa';
import { useCustomTheme } from '../../contexts/ThemeContext';

const SUBNAV_SECTIONS = [
  { id: 'education', labelKey: 'nav.education', icon: FaGraduationCap, labelVi: 'Học vấn', labelEn: 'Education' },
  { id: 'certificates', labelKey: 'nav.certificates', icon: FaCertificate, labelVi: 'Chứng chỉ', labelEn: 'Certificates' },
  { id: 'prizes', labelKey: 'nav.prizes', icon: FaTrophy, labelVi: 'Giải thưởng', labelEn: 'Prizes' },
  { id: 'activities', labelKey: 'nav.activities', icon: FaUsers, labelVi: 'Hoạt động', labelEn: 'Activities' },
];

export const AchievementsSubnav = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useCustomTheme();
  const isEn = (i18n.language || 'vi').startsWith('en');
  const [activeSection, setActiveSection] = useState('education');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  // Robust Scrollspy: Theo dõi vị trí thực tế bằng getBoundingClientRect()
  useEffect(() => {
    const handleScroll = () => {
      // Toggle nút lên đầu trang
      setShowScrollTop(window.scrollY > 400);

      // Nếu đang trong quá trình animation click cuộn thì không ghi đè
      if (isClickScrollingRef.current) return;

      // Quét các section từ dưới lên để tìm section đang hiển thị trên viewport
      for (let i = SUBNAV_SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = SUBNAV_SECTIONS[i].id;
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Nếu đỉnh section đã chạm hoặc vượt qua vùng nhìn (khoảng 220px từ mép trên)
          if (rect.top <= 240) {
            setActiveSection(sectionId);
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
      if (e.detail && SUBNAV_SECTIONS.some(s => s.id === e.detail)) {
        setActiveSection(e.detail);
      }
    };
    window.addEventListener('subnav-change', handleSubnavEvent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('subnav-change', handleSubnavEvent);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Sync hash khi mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && SUBNAV_SECTIONS.some(s => s.id === hash)) {
      setActiveSection(hash);
    }
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -140 });
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 140;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.history.replaceState(null, '', window.location.pathname);
    setActiveSection('education');
  };

  const activeBg = isDarkMode ? '#ffffff' : '#000000';
  const activeText = isDarkMode ? '#000000' : '#ffffff';

  return (
    <nav
      aria-label="Achievements Sub Navigation"
      style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        right: 0,
        zIndex: 42,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '5px',
          borderRadius: '9999px',
          backgroundColor: isDarkMode ? 'rgba(18, 18, 22, 0.88)' : 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDarkMode ? '0 10px 32px rgba(0, 0, 0, 0.6)' : '0 8px 30px rgba(0, 0, 0, 0.08)',
          maxWidth: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {SUBNAV_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          const label = isEn ? sec.labelEn : sec.labelVi;

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: 'transparent',
                color: isActive ? activeText : 'var(--color-ink-soft)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'color 0.18s ease',
                whiteSpace: 'nowrap',
                outline: 'none',
                zIndex: 1,
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
                  layoutId="activeSubnavCapsule"
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
              <span>{t(sec.labelKey, label)}</span>
            </button>
          );
        })}

        {/* Nút nhỏ quay lại đầu trang tiện lợi khi đang ở sâu bên dưới */}
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

export default AchievementsSubnav;
