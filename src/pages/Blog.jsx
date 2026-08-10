import React, { useState } from 'react';
import { 
  Search, BookOpen, Tag, X, ChevronRight, Filter, ArrowLeft, 
  Cpu, Layers, BarChart3, Heart, FolderOpen 
} from 'lucide-react';
import { translations, blogTaxonomy } from '../data/portfolioData';
import { getStoredArticles, getStoredCategories } from '../data/dataStore';
import ArticleCard from '../components/ArticleCard';
import BlogPost from './BlogPost';

export default function Blog({ selectedArticleId, setSelectArticleId, lang }) {
  const t = translations[lang]?.blog || translations.en.blog;
  
  // Drill-down view states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allArticles = getStoredArticles();
  const rawCategories = getStoredCategories();

  // Helper to format category for current language
  const categoriesList = rawCategories.map(cat => {
    const taxItem = blogTaxonomy[cat.id];
    let title = cat.title;
    let description = cat.description;
    let subcategories = cat.subcategories;

    if (taxItem) {
      if (typeof taxItem.label === 'object') title = taxItem.label[lang] || taxItem.label.en;
      if (typeof taxItem.description === 'object') description = taxItem.description[lang] || taxItem.description.en;
      if (typeof taxItem.subcategories === 'object') subcategories = taxItem.subcategories[lang] || taxItem.subcategories.en;
    }

    return {
      ...cat,
      title,
      description,
      subcategories
    };
  });

  // LEVEL 3: Full Article Reader View
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

  // Filtered articles for Level 2 or Search
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === null || article.category === selectedCategory;
    const matchesSubcategory = activeSubcategory === 'all' || article.subcategory === activeSubcategory;
    
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.subcategory && article.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  // LEVEL 2: Articles List within a Category (or Active Search)
  if (selectedCategory !== null || searchQuery !== '') {
    const categoryInfo = categoriesList.find(c => c.id === selectedCategory) || {
      title: lang === 'uz' ? "Qidiruv Natijalari" : "Search & Filtered Results",
      subcategories: []
    };

    return (
      <div className="space-y-8 py-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveSubcategory('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/60 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backToBlog}</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            {filteredArticles.length} {t.articlesFound}
          </span>
        </div>

        {/* Selected Category Header */}
        <div className="space-y-2 border-b border-slate-200 dark:border-indigo-900/40 pb-4">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FolderOpen className="h-7 w-7 text-indigo-500" />
            <span>{categoryInfo.title}</span>
          </h1>
          {categoryInfo.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400">{categoryInfo.description}</p>
          )}
        </div>

        {/* Subcategories Filter Chips */}
        {categoryInfo.subcategories && categoryInfo.subcategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-indigo-950/30 p-3 rounded-2xl border border-slate-200 dark:border-indigo-900/40">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {lang === 'uz' ? "Subkategoriyalar:" : "Subcategories:"}
            </span>
            <button
              onClick={() => setActiveSubcategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubcategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-indigo-900/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              {lang === 'uz' ? "Barchasi" : "All"}
            </button>
            {categoryInfo.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeSubcategory === sub
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-indigo-900/40 text-slate-600 dark:text-slate-400'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Articles List */}
        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onSelectArticle={(id) => setSelectArticleId(id)}
                t={t}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl">
            <BookOpen className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              {t.noArticles}
            </p>
          </div>
        )}

      </div>
    );
  }

  // LEVEL 1: Category Folders Overview (Default View)
  return (
    <div className="space-y-10 py-6">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.kbTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.kbSub}
        </p>
      </div>

      {/* Global Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-indigo-950/40 border border-slate-200 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      {/* Category Folders Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {categoriesList.map((cat) => {
          const count = allArticles.filter(a => a.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="group relative p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 overflow-hidden"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color || 'from-sky-500/20 to-indigo-500/20 border-sky-500/30 text-sky-400'} border shadow-inner`}>
                    <FolderOpen className="h-6 w-6" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-indigo-950 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {count} {lang === 'uz' ? 'ta Maqola' : 'Article'}{count === 1 || lang === 'uz' ? '' : 's'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategory Pills Preview */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.subcategories.map((sub, idx) => (
                      <span 
                        key={idx} 
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-indigo-950/60 text-[10px] font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-indigo-900/40"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Action Folder Arrow Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-indigo-900/40 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">
                <span>{t.exploreCategory}</span>
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
