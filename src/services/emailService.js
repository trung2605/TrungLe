// Service for handling email functionality
// Uses Direct Gmail SMTP via /api/contact, with FormSubmit and Mailto fallbacks
// Completely eliminates EmailJS dependency

import { personalInfo } from '../data';

const TARGET_EMAIL = process.env.REACT_APP_CONTACT_EMAIL || personalInfo.contact?.email || 'letritrung2605@gmail.com';

class EmailService {
  constructor() {
    this.targetEmail = TARGET_EMAIL;
  }

  /**
   * Primary: Send email directly using Gmail SMTP via backend endpoint (/api/contact)
   * Works on both Vercel Serverless (production) and local dev proxy
   * @param {Object} formData
   * @returns {Promise<{success: boolean, message: string, data?: any}>}
   */
  async sendViaSMTP(formData) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `[Portfolio] Tin nhắn từ ${formData.name}`,
          message: formData.message,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok && data.success) {
          return {
            success: true,
            message: 'Tin nhắn đã được chuyển thẳng vào hòm thư Gmail của Lê Trí Trung!',
            data,
          };
        } else {
          throw new Error(data.message || 'Lỗi từ máy chủ SMTP');
        }
      } else {
        throw new Error(`Endpoint trả về status ${response.status}`);
      }
    } catch (err) {
      console.warn('Gửi qua SMTP server gặp lỗi, thử chuyển qua cổng fallback:', err);
      return {
        success: false,
        message: err.message || 'Lỗi kết nối SMTP',
        error: err,
      };
    }
  }

  /**
   * Fallback 1: Direct to Email via FormSubmit.co API (Free, forward straight to inbox)
   * @param {Object} formData
   */
  async sendViaFormSubmit(formData) {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(this.targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: formData.subject || `[Portfolio] Tin nhắn từ ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();
      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        return {
          success: true,
          message: 'Tin nhắn đã được chuyển thẳng vào email qua cổng dự phòng!',
          data,
        };
      } else {
        throw new Error(data.message || 'FormSubmit response not ok');
      }
    } catch (err) {
      console.warn('FormSubmit fallback failed:', err);
      return {
        success: false,
        message: err.message || 'Lỗi gửi email',
        error: err,
      };
    }
  }

  /**
   * Main method: Try direct SMTP first, then FormSubmit, then provide mailto link
   * @param {Object} formData
   */
  async sendContactEmail(formData) {
    // 1. Try Direct SMTP Gmail
    const smtpResult = await this.sendViaSMTP(formData);
    if (smtpResult.success) {
      return smtpResult;
    }

    // 2. Try FormSubmit API
    const fallbackResult = await this.sendViaFormSubmit(formData);
    if (fallbackResult.success) {
      return fallbackResult;
    }

    // 3. Fallback: return mailto link
    return {
      success: false,
      message: 'Không thể kết nối máy chủ gửi thư tự động. Bạn vui lòng bấm nút "Mở ứng dụng Email" hoặc nhắn tin trực tiếp qua Zalo nhé!',
      fallbackMailto: this.generateMailtoLink(formData),
    };
  }

  /**
   * Generate mailto URI for instant 1-click fallback
   */
  generateMailtoLink(formData = {}) {
    const subject = encodeURIComponent(formData.subject || `[Liên hệ] Trao đổi công việc từ ${formData.name || 'Khách hàng'}`);
    const body = encodeURIComponent(
      `Chào Trung,\n\nTên tôi là: ${formData.name || ''}\nEmail: ${formData.email || ''}\n\nNội dung liên hệ:\n${formData.message || ''}\n\nTrân trọng!`
    );
    return `mailto:${this.targetEmail}?subject=${subject}&body=${body}`;
  }

  getTargetEmail() {
    return this.targetEmail;
  }
}

const emailService = new EmailService();
export default emailService;

export const sendContactEmail = (formData) => emailService.sendContactEmail(formData);
export const generateMailtoLink = (formData) => emailService.generateMailtoLink(formData);