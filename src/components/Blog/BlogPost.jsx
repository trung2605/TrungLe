import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaCalendarAlt } from 'react-icons/fa';
import Markdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { posts } from '../../data';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div style={{ paddingTop: '64px', paddingBottom: '96px', textAlign: 'center' }}>
                <p style={{ fontSize: '18px', color: '#888888', marginBottom: '24px' }}>{t('blog.notFound')}</p>
                <button
                    onClick={() => navigate('/blog')}
                    style={{ padding: '10px 24px', borderRadius: '50px', border: '1.5px solid #000000', background: '#000000', color: '#fff', cursor: 'pointer', fontSize: '15px' }}
                >
                    {t('blog.backToBlog')}
                </button>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '96px' }}>
            <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: '32px' }}
            >
                <Link
                    to="/blog"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '8px 18px', borderRadius: '50px',
                        border: '1.5px solid #e6e6e6', fontSize: '14px',
                        color: 'var(--color-ink)', backgroundColor: 'var(--color-canvas)',
                        textDecoration: 'none',
                    }}
                >
                    <FaArrowLeft size={12} /> {t('blog.backToBlog')}
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '760px', margin: '0 auto' }}
            >
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e6e6e6' }}>
                    {post.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '4px 12px', borderRadius: '50px',
                            fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.4px', textTransform: 'uppercase',
                            backgroundColor: '#f7f7f5', border: '1px solid #e6e6e6',
                        }}>{tag}</span>
                    ))}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#888888', marginLeft: 'auto' }}>
                        <FaCalendarAlt size={12} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#888888' }}>
                        <FaClock size={12} /> {post.readTime}
                    </span>
                </div>

                <div style={{ fontSize: '17px', fontWeight: '330', lineHeight: '1.8', color: '#333333' }}>
                    <Markdown>{post.content}</Markdown>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPost;
