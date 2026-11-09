import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { STATUS_COLORS, STATUS_KEY, BLOCK_COLORS } from './projectDetailData';

const OtherProjects = ({ currentProjectId, allProjects }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const others = allProjects.filter((p) => String(p.id) !== String(currentProjectId)).slice(0, 3);

  if (others.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid var(--color-hairline)' }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '12px',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        color: 'var(--color-ink-soft)', marginBottom: '28px',
      }}>
        {t('projects.otherProjects')}
      </p>
      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {others.map((p) => {
          const s = STATUS_COLORS[p.status] || { bg: '#F5C242', color: '#18181B' };
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/projects/${p.id}`)}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1.5px solid var(--color-border-strong)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 4px 0px #18181B',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '6px 6px 0px #18181B'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0px #18181B'; }}
            >
              <div style={{ height: '6px', backgroundColor: BLOCK_COLORS[(p.id - 1) % BLOCK_COLORS.length], borderBottom: '1.5px solid #18181B' }} />
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: 'var(--color-surface-soft)', borderBottom: '1.5px solid #18181B' }}>
                <img 
                  src={p.image} 
                  alt={p.title} 
                  loading="lazy" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{
                  display: 'inline-block', padding: '3px 9px', borderRadius: '4px',
                  fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                  backgroundColor: s.bg, color: s.color, border: '1.5px solid #18181B', marginBottom: '8px', width: 'fit-content'
                }}>
                  {STATUS_KEY[p.status] ? t(`projects.statuses.${STATUS_KEY[p.status]}`) : p.status}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', margin: '0 0 14px 0', lineHeight: 1.35 }}>{p.title}</h3>
                
                {/* Quick Connect Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto', paddingTop: '10px', borderTop: '1.5px dashed var(--color-rule-line)' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/dich-vu');
                    }}
                    style={{
                      padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase',
                      color: 'var(--color-ink)', backgroundColor: 'var(--color-surface-soft)', border: '1.5px solid var(--color-border-strong)',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5C242'; e.currentTarget.style.color = '#18181B'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                  >
                    Dịch Vụ
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/contact');
                    }}
                    style={{
                      padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase',
                      color: 'var(--color-ink)', backgroundColor: 'var(--color-surface-soft)', border: '1.5px solid var(--color-border-strong)',
                      cursor: 'pointer', transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#B8E8D0'; e.currentTarget.style.color = '#18181B'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                  >
                    Liên Hệ
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OtherProjects;
