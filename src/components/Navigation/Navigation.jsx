import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown, FaBriefcase, FaDownload, FaHeart } from "react-icons/fa";
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
  { tab: 'case-study', labelVi: 'Dự án SynapForge (Biensovip)', labelEn: 'SynapForge Flagships', path: '/dich-vu#case-study' },
  { tab: 'saas', labelVi: '13 Module Tự động hóa SaaS', labelEn: '13 SaaS Modules', path: '/dich-vu#saas' },
  { tab: 'team-section', labelVi: 'Đội ngũ Kỹ sư Cốt lõi FPT', labelEn: 'SynapForge Core Bench', path: '/dich-vu#team-section' },
  { tab: 'pricing-section', labelVi: 'Bảng giá & Ký quỹ 40/60', labelEn: 'Pricing & 40/60 Escrow', path: '/dich-vu#pricing-section' },
  { tab: 'process-section', labelVi: 'Quy trình Kỹ nghệ 5 bước', labelEn: '5-Step Forge Process', path: '/dich-vu#process-section' },
];

const NAV_ICON_PREFIX = {
  '/': '★',
  '/about': '♟',
  '/projects': '❖',
  '/achievements': '✦',
  '/dich-vu': '⚡',
  '/blog': '✎',
  '/resume': '▤',
  '/contact': '♥',
};

const Navigation = ({ onOpenRecruiterMatch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [achievementsHover, setAchievementsHover] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { t, i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');
  const { siteNavigation } = useTranslatedData();

  const activeNavIndex = siteNavigation.findIndex((item) => {
    return (
      location.pathname === item.path ||
      (item.path !== '/' && location.pathname.startsWith(item.path)) ||
      (item.path === '/achievements' && (location.pathname === '/achievements' || location.pathname === '/activities'))
    );
  });

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
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
            window.__lenis.scrollTo(el, { offset: -120 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
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
            window.__lenis.scrollTo(el, { offset: -140 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          window.history.replaceState(null, '', `#${hash}`);
          window.dispatchEvent(new CustomEvent('services-subnav-change', { detail: hash }));
        }
      }
    }
  };

  // Filter out /contact from left nav strip since it appears as the right-side boxed ♥ CONTACT CTA (just like Robin reference)
  const mainNavItems = siteNavigation.filter(item => item.path !== '/contact');

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 55,
        width: '100%',
        height: '54px',
        backgroundColor: isDarkMode ? '#181A24' : '#FFFFFF',
        borderBottom: '1.5px solid var(--color-border-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        transition: 'background-color 0.2s ease',
      }}
    >
      {/* Mobile Menu Backdrop Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 51,
            }}
          />
        )}
      </AnimatePresence>

      {/* Left Cluster: Pink Target Badge + Full-Height Flush Tab Items */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '0px' }}>
        {/* Pink Circular Target Icon (Robin top-left mark) */}
        <Link
          to="/"
          onClick={handleLinkClick}
          title={personalInfo.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingRight: '14px',
            height: '100%',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '9999px',
              backgroundColor: '#FCE7F3',
              border: '2px solid #EC4899',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '1px 1px 0px #18181B',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '9999px',
                border: '2px solid #EC4899',
                backgroundColor: '#EC4899',
              }}
            />
          </span>
          <span
            className="inline-block lg:hidden"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--color-ink)',
              letterSpacing: '0.03em',
            }}
          >
            TRUNG LÊ
          </span>
        </Link>

        {/* Desktop Full-Height Flush Navigation Links */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: 'stretch', height: '100%' }}
        >
          {mainNavItems.map((item) => {
            const origIndex = siteNavigation.findIndex(n => n.path === item.path);
            const isActive = origIndex === activeNavIndex;
            const prefix = NAV_ICON_PREFIX[item.path] || '•';

            const linkStyle = {
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '100%',
              padding: '0 13px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              fontWeight: isActive ? 700 : 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              backgroundColor: isActive ? '#F5C242' : 'transparent',
              color: isActive ? '#18181B' : 'var(--color-ink)',
              borderLeft: isActive ? '1.5px solid #18181B' : '1.5px solid transparent',
              borderRight: isActive ? '1.5px solid #18181B' : '1.5px solid transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s ease, color 0.15s ease',
            };

            if (item.path === '/achievements') {
              return (
                <div
                  key={item.path}
                  style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'stretch' }}
                  onMouseEnter={() => setAchievementsHover(true)}
                  onMouseLeave={() => setAchievementsHover(false)}
                >
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    style={linkStyle}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '11px' }}>{prefix}</span>
                    <span>{item.title}</span>
                    <FaChevronDown
                      size={8}
                      style={{
                        transition: 'transform 0.15s ease',
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
                          top: 'calc(100% + 4px)',
                          left: 0,
                          minWidth: '210px',
                          backgroundColor: 'var(--color-card-bg)',
                          border: '1.5px solid var(--color-border-strong)',
                          borderRadius: '6px',
                          padding: '6px',
                          boxShadow: '4px 4px 0px #18181B',
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
                                padding: '8px 12px',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11.5px',
                                fontWeight: subActive ? 700 : 500,
                                textTransform: 'uppercase',
                                color: subActive ? '#18181B' : 'var(--color-ink)',
                                backgroundColor: subActive ? '#F5C242' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.12s ease',
                              }}
                              onMouseEnter={e => { if (!subActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; }}
                              onMouseLeave={e => { if (!subActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              • {t(sub.labelKey)}
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
                  style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'stretch' }}
                  onMouseEnter={() => setServicesHover(true)}
                  onMouseLeave={() => setServicesHover(false)}
                >
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    style={linkStyle}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '11px' }}>{prefix}</span>
                    <span>{item.title}</span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: '#EA580C',
                        border: '1px solid #18181B',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        lineHeight: 1.1,
                      }}
                    >
                      HOT
                    </span>
                    <FaChevronDown
                      size={8}
                      style={{
                        transition: 'transform 0.15s ease',
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
                          top: 'calc(100% + 4px)',
                          left: 0,
                          minWidth: '250px',
                          backgroundColor: 'var(--color-card-bg)',
                          border: '1.5px solid var(--color-border-strong)',
                          borderRadius: '6px',
                          padding: '6px',
                          boxShadow: '4px 4px 0px #18181B',
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
                                borderRadius: '4px',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11.5px',
                                fontWeight: subActive ? 700 : 500,
                                color: subActive ? '#18181B' : 'var(--color-ink)',
                                backgroundColor: subActive ? '#F5C242' : 'transparent',
                                textDecoration: 'none',
                                transition: 'background-color 0.12s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!subActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
                              }}
                              onMouseLeave={(e) => {
                                if (!subActive) e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              • {isEn ? sub.labelEn : sub.labelVi}
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
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                style={linkStyle}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ fontSize: '11px' }}>{prefix}</span>
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Cluster: 3 Colorful Circular Coins + Boxed ♥ CONTACT Button (Robin signature) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Coin 1 (Mustard Yellow): Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDarkMode ? t('nav.switchToLight') : t('nav.switchToDark')}
          title={isDarkMode ? t('nav.switchToLight') : t('nav.switchToDark')}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '9999px',
            backgroundColor: '#F5C242',
            color: '#18181B',
            border: '1.5px solid #18181B',
            boxShadow: '1.5px 1.5px 0px #18181B',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          {isDarkMode ? <FaSun size={12} /> : <FaMoon size={12} />}
        </button>

        {/* Coin 2 (Hot Pink): Language Toggle */}
        <button
          onClick={toggleLang}
          data-testid="lang-toggle"
          aria-label={t('nav.toggleLanguage')}
          title={t('nav.toggleLanguage')}
          style={{
            height: '30px',
            padding: '0 9px',
            borderRadius: '9999px',
            backgroundColor: '#EC4899',
            color: '#FFFFFF',
            border: '1.5px solid #18181B',
            boxShadow: '1.5px 1.5px 0px #18181B',
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          {isEn ? 'EN' : 'VI'}
        </button>

        {/* Coin 3 (Emerald Green): Recruiter Match */}
        <button
          onClick={onOpenRecruiterMatch}
          title={t('nav.forRecruiters')}
          aria-label={t('nav.forRecruiters')}
          className="hidden sm:inline-flex"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '9999px',
            backgroundColor: '#18A96B',
            color: '#FFFFFF',
            border: '1.5px solid #18181B',
            boxShadow: '1.5px 1.5px 0px #18181B',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px) scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          <FaBriefcase size={12} />
        </button>

        {/* Compact CV Download Stamp */}
        <a
          href={personalInfo.cv}
          download="Le_Tri_Trung_CV.pdf"
          className="hidden xl:inline-flex"
          style={{
            alignItems: 'center',
            gap: '5px',
            height: '32px',
            padding: '0 11px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            backgroundColor: 'var(--color-surface-soft)',
            border: '1.5px solid var(--color-border-strong)',
            boxShadow: '2px 2px 0px #18181B',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
        >
          <FaDownload size={10} />
          <span>CV</span>
        </a>

        {/* Boxed ♥ CONTACT Button (Exact match to Robin top-right CTA) */}
        <Link
          to="/contact"
          onClick={handleLinkClick}
          className="hidden md:inline-flex"
          style={{
            alignItems: 'center',
            gap: '6px',
            height: '32px',
            padding: '0 13px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backgroundColor: location.pathname === '/contact' ? '#F5C242' : 'var(--color-card-bg)',
            color: location.pathname === '/contact' ? '#18181B' : 'var(--color-ink)',
            border: '1.5px solid var(--color-border-strong)',
            boxShadow: '2px 2px 0px #18181B',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s ease, background-color 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.backgroundColor = '#F5C242';
            e.currentTarget.style.color = '#18181B';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.backgroundColor = location.pathname === '/contact' ? '#F5C242' : 'var(--color-card-bg)';
            e.currentTarget.style.color = location.pathname === '/contact' ? '#18181B' : 'var(--color-ink)';
          }}
        >
          <FaHeart size={10} style={{ color: '#EC4899' }} />
          <span>{isEn ? 'CONTACT' : 'LIÊN HỆ'}</span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex lg:hidden items-center justify-center"
          data-testid="mobile-menu-toggle"
          style={{
            width: '36px',
            height: '34px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-card-bg)',
            border: '1.5px solid var(--color-border-strong)',
            boxShadow: '2px 2px 0px #18181B',
            cursor: 'pointer',
            color: 'var(--color-ink)',
            flexShrink: 0,
          }}
          aria-label={t('nav.toggleMenu')}
        >
          <div style={{ width: '18px', height: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{
              display: 'block', width: '100%', height: '2px',
              backgroundColor: 'var(--color-ink)',
              transition: 'all 0.22s ease',
              transform: isMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '100%', height: '2px',
              backgroundColor: 'var(--color-ink)',
              transition: 'all 0.22s ease',
              opacity: isMenuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '100%', height: '2px',
              backgroundColor: 'var(--color-ink)',
              transition: 'all 0.22s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Notebook Dossier Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: '8px',
              right: '8px',
              maxHeight: 'calc(100vh - 80px)',
              overflowY: 'auto',
              backgroundColor: 'var(--color-canvas)',
              border: '2px solid var(--color-border-strong)',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '6px 6px 0px #18181B',
              zIndex: 60,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              {siteNavigation.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path)) ||
                  (item.path === '/achievements' && (location.pathname === '/achievements' || location.pathname === '/activities'));
                const prefix = NAV_ICON_PREFIX[item.path] || '•';

                return (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: isActive ? '#18181B' : 'var(--color-ink)',
                        textDecoration: 'none',
                        backgroundColor: isActive ? '#F5C242' : 'var(--color-card-bg)',
                        border: '1.5px solid var(--color-border-strong)',
                        boxShadow: isActive ? '2px 2px 0px #18181B' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span>{prefix}</span>
                        <span>{item.title}</span>
                      </span>
                      {item.path === '/dich-vu' && (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#ffffff',
                          backgroundColor: '#EA580C',
                          padding: '2px 6px',
                          borderRadius: '3px',
                        }}>HOT</span>
                      )}
                    </Link>

                    {item.path === '/achievements' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '20px', marginTop: '6px' }}>
                        {ACHIEVEMENT_SUBTABS.map((sub) => (
                          <Link
                            key={sub.tab}
                            to={sub.path}
                            onClick={(e) => handleSubtabClick(e, sub.path)}
                            style={{
                              padding: '7px 12px',
                              borderRadius: '4px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              color: 'var(--color-ink-soft)',
                              textDecoration: 'none',
                            }}
                          >
                            ↳ {t(sub.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1.5px dashed var(--color-hairline)', paddingTop: '12px' }}>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenRecruiterMatch?.();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  backgroundColor: '#18A96B',
                  border: '1.5px solid #18181B',
                  boxShadow: '2px 2px 0px #18181B',
                  cursor: 'pointer',
                }}
              >
                <FaBriefcase size={12} />
                <span>{t('nav.forRecruiters')}</span>
              </button>
              <a
                href={personalInfo.cv}
                download="Le_Tri_Trung_CV.pdf"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#18181B',
                  backgroundColor: '#F5C242',
                  border: '1.5px solid #18181B',
                  boxShadow: '2px 2px 0px #18181B',
                  textDecoration: 'none',
                }}
              >
                <FaDownload size={12} />
                {t('nav.downloadCV')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
