import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import PageBanner from '../../components/PageBanner/PageBanner';
import CustomCursor from '../../common/CustomCursor';

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
            <Navigation />

            {/* PageBanner sits full-bleed below nav, above main content */}
            {!isHome && (
                <div style={{ paddingTop: '56px' }}>
                    <PageBanner />
                </div>
            )}

            <main style={{
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
