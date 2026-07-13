import { useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaBuilding, FaPlay, FaCheck, FaEye, FaInbox } from "react-icons/fa";
import { useTranslatedData } from '../../hooks/useTranslatedData';
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import useSpotlight from '../../hooks/useSpotlight';
import '../../animations/SpotlightCard.css';
import { Dialog } from '../ui/Dialog';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
const ITEMS_PER_PAGE = 9;
const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const STATUS_STYLE = {
    'Active':      { bg: '#c8e6cd', color: '#000000' },
    'In Progress': { bg: '#dceeb1', color: '#000000' },
    'Completed':   { bg: '#e6e6e6', color: '#000000' },
    'Various':     { bg: '#c5b0f4', color: '#000000' },
};

const STATUS_KEY = {
    'Active': 'active',
    'In Progress': 'inProgress',
    'Completed': 'completed',
    'Various': 'various',
};

const ActivityCard = ({ act, index, onSelect, t }) => {
    const spotlight = useSpotlight();
    const statusStyle = STATUS_STYLE[act.status] || { bg: '#f7f7f5', color: '#000000' };
    const statusLabel = STATUS_KEY[act.status] ? t(`activities.statuses.${STATUS_KEY[act.status]}`) : act.status;

    return (
        <motion.div
            ref={spotlight.ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="card-spotlight"
            style={{
                backgroundColor: 'var(--color-canvas)',
                border: '1px solid #e6e6e6',
                borderRadius: '24px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseMove={spotlight.onMouseMove}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
            onClick={() => onSelect(act)}
        >
            {/* Color accent top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: BLOCK_COLORS[index % BLOCK_COLORS.length], borderRadius: '24px 24px 0 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', marginTop: '8px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                    {statusLabel}
                </span>
                <FaEye size={14} style={{ color: '#aaaaaa' }} />
            </div>

            <h3 style={{ fontFamily: 'Outfit, system-ui, sans-serif', fontSize: '17px', fontWeight: '540', color: 'var(--color-ink)', margin: '0 0 8px 0', lineHeight: '1.35' }}>{act.title}</h3>

            <div style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.3px', textTransform: 'uppercase', color: '#666666', marginBottom: '8px' }}>
                {act.organization}
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888888', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FaCalendarAlt size={11} /> {act.duration}
                </span>
                {act.role && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        {act.role}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

const Activities = () => {
    const { t } = useTranslation();
    const { activities } = useTranslatedData();
    const [selectedStatus, setSelectedStatus]   = useState("all");
    const [selectedOrg, setSelectedOrg]         = useState("all");
    const [currentPage, setCurrentPage]         = useState(1);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const organizations = ["all", ...new Set(activities.map(a => a.organization))];
    const statuses = ["all", "Active", "In Progress", "Completed", "Various"];

    const filtered = activities.filter(a => {
        const matchStatus = selectedStatus === "all" || a.status === selectedStatus;
        const matchOrg    = selectedOrg === "all" || a.organization === selectedOrg;
        return matchStatus && matchOrg;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const current = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const changePage = p => {
        if (p >= 1 && p <= totalPages) { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    };

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

            {/* Stats — mint block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{ backgroundColor: '#c8e6cd', borderRadius: '24px', padding: '32px 28px', marginBottom: '48px' }}
            >
                <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    color: '#444444', marginBottom: '20px',
                }}>
                    <span style={{ color: '#1ea64a' }}>{'> '}</span>
                    <span>activities.filter(a =&gt; a.isActive).length</span>
                    <span style={{ color: '#555555', marginLeft: '8px' }}>// {activities.filter(a => a.status === 'Active' || a.status === 'In Progress').length} running</span>
                </div>
                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                    {[
                        { label: t('activities.totalActivities'), value: activities.length, icon: <FaUsers /> },
                        { label: t('activities.active'), value: activities.filter(a => a.status === 'Active' || a.status === 'In Progress').length, icon: <FaPlay /> },
                        { label: t('activities.completed'), value: activities.filter(a => a.status === 'Completed').length, icon: <FaCheck /> },
                        { label: t('activities.organizations'), value: organizations.length - 1, icon: <FaBuilding /> },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: '340', lineHeight: '1.0', color: '#000000' }}>{s.value}</div>
                            <div style={{ fontSize: '14px', fontWeight: '400', color: '#444444', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {s.icon} {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px', alignItems: 'center' }}
            >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: 'var(--color-ink-soft)' }}>{t('activities.statusLabel')}</span>
                    <Tabs value={selectedStatus} onValueChange={(s) => { setSelectedStatus(s); setCurrentPage(1); }}>
                        <TabsList>
                            {statuses.map(s => (
                                <TabsTrigger key={s} value={s} className="!py-1.5 !px-3.5 !text-[13px]">
                                    {s === 'all' ? t('activities.all') : (STATUS_KEY[s] ? t(`activities.statuses.${STATUS_KEY[s]}`) : s)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
                <select
                    value={selectedOrg}
                    onChange={e => { setSelectedOrg(e.target.value); setCurrentPage(1); }}
                    style={{ padding: '8px 16px', borderRadius: '50px', border: '1.5px solid #e6e6e6', fontSize: '14px', color: '#000000', backgroundColor: '#ffffff', outline: 'none', cursor: 'pointer' }}
                >
                    {organizations.map(org => (
                        <option key={org} value={org}>{org === 'all' ? t('activities.allOrgs') : org}</option>
                    ))}
                </select>
            </motion.div>

            {/* Grid */}
            {current.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '48px' }}>
                    {current.map((act, i) => (
                        <ActivityCard key={act.id || i} act={act} index={i} onSelect={setSelectedActivity} t={t} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)' }}>
                    <FaInbox size={32} aria-hidden="true" style={{ marginBottom: '12px', opacity: 0.4 }} />
                    <div>{t('activities.noResults')}</div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div role="navigation" aria-label={t('common.pagination')} style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => changePage(p)}
                            aria-label={t('common.page', { n: p })}
                            aria-current={currentPage === p ? 'page' : undefined}
                            style={{ width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid', borderColor: currentPage === p ? '#000000' : '#e6e6e6', backgroundColor: currentPage === p ? '#000000' : '#ffffff', color: currentPage === p ? '#ffffff' : '#000000', cursor: 'pointer', fontSize: '14px', fontWeight: currentPage === p ? '480' : '330' }}>
                            {p}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Dialog
                open={!!selectedActivity}
                onOpenChange={(open) => !open && setSelectedActivity(null)}
                title={selectedActivity?.title || t('common.activity')}
                contentClassName="!max-w-[640px] !max-h-[85vh]"
            >
                {selectedActivity && (
                    <>
                        <div style={{ padding: '32px', borderBottom: '1px solid #e6e6e6', position: 'relative' }}>
                            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', backgroundColor: (STATUS_STYLE[selectedActivity.status] || {}).bg || '#f7f7f5', marginBottom: '12px' }}>
                                {STATUS_KEY[selectedActivity.status] ? t(`activities.statuses.${STATUS_KEY[selectedActivity.status]}`) : selectedActivity.status}
                            </span>
                            <h2 style={{ fontSize: '22px', fontWeight: '540', color: '#000000', margin: '0 0 8px 0' }}>{selectedActivity.title}</h2>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#666666', margin: 0 }}>{selectedActivity.organization}</p>
                        </div>
                        <div style={{ padding: '24px 32px 32px' }}>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '14px', color: '#666666', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FaCalendarAlt size={12} /> {selectedActivity.duration}
                                </span>
                                {selectedActivity.role && (
                                    <span style={{ fontSize: '14px', color: '#666666' }}>{selectedActivity.role}</span>
                                )}
                            </div>
                            {selectedActivity.description && (
                                <div style={{ fontSize: '15px', fontWeight: '330', lineHeight: '1.7', color: '#444444' }}>
                                    <Markdown>{selectedActivity.description}</Markdown>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default Activities;
