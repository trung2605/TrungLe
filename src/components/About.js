import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { personalInfo } from '../data';

const About = () => {
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

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      color: 'text-red-500'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: personalInfo.contact.phone,
      href: `tel:${personalInfo.contact.phone}`,
      color: 'text-green-500'
    },
    {
      icon: FaBirthdayCake,
      label: 'Birthday',
      value: personalInfo.contact.birthday,
      href: null,
      color: 'text-purple-500'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: personalInfo.contact.location,
      href: null,
      color: 'text-blue-500'
    },
    {
      icon: FaFacebook,
      label: 'Facebook',
      value: personalInfo.contact.facebook,
      href: 'https://facebook.com/trung.le',
      color: 'text-blue-600'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              About <span className="text-primary-600 dark:text-primary-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Get to know more about my background, interests, and how to reach me.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Personal Info Cards */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Personal Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${info.color}`}>
                        <info.icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium truncate block"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 dark:text-white font-medium truncate">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Who Am I?
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate Computer Science student at FPT University with a strong focus on 
                  Java development and modern web technologies. My journey in programming started with 
                  a curiosity about how software works, and it has evolved into a deep passion for 
                  creating innovative solutions.
                </p>
                <p>
                  Currently maintaining a GPA of 7.74/10.0, I actively engage in various university 
                  activities and leadership roles. As the founder of The Dreamers Organization, I lead 
                  initiatives that help fellow students grow their technical skills and pursue their dreams.
                </p>
                <p>
                  Beyond coding, I'm involved in multiple extracurricular activities including the Mic Home Club, 
                  FUM Club, and various university competitions. I believe in continuous learning and sharing 
                  knowledge with the community.
                </p>
                <p>
                  My goal is to become a skilled full-stack developer while contributing to meaningful 
                  projects that make a positive impact. I'm always excited to take on new challenges 
                  and collaborate with like-minded individuals.
                </p>
              </div>

              {/* Stats */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-6 mt-8"
              >
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">7.74</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">University GPA</div>
                </div>
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Active Projects</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;