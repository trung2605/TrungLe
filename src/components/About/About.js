import { motion } from "framer-motion";
import { personalInfo, stats, highlights } from "../../data";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";
import { FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import BlurText from "../../animations/BlurText";
import DecryptedText from "../../animations/DecryptedText";

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const About = () => {
  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

      {/* ── STORY + INFO ── */}
      <div
        className="grid-2col"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '72px' }}
      >
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: '540', letterSpacing: '-0.26px', color: 'var(--color-ink)', marginBottom: '20px' }}>
            {personalInfo.story?.title || 'My Journey'}
          </h2>
          <div style={{ fontSize: '16px', fontWeight: '330', lineHeight: '1.7', color: 'var(--color-ink-soft)' }}>
            <Markdown>{personalInfo.story?.content || personalInfo.bio}</Markdown>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ backgroundColor: 'var(--color-surface-soft)', borderRadius: '24px', padding: '28px', alignSelf: 'start' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
            letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--color-ink-soft)', marginBottom: '20px',
          }}>Personal Info</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { icon: FaBirthdayCake, label: 'Date of Birth', value: personalInfo.contact?.birthday },
              { icon: FaMapMarkerAlt,  label: 'Location',     value: personalInfo.contact?.location },
              { icon: FaGraduationCap, label: 'Education',    value: 'FPT University' },
              { icon: FaBriefcase,     label: 'Specialization', value: 'Java Developer' },
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 36px', marginBottom: '72px' }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#444444', marginBottom: '28px' }}>
            At a glance
          </p>
          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '24px' }}
          >
            {stats.slice(0, 4).map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: '340', lineHeight: '1.0', letterSpacing: '-0.8px', color: '#000000' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: '#444444', marginTop: '6px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── HIGHLIGHTS ── */}
      {highlights && highlights.length > 0 && (
        <section style={{ marginBottom: '72px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
              Highlights
            </p>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: '340', lineHeight: '1.10', letterSpacing: '-0.72px', color: '#000000', margin: 0 }}>
              <BlurText text="What makes me me" delay={40} animateBy="words" direction="bottom" className="inline" />
            </h2>
          </motion.div>
          <div
            className="grid-2col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length],
                  borderRadius: '20px', padding: '24px',
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ fontSize: '26px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.6', color: '#333333', margin: 0 }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── IMAGE SLIDER ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#666666', marginBottom: '20px' }}>
          Gallery
        </p>
        <ImageSlider />
      </motion.div>
    </div>
  );
};

export default About;
