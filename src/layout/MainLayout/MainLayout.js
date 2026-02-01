import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200 overflow-x-hidden">
            {/* Tech Background Grid (Fixed) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[size:24px_24px]"></div>
                
                {/* Blue/Sky Ambient Glow with Animation */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-400 blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ 
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-600 blur-[100px]"
                />
                 <motion.div 
                    animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, -50, 0],
                    }}
                    transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute left-10 top-1/4 -z-10 h-[200px] w-[200px] rounded-full bg-cyan-400 blur-[80px]"
                />
            </div>

            <Navigation />
            
            <main className="relative z-10 pt-24 pb-12 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <Outlet />
            </main>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;