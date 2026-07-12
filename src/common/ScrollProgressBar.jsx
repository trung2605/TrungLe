import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden="true"
            className="print-hide"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#ff3d8b',
                transformOrigin: '0%',
                scaleX,
                zIndex: 1200,
            }}
        />
    );
};

export default ScrollProgressBar;
