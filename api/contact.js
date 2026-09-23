const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ họ tên, email và tin nhắn' });
    }

    const host = process.env.Email__SmtpHost || 'smtp.gmail.com';
    const port = Number(process.env.Email__SmtpPort) || 587;
    const user = process.env.Email__SmtpUser || 'letritrung2605@gmail.com';
    const pass = process.env.Email__SmtpPass;
    const fromName = process.env.Email__FromName || 'trungletri';
    const fromEmail = process.env.Email__FromEmail || user;

    if (!pass) {
      return res.status(500).json({ success: false, message: 'Chưa cấu hình mật khẩu ứng dụng Gmail (Email__SmtpPass)' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587/STARTTLS
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: user,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject} - từ ${name}` : `[Portfolio] Tin nhắn mới từ ${name}`,
      text: `Họ và tên: ${name}\nEmail: ${email}\nChủ đề: ${subject || 'Không có'}\n\nNội dung:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Tin nhắn liên hệ mới từ Portfolio</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.8;">Nhận qua kết nối SMTP Gmail an toàn</p>
          </div>
          <div style="padding: 24px;">
            <p style="margin: 0 0 8px;"><strong>Họ và tên:</strong> ${name}</p>
            <p style="margin: 0 0 8px;"><strong>Email phản hồi:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            <p style="margin: 0 0 16px;"><strong>Chủ đề:</strong> ${subject || 'Không có'}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="margin: 0 0 8px; font-weight: bold;">Nội dung tin nhắn:</p>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #f1f5f9; white-space: pre-wrap; font-size: 14px;">${message}</div>
            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Liên hệ từ Portfolio')}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">Trả lời email này ngay</a>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Tin nhắn đã được gửi thẳng vào hòm thư Gmail qua SMTP thành công!',
    });
  } catch (error) {
    console.error('Lỗi gửi email qua SMTP:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi gửi email qua SMTP',
    });
  }
};
