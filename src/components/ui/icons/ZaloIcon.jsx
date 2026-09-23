import React from 'react';

export const ZaloIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path
      d="M24 4C12.954 4 4 12.954 4 24c0 4.148 1.268 8.004 3.441 11.207L5.05 42.158a1.5 1.5 0 001.884 1.884l6.951-2.391A19.89 19.89 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4z"
      fill="#0068FF"
    />
    <path
      d="M14 28.5c0-.828.672-1.5 1.5-1.5h6.223l-7.25-9.321A1.5 1.5 0 0115.65 15h9.85a1.5 1.5 0 110 3h-6.223l7.25 9.321A1.5 1.5 0 0125.35 30H15.5a1.5 1.5 0 01-1.5-1.5z"
      fill="#FFFFFF"
    />
    <path
      d="M32.5 15c-3.038 0-5.5 2.462-5.5 5.5v5c0 3.038 2.462 5.5 5.5 5.5s5.5-2.462 5.5-5.5v-5c0-3.038-2.462-5.5-5.5-5.5zm2.5 10.5c0 1.381-1.119 2.5-2.5 2.5s-2.5-1.119-2.5-2.5v-5c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v5z"
      fill="#FFFFFF"
    />
  </svg>
);

export default ZaloIcon;
