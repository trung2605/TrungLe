import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaEye, FaSearch, FaChevronLeft, FaChevronRight, FaInbox } from 'react-icons/fa';
import useSpotlight from '../../hooks/useSpotlight';
import '../../animations/SpotlightCard.css';
import { useTranslation } from 'react-i18next';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import Markdown from 'react-markdown';
import { Dialog } from '../ui/Dialog';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
const ITEMS_PER_PAGE = 9;

const CATEGORY_COLORS = {
    Technology: '#c5b0f4',
    Language: '#c8e6cd',
    Event: '#f4ecd6',
    Other: '#efd4d4',
};

const CertificateCard = ({ cert, index, onSelect, t }) => {
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
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid #e6e6e6',
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseMove={spotlight.onMouseMove}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#f7f7f5' }}>
                <img src={cert.image} alt={cert.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', borderRadius: '50px', backgroundColor: '#dceeb1', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px' }}>
                    {cert.dateIssued || cert.year}
                </div>
                {cert.category && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 10px', borderRadius: '6px', backgroundColor: CATEGORY_COLORS[cert.category] || '#e6e6e6', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px' }}>
                        {t(`certificates.categories.${cert.category}`)}
                    </div>
                )}
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                >
                    <FaEye size={24} style={{ color: '#ffffff' }} />
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'Outfit, system-ui, sans-serif', fontSize: '16px', fontWeight: '540', color: 'var(--color-ink)', margin: 0, lineHeight: '1.4' }}>{cert.name}</h3>
                    <FaCertificate size={16} style={{ color: '#888888', flexShrink: 0, marginTop: '2px' }} />
                </div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#666666', margin: '0 0 8px 0' }}>
                    {cert.issuer}
                </p>
                {cert.description && (
                    <div style={{ fontSize: '14px', fontWeight: '330', color: '#666666', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        <Markdown>{cert.description}</Markdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const CATEGORY_ORDER = ['all', 'Technology', 'Language', 'Event', 'Other'];

const Certificates = () => {
    const [searchTerm, setSearchTerm]           = useState('');
    const [selectedYear, setSelectedYear]       = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCert, setSelectedCert]       = useState(null);
    const [currentPage, setCurrentPage]         = useState(1);
    const { t } = useTranslation();
    const { certificates } = useTranslatedData();

    const years = ['all', ...new Set(certificates.map(c => c.year))].sort((a, b) => {
        if (a === 'all') return -1;
        if (b === 'all') return 1;
        return b - a;
    });

    const categories = CATEGORY_ORDER.filter(c => c === 'all' || certificates.some(cert => cert.category === c));

    const filtered = certificates.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.issuer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchYear = selectedYear === 'all' || c.year === selectedYear;
        const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
        return matchSearch && matchYear && matchCategory;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const current = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const changePage = (p) => {
        if (p >= 1 && p <= totalPages) { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

            {/* Fetch prompt */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
                    color: '#888888', marginBottom: '16px',
                    display: 'flex', gap: '8px', alignItems: 'center',
                }}
            >
                <span style={{ color: '#1ea64a' }}>const</span>
                <span style={{ color: '#93c5fd' }}> certs</span>
                <span> = await fetchCertificates()</span>
                <span style={{ color: '#fbbf24', marginLeft: '8px' }}>// {certificates.length} loaded</span>
            </motion.div>

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
                        placeholder={t('certificates.searchPlaceholder')}
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

                {/* Category pills */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)' }}>
                        {t('certificates.categoryLabel')}
                    </span>
                    <Tabs value={selectedCategory} onValueChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}>
                        <TabsList>
                            {categories.map(cat => (
                                <TabsTrigger key={cat} value={cat}>
                                    {cat === 'all' ? t('certificates.allCategories') : t(`certificates.categories.${cat}`)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>

                {/* Year dropdown */}
                <select
                    value={selectedYear}
                    onChange={e => { setSelectedYear(e.target.value); setCurrentPage(1); }}
                    style={{ padding: '8px 16px', borderRadius: '50px', border: '1.5px solid var(--color-hairline)', fontSize: '14px', color: 'var(--color-ink)', backgroundColor: 'var(--color-canvas)', outline: 'none', cursor: 'pointer' }}
                >
                    {years.map(yr => (
                        <option key={yr} value={yr}>{yr === 'all' ? t('certificates.allYears') : yr}</option>
                    ))}
                </select>
            </motion.div>

            {/* Grid */}
            {current.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {current.map((cert, i) => (
                        <CertificateCard key={cert.id} cert={cert} index={i} onSelect={setSelectedCert} t={t} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)', fontSize: '16px' }}>
                    <FaInbox size={32} aria-hidden="true" style={{ marginBottom: '12px', opacity: 0.4 }} />
                    <div>{t('certificates.noResults')}</div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div role="navigation" aria-label={t('common.pagination')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}
                        aria-label={t('common.previousPage')}
                        style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid #e6e6e6', backgroundColor: '#ffffff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaChevronLeft size={12} aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => changePage(p)}
                            aria-label={t('common.page', { n: p })}
                            aria-current={currentPage === p ? 'page' : undefined}
                            style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid', borderColor: currentPage === p ? '#000000' : '#e6e6e6', backgroundColor: currentPage === p ? '#000000' : '#ffffff', color: currentPage === p ? '#ffffff' : '#000000', cursor: 'pointer', fontSize: '14px', fontWeight: currentPage === p ? '480' : '330' }}>
                            {p}
                        </button>
                    ))}
                    <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}
                        aria-label={t('common.nextPage')}
                        style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid #e6e6e6', backgroundColor: '#ffffff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaChevronRight size={12} aria-hidden="true" />
                    </button>
                </div>
            )}

            {/* Modal */}
            <Dialog
                open={!!selectedCert}
                onOpenChange={(open) => !open && setSelectedCert(null)}
                title={selectedCert?.name || t('common.certificate')}
            >
                {selectedCert && (
                    <>
                        <div style={{ position: 'relative' }}>
                            <img src={selectedCert.image} alt={selectedCert.name} loading="lazy" style={{ width: '100%', maxHeight: '360px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '28px' }}>
                            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', backgroundColor: '#dceeb1', marginBottom: '12px' }}>
                                {selectedCert.dateIssued || selectedCert.year}
                            </span>
                            <h2 style={{ fontSize: '22px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0' }}>{selectedCert.name}</h2>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#666666', marginBottom: '16px' }}>
                                {t('certificates.issuedBy')} {selectedCert.issuer}
                            </p>
                            {selectedCert.description && (
                                <div style={{ fontSize: '16px', fontWeight: '330', lineHeight: '1.6', color: '#444444' }}><Markdown>{selectedCert.description}</Markdown></div>
                            )}
                        </div>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default Certificates;
