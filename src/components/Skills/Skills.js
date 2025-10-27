import React from "react";
import { motion } from "framer-motion";
import { skills, allSkillsData } from "../../data";
import './Skills.scss';

const Skills = () => {
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
                    A comprehensive overview of the technical and soft skills I've developed through academic studies and professional projects.
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

                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {" "}
                    {allSkillsData.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group"
                        >
                            <div
                                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="text-4xl mb-3">{tech.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                                
                                <div className="text-sm opacity-90">
                                    Proficiency: {tech.level}%
                                </div>

                                <div className="absolute top-4 right-4">
                                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                                        <span className="text-xs font-bold">{tech.level}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Skills;