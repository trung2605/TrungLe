import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBriefcase } from 'react-icons/fa';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import PageBanner from '../../components/PageBanner/PageBanner';
import ScrollProgressBar from '../../common/ScrollProgressBar';
import CommandPalette from '../../components/ui/CommandPalette';
import InstallPrompt from '../../common/InstallPrompt';
import RecruiterMatch from '../../components/RecruiterMatch/RecruiterMatch';
import SideStreams from '../../components/ui/SideStreams/SideStreams';

const MainLayout = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const prefersReducedMotion = useReducedMotion();
    const { t } = useTranslation();
    const [recruiterMatchOpen, setRecruiterMatchOpen] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-ink)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            overflowX: 'hidden',
        }}>
            <ScrollProgressBar />
            <CommandPalette />
            <InstallPrompt />
            <SideStreams />
            <RecruiterMatch open={recruiterMatchOpen} onOpenChange={setRecruiterMatchOpen} />
            <motion.button
                onClick={() => setRecruiterMatchOpen(true)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('recruiterMatch.widgetLabel')}
                className="hidden md:flex recruiter-floating-btn"
                style={{
                    position: 'fixed', bottom: '28px', left: '28px',
                    alignItems: 'center', gap: '8px',
                    padding: '13px 20px', borderRadius: '9999px',
                    backgroundColor: '#000000', color: '#ffffff',
                    border: 'none', cursor: 'pointer',
                    fontSize: '14px', fontWeight: 540,
                    zIndex: 40, boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                }}
            >
                <FaBriefcase size={14} /> <span>{t('recruiterMatch.widgetLabel')}</span>
            </motion.button>
            <a
                href="#main-content"
                style={{
                    position: 'absolute',
                    left: '16px',
                    top: '-60px',
                    zIndex: 1000,
                    padding: '10px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '480',
                    textDecoration: 'none',
                    transition: 'top 0.15s ease',
                }}
                onFocus={e => e.currentTarget.style.top = '16px'}
                onBlur={e => e.currentTarget.style.top = '-60px'}
            >
                Bỏ qua tới nội dung chính
            </a>
            <Navigation onOpenRecruiterMatch={() => setRecruiterMatchOpen(true)} />

            {/* PageBanner sits full-bleed below nav, above main content */}
            {!isHome && (
                <div style={{ paddingTop: '74px' }}>
                    <PageBanner />
                </div>
            )}

            <main id="main-content" className={`layout-main ${isHome ? 'is-home' : ''}`} style={{
                maxWidth: '1280px',
                margin: '0 auto',
            }}>
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16, scale: prefersReducedMotion ? 1 : 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.42, 
                        ease: [0.22, 1, 0.36, 1] 
                    }}
                >
                    <Outlet />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
