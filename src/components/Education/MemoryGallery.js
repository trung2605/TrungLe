import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslatedData } from '../../hooks/useTranslatedData';

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const MemoryGallery = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const { educationMemories } = useTranslatedData();

    if (!educationMemories || educationMemories.length === 0) return null;

    return (
        <>
            <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}
            >
                {educationMemories.map((memory, i) => (
                    <motion.div
                        key={memory.id}
                        variants={{ hidden: { opacity: 0, scale: 0.88, rotate: i % 2 === 0 ? -2 : 2 }, visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
                        whileHover={{ y: -4 }}
                        onMouseEnter={() => setHoveredId(memory.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedMemory(memory)}
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid',
                            borderColor: hoveredId === memory.id ? '#000000' : 'rgba(0,0,0,0.08)',
                            boxShadow: hoveredId === memory.id ? '0 8px 24px rgba(0,0,0,0.10)' : 'none',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                        }}
                    >
                        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length] }}>
                            <img
                                src={memory.source}
                                alt={memory.alt}
                                loading="lazy"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    transition: 'transform 0.4s ease',
                                    transform: hoveredId === memory.id ? 'scale(1.06)' : 'scale(1)',
                                }}
                            />
                        </div>
                        <div style={{ padding: '14px 16px' }}>
                            <p style={{ fontSize: '14px', fontWeight: '480', color: '#000000', margin: '0 0 4px 0', lineHeight: '1.4' }}>
                                {memory.caption}
                            </p>
                            {memory.year && (
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.4px', color: '#888888' }}>
                                    {memory.year}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Lightbox modal */}
            <AnimatePresence>
                {selectedMemory && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
                        onClick={() => setSelectedMemory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            style={{ backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', maxWidth: '600px', width: '100%' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img src={selectedMemory.source} alt={selectedMemory.alt} loading="lazy" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                            <div style={{ padding: '20px 24px' }}>
                                <p style={{ fontSize: '16px', fontWeight: '480', color: '#000000', margin: '0 0 6px 0' }}>{selectedMemory.caption}</p>
                                {selectedMemory.year && (
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#888888' }}>{selectedMemory.year}</span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MemoryGallery;
