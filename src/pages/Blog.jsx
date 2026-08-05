import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Tag, X, Plus } from 'lucide-react';
import { translations, articlesData } from '../data/portfolioData';
import ArticleCard from '../components/ArticleCard';
import BlogPost from './BlogPost';

export default function Blog({ selectedArticleId, setSelectArticleId, lang, onOpenAdmin }) {
  const t = translations[lang].blog;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load custom LocalStorage articles
  const getCustomPosts = () => {
    try {
      const stored = localStorage.getItem('custom_articles');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const allArticles = [...getCustomPosts(), ...articlesData];

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

  const filteredArticles = allArticles.filter(article => {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Technical Articles & Engineering Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Articles on backend architecture, FastAPI, data science, and software engineering by Xamidov Asadbek.
          </p>
        </div>

        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Write New Post</span>
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-indigo-950/40 p-4 rounded-2xl border border-slate-200 dark:border-indigo-900/40 backdrop-blur-md">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-indigo-900/40 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
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
        <div className="text-center py-16 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl">
          <BookOpen className="h-10 w-10 mx-auto text-slate-400 mb-3" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No articles match your search criteria.
          </p>
        </div>
      )}

    </div>
  );
}
