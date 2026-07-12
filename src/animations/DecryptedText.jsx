import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * DecryptedText - Inspired by ReactBits.dev
 * Scrambles text characters before revealing the real text on hover or view
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [animateOn, hasAnimated]);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start': return revealedSet.size;
        case 'end': return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) return nextIndex;
          for (let i = 0; i < textLength; i++) { if (!revealedSet.has(i)) return i; }
          return 0;
        }
        default: return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ')
      : characters.split('');

    const shuffleText = (originalText, currentRevealed) => {
      return originalText.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (currentRevealed.has(i)) return originalText[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      }).join('');
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsScrambling(false);
              return prevRevealed;
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(interval);
              setIsScrambling(false);
              setDisplayText(text);
            }
            return prevRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
    }

    return () => { if (interval) clearInterval(interval); };
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters]);

  const hoverProps = animateOn === 'hover'
    ? { onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false) }
    : {};

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      {...hoverProps}
      aria-label={text}
      style={{ display: 'inline-block' }}
    >
      <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {text}
      </span>
      <span aria-hidden="true" className={className}>
        {displayText.split('').map((char, i) => (
          <span
            key={i}
            className={!revealedIndices.has(i) && isScrambling ? encryptedClassName : ''}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
