import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaClock, 
  FaTag, 
  FaAward, 
  FaCommentDots, 
  FaFileContract, 
  FaArrowRight, 
  FaShieldAlt 
} from 'react-icons/fa';
import { fadeInUp, staggerContainer, cardPop } from './servicesData';

export const PricingSection = ({
  isEn,
  onSelectPlan,
  onOpenWorkflowModal
}) => {
  return (
    <section id="pricing-section" className="section-container" style={{ scrollMarginTop: '170px' }}>
      <motion.div 
        className="section-header"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-eyebrow">{isEn ? "TRANSPARENT QUOTATION" : "BẢNG GIÁ MINH BẠCH"}</div>
        <h2 className="section-heading">{isEn ? "Engineered Packages for Small Businesses" : "Các Gói Dịch Vụ Thiết Kế Web Phù Hợp Từng Giai Đoạn"}</h2>
        <p className="section-desc">
          {isEn 
            ? "Calculated transparently on actual engineering man-days with a 50% discount policy applied for small shop owners."
            : "Chi phí tính minh bạch theo man-day công việc thực tế, đã áp dụng chính sách trợ giá 50% cho chủ shop khởi nghiệp."}
        </p>
      </motion.div>

      <motion.div 
        className="pricing-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Plan 1 */}
        <motion.div 
          className="pricing-card"
          variants={cardPop}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
          <div className="card-inner">
            <div className="plan-badge-row">
              <span className="plan-tag">GÓI 1 DEV</span>
            </div>
            <h3 className="plan-title">{isEn ? "Starter MVP" : "Gói MVP Khởi Nghiệp"}</h3>
            <p className="plan-desc">{isEn ? "Best for small boutiques, single product lines, or launching fast to test the market." : "Phù hợp cho cá nhân, shop mới mở, cần ra mắt web nhanh để bán hàng và thử nghiệm thị trường với chi phí tiết kiệm nhất."}</p>

            <div className="plan-pricing-row">
              <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
              <div className="price-num">11.500.000₫</div>
              <div className="price-speed">
                <FaClock size={11} style={{ marginRight: '6px' }} />
                {isEn ? "Average timeline: ~1.5 - 2 months" : "Thời gian thực hiện: ~1.5 - 2 tháng"}
              </div>
            </div>

            <ul className="features-list">
              <li><FaCheckCircle /> {isEn ? "Tailored UI/UX matching brand identity" : "Giao diện thiết kế theo yêu cầu, chuẩn nhận diện thương hiệu"}</li>
              <li><FaCheckCircle /> {isEn ? "100% Mobile & Tablet Responsive" : "Tương thích 100% điện thoại, iPad, máy tính"}</li>
              <li><FaCheckCircle /> {isEn ? "Product/service catalog & contact inquiry form" : "Danh mục sản phẩm/dịch vụ, trang giới thiệu, form liên hệ"}</li>
              <li><FaCheckCircle /> {isEn ? "Floating Hotline, Zalo & Messenger buttons" : "Nút gọi Hotline, chat Zalo, Messenger nổi tiện lợi"}</li>
              <li><FaCheckCircle /> {isEn ? "Google SEO Ready + Free SSL Certificate" : "Chuẩn SEO Google cơ bản, chứng chỉ bảo mật SSL"}</li>
              <li><FaCheckCircle /> {isEn ? "Free Cloud VPS/Domain setup & hosting optimization" : "Hỗ trợ kết nối tên miền & cấu hình hosting tối ưu chi phí"}</li>
              <li><FaCheckCircle /> {isEn ? "6 Months Free Technical Warranty" : "Bảo hành kỹ thuật & sửa lỗi miễn phí 6 tháng"}</li>
            </ul>

            <button onClick={onSelectPlan} className="btn-select-plan">
              {isEn ? "Choose Starter MVP" : "Chọn Gói Khởi Nghiệp"}
            </button>
          </div>
        </motion.div>

        {/* Plan 2 */}
        <motion.div 
          className="pricing-card featured"
          variants={cardPop}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div className="card-stripe" style={{ backgroundColor: 'var(--color-ink)' }} />
          <div className="card-inner">
            <div className="plan-badge-row">
              <span className="plan-tag">GÓI 2 DEVS</span>
              <span className="highlight-chip">{isEn ? "RECOMMENDED • 2 DEVS" : "ĐỀ XUẤT • 2 KỸ SƯ"}</span>
            </div>
            <h3 className="plan-title">{isEn ? "Fast MVP (2 Devs)" : "Gói MVP Tốc Hành (2 Devs)"}</h3>
            <p className="plan-desc">{isEn ? "Two engineers working in parallel on frontend and backend to accelerate delivery with rock-solid quality." : "Dành cho shop cần ra mắt chuyên nghiệp với quy trình chuẩn. Hai kỹ sư phụ trách song song Frontend & Backend, tối ưu chất lượng và tiến độ!"}</p>

            <div className="plan-pricing-row">
              <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
              <div className="price-num">18.500.000₫</div>
              <div className="price-speed">
                <FaClock size={11} style={{ marginRight: '6px' }} />
                {isEn ? "Average timeline: ~1.5 - 2 months (2 Devs)" : "Thời gian thực hiện: ~1.5 - 2 tháng (2 Kỹ sư)"}
              </div>
            </div>

            <ul className="features-list">
              <li><FaCheckCircle /> {isEn ? "All features from Starter MVP" : "Toàn bộ tính năng của Gói Khởi Nghiệp"}</li>
              <li><FaCheckCircle /> <strong>{isEn ? "2 Engineers Working Simultaneously (Frontend & Backend)" : "2 Kỹ sư code song song Frontend & Backend"}</strong></li>
              <li><FaCheckCircle /> {isEn ? "Dynamic VietQR Payment Integration" : "Tích hợp cổng thanh toán VietQR động tự điền số tiền"}</li>
              <li><FaCheckCircle /> {isEn ? "Order Tracking & Telegram/Zalo notification webhook" : "Quản lý đơn hàng tinh gọn, thông báo qua Telegram/Zalo Webhook"}</li>
              <li><FaCheckCircle /> {isEn ? "Admin CMS Panel for products & pricing" : "Cổng quản trị nội dung dễ dùng (sản phẩm, giá, đơn hàng)"}</li>
              <li><FaCheckCircle /> {isEn ? "Free Lifetime Cloud VPS & SSL Setup" : "Miễn phí cài đặt Cloud VPS & chứng chỉ SSL trọn đời"}</li>
              <li><FaCheckCircle /> {isEn ? "8 Months Free Technical Warranty" : "Bảo hành kỹ thuật & hỗ trợ vận hành 8 tháng"}</li>
            </ul>

            <button onClick={onSelectPlan} className="btn-select-plan is-featured">
              {isEn ? "Choose Fast MVP" : "Chọn Gói Tốc Hành"}
            </button>
          </div>
        </motion.div>

        {/* Plan 3 */}
        <motion.div 
          className="pricing-card"
          variants={cardPop}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div className="card-stripe" style={{ backgroundColor: 'var(--color-hairline)' }} />
          <div className="card-inner">
            <div className="plan-badge-row">
              <span className="plan-tag">FULL SCOPE (5 DEVS)</span>
            </div>
            <h3 className="plan-title">{isEn ? "Full Enterprise E-Commerce" : "Gói Chuyên Nghiệp Toàn Diện"}</h3>
            <p className="plan-desc">{isEn ? "Complete e-commerce platform with automated payment, inventory, multi-roles and AI assistant." : "Dành cho thương hiệu, sàn giao dịch, cửa hàng lớn cần tính năng thanh toán tự động, quản lý kho và trợ lý AI thông minh."}</p>

            <div className="plan-pricing-row">
              <span className="price-label">{isEn ? "Turnkey Standard Price" : "Chi Phí Niêm Yết"}</span>
              <div className="price-num">33.000.000₫</div>
              <div className="price-speed">
                <FaClock size={11} style={{ marginRight: '6px' }} />
                {isEn ? "Average timeline: ~2 - 2.5 months (5 Devs)" : "Thời gian thực hiện: ~2 - 2.5 tháng (Team 5 kỹ sư)"}
              </div>
            </div>

            <ul className="features-list">
              <li><FaCheckCircle /> {isEn ? "Full E-Commerce / Marketplace: Cart, Orders, Stock" : "Đầy đủ nền tảng Sàn TMĐT / Marketplace: Giỏ hàng, đơn hàng, tồn kho"}</li>
              <li><FaCheckCircle /> {isEn ? "Multi-gateway: VietQR Webhook auto-match, VNPay" : "Tích hợp đa phương thức: VietQR Webhook tự động khớp lệnh, VNPay"}</li>
              <li><FaCheckCircle /> <strong>{isEn ? "Integrated AI Assistant (DeepSeek API) 24/7" : "Tích hợp Trợ lý AI (DeepSeek API) tư vấn & tra cứu 24/7"}</strong></li>
              <li><FaCheckCircle /> {isEn ? "Advanced Admin Dashboard with Analytics" : "Bảng điều khiển quản trị chuyên sâu (Dashboard phân tích doanh thu)"}</li>
              <li><FaCheckCircle /> {isEn ? "Full Source Code Handover & Tech Docs" : "Bàn giao toàn bộ mã nguồn (Full Source Code) & tài liệu kỹ thuật"}</li>
              <li><FaCheckCircle /> {isEn ? "Top Google SEO optimization & CDN <1s" : "Tối ưu SEO Google chuyên sâu, CDN tăng tốc độ tải trang <1s"}</li>
              <li><FaCheckCircle /> {isEn ? "12 Months Priority Warranty & 24/7 Support" : "Bảo hành kỹ thuật ưu tiên 12 tháng + Hỗ trợ trực tiếp 24/7"}</li>
            </ul>

            <button onClick={onSelectPlan} className="btn-select-plan">
              {isEn ? "Consult Enterprise" : "Tư Vấn Gói Toàn Diện"}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* NEGOTIATION & STARTUP SUBSIDY HOOK BANNER */}
      <motion.div 
        className="negotiation-banner"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="banner-top-row">
          <div className="banner-badge">
            <FaTag size={11} style={{ marginRight: '6px' }} />
            <span>{isEn ? "FLEXIBLE BUDGET NEGOTIATION POLICY" : "CHÍNH SÁCH THƯƠNG LƯỢNG & ĐÀM PHÁN GIÁ LINH HOẠT"}</span>
          </div>
          <span className="sub-tag">
            <FaAward size={11} style={{ marginRight: '5px' }} />
            {isEn ? "Startup Subsidies 20% – 30%" : "Trợ giá khởi nghiệp 20% – 30%"}
          </span>
        </div>
        <h3 className="banner-title">
          {isEn 
            ? "Worried about the cost? We customize scope to fit your exact budget!"
            : "Bảng giá trên là mức niêm yết chuẩn — Chúng tôi hoàn toàn sẵn sàng đàm phán linh hoạt theo ngân sách của bạn!"}
        </h3>
        <p className="banner-desc">
          {isEn
            ? "We understand non-technical shops have different launch constraints. You don't have to take a rigid bundle: our team can split features into modular phases so you only pay for what brings immediate sales, saving up to 30%."
            : "Chúng tôi hiểu mỗi chủ shop có nguồn lực và ưu tiên khác nhau khi bắt đầu. Bạn KHÔNG cần phải mua một gói cồng kềnh: Team sẵn sàng bóc tách tính năng theo từng giai đoạn (modular scope) để bạn chỉ trả tiền cho những gì thực sự tạo ra doanh thu ngay, tiết kiệm tối đa chi phí."}
        </p>
        <div className="banner-actions">
          <button onClick={onSelectPlan} className="btn-negotiate">
            <FaCommentDots /> {isEn ? "Negotiate Custom Budget" : "Trao Đổi Thương Lượng Ngân Sách Riêng"}
          </button>
          <button onClick={onOpenWorkflowModal} className="btn-learn-pricing">
            <FaFileContract /> {isEn ? "See Man-Day Breakdown & Contract Terms" : "Xem Cách Tính Man-day & Ký Hợp Đồng"}
          </button>
          <a 
            href="/docs/Ho_So_Nang_Luc_Va_Bao_Gia_Website.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-download-pdf"
            download
          >
            <FaArrowRight /> {isEn ? "Download PDF Profile (LaTeX)" : "Tải Hồ Sơ Năng Lực & Báo Giá (PDF)"}
          </a>
        </div>
      </motion.div>

      {/* Policies */}
      <motion.div 
        className="policy-box"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="policy-header">
          <FaShieldAlt size={18} />
          <span>{isEn ? "Transparent Policy Guarantees (Extracted from Contract Model)" : "Chính Sách Cam Kết Minh Bạch (Trích Từ Hợp Đồng Thực Tế)"}</span>
        </div>
        <div className="policy-grid">
          <div className="policy-cell">
            <strong>1. {isEn ? "Safe Payment Milestones" : "Lộ Trình Thanh Toán An Toàn"}:</strong><br />
            {isEn ? "Deposit 30 - 50% upon signing civil contract. Remaining balance is paid only after inspecting and approving the live website." : "Khách hàng đặt cọc 30 - 50% khi ký hợp đồng. Chỉ thanh toán phần còn lại sau khi đã nghiệm thu hài lòng trên môi trường thực tế."}
          </div>
          <div className="policy-cell">
            <strong>2. {isEn ? "Timeline Commitment" : "Cam Kết Thưởng Sớm / Phạt Trễ"}:</strong><br />
            {isEn ? "Contract specifies daily penalty deductions for unexcused delays, ensuring your business launch date is fully respected." : "Hợp đồng ghi rõ điều khoản bồi thường phạt trừ tiền nếu bàn giao trễ hạn đã thống nhất; thưởng nếu hoàn thành sớm trước thời hạn."}
          </div>
          <div className="policy-cell">
            <strong>3. {isEn ? "Flexible Upgrade" : "Lộ Trình Nâng Cấp Linh Hoạt"}:</strong><br />
            {isEn ? "Start with the MVP package today and expand to full e-commerce later without re-writing your codebase from scratch." : "Chủ shop hoàn toàn có thể bắt đầu với gói MVP để tiết kiệm chi phí, sau này nâng cấp lên gói Đầy Đủ mà không cần đập đi xây lại!"}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
