// Blog articles live in src/content/blog/<slug>/<lang>.md.
// en.md holds the shared metadata (date, category, tags); uz.md only needs
// its own title and excerpt. A missing uz.md falls back to English.

const files = import.meta.glob('./blog/*/*.md', { query: '?raw', import: 'default', eager: true });

const WORDS_PER_MINUTE = 200;

function parseValue(raw) {
  const value = raw.trim();
  if (value.startsWith('"') || value.startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

function parseMarkdown(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: source.trim() };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = parseValue(line.slice(idx + 1));
  }
  return { meta, body: match[2].trim() };
}

function readTime(body) {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const bySlug = {};
for (const [path, source] of Object.entries(files)) {
  const [, slug, lang] = path.match(/\.\/blog\/([^/]+)\/(\w+)\.md$/);
  (bySlug[slug] ??= {})[lang] = parseMarkdown(source);
}

export const articles = Object.entries(bySlug)
  .filter(([, versions]) => versions.en)
  .map(([slug, versions]) => {
    const en = versions.en;
    const uz = versions.uz || en;
    return {
      slug,
      date: en.meta.date,
      category: en.meta.category,
      subcategory: en.meta.subcategory,
      tags: en.meta.tags || [],
      cover: en.meta.cover,
      title: { en: en.meta.title, uz: uz.meta.title || en.meta.title },
      excerpt: { en: en.meta.excerpt, uz: uz.meta.excerpt || en.meta.excerpt },
      content: { en: en.body, uz: uz.body },
      readTime: { en: readTime(en.body), uz: readTime(uz.body) },
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug) => articles.find(a => a.slug === slug);
