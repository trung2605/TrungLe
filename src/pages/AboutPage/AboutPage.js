import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaHeart, FaRocket } from 'react-icons/fa';
import { personalInfo } from '../../data';
import './AboutPage.scss';

const AboutPage = () => {
  const stats = [
    { label: 'Years of Study', value: '1+', icon: FaGraduationCap, color: 'text-blue-600' },
    { label: 'Projects Completed', value: '10+', icon: FaCode, color: 'text-green-600' },
    { label: 'Technologies', value: '15+', icon: FaRocket, color: 'text-purple-600' },
    { label: 'Passion Level', value: '100%', icon: FaHeart, color: 'text-red-600' }
  ];

  const highlights = [
    {
      title: 'Backend Development',
      description: 'Chuyên sâu về Java development với Spring Boot framework',
      icon: '⚙️'
    },
    {
      title: 'Web Technologies',
      description: 'Thành thạo ReactJS và các công nghệ web hiện đại',
      icon: '🌐'
    },
    {
      title: 'Problem Solving',
      description: 'Đam mê giải quyết các thách thức lập trình phức tạp',
      icon: '🧩'
    },
    {
      title: 'Team Leadership',
      description: 'Kinh nghiệm dẫn dắt nhóm và quản lý dự án',
      icon: '👥'
    }
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
          <h1 className="hero-title">
            Giới thiệu về{' '}
            <span className="title-gradient">
              Lê Trí Trung
            </span>
          </h1>
          <p className="hero-description">
            {personalInfo.intro}
          </p>
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
              <div className={`stat-icon stat-icon--${stat.color.includes('blue') ? 'blue' : stat.color.includes('green') ? 'green' : stat.color.includes('purple') ? 'purple' : 'red'}`}>
                <stat.icon className="mx-auto" />
              </div>
              <div className="stat-value">
                {stat.value}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
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
          <h2 className="story-title">
            Câu chuyện của tôi
          </h2>
          <div className="story-content">
            <p>
              Xin chào! Tôi là <strong>Lê Trí Trung</strong>, 
              một sinh viên năm 2 ngành Khoa học Máy tính tại Đại học FPT Đà Nẵng. 
              Với niềm đam mê mãnh liệt về công nghệ và lập trình, tôi luôn tìm kiếm 
              những cơ hội để học hỏi và phát triển bản thân.
            </p>
            <p>
              Hành trình lập trình của tôi bắt đầu từ những dòng code Java đầu tiên, 
              và từ đó tôi đã không ngừng mở rộng kiến thức sang các công nghệ web hiện đại 
              như ReactJS, Spring Boot, và nhiều framework khác.
            </p>
            <p>
              Tôi tin rằng công nghệ có thể thay đổi thế giới, và mong muốn của tôi là 
              đóng góp vào việc xây dựng những sản phẩm có ý nghĩa, giúp ích cho cộng đồng 
              và xã hội.
            </p>
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
          <h3 className="info-title">
            Thông tin cá nhân
          </h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">🎂</span>
              <div>
                <div className="info-label">Ngày sinh</div>
                <div className="info-value">{personalInfo.contact.birthday}</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <div className="info-label">Địa chỉ</div>
                <div className="info-value">{personalInfo.contact.location}</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📚</span>
              <div>
                <div className="info-label">Học vấn</div>
                <div className="info-value">Đại học FPT</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💼</span>
              <div>
                <div className="info-label">Chuyên môn</div>
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
          Điểm nổi bật
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