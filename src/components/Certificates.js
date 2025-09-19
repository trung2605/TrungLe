import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCalendarAlt, FaAward } from 'react-icons/fa';
import { certificates } from '../data';

const Certificates = () => {
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

  return (
    <section id="certificates" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              My <span className="text-primary-600 dark:text-primary-400">Certificates</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional certifications and achievements that validate my skills and commitment to continuous learning.
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full">
                      <FaCertificate className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center text-white">
                      <FaCalendarAlt className="mr-2" size={14} />
                      <span className="text-sm font-medium">{cert.year}</span>
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certificates Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-xl"
          >
            <div className="flex items-center justify-center mb-4">
              <FaAward className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Commitment to Excellence
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These certifications represent my dedication to professional development and mastery of 
              essential skills. I continuously seek opportunities to validate and expand my knowledge 
              through recognized programs and assessments.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;