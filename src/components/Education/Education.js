import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaStar, FaSchool } from 'react-icons/fa';
import { education } from '../../data';
import './Education.scss';
import Markdown from 'react-markdown';
import MemoryGallery from './MemoryGallery';


const Education = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="education-page">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <FaGraduationCap className="inline-block mr-4 text-blue-600 animate-bounce" />
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-textShine">
                Education
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My educational journey and academic achievements
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="relative perspective-1000"
            >
              {/* Timeline line */}
              {index < education.length - 1 && (
                <div className="absolute left-8 top-20 bottom-[-48px] w-0.5 bg-gradient-to-b from-blue-500 to-sky-300 dark:to-sky-900 z-0"></div>
              )}
              
              {/* Education card */}
              <div className="flex items-start space-x-8 group">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-gray-900">
                  <FaSchool className="text-white text-2xl" />
                </div>
                
                {/* Content */}
                <motion.div 
                    whileHover={{ 
                        scale: 1.02, 
                        rotateY: 2, 
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-300 transform-gpu"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {edu.school}
                      </h3>
                      <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold tracking-wide shadow-sm ${
                        edu.status === 'Current' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 ring-2 ring-green-500/20'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 ring-2 ring-blue-500/20'
                      }`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                        <FaCalendarAlt />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{edu.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg text-yellow-600 dark:text-yellow-400">
                        <FaStar />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-bold">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      <Markdown>
                        {edu.description}
                      </Markdown>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white flex items-center justify-center gap-3">
                <span>📸</span> 
                <span>Campus Memories</span>
            </h2>
            <MemoryGallery />
        </div>
      </div>
    </div>
  );
};

export default Education;
