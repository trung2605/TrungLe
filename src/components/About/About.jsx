import { motion } from "framer-motion";
import { stats } from "../../data";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";
import { 
  FaBirthdayCake, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaCheckCircle,
  FaPhoneAlt,
  FaRocket,
  FaLaptopCode,
  FaNewspaper,
  FaTrophy,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";
import BlurText from "../../animations/BlurText";
import DecryptedText from "../../animations/DecryptedText";
import TechIcon from "../../common/TechIcon";

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];
// Same tone family (lilac), varying shade — keeps the Highlights grid visually calm
// instead of clashing pastels sitting side by side
const HIGHLIGHT_COLORS = ['#ede5fb', '#ddcdf7', '#c5b0f4', '#ab8ded'];

const STATUS_STYLE = {
  'Current':   { bg: '#c8e6cd', color: '#000000' },
  'Completed': { bg: '#e6e6e6', color: '#000000' },
};

const About = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { personalInfo, highlights, skills, experience, languages, funFacts } = useTranslatedData();

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

      {/* ── CODE COMMENT BAR ── */}
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '13px',
        color: '#888888',
        marginBottom: '28px',
        padding: '12px 16px',
        backgroundColor: '#f7f7f5',
        borderRadius: '10px',
        borderLeft: '3px solid #c5b0f4',
      }}>
        <span style={{ color: '#1ea64a' }}>{'// '}</span>
        <span>about.js</span>
        <span style={{ color: '#888888', marginLeft: '16px' }}>{'/* Initialized 2005 · Tech Lead & Full-Stack @ Da Nang, VN */'}</span>
      </div>

      {/* ── STORY + INFO ── */}
      <div
        className="grid-2col"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '72px' }}
      >
        {/* Story — clip-path wipe from left */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: '540', letterSpacing: '-0.26px', color: 'var(--color-ink)', marginBottom: '20px' }}>
            {personalInfo.story?.title || 'My Journey'}
          </h2>
          <div style={{ fontSize: '16px', fontWeight: '330', lineHeight: '1.7', color: 'var(--color-ink-soft)' }}>
            <Markdown
              components={{
                a: ({ href, children, ...props }) => {
                  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
                  if (isInternal) {
                    return (
                      <Link
                        to={href}
                        style={{
                          color: '#6d3fc9',
                          fontWeight: '500',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                          transition: 'opacity 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        {...props}
                      >
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#6d3fc9',
                        fontWeight: '500',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
              }}
            >
              {personalInfo.story?.content || personalInfo.bio}
            </Markdown>
          </div>

          {/* Quick interconnected pill links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            <Link
              to="/dich-vu"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '50px',
                backgroundColor: '#ede5fb', color: '#6d3fc9',
                fontSize: '12.5px', fontWeight: '500', textDecoration: 'none',
                border: '1px solid rgba(109, 63, 201, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#e3d6fa'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#ede5fb'; }}
            >
              <FaRocket size={11} /> {isEn ? "Team 5 Devs Service" : "Dịch Vụ Team 5 Devs"}
            </Link>
            <Link
              to="/projects/26"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '50px',
                backgroundColor: '#e0f2fe', color: '#0369a1',
                fontSize: '12.5px', fontWeight: '500', textDecoration: 'none',
                border: '1px solid rgba(3, 105, 161, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#bae6fd'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#e0f2fe'; }}
            >
              <FaLaptopCode size={11} /> {isEn ? "Biensovip Case Study" : "Case Study Biển Số VIP"}
            </Link>
            <Link
              to="/achievements?tab=prizes"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '50px',
                backgroundColor: '#fef3c7', color: '#b45309',
                fontSize: '12.5px', fontWeight: '500', textDecoration: 'none',
                border: '1px solid rgba(180, 83, 9, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#fde68a'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#fef3c7'; }}
            >
              <FaTrophy size={11} /> {isEn ? "Hackathon Champion 2026" : "Quán Quân Hackathon 2026"}
            </Link>
            <Link
              to="/blog/biensovip-postgresql-vs-mongodb-multi-filter"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '50px',
                backgroundColor: '#dcfce7', color: '#15803d',
                fontSize: '12.5px', fontWeight: '500', textDecoration: 'none',
                border: '1px solid rgba(21, 128, 61, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#bbf7d0'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#dcfce7'; }}
            >
              <FaNewspaper size={11} /> {isEn ? "PostgreSQL Deep-Dive" : "Bài Viết PostgreSQL 8ms"}
            </Link>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '50px',
                backgroundColor: '#f3f4f6', color: '#374151',
                fontSize: '12.5px', fontWeight: '500', textDecoration: 'none',
                border: '1px solid rgba(55, 65, 81, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.backgroundColor = '#e5e7eb'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
            >
              <FaEnvelope size={11} /> {isEn ? "Direct Contact" : "Liên Hệ Trực Tiếp"}
            </Link>
          </div>
        </motion.div>

        {/* Info — scale + fade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: 'var(--color-surface-soft)', borderRadius: '24px', padding: '28px', alignSelf: 'start' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--color-ink-soft)', marginBottom: '20px',
          }}>{t('about.personalInfoLabel')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: FaBirthdayCake, label: t('about.dateOfBirth'), value: personalInfo.contact?.birthday },
              { icon: FaPhoneAlt,      label: t('about.phoneLabel') || (isEn ? "Phone / Zalo" : "Điện thoại / Zalo"), value: personalInfo.contact?.phone || "(+84) 782 399 721" },
              { icon: FaMapMarkerAlt,  label: t('about.location'),    value: personalInfo.contact?.location },
              { icon: FaGraduationCap, label: t('about.education'),   value: t('about.educationValue') },
              { icon: FaBriefcase,     label: t('about.specialization'), value: t('about.specializationValue') },
            ].filter(i => i.value).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '12px 16px',
                  backgroundColor: '#ffffff', borderRadius: '12px',
                  border: '1px solid #e6e6e6',
                }}
              >
                <item.icon style={{ color: '#000000', flexShrink: 0 }} size={16} />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#888888', marginBottom: '2px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '480', color: '#000000' }}>
                    <DecryptedText
                      text={item.value}
                      speed={25} maxIterations={6}
                      sequential={true} revealDirection="start" animateOn="view"
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── STATS — LIME BLOCK ── */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: -0.5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 36px', marginBottom: '72px' }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#444444', marginBottom: '28px' }}>
            {t('about.atAGlance')}
          </p>
          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '24px' }}
          >
            {stats.slice(0, 4).map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '340', lineHeight: '1.0', letterSpacing: '-0.8px', color: '#000000' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: '#444444', marginTop: '6px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── EXPERIENCE TIMELINE ── */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
              {t('about.experienceLabel')}
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '340', lineHeight: '1.1', letterSpacing: '-0.5px', color: '#000000', margin: 0 }}>
              {t('about.experienceTitle')}
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.map((exp, i) => {
              const statusStyle = STATUS_STYLE[exp.status] || { bg: '#f7f7f5', color: '#000000' };
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28, scale: 0.97 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '4px 1fr',
                    gap: '24px',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Accent bar */}
                  <div style={{ backgroundColor: exp.color, borderRadius: '4px', minHeight: '100%' }} />

                  {/* Card */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e6e6e6',
                      borderRadius: '20px',
                      padding: '24px 28px',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '540', color: '#000000', margin: 0 }}>{exp.role}</h3>
                          <span style={{
                            padding: '3px 10px', borderRadius: '50px',
                            fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.4px', textTransform: 'uppercase',
                            backgroundColor: statusStyle.bg, color: statusStyle.color,
                          }}>
                            {exp.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: '480', color: '#555555', margin: 0 }}>{exp.company}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#888888', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaCalendarAlt size={10} /> {exp.duration}
                        </span>
                        <span style={{
                          padding: '3px 10px', borderRadius: '50px',
                          fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                          letterSpacing: '0.4px', textTransform: 'uppercase',
                          backgroundColor: '#f7f7f5', color: '#666666',
                          border: '1px solid #e6e6e6',
                        }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.65', color: '#555555', marginBottom: '16px' }}>
                      <Markdown>{exp.description}</Markdown>
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {exp.skills.map((skill, si) => (
                        <span key={si} style={{
                          padding: '4px 12px', borderRadius: '50px',
                          fontSize: '12px', fontWeight: '400',
                          backgroundColor: '#f7f7f5', color: '#333333',
                          border: '1px solid #e6e6e6',
                          display: 'flex', alignItems: 'center', gap: '5px',
                        }}>
                          <FaCheckCircle size={9} style={{ color: '#888888' }} /> {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── HIGHLIGHTS ── */}
      {highlights && highlights.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
              {t('about.highlightsLabel')}
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: '340', lineHeight: '1.10', letterSpacing: '-0.72px', color: '#000000', margin: 0 }}>
              <BlurText text={t('about.highlightsTitle')} delay={40} animateBy="words" direction="bottom" className="inline" />
            </h2>
          </motion.div>
          <div
            className="grid-2col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.88, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length],
                  borderRadius: '20px', padding: '24px',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ fontSize: '26px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>{item.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.6', color: '#333333', margin: 0 }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── SKILLS ── */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
              {t('about.skillsLabel')}
            </p>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '340', lineHeight: '1.1', letterSpacing: '-0.5px', color: '#000000', margin: 0 }}>
              {t('about.skillsTitle')}
            </h2>
          </motion.div>

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {skills.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 32, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  perspective: 800,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e6e6e6',
                  borderRadius: '20px',
                  padding: '24px',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#000000'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e6e6e6'}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '9999px',
                    backgroundColor: BLOCK_COLORS[ci % BLOCK_COLORS.length],
                    flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    color: '#666666', margin: 0,
                  }}>
                    {category.category}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {category.items.map((skill, si) => (
                    <div key={si}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                          <TechIcon tech={skill.name} size={14} />
                          {skill.name}
                        </span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#888888' }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: '4px', backgroundColor: '#f1f1f1', borderRadius: '9999px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.1 + ci * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            height: '100%',
                            backgroundColor: BLOCK_COLORS[ci % BLOCK_COLORS.length] === '#f7f7f5' ? '#000000' : '#000000',
                            borderRadius: '9999px',
                            background: `linear-gradient(90deg, #000000, #333333)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── LANGUAGES ── */}
      <motion.div
        initial={{ opacity: 0, x: -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: '#c8e6cd', borderRadius: '24px', padding: '40px 36px', marginBottom: '72px' }}
      >
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#444444', marginBottom: '10px' }}>
          {t('about.languagesLabel')}
        </p>
        <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: '340', lineHeight: '1.15', letterSpacing: '-0.4px', color: '#000000', marginBottom: '32px' }}>
          {t('about.languagesTitle')}
        </h2>
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderRadius: '16px',
                padding: '20px 24px',
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{lang.flag}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '540', color: '#000000', margin: '0 0 4px 0' }}>{lang.name}</h3>
              <p style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#555555', marginBottom: '16px' }}>{lang.level}</p>

              {/* Bar */}
              <div style={{ height: '4px', backgroundColor: 'rgba(0,0,0,0.12)', borderRadius: '9999px', marginBottom: '8px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', backgroundColor: '#000000', borderRadius: '9999px' }}
                />
              </div>
              <p style={{ fontSize: '13px', fontWeight: '330', color: '#444444', margin: 0 }}>{lang.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── FUN FACTS ── */}
      <section style={{ marginBottom: '72px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
            {t('about.funFactsLabel')}
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '340', lineHeight: '1.1', letterSpacing: '-0.5px', color: '#000000', margin: 0 }}>
            {t('about.funFactsTitle')}
          </h2>
        </motion.div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotate: i % 3 === 0 ? -1.5 : i % 3 === 1 ? 1.5 : 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '20px',
                padding: '24px',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length] }} />
              <div style={{ fontSize: '26px', marginBottom: '12px', marginTop: '4px', display: 'flex', alignItems: 'center' }}>{fact.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0', lineHeight: '1.3' }}>{fact.title}</h3>
              <p style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.6', color: '#555555', margin: 0 }}>{fact.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ECOSYSTEM & INTERCONNECTED NAVIGATION ── */}
      <section style={{ marginBottom: '72px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
            {t('about.ecosystemLabel') || 'Hệ sinh thái & Kết nối'}
          </p>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: '540', lineHeight: '1.15', letterSpacing: '-0.5px', color: '#000000', margin: '0 0 12px 0' }}>
            {t('about.ecosystemTitle') || 'Khám phá các trang liên kết'}
          </h2>
          <p style={{ fontSize: '15px', fontWeight: '330', color: '#666666', margin: 0, maxWidth: '680px' }}>
            {t('about.ecosystemSubtitle') || 'Khám phá dịch vụ phát triển website của team 5 kỹ sư, showcase dự án thực chiến, bài viết kỹ thuật chuyên sâu và hồ sơ giải thưởng.'}
          </p>
        </motion.div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            {
              title: isEn ? "Web & SaaS Development (Team 5 Devs)" : "Dịch Vụ Làm Website & SaaS (Team 5 Kỹ Sư)",
              badge: isEn ? "Core Service" : "Dịch vụ nòng cốt",
              desc: isEn ? "Transparent 5-step engineering process, priced per manday with No Middlemen. Direct collaboration with Tech Lead." : "Quy trình kỹ thuật 5 bước minh bạch, tính giá theo Manday, không qua trung gian. Làm việc 1-1 trực tiếp cùng Tech Lead.",
              path: "/dich-vu",
              cta: isEn ? "Explore Services & Pricing" : "Xem bảng giá & quy trình",
              icon: <FaRocket style={{ color: '#6d3fc9' }} size={22} />,
              bg: '#ede5fb',
              accent: '#6d3fc9',
            },
            {
              title: isEn ? "Production Projects Showcase" : "Showcase Dự Án Thực Chiến (28+ Projects)",
              badge: isEn ? "Production Code" : "Sản phẩm thực tế",
              desc: isEn ? "Explore live marketplace biensovip.com, ThreadLearn AI, The MC Hub, and full-stack software architectures." : "Khám phá sàn giao dịch biensovip.com, hệ thống AI ThreadLearn, The MC Hub và kiến trúc phần mềm chuẩn production.",
              path: "/projects",
              cta: isEn ? "View All Projects" : "Khám phá danh mục dự án",
              icon: <FaLaptopCode style={{ color: '#0d9488' }} size={22} />,
              bg: '#ccfbf1',
              accent: '#0d9488',
            },
            {
              title: isEn ? "Engineering Deep-Dives (Blog)" : "Bài Viết Phân Tích Kỹ Thuật (Blog)",
              badge: isEn ? "Tech Writing" : "Góc kỹ thuật",
              desc: isEn ? "In-depth case studies: PostgreSQL multi-filter query optimization under 8ms, Java 21 multithreading, and AI Agents." : "Phân tích case study thực tế: Tối ưu CSDL PostgreSQL từ 350ms xuống 8ms, lập trình đa luồng Java 21, tích hợp AI.",
              path: "/blog",
              cta: isEn ? "Read Tech Articles" : "Đọc các bài viết kỹ thuật",
              icon: <FaNewspaper style={{ color: '#2563eb' }} size={22} />,
              bg: '#dbeafe',
              accent: '#2563eb',
            },
            {
              title: isEn ? "Honors & Credentials" : "Hồ Sơ Giải Thưởng & Thành Tựu",
              badge: isEn ? "Champion 2026" : "Quán quân 2026",
              desc: isEn ? "Computer Vision Hackathon Champion 2026, Top 5 National ResFes, verified certifications, and leadership roles." : "Quán quân Hackathon Computer Vision 2026, Top 5 ResFes Toàn Quốc, chứng chỉ công nghệ và hoạt động cộng đồng.",
              path: "/achievements",
              cta: isEn ? "View Honors & Certificates" : "Xem giải thưởng & chứng chỉ",
              icon: <FaTrophy style={{ color: '#d97706' }} size={22} />,
              bg: '#fef3c7',
              accent: '#d97706',
            },
            {
              title: isEn ? "Direct Consultation & Contact" : "Đặt Lịch Trao Đổi 1-1 Với Tech Lead",
              badge: isEn ? "<24h Response" : "Phản hồi <24h",
              desc: isEn ? "Have a project or technical challenge? Let's discuss architecture, feasibility, and get a precise quote." : "Bạn có dự án hoặc bài toán kỹ thuật cần giải quyết? Trao đổi trực tiếp giải pháp và nhận báo giá chi tiết trong 24 giờ.",
              path: "/contact",
              cta: isEn ? "Get In Touch Now" : "Gửi thông điệp ngay",
              icon: <FaEnvelope style={{ color: '#db2777' }} size={22} />,
              bg: '#fce7f3',
              accent: '#db2777',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = item.accent; e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.09)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: item.accent }} />
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '4px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <span style={{
                    padding: '3px 10px', borderRadius: '50px',
                    fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
                    letterSpacing: '0.4px', textTransform: 'uppercase',
                    backgroundColor: item.bg, color: item.accent, fontWeight: '600',
                  }}>
                    {item.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#000000', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.6', color: '#555555', margin: '0 0 20px 0' }}>
                  {item.desc}
                </p>
              </div>

              <Link
                to={item.path}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontSize: '13.5px', fontWeight: '600',
                  color: item.accent, textDecoration: 'none',
                  marginTop: 'auto',
                }}
              >
                <span>{item.cta}</span>
                <FaArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── IMAGE SLIDER ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '20px' }}>
          {t('about.galleryLabel')}
        </p>
        <ImageSlider />
      </motion.div>
    </div>
  );
};

export default About;
