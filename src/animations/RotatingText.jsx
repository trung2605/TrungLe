import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

/**
 * RotatingText - Inspired by ReactBits.dev
 * Cycles through multiple text strings with smooth animation
 */
const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const validTexts = useMemo(() => {
    if (Array.isArray(texts) && texts.length > 0) return texts;
    if (typeof texts === 'string' && texts.length > 0) return [texts];
    return ['Software Developer'];
  }, [texts]);

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const safeIndex = currentTextIndex < validTexts.length ? currentTextIndex : 0;

  const splitIntoCharacters = (text) => {
    if (!text) return [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = validTexts[safeIndex] || validTexts[0] || '';
    if (!currentText) return [];
    if (splitBy === 'characters') {
      const words = currentText.split(' ');
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === 'words') {
      return currentText.split(' ').map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [validTexts, safeIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      safeIndex === validTexts.length - 1 ? (loop ? 0 : safeIndex) : safeIndex + 1;
    if (nextIndex !== safeIndex) handleIndexChange(nextIndex);
  }, [safeIndex, validTexts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      safeIndex === 0 ? (loop ? validTexts.length - 1 : safeIndex) : safeIndex - 1;
    if (prevIndex !== safeIndex) handleIndexChange(prevIndex);
  }, [safeIndex, validTexts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, validTexts.length - 1));
      if (validIndex !== safeIndex) handleIndexChange(validIndex);
    },
    [validTexts.length, safeIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (safeIndex !== 0) handleIndexChange(0);
  }, [safeIndex, handleIndexChange]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  const totalChars = elements.reduce((acc, w) => acc + w.characters.length, 0);
  let charCount = 0;

  return (
    <motion.span className={`text-rotate ${mainClassName || ''}`} {...rest} layout transition={transition}>
      <span className="text-rotate-sr-only">{validTexts[safeIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={true}>
        <motion.span
          key={safeIndex}
          className={`text-rotate-inner ${splitLevelClassName || ''}`}
          aria-hidden="true"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {elements.map((wordObj, wordIndex) => (
            <span key={wordIndex} className="text-rotate-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {wordObj.characters.map((char) => {
                const delayIndex = charCount++;
                return (
                  <motion.span
                    key={delayIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{ ...transition, delay: getStaggerDelay(delayIndex, totalChars) }}
                    className={`text-rotate-element ${elementLevelClassName || ''}`}
                    style={{ display: 'inline-block', overflow: 'hidden' }}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {wordObj.needsSpace && <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>}
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
