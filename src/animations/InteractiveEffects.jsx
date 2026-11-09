import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * 1. CustomFollowerCursor
 * Inspired by giaimamanhai.vercel.app (Nc):
 * Zero-re-render RAF spring cursor with dynamic [data-cursor] label expansion.
 */
export const CustomFollowerCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    const root = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !label) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const updatePosition = () => {
      dotX += (mouseX - dotX) * 0.42;
      dotY += (mouseY - dotY) * 0.42;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    };

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!root.classList.contains('is-on')) {
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        root.classList.add('is-on');
      }
    };

    const onPointerOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      const cursorTarget = target.closest('[data-cursor]');
      const interactiveTarget = target.closest('a, button, [role="button"], input, select, textarea, label');
      const cursorText = cursorTarget?.getAttribute('data-cursor');

      if (cursorText) {
        label.textContent = cursorText;
        root.classList.add('is-label');
        root.classList.remove('is-link');
      } else if (interactiveTarget) {
        root.classList.add('is-link');
        root.classList.remove('is-label');
      } else {
        root.classList.remove('is-label', 'is-link');
      }
    };

    const onPointerLeaveWindow = () => {
      root.classList.remove('is-on', 'is-label', 'is-link');
    };

    rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeaveWindow, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('pointerleave', onPointerLeaveWindow);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div ref={cursorRef} className="gmmn-cursor" aria-hidden="true">
      <div ref={ringRef} className="gmmn-cursor-ring">
        <span ref={labelRef} className="gmmn-cursor-label" />
      </div>
      <div ref={dotRef} className="gmmn-cursor-dot" />
    </div>
  );
};

/**
 * 2. SpinningStickerBadge
 * Inspired by giaimamanhai.vercel.app (Ul):
 * Circular SVG stamp with 360-degree continuously spinning <textPath> ring.
 */
export const SpinningStickerBadge = ({
  text = 'SYNAPFORGE STUDIO • TECH LEAD & TECHNICAL BA • ',
  fill = '#F5C242',
  ink = '#18181B',
  centerBg = '#18181B',
  centerColor = '#FAF8F3',
  centerTopText = 'TRUNG',
  centerBottomText = 'LÊ',
  size = 118,
  className = '',
  style = {},
  onClick,
  cursorLabel,
}) => {
  const rawId = useId();
  const pathId = `sticker-ring-${rawId.replace(/\W/g, '')}`;

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`gmmn-sticker ${className}`}
      style={{
        overflow: 'visible',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
      data-cursor={cursorLabel}
      initial={{ scale: 0, rotate: -35 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
      whileHover={{ scale: 1.08, rotate: 6 }}
      aria-hidden={!onClick}
    >
      <defs>
        <path
          id={pathId}
          d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="56"
        fill={fill}
        stroke={ink}
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="51"
        fill="none"
        stroke={ink}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.45"
      />
      <g className="gmmn-sticker-spin">
        <text
          fontSize="9.6"
          fontWeight="800"
          letterSpacing="1.55"
          fill={ink}
          fontFamily="var(--font-mono)"
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </g>
      <circle
        cx="60"
        cy="60"
        r="27"
        fill={centerBg}
        stroke={ink}
        strokeWidth="2"
      />
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={centerColor}
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        {centerTopText}
      </text>
      <text
        x="60"
        y="71"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={fill}
        fontFamily="var(--font-mono)"
        letterSpacing="0.06em"
      >
        {centerBottomText}
      </text>
    </motion.svg>
  );
};

/**
 * 3. FloatingActionBubble
 * Inspired by giaimamanhai.vercel.app (cu / .reg-bubble):
 * Appears in the bottom-right corner on scroll with smooth scale+rotate entrance.
 */
export const FloatingActionBubble = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const isEn = (i18n?.language || 'vi').startsWith('en');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 340);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/contact') return null;

  const handleClick = () => {
    if (pathname === '/dich-vu') {
      navigate('/contact');
    } else {
      navigate('/dich-vu');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`gmmn-floating-bubble ${visible ? 'is-on' : ''}`}
      data-cursor={isEn ? 'Get Quote ↗' : 'Báo giá ↗'}
      aria-label={isEn ? 'View Web Services & Pricing' : 'Xem Dịch vụ & Báo giá'}
    >
      <SpinningStickerBadge
        size={94}
        text={
          isEn
            ? 'WEB & SAAS STUDIO • DIRECT 1-ON-1 • '
            : 'BÁO GIÁ WEBSITE • TƯ VẤN KỸ THUẬT 1-1 • '
        }
        fill="#F5C242"
        ink="#18181B"
        centerBg="#18181B"
        centerColor="#FFFFFF"
        centerTopText={isEn ? 'HIRE' : 'BÁO'}
        centerBottomText={isEn ? 'NOW' : 'GIÁ'}
      />
    </button>
  );
};

/**
 * 4. WordReveal
 * Inspired by giaimamanhai.vercel.app (Hl):
 * Masked word-by-word upward stagger reveal with slight initial tilt.
 */
export const WordReveal = ({
  text = '',
  as: Tag = 'span',
  className = '',
  style = {},
  stagger = 0.055,
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = String(text).split(' ').filter(Boolean);

  if (prefersReducedMotion) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style}>
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <span className="gmmn-w">
            <motion.span
              className="gmmn-w-in"
              initial={{ y: '115%', rotate: 4 }}
              whileInView={{ y: '0%', rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.78,
                delay: delay + idx * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {idx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/**
 * 5. MagneticWrap
 * Inspired by giaimamanhai.vercel.app (kc / Vl):
 * Subtle magnetic cursor pull for buttons, pills, and badges.
 */
export const MagneticWrap = ({
  children,
  strength = 0.26,
  className = '',
  style = {},
}) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`gmmn-magnetic ${className}`}
      style={{
        display: 'inline-block',
        transition: 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 6. KenBurnsSlides
 * Inspired by giaimamanhai.vercel.app (Il / .slides):
 * Multi-photo crossfading gallery with slow Ken-Burns zoom, pill dots & circular arrows.
 */
export const KenBurnsSlides = ({
  images = [],
  alt = '',
  intervalMs = 3600,
  aspectRatio = '16/10',
  borderRadius = '22px',
  cursorLabel = 'Xem ảnh',
  onImageClick,
}) => {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [images].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setActiveIndex(0);
  }, [validImages.length]);

  useEffect(() => {
    if (prefersReducedMotion || validImages.length < 2) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % validImages.length);
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [validImages.length, intervalMs, prefersReducedMotion]);

  if (validImages.length === 0) return null;

  const step = (delta, e) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + delta + validImages.length) % validImages.length);
  };

  return (
    <div
      className="gmmn-slides"
      style={{ aspectRatio, borderRadius }}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
      }}
      data-cursor={cursorLabel}
      onClick={() => onImageClick && onImageClick(validImages[activeIndex])}
    >
      {validImages.map((src, idx) => {
        const isCurrent = idx === activeIndex;
        return (
          <img
            key={`${src}-${idx}`}
            src={src}
            alt={isCurrent ? alt : ''}
            loading="lazy"
            className={`gmmn-slide-img ${isCurrent ? 'is-on' : ''}`}
          />
        );
      })}

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            className="gmmn-slides-arrow is-prev"
            aria-label="Ảnh trước"
            onClick={(e) => step(-1, e)}
          >
            ←
          </button>
          <button
            type="button"
            className="gmmn-slides-arrow is-next"
            aria-label="Ảnh tiếp theo"
            onClick={(e) => step(1, e)}
          >
            →
          </button>
          <div className="gmmn-slides-dots" onClick={(e) => e.stopPropagation()}>
            {validImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ảnh ${idx + 1}/${validImages.length}`}
                aria-pressed={idx === activeIndex}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

