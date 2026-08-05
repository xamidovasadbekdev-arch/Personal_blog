import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Tag, X } from 'lucide-react';
import { translations, articlesData } from '../data/portfolioData';
import ArticleCard from '../components/ArticleCard';
import BlogPost from './BlogPost';

export default function Blog({ selectedArticleId, setSelectArticleId, lang }) {
  const t = translations[lang].blog;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If a specific article is selected, show the reader view!
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

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'tutorials', label: t.tutorials },
    { id: 'architecture', label: t.architecture },
    { id: 'webdev', label: t.webdev },
    { id: 'career', label: t.career },
  ];

  const filteredArticles = articlesData.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 py-6">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Technical Articles & Engineering Insights
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          In-depth guides on backend software architecture, FastAPI, React performance, clean code practices, and system design.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-neutral-900/60 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-md">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

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
        <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/20">
          <BookOpen className="h-10 w-10 mx-auto text-neutral-400 mb-3" />
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            No articles match your criteria.
          </p>
        </div>
      )}

    </div>
  );
}
