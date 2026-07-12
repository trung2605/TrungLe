import { useRef, useCallback } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaArrowRight } from "react-icons/fa";
import { personalInfo, allSkillsData } from "../../data";
import TechIcon from "../../common/TechIcon";
import NewAvatar from "../../assets/information/image.png";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
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



const TerminalCard = () => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useTransform(mouseY, [-1, 1], [12, -12]), { stiffness: 180, damping: 22 });
  const rotY = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), { stiffness: 180, damping: 22 });
  const glowX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), { stiffness: 180, damping: 22 });
  const glowY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div style={{ perspective: '900px', width: '100%' }}>
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d',
        backgroundColor: '#0d1117',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #30363d',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '13px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        width: '100%',
        cursor: 'default',
      }}
    >
      {/* Title bar */}
      <div style={{ backgroundColor: '#161b22', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #30363d' }}>
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block' }} />
        <span style={{ marginLeft: '8px', fontSize: '12px', color: '#8b949e' }}>trung@portfolio ~ </span>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#30363d' }}>image.png</span>
      </div>

      {/* Avatar with code overlay */}
      <div style={{ position: 'relative' }}>
        {/* Mouse-tracking glare */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', borderRadius: 0,
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
        />
        <img
          src={NewAvatar}
          alt="Le Tri Trung"
          style={{ width: '100%', display: 'block', aspectRatio: '4/5', objectFit: 'cover', objectPosition: 'top' }}
        />

        {/* Top-left: file path badge */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          backgroundColor: 'rgba(13,17,23,0.85)',
          border: '1px solid #30363d',
          borderRadius: '6px',
          padding: '5px 10px',
          fontSize: '11px', color: '#8b949e',
          backdropFilter: 'blur(4px)',
        }}>
          <span style={{ color: '#1ea64a' }}>$ </span>open <span style={{ color: '#93c5fd' }}>le-tri-trung.jpg</span>
        </div>

        {/* Bottom overlay: code info strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          backgroundColor: 'rgba(13,17,23,0.88)',
          borderTop: '1px solid #30363d',
          padding: '14px 16px',
          backdropFilter: 'blur(8px)',
          display: 'flex', flexDirection: 'column', gap: '5px',
        }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ color: '#1ea64a' }}>$</span>
            <span style={{ color: '#ffffff' }}>whoami</span>
          </div>
          <div style={{ color: '#e2e8f0', paddingLeft: '14px' }}>le-tri-trung</div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ color: '#1ea64a' }}>$</span>
            <span style={{ color: '#ffffff' }}>echo $ROLE</span>
          </div>
          <div style={{ color: '#93c5fd', paddingLeft: '14px', fontSize: '12px' }}>Software Developer Intern @ FPT Software</div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '2px' }}>
            <span style={{ color: '#4ade80' }}>✓</span>
            <span style={{ color: '#4ade80', fontSize: '12px' }}>open_to_work: true</span>
            <span style={{ display: 'inline-block', width: '7px', height: '13px', backgroundColor: '#1ea64a', animation: 'blink 1s step-end infinite', marginLeft: '4px' }} />
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

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
  const { skills, siteNavigation } = useTranslatedData();

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
  const imgX     = useSpring(useTransform(heroScroll, [0, 1], [0, 60]),   heroSpring);
  const imgOp    = useSpring(useTransform(heroScroll, [0, 0.7], [1, 0]),  heroSpring);

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
      <section ref={heroRef} style={{ paddingTop: '64px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
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
          className="hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1 }}
        >
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div style={{ y: badgeY, opacity: badgeOp }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '50px',
                backgroundColor: '#dceeb1',
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: '400',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                color: '#000000',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1ea64a', display: 'inline-block' }} />
                {t('home.badge')}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              style={{
                fontFamily: 'Outfit, system-ui, sans-serif',
                fontSize: 'clamp(36px, 6vw, 86px)',
                fontWeight: '340',
                lineHeight: '1.00',
                letterSpacing: '-1.72px',
                color: 'var(--color-ink)',
                margin: 0,
                y: h1Y,
                opacity: h1Op,
              }}
            >
              <BlurText
                text={t('home.greeting')}
                delay={50}
                animateBy="words"
                direction="top"
                className="block"
              />
              <span style={{ display: 'block', marginTop: '4px' }}>
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

            <motion.div
              {...fadeUp(0.2)}
              style={{
                fontSize: 'clamp(16px, 3vw, 22px)',
                fontWeight: '330',
                color: 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                y: roleY,
              }}
            >
              <span>{t('home.iAm')}</span>
              <RotatingText
                texts={t('home.roles', { returnObjects: true })}
                mainClassName="inline-flex items-center px-4 py-1 rounded-lg font-semibold"
                rotationInterval={2500}
                staggerDuration={0.025}
                staggerFrom="last"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                style={{ backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-ink)', borderRadius: '8px', padding: '4px 14px' }}
              />
            </motion.div>

            <motion.p
              {...fadeUp(0.3)}
              style={{
                fontSize: 'clamp(15px, 2.5vw, 20px)',
                fontWeight: '330',
                lineHeight: '1.55',
                letterSpacing: '-0.14px',
                color: 'var(--color-ink-soft)',
                maxWidth: '520px',
                margin: 0,
                y: descY,
              }}
            >
              {t('home.heroDesc')}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', y: ctaY }}>
              <MotionLink
                ref={magnetic.ref}
                to="/projects"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '480',
                  color: '#ffffff',
                  backgroundColor: '#000000',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                  x: magnetic.x,
                  y: magnetic.y,
                }}
                onMouseMove={magnetic.handleMouseMove}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#000000'; magnetic.handleMouseLeave(); }}
              >
                {t('home.viewProjects')} <FaArrowRight size={14} />
              </MotionLink>
              <a
                href={personalInfo.cv}
                download="Le_Tri_Trung_CV.pdf"
                className="hover-surface"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '480',
                  color: 'var(--color-ink)',
                  backgroundColor: 'var(--color-canvas)',
                  border: '1.5px solid var(--color-hairline)',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <FaDownload size={14} /> {t('home.downloadCV')}
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.5)} style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px', y: ctaY }}>
              {[
                { href: personalInfo.contact?.github, icon: <FaGithub size={18} /> },
                { href: personalInfo.contact?.linkedin, icon: <FaLinkedin size={18} /> },
                { href: personalInfo.contact?.instagram, icon: <FaInstagram size={18} /> },
                { href: personalInfo.contact?.facebook, icon: <FaFacebook size={18} /> },
              ].filter(s => s.href).map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="hover-surface"
                  style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-surface-soft)',
                    color: 'var(--color-ink)',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Terminal card — hidden on mobile */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.01 : 0.7 }}
            style={{ x: imgX, opacity: imgOp }}
          >
            <TerminalCard />
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip" style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        backgroundColor: '#000000',
        color: '#ffffff',
        height: '40px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '48px', animation: 'marqueeScroll 25s linear infinite', whiteSpace: 'nowrap' }}>
          {TECH_MARQUEE.map((t, i) => (
            <span key={i} style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', opacity: 0.8 }}>
              {t} <span style={{ opacity: 0.3, margin: '0 12px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS — LIME BLOCK ── */}
      <section style={{ padding: '72px 0' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -0.8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
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
            style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: '24px' }}
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
            fontFamily: 'Outfit, system-ui, sans-serif',
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
            fontFamily: 'Outfit, system-ui, sans-serif',
            fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: '340',
            lineHeight: '1.10', letterSpacing: '-0.72px',
            color: '#000000', marginBottom: '36px',
          }}>{t('home.exploreTitle')}</h2>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
          >
            {siteNavigation.slice(1).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={{ marginTop: i % 3 === 1 ? '18px' : 0 }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: 'block', padding: '22px',
                    backgroundColor: '#ffffff', borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textDecoration: 'none', color: '#000000',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '26px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Outfit, system-ui, sans-serif', fontSize: '17px', fontWeight: '540', color: '#000000', margin: '0 0 6px 0' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', fontWeight: '330', color: '#555555', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
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
            backgroundColor: '#1f1d3d', borderRadius: '24px',
            padding: '56px 48px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px', flexWrap: 'wrap',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
              letterSpacing: '0.60px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', marginBottom: '12px',
            }}>{t('home.ctaLabel')}</p>
            <h2 style={{
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: '340',
              lineHeight: '1.15', letterSpacing: '-0.72px',
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
                padding: '11px 22px', borderRadius: '50px',
                fontSize: '16px', fontWeight: '480',
                color: '#000000', backgroundColor: '#ffffff',
                textDecoration: 'none', transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              {t('home.getInTouch')} <FaArrowRight size={14} />
            </Link>
            <a
              href={personalInfo.contact?.github || 'https://github.com/trung2605'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 22px', borderRadius: '50px',
                fontSize: '16px', fontWeight: '480',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                textDecoration: 'none', transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
            >
              <FaGithub size={16} /> GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
