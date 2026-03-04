import { useRef } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard - From ReactBits.dev
 * A card that highlights with a radial gradient spotlight following the cursor.
 *
 * @param {string}  className       - Extra CSS classes to apply to the card wrapper
 * @param {string}  spotlightColor  - CSS color of the spotlight (rgba recommended)
 * @param {node}    children        - Content inside the card
 */
const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.15)',
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
