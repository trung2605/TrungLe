import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaPaperPlane, 
  FaInstagram, 
  FaGithub, 
  FaLinkedin, 
  FaArrowRight, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaCopy, 
  FaCheck,
  FaClock,
  FaBolt,
  FaShieldAlt,
  FaCode,
  FaRobot,
  FaQrcode
} from 'react-icons/fa';
import ZaloIcon from '../ui/icons/ZaloIcon';
import { personalInfo } from '../../data';
import { useTranslation } from 'react-i18next';
import emailService, { generateMailtoLink } from '../../services/emailService';
import { Button } from '../ui/Button';

// TOPIC CHIPS GỢI Ý NHANH
const TOPIC_CHIPS = [
  {
    id: 'web-saas',
    icon: FaCode,
    labelVi: 'Website & SaaS',
    labelEn: 'Web & SaaS',
    subjectVi: 'Tư vấn phát triển Website / Nền tảng SaaS',
    subjectEn: 'Inquiry for Web / SaaS Development',
    messageVi: 'Chào Trung, tôi đang có nhu cầu xây dựng một hệ thống website/SaaS cho doanh nghiệp. Mong muốn được tư vấn kiến trúc kỹ thuật và báo giá thực hiện.',
    messageEn: 'Hi Trung, I would like to develop a web/SaaS platform for my business. Looking forward to discussing technical architecture and estimation.'
  },
  {
    id: 'ai-automation',
    icon: FaRobot,
    labelVi: 'AI Agent & Automation',
    labelEn: 'AI & Automation',
    subjectVi: 'Tích hợp AI Agent & Tự động hóa quy trình',
    subjectEn: 'AI Agent & Workflow Automation Integration',
    messageVi: 'Chào Trung, tôi muốn tích hợp giải pháp AI Agent (DeepSeek/n8n) để tự động hóa khâu tư vấn và xử lý dữ liệu cho hệ thống hiện tại.',
    messageEn: 'Hi Trung, I want to integrate AI Agents and workflow automation into my current business system to save operational overhead.'
  },
  {
    id: 'vietqr',
    icon: FaQrcode,
    labelVi: 'Tự động hóa VietQR',
    labelEn: 'VietQR Webhook',
    subjectVi: 'Tích hợp cổng VietQR Webhook đối soát tự động',
    subjectEn: 'VietQR Webhook & Auto-Reconciliation Integration',
    messageVi: 'Chào Trung, tôi muốn tích hợp giải pháp thanh toán tự động VietQR (khớp lệnh <0.5s, 0đ phí) tương tự giải pháp bạn đã vận hành trên biensovip.com.',
    messageEn: 'Hi Trung, I am looking to integrate an automated VietQR payment matching webhook (<0.5s response, 0 cost per transaction) similar to biensovip.com.'
  },
  {
    id: 'consulting',
    icon: FaShieldAlt,
    labelVi: 'Tư vấn 1-1 với Tech Lead',
    labelEn: 'Tech Lead Consulting',
    subjectVi: 'Đặt lịch tư vấn kiến trúc hệ thống 1-1',
    subjectEn: '1-on-1 Technical Architecture Consultation',
    messageVi: 'Chào Trung, tôi cần tư vấn chuyên sâu về giải pháp Clean Architecture, tối ưu hóa CSDL PostgreSQL hoặc kiểm toán bảo mật cho dự án.',
    messageEn: 'Hi Trung, I need specialized consultation on Clean Architecture, PostgreSQL optimization, or security audit for our production system.'
  }
];

const Contact = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isEn = (i18n.language || 'vi').startsWith('en');
  const serviceFromNav = location.state?.service;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: serviceFromNav ? `Tư vấn module: ${serviceFromNav}` : '',
    message: serviceFromNav
      ? `Tôi cần tư vấn & báo giá chi tiết về module "${serviceFromNav}" cho hệ thống website của chúng tôi.`
      : ''
  });

  const [selectedTopic, setSelectedTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  const rawPhone = personalInfo.contact?.phone || '+84 912158715';
  const cleanPhone = rawPhone.replace(/[^\d]/g, '');
  const zaloDigits = cleanPhone.startsWith('84') ? cleanPhone : cleanPhone.replace(/^0/, '84');
  const telNumber = cleanPhone.startsWith('84') ? `+${cleanPhone}` : `+84${cleanPhone.replace(/^0/, '')}`;
  const zaloUrl = `https://zalo.me/${zaloDigits}`;
  const targetEmail = personalInfo.contact?.email || 'letritrung2605@gmail.com';

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2500);
    }
  };

  const handleSelectTopic = (chip) => {
    setSelectedTopic(chip.id);
    setFormData(prev => ({
      ...prev,
      subject: isEn ? chip.subjectEn : chip.subjectVi,
      message: isEn ? chip.messageEn : chip.messageVi
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error(isEn ? 'Please fill in all required fields.' : 'Vui lòng điền đầy đủ các trường bắt buộc.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        throw new Error(isEn ? 'Invalid email format.' : 'Địa chỉ email không đúng định dạng.');
      }

      const result = await emailService.sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedTopic('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || (isEn ? 'Could not deliver email automatically.' : 'Không thể gửi email tự động lúc này.'));
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err.message || (isEn ? 'Failed to send message.' : 'Gửi tin nhắn không thành công.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = generateMailtoLink(formData);

  return (
    <div style={{ paddingTop: '28px', paddingBottom: '96px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>

      {/* ── 1. HEADER SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '32px', textAlign: 'center' }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.25)',
          marginBottom: '16px'
        }}>
          <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#22c55e', opacity: 0.75, animation: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
            <span style={{ position: 'relative', display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11.5px', fontWeight: 600, color: '#15803d', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            {isEn ? 'Available for New Projects & Systems Consulting' : 'Sẵn sàng nhận dự án mới & Tư vấn kỹ thuật'}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 4.5vw, 44px)',
          fontWeight: 400,
          letterSpacing: '-1px',
          color: 'var(--color-ink)',
          margin: '0 0 12px',
          fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif'
        }}>
          {isEn ? "Let's Build Something Exceptional" : 'Kết nối trực tiếp với Tech Lead'}
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 17px)',
          fontWeight: 340,
          lineHeight: 1.6,
          color: 'var(--color-ink-soft)',
          maxWidth: '680px',
          margin: '0 auto'
        }}>
          {isEn 
            ? "Direct 1-on-1 collaboration with no middlemen. Share your ideas, business requirements, or architectural challenges for an instant engineering assessment."
            : "Làm việc 1-1 trực tiếp với Tech Lead — không qua trung gian. Nhận tư vấn giải pháp, phân tích kỹ thuật và ước lượng chi phí rõ ràng trong 15-30 phút."}
        </p>
      </motion.div>

      {/* ── 2. QUICK ACTION CARDS (TÍNH NĂNG LIÊN HỆ NHANH) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '36px'
        }}
      >
        {/* CARD 1: ZALO NHANH */}
        <div 
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}
          className="hover-card-elevation"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(0, 104, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ZaloIcon size={24} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', fontWeight: 600, color: '#0284c7', backgroundColor: 'rgba(2, 132, 199, 0.1)', padding: '3px 8px', borderRadius: '9999px' }}>
                <FaBolt size={9} style={{ display: 'inline', marginRight: '4px' }} />
                {isEn ? 'Fastest' : 'Nhanh nhất'}
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: 'var(--color-ink)' }}>
              {isEn ? 'Zalo Instant Chat' : 'Nhắn tin qua Zalo'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', margin: '0 0 16px', lineHeight: 1.5 }}>
              {isEn ? 'Direct chat with Tech Lead for immediate response.' : 'Trao đổi trực tiếp, nhận phản hồi ngay lập tức.'}
            </p>
          </div>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#0068FF',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 540,
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{isEn ? 'Open Zalo Chat' : 'Mở Zalo nhắn ngay'}</span>
            <FaArrowRight size={11} />
          </a>
        </div>

        {/* CARD 2: GỌI ĐIỆN / HOTLINE */}
        <div 
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}
          className="hover-card-elevation"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                <FaPhoneAlt size={18} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', fontWeight: 600, color: '#16a34a', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '3px 8px', borderRadius: '9999px' }}>
                <FaClock size={9} style={{ display: 'inline', marginRight: '4px' }} />
                8:00 - 22:00
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: 'var(--color-ink)' }}>
              {isEn ? 'Direct Phone Call' : 'Hotline Kỹ thuật'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', margin: '0 0 16px', lineHeight: 1.5 }}>
              {rawPhone}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={`tel:${telNumber}`}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-canvas)',
                fontSize: '13px',
                fontWeight: 540,
                textDecoration: 'none'
              }}
            >
              <FaPhoneAlt size={11} /> {isEn ? 'Call' : 'Gọi ngay'}
            </a>
            <button
              onClick={() => handleCopy(rawPhone, 'phone')}
              title={isEn ? 'Copy phone number' : 'Sao chép số điện thoại'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid var(--color-hairline)',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {copiedKey === 'phone' ? <FaCheck size={13} style={{ color: '#16a34a' }} /> : <FaCopy size={13} />}
            </button>
          </div>
        </div>

        {/* CARD 3: EMAIL CÁ NHÂN */}
        <div 
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}
          className="hover-card-elevation"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                <FaEnvelope size={18} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', fontWeight: 600, color: '#dc2626', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '3px 8px', borderRadius: '9999px' }}>
                24/7
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: 'var(--color-ink)' }}>
              {isEn ? 'Direct Inbox' : 'Email Trực Tiếp'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--color-ink-soft)', margin: '0 0 16px', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {targetEmail}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={`mailto:${targetEmail}`}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-canvas)',
                fontSize: '13px',
                fontWeight: 540,
                textDecoration: 'none'
              }}
            >
              <FaEnvelope size={11} /> {isEn ? 'Open Mail' : 'Mở Mail'}
            </a>
            <button
              onClick={() => handleCopy(targetEmail, 'email')}
              title={isEn ? 'Copy email address' : 'Sao chép địa chỉ email'}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid var(--color-hairline)',
                backgroundColor: 'var(--color-surface-soft)',
                color: 'var(--color-ink)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              {copiedKey === 'email' ? <FaCheck size={13} style={{ color: '#16a34a' }} /> : <FaCopy size={13} />}
            </button>
          </div>
        </div>

        {/* CARD 4: ĐÀ NẴNG / MEET */}
        <div 
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-hairline)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
          }}
          className="hover-card-elevation"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'rgba(147, 51, 234, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
                <FaMapMarkerAlt size={18} />
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10.5px', fontWeight: 600, color: '#9333ea', backgroundColor: 'rgba(147, 51, 234, 0.1)', padding: '3px 8px', borderRadius: '9999px' }}>
                Đà Nẵng
              </span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px', color: 'var(--color-ink)' }}>
              {isEn ? 'Work Location' : 'Địa Điểm Làm Việc'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', margin: '0 0 16px', lineHeight: 1.5 }}>
              {personalInfo.contact?.location || 'Ngũ Hành Sơn, TP. Đà Nẵng'}
            </p>
          </div>
          <div style={{
            padding: '9px 12px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-surface-soft)',
            border: '1px solid var(--color-hairline)',
            fontSize: '12px',
            color: 'var(--color-ink-soft)',
            textAlign: 'center'
          }}>
            🤝 {isEn ? 'Available for In-Person or Remote' : 'Gặp gỡ trực tiếp hoặc Online Meet'}
          </div>
        </div>
      </motion.div>

      {/* ── 3. FORM CONTAINER VỚI LIME BLOCK NÂNG CẤP ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: '#dceeb1',
          borderRadius: '24px',
          padding: '36px 32px',
          marginBottom: '36px',
          border: '1px solid rgba(0,0,0,0.06)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px' }}>

          {/* CỘT TRÁI: TOPIC CHIPS & CAM KẾT CHẤT LƯỢNG */}
          <div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              color: '#374151',
              fontWeight: 600,
              display: 'block',
              marginBottom: '10px'
            }}>
              {isEn ? 'FAST TOPIC SELECTOR' : 'GỢI Ý CHỌN NHANH NHU CẦU'}
            </span>

            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              fontWeight: 540,
              letterSpacing: '-0.4px',
              color: '#000000',
              margin: '0 0 12px'
            }}>
              {isEn ? 'What can we collaborate on?' : 'Bạn đang quan tâm đến giải pháp nào?'}
            </h2>

            <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px' }}>
              {isEn
                ? 'Click on any topic chip below to instantly pre-fill the inquiry form with a tailored brief.'
                : 'Bấm vào một trong các chủ đề dưới đây để hệ thống tự động điền sẵn khung nội dung tư vấn vào form.'}
            </p>

            {/* CHIP BUTTONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {TOPIC_CHIPS.map((chip) => {
                const IconComponent = chip.icon;
                const isSelected = selectedTopic === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handleSelectTopic(chip)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#000000' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#111827',
                      border: isSelected ? '1px solid #000000' : '1px solid rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <IconComponent size={14} style={{ color: isSelected ? '#ffffff' : '#374151' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>
                        {isEn ? chip.labelEn : chip.labelVi}
                      </div>
                      <div style={{ fontSize: '11.5px', opacity: isSelected ? 0.8 : 0.65, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {isEn ? chip.subjectEn : chip.subjectVi}
                      </div>
                    </div>
                    {isSelected && <FaCheck size={12} style={{ color: '#22c55e', flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>

            {/* TECH LEAD ASSURANCES */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.65)',
              borderRadius: '14px',
              padding: '16px',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FaShieldAlt size={14} style={{ color: '#059669' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                  {isEn ? 'Engineering Standards & Guarantees' : 'Cam kết từ Tech Lead'}
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#4b5563', lineHeight: 1.65 }}>
                <li>{isEn ? 'Direct source code ownership, clean git history.' : 'Bàn giao 100% mã nguồn sạch, kiến trúc chuẩn Clean Architecture.'}</li>
                <li>{isEn ? 'Sub-second payment reconciliation & SLA guarantees.' : 'Bảo hành kỹ thuật dài hạn, hỗ trợ trực tiếp không qua trung gian.'}</li>
                <li>{isEn ? 'Response within 15-30 minutes during business hours.' : 'Phản hồi nhanh trong 15-30 phút suốt khung giờ làm việc.'}</li>
              </ul>
            </div>
          </div>

          {/* CỘT PHẢI: FORM GỬI TIN NHẮN CAO CẤP */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-ink)', margin: '0 0 6px' }}>
              {isEn ? 'Send an Engineering Inquiry' : 'Gửi Yêu Cầu Tư Vấn Kỹ Thuật'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', margin: '0 0 20px' }}>
              {isEn
                ? 'Your message is forwarded directly to letritrung2605@gmail.com inbox.'
                : 'Tin nhắn gửi trực tiếp đến hòm thư cá nhân letritrung2605@gmail.com.'}
            </p>

            {/* STATUS NOTIFICATIONS */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: '20px',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  color: '#15803d'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                  <FaCheckCircle size={16} />
                  <span>{isEn ? 'Message Delivered Successfully!' : 'Gửi thành công vào hòm thư!'}</span>
                </div>
                <div style={{ fontSize: '12.5px', lineHeight: 1.5, opacity: 0.9 }}>
                  {isEn
                    ? 'Thank you for reaching out. Trung will review and reply within 15-30 minutes.'
                    : 'Cảm ơn bạn đã liên hệ. Trung đã nhận được thư và sẽ phản hồi trong vòng 15-30 phút.'}
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: '20px',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '12px',
                  color: '#b91c1c'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                  <FaExclamationCircle size={16} />
                  <span>{isEn ? 'Notice on Delivery' : 'Thông báo gửi thư'}</span>
                </div>
                <div style={{ fontSize: '12.5px', lineHeight: 1.5, marginBottom: '10px' }}>
                  {errorMessage || (isEn ? 'Could not forward message automatically.' : 'Chưa thể gửi tự động qua cổng API.')}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href={mailtoFallbackUrl}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <FaEnvelope size={11} /> {isEn ? 'Open Mail App with This Message' : 'Mở ứng dụng Email gửi ngay'}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(`[${formData.subject}]\nTừ: ${formData.name} (${formData.email})\n\n${formData.message}`, 'formdata')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-ink)',
                      border: '1px solid var(--color-hairline)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {copiedKey === 'formdata' ? <FaCheck size={11} style={{ color: '#16a34a' }} /> : <FaCopy size={11} />}
                    {copiedKey === 'formdata' ? (isEn ? 'Copied!' : 'Đã chép!') : (isEn ? 'Copy message' : 'Sao chép nội dung')}
                  </button>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '6px' }}>
                    {isEn ? 'Your Name *' : 'Họ và tên của bạn *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={isEn ? 'e.g. John Doe' : 'Ví dụ: Nguyễn Văn A'}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: focusedField === 'name' ? 'var(--color-ink)' : 'var(--color-hairline)',
                      backgroundColor: 'var(--color-canvas)',
                      color: 'var(--color-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '6px' }}>
                    {isEn ? 'Your Email *' : 'Địa chỉ Email phản hồi *'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={isEn ? 'name@company.com' : 'email@congty.com'}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: focusedField === 'email' ? 'var(--color-ink)' : 'var(--color-hairline)',
                      backgroundColor: 'var(--color-canvas)',
                      color: 'var(--color-ink)',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease'
                    }}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '6px' }}>
                  {isEn ? 'Subject' : 'Tiêu đề trao đổi'}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={isEn ? 'Project requirements or consultation topic' : 'Chủ đề hoặc tên dự án cần phát triển'}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: focusedField === 'subject' ? 'var(--color-ink)' : 'var(--color-hairline)',
                    backgroundColor: 'var(--color-canvas)',
                    color: 'var(--color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease'
                  }}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField('')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '6px' }}>
                  {isEn ? 'Message Details *' : 'Nội dung chi tiết *'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={isEn ? 'Describe your system requirements, timeline, or questions...' : 'Mô tả sơ lược về ý tưởng, tính năng cần có hoặc thời gian bạn dự định triển khai...'}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: focusedField === 'message' ? 'var(--color-ink)' : 'var(--color-hairline)',
                    backgroundColor: 'var(--color-canvas)',
                    color: 'var(--color-ink)',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease',
                    lineHeight: 1.55
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full"
                style={{
                  padding: '13px 24px',
                  borderRadius: '10px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#ffffff', borderRadius: '9999px', animation: 'spin 0.8s linear infinite' }} />
                    <span>{isEn ? 'Forwarding to Inbox...' : 'Đang gửi thẳng vào hòm thư...'}</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} />
                    <span>{isEn ? 'Send Message to Tech Lead' : 'Gửi Tin Nhắn Trực Tiếp'}</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>

      {/* ── 4. SOCIAL & PROFESSIONAL NETWORKS ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-hairline)',
          gap: '16px'
        }}
      >
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 2px', color: 'var(--color-ink)' }}>
            {isEn ? 'Professional Portfolios & Social Channels' : 'Hồ Sơ Chuyên Môn & Mạng Xã Hội'}
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--color-ink-soft)', margin: 0 }}>
            {isEn ? 'Explore GitHub repositories, LinkedIn profile, and active social media.' : 'Xem thêm mã nguồn công khai trên GitHub, hồ sơ LinkedIn và các kênh kết nối.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { icon: FaGithub, label: 'GitHub', href: personalInfo.contact?.github || 'https://github.com/trung2605', color: '#181717' },
            { icon: FaLinkedin, label: 'LinkedIn', href: personalInfo.contact?.linkedin || 'https://www.linkedin.com/in/trung-l%C3%AA-7ba564283/', color: '#0A66C2' },
            { icon: FaFacebook, label: 'Facebook', href: personalInfo.contact?.facebook || 'https://www.facebook.com/trung.le.2605', color: '#1877F2' },
            { icon: FaInstagram, label: 'Instagram', href: personalInfo.contact?.instagram || 'https://www.instagram.com/trung.le.2605/?hl=en', color: '#E4405F' },
          ].map((soc, i) => {
            const SocIcon = soc.icon;
            return (
              <motion.a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--color-surface-soft)',
                  border: '1px solid var(--color-hairline)',
                  color: 'var(--color-ink)',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease'
                }}
              >
                <SocIcon size={14} />
                <span>{soc.label}</span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
