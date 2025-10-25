import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaUser, FaTags } from 'react-icons/fa';
import { projects } from '../../data';
import './ProjectsPage.scss';
import { default as ReactMarkdown } from 'react-markdown';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'Tất cả dự án', count: projects.length },
    { value: 'Active', label: 'Đang hoạt động', count: projects.filter(p => p.status === 'Active').length },
    { value: 'In Development', label: 'Đang phát triển', count: projects.filter(p => p.status === 'In Development').length },
    { value: 'Completed', label: 'Hoàn thành', count: projects.filter(p => p.status === 'Completed').length }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

    //
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="projects-page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Dự án của{' '}
          <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            tôi
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Khám phá những dự án tôi đã và đang phát triển, từ ứng dụng web đến hệ thống phức tạp
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {statusOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === option.value
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Quick Links */}
              <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.githubUrl}
                  className="flex-1 bg-white/20 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-colors"
                >
                  <FaGithub />
                  <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.liveUrl}
                  className="flex-1 bg-blue-600/80 backdrop-blur-sm text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                >
                  <FaExternalLinkAlt />
                  <span className="text-sm">Demo</span>
                </a>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Role and Duration */}
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

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>

              {/* View Details Button */}
              <motion.button
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaCode />
                <span>Xem chi tiết</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FaUser />
                  <span>Vai trò: {selectedProject.role}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FaCalendarAlt />
                  <span>Thời gian: {selectedProject.duration}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {/* Markdown */}
                <ReactMarkdown>{selectedProject.description}</ReactMarkdown>
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                  <FaTags />
                  <span>Công nghệ sử dụng</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={selectedProject.githubUrl}
                  className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <FaGithub />
                  <span>Xem mã nguồn</span>
                </a>
                <a
                  href={selectedProject.liveUrl}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
                >
                  <FaExternalLinkAlt />
                  <span>Xem demo</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsPage;