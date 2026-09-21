import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaInbox } from 'react-icons/fa';
import { skillTaxonomy } from '../../data';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import SkillChart from './SkillChart';
import { default as ReactMarkdown } from 'react-markdown';
import useSpotlight from '../../hooks/useSpotlight';
import '../../animations/SpotlightCard.css';
import { useTranslation } from 'react-i18next';
import TechIcon from '../../common/TechIcon';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
const STATUS_COLORS = {
  'Active':         { bg: '#c8e6cd', color: '#000000' },
  'In Development': { bg: '#dceeb1', color: '#000000' },
  'Completed':      { bg: '#e6e6e6', color: '#000000' },
};

const CATEGORY_COLORS = {
  'fullstack':   '#c5b0f4',
  'ecommerce':   '#c8e6cd',
  'ai':          '#cde6f4',
  'frontend':    '#efd4d4',
  'automation':  '#f4ecd6',
  'lowcode':     '#dceeb1',
  'ngo':         '#f3c9b6',
};

const STATUS_KEY = { 'Active': 'active', 'In Development': 'inDevelopment', 'Completed': 'completed' };

const ProjectCard = ({ project, onClick, index, t, featured = false }) => {
  const status = STATUS_COLORS[project.status] || { bg: '#f7f7f5', color: '#000000' };
  const spotlight = useSpotlight();

  return (
    <motion.div
      ref={spotlight.ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={featured ? 'card-spotlight bento-featured' : 'card-spotlight'}
      style={{
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        backgroundColor: 'var(--color-card-bg)',
        border: featured ? '2px solid transparent' : '1px solid var(--color-card-border)',
        backgroundImage: featured
          ? 'linear-gradient(var(--color-card-bg), var(--color-card-bg)), linear-gradient(120deg, #ff8a3d, #c5b0f4, #6d3fc9)'
          : undefined,
        backgroundOrigin: featured ? 'border-box' : undefined,
        backgroundClip: featured ? 'padding-box, border-box' : undefined,
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        gridColumn: featured ? 'span 2' : undefined,
        boxShadow: featured ? '0 12px 40px rgba(109,63,201,0.18)' : 'var(--shadow-soft)',
      }}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={e => {
        if (!featured) e.currentTarget.style.borderColor = 'var(--color-ink)';
        e.currentTarget.style.boxShadow = featured ? '0 16px 48px rgba(109,63,201,0.28)' : 'var(--shadow-hover)';
      }}
      onMouseLeave={e => {
        if (!featured) e.currentTarget.style.borderColor = 'var(--color-card-border)';
        e.currentTarget.style.boxShadow = featured ? '0 12px 40px rgba(109,63,201,0.18)' : 'var(--shadow-soft)';
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-soft)',
        ...(featured
          ? { width: '46%', flexShrink: 0 }
          : { aspectRatio: '16/10' }),
      }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          padding: '4px 12px',
          borderRadius: '50px',
          fontSize: '11px',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: '500',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          backgroundColor: status.bg,
          color: status.color,
        }}>
          {STATUS_KEY[project.status] ? t(`projects.statuses.${STATUS_KEY[project.status]}`) : project.status}
        </div>
        {featured && (
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            padding: '4px 14px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '600',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            backgroundImage: 'linear-gradient(120deg, #ff8a3d, #6d3fc9)',
            color: '#ffffff',
            boxShadow: '0 2px 10px rgba(109,63,201,0.4)',
          }}>
            ★ {t('projects.liveClientProject', 'Live Client Project')}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: featured ? '28px' : '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: featured ? 'center' : 'flex-start' }}>
        {/* Category + primary tech tag */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {project.category && (
            <span style={{
              padding: '3px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: '#000000',
              backgroundColor: CATEGORY_COLORS[project.category] || 'var(--color-surface-soft)',
              width: 'fit-content',
            }}>
              {t(`projects.categories.${project.category}`, project.category)}
            </span>
          )}
          {project.techStack?.[0] && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 10px',
              borderRadius: '50px',
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-hairline)',
              width: 'fit-content',
            }}>
              <TechIcon tech={project.techStack[0]} size={11} />
              {project.techStack[0]}
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: 'Outfit, system-ui, sans-serif',
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '1.35',
          letterSpacing: '-0.015em',
          color: 'var(--color-ink)',
          margin: '0 0 8px 0',
        }}>
          {project.title}
        </h3>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaUser size={11} /> {project.role}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaCalendarAlt size={11} /> {project.duration}
          </span>
        </div>

        <div style={{
          fontSize: '14.5px',
          fontWeight: '350',
          lineHeight: '1.6',
          color: 'var(--color-ink-soft)',
          marginBottom: '20px',
          flex: 1,
          maxHeight: '4.65em',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <ReactMarkdown components={{ p: ({ children }) => <span style={{ display: 'block' }}>{children}</span> }}>{project.description}</ReactMarkdown>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button
            onClick={() => onClick(project)}
            style={{
              flex: 1,
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: '550',
              color: 'var(--color-canvas)',
              backgroundColor: 'var(--color-ink)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t('projects.viewDetails')}
          </button>
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-hairline)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-hairline)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={e => e.stopPropagation()}
            >
              <FaGithub size={16} />
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Project Website"
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-hairline)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-hairline)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={e => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { projects } = useTranslatedData();

  const statusOptions = [
    { value: 'all',            label: t('projects.filterAll'),          count: projects.length },
    { value: 'Active',         label: t('projects.filterActive'),        count: projects.filter(p => p.status === 'Active').length },
    { value: 'In Development', label: t('projects.filterInDev'), count: projects.filter(p => p.status === 'In Development').length },
    { value: 'Completed',      label: t('projects.filterCompleted'),     count: projects.filter(p => p.status === 'Completed').length },
  ];

  const categoryKeys = [...new Set(projects.map(p => p.category).filter(Boolean))];
  const categoryOptions = [
    { value: 'all', label: t('projects.filterAllCategories') },
    ...categoryKeys.map(k => ({
      value: k,
      label: t(`projects.categories.${k}`),
      count: projects.filter(p => p.category === k).length,
    })),
  ];

  const skillProjectIds = selectedSkill
    ? new Set(skillTaxonomy.find(s => s.id === selectedSkill)?.projectIds || [])
    : null;

  const FEATURED_PROJECT_ID = 26; // Biensovip — real freelance client project, live in production
  const isUnfiltered = filter === 'all' && selectedCategory === 'all' && !selectedSkill;

  const filteredProjects = projects
    .filter(p => filter === 'all' || p.status === filter)
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => !skillProjectIds || skillProjectIds.has(p.id))
    .sort((a, b) => {
      if (!isUnfiltered) return 0;
      if (a.id === FEATURED_PROJECT_ID) return -1;
      if (b.id === FEATURED_PROJECT_ID) return 1;
      return a.tier - b.tier;
    });

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

      {/* Terminal prompt */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
          color: '#888888', marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}
      >
        <span style={{ color: '#1ea64a' }}>$</span>
        <span style={{ color: '#000000' }}>ls -la ./projects/</span>
        <span style={{ color: '#aaaaaa', marginLeft: '8px' }}>→ {projects.length} repos found</span>
      </motion.div>

      {/* Filter — pill tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ marginBottom: '48px' }}
      >
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {statusOptions.map((opt) => (
              <TabsTrigger
                key={opt.value}
                value={opt.value}
                count={opt.count}
                data-testid={`project-filter-${opt.value.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {opt.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Category filter — pill tabs, AND with status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ marginBottom: '24px' }}
      >
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categoryOptions.map((opt) => (
              <TabsTrigger
                key={opt.value}
                value={opt.value}
                count={opt.count}
                data-testid={`project-category-${opt.value.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {opt.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      <SkillChart selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />

      {/* Grid — the first project gets a wider "bento" tile when unfiltered */}
      {filteredProjects.length > 0 ? (
        <div className="projects-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={p => navigate(`/projects/${p.id}`)}
              index={i}
              t={t}
              featured={isUnfiltered && i === 0}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)' }}>
          <FaInbox size={32} aria-hidden="true" style={{ marginBottom: '12px', opacity: 0.4 }} />
          <div>{t('projects.noResults')}</div>
        </div>
      )}
    </div>
  );
};

export default Projects;
