import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaInbox } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useTranslatedData } from '../../hooks/useTranslatedData';

const BLOCK_COLORS = ['#dceeb1', '#c5b0f4', '#f4ecd6', '#c8e6cd', '#efd4d4', '#f3c9b6'];

const Blog = () => {
    const { t } = useTranslation();
    const { posts } = useTranslatedData();
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
            <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '13px',
                    color: '#888888', marginBottom: '32px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                }}
            >
                <span style={{ color: '#1ea64a' }}>$</span>
                <span style={{ color: 'var(--color-ink)' }}>cat ./posts/*.md</span>
                <span style={{ color: '#aaaaaa', marginLeft: '8px' }}>→ {posts.length} {t('blog.postsFound')}</span>
            </motion.div>

            {posts.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
                    {posts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4 }}
                            onClick={() => navigate(`/blog/${post.slug}`)}
                            style={{
                                backgroundColor: 'var(--color-card-bg)',
                                border: '1.5px solid var(--color-border-strong)',
                                borderRadius: '8px',
                                boxShadow: '4px 4px 0px #18181B',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '6px 6px 0px #18181B'; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = '4px 4px 0px #18181B'; }}
                        >
                            <div style={{ height: '6px', backgroundColor: BLOCK_COLORS[i % BLOCK_COLORS.length], borderBottom: '1.5px solid #18181B' }} />
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span key={tag} style={{
                                            padding: '3px 9px', borderRadius: '4px',
                                            fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700,
                                            letterSpacing: '0.4px', textTransform: 'uppercase',
                                            backgroundColor: '#F7E49A', color: '#18181B', border: '1.5px solid #18181B',
                                        }}>{tag}</span>
                                    ))}
                                </div>
                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '19px', fontWeight: 700, lineHeight: '1.35',
                                    color: 'var(--color-ink)', margin: '0 0 10px 0',
                                }}>
                                    {post.title}
                                </h3>
                                <p style={{ fontSize: '14.5px', fontWeight: 400, lineHeight: '1.6', color: 'var(--color-ink-soft)', margin: '0 0 20px 0' }}>
                                    {post.excerpt}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-ink-soft)', paddingTop: '12px', borderTop: '1.5px dashed var(--color-rule-line)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FaClock size={11} /> {post.readTime}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ink)', textTransform: 'uppercase' }}>
                                        {t('blog.readMore')} <FaArrowRight size={10} />
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-ink-soft)' }}>
                    <FaInbox size={32} aria-hidden="true" style={{ marginBottom: '12px', opacity: 0.4 }} />
                    <div>{t('blog.noPosts')}</div>
                </div>
            )}
        </div>
    );
};

export default Blog;
