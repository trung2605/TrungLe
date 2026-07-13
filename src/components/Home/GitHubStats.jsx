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

    // Silently disappear on failure/rate-limit rather than showing a broken widget
    if (failed || !profile) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ backgroundColor: '#f4ecd6', borderRadius: '24px', padding: '32px 36px', marginBottom: '72px' }}
        >
            <p style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '12px',
                letterSpacing: '0.60px', textTransform: 'uppercase',
                color: '#666666', marginBottom: '20px',
                display: 'flex', alignItems: 'center', gap: '8px',
            }}>
                <FaGithub size={13} /> {t('home.githubLabel')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '340', color: '#000000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaCodeBranch size={18} style={{ opacity: 0.5 }} aria-hidden="true" /> {profile.publicRepos}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666666', marginTop: '4px' }}>{t('home.githubRepos')}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '340', color: '#000000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaUsers size={18} style={{ opacity: 0.5 }} aria-hidden="true" /> {profile.followers}
                        </div>
                        <div style={{ fontSize: '13px', color: '#666666', marginTop: '4px' }}>{t('home.githubFollowers')}</div>
                    </div>
                </div>

                {recentRepo && (
                    <a
                        href={recentRepo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px 20px', borderRadius: '16px',
                            backgroundColor: 'rgba(255,255,255,0.6)',
                            textDecoration: 'none', color: '#000000',
                            maxWidth: '320px',
                        }}
                    >
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#888888', marginBottom: '2px' }}>
                                {t('home.githubRecent')}
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '540', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {recentRepo.name}
                            </div>
                            {recentRepo.stars > 0 && (
                                <div style={{ fontSize: '12px', color: '#888888', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                    <FaStar size={10} aria-hidden="true" /> {recentRepo.stars}
                                </div>
                            )}
                        </div>
                        <FaExternalLinkAlt size={12} style={{ opacity: 0.5, flexShrink: 0 }} aria-hidden="true" />
                    </a>
                )}
            </div>

            {topRepos.length > 0 && (
                <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#888888', marginBottom: '14px' }}>
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
                                    display: 'block', padding: '14px 16px', borderRadius: '14px',
                                    backgroundColor: 'rgba(255,255,255,0.6)',
                                    textDecoration: 'none', color: '#000000',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '540', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {repo.name}
                                    </span>
                                    {repo.stars > 0 && (
                                        <span style={{ fontSize: '12px', color: '#888888', display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
                                            <FaStar size={10} aria-hidden="true" /> {repo.stars}
                                        </span>
                                    )}
                                </div>
                                {repo.description && (
                                    <p style={{ fontSize: '12px', color: '#666666', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {repo.description}
                                    </p>
                                )}
                                {repo.language && (
                                    <span style={{ fontSize: '11px', color: '#999999', marginTop: '6px', display: 'block' }}>{repo.language}</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {!heatmapFailed && (
                <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.08)', overflowX: 'auto' }}>
                    <img
                        src={`https://ghchart.rshah.org/6d3fc9/${GITHUB_USERNAME}`}
                        alt={t('home.githubHeatmapAlt')}
                        loading="lazy"
                        onError={() => setHeatmapFailed(true)}
                        style={{ width: '100%', minWidth: '760px', display: 'block' }}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default GitHubStats;
