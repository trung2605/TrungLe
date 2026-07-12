import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaPaperPlane, FaInstagram, FaGithub, FaLinkedin, FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { personalInfo } from '../../data';
import { useTranslation } from 'react-i18next';
import emailService from '../../services/emailService';

const inputStyle = (focused) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: focused ? '#000000' : '#e6e6e6',
    fontSize: '15px',
    fontWeight: '330',
    color: '#000000',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
});

const labelStyle = {
    display: 'block',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '11px',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    color: '#666666',
    marginBottom: '8px',
};

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [focused, setFocused] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            if (!formData.name || !formData.email || !formData.message) throw new Error(t('contact.errorRequired'));
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) throw new Error(t('contact.errorEmail'));
            const result = await emailService.sendContactEmail(formData);
            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const methods = [
        { icon: FaEnvelope,    label: t('contact.methods.email'),    value: personalInfo.contact?.email,    href: `mailto:${personalInfo.contact?.email}`, external: false },
        { icon: FaPhone,       label: t('contact.methods.phone'),    value: personalInfo.contact?.phone,    href: `tel:${personalInfo.contact?.phone}`,    external: false },
        { icon: FaMapMarkerAlt,label: t('contact.methods.location'), value: personalInfo.contact?.location, href: '#',                                     external: false },
        { icon: FaGithub,      label: 'GitHub',                      value: 'github.com/trung2605',         href: personalInfo.contact?.github,            external: true },
        { icon: FaLinkedin,    label: 'LinkedIn',                    value: 'Lê Trí Trung',                 href: personalInfo.contact?.linkedin,          external: true },
        { icon: FaFacebook,    label: t('contact.methods.facebook'), value: 'Trung Lê',                    href: personalInfo.contact?.facebook,          external: true },
        { icon: FaInstagram,   label: t('contact.methods.instagram'),value: 'trung.le.2605',               href: personalInfo.contact?.instagram,         external: true },
    ].filter(m => m.value);

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

            {/* LIME BLOCK */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '40px 32px', marginBottom: '48px' }}
            >
                <div
                    className="grid-2col"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}
                >
                    {/* Info */}
                    <div>
                        <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '540', letterSpacing: '-0.26px', color: '#000000', marginBottom: '16px' }}>{t('contact.infoTitle')}</h2>
                        <p style={{ fontSize: '15px', fontWeight: '330', lineHeight: '1.65', color: '#444444', marginBottom: '24px' }}>
                            {t('contact.infoDesc')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {methods.map((m, i) => (
                                <motion.a
                                    key={i}
                                    href={m.href}
                                    target={m.external ? '_blank' : undefined}
                                    rel={m.external ? 'noopener noreferrer' : undefined}
                                    whileHover={{ x: 6 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '12px',
                                        padding: '12px 16px',
                                        backgroundColor: '#ffffff', borderRadius: '12px',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        textDecoration: 'none', color: '#000000',
                                        transition: 'box-shadow 0.15s ease',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    <div style={{ width: '34px', height: '34px', borderRadius: '9999px', backgroundColor: '#f7f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <m.icon size={14} />
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#888888', marginBottom: '2px' }}>{m.label}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '400', color: '#000000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.value}</div>
                                    </div>
                                    <FaArrowRight size={10} style={{ marginLeft: 'auto', color: '#888888', flexShrink: 0 }} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '540', color: '#000000', marginBottom: '20px' }}>{t('contact.formTitle')}</h2>

                        {submitStatus === 'success' && (
                            <motion.div
                                data-testid="contact-status-success"
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: '#c8e6cd', borderRadius: '8px', fontSize: '14px', color: '#000000' }}
                            >
                                <FaCheckCircle style={{ display: 'inline', marginRight: '6px' }} /> {t('contact.successMsg')}
                            </motion.div>
                        )}
                        {submitStatus === 'error' && (
                            <motion.div
                                data-testid="contact-status-error"
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: '#efd4d4', borderRadius: '8px', fontSize: '14px', color: '#000000' }}
                            >
                                <FaTimesCircle style={{ display: 'inline', marginRight: '6px' }} /> {t('contact.errorMsg')}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} data-testid="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div
                                className="form-row-2col"
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
                            >
                                <div>
                                    <label style={labelStyle}>{t('contact.nameLabel')} *</label>
                                    <input type="text" name="name" data-testid="contact-name" value={formData.name} onChange={handleChange} required placeholder={t('contact.namePlaceholder')}
                                        style={inputStyle(focused === 'name')}
                                        onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>{t('contact.emailLabel')} *</label>
                                    <input type="email" name="email" data-testid="contact-email" value={formData.email} onChange={handleChange} required placeholder={t('contact.emailPlaceholder')}
                                        style={inputStyle(focused === 'email')}
                                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>{t('contact.subjectLabel')}</label>
                                <input type="text" name="subject" data-testid="contact-subject" value={formData.subject} onChange={handleChange} placeholder={t('contact.subjectPlaceholder')}
                                    style={inputStyle(focused === 'subject')}
                                    onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>{t('contact.messageLabel')} *</label>
                                <textarea name="message" data-testid="contact-message" value={formData.message} onChange={handleChange} required rows={5} placeholder={t('contact.messagePlaceholder')}
                                    style={{ ...inputStyle(focused === 'message'), resize: 'none' }}
                                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                                />
                            </div>
                            <button
                                type="submit"
                                data-testid="contact-submit"
                                disabled={isSubmitting}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    padding: '13px 28px', borderRadius: '50px',
                                    fontSize: '15px', fontWeight: '480',
                                    color: '#ffffff',
                                    backgroundColor: isSubmitting ? '#888888' : '#000000',
                                    border: 'none',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.15s ease',
                                    width: '100%',
                                }}
                                onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#1a1a1a'; }}
                                onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#000000'; }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff', borderRadius: '9999px', animation: 'spin 0.8s linear infinite' }} />
                                        {t('contact.submitting')}
                                    </>
                                ) : (
                                    <><FaPaperPlane size={13} /> {t('contact.submit')}</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
