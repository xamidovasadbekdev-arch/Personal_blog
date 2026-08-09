import React, { useState } from 'react';
import { 
  Search, BookOpen, Tag, X, ChevronRight, Filter, ArrowLeft, 
  Cpu, Layers, BarChart3, Heart, Sparkles, FolderOpen 
} from 'lucide-react';
import { translations, blogTaxonomy } from '../data/portfolioData';
import { getStoredArticles } from '../data/dataStore';
import ArticleCard from '../components/ArticleCard';
import BlogPost from './BlogPost';

export default function Blog({ selectedArticleId, setSelectArticleId, lang }) {
  const t = translations[lang].blog;
  
  // Drill-down view states:
  // selectedCategory: null (Level 1 Category Folders), 'ml'/'backend'/'datascience'/'personal' (Level 2 Articles List)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allArticles = getStoredArticles();

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

  // Category Configuration with icons & descriptions
  const categoriesList = [
    {
      id: 'ml',
      title: blogTaxonomy.ml.label,
      icon: Cpu,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
      description: 'Supervised Learning algorithms, Unsupervised clustering models, Neural Networks, and NLP.',
      subcategories: blogTaxonomy.ml.subcategories,
    },
    {
      id: 'backend',
      title: blogTaxonomy.backend.label,
      icon: Layers,
      color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
      description: 'FastAPI microservices, PostgreSQL async sessions, REST API design, Redis caching, and Docker.',
      subcategories: blogTaxonomy.backend.subcategories,
    },
    {
      id: 'datascience',
      title: blogTaxonomy.datascience.label,
      icon: BarChart3,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      description: 'Exploratory data analysis, Pandas & NumPy data pipelines, statistical modeling, and insights.',
      subcategories: blogTaxonomy.datascience.subcategories,
    },
    {
      id: 'personal',
      title: blogTaxonomy.personal.label,
      icon: Heart,
      color: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400',
      description: 'Personal achievements, football tournament gold medals, WIUT university life, and career milestones.',
      subcategories: blogTaxonomy.personal.subcategories,
    },
  ];

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
      title: "Search & Filtered Results",
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
            <span>All Category Folders</span>
          </button>

          <span className="text-xs font-mono text-slate-400">
            {filteredArticles.length} Article{filteredArticles.length === 1 ? '' : 's'} Found
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
        {categoryInfo.subcategories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-indigo-950/30 p-3 rounded-2xl border border-slate-200 dark:border-indigo-900/40">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subcategories:</span>
            <button
              onClick={() => setActiveSubcategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeSubcategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-indigo-900/40 text-slate-600 dark:text-slate-400'
              }`}
            >
              All
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl">
            <BookOpen className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              No articles found in this section.
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
          Knowledge Base & Article Categories
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Select a category folder below to explore machine learning guides, backend architecture breakdowns, data science tutorials, and personal milestones.
        </p>
      </div>

      {/* Global Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search all articles by keyword, title, or tag..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-indigo-950/40 border border-slate-200 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors shadow-sm"
        />
      </div>

      {/* Category Folders Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {categoriesList.map((cat) => {
          const IconComp = cat.icon;
          const count = allArticles.filter(a => a.category === cat.id).length;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="group relative p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 overflow-hidden"
            >
              <div className="space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} border shadow-inner`}>
                    <IconComp className="h-6 w-6" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-indigo-950 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {count} Article{count === 1 ? '' : 's'}
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

              </div>

              {/* Action Folder Arrow Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-indigo-900/40 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">
                <span>Explore Category Articles</span>
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
