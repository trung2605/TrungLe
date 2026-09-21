import { useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaTags, FaArrowLeft, FaRocket, FaNewspaper, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import TechIcon from '../../common/TechIcon';

const STATUS_COLORS = {
  'Active':         { bg: '#c8e6cd', color: '#000000' },
  'In Development': { bg: '#dceeb1', color: '#000000' },
  'Completed':      { bg: '#e6e6e6', color: '#000000' },
};

const STATUS_KEY = { 'Active': 'active', 'In Development': 'inDevelopment', 'Completed': 'completed' };

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { projects, posts = [] } = useTranslatedData();
  const project = projects.find(p => String(p.id) === id);

  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroSpring = { stiffness: 200, damping: 30 };
  const heroImgY = useSpring(useTransform(heroScroll, [0, 1], [0, prefersReducedMotion ? 0 : 60]), heroSpring);

  const relatedPosts = (posts || []).filter(pItem => {
    if (!project) return false;
    if (project.id === 26 && pItem.slug?.includes('biensovip')) return true;
    if (pItem.relatedProjectId && String(pItem.relatedProjectId) === String(project.id)) return true;
    const itemTags = pItem.tags || [];
    const projTechs = (project.tags || []).concat(project.technologies || []);
    return itemTags.some(t => projTechs.some(pt => pt.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(pt.toLowerCase())));
  });

  if (!project) {
    return (
      <div style={{ paddingTop: '64px', paddingBottom: '96px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', color: '#888888', marginBottom: '24px' }}>{t('projects.notFound')}</p>
        <button
          onClick={() => navigate('/projects')}
          style={{ padding: '10px 24px', borderRadius: '50px', border: '1.5px solid #000000', background: '#000000', color: '#fff', cursor: 'pointer', fontSize: '15px' }}
        >
          {t('projects.backToProjects')}
        </button>
      </div>
    );
  }

  const status = STATUS_COLORS[project.status] || { bg: '#f7f7f5', color: '#000000' };
  const accentColor = BLOCK_COLORS[(project.id - 1) % BLOCK_COLORS.length];

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>

      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: '40px' }}
      >
        <Link
          to="/projects"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 18px',
            borderRadius: '50px',
            border: '1.5px solid #e6e6e6',
            fontSize: '14px', fontWeight: '400', color: '#000000',
            backgroundColor: '#ffffff',
            textDecoration: 'none',
            transition: 'border-color 0.15s ease, background-color 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.backgroundColor = '#f7f7f5'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
        >
          <FaArrowLeft size={12} /> {t('projects.backToProjects')}
        </Link>
      </motion.div>

      {/* Hero image */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          backgroundColor: '#f7f7f5',
          marginBottom: '48px',
          aspectRatio: '21/9',
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '112%', objectFit: 'cover', y: heroImgY }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
        }} />

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: '24px', right: '24px',
          padding: '5px 14px', borderRadius: '50px',
          fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.4px', textTransform: 'uppercase',
          backgroundColor: status.bg, color: status.color,
        }}>
          {STATUS_KEY[project.status] ? t(`projects.statuses.${STATUS_KEY[project.status]}`) : project.status}
        </div>

        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: '32px', left: '36px', right: '36px' }}>
          <h1 style={{
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontSize: 'clamp(24px, 4vw, 52px)',
            fontWeight: '540',
            lineHeight: '1.1',
            letterSpacing: '-0.8px',
            color: '#ffffff',
            margin: 0,
          }}>
            {project.title}
          </h1>
        </div>

        {/* Accent line at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: accentColor }} />
      </motion.div>

      {/* Main content grid */}
      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }}>

        {/* Left: description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '540', color: '#000000', marginBottom: '16px', marginTop: 0 }}>{t('projects.aboutProject')}</h2>
          <div style={{
            fontSize: '16px', fontWeight: '330', lineHeight: '1.75',
            color: '#444444',
          }}>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>

          {/* Challenge */}
          {project.challenge && (
            <div style={{ marginTop: '32px', padding: '20px 24px', backgroundColor: accentColor, borderRadius: '16px' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                letterSpacing: '0.5px', textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.55)', marginBottom: '8px',
              }}>
                {t('projects.challenge')}
              </p>
              <p style={{ fontSize: '15px', fontWeight: '400', lineHeight: '1.6', color: '#000000', margin: 0 }}>
                {project.challenge}
              </p>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                letterSpacing: '0.5px', textTransform: 'uppercase',
                color: '#888888', marginBottom: '16px',
              }}>
                {t('projects.highlights')}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px', lineHeight: '1.6', color: '#444444' }}>
                    <span style={{ color: accentColor, filter: 'brightness(0.6)', flexShrink: 0 }}>●</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Screenshots gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #e6e6e6' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                letterSpacing: '0.5px', textTransform: 'uppercase',
                color: '#888888', marginBottom: '16px',
              }}>
                {t('projects.gallery')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {project.screenshots.map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e6e6e6' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tech stack */}
          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #e6e6e6' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: '#888888', marginBottom: '16px',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <FaTags size={10} /> {t('projects.techStack')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '6px 16px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '400',
                    color: '#000000',
                    backgroundColor: i === 0 ? accentColor : '#f7f7f5',
                    border: '1px solid',
                    borderColor: i === 0 ? 'transparent' : '#e6e6e6',
                  }}
                >
                  <TechIcon tech={tech} size={13} />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA links */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #e6e6e6', flexWrap: 'wrap' }}>
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 28px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: '480',
                  color: '#ffffff', backgroundColor: '#000000',
                  textDecoration: 'none', transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
              >
                <FaGithub size={15} /> {t('projects.viewSource')}
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 28px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: '480',
                  color: '#000000', backgroundColor: '#ffffff',
                  border: '1.5px solid #e6e6e6',
                  textDecoration: 'none', transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <FaExternalLinkAlt size={13} /> {t('projects.liveDemo')}
              </a>
            )}
          </div>
        </motion.div>

        {/* Right: sidebar info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          {/* Role */}
          <div style={{ backgroundColor: '#f7f7f5', borderRadius: '16px', padding: '20px' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: '#888888', marginBottom: '8px', margin: '0 0 8px 0',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <FaUser size={9} /> {t('projects.role')}
            </p>
            <p style={{ fontSize: '15px', fontWeight: '480', color: '#000000', margin: 0, lineHeight: '1.4' }}>
              {project.role}
            </p>
          </div>

          {/* Timeline */}
          <div style={{ backgroundColor: '#f7f7f5', borderRadius: '16px', padding: '20px' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: '#888888', margin: '0 0 8px 0',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <FaCalendarAlt size={9} /> {t('projects.timeline')}
            </p>
            <p style={{ fontSize: '15px', fontWeight: '480', color: '#000000', margin: 0 }}>
              {project.duration}
            </p>
          </div>

          {/* Status */}
          <div style={{ backgroundColor: status.bg, borderRadius: '16px', padding: '20px' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.5)', margin: '0 0 8px 0',
            }}>
              {t('projects.status')}
            </p>
            <p style={{ fontSize: '15px', fontWeight: '480', color: '#000000', margin: 0 }}>
              {STATUS_KEY[project.status] ? t(`projects.statuses.${STATUS_KEY[project.status]}`) : project.status}
            </p>
          </div>

          {/* Links */}
          {(project.githubUrl || (project.liveUrl && project.liveUrl !== '#')) ? (
            <div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#888888', display: 'block', marginBottom: '12px' }}>
                {t('projects.linksLabel')}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '14px', fontWeight: '400', color: '#000000',
                      textDecoration: 'none', padding: '8px 0',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <FaGithub size={14} /> {t('projects.githubRepo')}
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '14px', fontWeight: '400', color: '#000000',
                      textDecoration: 'none', padding: '8px 0',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    <FaExternalLinkAlt size={12} /> {t('projects.liveDemo')}
                  </a>
                )}
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* Related Engineering Deep-Dives from Blog */}
      {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: '56px',
            padding: '28px 32px',
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FaBookOpen style={{ color: '#6d3fc9' }} size={16} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#64748b', fontWeight: 600 }}>
              {isEn ? "Technical Deep-Dives & Architecture" : "Phân Tích Kiến Trúc Kỹ Thuật (Blog)"}
            </span>
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px 0' }}>
            {isEn ? "Read the engineering case studies behind this project:" : "Đọc các bài viết phân tích chuyên sâu về hệ thống này:"}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {relatedPosts.map(pItem => (
              <Link
                key={pItem.slug}
                to={`/blog/${pItem.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '18px 20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6d3fc9'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(109,63,201,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {pItem.tags?.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', padding: '2px 8px', borderRadius: '50px', backgroundColor: '#ede5fb', color: '#6d3fc9' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {pItem.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 14px 0', lineHeight: '1.5' }}>
                    {pItem.excerpt ? `${pItem.excerpt.slice(0, 110)}...` : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 600, color: '#6d3fc9', marginTop: 'auto' }}>
                  <span>{isEn ? "Read Article" : "Đọc Bài Viết"}</span>
                  <FaArrowRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cross-linking CTA to Services & Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: '40px',
          padding: '32px',
          borderRadius: '24px',
          backgroundColor: '#111827',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#dceeb1' }}>
          <FaRocket size={11} /> {isEn ? "Need a similar system?" : "Cần xây dựng hệ thống tương tự?"}
        </div>
        <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 600, margin: 0, lineHeight: '1.3' }}>
          {isEn
            ? "Looking to build a production-grade web or SaaS platform with proven scalability?"
            : "Bạn muốn sở hữu một hệ thống website / SaaS thương mại với độ hoàn thiện cao tương tự?"}
        </h3>
        <p style={{ fontSize: '15px', color: '#9ca3af', margin: 0, maxWidth: '680px', lineHeight: '1.6' }}>
          {isEn
            ? "Our 5-engineer team in Da Nang specializes in high-performance web systems, SaaS automation, and VietQR integration. Direct 1-on-1 collaboration with Tech Lead Lê Trí Trung."
            : "Đội ngũ 5 kỹ sư tại Đà Nẵng chuyên xây dựng Website thương mại, SaaS Automation và cổng VietQR tự động. Làm việc trực tiếp 1-1 với Tech Lead Lê Trí Trung, cam kết deadline và chất lượng production."}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
          <Link
            to="/dich-vu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: '#6d3fc9', color: '#ffffff',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span>{isEn ? "View Services & Manday Pricing" : "Xem Dịch Vụ & Báo Giá Manday"}</span>
            <FaArrowRight size={12} />
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
              fontSize: '14px', fontWeight: '500', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          >
            <span>{isEn ? "Direct 1-on-1 Consultation" : "Đặt Lịch Tư Vấn 1-1"}</span>
          </Link>
        </div>
      </motion.div>

      {/* Other projects */}
      <OtherProjects current={project} />
    </div>
  );
};

const OtherProjects = ({ current }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { projects } = useTranslatedData();
  const others = projects.filter(p => p.id !== current.id).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid #e6e6e6' }}
    >
      <p style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        color: '#888888', marginBottom: '28px',
      }}>
        {t('projects.otherProjects')}
      </p>
      <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {others.map((p, i) => {
          const s = STATUS_COLORS[p.status] || { bg: '#f7f7f5', color: '#000000' };
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/projects/${p.id}`)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '4px', backgroundColor: BLOCK_COLORS[(p.id - 1) % BLOCK_COLORS.length] }} />
              <div style={{ aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '50px',
                  fontSize: '10px', fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'uppercase', letterSpacing: '0.4px',
                  backgroundColor: s.bg, marginBottom: '8px',
                }}>
                  {STATUS_KEY[p.status] ? t(`projects.statuses.${STATUS_KEY[p.status]}`) : p.status}
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: '540', color: '#000000', margin: 0 }}>{p.title}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
