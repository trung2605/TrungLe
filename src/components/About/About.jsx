import { motion } from "framer-motion";
import { stats } from "../../data";
import { useTranslatedData } from "../../hooks/useTranslatedData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";
import NewAvatar from "../../assets/information/image.png";
import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaRocket,
  FaLaptopCode,
  FaNewspaper,
  FaTrophy,
  FaEnvelope,
  FaArrowRight
} from "react-icons/fa";
import TechIcon from "../../common/TechIcon";

const BLOCK_COLORS = ['#F5C242', '#A7E8BD', '#FCE7F3', '#DBEAFE', '#FDE68A', '#F3C9B6'];
const HIGHLIGHT_COLORS = ['#FDE68A', '#A7E8BD', '#FCE7F3', '#DBEAFE'];

const STATUS_STYLE = {
  'Current':   { bg: '#A7E8BD', color: '#18181B' },
  'Completed': { bg: '#F3EFE6', color: '#18181B' },
};

const About = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const { personalInfo, highlights, skills, experience, languages, funFacts } = useTranslatedData();

  return (
    <div style={{ paddingTop: '24px', paddingBottom: '88px' }}>

      {/* ── NOTEBOOK TAB HEADER BAR ── */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 700,
        color: 'var(--color-ink)',
        marginBottom: '28px',
        padding: '10px 16px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '6px',
        border: '1.5px solid var(--color-border-strong)',
        boxShadow: '3px 3px 0px #18181B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div>
          <span style={{ color: '#18A96B' }}>{'// '}</span>
          <span>DOSSIER_ABOUT.MD</span>
          <span style={{ color: 'var(--color-ink-soft)', marginLeft: '14px' }}>{'/* Initialized 2005 · Founder & Tech Lead @ SynapForge Venture Studio */'}</span>
        </div>
        <span className="sticky-note-tag" style={{ backgroundColor: '#F5C242', fontSize: '14px', padding: '3px 10px', transform: 'rotate(-1.5deg)' }}>
          ✎ verified bio
        </span>
      </div>

      {/* ── STORY + POLAROID & PERSONAL DOSSIER ── */}
      <div
        className="grid-2col"
        style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '36px', marginBottom: '64px' }}
      >
        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="notebook-card"
          style={{ padding: '28px 30px', position: 'relative' }}
        >
          <span className="notebook-boxed-label" style={{ marginBottom: '18px' }}>
            ✎ {personalInfo.story?.title || 'My Journey'}
          </span>

          <div style={{ fontSize: '16px', fontWeight: 400, lineHeight: 1.72, color: 'var(--color-ink)' }}>
            <Markdown
              components={{
                a: ({ href, children, ...props }) => {
                  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
                  if (isInternal) {
                    return (
                      <Link
                        to={href}
                        style={{
                          color: '#2563EB',
                          fontWeight: 700,
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px',
                        }}
                        {...props}
                      >
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#2563EB',
                        fontWeight: 700,
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
              }}
            >
              {personalInfo.story?.content || personalInfo.bio}
            </Markdown>
          </div>

          {/* Perforated Stamp Quick Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px', paddingTop: '18px', borderTop: '1.5px dashed var(--color-hairline)' }}>
            <Link
              to="/dich-vu"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '4px',
                backgroundColor: '#F5C242', color: '#18181B',
                border: '1.5px solid #18181B', boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              <FaRocket size={11} /> {isEn ? "SynapForge Tech Studio" : "Dịch Vụ SynapForge Studio"}
            </Link>
            <Link
              to="/projects/26"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '4px',
                backgroundColor: '#DBEAFE', color: '#18181B',
                border: '1.5px solid #18181B', boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              <FaLaptopCode size={11} /> {isEn ? "Biensovip Case Study" : "Case Study Biển Số VIP"}
            </Link>
            <Link
              to="/achievements?tab=prizes"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '4px',
                backgroundColor: '#A7E8BD', color: '#18181B',
                border: '1.5px solid #18181B', boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              <FaTrophy size={11} /> {isEn ? "Hackathon Champion 2026" : "Quán Quân Hackathon 2026"}
            </Link>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '4px',
                backgroundColor: '#FCE7F3', color: '#18181B',
                border: '1.5px solid #18181B', boxShadow: '2px 2px 0px #18181B',
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, textDecoration: 'none',
              }}
            >
              <FaEnvelope size={11} /> {isEn ? "Direct Contact" : "Liên Hệ Trực Tiếp"}
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Taped Polaroid + Personal Dossier Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Taped Polaroid Portrait */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="polaroid-frame" style={{ width: '240px', transform: 'rotate(1.8deg)' }}>
              <div className="washi-tape-tl" />
              <div className="washi-tape-tr" />
              <div style={{ width: '100%', aspectRatio: '4/4.2', overflow: 'hidden', backgroundColor: '#F3EFE6' }}>
                <img src={NewAvatar} alt="Lê Trí Trung" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="polaroid-caption">Lê Trí Trung • Tech Lead</div>
            </div>
          </div>

          <div
            className="notebook-card"
            style={{ backgroundColor: 'var(--color-surface-soft)', padding: '24px' }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--color-ink)', marginBottom: '16px',
            }}>★ {t('about.personalInfoLabel')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: FaBirthdayCake, label: t('about.dateOfBirth'), value: personalInfo.contact?.birthday },
                { icon: FaPhoneAlt,      label: t('about.phoneLabel') || (isEn ? "Phone / Zalo" : "Điện thoại / Zalo"), value: personalInfo.contact?.phone || "+84 912158715" },
                { icon: FaMapMarkerAlt,  label: t('about.location'),    value: personalInfo.contact?.location },
                { icon: FaGraduationCap, label: t('about.education'),   value: t('about.educationValue') },
                { icon: FaBriefcase,     label: t('about.specialization'), value: t('about.specializationValue') },
              ].filter(i => i.value).map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-card-bg)', borderRadius: '6px',
                    border: '1.5px solid var(--color-border-strong)',
                    boxShadow: '2px 2px 0px #18181B',
                  }}
                >
                  <item.icon style={{ color: '#2563EB', flexShrink: 0 }} size={15} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)' }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS — STAMP BLOCKS ── */}
      {stats && stats.length > 0 && (
        <div
          style={{
            backgroundColor: '#F5C242',
            borderRadius: '8px',
            border: '2px solid #18181B',
            boxShadow: '5px 5px 0px #18181B',
            padding: '32px',
            marginBottom: '64px',
          }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#18181B', marginBottom: '20px' }}>
            ★ {t('about.atAGlance')}
          </p>
          <div
            className="stats-grid"
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '20px' }}
          >
            {stats.slice(0, 4).map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #18181B',
                  borderRadius: '6px',
                  padding: '16px 18px',
                  boxShadow: '3px 3px 0px #18181B',
                }}
              >
                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 700, lineHeight: 1, color: '#18181B' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#3F3F46', marginTop: '8px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EXPERIENCE TIMELINE (FILE DOSSIER CARDS) ── */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              ▤ {t('about.experienceLabel')}
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-ink)', margin: '8px 0 0 0' }}>
              {t('about.experienceTitle')}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.map((exp) => {
              const statusStyle = STATUS_STYLE[exp.status] || { bg: '#F3EFE6', color: '#18181B' };
              return (
                <div
                  key={exp.id}
                  className="notebook-card"
                  style={{
                    padding: '24px 28px',
                    borderLeft: `6px solid ${exp.color || '#2563EB'}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-ink)', margin: 0 }}>{exp.role}</h3>
                        <span style={{
                          padding: '3px 10px', borderRadius: '4px',
                          fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                          backgroundColor: statusStyle.bg, color: statusStyle.color,
                          border: '1px solid #18181B',
                        }}>
                          {exp.status}
                        </span>
                      </div>
                      <p style={{ fontSize: '14.5px', fontWeight: 700, color: '#2563EB', margin: 0 }}>{exp.company}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaCalendarAlt size={10} /> {exp.duration}
                      </span>
                      <span style={{
                        padding: '3px 9px', borderRadius: '4px',
                        fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-ink)',
                        border: '1px solid var(--color-border-strong)',
                      }}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--color-ink-soft)', marginBottom: '16px' }}>
                    <Markdown>{exp.description}</Markdown>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.skills.map((skill, si) => (
                      <span key={si} style={{
                        padding: '4px 10px', borderRadius: '4px',
                        fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 600,
                        backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-ink)',
                        border: '1px solid var(--color-border-strong)',
                        display: 'flex', alignItems: 'center', gap: '5px',
                      }}>
                        <FaCheckCircle size={9} style={{ color: '#18A96B' }} /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── HIGHLIGHTS (STICKY NOTE CARDS) ── */}
      {highlights && highlights.length > 0 && (
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              ✦ {t('about.highlightsLabel')}
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', fontWeight: 800, lineHeight: 1.15, color: 'var(--color-ink)', margin: '8px 0 0 0' }}>
              {t('about.highlightsTitle')}
            </h2>
          </div>
          <div
            className="grid-2col"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
          >
            {highlights.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: HIGHLIGHT_COLORS[i % HIGHLIGHT_COLORS.length],
                  borderRadius: '6px',
                  border: '1.5px solid #18181B',
                  boxShadow: '4px 4px 0px #18181B',
                  padding: '24px',
                  color: '#18181B',
                }}
              >
                <div style={{ fontSize: '26px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>{item.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#18181B', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.6, color: '#27272A', margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SKILLS ── */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '64px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
              ⚡ {t('about.skillsLabel')}
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, lineHeight: 1.15, color: 'var(--color-ink)', margin: '8px 0 0 0' }}>
              {t('about.skillsTitle')}
            </h2>
          </div>

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {skills.map((category, ci) => (
              <div
                key={ci}
                className="notebook-card"
                style={{ padding: '24px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', paddingBottom: '10px', borderBottom: '1.5px dashed var(--color-hairline)' }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '3px',
                    backgroundColor: BLOCK_COLORS[ci % BLOCK_COLORS.length],
                    border: '1.5px solid #18181B',
                    flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'var(--color-ink)', margin: 0,
                  }}>
                    {category.category}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {category.items.map((skill, si) => (
                    <div key={si}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: 'var(--color-ink)' }}>
                          <TechIcon tech={skill.name} size={14} />
                          {skill.name}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, color: 'var(--color-ink-soft)' }}>{skill.level}%</span>
                      </div>
                      <div style={{ height: '7px', backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-border-strong)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.08, duration: 0.7 }}
                          style={{
                            height: '100%',
                            backgroundColor: '#2563EB',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── LANGUAGES (MINT STAMP BLOCK) ── */}
      <div
        style={{
          backgroundColor: '#A7E8BD',
          borderRadius: '8px',
          border: '2px solid #18181B',
          boxShadow: '5px 5px 0px #18181B',
          padding: '32px',
          marginBottom: '64px',
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#18181B', marginBottom: '6px' }}>
          ★ {t('about.languagesLabel')}
        </p>
        <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 800, color: '#18181B', marginBottom: '24px' }}>
          {t('about.languagesTitle')}
        </h2>
        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
          {languages.map((lang, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                padding: '20px',
                border: '1.5px solid #18181B',
                boxShadow: '3px 3px 0px #18181B',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{lang.flag}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#18181B', margin: '0 0 4px 0' }}>{lang.name}</h3>
              <p style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: '#18A96B', marginBottom: '12px' }}>{lang.level}</p>

              <div style={{ height: '6px', backgroundColor: '#E4E4E7', border: '1px solid #18181B', borderRadius: '4px', marginBottom: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${lang.proficiency}%`, height: '100%', backgroundColor: '#18A96B' }} />
              </div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#3F3F46', margin: 0 }}>{lang.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FUN FACTS ── */}
      <section style={{ marginBottom: '64px' }}>
        <div style={{ marginBottom: '28px' }}>
          <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
            ✎ {t('about.funFactsLabel')}
          </span>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: 'var(--color-ink)', margin: '8px 0 0 0' }}>
            {t('about.funFactsTitle')}
          </h2>
        </div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {funFacts.map((fact, i) => (
            <div
              key={i}
              className="notebook-card"
              style={{
                padding: '22px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length], borderBottom: '1px solid #18181B' }} />
              <div style={{ fontSize: '26px', marginBottom: '10px', marginTop: '6px', display: 'flex', alignItems: 'center' }}>{fact.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-ink)', margin: '0 0 8px 0' }}>{fact.title}</h3>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--color-ink-soft)', margin: 0 }}>{fact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ECOSYSTEM & INTERCONNECTED NAVIGATION ── */}
      <section style={{ marginBottom: '64px' }}>
        <div style={{ marginBottom: '28px' }}>
          <span className="notebook-boxed-label" style={{ marginBottom: '10px' }}>
            ❖ {t('about.ecosystemLabel') || 'Hệ sinh thái & Kết nối'}
          </span>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 800, color: 'var(--color-ink)', margin: '8px 0 8px 0' }}>
            {t('about.ecosystemTitle') || 'Khám phá các trang liên kết'}
          </h2>
        </div>

        <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {[
            {
              title: isEn ? "Web & SaaS Development (Team 5 Devs)" : "Dịch Vụ Làm Website & SaaS (Team 5 Kỹ Sư)",
              badge: isEn ? "Core Service" : "Dịch vụ nòng cốt",
              desc: isEn ? "Transparent 5-step engineering process, priced per manday with No Middlemen." : "Quy trình kỹ thuật 5 bước minh bạch, tính giá theo Manday, không qua trung gian.",
              path: "/dich-vu",
              cta: isEn ? "Explore Services & Pricing" : "Xem bảng giá & quy trình",
              icon: <FaRocket size={18} />,
              bg: '#F5C242',
            },
            {
              title: isEn ? "Production Projects Showcase" : "Showcase Dự Án Thực Chiến",
              badge: isEn ? "Production Code" : "Sản phẩm thực tế",
              desc: isEn ? "Explore live marketplace biensovip.com, ThreadLearn AI, The MC Hub, and full-stack software architectures." : "Khám phá sàn giao dịch biensovip.com, hệ thống AI ThreadLearn, The MC Hub và kiến trúc phần mềm chuẩn production.",
              path: "/projects",
              cta: isEn ? "View All Projects" : "Khám phá danh mục dự án",
              icon: <FaLaptopCode size={18} />,
              bg: '#A7E8BD',
            },
            {
              title: isEn ? "Engineering Deep-Dives (Blog)" : "Bài Viết Phân Tích Kỹ Thuật (Blog)",
              badge: isEn ? "Tech Writing" : "Góc kỹ thuật",
              desc: isEn ? "In-depth case studies: PostgreSQL multi-filter query optimization under 8ms, Java 21 multithreading, and AI Agents." : "Phân tích case study thực tế: Tối ưu CSDL PostgreSQL từ 350ms xuống 8ms, lập trình đa luồng Java 21, tích hợp AI.",
              path: "/blog",
              cta: isEn ? "Read Tech Articles" : "Đọc các bài viết kỹ thuật",
              icon: <FaNewspaper size={18} />,
              bg: '#DBEAFE',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="notebook-card"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '6px', backgroundColor: item.bg, border: '1.5px solid #18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18181B' }}>
                    {item.icon}
                  </div>
                  <span style={{
                    padding: '3px 9px', borderRadius: '4px',
                    fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: item.bg, color: '#18181B', border: '1px solid #18181B',
                  }}>
                    {item.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-ink)', margin: '0 0 8px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'var(--color-ink-soft)', margin: '0 0 18px 0' }}>
                  {item.desc}
                </p>
              </div>

              <Link
                to={item.path}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)', textDecoration: 'none',
                  paddingTop: '10px', borderTop: '1.5px dashed var(--color-hairline)',
                }}
              >
                <span>{item.cta}</span>
                <FaArrowRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMAGE SLIDER ── */}
      <div>
        <span className="notebook-boxed-label" style={{ marginBottom: '18px' }}>
          📸 {t('about.galleryLabel')}
        </span>
        <div style={{ marginTop: '14px' }}>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default About;
