
import {
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaTrophy,
  FaServer,
  FaGlobe,
  FaPuzzlePiece,
  FaUsers,
  FaCrown,
  FaMicrophone,
  FaVideo,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaSun,
  FaBook,
  FaLightbulb,
  FaFilm,
  FaEnvelope,
  FaFileAlt,
  FaNewspaper,
} from "react-icons/fa";
import NewAvatar from './assets/information/image.png';

// Project Image Imports
const JobFinderImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962629/my-website/assets/projects/JobFinder.png";
const DolaBakeryImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962632/my-website/assets/projects/DolaBakery.png";
const TheDreamersOrganizationImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962634/my-website/assets/projects/TheDreamers.png";
const WebFormAutomationImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962635/my-website/assets/projects/WebFormAutomation.png";
const BookShopOutsystemsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962636/my-website/assets/projects/BookShopOutsystems.png";
const TikTokUIImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962637/my-website/assets/projects/ComingSoon.png";
const PortfolioImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962639/my-website/assets/projects/Portfolio.png";
const BakeryManagementImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962640/my-website/assets/projects/BakeryManagementSystem.png";

// Live screenshots captured via Playwright from each project's deployed liveUrl
const JobFinderShot1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870959/my-website/assets/projects/screenshots/1-job-finder.png";
const DolaBakeryShot1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870962/my-website/assets/projects/screenshots/2-dola-bakery.png";
const WebFormAutomationShot1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870966/my-website/assets/projects/screenshots/4-web-form-automation.png";
const BakeryManagementShot1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870969/my-website/assets/projects/screenshots/7-bakery-management.png";

//Certificate Imports
const HiraganaImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962642/my-website/assets/Certificate/Language/Completion_Hiragana.png";
const KataganaImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962643/my-website/assets/Certificate/Language/Completion_katagana.png";
const DreamersResfresImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962644/my-website/assets/Certificate/Event/DreamersResfres.png";
const NonXanhNuocBiecImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962645/my-website/assets/Certificate/Event/NonXanhNuocBiec.png";
const DreamerOfHonorImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838572/my-website/assets/Certificate/Event/DreamersHonor-1.png";
const AcademicSkillsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962647/my-website/assets/Certificate/TechnologyCertificates/AcademicSkills_for_University_Success-1.png";
const WebDevBasicsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962649/my-website/assets/Certificate/TechnologyCertificates/Basics_of_web_development_coding___Michigan-1.png";
const AIAgentsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962650/my-website/assets/Certificate/TechnologyCertificates/CertificateOfCompletion_Build_AI_Agents_and_Automate_Workflows_with_n8n-1.png";
const CSS3Image = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962651/my-website/assets/Certificate/TechnologyCertificates/CSS3_Michigan-1.png";
const DataVisualizationImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962653/my-website/assets/Certificate/TechnologyCertificates/Data_Visualization.png";
const GraphicDesignImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962654/my-website/assets/Certificate/TechnologyCertificates/Fundamentals_of_Graphic_Design-1.png";
const HTMLCSSDepthImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962656/my-website/assets/Certificate/TechnologyCertificates/HTML_and_CSS_in_depth-1.png";
const HTML5Image = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962657/my-website/assets/Certificate/TechnologyCertificates/Html5_Michigan-1.png";
const ITOnboardingImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962658/my-website/assets/Certificate/TechnologyCertificates/Information_Technology_Onboarding-1.png";
const InteractivityJSImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962660/my-website/assets/Certificate/TechnologyCertificates/Interactivity_with_JavaScript___Michigan-1.png";
const IntroFrontEndImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962661/my-website/assets/Certificate/TechnologyCertificates/Introduction_to_Front-End_Development-1.png";
const JSAlgorithmsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962662/my-website/assets/Certificate/TechnologyCertificates/JavaScript_Algorithms.png";
const ProgrammingJSImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962663/my-website/assets/Certificate/TechnologyCertificates/Programming_with_JavaScript-1.png";
const ResponsiveImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962664/my-website/assets/Certificate/TechnologyCertificates/Reponsive__Michigan-1.png";
const RoboticsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962666/my-website/assets/Certificate/TechnologyCertificates/Robotics.jpg";
const IELTSRealImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838534/my-website/assets/Certificate/Language/IELTS_Real.png";
const DOLLinearImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838530/my-website/assets/Certificate/Language/DOL_Linear.png";
const FsoftOJTImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838532/my-website/assets/Certificate/Language/FPT_OJT.png";
const HocBong2023Image = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838533/my-website/assets/Certificate/Language/HocBong2023.png";
const AIESECLeadershipImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838569/my-website/assets/Certificate/Event/Leadership_Conference_2025.png";
const IBMRAGLangChainImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838587/my-website/assets/Certificate/TechnologyCertificates/IBM_RAG_LangChain-1.png";
const RAGGetStartedImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783839672/my-website/assets/Certificate/TechnologyCertificates/RAG_GetStarted-1.png";
const AIAgentsRAGLangChainImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783839671/my-website/assets/Certificate/TechnologyCertificates/AIAgents_RAG_LangChain-1.png";
const EthicalOrgImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840247/my-website/assets/Certificate/TechnologyCertificates/EthicalOrg-1.png";
const EthicalRisksImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840249/my-website/assets/Certificate/TechnologyCertificates/EthicalRisks-1.png";
const EthicalPromoteImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840248/my-website/assets/Certificate/TechnologyCertificates/EthicalPromote-1.png";
const EthicalActionableImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840244/my-website/assets/Certificate/TechnologyCertificates/EthicalActionable-1.png";
const EthicalCommunicateImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840246/my-website/assets/Certificate/TechnologyCertificates/EthicalCommunicate-1.png";
const CertNexusExamPrepImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840243/my-website/assets/Certificate/TechnologyCertificates/CertNexusExamPrep-1.png";
const EthicsOfAIImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840250/my-website/assets/Certificate/TechnologyCertificates/EthicsOfAI-1.png";
const PMInitiatingImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840252/my-website/assets/Certificate/TechnologyCertificates/PMInitiating-1.png";
const PMBudgetingImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840250/my-website/assets/Certificate/TechnologyCertificates/PMBudgeting-1.png";
const PMRisksImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840253/my-website/assets/Certificate/TechnologyCertificates/PMRisks-1.png";
const PMCapstoneImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840251/my-website/assets/Certificate/TechnologyCertificates/PMCapstone-1.png";

//Activity Imports
const InnocodeCampActivityImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962667/my-website/assets/activities/Dreamers_Innocode_Camp.png";
const MicHomeFUMClubImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962668/my-website/assets/activities/Mic_Home_FUM_Club.jpg";
const ResFresActivityImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962644/my-website/assets/Certificate/Event/DreamersResfres.png";
const CharityFundraisingImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962670/my-website/assets/activities/Dreamers_Charity_Fundraising.jpg";
const MediaRolesImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962671/my-website/assets/activities/Student_Actor_Model.jpg";
const GalaHonTanDatVietImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962672/my-website/assets/activities/Gala_HonTanDatViet.jpg";
const CharityMissionsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962673/my-website/assets/activities/TuThien_Missions_Group.jpg";
const WorkshopMakeImageBetterImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962674/my-website/assets/activities/Workshop_MakeImageBetter_MC.jpg";
const GenderEqualityMCImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962676/my-website/assets/activities/Gender_Equality_Workshop_MC.jpg";
const CollaborationEventsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962677/my-website/assets/activities/Collaboration_Events_Group.jpg";
const TuyenThanhVienDreamersImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962678/my-website/assets/activities/Tuyen_Thanh_Vien_Dreamers.jpg";
const DuAnDreamHighImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962681/my-website/assets/activities/Du_An_Dream_High.jpg";
const TotHyVongImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962682/my-website/assets/activities/Tet_Hy_Vong_Event.jpg";
const VongVaoMongMoImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962684/my-website/assets/activities/Vong_Vao_Mong_Mo.jpg";
const AIRoboticsImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962685/my-website/assets/activities/AI_Robotics_Referee.jpg";
const DienNhacTuThienImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962688/my-website/assets/activities/Dien_Nhac_Tu_Thien.png";
const BoAnhKyNiemImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962689/my-website/assets/activities/Bo_Anh_Ky_Niem.jpg";
const AlumniGuidanceImage = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962690/my-website/assets/activities/Alumni_Career_Guidance_Talk.jpg";

//eudcation Memories Imports
const FPTMemory1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962692/my-website/assets/educationMemories/FPT_Memory_1.jpg";
const MalaysiaMemory = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962693/my-website/assets/educationMemories/Malaysia_Memory.jpg";
const PCTMemory = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962694/my-website/assets/educationMemories/PCT_Graduation_Memory.jpg";

// About Slider Images Imports
const SliderImg1 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962695/my-website/assets/slider/SliderImg1.jpg";
const SliderImg2 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962696/my-website/assets/slider/SliderImg2.jpg";
const SliderImg3 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962697/my-website/assets/slider/SliderImg3.jpg";
const SliderImg4 = "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962699/my-website/assets/slider/SliderImg4.jpg";

// Local Image Import
// moved to top


export const personalInfo = {
  name: "Lê Trí Trung",
  title: "Java Developer | Computer Science Student",
  profileImage: NewAvatar,
  cv: "/Le_Tri_Trung_CV.pdf",
  logo: NewAvatar,
  intro:
    "Highly motivated Computer Science student with a strong foundation in web development. Proficient in Java Spring Boot, JavaScript, React, HTML/CSS, and passionate about creating clean, scalable applications. Seeking a Web Developer internship to apply my skills and contribute to a collaborative team.",
  contact: {
    email: "letritrung2605@gmail.com",
    phone: "(+84) 912 158 715",
    birthday: "26/05/2005",
    location: "Hai Chau district, Da Nang city, Viet Nam",
    facebook: "https://www.facebook.com/trung.le.2605",
    instagram: "https://www.instagram.com/trung.le.2605/?hl=en",
    github: "https://github.com/trung2605",
    linkedin: "https://www.linkedin.com/in/trung-l%C3%AA-7ba564283/",
  },
  story: {
    title: "My Journey",
    content:
      "I'm **Lê Trí Trung** — a Computer Science student at **FPT University Da Nang**, currently interning at **FPT Software** as a Software Developer. I specialize in **Java Spring Boot** backend development and enjoy building full-stack applications that are clean, scalable, and actually useful.\n\nMy path started with a curiosity for how things work under the hood. That curiosity led me from Java fundamentals to designing RESTful APIs, integrating databases, working with real Agile teams, and eventually co-building platforms like **The MC Hub** — a marketplace connecting event MCs with clients, featuring real-time chat, payment integration, and a mobile app.\n\nOutside of code, I've served as an **MC for 600–1000+ attendee university events**, founded **The Dreamers** — a student charity organization focused on bringing technology education to orphaned children — and competed in multiple national-scale coding competitions, reaching final rounds at **FPT Code Talent** and **Innocode Camp**.\n\nI believe the best developers are those who can communicate, lead, and adapt — not just ship code. That's the kind of developer I'm working to become.",
  },
};

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Prizes", href: "#prizes" },
  { name: "Activities", href: "#activities" },
];

export const highlights = [
  {
    title: "Backend-First Mindset",
    description:
      "Core strength in Java Spring Boot — designing RESTful APIs, securing services with JWT, managing relational and document databases, and building production-ready backend systems with clean architecture.",
    icon: <FaServer className="w-8 h-8" style={{ color: '#6d3fc9' }} />,
  },
  {
    title: "Full-Stack Capable",
    description:
      "Comfortable across the entire stack — from React 19 + Vite frontends to Spring Boot backends, with hands-on experience deploying on Vercel and integrating third-party services like PayOS and Cloudinary.",
    icon: <FaGlobe className="w-8 h-8" style={{ color: '#6d3fc9' }} />,
  },
  {
    title: "Competitive Programmer",
    description:
      "Reached final rounds at FPT Code Talent, Innocode Camp, and ResFes — sharpening algorithmic thinking and performance under pressure through consistent competition participation.",
    icon: <FaPuzzlePiece className="w-8 h-8" style={{ color: '#6d3fc9' }} />,
  },
  {
    title: "Leader & Community Builder",
    description:
      "Founded The Dreamers charity organization, led 5-person development teams, and hosted university events for 600–1000+ attendees — proving that strong developers also know how to communicate and inspire.",
    icon: <FaUsers className="w-8 h-8" style={{ color: '#6d3fc9' }} />,
  },
];

export const aboutSliderImages = [
  {
    id: 1,
    source: SliderImg1,
    alt: "FPT University Campus",
    caption: "",
  },
  {
    id: 2,
    source: SliderImg2,
    alt: "Coding Moment",
    caption: "",
  },
  {
    id: 3,
    source: SliderImg3,
    alt: "MC Event Host",
    caption: "",
  },
  {
    id: 4,
    source: SliderImg4,
    alt: "Team Meeting",
    caption: "",
  },
  {
    id: 5,
    source: SliderImg1,
    alt: "FPT University Campus",
    caption: "",
  },
  {
    id: 6,
    source: SliderImg2,
    alt: "Coding Moment",
    caption: "",
  },
  {
    id: 7,
    source: SliderImg3,
    alt: "MC Event Host",
    caption: "",
  },
  {
    id: 8,
    source: SliderImg4,
    alt: "Team Meeting",
    caption: "",
  },
];

export const experienceBlocks = [
  {
    id: 1,
    title: "Competitive Coding & Real-World Exposure",
    icon: <FaTrophy fontSize={30} />,
    description:
      "Frequent participation in university-level **coding competitions** (e.g., Innocode, ResFes, Code Talent) and **project-based challenges**, ensuring continuous exposure to **algorithmic thinking** and pressurized **development environments**.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Leadership in Community & Projects",
    icon: <FaCrown fontSize={30} />,
    description:
      "Proven ability to lead **cross-functional teams**, serving as **Team Leader** for multiple projects, a **student organization founder**, and a manager in **community initiatives**.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Exceptional Public Speaking Skills",
    icon: <FaMicrophone fontSize={30} />,
    description:
      "Extensive experience as an **MC/Host** for large university events (**600-1000+ attendees**), developing strong **public speaking**, **improvisation**, and **dynamic event management** capabilities.",
    color: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "Versatile Media & Consulting Experience",
    icon: <FaVideo fontSize={30} />,
    description:
      "Diverse exposure in **media roles** (Actor, Model, Vlogger) and event **coordination/consulting**, demonstrating **versatility**, **quick adaptability**, and **professional presentation skills**.",
    color: "from-orange-500 to-red-600",
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
      "Currently interning at FPT Software, a **top-tier technology company in Vietnam**. Gaining **practical experience** by developing applications using **Low-Code platforms**, specifically **OutSystems**. This role provides invaluable exposure to a professional **enterprise environment** and **modern software development practices**.",
  },
  {
    id: 2,
    school: "FPT University",
    degree: "University (Computer Science)",
    duration: "09/2023 - Present",
    gpa: "8.25/10.0",
    status: "Current",
    description:
      "Currently pursuing a **Bachelor of Science in Computer Science**. My coursework emphasizes **software development**, **data structures**, and **algorithms**. I am actively focused on **backend technologies**, particularly **Java Spring Boot**, and gaining practical experience through **team projects** and **coding competitions**.",
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
      "Participation in the **FPTU Inbound Mobility Programme** in **Kuala Lumpur, Malaysia**. Gained **international exposure** to diverse academic and cultural environments, enhancing **adaptability** and **cross-cultural communication skills**.",
  },
  {
    id: 4,
    school: "Phan Chau Trinh High School",
    degree: "High School Diploma",
    duration: "09/2020 - 06/2023",
    gpa: "9.3/10.0",
    status: "Graduated",
    description:
      "Graduated with an **excellent academic GPA of 9.3/10.0**. The curriculum provided a strong foundation in **Mathematics, Physics, and analytical skills**, which served as a crucial stepping stone for my current Computer Science studies and **problem-solving approach**.",
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
      "A full-stack **job search platform** built by a cross-functional Agile team of 6. I owned the **backend architecture** — designing and implementing RESTful APIs with **Java Spring Boot**, managing relational data in **SQL Server**, and integrating an **AI-powered chatbot** to assist job seekers with resume tips and job matching.\n\nKey contributions include building the **authentication system** (JWT-based login/register), designing the **job posting and application flow APIs**, and setting up **Git branching strategy** (feature branches + pull requests) to keep team collaboration clean across 4 months of development.\n\nThe platform is currently live on Vercel and under active iteration, with features like real-time job alerts and employer dashboard in progress.",
    techStack: [
      "Java Spring Boot",
      "SQL Server",
      "RESTful APIs",
      "React/JavaScript",
      "Git",
      "HTML/CSS",
      "AI Chatbot",
    ],
    githubUrl: "https://github.com/SWPGr",
    liveUrl: "https://fe-jobfinder.vercel.app/",
    status: "In Development",
    category: "Full-Stack",
    challenge: "Cần một nền tảng tìm việc cho phép job seeker vừa tìm kiếm/ứng tuyển vừa nhận hỗ trợ AI (resume tips, job matching), trong khi team 6 người phải phối hợp Agile trên cùng một codebase suốt 4 tháng mà không dẫm chân nhau.",
    highlights: [
      "Thiết kế và triển khai toàn bộ RESTful API bằng Java Spring Boot, quản lý dữ liệu quan hệ trên SQL Server",
      "Xây dựng hệ thống xác thực JWT-based (login/register) từ đầu",
      "Thiết lập Git branching strategy (feature branch + pull request) giữ team 6 người làm việc sạch trong 4 tháng",
      "Tích hợp AI chatbot hỗ trợ resume tips và job matching cho job seeker",
    ],
    screenshots: [JobFinderShot1],
  },
  {
    id: 2,
    title: "Dola Bakery E-commerce Platform",
    role: "Java Developer & Team Lead (Team Project)",
    duration: "01/2023 – 05/2024",
    image: DolaBakeryImage,
    description:
      "Led a **4-member team** to build a complete e-commerce platform for a bakery business — covering product catalog, order management, shopping cart, and customer accounts. I architected the **Java Servlets backend**, designed the **SQL Server database schema**, and coordinated task distribution across the team using weekly sprints.\n\nStandout features include an **AI-powered chatbot** for customer support (integrated via API), **Google Maps API** for store location, and **Google OAuth** for social login. The frontend was built with vanilla **HTML/CSS/JavaScript**, keeping the system lightweight and fast.\n\nThis was my first real team project — it taught me how to scope features, resolve merge conflicts under deadline pressure, and deliver a working product end-to-end.",
    techStack: [
      "Java Servlets",
      "HTML/CSS/JavaScript",
      "SQL Server (SSMS)",
      "AI Chatbot API",
      "Google Maps API",
      "Google OAuth",
    ],
    githubUrl: "https://github.com/trung2605/BakeryManagement",
    liveUrl: "https://themes.sapo.vn/demo/dola-bakery",
    status: "Completed",
    category: "Full-Stack",
    challenge: "Dự án nhóm đầu tiên của tôi — cần dựng một nền tảng thương mại điện tử đầy đủ (catalog, giỏ hàng, đơn hàng, tài khoản khách) cho một tiệm bánh, với đội 4 người và deadline cố định, mà không có kinh nghiệm phối hợp team trước đó.",
    highlights: [
      "Kiến trúc backend bằng Java Servlets, tự thiết kế schema database SQL Server",
      "Dẫn dắt team 4 người, chia task theo sprint hàng tuần",
      "Tích hợp AI chatbot hỗ trợ khách hàng, Google Maps API cho vị trí cửa hàng, Google OAuth cho đăng nhập mạng xã hội",
      "Học cách giải quyết merge conflict dưới áp lực deadline và giao sản phẩm hoàn chỉnh end-to-end",
    ],
    screenshots: [DolaBakeryShot1],
  },
  {
    id: 3,
    title: "The Dreamers Organization",
    role: "Founder & Project Lead",
    duration: "15/06/2025 – Present",
    image: TheDreamersOrganizationImage,
    description:
      "Founded and lead **The Dreamers** — a student-run charity organization at FPT University dedicated to creating positive social impact through technology and education. The organization runs hands-on programs that bring **coding workshops, communication skills training, and mentorship** directly to orphaned children and underprivileged youth.\n\nAs founder, I manage the full operational scope: recruiting and onboarding members, defining project roadmaps, coordinating with partner organizations, and overseeing fundraising campaigns that have raised funds for multiple charity missions.\n\nNotable events organized under The Dreamers include **Tốt Hy Vọng**, **Vòng vào Mộng mơ**, **Dream High**, and a **Charity Music Performance** — each requiring end-to-end planning, logistics, and team coordination. The backend platform for managing member activities and event records is also being developed in **Java Spring Boot**.",
    techStack: ["Project Management", "Team Leadership", "Community Organizing", "Java Spring Boot", "Event Production"],
    githubUrl: "https://github.com/trung2605/the_dreamers_backend",
    liveUrl: "#",
    status: "Active",
    category: "Full-Stack",
    challenge: "Xây dựng một tổ chức thiện nguyện sinh viên bền vững — không chỉ tổ chức sự kiện đơn lẻ mà cần vận hành liên tục: tuyển thành viên, gây quỹ, và giờ đây là số hoá việc quản lý hoạt động/thành viên bằng một nền tảng backend riêng.",
    highlights: [
      "Sáng lập và điều hành toàn bộ hoạt động: tuyển thành viên, roadmap dự án, gây quỹ cho nhiều chiến dịch thiện nguyện",
      "Tổ chức end-to-end 4 sự kiện lớn: Tốt Hy Vọng, Vòng vào Mộng mơ, Dream High, Charity Music Performance",
      "Đang phát triển backend quản lý hoạt động và hồ sơ thành viên bằng Java Spring Boot",
    ],
    screenshots: [],
  },
  {
    id: 4,
    title: "Web Form Automation",
    role: "Solo Developer",
    duration: "15/10/2025 – 25/10/2025",
    image: WebFormAutomationImage,
    description:
      "A focused utility tool built in 10 days to automate repetitive web form submissions — eliminating manual data entry for structured, high-volume input scenarios.\n\nThe system uses **Node.js** on the backend to orchestrate form interaction via DOM scripting, with a lightweight **React frontend** that lets users upload data (CSV/JSON), preview entries, and trigger batch submissions with a single click. Built to handle edge cases like input validation delays, dynamic field rendering, and CAPTCHA-protected forms.\n\nThis project sharpened my understanding of browser DOM behavior, async scripting patterns, and the practical limits of automation — a useful skillset for QA, data tooling, and internal workflow automation.",
    techStack: ["JavaScript", "Node.js", "React", "DOM Scripting", "Web Automation"],
    githubUrl: "https://github.com/trung2605/Form-Automation-Backend",
    liveUrl: "https://form-automation-frontend.vercel.app/",
    status: "Completed",
    category: "Automation",
    challenge: "Loại bỏ việc nhập liệu thủ công lặp lại cho các form web có khối lượng lớn, trong thời hạn gấp 10 ngày — cần xử lý được các trường hợp khó như field render động và form có CAPTCHA.",
    highlights: [
      "Xây dựng engine điều khiển DOM bằng Node.js để tự động hoá tương tác form",
      "Frontend React cho phép upload CSV/JSON, xem trước dữ liệu, và submit hàng loạt chỉ với 1 click",
      "Xử lý các edge case: độ trễ validation, field render động, form có CAPTCHA",
      "Hoàn thành toàn bộ solo trong 10 ngày",
    ],
    screenshots: [WebFormAutomationShot1],
  },
  {
    id: 5,
    title: "Book Shop – OutSystems Application",
    role: "Full-Stack Developer",
    duration: "09/2025 – Present",
    image: BookShopOutsystemsImage,
    description:
      "A complete e-commerce bookstore built entirely on the **OutSystems low-code platform** — developed as part of my internship training at **FPT Software**, where OutSystems is actively used in enterprise client projects.\n\nThe app covers core e-commerce flows: **product catalog with search/filter**, **shopping cart**, **order management**, and a basic **admin panel** for inventory control. Building it entirely in OutSystems taught me how to reason about data models, UI logic, and API integrations within a visual development environment — skills directly applicable to enterprise rapid-delivery contexts.\n\nThe live demo is publicly accessible on OutSystems Cloud.",
    techStack: ["OutSystems", "Low-Code Platform", "REST API Integration", "UI Flows", "Data Modeling"],
    githubUrl: "https://github.com/trung2605/Book-Shop-Outsystems-Public",
    liveUrl: "https://personal-fu4tft5e.outsystemscloud.com/BookShopCore/BookStore",
    status: "Completed",
    category: "Low-Code",
    challenge: "Học và triển khai một ứng dụng thương mại điện tử đầy đủ hoàn toàn trong môi trường visual development (OutSystems) — kỹ năng trực tiếp áp dụng cho các dự án enterprise rapid-delivery tại FPT Software.",
    highlights: [
      "Xây dựng đầy đủ luồng e-commerce: catalog có search/filter, giỏ hàng, quản lý đơn hàng, admin panel quản lý tồn kho",
      "Học cách tư duy data model, UI logic, và tích hợp API trong môi trường low-code",
      "Demo live công khai trên OutSystems Cloud",
    ],
    screenshots: [],
  },
  {
    id: 6,
    title: "TikTok UI Clone (F8 React Course)",
    role: "Frontend Developer (Practice Project)",
    duration: "10/2025 – Present",
    image: TikTokUIImage,
    description:
      "A pixel-accurate clone of the TikTok web interface built as a structured practice project through the **F8 React course** — one of Vietnam's most respected frontend learning programs.\n\nThe focus was on mastering **React component architecture**: breaking the TikTok UI into reusable, composable pieces — Sidebar, VideoFeed, UserCard, ActionBar — each with proper props, state, and effect management. Key techniques practiced include **custom hooks**, **React Router** for multi-page navigation, **CSS Modules** for scoped styling, and responsive layout without a UI library.\n\nThis project solidified my React fundamentals before applying them in production projects like Job Finder and The MC Hub.",
    techStack: ["React", "JavaScript (ES6+)", "CSS Modules", "React Router", "Custom Hooks"],
    githubUrl: "https://github.com/trung2605/tiktok-ui-Public",
    liveUrl: "#",
    status: "Completed",
    category: "Frontend",
    challenge: "Củng cố nền tảng React trước khi áp dụng vào các dự án production (Job Finder, The MC Hub) — bằng cách tái tạo chính xác một giao diện phức tạp, nhiều component tương tác thật (TikTok web).",
    highlights: [
      "Tách UI thành các component tái sử dụng: Sidebar, VideoFeed, UserCard, ActionBar với props/state/effect quản lý đúng chuẩn",
      "Thực hành custom hooks, React Router cho điều hướng đa trang, CSS Modules cho styling có phạm vi",
      "Xây dựng responsive layout hoàn toàn không dùng UI library",
    ],
    screenshots: [],
  },
  {
    id: 10,
    title: "Personal Portfolio Website",
    role: "Designer & Developer",
    duration: "09/2025 – Present",
    image: PortfolioImage,
    description:
      "This portfolio — the site you're on right now. Designed and built from scratch with a focus on **clean aesthetics, performance, and genuine content** rather than templates.\n\nThe design follows a **monochrome + pastel color system** inspired by modern Figma design trends: oversized typography, pill-shaped buttons, pastel accent blocks, and consistent spacing. Every page has a custom **PageBanner**, animated entries via **Framer Motion**, and fully responsive layouts down to mobile.\n\nTechnically, it's a **React 19 (CRA)** app with **React Router v6** for multi-page navigation, inline styles for component-scoped design, and CSS media queries for responsive breakpoints. Content is driven by a central `data.js` file, making updates straightforward without touching component logic.",
    techStack: ["React 19", "React Router v6", "Framer Motion", "Tailwind CSS", "JavaScript (ES6+)", "Cloudinary (media)"],
    githubUrl: "#",
    liveUrl: "#",
    status: "In Development",
    category: "Frontend",
    challenge: "Xây một portfolio thể hiện đúng chất lượng thật — tránh cảm giác template, tối ưu hiệu năng (code-splitting, lazy image), và giữ nội dung dễ cập nhật qua một data layer trung tâm thay vì sửa trực tiếp component.",
    highlights: [
      "Thiết kế hệ thống màu monochrome + pastel block riêng, không dùng theme có sẵn",
      "Kiến trúc data-driven: toàn bộ nội dung điều khiển bởi data.js, tách biệt khỏi component logic",
      "Route-level code-splitting, tối ưu ảnh qua Cloudinary, i18n song ngữ Anh/Việt",
      "Animation nhất quán toàn site bằng Framer Motion, tôn trọng prefers-reduced-motion",
    ],
    screenshots: [],
  },
  {
    id: 7,
    title: "Bakery Management System",
    role: "Full-Stack Developer",
    duration: "05/2025 – 09/2025",
    image: BakeryManagementImage,
    description:
      "A full-stack internal management system for bakery operations — built as a course assignment with real-world scope. Covers **inventory tracking**, **sales recording**, **order management**, and a **customer database**, all connected through a REST API layer.\n\nThe backend is **Java Spring Boot** with **MySQL** for persistence, exposing endpoints consumed by a **React** frontend deployed on Vercel. I handled both sides: API design, database schema, React component structure, and deployment pipeline.\n\nBuilding this solo reinforced my understanding of the full request lifecycle — from UI interaction to database query and back — and gave me confidence in designing systems end-to-end without relying on teammates to fill gaps.",
    techStack: ["React", "Java Spring Boot", "MySQL", "REST API", "Vercel"],
    githubUrl: "https://github.com/trung2605/bakery_assginment_fe",
    liveUrl: "https://bakery-assginment-fe.vercel.app/",
    status: "Completed",
    category: "Full-Stack",
    challenge: "Bài tập môn học yêu cầu phạm vi thật (inventory, sales, order, customer database) nhưng làm solo — buộc phải tự thiết kế và triển khai toàn bộ hệ thống từ database đến deployment mà không có ai chia việc.",
    highlights: [
      "Tự thiết kế API và schema database, không phụ thuộc teammate",
      "Backend Java Spring Boot + MySQL, frontend React deploy trên Vercel",
      "Tự vận hành toàn bộ pipeline: API design → database → component structure → deployment",
    ],
    screenshots: [BakeryManagementShot1],
  },
  {
    id: 11,
    title: "The MC Hub",
    role: "Full-Stack Developer (Team Project)",
    duration: "09/2025 – Present",
    image: PortfolioImage,
    description:
      "A two-sided marketplace connecting **Clients** with professional **MCs (Masters of Ceremony)** for events — weddings, galas, corporate conferences, and more. Clients can search, filter by style/price/region, view MC profiles, and book directly through the platform. MCs get a full dashboard to manage bookings, communicate with clients, track revenue, and practice scripts using an **AI Script Reader**.\n\nThe system is built for scale: **Java Spring Boot 3.3 + Java 21 Virtual Threads** on the backend for high-concurrency handling, **MongoDB Atlas** for flexible document storage, and **WebSocket/STOMP** for real-time chat. The web app runs on **React 19 + Vite 7 + TailwindCSS v4**, and the mobile app is built with **React Native + Expo**.\n\nAdditional features include **PayOS payment integration**, push notifications, KYC identity verification, a coupon/discount system, and a full **admin analytics dashboard**. This is the most technically complex project I've worked on — touching distributed systems, payment flows, mobile development, and real-time infrastructure simultaneously.",
    techStack: [
      "Java Spring Boot 3.3",
      "Java 21 (Virtual Threads)",
      "Spring Security + JWT",
      "MongoDB Atlas",
      "WebSocket (STOMP)",
      "React 19",
      "Vite 7",
      "TailwindCSS v4",
      "Zustand",
      "React Native",
      "Expo",
      "Node.js",
      "PayOS",
      "Cloudinary",
      "MapStruct",
      "Swagger / OpenAPI 3",
    ],
    githubUrl: "https://github.com/The-MC-Hub",
    liveUrl: "#",
    status: "In Development",
    category: "Full-Stack",
    challenge: "Xây một marketplace 2 chiều (Client ↔ MC) cần xử lý concurrency cao (nhiều người đặt lịch cùng lúc), thanh toán thật, chat real-time, và cả web lẫn mobile app — dự án kỹ thuật phức tạp nhất tôi từng tham gia.",
    highlights: [
      "Backend Spring Boot 3.3 + Java 21 Virtual Threads cho khả năng xử lý đồng thời cao",
      "Real-time chat qua WebSocket/STOMP, MongoDB Atlas cho dữ liệu linh hoạt",
      "Tích hợp thanh toán PayOS, xác thực KYC, hệ thống coupon/discount, admin analytics dashboard",
      "AI Script Reader hỗ trợ MC luyện tập kịch bản, web (React 19 + Vite 7) và mobile (React Native + Expo) song song",
    ],
    screenshots: [],
  },
  {
    id: 12,
    title: "SwiftBid",
    role: "Backend Developer (Team Project)",
    duration: "10/2025 – Present",
    image: TikTokUIImage,
    description:
      "A real-time **auction/bidding platform** where users list items and compete through live bids. The backend is built with **Java 21 + Spring Boot 3.5.7**, using **Spring Data JPA** for persistence and **Spring Data Redis** to track live bid state and caching for low-latency bid updates.\n\nAdditional integrations include **Cloudinary** for item image uploads, **Spring Mail/EmailJS** for bid and outbid notifications, and a relational **MySQL** schema for users, listings, and transaction history. The frontend is a **React 19** app built with Create React App, using **React Router 7** and Axios for API communication.\n\nThis project deepened my experience with real-time state management and cache-backed concurrency patterns for high-frequency bid updates.",
    techStack: ["Java 21", "Spring Boot 3.5.7", "Spring Data JPA", "Redis", "MySQL", "React 19", "React Router 7", "Cloudinary"],
    githubUrl: "https://github.com/SwiftBid-MultiThreats/SwiftBid-Backend",
    liveUrl: "#",
    status: "In Development",
    category: "Full-Stack",
    challenge: "Nền tảng đấu giá real-time cần cập nhật trạng thái bid độ trễ thấp khi nhiều người cùng đấu giá một sản phẩm — bài toán concurrency và cache-backed state kinh điển.",
    highlights: [
      "Spring Data Redis theo dõi trạng thái bid live và cache cho cập nhật độ trễ thấp",
      "Schema MySQL quan hệ cho user, listing, lịch sử giao dịch",
      "Tích hợp Cloudinary cho upload ảnh sản phẩm, Spring Mail/EmailJS cho thông báo outbid",
      "Đào sâu kinh nghiệm quản lý state real-time và pattern concurrency cache-backed",
    ],
    screenshots: [],
  },
  {
    id: 13,
    title: "AgriLink",
    role: "Full-Stack Developer (Team Project)",
    duration: "01/2025 – Present",
    image: TikTokUIImage,
    description:
      "A **Vietnamese agricultural marketplace** connecting farmers, suppliers, and customers — covering product listings, orders, reviews, and notifications. Started as an academic project (**PRM393**) with a **Flutter mobile app** and an **Express.js/MongoDB** backend secured with JWT.\n\nThe project later evolved into a more production-grade parallel build aimed at real startup viability: a **Next.js + TypeScript** frontend (Radix UI, TanStack Query, Sentry, Mapbox/d3-geo for farm location mapping) backed by a **NestJS + TypeORM** service layer. This dual-track evolution — from academic prototype to startup-grade architecture — included drafting a formal Vietnamese startup proposal document.",
    techStack: ["Flutter", "Express.js", "MongoDB", "Next.js", "TypeScript", "NestJS", "TypeORM", "TanStack Query"],
    githubUrl: "https://github.com/AgriLinkVN/agrilink-backend",
    liveUrl: "#",
    status: "Active",
    category: "Full-Stack",
    challenge: "Bắt đầu là đồ án học thuật (PRM393) nhưng đội ngũ quyết định nâng cấp thành kiến trúc production-grade hướng tới khả năng khởi nghiệp thật — đòi hỏi thiết kế lại từ mobile-only sang full-stack đa nền tảng có khả năng mở rộng.",
    highlights: [
      "Track 1 (học thuật): mobile app Flutter + backend Express.js/MongoDB xác thực JWT",
      "Track 2 (production-grade song song): frontend Next.js + TypeScript (Radix UI, TanStack Query, Sentry, Mapbox/d3-geo cho bản đồ nông trại) + backend NestJS + TypeORM",
      "Soạn thảo đề xuất khởi nghiệp chính thức bằng tiếng Việt cho mô hình sản phẩm",
    ],
    screenshots: [],
  },
  {
    id: 14,
    title: "BrandHub",
    role: "Backend Developer (Team Project)",
    duration: "05/2026 – Present",
    image: TikTokUIImage,
    description:
      "An **agency platform for managing client brand content** across social media — Facebook, Instagram, TikTok, Threads, and Zalo — with content creation/approval workflows, AI-assisted content generation, campaign scheduling, and automated multi-platform publishing.\n\nBuilt as a **microservices architecture**: an **API Gateway** (Spring Cloud Gateway, WebFlux, JWT + Redis auth), a **business-service** (Spring Boot 3.3.5, Java 21) handling core domain logic, a **publisher-service** consuming from **RabbitMQ** with retry/backoff for reliable social posting, and an **AI service** (Python FastAPI, RAG) for content generation. The frontend is a **React 18 + TypeScript + Vite** dashboard, with a companion **Expo/React Native** mobile app, all orchestrated via **Docker Compose** infrastructure.",
    techStack: ["Spring Boot", "Java 21", "Spring Cloud Gateway", "RabbitMQ", "Redis", "Python FastAPI", "React 18", "TypeScript", "Docker"],
    githubUrl: "https://github.com/BrandHubOrganization",
    liveUrl: "#",
    status: "Active",
    category: "Full-Stack",
    challenge: "Đăng nội dung đồng thời lên nhiều mạng xã hội (Facebook, Instagram, TikTok, Threads, Zalo) một cách đáng tin cậy — cần kiến trúc chịu lỗi (retry/backoff) và tách biệt rõ giữa domain logic, việc publish, và AI content generation.",
    highlights: [
      "Kiến trúc microservices: API Gateway (Spring Cloud Gateway, WebFlux, JWT+Redis auth), business-service (Spring Boot 3.3.5), publisher-service (RabbitMQ với retry/backoff), AI service (Python FastAPI + RAG)",
      "Toàn bộ hệ thống orchestrate qua Docker Compose",
      "Frontend dashboard React 18 + TypeScript + Vite, kèm mobile app Expo/React Native",
    ],
    screenshots: [],
  },
  {
    id: 16,
    title: "Yarnia",
    role: "Backend Developer (Team Project)",
    duration: "04/2026 – Present",
    image: TikTokUIImage,
    description:
      "A **children's storytelling and reading platform** (ages 3–12) combining story listening, guided reading practice, and pronunciation scoring — with a parent dashboard for tracking progress and a dedicated kid mode.\n\nThe backend is built in **.NET 9/10** following **Clean Architecture**, using **MongoDB** for storage, **JWT + Google OAuth** for auth, **Cloudinary** and **AWS S3/CloudFront** for media delivery, and **PayOS** for subscription payments — tested with **xUnit/NSubstitute**. The web app uses **React 19 + Vite + TypeScript**, **Tailwind 4**, and **TanStack Query**; the mobile app is **Expo/React Native**; and the marketing landing page uses **Three.js/react-three-fiber**, **PixiJS**, and **GSAP** for rich animation.\n\nA custom **AI training pipeline** (GPT-SoVITS-based TTS + pronunciation scoring) powers the platform's voice and reading-assessment features — the most technically diverse project I've contributed to, spanning backend, web, mobile, 3D web animation, and applied ML.",
    techStack: [".NET 9", "MongoDB", "JWT", "AWS S3", "PayOS", "React 19", "TypeScript", "TanStack Query", "Expo", "Three.js", "GPT-SoVITS"],
    githubUrl: "https://github.com/trung2605/Yarnia-Backend",
    liveUrl: "#",
    status: "Active",
    category: "Full-Stack",
    challenge: "Xây một nền tảng đọc/nghe truyện cho trẻ 3-12 tuổi với chấm điểm phát âm — đòi hỏi kết hợp backend chuẩn Clean Architecture, web/mobile app, animation 3D cho landing page, và cả một pipeline AI xử lý giọng nói riêng.",
    highlights: [
      "Backend .NET 9/10 theo Clean Architecture, test bằng xUnit/NSubstitute",
      "Auth JWT + Google OAuth, media qua Cloudinary + AWS S3/CloudFront, thanh toán subscription qua PayOS",
      "Landing page dùng Three.js/react-three-fiber, PixiJS, GSAP cho animation phong phú",
      "Pipeline AI riêng (GPT-SoVITS-based TTS + chấm điểm phát âm) — dự án đa dạng kỹ thuật nhất tôi từng góp mặt",
    ],
    screenshots: [],
  },
  {
    id: 17,
    title: "Dien Bien Phu Travel",
    role: "Solo Developer",
    duration: "12/2025 – 01/2026",
    image: TikTokUIImage,
    description:
      "A **travel showcase website** for Điện Biên Phủ province, Vietnam — converted from a static HTML site into a modern **React 19 + Vite** app with lazy-loaded imagery, card/modal-based content browsing, and safely rendered markdown content via **DOMPurify**.\n\nA **Three.js / React Three Fiber** element adds a subtle 3D visual touch to the hero section, and **Framer Motion** drives page transitions. Styled with **Tailwind CSS 4** for a clean, fast-loading layout suitable for tourism content.",
    techStack: ["React 19", "Vite", "Tailwind CSS 4", "Framer Motion", "Three.js", "DOMPurify"],
    githubUrl: "https://github.com/trung2605/DienBienPhu_Travel-",
    liveUrl: "#",
    status: "Completed",
    category: "Frontend",
    challenge: "Chuyển đổi một site tĩnh HTML lỗi thời thành một trải nghiệm React hiện đại — vừa giữ nội dung du lịch phong phú, vừa đảm bảo render markdown an toàn và hiệu năng tải nhanh cho ảnh nhiều.",
    highlights: [
      "Migrate từ static HTML sang React 19 + Vite, lazy-load ảnh toàn site",
      "Render markdown an toàn qua DOMPurify, tránh XSS từ nội dung động",
      "Thêm điểm nhấn 3D nhẹ ở hero bằng Three.js/React Three Fiber",
      "Page transition mượt bằng Framer Motion, styling Tailwind CSS 4",
    ],
    screenshots: [],
  },
  {
    id: 18,
    title: "FPT Doc Web (FPTDocAPI)",
    role: "Full-Stack Developer",
    duration: "03/2026 – Present",
    image: TikTokUIImage,
    description:
      "A **study and course-document platform** for FPT University students — featuring flashcards, quizzes, dashboards, and structured document management, seeded with real course content (e.g. MLN111).\n\nThe backend is a proper **Spring Boot 3.4.3 + MongoDB** REST API with authentication, request-logging middleware, and a maintained improvement log covering real fixes (removing a hardcoded mock user ID, resolving N+1 query issues). The frontend is a **React 18 + TypeScript** docs site with a **Monaco Editor**, Mermaid diagrams, **Recharts** dashboards, and PDF export via **TanStack Query** data fetching.",
    techStack: ["Java 21", "Spring Boot 3.4.3", "MongoDB", "React 18", "TypeScript", "TanStack Query", "Monaco Editor"],
    githubUrl: "#",
    liveUrl: "#",
    status: "Active",
    category: "Full-Stack",
    challenge: "Sinh viên FPT cần một nơi tập trung tài liệu môn học kèm công cụ ôn tập chủ động (flashcard, quiz) thay vì tài liệu rời rạc — và bản thân dự án cũng cần duy trì kỷ luật kỹ thuật tốt (log cải tiến, sửa lỗi thật) chứ không chỉ là demo.",
    highlights: [
      "REST API Spring Boot 3.4.3 + MongoDB với middleware logging request, seed nội dung môn học thật (vd MLN111)",
      "Duy trì improvement log ghi lại các fix thật: loại bỏ mock user ID hardcode, giải quyết N+1 query",
      "Frontend React 18 + TypeScript với Monaco Editor, sơ đồ Mermaid, dashboard Recharts, export PDF",
    ],
    screenshots: [],
  },
  {
    id: 19,
    title: "Instagram ChatBot",
    role: "Solo Developer",
    duration: "07/2026 – Present",
    image: TikTokUIImage,
    description:
      "An **Instagram-styled chatbot automation interface**, replicating Instagram's UI down to precise brand gradients and color tokens as a design reference. Built as a lightweight React scaffold intended to grow into a full chatbot automation tool for Instagram messaging workflows.",
    techStack: ["React 18", "Vite", "Tailwind CSS 3"],
    githubUrl: "https://github.com/Yarnia0805/Instagram_ChatBot",
    liveUrl: "#",
    status: "In Development",
    category: "Frontend",
    challenge: "Tái tạo chính xác ngôn ngữ thiết kế của Instagram (gradient, color token) làm nền tảng UI trước khi mở rộng thành công cụ tự động hoá chatbot messaging thật.",
    highlights: [
      "Scaffold React nhẹ, tái tạo chuẩn xác brand gradient và color token của Instagram",
      "Thiết kế làm nền tảng cho tính năng tự động hoá chatbot messaging trong tương lai",
    ],
    screenshots: [],
  },
  {
    id: 21,
    title: "Study Postgraduate Sydney",
    role: "Solo Developer",
    duration: "03/2026 – 04/2026",
    image: TikTokUIImage,
    description:
      "A **study-abroad consulting website** targeting students pursuing postgraduate study in Australia — covering program information, application guidance, and consultation booking, presented with rich data visualizations for program comparisons.",
    techStack: ["React 18", "Vite", "MUI", "Tailwind CSS 4", "Framer Motion", "Recharts"],
    githubUrl: "https://github.com/trung2605/Study_Post_Graduate_Sydney",
    liveUrl: "#",
    status: "Completed",
    category: "Frontend",
    challenge: "Trình bày thông tin so sánh chương trình học sau đại học phức tạp (học phí, thời lượng, yêu cầu) theo cách dễ hiểu cho học sinh, thay vì bảng dữ liệu khô khan.",
    highlights: [
      "Trực quan hoá dữ liệu so sánh chương trình học bằng Recharts",
      "Giao diện MUI + Tailwind CSS 4, animation mượt bằng Framer Motion",
      "Luồng đặt lịch tư vấn tích hợp trực tiếp trong trải nghiệm duyệt chương trình",
    ],
    screenshots: [],
  },
  {
    id: 22,
    title: "Papa Steak Website",
    role: "Solo Developer",
    duration: "01/2026 – 02/2026",
    image: TikTokUIImage,
    description:
      "A polished **restaurant landing page** for Papa Steak, a steakhouse in Đà Nẵng — featuring a dark/amber premium visual theme, multi-branch **Google Maps** integration with one-click navigation switching, a dynamic menu overlay, customer review section, and a validated reservation form built with **React Hook Form**.",
    techStack: ["React 19", "Vite", "Tailwind CSS 4", "Framer Motion", "React Hook Form", "Google Maps API"],
    githubUrl: "https://github.com/trung2605/PapaSteak_Website",
    liveUrl: "#",
    status: "Completed",
    category: "Frontend",
    challenge: "Xây dựng landing page nhà hàng cao cấp cần truyền tải cảm giác 'premium' qua visual, đồng thời giải quyết bài toán thực tế: nhà hàng có nhiều chi nhánh nên khách cần chuyển đổi bản đồ chỉ đường dễ dàng.",
    highlights: [
      "Thiết kế theme dark/amber cao cấp phù hợp thương hiệu steakhouse",
      "Tích hợp Google Maps đa chi nhánh với chuyển đổi chỉ đường một chạm",
      "Form đặt bàn có validate đầy đủ bằng React Hook Form, menu overlay động",
    ],
    screenshots: [],
  },
];

export const certificates = [
  {
    id: 1,
    category: "Language",
    name: "IELTS Academic 6.0",
    issuer: "British Council / IDP",
    year: "2026",
    dateIssued: "04/2026",
    image: IELTSRealImage,
    description:
      "Achieved an **overall band score of 6.0** (Listening 5.5, Reading 6.5, Writing 5.5, Speaking 6.0 · CEFR B2) on the Academic IELTS — demonstrating proficient academic English across all four skills. Officially administered and verified by the British Council / IDP.",
  },
  {
    id: 28,
    category: "Language",
    name: "IELTS 6.0 (Linear Certificate)",
    issuer: "DOL English",
    year: "2025",
    dateIssued: "10/2025",
    image: DOLLinearImage,
    description:
      "Linear Certificate from **DOL English's IELTS 6.0 course**, marking course completion and progress toward the target band score — a preparatory milestone ahead of sitting the official IELTS Academic test.",
  },
  {
    id: 2,
    category: "Event",
    name: "FPTU Inbound Mobility Programme",
    issuer: "Tunku Abdul Rahman University (TAR UMT), Malaysia",
    year: "2023",
    dateIssued: "12/2023",
    image: RoboticsImage,
    description:
      "Completed the **FPT University Inbound Mobility Programme** hosted at Tunku Abdul Rahman University of Management and Technology in **Kuala Lumpur, Malaysia**. Gained international academic exposure, cross-cultural communication experience, and a broader perspective on technology education across Southeast Asia.",
  },
  {
    id: 3,
    category: "Event",
    name: "Innocode Camp – Participation Certificate",
    issuer: "FPT Education",
    year: "2025",
    dateIssued: "07/2025",
    image: RoboticsImage,
    description:
      "Certificate recognizing participation and advancement to the **final round** of Innocode Camp SU25 — a project-based coding competition organized by FPT Education for university students. Our team built a job search platform and competed against finalists from multiple FPT campuses.",
  },
  {
    id: 4,
    category: "Event",
    name: "ResFres Research Festival",
    issuer: "FPT Education",
    year: "2024",
    dateIssued: "2024",
    image: DreamersResfresImage,
    description:
      "Certificate of participation and achievement in the **FPT Research Festival (ResFres 2024)** — a multi-stage academic competition covering original research, structured reporting, and formal panel presentation. Advanced to the multi-campus final round representing The Dreamers team.",
  },
  {
    id: 5,
    category: "Technology",
    name: "Build AI Agents & Automate Workflows with n8n",
    issuer: "LinkedIn Learning / FPT Software Training",
    year: "2025",
    dateIssued: "09/2025",
    image: AIAgentsImage,
    description:
      "Completed training on building **AI-powered automation workflows** using n8n — covering agent design, API chaining, conditional logic, and integration with external services. Applied directly to workflow automation tasks during the FPT Software internship.",
  },
  {
    id: 6,
    category: "Technology",
    name: "Programming with JavaScript",
    issuer: "Meta – Coursera",
    year: "2024",
    dateIssued: "05/2024",
    image: ProgrammingJSImage,
    description:
      "Completed Meta's **Programming with JavaScript** course on Coursera — part of the Meta Front-End Developer Professional Certificate. Covers ES6+ syntax, functions, objects, arrays, error handling, and testing fundamentals with Jest.",
  },
  {
    id: 7,
    category: "Technology",
    name: "Basics of Web Development & Coding",
    issuer: "University of Michigan – Coursera",
    year: "2024",
    dateIssued: "10/2024",
    image: WebDevBasicsImage,
    description:
      "Completed the University of Michigan's **Basics of Web Development & Coding** course — an introduction to how the web works, covering HTML structure, CSS styling, basic JavaScript interactivity, and browser rendering concepts.",
  },
  {
    id: 8,
    category: "Technology",
    name: "HTML and CSS in Depth",
    issuer: "Meta – Coursera",
    year: "2024",
    dateIssued: "05/2024",
    image: HTMLCSSDepthImage,
    description:
      "Completed Meta's **HTML and CSS in Depth** course — part of the Front-End Developer certificate. Deep coverage of semantic HTML5, advanced CSS selectors, the box model, Flexbox, Grid, and accessibility best practices.",
  },
  {
    id: 9,
    category: "Technology",
    name: "Interactivity with JavaScript",
    issuer: "University of Michigan – Coursera",
    year: "2024",
    dateIssued: "10/2024",
    image: InteractivityJSImage,
    description:
      "Completed the University of Michigan's **Interactivity with JavaScript** course — focusing on DOM manipulation, event listeners, form validation, and dynamic content rendering to build responsive, interactive web pages.",
  },
  {
    id: 10,
    category: "Technology",
    name: "Introduction to Front-End Development",
    issuer: "Meta – Coursera",
    year: "2024",
    dateIssued: "05/2024",
    image: IntroFrontEndImage,
    description:
      "Completed Meta's **Introduction to Front-End Development** — the foundational course of the Meta Front-End Developer Professional Certificate. Covers the role of front-end developers, core web technologies, and an introduction to React.",
  },
  {
    id: 11,
    category: "Technology",
    name: "Data Visualization",
    issuer: "IBM – Coursera",
    year: "2024",
    dateIssued: "04/2024",
    image: DataVisualizationImage,
    description:
      "Completed IBM's **Data Visualization** course on Coursera — covering principles of effective data communication, chart selection, and hands-on practice with visualization tools to transform raw data into clear, actionable insights.",
  },
  {
    id: 12,
    category: "Technology",
    name: "CSS3",
    issuer: "University of Michigan – Coursera",
    year: "2024",
    dateIssued: "09/2024",
    image: CSS3Image,
    description:
      "Completed the University of Michigan's **CSS3** course — advanced coverage of CSS3 features including transitions, animations, custom properties (CSS variables), pseudo-elements, and responsive design techniques.",
  },
  {
    id: 13,
    category: "Technology",
    name: "HTML5",
    issuer: "University of Michigan – Coursera",
    year: "2024",
    dateIssued: "09/2024",
    image: HTML5Image,
    description:
      "Completed the University of Michigan's **HTML5** course — in-depth study of HTML5 semantic elements, multimedia embedding, forms, accessibility attributes, and best practices for structuring modern web documents.",
  },
  {
    id: 14,
    category: "Technology",
    name: "Responsive Web Design",
    issuer: "University of Michigan – Coursera",
    year: "2024",
    dateIssued: "10/2024",
    image: ResponsiveImage,
    description:
      "Completed the University of Michigan's **Responsive Web Design** course — covering media queries, fluid grids, flexible images, and mobile-first design principles to build layouts that adapt seamlessly across all screen sizes.",
  },
  {
    id: 15,
    category: "Technology",
    name: "Academic Skills for University Success",
    issuer: "University of Auckland – Coursera",
    year: "2024",
    dateIssued: "05/2024",
    image: AcademicSkillsImage,
    description:
      "Completed the University of Auckland's **Academic Skills for University Success** specialization — covering critical reading, academic writing, research methodology, and time management strategies for university-level study.",
  },
  {
    id: 16,
    category: "Technology",
    name: "Fundamentals of Graphic Design",
    issuer: "California Institute of the Arts – Coursera",
    year: "2024",
    dateIssued: "05/2024",
    image: GraphicDesignImage,
    description:
      "Completed CalArts' **Fundamentals of Graphic Design** course on Coursera — covering visual design principles including typography, color theory, composition, and image-making. Applied to creating visual materials for The Dreamers events and FPT activities.",
  },
  {
    id: 17,
    category: "Technology",
    name: "Information Technology Onboarding",
    issuer: "F8 (Fullstack.edu.vn)",
    year: "2023",
    dateIssued: "07/2023",
    image: ITOnboardingImage,
    description:
      "Completed F8's **Information Technology Onboarding** course — an introduction to core IT concepts, development workflows, and foundational practices for students starting out in software development.",
  },
  {
    id: 18,
    category: "Event",
    name: "FPTU AI & Robotics Challenge 2025 — Organizing Committee",
    issuer: "FPT University",
    year: "2025",
    dateIssued: "08/2025",
    image: RoboticsImage,
    description:
      "Served on the **Organizing Committee** of the FPTU AI & Robotics Challenge 2025 — a technical competition where student teams program robots and AI systems to complete engineering challenges. Certificate awarded for contribution to competition organization and operations.",
  },
  {
    id: 29,
    category: "Other",
    name: "On-the-Job Training",
    issuer: "FPT University / FPT Software Miền Trung",
    year: "2026",
    dateIssued: "01/2026",
    image: FsoftOJTImage,
    description:
      "Officially certified completion of the **On-the-Job Training program** at Công ty TNHH Phần mềm FPT Miền Trung (FPT Software), covering September–December 2025 — the university-recognized internship placement underlying the FPT Software Developer Intern role.",
  },
  {
    id: 33,
    category: "Technology",
    name: "Build RAG Applications: Get Started",
    issuer: "IBM – Coursera",
    year: "2026",
    dateIssued: "07/2026",
    image: RAGGetStartedImage,
    description:
      "Completed IBM's **Build RAG Applications: Get Started** course on Coursera — an introduction to Retrieval-Augmented Generation (RAG) fundamentals for building AI applications that ground responses in external knowledge sources.",
  },
  {
    id: 34,
    category: "Technology",
    name: "Fundamentals of AI Agents Using RAG and LangChain",
    issuer: "IBM – Coursera",
    year: "2026",
    dateIssued: "07/2026",
    image: AIAgentsRAGLangChainImage,
    description:
      "Completed IBM's **Fundamentals of AI Agents Using RAG and LangChain** course on Coursera — covering core concepts of AI agent design, retrieval-augmented generation, and LangChain orchestration for building intelligent, context-aware agents.",
  },
  {
    id: 30,
    category: "Technology",
    name: "Project: Generative AI Applications with RAG and LangChain",
    issuer: "IBM – Coursera",
    year: "2026",
    dateIssued: "07/2026",
    image: IBMRAGLangChainImage,
    description:
      "Completed an IBM-authored Coursera project building **Generative AI applications using Retrieval-Augmented Generation (RAG) and LangChain** — covering vector retrieval, prompt orchestration, and grounding LLM outputs in external data sources.",
  },
  {
    id: 31,
    category: "Event",
    name: "Mini Leadership Conference 2025 — Student Ambassador",
    issuer: "AIESEC in Vietnam, Da Nang",
    year: "2025",
    dateIssued: "11/2025",
    image: AIESECLeadershipImage,
    description:
      "Recognized as a **Student Ambassador** for actively promoting AIESEC's Mini Leadership Conference 2025 — supporting outreach and campaign efforts for the regional youth leadership event in Da Nang.",
  },
  {
    id: 32,
    category: "Other",
    name: "FPT University Scholarship 2023",
    issuer: "FPT University",
    year: "2023",
    dateIssued: "05/2023",
    image: HocBong2023Image,
    description:
      "Awarded a **10% scholarship** for the Information Technology program (Software Engineering major) at FPT University, based on the university's 2023 scholarship examination (Điểm trắc nghiệm 44/90, Điểm luận 8/15 — Tổng điểm 52/105).",
  },
  {
    id: 23,
    category: "Technology",
    name: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2024",
    dateIssued: "03/2024",
    image: JSAlgorithmsImage,
    description:
      "Completed freeCodeCamp's **JavaScript Algorithms and Data Structures** certification — covering fundamental algorithms (sorting, searching), data structures (arrays, objects, linked lists, stacks, queues), and algorithmic problem solving in pure JavaScript.",
  },
  {
    id: 24,
    category: "Language",
    name: "Hiragana A1 Self-Study Course",
    issuer: "JF Japanese e-Learning Minato (Japan Foundation)",
    year: "2024",
    dateIssued: "09/2024",
    image: HiraganaImage,
    description:
      "Completed the **Hiragana A1 Self-Study Course** on JF Japanese e-Learning Minato, run by the Japan Foundation — mastering the full 46-character Japanese phonetic alphabet used for native Japanese words.",
  },
  {
    id: 25,
    category: "Language",
    name: "Katakana A1 Self-Study Course",
    issuer: "JF Japanese e-Learning Minato (Japan Foundation)",
    year: "2024",
    dateIssued: "09/2024",
    image: KataganaImage,
    description:
      "Completed the **Katakana A1 Self-Study Course** on JF Japanese e-Learning Minato, run by the Japan Foundation — mastering the 46-character syllabary used for foreign loanwords and technical terminology in Japanese.",
  },
  {
    id: 26,
    category: "Event",
    name: "Non Xanh Nuoc Biec – Participation",
    issuer: "FPT University / Student Union",
    year: "2024",
    dateIssued: "2024",
    image: NonXanhNuocBiecImage,
    description:
      "Certificate of participation in the **'Non Xanh Nuoc Biec'** environmental awareness event organized by FPT University's Student Union — a campus initiative promoting sustainability, green living, and student community engagement.",
  },
  {
    id: 27,
    category: "Event",
    name: "Certificate of Honor — Founder & President",
    issuer: "The Dreamers Organization",
    year: "2024",
    dateIssued: "2024",
    image: DreamerOfHonorImage,
    description:
      "Presented with **The Dreamers' Certificate of Honor** in profound recognition of visionary leadership and dedication as **Founder and President** of The Dreamers — honoring the passion and commitment that laid the foundation for the organization's journey.",
  },
  {
    id: 35,
    category: "Technology",
    name: "Create and Lead an Ethical Data-Driven Organization",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicalOrgImage,
    description:
      "Completed CertNexus's **Create and Lead an Ethical Data-Driven Organization** course on Coursera — part of a specialization on building ethical governance and leadership practices for data-driven teams.",
  },
  {
    id: 36,
    category: "Technology",
    name: "Detect and Mitigate Ethical Risks",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicalRisksImage,
    description:
      "Completed CertNexus's **Detect and Mitigate Ethical Risks** course on Coursera — covering methods to identify, assess, and reduce ethical risks in data-driven and AI-powered systems.",
  },
  {
    id: 37,
    category: "Technology",
    name: "Promote the Ethical Use of Data-Driven Technologies",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicalPromoteImage,
    description:
      "Completed CertNexus's **Promote the Ethical Use of Data-Driven Technologies** course on Coursera — covering strategies for advocating responsible, ethical adoption of data and AI technologies within organizations.",
  },
  {
    id: 38,
    category: "Technology",
    name: "Turn Ethical Frameworks into Actionable Steps",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicalActionableImage,
    description:
      "Completed CertNexus's **Turn Ethical Frameworks into Actionable Steps** course on Coursera — translating high-level ethical principles into concrete, implementable practices for data-driven organizations.",
  },
  {
    id: 39,
    category: "Technology",
    name: "Communicate Effectively about Ethical Challenges in Data-Driven Technologies",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicalCommunicateImage,
    description:
      "Completed CertNexus's **Communicate Effectively about Ethical Challenges in Data-Driven Technologies** course on Coursera — building skills to clearly discuss and navigate ethical issues in AI and data technologies with diverse stakeholders.",
  },
  {
    id: 40,
    category: "Technology",
    name: "Preparing for Your CertNexus Certification Exam",
    issuer: "CertNexus – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: CertNexusExamPrepImage,
    description:
      "Completed CertNexus's **Preparing for Your CertNexus Certification Exam** course on Coursera — the capstone course of the CertNexus ethical data specialization, reviewing key concepts and exam preparation strategies.",
  },
  {
    id: 41,
    category: "Technology",
    name: "Ethics of Artificial Intelligence",
    issuer: "Politecnico di Milano – Coursera",
    year: "2026",
    dateIssued: "05/2026",
    image: EthicsOfAIImage,
    description:
      "Completed Politecnico di Milano's **Ethics of Artificial Intelligence** course on Coursera — examining the philosophical, social, and technical dimensions of ethical AI design and deployment.",
  },
  {
    id: 42,
    category: "Technology",
    name: "Initiating and Planning Projects",
    issuer: "University of California, Irvine – Coursera",
    year: "2026",
    dateIssued: "01/2026",
    image: PMInitiatingImage,
    description:
      "Completed UC Irvine's **Initiating and Planning Projects** course on Coursera — part of a Project Management specialization, covering project charters, scope definition, and early-stage planning fundamentals.",
  },
  {
    id: 43,
    category: "Technology",
    name: "Budgeting and Scheduling Projects",
    issuer: "University of California, Irvine – Coursera",
    year: "2026",
    dateIssued: "01/2026",
    image: PMBudgetingImage,
    description:
      "Completed UC Irvine's **Budgeting and Scheduling Projects** course on Coursera — covering cost estimation, budget planning, and schedule development techniques for managing projects.",
  },
  {
    id: 44,
    category: "Technology",
    name: "Managing Project Risks and Changes",
    issuer: "University of California, Irvine – Coursera",
    year: "2026",
    dateIssued: "01/2026",
    image: PMRisksImage,
    description:
      "Completed UC Irvine's **Managing Project Risks and Changes** course on Coursera — covering risk identification, mitigation planning, and change management practices throughout the project lifecycle.",
  },
  {
    id: 45,
    category: "Technology",
    name: "Project Management Project",
    issuer: "University of California, Irvine – Coursera",
    year: "2026",
    dateIssued: "01/2026",
    image: PMCapstoneImage,
    description:
      "Completed the capstone **Project Management Project** for UC Irvine's Project Management specialization on Coursera — applying initiation, planning, budgeting, scheduling, and risk management skills to a full project simulation.",
  },
];

export const prizes = [
  {
    id: 6,
    title: "Code Mosaic Algorithm Contest",
    position: "Finalist",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Advanced to the **final round** of the Code Mosaic algorithmic contest organized by FPT Education — a competition testing data structures, algorithmic complexity, and problem-solving speed under time pressure. Competing against top CS students across FPT campuses.",
  },
  {
    id: 7,
    title: "FPT Code Talent Contest",
    position: "Finalist",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Reached the **final round** of FPT Code Talent — one of FPT's flagship annual coding competitions covering algorithms, OOP design, and system-level problem solving. A strong result that validated competitive programming preparation through consistent practice.",
  },
  {
    id: 1,
    title: "Innocode Camp SU25",
    position: "Finalist",
    year: "07/2025",
    organization: "FPT Education",
    description:
      "Advanced to the **final round** of Innocode Camp Summer 2025 — a project-based coding competition where teams build and present a working software product within a condensed timeframe. Led the team's backend development using Java Spring Boot and MySQL.",
  },
  {
    id: 2,
    title: "Research Festival (ResFres 2024)",
    position: "Finalist",
    year: "06/2024",
    organization: "FPT Education",
    description:
      "Advanced to the **final round** of the FPT University Research Festival — a campus-wide academic competition requiring teams to conduct original research, produce a formal report, and present findings to a judging panel. Developed skills in research methodology, data analysis, and academic presentation.",
  },
  {
    id: 5,
    title: "FPT ResFes 2024 – 5 Campus Scale",
    position: "Research Finalist",
    year: "05/2024",
    organization: "FPT Education",
    description:
      "Selected as a **research finalist** at the multi-campus scale of FPT ResFes 2024 — competing against research teams from all 5 FPT University campuses nationwide. One of the more selective academic achievements, requiring both technical depth and clear scientific communication.",
  },
  {
    id: 3,
    title: "Talent Contest – Final Interview Round",
    position: "Winner (First Place)",
    year: "04/2022",
    organization: "Phan Chau Trinh High School",
    description:
      "Awarded **First Place** in the high school Talent Contest final round — a school-wide competition judged on performance, charisma, and interview skills. This was an early indicator of public speaking and stage confidence that would later develop into MC hosting for 1000+ attendee events.",
  },
  {
    id: 4,
    title: "Talent & Beauty Contest (Mister)",
    position: "First Runner-up",
    year: "04/2022",
    organization: "Phan Chau Trinh High School",
    description:
      "Awarded **First Runner-up (Mister)** in the school's annual Talent and Beauty Contest — evaluated on presentation, talent performance, and personal interview. Competing among the top male representatives from across the school.",
  },
];

export const activities = [
  {
    id: 1,
    title: "Alumni Career Guidance Talk",
    role: "Guest Speaker & Mentor",
    duration: "03/01/2025",
    organization: "Phan Chau Trinh High School",
    image: AlumniGuidanceImage,
    description:
      "Invited back to my alma mater as a **guest speaker** to guide 12th-grade students on university pathways and careers in technology. Shared my personal journey from high school to FPT University and FPT Software internship — covering the Computer Science curriculum, Java development roadmap, and what actually matters in the first year of a tech career. Answered live Q&A from over 50 students.",
    status: "Completed",
  },
  {
    id: 2,
    title: "Innocode Camp – Coding Competition",
    role: "Team Leader",
    duration: "14/06/2025 – Present",
    organization: "The Dreamers / FPT Education",
    image: InnocodeCampActivityImage,
    description:
      "Led a **5-member cross-functional team** through the full development lifecycle of Innocode Camp SU25 — from problem analysis and system design to implementation and final presentation. Our team built a job search platform prototype using **React, Java Spring Boot, MySQL, and Docker**. I coordinated sprint planning, handled backend architecture decisions, and kept the team on schedule under competition deadlines. We advanced to the **final round**.",
    status: "Active",
  },
  {
    id: 3,
    title: "Mic Home Club & FUM Club",
    role: "Core Member & Event Host",
    duration: "01/2024 – 02/2025",
    organization: "FPT University",
    image: MicHomeFUMClubImage,
    description:
      "Active core member of two of FPT University Da Nang's most prominent event and public speaking clubs. Regularly served as **MC and host** for university-scale events — including orientation ceremonies, cultural festivals, and academic competitions — with live audiences of **600 to 1000+ attendees**. Developed strong stage presence, improvisational recovery skills, and the ability to read and guide large crowds through multi-hour programs.",
    status: "Completed",
  },
  {
    id: 4,
    title: "Dreamer ResFres – Research Festival",
    role: "Team Leader",
    duration: "20/03/2024 – 11/05/2024",
    organization: "The Dreamers / FPT Education",
    image: ResFresActivityImage,
    description:
      "Led The Dreamers team through **FPT's Research Festival (ResFres)** — a multi-stage academic competition requiring original research, structured report writing, and formal panel presentations. Managed task distribution across team members, maintained the research timeline, and coached teammates on presenting technical findings clearly to a non-technical jury. The team advanced to the **multi-campus final round**.",
    status: "Completed",
  },
  {
    id: 5,
    title: "Gala – Hon Thien Dat Viet",
    role: "External Relations & Main Coordinator",
    duration: "22/06/2024 – 02/07/2024",
    organization: "FPT University",
    image: GalaHonTanDatVietImage,
    description:
      "Served as **main coordinator and external relations lead** for the 'Hon Thien Dat Viet' cultural gala — a large-scale university event celebrating Vietnamese heritage. Responsibilities included liaising with external partners and sponsors, coordinating logistics across departments, managing the event timeline on the day, and troubleshooting live issues during the program. Gained practical experience in high-stakes event diplomacy and multi-stakeholder coordination.",
    status: "Completed",
  },
  {
    id: 6,
    title: "The Dreamers – Charity Fundraising Campaign",
    role: "Project Leader & Treasurer",
    duration: "01/12/2024 – 31/12/2024",
    organization: "The Dreamers Organization",
    image: CharityFundraisingImage,
    description:
      "Designed and led The Dreamers' end-of-year fundraising campaign — coordinating sales activities, tracking contributions, and managing the budget as **treasurer**. Funds raised were directed entirely toward charity missions to local orphanages, covering meals, educational materials, and technology workshops. The campaign met its internal revenue target within the month and established a repeatable fundraising model for future cycles.",
    status: "Active",
  },
  {
    id: 7,
    title: "Charity Missions – AHT Cooperation",
    role: "Participant & Organizer",
    duration: "Various",
    organization: "AHT Cooperation",
    image: CharityMissionsImage,
    description:
      "Participated in and helped organize multiple charity field missions through AHT Cooperation — including orphanage visits, community fundraising drives, and the 'Hanh trinh tu thien ocean.zero6' initiative. Activities ranged from direct on-site volunteering (distributing supplies, running mini-workshops for children) to backend logistics (transport coordination, documentation, and post-event reporting).",
    status: "Completed",
  },
  {
    id: 8,
    title: "Workshop MC – 'Make Your Image Better'",
    role: "Master of Ceremonies",
    duration: "04/10/2025",
    organization: "FPT University",
    image: WorkshopMakeImageBetterImage,
    description:
      "Hosted the **'Make Your Image Better'** university workshop as MC — a session focused on personal branding, appearance, and professional presence for students entering the job market. Managed the program flow, introduced speakers, facilitated audience interaction, and kept energy high across a multi-segment event. This was one of several workshops I've hosted, building a consistent track record in professional event facilitation.",
    status: "Completed",
  },
  {
    id: 9,
    title: "Gender Equality Workshop – Program MC",
    role: "Master of Ceremonies",
    duration: "02/03/2024",
    organization: "FPT University",
    image: GenderEqualityMCImage,
    description:
      "Served as MC for the **'Gender Equality in the Workplace'** workshop — a sensitive and important topic requiring careful tone, inclusive language, and the ability to facilitate open discussion. Introduced panelists, moderated Q&A segments, and ensured a respectful environment throughout. This experience expanded my ability to host programs that go beyond entertainment into social education.",
    status: "Completed",
  },
  {
    id: 10,
    title: "University Event Collaborator",
    role: "Student Representative & Guide",
    duration: "Various",
    organization: "FPT University",
    image: CollaborationEventsImage,
    description:
      "Ongoing involvement as a **student representative and event guide** across a range of FPT University activities — including new student orientation, admission open days, volunteer recruitment drives, and inter-department collaboration events. Consistently trusted to represent the university face-to-face with prospective students and their families, requiring clear communication, patience, and campus knowledge.",
    status: "Active",
  },
  {
    id: 11,
    title: "Student Actor / Model / Content Creator",
    role: "Actor, Model & Vlogger",
    duration: "02/2024 – Present",
    organization: "Honda Tien Thu / LenDoan Bridal / FPT",
    image: MediaRolesImage,
    description:
      "Accumulated diverse media experience across three distinct roles: **Commercial Actor** for Honda Tien Thu dealership promotional content; **Model** for LenDoan Bridal and FPT University official photography and event materials; and **Vlogger/Content Creator** producing and editing video content for social platforms. These experiences developed adaptability, camera confidence, and creative production skills — a different but complementary dimension to technical work.",
    status: "Various",
  },
  {
    id: 12,
    title: "The Dreamers – Member Recruitment Drive",
    role: "Recruitment Leader",
    duration: "13/10/2024 – 27/10/2024",
    organization: "The Dreamers Organization",
    image: TuyenThanhVienDreamersImage,
    description:
      "Designed and led The Dreamers' **second-round member recruitment campaign** — drafting the recruitment criteria, creating application materials, organizing interview sessions, and selecting candidates who aligned with the organization's mission and culture. Successfully onboarded a new cohort of members who went on to contribute to the Dream High project and charity missions.",
    status: "Completed",
  },
  {
    id: 13,
    title: "Tot Hy Vong Event",
    role: "Event Leader",
    duration: "10/01/2025",
    organization: "The Dreamers Organization",
    image: TotHyVongImage,
    description:
      "Led the full planning and execution of **'Tot Hy Vong'** — a charity event organized by The Dreamers bringing joy, gifts, and educational activities to underprivileged children. Coordinated volunteer assignments, managed the day-of schedule, handled contingencies on-site, and oversaw post-event documentation. The event reinforced the organization's mission of using community action to create tangible social impact.",
    status: "Completed",
  },
  {
    id: 14,
    title: "Vong vao Mong mo Event",
    role: "Event Leader",
    duration: "09/03/2025 – 16/03/2025",
    organization: "The Dreamers Organization",
    image: VongVaoMongMoImage,
    description:
      "Led the organization team for **'Vong vao Mong mo'** — a week-long initiative by The Dreamers designed to inspire ambition and self-belief in young participants through storytelling, mentorship sessions, and interactive workshops. Managed the full event arc: concept development, logistics, volunteer coordination, and wrap-up. A meaningful project that connected The Dreamers' mission with direct youth empowerment.",
    status: "Completed",
  },
  {
    id: 15,
    title: "Dream High Project",
    role: "Project Leader",
    duration: "27/11/2024 – 22/05/2025",
    organization: "The Dreamers Organization",
    image: DuAnDreamHighImage,
    description:
      "Led **Dream High** — The Dreamers' flagship long-term project spanning 6 months, focused on bringing technology literacy and personal development to orphaned children through structured weekly sessions. As project leader, I oversaw curriculum design, volunteer scheduling, partner coordination, and progress tracking. The project ran bi-weekly workshops covering basic coding concepts, communication skills, and goal-setting exercises for children aged 8–15.",
    status: "In Progress",
  },
  {
    id: 16,
    title: "AI & Robotics Competition – Official Referee",
    role: "Head Referee",
    duration: "05/07/2025 – 08/07/2025",
    organization: "FPT University",
    image: AIRoboticsImage,
    description:
      "Selected as **head referee** for FPT University's AI & Robotics Competition — a technical contest where student teams program robots and AI systems to complete specified challenges. Responsibilities included enforcing competition rules impartially, evaluating technical compliance of robot designs, managing time-keeping during rounds, and resolving disputes between teams. Being chosen for this role reflects trust from faculty in both technical understanding and professional conduct.",
    status: "Completed",
  },
  {
    id: 17,
    title: "Charity Music Performance – Event Manager",
    role: "Event Manager",
    duration: "05/07/2025 – 31/07/2025",
    organization: "The Dreamers Organization",
    image: DienNhacTuThienImage,
    description:
      "Managed The Dreamers' **charity music performance event** from planning through execution — coordinating performers, securing the venue, handling ticket/donation logistics, and managing volunteer teams on the day. The concert raised funds directed toward orphanage support programs. This was the largest production The Dreamers had organized, requiring multi-week preparation and real-time problem solving during the live event.",
    status: "Completed",
  },
  {
    id: 18,
    title: "August Revolution Commemorative Photoshoot",
    role: "Photo Model",
    duration: "27/08/2025",
    organization: "FPT University",
    image: BoAnhKyNiemImage,
    description:
      "Selected as **photo model** for FPT University's official commemorative photo series marking the anniversary of the August Revolution. Worked with the university's media team to produce formal portraits and group compositions used in official communications and campus displays. Part of an ongoing involvement in FPT's visual media and branding activities.",
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
  {
    name: "Instagram",
    url: "https://www.instagram.com/trung.le.2605/?hl=en",
    icon: "FaInstagram",
  },
];

export const allSkillsData = [
  // -------------------------------------------------------------
  // NGÔN NGỮ LẬP TRÌNH CỐT LÕI (Xanh Lam & Vàng)
  // -------------------------------------------------------------
  { name: "Java", color: "from-blue-600 to-indigo-700", level: 80 }, // Màu chính đậm
  {
    name: "JavaScript",
    color: "from-yellow-400 to-yellow-500", // Giữ màu Vàng nổi bật
    level: 0,
  },
  { name: "C / C++", color: "from-blue-400 to-cyan-500", level: 0 },
  { name: "Python", color: "from-blue-500 to-teal-500", level: 0 },

  // -------------------------------------------------------------
  // FRAMEWORKS & BACKEND (Xanh Lá/Xanh Lam)
  // -------------------------------------------------------------
  {
    name: "Spring Boot",
    color: "from-green-500 to-green-700", // Xanh lá cây đồng bộ
    level: 0,
  },
  {
    name: "Node.js",
    color: "from-green-600 to-teal-700",
    level: 0,
  },
  {
    name: "Java Website (Servlets/JSP)",
    color: "from-indigo-500 to-purple-600",
    level: 0,
  },

  // -------------------------------------------------------------
  // FRONTEND & WEB (Xanh Lam & Tím)
  // -------------------------------------------------------------
  {
    name: "React (F8/Coursera)",
    color: "from-cyan-400 to-blue-600",
    level: 0,
  },
  {
    name: "HTML & CSS in DEPTH",
    color: "from-purple-500 to-indigo-600",
    level: 0,
  },
  {
    name: "Intro to Web Development",
    color: "from-blue-300 to-blue-500",
    level: 0,
  },

  // -------------------------------------------------------------
  // CƠ SỞ DỮ LIỆU (DATABASE) (Xanh Lam/Teal)
  // -------------------------------------------------------------
  {
    name: "Database MySQL / Relational DB",
    color: "from-sky-500 to-blue-600",
    level: 0,
  },
  {
    name: "Database MongoDB",
    color: "from-teal-600 to-cyan-700",
    level: 0,
  },
  {
    name: "Database Visualization",
    color: "from-indigo-600 to-purple-700",
    level: 0,
  },

  // -------------------------------------------------------------
  // LOW-CODE & AUTOMATION (Đỏ/Tím để nổi bật tính Nền tảng)
  // -------------------------------------------------------------
  {
    name: "OutSystems",
    color: "from-red-600 to-pink-700", // Màu mới
    level: 0,
  },
  {
    name: "Make.com / N8N Automation",
    color: "from-fuchsia-600 to-purple-700",
    level: 0,
  },

  // -------------------------------------------------------------
  // KỸ NĂNG KHÁC & CHUYÊN MÔN SÂU (Teal & Xám)
  // -------------------------------------------------------------
  {
    name: "Data Structure and Algorithm",
    color: "from-teal-500 to-cyan-600",
    level: 0,
  },
  {
    name: "DevOps",
    color: "from-gray-600 to-gray-800", // Tông Xám trung tính hơn
    level: 0,
  },
  {
    name: "Data Analysis With Python",
    color: "from-yellow-700 to-amber-800",
    level: 0,
  },
  {
    name: "Scientific Computing with Python",
    color: "from-gray-700 to-gray-900",
    level: 0,
  },
  {
    name: "Phỏng vấn lập trình",
    color: "from-lime-600 to-green-700",
    level: 0,
  },
  {
    name: "Mục lục các hàm trong code C",
    color: "from-cyan-500 to-blue-600",
    level: 0,
  },
  {
    name: "Kiến thức khác",
    color: "from-yellow-400 to-amber-500",
    level: 0,
  },
];

//Site Navigation Data
export const siteNavigation = [
    {
        title: "Home",
        desc: "Welcome to my portfolio",
        icon: <FaHome />,
        path: "/",
    },
    {
        title: "About",
        desc: "Learn about my journey and passion",
        icon: <FaUser />,
        path: "/about",
    },
    {
        title: "Projects",
        desc: "Explore the projects I have worked on",
        icon: <FaLaptopCode />,
        path: "/projects",
    },

    {
        title: "Education & Certificates",
        desc: "My academic journey and verified skills",
        icon: <FaGraduationCap />,
        path: "/education",
    },
    {
        title: "Activities",
        desc: "My extracurricular involvement and leadership",
        icon: <FaUsers />,
        path: "/activities",
    },
    {
        title: "Blog",
        desc: "Technical writing and project deep-dives",
        icon: <FaNewspaper />,
        path: "/blog",
    },
    {
        title: "Resume",
        desc: "View my resume online",
        icon: <FaFileAlt />,
        path: "/resume",
    },
    {
        title: "Contact",
        desc: "Get in touch with me",
        icon: <FaEnvelope />,
        path: "/contact",
    },
];

export const experience = [
  {
    id: 1,
    company: "FPT Software",
    role: "Software Developer Intern",
    type: "Internship",
    duration: "09/2025 – Present",
    status: "Current",
    description:
      "Working as a software developer intern at FPT Software — one of Vietnam's largest technology companies with global delivery centers. Developing enterprise applications on the **OutSystems low-code platform**, gaining exposure to professional Agile workflows, code review practices, and enterprise client requirements. Contributing to real project deliveries alongside senior engineers.",
    skills: ["OutSystems", "Low-Code Development", "Agile/Scrum", "Enterprise Software"],
    color: "#dceeb1",
  },
  {
    id: 2,
    company: "The Dreamers Organization",
    role: "Founder & President",
    type: "Leadership",
    duration: "06/2025 – Present",
    status: "Current",
    description:
      "Founded and lead a student-run charity organization at FPT University, managing a team of 15+ active members. Oversee project planning, fundraising operations, event production, and partnership development. Responsible for the organization's strategic direction and community impact programs targeting orphaned and underprivileged youth.",
    skills: ["Team Leadership", "Project Management", "Event Production", "Community Outreach"],
    color: "#c5b0f4",
  },
  {
    id: 3,
    company: "FPT University / Various Events",
    role: "Event MC & Host",
    type: "Part-time",
    duration: "01/2024 – 02/2025",
    status: "Completed",
    description:
      "Regular MC and event host for FPT University's large-scale programs — including orientation ceremonies, cultural galas, workshops, and academic competitions. Hosted live events with 600–1000+ attendees, managing full program flow, audience engagement, and real-time improvisation when required.",
    skills: ["Public Speaking", "Event Hosting", "Improvisation", "Audience Management"],
    color: "#f3c9b6",
  },
];

export const languages = [
  {
    name: "Vietnamese",
    level: "Native",
    proficiency: 100,
    description: "Native language",
    flag: "🇻🇳",
  },
  {
    name: "English",
    level: "Professional Working",
    proficiency: 78,
    description: "IELTS 6.0 (Linear) — 2024",
    flag: "🇬🇧",
  },
  {
    name: "Japanese",
    level: "Beginner",
    proficiency: 20,
    description: "Hiragana & Katakana completed — self-study",
    flag: "🇯🇵",
  },
];

export const funFacts = [
  {
    icon: <FaMicrophone />,
    title: "MC for 1,000+ Attendees",
    description:
      "Hosted university events with live audiences up to 1,000 people — managing program flow, speakers, and unexpected moments on stage.",
  },
  {
    icon: <FaFilm />,
    title: "Commercial Actor & Model",
    description:
      "Appeared in commercial spots for Honda Tien Thu dealership and modeled for FPT University's official photography and bridal brand LenDoan.",
  },
  {
    icon: <FaTrophy />,
    title: "5× Competition Finalist",
    description:
      "Reached final rounds at FPT Code Talent, Innocode Camp, ResFes (×2), and Code Mosaic — all while balancing internship and organization work.",
  },
  {
    icon: <FaLightbulb />,
    title: "Founded a Charity at 19",
    description:
      "Started The Dreamers Organization at age 19, growing it to 15+ members and running 6+ community events focused on tech education for orphaned children.",
  },
  {
    icon: <FaBook />,
    title: "Self-Learning Japanese",
    description:
      "Teaching myself Japanese from scratch — completed Hiragana and Katakana alongside full-time CS studies and internship. Because why not.",
  },
  {
    icon: <FaSun />,
    title: "Wakes Up at 5:30 AM",
    description:
      "Morning runs and football sessions before 7 AM most days. Physical discipline shapes how I approach deadlines and pressure.",
  },
];

const TOTAL_PROJECTS = projects.length;
const TOTAL_CERTIFICATES = certificates.length;
const TOTAL_AWARDS = prizes.length;

// Lấy timestamp
const timestamp = Date.now();
const currentYear = new Date(timestamp).getFullYear();
const YEARS_OF_STUDY = currentYear - 2023 + 1;

export const stats = [
  {
    label: "Years of Study",
    value: `${YEARS_OF_STUDY}+`,
    icon: FaGraduationCap,
    color: "text-blue-600",
  },
  {
    label: "Projects Completed",
    value: `${TOTAL_PROJECTS}+`,
    icon: FaCode,
    color: "text-green-600",
  },
  {
    label: "Certifications",
    value: `${TOTAL_CERTIFICATES}+`,
    icon: FaCertificate,
    color: "text-purple-600",
  },
  {
    label: "Awards/Finals",
    value: `${TOTAL_AWARDS}+`,
    icon: FaTrophy,
    color: "text-red-600",
  },
];

export const posts = [
  {
    id: 1,
    slug: "threadlearn-javascript-concurrency-bugs",
    title: "Dạy một model 1.5B tham số sửa lỗi concurrency JavaScript",
    excerpt: "Bên trong ThreadLearn: fine-tune Qwen2.5-Coder-1.5B bằng QLoRA, ghép RAG pipeline dựa trên BM25, và vì sao model nhỏ lại thắng GPT-3.5-turbo trên một domain hẹp.",
    date: "2026-06-11",
    tags: ["AI", "RAG", "Fine-tuning", "JavaScript", "FastAPI"],
    readTime: "9 min read",
    content: `JavaScript chạy trên một luồng duy nhất — single-threaded event loop — nhưng lại xử lý hàng loạt tác vụ bất đồng bộ cùng lúc qua callback, Promise, async/await. Chính khoảng cách giữa "một luồng" và "nhiều tác vụ chồng lấp" đó tạo ra một lớp lỗi rất khó chịu: **concurrency bugs**. Theo nghiên cứu NodeCB (ASE 2017) phân tích 57 lỗi thực tế trên 53 dự án Node.js, 93% trong số đó gây hậu quả nghiêm trọng — crash server, sai dữ liệu, hoặc treo vĩnh viễn. Và chúng gần như không bao giờ lộ diện khi chạy test đơn lẻ.

Ví dụ kinh điển — hai request cùng đọc rồi cùng ghi:

\`\`\`javascript
const stock = await db.getStock(productId);   // cả 2 request đọc được stock = 1
await db.setStock(productId, stock - 1);       // cả 2 request đặt stock = 0
// bán được 2 sản phẩm, kho chỉ có 1 — race condition
\`\`\`

Công cụ tĩnh như ESLint chỉ báo lỗi, không sửa. Gọi GPT-4 thì tốn phí, cần internet, và không chuyên biệt cho domain này. **ThreadLearn** — đồ án môn WDP301 tại FPT University tôi làm cùng hai bạn cùng nhóm — thử một hướng khác: fine-tune một model nhỏ (Qwen2.5-Coder-1.5B) để chuyên trị đúng một loại lỗi, rồi bù kiến thức còn thiếu bằng RAG.

## Vì sao model nhỏ, không phải GPT-4

Ba lý do thực dụng: chi phí, độ trễ, và khả năng chạy offline trong môi trường doanh nghiệp có firewall. Nhóm chọn **Qwen2.5-Coder-1.5B** — đủ nhỏ để chạy trên GPU 8GB, đủ mạnh vì đã pretrain trên hàng trăm tỷ token code — rồi fine-tune bằng **QLoRA** (load model 4-bit NF4, chỉ train một adapter LoRA rank 16, tức khoảng 0.5% tổng tham số). Toàn bộ quá trình chạy trên 2×T4 miễn phí của Kaggle, khoảng 2 giờ.

Phần fine-tuning (783 cặp code lỗi/đã sửa, dataset thu thập từ GitHub + viết tay) là công của bạn cùng nhóm Hà Văn Ân. Phần tôi trực tiếp phụ trách là **RAG pipeline và API server** — chỗ đáng kể nhất về mặt kỹ thuật, nên đây là phần tôi kể chi tiết.

## RAG: vì sao BM25, không phải vector search

Với JavaScript, người lập trình biết chính xác tên API cần tìm — \`Promise.all\`, \`setTimeout\`, \`appendFile\`. Đó là bài toán exact-keyword-match, không phải semantic similarity. Vector search (FAISS, Chroma) cần GPU để embed, cần model 500MB+, và đôi khi bỏ sót match chính xác vì tối ưu cho "ý nghĩa gần giống" chứ không phải "đúng từ khóa". **BM25** — thuật toán tìm kiếm dựa trên tần suất từ, cải tiến từ TF-IDF — build index cho 2050 tài liệu trong dưới 500ms, không cần GPU, và cho kết quả tốt hơn trên domain code.

Vấn đề là BM25 mặc định tokenize kém với code: \`setTimeout\` bị vỡ thành \`["set", "timeout"]\`, \`fetchAllUsers\` thành \`["fetch", "all", "users"]\`. Khi query chứa \`setTimeout\` nguyên vẹn, nó khớp yếu hơn với tài liệu đã bị tách vụn. Bản đầu tôi viết regex tokenizer để tách CamelCase — chạy được nhưng vẫn làm vỡ tên API khi trích keyword từ code đầu vào.

Bản sửa sau dùng **esprima parse code thành AST**, rồi chỉ lấy token loại \`Identifier\` — tên hàm/biến do lập trình viên đặt — bỏ qua keyword ngôn ngữ (\`async\`, \`await\`, \`for\`):

\`\`\`python
script = esprima.parseScript(code, options={"tolerant": True, "tokens": True})
for tok in script.tokens:
    if tok.type == "Identifier" and tok.value not in _JS_STOPWORDS:
        result.append(tok.value)
\`\`\`

So sánh trực tiếp: \`fs.appendFile(logPath, data)\` qua regex tokenizer ra \`"fs append file path data"\` — appendFile bị vỡ. Qua AST extraction ra \`"fs appendFile logPath data"\` — nguyên vẹn. Tên API giữ nguyên nghĩa là BM25 score cao hơn với đúng tài liệu, và top-3 doc trả về chính xác hơn đáng kể.

## Kết quả — và vì sao fine-tuning quan trọng hơn RAG

Đánh giá trên 20 test case thủ công phủ 8 loại lỗi concurrency (race condition, event loop blocking, unhandled rejection, callback hell, zalgo, context loss...), chấm bằng Fix-Pattern Scoring (kiểm tra output chứa pattern fix đúng, không so khớp cứng với đáp án mẫu):

| Phương pháp | Pass | Partial | Fail | Pass Rate |
|---|---|---|---|---|
| GPT-3.5-turbo zero-shot | 6 | 11 | 3 | 30% |
| Qwen2.5-Coder-1.5B (base, chưa fine-tune) | 8 | 9 | 3 | 40% |
| ThreadLearn RAW (fine-tune, không RAG) | 14 | 6 | 0 | 70% |
| **ThreadLearn + RAG** | **15** | **5** | **0** | **75%** |

![Ablation chart](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871855/my-website/assets/blog/threadlearn/fig_ablation.png)

### Benchmark 2 — 30 case real-world (từ npm packages thật trên GitHub Issues)

ThreadLearn + pipeline đạt **73.3% (22/30)**, vượt GPT-3.5-turbo + pipeline **65.0%** (19.5/30). Chi tiết tại \`server/tests/real_world/README.md\`.

### Phân tích

Fine-tuning đóng góp **+30pp** (40% → 70%), RAG **+5pp** (70% → 75%). 783 mẫu training đủ để model học pattern fix cụ thể; RAG giúp các case khó cần thêm ngữ cảnh ngoài training data. Không có case nào FAIL hoàn toàn — model luôn sinh ra code đọc được.

**3 category còn yếu**: Zalgo (0/1), Double Callback (0/1), Buffer Leak (0/1) — pattern rất đặc thù, ít xuất hiện trong dataset.

Event Loop Blocking đạt **100% (5/5)** — training data phủ tốt nhất.

![Per-category chi tiết](https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783871858/my-website/assets/blog/threadlearn/fig_category.png)

## Bài học

Model nhỏ (~1.5B), fine-tune trên domain hẹp, **vượt GPT-3.5 (175B) dù nhỏ hơn 125 lần** — không phải vì "giỏi hơn", mà vì không phải gánh kiến thức không liên quan. BM25 + AST extraction rẻ, nhanh, offline. Khi thiết kế retrieval cho code, exact keyword match quan trọng hơn semantic similarity.

---

*Vai trò nhóm: **Lê Trí Trung** (AI2 — RAG Pipeline, FastAPI Server, Race Detector) · Hà Văn Ân (AI1 — Dataset Collection, QLoRA Fine-tuning) · Nguyễn Thị Thúy Hoài (Đánh giá mô hình & viết báo cáo). FPT University, Da Nang.*

Code, dataset, và bài nghiên cứu: [github.com/ThreadLearn/ThreadLearn_AI_Trainning](https://github.com/ThreadLearn/ThreadLearn_AI_Trainning). Bản PDF đầy đủ: \`/d/FPT/threadlearn_paper-full.pdf\`. Visual demo site: [github.com/ThreadLearn/ThreadLearn-AI-Visual](https://github.com/ThreadLearn/ThreadLearn-AI-Visual).`,
  },
];

export const testimonials = [
  // Để trống — điền lời nhận xét thật (mentor/giảng viên/đồng đội) vào đây theo shape:
  // { id: 1, name: "...", role: "...", company: "...", quote: "...", avatar: "..." }
];

// proficiency (0-100) suy luận từ số lượng + độ sâu sử dụng qua các project — tự tinh chỉnh lại nếu muốn phản ánh đúng hơn cảm nhận thật
export const skillTaxonomy = [
  { id: "react", label: "React", category: "Frontend", proficiency: 90, projectIds: [1, 4, 6, 7, 10, 11, 12, 16, 17, 18, 19, 21, 22] },
  { id: "spring-boot", label: "Java Spring Boot", category: "Backend", proficiency: 85, projectIds: [1, 2, 3, 7, 11, 12, 14, 18] },
  { id: "typescript", label: "TypeScript", category: "Language", proficiency: 70, projectIds: [13, 14, 16, 18] },
  { id: "mongodb", label: "MongoDB", category: "Database", proficiency: 70, projectIds: [11, 13, 14, 16, 18] },
  { id: "sql", label: "MySQL / SQL Server", category: "Database", proficiency: 75, projectIds: [1, 2, 7, 12] },
  { id: "tailwind", label: "Tailwind CSS", category: "Frontend", proficiency: 80, projectIds: [10, 11, 16, 17, 19, 21, 22] },
  { id: "framer-motion", label: "Framer Motion", category: "Frontend", proficiency: 75, projectIds: [10, 17, 21, 22] },
  { id: "node", label: "Node.js / Express.js", category: "Backend", proficiency: 60, projectIds: [4, 11, 13] },
  { id: "redis", label: "Redis", category: "Backend", proficiency: 55, projectIds: [11, 12, 14] },
  { id: "docker", label: "Docker", category: "DevOps", proficiency: 50, projectIds: [14] },
  { id: "threejs", label: "Three.js", category: "Frontend", proficiency: 45, projectIds: [16, 17] },
  { id: "outsystems", label: "OutSystems", category: "Low-Code", proficiency: 65, projectIds: [5] },
  { id: "google-maps", label: "Google Maps API", category: "Integration", proficiency: 60, projectIds: [2, 22] },
  { id: "leadership", label: "Project & Team Leadership", category: "Soft Skill", proficiency: 80, projectIds: [1, 2, 3] },
];
