import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Home.scss";
import { siteNavigation } from "../../data";
import { personalInfo } from "../../data";

// Refined easing functions for Swiss precision
const easeOutExpo = [0.16, 1, 0.3, 1];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section - Asymmetric Editorial Layout */}
      <section className="home-page__hero container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {/* Caption - Swiss style label */}
          <motion.p
            className="hero-caption"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: easeOutExpo }}
          >
            Portfolio 2025
          </motion.p>

          {/* Main Heading - Bold Swiss Typography */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeOutExpo }}
          >
            Xin chào,{" "}
            <br />
            Tôi là <span className="text-gradient">Lê Trí Trung</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: easeOutExpo }}
          >
            Java Developer & Computer Science Student
          </motion.h2>

          {/* Description - Generous line height */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeOutExpo }}
          >
            I am a Computer Science student at FPT University with a passion
            for software development and technology. Specializing in Java
            development, I am always seeking opportunities to learn and
            contribute to meaningful projects.
          </motion.p>

          {/* CTA Buttons - Minimal Style */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: easeOutExpo }}
          >
            <Link to="/projects" className="btn-primary">
              View Projects
            </Link>
            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_Java_Developer_CV.pdf"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <FaDownload size={14} />
              <span>Download CV</span>
            </a>
          </motion.div>

          {/* Social Links - Editorial Style */}
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: easeOutExpo }}
          >
            <span className="social-label">Connect</span>
            <div className="social-links">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Side - Simplified & Elegant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{ 
            position: 'relative', 
            width: '320px', 
            height: '320px',
            maxWidth: '100%'
          }}>
            {/* Minimal geometric accent */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                inset: '0',
                border: '1px solid var(--border-primary)',
                borderRadius: '50%',
                opacity: 0.3
              }}
            />
            
            {/* Profile image with subtle border */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid var(--border-secondary)',
              background: 'var(--bg-tertiary)'
            }}>
              <img
                src="https://i.imgur.com/5tzmdQ1.png"
                alt="Lê Trí Trung"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(20%)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section - Minimal & Precise */}
      <section className="container" style={{ marginTop: 'var(--spacing-32)' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-16) 0'
          }}
        >
          {[
            { value: '10+', label: 'Projects' },
            { value: '5+', label: 'Certificates' },
            { value: '15+', label: 'Skills' },
            { value: '3+', label: 'Awards' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="decorative-stat"
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-8)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                letterSpacing: 'var(--letter-spacing-tight)',
                marginBottom: 'var(--spacing-2)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 'var(--font-size-sm)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-wider)',
                color: 'var(--text-tertiary)',
                fontWeight: 'var(--font-weight-medium)'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Navigation Section - Editorial Grid */}
      <section className="container section-padding">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            marginBottom: 'var(--spacing-16)',
            letterSpacing: 'var(--letter-spacing-tight)'
          }}
        >
          Explore More
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-8)'
        }}>
          {siteNavigation.slice(1).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: easeOutExpo }}
              className="navigation-group"
            >
              <Link
                to={item.path}
                style={{
                  display: 'block',
                  padding: 'var(--spacing-8)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-normal)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: 'var(--spacing-4)',
                  opacity: 0.8
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: 'var(--font-size-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  marginBottom: 'var(--spacing-2)',
                  color: 'var(--text-primary)'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}>
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
