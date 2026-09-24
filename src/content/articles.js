// Blog articles live in src/content/blog/<lang>/<slug>.md (written by the CMS).
// The English file holds the shared metadata (date, category, tags); a missing
// Uzbek file falls back to English. Frontmatter is parsed at build time by the
// markdown plugin in vite.config.js, so each import is { meta, body }.

const files = import.meta.glob('./blog/*/*.md', { import: 'default', eager: true });

const WORDS_PER_MINUTE = 200;

function readTime(body) {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const bySlug = {};
for (const [path, file] of Object.entries(files)) {
  const [, lang, slug] = path.match(/\.\/blog\/(\w+)\/([^/]+)\.md$/);
  (bySlug[slug] ??= {})[lang] = file;
}

export const articles = Object.entries(bySlug)
  .filter(([, versions]) => versions.en && !versions.en.meta.draft)
  .map(([slug, versions]) => {
    const en = versions.en;
    const uz = versions.uz || en;
    return {
      slug,
      date: String(en.meta.date || ''),
      category: en.meta.category,
      subcategory: en.meta.subcategory,
      tags: en.meta.tags || [],
      title: { en: en.meta.title, uz: uz.meta.title || en.meta.title },
      excerpt: { en: en.meta.excerpt, uz: uz.meta.excerpt || en.meta.excerpt },
      content: { en: en.body, uz: uz.body || en.body },
      readTime: { en: readTime(en.body), uz: readTime(uz.body || en.body) },
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug) => articles.find(a => a.slug === slug);
