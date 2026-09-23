import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown, FaBriefcase, FaDownload } from "react-icons/fa";
import { personalInfo } from "../../data";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useTranslatedData } from "../../hooks/useTranslatedData";

const ACHIEVEMENT_SUBTABS = [
  { tab: 'education', labelKey: 'nav.education', path: '/achievements#education' },
  { tab: 'certificates', labelKey: 'nav.certificates', path: '/achievements#certificates' },
  { tab: 'prizes', labelKey: 'nav.prizes', path: '/achievements#prizes' },
  { tab: 'activities', labelKey: 'nav.activities', path: '/achievements#activities' },
];

const SERVICES_SUBTABS = [
  { tab: 'case-study', labelVi: 'Dự án thực tế (Biensovip)', labelEn: 'Flagship Case Study', path: '/dich-vu#case-study' },
  { tab: 'saas', labelVi: 'Tự động hóa SaaS (VietQR & AI)', labelEn: 'SaaS Features', path: '/dich-vu#saas' },
  { tab: 'team-section', labelVi: 'Đội ngũ 05 Kỹ sư FPT', labelEn: 'Team 5 Devs', path: '/dich-vu#team-section' },
  { tab: 'pricing-section', labelVi: 'Bảng giá minh bạch (-50%)', labelEn: 'Transparent Pricing', path: '/dich-vu#pricing-section' },
  { tab: 'process-section', labelVi: 'Quy trình 5 bước chuẩn mực', labelEn: '5-Step Work Process', path: '/dich-vu#process-section' },
];

const Navigation = ({ onOpenRecruiterMatch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [achievementsHover, setAchievementsHover] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { t, i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');
  const { siteNavigation } = useTranslatedData();

  const navItemsRef = useRef({});
  const hasMountedRef = useRef(false);
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const activeNavIndex = siteNavigation.findIndex((item) => {
    return (
      location.pathname === item.path ||
      (item.path !== '/' && location.pathname.startsWith(item.path)) ||
      (item.path === '/achievements' && (location.pathname === '/achievements' || location.pathname === '/activities'))
    );
  });

  useEffect(() => {
    if (activeNavIndex !== -1 && navItemsRef.current[activeNavIndex]) {
      const el = navItemsRef.current[activeNavIndex];
      setIndicator({
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
        opacity: 1,
      });
      hasMountedRef.current = true;
    } else {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname, searchParams, activeNavIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (activeNavIndex !== -1 && navItemsRef.current[activeNavIndex]) {
        const el = navItemsRef.current[activeNavIndex];
        setIndicator({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
          opacity: 1,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeNavIndex]);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubtabClick = (e, path) => {
    setIsMenuOpen(false);
    setAchievementsHover(false);
    if (location.pathname === '/achievements') {
      const hash = path.split('#')[1];
      if (hash) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -140 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          window.history.replaceState(null, '', `#${hash}`);
        }
      }
    }
  };

  const handleServicesSubtabClick = (e, path) => {
    setIsMenuOpen(false);
    setServicesHover(false);
    if (location.pathname === '/dich-vu') {
      const hash = path.split('#')[1];
      if (hash) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -160 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 160;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          window.history.replaceState(null, '', `#${hash}`);
          window.dispatchEvent(new CustomEvent('services-subnav-change', { detail: hash }));
        }
      }
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          maxWidth: '1220px',
          width: '100%',
          height: '52px',
          padding: '0 8px 0 14px',
          borderRadius: '9999px',
          backgroundColor: isDarkMode ? 'rgba(16, 16, 20, 0.82)' : 'rgba(255, 255, 255, 0.84)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: isDarkMode
            ? (isScrolled ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(255, 255, 255, 0.08)')
            : (isScrolled ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(0, 0, 0, 0.07)'),
          boxShadow: isDarkMode
            ? (isScrolled ? '0 16px 40px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)' : '0 8px 24px -4px rgba(0, 0, 0, 0.4)')
            : (isScrolled ? '0 14px 36px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.04)' : '0 6px 20px -4px rgba(0, 0, 0, 0.05)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          position: 'relative',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLinkClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #1e1e2f 0%, #0a0a14 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12.5px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            LT
          </div>
          <span
            style={{
              fontSize: '14.5px',
              fontWeight: '550',
              color: 'var(--color-ink)',
              letterSpacing: '-0.2px',
              whiteSpace: 'nowrap',
            }}
            className="hidden sm:inline-block"
          >
            {personalInfo.name}
          </span>
        </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:flex"
            style={{ position: 'relative', alignItems: 'center', gap: '4px' }}
          >
            {/* Sliding black pill indicator */}
            <motion.div
              initial={false}
              animate={{
                x: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
              transition={
                hasMountedRef.current
                  ? { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }
                  : { duration: 0 }
              }
              style={{
                position: 'absolute',
                left: 0,
                top: indicator.top || 0,
                height: indicator.height || '34px',
                backgroundColor: isDarkMode ? '#ffffff' : '#000000',
                borderRadius: '50px',
                boxShadow: isDarkMode ? '0 2px 10px rgba(255, 255, 255, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.22)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {siteNavigation.map((item, index) => {
              const isActive = index === activeNavIndex;
              const activeBg = isDarkMode ? '#ffffff' : '#000000';
              const activeText = isDarkMode ? '#000000' : '#ffffff';

              if (item.path === '/achievements') {
                return (
                  <div
                    key={item.path}
                    ref={(el) => { navItemsRef.current[index] = el; }}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setAchievementsHover(true)}
                    onMouseLeave={() => setAchievementsHover(false)}
                  >
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 14px',
                        borderRadius: '50px',
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '480',
                        color: isActive ? activeText : 'var(--color-ink-soft)',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.18s ease',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.color = 'var(--color-ink)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.color = 'var(--color-ink-soft)';
                      }}
                    >
                      <span>{item.title}</span>
                      <FaChevronDown
                        size={9}
                        style={{
                          color: isActive ? activeText : 'currentColor',
                          transition: 'transform 0.15s ease, color 0.18s ease',
                          transform: achievementsHover ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    </Link>

                    <AnimatePresence>
                      {achievementsHover && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: 0,
                            minWidth: '180px',
                            backgroundColor: isDarkMode ? 'rgba(20, 22, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--color-hairline)',
                            borderRadius: '14px',
                            padding: '6px',
                            boxShadow: isDarkMode ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(15,23,42,0.1)',
                            zIndex: 60,
                          }}
                        >
                          {ACHIEVEMENT_SUBTABS.map((sub) => {
                            const subActive = location.pathname === '/achievements' && location.hash === `#${sub.tab}`;
                            return (
                              <Link
                                key={sub.tab}
                                to={sub.path}
                                onClick={(e) => handleSubtabClick(e, sub.path)}
                                style={{
                                  display: 'block',
                                  padding: '9px 14px',
                                  borderRadius: '9px',
                                  fontSize: '14px',
                                  fontWeight: subActive ? '600' : '400',
                                  color: subActive ? activeText : 'var(--color-ink-soft)',
                                  backgroundColor: subActive ? activeBg : 'transparent',
                                  textDecoration: 'none',
                                  transition: 'all 0.15s ease',
                                }}
                                onMouseEnter={e => { if (!subActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; }}
                                onMouseLeave={e => { if (!subActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                              >
                                {t(sub.labelKey)}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.path === '/dich-vu') {
                return (
                  <div
                    key={item.path}
                    ref={(el) => { navItemsRef.current[index] = el; }}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setServicesHover(true)}
                    onMouseLeave={() => setServicesHover(false)}
                  >
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 14px',
                        borderRadius: '50px',
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '480',
                        color: isActive ? activeText : 'var(--color-ink-soft)',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.18s ease',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.color = 'var(--color-ink)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.color = 'var(--color-ink-soft)';
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        {item.title}
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '700',
                          color: '#ffffff',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          letterSpacing: '0.4px',
                          lineHeight: '1.2',
                          textTransform: 'uppercase'
                        }}>HOT</span>
                      </span>
                      <FaChevronDown
                        size={9}
                        style={{
                          color: isActive ? activeText : 'currentColor',
                          transition: 'transform 0.15s ease, color 0.18s ease',
                          transform: servicesHover ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    </Link>

                    <AnimatePresence>
                      {servicesHover && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: 0,
                            minWidth: '220px',
                            backgroundColor: isDarkMode ? 'rgba(20, 22, 31, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--color-hairline)',
                            borderRadius: '14px',
                            padding: '6px',
                            boxShadow: isDarkMode ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(15,23,42,0.1)',
                            zIndex: 60,
                          }}
                        >
                          {SERVICES_SUBTABS.map((sub) => {
                            const subActive = location.pathname === '/dich-vu' && location.hash === `#${sub.tab}`;
                            return (
                              <Link
                                key={sub.tab}
                                to={sub.path}
                                onClick={(e) => handleServicesSubtabClick(e, sub.path)}
                                style={{
                                  display: 'block',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '13px',
                                  fontWeight: subActive ? '600' : '480',
                                  color: subActive ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                                  backgroundColor: subActive
                                    ? (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')
                                    : 'transparent',
                                  textDecoration: 'none',
                                  transition: 'background-color 0.15s ease, color 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (!subActive) {
                                    e.currentTarget.style.backgroundColor = isDarkMode
                                      ? 'rgba(255,255,255,0.05)'
                                      : 'rgba(0,0,0,0.03)';
                                    e.currentTarget.style.color = 'var(--color-ink)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!subActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--color-ink-soft)';
                                  }
                                }}
                              >
                                {isEn ? sub.labelEn : sub.labelVi}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div
                  key={item.path}
                  ref={(el) => { navItemsRef.current[index] = el; }}
                >
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'block',
                      padding: '6px 14px',
                      borderRadius: '50px',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '480',
                      color: isActive ? activeText : 'var(--color-ink-soft)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.18s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-ink)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-ink-soft)';
                    }}
                  >
                    <span>{item.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right actions cluster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? t('nav.switchToLight') : t('nav.switchToDark')}
              className="hover-surface"
              style={{
                width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-hairline)',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDarkMode ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {isDarkMode ? <FaSun size={13} /> : <FaMoon size={13} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Language toggle — sliding switch */}
            <button
              onClick={toggleLang}
              data-testid="lang-toggle"
              style={{
                position: 'relative',
                width: '58px',
                height: '30px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-surface-soft)',
                border: '1px solid var(--color-hairline)',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                overflow: 'hidden',
              }}
              aria-label={t('nav.toggleLanguage')}
            >
              {/* Labels */}
              <span style={{
                position: 'absolute', left: '7px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700',
                letterSpacing: '0.4px',
                color: i18n.language === 'en' ? 'var(--color-canvas)' : 'var(--color-ink-soft)',
                transition: 'color 0.2s ease', userSelect: 'none', zIndex: 3,
              }}>EN</span>
              <span style={{
                position: 'absolute', right: '7px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700',
                letterSpacing: '0.4px',
                color: i18n.language === 'vi' ? 'var(--color-canvas)' : 'var(--color-ink-soft)',
                transition: 'color 0.2s ease', userSelect: 'none', zIndex: 3,
              }}>VI</span>
              {/* Thumb */}
              <motion.div
                animate={{ x: i18n.language === 'en' ? 3 : 29 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                style={{
                  position: 'absolute',
                  top: '3px',
                  width: '24px',
                  height: '22px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-ink)',
                  zIndex: 2,
                }}
              />
            </button>

            {/* For Recruiters */}
            <button
              onClick={onOpenRecruiterMatch}
              className="hidden lg:inline-flex hover-surface"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 14px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: 'var(--color-ink)',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-hairline)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              <FaBriefcase size={12} style={{ opacity: 0.85 }} />
              <span>{t('nav.forRecruiters')}</span>
            </button>

            {/* Download CV - Primary CTA */}
            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              className="hidden lg:inline-flex"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: '500',
                color: 'var(--color-canvas)',
                backgroundColor: 'var(--color-ink)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.88';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaDownload size={11} />
              <span>{t('nav.downloadCV')}</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              data-testid="mobile-menu-toggle"
              style={{
                width: '40px',
                height: '40px',
                padding: '10px 9px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={t('nav.toggleMenu')}
            >
              <div style={{ width: '22px', height: '18px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: 'var(--color-ink)',
                  transition: 'all 0.25s ease',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }} />
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: 'var(--color-ink)',
                  transition: 'all 0.25s ease',
                  opacity: isMenuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: 'var(--color-ink)',
                  transition: 'all 0.25s ease',
                  transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                }} />
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown Card */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                data-testid="mobile-menu"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  maxHeight: 'calc(100vh - 84px)',
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  backgroundColor: isDarkMode ? 'rgba(18, 18, 22, 0.96)' : 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '24px',
                  padding: '16px 20px 20px',
                  boxShadow: isDarkMode ? '0 20px 48px rgba(0, 0, 0, 0.7)' : '0 20px 48px rgba(0, 0, 0, 0.14)',
                  zIndex: 60,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                  {siteNavigation.map((item) => {
                    const isActive = 
                      location.pathname === item.path || 
                      (item.path !== '/' && location.pathname.startsWith(item.path)) ||
                      (item.path === '/achievements' && (location.pathname === '/achievements' || location.pathname === '/activities'));
                    const activeBg = isDarkMode ? '#ffffff' : '#000000';
                    const activeText = isDarkMode ? '#000000' : '#ffffff';

                    return (
                      <div key={item.path}>
                        <Link
                          to={item.path}
                          onClick={handleLinkClick}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '12px',
                            fontSize: '15px',
                            fontWeight: isActive ? '600' : '450',
                            color: isActive ? activeText : 'var(--color-ink)',
                            textDecoration: 'none',
                            backgroundColor: isActive ? activeBg : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span style={{ opacity: isActive ? 1 : 0.7, color: isActive ? activeText : 'inherit' }}>{item.icon}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            {item.title}
                            {item.path === '/dich-vu' && (
                              <span style={{
                                fontSize: '9px',
                                fontWeight: '700',
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                padding: '1px 5px',
                                borderRadius: '4px',
                                letterSpacing: '0.4px',
                                lineHeight: '1.2',
                                textTransform: 'uppercase'
                              }}>HOT</span>
                            )}
                          </span>
                        </Link>
                        {item.path === '/achievements' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '32px', marginTop: '4px' }}>
                            {ACHIEVEMENT_SUBTABS.map((sub) => {
                              const subActive = location.pathname === '/achievements' && location.hash === `#${sub.tab}`;
                              return (
                                <Link
                                  key={sub.tab}
                                  to={sub.path}
                                  onClick={(e) => handleSubtabClick(e, sub.path)}
                                  style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: subActive ? '600' : '400',
                                    color: subActive ? activeText : 'var(--color-ink-soft)',
                                    textDecoration: 'none',
                                    backgroundColor: subActive ? activeBg : 'transparent',
                                    transition: 'all 0.15s ease',
                                  }}
                                >
                                  {t(sub.labelKey)}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {item.path === '/dich-vu' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '32px', marginTop: '4px' }}>
                            {SERVICES_SUBTABS.map((sub) => {
                              const subActive = location.pathname === '/dich-vu' && location.hash === `#${sub.tab}`;
                              return (
                                <Link
                                  key={sub.tab}
                                  to={sub.path}
                                  onClick={(e) => handleServicesSubtabClick(e, sub.path)}
                                  style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: subActive ? '600' : '400',
                                    color: subActive ? activeText : 'var(--color-ink-soft)',
                                    textDecoration: 'none',
                                    backgroundColor: subActive ? activeBg : 'transparent',
                                    transition: 'all 0.15s ease',
                                  }}
                                >
                                  {isEn ? sub.labelEn : sub.labelVi}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a
                    href={personalInfo.cv}
                    download="Le_Tri_Trung_CV.pdf"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '11px 20px',
                      borderRadius: '50px',
                      fontSize: '14.5px',
                      fontWeight: '520',
                      color: 'var(--color-ink)',
                      backgroundColor: 'var(--color-surface-soft)',
                      border: '1px solid var(--color-hairline)',
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    <FaDownload size={12} />
                    {t('nav.downloadCV')}
                  </a>
                  <Link
                    to="/projects"
                    onClick={handleLinkClick}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '11px 20px',
                      borderRadius: '50px',
                      fontSize: '14.5px',
                      fontWeight: '520',
                      color: 'var(--color-canvas)',
                      backgroundColor: 'var(--color-ink)',
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    {t('nav.viewProjects')}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    );
  };

export default Navigation;
