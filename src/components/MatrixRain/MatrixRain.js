import React, { useEffect, useRef } from 'react';
import { useCustomTheme } from '../../contexts/ThemeContext';
import './MatrixRain.scss';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const { matrixEnabled, isDarkCoder } = useCustomTheme();

  useEffect(() => {
    if (!matrixEnabled || !isDarkCoder) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (mix of letters, numbers, and symbols)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    // Colors for different character states
    const colors = {
      bright: '#00FF00',
      medium: '#008F11',
      dim: '#004d00',
      trail: 'rgba(0, 255, 0, 0.1)'
    };

    let animationId;

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, Monaco, Consolas, monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Determine color based on position (create trail effect)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Bright leading character
        ctx.fillStyle = colors.bright;
        ctx.fillText(char, x, y);

        // Medium brightness trail
        if (y > fontSize) {
          ctx.fillStyle = colors.medium;
          const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(trailChar, x, y - fontSize);
        }

        // Dim trail
        if (y > fontSize * 2) {
          ctx.fillStyle = colors.dim;
          const dimChar = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(dimChar, x, y - fontSize * 2);
        }

        drops[i]++;

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [matrixEnabled, isDarkCoder]);

  if (!matrixEnabled || !isDarkCoder) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
    />
  );
};

export default MatrixRain;