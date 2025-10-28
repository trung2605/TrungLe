import { FaGraduationCap, FaCode, FaHeart, FaRocket } from "react-icons/fa";

// Project Image Imports
import JobFinderImage from "./assets/projects/JobFinder.png";
import DolaBakeryImage from "./assets/projects/DolaBakery.png";
import TheDreamersOrganizationImage from "./assets/projects/TheDreamers.png";
import WebFormAutomationImage from "./assets/projects/WebFormAutomation.png";
import BookShopOutsystemsImage from "./assets/projects/BookShopOutsystems.png";
import TikTokUIImage from "./assets/projects/ComingSoon.png";
import DSAImage from "./assets/projects/DSA.png";
import PortfolioImage from "./assets/projects/Portfolio.png";
import BakeryManagementImage from "./assets/projects/BakeryManagementSystem.png";

//Certificate Imports
import IELTS_6_0_Image from "./assets/Certificate/Language/TrungLeTri_Linear_certificate_IELTS_6.0.png";
import HiraganaImage from "./assets/Certificate/Language/Completion_Hiragana.png";
import KataganaImage from "./assets/Certificate/Language/Completion_katagana.png";
import DreamersResfresImage from "./assets/Certificate/Event/DreamersResfres.png";
import NonXanhNuocBiecImage from "./assets/Certificate/Event/NonXanhNuocBiec.png";
import DreamerOfHonorImage from "./assets/Certificate/Other/DreamerOfHonor.png";
import AcademicSkillsImage from "./assets/Certificate/TechnologyCertificates/AcademicSkills for University Success-1.png";
import WebDevBasicsImage from "./assets/Certificate/TechnologyCertificates/Basics of web development & coding _ Michigan-1.png";
import AIAgentsImage from "./assets/Certificate/TechnologyCertificates/CertificateOfCompletion_Build AI Agents and Automate Workflows with n8n-1.png";
import CSS3Image from "./assets/Certificate/TechnologyCertificates/CSS3＿Michigan-1.png";
import DataVisualizationImage from "./assets/Certificate/TechnologyCertificates/Data Visualization.png";
import GraphicDesignImage from "./assets/Certificate/TechnologyCertificates/Fundamentals of Graphic Design-1.png";
import HTMLCSSDepthImage from "./assets/Certificate/TechnologyCertificates/HTML and CSS in depth-1.png";
import HTML5Image from "./assets/Certificate/TechnologyCertificates/Html5_Michigan-1.png";
import ITOnboardingImage from "./assets/Certificate/TechnologyCertificates/Information Technology Onboarding-1.png";
import InteractivityJSImage from "./assets/Certificate/TechnologyCertificates/Interactivity with JavaScript _ Michigan-1.png";
import IntroFrontEndImage from "./assets/Certificate/TechnologyCertificates/Introduction to Front-End Development-1.png";
import JSAlgorithmsImage from "./assets/Certificate/TechnologyCertificates/JavaScript Algorithms.png";
import ProgrammingJSImage from "./assets/Certificate/TechnologyCertificates/Programming with JavaScript-1.png";
import ResponsiveImage from "./assets/Certificate/TechnologyCertificates/Reponsive_ Michigan-1.png";
import RoboticsImage from "./assets/Certificate/TechnologyCertificates/Robotics.jpg";

//Activity Imports
import InnocodeCampActivityImage from "./assets/activities/Dreamers_Innocode_Camp.png";
import MicHomeFUMClubImage from "./assets/activities/Mic_Home_FUM_Club.jpg";
import ResFresActivityImage from "./assets/Certificate/Event/DreamersResfres.png";
import CharityFundraisingImage from "./assets/activities/Dreamers_Charity_Fundraising.jpg";
import MediaRolesImage from "./assets/activities/Student_Actor_Model.jpg";
import GalaHonTanDatVietImage from "./assets/activities/Gala_HonTanDatViet.jpg";
import CharityMissionsImage from "./assets/activities/TuThien_Missions_Group.jpg";
import WorkshopMakeImageBetterImage from "./assets/activities/Workshop_MakeImageBetter_MC.jpg";
import GenderEqualityMCImage from "./assets/activities/Gender_Equality_Workshop_MC.jpg";
import CollaborationEventsImage from "./assets/activities/Collaboration_Events_Group.jpg";
import TuyenThanhVienDreamersImage from "./assets/activities/Tuyen_Thanh_Vien_Dreamers.jpg";
import DuAnDreamHighImage from "./assets/activities/Du_An_Dream_High.jpg";
import TotHyVongImage from "./assets/activities/Tet_Hy_Vong_Event.jpg";
import VongVaoMongMoImage from "./assets/activities/Vong_Vao_Mong_Mo.jpg";
import AIRoboticsImage from "./assets/activities/AI_Robotics_Referee.jpg";
import DienNhacTuThienImage from "./assets/activities/Dien_Nhac_Tu_Thien.png";
import BoAnhKyNiemImage from "./assets/activities/Bo_Anh_Ky_Niem.jpg";
import AlumniGuidanceImage from "./assets/activities/Alumni_Career_Guidance_Talk.jpg";

//eudcation Memories Imports
import FPTMemory1 from "./assets/educationMemories/FPT_Memory_1.jpg";
import MalaysiaMemory from "./assets/educationMemories/Malaysia_Memory.jpg";
import PCTMemory from "./assets/educationMemories/PCT_Graduation_Memory.jpg";

export const personalInfo = {
  name: "Lê Trí Trung",
  title: "Java Developer | Computer Science Student",
  profileImage: "./assets/information/avatar.png",
  cv: "./assets/information/Le_Tri_Trung_CV.pdf",
  logo: "./assets/information/avatar.png",
  intro:
    "Highly motivated Computer Science student with a strong foundation in web development. Proficient in Java Spring Boot, JavaScript, React, HTML/CSS, and passionate about creating clean, scalable applications. Seeking a Web Developer internship to apply my skills and contribute to a collaborative team.",
  contact: {
    email: "letritrung2605@gmail.com",
    phone: "(+84) 912 158 715",
    birthday: "26/05/2005",
    location: "Hai Chau district, Da Nang city, Viet Nam",
    facebook: "Trung Lê",
    instagram: "trung.le.2605",
    github: "https://github.com/trung2605",
    linkedin: "https://www.linkedin.com/in/trung-l%C3%AA-7ba564283/",
  },
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
  { name: "Contact", href: "#contact" },
];
export const stats = [
  {
    label: "Years of Study",
    value: "1+",
    icon: FaGraduationCap,
    color: "text-blue-600",
  },
  {
    label: "Projects Completed",
    value: "10+",
    icon: FaCode,
    color: "text-green-600",
  },
  {
    label: "Technologies",
    value: "15+",
    icon: FaRocket,
    color: "text-purple-600",
  },
  {
    label: "Passion Level",
    value: "100%",
    icon: FaHeart,
    color: "text-red-600",
  },
];

export const highlights = [
  {
    title: "Backend Expertise",
    description:
      "Specialized in Java development, particularly with the Spring Boot framework.",
    icon: "⚙️",
  },
  {
    title: "Modern Web Technologies",
    description: "Proficient in ReactJS and various modern web technologies.",
    icon: "🌐",
  },
  {
    title: "Complex Problem Solving",
    description:
      "Passionate about tackling complex programming challenges and optimizing solutions.",
    icon: "🧩",
  },
  {
    title: "Team Leadership & Management",
    description:
      "Proven experience in leading development teams and managing project timelines.",
    icon: "👥",
  },
];

export const education = [
  {
    id: 1,
    school: "FPT Software (FSoft)",
    degree: "Software Developer Intern",
    duration: "09/2025 - Present",
    gpa: "Passed",
    status: "Current",
    description:
      "Currently interning at FPT Software, a top-tier technology company in Vietnam. Gaining practical experience by developing applications using **Low-Code platforms, specifically OutSystems**. This role provides invaluable exposure to a professional enterprise environment and modern software development practices.",
  },
  {
    id: 2,
    school: "FPT University",
    degree: "University (Computer Science)",
    duration: "09/2023 - Present",
    gpa: "8.25/10.0",
    status: "Current",
    description:
      "Currently pursuing a Bachelor of Science in Computer Science. My coursework emphasizes software development, data structures, and algorithms. I am actively focused on backend technologies, particularly Java Spring Boot, and gaining practical experience through team projects and coding competitions.",
  },
  {
    id: 3,
    school:
      "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
    degree: "Inbound Mobility Programme",
    duration: "12/2023",
    gpa: "Passed",
    status: "Completed",
    description:
      "Participation in the FPTU Inbound Mobility Programme in Kuala Lumpur, Malaysia. Gained international exposure to diverse academic and cultural environments, enhancing adaptability and cross-cultural communication skills.",
  },
  {
    id: 4,
    school: "Phan Chau Trinh High School",
    degree: "High School Diploma",
    duration: "09/2020 - 06/2023",
    gpa: "9.3/10.0",
    status: "Graduated",
    description:
      "Graduated with an excellent academic GPA of 9.3/10.0. The curriculum provided a strong foundation in Mathematics, Physics, and analytical skills, which served as a crucial stepping stone for my current Computer Science studies and problem-solving approach.",
  },
];

export const educationMemories = [
  {
    id: 1,
    source: FPTMemory1,
    alt: "Studying Computer Science at FPT University",
    caption: "Learning and development at FPT University.",
    year: 2024,
  },
  {
    id: 2,
    source: MalaysiaMemory,
    alt: "FPTU Inbound Mobility Programme in Malaysia",
    caption:
      "International exposure during the mobility program in Kuala Lumpur.",
    year: 2023,
  },
  {
    id: 3,
    source: PCTMemory,
    alt: "Graduation ceremony at Phan Chau Trinh High School",
    caption: "A strong foundation built during high school years.",
    year: 2023,
  },
];

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java Core & Spring Boot", level: 70 },
      { name: "Javascript Es6", level: 65 },
      { name: "HTML5 & CSS3", level: 75 },
      { name: "API Development (RESTful)", level: 65 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Spring Boot", level: 65 },
      { name: "ReactJS (Hooks, API, JSX)", level: 60 },
      { name: "Java Servlets", level: 55 },
      { name: "React Hooks", level: 60 },
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git/GitHub/GitLab", level: 65 },
      { name: "SQL Server Management Studio (SSMS)", level: 55 },
      { name: "Docker", level: 50 },
      { name: "Project Management", level: 60 },
    ],
  },
  {
    category: "Soft Skills",
    items: [
      { name: "Communication Skills", level: 70 },
      { name: "Team Leadership", level: 65 },
      { name: "Problem Solving", level: 70 },
      { name: "Agile Collaboration", level: 60 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Job Finder",
    role: "Backend Developer (Team Project)",
    duration: "05/2025 – 09/2025",
    image: JobFinderImage,
    description:
      "Developed and maintained robust **backend services** for a job search platform using **Java Spring Boot**. Managed data interactions with **SQL Server**. Implemented **RESTful APIs** to facilitate seamless communication with the React/JavaScript frontend. Actively collaborated within an **Agile team**, leveraging Git for version control.",
    techStack: [
      "Java Spring Boot",
      "SQL Server",
      "RESTful APIs",
      "React/JavaScript",
      "Git",
    ],
    githubUrl: "https://github.com/trung2605",
    liveUrl: "#",
    status: "In Development",
  },
  {
    id: 2,
    title: "Dola Bakery E-commerce Platform",
    role: "Full-Stack Developer (Team Project)",
    duration: "01/2023 – 05/2024",
    image: DolaBakeryImage,
    description:
      "Led a 4-member team in developing a full-stack e-commerce platform. Engineered the system using **Java Servlets** (backend) and **HTML, CSS** (frontend), with **SQL Server Management Studio (SSMS)** for database management. Integrated advanced features including an **AI-powered chatbot** and **Google APIs**, significantly enhancing system capabilities.",
    techStack: [
      "Java Servlets",
      "HTML",
      "CSS",
      "SQL Server",
      "AI Chatbot",
      "Google APIs",
    ],
    githubUrl: "https://github.com/trung2605",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 3,
    title: "The Dreamers Organization",
    role: "Founder",
    duration: "15/06/2025 – Present",
    image: TheDreamersOrganizationImage,
    description:
      "Founder of a community-driven charity organization dedicated to fostering positive social impact. Gained hands-on experience in project management, team leadership, and resource allocation through diverse community initiatives. The organization focuses on exposing orphaned children to technology and personal communication skills.",
    techStack: ["Project Management", "Team Leadership", "Community Building"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Active",
  },
  {
    id: 4,
    title: "Web Form Automation",
    role: "Developer",
    duration: "15/10/2025 - 25/10/2025",
    image: WebFormAutomationImage,
    description:
      "A utility project focused on automating the process of filling out web forms, demonstrating proficiency in web interaction scripting and DOM manipulation.",
    techStack: ["JavaScript", "Node.js", "Web Scraping"],
    githubUrl: "https://github.com/trung2605/Web-dien-form-tu-dong",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 5,
    title: "Book Shop - OutSystems Application",
    role: "Full-Stack Developer",
    duration: "09/2025 – Present",
    image: BookShopOutsystemsImage,
    description:
      "A sample web application built entirely on the **OutSystems low-code platform**, demonstrating rapid application development skills and full-stack implementation using the OutSystems environment.",
    techStack: ["OutSystems", "Low-Code Development", "Web Application"],
    githubUrl: "https://github.com/trung2605/Book-Shop-Outsystems-Public",
    liveUrl:
      "https://personal-fu4tft5e.outsystemscloud.com/BookShopCore/BookStore",
    status: "Completed",
  },
  {
    id: 6,
    title: "TikTok UI Clone (F8 React Course)",
    role: "Frontend Developer (Practice)",
    duration: "10/2025 – Present",
    image: TikTokUIImage,
    description:
      "A practice project from the F8 React course, focused on cloning the TikTok interface to sharpen skills in **React component design**, state management, and modern CSS techniques.",
    techStack: ["React", "JavaScript", "HTML/CSS"],
    githubUrl: "https://github.com/trung2605/tiktok-ui-Public",
    liveUrl: "#",
    status: "Completed",
  },
  {
    id: 9,
    title: "Data Structures and Algorithms (DSA)",
    role: "Học tập & Thực hành",
    duration: "09/2025 – Present",
    image: DSAImage,
    description:
      "A repository dedicated to solving and implementing various fundamental **Data Structures and Algorithms** problems, primarily focusing on logical problem-solving and code efficiency.",
    techStack: ["Java", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/trung2605/Data-Structure-and-Algorithm",
    liveUrl: "#",
    status: "Active",
  },
  {
    id: 10,
    title: "Personal Portfolio Website (Current Project)",
    role: "Full-Stack Developer",
    duration: "09/2025 – Present",
    image: PortfolioImage,
    description:
      "Developing a responsive and interactive personal portfolio to showcase technical projects, skills, and academic achievements. Built using modern web technologies and practices.",
    techStack: ["React", "SCSS/Tailwind CSS", "JavaScript", "Framer Motion"],
    githubUrl: "#",
    liveUrl: "#",
    status: "In Development",
  },
  {
    id: 7,
    title: "Bakery Management System",
    role: "Full-Stack",
    duration: "05/2025 – 09/2025",
    image: BakeryManagementImage,
    description:
      "A comprehensive system for managing bakery operations, including inventory, sales, and customer management.",
    techStack: ["React", "Spring Boot", "MySQL"],
    githubUrl: "#",
    liveUrl: "https://bakery-assginment-fe.vercel.app/",
    status: "Completed",
  },
];

export const certificates = [
  {
    id: 1,
    name: "IELTS 6.0 (Linear)",
    issuer: "Tên Tổ chức IELTS 6.0",
    year: "2024",
    image: IELTS_6_0_Image,
    description:
      "International English Language Testing System certification with a score of 6.0.",
  },
  {
    id: 2,
    name: "Attendance FPTU Inbound Mobility Programme",
    issuer:
      "Tunku Abdul Rahman University of Management and Technology, Malaysia",
    year: "12/2023",
    image: RoboticsImage,
    description:
      "Participation in the Inbound Mobility Programme in Kuala Lumpur, Malaysia.",
  },
  {
    id: 3,
    name: "Innocode Camp",
    issuer: "FPT Education",
    year: "07/2025",
    image: RoboticsImage,
    description: "Certificate of participation in the Innocode Camp.",
  },
  {
    id: 4,
    name: "ResFres Festival",
    issuer: "FPT Education",
    year: "2024",
    image: DreamersResfresImage,
    description: "Certificate of participation in the Research Festival.",
  },
  // -------------------------------------------------------------
  // CHỨNG CHỈ CÔNG NGHỆ (TechnologyCertificates)
  // -------------------------------------------------------------
  {
    id: 5,
    name: "Certificate of Completion: Build AI Agents and Automate Workflows with n8n",
    issuer: "FPT Software (Coursera/edX)",
    year: "09/2025",
    image: AIAgentsImage,
    description:
      "Certificate of completion for building AI Agents and Automation.",
  },
  {
    id: 6,
    name: "Programming with JavaScript",
    issuer: "Meta (Coursera/edX)",
    year: "05/2024",
    image: ProgrammingJSImage,
    description:
      "Certification in JavaScript programming fundamentals and applications.",
  },
  {
    id: 7,
    name: "Basics of Web Development & Coding",
    issuer: "Michigan (Coursera/edX)",
    year: "10/2024",
    image: WebDevBasicsImage,
    description:
      "Certification covering the basics of web development and coding from Michigan.",
  },
  {
    id: 8,
    name: "HTML and CSS in Depth",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "05/2024",
    image: HTMLCSSDepthImage,
    description: "In-depth knowledge and application of HTML5 and CSS.",
  },
  {
    id: 9,
    name: "Interactivity with JavaScript",
    issuer: "Michigan (Coursera/edX)",
    year: "10/2024",
    image: InteractivityJSImage,
    description: "Focus on creating interactive web elements using JavaScript.",
  },
  {
    id: 10,
    name: "Introduction to Front-End Development",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "05/2024",
    image: IntroFrontEndImage,
    description: "Foundational concepts of Front-End Web Development.",
  },
  {
    id: 11,
    name: "Data Visualization",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "04/2024",
    image: DataVisualizationImage,
    description:
      "Certification in techniques and tools for Data Visualization.",
  },
  {
    id: 12,
    name: "CSS3",
    issuer: "Michigan (Coursera/edX)",
    year: "09/2024",
    image: CSS3Image,
    description: "Course focusing on advanced CSS3 techniques and usage.",
  },
  {
    id: 13,
    name: "HTML5",
    issuer: "Michigan (Coursera/edX)",
    year: "09/2024",
    image: HTML5Image,
    description: "Course covering the core principles and features of HTML5.",
  },
  {
    id: 14,
    name: "Responsive Design",
    issuer: "Michigan (Coursera/edX)",
    year: "10/2024",
    image: ResponsiveImage,
    description: "Course on implementing responsive web design principles.",
  },
  {
    id: 15,
    name: "Academic Skills for University Success",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "05/2024",
    image: AcademicSkillsImage,
    description:
      "Course focusing on essential academic skills needed for success in university.",
  },
  {
    id: 16,
    name: "Fundamentals of Graphic Design",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "05/2024",
    image: GraphicDesignImage,
    description:
      "Certification covering the fundamental principles and practices of graphic design.",
  },
  {
    id: 17,
    name: "Information Technology Onboarding",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "05/2024",
    image: ITOnboardingImage,
    description:
      "Introductory course to information technology concepts and university IT systems.",
  },
  {
    id: 18,
    name: "Robotics",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "09/2025",
    image: RoboticsImage,
    description: "Course covering basic concepts and applications in Robotics.",
  },
  {
    id: 23,
    name: "JavaScript Algorithms",
    issuer: "Tên Tổ chức (Cần xác định)",
    year: "03/2024",
    image: JSAlgorithmsImage,
    description:
      "Course covering fundamental and advanced JavaScript algorithms.",
  },
  {
    id: 24,
    name: "Completion Hiragana",
    issuer: "Tên Tổ chức Tiếng Nhật",
    year: "2024",
    image: HiraganaImage,
    description: "Certificate of completion for the Hiragana module.",
  },
  {
    id: 25,
    name: "Completion Katagana",
    issuer: "Tên Tổ chức Tiếng Nhật",
    year: "2024",
    image: KataganaImage,
    description: "Certificate of completion for the Katagana module.",
  },
  {
    id: 26,
    name: "Non Xanh Nước Biếc",
    issuer: "Tên Tổ chức/Sự kiện",
    year: "2024",
    image: NonXanhNuocBiecImage,
    description:
      "Certificate of participation or achievement in the 'Non Xanh Nước Biếc' event.",
  },
  {
    id: 27,
    name: "Dreamer of Honor",
    issuer: "The Dreamers Organization",
    year: "2024",
    image: DreamerOfHonorImage,
    description:
      "An organizational award or recognition for service/contribution.",
  },
];

export const prizes = [
  // -------------------------------------------------------------
  // 2025 (Năm gần nhất)
  // -------------------------------------------------------------
  {
    id: 6,
    title: "Code Mosaic Algorithm Contest",
    position: "Participant / Final Round",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Participated in the Code Mosaic algorithmic coding competition organized by FPT.",
  },
  {
    id: 7,
    title: "FPT Code Talent Contest",
    position: "Final Round",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Advanced to the final round of the FPT Code Talent competition.",
  },
  {
    id: 1,
    title: "Innocode Camp SU25",
    position: "Final Round",
    year: "07/2025",
    organization: "FPT Education",
    description:
      "Reached the final round of the Innocode Camp coding competition.",
  },
  // -------------------------------------------------------------
  // 2024
  // -------------------------------------------------------------
  {
    id: 2,
    title: "Research Festival (ResFres 2024)",
    position: "Final Round",
    year: "06/2024",
    organization: "FPT Education",
    description:
      "Advanced to the final round of the university's Research Festival competition.",
  },
  {
    id: 5,
    title: "FPT ResFes 2024 (5 Campus Scale)",
    position: "Research Finalist",
    year: "05/2024",
    organization: "FPT Education",
    description:
      "Advanced to the final research round (Science Research Final) of the FPT ResFes competition, involving 5 FPT campuses.",
  },
  // -------------------------------------------------------------
  // 2022
  // -------------------------------------------------------------
  {
    id: 3,
    title: "Talent Contest Winner Interview",
    position: "Winner ",
    year: "04/2022",
    organization: "Phan Chau Trinh HS",
    description:
      "Awarded the **Winner (First Place)** position in the Final Round of the high school Talent Contest.",
  },
  {
    id: 4,
    title: "Talent & Beauty Contest",
    position: "First Runner-up (Mister)",
    year: "04/2022",
    organization: "Phan Chau Trinh HS",
    description:
      "Awarded First Runner-up in the high school's Talent and Beauty Contest.",
  },
];

export const activities = [
  {
    id: 1,
    title: "Alumni Career Guidance Talk (PCT HS)",
    role: "Guest Speaker / Mentor",
    duration: "03/01/2025",
    organization: "Phan Chau Trinh High School",
    image: AlumniGuidanceImage,
    description:
      "Invited back to my high school to serve as a guest speaker, providing career guidance and university pathway orientation for 12th-grade students. Focused on Computer Science and Java development roadmaps.",
    status: "Completed",
  },
  {
    id: 2,
    title: "The Dreamers Innocode Camp",
    role: "Team Leader",
    duration: "14/06/2025 – Now",
    organization: "The Dreamers Organization (University Coding Competition)",
    image: InnocodeCampActivityImage,
    description:
      "Led a cross-functional team of 5 developers, managing the full development lifecycle from conceptualization to database integration. Developed an innovative job search platform prototype utilizing **React, Java Spring Boot, MySQL, and Docker**.",
    status: "Active",
  },
  {
    id: 3,
    title: "Mic Home Club and FUM Club",
    role: "Core Member",
    duration: "01/2024 – 02/2025",
    organization: "FPT University",
    image: MicHomeFUMClubImage,
    description:
      "Honed **public speaking and presentation skills** by regularly hosting university-wide events, workshops, and ceremonies with audiences ranging from 600 to 1000+ attendees. Developed strong **improvisation and quick-thinking abilities** to manage live event dynamics.",
    status: "Completed",
  },
  {
    id: 4,
    title: "Dreamer ResFres",
    role: "Team Leader",
    duration: "20/03/2024 – 11/05/2024",
    organization: "The Dreamers Organization (Research Festival)",
    image: ResFresActivityImage,
    description:
      "Fostered research, reading, and report writing skills, as well as scientific research capabilities. Provided opportunities for teamwork and modular work, increasing adaptability to different topics.",
    status: "Completed",
  },
  {
    id: 5,
    title: "Gala Hòn Tán Đất Việt",
    role: "Ban đối ngoại / Điều phối viên chính",
    duration: "June 22, 2024 – July 2, 2024",
    organization: "Đại học FPT",
    image: GalaHonTanDatVietImage,
    description:
      "Served as the main coordinator and external relations member for the 'Gala Hòn Tán Đất Việt' event, focusing on diplomacy and logistics.",
    status: "Completed",
  },
  {
    id: 6,
    title: "The Dreamers Charity Campaign (Fundraising & Logistics)",
    role: "Project Leader / Quỹ",
    duration: "Dec 1, 2024 – Dec 31, 2024 (Fundraising) & Ongoing",
    organization: "The Dreamers Organization / Various",
    image: CharityFundraisingImage,
    description:
      "Led the Dreamers fundraising sales campaign (Thủ quỹ), achieving internal revenue goals. Managed resource allocation and led charity missions to orphanages, focusing on social impact.",
    status: "Active",
  },
  {
    id: 7,
    title: "Tổ chức Tình nguyện (Mốc khác)",
    role: "Thành viên tham gia / Tổ chức",
    duration: "Various",
    organization: "ocean.zero6 / Trung tâm nuôi dạy trẻ mồ côi / Công ty AHT",
    image: CharityMissionsImage,
    description:
      "Participated as a member and organizer in multiple charity missions, including 'Hành trình từ thiện ocean.zero6,' visiting orphanages, and fundraising projects.",
    status: "Completed",
  },
  {
    id: 8,
    title: "Workshop: 'Make Your Image Better' (MC)",
    role: "MC",
    duration: "October 4, 2025",
    organization: "Đại học FPT",
    image: WorkshopMakeImageBetterImage,
    description:
      "Served as the Master of Ceremonies (MC) for the university workshop aimed at improving personal image and presence.",
    status: "Completed",
  },
  {
    id: 9,
    title: "Dự án Nữ quyền (Gender Equality Workshop)",
    role: "MC Chương trình",
    duration: "March 2, 2024",
    organization: "Đại học FPT",
    image: GenderEqualityMCImage,
    description:
      "Served as the MC for the workshop on 'Gender Equality in working environment,' gaining experience in organizing and leading sensitive topics.",
    status: "Completed",
  },
  {
    id: 10,
    title: "Cộng tác viên Sự kiện Hàng tuần",
    role: "Cộng tác viên / Hướng dẫn viên",
    duration: "Various",
    organization: "Đại học FPT",
    image: CollaborationEventsImage,
    description:
      "Assisted in student admission events, acted as a student representative, and provided guidance for various university activities (Dự án High, Tuyển tình nguyện đợt 2, v.v.).",
    status: "Active",
  },
  {
    id: 11,
    title: "Student Actor/Model/Vlogger",
    role: "Diễn viên / Model / Vlogger",
    duration: "Feb 2024 – Present",
    organization: "Honda Tiến Thu / LenDoan Bridal / FPT",
    image: MediaRolesImage,
    description:
      "Participated in various media roles including acting in commercial spots, modeling for FPT events, and Vlogging/Editing social content.",
    status: "Various",
  },
  {
    id: 12,
    title: "Tuyển thành viên The DREAMERS",
    role: "Leader",
    duration: "October 13, 2024 – October 27, 2024",
    organization: "The DREAMER",
    image: TuyenThanhVienDreamersImage,
    description:
      "Led the recruitment drive for new members of The DREAMER organization.",
    status: "Completed",
  },
  {
    id: 13,
    title: "Tốt Hy Vọng (Tổ Chức Sự Kiện)",
    role: "Leader",
    duration: "January 10, 2025",
    organization: "The DREAMER",
    image: TotHyVongImage,
    description:
      "Led the organization and execution of the 'Tốt Hy Vọng' event.",
    status: "Completed",
  },
  {
    id: 14,
    title: "Vòng vào Mộng mơ (Sự Kiện Tổ Chức)",
    role: "Leader",
    duration: "March 9, 2025 – March 16, 2025",
    organization: "The DREAMER",
    image: VongVaoMongMoImage,
    description: "Led the organization team for the 'Vòng vào Mộng mơ' event.",
    status: "Completed",
  },
  {
    id: 15,
    title: "Dự án Dream High",
    role: "Leader",
    duration: "November 27, 2024 – May 22, 2025",
    organization: "The DREAMER",
    image: DuAnDreamHighImage,
    description: "Led the 'Dream High' project. Project status: Chưa kết thúc.",
    status: "In Progress",
  },
  {
    id: 16,
    title: "AI & Robotics Competition",
    role: "Trọng tài chính (Referee)",
    duration: "July 5, 2025 – July 8, 2025",
    organization: "Đại học FPT",
    image: AIRoboticsImage,
    description:
      "Served as the main referee/official for the AI & Robotics Competition, ensuring fair play and adherence to competition rules.",
    status: "Completed",
  },
  {
    id: 17,
    title: "Diễn nhạc từ thiện",
    role: "Manager",
    duration: "July 5, 2025 – July 31, 2025",
    organization: "The DREAMER",
    image: DienNhacTuThienImage,
    description:
      "Managed the charity music performance event (Diễn nhạc từ thiện) organized by The DREAMER.",
    status: "Completed",
  },
  {
    id: 18,
    title: "Bộ ảnh kỷ niệm cách mạng tháng 8",
    role: "Mẫu ảnh",
    duration: "August 27, 2025",
    organization: "Đại học FPT",
    image: BoAnhKyNiemImage,
    description:
      "Worked as a photo model for the commemorative photo set celebrating the August Revolution (Cách mạng tháng 8).",
    status: "Completed",
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/trung.le.2605",
    icon: "FaFacebook",
  },
  {
    name: "GitHub",
    url: "https://github.com/trung2605",
    icon: "FaGithub",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/trung-l%C3%AA-7ba564283/",
    icon: "FaLinkedin",
  },
  {
    name: "Email",
    url: "mailto:letritrung2605@gmail.com",
    icon: "FaEnvelope",
  },
];

export const allSkillsData = [
  // -------------------------------------------------------------
  // NGÔN NGỮ LẬP TRÌNH CỐT LÕI (Xanh Lam & Vàng)
  // -------------------------------------------------------------
  { name: "Java", icon: "☕", color: "from-blue-600 to-indigo-700", level: 80 }, // Màu chính đậm
  {
    name: "JavaScript",
    icon: "🟨",
    color: "from-yellow-400 to-yellow-500", // Giữ màu Vàng nổi bật
    level: 0,
  },
  { name: "C / C++", icon: "⚙️", color: "from-blue-400 to-cyan-500", level: 0 },
  { name: "Python", icon: "🐍", color: "from-blue-500 to-teal-500", level: 0 },

  // -------------------------------------------------------------
  // FRAMEWORKS & BACKEND (Xanh Lá/Xanh Lam)
  // -------------------------------------------------------------
  {
    name: "Spring Boot",
    icon: "🍃",
    color: "from-green-500 to-green-700", // Xanh lá cây đồng bộ
    level: 0,
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "from-green-600 to-teal-700",
    level: 0,
  },
  {
    name: "Java Website (Servlets/JSP)",
    icon: "💻",
    color: "from-indigo-500 to-purple-600",
    level: 0,
  },

  // -------------------------------------------------------------
  // FRONTEND & WEB (Xanh Lam & Tím)
  // -------------------------------------------------------------
  {
    name: "React (F8/Coursera)",
    icon: "⚛️",
    color: "from-cyan-400 to-blue-600",
    level: 0,
  },
  {
    name: "HTML & CSS in DEPTH",
    icon: "🌐",
    color: "from-purple-500 to-indigo-600",
    level: 0,
  },
  {
    name: "Intro to Web Development",
    icon: "🛠️",
    color: "from-blue-300 to-blue-500",
    level: 0,
  },

  // -------------------------------------------------------------
  // CƠ SỞ DỮ LIỆU (DATABASE) (Xanh Lam/Teal)
  // -------------------------------------------------------------
  {
    name: "Database MySQL / Relational DB",
    icon: "💾",
    color: "from-sky-500 to-blue-600",
    level: 0,
  },
  {
    name: "Database MongoDB",
    icon: "🌿",
    color: "from-teal-600 to-cyan-700",
    level: 0,
  },
  {
    name: "Database Visualization",
    icon: "📈",
    color: "from-indigo-600 to-purple-700",
    level: 0,
  },

  // -------------------------------------------------------------
  // LOW-CODE & AUTOMATION (Đỏ/Tím để nổi bật tính Nền tảng)
  // -------------------------------------------------------------
  {
    name: "OutSystems",
    icon: "🤖",
    color: "from-red-600 to-pink-700", // Màu mới
    level: 0,
  },
  {
    name: "Make.com / N8N Automation",
    icon: "🔗",
    color: "from-fuchsia-600 to-purple-700",
    level: 0,
  },

  // -------------------------------------------------------------
  // KỸ NĂNG KHÁC & CHUYÊN MÔN SÂU (Teal & Xám)
  // -------------------------------------------------------------
  {
    name: "Data Structure and Algorithm",
    icon: "🧠",
    color: "from-teal-500 to-cyan-600",
    level: 0,
  },
  {
    name: "DevOps",
    icon: "☁️",
    color: "from-gray-600 to-gray-800", // Tông Xám trung tính hơn
    level: 0,
  },
  {
    name: "Data Analysis With Python",
    icon: "📊",
    color: "from-yellow-700 to-amber-800",
    level: 0,
  },
  {
    name: "Scientific Computing with Python",
    icon: "🔬",
    color: "from-gray-700 to-gray-900",
    level: 0,
  },
  {
    name: "Phỏng vấn lập trình",
    icon: "💬",
    color: "from-lime-600 to-green-700",
    level: 0,
  },
  {
    name: "Mục lục các hàm trong code C",
    icon: "📜",
    color: "from-cyan-500 to-blue-600",
    level: 0,
  },
  {
    name: "Kiến thức khác",
    icon: "💡",
    color: "from-yellow-400 to-amber-500",
    level: 0,
  },
];

//Site Navigation Data
export const siteNavigation = [
  {
    title: "About Me",
    desc: "Learn about my journey and passion",
    icon: "🙋‍♂️",
    path: "/about",
  },
  {
    title: "Projects",
    desc: "Explore the projects I have worked on",
    icon: "💻",
    path: "/projects",
  },
  {
    title: "Skills",
    desc: "See the technologies I am proficient in",
    icon: "🔧",
    path: "/skills",
  },
  {
    title: "Education",
    desc: "My learning and development journey",
    icon: "🎓",
    path: "/education",
  },
  {
    title: "Certificates",
    desc: "My certifications and achievements",
    icon: "🏅",
    path: "/certificates",
  },
  {
    title: "Activities",
    desc: "My extracurricular involvement and leadership roles",
    icon: "👥",
    path: "/activities",
  },
  {
    title: "Contact",
    desc: "Let's connect and collaborate",
    icon: "📧",
    path: "/contact",
  },
];
