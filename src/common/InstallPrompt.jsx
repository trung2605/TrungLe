import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';

const DISMISS_KEY = 'installPromptDismissed';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(DISMISS_KEY)) return;

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const dismiss = () => {
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, '1');
    };

    const install = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        dismiss();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="print-hide"
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        left: '24px',
                        zIndex: 1100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '16px',
                        backgroundColor: 'var(--color-canvas)',
                        border: '1px solid var(--color-hairline)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        maxWidth: '320px',
                    }}
                >
                    <span style={{ fontSize: '14px', color: 'var(--color-ink)', flex: 1 }}>
                        Install this portfolio as an app for quick access.
                    </span>
                    <button
                        onClick={install}
                        aria-label="Install app"
                        style={{
                            width: '36px', height: '36px', borderRadius: '9999px',
                            backgroundColor: '#000000', color: '#ffffff', border: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        <FaDownload size={13} />
                    </button>
                    <button
                        onClick={dismiss}
                        aria-label="Dismiss"
                        style={{
                            width: '36px', height: '36px', borderRadius: '9999px',
                            backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-hairline)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                        }}
                    >
                        <FaTimes size={12} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
