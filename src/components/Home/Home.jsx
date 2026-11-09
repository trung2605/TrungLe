import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaDownload, FaGithub, FaArrowRight,
  FaRocket, FaLaptopCode, FaGraduationCap, FaUser, FaNewspaper, FaEnvelope,
  FaStore, FaUserCheck, FaExternalLinkAlt
} from "react-icons/fa";
import { personalInfo, allSkillsData } from "../../data";
import NewAvatar from "../../assets/information/image.png";
import TechIcon from "../../common/TechIcon";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
import CountUp from "../../animations/CountUp";
import GitHubStats from "./GitHubStats";
import Testimonials from "./Testimonials";

const TECH_MARQUEE = [
  "Java Spring Boot", ".NET 8 Clean Architecture", "PostgreSQL", "React 18", "Docker",
  "RabbitMQ & DLQ", "Redis Distributed Lock", "Python FastAPI RAG", "TypeScript",
  "Tailwind CSS", "Spring Security", "VietQR Webhook", "Microservices"
];

const MALAYSIA_PHOTO =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962693/my-website/assets/educationMemories/Malaysia_Memory.jpg";
const FPT_PHOTO =
  "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1769962692/my-website/assets/educationMemories/FPT_Memory_1.jpg";

const FLAGSHIP_FOLDERS = [
  {
    num: "01",
    id: 26,
    date: "MAY 2026 – PRESENT • LIVE PRODUCTION",
    title: "Biensovip.com",
    subtitleVi: "Sàn đấu giá & định giá biển số đẹp Quốc gia: đồng bộ 1,1M+ bản ghi VPA, lọc GIN Index <8ms, máy trạng thái 4-Tab FSM, TikTok Live 9:16 Studio và đối soát cọc VietQR <0.5s.",
    subtitleEn: "National VIP license plate marketplace: 1.1M+ VPA auction records, sub-8ms GIN queries, 4-Tab FSM, TikTok Live 9:16 Studio, and <0.5s VietQR webhook settlement.",
    tabBg: "#2563EB",
    tabColor: "#FFFFFF",
    folderBg: "#18181B",
    folderColor: "#FFFFFF",
    subColor: "#A1A1AA",
    metaColor: "#D4D4D8",
    shot1: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353578/my-website/assets/projects/screenshots/biensovip_1_home.png",
    shot2: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789353581/my-website/assets/projects/screenshots/biensovip_2_detail.png",
    liveUrl: "https://biensovip.com",
    metrics: ["1.1M+ VPA Records", "< 8ms GIN Query", "57 UCs & 85 BRs"],
  },
  {
    num: "02",
    id: 14,
    date: "MAY 2026 – PRESENT • 7 MICROSERVICES",
    title: "BrandHub Platform",
    subtitleVi: "Hệ thống 7 Microservices xuất bản đa kênh (Spring Boot 3, RabbitMQ DLQ 0% loss, GraphRAG), chuẩn hóa 141 Atomic FRs, Mobile App 79 màn hình và 2.500+ Test Cases / 320+ Playwright E2E.",
    subtitleEn: "Enterprise 7-Microservices multichannel platform (Spring Boot 3, RabbitMQ DLQ 0% loss, GraphRAG), 141 Atomic FRs, 79-screen React Native app, and 2,500+ test cases / 320+ E2E suites.",
    tabBg: "#18181B",
    tabColor: "#FFFFFF",
    folderBg: "#2563EB",
    folderColor: "#FFFFFF",
    subColor: "#DBEAFE",
    metaColor: "#EFF6FF",
    shot1: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579601/my-website/assets/projects/screenshots/DA-D19-01.png",
    shot2: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579603/my-website/assets/projects/screenshots/DA-D19-02.png",
    liveUrl: "https://brandhub.id.vn",
    metrics: ["141 Atomic FRs", "2.5K+ Test Cases", "79 Mobile Screens"],
  },
  {
    num: "03",
    id: 11,
    date: "JAN 2026 – NOV 2026 • AI VOICE SAAS",
    title: "The MC Hub",
    subtitleVi: "Nền tảng luyện giọng nói AI thương mại hóa từ tháng đầu (87 MCs, 20 gói thuê bao): 10-Metric Acoustic DSP & Whisper Engine, 116 Atomic FRs, 69 màn hình và 139 sơ đồ UML.",
    subtitleEn: "Commercial AI voice coaching SaaS (87 MCs onboarded in month 1): 10-Metric Acoustic DSP & Whisper Engine, 116 Atomic FRs, 69 React 19 screens, and 139 UML diagrams.",
    tabBg: "#F5C242",
    tabColor: "#18181B",
    folderBg: "#F5C242",
    folderColor: "#18181B",
    subColor: "#3F3F46",
    metaColor: "#18181B",
    shot1: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579575/my-website/assets/projects/screenshots/01-landing.png",
    shot2: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579578/my-website/assets/projects/screenshots/01-dashboard-full.png",
    liveUrl: "https://mc-voice-training.vercel.app/",
    metrics: ["10-Metric DSP", "87 MCs Onboarded", "116 Atomic FRs"],
  },
  {
    num: "04",
    id: 24,
    date: "2026 • ICTA 2026 PAPER & HACKATHON",
    title: "ThreadLearn AI",
    subtitleVi: "Đồng tác giả bài báo quốc tế ICTA 2026: Mô hình LLM 1.5B fine-tuned bằng QLoRA kết hợp BM25 + AST RAG phát hiện và sửa lỗi bất đồng bộ JavaScript đạt 73.3% (vượt GPT-3.5).",
    subtitleEn: "ICTA 2026 Research Paper Co-Author: Fine-tuned 1.5B LLM with QLoRA + BM25 AST RAG pipeline outperforming GPT-3.5 on JavaScript concurrency bug repair (73.3% vs 65.0%).",
    tabBg: "#18A96B",
    tabColor: "#FFFFFF",
    folderBg: "#18A96B",
    folderColor: "#FFFFFF",
    subColor: "#ECFDF5",
    metaColor: "#D1FAE5",
    shot1: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579605/my-website/assets/projects/screenshots/slide_07_pipeline.png",
    shot2: "https://res.cloudinary.com/dvwt6npcl/image/upload/f_auto,q_auto/v1789579607/my-website/assets/projects/screenshots/slide_11_main_results.png",
    liveUrl: "/blog/threadlearn-javascript-concurrency-bugs",
    metrics: ["1.5B QLoRA", "73.3% Fix Rate", "ICTA 2026 Paper"],
  },
  {
    num: "05",
    id: 30,
    date: "OCT – NOV 2026 • 12 TIKTOK 3D GAMES",
    title: "TikTok Live 3D Ecosystem",
    subtitleVi: "Hệ sinh thái 12 game 3D tương tác TikTok Live 9:16 thời gian thực (Cúng Chùa Online 3D, Cuộc Đua Kỳ Thú 3D, AdminTong 21 biểu đồ ApexCharts) đạt 193/193 automated tests.",
    subtitleEn: "12-game real-time 9:16 3D TikTok Live interactive ecosystem (Cúng Chùa Online 3D, Cuộc Đua Kỳ Thú 3D, AdminTong with 21 ApexCharts) verified by 193/193 automated tests.",
    tabBg: "#EA580C",
    tabColor: "#FFFFFF",
    folderBg: "#18181B",
    folderColor: "#FFFFFF",
    subColor: "#A1A1AA",
    metaColor: "#D4D4D8",
    shot1: "/docs/images/tiktok_live_3d.jpg",
    shot2: "/docs/images/tiktok_live_3d.jpg",
    liveUrl: null,
    metrics: ["12 Live 3D Games", "21 ApexCharts", "193/193 Tests Pass"],
  },
];

const STAMP_SKILLS = [
  { labelVi: "Kiến Trúc Hệ Thống & SaaS", labelEn: "System Architecture & SaaS", bg: "#F5C242", color: "#18181B", icon: "⚡" },
  { labelVi: "Java Spring Boot & .NET 8", labelEn: "Java Spring Boot & .NET 8", bg: "#18A96B", color: "#FFFFFF", icon: "⚙️" },
  { labelVi: "AI Agents & RAG Pipeline", labelEn: "AI Agents & RAG Pipeline", bg: "#EC4899", color: "#FFFFFF", icon: "🧠" },
  { labelVi: "React / Next.js & UI/UX", labelEn: "React / Next.js & UI/UX", bg: "#2563EB", color: "#FFFFFF", icon: "👀" },
];

const SkillBar = ({ skill }) => (
  <div style={{ marginBottom: '14px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)' }}>{skill.name}</span>
      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-ink-soft)' }}>{skill.level}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-surface-soft)', border: '1.5px solid var(--color-border-strong)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        style={{ height: '100%', backgroundColor: '#18A96B' }}
      />
    </div>
  </div>
);

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t, i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');
  const { skills } = useTranslatedData();
  const [activeFolderIndex, setActiveFolderIndex] = useState(0);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: prefersReducedMotion ? 0 : delay, duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] },
  });

  const activeFolder = FLAGSHIP_FOLDERS[activeFolderIndex] || FLAGSHIP_FOLDERS[0];
  const secondaryFolder = FLAGSHIP_FOLDERS[2]; // Mustard yellow folder stacked underneath like Robin's "Forge"

  return (
    <div>
      {/* ============================================================
          1. ROBIN CENTERPIECE HERO SECTION
         ============================================================ */}
      <section style={{ paddingTop: '36px', paddingBottom: '56px', position: 'relative' }}>
        <div
          style={{
            maxWidth: '940px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            padding: '8px 12px',
          }}
        >
          {/* Top Row: Left Mint Pill + Handwritten "my name is" + Right Butter Pill */}
          <motion.div
            {...fadeUp(0.05)}
            style={{
              width: '100%',
              maxWidth: '640px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '10px',
              flexWrap: 'wrap',
            }}
          >
            {/* Left Mint Pill Sticker */}
            <span
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: '9999px',
                backgroundColor: '#A7E8BD',
                color: '#064E3B',
                border: '1.5px solid #18181B',
                boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transform: 'rotate(-2.5deg)',
              }}
            >
              {isEn ? 'MADE THINGS' : 'XÂY HỆ THỐNG THẬT'}
            </span>

            {/* Center Handwritten "my name is" + hand-drawn underline */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
              <span
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                  lineHeight: 1.05,
                }}
              >
                {isEn ? 'my name is' : 'xin chào, mình là'}
              </span>
              <svg width="78" height="10" viewBox="0 0 78 10" fill="none" style={{ marginTop: '2px' }}>
                <path d="M4 6 Q 39 2, 74 5" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 9 Q 42 6, 64 8" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Right Butter Yellow Pill Sticker */}
            <span
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: '9999px',
                backgroundColor: '#FDE68A',
                color: '#78350F',
                border: '1.5px solid #18181B',
                boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transform: 'rotate(2deg)',
              }}
            >
              {isEn ? 'SWEAT THE DETAILS' : 'TỈ MỈ TỪNG DÒNG CODE'}
            </span>
          </motion.div>

          {/* Centerpiece: Coral-Bordered Pixel Nameplate Box */}
          <motion.div {...fadeUp(0.12)} style={{ margin: '4px 0 14px', position: 'relative' }}>
            <div className="pixel-nameplate-box">
              <span className="pixel-nameplate-text">TRUNG LÊ</span>
            </div>
          </motion.div>

          {/* Sticky Notes & Status Strip Below Nameplate (Mustard Left + Status Center + Mint Right) */}
          <motion.div
            {...fadeUp(0.18)}
            style={{
              width: '100%',
              maxWidth: '720px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '26px',
            }}
          >
            {/* Left Mustard Sticky Note + Arrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}>
              <span
                className="sticky-note-tag"
                style={{
                  backgroundColor: '#F5C242',
                  transform: 'rotate(-2.5deg)',
                }}
              >
                {isEn ? 'Software Architect & Lead' : 'Tech Lead & Kiến trúc sư'}
              </span>
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" className="hidden sm:block">
                <path d="M2 18 Q 12 12, 20 3 M20 3 L13 4 M20 3 L19 10" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Center Status Indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: '0 auto',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: '#2563EB',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)',
                }}
              />
              <span>
                {isEn
                  ? 'OPEN TO NEW WORK AND GOOD PROBLEMS'
                  : 'SẴN SÀNG CHO DỰ ÁN MỚI & BÀI TOÁN KHÓ'}
              </span>
            </div>

            {/* Right Mint Sticky Note + Arrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}>
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" className="hidden sm:block">
                <path d="M22 18 Q 12 12, 4 3 M4 3 L11 4 M4 3 L5 10" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="sticky-note-tag"
                style={{
                  backgroundColor: '#A7E8BD',
                  transform: 'rotate(2.2deg)',
                }}
              >
                Đà Nẵng, VN
              </span>
            </div>
          </motion.div>

          {/* Headline Row Flanked by Two Circular Portrait Photo Stickers */}
          <motion.div
            {...fadeUp(0.24)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '26px',
            }}
          >
            {/* Left Floating Circular Photo Sticker */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: -6 }}
              className="hidden md:block"
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '9999px',
                border: '3px solid #EA580C',
                boxShadow: '3px 3px 0px #18181B',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                transform: 'rotate(-4deg) translateY(-10px)',
              }}
            >
              <img
                src={NewAvatar}
                alt="Lê Trí Trung"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Bold 2-Line Geometric Value Statement with Inline Target & Flower Badges */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4.6vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.14,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                margin: '0 auto',
                maxWidth: '720px',
              }}
            >
              {isEn ? (
                <>
                  I engineer software that{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      borderRadius: '9999px',
                      backgroundColor: '#18A96B',
                      color: '#FFFFFF',
                      border: '2px solid #18181B',
                      verticalAlign: 'middle',
                      fontSize: '20px',
                      margin: '0 4px',
                      boxShadow: '2px 2px 0px #18181B',
                    }}
                  >
                    ◎
                  </span>
                  <br />
                  scales your business fast.{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EC4899',
                      verticalAlign: 'middle',
                      fontSize: '36px',
                      lineHeight: 1,
                    }}
                  >
                    ✿
                  </span>
                </>
              ) : (
                <>
                  Mình kiến tạo phần mềm{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '38px',
                      height: '38px',
                      borderRadius: '9999px',
                      backgroundColor: '#18A96B',
                      color: '#FFFFFF',
                      border: '2px solid #18181B',
                      verticalAlign: 'middle',
                      fontSize: '20px',
                      margin: '0 4px',
                      boxShadow: '2px 2px 0px #18181B',
                    }}
                  >
                    ◎
                  </span>
                  <br />
                  vận hành mượt & ra đơn thật.{' '}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EC4899',
                      verticalAlign: 'middle',
                      fontSize: '36px',
                      lineHeight: 1,
                    }}
                  >
                    ✿
                  </span>
                </>
              )}
            </h1>

            {/* Right Floating Circular Photo Sticker */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 6 }}
              className="hidden md:block"
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '9999px',
                border: '3px solid #EA580C',
                boxShadow: '3px 3px 0px #18181B',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                transform: 'rotate(5deg) translateY(8px)',
              }}
            >
              <img
                src={MALAYSIA_PHOTO}
                alt="Lê Trí Trung Activity"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>

          {/* Primary 3D Tactile Button Row (Robin "[+] CONTACT ME" + Services + CV) */}
          <motion.div
            {...fadeUp(0.3)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '28px',
            }}
          >
            <Link to="/contact" className="btn-robin-dark">
              <span className="plus-box">+</span>
              <span>{isEn ? 'CONTACT ME' : 'LIÊN HỆ TRỰC TIẾP'}</span>
            </Link>

            <Link
              to="/dich-vu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                backgroundColor: '#F5C242',
                color: '#18181B',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '5px',
                border: '1.5px solid #18181B',
                boxShadow: '0 3px 0 #18181B',
                textDecoration: 'none',
              }}
            >
              <FaRocket size={12} />
              <span>{isEn ? 'WEB SERVICES & PRICING' : 'BÁO GIÁ WEBSITE & SAAS'}</span>
            </Link>

            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 15px',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderRadius: '5px',
                border: '1.5px solid var(--color-border-strong)',
                boxShadow: '0 3px 0 #18181B',
                textDecoration: 'none',
              }}
            >
              <FaDownload size={11} />
              <span>{t('home.downloadCV')}</span>
            </a>
          </motion.div>

          {/* Quick Audience Ticket Stubs (Client / Recruiter / Engineer) */}
          <motion.div
            {...fadeUp(0.36)}
            style={{
              width: '100%',
              maxWidth: '860px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
              textAlign: 'left',
            }}
          >
            {[
              {
                to: '/dich-vu',
                tag: isEn ? 'FOR BUSINESS OWNERS' : 'CHỦ SHOP & DOANH NGHIỆP',
                title: isEn ? 'Turnkey Website & VietQR 0đ' : 'Làm Web Bán Hàng & Cọc VietQR',
                bg: '#FDE68A',
                icon: <FaStore size={13} />,
              },
              {
                to: '/achievements?tab=education&milestone=1',
                tag: isEn ? 'FOR RECRUITERS & HR' : 'NHÀ TUYỂN DỤNG & HR',
                title: isEn ? 'Technical BA & 42+ Certs' : 'Hồ Sơ Technical BA & 42+ Chứng Chỉ',
                bg: '#A7E8BD',
                icon: <FaUserCheck size={13} />,
              },
              {
                to: '/projects/14',
                tag: isEn ? 'FOR ENGINEERS' : 'KỸ SƯ & ĐỐI TÁC',
                title: isEn ? 'BrandHub Microservices & AI' : 'Kiến Trúc Microservices & AI',
                bg: '#DBEAFE',
                icon: <FaLaptopCode size={13} />,
              },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1.5px solid var(--color-border-strong)',
                  borderRadius: '6px',
                  boxShadow: '2px 2px 0px #18181B',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '2px 7px',
                    borderRadius: '3px',
                    backgroundColor: item.bg,
                    color: '#18181B',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}>
                    {item.icon} {item.tag}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>
                    {item.title}
                  </div>
                </div>
                <FaArrowRight size={11} style={{ flexShrink: 0 }} />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. HAND-DRAWN ARC DIVIDER + "WHAT'S UP / ABOUT ME" SCRAPBOOK
         ============================================================ */}
      <section style={{ paddingTop: '8px', paddingBottom: '68px', position: 'relative' }}>
        {/* Hand-sketched SVG Arc across the ruled notebook */}
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <svg
            viewBox="0 0 1200 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '36px', display: 'block', overflow: 'visible' }}
          >
            <path
              d="M10 36 Q 600 -10, 1190 30"
              stroke="var(--color-border-strong)"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-ink-soft)',
              display: 'inline-block',
              transform: 'rotate(-4deg)',
              marginLeft: '8%',
              marginTop: '-6px',
            }}
          >
            {isEn ? 'about me!' : 'về mình!'}
          </span>
        </div>

        {/* Centered Boxed "what's up" Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="notebook-boxed-label">
            {isEn ? "what's up" : 'câu chuyện của mình'}
          </span>
        </div>

        {/* 3-Column Scrapbook Spread: Left Polaroid + Center Handwritten Bio + Right Polaroid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '28px',
            alignItems: 'center',
            maxWidth: '1080px',
            margin: '0 auto 36px',
          }}
        >
          {/* Left Taped Polaroid Photo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="polaroid-frame"
              style={{
                width: '230px',
                transform: 'rotate(-2.5deg)',
              }}
            >
              <div className="washi-tape-tl" />
              <div className="washi-tape-tr" />
              <div style={{ width: '100%', aspectRatio: '4/4.3', overflow: 'hidden', backgroundColor: '#F3EFE6' }}>
                <img
                  src={NewAvatar}
                  alt="Lê Trí Trung Portrait"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="polaroid-caption">2026 • Đà Nẵng</div>
            </div>
          </div>

          {/* Center Handwritten Notebook Bio Paragraph + Stamp Tags */}
          <div style={{ textAlign: 'center', padding: '0 8px' }}>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: 'clamp(22px, 2.5vw, 27px)',
                fontWeight: 600,
                lineHeight: 1.48,
                color: 'var(--color-ink)',
                margin: '0 0 24px 0',
              }}
            >
              {isEn ? (
                <>
                  I'm a Tech Lead & Technical BA running a 5-engineer studio in Da Nang. I love turning messy business workflows into clear specs and fast software. ✨ I care about sub-8ms database queries, edge cases everyone forgets, and shipping products that bring in real revenue. 🎨
                </>
              ) : (
                <>
                  Mình là Tech Lead & Technical BA dẫn dắt đội ngũ 5 anh em kỹ sư FPT tại Đà Nẵng. Mình thích việc gỡ rối những quy trình nghiệp vụ phức tạp thành hệ thống gọn gàng, dễ dùng. ✨ Mình chăm chút từng truy vấn dưới 8ms, xử lý kỹ các tình huống biên (edge-case) và bàn giao những sản phẩm thực sự mang lại doanh thu. 🎨
                </>
              )}
            </p>

            {/* Perforated Postage-Stamp / Ticket-Stub Skill Badges (2x2 Grid like Robin) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              {STAMP_SKILLS.map((st, idx) => (
                <div
                  key={idx}
                  className="postage-stamp-tag"
                  style={{
                    backgroundColor: st.bg,
                    color: st.color,
                  }}
                >
                  <span className="postage-stamp-label">
                    {isEn ? st.labelEn : st.labelVi}
                  </span>
                  <span className="postage-stamp-stub" aria-hidden="true">
                    {st.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Taped Polaroid Photo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="polaroid-frame"
              style={{
                width: '230px',
                transform: 'rotate(2.2deg)',
              }}
            >
              <div className="washi-tape-tl" />
              <div className="washi-tape-tr" />
              <div style={{ width: '100%', aspectRatio: '4/4.3', overflow: 'hidden', backgroundColor: '#F3EFE6' }}>
                <img
                  src={FPT_PHOTO}
                  alt="FPT University & Team Workspace"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="polaroid-caption">
                {isEn ? 'my workspace & team' : 'đội ngũ & giảng đường'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. STACKED MANILLA FILE-FOLDER PROJECTS SHOWCASE (ROBIN SIGNATURE)
         ============================================================ */}
      <section style={{ paddingBottom: '68px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Folder Top Tabs Row (• PROJECT 01 | • PROJECT 02 | • PROJECT 03 | • PROJECT 04) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '4px',
              flexWrap: 'wrap',
              paddingLeft: '4px',
            }}
          >
            {FLAGSHIP_FOLDERS.map((folder, idx) => {
              const isSelected = idx === activeFolderIndex;
              return (
                <button
                  key={folder.num}
                  onClick={() => setActiveFolderIndex(idx)}
                  className="folder-tab-trigger"
                  style={{
                    backgroundColor: isSelected ? '#2563EB' : '#18181B',
                    color: '#FFFFFF',
                    height: isSelected ? '42px' : '38px',
                    zIndex: isSelected ? 5 : 2,
                  }}
                >
                  <span style={{ opacity: 0.8 }}>•</span>
                  <span>PROJECT {folder.num}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Dark Charcoal Folder Body */}
          <motion.div
            key={activeFolder.id}
            initial={{ opacity: 0.9, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              backgroundColor: '#18181B',
              color: '#FFFFFF',
              borderRadius: '0 10px 0 0',
              border: '2px solid #18181B',
              padding: 'clamp(28px, 4vw, 48px) clamp(20px, 4vw, 44px) clamp(56px, 6vw, 76px)',
              position: 'relative',
              zIndex: 3,
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.22)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Date, Title, Description, KPIs, View Project Link */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#D4D4D8',
                    marginBottom: '12px',
                  }}
                >
                  • {activeFolder.date}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(30px, 4.2vw, 46px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {activeFolder.title}
                </h2>

                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#A1A1AA',
                    margin: '0 0 20px 0',
                    maxWidth: '440px',
                  }}
                >
                  {isEn ? activeFolder.subtitleEn : activeFolder.subtitleVi}
                </p>

                {/* Mini Metric Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {activeFolder.metrics.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#F5C242',
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/projects/${activeFolder.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      paddingBottom: '4px',
                      borderBottom: '2px solid #FFFFFF',
                    }}
                  >
                    <span>{isEn ? 'VIEW PROJECT' : 'XEM CHI TIẾT DỰ ÁN'}</span>
                    <span>↗</span>
                  </Link>

                  {activeFolder.liveUrl && (
                    <a
                      href={activeFolder.liveUrl}
                      target={activeFolder.liveUrl.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#F5C242',
                        textDecoration: 'none',
                      }}
                    >
                      <span>{isEn ? 'LIVE DEMO' : 'TRẢI NGHIỆM THẬT'}</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: White-Framed Project Screenshot Taped with Translucent Masking Tape */}
              <div style={{ position: 'relative', padding: '6px' }}>
                <div
                  style={{
                    backgroundColor: '#1F2937',
                    border: '3px solid #FFFFFF',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 14px 30px rgba(0, 0, 0, 0.45)',
                  }}
                >
                  <div className="washi-tape-grey-tl" />
                  <div className="washi-tape-grey-tr" />
                  <img
                    src={activeFolder.shot1}
                    alt={activeFolder.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '270px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overlapping Second Mustard Yellow Folder Underneath (Robin "• PROJECT 03 / Forge" style) */}
          <div style={{ position: 'relative', marginTop: '-34px', zIndex: 4 }}>
            {/* Centered Mustard Folder Tab */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="folder-tab-trigger folder-tab-center"
                style={{
                  backgroundColor: '#F5C242',
                  color: '#18181B',
                  height: '38px',
                }}
              >
                <span>•</span>
                <span>{isEn ? 'FEATURED SAAS • THE MC HUB' : 'DỰ ÁN TIÊU BIỂU • THE MC HUB'}</span>
              </div>
            </div>

            {/* Mustard Folder Body */}
            <div
              style={{
                backgroundColor: '#F5C242',
                color: '#18181B',
                borderRadius: '8px',
                border: '2px solid #18181B',
                padding: 'clamp(28px, 4vw, 44px)',
                boxShadow: '0 14px 34px rgba(24, 24, 27, 0.18)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                  gap: '32px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#18181B',
                      marginBottom: '10px',
                    }}
                  >
                    • {secondaryFolder.date}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(28px, 3.8vw, 42px)',
                      fontWeight: 800,
                      color: '#18181B',
                      margin: '0 0 12px 0',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {secondaryFolder.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#27272A',
                      margin: '0 0 22px 0',
                      maxWidth: '440px',
                    }}
                  >
                    {isEn ? secondaryFolder.subtitleEn : secondaryFolder.subtitleVi}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <Link
                      to={`/projects/${secondaryFolder.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#18181B',
                        textDecoration: 'none',
                        paddingBottom: '4px',
                        borderBottom: '2px solid #18181B',
                      }}
                    >
                      <span>{isEn ? 'VIEW PROJECT' : 'XEM CHI TIẾT DỰ ÁN'}</span>
                      <span>↗</span>
                    </Link>

                    <Link
                      to="/projects"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '4px',
                        backgroundColor: '#18181B',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <span>{isEn ? 'ALL 25+ PROJECTS →' : 'XEM TẤT CẢ 25+ DỰ ÁN →'}</span>
                    </Link>
                  </div>
                </div>

                {/* Taped Screenshot on Mustard Folder */}
                <div style={{ position: 'relative', padding: '6px' }}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '3px solid #FFFFFF',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 12px 26px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div className="washi-tape-grey-tl" />
                    <div className="washi-tape-grey-tr" />
                    <img
                      src={secondaryFolder.shot1}
                      alt={secondaryFolder.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. TECH MARQUEE TAPE STRIP
         ============================================================ */}
      <div
        className="marquee-strip"
        style={{
          width: '100%',
          backgroundColor: '#18181B',
          border: '2px solid #18181B',
          borderRadius: '6px',
          color: '#FFFFFF',
          height: '42px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '60px',
          boxShadow: '4px 4px 0px #F5C242',
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '32px',
            width: 'max-content',
            whiteSpace: 'nowrap',
            animation: 'marqueeContinuous 26s linear infinite',
          }}
        >
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}
            >
              <span style={{ color: '#F5C242' }}>★</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================
          5. VERIFIED NUMBERS — POSTAGE STAMP COUNTER CARDS
         ============================================================ */}
      <section style={{ paddingBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
          <span className="notebook-boxed-label">
            ★ {t('home.statsByNumbers')}
          </span>
          <span style={{ fontFamily: 'var(--font-hand)', fontSize: '20px', fontWeight: 700, color: 'var(--color-ink-soft)' }}>
            {isEn ? 'click any stamp to inspect proof ↗' : 'bấm vào từng tem để xem minh chứng ↗'}
          </span>
        </div>

        <div
          className="stats-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
        >
          {[
            { value: 25, suffix: '+', labelKey: 'home.stats.0.label', link: '/projects', hintVi: 'Xem Dự Án', hintEn: 'View Projects', bg: '#F5C242', text: '#18181B' },
            { value: 42, suffix: '+', labelKey: 'home.stats.1.label', link: '/achievements#certificates', hintVi: 'Xem Chứng Chỉ', hintEn: 'View Certificates', bg: '#A7E8BD', text: '#18181B' },
            { value: 9,  suffix: '+', labelKey: 'home.stats.2.label', link: '/achievements#prizes', hintVi: 'Xem Giải Thưởng', hintEn: 'View Prizes', bg: '#FCE7F3', text: '#18181B' },
            { value: 370, suffix: '+', labelKey: 'home.stats.3.label', link: '/blog/technical-ba-karl-wiegers-zero-manage-rule-visual-paradigm-automation', hintVi: 'Xem Hồ Sơ BA', hintEn: 'View BA SRS', bg: '#DBEAFE', text: '#18181B' },
          ].map((stat, i) => {
            const handleStatClick = (e) => {
              if (stat.isScroll) {
                e.preventDefault();
                document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            };
            return (
              <Link
                key={i}
                to={stat.link}
                onClick={handleStatClick}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: stat.text,
                  padding: '20px',
                  borderRadius: '6px',
                  backgroundColor: stat.bg,
                  border: '2px solid #18181B',
                  boxShadow: '4px 4px 0px #18181B',
                  transition: 'transform 0.18s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px) rotate(-0.8deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(34px, 4vw, 48px)', fontWeight: 700, lineHeight: 1 }}>
                    <CountUp to={stat.value} from={0} duration={1.8} delay={i * 0.08} suffix={stat.suffix} />
                  </div>
                  <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {isEn ? stat.hintEn : stat.hintVi} ↗
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '10px', lineHeight: 1.35 }}>
                  {t(stat.labelKey)}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <GitHubStats />

      {/* ============================================================
          6. ENGINEERING SKILLS & TECH STACK NOTEBOOK DOSSIER
         ============================================================ */}
      <section id="skills-section" style={{ paddingBottom: '64px', scrollMarginTop: '90px' }}>
        <div
          className="notebook-card"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            padding: 'clamp(24px, 3.5vw, 36px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <span className="sticky-note-tag" style={{ backgroundColor: '#A7E8BD', transform: 'rotate(-1.5deg)', marginBottom: '8px' }}>
                {t('home.skillsLabel')}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800,
                lineHeight: 1.15, letterSpacing: '-0.02em',
                color: 'var(--color-ink)', margin: '6px 0 0 0',
              }}>
                {t('home.skillsTitle')}
              </h2>
            </div>
          </div>

          <div
            className="skills-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
          >
            {skills.map((category, ci) => (
              <div
                key={ci}
                style={{
                  backgroundColor: 'var(--color-canvas)',
                  borderRadius: '6px',
                  padding: '20px',
                  border: '1.5px solid var(--color-border-strong)',
                  boxShadow: '3px 3px 0px #18181B',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1.5px dashed var(--color-hairline)' }}>
                  <span style={{ fontSize: '18px' }}>{category.icon}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-ink)', margin: 0 }}>{category.category}</h3>
                </div>
                {category.items.map((skill, si) => (
                  <SkillBar key={si} skill={skill} />
                ))}
              </div>
            ))}
          </div>

          {/* Perforated Tech Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
            {allSkillsData.map((tech, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '5px 11px', borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px', fontWeight: 600, color: 'var(--color-ink)',
                  backgroundColor: 'var(--color-surface-soft)',
                  border: '1.5px solid var(--color-border-strong)',
                  boxShadow: '1.5px 1.5px 0px #18181B',
                }}
              >
                <TechIcon tech={tech.name} size={13} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ============================================================
          7. EXPLORE 6 NOTEBOOK DOSSIERS (BENTO GRID)
         ============================================================ */}
      <section style={{ paddingBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              ❖ {t('home.exploreLabel')}
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800,
              lineHeight: 1.15, letterSpacing: '-0.02em',
              color: 'var(--color-ink)', margin: '8px 0 0 0',
            }}>{t('home.exploreTitle')}</h2>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--color-ink-soft)' }}>
            {isEn ? '6 NOTEBOOK SECTIONS' : '6 HỒ SƠ CHUYÊN BIỆT'}
          </span>
        </div>

        <div
          className="explore-bento-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}
        >
          {[
            {
              title: isEn ? "Web Services & Pricing" : "Dịch Vụ & Báo Giá Website",
              badge: isEn ? "HOT • 5-ENGINEER TEAM" : "HOT • ĐỘI 5 KỸ SƯ",
              badgeBg: "#F5C242",
              desc: isEn
                ? "Transparent 3-tier pricing, 5-step delivery process, live Biensovip.com case study, and lean SaaS automation."
                : "Báo giá minh bạch 3 gói, quy trình 5 bước, dự án thực tế Biensovip.com và giải pháp tự động hóa SaaS.",
              icon: <FaRocket />,
              path: "/dich-vu",
              cta: isEn ? "View Pricing & SLAs" : "Xem Báo Giá & Quy Trình"
            },
            {
              title: isEn ? "Production Projects" : "Dự Án Thực Chiến",
              badge: isEn ? "25+ DELIVERABLES" : "25+ SẢN PHẨM",
              badgeBg: "#A7E8BD",
              desc: isEn
                ? "Real deliverables including Biensovip.com (1.1M+ VPA records), BrandHub (7 Microservices), and 12 TikTok Live 3D Games."
                : "Khám phá hơn 25 sản phẩm thực tế: Biensovip.com (1,1M+ bản ghi VPA), BrandHub (7 Microservices), 12 Game TikTok Live 3D...",
              icon: <FaLaptopCode />,
              path: "/projects",
              cta: isEn ? "Explore Projects" : "Khám Phá Dự Án"
            },
            {
              title: isEn ? "Achievements & Credentials" : "Hồ Sơ & Thành Tích",
              badge: isEn ? "42+ CERTIFICATES" : "42+ CHỨNG CHỈ & GIẢI",
              badgeBg: "#FDE68A",
              desc: isEn
                ? "Hackathon CV 2026 Champion, ICTA 2026 Co-Author, FPT Software OJT, IELTS 6.0, and 42+ international credentials."
                : "Quán quân Hackathon CV 2026, đồng tác giả ICTA 2026, thực tập FPT Software, IELTS 6.0 và hơn 42 chứng chỉ quốc tế.",
              icon: <FaGraduationCap />,
              path: "/achievements",
              cta: isEn ? "View Achievements" : "Xem Thành Tích"
            },
            {
              title: isEn ? "About & Philosophy" : "Giới Thiệu & Triết Lý",
              badge: isEn ? "TECH LEAD" : "TECH LEAD FPT",
              badgeBg: "#FCE7F3",
              desc: isEn
                ? "Journey from FPT Software to Tech Lead: Direct 1-on-1 collaboration, zero middlemen, guaranteed quality."
                : "Hành trình từ FPT Software đến Tech Lead: Làm việc trực tiếp 1-1 không qua trung gian.",
              icon: <FaUser />,
              path: "/about",
              cta: isEn ? "Read Story" : "Xem Hành Trình"
            },
            {
              title: isEn ? "Technical Blog" : "Blog Kỹ Thuật Chuyên Sâu",
              badge: isEn ? "ARCHITECTURE" : "KIẾN TRÚC HỆ THỐNG",
              badgeBg: "#DBEAFE",
              desc: isEn
                ? "In-depth case studies: Sub-8ms PostgreSQL queries, RabbitMQ DLQ retry resilience architecture."
                : "Bài viết chuyên sâu: Tối ưu CSDL PostgreSQL dưới 8ms, kiến trúc hàng đợi RabbitMQ DLQ...",
              icon: <FaNewspaper />,
              path: "/blog",
              cta: isEn ? "Read Articles" : "Đọc Bài Viết"
            },
            {
              title: isEn ? "Contact & Consultation" : "Liên Hệ & Tư Vấn Kỹ Thuật",
              badge: isEn ? "24/7 DIRECT" : "HỖ TRỢ TRỰC TIẾP",
              badgeBg: "#A7E8BD",
              desc: isEn
                ? "Connect directly via Zalo/Hotline +84 912158715 or submit a free project quotation inquiry."
                : "Kết nối trực tiếp qua Zalo/Hotline +84 912158715 hoặc gửi form yêu cầu tư vấn báo giá miễn phí.",
              icon: <FaEnvelope />,
              path: "/contact",
              cta: isEn ? "Get In Touch" : "Liên Hệ Ngay"
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="notebook-card"
              style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', minHeight: '190px', padding: '22px',
                textDecoration: 'none', color: 'var(--color-ink)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '6px',
                    backgroundColor: item.badgeBg, color: '#18181B',
                    border: '1.5px solid #18181B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: '#18181B',
                    backgroundColor: item.badgeBg,
                    border: '1px solid #18181B',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.05em',
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '17px', fontWeight: 800,
                  color: 'var(--color-ink)', margin: '0 0 6px 0',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13.5px', fontWeight: 400,
                  color: 'var(--color-ink-soft)',
                  margin: '0 0 16px 0', lineHeight: 1.5,
                }}>{item.desc}</p>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                paddingTop: '10px',
                borderTop: '1.5px dashed var(--color-hairline)',
              }}>
                <span>{item.cta}</span>
                <FaArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          8. BOTTOM CONTACT CTA — CHARCOAL FOLDER BLOCK
         ============================================================ */}
      <section style={{ paddingBottom: '48px' }}>
        <div
          className="cta-navy"
          style={{
            backgroundColor: '#18181B',
            border: '2px solid #18181B',
            borderRadius: '8px',
            padding: '44px 40px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            gap: '28px', flexWrap: 'wrap',
            boxShadow: '6px 6px 0px #F5C242',
          }}
        >
          <div>
            <span
              className="sticky-note-tag"
              style={{
                backgroundColor: '#F5C242',
                transform: 'rotate(-1.5deg)',
                marginBottom: '12px',
              }}
            >
              ★ {t('home.ctaLabel')}
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(22px, 3.4vw, 38px)', fontWeight: 800,
              lineHeight: 1.15, letterSpacing: '-0.02em',
              color: '#FFFFFF', margin: '8px 0 0 0',
            }}>
              {t('home.ctaTitle')}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 22px', borderRadius: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px', fontWeight: 700,
                textTransform: 'uppercase',
                color: '#18181B', backgroundColor: '#F5C242',
                border: '1.5px solid #18181B',
                boxShadow: '3px 3px 0px #FFFFFF',
                textDecoration: 'none',
              }}
            >
              {t('home.getInTouch')} <FaArrowRight size={12} />
            </Link>

            <Link
              to="/dich-vu#pricing-section"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 20px', borderRadius: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px', fontWeight: 700,
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: '#2563EB',
                border: '1.5px solid #FFFFFF',
                textDecoration: 'none',
              }}
            >
              <FaRocket size={12} />
              <span>{isEn ? "View 3 Service Packages" : "Xem Báo Giá 3 Gói Dịch Vụ"}</span>
            </Link>

            <a
              href={personalInfo.contact?.github || 'https://github.com/trung2605'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 18px', borderRadius: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px', fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.35)',
                textDecoration: 'none',
              }}
            >
              <FaGithub size={14} /> GITHUB
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
