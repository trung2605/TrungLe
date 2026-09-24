import React from 'react';

const PageLoader = () => (
  <div style={{
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  }}>
    <div style={{
      position: 'relative',
      width: '36px',
      height: '36px',
    }}>
      {/* Ambient background ring */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '9999px',
        border: '2.5px solid var(--color-hairline, rgba(0, 0, 0, 0.08))',
      }} />
      {/* Active spinner arc */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '9999px',
        border: '2.5px solid transparent',
        borderTopColor: 'var(--color-ink, #0f172a)',
        borderRightColor: 'var(--color-ink, #0f172a)',
        animation: 'spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      }} />
    </div>

    {/* Subtle terminal load prompt */}
    <span style={{
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '11.5px',
      letterSpacing: '0.6px',
      color: 'var(--color-ink-soft, #64748b)',
      opacity: 0.85,
    }}>
      loading package...
    </span>
  </div>
);

export default PageLoader;
