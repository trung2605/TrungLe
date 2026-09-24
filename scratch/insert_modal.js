const fs = require('fs');
const path = require('path');

const filePath = 'd:/ProjectCode/my-website/src/components/Services/Services.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const modalSnippet = `        {/* FLAGSHIP PROJECT FULL DETAIL MODAL (BIENSOVIP & BRANDHUB) */}
        {activeDetailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flagship-detail-modal-backdrop"
            onClick={() => setActiveDetailProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flagship-detail-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flagship-modal-header">
                <div className="modal-title-group">
                  <div className="modal-pill-tag">
                    {activeDetailProject === 'biensovip' ? (
                      <span className="pill-client">
                        <span className="dot" />
                        {isEn ? "ENTERPRISE CLIENT PRODUCTION" : "KHÁCH HÀNG DOANH NGHIỆP • ĐANG HOẠT ĐỘNG"}
                      </span>
                    ) : (
                      <span className="pill-capstone">
                        <span className="dot purple" />
                        {isEn ? "FLAGSHIP CAPSTONE • 5-DEV BENCH" : "ĐỒ ÁN TRỌNG ĐIỂM • TEAM 5 KỸ SƯ FPT"}
                      </span>
                    )}
                  </div>
                  <h3>
                    {activeDetailProject === 'biensovip' 
                      ? "Biensovip.com — Sàn Giao Dịch Biển Số Đẹp (Đà Nẵng)" 
                      : "BrandHub — Nền Tảng Tự Động Hoá Thương Hiệu & AI Đa Kênh"}
                  </h3>
                </div>

                <div className="modal-header-actions">
                  {activeDetailProject === 'biensovip' ? (
                    <a 
                      href="https://biensovip.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-header-link"
                    >
                      <FaExternalLinkAlt size={12} />
                      <span>{isEn ? "Open Live Site" : "Xem Sàn Thật"}</span>
                    </a>
                  ) : (
                    <a 
                      href="https://github.com/BrandHubOrganization" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-header-link"
                    >
                      <FaExternalLinkAlt size={12} />
                      <span>{isEn ? "GitHub Repo" : "Xem GitHub"}</span>
                    </a>
                  )}

                  <button 
                    onClick={() => setActiveDetailProject(null)} 
                    className="btn-modal-close"
                    aria-label="Close detail modal"
                  >
                    <FaTimes size={15} />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="flagship-modal-body">
                {/* 1. VISUAL GALLERY & SPECS ROW */}
                <div className="showcase-content-grid modal-visual-grid">
                  {/* Visuals column */}
                  <div className="showcase-visuals">
                    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={activeDetailProject === 'biensovip' ? activeShotIndex : activeBrandhubShotIndex}
                          src={activeDetailProject === 'biensovip' ? BIENSOVIP_SHOTS[activeShotIndex].url : BRANDHUB_SHOTS[activeBrandhubShotIndex].url} 
                          alt="Project Preview"
                          className="main-preview-img"
                          onClick={() => setLightboxImg(activeDetailProject === 'biensovip' ? BIENSOVIP_SHOTS[activeShotIndex].url : BRANDHUB_SHOTS[activeBrandhubShotIndex].url)}
                          title="Click to view full size"
                          initial={{ opacity: 0.35, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.35 }}
                          transition={{ duration: 0.25 }}
                        />
                      </AnimatePresence>
                    </div>

                    <div className="thumbnails-row">
                      {(activeDetailProject === 'biensovip' ? BIENSOVIP_SHOTS : BRANDHUB_SHOTS).map((shot, idx) => {
                        const isCurrent = activeDetailProject === 'biensovip' ? activeShotIndex === idx : activeBrandhubShotIndex === idx;
                        return (
                          <motion.img 
                            key={idx}
                            src={shot.url}
                            alt={shot.titleVi}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                              borderColor: isCurrent ? (activeDetailProject === 'biensovip' ? 'var(--color-ink)' : '#6366f1') : 'var(--color-hairline)',
                              opacity: isCurrent ? 1 : 0.65
                            }}
                            onClick={() => {
                              if (activeDetailProject === 'biensovip') {
                                setActiveShotIndex(idx);
                              } else {
                                setActiveBrandhubShotIndex(idx);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Details column */}
                  <div className="showcase-details">
                    <p className="client-story">
                      {activeDetailProject === 'biensovip' ? (
                        isEn 
                          ? "The client required a lightning-fast, high-trust marketplace to display thousands of high-value license plates with zero gateway fees and automatic deposit tracking."
                          : "Khách hàng yêu cầu một sàn giao dịch tốc độ cao, hiển thị hàng chục nghìn biển số giá trị lớn, triệt tiêu 100% phí cổng thanh toán và quản lý đặt cọc tự động qua VietQR."
                      ) : (
                        isEn 
                          ? "The flagship graduation capstone project developed end-to-end by our 5-engineer team. Engineered with enterprise-grade microservices to automate omnichannel content distribution across Facebook, TikTok, Instagram, Threads, and Zalo with AI-assisted copywriting and fault-tolerant message queuing."
                          : "Đồ án tốt nghiệp trọng điểm được chính Team 5 Kỹ sư thiết kế và phát triển toàn diện. Hệ thống kiến trúc Microservices chuẩn doanh nghiệp, giải quyết bài toán tự động hóa quản trị nội dung đa kênh (Facebook, TikTok, Instagram, Threads, Zalo) với trợ lý AI và hạ tầng hàng đợi RabbitMQ bất tử."
                      )}
                    </p>

                    <ul className="specs-list">
                      {activeDetailProject === 'biensovip' ? (
                        <>
                          <li>
                            <FaSearch />
                            <div><strong>{isEn ? "Sub-8ms Multi-filter" : "Lọc đa chiều dưới 8ms"}:</strong> {isEn ? "Composite indexing for thousands of plates" : "Tìm kiếm theo ngũ quý, sảnh tiến, dải giá tức thời (Postgres GIN Index)"}</div>
                          </li>
                          <li>
                            <FaQrcode />
                            <div><strong>{isEn ? "VietQR Auto Deposit & Lock" : "Cổng cọc VietQR & Khóa độc bản"}:</strong> {isEn ? "0% transaction fee, auto Webhook <0.5s & Redis 15-min lock" : "Khớp lệnh Webhook <0.5s, 0đ phí cổng trung gian, khóa bi quan chống bán trùng"}</div>
                          </li>
                          <li>
                            <FaEnvelope />
                            <div><strong>{isEn ? "Drag-Drop Email Builder (UC27)" : "Soạn Email Kéo-Thả (UC27)"}:</strong> {isEn ? "Visual builder + corporate Gmail SMTP, zero spam & 0đ cost" : "Dựng email marketing trực quan, liên kết Gmail doanh nghiệp 0đ chi phí"}</div>
                          </li>
                          <li>
                            <FaBell />
                            <div><strong>{isEn ? "Auto Alerts & Broadcast (UC17/24)" : "Thông Báo Biển Mới & Broadcast"}:</strong> {isEn ? "Instant push when matching plates arrive; 1-click sales broadcast" : "Tự động gửi mail/Zalo khi có biển đúng sở thích; phát thông báo xả kho 1-click"}</div>
                          </li>
                          <li>
                            <FaShareAlt />
                            <div><strong>{isEn ? "Social Video & AI Mockups (UC22/42)" : "Video TikTok/Reels & Mockup AI"}:</strong> {isEn ? "Embed viral short videos + 1-click batch social mockups" : "Nhúng video thực tế xe biển đẹp + 1-click sinh hàng nghìn ảnh chuẩn Facebook/TikTok"}</div>
                          </li>
                          <li>
                            <FaBalanceScale />
                            <div><strong>{isEn ? "Feng Shui & Plate Comparison (UC16/23)" : "Phong Thủy Hợp Mệnh & So Sánh"}:</strong> {isEn ? "MeaningAnalyzer engine + side-by-side 3-plate comparison" : "Giải mã ngũ hành theo ngày sinh + so sánh song song 3 biển tăng 35% tỷ lệ chốt"}</div>
                          </li>
                          <li>
                            <FaUsers />
                            <div><strong>{isEn ? "Affiliate Partner Portal (UC25/34)" : "Cổng CTV & Hoa Hồng Tự Động"}:</strong> {isEn ? "Unique UTM links, transparent tiered commission & auto payout" : "Cấp mã UTM riêng, tự động tính hoa hồng ví điện tử, quản lý 14 CTV thực tế"}</div>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <FaServer />
                            <div><strong>{isEn ? "Enterprise Microservices" : "Kiến trúc Microservices Spring Boot 3"}:</strong> {isEn ? "Spring Cloud Gateway (WebFlux, JWT, Redis) + Java 21 domain services" : "API Gateway (WebFlux, JWT, Redis) + Spring Boot 3.3.5 (Java 21) độc lập"}</div>
                          </li>
                          <li>
                            <FaCogs />
                            <div><strong>{isEn ? "Resilient RabbitMQ & DLQ" : "Hàng đợi RabbitMQ & Dead Letter Queue (DLQ)"}:</strong> {isEn ? "Exponential backoff retry, strict idempotency, 0% lost publishing tasks" : "Cơ chế retry lũy thừa, đảm bảo tính Idempotency và không bao giờ mất tin nhắn"}</div>
                          </li>
                          <li>
                            <FaRobot />
                            <div><strong>{isEn ? "AI Content Generation & RAG" : "Trợ lý AI Sinh nội dung & RAG Pipeline"}:</strong> {isEn ? "Python FastAPI + DeepSeek AI for context-aware multi-format copywriting" : "Tích hợp Python FastAPI + DeepSeek LLM tự động hóa viết bài chuẩn SEO đa kênh"}</div>
                          </li>
                          <li>
                            <FaSyncAlt />
                            <div><strong>{isEn ? "Omnichannel Automation" : "Phát hành đa kênh đồng bộ"}:</strong> {isEn ? "Auto distribution to Facebook, TikTok, Instagram, Threads, Zalo" : "Đồng bộ hóa 5 nền tảng mạng xã hội, lên lịch đăng bài & cảnh báo tức thời"}</div>
                          </li>
                          <li>
                            <FaUsers />
                            <div><strong>{isEn ? "Multi-tenant Access Control" : "Phân quyền đa cấp bậc (RBAC)"}:</strong> {isEn ? "Workspaces for Agencies, Enterprise Brands, and Content Creators" : "Tách biệt dữ liệu cho Agency, Nhãn hàng, Creator và CTV với bảo mật JWT"}</div>
                          </li>
                          <li>
                            <FaChartLine />
                            <div><strong>{isEn ? "Deep Campaign Analytics" : "Báo cáo phân tích hiệu suất chuyên sâu"}:</strong> {isEn ? "Aggregated engagement KPIs & real-time async task telemetry" : "Đo lường tương tác, thống kê chuyển đổi và giám sát luồng tác vụ thời gian thực"}</div>
                          </li>
                          <li>
                            <FaShieldAlt />
                            <div><strong>{isEn ? "Zero Data Loss SLA" : "Cam kết độ bền vững tin nhắn 100%"}:</strong> {isEn ? "Docker Compose & AWS EC2 cluster with automatic failover" : "Cụm Docker Compose & AWS EC2 dự phòng nóng, tự hồi phục khi node gặp sự cố"}</div>
                          </li>
                        </>
                      )}
                    </ul>

                    {/* Actions Inside Modal */}
                    <div className="showcase-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginTop: '16px' }}>
                      {activeDetailProject === 'biensovip' ? (
                        <>
                          <a 
                            href="https://biensovip.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-view-live"
                          >
                            {isEn ? "Explore Live Marketplace" : "Trải Nghiệm Sàn Thực Tế"} <FaExternalLinkAlt size={12} />
                          </a>

                          <Link
                            to="/projects/26"
                            className="btn-pill-subtle"
                            onClick={() => setActiveDetailProject(null)}
                          >
                            <span>{isEn ? "Technical Case Study" : "Case Study Kỹ Thuật #26"}</span>
                            <FaArrowRight size={11} />
                          </Link>

                          <Link
                            to="/blog/biensovip-postgresql-vs-mongodb-multi-filter"
                            className="btn-pill-subtle"
                            onClick={() => setActiveDetailProject(null)}
                          >
                            <span>{isEn ? "PostgreSQL 8ms Deep-Dive" : "Bài Viết CSDL PostgreSQL 8ms"}</span>
                            <FaArrowRight size={11} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/projects/14"
                            className="btn-view-live"
                            style={{ background: '#6366f1' }}
                            onClick={() => setActiveDetailProject(null)}
                          >
                            {isEn ? "Explore BrandHub Dossier" : "Khám Phá Chi Tiết Dự Án #14"} <FaArrowRight size={12} />
                          </Link>

                          <Link
                            to="/blog/brandhub-resilient-rabbitmq-dead-letter-retry-architecture"
                            className="btn-pill-subtle"
                            onClick={() => setActiveDetailProject(null)}
                          >
                            <span>{isEn ? "RabbitMQ DLQ Deep-Dive" : "Bài Viết Kiến Trúc RabbitMQ"}</span>
                            <FaArrowRight size={11} />
                          </Link>

                          <a 
                            href="https://github.com/BrandHubOrganization" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-pill-subtle"
                          >
                            <span>GitHub Organization</span>
                            <FaExternalLinkAlt size={11} />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. FOR BRANDHUB: TELEMETRY + ARCHITECTURE + 5-DEV MATRIX */}
                {activeDetailProject === 'brandhub' && (
                  <>
                    {/* BRANDHUB TELEMETRY STRIP */}
                    <div className="brandhub-telemetry-banner" style={{ margin: '24px 0', borderRadius: '14px' }}>
                      {BRANDHUB_METRICS.map((met, mIdx) => (
                        <div key={mIdx} className="telemetry-item">
                          <div className="telemetry-value">{met.value}</div>
                          <div className="telemetry-label">{isEn ? met.labelEn : met.labelVi}</div>
                          <div className="telemetry-sub">{isEn ? met.subEn : met.subVi}</div>
                        </div>
                      ))}
                    </div>

                    {/* BRANDHUB 7 MICROSERVICES BLUEPRINT */}
                    <div className="brandhub-architecture-section" style={{ borderRadius: '16px', border: '1px solid var(--color-hairline)', marginBottom: '24px' }}>
                      <div className="section-sub-header">
                        <span className="sub-badge">
                          <FaProjectDiagram size={12} />
                          {isEn ? "SYSTEM ARCHITECTURE BLUEPRINT" : "SƠ ĐỒ PHÂN RÃ HỆ THỐNG"}
                        </span>
                        <h4>
                          {isEn 
                            ? "7 Independent Microservices & Modules (Polyglot & Cloud-Native)" 
                            : "Kiến Trúc 7 Dịch Vụ Độc Lập: Đa Ngôn Ngữ & Chuẩn Doanh Nghiệp"}
                        </h4>
                        <p>
                          {isEn
                            ? "Engineered with strict domain separation: Java Spring Boot for reliable business & publishing, Python FastAPI for AI RAG orchestration, and React 18 / Expo for multi-platform client interaction."
                            : "Thiết kế theo nguyên tắc phân tách domain rõ ràng: Java Spring Boot cho giao dịch & xuất bản bất tử, Python FastAPI cho xử lý AI RAG đa chiều, và React 18 / Expo cho trải nghiệm người dùng đa thiết bị."}
                        </p>
                      </div>

                      <div className="microservices-grid">
                        {BRANDHUB_MICROSERVICES.map((srv) => (
                          <div key={srv.id} className="microservice-card">
                            <div className="service-top">
                              <span className="service-code-name">{srv.name}</span>
                              <span className="service-tag">{srv.tag}</span>
                            </div>
                            <div className="service-tech-pill">{srv.tech}</div>
                            <p className="service-desc">{isEn ? srv.descEn : srv.descVi}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BRANDHUB TEAM ROLES & OWNERSHIP MATRIX */}
                    <div className="brandhub-team-roles-section" style={{ borderRadius: '16px', border: '1px solid var(--color-hairline)' }}>
                      <div className="section-sub-header">
                        <span className="sub-badge" style={{ background: '#ede9fe', color: '#6d28d9', borderColor: '#ddd6fe' }}>
                          <FaUsers size={12} />
                          {isEn ? "5-ENGINEER COLLABORATION MATRIX" : "MA TRẬN PHÂN CÔNG 5 KỸ SƯ TRONG BRANDHUB"}
                        </span>
                        <h4>
                          {isEn 
                            ? "Team Roles & Architectural Ownership in BrandHub" 
                            : "Trách Nhiệm & Đóng Góp Kỹ Thuật Của Từng Kỹ Sư Trong Dự Án"}
                        </h4>
                        <p>
                          {isEn
                            ? "100% created and delivered by our 5-engineer bench. Each module was owned end-to-end by dedicated engineers with verified commits and production-tested stability."
                            : "100% thành quả tự chủ của nhóm 5 kỹ sư chính quy. Mỗi thành phần được một kỹ sư chuyên trách kiến trúc và hiện thực hoá, cam kết tính ổn định qua 16 sprint kiểm thử khắt khe."}
                        </p>
                      </div>

                      <div className="team-roles-grid">
                        {BRANDHUB_TEAM_ROLES.map((mem, rIdx) => (
                          <div key={rIdx} className="role-member-card">
                            <div className="role-card-header">
                              <div className="role-avatar-badge" style={{ backgroundColor: mem.color }}>
                                {mem.avatarIcon === 'FaUserTie' ? <FaUserTie size={17} /> : mem.avatarIcon === 'FaLaptopCode' ? <FaLaptopCode size={17} /> : mem.avatarIcon === 'FaCode' ? <FaCode size={17} /> : mem.avatarIcon === 'FaAward' ? <FaAward size={17} /> : <FaServer size={17} />}
                              </div>
                              <div>
                                <span className="role-label">{isEn ? mem.roleEn : mem.roleVi}</span>
                                <h5 className="role-name">{mem.name}</h5>
                              </div>
                            </div>

                            <ul className="role-contributions-list">
                              {(isEn ? mem.contributionsEn : mem.contributionsVi).map((item, iIdx) => (
                                <li key={iIdx}>
                                  <FaCheckCircle className="check-ico" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="role-tech-tags">
                              {mem.tech.map((t, tIdx) => (
                                <span key={tIdx} className="tech-tag">{t}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
`;

const lastAnimatePresence = content.lastIndexOf('</AnimatePresence>');
if (lastAnimatePresence !== -1) {
  content = content.substring(0, lastAnimatePresence) + modalSnippet + '      ' + content.substring(lastAnimatePresence);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('SUCCESS!');
} else {
  console.error('AnimatePresence tag not found');
  process.exit(1);
}
