import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { education } from '../data';

const Education = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-primary-600 dark:text-primary-400">Education</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My academic journey and achievements in pursuing knowledge and excellence.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary-200 dark:bg-primary-800"></div>

            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 bg-primary-600 dark:bg-primary-400 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaGraduationCap className="text-white dark:text-gray-900" size={24} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        edu.status === 'Current' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        {edu.status}
                      </span>
                      <div className="flex items-center text-primary-600 dark:text-primary-400">
                        <FaCalendarAlt className="mr-2" size={14} />
                        <span className="text-sm font-medium">{edu.duration}</span>
                      </div>
                    </div>

                    {/* School Name */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {edu.school}
                    </h3>

                    {/* Degree */}
                    <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                      {edu.degree}
                    </h4>

                    {/* GPA */}
                    <div className="flex items-center mb-4">
                      <FaStar className="text-yellow-500 mr-2" size={16} />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        GPA: <span className="text-primary-600 dark:text-primary-400 font-bold">{edu.gpa}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Achievements/Highlights */}
                    {edu.school === 'FPT University' && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Highlights:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Active participation in coding competitions</li>
                          <li>• Leadership roles in student organizations</li>
                          <li>• Strong foundation in software development</li>
                        </ul>
                      </div>
                    )}

                    {edu.school === 'Phan Chau Trinh High School' && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Highlights:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Outstanding academic performance</li>
                          <li>• Strong mathematics and sciences background</li>
                          <li>• Active in extracurricular activities</li>
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Academic Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Throughout my academic journey, I have maintained a strong commitment to learning and 
                personal growth. My education has provided me with a solid foundation in computer science 
                principles and practical skills that I apply in real-world projects.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;