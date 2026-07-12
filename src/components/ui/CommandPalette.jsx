import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaGraduationCap, FaFolderOpen, FaCertificate, FaUsers, FaEnvelope, FaSearch, FaArrowRight } from 'react-icons/fa';
import { Dialog } from './Dialog';
import { projects, certificates } from '../../data';

const PAGES = [
    { label: 'Home', path: '/', icon: FaHome },
    { label: 'About', path: '/about', icon: FaUser },
    { label: 'Education', path: '/education', icon: FaGraduationCap },
    { label: 'Projects', path: '/projects', icon: FaFolderOpen },
    { label: 'Certificates', path: '/certificates', icon: FaCertificate },
    { label: 'Activities', path: '/activities', icon: FaUsers },
    { label: 'Contact', path: '/contact', icon: FaEnvelope },
];

const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (open) {
            setQuery('');
            setActiveIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        const pageItems = PAGES
            .filter((p) => !q || p.label.toLowerCase().includes(q))
            .map((p) => ({ type: 'page', label: p.label, sub: 'Page', icon: p.icon, action: () => navigate(p.path) }));

        if (!q) return pageItems;

        const projectItems = projects
            .filter((p) => p.title.toLowerCase().includes(q))
            .slice(0, 5)
            .map((p) => ({ type: 'project', label: p.title, sub: 'Project', icon: FaFolderOpen, action: () => navigate(`/projects/${p.id}`) }));

        const certItems = certificates
            .filter((c) => c.name.toLowerCase().includes(q))
            .slice(0, 5)
            .map((c) => ({ type: 'certificate', label: c.name, sub: 'Certificate', icon: FaCertificate, action: () => navigate('/certificates') }));

        return [...pageItems, ...projectItems, ...certItems];
    }, [query, navigate]);

    useEffect(() => setActiveIndex(0), [results.length]);

    const runResult = (item) => {
        item.action();
        setOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[activeIndex]) runResult(results[activeIndex]);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            title="Command palette"
            showClose={false}
            contentClassName="!max-w-[560px] !max-h-[70vh]"
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
                <FaSearch size={14} style={{ color: 'var(--color-ink-soft)', flexShrink: 0 }} aria-hidden="true" />
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages, projects, certificates…"
                    aria-label="Command palette search"
                    style={{
                        flex: 1, border: 'none', outline: 'none', background: 'transparent',
                        fontSize: '15px', color: 'var(--color-ink)',
                    }}
                />
                <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                    color: 'var(--color-ink-soft)', border: '1px solid var(--color-hairline)',
                    borderRadius: '6px', padding: '2px 6px',
                }}>ESC</span>
            </div>

            <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px' }}>
                {results.length === 0 && (
                    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--color-ink-soft)', fontSize: '14px' }}>
                        No results.
                    </div>
                )}
                {results.map((item, i) => {
                    const Icon = item.icon;
                    const active = i === activeIndex;
                    return (
                        <div
                            key={`${item.type}-${item.label}-${i}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => runResult(item)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 12px', borderRadius: '10px',
                                cursor: 'pointer',
                                backgroundColor: active ? 'var(--color-surface)' : 'transparent',
                            }}
                        >
                            <Icon size={14} style={{ color: 'var(--color-ink-soft)', flexShrink: 0 }} aria-hidden="true" />
                            <span style={{ flex: 1, fontSize: '14px', color: 'var(--color-ink)' }}>{item.label}</span>
                            <span style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                                letterSpacing: '0.4px', textTransform: 'uppercase',
                                color: 'var(--color-ink-soft)',
                            }}>{item.sub}</span>
                            {active && <FaArrowRight size={11} style={{ color: 'var(--color-ink-soft)' }} aria-hidden="true" />}
                        </div>
                    );
                })}
            </div>
        </Dialog>
    );
};

export default CommandPalette;
