import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import  './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Fixed Sidebar Navigation */}
      <Navigation />

      {/* Main Content Area with Footer */}
      <div className="main-content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="footer-container">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;