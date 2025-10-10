import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './Hero.scss';

const Hero = () => {
  const { currentTheme } = useCustomTheme();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const titles = [
    'Software Developer',
    'Java Specialist', 
    'Full Stack Engineer',
    'Problem Solver',
  ];

  // Rotating titles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero__text"
          >
            {currentTheme === 'darkCoder' ? (
              // Coder Theme Hero
              <div className="hero__coder">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hero__prompt"
                >
                  <span className="hero__prompt-symbol">user@portfolio:~$</span>
                  <span className="hero__prompt-cursor">|</span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="hero__title hero__title--coder"
                >
                  <span className="hero__bracket">{'>'}</span> Lê Trí Trung
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="hero__cursor"
                  >
                    _
                  </motion.span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="hero__code"
                >
                  <div className="hero__comment">// Role Definition</div>
                  <div className="hero__code-block">
                    <span className="hero__keyword">const</span>{' '}
                    <span className="hero__variable">developer</span> = {'{'}
                  </div>
                  <div className="hero__properties">
                    <div><span className="hero__property">name:</span> <span className="hero__string">'Lê Trí Trung'</span>,</div>
                    <div><span className="hero__property">role:</span> <span className="hero__string">'{titles[titleIndex]}'</span>,</div>
                    <div><span className="hero__property">status:</span> <span className="hero__string">'Computer Science Student'</span>,</div>
                    <div><span className="hero__property">location:</span> <span className="hero__string">'FPT University'</span></div>
                  </div>
                  <div className="hero__code-block">{'};'}</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="hero__description hero__description--coder"
                >
                  <span className="hero__comment-start">/**</span><br/>
                  <span className="hero__comment-line">{' * Passionate about software development and technology.'}</span><br/>
                  <span className="hero__comment-line">{' * Specializing in Java development with a focus on'}</span><br/>
                  <span className="hero__comment-line">{' * learning and contributing to meaningful projects.'}</span><br/>
                  <span className="hero__comment-end"> */</span>
                </motion.div>

                {/* Terminal-style CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="hero__actions hero__actions--coder"
                >
                  <a
                    href="/projects"
                    className="hero__button hero__button--terminal"
                  >
                    <span className="hero__button-prompt">$</span>
                    <span>cd projects/</span>
                    <motion.span 
                      className="hero__button-arrow"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </a>
                  
                  <a
                    href="/resume.pdf"
                    className="hero__button hero__button--terminal"
                  >
                    <span className="hero__button-prompt">$</span>
                    <span>wget cv.pdf</span>
                    <FaDownload size={14} className="hero__button-icon" />
                  </a>
                </motion.div>

                {/* Terminal Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="hero__social hero__social--coder"
                >
                  <span className="hero__social-label"># social_links:</span>
                  <div className="hero__social-links">
                    <a
                      href="https://github.com/letritrung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero__social-link"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://linkedin.com/in/letritrung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero__social-link"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Standard Theme Hero
              <div className="hero__standard">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="hero__title hero__title--standard"
                >
                  Xin chào! Tôi là{' '}
                  <span className="hero__name">Lê Trí Trung</span>
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="hero__subtitle"
                >
                  {titles[titleIndex]} & Computer Science Student
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="hero__description hero__description--standard"
                >
                  Tôi là sinh viên Khoa học Máy tính tại Đại học FPT với niềm đam mê phát triển 
                  phần mềm và công nghệ. Chuyên về Java development và luôn tìm kiếm cơ hội học hỏi, 
                  đóng góp vào các dự án có ý nghĩa.
                </motion.p>

                {/* Standard CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="hero__actions hero__actions--standard"
                >
                  <a
                    href="/projects"
                    className="hero__button hero__button--primary"
                  >
                    <span>Xem dự án</span>
                    <span>🚀</span>
                  </a>
                  
                  <a
                    href="/resume.pdf"
                    className="hero__button hero__button--secondary"
                  >
                    <FaDownload size={16} />
                    <span>Tải CV</span>
                  </a>
                </motion.div>

                {/* Standard Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="hero__social hero__social--standard"
                >
                  <span className="hero__social-label">Kết nối với tôi:</span>
                  <div className="hero__social-links">
                    <a
                      href="https://github.com/letritrung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero__social-link"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://linkedin.com/in/letritrung"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero__social-link"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero__visual"
          >
            {currentTheme === 'darkCoder' ? (
              <div className="hero__visual-coder">
                <div className="hero__avatar hero__avatar--coder">
                  <div className="hero__avatar-code">
                    &lt;Developer /&gt;
                  </div>
                </div>
                {/* Floating Terminal Elements */}
                <div className="hero__floating-elements">
                  <motion.div
                    animate={{ y: [-5, 5, -5], rotate: [0, 2, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="hero__floating-item hero__floating-item--java"
                  >
                    {'<Java/>'}
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [5, -5, 5], rotate: [0, -2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="hero__floating-item hero__floating-item--git"
                  >
                    {'git++'}
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hero__floating-item hero__floating-item--coffee"
                  >
                    {'☕'}
                  </motion.div>
                </div>
              </div>
            ) : (
              <div className="hero__visual-standard">
                <div className="hero__avatar hero__avatar--standard">
                  <div className="hero__avatar-emoji">👨‍💻</div>
                </div>
                {/* Floating background shapes */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="hero__circle hero__circle--outer"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="hero__circle hero__circle--inner"
                />
                
                {/* Floating tech icons */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hero__tech-icon hero__tech-icon--top"
                >
                  <span>☕</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="hero__tech-icon hero__tech-icon--bottom"
                >
                  <span>⚛️</span>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;