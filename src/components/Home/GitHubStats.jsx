import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaUsers, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { fetchGitHubStats } from '../../services/githubService';

const GITHUB_USERNAME = 'trung2605';

const GitHubStats = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [recentRepo, setRecentRepo] = useState(null);
    const [topRepos, setTopRepos] = useState([]);
    const [failed, setFailed] = useState(false);
    const [heatmapFailed, setHeatmapFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        fetchGitHubStats()
            .then(({ profile: profileData, recentRepo: repoData, topRepos: topData }) => {
                if (cancelled) return;
                setProfile(profileData);
                setRecentRepo(repoData);
                setTopRepos(topData || []);
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });
        return () => { cancelled = true; };
    }, []);

    if (failed || !profile) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="notebook-card"
            style={{
                backgroundColor: 'var(--color-surface-soft)',
                padding: '28px 32px',
                marginBottom: '64px',
                position: 'relative',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <span className="notebook-boxed-label" style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    <FaGithub size={14} /> {t('home.githubLabel')}
                </span>
                <span className="sticky-note-tag" style={{ backgroundColor: '#FDE68A', transform: 'rotate(1.5deg)', fontSize: '14px' }}>
                    @{GITHUB_USERNAME}
                </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '12px 18px', backgroundColor: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-strong)', borderRadius: '6px', boxShadow: '2px 2px 0px #18181B' }}>
                        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 700, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1 }}>
                            <FaCodeBranch size={16} style={{ color: '#2563EB' }} aria-hidden="true" /> {profile.publicRepos}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginTop: '6px', fontWeight: 600 }}>{t('home.githubRepos')}</div>
                    </div>
                    <div style={{ padding: '12px 18px', backgroundColor: 'var(--color-card-bg)', border: '1.5px solid var(--color-border-strong)', borderRadius: '6px', boxShadow: '2px 2px 0px #18181B' }}>
                        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 700, color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1 }}>
                            <FaUsers size={16} style={{ color: '#18A96B' }} aria-hidden="true" /> {profile.followers}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginTop: '6px', fontWeight: 600 }}>{t('home.githubFollowers')}</div>
                    </div>
                </div>

                {recentRepo && (
                    <a
                        href={recentRepo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '12px 18px', borderRadius: '6px',
                            backgroundColor: '#F5C242',
                            border: '1.5px solid #18181B',
                            boxShadow: '3px 3px 0px #18181B',
                            textDecoration: 'none', color: '#18181B',
                            maxWidth: '340px',
                        }}
                    >
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', opacity: 0.75, marginBottom: '2px' }}>
                                ★ {t('home.githubRecent')}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {recentRepo.name}
                            </div>
                        </div>
                        <FaExternalLinkAlt size={12} style={{ flexShrink: 0 }} aria-hidden="true" />
                    </a>
                )}
            </div>

            {topRepos.length > 0 && (
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1.5px dashed var(--color-hairline)' }}>
                    <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '12px' }}>
                        {t('home.githubTopRepos')}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                        {topRepos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'block', padding: '14px 16px', borderRadius: '6px',
                                    backgroundColor: 'var(--color-card-bg)',
                                    border: '1.5px solid var(--color-border-strong)',
                                    boxShadow: '2px 2px 0px #18181B',
                                    textDecoration: 'none', color: 'var(--color-ink)',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '13.5px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {repo.name}
                                    </span>
                                    {repo.stars > 0 && (
                                        <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#EA580C', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                                            <FaStar size={10} aria-hidden="true" /> {repo.stars}
                                        </span>
                                    )}
                                </div>
                                {repo.description && (
                                    <p style={{ fontSize: '12.5px', color: 'var(--color-ink-soft)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {repo.description}
                                    </p>
                                )}
                                {repo.language && (
                                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#18A96B', marginTop: '6px', display: 'block' }}>● {repo.language}</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {!heatmapFailed && (
                <div className="hidden md:block" style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1.5px dashed var(--color-hairline)', overflowX: 'auto' }}>
                    <img
                        src={`https://ghchart.rshah.org/18A96B/${GITHUB_USERNAME}`}
                        alt={t('home.githubHeatmapAlt')}
                        loading="lazy"
                        onError={() => setHeatmapFailed(true)}
                        style={{ width: '100%', minWidth: '720px', display: 'block' }}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default GitHubStats;
