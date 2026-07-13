import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { personalInfo } from "../../data";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useTranslatedData } from "../../hooks/useTranslatedData";

const ACHIEVEMENT_SUBTABS = [
  { tab: 'education', labelKey: 'nav.education' },
  { tab: 'certificates', labelKey: 'nav.certificates' },
  { tab: 'prizes', labelKey: 'nav.prizes' },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [achievementsHover, setAchievementsHover] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { t, i18n } = useTranslation();
  const { siteNavigation } = useTranslatedData();

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

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-canvas)',
        borderBottom: isScrolled ? '1px solid var(--color-hairline)' : '1px solid transparent',
        transition: 'border-color 0.2s ease',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link
            to="/"
            onClick={handleLinkClick}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a12 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
            }}>
              LT
            </div>
            <span style={{
              fontSize: '15px',
              fontWeight: '540',
              color: 'var(--color-ink)',
              letterSpacing: '-0.2px',
              display: 'none',
            }}
              className="sm:block"
            >
              {personalInfo.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: '4px' }}
          >
            {siteNavigation.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.path === '/achievements') {
                const activeTab = searchParams.get('tab');
                return (
                  <div
                    key={item.path}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setAchievementsHover(true)}
                    onMouseLeave={() => setAchievementsHover(false)}
                  >
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 16px',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: isActive ? '540' : '400',
                        color: isActive ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                        textDecoration: 'none',
                        transition: 'color 0.15s ease',
                        backgroundColor: isActive ? 'var(--color-surface-soft)' : 'transparent',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'var(--color-surface-soft)',
                            borderRadius: '50px',
                          }}
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span style={{ position: 'relative', zIndex: 1 }}>{item.title}</span>
                      <FaChevronDown
                        size={9}
                        style={{
                          position: 'relative', zIndex: 1,
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
                            top: 'calc(100% + 6px)',
                            left: 0,
                            minWidth: '180px',
                            backgroundColor: 'var(--color-canvas)',
                            border: '1px solid var(--color-hairline)',
                            borderRadius: '14px',
                            padding: '6px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            zIndex: 60,
                          }}
                        >
                          {ACHIEVEMENT_SUBTABS.map((sub) => {
                            const subActive = isActive && (activeTab === sub.tab || (!activeTab && sub.tab === 'education'));
                            return (
                              <Link
                                key={sub.tab}
                                to={`/achievements?tab=${sub.tab}`}
                                onClick={handleLinkClick}
                                style={{
                                  display: 'block',
                                  padding: '9px 14px',
                                  borderRadius: '9px',
                                  fontSize: '14px',
                                  fontWeight: subActive ? '540' : '400',
                                  color: subActive ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                                  backgroundColor: subActive ? 'var(--color-surface-soft)' : 'transparent',
                                  textDecoration: 'none',
                                  transition: 'background-color 0.15s ease',
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

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  style={{
                    position: 'relative',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    fontSize: '15px',
                    fontWeight: isActive ? '540' : '400',
                    color: isActive ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    backgroundColor: isActive ? 'var(--color-surface-soft)' : 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'var(--color-surface-soft)',
                        borderRadius: '50px',
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA pair */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                border: 'none', cursor: 'pointer',
                transition: 'background-color 0.15s ease',
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
                  {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Language toggle — sliding switch */}
            <button
              onClick={toggleLang}
              data-testid="lang-toggle"
              style={{
                position: 'relative',
                width: '64px',
                height: '28px',
                borderRadius: '50px',
                backgroundColor: '#f7f7f5',
                border: '1.5px solid #e6e6e6',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
                overflow: 'hidden',
              }}
              aria-label={t('nav.toggleLanguage')}
            >
              {/* Labels */}
              <span style={{
                position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '600',
                letterSpacing: '0.4px', color: i18n.language === 'en' ? '#ffffff' : '#aaaaaa',
                transition: 'color 0.2s ease', userSelect: 'none', zIndex: 3,
              }}>EN</span>
              <span style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '600',
                letterSpacing: '0.4px', color: i18n.language === 'vi' ? '#ffffff' : '#aaaaaa',
                transition: 'color 0.2s ease', userSelect: 'none', zIndex: 3,
              }}>VI</span>
              {/* Thumb */}
              <motion.div
                animate={{ x: i18n.language === 'en' ? 1 : 33 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                style={{
                  position: 'absolute',
                  top: '2px',
                  width: '28px',
                  height: '20px',
                  borderRadius: '50px',
                  backgroundColor: '#000000',
                  zIndex: 2,
                }}
              />
            </button>

            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              className="hidden lg:inline-flex hover-surface"
              style={{
                padding: '8px 18px 10px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '480',
                color: 'var(--color-ink)',
                backgroundColor: 'var(--color-canvas)',
                border: '1.5px solid var(--color-hairline)',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
            >
              {t('nav.downloadCV')}
            </a>
            <Link
              to="/projects"
              onClick={handleLinkClick}
              className="hidden lg:inline-flex"
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '480',
                color: '#ffffff',
                backgroundColor: '#000000',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
            >
              {t('nav.viewProjects')}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              data-testid="mobile-menu-toggle"
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-ink)',
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
        </div>
      </div>

      {/* Mobile Menu */}
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
              top: '56px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--color-canvas)',
              borderBottom: '1px solid var(--color-hairline)',
              padding: '16px 24px 24px',
              zIndex: 49,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              {siteNavigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: isActive ? '540' : '400',
                        color: 'var(--color-ink)',
                        textDecoration: 'none',
                        backgroundColor: isActive ? 'var(--color-surface-soft)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{ opacity: 0.7 }}>{item.icon}</span>
                      {item.title}
                    </Link>
                    {item.path === '/achievements' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: '32px', marginTop: '2px' }}>
                        {ACHIEVEMENT_SUBTABS.map((sub) => {
                          const activeTab = searchParams.get('tab');
                          const subActive = isActive && (activeTab === sub.tab || (!activeTab && sub.tab === 'education'));
                          return (
                            <Link
                              key={sub.tab}
                              to={`/achievements?tab=${sub.tab}`}
                              onClick={handleLinkClick}
                              style={{
                                padding: '7px 16px',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: subActive ? '540' : '400',
                                color: subActive ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                                textDecoration: 'none',
                                backgroundColor: subActive ? 'var(--color-surface-soft)' : 'transparent',
                              }}
                            >
                              {t(sub.labelKey)}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              to="/projects"
              onClick={handleLinkClick}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: '480',
                color: '#ffffff',
                backgroundColor: '#000000',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {t('nav.viewProjects')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
