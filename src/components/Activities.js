import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaHandsHelping, FaMicrophone, FaMusic, FaRunning, FaTheaterMasks, FaUserTie } from 'react-icons/fa';
import { activities } from '../data';

const Activities = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const getActivityIcon = (title) => {
    if (title.includes('Innocode') || title.includes('ResFres')) return FaUsers;
    if (title.includes('Mic Home')) return FaMicrophone;
    if (title.includes('FUM')) return FaMusic;
    if (title.includes('Referee')) return FaRunning;
    if (title.includes('Ambassador')) return FaUserTie;
    if (title.includes('Acting')) return FaTheaterMasks;
    return FaHandsHelping;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRoleColor = (role) => {
    if (role === 'Leader') return 'text-purple-600 dark:text-purple-400';
    if (role === 'Core Member') return 'text-blue-600 dark:text-blue-400';
    if (role === 'Ambassador') return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <section id="activities" className="py-20 bg-gray-50 dark:bg-gray-800">
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
              My <span className="text-primary-600 dark:text-primary-400">Activities</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Active participation in various clubs, organizations, and community initiatives that have shaped my leadership and interpersonal skills.
            </p>
          </motion.div>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.title);
              const statusColor = getStatusColor(activity.status);
              const roleColor = getRoleColor(activity.role);

              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  {/* Activity Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-3">
                        <ActivityIcon className="text-primary-600 dark:text-primary-400" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt className="mr-1" size={12} />
                      <span className="text-xs">{activity.duration}</span>
                    </div>
                  </div>

                  {/* Activity Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {activity.title}
                  </h3>

                  {/* Role and Organization */}
                  <div className="mb-3">
                    <p className={`font-semibold ${roleColor} text-sm mb-1`}>
                      {activity.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {activity.organization}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Activities Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <FaUsers className="text-primary-600 dark:text-primary-400 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">7+</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Organizations</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <FaHandsHelping className="text-green-600 dark:text-green-400 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Active Roles</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <FaMicrophone className="text-purple-600 dark:text-purple-400 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Leadership Positions</div>
            </div>
          </motion.div>

          {/* Leadership Philosophy */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-xl"
          >
            <div className="flex items-center justify-center mb-4">
              <FaUsers className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Leadership & Community
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Through my involvement in various activities and organizations, I've developed strong leadership skills, 
              learned the importance of teamwork, and discovered the joy of contributing to meaningful causes. 
              Each experience has enriched my perspective and helped me grow both personally and professionally.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;