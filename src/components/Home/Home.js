import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import "./Home.scss";
import { siteNavigation } from "../../data";
import { personalInfo } from "../../data";
import { p } from "framer-motion/client";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white"
            >
              Xin chào tôi là {" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lê Trí Trung
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium"
            >
              Java Developer & Computer Science Student
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
              I am a Computer Science student at FPT University with a passion
              for software development and technology. Specializing in Java
              development, I am always seeking opportunities to learn and
              contribute to meaningful projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/projects"
                className="btn-primary inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <span>View Projects</span>
                <span>🚀</span>
              </Link>

              <a
                href={personalInfo.cv}
                download="Le_Tri_Trung_Java_Developer_CV.pdf"
                className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <FaDownload size={16} />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center space-x-6 pt-4"
            >
              <span className="text-gray-600 dark:text-gray-400">
                Connect with me:
              </span>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Animation Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Floating background shapes */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-800 opacity-30"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-purple-200 dark:border-purple-800 opacity-20"
              />

              {/* Main content area - could be profile image or 3D scene */}
              <div className="absolute inset-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <div className="text-6xl">
                  <img
                    src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-6/571167866_1338883744350372_5768014356160527082_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=93baGp6ujP4Q7kNvwHm5Vik&_nc_oc=AdnyJBoFguhPy7E909bNBOXKyJFZVTgXvXyee_zWHjrhudSVqvcU2mhTc4uIqQFHtOM&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&_nc_gid=JCReofCA5JGt4XnsDW-nJQ&oh=00_AfeUdMNnqhAvsHtRTQvtQ-48b-gGz6uT3C8CfCAwb5lKWA&oe=69023692"
                    alt="Profile"
                    className="rounded-full"
                  />
                </div>
              </div>

              {/* Floating tech icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
              >
                <span className="text-2xl">🛠️</span>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
              >
                <span className="text-2xl">🧑‍💻</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          <div className="decorative-stat shadow-md">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">
              10+
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Projects
            </div>
          </div>
          <div className="decorative-stat shadow-md">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">
              5+
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Certificates
            </div>
          </div>
          <div className="decorative-stat shadow-md">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
              15+
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Skills</div>
          </div>
          <div className="decorative-stat shadow-md">
            <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400">
              3+
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Awards</div>
          </div>
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Explore More About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteNavigation.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                to={item.path}
                className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
