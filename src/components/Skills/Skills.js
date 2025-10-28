import React from "react";
import { motion } from "framer-motion";
import { skills, allSkillsData } from "../../data";
import "./Skills.scss";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1, // Bắt đầu hiệu ứng trễ 0.1s
        staggerChildren: 0.05, // Mỗi thẻ con sẽ bắt đầu trễ 0.05s so với thẻ trước
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const getItemVariants = (index) => {
    const direction = index % 2 === 0 ? -100 : 100;

    return {
      hidden: { x: direction, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
    };
  };

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
        />
      </div>
    </div>
  );

  return (
    <div className="skills-page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Skills &{" "}
          <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Expertise
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A comprehensive overview of the technical and soft skills I've
          developed through academic studies and professional projects.
        </p>
      </motion.div>

      {/* Skills Grid (Skill Bars) */}
      <div className="grid lg:grid-cols-2 gap-8">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
              {category.category}
            </h2>

            <div className="space-y-4">
              {category.items.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: categoryIndex * 0.1 + skillIndex * 0.1,
                    duration: 0.4,
                  }}
                >
                  <SkillBar skill={skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Highlights (Skill Cards) */}
      <section className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Technology Stack
          </h2>
        </motion.div>

        <motion.div
          // Giữ nguyên containerVariants
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Chạy khi cuộn tới
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {allSkillsData.map((tech, index) => (
            <motion.div
              key={index}
              // >>> ÁP DỤNG HÀM getItemVariants CHO MỖI ITEM <<<
              variants={getItemVariants(index)}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="skill-tag"
            >
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-base font-medium shadow-sm transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-600">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Skills;
