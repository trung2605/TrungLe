import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaUser, FaTags, FaTimes } from 'react-icons/fa';
import { projects } from '../../data';
import { default as ReactMarkdown } from 'react-markdown';
const STATUS_COLORS = {
  'Active':         { bg: '#c8e6cd', color: '#000000' },
  'In Development': { bg: '#dceeb1', color: '#000000' },
  'Completed':      { bg: '#e6e6e6', color: '#000000' },
};

const ProjectCard = ({ project, onClick, index }) => {
  const status = STATUS_COLORS[project.status] || { bg: '#f7f7f5', color: '#000000' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: '1px solid #e6e6e6',
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#000000';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#e6e6e6';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
        <img
          src={project.image}
          alt={project.title}
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
          fontWeight: '400',
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          backgroundColor: status.bg,
          color: status.color,
        }}>
          {project.status}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Primary tech tag */}
        {project.techStack?.[0] && (
          <span style={{
            display: 'inline-block',
            padding: '3px 10px',
            borderRadius: '50px',
            fontSize: '11px',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            color: '#000000',
            backgroundColor: '#f7f7f5',
            border: '1px solid #e6e6e6',
            marginBottom: '12px',
            width: 'fit-content',
          }}>
            {project.techStack[0]}
          </span>
        )}

        <h3 style={{
          fontSize: '20px',
          fontWeight: '540',
          lineHeight: '1.35',
          letterSpacing: '-0.2px',
          color: '#000000',
          margin: '0 0 8px 0',
        }}>
          {project.title}
        </h3>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', color: '#666666', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaUser size={11} /> {project.role}
          </span>
          <span style={{ fontSize: '13px', color: '#666666', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FaCalendarAlt size={11} /> {project.duration}
          </span>
        </div>

        <div style={{
          fontSize: '15px',
          fontWeight: '330',
          lineHeight: '1.55',
          color: '#555555',
          marginBottom: '20px',
          flex: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button
            onClick={() => onClick(project)}
            style={{
              flex: 1,
              padding: '10px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '480',
              color: '#ffffff',
              backgroundColor: '#000000',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
          >
            View Details
          </button>
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#f7f7f5',
                color: '#000000',
                border: '1px solid #e6e6e6',
                transition: 'background-color 0.15s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6e6e6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
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
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '9999px',
                backgroundColor: '#f7f7f5',
                color: '#000000',
                border: '1px solid #e6e6e6',
                transition: 'background-color 0.15s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6e6e6'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
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
  const [selectedProject, setSelectedProject] = useState(null);

  const statusOptions = [
    { value: 'all',            label: 'All',          count: projects.length },
    { value: 'Active',         label: 'Active',        count: projects.filter(p => p.status === 'Active').length },
    { value: 'In Development', label: 'In Development', count: projects.filter(p => p.status === 'In Development').length },
    { value: 'Completed',      label: 'Completed',     count: projects.filter(p => p.status === 'Completed').length },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.status === filter);

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

      {/* Filter — pill tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}
      >
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '50px',
              fontSize: '15px',
              fontWeight: filter === opt.value ? '480' : '400',
              color: filter === opt.value ? '#ffffff' : '#000000',
              backgroundColor: filter === opt.value ? '#000000' : '#ffffff',
              border: '1.5px solid',
              borderColor: filter === opt.value ? '#000000' : '#e6e6e6',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {opt.label}
            <span style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              padding: '1px 6px',
              borderRadius: '50px',
              backgroundColor: filter === opt.value ? 'rgba(255,255,255,0.2)' : '#f7f7f5',
              color: filter === opt.value ? '#ffffff' : '#666666',
            }}>
              {opt.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} onClick={setSelectedProject} index={i} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                maxWidth: '860px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal image */}
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden', borderRadius: '24px 24px 0 0', backgroundColor: '#f7f7f5' }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute', top: '16px', right: '16px',
                    width: '36px', height: '36px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  <FaTimes />
                </button>
                <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '540', color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
                    {selectedProject.title}
                  </h2>
                  <span style={{
                    display: 'inline-block', marginTop: '8px',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    backgroundColor: (STATUS_COLORS[selectedProject.status] || {}).bg || '#e6e6e6',
                    color: '#000000',
                  }}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Modal body */}
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px' }}
                  className="block md:grid"
                >
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '540', color: '#000000', marginBottom: '12px' }}>About</h3>
                    <div style={{ fontSize: '16px', fontWeight: '330', lineHeight: '1.6', color: '#444444' }}>
                      <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
                    </div>
                  </div>
                  <div style={{ minWidth: '180px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f7f7f5', borderRadius: '12px', marginBottom: '12px' }}>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#666666', marginBottom: '6px' }}>Role</p>
                      <p style={{ fontSize: '14px', fontWeight: '400', color: '#000000', margin: 0 }}>{selectedProject.role}</p>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#f7f7f5', borderRadius: '12px' }}>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#666666', marginBottom: '6px' }}>Timeline</p>
                      <p style={{ fontSize: '14px', fontWeight: '400', color: '#000000', margin: 0 }}>{selectedProject.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Tech stack */}
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e6e6e6' }}>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaTags size={10} /> Tech Stack
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} style={{
                        padding: '6px 14px',
                        borderRadius: '50px',
                        fontSize: '13px',
                        fontWeight: '400',
                        color: '#000000',
                        backgroundColor: '#f7f7f5',
                        border: '1px solid #e6e6e6',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA row */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e6e6e6', flexWrap: 'wrap' }}>
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: '480',
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
                    >
                      <FaGithub size={15} /> View Source
                    </a>
                  )}
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: '480',
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid #e6e6e6',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                      <FaExternalLinkAlt size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
