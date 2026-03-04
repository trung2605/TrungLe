
import { motion } from "framer-motion";
import { personalInfo, stats, highlights } from "../../data";
import "./About.scss";
import Markdown from "react-markdown";
import ImageSlider from "./ImageSlider";
import { FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import BlurText from "../../animations/BlurText";
import ShinyText from "../../animations/ShinyText";
import DecryptedText from "../../animations/DecryptedText";
import SpotlightCard from "../../animations/SpotlightCard";

const About = () => {
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
              <div className={`stat-icon stat-icon--blue`}>
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
              <span className="relative z-10">
                <BlurText
                  text={personalInfo.story.title}
                  delay={40}
                  animateBy="words"
                  direction="left"
                />
              </span>
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
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            <ShinyText
              text="Personal Information"
              color="currentColor"
              shineColor="#38bdf8"
              speed={4}
              className="text-gray-900 dark:text-white font-bold"
            />
          </h3>
          <div className="info-list space-y-6">
            {[
              { icon: FaBirthdayCake, color: 'text-blue-500', label: 'Date of Birth', value: personalInfo.contact.birthday },
              { icon: FaMapMarkerAlt, color: 'text-red-500', label: 'Location', value: personalInfo.contact.location },
              { icon: FaGraduationCap, color: 'text-purple-500', label: 'Education', value: 'FPT University' },
              { icon: FaBriefcase, color: 'text-orange-500', label: 'Specialization', value: 'Java Developer' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="info-item p-4 rounded-xl hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <span className={`info-icon text-2xl ${item.color}`}><item.icon /></span>
                <div>
                  <div className="info-label text-sm text-gray-500">{item.label}</div>
                  <div className="info-value font-medium text-lg">
                    <DecryptedText
                      text={item.value}
                      speed={25}
                      maxIterations={6}
                      sequential={true}
                      revealDirection="start"
                      animateOn="view"
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
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
          <BlurText
            text="My Highlights"
            delay={50}
            animateBy="words"
            direction="bottom"
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <SpotlightCard
                spotlightColor="rgba(129, 140, 248, 0.15)"
                className="rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group p-8"
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="text-4xl bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                      {highlight.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      <ImageSlider />
    </div>
  );
};

export default About;
