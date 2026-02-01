import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaUser, FaTags } from 'react-icons/fa';
import { projects } from '../../data';
import './Projects.scss';
import { default as ReactMarkdown } from 'react-markdown';

// 3D Tilt Card Component
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

    const rotateX = useTransform(mouseY, [-200, 200], [5, -5]); // Reduced rotation for subtlety
    const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'In Development':
                return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400';
            case 'Completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <motion.div
            style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative perspective-1000"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group h-full flex flex-col border border-gray-100 dark:border-gray-700"
            >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 flex-shrink-0 transform-gpu z-10">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 right-4 translate-z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-sm ${getStatusColor(project.status)}`}>
                            {project.status}
                        </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <a
                            href={project.githubUrl}
                            className="flex-1 bg-white/20 backdrop-blur-md text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors border border-white/20"
                        >
                            <FaGithub />
                            <span className="text-sm">Code</span>
                        </a>
                        <a
                            href={project.liveUrl}
                            className="flex-1 bg-blue-600/80 backdrop-blur-md text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors border border-white/10"
                        >
                            <FaExternalLinkAlt />
                            <span className="text-sm">Demo</span>
                        </a>
                    </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col bg-white dark:bg-gray-800 transform-gpu z-20">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                    </div>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                            <FaUser />
                            <span>{project.role}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>{project.duration}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                        <ReactMarkdown>{project.description}</ReactMarkdown>
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-400 rounded-full text-xs font-medium border border-sky-100 dark:border-sky-800"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs border border-gray-200 dark:border-gray-600">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>

                    <motion.button
                        onClick={() => onClick(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-sky-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg shadow-blue-500/20"
                    >
                        <FaCode />
                        <span>View Details</span>
                    </motion.button>
                </div>
            </motion.div>
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
                    Featured{" "}
                    <span className="text-gradient bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent underline decoration-blue-500/30 underline-offset-8">
                        Projects
                    </span>
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
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
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