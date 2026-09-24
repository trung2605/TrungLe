import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUserTie, 
  FaLaptopCode, 
  FaCode, 
  FaAward, 
  FaServer, 
  FaGraduationCap, 
  FaCheckCircle, 
  FaFileContract, 
  FaExternalLinkAlt, 
  FaUsers, 
  FaRocket, 
  FaArrowRight, 
  FaShieldAlt, 
  FaDownload 
} from 'react-icons/fa';
import { fadeInUp, staggerContainer, cardPop, TEAM_MEMBERS, OTHER_TEAM_PROJECTS } from './servicesData';

export const TeamBenchSection = ({ isEn }) => {
  return (
    <section id="team-section" className="section-container team-bench-section" style={{ scrollMarginTop: '170px' }}>
      <motion.div 
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-eyebrow">{isEn ? "VERIFIED ENGINEERING TEAM" : "ĐỘI NGŨ KỸ SƯ CHÍNH QUY"}</div>
        <h2 className="section-heading">
          {isEn ? "Meet Our 5 Engineers: 100% FPT University — Ex-FPT Software" : "Đội Ngũ 05 Kỹ Sư Thực Chiến: 100% Đại Học FPT — Cựu FPT Software"}
        </h2>
        <p className="section-desc">
          {isEn
            ? "No agency middlemen, no sales markups. You collaborate directly 1-on-1 with Tech Lead Le Tri Trung alongside 4 dedicated engineers specializing in .NET 8, Java Spring Boot, Next.js, and AI automation."
            : "Xóa bỏ hoàn toàn chi phí sales trung gian. Khách hàng làm việc trực tiếp 1-1 với Tech Lead Lê Trí Trung cùng 4 kỹ sư chuyên trách, sở hữu chứng chỉ quốc tế và kinh nghiệm thực chiến dày dặn tại FPT Software."}
        </p>
      </motion.div>

      {/* Highlight Trust Stats */}
      <motion.div 
        className="team-trust-banner"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="trust-stat">
          <span className="stat-value">05</span>
          <span className="stat-label">{isEn ? "Engineers In Da Nang" : "Kỹ Sư Chính Quy Tại Đà Nẵng"}</span>
        </div>
        <div className="stat-divider" />
        <div className="trust-stat">
          <span className="stat-value">100%</span>
          <span className="stat-label">{isEn ? "FPT University Software Engineers" : "Đại Học FPT Chuyên Ngành SE"}</span>
        </div>
        <div className="stat-divider" />
        <div className="trust-stat">
          <span className="stat-value">4 / 5</span>
          <span className="stat-label">{isEn ? "Ex-FPT Software Interns" : "Đã Thực Tập & Làm Việc Tại FPT Software"}</span>
        </div>
        <div className="stat-divider" />
        <div className="trust-stat">
          <span className="stat-value">01</span>
          <span className="stat-label">{isEn ? "Microsoft Certified Professional" : "Chứng Chỉ Quốc Tế Microsoft Pro"}</span>
        </div>
      </motion.div>

      {/* 5 Members Grid */}
      <motion.div 
        className="team-members-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {TEAM_MEMBERS.map((member, idx) => (
          <motion.div 
            key={idx} 
            className={`team-member-card ${idx === 0 ? 'lead-card' : ''}`}
            variants={cardPop}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="card-top-stripe" />
            <div className="member-card-body">
              <div className="member-header">
                <div className="member-avatar-box">
                  {idx === 0 ? <FaUserTie size={22} /> : idx === 1 ? <FaLaptopCode size={22} /> : idx === 2 ? <FaCode size={22} /> : idx === 3 ? <FaAward size={22} /> : <FaServer size={22} />}
                </div>
                <div className="member-meta">
                  <div className="member-role-badge">{isEn ? member.roleEn : member.roleVi}</div>
                  <h3 className="member-name">{member.name}</h3>
                </div>
              </div>

              <div className="member-edu-tag">
                <FaGraduationCap size={13} />
                <span>{isEn ? member.eduEn : member.eduVi}</span>
              </div>

              <p className="member-highlight">
                {isEn ? member.highlightEn : member.highlightVi}
              </p>

              <div className="member-achievements-list">
                {(isEn ? member.achievementsEn : member.achievementsVi).map((ach, aIdx) => (
                  <div key={aIdx} className="achievement-row">
                    <FaCheckCircle className="check-icon" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              <div className="member-skills-row">
                {member.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">{skill}</span>
                ))}
              </div>

              <div className="member-card-footer">
                <a
                  href={member.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-member-cv"
                >
                  <FaFileContract size={13} />
                  <span>{isEn ? "View Verified CV" : "Xem CV Kỹ Sư"}</span>
                  <FaExternalLinkAlt size={10} />
                </a>

                {idx === 0 && (
                  <Link
                    to="/achievements?tab=education&milestone=1"
                    className="btn-lead-milestone"
                  >
                    <FaAward size={13} />
                    <span>{isEn ? "Lead Dossier" : "Hồ Sơ Năng Lực"}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Flagship Collaborative Team Deliverable: BrandHub */}
      <motion.div
        className="team-flagship-collaborative-card"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="collaborative-badge-row">
          <span className="collab-pill">
            <FaUsers size={12} />
            {isEn ? "FLAGSHIP COLLABORATIVE DELIVERABLE" : "SẢN PHẨM HỢP TÁC CHUNG TIÊU BIỂU"}
          </span>
          <span className="collab-tag">
            {isEn ? "100% In-house Engineering • 5 Dedicated Engineers" : "100% Nội Lực Đội Ngũ • 5 Kỹ Sư FPT"}
          </span>
        </div>

        <div className="collaborative-content-split">
          <div className="collab-text">
            <h3>BrandHub — Omnichannel Social Media & AI Intelligence</h3>
            <p>
              {isEn 
                ? "A living proof of our team's synchronized delivery: 5 engineers co-architected 7 microservices across 16 Agile sprints (32 weeks), closing 430+ Jira tasks. From resilient RabbitMQ queues to Neo4j GraphRAG and polyglot persistence, this platform verifies our enterprise engineering caliber."
                : "Minh chứng rõ nét nhất cho khả năng tác chiến đồng bộ của đội ngũ: Cả 5 kỹ sư đã cùng kiến trúc 7 microservices qua 16 sprint Agile (32 tuần), hoàn thành 430+ task Jira. Từ hàng đợi RabbitMQ Dead Letter Queue đến GraphRAG Neo4j và phân quyền Multi-tenant, hệ thống khẳng định chuẩn mực kỹ thuật cao nhất của team."}
            </p>

            <div className="collab-metrics-strip">
              <div className="metric-chip"><strong>07</strong> {isEn ? "Services" : "Dịch vụ"}</div>
              <div className="metric-chip"><strong>32</strong> {isEn ? "Weeks (16 Sprints)" : "Tuần (16 Sprints)"}</div>
              <div className="metric-chip"><strong>430+</strong> {isEn ? "Jira Tasks" : "Tasks Jira"}</div>
              <div className="metric-chip"><strong>05</strong> {isEn ? "Social Networks" : "Mạng Xã Hội"}</div>
              <div className="metric-chip"><strong>0%</strong> {isEn ? "Message Loss (DLQ)" : "Mất tin (DLQ)"}</div>
            </div>
          </div>

          <div className="collab-actions">
            <button
              onClick={() => {
                const el = document.getElementById('case-study');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-collab-view"
            >
              <FaRocket size={13} />
              <span>{isEn ? "Deep-Dive Dual Showcase" : "Khám Phá Dự Án Tiêu Biểu"}</span>
              <FaArrowRight size={11} />
            </button>

            <Link
              to="/projects/14"
              className="btn-collab-dossier"
            >
              <FaExternalLinkAlt size={11} />
              <span>{isEn ? "Project Case Study #14" : "Hồ Sơ Dự Án #14"}</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Other Notable Team Projects */}
      <motion.div
        className="other-team-projects-block"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="sub-header-row">
          <div>
            <span className="sub-eyebrow">{isEn ? "PROVEN PORTFOLIO" : "HỆ THỐNG THỰC TẾ"}</span>
            <h3 className="sub-title">{isEn ? "Other Notable Projects Developed by Our Engineers" : "Các Dự Án Nhóm & Hệ Thống Khác Đội Ngũ Đã Triển Khai"}</h3>
          </div>
        </div>

        <div className="other-projects-grid">
          {OTHER_TEAM_PROJECTS.map((proj) => (
            <div key={proj.id} className="other-project-card">
              <div className="card-top-meta">
                <span className="proj-badge">{isEn ? proj.badgeEn : proj.badgeVi}</span>
                <span className="proj-lead">{isEn ? proj.leadEn : proj.leadVi}</span>
              </div>
              <h4 className="proj-title">{proj.title}</h4>
              <p className="proj-desc">{isEn ? proj.descEn : proj.descVi}</p>
              <div className="proj-tech-row">
                {proj.tech.map((t, tIdx) => (
                  <span key={tIdx} className="tech-badge">{t}</span>
                ))}
              </div>
              {proj.linkUrl && proj.linkUrl !== '#' && (
                <div className="proj-footer">
                  {proj.isExternal ? (
                    <a href={proj.linkUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
                      <span>{isEn ? "Visit Live Site" : "Truy Cập Trực Tiếp"}</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  ) : (
                    <Link to={proj.linkUrl} className="proj-link">
                      <span>{isEn ? "View Details" : "Xem Chi Tiết"}</span>
                      <FaArrowRight size={10} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Callout: Full Dossier Download */}
      <motion.div 
        className="team-download-dossier-box"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="dossier-info">
          <FaShieldAlt size={30} className="dossier-icon" />
          <div>
            <h4>{isEn ? "Download Comprehensive Company Profile & Technical Quotation (PDF)" : "Tải Về Hồ Sơ Năng Lực Kỹ Thuật & Báo Giá 3 Gói Dịch Vụ (PDF)"}</h4>
            <p>{isEn ? "Official 5-page dossier: Detailed Man-day effort breakdown, verified live Biensovip.com metrics, and guaranteed SLAs." : "Bản PDF 5 trang chính thức: Bóc tách minh bạch chi phí theo Man-day, minh chứng năng lực thực tế Biensovip.com và cam kết tiến độ."}</p>
          </div>
        </div>
        <a
          href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-download-pdf-profile"
        >
          <FaDownload size={14} />
          <span>{isEn ? "Download PDF Profile (5 Pages)" : "Tải PDF Hồ Sơ Năng Lực (5 Trang)"}</span>
        </a>
      </motion.div>
    </section>
  );
};
