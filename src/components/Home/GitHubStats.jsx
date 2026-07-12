import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaUsers, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { fetchGitHubProfile, fetchRecentRepo } from '../../services/githubService';

const GitHubStats = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [recentRepo, setRecentRepo] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let cancelled = false;
        Promise.all([fetchGitHubProfile(), fetchRecentRepo()])
            .then(([profileData, repoData]) => {
                if (cancelled) return;
                setProfile(profileData);
                setRecentRepo(repoData);
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
        </motion.div>
    );
};

export default GitHubStats;
