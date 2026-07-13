import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '64px 24px',
        }}>
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-soft)',
                    marginBottom: '16px',
                }}
            >
                {t('notFound.badge')}
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    fontSize: 'clamp(64px, 14vw, 160px)',
                    fontWeight: '340',
                    lineHeight: '1',
                    letterSpacing: '-3px',
                    color: 'var(--color-ink)',
                    margin: 0,
                }}
            >
                404
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                    fontSize: 'clamp(15px, 2.5vw, 18px)',
                    color: 'var(--color-ink-soft)',
                    maxWidth: '420px',
                    margin: '16px 0 32px',
                    lineHeight: '1.6',
                }}
            >
                {t('notFound.message')}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                <Link
                    to="/"
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
                    <FaHome size={14} /> {t('notFound.backHome')}
                </Link>
                <button
                    onClick={() => window.history.back()}
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
                        cursor: 'pointer',
                    }}
                >
                    <FaArrowLeft size={14} /> {t('notFound.goBack')}
                </button>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
