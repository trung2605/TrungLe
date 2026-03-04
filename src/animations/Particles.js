import { useRef, useEffect } from 'react';
import './Particles.css';

/**
 * Particles - Inspired by ReactBits.dev
 * A beautiful interactive floating particles background using Canvas 2D
 */
const Particles = ({
  particleCount = 80,
  speed = 0.5,
  particleColors = ['#38bdf8', '#818cf8', '#60a5fa', '#a78bfa'],
  moveParticlesOnHover = true,
  particleBaseSize = 2,
  sizeRandomness = 1,
  alphaParticles = true,
  className = '',
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        const size = particleBaseSize * (1 + sizeRandomness * (Math.random() - 0.5));
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.max(0.5, size),
          color,
          alpha: alphaParticles ? 0.2 + Math.random() * 0.6 : 1,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          freqX: 0.3 + Math.random() * 0.5,
          freqY: 0.3 + Math.random() * 0.5,
        });
      }
    };
    createParticles();

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particlesRef.current.forEach((p) => {
        // Subtle sinusoidal movement
        p.x += p.vx + Math.sin(time * p.freqX + p.phaseX) * 0.2;
        p.y += p.vy + Math.cos(time * p.freqY + p.phaseY) * 0.2;

        // Mouse interaction
        if (moveParticlesOnHover && mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (1 - dist / 120) * 0.5;
            p.x -= dx * force * 0.05;
            p.y -= dy * force * 0.05;
          }
        }

        // Wrap around edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (moveParticlesOnHover) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (moveParticlesOnHover) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationRef.current);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [particleCount, speed, particleColors, moveParticlesOnHover, particleBaseSize, sizeRandomness, alphaParticles]);

  return (
    <div
      ref={containerRef}
      className={`particles-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden', pointerEvents: 'auto' }}
    />
  );
};

export default Particles;
