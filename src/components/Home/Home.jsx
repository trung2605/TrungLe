import { useRef, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaArrowRight } from "react-icons/fa";
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
  "Java Spring Boot", "React", "JavaScript", "Node.js",
  "MongoDB", "SQL Server", "Docker", "Git", "REST APIs",
  "React Native", "Tailwind CSS", "Spring Security",
  "Java Spring Boot", "React", "JavaScript", "Node.js",
  "MongoDB", "SQL Server", "Docker", "Git", "REST APIs",
  "React Native", "Tailwind CSS", "Spring Security",
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
  const { t } = useTranslation();
  const { isDarkMode } = useCustomTheme();
  const { skills, siteNavigation } = useTranslatedData();

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
              gap: '14px',
              flexWrap: 'wrap',
              y: ctaY,
              paddingTop: '6px',
            }}
          >
            <MotionLink
              ref={magnetic.ref}
              to="/projects"
              className="hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                borderRadius: '9999px',
                fontSize: '15.5px',
                fontWeight: '540',
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
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
                magnetic.handleMouseLeave();
              }}
            >
              {t('home.viewProjects')} <FaArrowRight size={13} />
            </MotionLink>
            <a
              href={personalInfo.cv}
              download="Le_Tri_Trung_CV.pdf"
              className="hover-surface hero-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                borderRadius: '9999px',
                fontSize: '15.5px',
                fontWeight: '520',
                color: 'var(--color-ink)',
                backgroundColor: 'var(--color-surface-soft)',
                border: '1px solid var(--color-hairline)',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <FaDownload size={13} /> {t('home.downloadCV')}
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
              paddingTop: '6px',
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
                  width: '42px',
                  height: '42px',
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
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip" style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        backgroundColor: isDarkMode ? '#12141c' : '#0f172a',
        borderTop: '1px solid var(--color-hairline)',
        borderBottom: '1px solid var(--color-hairline)',
        color: '#ffffff',
        height: '42px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '64px',
      }}>
        <div className="marquee-track" style={{
          display: 'flex',
          gap: '32px',
          whiteSpace: 'nowrap',
          animation: 'marquee 28s linear infinite',
          willChange: 'transform',
        }}>
          {TECH_MARQUEE.map((tech, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12.5px',
              letterSpacing: '0.4px',
              color: 'rgba(255, 255, 255, 0.75)',
            }}>
              <span style={{ color: '#22c55e', fontSize: '9px' }}>✦</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS — LIME BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#444444', marginBottom: '28px',
          }}>{t('home.statsByNumbers')}</p>
          <div
            className="stats-grid"
            style={{ gap: '24px' }}
          >
            {[
              { value: 11, suffix: '+', labelKey: 'home.stats.0.label' },
              { value: 27, suffix: '+', labelKey: 'home.stats.1.label' },
              { value: 7,  suffix: '+', labelKey: 'home.stats.2.label' },
              { value: 18, suffix: '+', labelKey: 'home.stats.3.label' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.6, y: 12 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                <div style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: '340', lineHeight: '1.0', letterSpacing: '-1px', color: '#000000' }}>
                  <CountUp to={stat.value} from={0} duration={2} delay={i * 0.1} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: '#444444', marginTop: '6px' }}>{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <GitHubStats />

      {/* ── SKILLS — LILAC BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
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
        </motion.div>
      </section>

      <Testimonials />

      {/* ── EXPLORE — CREAM BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: '#f4ecd6', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#666666', marginBottom: '12px',
          }}>{t('home.exploreLabel')}</p>
          <h2 style={{
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
            fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: '340',
            lineHeight: '1.10', letterSpacing: '-0.72px',
            color: '#000000', marginBottom: '36px',
          }}>{t('home.exploreTitle')}</h2>

          <div
            className="explore-bento-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}
          >
            {siteNavigation.slice(2).map((item, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  style={{
                    gridColumn: 'span 1',
                    gridRow: 'span 1',
                  }}
                >
                  <Link
                    to={item.path}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      justifyContent: 'flex-start',
                      height: '100%', minHeight: '170px', padding: '24px',
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid rgba(0,0,0,0.06)',
                      textDecoration: 'none', color: '#000000',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '14px', color: '#000000' }}>{item.icon}</div>
                    <h3 style={{
                      fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                      fontSize: '18px', fontWeight: '540',
                      color: '#000000', margin: '0 0 6px 0',
                      display: 'flex', alignItems: 'center', gap: '6px'
                    }}>
                      {item.title}
                      {item.path === '/dich-vu' && (
                        <span style={{
                          fontSize: '9px',
                          fontWeight: '700',
                          color: '#ffffff',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          letterSpacing: '0.4px',
                          lineHeight: '1.2',
                          textTransform: 'uppercase'
                        }}>HOT</span>
                      )}
                    </h3>
                    <p style={{
                      fontSize: '13.5px', fontWeight: '330',
                      color: '#555555',
                      margin: 0, lineHeight: '1.5',
                    }}>{item.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
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
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '9999px',
                fontSize: '15px', fontWeight: '550',
                color: '#0f172a', backgroundColor: '#ffffff',
                textDecoration: 'none', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
            >
              {t('home.getInTouch')} <FaArrowRight size={13} />
            </Link>
            <a
              href={personalInfo.contact?.github || 'https://github.com/trung2605'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '9999px',
                fontSize: '15px', fontWeight: '500',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
