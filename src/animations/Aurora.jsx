import { useRef, useEffect } from 'react';

/**
 * Aurora - Inspired by ReactBits.dev
 * Beautiful animated aurora/gradient background using Canvas 2D
 */
const Aurora = ({
  colorStops = ['#3b82f6', '#60a5fa', '#93c5fd'],
  amplitude = 1.0,
  blend = 0.5,
  speed = 0.5,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let timeRef = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [0, 0, 255];
    };

    const parsedColors = colorStops.map(hexToRgb);

    const lerp = (a, b, t) => a + (b - a) * t;

    const getColorAt = (t) => {
      const numColors = parsedColors.length - 1;
      const scaledT = Math.max(0, Math.min(1, t)) * numColors;
      const lowerIndex = Math.floor(scaledT);
      const upperIndex = Math.min(lowerIndex + 1, numColors);
      const localT = scaledT - lowerIndex;

      const c1 = parsedColors[lowerIndex];
      const c2 = parsedColors[upperIndex];
      return [
        Math.round(lerp(c1[0], c2[0], localT)),
        Math.round(lerp(c1[1], c2[1], localT)),
        Math.round(lerp(c1[2], c2[2], localT)),
      ];
    };

    const animate = () => {
      timeRef += speed * 0.005;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw multiple aurora waves
      const numWaves = 4;
      for (let waveIdx = 0; waveIdx < numWaves; waveIdx++) {
        const waveOffset = (waveIdx / numWaves) * Math.PI * 2;
        const colorT = ((Math.sin(timeRef * 0.3 + waveOffset) + 1) / 2);
        const [r, g, b] = getColorAt(colorT);
        const alpha = (0.15 + 0.1 * Math.sin(timeRef + waveOffset)) * blend;

        ctx.save();
        ctx.globalAlpha = alpha;

        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.15, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 1)`);
        gradient.addColorStop(0.85, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();

        const points = [];
        const segments = 40; // Even more segments for ultra-smooth breakout
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * w;
          const y =
            h * (0.2 + waveIdx * 0.2) + // Spread waves vertically more
            amplitude * h * 0.25 * Math.sin((i / segments) * Math.PI * 2 + timeRef + waveOffset);
          points.push({ x, y });
        }

        ctx.moveTo(0, h);
        ctx.lineTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const cpX = (prev.x + curr.x) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpX, (prev.y + curr.y) / 2);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Aurora;
