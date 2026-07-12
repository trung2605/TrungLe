import { motion } from "framer-motion";
import { stats } from "../../data";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";
import { FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import BlurText from "../../animations/BlurText";
import DecryptedText from "../../animations/DecryptedText";
import TechIcon from "../../common/TechIcon";

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const STATUS_STYLE = {
  'Current':   { bg: '#c8e6cd', color: '#000000' },
  'Completed': { bg: '#e6e6e6', color: '#000000' },
};

const About = () => {
  const { t } = useTranslation();
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
        <span style={{ color: '#888888', marginLeft: '16px' }}>{'/* Initialized 2002 · Running in Da Nang, VN */'}</span>
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
            <Markdown>{personalInfo.story?.content || personalInfo.bio}</Markdown>
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
                  backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length],
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
