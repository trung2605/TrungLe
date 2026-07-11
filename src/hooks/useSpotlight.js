import { useRef } from 'react';

/**
 * Drives the CSS custom properties consumed by animations/SpotlightCard.css
 * so any element with className="card-spotlight" gets a cursor-following
 * highlight on hover. Usage: const spotlight = useSpotlight();
 * <motion.div ref={spotlight.ref} className="card-spotlight" onMouseMove={spotlight.onMouseMove}>
 */
const useSpotlight = (color = 'rgba(0, 0, 0, 0.06)') => {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    ref.current.style.setProperty('--spotlight-color', color);
  };

  return { ref, onMouseMove };
};

export default useSpotlight;
