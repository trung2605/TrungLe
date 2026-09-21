import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCodeBranch, 
  FaCalendarAlt, 
  FaStar, 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheckCircle, 
  FaLaptopCode, 
  FaGraduationCap, 
  FaGlobeAmericas, 
  FaRocket,
  FaCheck,
  FaCopy
} from 'react-icons/fa';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import MemoryGallery from './MemoryGallery';
import './Education.scss';

const BRANCH_CONFIG = {
  'main': {
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.35)',
    icon: FaRocket,
    category: 'startup'
  },
  'feature/enterprise-ojt': {
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.35)',
    icon: FaLaptopCode,
    category: 'enterprise'
  },
  'academic/cs-research': {
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.35)',
    icon: FaGraduationCap,
    category: 'academic'
  },
  'global/mobility-exchange': {
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.35)',
    icon: FaGlobeAmericas,
    category: 'global'
  },
  'foundation/stem-roots': {
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.35)',
    icon: FaStar,
    category: 'roots'
  }
};

const Education = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { education = [] } = useTranslatedData();

  const [selectedCommitId, setSelectedCommitId] = useState(education[0]?.id || 1);
  const [filterCategory, setFilterCategory] = useState('all');
  const [copiedSha, setCopiedSha] = useState(false);

  // Filter commits
  const filteredEducation = education.filter(item => {
    if (filterCategory === 'all') return true;
    const cfg = BRANCH_CONFIG[item.branch];
    return cfg?.category === filterCategory;
  });

  const activeEdu = education.find(e => e.id === selectedCommitId) || education[0];
  const activeIdx = education.findIndex(e => e.id === selectedCommitId);
  const activeCfg = BRANCH_CONFIG[activeEdu?.branch] || BRANCH_CONFIG['main'];

  const handleCopySha = (sha) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setSelectedCommitId(education[activeIdx - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIdx < education.length - 1) {
      setSelectedCommitId(education[activeIdx + 1].id);
    }
  };

  return (
    <div style={{ paddingTop: '28px', paddingBottom: '96px' }}>

      {/* SECTION INTRO */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 14px', borderRadius: '50px', backgroundColor: 'var(--color-neutral-subtle, #f0f0ee)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--color-ink-soft, #555555)', marginBottom: '12px' }}>
          <FaCodeBranch size={11} />
          {isEn ? "Interactive Milestone Pipeline" : "Lộ Trình Cột Mốc & Năng Lực"}
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: '600', letterSpacing: '-0.5px', margin: '0 0 10px 0', color: 'var(--color-ink, #000000)' }}>
          {isEn ? "Git Graph: Career & Academic Evolution" : "Hành Trình Kỹ Sư: Cấu Trúc Git Pipeline Tương Tác"}
        </h2>
        <p style={{ fontSize: '15.5px', color: 'var(--color-ink-soft, #555555)', margin: 0, maxWidth: '780px', lineHeight: '1.6' }}>
          {isEn
            ? "Inspect each milestone commit along our production-ready journey. Click any commit node or branch to inspect technical architecture, real-world impact, and tech stack evolution."
            : "Khám phá các cột mốc thực chiến qua sơ đồ nhánh Git tương tác. Bấm vào từng commit để xem chi tiết kiến trúc kỹ thuật, thành tựu thực tế và bước chuyển mình từ kỳ thực tập doanh nghiệp đến vị trí Tech Lead khởi nghiệp."}
        </p>
      </div>

      {/* INTERACTIVE GIT PIPELINE TERMINAL */}
      <div className="git-pipeline-wrapper">
        <div className="terminal-window">

          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>

            <div className="terminal-title">
              <span className="prompt-user">trung@fedora</span>
              <span className="prompt-path">:~/journey</span>
              <span className="prompt-cmd">$ git log --graph --all --decorate --oneline</span>
            </div>

            <div className="terminal-actions">
              <span className="branch-indicator">
                <FaCodeBranch size={11} />
                <span>HEAD: {activeEdu?.branch || 'main'}</span>
              </span>
            </div>
          </div>

          {/* Branch Filter Tabs */}
          <div className="branch-filter-bar">
            <span className="filter-label">{isEn ? "FILTER BRANCH:" : "LỌC NHÁNH:"}</span>
            <button
              onClick={() => setFilterCategory('all')}
              className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
            >
              <span className="btn-dot" />
              {isEn ? `All Branches (${education.length})` : `Tất cả (${education.length})`}
            </button>
            <button
              onClick={() => setFilterCategory('startup')}
              className={`filter-btn ${filterCategory === 'startup' ? 'active' : ''}`}
            >
              <span className="btn-dot" style={{ color: '#10b981' }} />
              main / startup
            </button>
            <button
              onClick={() => setFilterCategory('enterprise')}
              className={`filter-btn ${filterCategory === 'enterprise' ? 'active' : ''}`}
            >
              <span className="btn-dot" style={{ color: '#f59e0b' }} />
              enterprise / ojt
            </button>
            <button
              onClick={() => setFilterCategory('academic')}
              className={`filter-btn ${filterCategory === 'academic' ? 'active' : ''}`}
            >
              <span className="btn-dot" style={{ color: '#a855f7' }} />
              academic / ai-research
            </button>
            <button
              onClick={() => setFilterCategory('global')}
              className={`filter-btn ${filterCategory === 'global' ? 'active' : ''}`}
            >
              <span className="btn-dot" style={{ color: '#3b82f6' }} />
              global / exchange
            </button>
          </div>

          {/* Main Pipeline Content Grid */}
          <div className="pipeline-grid">

            {/* Left Column: Commits Graph List */}
            <div className="commits-column">
              {filteredEducation.map((edu, idx) => {
                const isSelected = edu.id === selectedCommitId;
                const cfg = BRANCH_CONFIG[edu.branch] || BRANCH_CONFIG['main'];
                const IconComponent = cfg.icon;

                return (
                  <motion.div
                    key={edu.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    onClick={() => setSelectedCommitId(edu.id)}
                    className={`commit-node-item ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="graph-lane">
                      <div
                        className="commit-dot"
                        style={{
                          backgroundColor: cfg.color,
                          color: cfg.color,
                        }}
                      />
                      {idx < filteredEducation.length - 1 && (
                        <div
                          className="commit-line"
                          style={{
                            background: isSelected ? `linear-gradient(to bottom, ${cfg.color}, #30363d)` : '#30363d'
                          }}
                        />
                      )}
                    </div>

                    <div className="commit-meta">
                      <div className="commit-top">
                        <span className="commit-hash">
                          commit {edu.commitHash || `c7a0${edu.id}f`}
                        </span>
                        <span
                          className="branch-badge"
                          style={{
                            borderColor: cfg.border,
                            color: cfg.color
                          }}
                        >
                          <IconComponent style={{ marginRight: '4px', verticalAlign: '-1px' }} />
                          {edu.branchLabel || edu.branch || 'main'}
                        </span>
                      </div>

                      <h4 className="commit-school">{edu.school}</h4>
                      <div className="commit-degree">{edu.degree}</div>
                      <div className="commit-time">
                        <FaCalendarAlt size={10} style={{ marginRight: '5px' }} />
                        {edu.duration}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Terminal Commit Inspector */}
            <div className="inspector-column">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEdu?.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {/* Header Line */}
                  <div className="inspector-header-box">
                    <div className="inspector-log-line">
                      <span>commit</span>
                      <span className="sha-highlight">{activeEdu?.commitHash || 'f8e21a9'}</span>
                      <button
                        onClick={() => handleCopySha(activeEdu?.commitHash || 'f8e21a9')}
                        style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', padding: 0 }}
                        title="Copy Commit SHA"
                      >
                        {copiedSha ? <FaCheck size={11} style={{ color: '#7ee787' }} /> : <FaCopy size={11} />}
                      </button>
                      <span className="head-tag">{activeEdu?.status === 'Current' ? 'CURRENT HEAD' : 'MERGED'}</span>
                      <span className="status-pill-small" style={{ borderColor: activeCfg.border, color: activeCfg.color }}>
                        {activeEdu?.branchLabel || activeEdu?.branch}
                      </span>
                    </div>

                    <div className="inspector-author-line">
                      Author: Lê Trí Trung &lt;letritrung2605@gmail.com&gt; · Date: {activeEdu?.duration}
                    </div>

                    <h3 className="inspector-school-title">{activeEdu?.school}</h3>
                    <div className="inspector-degree-subtitle">
                      <span>{activeEdu?.degree}</span>
                      {activeEdu?.gpa && (
                        <span style={{ fontSize: '13px', color: '#ffbd2e', fontWeight: 600 }}>
                          ★ {activeEdu?.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Diff Stats Banner */}
                  <div className="diff-stats-banner">
                    <div className="stat-badge">
                      <FaCheckCircle size={13} />
                      <span>{activeEdu?.diffStat || '+Verified Milestone Production Code'}</span>
                    </div>
                    {activeEdu?.gpa && (
                      <span className="gpa-badge">
                        Status / GPA: {activeEdu?.gpa}
                      </span>
                    )}
                  </div>

                  {/* Highlights Bulleted */}
                  {activeEdu?.highlights && activeEdu.highlights.length > 0 && (
                    <div className="inspector-highlights">
                      {activeEdu.highlights.map((item, idx) => (
                        <div key={idx} className="highlight-item">
                          <span className="terminal-plus">+</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  {activeEdu?.techStack && activeEdu.techStack.length > 0 && (
                    <div className="inspector-tech-section">
                      <div className="tech-label">{isEn ? "STACK & ARCHITECTURE" : "CÔNG NGHỆ & KIẾN TRÚC"}</div>
                      <div className="tech-tags-wrap">
                        {activeEdu.techStack.map(tech => (
                          <span key={tech} className="tech-pill">
                            # {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Detailed Description */}
                  {activeEdu?.description && (
                    <div className="inspector-desc-box">
                      <Markdown>{activeEdu.description}</Markdown>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  <div className="inspector-controls">
                    <button
                      onClick={handlePrev}
                      disabled={activeIdx === 0}
                      className="nav-btn"
                    >
                      <FaArrowLeft size={10} />
                      <span>{isEn ? "Newer Commit" : "Commit Mới Hơn"}</span>
                    </button>

                    <span className="step-counter">
                      {activeIdx + 1} / {education.length} {isEn ? "Milestones" : "Cột mốc"}
                    </span>

                    <button
                      onClick={handleNext}
                      disabled={activeIdx === education.length - 1}
                      className="nav-btn"
                    >
                      <span>{isEn ? "Older Commit" : "Commit Cũ Hơn"}</span>
                      <FaArrowRight size={10} />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Campus Memories Gallery */}
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
