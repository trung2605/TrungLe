import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaInbox, FaRocket, FaNewspaper, FaArrowRight, FaCheckCircle, FaSearch } from 'react-icons/fa';
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
  'Active':         { bg: '#22C55E', color: '#FFFFFF' },
  'In Development': { bg: '#F5C242', color: '#18181B' },
  'Completed':      { bg: '#1D4ED8', color: '#FFFFFF' },
};

const CATEGORY_COLORS = {
  'fullstack':   '#F5C242',
  'ecommerce':   '#B8E8D0',
  'ai':          '#2563EB',
  'frontend':    '#EC4899',
  'automation':  '#F7E49A',
  'lowcode':     '#22C55E',
  'ngo':         '#EF4444',
};

const STATUS_KEY = { 'Active': 'active', 'In Development': 'inDevelopment', 'Completed': 'completed' };

const ProjectCard = ({ project, onClick, index, t, featured = false }) => {
  const navigate = useNavigate();
  const status = STATUS_COLORS[project.status] || { bg: '#FAF8F3', color: '#18181B' };
  const spotlight = useSpotlight();
  const folderCode = `PROJECT ${String(index + 1).padStart(2, '0')}`;

  const handleCardClick = (e) => {
    // If the click came from an interactive element like a button or link, let that element handle it
    if (e.target.closest('a') || e.target.closest('button')) return;
    onClick(project);
  };

  return (
    <motion.div
      ref={spotlight.ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className={featured ? 'card-spotlight bento-featured' : 'card-spotlight'}
      style={{
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        backgroundColor: featured ? '#18181B' : 'var(--color-card-bg)',
        color: featured ? '#FFFFFF' : 'var(--color-ink)',
        border: '2px solid #18181B',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        gridColumn: featured ? 'span 2' : undefined,
        boxShadow: featured ? '6px 6px 0px #F5C242' : '4px 4px 0px #18181B',
        position: 'relative',
      }}
      onMouseMove={spotlight.onMouseMove}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = featured ? '8px 8px 0px #F5C242' : '6px 6px 0px #18181B';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = featured ? '6px 6px 0px #F5C242' : '4px 4px 0px #18181B';
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface-soft)',
        borderBottom: featured ? 'none' : '1.5px solid #18181B',
        borderRight: featured ? '2px solid #3F3F46' : 'none',
        ...(featured
          ? { width: '46%', flexShrink: 0 }
          : { aspectRatio: '16/10' }),
      }}>
        {/* Top Folder Code Strip */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px', zIndex: 3,
          padding: '3px 10px',
          backgroundColor: featured ? '#1D4ED8' : '#18181B',
          color: '#FFFFFF',
          border: '1.5px solid #18181B',
          borderRadius: '4px',
          fontFamily: 'var(--font-mono)',
          fontSize: '10.5px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.35)',
        }}>
          • {folderCode}
        </div>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Hover quick preview hint */}
        <div 
          className="project-thumb-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(24, 24, 27, 0.55)',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#18181B',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.4px',
            transition: 'opacity 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '4px',
            backgroundColor: '#F5C242',
            color: '#18181B',
            border: '1.5px solid #18181B',
            boxShadow: '3px 3px 0px #18181B'
          }}>
            <FaSearch size={11} />
            {t('projects.viewDetails', 'Xem Chi Tiết...')}
          </span>
        </div>
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 3,
          padding: '3px 10px',
          borderRadius: '4px',
          fontSize: '10.5px',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          backgroundColor: status.bg,
          color: status.color,
          border: '1.5px solid #18181B',
          boxShadow: '2px 2px 0px #18181B',
        }}>
          {STATUS_KEY[project.status] ? t(`projects.statuses.${STATUS_KEY[project.status]}`) : project.status}
        </div>
        {featured && (
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px', zIndex: 3,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '10.5px',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            backgroundColor: '#F5C242',
            color: '#18181B',
            border: '1.5px solid #18181B',
            boxShadow: '2px 2px 0px #18181B',
          }}>
            <FaCheckCircle size={10} style={{ marginRight: '6px', display: 'inline' }} />
            {t('projects.liveClientProject', 'Live Client Project')}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: featured ? '28px' : '22px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: featured ? 'center' : 'flex-start' }}>
        {/* Category + primary tech tag */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {project.category && (
            <span style={{
              padding: '3px 9px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: ['ai', 'ngo'].includes(project.category) ? '#FFFFFF' : '#18181B',
              backgroundColor: CATEGORY_COLORS[project.category] || '#F5C242',
              border: '1.5px solid #18181B',
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
              padding: '3px 9px',
              borderRadius: '4px',
              fontSize: '10.5px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: featured ? '#FFFFFF' : 'var(--color-ink)',
              backgroundColor: featured ? 'rgba(255,255,255,0.12)' : 'var(--color-surface-soft)',
              border: featured ? '1px solid rgba(255,255,255,0.28)' : '1.5px solid var(--color-border-strong)',
              width: 'fit-content',
            }}>
              <TechIcon tech={project.techStack[0]} size={11} />
              {project.techStack[0]}
            </span>
          )}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: featured ? '24px' : '19px',
          fontWeight: 700,
          lineHeight: '1.3',
          letterSpacing: '-0.02em',
          color: featured ? '#FFFFFF' : 'var(--color-ink)',
          margin: '0 0 8px 0',
        }}>
          {project.title}
        </h3>

        <div style={{ display: 'flex', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: featured ? '#D4D4D8' : 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaUser size={10} /> {project.role}
          </span>
          <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: featured ? '#D4D4D8' : 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaCalendarAlt size={10} /> {project.duration}
          </span>
        </div>

        <div style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '1.6',
          color: featured ? '#D4D4D8' : 'var(--color-ink-soft)',
          marginBottom: '20px',
          flex: 1,
          maxHeight: '4.65em',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <ReactMarkdown components={{ p: ({ children }) => <span style={{ display: 'block' }}>{children}</span> }}>{project.description}</ReactMarkdown>
        </div>

        {/* Action Buttons: Chi Tiết + Dịch Vụ + Liên Hệ + Source / Live */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          {/* Main Action Bar */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(project);
              }}
              style={{
                flex: 1,
                padding: '9px 14px',
                borderRadius: '5px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: featured ? '#18181B' : 'var(--color-canvas)',
                backgroundColor: featured ? '#F5C242' : '#18181B',
                border: '1.5px solid #18181B',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #18181B',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span>{t('projects.viewDetails')}</span>
              <FaArrowRight size={10} />
            </button>

            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#FFFFFF',
                  color: '#18181B',
                  border: '1.5px solid #18181B',
                  boxShadow: '2px 2px 0px #18181B',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F5C242'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.transform = 'translateY(0)'; }}
                onClick={e => e.stopPropagation()}
              >
                <FaGithub size={14} />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Project Website"
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#22C55E',
                  color: '#FFFFFF',
                  border: '1.5px solid #18181B',
                  boxShadow: '2px 2px 0px #18181B',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                onClick={e => e.stopPropagation()}
              >
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>

          {/* Quick Connect Row: Dịch Vụ & Liên Hệ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '4px' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/dich-vu');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: featured ? '#FFFFFF' : 'var(--color-ink)',
                backgroundColor: featured ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-soft)',
                border: featured ? '1px solid rgba(255,255,255,0.25)' : '1.5px solid var(--color-border-strong)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.backgroundColor = '#F5C242'; 
                e.currentTarget.style.color = '#18181B';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.backgroundColor = featured ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-soft)'; 
                e.currentTarget.style.color = featured ? '#FFFFFF' : 'var(--color-ink)';
              }}
            >
              <FaRocket size={10} style={{ color: '#EF4444' }} />
              <span>Dịch Vụ</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate('/contact');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: featured ? '#FFFFFF' : 'var(--color-ink)',
                backgroundColor: featured ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-soft)',
                border: featured ? '1px solid rgba(255,255,255,0.25)' : '1.5px solid var(--color-border-strong)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.backgroundColor = '#B8E8D0'; 
                e.currentTarget.style.color = '#18181B';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.backgroundColor = featured ? 'rgba(255,255,255,0.1)' : 'var(--color-surface-soft)'; 
                e.currentTarget.style.color = featured ? '#FFFFFF' : 'var(--color-ink)';
              }}
            >
              <FaUser size={10} style={{ color: '#2563EB' }} />
              <span>Liên Hệ</span>
            </button>
          </div>
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
        <div className="projects-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
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

      {/* Cross-linking Banner to Services & Blog */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          marginTop: '64px',
          padding: '36px 32px',
          borderRadius: '8px',
          backgroundColor: '#F5C242',
          border: '2px solid #18181B',
          boxShadow: '6px 6px 0px #18181B',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '4px', backgroundColor: '#18181B', color: '#FFFFFF', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            <FaRocket size={11} style={{ color: '#F5C242' }} /> Team 5 Kỹ Sư Đà Nẵng
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 700, color: '#18181B', margin: '0 0 8px 0', lineHeight: '1.3' }}>
            Bạn muốn xây dựng một hệ thống Website thương mại hoặc ứng dụng SaaS chất lượng cao?
          </h3>
          <p style={{ fontSize: '15px', color: '#27272A', margin: 0, lineHeight: '1.6', fontWeight: 500 }}>
            Đội ngũ 5 kỹ sư công nghệ tại Đà Nẵng cung cấp dịch vụ phát triển website & SaaS trọn gói, tính giá theo Manday minh bạch, làm việc trực tiếp 1-1 với Tech Lead.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link
            to="/dich-vu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '6px',
              backgroundColor: '#18181B', color: '#FFFFFF',
              fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none',
              border: '1.5px solid #18181B',
              boxShadow: '3px 3px 0px rgba(0,0,0,0.35)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span>Xem Bảng Giá & Dịch Vụ</span>
            <FaArrowRight size={11} />
          </Link>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '6px',
              backgroundColor: '#FFFFFF', color: '#18181B',
              fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none',
              border: '1.5px solid #18181B',
              boxShadow: '3px 3px 0px #18181B',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <FaNewspaper size={12} />
            <span>Đọc Kỹ Thuật Blog</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
