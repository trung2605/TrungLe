import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data';

const Testimonials = () => {
    const { t } = useTranslation();

    if (testimonials.length === 0) return null;

    return (
        <section style={{ paddingBottom: '72px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <p style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    letterSpacing: '0.60px', textTransform: 'uppercase',
                    color: '#666666', marginBottom: '12px',
                }}>{t('home.testimonialsLabel')}</p>
                <h2 style={{
                    fontFamily: 'Outfit, system-ui, sans-serif',
                    fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: '340',
                    lineHeight: '1.10', letterSpacing: '-0.72px',
                    color: 'var(--color-ink)', marginBottom: '32px',
                }}>{t('home.testimonialsTitle')}</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {testimonials.map((item, i) => (
                        <motion.figure
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            style={{
                                margin: 0, padding: '28px',
                                backgroundColor: '#f7f7f5', borderRadius: '20px',
                            }}
                        >
                            <FaQuoteLeft size={18} style={{ opacity: 0.2, marginBottom: '16px' }} aria-hidden="true" />
                            <blockquote style={{ margin: 0, fontSize: '16px', fontWeight: '330', lineHeight: '1.6', color: 'var(--color-ink)' }}>
                                {item.quote}
                            </blockquote>
                            <figcaption style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {item.avatar && (
                                    <img src={item.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '9999px', objectFit: 'cover' }} />
                                )}
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '540', color: 'var(--color-ink)' }}>{item.name}</div>
                                    <div style={{ fontSize: '13px', color: '#888888' }}>{item.role}{item.company ? ` · ${item.company}` : ''}</div>
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
