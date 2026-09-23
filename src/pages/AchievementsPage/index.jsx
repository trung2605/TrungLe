import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AchievementsSubnav from '../../components/AchievementsSubnav/AchievementsSubnav';
import Education from '../../components/Education/Education';
import Certificates from '../../components/Certificates/Certificates';
import Prizes from '../../components/Prizes/Prizes';
import Activities from '../../components/Activities/Activities';
import './AchievementsPage.scss';

const AchievementsPage = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.language || 'vi').startsWith('en');
  const location = useLocation();

  // Handle initial hash or query navigation (e.g. /achievements#activities)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -140 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 250);
    }
  }, [location.hash]);

  return (
    <div className="achievementspage-container" style={{ paddingTop: '52px' }}>
      {/* FIXED SUBNAV BAR */}
      <AchievementsSubnav />

      {/* ── 1. HỌC VẤN (EDUCATION) ── */}
      <section 
        id="education" 
        style={{ 
          scrollMarginTop: '150px', 
          marginBottom: '64px',
          position: 'relative'
        }}
      >
        <Education />
      </section>

      <div style={{ 
        height: '1px', 
        background: 'linear-gradient(90deg, transparent, var(--color-hairline) 15%, var(--color-hairline) 85%, transparent)', 
        margin: '40px 0', 
        opacity: 0.7 
      }} />

      {/* ── 2. CHỨNG CHỈ (CERTIFICATES) ── */}
      <section 
        id="certificates" 
        style={{ 
          scrollMarginTop: '150px', 
          marginBottom: '64px',
          position: 'relative'
        }}
      >
        <Certificates />
      </section>

      <div style={{ 
        height: '1px', 
        background: 'linear-gradient(90deg, transparent, var(--color-hairline) 15%, var(--color-hairline) 85%, transparent)', 
        margin: '40px 0', 
        opacity: 0.7 
      }} />

      {/* ── 3. GIẢI THƯỞNG (PRIZES) ── */}
      <section 
        id="prizes" 
        style={{ 
          scrollMarginTop: '150px', 
          marginBottom: '64px',
          position: 'relative'
        }}
      >
        <Prizes />
      </section>

      <div style={{ 
        height: '1px', 
        background: 'linear-gradient(90deg, transparent, var(--color-hairline) 15%, var(--color-hairline) 85%, transparent)', 
        margin: '40px 0', 
        opacity: 0.7 
      }} />

      {/* ── 4. HOẠT ĐỘNG (ACTIVITIES) ── */}
      <section 
        id="activities" 
        style={{ 
          scrollMarginTop: '150px', 
          marginBottom: '64px',
          position: 'relative'
        }}
      >
        <Activities />
      </section>

      {/* Cross-linking card */}
      <div style={{
        marginTop: '64px',
        marginBottom: '48px',
        padding: '32px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        border: '1px solid var(--color-hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px 0' }}>
            {isEn ? "Translating Honors & Theory into Real-World Production" : "Ứng dụng thực tế từ kiến thức & giải thưởng"}
          </h3>
          <p style={{ fontSize: '14.5px', color: 'var(--color-ink-soft)', margin: 0, maxWidth: '580px', lineHeight: '1.6' }}>
            {isEn
              ? "Explore how competitive algorithmic thinking and academic research are channeled into high-performance software products and engineering services."
              : "Khám phá cách những thành tích thi đấu thuật toán và nghiên cứu khoa học được chuyển hóa thành các sản phẩm phần mềm thực chiến và dịch vụ công nghệ cho khách hàng."}
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: 'var(--color-ink)', color: 'var(--color-canvas)',
              fontSize: '13.5px', fontWeight: 540, textDecoration: 'none',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>{isEn ? "View Project Showcase" : "Xem Showcase Dự Án"}</span>
          </Link>
          <Link
            to="/dich-vu"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '11px 22px', borderRadius: '50px',
              backgroundColor: '#ede5fb', color: '#6d3fc9',
              fontSize: '13.5px', fontWeight: 600, textDecoration: 'none',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>{isEn ? "Team 5 Devs Service" : "Dịch Vụ Team 5 Devs"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
