import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBriefcase } from 'react-icons/fa';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import PageBanner from '../../components/PageBanner/PageBanner';
import ScrollProgressBar from '../../common/ScrollProgressBar';
import SeoHeadManager from '../../common/SeoHeadManager';
import CommandPalette from '../../components/ui/CommandPalette';
import InstallPrompt from '../../common/InstallPrompt';
import RecruiterMatch from '../../components/RecruiterMatch/RecruiterMatch';
import SideStreams from '../../components/ui/SideStreams/SideStreams';
import { CustomFollowerCursor, FloatingActionBubble } from '../../animations/InteractiveEffects';

const MainLayout = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const isServicesPage = pathname === '/dich-vu' || pathname === '/services';
    const prefersReducedMotion = useReducedMotion();
    const { t } = useTranslation();
    const [recruiterMatchOpen, setRecruiterMatchOpen] = useState(false);

    return (
        <div
            className="cutting-mat-shell"
            style={{
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-body)',
                overflowX: 'hidden',
            }}
        >
            <SeoHeadManager />
            <CustomFollowerCursor />
            <FloatingActionBubble />
            <ScrollProgressBar />
            <CommandPalette />
            <InstallPrompt />
            {!isServicesPage && <SideStreams />}
            <RecruiterMatch open={recruiterMatchOpen} onOpenChange={setRecruiterMatchOpen} />

            {/* Tactile Pill Stamp Floating Button for Recruiters */}
            <motion.button
                onClick={() => setRecruiterMatchOpen(true)}
                whileHover={{ y: -3, rotate: -1, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                aria-label={t('recruiterMatch.widgetLabel')}
                data-cursor="Match JD"
                className="hidden md:flex recruiter-floating-btn"
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    left: '28px',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: '999px',
                    backgroundColor: '#F5C242',
                    color: '#18181B',
                    border: '2px solid #18181B',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    zIndex: 40,
                    boxShadow: '3px 4px 0px #18181B',
                }}
            >
                <FaBriefcase size={13} /> <span>{t('recruiterMatch.widgetLabel')}</span>
            </motion.button>

            <a
                href="#main-content"
                style={{
                    position: 'absolute',
                    left: '16px',
                    top: '-60px',
                    zIndex: 1000,
                    padding: '10px 18px',
                    borderRadius: '6px',
                    backgroundColor: '#18181B',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    border: '1.5px solid #F5C242',
                    transition: 'top 0.15s ease',
                }}
                onFocus={e => e.currentTarget.style.top = '16px'}
                onBlur={e => e.currentTarget.style.top = '-60px'}
            >
                Bỏ qua tới nội dung chính
            </a>

            {/* Inner Ruled Notebook Sheet */}
            <div className="notebook-sheet">
                <Navigation onOpenRecruiterMatch={() => setRecruiterMatchOpen(true)} />

                {/* Notebook Dossier PageBanner for inner routes */}
                {!isHome && !isServicesPage && (
                    <PageBanner />
                )}

                <main
                    id="main-content"
                    className={`layout-main ${isHome ? 'is-home' : ''}`}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        margin: '0 auto',
                        paddingTop: isHome ? '12px' : '0px',
                    }}
                >
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: prefersReducedMotion ? 0.01 : 0.38,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <Outlet />
                    </motion.div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
