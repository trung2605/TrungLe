import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import PageBanner from '../../components/PageBanner/PageBanner';
import CustomCursor from '../../common/CustomCursor';
import ScrollProgressBar from '../../common/ScrollProgressBar';
import CommandPalette from '../../components/ui/CommandPalette';
import InstallPrompt from '../../common/InstallPrompt';

const MainLayout = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';
    const prefersReducedMotion = useReducedMotion();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-canvas)',
            color: 'var(--color-ink)',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            overflowX: 'hidden',
        }}>
            <CustomCursor />
            <ScrollProgressBar />
            <CommandPalette />
            <InstallPrompt />
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
            <Navigation />

            {/* PageBanner sits full-bleed below nav, above main content */}
            {!isHome && (
                <div style={{ paddingTop: '56px' }}>
                    <PageBanner />
                </div>
            )}

            <main id="main-content" style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: isHome ? '56px 32px 0' : '0 32px',
            }}>
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Outlet />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
