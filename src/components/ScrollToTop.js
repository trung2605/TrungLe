import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that the window scrolls to top or to the target hash
 * whenever location (pathname or hash) changes.
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = hash.replace('#', '');
            // Cho một chút delay để component kịp render
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    if (window.__lenis) {
                        window.__lenis.scrollTo(element, { offset: -140 });
                    } else {
                        const top = element.getBoundingClientRect().top + window.pageYOffset - 140;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                }
            }, 100);
        } else {
            // Scroll to top of the page on route change without hash
            if (window.__lenis) {
                window.__lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                });
            }
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;