import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaHeart, FaRocket } from "react-icons/fa";
import { personalInfo, stats, highlights, experienceBlocks } from "../../data";
import { useEffect } from "react";
import "./About.scss";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";

const About = () => {
  useEffect(() => {
    const titles = document.querySelectorAll('.core-title');
    if (titles.length === 0) return;

    // 2. Reset chiều cao và tìm chiều cao lớn nhất
    let maxHeight = 0;
    titles.forEach(title => {
        title.style.minHeight = 'auto'; 
        const height = title.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    titles.forEach(title => {
        title.style.minHeight = `${maxHeight}px`;
    });
}, [experienceBlocks]); 



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

      {/* Stats Section */}
      <section className="about-page__stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="stat-card"
            >
              <div
                className={`stat-icon stat-icon--${
                  stat.color.includes("blue")
                    ? "blue"
                    : stat.color.includes("green")
                    ? "green"
                    : stat.color.includes("purple")
                    ? "purple"
                    : "red"
                }`}
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">{personalInfo.story.title}</h2>
          <div className="story-content dark:text-white text-gray-900">
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
          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">🎂</span>
              <div>
                <div className="info-label">Date of Birth</div>
                <div className="info-value">
                  {personalInfo.contact.birthday}
                </div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <div className="info-label">Location</div>
                <div className="info-value">
                  {personalInfo.contact.location}
                </div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📚</span>
              <div>
                <div className="info-label">Education</div>
                <div className="info-value">FPT University</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💼</span>
              <div>
                <div className="info-label">Specialization</div>
                <div className="info-value">Java Developer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Highlights */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          My Highlights
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{highlight.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
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

      {/* Experience Blocks */}
      <section className="mt-20 py-8">
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
    >
        My Core Strengths & Experience
    </motion.h2>

    <div className="max-w mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-auto">
        {experienceBlocks.map((block, index) => (
            <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -3, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)" }}
                
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 border-t-4 
                border-dark-500 hover:border-blue-500 dark:hover:border-blue-400 h-full flex flex-col"
            >
                <div className="flex flex-col items-center text-center">
                    
                    <div className={`p-4 mb-4 text-4xl rounded-full text-white ${block.color} shadow-lg`}>
  
                        <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center text-3xl`}>
                            {block.icon}
                        </div>
                    </div>
                    
                    <h3 className="core-title text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {block.title}
                    </h3>
                    <p className="core-text text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <Markdown>
                        {block.description}
                      </Markdown>
                    </p>
                </div>
            </motion.div>
        ))}
    </div>
</section>
    </div>
  );
};

export default About;
