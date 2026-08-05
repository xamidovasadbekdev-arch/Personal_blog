import React from 'react';
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function ArticleCard({ article, onSelectArticle, t }) {
  return (
    <article 
      onClick={() => onSelectArticle(article.id)}
      className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer flex flex-col justify-between"
    >
      <div className="space-y-3">
        {/* Category Badge & Read Time */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/40 dark:border-blue-800/40 capitalize flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-neutral-400" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-neutral-400" />
              {article.readTime} {t?.readTime || "min read"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Read Link */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <div className="flex items-center gap-2">
          <img 
            src={article.author.avatar} 
            alt={article.author.name} 
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {article.author.name}
          </span>
        </div>

        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read Article <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
