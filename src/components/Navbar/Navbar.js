import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { navigation } from '../../data';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './Navbar.scss';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar ${
        isScrolled ? 'scrolled' : 'transparent'
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="navbar-logo"
          >
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="logo-link"
            >
              LTT
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            <div className="nav-list">
              {navigation.map((item) => (
                <div key={item.name} className="nav-item">
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="nav-link"
                  >
                    {item.name}
                  </motion.a>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="navbar-actions">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="theme-toggle"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        className="mobile-nav"
      >
        <div className="mobile-nav-content">
          <div className="mobile-nav-list">
            {navigation.map((item) => (
              <div key={item.name} className="mobile-nav-item">
                <motion.a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  whileHover={{ x: 10 }}
                  className="mobile-nav-link"
                >
                  {item.name}
                </motion.a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
