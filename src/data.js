// Personal Portfolio Data for Lê Trí Trung

export const personalInfo = {
  name: "Lê Trí Trung",
  title: "Java Developer | Computer Science Student",
  profileImage: "https://via.placeholder.com/200",
  intro: "Passionate Computer Science student with expertise in Java development and web technologies. Currently pursuing my degree at FPT University with a strong focus on backend development and modern web frameworks.",
  contact: {
    email: "letritrung2605@gmail.com",
    phone: "(+84) 912 158 715",
    birthday: "26/05/2005",
    location: "Hai Chau, Da Nang, Viet Nam",
    facebook: "Trung Lê"
  }
};

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Prizes", href: "#prizes" },
  { name: "Activities", href: "#activities" },
  { name: "Contact", href: "#contact" }
];

export const education = [
  {
    id: 1,
    school: "FPT University",
    degree: "Bachelor of Computer Science",
    duration: "09/2023 - Present",
    gpa: "7.74/10.0",
    status: "Current",
    description: "Major in Computer Science with focus on software development and emerging technologies."
  },
  {
    id: 2,
    school: "Phan Chau Trinh High School",
    degree: "High School Diploma",
    duration: "09/2020 - 06/2023",
    gpa: "9.3/10.0",
    status: "Graduated",
    description: "Graduated with excellent academic performance and strong foundation in mathematics and sciences."
  }
];

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java Core", level: 90 },
      { name: "JavaScript ES6", level: 85 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 }
    ]
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Spring Boot", level: 85 },
      { name: "ReactJS", level: 80 },
      { name: "React Hooks", level: 80 },
      { name: "JSX", level: 85 }
    ]
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git/GitHub", level: 85 },
      { name: "GitLab", level: 80 },
      { name: "API Development", level: 85 },
      { name: "Database Design", level: 75 }
    ]
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Communication", level: 90 },
      { name: "Team Leadership", level: 85 },
      { name: "Problem Solving", level: 90 },
      { name: "Project Management", level: 80 }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "The Dreamers Organization",
    role: "Founder",
    duration: "06/2024 – Now",
    image: "https://via.placeholder.com/400x250",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    techStack: ["React", "Spring Boot", "MySQL", "Docker", "AWS"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Active"
  },
  {
    id: 2,
    title: "Job Finder",
    role: "Backend Developer",
    duration: "05/2025 – Now",
    image: "https://via.placeholder.com/400x250",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    techStack: ["Spring Boot", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    githubUrl: "#",
    liveUrl: "#",
    status: "In Development"
  },
  {
    id: 3,
    title: "Dola Bakery E-commerce Platform",
    role: "Full-stack Developer",
    duration: "01/2023 – 05/2024",
    image: "https://via.placeholder.com/400x250",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Completed"
  }
];

export const certificates = [
  {
    id: 1,
    name: "IELTS 5.5",
    issuer: "British Council",
    year: "2023",
    image: "https://via.placeholder.com/300x200",
    description: "International English Language Testing System certification"
  },
  {
    id: 2,
    name: "ResFres Festival",
    issuer: "FPT University",
    year: "2024",
    image: "https://via.placeholder.com/300x200",
    description: "Participation certificate in university tech festival"
  },
  {
    id: 3,
    name: "FPTU Inbound Mobility Programme",
    issuer: "FPT University",
    year: "2023",
    image: "https://via.placeholder.com/300x200",
    description: "International exchange program participation certificate"
  },
  {
    id: 4,
    name: "Innocode Camp",
    issuer: "FPT University",
    year: "2025",
    image: "https://via.placeholder.com/300x200",
    description: "Coding bootcamp completion certificate"
  }
];

export const prizes = [
  {
    id: 1,
    title: "Beauty and Talent Contest",
    position: "Runner-up",
    year: "2022",
    organization: "FPT University",
    description: "Achieved second place in university talent competition"
  },
  {
    id: 2,
    title: "Talent Contest Final",
    position: "Winner Interview",
    year: "2022",
    organization: "FPT University",
    description: "Best interview performance in talent contest final round"
  },
  {
    id: 3,
    title: "Innocode Camp SU25 Final Round",
    position: "Finalist",
    year: "2025",
    organization: "FPT University",
    description: "Reached final round of competitive coding camp"
  },
  {
    id: 4,
    title: "ResFres 2024 Final Round",
    position: "Finalist",
    year: "2024",
    organization: "FPT University",
    description: "Advanced to final round of tech festival competition"
  }
];

export const activities = [
  {
    id: 1,
    title: "The Dreamers Innocode Camp",
    role: "Leader",
    duration: "2025 – Now",
    organization: "The Dreamers Organization",
    description: "Leading coding bootcamp initiative for students",
    status: "Active"
  },
  {
    id: 2,
    title: "Dreamer ResFres",
    role: "Leader",
    duration: "2024",
    organization: "The Dreamers Organization",
    description: "Organized and led tech festival activities",
    status: "Completed"
  },
  {
    id: 3,
    title: "Mic Home Club",
    role: "Core Member",
    duration: "2023 – Present",
    organization: "FPT University",
    description: "Active participation in speaking and presentation club",
    status: "Active"
  },
  {
    id: 4,
    title: "FUM Club",
    role: "Core Member",
    duration: "2023 – Present",
    organization: "FPT University",
    description: "Contributing to university music and arts community",
    status: "Active"
  },
  {
    id: 5,
    title: "Student Referee",
    role: "Referee",
    duration: "2022 – 2024",
    organization: "FPT University Sports",
    description: "Officiating university sports competitions",
    status: "Completed"
  },
  {
    id: 6,
    title: "Student Ambassador",
    role: "Ambassador",
    duration: "2023 – 2024",
    organization: "FPT University",
    description: "Representing university in various events and programs",
    status: "Completed"
  },
  {
    id: 7,
    title: "Acting Club",
    role: "Member",
    duration: "2022 – 2023",
    organization: "FPT University Drama",
    description: "Participating in university theater productions",
    status: "Completed"
  }
];

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com/trung.le",
    icon: "FaFacebook"
  },
  {
    name: "GitHub",
    url: "https://github.com/letritrung",
    icon: "FaGithub"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/letritrung",
    icon: "FaLinkedin"
  },
  {
    name: "Email",
    url: "mailto:letritrung2605@gmail.com",
    icon: "FaEnvelope"
  }
];