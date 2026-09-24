const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'src', 'data', 'posts');
const files = fs.readdirSync(postsDir).filter(f => f.startsWith('post') && f.endsWith('.js'));
const slugs = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const m = content.match(/slug:\s*["']([^"']+)["']/);
  return m ? m[1] : null;
}).filter(Boolean);

console.log("Found post slugs:", slugs);

// Static routes
const staticRoutes = [
  "",
  "dich-vu",
  "projects",
  "about",
  "achievements",
  "blog",
  "contact",
  "resume"
];

// Project IDs (from data.js we know project ids: 26, 14, 24, 25, 5, 1, 2, 3, 4, etc.)
const projectIds = [26, 14, 24, 25, 5, 1, 2, 3, 4, 6, 7, 8];

const baseUrl = "https://trung2605.github.io";
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Add static routes
for (const route of staticRoutes) {
  const loc = route ? `${baseUrl}/${route}` : `${baseUrl}/`;
  const priority = route === "" ? "1.0" : route === "dich-vu" ? "0.9" : "0.8";
  const changefreq = route === "" || route === "dich-vu" || route === "projects" ? "weekly" : "monthly";

  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
}

// Add blog posts
for (const slug of slugs) {
  xml += `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

// Add project detail pages
for (const id of projectIds) {
  xml += `  <url>
    <loc>${baseUrl}/projects/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log("Successfully generated sitemap.xml at:", sitemapPath);
