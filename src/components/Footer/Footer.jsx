import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { socialLinks } from '../../data';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import { useTranslation } from 'react-i18next';

const getSocialIcon = (name) => {
    const icons = { facebook: FaFacebook, github: FaGithub, linkedin: FaLinkedin, email: FaEnvelope, instagram: FaInstagram };
    return icons[name.toLowerCase()] || FaEnvelope;
};

const COIN_COLORS = ['#F5C242', '#EC4899', '#18A96B', '#2563EB', '#EA580C'];

const Footer = () => {
    const { t } = useTranslation();
    const { siteNavigation } = useTranslatedData();
    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.1 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer style={{
            backgroundColor: 'var(--color-surface-soft)',
            borderTop: '2px solid var(--color-border-strong)',
            padding: '48px clamp(16px, 2.8vw, 52px) 36px',
            marginTop: '32px',
            position: 'relative',
        }}>
            <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
                <div
                    className="footer-grid"
                    style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px', marginBottom: '36px' }}
                >
                    {/* Brand Stamp Box */}
                    <div>
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '14px' }}
                        >
                            <div style={{
                                padding: '4px 12px',
                                borderRadius: '4px',
                                backgroundColor: 'var(--color-card-bg)',
                                border: '2px solid #E06D53',
                                boxShadow: '2px 2px 0px #18181B',
                                fontFamily: 'var(--font-pixel)',
                                fontSize: '20px',
                                fontWeight: 700,
                                color: 'var(--color-ink)',
                                letterSpacing: '0.04em',
                                transform: 'rotate(-1deg)',
                            }}>
                                TRUNG LÊ
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '20px',
                                fontWeight: 700,
                                color: 'var(--color-ink-soft)',
                            }}>
                                ✎ software architect
                            </span>
                        </Link>
                        <p style={{
                            fontSize: '14.5px', fontWeight: 400, lineHeight: 1.6,
                            color: 'var(--color-ink-soft)', maxWidth: '340px', marginBottom: '20px',
                        }}>
                            {t('footer.tagline')}
                        </p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {socialLinks.map((social, i) => {
                                const Icon = getSocialIcon(social.name);
                                const coinBg = COIN_COLORS[i % COIN_COLORS.length];
                                return (
                                    <motion.a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2, rotate: -4 }}
                                        style={{
                                            width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '9999px',
                                            backgroundColor: coinBg,
                                            color: coinBg === '#F5C242' ? '#18181B' : '#FFFFFF',
                                            border: '1.5px solid #18181B',
                                            boxShadow: '2px 2px 0px #18181B',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <Icon size={15} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Explore links */}
                    <div>
                        <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: 'var(--color-ink)', marginBottom: '14px',
                        }}>★ {t('footer.quickLinks')}</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {siteNavigation.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={scrollToTop}
                                        className="hover-ink"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '12.5px', fontWeight: 600,
                                            textTransform: 'uppercase',
                                            color: 'var(--color-ink-soft)', textDecoration: 'none',
                                            transition: 'color 0.15s ease',
                                        }}
                                    >
                                        → {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{
                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: 'var(--color-ink)', marginBottom: '14px',
                        }}>♥ {t('footer.contactInfo')}</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-ink-soft)' }}>
                                <FaMapMarkerAlt size={13} style={{ marginTop: '3px', flexShrink: 0, color: '#EA580C' }} />
                                {t('footer.location')}
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                <FaPhoneAlt size={13} style={{ flexShrink: 0, color: '#18A96B' }} />
                                <a
                                    href="tel:+84912158715"
                                    className="hover-ink"
                                    style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', fontWeight: 500 }}
                                >
                                    +84 912158715 (Zalo)
                                </a>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                <FaEnvelope size={13} style={{ flexShrink: 0, color: '#2563EB' }} />
                                <a
                                    href="mailto:letritrung2605@gmail.com"
                                    className="hover-ink"
                                    style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', wordBreak: 'break-all', fontWeight: 500 }}
                                >
                                    letritrung2605@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: '18px',
                    borderTop: '1.5px dashed var(--color-hairline)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '10px',
                }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--color-ink-soft)', margin: 0 }}>
                        © {new Date().getFullYear()} LÊ TRÍ TRUNG · NOTEBOOK EDITION v2.0
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--color-ink-soft)', margin: 0 }}>
                        {t('footer.builtWith').toUpperCase()}
                    </p>
                </div>
            </div>

            {/* Tactile Scroll to top button */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
                style={{
                    position: 'fixed', bottom: '28px', right: '28px',
                    width: '44px', height: '44px', borderRadius: '6px',
                    backgroundColor: '#18181B', color: '#FFFFFF',
                    border: '2px solid #18181B', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    zIndex: 40, boxShadow: '3px 3px 0px #F5C242',
                }}
            >
                <FaArrowUp size={14} />
            </motion.button>
        </footer>
    );
};

export default Footer;
