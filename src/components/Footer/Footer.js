import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { socialLinks, siteNavigation } from '../../data';
import './Footer.scss';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getSocialIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'facebook': return FaFacebook;
            case 'github': return FaGithub;
            case 'linkedin': return FaLinkedin;
            case 'email': return FaEnvelope;
            default: return FaEnvelope;
        }
    };

    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Compact Footer Content */}
                <div className="footer__content">
                    
                    {/* Brand Section - Minimal */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <div className="footer__logo-icon">LT</div>
                            <span className="footer__brand-name">Lê Trí Trung</span>
                        </div>
                        <p className="footer__brand-description">
                            Java Developer & Computer Science Student
                        </p>
                    </div>

                    {/* Social Links - Compact */}
                    <div className="footer__social-wrapper">
                        <div className="footer__social">
                            {socialLinks.map((social, index) => {
                                const IconComponent = getSocialIcon(social.name);
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`footer__social-link footer__social-link--${social.name.toLowerCase()}`}
                                    >
                                        <IconComponent size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Minimal */}
                <div className="footer__bottom">
                    <div className="footer__copyright">
                        <span>© 2025 Lê Trí Trung</span>
                        <span className="footer__separator">•</span>
                        <span>Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="footer__heart"
                        >
                            <FaHeart size={12} />
                        </motion.div>
                        <span>React</span>
                    </div>
                </div>
            </div>
            
            {/* Scroll to Top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="footer__scroll-top"
            >
                <FaArrowUp size={14} />
            </motion.button>
        </footer>
    );
};

export default Footer;