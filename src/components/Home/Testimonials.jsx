import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data';

const NOTE_BGS = ['#FDE68A', '#A7E8BD', '#FCE7F3'];

const Testimonials = () => {
    const { t } = useTranslation();

    if (testimonials.length === 0) return null;

    return (
        <section style={{ paddingBottom: '64px' }}>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ marginBottom: '28px' }}>
                    <span className="notebook-boxed-label" style={{ marginBottom: '12px' }}>
                        ✎ {t('home.testimonialsLabel')}
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(24px, 3.4vw, 38px)', fontWeight: 800,
                        lineHeight: 1.15, letterSpacing: '-0.02em',
                        color: 'var(--color-ink)', margin: '8px 0 0 0',
                    }}>{t('home.testimonialsTitle')}</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {testimonials.map((item, i) => (
                        <motion.figure
                            key={item.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.45 }}
                            style={{
                                margin: 0, padding: '24px',
                                backgroundColor: NOTE_BGS[i % NOTE_BGS.length],
                                border: '1.5px solid #18181B',
                                borderRadius: '6px',
                                boxShadow: '4px 4px 0px #18181B',
                                transform: i % 2 === 0 ? 'rotate(-0.6deg)' : 'rotate(0.6deg)',
                            }}
                        >
                            <FaQuoteLeft size={16} style={{ color: '#18181B', opacity: 0.35, marginBottom: '12px' }} aria-hidden="true" />
                            <blockquote style={{ margin: 0, fontFamily: 'var(--font-hand)', fontSize: '21px', fontWeight: 700, lineHeight: 1.38, color: '#18181B' }}>
                                "{item.quote}"
                            </blockquote>
                            <figcaption style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1.5px dashed rgba(24,24,27,0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {item.avatar && (
                                    <img src={item.avatar} alt="" style={{ width: '38px', height: '38px', borderRadius: '9999px', objectFit: 'cover', border: '1.5px solid #18181B' }} />
                                )}
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#18181B' }}>{item.name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3F3F46', fontWeight: 600 }}>{item.role}{item.company ? ` · ${item.company}` : ''}</div>
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;
