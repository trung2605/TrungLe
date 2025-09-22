// Mock data service for development
// This provides dummy data when API endpoints are not available

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// User profile data
export const mockUserProfile = {
  id: 1,
  name: 'Lê Trí Trung',
  title: 'Software Developer',
  email: 'letritrung@example.com',
  phone: '+84 123 456 789',
  location: 'Ho Chi Minh City, Vietnam',
  bio: 'Passionate software developer with experience in modern web technologies. I love creating innovative solutions and learning new technologies.',
  avatar: '/images/profile.jpg',
  social: {
    github: 'https://github.com/letritrung',
    linkedin: 'https://linkedin.com/in/letritrung',
    twitter: 'https://twitter.com/letritrung',
    facebook: 'https://facebook.com/letritrung',
  },
};

// Projects data
export const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Material-UI'],
    image: '/images/projects/ecommerce.jpg',
    demoUrl: 'https://demo-ecommerce.com',
    githubUrl: 'https://github.com/letritrung/ecommerce',
    category: 'Web Development',
    featured: true,
    status: 'Completed',
    startDate: '2023-06-01',
    endDate: '2023-12-15',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    technologies: ['React', 'Firebase', 'Material-UI', 'Socket.io'],
    image: '/images/projects/taskmanager.jpg',
    demoUrl: 'https://demo-taskmanager.com',
    githubUrl: 'https://github.com/letritrung/taskmanager',
    category: 'Mobile App',
    featured: true,
    status: 'In Progress',
    startDate: '2024-01-01',
    endDate: null,
  },
  {
    id: 3,
    title: 'Weather Forecast App',
    description: 'A weather application with location-based forecasts and alerts',
    technologies: ['React Native', 'OpenWeather API', 'Redux'],
    image: '/images/projects/weather.jpg',
    demoUrl: 'https://demo-weather.com',
    githubUrl: 'https://github.com/letritrung/weather-app',
    category: 'Mobile App',
    featured: false,
    status: 'Completed',
    startDate: '2023-03-01',
    endDate: '2023-05-30',
  },
];

// Education data
export const mockEducation = [
  {
    id: 1,
    institution: 'University of Technology Ho Chi Minh City',
    degree: 'Bachelor of Computer Science',
    field: 'Software Engineering',
    startDate: '2019-09-01',
    endDate: '2023-06-30',
    grade: '3.8/4.0',
    description: 'Focused on software engineering principles, algorithms, and data structures.',
    logo: '/images/education/university.jpg',
    location: 'Ho Chi Minh City, Vietnam',
    achievements: [
      'Dean\'s List for 4 consecutive semesters',
      'Best Final Year Project Award',
      'Outstanding Student in Computer Science',
    ],
  },
  {
    id: 2,
    institution: 'FPT Software Academy',
    degree: 'Certificate',
    field: 'Advanced React Development',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    grade: 'A+',
    description: 'Intensive training in advanced React patterns, performance optimization, and modern development practices.',
    logo: '/images/education/fpt.jpg',
    location: 'Ho Chi Minh City, Vietnam',
    achievements: [
      'Top 5% of graduating class',
      'Best Project Implementation',
    ],
  },
];

// Skills data
export const mockSkills = [
  {
    id: 1,
    name: 'JavaScript',
    category: 'Programming Languages',
    level: 90,
    icon: 'javascript',
    color: '#F7DF1E',
    experience: '4 years',
  },
  {
    id: 2,
    name: 'React',
    category: 'Frontend Frameworks',
    level: 85,
    icon: 'react',
    color: '#61DAFB',
    experience: '3 years',
  },
  {
    id: 3,
    name: 'Node.js',
    category: 'Backend Technologies',
    level: 80,
    icon: 'nodejs',
    color: '#339933',
    experience: '2.5 years',
  },
  {
    id: 4,
    name: 'Material-UI',
    category: 'UI Libraries',
    level: 85,
    icon: 'materialui',
    color: '#007FFF',
    experience: '2 years',
  },
  {
    id: 5,
    name: 'MongoDB',
    category: 'Databases',
    level: 75,
    icon: 'mongodb',
    color: '#47A248',
    experience: '2 years',
  },
  {
    id: 6,
    name: 'Git',
    category: 'Tools',
    level: 85,
    icon: 'git',
    color: '#F05032',
    experience: '4 years',
  },
];

// Certificates data
export const mockCertificates = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2023-11-15',
    expiryDate: '2026-11-15',
    credentialId: 'AWS-CSA-2023-11',
    image: '/images/certificates/aws.jpg',
    verificationUrl: 'https://aws.amazon.com/verification/AWS-CSA-2023-11',
    skills: ['Cloud Architecture', 'AWS Services', 'Solution Design'],
  },
  {
    id: 2,
    title: 'React Developer Certification',
    issuer: 'Meta (Facebook)',
    issueDate: '2023-08-20',
    expiryDate: null,
    credentialId: 'META-REACT-2023-08',
    image: '/images/certificates/meta-react.jpg',
    verificationUrl: 'https://coursera.org/verify/META-REACT-2023-08',
    skills: ['React', 'JSX', 'Component Architecture', 'State Management'],
  },
  {
    id: 3,
    title: 'Google Analytics Certified',
    issuer: 'Google',
    issueDate: '2023-09-10',
    expiryDate: '2024-09-10',
    credentialId: 'GOOGLE-GA-2023-09',
    image: '/images/certificates/google-analytics.jpg',
    verificationUrl: 'https://skillshop.exceedlms.com/student/award/GOOGLE-GA-2023-09',
    skills: ['Web Analytics', 'Data Analysis', 'Conversion Tracking'],
  },
];

// Prizes and achievements data
export const mockPrizes = [
  {
    id: 1,
    title: 'Best Innovation Award',
    event: 'Vietnam Tech Startup Competition 2023',
    date: '2023-10-15',
    rank: '1st Place',
    description: 'Won first place for developing an AI-powered task management solution',
    image: '/images/prizes/innovation-award.jpg',
    category: 'Competition',
    amount: '$5,000',
    organizer: 'Vietnam Tech Association',
  },
  {
    id: 2,
    title: 'Outstanding Student Award',
    event: 'University of Technology HCMC',
    date: '2023-06-20',
    rank: 'Top 5%',
    description: 'Recognized for academic excellence and contribution to the computer science program',
    image: '/images/prizes/student-award.jpg',
    category: 'Academic',
    amount: null,
    organizer: 'University of Technology HCMC',
  },
  {
    id: 3,
    title: 'Hackathon Winner',
    event: 'HCMC Digital Innovation Hackathon',
    date: '2023-03-25',
    rank: '2nd Place',
    description: 'Developed a sustainable transportation app in 48 hours',
    image: '/images/prizes/hackathon.jpg',
    category: 'Hackathon',
    amount: '$2,000',
    organizer: 'HCMC Digital Innovation Hub',
  },
];

// Activities and extracurricular data
export const mockActivities = [
  {
    id: 1,
    title: 'Tech Mentor',
    organization: 'Code for Vietnam',
    role: 'Volunteer Mentor',
    startDate: '2023-01-01',
    endDate: null,
    description: 'Mentoring junior developers and students in web development technologies',
    image: '/images/activities/mentoring.jpg',
    type: 'Volunteer Work',
    achievements: [
      'Mentored 15+ junior developers',
      'Organized 10 technical workshops',
      'Created learning materials for React fundamentals',
    ],
  },
  {
    id: 2,
    title: 'Speaker',
    organization: 'Vietnam React Community',
    role: 'Technical Speaker',
    startDate: '2023-06-01',
    endDate: '2023-12-31',
    description: 'Regular speaker at React meetups and conferences',
    image: '/images/activities/speaking.jpg',
    type: 'Speaking',
    achievements: [
      'Delivered 5 technical talks',
      'Average audience rating: 4.8/5',
      'Topics: React Performance, Modern JavaScript',
    ],
  },
  {
    id: 3,
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    role: 'Contributor',
    startDate: '2022-01-01',
    endDate: null,
    description: 'Contributing to open source React and JavaScript projects',
    image: '/images/activities/opensource.jpg',
    type: 'Open Source',
    achievements: [
      '200+ GitHub contributions',
      'Contributed to 10+ repositories',
      'Maintained 3 npm packages',
    ],
  },
];

// Mock API service
export const mockApiService = {
  // User endpoints
  user: {
    getProfile: async () => {
      await delay(500);
      return { data: mockUserProfile };
    },
    updateProfile: async (data) => {
      await delay(800);
      return { data: { ...mockUserProfile, ...data } };
    },
  },

  // Projects endpoints
  projects: {
    getAll: async () => {
      await delay(600);
      return { data: mockProjects };
    },
    getById: async (id) => {
      await delay(400);
      const project = mockProjects.find(p => p.id === parseInt(id));
      if (!project) throw new Error('Project not found');
      return { data: project };
    },
    create: async (data) => {
      await delay(1000);
      const newProject = { id: Date.now(), ...data };
      return { data: newProject };
    },
    update: async (id, data) => {
      await delay(800);
      const project = mockProjects.find(p => p.id === parseInt(id));
      if (!project) throw new Error('Project not found');
      return { data: { ...project, ...data } };
    },
    delete: async (id) => {
      await delay(600);
      const index = mockProjects.findIndex(p => p.id === parseInt(id));
      if (index === -1) throw new Error('Project not found');
      return { data: { message: 'Project deleted successfully' } };
    },
  },

  // Education endpoints
  education: {
    getAll: async () => {
      await delay(500);
      return { data: mockEducation };
    },
    getById: async (id) => {
      await delay(400);
      const education = mockEducation.find(e => e.id === parseInt(id));
      if (!education) throw new Error('Education record not found');
      return { data: education };
    },
  },

  // Skills endpoints
  skills: {
    getAll: async () => {
      await delay(400);
      return { data: mockSkills };
    },
    getByCategory: async (category) => {
      await delay(400);
      const skills = mockSkills.filter(s => s.category === category);
      return { data: skills };
    },
  },

  // Certificates endpoints
  certificates: {
    getAll: async () => {
      await delay(500);
      return { data: mockCertificates };
    },
    getById: async (id) => {
      await delay(400);
      const certificate = mockCertificates.find(c => c.id === parseInt(id));
      if (!certificate) throw new Error('Certificate not found');
      return { data: certificate };
    },
  },

  // Prizes endpoints
  prizes: {
    getAll: async () => {
      await delay(500);
      return { data: mockPrizes };
    },
    getById: async (id) => {
      await delay(400);
      const prize = mockPrizes.find(p => p.id === parseInt(id));
      if (!prize) throw new Error('Prize not found');
      return { data: prize };
    },
  },

  // Activities endpoints
  activities: {
    getAll: async () => {
      await delay(500);
      return { data: mockActivities };
    },
    getById: async (id) => {
      await delay(400);
      const activity = mockActivities.find(a => a.id === parseInt(id));
      if (!activity) throw new Error('Activity not found');
      return { data: activity };
    },
  },

  // Contact endpoints
  contact: {
    sendMessage: async (data) => {
      await delay(1200);
      console.log('Mock: Sending contact message:', data);
      return { 
        data: { 
          message: 'Message sent successfully!',
          id: Date.now(),
          status: 'sent'
        } 
      };
    },
    subscribe: async (email) => {
      await delay(800);
      console.log('Mock: Newsletter subscription:', email);
      return { 
        data: { 
          message: 'Successfully subscribed to newsletter!',
          email: email.email
        } 
      };
    },
  },

  // Analytics endpoints
  analytics: {
    trackPageView: async (page) => {
      await delay(200);
      console.log('Mock: Page view tracked:', page);
      return { data: { tracked: true } };
    },
    trackEvent: async (event, data) => {
      await delay(200);
      console.log('Mock: Event tracked:', event, data);
      return { data: { tracked: true } };
    },
  },
};

export default mockApiService;