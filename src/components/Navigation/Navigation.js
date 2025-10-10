import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCustomTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import './Navigation.scss';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, isDarkCoder, currentTheme, toggleTheme, switchTheme, toggleMatrix, matrixEnabled } = useCustomTheme();
  const location = useLocation();

  // Navigation items with coder-style symbols
  const navItems = [
    { name: 'home', path: '/', icon: isDarkCoder ? '~/' : '🏠', display: 'Home' },
    { name: 'about', path: '/about', icon: isDarkCoder ? './me' : '👤', display: 'About' },
    { name: 'education', path: '/education', icon: isDarkCoder ? 'ls edu/' : '🎓', display: 'Education' },
    { name: 'skills', path: '/skills', icon: isDarkCoder ? 'cat skills' : '💼', display: 'Skills' },
    { name: 'projects', path: '/projects', icon: isDarkCoder ? 'git log' : '🚀', display: 'Projects' },
    { name: 'certificates', path: '/certificates', icon: isDarkCoder ? 'certs.txt' : '📜', display: 'Certs' },
    { name: 'prizes', path: '/prizes', icon: isDarkCoder ? 'awards.json' : '🏆', display: 'Awards' },
    { name: 'activities', path: '/activities', icon: isDarkCoder ? 'history' : '🎯', display: 'Activity' },
    { name: 'contact', path: '/contact', icon: isDarkCoder ? 'mail -s' : '📧', display: 'Contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navigation ${isScrolled ? 'navigation--scrolled' : ''}`}>
      <div className="navigation__container">
        <div className="navigation__content">
          
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="navigation__brand"
          >
            {isDarkCoder ? (
              <motion.div 
                className="navigation__brand-coder"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="navigation__brand-title">
                  <span className="navigation__brand-prompt">$ </span>
                  <span className="navigation__brand-command">whoami</span>
                </div>
                <div className="navigation__brand-subtitle">
                  {'>'} letritrung.dev
                </div>
              </motion.div>
            ) : (
              <>
                <div className="navigation__brand-logo">
                  LT
                </div>
                <div className="navigation__brand-text">
                  <h1 className="navigation__brand-name">
                    Lê Trí Trung
                  </h1>
                  <p className="navigation__brand-tagline">
                    Portfolio
                  </p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="navigation__menu navigation__menu--desktop">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navigation__item ${
                  location.pathname === item.path ? 'navigation__item--active' : ''
                } ${isDarkCoder ? 'navigation__item--coder' : 'navigation__item--standard'}`}
              >
                <span className="navigation__item-content">
                  <span className="navigation__item-icon">
                    {item.icon}
                  </span>
                  <span className="navigation__item-text">
                    {isDarkCoder ? item.display : item.name}
                  </span>
                </span>
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="activeNav"
                    className={`navigation__item-indicator ${
                      isDarkCoder ? 'navigation__item-indicator--coder' : 'navigation__item-indicator--standard'
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="navigation__controls">
            
            {/* Theme Toggles */}
            {isDarkCoder ? (
              <div className="navigation__theme-controls navigation__theme-controls--coder">
                {/* Matrix Toggle */}
                <motion.button
                  onClick={toggleMatrix}
                  className={`navigation__button navigation__button--matrix ${
                    matrixEnabled ? 'navigation__button--matrix-active' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle matrix effect"
                >
                  MATRIX
                </motion.button>
                
                {/* Theme Switch */}
                <motion.button
                  onClick={() => switchTheme('light')}
                  className="navigation__button navigation__button--exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Switch to light theme"
                >
                  EXIT
                </motion.button>
              </div>
            ) : (
              <div className="navigation__theme-controls navigation__theme-controls--standard">
                <button
                  onClick={() => switchTheme('darkCoder')}
                  className="navigation__button navigation__button--code"
                  aria-label="Switch to dark coder theme"
                >
                  {'</>'}
                </button>
                <button
                  onClick={toggleTheme}
                  className="navigation__button navigation__button--theme"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`navigation__mobile-toggle ${
                currentTheme === 'darkCoder' ? 'navigation__mobile-toggle--coder' : 'navigation__mobile-toggle--standard'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {currentTheme === 'darkCoder' ? (
                <div className="navigation__mobile-icon navigation__mobile-icon--coder">
                  {isMenuOpen ? '[x]' : '[-]'}
                </div>
              ) : (
                <div className="navigation__mobile-icon navigation__mobile-icon--standard">
                  <div className={`navigation__hamburger-line ${
                    isMenuOpen ? 'navigation__hamburger-line--rotate-45' : ''
                  }`}></div>
                  <div className={`navigation__hamburger-line ${
                    isMenuOpen ? 'navigation__hamburger-line--hide' : ''
                  }`}></div>
                  <div className={`navigation__hamburger-line ${
                    isMenuOpen ? 'navigation__hamburger-line--rotate-neg-45' : ''
                  }`}></div>
                </div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className={`navigation__mobile-menu ${isMenuOpen ? 'navigation__mobile-menu--open' : ''}`}
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className={`navigation__mobile-content ${
            currentTheme === 'darkCoder' ? 'navigation__mobile-content--coder' : 'navigation__mobile-content--standard'
          }`}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`navigation__mobile-item ${
                    location.pathname === item.path ? 'navigation__mobile-item--active' : ''
                  } ${currentTheme === 'darkCoder' ? 'navigation__mobile-item--coder' : 'navigation__mobile-item--standard'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentTheme === 'darkCoder' ? (
                    <>
                      <span className="navigation__mobile-prompt">$</span>
                      <span className="navigation__mobile-command">{item.command}</span>
                      {location.pathname === item.path && (
                        <motion.div 
                          className="navigation__mobile-indicator"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <span className="navigation__mobile-icon">{item.icon}</span>
                      <span className="navigation__mobile-text">{item.name}</span>
                      {location.pathname === item.path && (
                        <div className="navigation__mobile-indicator navigation__mobile-indicator--standard"></div>
                      )}
                    </>
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile Theme Controls for Coder Theme */}
            {currentTheme === 'darkCoder' && (
              <motion.div 
                className="navigation__mobile-controls"
                initial={{ opacity: 0 }}
                animate={{ opacity: isMenuOpen ? 1 : 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2, duration: 0.3 }}
              >
                <div className="navigation__mobile-controls-content">
                  <motion.button
                    onClick={toggleMatrix}
                    className="navigation__mobile-control-btn navigation__mobile-control-btn--matrix"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Matrix Rain</span>
                    <span className={`navigation__mobile-status ${
                      matrixEnabled ? 'navigation__mobile-status--active' : ''
                    }`}>
                      [{matrixEnabled ? 'ON' : 'OFF'}]
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => switchTheme('light')}
                    className="navigation__mobile-control-btn navigation__mobile-control-btn--exit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    EXIT CODER MODE
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;