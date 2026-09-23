import { useRef, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaArrowRight,
  FaRocket, FaLaptopCode, FaGraduationCap, FaUser, FaNewspaper, FaEnvelope,
  FaBolt, FaStore, FaUserCheck
} from "react-icons/fa";
import { personalInfo, allSkillsData } from "../../data";
import TechIcon from "../../common/TechIcon";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
import { useCustomTheme } from "../../contexts/ThemeContext";
import BlurText from "../../animations/BlurText";
import CountUp from "../../animations/CountUp";
import RotatingText from "../../animations/RotatingText";
import DecryptedText from "../../animations/DecryptedText";
import Aurora from "../../animations/Aurora";
import useMagnetic from "../../hooks/useMagnetic";
import GitHubStats from "./GitHubStats";
import Testimonials from "./Testimonials";

const MotionLink = motion(Link);

const TECH_MARQUEE = [
  "Java Spring Boot", "PostgreSQL", "React", "Docker", "REST APIs",
  "Node.js", "Redis", "TypeScript", "SQL Server", "Git & GitHub",
  "Tailwind CSS", "Spring Security", "Next.js", "MongoDB", "Clean Architecture"
];

const SkillBar = ({ skill }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontSize: '15px', fontWeight: '400', color: '#000000' }}>{skill.name}</span>
      <span style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', color: '#666666' }}>{skill.level}%</span>
    </div>
    <div style={{ width: '100%', height: '3px', backgroundColor: '#e6e6e6', borderRadius: '2px' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        style={{ height: '3px', backgroundColor: '#000000', borderRadius: '2px' }}
      />
    </div>
  </div>
);

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t, i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');
  const { isDarkMode } = useCustomTheme();
  const { skills } = useTranslatedData();

  const heroRoles = useMemo(() => {
    const raw = t('home.roles', { returnObjects: true });
    if (Array.isArray(raw) && raw.length > 0) return raw;
    return ['Java Developer', 'Backend Engineer', 'Sinh viên CNTT', 'Problem Solver'];
  }, [t]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroSpring = { stiffness: 60, damping: 18, mass: 0.6 };

  const badgeY   = useSpring(useTransform(heroScroll, [0, 1], [0, -60]),  heroSpring);
  const badgeOp  = useSpring(useTransform(heroScroll, [0, 0.5], [1, 0]),  heroSpring);
  const h1Y      = useSpring(useTransform(heroScroll, [0, 1], [0, -40]),  heroSpring);
  const h1Op     = useSpring(useTransform(heroScroll, [0, 0.6], [1, 0]),  heroSpring);
  const roleY    = useSpring(useTransform(heroScroll, [0, 1], [0, -25]),  heroSpring);
  const descY    = useSpring(useTransform(heroScroll, [0, 1], [0, -15]),  heroSpring);
  const ctaY     = useSpring(useTransform(heroScroll, [0, 1], [0, -8]),   heroSpring);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: prefersReducedMotion ? 0 : delay, duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] },
  });

  // Magnetic pull on the primary CTA
  const magnetic = useMagnetic({ strength: 0.3 });

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} style={{ paddingTop: '64px', paddingBottom: '88px', position: 'relative', overflow: 'hidden' }}>
        {/* Soft Ambient Light Diffusers - Centered Spotlights */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '680px',
            height: '420px',
            borderRadius: '50%',
            background: isDarkMode
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.08) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.05) 45%, transparent 70%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {!prefersReducedMotion && (
          <Aurora
            colorStops={['#dceeb1', '#c5b0f4', '#f4ecd6']}
            amplitude={0.6}
            blend={0.4}
            speed={0.35}
            className="hero-aurora"
          />
        )}

        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '26px',
            position: 'relative',
            zIndex: 1,
            padding: '16px 16px 8px',
          }}
        >
          {/* Status Badge */}
          <motion.div style={{ y: badgeY, opacity: badgeOp }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '7px 18px',
                borderRadius: '9999px',
                backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
                border: isDarkMode ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(34, 197, 94, 0.24)',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: isDarkMode ? '#4ade80' : '#15803d',
                boxShadow: isDarkMode ? '0 0 24px rgba(34, 197, 94, 0.14)' : '0 2px 10px rgba(34, 197, 94, 0.08)',
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: '#22c55e',
                    opacity: 0.75,
                    animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                  }}
                />
              </span>
              {t('home.badge')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
              fontSize: 'clamp(44px, 7.5vw, 92px)',
              fontWeight: '400',
              lineHeight: '1.05',
              letterSpacing: '-2px',
              color: 'var(--color-ink)',
              margin: 0,
              y: h1Y,
              opacity: h1Op,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <BlurText
              text={t('home.greeting')}
              delay={50}
              animateBy="words"
              direction="top"
              className="block opacity-90"
            />
            <span
              style={{
                display: 'block',
                marginTop: '4px',
                background: isDarkMode
                  ? 'linear-gradient(180deg, #ffffff 30%, #a1a1aa 100%)'
                  : 'linear-gradient(180deg, #18181b 30%, #52525b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <DecryptedText
                text="Lê Trí Trung"
                speed={80}
                maxIterations={12}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
              />
            </span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              fontSize: 'clamp(17px, 3.2vw, 24px)',
              fontWeight: '400',
              color: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              y: roleY,
            }}
          >
            <span style={{ color: 'var(--color-ink-soft)', fontWeight: '350' }}>{t('home.iAm')}</span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '6px 18px',
                boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <RotatingText
                texts={heroRoles}
                mainClassName="font-semibold"
                rotationInterval={2600}
                staggerDuration={0.025}
                staggerFrom="last"
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                style={{ color: 'var(--color-ink)', fontSize: '1em' }}
              />
            </div>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 'clamp(16px, 2.3vw, 20px)',
              fontWeight: '340',
              lineHeight: '1.65',
              letterSpacing: '-0.15px',
              color: 'var(--color-ink-soft)',
              maxWidth: '640px',
              margin: '0 auto',
              y: descY,
            }}
          >
            {t('home.heroDesc')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              y: ctaY,
              paddingTop: '6px',
            }}
          >
            {/* Primary CTA: Web Services & Pricing */}
            <MotionLink
              ref={magnetic.ref}
              to="/dich-vu"
              className="hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--color-canvas)',
                backgroundColor: 'var(--color-ink)',
                textDecoration: 'none',
                boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 18px rgba(0,0,0,0.18)',
                transition: 'all 0.2s ease',
                x: magnetic.x,
                y: magnetic.y,
              }}
              onMouseMove={magnetic.handleMouseMove}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.92';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
                magnetic.handleMouseLeave();
              }}
            >
              <FaRocket size={14} color="#10b981" />
              <span>{isEn ? "Web Services & Pricing" : "Dịch Vụ & Báo Giá Website"}</span>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                padding: '2px 6px',
                borderRadius: '9999px',
                letterSpacing: '0.4px',
                marginLeft: '2px'
              }}>HOT</span>
            </MotionLink>

            {/* Secondary CTA: Projects */}
            <Link
              to="/projects"
              className="hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 24px',
                borderRadius: '9999px',
                fontSize: '15px',
                fontWeight: '550',
                color: 'var(--color-ink)',
                backgroundColor: 'var(--color-surface-soft)',
                border: '1px solid var(--color-hairline)',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--color-ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-hairline)';
              }}
            >
              <FaLaptopCode size={14} />
              <span>{isEn ? "11+ Projects" : "11+ Dự Án"}</span>
              <FaArrowRight size={11} />
            </Link>

            {/* Tertiary CTA: Download CV */}
            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              className="hover-surface hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '13px 22px',
                borderRadius: '9999px',
                fontSize: '14.5px',
                fontWeight: '500',
                color: 'var(--color-ink-soft)',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-hairline)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = 'var(--color-ink-soft)';
              }}
            >
              <FaDownload size={12} /> {t('home.downloadCV')}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fadeUp(0.5)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              paddingTop: '4px',
              y: ctaY,
            }}
          >
            {[
              { href: personalInfo.contact?.github, icon: <FaGithub size={18} />, label: "GitHub" },
              { href: personalInfo.contact?.linkedin, icon: <FaLinkedin size={18} />, label: "LinkedIn" },
              { href: personalInfo.contact?.instagram, icon: <FaInstagram size={18} />, label: "Instagram" },
              { href: personalInfo.contact?.facebook, icon: <FaFacebook size={18} />, label: "Facebook" },
            ].filter(s => s.href).map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                className="hover-surface"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface-soft)',
                  border: '1px solid var(--color-hairline)',
                  color: 'var(--color-ink)',
                  transition: 'background-color 0.15s ease, border-color 0.15s ease',
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* QUICK INTENT AUDIENCE PATHWAYS ("BẠN ĐANG TÌM KIẾM MỤC TIÊU NÀO?") */}
          <motion.div
            {...fadeUp(0.55)}
            style={{
              width: '100%',
              maxWidth: '840px',
              marginTop: '12px',
              paddingTop: '20px',
              borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <div style={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: 'var(--color-ink-soft)',
              marginBottom: '14px',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {isEn ? "QUICK NAVIGATION BY YOUR NEED" : "BẠN ĐANG TÌM KIẾM MỤC TIÊU NÀO?"}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
              textAlign: 'left'
            }}>
              {/* Option 1: Shop owner / Client */}
              <Link
                to="/dich-vu"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', fontWeight: '600', color: '#10b981' }}>
                    <FaStore size={13} />
                    {isEn ? "Client / Business" : "Chủ Shop & Doanh Nghiệp"}
                  </span>
                  <FaArrowRight size={10} color="var(--color-ink-soft)" />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-ink-soft)', lineHeight: '1.45' }}>
                  {isEn ? "Build custom websites, VietQR deposit & lean SaaS engines" : "Lập trình website kinh doanh, cọc VietQR 0đ & SaaS tự động"}
                </div>
              </Link>

              {/* Option 2: Recruiter / HR */}
              <Link
                to="/achievements?tab=education&milestone=1"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#8b5cf6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(139, 92, 246, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', fontWeight: '600', color: '#8b5cf6' }}>
                    <FaUserCheck size={13} />
                    {isEn ? "Recruiter / Hiring Lead" : "Nhà Tuyển Dụng & HR"}
                  </span>
                  <FaArrowRight size={10} color="var(--color-ink-soft)" />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-ink-soft)', lineHeight: '1.45' }}>
                  {isEn ? "Review Tech Lead dossier, FPT degree & 18 credentials" : "Đánh giá hồ sơ năng lực Tech Lead, bằng FPT & 18 chứng chỉ"}
                </div>
              </Link>

              {/* Option 3: Engineer / Developer */}
              <Link
                to="/projects/14"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(59, 130, 246, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13.5px', fontWeight: '600', color: '#3b82f6' }}>
                    <FaLaptopCode size={13} />
                    {isEn ? "Engineer / Developer" : "Kỹ Sư & Đối Tác"}
                  </span>
                  <FaArrowRight size={10} color="var(--color-ink-soft)" />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-ink-soft)', lineHeight: '1.45' }}>
                  {isEn ? "Explore BrandHub Capstone, RabbitMQ DLQ & Microservices" : "Khám phá đồ án BrandHub Microservices, RabbitMQ DLQ & AI"}
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP (SEAMLESS INFINITE LOOP) ── */}
      <div className="marquee-strip" style={{
        width: '100%',
        backgroundColor: isDarkMode ? '#12141c' : '#0f172a',
        border: '1px solid var(--color-hairline)',
        borderRadius: '50px',
        color: '#ffffff',
        height: '44px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '64px',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.06)',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
      }}>
        <div className="marquee-track" style={{
          display: 'flex',
          gap: '36px',
          width: 'max-content',
          whiteSpace: 'nowrap',
          animation: 'marqueeContinuous 26s linear infinite',
          willChange: 'transform',
        }}>
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '9px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12.5px',
              letterSpacing: '0.4px',
              color: 'rgba(255, 255, 255, 0.85)',
              userSelect: 'none',
            }}>
              <span style={{ 
                width: '5px', 
                height: '5px', 
                borderRadius: '50%', 
                backgroundColor: '#22c55e', 
                boxShadow: '0 0 6px rgba(34, 197, 94, 0.7)',
                display: 'inline-block', 
                flexShrink: 0 
              }} />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS — LIME BLOCK (CLICKABLE INTERACTIVE CARDS) ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 36px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
              letterSpacing: '0.60px', textTransform: 'uppercase',
              color: '#333333', margin: 0, fontWeight: 600,
            }}>{t('home.statsByNumbers')}</p>
            <span style={{ fontSize: '12px', color: '#4b5563', fontFamily: 'JetBrains Mono, monospace' }}>
              {isEn ? "Click metric to explore proof" : "Bấm vào từng chỉ số để xem minh chứng"}
            </span>
          </div>

          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
          >
            {[
              { value: 11, suffix: '+', labelKey: 'home.stats.0.label', link: '/projects', hintVi: 'Xem Dự Án', hintEn: 'View Projects' },
              { value: 27, suffix: '+', labelKey: 'home.stats.1.label', link: '#skills-section', isScroll: true, hintVi: 'Xem Kỹ Năng', hintEn: 'View Skills' },
              { value: 7,  suffix: '+', labelKey: 'home.stats.2.label', link: '/achievements?tab=prizes', hintVi: 'Xem Giải Thưởng', hintEn: 'View Prizes' },
              { value: 18, suffix: '+', labelKey: 'home.stats.3.label', link: '/achievements?tab=certificates', hintVi: 'Xem Chứng Chỉ', hintEn: 'View Certificates' },
            ].map((stat, i) => {
              const handleStatClick = (e) => {
                if (stat.isScroll) {
                  e.preventDefault();
                  document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              };
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.6, y: 12 }} 
                  whileInView={{ opacity: 1, scale: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={stat.link}
                    onClick={handleStatClick}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      color: '#000000',
                      padding: '16px 18px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.09)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 'clamp(30px, 3.8vw, 50px)', fontWeight: '400', lineHeight: '1.0', letterSpacing: '-1px', color: '#000000' }}>
                        <CountUp to={stat.value} from={0} duration={2} delay={i * 0.1} suffix={stat.suffix} />
                      </div>
                      <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#166534', fontWeight: 600 }}>
                        {isEn ? stat.hintEn : stat.hintVi} ↗
                      </span>
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: '500', color: '#262626', marginTop: '8px', lineHeight: 1.35 }}>{t(stat.labelKey)}</div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <GitHubStats />

      {/* ── SKILLS — LILAC BLOCK ── */}
      <section id="skills-section" style={{ paddingBottom: '72px', scrollMarginTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#c5b0f4', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#444444', marginBottom: '12px',
          }}>{t('home.skillsLabel')}</p>
          <h2 style={{
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
            fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: '340',
            lineHeight: '1.10', letterSpacing: '-0.72px',
            color: '#000000', marginBottom: '40px',
          }}>
            <BlurText text={t('home.skillsTitle')} delay={40} animateBy="words" direction="bottom" className="inline" />
          </h2>

          <div
            className="skills-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
          >
            {skills.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 28, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: '16px', padding: '24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <span style={{ fontSize: '20px' }}>{category.icon}</span>
                  <h3 style={{ fontSize: '17px', fontWeight: '540', color: '#000000', margin: 0 }}>{category.category}</h3>
                </div>
                {category.items.map((skill, si) => (
                  <motion.div key={si} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 + si * 0.07, duration: 0.4 }}>
                    <SkillBar skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '28px' }}>
            {allSkillsData.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.75, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '5px 12px', borderRadius: '50px',
                  fontSize: '13px', fontWeight: '400', color: '#000000',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'default', transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)'}
              >
                <TechIcon tech={tech.name} size={13} />
                {tech.name}
              </motion.span>
            ))}
          </div>

          {/* Action strip to guide users to production projects */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '13.5px', color: '#2e1065', fontWeight: '550' }}>
              {isEn ? "Want to see how these engineering skills translate to production?" : "Bạn muốn xem các công nghệ này được áp dụng vào sản phẩm thực tế như thế nào?"}
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link
                to="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <FaLaptopCode size={12} />
                <span>{isEn ? "Explore 11+ Projects" : "Xem 11+ Dự Án Thực Chiến"}</span>
                <FaArrowRight size={10} />
              </Link>
              <Link
                to="/projects/14"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
              >
                <FaBolt size={11} color="#6d28d9" />
                <span>{isEn ? "BrandHub Microservices" : "Đồ Án BrandHub"}</span>
                <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Testimonials />

      {/* ── EXPLORE — CREAM BLOCK (FULL 6-DESTINATION BENTO GRID) ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#f4ecd6', borderRadius: '24px', padding: '40px 36px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                letterSpacing: '0.60px', textTransform: 'uppercase',
                color: '#666666', marginBottom: '8px',
              }}>{t('home.exploreLabel')}</p>
              <h2 style={{
                fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: '400',
                lineHeight: '1.10', letterSpacing: '-0.72px',
                color: '#000000', margin: 0,
              }}>{t('home.exploreTitle')}</h2>
            </div>
            <span style={{ fontSize: '12.5px', color: '#666666', fontFamily: 'JetBrains Mono, monospace' }}>
              {isEn ? "6 Core Sections" : "6 Phân Khu Chuyên Biệt"}
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
                badgeColor: "#10b981",
                badgeBg: "rgba(16, 185, 129, 0.12)",
                desc: isEn 
                  ? "Transparent 3-tier pricing, 5-step delivery process, live Biensovip.com case study, and lean SaaS automation." 
                  : "Báo giá minh bạch 3 gói, quy trình 5 bước, dự án thực tế Biensovip.com và giải pháp tự động hóa SaaS.",
                icon: <FaRocket color="#10b981" />,
                path: "/dich-vu",
                cta: isEn ? "View Pricing & SLAs" : "Xem Báo Giá & Quy Trình"
              },
              {
                title: isEn ? "Production Projects" : "Dự Án Thực Chiến",
                badge: isEn ? "11+ DELIVERABLES" : "11+ SẢN PHẨM",
                badgeColor: "#3b82f6",
                badgeBg: "rgba(59, 130, 246, 0.12)",
                desc: isEn 
                  ? "Real deliverables including Biensovip.com e-commerce and BrandHub Microservices Capstone." 
                  : "Khám phá các sản phẩm thực tế: Sàn Biensovip.com, đồ án tốt nghiệp BrandHub Microservices...",
                icon: <FaLaptopCode color="#3b82f6" />,
                path: "/projects",
                cta: isEn ? "Explore Projects" : "Khám Phá Dự Án"
              },
              {
                title: isEn ? "Achievements & Credentials" : "Hồ Sơ & Thành Tích",
                badge: isEn ? "18 CERTIFICATES" : "18 CHỨNG CHỈ & GIẢI",
                badgeColor: "#8b5cf6",
                badgeBg: "rgba(139, 92, 246, 0.12)",
                desc: isEn 
                  ? "FPT Software recognition, Microsoft & Cisco credentials, and Hackathon Championship." 
                  : "Vinh danh FPT Software, chứng chỉ quốc tế Microsoft/Cisco và giải Nhất Hackathon 2026.",
                icon: <FaGraduationCap color="#8b5cf6" />,
                path: "/achievements",
                cta: isEn ? "View Achievements" : "Xem Thành Tích"
              },
              {
                title: isEn ? "About & Engineering Philosophy" : "Giới Thiệu & Triết Lý",
                badge: isEn ? "TECH LEAD" : "TECH LEAD FPT",
                badgeColor: "#f59e0b",
                badgeBg: "rgba(245, 158, 11, 0.12)",
                desc: isEn 
                  ? "Journey from FPT Software to Tech Lead: Direct 1-on-1 collaboration, zero middlemen, guaranteed quality." 
                  : "Hành trình từ FPT Software đến Tech Lead: Làm việc trực tiếp 1-1 không qua trung gian.",
                icon: <FaUser color="#f59e0b" />,
                path: "/about",
                cta: isEn ? "Read Story" : "Xem Hành Trình"
              },
              {
                title: isEn ? "Technical Blog" : "Blog Kỹ Thuật Chuyên Sâu",
                badge: isEn ? "ARCHITECTURE" : "KIẾN TRÚC HỆ THỐNG",
                badgeColor: "#ec4899",
                badgeBg: "rgba(236, 72, 153, 0.12)",
                desc: isEn 
                  ? "In-depth case studies: Sub-8ms PostgreSQL queries, RabbitMQ DLQ retry resilience architecture." 
                  : "Bài viết chuyên sâu: Tối ưu CSDL PostgreSQL dưới 8ms, kiến trúc hàng đợi RabbitMQ DLQ...",
                icon: <FaNewspaper color="#ec4899" />,
                path: "/blog",
                cta: isEn ? "Read Articles" : "Đọc Bài Viết"
              },
              {
                title: isEn ? "Contact & Consultation" : "Liên Hệ & Tư Vấn Kỹ Thuật",
                badge: isEn ? "24/7 DIRECT" : "HỖ TRỢ TRỰC TIẾP",
                badgeColor: "#059669",
                badgeBg: "rgba(5, 150, 105, 0.12)",
                desc: isEn 
                  ? "Connect directly via Zalo/Hotline +84 912158715 or submit a free project quotation inquiry." 
                  : "Kết nối trực tiếp qua Zalo/Hotline +84 912158715 hoặc gửi form yêu cầu tư vấn báo giá miễn phí.",
                icon: <FaEnvelope color="#059669" />,
                path: "/contact",
                cta: isEn ? "Get In Touch" : "Liên Hệ Ngay"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%', minHeight: '190px', padding: '22px',
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textDecoration: 'none', color: '#000000',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ fontSize: '24px' }}>{item.icon}</div>
                      <span style={{
                        fontSize: '9.5px',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: '700',
                        color: item.badgeColor,
                        backgroundColor: item.badgeBg,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        letterSpacing: '0.4px',
                        textTransform: 'uppercase'
                      }}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                      fontSize: '17px', fontWeight: '600',
                      color: '#000000', margin: '0 0 6px 0',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '13px', fontWeight: '350',
                      color: '#555555',
                      margin: '0 0 16px 0', lineHeight: '1.5',
                    }}>{item.desc}</p>
                  </div>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: '#000000',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <span>{item.cta}</span>
                    <FaArrowRight size={10} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CONTACT CTA — NAVY BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="cta-navy"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '56px 48px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px', flexWrap: 'wrap',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.35)',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
              letterSpacing: '0.60px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)', marginBottom: '12px',
            }}>{t('home.ctaLabel')}</p>
            <h2 style={{
              fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
              fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: '600',
              lineHeight: '1.15', letterSpacing: '-0.025em',
              color: '#ffffff', margin: 0,
            }}>
              {t('home.ctaTitle')}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '9999px',
                fontSize: '15px', fontWeight: '600',
                color: '#0f172a', backgroundColor: '#ffffff',
                textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
            >
              {t('home.getInTouch')} <FaArrowRight size={13} />
            </Link>

            <Link
              to="/dich-vu#pricing-section"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '9999px',
                fontSize: '15px', fontWeight: '550',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.22)',
                textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaRocket size={13} color="#34d399" />
              <span>{isEn ? "View 3 Service Packages" : "Xem Báo Giá 3 Gói Dịch Vụ"}</span>
            </Link>

            <a
              href={personalInfo.contact?.github || 'https://github.com/trung2605'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 22px', borderRadius: '9999px',
                fontSize: '14.5px', fontWeight: '500',
                color: 'rgba(255,255,255,0.85)',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <FaGithub size={15} /> GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
