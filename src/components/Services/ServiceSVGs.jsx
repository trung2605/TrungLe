import React from 'react';

/* 1. Nỗi lo chi phí: Cân đo ngân sách & Tối ưu chi phí */
export const CostConcernSVG = ({ className = "service-svg" }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="90" rx="14" fill="var(--color-surface-soft)" stroke="var(--color-hairline)" strokeWidth="1.5" />
    <path d="M40 95L75 70L105 82L150 45" stroke="#1ea64a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="150" cy="45" r="4.5" fill="#1ea64a" />
    <circle cx="105" cy="82" r="3.5" fill="var(--color-ink)" />
    <circle cx="75" cy="70" r="3.5" fill="var(--color-ink)" />
    <circle cx="40" cy="95" r="3.5" fill="var(--color-ink)" />
    <rect x="35" y="42" width="48" height="18" rx="9" fill="#dceeb1" stroke="var(--color-hairline)" />
    <text x="59" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1b4d2e" fontFamily="JetBrains Mono, monospace">-50% DEV</text>
    <rect x="125" y="85" width="46" height="20" rx="6" fill="var(--color-canvas)" stroke="var(--color-hairline)" />
    <text x="148" y="98" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--color-ink)" fontFamily="system-ui">Giá Tối Ưu</text>
  </svg>
);

/* 2. Nỗi lo bị lừa hoặc bỏ rơi: Hợp đồng bảo chứng & Khiên pháp lý */
export const TrustConcernSVG = ({ className = "service-svg" }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="20" width="130" height="100" rx="12" fill="var(--color-surface-soft)" stroke="var(--color-hairline)" strokeWidth="1.5" />
    {/* Contract document */}
    <rect x="50" y="35" width="65" height="70" rx="6" fill="var(--color-canvas)" stroke="var(--color-hairline)" />
    <line x1="60" y1="48" x2="100" y2="48" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="58" x2="95" y2="58" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="68" x2="88" y2="68" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 85C66 83 72 87 78 84C82 82 86 86 92 84" stroke="#c5b0f4" strokeWidth="2" strokeLinecap="round" />
    {/* Shield */}
    <path d="M130 52C130 52 145 46 155 46C155 70 145 92 130 102C115 92 105 70 105 46C115 46 130 52 130 52Z" fill="#c5b0f4" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
    <path d="M120 72L127 79L142 64" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 3. Nỗi lo công nghệ phức tạp: Giao diện quản trị tiếng Việt & Video 1-1 */
export const TechComplexitySVG = ({ className = "service-svg" }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="25" width="150" height="95" rx="12" fill="var(--color-surface-soft)" stroke="var(--color-hairline)" strokeWidth="1.5" />
    {/* Header bar */}
    <rect x="25" y="25" width="150" height="20" rx="12" fill="var(--color-canvas)" />
    <circle cx="40" cy="35" r="3" fill="#ef4444" />
    <circle cx="50" cy="35" r="3" fill="#eab308" />
    <circle cx="60" cy="35" r="3" fill="#22c55e" />
    {/* Inner panel */}
    <rect x="40" y="55" width="70" height="52" rx="8" fill="var(--color-canvas)" stroke="var(--color-hairline)" />
    <rect x="48" y="65" width="30" height="8" rx="4" fill="#f4ecd6" />
    <text x="63" y="71" textAnchor="middle" fontSize="6" fontWeight="700" fill="#92400e">ĐỔI GIÁ</text>
    <rect x="48" y="78" width="54" height="6" rx="3" fill="var(--color-hairline)" />
    <rect x="48" y="88" width="40" height="6" rx="3" fill="var(--color-hairline)" />
    {/* Play Video Card */}
    <rect x="120" y="55" width="45" height="52" rx="8" fill="#c8e6cd" stroke="var(--color-hairline)" />
    <circle cx="142" cy="76" r="10" fill="#1ea64a" />
    <polygon points="140,71 147,76 140,81" fill="#ffffff" />
    <text x="142" y="97" textAnchor="middle" fontSize="7" fontWeight="600" fill="#14532d">Video 1-1</text>
  </svg>
);

/* 4. Nỗi lo thuế và pháp lý: Kê khai thuế TNCN đầy đủ, an tâm 100% */
export const TaxConcernSVG = ({ className = "service-svg" }) => (
  <svg className={className} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="25" width="140" height="95" rx="12" fill="var(--color-surface-soft)" stroke="var(--color-hairline)" strokeWidth="1.5" />
    <rect x="45" y="38" width="80" height="70" rx="8" fill="var(--color-canvas)" stroke="var(--color-hairline)" />
    <line x1="58" y1="52" x2="112" y2="52" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="62" x2="98" y2="62" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    <line x1="58" y1="72" x2="105" y2="72" stroke="var(--color-hairline)" strokeWidth="2" strokeLinecap="round" />
    {/* Tax Stamp */}
    <circle cx="138" cy="75" r="24" fill="#dceeb1" stroke="#1ea64a" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="138" cy="75" r="18" fill="none" stroke="#1ea64a" strokeWidth="1" />
    <text x="138" y="73" textAnchor="middle" fontSize="7" fontWeight="700" fill="#14532d">ĐÃ NỘP</text>
    <text x="138" y="82" textAnchor="middle" fontSize="7" fontWeight="700" fill="#14532d">THUẾ TNCN</text>
    <path d="M58 88L64 94L76 82" stroke="#1ea64a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="82" y="90" fontSize="7" fontWeight="600" fill="var(--color-ink)">0đ Rắc Rối</text>
  </svg>
);

/* 5 SVG minh họa cho 5 Bước Quy Trình */
export const Step1ScopeSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#dceeb1" />
    <circle cx="20" cy="18" r="6" stroke="#166534" strokeWidth="2" />
    <path d="M12 28C12 24.5 15.5 23 20 23C24.5 23 28 24.5 28 28" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Step2DesignSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#c5b0f4" />
    <rect x="11" y="11" width="18" height="18" rx="4" stroke="#581c87" strokeWidth="2" />
    <line x1="11" y1="16" x2="29" y2="16" stroke="#581c87" strokeWidth="2" />
    <circle cx="24" cy="24" r="2" fill="#581c87" />
  </svg>
);

export const Step3CodingSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#f4ecd6" />
    <path d="M16 15L11 20L16 25" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 15L29 20L24 25" stroke="#78350f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="13" x2="18" y2="27" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Step4TestingSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#c8e6cd" />
    <circle cx="20" cy="20" r="9" stroke="#14532d" strokeWidth="2" />
    <path d="M16 20L19 23L25 17" stroke="#14532d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Step5HandoverSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="10" fill="#f3c9b6" />
    <path d="M20 11V23M20 23L15 18M20 23L25 18" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="11" y="25" width="18" height="4" rx="2" fill="#9a3412" />
  </svg>
);
