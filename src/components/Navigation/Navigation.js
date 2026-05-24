import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { personalInfo, siteNavigation } from "../../data";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
        backgroundColor: '#ffffff',
        borderBottom: isScrolled ? '1px solid #e6e6e6' : '1px solid transparent',
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
              borderRadius: '6px',
              backgroundColor: '#000000',
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
              color: '#000000',
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
                    color: isActive ? '#000000' : '#555555',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    backgroundColor: isActive ? '#f7f7f5' : 'transparent',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#f7f7f5',
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
            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              className="hidden lg:inline-flex"
              style={{
                padding: '8px 18px 10px',
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: '480',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e6e6e6',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              Download CV
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
              View Projects
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#000000',
              }}
              aria-label="Toggle menu"
            >
              <div style={{ width: '22px', height: '18px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: '#000',
                  transition: 'all 0.25s ease',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }} />
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: '#000',
                  transition: 'all 0.25s ease',
                  opacity: isMenuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: '100%', height: '1.5px',
                  backgroundColor: '#000',
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '56px',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e6e6e6',
              padding: '16px 24px 24px',
              zIndex: 49,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              {siteNavigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: location.pathname === item.path ? '540' : '400',
                    color: '#000000',
                    textDecoration: 'none',
                    backgroundColor: location.pathname === item.path ? '#f7f7f5' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ opacity: 0.7 }}>{item.icon}</span>
                  {item.title}
                </Link>
              ))}
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
              View Projects
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
