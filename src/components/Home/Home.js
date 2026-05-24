import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaArrowRight } from "react-icons/fa";
import { siteNavigation, personalInfo, skills, allSkillsData } from "../../data";
import BlurText from "../../animations/BlurText";
import CountUp from "../../animations/CountUp";
import RotatingText from "../../animations/RotatingText";
import DecryptedText from "../../animations/DecryptedText";

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
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <div
          className="hero-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}
        >
          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <motion.div {...fadeUp(0)}>
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
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              style={{
                fontSize: 'clamp(36px, 6vw, 86px)',
                fontWeight: '340',
                lineHeight: '1.00',
                letterSpacing: '-1.72px',
                color: '#000000',
                margin: 0,
              }}
            >
              <BlurText
                text="Xin chào,"
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
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span>I'm a</span>
              <RotatingText
                texts={["Java Developer", "CS Student", "Backend Engineer", "Problem Solver"]}
                mainClassName="inline-flex items-center px-4 py-1 rounded-lg font-semibold"
                rotationInterval={2500}
                staggerDuration={0.025}
                staggerFrom="last"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                style={{ backgroundColor: '#f7f7f5', color: '#000000', borderRadius: '8px', padding: '4px 14px' }}
              />
            </motion.div>

            <motion.p
              {...fadeUp(0.3)}
              style={{
                fontSize: 'clamp(15px, 2.5vw, 20px)',
                fontWeight: '330',
                lineHeight: '1.55',
                letterSpacing: '-0.14px',
                color: '#444444',
                maxWidth: '520px',
                margin: 0,
              }}
            >
              Computer Science student at FPT University. Specializing in Java Spring Boot
              and modern web development — building clean, scalable applications.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
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
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
              >
                View Projects <FaArrowRight size={14} />
              </Link>
              <a
                href={personalInfo.cv}
                download="Le_Tri_Trung_CV.pdf"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '480',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e6e6e6',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <FaDownload size={14} /> Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.5)} style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '8px' }}>
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
                  style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '9999px',
                    backgroundColor: '#f7f7f5',
                    color: '#000000',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e6e6e6'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f7f7f5'}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile image — hidden on mobile via CSS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="hidden lg:flex"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ position: 'relative', width: '360px', height: '360px' }}>
              <div style={{
                position: 'absolute', inset: '-24px',
                backgroundColor: '#dceeb1', borderRadius: '32px', zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: '100%', height: '100%',
                borderRadius: '24px', overflow: 'hidden',
                border: '4px solid #ffffff',
              }}>
                <img
                  src={personalInfo.profileImage}
                  alt="Lê Trí Trung"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '-16px', right: '-16px',
                backgroundColor: '#000000', color: '#ffffff',
                borderRadius: '50px', padding: '8px 18px',
                fontSize: '12px', fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.4px', textTransform: 'uppercase', zIndex: 2,
              }}>
                FPT University · Đà Nẵng
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div style={{
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        backgroundColor: '#000000',
        color: '#ffffff',
        height: '40px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '48px', animation: 'marqueeScroll 25s linear infinite', whiteSpace: 'nowrap' }}>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#444444', marginBottom: '28px',
          }}>By the numbers</p>
          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
          >
            {[
              { value: 11, suffix: '+', label: 'Projects Built' },
              { value: 27, suffix: '+', label: 'Certificates' },
              { value: 7,  suffix: '+', label: 'Awards & Prizes' },
              { value: 18, suffix: '+', label: 'Activities' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: '340', lineHeight: '1.0', letterSpacing: '-1px', color: '#000000' }}>
                  <CountUp to={stat.value} from={0} duration={2} delay={i * 0.1} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: '#444444', marginTop: '6px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SKILLS — LILAC BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#c5b0f4', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#444444', marginBottom: '12px',
          }}>Skills & Expertise</p>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: '340',
            lineHeight: '1.10', letterSpacing: '-0.72px',
            color: '#000000', marginBottom: '40px',
          }}>
            <BlurText text="What I work with" delay={40} animateBy="words" direction="bottom" className="inline" />
          </h2>

          <div
            className="skills-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}
          >
            {skills.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '5px 12px', borderRadius: '50px',
                  fontSize: '13px', fontWeight: '400', color: '#000000',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  cursor: 'default', transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)'}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── EXPLORE — CREAM BLOCK ── */}
      <section style={{ paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: '#f4ecd6', borderRadius: '24px', padding: '40px 36px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
            letterSpacing: '0.60px', textTransform: 'uppercase',
            color: '#666666', marginBottom: '12px',
          }}>More About Me</p>
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 48px)', fontWeight: '340',
            lineHeight: '1.10', letterSpacing: '-0.72px',
            color: '#000000', marginBottom: '36px',
          }}>Explore my journey</h2>

          <div
            className="grid-3col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
          >
            {siteNavigation.slice(1).map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} whileHover={{ y: -4 }}>
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
                  <h3 style={{ fontSize: '17px', fontWeight: '540', color: '#000000', margin: '0 0 6px 0' }}>{item.title}</h3>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            }}>Let's build something</p>
            <h2 style={{
              fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: '340',
              lineHeight: '1.15', letterSpacing: '-0.72px',
              color: '#ffffff', margin: 0,
            }}>
              Open to internship &<br />collaboration opportunities
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${personalInfo.contact?.email || 'letritrung2605@gmail.com'}`}
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
              Get in touch <FaArrowRight size={14} />
            </a>
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
