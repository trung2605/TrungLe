import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaPaperPlane, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { personalInfo } from '../../data';
import emailService from '../../services/emailService';
import BlurText from '../../animations/BlurText';

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
            if (!formData.name || !formData.email || !formData.message) throw new Error('Fill in all required fields.');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) throw new Error('Invalid email address.');
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
        { icon: FaEnvelope, label: 'Email', value: personalInfo.contact?.email, href: `mailto:${personalInfo.contact?.email}` },
        { icon: FaPhone, label: 'Phone', value: personalInfo.contact?.phone, href: `tel:${personalInfo.contact?.phone}` },
        { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.contact?.location, href: '#' },
        { icon: FaFacebook, label: 'Facebook', value: 'Trung Lê', href: personalInfo.contact?.facebook },
        { icon: FaInstagram, label: 'Instagram', value: 'trung.le.2605', href: personalInfo.contact?.instagram },
    ].filter(m => m.value);

    return (
        <div style={{ paddingTop: '64px', paddingBottom: '96px' }}>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '56px' }}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.60px', textTransform: 'uppercase', color: '#666666', marginBottom: '12px' }}>
                    Get in touch
                </p>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '340', lineHeight: '1.10', letterSpacing: '-0.96px', color: '#000000', margin: 0 }}>
                    <BlurText text="Contact Me" delay={40} animateBy="words" direction="bottom" className="inline" />
                </h1>
                <p style={{ fontSize: 'clamp(15px, 2.5vw, 20px)', fontWeight: '330', lineHeight: '1.5', color: '#555555', marginTop: '16px', maxWidth: '540px' }}>
                    Open to internship opportunities, collaborations, or a chat about technology.
                </p>
            </motion.div>

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
                        <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: '540', letterSpacing: '-0.26px', color: '#000000', marginBottom: '16px' }}>Contact Information</h2>
                        <p style={{ fontSize: '15px', fontWeight: '330', lineHeight: '1.65', color: '#444444', marginBottom: '24px' }}>
                            Feel free to reach out. I typically respond within 24 hours.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {methods.map((m, i) => (
                                <motion.a
                                    key={i}
                                    href={m.href}
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
                        <h2 style={{ fontSize: '20px', fontWeight: '540', color: '#000000', marginBottom: '20px' }}>Send a Message</h2>

                        {submitStatus === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: '#c8e6cd', borderRadius: '8px', fontSize: '14px', color: '#000000' }}
                            >
                                ✓ Message sent! I'll respond as soon as possible.
                            </motion.div>
                        )}
                        {submitStatus === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                style={{ marginBottom: '16px', padding: '12px 16px', backgroundColor: '#efd4d4', borderRadius: '8px', fontSize: '14px', color: '#000000' }}
                            >
                                ✗ Error sending message. Please email me directly.
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div
                                className="form-row-2col"
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
                            >
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name"
                                        style={inputStyle(focused === 'name')}
                                        onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com"
                                        style={inputStyle(focused === 'email')}
                                        onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Subject</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?"
                                    style={inputStyle(focused === 'subject')}
                                    onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Message *</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your message..."
                                    style={{ ...inputStyle(focused === 'message'), resize: 'none' }}
                                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                                />
                            </div>
                            <button
                                type="submit"
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
                                        Sending...
                                    </>
                                ) : (
                                    <><FaPaperPlane size={13} /> Send Message</>
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
