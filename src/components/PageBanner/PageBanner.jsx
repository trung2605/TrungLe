import { useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { FiCircle, FiCode, FiAward, FiUsers, FiEdit3, FiFileText, FiMail, FiLayers } from 'react-icons/fi';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import { useTranslation } from 'react-i18next';

const PAGE_META = {
    '/about':        { color: '#F5C242', stampBg: '#A7E8BD', decoration: FiCircle,   key: 'about',        code: 'DOSSIER // 01' },
    '/projects':     { color: '#2563EB', stampBg: '#FDE68A', decoration: FiCode,     key: 'projects',     code: 'CASE STUDIES // 02' },
    '/achievements': { color: '#18A96B', stampBg: '#F5C242', decoration: FiAward,    key: 'achievements', code: 'MILESTONES // 03' },
    '/activities':   { color: '#EC4899', stampBg: '#A7E8BD', decoration: FiUsers,    key: 'activities',   code: 'COMMUNITY // 04' },
    '/blog':         { color: '#EA580C', stampBg: '#FDE68A', decoration: FiEdit3,    key: 'blog',         code: 'FIELD NOTES // 05' },
    '/resume':       { color: '#18181B', stampBg: '#F5C242', decoration: FiFileText, key: 'resume',       code: 'CURRICULUM VITAE // 06' },
    '/contact':      { color: '#EC4899', stampBg: '#F5C242', decoration: FiMail,     key: 'contact',      code: 'DIRECT LINE // 07' },
    '/dich-vu':      { color: '#2563EB', stampBg: '#F5C242', decoration: FiLayers,   key: 'services',     code: 'SYNAPFORGE // 08' },
    '/services':     { color: '#2563EB', stampBg: '#F5C242', decoration: FiLayers,   key: 'services',     code: 'SYNAPFORGE // 08' },
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
                stampBg: meta.stampBg,
                code: meta.code,
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
                    color: '#EA580C',
                    stampBg: '#FDE68A',
                    code: 'ARTICLE // NOTEBOOK',
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
                    color: '#2563EB',
                    stampBg: '#F5C242',
                    code: `PROJECT FILE // #${project.id}`,
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
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
                padding: 'clamp(22px, 2.8vw, 36px) clamp(16px, 2.8vw, 52px) 16px',
                position: 'relative',
            }}
        >
            <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Top Breadcrumb + Sticky Stamp Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <nav aria-label="Breadcrumb">
                        <ol style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            margin: 0,
                            padding: '5px 12px',
                            listStyle: 'none',
                            flexWrap: 'wrap',
                            backgroundColor: 'var(--color-card-bg)',
                            border: '1.5px solid var(--color-border-strong)',
                            borderRadius: '4px',
                            boxShadow: '2px 2px 0px #18181B',
                        }}>
                            <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <Link
                                    to="/"
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '5px',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '11px', letterSpacing: '0.05em',
                                        textTransform: 'uppercase', color: 'var(--color-ink-soft)',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    <FaHome size={11} /> {t('pageBanner.home')}
                                </Link>
                            </li>
                            {config.parentPath && (
                                <>
                                    <li aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <FaChevronRight size={9} style={{ color: 'var(--color-ink-soft)' }} />
                                    </li>
                                    <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <Link
                                            to={config.parentPath}
                                            style={{
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '11px', letterSpacing: '0.05em',
                                                textTransform: 'uppercase', color: 'var(--color-ink-soft)',
                                                textDecoration: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {config.parentLabel}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <FaChevronRight size={9} style={{ color: 'var(--color-ink-soft)' }} />
                            </li>
                            <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <span
                                    aria-current="page"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '11px', letterSpacing: '0.05em',
                                        textTransform: 'uppercase', color: 'var(--color-ink)',
                                        fontWeight: 700,
                                    }}
                                >
                                    {config.eyebrow}
                                </span>
                            </li>
                        </ol>
                    </nav>

                    {/* Tilted Sticky Note Dossier Stamp */}
                    <div
                        className="sticky-note-tag"
                        style={{
                            backgroundColor: config.stampBg,
                            transform: 'rotate(1.8deg)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            padding: '5px 12px',
                        }}
                    >
                        <span>★ {config.code}</span>
                    </div>
                </div>

                {/* Main Dossier Header Card */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '24px',
                        flexWrap: 'wrap',
                        paddingBottom: '18px',
                    }}
                >
                    <div style={{ maxWidth: '1080px' }}>
                        {/* Handwritten script annotation */}
                        <div
                            style={{
                                fontFamily: 'var(--font-hand)',
                                fontSize: '21px',
                                fontWeight: 700,
                                color: 'var(--color-ink-soft)',
                                marginBottom: '4px',
                                transform: 'rotate(-1deg)',
                                display: 'inline-block',
                            }}
                        >
                            ✎ {config.eyebrow.toLowerCase()}
                        </div>

                        <h1
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 4.2vw, 48px)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.025em',
                                color: 'var(--color-ink)',
                                margin: '0 0 10px 0',
                            }}
                        >
                            {config.title}
                        </h1>

                        {config.subtitle && (
                            <p
                                style={{
                                    fontSize: 'clamp(14.5px, 1.8vw, 16.5px)',
                                    fontWeight: 400,
                                    lineHeight: 1.55,
                                    color: 'var(--color-ink-soft)',
                                    margin: 0,
                                    maxWidth: '680px',
                                }}
                            >
                                {config.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Postage Stamp Emblem on Desktop */}
                    <div
                        className="hidden md:flex"
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '8px',
                            backgroundColor: config.color,
                            color: config.color === '#F5C242' ? '#18181B' : '#FFFFFF',
                            border: '2px solid #18181B',
                            boxShadow: '3px 3px 0px #18181B',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'rotate(-3deg)',
                            flexShrink: 0,
                        }}
                    >
                        <config.decoration size={28} strokeWidth={2} aria-hidden="true" />
                    </div>
                </div>

                {/* Hand-Drawn SVG Arc Divider across the notebook sheet */}
                <svg
                    viewBox="0 0 1200 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '18px', display: 'block', overflow: 'visible' }}
                >
                    <path
                        d="M4 16 Q 600 2, 1196 14"
                        stroke="var(--color-border-strong)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity="0.45"
                    />
                </svg>
            </div>
        </motion.div>
    );
};

export default PageBanner;
