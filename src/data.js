
// Project Image Imports
import JobFinderImage from './assets/projects/JobFinder.png';
import DolaBakeryImage from './assets/projects/DolaBakery.png';
import TheDreamersOrganizationImage from './assets/projects/TheDreamers.png';
import WebFormAutomationImage from './assets/projects/WebFormAutomation.png';
import BookShopOutsystemsImage from './assets/projects/BookShopOutsystems.png';
import TikTokUIImage from './assets/projects/ComingSoon.png';
import DSAImage from './assets/projects/DSA.png';
import PortfolioImage from './assets/projects/Portfolio.png';

//Certificate Imports
import IELTS_6_0_Image from './assets/Certificate/Language/TrungLeTri_Linear_certificate_IELTS_6.0.png';
import HiraganaImage from './assets/Certificate/Language/Completion_Hiragana.png';
import KataganaImage from './assets/Certificate/Language/Completion_katagana.png';
import DreamersResfresImage from './assets/Certificate/Event/DreamersResfres.png';
import NonXanhNuocBiecImage from './assets/Certificate/Event/NonXanhNuocBiec.png';
import DreamerOfHonorImage from './assets/Certificate/Other/DreamerOfHonor.png';
import AcademicSkillsImage from './assets/Certificate/TechnologyCertificates/AcademicSkills for University Success-1.png';
import WebDevBasicsImage from './assets/Certificate/TechnologyCertificates/Basics of web development & coding _ Michigan-1.png';
import AIAgentsImage from './assets/Certificate/TechnologyCertificates/CertificateOfCompletion_Build AI Agents and Automate Workflows with n8n-1.png';
import CSS3Image from './assets/Certificate/TechnologyCertificates/CSS3＿Michigan-1.png';
import DataVisualizationImage from './assets/Certificate/TechnologyCertificates/Data Visualization.png';
import GraphicDesignImage from './assets/Certificate/TechnologyCertificates/Fundamentals of Graphic Design-1.png';
import HTMLCSSDepthImage from './assets/Certificate/TechnologyCertificates/HTML and CSS in depth-1.png';
import HTML5Image from './assets/Certificate/TechnologyCertificates/Html5_Michigan-1.png';
import ITOnboardingImage from './assets/Certificate/TechnologyCertificates/Information Technology Onboarding-1.png';
import InteractivityJSImage from './assets/Certificate/TechnologyCertificates/Interactivity with JavaScript _ Michigan-1.png';
import IntroFrontEndImage from './assets/Certificate/TechnologyCertificates/Introduction to Front-End Development-1.png';
import JSAlgorithmsImage from './assets/Certificate/TechnologyCertificates/JavaScript Algorithms.png';
import ProgrammingJSImage from './assets/Certificate/TechnologyCertificates/Programming with JavaScript-1.png';
import ResponsiveImage from './assets/Certificate/TechnologyCertificates/Reponsive_ Michigan-1.png';
import RoboticsImage from './assets/Certificate/TechnologyCertificates/Robotics.jpg';

export const personalInfo = {
    name: "Lê Trí Trung",
    title: "Java Developer | Computer Science Student",
    profileImage: "https://via.placeholder.com/200",
    intro: "Highly motivated Computer Science student with a strong foundation in web development. Proficient in Java Spring Boot, JavaScript, React, HTML/CSS, and passionate about creating clean, scalable applications. Seeking a Web Developer internship to apply my skills and contribute to a collaborative team.",
    contact: {
        email: "letritrung2605@gmail.com",
        phone: "(+84) 912 158 715",
        birthday: "26/05/2005",
        location: "Hai Chau district, Da Nang city, Viet Nam",
        facebook: "trung.le.2605" //
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
        degree: "University (Computer Science)",
        duration: "09/2023 - Present",
        gpa: "8.25/10.0",
        status: "Current",
        description: "Currently pursuing a Bachelor of Science in Computer Science. My coursework emphasizes software development, data structures, and algorithms. I am actively focused on backend technologies, particularly Java Spring Boot, and gaining practical experience through team projects and coding competitions."
    },
    {
        id: 2, 
        school: "Tunku Abdul Rahman University of Management and Technology (TAR UMT)",
        degree: "Inbound Mobility Programme",
        duration: "12/2023",
        gpa: "Not Applicable", 
        status: "Completed",
        description: "Participation in the FPTU Inbound Mobility Programme in Kuala Lumpur, Malaysia. Gained international exposure to diverse academic and cultural environments, enhancing adaptability and cross-cultural communication skills."
    },
    {
        id: 3,
        school: "Phan Chau Trinh High School",
        degree: "High School Diploma",
        duration: "09/2020 - 06/2023",
        gpa: "9.3/10.0",
        status: "Graduated",
        description: "Graduated with an excellent academic GPA of 9.3/10.0. The curriculum provided a strong foundation in Mathematics, Physics, and analytical skills, which served as a crucial stepping stone for my current Computer Science studies and problem-solving approach."
    }
];

export const skills = [
    {
        category: "Programming Languages",
        items: [
            { name: "Java Core & Spring Boot", level: 70 },
            { name: "Javascript Es6", level: 65 },
            { name: "HTML5 & CSS3", level: 75 },
            { name: "API Development (RESTful)", level: 65 }
        ]
    },
    {
        category: "Frameworks & Libraries",
        items: [
            { name: "Spring Boot", level: 65 },
            { name: "ReactJS (Hooks, API, JSX)", level: 60 },
            { name: "Java Servlets", level: 55 },
            { name: "React Hooks", level: 60 }
        ]
    },
    {
        category: "Tools & Technologies",
        items: [
            { name: "Git/GitHub/GitLab", level: 65 },
            { name: "SQL Server Management Studio (SSMS)", level: 55 },
            { name: "Docker", level: 50 },
            { name: "Project Management", level: 60 }
        ]
    },
    {
        category: "Soft Skills",
        items: [
            { name: "Communication Skills", level: 70 },
            { name: "Team Leadership", level: 65 },
            { name: "Problem Solving", level: 70 },
            { name: "Agile Collaboration", level: 60 }
        ]
    }
];

export const projects = [
    {
        id: 1,
        title: "Job Finder",
        role: "Backend Developer (Team Project)",
        duration: "05/2025 – Present",
        image: JobFinderImage,
        description: "Developed and maintained robust **backend services** for a job search platform using **Java Spring Boot**. Managed data interactions with **SQL Server**. Implemented **RESTful APIs** to facilitate seamless communication with the React/JavaScript frontend. Actively collaborated within an **Agile team**, leveraging Git for version control.",
        techStack: ["Java Spring Boot", "SQL Server", "RESTful APIs", "React/JavaScript", "Git"],
        githubUrl: "https://github.com/trung2605",
        liveUrl: "#",
        status: "In Development"
    },
    {
        id: 2,
        title: "Dola Bakery E-commerce Platform",
        role: "Full-Stack Developer (Team Project)",
        duration: "01/2023 – 05/2024",
        image: DolaBakeryImage,
        description: "Led a 4-member team in developing a full-stack e-commerce platform. Engineered the system using **Java Servlets** (backend) and **HTML, CSS** (frontend), with **SQL Server Management Studio (SSMS)** for database management. Integrated advanced features including an **AI-powered chatbot** and **Google APIs**, significantly enhancing system capabilities.",
        techStack: ["Java Servlets", "HTML", "CSS", "SQL Server", "AI Chatbot", "Google APIs"],
        githubUrl: "https://github.com/trung2605",
        liveUrl: "#",
        status: "Completed"
    },
    {
        id: 3,
        title: "The Dreamers Organization",
        role: "Founder",
        duration: "15/06/2024 – Present",
        image: TheDreamersOrganizationImage,
        description: "Founder of a community-driven charity organization dedicated to fostering positive social impact. Gained hands-on experience in project management, team leadership, and resource allocation through diverse community initiatives. The organization focuses on exposing orphaned children to technology and personal communication skills.",
        techStack: ["Project Management", "Team Leadership", "Community Building"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Active"
    },
    {
        id: 4,
        title: "Web Form Automation",
        role: "Developer",
        duration: "Cần cập nhật", // Vui lòng cập nhật thời gian
        image: WebFormAutomationImage, // Giả định đã import
        description: "A utility project focused on automating the process of filling out web forms, demonstrating proficiency in web interaction scripting and DOM manipulation.",
        techStack: ["JavaScript", "Node.js", "Web Scraping"],
        githubUrl: "https://github.com/trung2605/Web-dien-form-tu-dong", // Giả định
        liveUrl: "#",
        status: "Completed"
    },
    {
        id: 5,
        title: "Book Shop - OutSystems Application",
        role: "Full-Stack Developer",
        duration: "Cần cập nhật", // Vui lòng cập nhật thời gian
        image: BookShopOutsystemsImage, // Giả định đã import
        description: "A sample web application built entirely on the **OutSystems low-code platform**, demonstrating rapid application development skills and full-stack implementation using the OutSystems environment.",
        techStack: ["OutSystems", "Low-Code Development", "Web Application"],
        githubUrl: "https://github.com/trung2605/Book-Shop-Outsystems-Public",
        liveUrl: "https://personal-fu4tft5e.outsystemscloud.com/BookShopCore/BookStore",
        status: "Completed"
    },
    {
        id: 6,
        title: "TikTok UI Clone (F8 React Course)",
        role: "Frontend Developer (Practice)",
        duration: "Cần cập nhật", // Vui lòng cập nhật thời gian
        image: TikTokUIImage, // Giả định đã import
        description: "A practice project from the F8 React course, focused on cloning the TikTok interface to sharpen skills in **React component design**, state management, and modern CSS techniques.",
        techStack: ["React", "JavaScript", "HTML/CSS"],
        githubUrl: "https://github.com/trung2605/tiktok-ui-Public",
        liveUrl: "#",
        status: "Completed"
    },
    {
        id: 9,
        title: "Data Structures and Algorithms (DSA)",
        role: "Học tập & Thực hành",
        duration: "Cần cập nhật",
        image: DSAImage, // Giả định đã import
        description: "A repository dedicated to solving and implementing various fundamental **Data Structures and Algorithms** problems, primarily focusing on logical problem-solving and code efficiency.",
        techStack: ["Java", "Algorithms", "Data Structures"],
        githubUrl: "https://github.com/trung2605/Data-Structure-and-Algorithm",
        liveUrl: "#",
        status: "Active"
    },
    {
        id: 10,
        title: "Personal Portfolio Website (Current Project)",
        role: "Full-Stack Developer",
        duration: "09/2025 – Present", // Giả định thời gian bạn bắt đầu làm
        image: PortfolioImage, // Giả định đã import
        description: "Developing a responsive and interactive personal portfolio to showcase technical projects, skills, and academic achievements. Built using modern web technologies and practices.",
        techStack: ["React", "SCSS/Tailwind CSS", "JavaScript", "Framer Motion"],
        githubUrl: "#", // Cập nhật link repo sau
        liveUrl: "#", // Cập nhật link live sau
        status: "In Development"
    }
];

export const certificates = [
    {
        id: 1,
        name: "IELTS 6.0 (Linear)",
        issuer: "Tên Tổ chức IELTS 6.0", 
        year: "2024", 
        image: IELTS_6_0_Image, // Đã thay bằng biến import
        description: "International English Language Testing System certification with a score of 6.0."
    },
    {
        id: 2,
        name: "Attendance FPTU Inbound Mobility Programme",
        issuer: "Tunku Abdul Rahman University of Management and Technology, Malaysia",
        year: "12/2023",
        image: RoboticsImage, // Hiện chưa có ảnh riêng cho chứng chỉ này trong cấu trúc
        description: "Participation in the Inbound Mobility Programme in Kuala Lumpur, Malaysia."
    },
    {
        id: 3,
        name: "Innocode Camp",
        issuer: "FPT Education",
        year: "07/2025",
        image: RoboticsImage, // Hiện chưa có ảnh riêng cho chứng chỉ này
        description: "Certificate of participation in the Innocode Camp."
    },
    {
        id: 4,
        name: "ResFres Festival",
        issuer: "FPT Education",
        year: "2024",
        image: DreamersResfresImage, // Sử dụng ảnh từ Event
        description: "Certificate of participation in the Research Festival."
    },
    // -------------------------------------------------------------
    // CHỨNG CHỈ CÔNG NGHỆ (TechnologyCertificates)
    // -------------------------------------------------------------
    {
        id: 5,
        name: "Certificate of Completion: Build AI Agents and Automate Workflows with n8n",
        issuer: "Tên Tổ chức (Cần xác định)", 
        year: "09/2025", 
        image: AIAgentsImage, 
        description: "Certificate of completion for building AI Agents and Automation."
    },
    {
        id: 6,
        name: "Programming with JavaScript",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: ProgrammingJSImage, 
        description: "Certification in JavaScript programming fundamentals and applications."
    },
    {
        id: 7,
        name: "Basics of Web Development & Coding",
        issuer: "Michigan (Coursera/edX)", 
        year: "10/2024", 
        image: WebDevBasicsImage, 
        description: "Certification covering the basics of web development and coding from Michigan."
    },
    {
        id: 8,
        name: "HTML and CSS in Depth",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: HTMLCSSDepthImage, 
        description: "In-depth knowledge and application of HTML5 and CSS."
    },
    {
        id: 9,
        name: "Interactivity with JavaScript",
        issuer: "Michigan (Coursera/edX)",
        year: "10/2024", 
        image: InteractivityJSImage, 
        description: "Focus on creating interactive web elements using JavaScript."
    },
    {
        id: 10,
        name: "Introduction to Front-End Development",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: IntroFrontEndImage, 
        description: "Foundational concepts of Front-End Web Development."
    },
    {
        id: 11,
        name: "Data Visualization",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "04/2024", 
        image: DataVisualizationImage, 
        description: "Certification in techniques and tools for Data Visualization."
    },
    {
        id: 12,
        name: "CSS3",
        issuer: "Michigan (Coursera/edX)",
        year: "09/2024", 
        image: CSS3Image, 
        description: "Course focusing on advanced CSS3 techniques and usage."
    },
    {
        id: 13,
        name: "HTML5",
        issuer: "Michigan (Coursera/edX)",
        year: "09/2024", 
        image: HTML5Image, 
        description: "Course covering the core principles and features of HTML5."
    },
    {
        id: 14,
        name: "Responsive Design",
        issuer: "Michigan (Coursera/edX)",
        year: "10/2024", 
        image: ResponsiveImage, 
        description: "Course on implementing responsive web design principles."
    },
    {
        id: 15,
        name: "Academic Skills for University Success",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: AcademicSkillsImage, 
        description: "Course focusing on essential academic skills needed for success in university."
    },
    {
        id: 16,
        name: "Fundamentals of Graphic Design",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: GraphicDesignImage, 
        description: "Certification covering the fundamental principles and practices of graphic design."
    },
    {
        id: 17,
        name: "Information Technology Onboarding",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "05/2024", 
        image: ITOnboardingImage, 
        description: "Introductory course to information technology concepts and university IT systems."
    },
    {
        id: 18,
        name: "Robotics",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "09/2025", 
        image: RoboticsImage, 
        description: "Course covering basic concepts and applications in Robotics."
    },
    {
        id: 23,
        name: "JavaScript Algorithms",
        issuer: "Tên Tổ chức (Cần xác định)",
        year: "03/2024", 
        image: JSAlgorithmsImage, 
        description: "Course covering fundamental and advanced JavaScript algorithms."
    },
    // -------------------------------------------------------------
    // CHỨNG CHỈ CÒN THIẾU (Event, Language, Other)
    // -------------------------------------------------------------
    {
        id: 24,
        name: "Completion Hiragana",
        issuer: "Tên Tổ chức Tiếng Nhật",
        year: "2024", 
        image: HiraganaImage, 
        description: "Certificate of completion for the Hiragana module."
    },
    {
        id: 25,
        name: "Completion Katagana",
        issuer: "Tên Tổ chức Tiếng Nhật",
        year: "2024", 
        image: KataganaImage, 
        description: "Certificate of completion for the Katagana module."
    },
    {
        id: 26,
        name: "Non Xanh Nước Biếc",
        issuer: "Tên Tổ chức/Sự kiện",
        year: "2024", 
        image: NonXanhNuocBiecImage, 
        description: "Certificate of participation or achievement in the 'Non Xanh Nước Biếc' event."
    },
    {
        id: 27,
        name: "Dreamer of Honor",
        issuer: "The Dreamers Organization", 
        year: "2024", 
        image: DreamerOfHonorImage, 
        description: "An organizational award or recognition for service/contribution."
    }
];

export const prizes = [
    {
        id: 1,
        title: "Innocode Camp SU25",
        position: "Final Round",
        year: "08/07/2025", //
        organization: "FPT Education",
        description: "Reached the final round of the Innocode Camp coding competition."
    },
    {
        id: 2,
        title: "Research Festival (ResFres 2024)",
        position: "Final Round",
        year: "20/06/2024", //
        organization: "FPT Education",
        description: "Advanced to the final round of the university's Research Festival competition."
    },
    {
        id: 3,
        title: "Talent Contest Winner Interview",
        position: "Final Round",
        year: "04/2022", //
        organization: "Phan Chau Trinh HS",
        description: "Reached the Final Round of the Winner Interview for the Talent Contest."
    }
];

export const activities = [
    {
        id: 1,
        title: "The Dreamers Innocode Camp",
        role: "Team Leader",
        duration: "14/06/2025 – Now", //
        organization: "The Dreamers Organization (University Coding Competition)",
        description: "Led a cross-functional team of 5 developers, managing the full development lifecycle from conceptualization to database integration. Developed an innovative job search platform prototype utilizing **React, Java Spring Boot, MySQL, and Docker**.",
        status: "Active"
    },
    {
        id: 2,
        title: "Mic Home Club and FUM Club",
        role: "Core Member",
        duration: "01/2024 – 02/2025", //
        organization: "FPT University",
        description: "Honed **public speaking and presentation skills** by regularly hosting university-wide events, workshops, and ceremonies with audiences ranging from 600 to 1000+ attendees. Developed strong **improvisation and quick-thinking abilities** to manage live event dynamics.",
        status: "Completed"
    },
    {
        id: 3,
        title: "Dreamer ResFres",
        role: "Team Leader",
        duration: "20/03/2024 – 11/05/2024", //
        organization: "The Dreamers Organization (Research Festival)",
        description: "Fostered research, reading, and report writing skills, as well as scientific research capabilities. Provided opportunities for teamwork and modular work, increasing adaptability to different topics.",
        status: "Completed"
    },
    {
        id: 4,
        title: "Other Activities",
        role: "Member / Actor / Referee",
        duration: "Various",
        organization: "Various",
        description: "Includes: **Referee** at FPTU AI & Robotics 2025 Competition, **Student Ambassador**, Economic Project: 'Working Space', and **Actor** in School Skits / Honda Tien Thu Commercials.",
        status: "Various"
    }
];

export const socialLinks = [
    {
        name: "Facebook",
        url: "https://www.facebook.com/trung.le.2605",
        icon: "FaFacebook"
    },
    {
        name: "GitHub",
        url: "https://github.com/trung2605", //
        icon: "FaGithub"
    },
    {
        name: "LinkedIn",
        url: "#", // Vui lòng cập nhật link LinkedIn của bạn
        icon: "FaLinkedin"
    },
    {
        name: "Email",
        url: "mailto:letritrung2605@gmail.com",
        icon: "FaEnvelope"
    }
];