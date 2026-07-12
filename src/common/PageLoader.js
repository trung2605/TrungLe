const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: '28px',
      height: '28px',
      borderRadius: '9999px',
      border: '2.5px solid var(--color-hairline, #e6e6e6)',
      borderTopColor: 'var(--color-ink, #000000)',
      animation: 'spin 0.8s linear infinite',
    }} />
  </div>
);

export default PageLoader;
