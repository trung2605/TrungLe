import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Education from '../../components/Education/Education';
import Certificates from '../../components/Certificates/Certificates';
import Prizes from '../../components/Prizes/Prizes';
import './AchievementsPage.scss';

const VALID_TABS = ['education', 'certificates', 'prizes'];

const AchievementsPage = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : 'education';

  const handleTabChange = (value) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  return (
    <div className="achievementspage-container">
      <div style={{ paddingTop: '32px' }}>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="education">{t('nav.education')}</TabsTrigger>
            <TabsTrigger value="certificates">{t('nav.certificates')}</TabsTrigger>
            <TabsTrigger value="prizes">{t('nav.prizes')}</TabsTrigger>
          </TabsList>
          <TabsContent value="education">
            <Education />
          </TabsContent>
          <TabsContent value="certificates">
            <Certificates />
          </TabsContent>
          <TabsContent value="prizes">
            <Prizes />
          </TabsContent>
        </Tabs>

        {/* Cross-linking card */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          backgroundColor: '#f8fafc',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isEn ? "Translating Honors & Theory into Real-World Production" : "Ứng dụng thực tế từ kiến thức & giải thưởng"}
            </h3>
            <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0, maxWidth: '560px', lineHeight: '1.6' }}>
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
                padding: '10px 20px', borderRadius: '50px',
                backgroundColor: '#0f172a', color: '#ffffff',
                fontSize: '13.5px', fontWeight: 500, textDecoration: 'none',
              }}
            >
              <span>{isEn ? "View Project Showcase" : "Xem Showcase Dự Án"}</span>
            </Link>
            <Link
              to="/dich-vu"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px', borderRadius: '50px',
                backgroundColor: '#ede5fb', color: '#6d3fc9',
                fontSize: '13.5px', fontWeight: 600, textDecoration: 'none',
              }}
            >
              <span>{isEn ? "Team 5 Devs Service" : "Dịch Vụ Team 5 Devs"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
