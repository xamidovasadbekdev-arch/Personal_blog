import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/formatDate';
import { blogTaxonomy, translations, pick } from '../data/portfolioData';

// One article as a list row: date, title + excerpt, category and read time.
export default function ArticleCard({ article, lang = 'en' }) {
  const t = translations[lang].blog;
  const category = blogTaxonomy[article.category];

  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group grid gap-2 sm:grid-cols-[8rem_1fr_auto] sm:gap-6 py-6 border-b border-line items-baseline"
    >
      <time dateTime={article.date} className="font-mono text-xs text-muted">
        {formatDate(article.date, lang)}
      </time>
      <div className="space-y-1.5 min-w-0">
        <h3 className="text-lg font-medium leading-snug text-ink group-hover:text-accent transition-colors">
          {pick(article.title, lang)}
        </h3>
        <p className="text-sm text-body leading-relaxed line-clamp-2">{pick(article.excerpt, lang)}</p>
        <p className="font-mono text-xs text-muted">
          {category ? pick(category.label, lang) : article.category} · {pick(article.readTime, lang)} {t.readTime}
        </p>
      </div>
      <ArrowRight className="hidden sm:block h-4 w-4 text-muted group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
