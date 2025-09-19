import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaReact, FaTools, FaUsers } from 'react-icons/fa';
import { skills } from '../data';

const Skills = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const categoryIcons = {
    'Programming Languages': FaCode,
    'Frameworks & Libraries': FaReact,
    'Tools & Technologies': FaTools,
    'Soft Skills': FaUsers
  };

  const categoryColors = {
    'Programming Languages': 'from-blue-500 to-blue-600',
    'Frameworks & Libraries': 'from-green-500 to-green-600',
    'Tools & Technologies': 'from-purple-500 to-purple-600',
    'Soft Skills': 'from-orange-500 to-orange-600'
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              My <span className="text-primary-600 dark:text-primary-400">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Here are the technologies and skills I've developed throughout my journey as a developer.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {skills.map((skillCategory, categoryIndex) => {
              const IconComponent = categoryIcons[skillCategory.category];
              const gradientColor = categoryColors[skillCategory.category];
              
              return (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Category Header */}
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${gradientColor} text-white mr-4`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skillCategory.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            className={`h-full bg-gradient-to-r ${gradientColor} rounded-full relative`}
                          >
                            {/* Animated shimmer effect */}
                            <motion.div
                              animate={{ x: [-100, 100] }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 2, 
                                ease: "linear",
                                delay: skillIndex * 0.2 
                              }}
                              className="absolute inset-0 bg-white/20 w-4 rounded-full"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">2+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Projects</div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
              Currently focusing on advanced Java frameworks, cloud technologies, and modern frontend development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;