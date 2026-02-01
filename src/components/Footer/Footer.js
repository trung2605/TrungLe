import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { socialLinks, siteNavigation, personalInfo } from '../../data';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const getSocialIcon = (name) => {
        const icons = {
            facebook: FaFacebook,
            github: FaGithub,
            linkedin: FaLinkedin,
            email: FaEnvelope
        };
        return icons[name.toLowerCase()] || FaEnvelope;
    };

    return (
        <footer className="relative bg-white dark:bg-slate-950 pt-20 pb-10 overflow-hidden border-t border-slate-200 dark:border-slate-800">
            {/* Decorative Background Mesh - Blue Theme */}
            <div className="absolute inset-0 opacity-50 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                                LT
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Lê Trí Trung</h3>
                                <p className="text-sm text-sky-500 dark:text-sky-400 font-medium">Full Stack Developer</p>
                            </div>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                            Passionate about building scalable applications and crafting intuitive user experiences. 
                            Always learning, always coding.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const Icon = getSocialIcon(social.name);
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-sky-500/30"
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h4 className="font-heading font-bold text-slate-900 dark:text-white mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {siteNavigation.map((item) => (
                                <li key={item.path}>
                                    <Link 
                                        to={item.path} 
                                        className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-sky-500 mr-3 transition-colors" />
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-3">
                        <h4 className="font-heading font-bold text-slate-900 dark:text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                                <span className="mt-1 text-sky-500">📍</span>
                                <span>{personalInfo.contact.location}</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                                <span className="text-sky-500">📧</span>
                                <a href={`mailto:${personalInfo.contact.email}`} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                    {personalInfo.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-slate-500 dark:text-slate-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Lê Trí Trung. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-500">
                        <span>Made with</span>
                        <FaHeart className="text-rose-500 animate-pulse" />
                        <span>and React</span>
                    </div>
                </div>
            </div>

            {/* Scroll to Top */}
            <motion.button
                onClick={scrollToTop}
                className="absolute bottom-8 right-8 p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors z-20"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaArrowUp />
            </motion.button>
        </footer>
    );
};

export default Footer;