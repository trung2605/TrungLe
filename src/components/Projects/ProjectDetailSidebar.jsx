import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaCalendarAlt, 
  FaExternalLinkAlt, 
  FaGithub, 
  FaGraduationCap, 
  FaArrowRight,
  FaFolderOpen
} from 'react-icons/fa';

const ProjectDetailSidebar = ({ project, isEn, t, milestoneData }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Role & Scope */}
      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '8px', border: '1.5px solid var(--color-border-strong)', boxShadow: '4px 4px 0px #18181B', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-soft)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaUser size={10} /> {t('projects.role')}
        </p>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
          {project.role}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '8px', border: '1.5px solid var(--color-border-strong)', boxShadow: '4px 4px 0px #18181B', padding: '20px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-soft)', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaCalendarAlt size={10} /> {t('projects.timeline')}
        </p>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>
          {project.duration}
        </p>
      </div>

      {/* Links Action Card */}
      <div style={{ backgroundColor: '#18181B', borderRadius: '8px', border: '2px solid #18181B', boxShadow: '4px 4px 0px #F5C242', padding: '22px', color: '#FAF8F3' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: '#F5C242', margin: '0 0 14px 0' }}>
          ★ {isEn ? "Direct Access" : "Truy Cập Nhanh"}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '10px 16px', borderRadius: '5px', backgroundColor: '#22C55E', color: '#FFFFFF',
                border: '1.5px solid #18181B',
                fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none',
                boxShadow: '2px 2px 0px rgba(0,0,0,0.4)',
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
                padding: '10px 16px', borderRadius: '5px', backgroundColor: '#F5C242', color: '#18181B',
                fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none',
                border: '1.5px solid #18181B',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <FaGithub size={14} />
              <span>{isEn ? "View Source Code" : "Xem Mã Nguồn GitHub"}</span>
            </a>
          )}

          {project.baDocsUrl && (
            <a
              href={project.baDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '10px 16px', borderRadius: '5px', backgroundColor: '#B8E8D0', color: '#18181B',
                fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none',
                border: '1.5px solid #18181B',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <FaFolderOpen size={14} />
              <span>{isEn ? "BA & SRS Dossier (Drive)" : "Hồ Sơ Tài Liệu BA & SRS"}</span>
            </a>
          )}
        </div>
      </div>

      {/* Milestone Box */}
      {milestoneData && (
        <div style={{
          backgroundColor: '#F7E49A',
          borderRadius: '8px',
          padding: '20px',
          border: '1.5px solid #18181B',
          boxShadow: '4px 4px 0px #18181B',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700,
            letterSpacing: '0.5px', textTransform: 'uppercase', color: '#18181B',
            margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <FaGraduationCap size={13} /> {isEn ? "Verified Milestone" : "Cột Mốc Kỹ Thuật Đã Xác Thực"}
          </p>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#18181B', margin: '0 0 4px 0' }}>
            {isEn ? milestoneData.titleEn : milestoneData.titleVi}
          </h4>
          <p style={{ fontSize: '12.5px', color: '#3F3F46', margin: '0 0 12px 0' }}>
            {isEn ? milestoneData.roleEn : milestoneData.roleVi}
          </p>
          <Link
            to={`/achievements?tab=education&milestone=${milestoneData.milestoneId}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#18181B', textDecoration: 'underline',
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
