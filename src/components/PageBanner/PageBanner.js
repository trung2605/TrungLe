import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const PAGE_CONFIG = {
    '/about': {
        eyebrow: 'About Me',
        title: 'Who I Am',
        subtitle: 'A glimpse into my background, skills, and what drives me forward.',
        color: '#dceeb1',
        decoration: '◐',
    },
    '/projects': {
        eyebrow: 'Portfolio',
        title: 'Projects',
        subtitle: 'Things I\'ve built — from side projects to real-world applications.',
        color: '#c5b0f4',
        decoration: '◈',
    },
    '/education': {
        eyebrow: 'Academic Journey',
        title: 'Education',
        subtitle: 'Where I study, what I learn, and moments I remember.',
        color: '#f3c9b6',
        decoration: '◉',
    },
    '/certificates': {
        eyebrow: 'Credentials',
        title: 'Certificates & Awards',
        subtitle: 'Verified skills and recognition earned along the way.',
        color: '#c8e6cd',
        decoration: '◆',
    },
    '/activities': {
        eyebrow: 'Involvement',
        title: 'Activities',
        subtitle: 'Clubs, competitions, and communities I\'ve been part of.',
        color: '#f4ecd6',
        decoration: '◇',
    },
};

const PageBanner = () => {
    const { pathname } = useLocation();
    const config = PAGE_CONFIG[pathname];
    if (!config) return null;

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                backgroundColor: config.color,
                borderRadius: '0 0 32px 32px',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                marginTop: '0',
                marginBottom: '0',
                padding: '48px 32px 44px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Max-width wrapper */}
            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}
                >
                    <Link
                        to="/"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px', letterSpacing: '0.4px',
                            textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)',
                            textDecoration: 'none', transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#000000'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
                    >
                        <FaHome size={11} /> Home
                    </Link>
                    <FaChevronRight size={9} style={{ color: 'rgba(0,0,0,0.3)' }} />
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12px', letterSpacing: '0.4px',
                        textTransform: 'uppercase', color: 'rgba(0,0,0,0.7)',
                    }}>
                        {config.eyebrow}
                    </span>
                </motion.div>

                {/* Title row */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '12px', letterSpacing: '0.60px',
                                textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)',
                                marginBottom: '10px',
                            }}
                        >
                            {config.eyebrow}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: 'clamp(32px, 5vw, 64px)',
                                fontWeight: '340',
                                lineHeight: '1.05',
                                letterSpacing: '-1.2px',
                                color: '#000000',
                                margin: 0,
                            }}
                        >
                            {config.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28, duration: 0.4 }}
                            style={{
                                fontSize: 'clamp(14px, 2vw, 17px)',
                                fontWeight: '330',
                                lineHeight: '1.55',
                                color: 'rgba(0,0,0,0.6)',
                                marginTop: '12px',
                                maxWidth: '480px',
                            }}
                        >
                            {config.subtitle}
                        </motion.p>
                    </div>

                    {/* Decoration glyph */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                        animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: 'clamp(80px, 12vw, 140px)',
                            fontWeight: '700',
                            color: '#000000',
                            lineHeight: '1',
                            userSelect: 'none',
                            flexShrink: 0,
                        }}
                    >
                        {config.decoration}
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade strip for smooth transition into page */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '32px',
                background: `linear-gradient(to bottom, transparent, ${config.color})`,
                pointerEvents: 'none',
            }} />
        </motion.div>
    );
};

export default PageBanner;
