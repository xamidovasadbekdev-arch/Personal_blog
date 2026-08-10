import React, { useState } from 'react';
import { Search, Filter, X, ExternalLink, Layers } from 'lucide-react';
import { translations } from '../data/portfolioData';
import { getStoredProjects } from '../data/dataStore';
import { GithubIcon } from '../components/BrandIcons';
import ProjectCard from '../components/ProjectCard';

export default function Projects({ lang = 'en' }) {
  const t = translations[lang]?.projects || translations.en.projects;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = getStoredProjects();

  const categories = [
    { id: 'all', label: t.all },
    { id: 'backend', label: t.backend },
    { id: 'ai', label: t.ai },
    { id: 'fullstack', label: t.fullstack },
    { id: 'frontend', label: t.frontend },
  ];

  const filteredProjects = projectsData.filter(project => {
    const titleStr = typeof project.title === 'object' ? (project.title[lang] || project.title.en) : project.title;
    const descStr = typeof project.description === 'object' ? (project.description[lang] || project.description.en) : project.description;

    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(project.tech) && project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 py-6">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.sub}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-indigo-950/40 p-4 rounded-2xl border border-slate-200 dark:border-indigo-900/40 backdrop-blur-md">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelect={(p) => setSelectedProject(p)}
              t={t}
              lang={lang}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl">
          <Layers className="h-10 w-10 mx-auto text-slate-400 mb-3" />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t.noProjects}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#070b18] rounded-3xl border border-slate-200 dark:border-indigo-900/60 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-indigo-950 text-slate-500 hover:text-slate-900 dark:hover:text-white z-20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image - Fully Visible Styling */}
            {selectedProject.image && (
              <div className="w-full max-h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-indigo-900/40 flex items-center justify-center p-1">
                <img 
                  src={selectedProject.image} 
                  alt={typeof selectedProject.title === 'object' ? (selectedProject.title[lang] || selectedProject.title.en) : selectedProject.title} 
                  className="w-full max-h-76 object-contain rounded-xl"
                />
              </div>
            )}

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {typeof selectedProject.title === 'object' ? (selectedProject.title[lang] || selectedProject.title.en) : selectedProject.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {typeof selectedProject.longDescription === 'object' 
                  ? (selectedProject.longDescription[lang] || selectedProject.longDescription.en) 
                  : (selectedProject.longDescription || (typeof selectedProject.description === 'object' ? (selectedProject.description[lang] || selectedProject.description.en) : selectedProject.description))}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.technologiesUsed}</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(selectedProject.tech) ? selectedProject.tech.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-indigo-950 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                )) : (
                  <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-indigo-950 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {selectedProject.tech}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-indigo-900/40">
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-indigo-950 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm text-center hover:bg-slate-200 dark:hover:bg-indigo-900/60 flex items-center justify-center gap-2"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>{t.viewCode}</span>
                </a>
              )}

              {selectedProject.demo && selectedProject.demo !== '#' && (
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm text-center hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t.liveDemo}</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
