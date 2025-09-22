import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaHeart, FaRocket } from 'react-icons/fa';
import { personalInfo } from '../data';

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
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Giới thiệu về{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lê Trí Trung
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.intro}
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`text-3xl mb-3 ${stat.color}`}>
                <stat.icon className="mx-auto" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-16 mb-16">
        
        {/* Personal Story */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Câu chuyện của tôi
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Xin chào! Tôi là <strong className="text-gray-900 dark:text-white">Lê Trí Trung</strong>, 
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
          className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Thông tin cá nhân
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎂</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Ngày sinh</div>
                <div className="text-gray-600 dark:text-gray-400">{personalInfo.contact.birthday}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📍</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Địa chỉ</div>
                <div className="text-gray-600 dark:text-gray-400">{personalInfo.contact.location}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Học vấn</div>
                <div className="text-gray-600 dark:text-gray-400">Đại học FPT</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💼</span>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Chuyên môn</div>
                <div className="text-gray-600 dark:text-gray-400">Java Developer</div>
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