import React from "react";
import { motion } from "framer-motion";
import { personalInfo, stats, highlights } from "../../data";
import { useEffect } from "react";
import "./About.scss";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";

const About = () => {
    // useEffect removed - no longer needed for core-title resizing

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-page__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        ></motion.div>
      </section>

      {/* Stats Section with 3D Float */}
      <section className="about-page__stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                  y: -10, 
                  rotateX: 10, 
                  rotateY: -5,
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 300 }
              }}
              className="stat-card transform-gpu perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className={`stat-icon stat-icon--blue`}
              >
                <stat.icon className="mx-auto" />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="about-page__content">
        {/* Personal Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-page__story"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 relative inline-block">
              <span className="relative z-10">{personalInfo.story.title}</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full" />
          </h2>
          <div className="story-content dark:text-white text-gray-900 leading-loose">
            <Markdown>
              {personalInfo.story.content}
            </Markdown>
          </div>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-page__info"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Personal Information</h3>
          <div className="info-list space-y-6">
            <div className="info-item p-4 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300">
              <span className="info-icon text-2xl">🎂</span>
              <div>
                <div className="info-label text-sm text-gray-500">Date of Birth</div>
                <div className="info-value font-medium text-lg">
                  {personalInfo.contact.birthday}
                </div>
              </div>
            </div>
            <div className="info-item p-4 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300">
              <span className="info-icon text-2xl">📍</span>
              <div>
                <div className="info-label text-sm text-gray-500">Location</div>
                <div className="info-value font-medium text-lg">
                  {personalInfo.contact.location}
                </div>
              </div>
            </div>
            <div className="info-item p-4 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300">
              <span className="info-icon text-2xl">📚</span>
              <div>
                <div className="info-label text-sm text-gray-500">Education</div>
                <div className="info-value font-medium text-lg">FPT University</div>
              </div>
            </div>
            <div className="info-item p-4 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300">
              <span className="info-icon text-2xl">💼</span>
              <div>
                <div className="info-label text-sm text-gray-500">Specialization</div>
                <div className="info-value font-medium text-lg">Java Developer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Highlights */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          My Highlights
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ImageSlider />


    </div>
  );
};

export default About;
