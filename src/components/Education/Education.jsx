import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import MemoryGallery from './MemoryGallery';
import useSpotlight from '../../hooks/useSpotlight';
import '../../animations/SpotlightCard.css';
const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd'];

const EducationRow = ({ edu, index, isLast }) => {
  const spotlight = useSpotlight();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="edu-timeline-row"
      style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}
    >
      {/* Timeline indicator */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '9999px',
          backgroundColor: BLOCK_COLORS[index % BLOCK_COLORS.length],
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>
          <FaGraduationCap size={18} style={{ color: '#000000' }} />
        </div>
        {!isLast && (
          <div style={{ width: '1px', flex: 1, minHeight: '32px', backgroundColor: 'var(--color-hairline)', marginTop: '8px' }} />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={spotlight.ref}
        whileHover={{ y: -4 }}
        className="card-spotlight"
        style={{
          flex: 1, backgroundColor: '#ffffff',
          border: '1px solid #e6e6e6', borderRadius: '20px',
          padding: '24px 28px',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseMove={spotlight.onMouseMove}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: '540', letterSpacing: '-0.2px', color: '#000000', margin: '0 0 4px 0' }}>
              {edu.school}
            </h3>
            <p style={{ fontSize: '15px', fontWeight: '400', color: '#444444', margin: 0 }}>{edu.degree}</p>
          </div>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '50px',
            fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.4px', textTransform: 'uppercase',
            backgroundColor: edu.status === 'Current' ? '#c8e6cd' : '#f7f7f5',
            color: '#000000', border: '1px solid rgba(0,0,0,0.08)',
            flexShrink: 0,
          }}>
            {edu.status}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666666' }}>
            <FaCalendarAlt size={11} /> {edu.duration}
          </span>
          {edu.gpa && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666666' }}>
              <FaStar size={11} /> GPA: {edu.gpa}
            </span>
          )}
        </div>

        {edu.description && (
          <div style={{ fontSize: '14px', fontWeight: '330', lineHeight: '1.65', color: '#555555', borderTop: '1px solid #f1f1f1', paddingTop: '14px' }}>
            <Markdown>{edu.description}</Markdown>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const { t } = useTranslation();
  const { education } = useTranslatedData();
  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

      {/* Git log prompt */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
          marginBottom: '32px',
          padding: '10px 16px',
          backgroundColor: '#0d1117',
          borderRadius: '8px',
          color: '#e2e8f0',
          display: 'flex', gap: '16px', flexWrap: 'wrap',
        }}
      >
        <span style={{ color: '#1ea64a' }}>$</span>
        <span>git log --author="Le-Tri-Trung" --format="%s" --reverse</span>
      </motion.div>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '72px' }}>
        {education.map((edu, i) => (
          <EducationRow key={edu.id} edu={edu} index={i} isLast={i === education.length - 1} />
        ))}
      </div>

      {/* Campus Memories — CORAL BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: '#f3c9b6', borderRadius: '24px', padding: '40px 32px' }}
      >
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#444444', marginBottom: '10px' }}>
          {t('education.memoriesLabel')}
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 40px)', fontWeight: '340', lineHeight: '1.15', letterSpacing: '-0.5px', color: '#000000', marginBottom: '28px' }}>
          {t('education.memoriesTitle')}
        </h2>
        <MemoryGallery />
      </motion.div>
    </div>
  );
};

export default Education;
