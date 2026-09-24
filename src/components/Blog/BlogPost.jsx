import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaCalendarAlt, FaRocket, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';
import { useTranslatedData } from '../../hooks/useTranslatedData';
import NewAvatar from '../../assets/information/image.png';
import './BlogPost.scss';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const { posts, projects = [] } = useTranslatedData();
    const post = posts.find(p => p.slug === slug);

    // Dynamic SEO for Blog Post (Always called unconditionally at top of component)
    useEffect(() => {
        if (post) {
            const postTitle = isEn ? (post.titleEn || post.titleVi) : (post.titleVi || post.titleEn);
            const pageTitle = `${postTitle} | Lê Trí Trung Blog`;
            document.title = pageTitle;

            const postExcerpt = isEn ? (post.excerptEn || post.excerptVi) : (post.excerptVi || post.excerptEn);
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', postExcerpt);

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', pageTitle);
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', postExcerpt);
        }
    }, [post, isEn]);

    if (!post) {
        return (
            <div style={{ paddingTop: '64px', paddingBottom: '96px', textAlign: 'center' }}>
                <p style={{ fontSize: '18px', color: 'var(--color-ink-soft)', marginBottom: '24px' }}>{t('blog.notFound')}</p>
                <button
                    onClick={() => navigate('/blog')}
                    style={{ padding: '10px 24px', borderRadius: '50px', border: '1.5px solid var(--color-ink)', background: 'var(--color-ink)', color: 'var(--color-canvas)', cursor: 'pointer', fontSize: '15px' }}
                >
                    {t('blog.backToBlog')}
                </button>
            </div>
        );
    }

    const relatedProject = projects.find(proj => {
        const slugLower = (post?.slug || '').toLowerCase();
        const titleLower = (proj.title || '').toLowerCase();
        if (slugLower.includes('biensovip') && titleLower.includes('biensovip')) return true;
        if (slugLower.includes('threadlearn') && titleLower.includes('threadlearn')) return true;
        if (slugLower.includes('mchub') && titleLower.includes('mc hub')) return true;
        if (slugLower.includes('jobfinder') && titleLower.includes('job finder')) return true;
        if (slugLower.includes('servlets') && titleLower.includes('dola bakery')) return true;
        return false;
    });

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
                        border: '1.5px solid var(--color-hairline)', fontSize: '14px',
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
                style={{ maxWidth: '780px', margin: '0 auto' }}
            >
                <h1 style={{
                    fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                    fontSize: 'clamp(28px, 4vw, 38px)',
                    fontWeight: '700',
                    lineHeight: '1.25',
                    color: 'var(--color-ink)',
                    marginBottom: '20px',
                    letterSpacing: '-0.02em',
                }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--color-hairline)' }}>
                    {post.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '4px 12px', borderRadius: '50px',
                            fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
                            letterSpacing: '0.4px', textTransform: 'uppercase',
                            color: 'var(--color-ink)',
                            backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)',
                        }}>{tag}</span>
                    ))}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--color-ink-soft)', marginLeft: 'auto' }}>
                        <FaCalendarAlt size={12} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--color-ink-soft)' }}>
                        <FaClock size={12} /> {post.readTime}
                    </span>
                </div>

                <div className="blog-post-body" style={{ fontSize: '17px', fontWeight: '330', lineHeight: '1.8', color: 'var(--color-ink)' }}>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ href, children, ...props }) => {
                                const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
                                if (isInternal) {
                                    return (
                                        <Link to={href} style={{ color: '#6d3fc9', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '3px' }} {...props}>
                                            {children}
                                        </Link>
                                    );
                                }
                                return (
                                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#6d3fc9', fontWeight: '500', textDecoration: 'underline', textUnderlineOffset: '3px' }} {...props}>
                                        {children}
                                    </a>
                                );
                            }
                        }}
                    >
                        {post.content}
                    </Markdown>
                </div>

                {/* Related Project Showcase Card */}
                {relatedProject && (
                    <div style={{
                        marginTop: '56px',
                        padding: '24px 28px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                                <FaLaptopCode size={22} />
                            </div>
                            <div>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', color: '#64748b' }}>
                                    {isEn ? "Related Project" : "Dự án liên quan"}
                                </span>
                                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '2px 0 0 0' }}>
                                    {relatedProject.title}
                                </h4>
                            </div>
                        </div>

                        <Link
                            to={`/projects/${relatedProject.id}`}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px', borderRadius: '50px',
                                backgroundColor: '#0f172a', color: '#ffffff',
                                fontSize: '13.5px', fontWeight: 500, textDecoration: 'none',
                                transition: 'opacity 0.15s ease',
                            }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            <span>{isEn ? "View Project Detail" : "Xem Chi Tiết Dự Án"}</span>
                            <FaArrowRight size={11} />
                        </Link>
                    </div>
                )}

                {/* Author Info Box */}
                <div style={{
                    marginTop: '40px',
                    padding: '28px 32px',
                    backgroundColor: '#faf5ff',
                    borderRadius: '24px',
                    border: '1px solid #f3e8ff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <img
                            src={NewAvatar}
                            alt="Lê Trí Trung - Tech Lead"
                            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #c5b0f4' }}
                        />
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a', margin: '0 0 4px 0' }}>
                                Lê Trí Trung
                            </h3>
                            <p style={{ fontSize: '13.5px', color: '#6b21a8', fontWeight: 500, margin: 0 }}>
                                Tech Lead & Software Architect — Team 5 Kỹ Sư Đà Nẵng
                            </p>
                        </div>
                    </div>
                    <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                        {isEn
                            ? "Heading a 5-engineer team in Da Nang specializing in commercial web applications, SaaS Automation, and AI Agents. Winner of Computer Vision Hackathon 2026."
                            : "Dẫn dắt đội ngũ 5 kỹ sư công nghệ tại Đà Nẵng, chuyên phát triển Website thương mại, SaaS Automation và tích hợp AI Agent. Quán quân Hackathon Computer Vision 2026."}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '8px' }}>
                        <Link
                            to="/about"
                            style={{
                                fontSize: '13px', fontWeight: 600, color: '#6d3fc9', textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                            }}
                        >
                            <span>{isEn ? "About the Author →" : "Hành trình & Giới thiệu →"}</span>
                        </Link>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <Link
                            to="/dich-vu"
                            style={{
                                fontSize: '13px', fontWeight: 600, color: '#6d3fc9', textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                            }}
                        >
                            <span>{isEn ? "Engineering Services →" : "Dịch vụ làm web & SaaS →"}</span>
                        </Link>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <Link
                            to="/contact"
                            style={{
                                fontSize: '13px', fontWeight: 600, color: '#6d3fc9', textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: '5px',
                            }}
                        >
                            <span>{isEn ? "Direct Contact →" : "Liên hệ tư vấn →"}</span>
                        </Link>
                    </div>
                </div>

                {/* Services Cross-linking CTA */}
                <div style={{
                    marginTop: '32px',
                    padding: '32px',
                    borderRadius: '24px',
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.1)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.4px', textTransform: 'uppercase', color: '#dceeb1' }}>
                        <FaRocket size={11} /> {isEn ? "Production Engineering" : "Triển khai thực tế"}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0, lineHeight: '1.3' }}>
                        {isEn
                            ? "Need this architectural level for your business website or app?"
                            : "Bạn muốn áp dụng chuẩn kiến trúc này cho website hoặc hệ thống của mình?"}
                    </h3>
                    <p style={{ fontSize: '14.5px', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>
                        {isEn
                            ? "From high-performance database design to automated VietQR payment funnels and AI assistants, our 5-engineer team delivers end-to-end with guaranteed milestones."
                            : "Từ tối ưu cơ sở dữ liệu tốc độ cao đến tích hợp cổng VietQR tự động và trợ lý AI, đội ngũ 5 kỹ sư Đà Nẵng cam kết bàn giao chuẩn tiến độ và tính giá theo Manday minh bạch."}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
                        <Link
                            to="/dich-vu"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px', borderRadius: '50px',
                                backgroundColor: '#6d3fc9', color: '#ffffff',
                                fontSize: '13.5px', fontWeight: 600, textDecoration: 'none',
                            }}
                        >
                            <span>{isEn ? "Explore Services & Pricing" : "Xem Bảng Giá & Dịch Vụ"}</span>
                            <FaArrowRight size={11} />
                        </Link>
                        <Link
                            to="/contact"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '10px 20px', borderRadius: '50px',
                                backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff',
                                fontSize: '13.5px', fontWeight: 500, textDecoration: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            <span>{isEn ? "Consult with Tech Lead" : "Trao Đổi 1-1 Với Tech Lead"}</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPost;
