import { useRef, useEffect } from 'react';

/**
 * MagnetLines - Inspired by ReactBits.dev
 * Grid of lines that rotate to follow the mouse cursor
 */
export default function MagnetLines({
  rows = 8,
  columns = 12,
  containerSize = '100%',
  lineColor,
  lineWidth = 2,
  lineHeight = 20,
  baseAngle = -10,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = (pointer) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handleMouseMove = (e) => onPointerMove({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize positions
    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const total = rows * columns;

  return (
    <div
      ref={containerRef}
      className={`magnet-lines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            '--rotate': `${baseAngle}deg`,
            display: 'block',
            width: lineWidth,
            height: lineHeight,
            margin: 'auto',
            borderRadius: lineWidth,
            transform: 'rotate(var(--rotate))',
            transformOrigin: 'center',
            transition: 'transform 0.1s ease',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
