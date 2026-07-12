import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BlurText - Inspired by ReactBits.dev
 * Animates text by blurring in each character/word
 */
const BlurText = ({
  text = '',
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  threshold = 0.1,
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const fromY = direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0;
  const fromX = direction === 'left' ? -20 : direction === 'right' ? 20 : 0;

  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'inline' }}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', y: fromY, x: fromX }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0, x: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: (i * delay) / 1000,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
