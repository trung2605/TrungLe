import { useTranslation } from 'react-i18next';
import {
  highlights as rawHighlights,
  funFacts as rawFunFacts,
  experience as rawExperience,
  skills as rawSkills,
  languages as rawLanguages,
  siteNavigation as rawNav,
  personalInfo as rawPersonalInfo,
  certificates as rawCertificates,
  education as rawEducation,
  educationMemories as rawMemories,
  activities as rawActivities,
} from '../data';

export const useTranslatedData = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    title: t(`highlights.${i}.title`),
    description: t(`highlights.${i}.description`),
  }));

  const funFacts = rawFunFacts.map((f, i) => ({
    ...f,
    title: t(`funFacts.${i}.title`),
    description: t(`funFacts.${i}.description`),
  }));

  const experience = rawExperience.map((e, i) => ({
    ...e,
    role: t(`experience.${i}.role`),
    company: t(`experience.${i}.company`),
    type: t(`experience.${i}.type`),
    duration: t(`experience.${i}.duration`),
    status: t(`experience.${i}.status`),
    description: t(`experience.${i}.description`),
  }));

  const skills = rawSkills.map((cat, ci) => ({
    ...cat,
    category: t(`skills.${ci}.category`),
    items: cat.items.map((item, ii) => ({
      ...item,
      name: t(`skills.${ci}.items.${ii}.name`),
    })),
  }));

  const languages = rawLanguages.map((l, i) => ({
    ...l,
    name: t(`languages.${i}.name`),
    level: t(`languages.${i}.level`),
    description: t(`languages.${i}.description`),
  }));

  const siteNavigation = rawNav.map((n, i) => ({
    ...n,
    title: t(`siteNavigation.${i}.title`),
    desc: t(`siteNavigation.${i}.desc`),
  }));

  const personalInfo = {
    ...rawPersonalInfo,
    title: t('personalInfo.title'),
    intro: t('personalInfo.intro'),
    story: {
      title: t('personalInfo.storyTitle'),
      content: t('personalInfo.storyContent'),
    },
  };

  const certificates = rawCertificates.map((c, i) => ({
    ...c,
    description: t(`certificateItems.${i}.description`),
  }));

  const education = rawEducation.map((e, i) => ({
    ...e,
    description: t(`educationItems.${i}.description`),
  }));

  const educationMemories = rawMemories.map((m, i) => ({
    ...m,
    caption: t(`memoryItems.${i}.caption`),
  }));

  const activities = rawActivities.map((a, i) => ({
    ...a,
    description: t(`activityItems.${i}.description`),
  }));

  return { highlights, funFacts, experience, skills, languages, siteNavigation, personalInfo, certificates, education, educationMemories, activities, lang };
};
