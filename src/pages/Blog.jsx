import React, { useState } from 'react';
import { Search, BookOpen, Tag, X, ChevronRight, Filter } from 'lucide-react';
import { translations, blogTaxonomy } from '../data/portfolioData';
import { getStoredArticles } from '../data/dataStore';
import ArticleCard from '../components/ArticleCard';
import BlogPost from './BlogPost';

export default function Blog({ selectedArticleId, setSelectArticleId, lang }) {
  const t = translations[lang].blog;
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allArticles = getStoredArticles();

  if (selectedArticleId) {
    return (
      <BlogPost 
        articleId={selectedArticleId}
        onBack={() => setSelectArticleId(null)}
        onSelectArticle={(id) => setSelectArticleId(id)}
        lang={lang}
      />
    );
  }

  const categoryKeys = ['all', ...Object.keys(blogTaxonomy)];

  const currentSubcategories = activeCategory !== 'all' && blogTaxonomy[activeCategory]
    ? ['all', ...blogTaxonomy[activeCategory].subcategories]
    : [];

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSubcategory = activeSubcategory === 'all' || article.subcategory === activeSubcategory;
    
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.subcategory && article.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Articles & Publications
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Filter machine learning models, backend architecture guides, data science pipelines, and personal milestones.
        </p>
      </div>

      {/* Main Category & Search Filter Bar */}
      <div className="space-y-4 bg-white dark:bg-indigo-950/40 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-indigo-900/40 backdrop-blur-md">
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categoryKeys.map((catKey) => {
              const label = catKey === 'all' 
                ? t.allCategories 
                : blogTaxonomy[catKey]?.label || catKey;
              
              const isActive = activeCategory === catKey;

              return (
                <button
                  key={catKey}
                  onClick={() => {
                    setActiveCategory(catKey);
                    setActiveSubcategory('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-indigo-900/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-indigo-900/30 border border-slate-200 dark:border-indigo-800/40 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Dynamic Subcategories Pills (Visible when category is selected) */}
        {currentSubcategories.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-indigo-900/30 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Filter className="h-3 w-3" /> Subcategory:
            </span>
            {currentSubcategories.map((sub) => {
              const label = sub === 'all' ? t.allSubcategories : sub;
              const isActive = activeSubcategory === sub;

              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-indigo-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-indigo-800/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onSelectArticle={(id) => setSelectArticleId(id)}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl space-y-2">
          <BookOpen className="h-10 w-10 mx-auto text-slate-400 mb-2" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No articles match your category or search query.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveSubcategory('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-indigo-500 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

    </div>
  );
}
