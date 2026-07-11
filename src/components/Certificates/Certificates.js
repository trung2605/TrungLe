import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaEye, FaSearch, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { certificates } from '../../data';
import useSpotlight from '../../hooks/useSpotlight';
import '../../animations/SpotlightCard.css';
const ITEMS_PER_PAGE = 9;

const CertificateCard = ({ cert, index, onSelect }) => {
    const spotlight = useSpotlight();

    return (
        <motion.div
            ref={spotlight.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(cert)}
            className="card-spotlight"
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseMove={spotlight.onMouseMove}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
                <img src={cert.image} alt={cert.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', borderRadius: '50px', backgroundColor: '#dceeb1', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px' }}>
                    {cert.year}
                </div>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                >
                    <FaEye size={24} style={{ color: '#ffffff' }} />
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '540', color: '#000000', margin: 0, lineHeight: '1.4' }}>{cert.name}</h3>
                    <FaCertificate size={16} style={{ color: '#888888', flexShrink: 0, marginTop: '2px' }} />
                </div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#666666', margin: '0 0 8px 0' }}>
                    {cert.issuer}
                </p>
                {cert.description && (
                    <p style={{ fontSize: '14px', fontWeight: '330', color: '#666666', margin: 0, lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {cert.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

const Certificates = () => {
    const [searchTerm, setSearchTerm]           = useState('');
    const [selectedYear, setSelectedYear]       = useState('all');
    const [selectedCert, setSelectedCert]       = useState(null);
    const [currentPage, setCurrentPage]         = useState(1);

    const years = ['all', ...new Set(certificates.map(c => c.year))].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return b - a;
    });

    const filtered = certificates.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.issuer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchYear = selectedYear === 'all' || c.year === selectedYear;
        return matchSearch && matchYear;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const current = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const changePage = (p) => {
        if (p >= 1 && p <= totalPages) { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

            {/* Search + Year filter */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ marginBottom: '48px' }}
            >
                {/* Search */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--color-surface-soft)',
                    borderRadius: '50px',
                    border: '1px solid var(--color-hairline)',
                    marginBottom: '16px',
                    maxWidth: '480px',
                }}>
                    <FaSearch size={14} style={{ color: 'var(--color-ink-soft)', flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search certificates..."
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        style={{
                            flex: 1, border: 'none', outline: 'none',
                            backgroundColor: 'transparent',
                            fontSize: '15px', fontWeight: '330', color: 'var(--color-ink)',
                        }}
                    />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--color-ink-soft)', flexShrink: 0 }}>
                        {filtered.length}
                    </span>
                </div>

                {/* Year pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {years.map(yr => (
                        <button
                            key={yr}
                            onClick={() => { setSelectedYear(yr); setCurrentPage(1); }}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: selectedYear === yr ? '480' : '330',
                                color: selectedYear === yr ? '#ffffff' : '#000000',
                                backgroundColor: selectedYear === yr ? '#000000' : '#ffffff',
                                border: '1.5px solid',
                                borderColor: selectedYear === yr ? '#000000' : '#e6e6e6',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {yr === 'all' ? 'All Years' : yr}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Grid */}
            {current.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {current.map((cert, i) => (
                        <CertificateCard key={cert.id} cert={cert} index={i} onSelect={setSelectedCert} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)', fontSize: '16px' }}>
                    No certificates found.
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}
                        style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid #e6e6e6', backgroundColor: '#ffffff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaChevronLeft size={12} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => changePage(p)}
                            style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid', borderColor: currentPage === p ? '#000000' : '#e6e6e6', backgroundColor: currentPage === p ? '#000000' : '#ffffff', color: currentPage === p ? '#ffffff' : '#000000', cursor: 'pointer', fontSize: '14px', fontWeight: currentPage === p ? '480' : '330' }}>
                            {p}
                        </button>
                    ))}
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}
                        style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid #e6e6e6', backgroundColor: '#ffffff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaChevronRight size={12} />
                    </button>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                            style={{ backgroundColor: '#ffffff', borderRadius: '24px', maxWidth: '680px', width: '100%', overflow: 'hidden' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ position: 'relative' }}>
                                <img src={selectedCert.image} alt={selectedCert.name} loading="lazy" style={{ width: '100%', maxHeight: '360px', objectFit: 'cover' }} />
                                <button onClick={() => setSelectedCert(null)}
                                    style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '9999px', backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div style={{ padding: '28px' }}>
                                <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', backgroundColor: '#dceeb1', marginBottom: '12px' }}>
                                    {selectedCert.year}
                                </span>
                                <h2 style={{ fontSize: '22px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0' }}>{selectedCert.name}</h2>
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#666666', marginBottom: '16px' }}>
                                    Issued by {selectedCert.issuer}
                                </p>
                                {selectedCert.description && (
                                    <p style={{ fontSize: '16px', fontWeight: '330', lineHeight: '1.6', color: '#444444' }}>{selectedCert.description}</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Certificates;
