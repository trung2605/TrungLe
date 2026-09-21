import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBriefcase, FaArrowRight, FaArrowLeft, FaFileDownload, FaComment, FaRedo } from 'react-icons/fa';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { recruiterRoles, skillTaxonomy, personalInfo } from '../../data';
import { useTranslatedData } from '../../hooks/useTranslatedData';

const zaloDigits = personalInfo.contact?.phone?.replace(/[^\d]/g, '').replace(/^0/, '84');
const zaloUrl = zaloDigits ? `https://zalo.me/${zaloDigits}` : null;

const chipStyle = (active) => ({
  padding: '10px 18px',
  borderRadius: '9999px',
  border: `1.5px solid ${active ? 'var(--color-ink)' : 'var(--color-hairline)'}`,
  backgroundColor: active ? 'var(--color-ink)' : 'var(--color-canvas)',
  color: active ? 'var(--color-canvas)' : 'var(--color-ink)',
  fontSize: '14px',
  fontWeight: active ? 540 : 400,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
});

// Matches projects against the chosen role (by category) and optionally-selected skills,
// then sorts by tier (impressive-first) and returns the top few.
const matchProjects = (allProjects, role, selectedSkillIds) => {
  const skillProjectIds = selectedSkillIds.length > 0
    ? new Set(selectedSkillIds.flatMap(id => skillTaxonomy.find(s => s.id === id)?.projectIds || []))
    : null;

  return allProjects
    .filter(p => role.categories.includes(p.category))
    .filter(p => !skillProjectIds || skillProjectIds.has(p.id))
    .sort((a, b) => a.tier - b.tier)
    .slice(0, 3);
};

const RecruiterMatch = ({ open, onOpenChange }) => {
  const { t } = useTranslation();
  const { projects, experience } = useTranslatedData();
  const [step, setStep] = useState(1);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  const selectedRole = recruiterRoles.find(r => r.id === selectedRoleId);

  const availableSkills = useMemo(() => {
    if (!selectedRole) return [];
    return skillTaxonomy.filter(s => selectedRole.skillIds.includes(s.id));
  }, [selectedRole]);

  const reset = () => {
    setStep(1);
    setSelectedRoleId(null);
    setSelectedSkillIds([]);
  };

  const handleClose = (next) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 250);
  };

  const toggleSkill = (id) => {
    setSelectedSkillIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const matchedProjects = selectedRole ? matchProjects(projects, selectedRole, selectedSkillIds) : [];
  const matchedExperience = selectedRole ? experience.find(e => e.id === selectedRole.experienceId) : null;

  return (
    <Dialog open={open} onOpenChange={handleClose} title={t('recruiterMatch.widgetLabel')} contentClassName="!max-w-[640px]">
      <div style={{ padding: '32px' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '8px' }}>
                {t('recruiterMatch.step1Of2')}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 540, color: 'var(--color-ink)', marginBottom: '8px' }}>{t('recruiterMatch.step1Title')}</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-ink-soft)', marginBottom: '24px' }}>{t('recruiterMatch.step1Desc')}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {recruiterRoles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => { setSelectedRoleId(role.id); setStep(2); }}
                    style={chipStyle(false)}
                  >
                    {t(`recruiterMatch.roles.${role.id}.label`)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedRole && (
            <motion.div key="step2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '8px' }}>
                {t('recruiterMatch.step2Of2')}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 540, color: 'var(--color-ink)', marginBottom: '8px' }}>{t('recruiterMatch.step2Title')}</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-ink-soft)', marginBottom: '24px' }}>{t('recruiterMatch.step2Desc')}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
                {availableSkills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    style={chipStyle(selectedSkillIds.includes(skill.id))}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="secondary" onClick={() => setStep(1)}>
                  <FaArrowLeft size={12} /> {t('recruiterMatch.back')}
                </Button>
                <Button variant="primary" onClick={() => setStep(3)} className="flex-1">
                  {selectedSkillIds.length > 0 ? t('recruiterMatch.seeMatch') : t('recruiterMatch.skip')} <FaArrowRight size={12} />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && selectedRole && (
            <motion.div key="step3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <FaBriefcase size={16} style={{ color: 'var(--color-ink)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--color-ink-soft)' }}>{t('recruiterMatch.resultGreeting')}</div>
                </div>
              </div>

              <h2 style={{ fontSize: '20px', fontWeight: 540, color: 'var(--color-ink)', marginBottom: '10px' }}>
                {t(`recruiterMatch.roles.${selectedRole.id}.label`)}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-ink)', marginBottom: '28px' }}>
                {t(`recruiterMatch.roles.${selectedRole.id}.blurb`)}
              </p>

              {matchedProjects.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '12px' }}>
                    {t('recruiterMatch.matchingProjects')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {matchedProjects.map(p => (
                      <a
                        key={p.id}
                        href={`/projects/${p.id}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '12px',
                          padding: '10px', borderRadius: '12px',
                          border: '1px solid var(--color-hairline)',
                          textDecoration: 'none', color: 'var(--color-ink)',
                        }}
                      >
                        <img src={p.image} alt={p.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '14px', fontWeight: 540 }}>{p.title}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.role}</div>
                        </div>
                        <FaArrowRight size={11} style={{ color: 'var(--color-ink-soft)', flexShrink: 0 }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {matchedExperience && (
                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '12px' }}>
                    {t('recruiterMatch.relevantExperience')}
                  </div>
                  <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'var(--color-surface-soft)' }}>
                    <div style={{ fontSize: '14px', fontWeight: 540, color: 'var(--color-ink)', marginBottom: '2px' }}>
                      {matchedExperience.role} · {matchedExperience.company}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-ink-soft)' }}>{matchedExperience.duration}</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <Button as="a" href={personalInfo.cv} download="Le_Tri_Trung_CV.pdf" variant="primary">
                  <FaFileDownload size={13} /> {t('recruiterMatch.downloadCV')}
                </Button>
                {zaloUrl && (
                  <Button as="a" href={zaloUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                    <FaComment size={13} /> {t('recruiterMatch.chatZalo')}
                  </Button>
                )}
                <Button variant="ghost" onClick={reset}>
                  <FaRedo size={12} /> {t('recruiterMatch.startOver')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
};

export default RecruiterMatch;
