import { useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

/**
 * ShinyText - Inspired by ReactBits.dev
 * Animated shining text effect
 */
const ShinyText = ({
  text,
  disabled = false,
  speed = 3,
  className = '',
  color = 'inherit',
  shineColor = '#ffffff',
  spread = 120,
  pauseOnHover = false,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = speed * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const cycleTime = elapsedRef.current % animationDuration;
    const p = (cycleTime / animationDuration) * 100;
    progress.set(p);
  });

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  };

  return (
    <motion.span
      className={className}
      style={{ ...gradientStyle, backgroundPosition, display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
