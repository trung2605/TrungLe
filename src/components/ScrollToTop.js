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
        // Scroll to top of the page on route change
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Use "instant" for immediate jump or "smooth" for animation
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;