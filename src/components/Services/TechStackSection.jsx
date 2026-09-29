import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiGo, 
  SiPostgresql, 
  SiRedis, 
  SiRabbitmq, 
  SiDocker, 
  SiCloudflare
} from 'react-icons/si';
import { FaQrcode, FaShieldAlt } from 'react-icons/fa';
import { staggerContainer, cardPop } from './servicesData';
import './TechStackSection.scss';

export const TechStackSection = ({ isEn }) => {
  const stackItems = [
    { icon: SiNextdotjs, name: 'Next.js 14', role: 'SSR & Edge Caching', highlight: 'Sub-8ms latency' },
    { icon: SiReact, name: 'React 19', role: 'Micro-Interactions', highlight: 'Fluid client states' },
    { icon: SiTypescript, name: 'TypeScript', role: 'End-to-end Type Safety', highlight: 'Zero runtime crash' },
    { icon: SiGo, name: 'Golang / .NET', role: 'High-Concurrency Core', highlight: '10K req/s ready' },
    { icon: SiPostgresql, name: 'PostgreSQL', role: 'ACID Relational Core', highlight: 'Strict financial integrity' },
    { icon: SiRedis, name: 'Redis Stack', role: 'Distributed Mutex Lock', highlight: 'Zero duplicate bookings' },
    { icon: SiRabbitmq, name: 'RabbitMQ', role: 'Event Broker & DLQ', highlight: '0% message loss' },
    { icon: FaQrcode, name: 'VietQR Pro', role: '0đ Gateway Hook', highlight: 'Instant reconciliation' },
    { icon: SiDocker, name: 'Docker / CI/CD', role: 'Self-healing Deployments', highlight: 'Zero-downtime rolls' },
    { icon: SiCloudflare, name: 'Cloudflare', role: 'Global WAF & DDoS Shield', highlight: 'Sub-15ms edge routing' },
  ];

  return (
    <div className="synap-tech-stack-section">
      <div className="stack-header">
        <span className="stack-eyebrow">
          <FaShieldAlt size={12} className="text-orange" />
          {isEn ? "ENGINEERING PEDIGREE" : "TIÊU CHUẨN CÔNG NGHỆ CHỌN LỌC"}
        </span>
        <h3 className="stack-title">
          {isEn ? "Battle-Tested Production Stack" : "Ngăn Xếp Công Nghệ Thực Chiến — Không Dùng Mã Nguồn Rác"}
        </h3>
        <p className="stack-desc">
          {isEn
            ? "We never deploy bloated WordPress themes or slow drag-and-drop builders. Every system is purpose-built with enterprise-grade modular stacks designed for high throughput, sub-8ms responses, and zero maintenance friction."
            : "SynapForge Studio tuyệt đối nói KHÔNG với theme WordPress chắp vá hay kéo thả chậm chạp. Từng dòng code được kiến tạo trên nền tảng kỹ nghệ hiện đại, đảm bảo tốc độ mở trang siêu tốc, bảo mật tài chính và dễ dàng mở rộng 5–10 năm."}
        </p>
      </div>

      <motion.div 
        className="stack-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {stackItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={idx} 
              className="stack-card"
              variants={cardPop}
              whileHover={{ y: -4, transition: { duration: 0.18 } }}
            >
              <div className="stack-icon-box">
                <Icon size={24} />
              </div>
              <div className="stack-meta">
                <div className="stack-name">{item.name}</div>
                <div className="stack-role">{item.role}</div>
                <div className="stack-highlight">{item.highlight}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechStackSection;
