import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaGraduationCap, 
  FaArrowRight 
} from 'react-icons/fa';

const ProjectDetailSidebar = ({ project, isEn, t, milestoneData }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Role & Scope */}
      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '18px', border: '1px solid var(--color-hairline)', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaUser size={10} /> {t('projects.role')}
        </p>
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>
          {project.role}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '18px', border: '1px solid var(--color-hairline)', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaCalendarAlt size={10} /> {t('projects.timeline')}
        </p>
        <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-ink)', margin: 0 }}>
          {project.duration}
        </p>
      </div>

      {/* Links Action Card */}
      <div style={{ backgroundColor: 'var(--color-ink)', borderRadius: '18px', padding: '22px', color: 'var(--color-canvas)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: '0 0 14px 0' }}>
          {isEn ? "Direct Access" : "Truy Cập Nhanh"}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px 18px', borderRadius: '50px', backgroundColor: 'var(--color-accent-emerald, #10b981)', color: '#ffffff',
                fontSize: '13.5px', fontWeight: 600, textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <span>{isEn ? "Open Live Site" : "Trải Nghiệm Hệ Thống Thật"}</span>
              <FaExternalLinkAlt size={11} />
            </a>
          )}

          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '11px 18px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.12)', color: '#ffffff',
                fontSize: '13.5px', fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
            >
              <FaGithub size={14} />
              <span>{isEn ? "View Source Code" : "Xem Mã Nguồn GitHub"}</span>
            </a>
          )}
        </div>
      </div>

      {/* Milestone Box */}
      {milestoneData && (
        <div style={{
          backgroundColor: milestoneData.bg,
          borderRadius: '18px',
          padding: '20px',
          border: `1px solid ${milestoneData.border}`,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: '700',
            letterSpacing: '0.5px', textTransform: 'uppercase', color: milestoneData.color,
            margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <FaGraduationCap size={13} /> {isEn ? "Verified Milestone" : "Cột Mốc Kỹ Thuật Đã Xác Thực"}
          </p>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
            {isEn ? milestoneData.titleEn : milestoneData.titleVi}
          </h4>
          <p style={{ fontSize: '12.5px', color: '#475569', margin: '0 0 12px 0' }}>
            {isEn ? milestoneData.roleEn : milestoneData.roleVi}
          </p>
          <Link
            to={`/achievements?tab=education&milestone=${milestoneData.milestoneId}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '12px', fontWeight: '600', color: milestoneData.color, textDecoration: 'none',
            }}
          >
            <span>{isEn ? "View Milestone Dossier" : "Xem Chi Tiết Cột Mốc"}</span>
            <FaArrowRight size={10} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailSidebar;
