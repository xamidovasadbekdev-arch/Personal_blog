import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { translations, blogTaxonomy, pick } from '../data/portfolioData';
import { articles } from '../content/articles';
import ArticleCard from '../components/ArticleCard';
import usePageMeta from '../hooks/usePageMeta';

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
        active ? 'bg-ink text-bg border-ink' : 'border-line-strong text-body hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

export default function Blog({ lang }) {
  const t = translations[lang].blog;
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  usePageMeta({ title: t.title, description: t.sub });

  const category = blogTaxonomy[searchParams.get('category')] ? searchParams.get('category') : null;
  const subcategory = searchParams.get('topic');

  const setFilter = (nextCategory, nextTopic) => {
    const params = {};
    if (nextCategory) params.category = nextCategory;
    if (nextTopic) params.topic = nextTopic;
    setSearchParams(params, { replace: true });
  };

  // Only show categories that actually have posts.
  const usedCategories = Object.keys(blogTaxonomy).filter(id => articles.some(a => a.category === id));
  // Subcategories are stored in English on the article; the index maps them to the Uzbek label.
  const topics = category
    ? blogTaxonomy[category].subcategories.en
        .map((en, i) => ({ en, label: blogTaxonomy[category].subcategories[lang]?.[i] || en }))
        .filter(topic => articles.some(a => a.category === category && a.subcategory === topic.en))
    : [];

  const q = query.trim().toLowerCase();
  const filtered = articles.filter(article => {
    if (category && article.category !== category) return false;
    if (subcategory && article.subcategory !== subcategory) return false;
    if (!q) return true;
    const haystack = [pick(article.title, lang), pick(article.excerpt, lang), article.subcategory, ...article.tags]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });

  return (
    <div className="pt-16 sm:pt-20 space-y-10">
      <header className="space-y-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">{t.title}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-body">{t.sub}</p>
      </header>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterLabel}>
            <FilterChip active={!category} onClick={() => setFilter(null)}>{t.all}</FilterChip>
            {usedCategories.map(id => (
              <FilterChip key={id} active={category === id} onClick={() => setFilter(id)}>
                {pick(blogTaxonomy[id].label, lang)}
              </FilterChip>
            ))}
          </div>

          <label className="relative w-full md:w-72">
            <span className="sr-only">{t.searchPlaceholder}</span>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="field !pl-10"
            />
          </label>
        </div>

        {topics.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-muted">{t.topics}:</span>
            {[{ en: null, label: t.all }, ...topics].map(topic => (
              <button
                key={topic.en || 'all'}
                onClick={() => setFilter(category, topic.en)}
                aria-pressed={subcategory === topic.en}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  subcategory === topic.en ? 'text-accent' : 'text-body hover:text-ink'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="border-t border-line">
          {filtered.map(article => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted border border-dashed border-line-strong rounded-2xl">{t.noArticles}</p>
      )}
    </div>
  );
}
