import React from 'react';
import { 
  FaImages, 
  FaCogs, 
  FaTags, 
  FaProjectDiagram, 
  FaCheckCircle, 
  FaUsers, 
  FaUserTie, 
  FaLaptopCode, 
  FaCode, 
  FaAward, 
  FaServer 
} from 'react-icons/fa';
import TechIcon from '../../common/TechIcon';

export const ProjectGallerySection = ({ 
  galleryItems, 
  isEn, 
  onSelectImage 
}) => {
  return (
    <section id="section-gallery" style={{ scrollMarginTop: '90px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaImages size={18} />
        </div>
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Phần 2 • Verified User Experience & Modules
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-ink)', margin: '2px 0 0 0' }}>
            {isEn ? "Production Screenshots & Functional Interfaces" : "Hình Ảnh & Giao Diện Chức Năng Thực Tế"}
          </h2>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '24px', border: '1px solid var(--color-hairline)', padding: '28px' }}>
        <p style={{ fontSize: '14.5px', color: 'var(--color-ink-soft)', margin: '0 0 24px 0' }}>
          {isEn 
            ? "Every screenshot showcases live functional workflows. Click any image to open high-definition inspection mode." 
            : "Tất cả ảnh minh chứng giao diện chức năng đang hoạt động thực tế. Nhấp vào bất kỳ ảnh nào để phóng to chi tiết độ nét cao."}
        </p>

        {galleryItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectImage(item.src)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-hairline)',
                  backgroundColor: 'var(--color-surface-soft)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--color-ink)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--color-hairline)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative', backgroundColor: '#0f172a' }}>
                  <img
                    src={item.src}
                    alt={item.titleVi || item.titleEn}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, backgroundColor: 'var(--color-card-bg)' }}>
                  <div>
                    {item.tag && (
                      <span style={{ 
                        display: 'inline-block',
                        fontSize: '10.5px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: '#6366f1',
                        backgroundColor: '#eef2ff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginBottom: '6px'
                      }}>
                        {item.tag}
                      </span>
                    )}
                    <h4 style={{ fontSize: '13.5px', fontWeight: 650, color: 'var(--color-ink)', margin: 0, lineHeight: 1.45 }}>
                      {isEn ? item.titleEn : item.titleVi}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-accent-emerald)', fontWeight: 700 }}>
                      {isEn ? "ZOOM HD ↗" : "PHÓNG TO HD ↗"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-ink-soft)' }}>
            <p>{isEn ? "No screenshots currently uploaded for this repository." : "Chưa có hình ảnh bổ sung cho dự án này."}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export const ProjectArchitectureSection = ({
  project,
  isEn,
  isBrandHub,
  isBienSoVip,
  brandhubMetrics,
  brandhubMicroservices,
  biensovipSpecs
}) => {
  return (
    <section id="section-architecture" style={{ scrollMarginTop: '90px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaCogs size={18} />
        </div>
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Phần 3 • Technical Architecture & Blueprint
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-ink)', margin: '2px 0 0 0' }}>
            {isEn ? "Architecture & Technical Solutions" : "Kiến Trúc & Giải Pháp Kỹ Thuật"}
          </h2>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Tech Stack Chips Card */}
        <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '24px', border: '1px solid var(--color-hairline)', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <FaTags style={{ color: '#2563eb' }} size={16} />
            <h3 style={{ fontSize: '18px', fontWeight: 650, color: 'var(--color-ink)', margin: 0 }}>
              {isEn ? "Core Technology Ecosystem" : "Hệ Sinh Thái Công Nghệ Sử Dụng"}
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 18px', borderRadius: '50px',
                  fontSize: '13.5px', fontWeight: 500,
                  color: 'var(--color-ink)', backgroundColor: 'var(--color-surface-soft)',
                  border: '1px solid var(--color-hairline)',
                }}
              >
                <TechIcon tech={tech} size={14} />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* BRANDHUB 7 MICROSERVICES BLUEPRINT */}
        {isBrandHub && (
          <>
            {/* Telemetry banner */}
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px',
              backgroundColor: '#0f172a', borderRadius: '20px', padding: '24px', color: '#ffffff'
            }}>
              {brandhubMetrics.map((met, mIdx) => (
                <div key={mIdx} style={{ textAlign: 'center', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 700, color: '#dceeb1' }}>{met.value}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#f8fafc', marginTop: '4px' }}>{isEn ? met.labelEn : met.labelVi}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{isEn ? met.subEn : met.subVi}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '24px', border: '1px solid var(--color-hairline)', padding: '28px' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '50px',
                  fontSize: '11px', fontFamily: 'var(--font-mono)', backgroundColor: '#eef2ff', color: '#6366f1', fontWeight: 700
                }}>
                  <FaProjectDiagram size={11} />
                  {isEn ? "7 INDEPENDENT CLOUD-NATIVE MICROSERVICES" : "KIẾN TRÚC 7 MICROSERVICES ĐỘC LẬP"}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 650, color: 'var(--color-ink)', margin: '10px 0 6px 0' }}>
                  {isEn ? "Domain Separation: Java Spring Boot, Python FastAPI & RabbitMQ" : "Phân Tách Domain Rõ Ràng: Java Spring Boot, Python FastAPI & RabbitMQ"}
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--color-ink-soft)', margin: 0, lineHeight: 1.6 }}>
                  {isEn 
                    ? "Engineered with strict microservices patterns: API Gateway routes and protects with JWT + Redis, Java handles resilient message queueing, and Python powers semantic RAG."
                    : "Kiến trúc chuẩn doanh nghiệp: Spring Cloud Gateway phân luồng và bảo mật qua JWT + Redis, Publisher xử lý hàng đợi RabbitMQ chống mất tin, và FastAPI xử lý tìm kiếm ngữ nghĩa RAG."}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {brandhubMicroservices.map(srv => (
                  <div key={srv.id} style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)' }}>{srv.name}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6366f1', marginBottom: '10px', fontWeight: 600 }}>{srv.tag}</div>
                    <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '50px', backgroundColor: 'var(--color-hairline)', color: 'var(--color-ink)', fontSize: '11.5px', marginBottom: '10px', fontWeight: 500 }}>{srv.tech}</div>
                    <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', lineHeight: 1.5, margin: 0 }}>{isEn ? srv.descEn : srv.descVi}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* BIENSOVIP 7 PRODUCTION SPECS & FEATURES */}
        {isBienSoVip && (
          <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '24px', border: '1px solid var(--color-hairline)', padding: '28px' }}>
            <div style={{ marginBottom: '22px' }}>
              <span style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '50px',
                fontSize: '11px', fontFamily: 'var(--font-mono)', backgroundColor: '#ecfdf5', color: '#059669', fontWeight: 700
              }}>
                <FaCheckCircle size={11} />
                {isEn ? "7 CORE PRODUCTION CAPABILITIES" : "7 NĂNG LỰC SẢN XUẤT THỰC CHIẾN ĐƯỢC CHỨNG MINH"}
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 650, color: 'var(--color-ink)', margin: '10px 0 6px 0' }}>
                {isEn ? "Architectural Innovations Powering Biensovip.com" : "Các Đổi Mới Kỹ Thuật Đang Vận Hành Trực Tiếp Tại Biensovip.com"}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {biensovipSpecs.map((spec, sIdx) => {
                const SpecIcon = spec.icon;
                return (
                  <div key={sIdx} style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)', display: 'flex', gap: '14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <SpecIcon size={16} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 650, color: 'var(--color-ink)', margin: '0 0 6px 0' }}>
                        {isEn ? spec.titleEn : spec.titleVi}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', lineHeight: 1.55, margin: 0 }}>
                        {isEn ? spec.descEn : spec.descVi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const ProjectTeamSection = ({ isEn, teamRoles }) => {
  return (
    <section id="section-team" style={{ scrollMarginTop: '90px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#faf5ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaUsers size={18} />
        </div>
        <div>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#7c3aed', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Phần 4 • Engineering Ownership & FPT Bench Matrix
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-ink)', margin: '2px 0 0 0' }}>
            {isEn ? "5-Engineer FPT Bench Matrix" : "Ma Trận Phân Công & Trách Nhiệm 5 Kỹ Sư FPT"}
          </h2>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--color-card-bg)', borderRadius: '24px', border: '1px solid var(--color-hairline)', padding: '28px' }}>
        <p style={{ fontSize: '14.5px', color: 'var(--color-ink-soft)', margin: '0 0 24px 0', lineHeight: 1.6 }}>
          {isEn 
            ? "100% created and delivered by our 5-engineer bench across 16 rigorous Agile sprints. Each component was owned end-to-end by dedicated engineers."
            : "100% thành quả tự chủ của nhóm 5 kỹ sư chính quy qua 16 sprint kiểm thử khắt khe. Mỗi module được một kỹ sư chuyên trách kiến trúc và hiện thực hoá."}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {teamRoles.map((mem, rIdx) => (
            <div key={rIdx} style={{ padding: '22px', borderRadius: '18px', backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ 
                  width: '42px', height: '42px', borderRadius: '12px', 
                  backgroundColor: mem.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', flexShrink: 0 
                }}>
                  {mem.avatarIcon === 'FaUserTie' ? <FaUserTie size={17} /> : mem.avatarIcon === 'FaLaptopCode' ? <FaLaptopCode size={17} /> : mem.avatarIcon === 'FaCode' ? <FaCode size={17} /> : mem.avatarIcon === 'FaAward' ? <FaAward size={17} /> : <FaServer size={17} />}
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#6366f1', fontWeight: 650, textTransform: 'uppercase' }}>
                    {isEn ? mem.roleEn : mem.roleVi}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-ink)', margin: '2px 0 0 0' }}>
                    {mem.name}
                  </h4>
                </div>
              </div>

              <ul style={{ margin: '0 0 16px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {(isEn ? mem.contributionsEn : mem.contributionsVi).map((item, iIdx) => (
                  <li key={iIdx} style={{ display: 'flex', gap: '10px', fontSize: '13px', lineHeight: 1.5, color: 'var(--color-ink-soft)' }}>
                    <FaCheckCircle style={{ color: 'var(--color-accent-emerald)', flexShrink: 0, marginTop: '2px' }} size={13} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '14px', borderTop: '1px solid var(--color-hairline)' }}>
                {mem.tech.map((t, tIdx) => (
                  <span key={tIdx} style={{ padding: '3px 10px', borderRadius: '50px', backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-hairline)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-soft)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
