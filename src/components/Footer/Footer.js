import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/letritrung',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/letritrung',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://facebook.com/trung.le',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:letritrung2605@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="footer__scroll-top"
      >
        <FaArrowUp size={16} />
      </motion.button>

      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* About Section */}
          <div className="footer__brand">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="footer__logo"
            >
              <div className="footer__logo-icon">LT</div>
              <span className="footer__brand-name">Lê Trí Trung</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="footer__brand-description"
            >
              Java Developer & Computer Science Student passionate about creating 
              innovative solutions and contributing to meaningful projects.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="footer__contact-info"
            >
              <div className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                <span>Da Nang, Vietnam</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">🎓</span>
                <span>FPT University</span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">💼</span>
                <span>Available for opportunities</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="footer__section-title"
            >
              Quick Links
            </motion.h4>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="footer__links"
            >
              {quickLinks.map((link, index) => (
                <motion.div key={index} whileHover={{ x: 5 }}>
                  <Link
                    to={link.href}
                    className="footer__link"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Connect Section */}
          <div className="footer__section">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="footer__section-title"
            >
              Let's Connect
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="footer__brand-description"
            >
              Follow me on social media or send me a message. I'm always excited to connect!
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="footer__social"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`footer__social-link footer__social-link--${social.name.toLowerCase()}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="footer__copyright"
          >
            <span>© 2025 Lê Trí Trung | All rights reserved</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="footer__copyright"
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="footer__heart"
            >
              <FaHeart size={14} />
            </motion.div>
            <span>using React & SCSS</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;