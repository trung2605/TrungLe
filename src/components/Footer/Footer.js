import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import { socialLinks, siteNavigation, personalInfo } from '../../data';

const getSocialIcon = (name) => {
    const icons = { facebook: FaFacebook, github: FaGithub, linkedin: FaLinkedin, email: FaEnvelope, instagram: FaInstagram };
    return icons[name.toLowerCase()] || FaEnvelope;
};

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer style={{
            backgroundColor: 'var(--color-canvas)',
            borderTop: '1px solid var(--color-hairline)',
            padding: '56px 32px',
            marginTop: '0',
        }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div
                    className="footer-grid"
                    style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '40px' }}
                >
                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            onClick={scrollToTop}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '6px',
                                backgroundColor: '#000000', color: '#ffffff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '13px', fontWeight: '700', letterSpacing: '-0.5px',
                            }}>LT</div>
                            <span style={{ fontSize: '16px', fontWeight: '540', color: 'var(--color-ink)', letterSpacing: '-0.2px' }}>
                                Lê Trí Trung
                            </span>
                        </Link>
                        <p style={{
                            fontSize: '15px', fontWeight: '330', lineHeight: '1.6',
                            color: 'var(--color-ink-soft)', maxWidth: '320px', marginBottom: '20px',
                        }}>
                            Computer Science student at FPT University. Passionate about building clean, scalable applications with Java Spring Boot and React.
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {socialLinks.map((social, i) => {
                                const Icon = getSocialIcon(social.name);
                                return (
                                    <motion.a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -2 }}
                                        className="hover-surface"
                                        style={{
                                            width: '36px', height: '36px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '9999px',
                                            backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-ink)',
                                            border: '1px solid var(--color-hairline)',
                                            transition: 'background-color 0.15s ease',
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
                            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                            letterSpacing: '0.60px', textTransform: 'uppercase',
                            color: 'var(--color-ink-soft)', marginBottom: '16px',
                        }}>Explore</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {siteNavigation.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={scrollToTop}
                                        className="hover-ink"
                                        style={{
                                            fontSize: '15px', fontWeight: '330',
                                            color: 'var(--color-ink-soft)', textDecoration: 'none',
                                            transition: 'color 0.15s ease',
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{
                            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                            letterSpacing: '0.60px', textTransform: 'uppercase',
                            color: 'var(--color-ink-soft)', marginBottom: '16px',
                        }}>Contact</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--color-ink-soft)' }}>
                                <FaMapMarkerAlt size={13} style={{ marginTop: '2px', flexShrink: 0 }} />
                                Đà Nẵng, Vietnam
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                <FaEnvelope size={13} style={{ flexShrink: 0 }} />
                                <a
                                    href="mailto:letritrung2605@gmail.com"
                                    className="hover-ink"
                                    style={{ color: 'var(--color-ink-soft)', textDecoration: 'none', transition: 'color 0.15s ease', wordBreak: 'break-all' }}
                                >
                                    letritrung2605@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid var(--color-hairline)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '10px',
                }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', color: 'var(--color-ink-soft)', margin: 0 }}>
                        © {new Date().getFullYear()} LÊ TRÍ TRUNG — ALL RIGHTS RESERVED
                    </p>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', color: 'var(--color-ink-soft)', margin: 0 }}>
                        BUILT WITH REACT + FIGMA DESIGN SYSTEM
                    </p>
                </div>
            </div>

            {/* Scroll to top */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed', bottom: '28px', right: '28px',
                    width: '44px', height: '44px', borderRadius: '9999px',
                    backgroundColor: '#000000', color: '#ffffff',
                    border: 'none', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    zIndex: 40, boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
            >
                <FaArrowUp size={14} />
            </motion.button>
        </footer>
    );
};

export default Footer;
