import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { prizes } from '../data';

const Prizes = () => {
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

  const getPositionIcon = (position) => {
    if (position.includes('Winner') || position.includes('1st')) return FaTrophy;
    if (position.includes('Runner-up') || position.includes('2nd')) return FaMedal;
    if (position.includes('Finalist')) return FaStar;
    return FaTrophy;
  };

  const getPositionColor = (position) => {
    if (position.includes('Winner') || position.includes('1st')) return 'text-yellow-500';
    if (position.includes('Runner-up') || position.includes('2nd')) return 'text-gray-400';
    if (position.includes('Finalist')) return 'text-orange-500';
    return 'text-primary-500';
  };

  const getCardGradient = (position) => {
    if (position.includes('Winner') || position.includes('1st')) 
      return 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20';
    if (position.includes('Runner-up') || position.includes('2nd')) 
      return 'from-gray-50 to-gray-100 dark:from-gray-700/20 dark:to-gray-600/20';
    if (position.includes('Finalist')) 
      return 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20';
    return 'from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20';
  };

  return (
    <section id="prizes" className="py-20 bg-white dark:bg-gray-900">
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
              Awards & <span className="text-primary-600 dark:text-primary-400">Prizes</span>
            </h2>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Recognition and achievements earned through competitions, contests, and outstanding performance.
            </p>
          </motion.div>

          {/* Prizes Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {prizes.map((prize) => {
              const PositionIcon = getPositionIcon(prize.position);
              const positionColor = getPositionColor(prize.position);
              const cardGradient = getCardGradient(prize.position);

              return (
                <motion.div
                  key={prize.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${cardGradient} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700`}
                >
                  {/* Prize Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {prize.title}
                      </h3>
                      <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold mb-2">
                        <PositionIcon className={`mr-2 ${positionColor}`} size={20} />
                        {prize.position}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {prize.organization}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <FaCalendarAlt className="mr-1" size={14} />
                      <span className="text-sm font-medium">{prize.year}</span>
                    </div>
                  </div>

                  {/* Prize Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {prize.description}
                  </p>

                  {/* Achievement Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      prize.position.includes('Winner') 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : prize.position.includes('Runner-up')
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      <FaStar className="mr-1" size={12} />
                      Achievement
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className={`text-3xl ${positionColor}`}
                    >
                      <PositionIcon />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Achievement Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <FaTrophy className="text-yellow-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Winner</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700/20 rounded-xl">
              <FaMedal className="text-gray-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Runner-up</div>
            </div>
            <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <FaStar className="text-orange-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Finalist</div>
            </div>
            <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <FaTrophy className="text-primary-500 mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">Total Awards</div>
            </div>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-xl"
          >
            <div className="flex items-center justify-center mb-4">
              <FaTrophy className="text-primary-600 dark:text-primary-400 mr-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Striving for Excellence
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed italic">
              "Success is not final, failure is not fatal: it is the courage to continue that counts. 
              Each competition and challenge has been a stepping stone toward becoming a better developer and leader."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Prizes;