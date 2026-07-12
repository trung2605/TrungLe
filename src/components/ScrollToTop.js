import {
    useEffect
} from "react";
import {
    useLocation
} from "react-router-dom";

/**
 * ScrollToTop component ensures that the window scrolls to the top
 * whenever the location (URL path) changes.
 */
const ScrollToTop = () => {
    const {
        pathname
    } = useLocation();

    useEffect(() => {
        // Scroll to top of the page on route change.
        // Lenis (see App.js) hijacks the scroll container, so window.scrollTo alone
        // gets overridden by Lenis's next animation frame — route through it when active.
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;