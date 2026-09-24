import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCogs, FaFileContract, FaShieldAlt, FaSyncAlt, FaLightbulb, FaArrowRight, FaCommentDots } from 'react-icons/fa';

export const PricingWorkflowModal = ({
  isOpen,
  isEn,
  activeModalTab,
  setActiveModalTab,
  onClose,
  onContact
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="workflow-modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="workflow-modal-dialog"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-top-bar">
          <div className="modal-title-group">
            <span className="modal-tag">BẢNG BÓC TÁCH MINH BẠCH</span>
            <h3>{isEn ? "Quotation & Contract Workflow (From Excel Model)" : "Quy Trình Báo Giá & Ký Hợp Đồng Chi Tiết (Trích Từ Excel)"}</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <FaTimes />
          </button>
        </div>

        {/* TABS */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeModalTab === 'manday' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('manday')}
          >
            <FaCogs /> {isEn ? "1. How Man-Days Are Priced" : "1. Bóc Tách Man-day & Đánh Đổi Giá Trị"}
          </button>
          <button 
            className={`modal-tab ${activeModalTab === 'contract' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('contract')}
          >
            <FaFileContract /> {isEn ? "2. Contract & 40/60 Payment" : "2. Hợp Đồng & Cọc 40/60"}
          </button>
          <button 
            className={`modal-tab ${activeModalTab === 'penalty' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('penalty')}
          >
            <FaShieldAlt /> {isEn ? "3. Early Bonus / Delay Penalty" : "3. Thưởng Sớm / Phạt Trễ"}
          </button>
          <button 
            className={`modal-tab ${activeModalTab === 'upgrade' ? 'active' : ''}`}
            onClick={() => setActiveModalTab('upgrade')}
          >
            <FaSyncAlt /> {isEn ? "4. Feature Request & Upgrades" : "4. Phát Sinh FR & Nâng Cấp Sau"}
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="modal-body-content">
          {activeModalTab === 'manday' && (
            <div className="tab-pane">
              <div className="alert-info-box">
                <strong>
                  <FaLightbulb size={12} style={{ marginRight: '6px' }} />
                  {isEn ? "Core Value Exchange:" : "Số tiền của bạn được đánh đổi thế nào?"}
                </strong>
                <p>{isEn 
                  ? "You are paying for genuine engineering hours, zero-bloat Clean Architecture code, dedicated Cloud VPS servers, and guaranteed delivery — not agency sales commissions." 
                  : "Khách hàng đầu tư trực tiếp vào giờ công kỹ sư thực tế, mã nguồn sạch không dùng template rác, máy chủ Cloud VPS tốc độ cao và cam kết nghiệm thu thực tế — không phải gánh chi phí văn phòng hay hoa hồng sales."}
                </p>
              </div>

              <div className="modal-table-wrap">
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Hạng Mục Phân Bổ</th>
                      <th>Gói MVP (1-2 Devs)</th>
                      <th>Gói Toàn Diện (Full Scope)</th>
                      <th>Ghi Chú Giá Trị Thực Tế</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Phạm Vi Chức Năng</strong></td>
                      <td>UC01 - UC12 + NFR01-03 (12 Use Case cốt lõi)</td>
                      <td>UC01 - UC26 + NFR01-03 (26 Use Case đầy đủ)</td>
                      <td>Đầy đủ sàn TMĐT, VietQR, AI DeepSeek</td>
                    </tr>
                    <tr>
                      <td><strong>Khối Lượng Kỹ Sư</strong></td>
                      <td>23 Man-day công việc</td>
                      <td>63 - 75 Man-day công việc</td>
                      <td>Frontend, Backend, Database, QA/QC</td>
                    </tr>
                    <tr>
                      <td><strong>Chiết Khấu Trợ Giá Dev</strong></td>
                      <td><span className="badge-discount">-50% Đơn Giá Thị Trường</span></td>
                      <td><span className="badge-discount">-50% Đơn Giá Thị Trường</span></td>
                      <td>Chính sách trợ giá cho chủ shop khởi nghiệp</td>
                    </tr>
                    <tr>
                      <td><strong>Hạ Tầng Máy Chủ (VPS)</strong></td>
                      <td>Tặng trọn gói 1 năm Cloud Server</td>
                      <td>Tặng trọn gói 1 năm Cloud Server</td>
                      <td>Máy chủ riêng biệt, IP tĩnh, SSL bảo mật</td>
                    </tr>
                    <tr>
                      <td><strong>Đàm Phán Thực Tế</strong></td>
                      <td><strong>Có Thể Thương Lượng</strong></td>
                      <td><strong>Có Thể Thương Lượng</strong></td>
                      <td>Bóc tách tính năng linh hoạt theo ngân sách</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeModalTab === 'contract' && (
            <div className="tab-pane">
              <h4>Lộ Trình Ký Hợp Đồng Dân Sự & Thanh Toán An Toàn 40/60</h4>
              <p className="tab-desc">Khách hàng hoàn toàn an tâm: Tiền của bạn chỉ được thanh toán toàn bộ sau khi đã tận mắt kiểm tra hệ thống hoạt động ổn định trên môi trường thực tế.</p>
              
              <div className="timeline-cards">
                <div className="timeline-card">
                  <div className="t-badge">GIAI ĐOẠN 1</div>
                  <h5>Ký Hợp Đồng Dân Sự & Đặt Cọc 40%</h5>
                  <p>Leader Lê Trí Trung đứng tên đại diện pháp lý, ký hợp đồng có đầy đủ phụ lục yêu cầu kỹ thuật, mốc deadline và điều khoản cam kết bồi thường.</p>
                </div>
                <div className="timeline-card">
                  <div className="t-badge">GIAI ĐOẠN 2</div>
                  <h5>Triển Khai & Báo Cáo Tiến Độ Từng Sprint</h5>
                  <p>Team cập nhật link chạy thử nghiệm định kỳ, chủ shop theo dõi trực quan các màn hình đang hoàn thiện trên điện thoại.</p>
                </div>
                <div className="timeline-card highlight">
                  <div className="t-badge success">GIAI ĐOẠN 3</div>
                  <h5>Nghiệm Thu Môi Trường Thật & Thanh Toán 60% Còn Lại</h5>
                  <p>Chỉ khi toàn bộ tính năng đặt hàng, thanh toán VietQR hoạt động mượt mà và chủ shop hài lòng 100%, mới tiến hành thanh toán phần còn lại.</p>
                </div>
              </div>
            </div>
          )}

          {activeModalTab === 'penalty' && (
            <div className="tab-pane">
              <h4>Quy Chế Thưởng Hoàn Thành Sớm / Phạt Bồi Thường Trễ Tiến Độ</h4>
              <p className="tab-desc">Cam kết tiến độ bằng văn bản rõ ràng, đảm bảo kế hoạch khai trương bán hàng của bạn không bao giờ bị trì hoãn.</p>
              
              <div className="penalty-grid-modal">
                <div className="penalty-card green">
                  <div className="p-header">THƯỞNG HOÀN THÀNH SỚM</div>
                  <ul>
                    <li><strong>2 Ngày Ân Hạn:</strong> Tránh sai số nhỏ về lịch biểu.</li>
                    <li><strong>Thưởng Theo Ngày:</strong> Mỗi ngày sớm hơn thỏa thuận (sau ân hạn), khách thưởng một khoản % giá trị hợp đồng để động viên team tăng ca thần tốc.</li>
                    <li><strong>Có Mức Trần Tối Đa:</strong> Minh bạch giới hạn tối đa ngay trong hợp đồng.</li>
                  </ul>
                </div>
                <div className="penalty-card red">
                  <div className="p-header">PHẠT BỒI THƯỜNG TRỄ HẠN</div>
                  <ul>
                    <li><strong>Cam Kết Bồi Thường:</strong> Nếu chậm tiến độ do lỗi chủ quan của dev, dev chịu phạt trừ tiền theo từng ngày trễ.</li>
                    <li><strong>Trừ Trực Tiếp:</strong> Tiền phạt được trừ thẳng vào khoản thanh toán cuối cùng khi nghiệm thu.</li>
                    <li><strong>Bảo Vệ Chủ Shop:</strong> Đảm bảo chủ shop không bao giờ chịu thiệt hại về cơ hội kinh doanh.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeModalTab === 'upgrade' && (
            <div className="tab-pane">
              <h4>Quy Chế Xử Lý Feature Request (FR) & Nâng Cấp Hệ Thống Sau Này</h4>
              <p className="tab-desc">Lộ trình nâng cấp linh hoạt: Bạn có thể bắt đầu với gói MVP chi phí tối thiểu, sau này mở rộng quy mô khi doanh thu tăng trưởng.</p>
              
              <div className="upgrade-details">
                <div className="detail-item">
                  <h5>1. Bổ sung tính năng phát sinh (Feature Request - FR)</h5>
                  <p>Trong quá trình làm, nếu bạn nảy ra ý tưởng mới ngoài hợp đồng ban đầu, Leader sẽ lập tức bóc tách thành Man-day độc lập, báo giá cụ thể để bạn quyết định trước khi code, tuyệt đối không có chi phí ẩn.</p>
                </div>
                <div className="detail-item">
                  <h5>2. Cơ chế mua MVP trước, nâng cấp Đầy Đủ sau (+20% phụ phí)</h5>
                  <p>Nếu bạn chọn làm MVP trước, sau này nâng cấp lên sàn lớn trên hệ thống đang chạy thật (Production), chi phí sẽ áp dụng hệ số +20% do team phải đọc lại code, kiểm thử đa luồng và đảm bảo không làm gián đoạn khách hàng đang mua sắm.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="modal-footer-bar">
          <a 
            href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-modal-download"
            download
          >
            <FaArrowRight /> {isEn ? "Download Full Company Profile (PDF)" : "Tải Tài Liệu Báo Giá & Hồ Sơ Năng Lực (PDF)"}
          </a>
          <button onClick={onContact} className="btn-modal-contact">
            <FaCommentDots /> {isEn ? "Contact Leader for Negotiation" : "Thương Lượng Ngân Sách Với Leader"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
