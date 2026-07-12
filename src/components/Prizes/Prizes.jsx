import { useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaStar, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { prizes } from "../../data";
import Markdown from "react-markdown";
import { Dialog } from "../ui/Dialog";
const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const getPositionIcon = (position) => {
    const p = position.toLowerCase();
    if (p.includes('winner') || p.includes('first')) return FaTrophy;
    if (p.includes('runner-up') || p.includes('second')) return FaMedal;
    return FaStar;
};

const getPositionBadge = (position) => {
    const p = position.toLowerCase();
    if (p.includes('winner') || p.includes('first')) return { bg: '#dceeb1', label: 'Winner' };
    if (p.includes('runner-up') || p.includes('second')) return { bg: '#c5b0f4', label: 'Runner-up' };
    if (p.includes('finalist') || p.includes('final')) return { bg: '#f4ecd6', label: 'Finalist' };
    return { bg: '#e6e6e6', label: 'Participant' };
};

const Prizes = () => {
    const [selectedPrize, setSelectedPrize] = useState(null);

    const totalOrgs = new Set(prizes.map(p => p.organization)).size;
    const totalYears = new Set(prizes.map(p => p.year)).size;

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>

            {/* Stats — lime block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{ backgroundColor: '#dceeb1', borderRadius: '24px', padding: '32px 40px', marginBottom: '56px' }}
            >
                <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                    color: '#444444', marginBottom: '20px',
                    display: 'flex', gap: '6px', alignItems: 'center',
                }}>
                    <span style={{ color: '#1ea64a', fontWeight: '600' }}>✓</span>
                    <span>npm run awards --list</span>
                    <span style={{ color: '#666666', marginLeft: '8px' }}>// output: {prizes.length} achievements unlocked</span>
                </div>
                <div className="stats-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {[
                        { label: 'Total Awards', value: prizes.length, icon: <FaTrophy /> },
                        { label: 'Organizations', value: totalOrgs, icon: <FaBuilding /> },
                        { label: 'Years Active', value: totalYears, icon: <FaCalendarAlt /> },
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

            {/* Prizes Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {prizes.map((prize, i) => {
                    const Icon = getPositionIcon(prize.position);
                    const badge = getPositionBadge(prize.position);
                    return (
                        <motion.div
                            key={prize.id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedPrize(prize)}
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e6e6e6',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                position: 'relative',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e6e6'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {/* Color top bar */}
                            <div style={{ height: '4px', backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length] }} />

                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '50px',
                                        fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
                                        letterSpacing: '0.4px', textTransform: 'uppercase',
                                        backgroundColor: badge.bg, color: '#000000',
                                    }}>
                                        {badge.label}
                                    </span>
                                    <span style={{
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                                        color: '#888888', letterSpacing: '0.3px',
                                    }}>{prize.year}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '9999px',
                                        backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length],
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        <Icon size={16} style={{ color: '#000000' }} />
                                    </div>
                                    <h3 style={{ fontSize: '17px', fontWeight: '540', color: '#000000', margin: 0, lineHeight: '1.35' }}>
                                        {prize.title}
                                    </h3>
                                </div>

                                <p style={{ fontSize: '14px', fontWeight: '480', color: '#333333', marginBottom: '8px' }}>{prize.position}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#888888' }}>
                                    <FaBuilding size={11} /> {prize.organization}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal */}
            <Dialog
                open={!!selectedPrize}
                onOpenChange={(open) => !open && setSelectedPrize(null)}
                title={selectedPrize?.title || 'Prize'}
            >
                {selectedPrize && (
                    <>
                        {/* Modal header bar */}
                        <div style={{ height: '6px', backgroundColor: BLOCK_COLORS[prizes.indexOf(selectedPrize) % BLOCK_COLORS.length] }} />

                        <div style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '9999px', backgroundColor: getPositionBadge(selectedPrize.position).bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {(() => { const I = getPositionIcon(selectedPrize.position); return <I size={20} />; })()}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#888888', marginBottom: '4px' }}>{selectedPrize.year}</div>
                                    <h2 style={{ fontSize: '22px', fontWeight: '540', color: '#000000', margin: 0 }}>{selectedPrize.title}</h2>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #f1f1f1', paddingTop: '20px' }}>
                                <p style={{ fontSize: '15px', fontWeight: '540', color: '#000000', marginBottom: '8px' }}>{selectedPrize.position}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#666666', marginBottom: '16px' }}>
                                    <FaBuilding size={12} /> {selectedPrize.organization}
                                </div>
                                {selectedPrize.description && (
                                    <div style={{ fontSize: '15px', fontWeight: '330', lineHeight: '1.7', color: '#444444' }}>
                                        <Markdown>{selectedPrize.description}</Markdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default Prizes;
