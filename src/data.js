import {
  FaGraduationCap,
  FaCode,
  FaCertificate,
  FaTrophy,
  FaGlobe,
  FaUsers,
  FaCrown,
  FaMicrophone,
  FaVideo,
  FaUser,
  FaLaptopCode,
  FaSun,
  FaBook,
  FaLightbulb,
  FaFilm,
  FaEnvelope,
  FaNewspaper,
  FaRocket,
} from "react-icons/fa";
import NewAvatar from "./assets/information/image.png";
import { allPosts } from "./data/posts";

// Project Image Imports
const DolaBakeryImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962632/my-website/assets/projects/DolaBakery.png";
const WebFormAutomationImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962635/my-website/assets/projects/WebFormAutomation.png";
const BookShopOutsystemsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962636/my-website/assets/projects/BookShopOutsystems.png";
const TikTokUIImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962637/my-website/assets/projects/ComingSoon.png";
const PortfolioImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962639/my-website/assets/projects/Portfolio.png";
const BakeryManagementImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962640/my-website/assets/projects/BakeryManagementSystem.png";

// Live screenshots captured via Playwright from each project's deployed liveUrl
const JobFinderShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870959/my-website/assets/projects/screenshots/1-job-finder.png";
const DolaBakeryShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870962/my-website/assets/projects/screenshots/2-dola-bakery.png";
const WebFormAutomationShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870966/my-website/assets/projects/screenshots/4-web-form-automation.png";
const BakeryManagementShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783870969/my-website/assets/projects/screenshots/7-bakery-management.png";
const BiensovipShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png";
const BiensovipShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png";
const BiensovipShot3 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579610/my-website/assets/projects/screenshots/nxlufqwkaozhvd5h7tk2.png";
const BiensovipShot4 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579613/my-website/assets/projects/screenshots/vl8kafmfubidwk3mugcb.png";
const JobFinderShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579568/my-website/assets/projects/screenshots/yfy17yiopbaz9vlzvv1m.png";
const DreamersShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579570/my-website/assets/projects/screenshots/pic_1_of_131.jpg";
const DreamersShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579573/my-website/assets/projects/screenshots/pic_10_of_131.jpg";
const McHubShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png";
const McHubShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png";
const McHubShot3 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579580/my-website/assets/projects/screenshots/04-voice-library.png";
const AgriLinkShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579596/my-website/assets/projects/screenshots/dash-01-admin-dashboard.png";
const AgriLinkShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579599/my-website/assets/projects/screenshots/auth-00-login.png";
const BrandHubShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579601/my-website/assets/projects/screenshots/DA-D19-01.png";
const BrandHubShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579603/my-website/assets/projects/screenshots/DA-D19-02.png";
const ThreadLearnShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579605/my-website/assets/projects/screenshots/slide_07_pipeline.png";
const ThreadLearnShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579607/my-website/assets/projects/screenshots/slide_11_main_results.png";
const NursingKTYHShot1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789580945/my-website/assets/projects/screenshots/nursing_check.png";
const NursingKTYHShot2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789580947/my-website/assets/projects/screenshots/nursing_orgchart2.png";

//Certificate Imports
const HiraganaImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962642/my-website/assets/Certificate/Language/Completion_Hiragana.png";
const KataganaImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962643/my-website/assets/Certificate/Language/Completion_katagana.png";
const DreamersResfresImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962644/my-website/assets/Certificate/Event/DreamersResfres.png";
const NonXanhNuocBiecImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962645/my-website/assets/Certificate/Event/NonXanhNuocBiec.png";
const DreamerOfHonorImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838572/my-website/assets/Certificate/Event/DreamersHonor-1.png";
const AcademicSkillsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962647/my-website/assets/Certificate/TechnologyCertificates/AcademicSkills_for_University_Success-1.png";
const WebDevBasicsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962649/my-website/assets/Certificate/TechnologyCertificates/Basics_of_web_development_coding___Michigan-1.png";
const AIAgentsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962650/my-website/assets/Certificate/TechnologyCertificates/CertificateOfCompletion_Build_AI_Agents_and_Automate_Workflows_with_n8n-1.png";
const CSS3Image =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962651/my-website/assets/Certificate/TechnologyCertificates/CSS3_Michigan-1.png";
const DataVisualizationImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962653/my-website/assets/Certificate/TechnologyCertificates/Data_Visualization.png";
const GraphicDesignImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962654/my-website/assets/Certificate/TechnologyCertificates/Fundamentals_of_Graphic_Design-1.png";
const HTMLCSSDepthImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962656/my-website/assets/Certificate/TechnologyCertificates/HTML_and_CSS_in_depth-1.png";
const HTML5Image =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962657/my-website/assets/Certificate/TechnologyCertificates/Html5_Michigan-1.png";
const ITOnboardingImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962658/my-website/assets/Certificate/TechnologyCertificates/Information_Technology_Onboarding-1.png";
const InteractivityJSImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962660/my-website/assets/Certificate/TechnologyCertificates/Interactivity_with_JavaScript___Michigan-1.png";
const IntroFrontEndImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962661/my-website/assets/Certificate/TechnologyCertificates/Introduction_to_Front-End_Development-1.png";
const JSAlgorithmsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962662/my-website/assets/Certificate/TechnologyCertificates/JavaScript_Algorithms.png";
const ProgrammingJSImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962663/my-website/assets/Certificate/TechnologyCertificates/Programming_with_JavaScript-1.png";
const ResponsiveImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962664/my-website/assets/Certificate/TechnologyCertificates/Reponsive__Michigan-1.png";
const RoboticsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962666/my-website/assets/Certificate/TechnologyCertificates/Robotics.jpg";
const IELTSRealImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838534/my-website/assets/Certificate/Language/IELTS_Real.png";
const DOLLinearImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838530/my-website/assets/Certificate/Language/DOL_Linear.png";
const FsoftOJTImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838532/my-website/assets/Certificate/Language/FPT_OJT.png";
const HackathonCVImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1787394791/my-website/assets/Certificate/AI_Computer_Vision.png";
const CertOfMeritImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1787394844/my-website/assets/Certificate/giaykhen387.png";
const HocBong2023Image =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838533/my-website/assets/Certificate/Language/HocBong2023.png";
const AIESECLeadershipImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838569/my-website/assets/Certificate/Event/Leadership_Conference_2025.png";
const IBMRAGLangChainImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783838587/my-website/assets/Certificate/TechnologyCertificates/IBM_RAG_LangChain-1.png";
const RAGGetStartedImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783839672/my-website/assets/Certificate/TechnologyCertificates/RAG_GetStarted-1.png";
const AIAgentsRAGLangChainImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783839671/my-website/assets/Certificate/TechnologyCertificates/AIAgents_RAG_LangChain-1.png";
const EthicalOrgImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840247/my-website/assets/Certificate/TechnologyCertificates/EthicalOrg-1.png";
const EthicalRisksImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840249/my-website/assets/Certificate/TechnologyCertificates/EthicalRisks-1.png";
const EthicalPromoteImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840248/my-website/assets/Certificate/TechnologyCertificates/EthicalPromote-1.png";
const EthicalActionableImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840244/my-website/assets/Certificate/TechnologyCertificates/EthicalActionable-1.png";
const EthicalCommunicateImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840246/my-website/assets/Certificate/TechnologyCertificates/EthicalCommunicate-1.png";
const CertNexusExamPrepImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840243/my-website/assets/Certificate/TechnologyCertificates/CertNexusExamPrep-1.png";
const EthicsOfAIImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840250/my-website/assets/Certificate/TechnologyCertificates/EthicsOfAI-1.png";
const PMInitiatingImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840252/my-website/assets/Certificate/TechnologyCertificates/PMInitiating-1.png";
const PMBudgetingImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840250/my-website/assets/Certificate/TechnologyCertificates/PMBudgeting-1.png";
const PMRisksImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840253/my-website/assets/Certificate/TechnologyCertificates/PMRisks-1.png";
const PMCapstoneImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1783840251/my-website/assets/Certificate/TechnologyCertificates/PMCapstone-1.png";

//Activity Imports
const InnocodeCampActivityImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962667/my-website/assets/activities/Dreamers_Innocode_Camp.png";
const MicHomeFUMClubImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962668/my-website/assets/activities/Mic_Home_FUM_Club.jpg";
const ResFresActivityImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962644/my-website/assets/Certificate/Event/DreamersResfres.png";
const CharityFundraisingImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962670/my-website/assets/activities/Dreamers_Charity_Fundraising.jpg";
const MediaRolesImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962671/my-website/assets/activities/Student_Actor_Model.jpg";
const GalaHonTanDatVietImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962672/my-website/assets/activities/Gala_HonTanDatViet.jpg";
const CharityMissionsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962673/my-website/assets/activities/TuThien_Missions_Group.jpg";
const WorkshopMakeImageBetterImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962674/my-website/assets/activities/Workshop_MakeImageBetter_MC.jpg";
const GenderEqualityMCImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962676/my-website/assets/activities/Gender_Equality_Workshop_MC.jpg";
const CollaborationEventsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962677/my-website/assets/activities/Collaboration_Events_Group.jpg";
const TuyenThanhVienDreamersImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962678/my-website/assets/activities/Tuyen_Thanh_Vien_Dreamers.jpg";
const DuAnDreamHighImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962681/my-website/assets/activities/Du_An_Dream_High.jpg";
const TotHyVongImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962682/my-website/assets/activities/Tet_Hy_Vong_Event.jpg";
const VongVaoMongMoImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962684/my-website/assets/activities/Vong_Vao_Mong_Mo.jpg";
const AIRoboticsImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962685/my-website/assets/activities/AI_Robotics_Referee.jpg";
const DienNhacTuThienImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962688/my-website/assets/activities/Dien_Nhac_Tu_Thien.png";
const BoAnhKyNiemImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962689/my-website/assets/activities/Bo_Anh_Ky_Niem.jpg";
const AlumniGuidanceImage =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962690/my-website/assets/activities/Alumni_Career_Guidance_Talk.jpg";

//eudcation Memories Imports
const FPTMemory1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962692/my-website/assets/educationMemories/FPT_Memory_1.jpg";
const MalaysiaMemory =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962693/my-website/assets/educationMemories/Malaysia_Memory.jpg";
const PCTMemory =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962694/my-website/assets/educationMemories/PCT_Graduation_Memory.jpg";

// About Slider Images Imports
const SliderImg1 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962695/my-website/assets/slider/SliderImg1.jpg";
const SliderImg2 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962696/my-website/assets/slider/SliderImg2.jpg";
const SliderImg3 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962697/my-website/assets/slider/SliderImg3.jpg";
const SliderImg4 =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962699/my-website/assets/slider/SliderImg4.jpg";

// Local Image Import
// moved to top

export const personalInfo = {
  name: "Lê Trí Trung",
  title: "Founder, Head of Technology & Software Architect",
  profileImage: NewAvatar,
  cv: "/Le_Tri_Trung_CV.pdf",
  logo: NewAvatar,
  intro:
    "Founder & Head of Technology tại SynapForge Venture Studio. Chuyên sâu kiến trúc hệ thống Clean Architecture (.NET 8 & Java 21 Spring Boot 3), SaaS Automation và AI Engineering. Quán quân Hackathon Computer Vision 2026 (FPT Education), đồng tác giả bài báo quốc tế ICTA 2026, kiến trúc sư trưởng vận hành biensovip.com & The MC Hub.",
  contact: {
    email: "letritrung2605@gmail.com",
    secondaryEmail: "solutions@synapforge.id.vn",
    phone: "(+84) 912 158 715",
    birthday: "26/05/2005",
    location: "Hải Châu & Ngũ Hành Sơn, TP. Đà Nẵng, Việt Nam",
    facebook: "https://www.facebook.com/trung.le.2605",
    instagram: "https://www.instagram.com/trung.le.2605/?hl=en",
    github: "https://github.com/trung2605",
    linkedin: "https://www.linkedin.com/in/trung-l%C3%AA-7ba564283/",
  },
  story: {
    title: "Hành Trình Của Tôi",
    content:
      "Mình là **Lê Trí Trung** (sinh năm 2005) — Founder & Head of Technology (Tech Lead / Software Architect) tại **SynapForge Venture Studio** ở Đà Nẵng, chuyên kiến trúc và vận hành các nền tảng số hiệu năng cao, SaaS Automation và AI Engineering cho doanh nghiệp.\n\nHành trình kỹ thuật của mình được rèn luyện qua nền tảng học thuật vững chắc tại **Đại học FPT Đà Nẵng** (chuyên ngành Kỹ thuật Phần mềm, **GPA 3.3/4.0 - 8.2/10.0**), từng được chọn làm **Đại diện Trao đổi Sinh viên Quốc tế** tại **Technology Kuala Lumpur, Malaysia** (12/2023), sở hữu chứng chỉ **IELTS 6.0** (IDP Education cấp 04/2026) và tốt nghiệp **THPT Chuyên Phan Châu Trinh** với **GPA 9.0/10.0**.\n\nVề thành tựu công nghệ, mình vinh dự đạt danh hiệu **Quán quân (Winner) Hackathon Computer Vision 2026** (FPT Education), lọt vào **Chung kết Toàn quốc InnoCodeCamp 2025** với vai trò Team Leader, **Chung kết Toàn quốc ResFres 2024**, và là **Đồng tác giả bài báo khoa học quốc tế (ICTA 2026)** về mô hình AI Fine-tuning phát hiện và tự động sửa lỗi Race-Condition trong mã nguồn.\n\nỞ khía cạnh thực chiến sản phẩm, mình ghi dấu ấn với 3 trụ cột dự án:\n1. **Biensovip.com (Solo Software Architect):** Tự tay thiết kế và lập trình trọn gói sàn giao dịch & định giá biển số đẹp từ số 0 trên nền tảng .NET 8 / ASP.NET Core (Clean Architecture), thiết kế 61 bảng thực thể PostgreSQL tối ưu truy vấn GIN Index <8ms, cổng cọc VietQR Webhook <0.5s, tích hợp DeepSeek AI Chatbot và vận hành Linux VPS.\n2. **The MC Hub (CEO & Tech Lead):** Dẫn dắt đội ngũ 6 kỹ sư xây dựng nền tảng luyện giọng nói AI (React 19 + Spring Boot 3.3 + Python FastAPI & Whisper), thương mại hóa thành công ngay tháng đầu tiên với 87 MC chuyên nghiệp và 20 giao dịch đăng ký.\n3. **BrandHub (Tech Lead & Solutions Architect):** Kiến trúc cụm 7 microservices quản trị thương hiệu đa kênh (Spring Cloud Gateway, RabbitMQ DLQ retry lũy thừa, Java 21, Python GraphRAG).\n\nBên cạnh kỹ thuật, mình từng là **MC chuyên nghiệp dẫn dắt hơn 50 sự kiện lớn (600–1000+ khán giả)**, là Trọng tài giải đấu FPTU AI & Robotics 2025, và là **Founder Quỹ thiện nguyện The Dreamers** (hơn 30 thành viên) lan tỏa giá trị giáo dục công nghệ đến cộng đồng.",
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
    title: "Kiến Trúc Hệ Thống & Clean Architecture",
    description:
      "Chuyên sâu thiết kế Clean Architecture (.NET 8 / C# 12) và Microservices (Java 21 / Spring Boot 3): 61 database entities PostgreSQL, hàng đợi RabbitMQ DLQ, Redis distributed lock và API latency <8ms.",
    icon: <FaRocket className="w-8 h-8" style={{ color: "#6d3fc9" }} />,
  },
  {
    title: "Venture Builder & Production Systems",
    description:
      "Founder tại SynapForge Venture Studio: Trực tiếp xây dựng và vận hành biensovip.com (100+ visits/ngày, VietQR Webhook <0.5s) và The MC Hub (87 MCs onboarded, 20 subscription transactions trong tháng đầu).",
    icon: <FaGlobe className="w-8 h-8" style={{ color: "#6d3fc9" }} />,
  },
  {
    title: "Nghiên Cứu Khoa Học & Giải Thưởng",
    description:
      "Quán quân Hackathon Computer Vision 2026 (FPT Education), Đồng tác giả Bài báo Khoa học Quốc tế (ICTA 2026), Chung kết Toàn quốc InnoCodeCamp 2025 (Team Leader) và ResFres 2024.",
    icon: <FaTrophy className="w-8 h-8" style={{ color: "#6d3fc9" }} />,
  },
  {
    title: "Tech Lead & Tác Động Xã Hội",
    description:
      "Dẫn dắt các đội ngũ kỹ sư 5–6 người từ số 0 ra thị trường. Sáng lập The Dreamers Organization (30+ thành viên, từ thiện công nghệ), MC chuyên nghiệp dẫn dắt 50+ sự kiện (600–1000+ người).",
    icon: <FaUsers className="w-8 h-8" style={{ color: "#6d3fc9" }} />,
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
    commitHash: "f8e21a9",
    branch: "main",
    branchLabel: "main / production",
    school: "SynapForge Venture Studio",
    degree: "Founder, Head of Technology & Software Architect",
    duration: "01/2026 - Hiện tại",
    gpa: "Production Grade",
    status: "Current",
    techStack: [".NET 8", "Java 21 / Spring Boot 3", "Clean Architecture", "PostgreSQL", "Docker", "RabbitMQ DLQ", "FastAPI / Whisper AI"],
    diffStat: "+32,450 / -860 lines · Venture Studio · Production",
    highlights: [
      "Sáng lập và định hình kiến trúc kỹ thuật tại SynapForge Venture Studio, dẫn dắt các dòng sản phẩm SaaS, AI và Website",
      "Kiến trúc sư trưởng vận hành độc lập biensovip.com — 61 database entities, Clean Architecture .NET 8, VietQR Webhook <0.5s",
      "Xây dựng The MC Hub (AI Voice Training) & BrandHub (MarTech 7 microservices với RabbitMQ DLQ và GraphRAG)"
    ],
    description:
      "Founder & Head of Technology tại **SynapForge Venture Studio**. Trực tiếp thiết kế kiến trúc hệ thống, chuẩn hóa Clean Architecture và dẫn dắt phát triển các sản phẩm công nghệ trọng điểm: **biensovip.com**, **The MC Hub** và **BrandHub**, phục vụ khách hàng doanh nghiệp và hàng nghìn người dùng cuối.",
  },
  {
    id: 2,
    commitHash: "e7b04c2",
    branch: "feature/enterprise-ojt",
    branchLabel: "enterprise / agile",
    school: "FPT Software (FSoft Đà Nẵng)",
    degree: "Software Developer Intern",
    duration: "08/2025 - 12/2025",
    gpa: "Passed (Xuất sắc)",
    status: "Completed",
    techStack: ["OutSystems Reactive Web", "Agile / Scrum", "Enterprise Architecture", "RESTful API", "SQL Optimization"],
    diffStat: "+8,950 / -420 lines · Enterprise Client Delivery",
    highlights: [
      "Phát triển ứng dụng doanh nghiệp Reactive Web cho khách hàng trong môi trường chuẩn Agile/Scrum của FPT Software",
      "Trực tiếp gỡ lỗi (debug), tối ưu hóa hiệu năng hệ thống cơ sở dữ liệu và tái cấu trúc mã nguồn theo 4-Layer Architecture",
      "Hoàn thành xuất sắc kỳ OJT thực tập doanh nghiệp được nhà trường và FSoft chứng nhận"
    ],
    description:
      "Phát triển ứng dụng enterprise bằng **OutSystems Reactive Web** trong môi trường Agile tại **FPT Software**. Debug, tối ưu hiệu năng và refactor mã nguồn hệ thống. Hoàn thành xuất sắc kỳ OJT doanh nghiệp.",
  },
  {
    id: 3,
    commitHash: "d6a13b5",
    branch: "academic/cs-research",
    branchLabel: "academic / ai-research",
    school: "Đại học FPT Đà Nẵng (FPT University)",
    degree: "Cử nhân Kỹ thuật Phần mềm (Software Engineering)",
    duration: "09/2023 - Hiện tại",
    gpa: "GPA 3.3/4.0 (8.2/10.0)",
    status: "Current",
    techStack: ["Java 21 / Spring Boot", ".NET 8 / C#", "Python / PyTorch", "Clean Architecture", "AI / Computer Vision"],
    diffStat: "+22,400 / -1,150 lines · Quán quân 2026 · ICTA 2026",
    highlights: [
      "Quán quân (Winner) - Cuộc thi Hackathon Computer Vision 2026 do FPT Education tổ chức (06/08/2026)",
      "Đồng tác giả Bài báo Khoa học Quốc tế (ICTA 2026) về AI Fine-tuning model phát hiện race-condition",
      "Chung kết Toàn quốc InnoCodeCamp 2025 (Team Leader) & Chung kết Toàn quốc ResFres 2024 (Top đề tài nghiên cứu)",
      "GPA tích lũy xuất sắc 3.3/4.0 (tương đương 8.2/10.0), Sinh viên Giỏi học kỳ Spring 2026"
    ],
    description:
      "Theo học chuyên ngành **Kỹ thuật Phần mềm** với **GPA 3.3/4.0 (8.2/10.0)**. Đạt **Quán quân Hackathon Computer Vision 2026**, **Chung kết Toàn quốc InnoCodeCamp 2025**, và là **Đồng tác giả Bài báo Khoa học Quốc tế ICTA 2026**.",
  },
  {
    id: 4,
    commitHash: "b4f98e1",
    branch: "global/mobility-exchange",
    branchLabel: "global / international",
    school: "Tunku Abdul Rahman University of Management and Technology (TAR UMT), Malaysia",
    degree: "FPT Student Exchange Representative (Inbound Mobility Programme)",
    duration: "12/2023",
    gpa: "Passed / Certificate of Completion",
    status: "Completed",
    techStack: ["Global Communication", "Cross-Cultural Collaboration", "International Technology Workflow", "IELTS 6.0"],
    diffStat: "+1,200 lines · Kuala Lumpur, Malaysia",
    highlights: [
      "Được chọn đại diện sinh viên FPT University tham gia chương trình Trao đổi Sinh viên Quốc tế tại Kuala Lumpur, Malaysia",
      "Mở rộng tư duy phát triển công nghệ toàn cầu, nâng cao kỹ năng làm việc nhóm đa quốc gia",
      "Sở hữu chứng chỉ IELTS 6.0 (IDP Education cấp 04/2026), giao tiếp tiếng Anh kỹ thuật chuyên sâu"
    ],
    description:
      "Đại diện sinh viên FPT University tham gia **Chương trình Trao đổi Sinh viên Quốc tế** tại **Kuala Lumpur, Malaysia** (12/2023). Mở rộng góc nhìn học thuật đa văn hóa, phát triển kỹ năng giao tiếp quốc tế và tiếng Anh chuyên ngành (IELTS 6.0).",
  },
  {
    id: 5,
    commitHash: "a1c72f0",
    branch: "foundation/stem-roots",
    branchLabel: "roots / foundation",
    school: "THPT Chuyên Phan Châu Trinh, Đà Nẵng",
    degree: "Bằng Tốt nghiệp THPT (Chuyên Phan Châu Trinh)",
    duration: "09/2020 - 06/2023",
    gpa: "GPA 9.0/10.0",
    status: "Graduated",
    techStack: ["Advanced Mathematics", "Logical Algorithms", "Analytical Thinking", "Public Speaking"],
    diffStat: "+Initial Commit · 9.0 GPA",
    highlights: [
      "Tốt nghiệp với điểm trung bình GPA xuất sắc 9.0/10.0 tại trường THPT danh tiếng nhất Đà Nẵng",
      "Nền tảng Toán học và tư duy giải thuật phản biện đạt chuẩn đầu vào đại học xuất sắc",
      "Đạt Giải Nhất vòng phỏng vấn Cuộc thi Tài năng trường (04/2022) và Á quân 1 Talent & Beauty Contest"
    ],
    description:
      "Tốt nghiệp THPT Chuyên Phan Châu Trinh với **GPA 9.0/10.0**. Xây dựng nền tảng tư duy toán học, thuật toán và khả năng diễn đạt trước công chúng vững chắc.",
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
    category: "Architecture & Backend",
    items: [
      { name: "Clean Architecture & DDD", level: 90 },
      { name: "Java 21 & Spring Boot 3", level: 88 },
      { name: ".NET 8 / ASP.NET Core & EF Core", level: 88 },
      { name: "Python FastAPI & Node.js", level: 82 },
    ],
  },
  {
    category: "Frontend & Modern UI",
    items: [
      { name: "React 19 / Next.js / Vite", level: 90 },
      { name: "TypeScript & JavaScript ES6+", level: 85 },
      { name: "Tailwind CSS & Framer Motion", level: 88 },
      { name: "Flutter & OutSystems Reactive", level: 78 },
    ],
  },
  {
    category: "AI Engineering & Automation",
    items: [
      { name: "VietQR Webhook Integration", level: 92 },
      { name: "Whisper AI Voice Microservice", level: 85 },
      { name: "DeepSeek / LLM Fine-tuning (QLoRA)", level: 85 },
      { name: "n8n Workflow & RAG Pipeline", level: 85 },
    ],
  },
  {
    category: "Databases & Cloud Infrastructure",
    items: [
      { name: "PostgreSQL 16 (GIN Index) & SQL Server", level: 88 },
      { name: "RabbitMQ (DLQ Async Queue)", level: 85 },
      { name: "Redis Distributed Lock & MongoDB", level: 85 },
      { name: "Docker Compose & Linux VPS", level: 85 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Job Finder",
    role: "Backend Developer (Team Project)",
    duration: "05/2025 – 09/2025",
    image: JobFinderShot2,
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
    status: "Completed",
    category: "fullstack",
    tier: 3,
    challenge:
      "Cần một nền tảng tìm việc cho phép job seeker vừa tìm kiếm/ứng tuyển vừa nhận hỗ trợ AI (resume tips, job matching), trong khi team 6 người phải phối hợp Agile trên cùng một codebase suốt 4 tháng mà không dẫm chân nhau.",
    highlights: [
      "Thiết kế và triển khai toàn bộ RESTful API bằng Java Spring Boot, quản lý dữ liệu quan hệ trên SQL Server",
      "Xây dựng hệ thống xác thực JWT-based (login/register) từ đầu",
      "Thiết lập Git branching strategy (feature branch + pull request) giữ team 6 người làm việc sạch trong 4 tháng",
      "Tích hợp AI chatbot hỗ trợ resume tips và job matching cho job seeker",
    ],
    screenshots: [JobFinderShot2, JobFinderShot1],
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
    status: "Active",
    category: "ecommerce",
    tier: 3,
    challenge:
      "Dự án nhóm đầu tiên của tôi — cần dựng một nền tảng thương mại điện tử đầy đủ (catalog, giỏ hàng, đơn hàng, tài khoản khách) cho một tiệm bánh, với đội 4 người và deadline cố định, mà không có kinh nghiệm phối hợp team trước đó.",
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
    image: DreamersShot1,
    description:
      "Founded and lead **The Dreamers** — a student-run charity organization at FPT University dedicated to creating positive social impact through technology and education. The organization runs hands-on programs that bring **coding workshops, communication skills training, and mentorship** directly to orphaned children and underprivileged youth.\n\nAs founder, I manage the full operational scope: recruiting and onboarding members, defining project roadmaps, coordinating with partner organizations, and overseeing fundraising campaigns that have raised funds for multiple charity missions.\n\nNotable events organized under The Dreamers include **Tốt Hy Vọng**, **Vòng vào Mộng mơ**, **Dream High**, and a **Charity Music Performance** — each requiring end-to-end planning, logistics, and team coordination. The backend platform for managing member activities and event records is also being developed in **Java Spring Boot**.",
    techStack: [
      "Project Management",
      "Team Leadership",
      "Community Organizing",
      "Java Spring Boot",
      "Event Production",
    ],
    githubUrl: "https://github.com/trung2605/the_dreamers_backend",
    liveUrl: "#",
    status: "Completed",
    category: "ngo",
    tier: 2,
    challenge:
      "Xây dựng một tổ chức thiện nguyện sinh viên bền vững — không chỉ tổ chức sự kiện đơn lẻ mà cần vận hành liên tục: tuyển thành viên, gây quỹ, và giờ đây là số hoá việc quản lý hoạt động/thành viên bằng một nền tảng backend riêng.",
    highlights: [
      "Sáng lập và điều hành toàn bộ hoạt động: tuyển thành viên, roadmap dự án, gây quỹ cho nhiều chiến dịch thiện nguyện",
      "Tổ chức end-to-end 4 sự kiện lớn: Tốt Hy Vọng, Vòng vào Mộng mơ, Dream High, Charity Music Performance",
      "Đang phát triển backend quản lý hoạt động và hồ sơ thành viên bằng Java Spring Boot",
    ],
    screenshots: [DreamersShot1, DreamersShot2],
  },
  {
    id: 4,
    title: "Web Form Automation",
    role: "Solo Developer",
    duration: "15/10/2025 – 25/10/2025",
    image: WebFormAutomationImage,
    description:
      "A focused utility tool built in 10 days to automate repetitive web form submissions — eliminating manual data entry for structured, high-volume input scenarios.\n\nThe system uses **Node.js** on the backend to orchestrate form interaction via DOM scripting, with a lightweight **React frontend** that lets users upload data (CSV/JSON), preview entries, and trigger batch submissions with a single click. Built to handle edge cases like input validation delays, dynamic field rendering, and CAPTCHA-protected forms.\n\nThis project sharpened my understanding of browser DOM behavior, async scripting patterns, and the practical limits of automation — a useful skillset for QA, data tooling, and internal workflow automation.",
    techStack: [
      "JavaScript",
      "Node.js",
      "React",
      "DOM Scripting",
      "Web Automation",
    ],
    githubUrl: "https://github.com/trung2605/Form-Automation-Backend",
    liveUrl: "https://form-automation-frontend.vercel.app/",
    status: "Completed",
    category: "automation",
    tier: 4,
    challenge:
      "Loại bỏ việc nhập liệu thủ công lặp lại cho các form web có khối lượng lớn, trong thời hạn gấp 10 ngày — cần xử lý được các trường hợp khó như field render động và form có CAPTCHA.",
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
    techStack: [
      "OutSystems",
      "Low-Code Platform",
      "REST API Integration",
      "UI Flows",
      "Data Modeling",
    ],
    githubUrl: "https://github.com/trung2605/Book-Shop-Outsystems-Public",
    liveUrl:
      "https://personal-fu4tft5e.outsystemscloud.com/BookShopCore/BookStore",
    status: "Completed",
    category: "lowcode",
    tier: 4,
    challenge:
      "Học và triển khai một ứng dụng thương mại điện tử đầy đủ hoàn toàn trong môi trường visual development (OutSystems) — kỹ năng trực tiếp áp dụng cho các dự án enterprise rapid-delivery tại FPT Software.",
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
    techStack: [
      "React",
      "JavaScript (ES6+)",
      "CSS Modules",
      "React Router",
      "Custom Hooks",
    ],
    githubUrl: "https://github.com/trung2605/tiktok-ui-Public",
    liveUrl: "#",
    status: "Completed",
    category: "frontend",
    tier: 4,
    challenge:
      "Củng cố nền tảng React trước khi áp dụng vào các dự án production (Job Finder, The MC Hub) — bằng cách tái tạo chính xác một giao diện phức tạp, nhiều component tương tác thật (TikTok web).",
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
    techStack: [
      "React 19",
      "React Router v6",
      "Framer Motion",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "Cloudinary (media)",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "Active",
    category: "frontend",
    tier: 4,
    challenge:
      "Xây một portfolio thể hiện đúng chất lượng thật — tránh cảm giác template, tối ưu hiệu năng (code-splitting, lazy image), và giữ nội dung dễ cập nhật qua một data layer trung tâm thay vì sửa trực tiếp component.",
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
    status: "Active",
    category: "fullstack",
    tier: 3,
    challenge:
      "Bài tập môn học yêu cầu phạm vi thật (inventory, sales, order, customer database) nhưng làm solo — buộc phải tự thiết kế và triển khai toàn bộ hệ thống từ database đến deployment mà không có ai chia việc.",
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
    role: "Tech Lead & CEO",
    duration: "01/2026 – 07/2026",
    image: McHubShot1,
    description:
      "Launched voice training platform (React 19 + Java Spring Boot 3.3) monetized from day one: 87 MCs onboarded in first month, 20 transactions with ~4M VND revenue across 2 subscription tiers (Basic/Full).\n\nBuilt AI voice analysis microservice (Python FastAPI + Whisper) evaluating pronunciation, intonation, pace, pauses — powering 101 practice exercises, 40 theory readings, and 4 structured courses across 6 MC categories.\n\nLed team of 6 from zero to production in 6 months. CI/CD on Vercel (frontend) + Render (backend), using Notion and Jira to manage workflow.",
    techStack: [
      "React 19",
      "Java Spring Boot 3.3",
      "Python FastAPI",
      "Whisper AI",
      "MongoDB",
      "Redis",
      "Vercel",
      "Render",
      "Jira",
      "Notion",
    ],
    githubUrl: "https://github.com/The-MC-Hub",
    liveUrl: "https://mc-voice-training.vercel.app/",
    status: "Active",
    category: "fullstack",
    tier: 1,
    challenge:
      "Xây dựng và thương mại hóa nền tảng luyện giọng MC từ con số 0 lên production trong 6 tháng với team 6 người, tích hợp AI voice analysis đánh giá phát âm, ngữ điệu và ngắt nghỉ real-time.",
    highlights: [
      "Ra mắt nền tảng luyện giọng MC thương mại hoá từ ngày đầu: 87 MC tham gia tháng đầu, 20 giao dịch đạt ~4 triệu VNĐ doanh thu với 2 gói Basic/Full",
      "Xây dựng microservice AI phân tích giọng nói (Python FastAPI + Whisper) đánh giá phát âm, ngữ điệu, tốc độ, ngắt nghỉ — phục vụ 101 bài tập, 40 bài lý thuyết, 4 khoá học",
      "Dẫn dắt team 6 người từ con số 0 lên production trong 6 tháng với quy trình CI/CD Vercel + Render, quản lý qua Notion & Jira",
      "Công nghệ: MongoDB, Python FastAPI + Whisper, Java SpringBoot, ReactJS, Redis",
    ],
    screenshots: [McHubShot1, McHubShot2, McHubShot3],
  },
  {
    id: 13,
    title: "AgriLink",
    role: "Full-Stack Developer (Team Project)",
    duration: "01/2025 – Present",
    image: AgriLinkShot1,
    description:
      "A **Vietnamese agricultural marketplace** connecting farmers, suppliers, and customers — covering product listings, orders, reviews, and notifications. Started as an academic project (**PRM393**) with a **Flutter mobile app** and an **Express.js/MongoDB** backend secured with JWT.\n\nThe project later evolved into a more production-grade parallel build aimed at real startup viability: a **Next.js + TypeScript** frontend (Radix UI, TanStack Query, Sentry, Mapbox/d3-geo for farm location mapping) backed by a **NestJS + TypeORM** service layer. This dual-track evolution — from academic prototype to startup-grade architecture — included drafting a formal Vietnamese startup proposal document.",
    techStack: [
      "Flutter",
      "Express.js",
      "MongoDB",
      "Next.js",
      "TypeScript",
      "NestJS",
      "TypeORM",
      "TanStack Query",
    ],
    githubUrl: "https://github.com/AgriLinkVN/agrilink-backend",
    liveUrl: "#",
    status: "Completed",
    category: "ecommerce",
    tier: 2,
    challenge:
      "Bắt đầu là đồ án học thuật (PRM393) nhưng đội ngũ quyết định nâng cấp thành kiến trúc production-grade hướng tới khả năng khởi nghiệp thật — đòi hỏi thiết kế lại từ mobile-only sang full-stack đa nền tảng có khả năng mở rộng.",
    highlights: [
      "Track 1 (học thuật): mobile app Flutter + backend Express.js/MongoDB xác thực JWT",
      "Track 2 (production-grade song song): frontend Next.js + TypeScript (Radix UI, TanStack Query, Sentry, Mapbox/d3-geo cho bản đồ nông trại) + backend NestJS + TypeORM",
      "Soạn thảo đề xuất khởi nghiệp chính thức bằng tiếng Việt cho mô hình sản phẩm",
    ],
    screenshots: [AgriLinkShot1, AgriLinkShot2],
  },
  {
    id: 14,
    title: "BrandHub — MarTech & Multichannel AI Publishing",
    role: "Tech Lead & Solutions Architect (Team of 5)",
    duration: "05/2026 – Present",
    image: BrandHubShot1,
    description:
      "An enterprise-grade **agency platform for managing client brand content** across 5 social media networks — Facebook, Instagram, TikTok, Threads, and Zalo — with AI-assisted brand voice generation, visual Kanban approvals, and automated publishing.\n\nArchitected a **7-microservices distributed system**: **API Gateway** (Spring Cloud Gateway, WebFlux, JWT + Redis auth and rate-limiting), **business-service** (Spring Boot 3.3.5, Java 21) managing multi-tenant ACL and campaigns, **publisher-service** consuming from **RabbitMQ with Dead Letter Queue (DLQ)** exponential backoff retry to eliminate publishing loss, and an **AI service** (Python FastAPI, RAG & GraphRAG with ChromaDB and Neo4j) synthesizing brand voice. Frontend features a **React 18 + TypeScript + Vite** dashboard and a companion **Expo/React Native** mobile app, orchestrated via **Docker Compose** on AWS EC2.",
    techStack: [
      "Spring Boot 3.3.5",
      "Java 21",
      "Spring Cloud Gateway",
      "RabbitMQ (DLQ)",
      "Redis",
      "Python FastAPI",
      "GraphRAG (Neo4j)",
      "React 18",
      "TypeScript",
      "Docker Compose",
      "AWS EC2",
    ],
    githubUrl: "https://github.com/BrandHubOrganization",
    liveUrl: "#",
    status: "In Development",
    category: "fullstack",
    tier: 2,
    challenge:
      "Đăng nội dung đồng thời lên 5 mạng xã hội (Facebook, Instagram, TikTok, Threads, Zalo) với độ tin cậy tuyệt đối 100% — đòi hỏi kiến trúc 7 microservices phân tán chịu lỗi cao (RabbitMQ DLQ retry lũy thừa), bảo vệ gateway và AI RAG học giọng điệu thương hiệu.",
    highlights: [
      "Kiến trúc tổng thể 7 Microservices: API Gateway (Spring Cloud Gateway, WebFlux, JWT+Redis), business-service (Java 21), publisher-service (RabbitMQ DLQ), AI service (FastAPI GraphRAG)",
      "Thiết kế cơ chế Dead Letter Queue (DLQ) retry lũy thừa đảm bảo tỷ lệ mất tin nhắn khi xuất bản bằng 0%",
      "Tích hợp RAG & GraphRAG (ChromaDB + Neo4j) học Brand Voice và phân tích quan hệ KOL/xu hướng",
      "Frontend dashboard React 18 + TypeScript + Vite, mobile app Expo React Native, điều phối cụm Docker Compose",
    ],
    screenshots: [BrandHubShot1, BrandHubShot2],
  },
  {
    id: 17,
    title: "Dien Bien Phu Travel",
    role: "Solo Developer",
    duration: "12/2025 – 01/2026",
    image: TikTokUIImage,
    description:
      "A **travel showcase website** for Điện Biên Phủ province, Vietnam — converted from a static HTML site into a modern **React 19 + Vite** app with lazy-loaded imagery, card/modal-based content browsing, and safely rendered markdown content via **DOMPurify**.\n\nA **Three.js / React Three Fiber** element adds a subtle 3D visual touch to the hero section, and **Framer Motion** drives page transitions. Styled with **Tailwind CSS 4** for a clean, fast-loading layout suitable for tourism content.",
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Framer Motion",
      "Three.js",
      "DOMPurify",
    ],
    githubUrl: "https://github.com/trung2605/DienBienPhu_Travel-",
    liveUrl: "#",
    status: "Completed",
    category: "frontend",
    tier: 4,
    challenge:
      "Chuyển đổi một site tĩnh HTML lỗi thời thành một trải nghiệm React hiện đại — vừa giữ nội dung du lịch phong phú, vừa đảm bảo render markdown an toàn và hiệu năng tải nhanh cho ảnh nhiều.",
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
    techStack: [
      "Java 21",
      "Spring Boot 3.4.3",
      "MongoDB",
      "React 18",
      "TypeScript",
      "TanStack Query",
      "Monaco Editor",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "Completed",
    category: "fullstack",
    tier: 3,
    challenge:
      "Sinh viên FPT cần một nơi tập trung tài liệu môn học kèm công cụ ôn tập chủ động (flashcard, quiz) thay vì tài liệu rời rạc — và bản thân dự án cũng cần duy trì kỷ luật kỹ thuật tốt (log cải tiến, sửa lỗi thật) chứ không chỉ là demo.",
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
    status: "Completed",
    category: "frontend",
    tier: 4,
    challenge:
      "Tái tạo chính xác ngôn ngữ thiết kế của Instagram (gradient, color token) làm nền tảng UI trước khi mở rộng thành công cụ tự động hoá chatbot messaging thật.",
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
    techStack: [
      "React 18",
      "Vite",
      "MUI",
      "Tailwind CSS 4",
      "Framer Motion",
      "Recharts",
    ],
    githubUrl: "https://github.com/trung2605/Study_Post_Graduate_Sydney",
    liveUrl: "#",
    status: "Active",
    category: "frontend",
    tier: 4,
    challenge:
      "Trình bày thông tin so sánh chương trình học sau đại học phức tạp (học phí, thời lượng, yêu cầu) theo cách dễ hiểu cho học sinh, thay vì bảng dữ liệu khô khan.",
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
    techStack: [
      "React 19",
      "Vite",
      "Tailwind CSS 4",
      "Framer Motion",
      "React Hook Form",
      "Google Maps API",
    ],
    githubUrl: "https://github.com/trung2605/PapaSteak_Website",
    liveUrl: "#",
    status: "Active",
    category: "frontend",
    tier: 4,
    challenge:
      "Xây dựng landing page nhà hàng cao cấp cần truyền tải cảm giác 'premium' qua visual, đồng thời giải quyết bài toán thực tế: nhà hàng có nhiều chi nhánh nên khách cần chuyển đổi bản đồ chỉ đường dễ dàng.",
    highlights: [
      "Thiết kế theme dark/amber cao cấp phù hợp thương hiệu steakhouse",
      "Tích hợp Google Maps đa chi nhánh với chuyển đổi chỉ đường một chạm",
      "Form đặt bàn có validate đầy đủ bằng React Hook Form, menu overlay động",
    ],
    screenshots: [],
  },
  {
    id: 24,
    title: "ThreadLearn: AI Race-Condition Detector & Fix Suggestion Engine",
    role: "AI Engineer — RAG Pipeline, FastAPI Server, Static Analysis",
    duration: "06/2026 – 07/2026",
    image: ThreadLearnShot1,
    description:
      "Fine-tuned a 1.5B-parameter LLM (Qwen2.5-Coder + QLoRA) that outperforms GPT-3.5-turbo at fixing JavaScript concurrency bugs — 73.3% vs 65.0% on 30 real production bugs, despite a ~125x smaller model.\n\nBuilt a RAG pipeline (BM25 + AST retrieval, 2,050-doc knowledge base) paired with a custom static race-condition detector to ground the model's fixes and cut hallucination.\n\nShipped a production FastAPI microservice (JWT, Redis, MongoDB) serving real-time fix suggestions. Co-authored a research paper submitted at ICTA 2026.",
    techStack: [
      "Python FastAPI",
      "Whisper",
      "Java Spring Boot",
      "ReactJS",
      "Redis",
      "MongoDB",
      "Qwen2.5-Coder 1.5B",
      "QLoRA",
      "BM25",
    ],
    githubUrl: "https://github.com/ThreadLearn/ThreadLearn_AI_Trainning",
    liveUrl: "https://threadlearn.vercel.app/",
    status: "Completed",
    category: "ai",
    tier: 1,
    challenge:
      "ESLint chỉ báo lỗi concurrency JavaScript mà không tự sửa; gọi GPT-4 tốn kém chi phí API và dễ bị ảo giác cú pháp. Cần một model 1.5B nhỏ gọn chạy tối ưu kết hợp pipeline retrieval chính xác tên hàm qua AST và BM25.",
    highlights: [
      "Fine-tuned LLM 1.5B tham số (Qwen2.5-Coder + QLoRA) vượt trội hơn GPT-3.5-turbo trong việc sửa lỗi concurrency JavaScript — 73.3% so với 65.0% trên 30 lỗi production thật",
      "Xây dựng pipeline RAG (BM25 + AST retrieval, 2.050 tài liệu) kết hợp bộ phát hiện static race-condition chống hallucination",
      "Triển khai microservice FastAPI production (JWT, Redis, MongoDB) phục vụ gợi ý sửa lỗi thời gian thực",
      "Đồng tác giả bài báo nghiên cứu khoa học — đã nộp tại hội nghị ICTA 2026",
    ],
    screenshots: [ThreadLearnShot1, ThreadLearnShot2],
  },
  {
    id: 25,
    title: "Nursing & Medical Technology Faculty Website",
    role: "Frontend Developer (Team Project)",
    duration: "Team project",
    image: NursingKTYHShot2,
    description:
      "The official **department website for the Faculty of Nursing and Medical Technology** at Phan Chau Trinh University — built for a real academic client with a 6-person team, covering faculty info, department pages (Nursing, Medical Technology), organizational chart, teaching staff listings, and bilingual content.\n\nBuilt with **vanilla JavaScript Web Components** (no framework) — a custom `site-navbar`, `site-hero`, `site-footer`, and content components — plus a lightweight **client-side router** and a **data-driven i18n system** for Vietnamese/English content switching. I contributed the **organizational chart component** (a responsive branch-connector layout for the department hierarchy) and refactored department pages to fetch content dynamically instead of hardcoding it per page.",
    techStack: ["JavaScript (Web Components)", "CSS3", "Custom Router", "i18n"],
    githubUrl: "https://github.com/Garchomppy/Nursing-KTYH",
    liveUrl: "#",
    status: "Active",
    category: "frontend",
    tier: 3,
    challenge:
      "Xây website khoa cho khách hàng thật (Đại học Y Dược Phan Châu Trinh) — team 6 người, không dùng framework, cần sơ đồ tổ chức phân cấp responsive và nội dung song ngữ dễ cập nhật mà không hardcode theo từng trang.",
    highlights: [
      "Xây dựng component sơ đồ tổ chức (org chart) với branch connector responsive cho cấu trúc khoa",
      "Refactor các trang bộ môn sang fetch dữ liệu động thay vì hardcode nội dung mỗi trang",
      "Toàn bộ site dùng vanilla JS Web Components, router và i18n tự viết, không dùng framework",
    ],
    screenshots: [NursingKTYHShot1, NursingKTYHShot2],
  },
  {
    id: 26,
    title: "Biensovip.com — Sàn Đấu Giá & Định Giá Biển Số Đẹp",
    role: "Solo Software Architect & Full-Stack Engineer",
    duration: "05/2026 – Present",
    image: BiensovipShot1,
    description:
      "Independently designed, architected, and built a production-grade marketplace and valuation platform solo from scratch — .NET 8 / ASP.NET Core (Clean Architecture: Domain, Application, Infrastructure, API), 61 database entities on PostgreSQL 16 with EF Core, and React 19.\n\nMade strategic architectural decisions: selected PostgreSQL over MongoDB to ensure ACID transactional consistency and optimize sub-8ms multi-filter queries using Composite and GIN indexes. Integrated automated VietQR Webhook deposit matching in <0.5s backed by a 15-minute Redis distributed mutex lock to completely eliminate double-booking concurrency bugs. Secured with JWT dual-token authentication (short-lived access token + HttpOnly cookie refresh token), DeepSeek AI chatbot for 24/7 client inquiries, Cloudinary, AWS SES, and independent Linux VPS administration with Docker and Nginx.",
    techStack: [
      ".NET 8 / ASP.NET Core",
      "Clean Architecture",
      "PostgreSQL 16",
      "EF Core",
      "React 19",
      "Redis Distributed Lock",
      "VietQR Webhook",
      "DeepSeek AI",
      "Cloudinary",
      "AWS SES",
      "Linux VPS & Nginx",
    ],
    githubUrl: "https://github.com/BienSoDep/biensovip-backend",
    liveUrl: "https://biensovip.com",
    status: "Active",
    category: "ecommerce",
    tier: 1,
    challenge:
      "Thiết kế và triển khai trọn gói sàn giao dịch biển số quy mô lớn solo từ con số 0 trong 30 ngày: giải quyết bài toán lọc đa tiêu chí siêu tốc giữa hàng chục nghìn biển số, khớp lệnh cọc thời gian thực không bán trùng, và loại bỏ hoàn toàn rủi ro chứng chỉ PCI-DSS.",
    highlights: [
      "Kiến trúc độc lập toàn diện trên .NET 8 Clean Architecture với 61 bảng thực thể PostgreSQL và EF Core",
      "Tối ưu truy vấn lọc đa tiêu chí GIN Index từ 350ms xuống dưới 8ms, phản hồi tức thời",
      "Cổng cọc VietQR Webhook tự động khớp lệnh <0.5s kết hợp khóa phân tán Redis 15 phút triệt tiêu 100% rủi ro bán trùng",
      "Bảo mật kép JWT, DeepSeek AI Chatbot tư vấn 24/7, Cloudinary, AWS SES và tự cấu hình vận hành Linux VPS",
    ],
    screenshots: [
      BiensovipShot1,
      BiensovipShot2,
      BiensovipShot3,
      BiensovipShot4,
    ],
  },
  {
    id: 27,
    title: "Chest X-Ray Pneumonia Classification",
    role: "ML Engineer (Team Project)",
    duration: "Course exercise",
    image: TikTokUIImage,
    description:
      "A **CNN built from scratch** to classify chest X-ray images as NORMAL or PNEUMONIA — a timeboxed (3-hour) team exercise across a dataset of 5,856 images, split into a data-analysis sub-team and a modeling sub-team.\n\nWorked on the **data/EDA side**: profiling class imbalance across train/test/val splits (74.3% PNEUMONIA in training data), documenting the data pipeline, and designing the **data augmentation strategy** feeding into a CNN trained without pre-trained weights (built and tuned from scratch, no transfer learning) in **TensorFlow/Keras**.",
    techStack: [
      "Python",
      "TensorFlow / Keras",
      "CNN",
      "Data Augmentation",
      "EDA",
    ],
    githubUrl: "#",
    liveUrl: "#",
    status: "Completed",
    category: "ai",
    tier: 4,
    challenge:
      "Xây CNN phân loại viêm phổi từ X-quang trong 3 tiếng với team 4 người — dataset mất cân bằng lớp nặng (74.3% PNEUMONIA), yêu cầu bắt buộc: không dùng pre-trained model, phải tự xây CNN từ đầu.",
    highlights: [
      "Phân tích EDA: mất cân bằng lớp giữa các tập train/test/val (5,856 ảnh)",
      "Thiết kế pipeline data augmentation cho CNN tự xây (không transfer learning)",
      "Làm việc song song 2 sub-team trong deadline 3 tiếng, TensorFlow/Keras",
    ],
    screenshots: [],
  },
  {
    id: 28,
    title: "Yarnia — Interactive Storytelling Platform for Children",
    role: "Backend Architect & Team Lead (Team Project)",
    duration: "05/2026 – Present",
    image: TikTokUIImage,
    description:
      "A comprehensive digital storytelling and reading practice platform designed for children aged 3–12. Architected a high-throughput, clean-architecture backend using **.NET 10** (ASP.NET Core Web API) and **MongoDB** (30 collections) paired with Google OAuth, JWT authentication, AWS S3/CloudFront audio streaming, Cloudinary media storage, and **PayOS webhook** payment processing.\n\nDesigned modular subsystems covering Kid Profile wizards, reading gamification with achievement tracking, and AI-powered text-to-speech audio pipelines for interactive pronunciation practice.",
    techStack: [
      ".NET 10",
      "ASP.NET Core",
      "MongoDB",
      "Clean Architecture",
      "AWS S3 & CloudFront",
      "PayOS",
      "JWT & OAuth",
      "Cloudinary",
      "xUnit",
    ],
    githubUrl: "https://github.com/trung2605/Yarnia-Backend",
    liveUrl: "#",
    status: "In Development",
    category: "fullstack",
    tier: 2,
    challenge:
      "Xây dựng nền tảng kể chuyện và luyện đọc đa kênh (Web/Mobile) cho trẻ em 3-12 tuổi với yêu cầu streaming audio tức thời, tích hợp cổng thanh toán PayOS webhook và quản lý dữ liệu 30 MongoDB collections theo chuẩn Clean Architecture.",
    highlights: [
      "Kiến trúc backend Clean Architecture trên .NET 10 (Domain / Application / Infrastructure / API) với 30 collections MongoDB",
      "Tích hợp xác thực kép Google OAuth + JWT, Cloudinary quản lý ảnh, AWS S3 + CloudFront tối ưu streaming audio",
      "Xây dựng pipeline thanh toán gói gia đình tự động qua PayOS webhook và hệ thống gamification tiến độ đọc",
      "Thiết lập bộ test toàn diện: xUnit, NSubstitute, FluentAssertions và Mongo2Go integration tests",
    ],
    screenshots: [],
  },
  {
    id: 29,
    title: "Smart WeatherTracking — Cloud Ecosystem",
    role: "Full-Stack & Mobile Developer (Team Project)",
    duration: "05/2026 – 08/2026",
    image: TikTokUIImage,
    description:
      "A cross-platform smart weather monitoring and alerting ecosystem. Built with a high-performance **Flutter 3.x** mobile client (Riverpod state management, GoRouter, adaptive weather color palettes) backed by a serverless **Firebase Cloud Functions (Node.js 24)** backend with Cloud Firestore, Firebase Authentication, Cloud Storage, and real-time **Firebase Cloud Messaging (FCM)** push alerts.",
    techStack: [
      "Flutter",
      "Dart",
      "Firebase Cloud Functions",
      "Cloud Firestore",
      "Node.js",
      "FCM (Push Notifications)",
      "Riverpod",
    ],
    githubUrl: "https://github.com/PRM393r/WeatherTracking_BE",
    liveUrl: "#",
    status: "Completed",
    category: "fullstack",
    tier: 3,
    challenge:
      "Cung cấp thông tin dự báo thời tiết và cảnh báo thiên tai theo thời gian thực tới người dùng di động với độ trễ thấp và kiến trúc serverless tiết kiệm chi phí vận hành.",
    highlights: [
      "Xây dựng ứng dụng di động Flutter 3.x mượt mà với kiến trúc Riverpod và bảng màu thời tiết thích ứng",
      "Backend serverless Node.js 24 trên Firebase Cloud Functions kết hợp Cloud Firestore phân tán",
      "Hệ thống thông báo đẩy thời gian thực FCM gửi cảnh báo thời tiết cực đoan theo tọa độ địa lý",
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
  {
    id: 46,
    category: "Event",
    name: "Hackathon Computer Vision 2026",
    issuer: "FPT University × Singapore Institute of Technology (SIT)",
    year: "2026",
    dateIssued: "2026",
    image: HackathonCVImage,
    description:
      "Certificate of participation in **Hackathon Computer Vision 2026** — an international hackathon competition between FPT University and Singapore Institute of Technology (SIT), strengthening academic exchange between the two institutions.",
  },
  {
    id: 47,
    category: "Event",
    name: "Certificate of Merit — Honorable Student of Semester",
    issuer: "FPT University",
    year: "2026",
    dateIssued: "29/6/2026",
    image: CertOfMeritImage,
    description:
      "Awarded **Honorable Student of the Semester (Spring 2026)** by FPT University in recognition of outstanding academic performance and conduct during the semester.",
  },
];

export const prizes = [
  {
    id: 8,
    title: "Hackathon Computer Vision 2026",
    position: "Winner (First Place)",
    year: "08/2026",
    organization: "FPT Education",
    description:
      "Awarded **Winner (First Place)** at the **Hackathon Computer Vision 2026** organized by FPT Education (06/08/2026) — designing and implementing high-accuracy computer vision and AI models under intense competition constraints.",
    image: HackathonCVImage,
  },
  {
    id: 9,
    title: "International Scientific Paper (ICTA 2026)",
    position: "Co-Author / Researcher",
    year: "07/2026",
    organization: "ICTA 2026 Conference",
    description:
      "Co-authored international research paper accepted and presented at **ICTA 2026** on lightweight AI fine-tuning models (Qwen2.5-Coder-1.5B + QLoRA + BM25 AST RAG) for automated race-condition vulnerability remediation in source code.",
  },
  {
    id: 1,
    title: "Innocode Camp SU25",
    position: "National Finalist (Team Leader)",
    year: "07/2025",
    organization: "FPT Education",
    description:
      "Advanced to the **National Final Round (08/07/2025)** of Innocode Camp Summer 2025 as Team Leader — leading the full development lifecycle of a full-stack platform using Java Spring Boot and MySQL.",
  },
  {
    id: 2,
    title: "Research Festival (ResFres 2024)",
    position: "National Finalist",
    year: "06/2024",
    organization: "FPT Education",
    description:
      "Advanced to the **National Final Round (20/06/2024)** of the FPT Research Festival — original scientific research project defending in front of academic panels across 5 FPT campuses.",
  },
  {
    id: 5,
    title: "FPT ResFes 2024 – 5 Campus Scale",
    position: "Research Finalist",
    year: "05/2024",
    organization: "FPT Education",
    description:
      "Selected as a **research finalist** at the multi-campus scale of FPT ResFes 2024 — competing against research teams from all 5 FPT University campuses nationwide.",
  },
  {
    id: 7,
    title: "FPT Code Talent Contest",
    position: "Finalist",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Reached the **final round** of FPT Code Talent — flagship coding competition covering algorithms, OOP design, and system-level problem solving.",
  },
  {
    id: 6,
    title: "Code Mosaic Algorithm Contest",
    position: "Finalist",
    year: "10/2025",
    organization: "FPT Education",
    description:
      "Advanced to the **final round** of Code Mosaic algorithmic contest — data structures, algorithmic complexity, and problem-solving speed under time pressure.",
  },
  {
    id: 3,
    title: "Talent Contest – Final Interview Round",
    position: "Winner (First Place)",
    year: "04/2022",
    organization: "Phan Chau Trinh High School",
    description:
      "Awarded **First Place** in the high school Talent Contest final interview round — early indicator of public speaking confidence and stage presence.",
  },
  {
    id: 4,
    title: "Talent & Beauty Contest (Mister)",
    position: "First Runner-up",
    year: "04/2022",
    organization: "Phan Chau Trinh High School",
    description:
      "Awarded **First Runner-up (Mister)** in the school's annual Talent and Beauty Contest.",
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
    title: "Achievements",
    desc: "Education, certificates, and prizes",
    icon: <FaGraduationCap />,
    path: "/achievements",
  },
  {
    title: "Services",
    desc: "Professional website development for shop owners",
    icon: <FaRocket />,
    path: "/dich-vu",
  },
  {
    title: "Blog",
    desc: "Technical writing and project deep-dives",
    icon: <FaNewspaper />,
    path: "/blog",
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
    company: "SynapForge Venture Studio",
    role: "Founder & Head of Technology",
    type: "Founding / Leadership",
    duration: "01/2026 – Hiện tại",
    status: "Current",
    description:
      "Founder & Head of Technology (Tech Lead / Software Architect) tại SynapForge Venture Studio. Định hình kiến trúc tổng thể, dẫn dắt các dòng sản phẩm trọng điểm: Biensovip.com (.NET 8 Clean Architecture), The MC Hub (AI Voice Training), BrandHub (7 Microservices).",
    skills: [
      "System Architecture",
      ".NET 8 / Clean Architecture",
      "Java 21 / Spring Boot 3",
      "Microservices & RabbitMQ",
      "AI Engineering (FastAPI, Whisper, RAG)",
      "Docker & VPS Deployment",
    ],
    color: "#c5b0f4",
  },
  {
    id: 2,
    company: "Biensovip.com",
    role: "Solo Software Architect & Full-Stack Engineer",
    type: "Production Venture",
    duration: "05/2026 – Hiện tại",
    status: "Current",
    description:
      "Thiết kế và lập trình trọn gói sàn giao dịch & đấu giá biển số đẹp từ con số 0: Backend .NET 8 / ASP.NET Core theo chuẩn Clean Architecture, 61 database entities PostgreSQL tối ưu GIN Index <8ms, cổng cọc VietQR Webhook <0.5s, xác thực kép JWT, DeepSeek AI Chatbot và vận hành Linux VPS độc lập.",
    skills: [
      ".NET 8 / ASP.NET Core",
      "Clean Architecture",
      "61 Database Entities",
      "PostgreSQL GIN Index",
      "VietQR Webhook",
      "DeepSeek AI",
    ],
    color: "#dceeb1",
  },
  {
    id: 3,
    company: "The MC Hub",
    role: "CEO & Tech Lead (Team 6 Kỹ sư)",
    type: "AI Commercial Venture",
    duration: "01/2026 – 07/2026",
    status: "Completed",
    description:
      "Dẫn dắt đội ngũ 6 kỹ sư đưa nền tảng luyện giọng nói AI ra thị trường trong 6 tháng. Onboard 87 MC chuyên nghiệp ngay tháng đầu, tạo doanh thu thực tế qua 20 gói đăng ký. Xây dựng microservice AI bằng Python FastAPI + OpenAI Whisper đánh giá phát âm, ngữ điệu, ngắt nghỉ.",
    skills: [
      "Python FastAPI",
      "OpenAI Whisper AI",
      "Java Spring Boot 3.3",
      "React 19",
      "MongoDB & Redis",
      "Team Leadership",
    ],
    color: "#f4ecd6",
  },
  {
    id: 4,
    company: "FPT Software (FSoft Đà Nẵng)",
    role: "Software Developer Intern",
    type: "Internship",
    duration: "08/2025 – 12/2025",
    status: "Completed",
    description:
      "Phát triển ứng dụng doanh nghiệp OutSystems Reactive Web trong môi trường Agile/Scrum chuẩn FSoft. Trực tiếp debug, tối ưu hóa cơ sở dữ liệu và tái cấu trúc mã nguồn theo 4-Layer Architecture.",
    skills: [
      "OutSystems Reactive Web",
      "Agile/Scrum",
      "Enterprise Architecture",
      "Performance Optimization",
    ],
    color: "#c8e6cd",
  },
  {
    id: 5,
    company: "The Dreamers Organization",
    role: "Founder & Chủ tịch",
    type: "Leadership / Social Impact",
    duration: "15/06/2024 – Hiện tại",
    status: "Current",
    description:
      "Sáng lập và điều hành tổ chức thiện nguyện sinh viên gồm hơn 30 thành viên, tổ chức hơn 4 sự kiện quy mô lớn lan tỏa giáo dục công nghệ và giá trị nhân văn đến trẻ em cơ nhỡ tại miền Trung.",
    skills: [
      "Team Leadership",
      "Project Management",
      "Community Outreach",
      "Social Impact",
    ],
    color: "#efd4d4",
  },
  {
    id: 6,
    company: "FPT University / Public Events",
    role: "Professional MC & Event Leader",
    type: "Leadership / Hosting",
    duration: "01/2024 – Hiện tại",
    status: "Current",
    description:
      "Người dẫn chương trình (MC) cho hơn 50 sự kiện trường và diễn đàn công nghệ (600–1000+ người). Trọng tài giải đấu FPTU AI & Robotics 2025 và Đại sứ sinh viên dự án kinh tế Đà Nẵng 'Working Space'.",
    skills: ["Public Speaking", "Event Hosting", "Leadership", "Stage Charisma"],
    color: "#f3c9b6",
  },
];

export const languages = [
  {
    name: "Vietnamese",
    level: "Native",
    proficiency: 100,
    description: "Tiếng mẹ đẻ — thành thạo hoàn toàn trong giao tiếp và chuyên môn",
    flag: "🇻🇳",
  },
  {
    name: "English",
    level: "Professional Working (IELTS 6.0)",
    proficiency: 80,
    description: "IELTS 6.0 (IDP Education 04/2026) — Trao đổi sinh viên quốc tế tại Malaysia, đọc hiểu tài liệu kỹ thuật chuyên sâu",
    flag: "🇬🇧",
  },
  {
    name: "Japanese",
    level: "Beginner",
    proficiency: 20,
    description: "Hiragana & Katakana hoàn thành — tự học giao tiếp cơ bản",
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

export const posts = allPosts;

export const testimonials = [
  // Để trống — điền lời nhận xét thật (mentor/giảng viên/đồng đội) vào đây theo shape:
  // { id: 1, name: "...", role: "...", company: "...", quote: "...", avatar: "..." }
];

// proficiency (0-100) suy luận từ số lượng + độ sâu sử dụng qua các project — tự tinh chỉnh lại nếu muốn phản ánh đúng hơn cảm nhận thật
// Config for the "For Recruiters" match widget — role -> which project categories/skills
// count as a match, and which experience entry (by id, see `experience` above) to surface.
// Labels/blurbs are translated via recruiterMatch.roles.<id>.* in en.json/vi.json.
export const recruiterRoles = [
  {
    id: "backend",
    categories: ["fullstack", "ai"],
    skillIds: [
      "spring-boot",
      "node",
      "python",
      "dotnet",
      "sql",
      "mongodb",
      "redis",
      "postgresql",
    ],
    experienceId: 1,
  },
  {
    id: "frontend",
    categories: ["frontend", "fullstack"],
    skillIds: ["react", "tailwind", "framer-motion", "typescript", "threejs"],
    experienceId: 1,
  },
  {
    id: "fullstack",
    categories: ["fullstack", "ecommerce"],
    skillIds: ["react", "spring-boot", "mongodb", "sql", "node", "dotnet"],
    experienceId: 2,
  },
  { id: "ai-ml", categories: ["ai"], skillIds: ["python"], experienceId: 3 },
  {
    id: "lowcode",
    categories: ["lowcode", "automation"],
    skillIds: ["outsystems"],
    experienceId: 4,
  },
  {
    id: "freelance",
    categories: ["ecommerce", "lowcode"],
    skillIds: ["dotnet", "react", "postgresql"],
    experienceId: 2,
  },
];

export const skillTaxonomy = [
  {
    id: "react",
    label: "React",
    category: "Frontend",
    proficiency: 90,
    projectIds: [1, 4, 6, 7, 10, 11, 17, 18, 19, 21, 22, 26],
  },
  {
    id: "spring-boot",
    label: "Java Spring Boot",
    category: "Backend",
    proficiency: 85,
    projectIds: [1, 2, 3, 7, 11, 14, 18],
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "Language",
    proficiency: 70,
    projectIds: [13, 14, 18],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "Database",
    proficiency: 70,
    projectIds: [11, 13, 14, 18],
  },
  {
    id: "sql",
    label: "MySQL / SQL Server",
    category: "Database",
    proficiency: 75,
    projectIds: [1, 2, 7],
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    category: "Frontend",
    proficiency: 80,
    projectIds: [10, 11, 17, 19, 21, 22],
  },
  {
    id: "framer-motion",
    label: "Framer Motion",
    category: "Frontend",
    proficiency: 75,
    projectIds: [10, 17, 21, 22],
  },
  {
    id: "node",
    label: "Node.js / Express.js",
    category: "Backend",
    proficiency: 60,
    projectIds: [4, 11, 13],
  },
  {
    id: "flutter",
    label: "Flutter",
    category: "Mobile",
    proficiency: 55,
    projectIds: [13],
  },
  {
    id: "python",
    label: "Python / FastAPI",
    category: "Backend",
    proficiency: 50,
    projectIds: [14, 24, 27],
  },
  {
    id: "dotnet",
    label: "ASP.NET Core",
    category: "Backend",
    proficiency: 55,
    projectIds: [26],
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "Database",
    proficiency: 55,
    projectIds: [26],
  },
  {
    id: "redis",
    label: "Redis",
    category: "Backend",
    proficiency: 55,
    projectIds: [14],
  },
  {
    id: "docker",
    label: "Docker",
    category: "DevOps",
    proficiency: 50,
    projectIds: [14],
  },
  {
    id: "threejs",
    label: "Three.js",
    category: "Frontend",
    proficiency: 45,
    projectIds: [17],
  },
  {
    id: "outsystems",
    label: "OutSystems",
    category: "Low-Code",
    proficiency: 65,
    projectIds: [5],
  },
  {
    id: "google-maps",
    label: "Google Maps API",
    category: "Integration",
    proficiency: 60,
    projectIds: [2, 22],
  },
  {
    id: "leadership",
    label: "Project & Team Leadership",
    category: "Soft Skill",
    proficiency: 80,
    projectIds: [1, 2, 3],
  },
];
