import React from 'react';
import { Clock, Calendar, ArrowRight, Tag, Layers } from 'lucide-react';
import { blogTaxonomy } from '../data/portfolioData';

export default function ArticleCard({ article, onSelectArticle, t }) {
  const catObj = blogTaxonomy[article.category] || { label: article.category };

  return (
    <article 
      onClick={() => onSelectArticle(article.id)}
      className="group relative rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between"
    >
      <div className="space-y-3">
        
        {/* Category & Subcategory Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800/50 text-[11px] capitalize flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {catObj.label || article.category}
            </span>

            {article.subcategory && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 font-bold border border-purple-200 dark:border-purple-800/50 text-[11px]">
                {article.subcategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              {article.readTime} {t?.readTime || "min read"}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Read Link */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 dark:border-indigo-900/40">
        <div className="flex items-center gap-2">
          <img 
            src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
            alt={article.author?.name || "Asadbek"} 
            className="w-6 h-6 rounded-full object-cover border border-indigo-500/40"
          />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {article.author?.name || "Xamidov Asadbek"}
          </span>
        </div>

        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read Article <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
