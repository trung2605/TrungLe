// src/pages/PrizesPage/PrizesPage.js

import React from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa"; 
import { prizes } from "../../data";
import "./Prizes.scss";
import Markdown from "react-markdown";

const Prizes = () => {

  const getPositionIcon = (position) => {
    if (
      position.toLowerCase().includes("winner") ||
      position.toLowerCase().includes("first")
    ) {
      return FaTrophy;
    } else if (
      position.toLowerCase().includes("runner-up") ||
      position.toLowerCase().includes("second")
    ) {
      return FaMedal;
    } else if (
      position.toLowerCase().includes("finalist") ||
      position.toLowerCase().includes("final")
    ) {
      return FaStar;
    }
    return FaTrophy;
  };

  const getPositionColor = (position) => {
    if (
      position.toLowerCase().includes("winner") ||
      position.toLowerCase().includes("first")
    ) {
      // Winner - Bright Sky/Blue
      return "from-sky-400 to-blue-500";
    } else if (
      position.toLowerCase().includes("runner-up") ||
      position.toLowerCase().includes("second")
    ) {
      // Runner-up - Blue/Sky
      return "from-blue-500 to-sky-600"; 
    } else if (
      position.toLowerCase().includes("finalist") ||
      position.toLowerCase().includes("final")
    ) {
      // Finalist - Sky/Blue (Darker)
      return "from-sky-600 to-blue-700";
    }
    // Default - Slate/Gray or Blue-Gray
    return "from-slate-500 to-slate-700";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="prizes-page">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <FaTrophy className="inline-block mr-4 text-sky-500" />
            Prizes & Awards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recognition and achievements in various competitions and contests
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {/* Stat Cards */}
          <div className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-sky-100 dark:border-sky-900 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Awards</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{prizes.length}</p>
              </div>
              <FaTrophy className="text-4xl text-sky-200 dark:text-sky-800" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-sky-100 dark:border-sky-900 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Organizations</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {new Set(prizes.map((p) => p.organization)).size}
                </p>
              </div>
              <FaBuilding className="text-4xl text-sky-200 dark:text-sky-800" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-sky-100 dark:border-sky-900 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Years Active</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {new Set(prizes.map((p) => p.year)).size}
                </p>
              </div>
              <FaCalendarAlt className="text-4xl text-sky-200 dark:text-sky-800" />
            </div>
          </div>
        </motion.div>

        {/* Prizes Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="prize-timeline"
        >
          {prizes.map((prize, index) => {
            const IconComponent = getPositionIcon(prize.position);
            const colorClass = getPositionColor(prize.position);
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={prize.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`timeline-item ${isLeft ? "left" : "right"}`}
              >
                {/* Card Giải Thưởng */}
                <div className="timeline-card-wrapper">
                  <div className="timeline-card bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div
                      className={`timeline-card-header bg-gradient-to-r ${colorClass} text-white`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="text-2xl text-white/90" />
                        <h3 className="text-xl font-bold">{prize.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="bg-white/20 rounded-lg px-3 py-1 backdrop-blur-sm">
                          <span className="text-sm font-medium">
                            {prize.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {prize.position}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        <Markdown>{prize.description}</Markdown>
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <FaBuilding className="text-sky-500" />
                          <span>{prize.organization}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Prizes;
