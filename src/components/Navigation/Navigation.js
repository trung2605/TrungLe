import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCustomTheme } from "../../contexts/ThemeContext";
import "./Navigation.scss";
import { personalInfo, siteNavigation } from "../../data";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navigation ${isScrolled ? "navigation--scrolled" : ""}`}>
      <div className="navigation__container">
        <div className="navigation__content">
          {/* Logo/Brand */}
          <Link to="/" className="navigation__brand">
            <div className="navigation__logo">LT</div>

            <div className="navigation__brand-text">
              <h1 className="navigation__brand-name">Lê Trí Trung</h1>
              <p className="navigation__brand-subtitle">Portfolio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navigation__menu navigation__menu--desktop">
            {siteNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navigation__link ${
                  location.pathname === item.path
                    ? "navigation__link--active"
                    : ""
                }`}
              >
                <span className="navigation__link-content">
                  <span className="navigation__link-text">{item.title}</span>
                </span>
                {location.pathname === item.path && (
                  <div className="navigation__link-indicator"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="navigation__controls">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="navigation__theme-toggle"
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navigation__hamburger"
              aria-label="Toggle menu"
            >
              <div
                className={`navigation__hamburger-icon ${
                  isMenuOpen ? "navigation__hamburger-icon--open" : ""
                }`}
              >
                <div className="navigation__hamburger-line navigation__hamburger-line--top"></div>
                <div className="navigation__hamburger-line navigation__hamburger-line--middle"></div>
                <div className="navigation__hamburger-line navigation__hamburger-line--bottom"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`navigation__mobile ${
            isMenuOpen ? "navigation__mobile--open" : ""
          }`}
        >
          <div className="navigation__mobile-content">
            {siteNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navigation__mobile-link ${
                  location.pathname === item.path
                    ? "navigation__mobile-link--active"
                    : ""
                }`}
              >
                <span className="navigation__mobile-link-icon">
                  {item.icon}
                </span>
                <span className="navigation__mobile-link-text">
                  {item.name}
                </span>
                {location.pathname === item.path && (
                  <div className="navigation__mobile-link-indicator"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
