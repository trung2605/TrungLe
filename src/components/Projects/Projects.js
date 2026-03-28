import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaUser, FaTags, FaChevronRight } from 'react-icons/fa';
import { projects } from '../../data';
import './Projects.scss';
import { default as ReactMarkdown } from 'react-markdown';
import BlurText from '../../animations/BlurText';
import ShinyText from '../../animations/ShinyText';
import SpotlightCard from '../../animations/SpotlightCard';

// Cinematic Film-Frame Project Card Component
const ProjectCard = ({ project, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = clientX - left - width / 2;
        const yPct = clientY - top - height / 2;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500';
            case 'In Development': return 'bg-amber-500';
            case 'Completed': return 'bg-blue-600';
            default: return 'bg-slate-500';
        }
    };

    return (
        <motion.div
            style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000 h-full group"
        >
            <div className="h-full flex flex-col bg-transparent relative">
                {/* ── THE ARTISTIC FRAME (FILM STYLE) ── */}
                <div className="p-4 pb-12 bg-white dark:bg-slate-900 rounded-[2.5rem] rounded-b-none border border-gray-100 dark:border-slate-800 shadow-xl relative transition-all duration-700 group-hover:-rotate-2">
                    {/* Status Badge */}
                    <div className="absolute top-8 right-8 z-20">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black text-white uppercase tracking-widest shadow-xl backdrop-blur-md ${getStatusColor(project.status)}/90`}>
                            {project.status}
                        </span>
                    </div>

                    <div className="relative rounded-[2rem] overflow-hidden aspect-[16/10] bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-inner">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:blur-[1px]"
                        />
                        
                        {/* Cinematic Overlay & Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                            <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all"
                                >
                                    <FaGithub className="text-2xl" />
                                </a>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-full bg-blue-600/80 border border-blue-400/30 flex items-center justify-center text-white hover:bg-blue-600 transition-all"
                                >
                                    <FaExternalLinkAlt className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Film Metadata Decoration */}
                    <div className="mt-6 flex justify-center opacity-30 select-none">
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
                             PROJECT • REF_{project.id || 'N01'} • MNT_2025
                        </span>
                    </div>
                </div>

                {/* ── CONTENT AREA ── */}
                <div 
                    className="flex-1 p-8 md:p-10 bg-white dark:bg-slate-900 rounded-b-[2.5rem] border border-gray-100 dark:border-slate-800 border-t-0 shadow-2xl relative z-10"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        {project.techStack?.slice(0, 1).map((tech, i) => (
                           <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] uppercase font-black tracking-widest rounded-full border border-blue-100 dark:border-blue-900/50">
                               {tech}
                           </span> 
                        ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-500">
                        {project.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-slate-400 dark:text-slate-500 text-xs font-bold">
                        <div className="flex items-center gap-1.5">
                            <FaUser className="text-[10px]" />
                            {project.role}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaCalendarAlt className="text-[10px]" />
                            {project.duration}
                        </div>
                    </div>

                    <div className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                    </div>

                    <button
                        onClick={() => onClick(project)}
                        className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl active:scale-95 border border-white/10"
                    >
                        <span>View Details</span>
                        <FaChevronRight className="text-[8px]" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const statusOptions = [
        { value: 'all', label: 'All Projects', count: projects.length },
        { value: 'Active', label: 'Active', count: projects.filter(p => p.status === 'Active').length },
        { value: 'In Development', label: 'In Dev', count: projects.filter(p => p.status === 'In Development').length },
        { value: 'Completed', label: 'Completed', count: projects.filter(p => p.status === 'Completed').length }
    ];

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'In Development':
                return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400';
            case 'Completed':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="projects-page min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                    <BlurText
                      text="Featured"
                      delay={50}
                      animateBy="words"
                      direction="bottom"
                      className="inline"
                    />
                    {' '}
                    <ShinyText
                      text="Projects"
                      color="#38bdf8"
                      shineColor="#ffffff"
                      speed={3}
                      className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
                    />
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    A showcase of my technical journey through code, architecture, and design.
                </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-16"
            >
                {statusOptions.map((option, index) => (
                    <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform ${
                            filter === option.value
                                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg scale-105 shadow-blue-500/25'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700'
                        }`}
                    >
                        {option.label}
                        <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${
                            filter === option.value ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                        }`}>
                            {option.count}
                        </span>
                    </button>
                ))}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
                {filteredProjects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onClick={setSelectedProject} 
                    />
                ))}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-72 lg:h-96 object-cover rounded-t-3xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-6 right-6 bg-black/30 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/50 transition-colors border border-white/20"
                            >
                                &times;
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-shadow-lg">
                                    {selectedProject.title}
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md ${getStatusColor(selectedProject.status).replace('text-green-800', 'text-white bg-green-500/80').replace('text-sky-800', 'text-white bg-sky-500/80').replace('text-blue-800', 'text-white bg-blue-500/80').replace('text-gray-800', 'text-white bg-gray-500/80')}`}>
                                        {selectedProject.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-10">
                            <div className="grid md:grid-cols-3 gap-8 mb-8">
                                <div className="md:col-span-2">
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Project</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                        <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 mb-3">
                                            <FaUser className="text-blue-500" />
                                            <span className="font-semibold">Role</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 pl-7">{selectedProject.role}</p>
                                    </div>
                                    <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 mb-3">
                                            <FaCalendarAlt className="text-blue-500" />
                                            <span className="font-semibold">Timeline</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 pl-7">{selectedProject.duration}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                                    <FaTags className="text-blue-500" />
                                    <span>Technology Stack</span>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600 shadow-sm hover:border-blue-400 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <a
                                    href={selectedProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gray-900 dark:bg-black text-white py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    <FaGithub size={20} />
                                    <span className="font-semibold">View Source</span>
                                </a>
                                <a
                                    href={selectedProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-sky-600 text-white py-4 rounded-xl flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-sky-700 transition-all shadow-lg hover:shadow-xl shadow-blue-500/30 hover:-translate-y-1"
                                >
                                    <FaExternalLinkAlt size={18} />
                                    <span className="font-semibold">Live Demo</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Projects;