import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import  './MainLayout.scss';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Grid Layout: Header | Content | Footer */}
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        
        {/* Fixed Header/Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <Navigation />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>

        {/* Fixed Footer */}
        <footer className="footer-container text-white">
          <Footer />
        </footer>

      </div>
    </div>
  );
};

export default MainLayout;