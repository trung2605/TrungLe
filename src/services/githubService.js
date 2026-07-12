const GITHUB_USERNAME = 'trung2605';
const API_BASE = 'https://api.github.com';

export async function fetchGitHubProfile() {
    const res = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error(`GitHub profile fetch failed: ${res.status}`);
    const data = await res.json();
    return {
        publicRepos: data.public_repos,
        followers: data.followers,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
    };
}

export async function fetchRecentRepo() {
    const res = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=1`);
    if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
    const data = await res.json();
    if (!data.length) return null;
    const repo = data[0];
    return {
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        language: repo.language,
        updatedAt: repo.updated_at,
        stars: repo.stargazers_count,
    };
}
