import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaHeart, FaRocket } from "react-icons/fa";
import { personalInfo } from "../../data";
import "./AboutPage.scss";
import Markdown from "react-markdown";

const AboutPage = () => {
  const stats = [
    {
      label: "Years of Study",
      value: "1+",
      icon: FaGraduationCap,
      color: "text-blue-600",
    },
    {
      label: "Projects Completed",
      value: "10+",
      icon: FaCode,
      color: "text-green-600",
    },
    {
      label: "Technologies",
      value: "15+",
      icon: FaRocket,
      color: "text-purple-600",
    },
    {
      label: "Passion Level",
      value: "100%",
      icon: FaHeart,
      color: "text-red-600",
    },
  ];

  const highlights = [
    {
      title: "Backend Expertise",
      description: "Specialized in Java development, particularly with the Spring Boot framework.",
      icon: "⚙️",
    },
    {
      title: "Modern Web Technologies",
      description: "Proficient in ReactJS and various modern web technologies.",
      icon: "🌐",
    },
    {
      title: "Complex Problem Solving",
      description: "Passionate about tackling complex programming challenges and optimizing solutions.",
      icon: "🧩",
    },
    {
      title: "Team Leadership & Management",
      description: "Proven experience in leading development teams and managing project timelines.",
      icon: "👥",
    },
];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-page__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-content"
        >
        </motion.div>
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
          <h2 className="story-title">My Story</h2>
          <div className="story-content">
            <Markdown>
              ## My Story

Hello! I'm **Lê Trí Trung**, a highly motivated Computer Science student at FPT University in Da Nang. My core expertise lies in **Java Spring Boot backend development** and modern web technologies, driven by a deep passion for creating clean, scalable, and impactful applications.

My technical journey began with foundational Java Core and quickly expanded into full-stack development, mastering **JavaScript ES6, React, HTML5/CSS3**. I thrive in collaborative, Agile environments and leverage tools like **Git/GitHub** for version control, demonstrated through various successful team projects.

Beyond coding, I possess strong soft skills, including **team leadership** and **project management**, gained through founding a charity organization and leading competitive coding teams. My goal is to apply my robust technical foundation and collaborative skills in a challenging Web Developer internship, contributing actively to a successful team.
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
          <h3 className="info-title">Personal Information</h3>
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
    </div>
  );
};

export default AboutPage;
