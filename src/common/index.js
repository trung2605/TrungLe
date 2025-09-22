// Common components exports
// Provides a single entry point for all common UI components

// Import components first
import ProjectCard from './ProjectCard';
import EducationCard from './EducationCard';
import AchievementCard from './AchievementCard';
import SectionHeader from './SectionHeader';
import AnimatedButton from './AnimatedButton';
import Section from './Section';
import SkillBar from './SkillBar';
import LoadingSkeleton from './LoadingSkeleton';

// Card Components
export { ProjectCard };
export { EducationCard };
export { AchievementCard };

// UI Components
export { SectionHeader };
export { AnimatedButton };
export { Section };
export { SkillBar };
export { LoadingSkeleton };

// Component Collections for easy importing
export const Cards = {
  Project: ProjectCard,
  Education: EducationCard,
  Achievement: AchievementCard,
};

export const UI = {
  SectionHeader,
  AnimatedButton,
  Section,
  SkillBar,
  LoadingSkeleton,
};

// Utility exports for component variants
export const CardVariants = {
  PROJECT: {
    STANDARD: 'standard',
    COMPACT: 'compact',
  },
  EDUCATION: {
    STANDARD: 'standard',
    COMPACT: 'compact',
  },
  ACHIEVEMENT: {
    STANDARD: 'standard',
    COMPACT: 'compact',
  },
};

export const SectionVariants = {
  HERO: 'hero',
  LARGE: 'large',
  STANDARD: 'standard',
  COMPACT: 'compact',
};

export const AnimationTypes = {
  SCALE: 'scale',
  BOUNCE: 'bounce',
  PULSE: 'pulse',
  SLIDE: 'slide',
};

export const SkeletonTypes = {
  CARD: 'card',
  TEXT: 'text',
  AVATAR: 'avatar',
  LIST: 'list',
  HERO: 'hero',
  CUSTOM: 'custom',
};