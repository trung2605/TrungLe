import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Education from '../../components/Education/Education';
import Certificates from '../../components/Certificates/Certificates';
import Prizes from '../../components/Prizes/Prizes';
import './AchievementsPage.scss';

const VALID_TABS = ['education', 'certificates', 'prizes'];

const AchievementsPage = () => {
  const { t } = useTranslation();
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
      </div>
    </div>
  );
};

export default AchievementsPage;
