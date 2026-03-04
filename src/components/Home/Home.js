import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import "./Home.scss";
import { siteNavigation } from "../../data";
import { personalInfo } from "../../data";
import { skills, allSkillsData } from "../../data";
import BlurText from "../../animations/BlurText";
import ShinyText from "../../animations/ShinyText";
import CountUp from "../../animations/CountUp";
import RotatingText from "../../animations/RotatingText";
import DecryptedText from "../../animations/DecryptedText";
import Aurora from "../../animations/Aurora";
import Particles from "../../animations/Particles";
import SpotlightCard from "../../animations/SpotlightCard";
import Waves from "../../animations/Waves";

const Home = () => {
    // Skills Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.05,
            },
        },
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
                    className="bg-gradient-to-r from-sky-400 to-blue-500 h-2 rounded-full"
                />
            </div>
        </div>
    );

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="lg:py-32 relative">
        <div 
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw] -z-10 opacity-30 dark:opacity-50 pointer-events-none" 
          style={{ minHeight: '120%' }}
        >
          <Aurora
            colorStops={['#38bdf8', '#818cf8', '#60a5fa']}
            amplitude={1.2}
            blend={0.8}
            speed={0.8}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-sm font-medium mb-4 border border-sky-200 dark:border-sky-800">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white"
            >
              <BlurText
                text="Xin chào tôi là"
                delay={60}
                animateBy="words"
                direction="top"
                className="block"
              />
              <span className="block mt-2 text-gradient bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                <DecryptedText
                  text="Lê Trí Trung"
                  speed={100}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                  className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
                />
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium flex items-center gap-3 flex-wrap"
            >
              <span>I am a</span>
              <RotatingText
                texts={[
                  "Java Developer",
                  "CS Student",
                  "Problem Solver",
                  "Backend Engineer",
                ]}
                mainClassName="inline-flex items-center px-4 py-1 bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 rounded-lg font-semibold text-xl"
                rotationInterval={2500}
                staggerDuration={0.025}
                staggerFrom="last"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
              />
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
                className="btn-primary inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95"
              >
                <span>View Projects</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >🚀</motion.span>
              </Link>

              <a
                href={personalInfo.cv}
                download="Le_Tri_Trung_Java_Developer_CV.pdf"
                className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
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
              <span className="text-gray-600 dark:text-gray-400">Connect with me:</span>
              <div className="flex space-x-4">
                <motion.a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  <FaGithub size={24} />
                </motion.a>
                <motion.a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <FaLinkedin size={24} />
                </motion.a>
                <motion.a
                  href={personalInfo.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition-colors duration-200"
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a
                  href={personalInfo.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <FaFacebook size={24} />
                </motion.a>
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
                className="absolute inset-0 rounded-full border-2 border-sky-200 dark:border-sky-800 opacity-30 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-blue-200 dark:border-blue-800 opacity-20 border-dotted"
              />

               {/* Tech Orbit Ring */}
               <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 rounded-full border border-sky-500/10"
              >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-0 left-1/2 w-4 h-4 bg-sky-500 rounded-full blur-[2px]"
                  />
              </motion.div>

              {/* Main content area */}
              <div className="absolute inset-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <div className="text-6xl w-full h-full relative group">
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 z-10" />
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating tech icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <span className="text-2xl">🛠️</span>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <span className="text-2xl">🧑‍💻</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden relative">
        {/* Subtle particles background */}
        <div className="absolute inset-0 opacity-30">
          <Particles
            particleCount={30}
            speed={0.3}
            particleColors={['#38bdf8', '#818cf8', '#60a5fa']}
            moveParticlesOnHover={false}
            particleBaseSize={1.5}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10"
        >
          {[
            { value: 10, suffix: '+', label: 'Projects', color: 'text-blue-600 dark:text-blue-400' },
            { value: 5, suffix: '+', label: 'Certificates', color: 'text-sky-600 dark:text-sky-400' },
            { value: 15, suffix: '+', label: 'Skills', color: 'text-cyan-600 dark:text-cyan-400' },
            { value: 3, suffix: '+', label: 'Awards', color: 'text-indigo-600 dark:text-indigo-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="decorative-stat bg-transparent shadow-none border-none"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`text-3xl lg:text-4xl font-bold ${stat.color}`}>
                <CountUp
                  to={stat.value}
                  from={0}
                  duration={2}
                  delay={index * 0.1}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 lg:py-32">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <BlurText
                text="Skills &"
                delay={50}
                animateBy="words"
                direction="bottom"
                className="inline"
              />
              {" "}
              <ShinyText
                text="Expertise"
                color="#38bdf8"
                shineColor="#ffffff"
                speed={3}
                className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent"
              />
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of the technical and soft skills I've
            developed through academic studies and professional projects.
            </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skills.map((category, categoryIndex) => (
            <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
                <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                     <span className="text-2xl">{category.icon}</span>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {category.category}
                     </h3>
                </div>

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

        {/* Tech Stack Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto"
        >
          {allSkillsData.map((tech, index) => (
            <motion.div
              key={index}
              variants={getItemVariants(index)}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="skill-tag cursor-default"
            >
              <div className="skill-item">
                <span className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-base font-medium shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 inline-block">
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="py-24 relative overflow-visible">
        {/* Full-width Waves Background */}
        <div 
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100vw] -z-10 opacity-30 dark:opacity-40 pointer-events-none"
        >
          <Waves 
            lineColor="rgba(56, 189, 248, 0.4)"
            backgroundColor="transparent"
            waveSpeedX={0.015}
            waveSpeedY={0.01}
            waveAmpX={35}
            waveAmpY={20}
            friction={0.93}
            tension={0.01}
            xGap={12}
            yGap={34}
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16"
        >
          <BlurText
            text="Explore More About Me"
            delay={40}
            animateBy="words"
            direction="bottom"
          />
        </motion.h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteNavigation.slice(1).filter(item => item.title !== "Skills").map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="navigation-group"
              >
                <SpotlightCard
                  spotlightColor="rgba(56, 189, 248, 0.14)"
                  className="rounded-xl h-full"
                >
                  <Link
                    to={item.path}
                    className="block p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <motion.div
                      className="text-4xl mb-6 inline-block"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        {item.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                      {item.desc}
                    </p>
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
