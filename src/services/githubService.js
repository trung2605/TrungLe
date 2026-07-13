const GITHUB_USERNAME = 'trung2605';
const API_BASE = 'https://api.github.com';
const CACHE_KEY = 'github_stats_cache_v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour — keeps us well under the 60 req/h unauthenticated limit

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function writeCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() }));
    } catch {
        // localStorage unavailable (private mode, quota) — cache is a nice-to-have, not required
    }
}

const mapRepo = (repo) => ({
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.html_url,
    language: repo.language,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
});

async function fetchLive() {
    const [profileRes, recentRes, topRes] = await Promise.all([
        fetch(`${API_BASE}/users/${GITHUB_USERNAME}`),
        fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=1`),
        // GitHub's REST API has no "pinned repos" endpoint (that's GraphQL-only, which needs
        // an auth token we can't safely expose client-side) — top-starred repos is the
        // standard public-API stand-in most portfolios use instead.
        fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc&per_page=6`),
    ]);
    if (!profileRes.ok) throw new Error(`GitHub profile fetch failed: ${profileRes.status}`);
    if (!recentRes.ok) throw new Error(`GitHub repos fetch failed: ${recentRes.status}`);
    if (!topRes.ok) throw new Error(`GitHub top repos fetch failed: ${topRes.status}`);

    const profileData = await profileRes.json();
    const recentData = await recentRes.json();
    const topData = await topRes.json();
    const repo = recentData[0];

    return {
        profile: {
            publicRepos: profileData.public_repos,
            followers: profileData.followers,
            avatarUrl: profileData.avatar_url,
            htmlUrl: profileData.html_url,
        },
        recentRepo: repo ? mapRepo(repo) : null,
        topRepos: topData
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 4)
            .map(mapRepo),
    };
}

// Cache-first with graceful degrade: fresh cache short-circuits the network call;
// a failed live fetch (rate-limit, offline) still returns stale cache if we have any,
// so the widget only truly disappears on a cold cache + failed first fetch.
export async function fetchGitHubStats() {
    const cached = readCache();
    const isFresh = cached && (Date.now() - cached.fetchedAt < CACHE_TTL_MS);
    if (isFresh) return cached.data;

    try {
        const data = await fetchLive();
        writeCache(data);
        return data;
    } catch (err) {
        if (cached) return cached.data;
        throw err;
    }
}
