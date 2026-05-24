import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import PageBanner from '../../components/PageBanner/PageBanner';

const MainLayout = () => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            overflowX: 'hidden',
        }}>
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
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
