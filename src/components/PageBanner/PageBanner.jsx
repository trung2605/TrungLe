import { useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { FiCircle, FiCode, FiAward, FiUsers, FiEdit3, FiFileText, FiMail, FiLayers } from 'react-icons/fi';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import { useTranslation } from 'react-i18next';

const PAGE_META = {
    '/about':        { color: '#dceeb1', decoration: FiCircle,          key: 'about' },
    '/projects':     { color: '#c5b0f4', decoration: FiCode,            key: 'projects' },
    '/achievements': { color: '#f3c9b6', decoration: FiAward,           key: 'achievements' },
    '/activities':   { color: '#f4ecd6', decoration: FiUsers,           key: 'activities' },
    '/blog':         { color: '#c8e6cd', decoration: FiEdit3,           key: 'blog' },
    '/resume':       { color: '#dceeb1', decoration: FiFileText,        key: 'resume' },
    '/contact':      { color: '#efd4d4', decoration: FiMail,            key: 'contact' },
    '/dich-vu':      { color: '#dbeafe', decoration: FiLayers,          key: 'services' },
    '/services':     { color: '#dbeafe', decoration: FiLayers,          key: 'services' },
};

const PageBanner = () => {
    const { pathname } = useLocation();
    const prefersReducedMotion = useReducedMotion();
    const { t } = useTranslation();
    const { projects, posts } = useTranslatedData();

    const config = useMemo(() => {
        const meta = PAGE_META[pathname];
        if (meta) {
            return {
                eyebrow: t(`pageBanner.${meta.key}.eyebrow`),
                title:    t(`pageBanner.${meta.key}.title`),
                subtitle: t(`pageBanner.${meta.key}.subtitle`),
                color: meta.color,
                decoration: meta.decoration,
            };
        }

        // Dynamic blog post pages: /blog/:slug
        const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
        if (blogMatch) {
            const post = posts.find(p => p.slug === blogMatch[1]);
            if (post) {
                return {
                    eyebrow: t('pageBanner.blog.eyebrow'),
                    title: post.title,
                    subtitle: post.excerpt,
                    color: '#c8e6cd',
                    decoration: FiEdit3,
                    parentPath: '/blog',
                    parentLabel: t('pageBanner.blog.title'),
                };
            }
        }

        // Dynamic project detail pages: /projects/:id
        const projectMatch = pathname.match(/^\/projects\/(\d+)$/);
        if (projectMatch) {
            const project = projects.find(p => String(p.id) === projectMatch[1]);
            if (project) {
                return {
                    eyebrow: t('pageBanner.projectDetail'),
                    title: project.title,
                    subtitle: project.role + ' · ' + project.duration,
                    color: '#c5b0f4',
                    decoration: FiCode,
                    parentPath: '/projects',
                    parentLabel: t('pageBanner.projects.title'),
                };
            }
        }

        return null;
    }, [pathname, posts, projects, t]);

    // Dynamic Breadcrumb JSON-LD Structured Data
    useEffect(() => {
        if (!config) return;

        const items = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('pageBanner.home'),
                "item": "https://trung2605.github.io/"
            }
        ];

        if (config.parentPath) {
            items.push({
                "@type": "ListItem",
                "position": 2,
                "name": config.parentLabel,
                "item": `https://trung2605.github.io${config.parentPath}`
            });
            items.push({
                "@type": "ListItem",
                "position": 3,
                "name": config.title,
                "item": `https://trung2605.github.io${pathname}`
            });
        } else {
            items.push({
                "@type": "ListItem",
                "position": 2,
                "name": config.title,
                "item": `https://trung2605.github.io${pathname}`
            });
        }

        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };

        let script = document.getElementById('page-banner-breadcrumb-jsonld');
        if (!script) {
            script = document.createElement('script');
            script.id = 'page-banner-breadcrumb-jsonld';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.text = JSON.stringify(breadcrumbData);

        return () => {
            const existingScript = document.getElementById('page-banner-breadcrumb-jsonld');
            if (existingScript) existingScript.remove();
        };
    }, [pathname, config, t]);

    if (!config) return null;

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                backgroundColor: config.color,
                borderRadius: '0 0 32px 32px',
                marginLeft: 'calc(-50vw + 50%)',
                marginRight: 'calc(-50vw + 50%)',
                marginTop: '0',
                marginBottom: '0',
                padding: 'clamp(20px, 3.5vw, 44px) clamp(16px, 3vw, 32px)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Max-width wrapper */}
            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Breadcrumb Navigation */}
                <motion.nav
                    aria-label="Breadcrumb"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    style={{ marginBottom: '10px' }}
                >
                    <ol style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        flexWrap: 'wrap'
                    }}>
                        <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Link
                                to="/"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '12px', letterSpacing: '0.4px',
                                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)',
                                    textDecoration: 'none', transition: 'color 0.15s ease',
                                    fontWeight: 500,
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#000000'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
                            >
                                <FaHome size={11} /> {t('pageBanner.home')}
                            </Link>
                        </li>
                        {config.parentPath && (
                            <>
                                <li aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <FaChevronRight size={9} style={{ color: 'rgba(0,0,0,0.35)' }} />
                                </li>
                                <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <Link
                                        to={config.parentPath}
                                        style={{
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '12px', letterSpacing: '0.4px',
                                            textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)',
                                            textDecoration: 'none', transition: 'color 0.15s ease',
                                            fontWeight: 500,
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#000000'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
                                    >
                                        {config.parentLabel}
                                    </Link>
                                </li>
                            </>
                        )}
                        <li aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <FaChevronRight size={9} style={{ color: 'rgba(0,0,0,0.35)' }} />
                        </li>
                        <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <span 
                                aria-current="page"
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '12px', letterSpacing: '0.4px',
                                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.85)',
                                    fontWeight: 600,
                                }}
                            >
                                {config.eyebrow}
                            </span>
                        </li>
                    </ol>
                </motion.nav>

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
                                fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
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

                    {/* Decoration icon - Desktop only */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            color: '#000000',
                            userSelect: 'none',
                            flexShrink: 0,
                        }}
                    >
                        <config.decoration size={100} strokeWidth={1} aria-hidden="true" />
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
