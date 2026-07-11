import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, .card-spotlight, [data-cursor-hover]';

const CustomCursor = () => {
    const [enabled, setEnabled] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const ringX = useSpring(cursorX, { damping: 28, stiffness: 300, mass: 0.4 });
    const ringY = useSpring(cursorY, { damping: 28, stiffness: 300, mass: 0.4 });

    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        setEnabled(canHover);
        if (!canHover) return;

        const handleMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };
        const handleOver = (e) => {
            if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) setIsHovering(true);
        };
        const handleOut = (e) => {
            if (e.target.closest && e.target.closest(INTERACTIVE_SELECTOR)) setIsHovering(false);
        };
        const handleLeaveWindow = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseover', handleOver);
        window.addEventListener('mouseout', handleOut);
        document.documentElement.addEventListener('mouseleave', handleLeaveWindow);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseover', handleOver);
            window.removeEventListener('mouseout', handleOut);
            document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '9999px',
                    backgroundColor: 'var(--color-ink)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                }}
            />
            <motion.div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: isHovering ? '52px' : '32px',
                    height: isHovering ? '52px' : '32px',
                    borderRadius: '9999px',
                    border: '1.5px solid var(--color-ink)',
                    backgroundColor: isHovering ? 'rgba(0,0,0,0.04)' : 'transparent',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: isVisible ? 0.6 : 0,
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
                }}
            />
        </>
    );
};

export default CustomCursor;
