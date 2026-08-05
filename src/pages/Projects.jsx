import React, { useState } from 'react';
import { Search, Filter, X, ExternalLink, Layers } from 'lucide-react';
import { translations, projectsData } from '../data/portfolioData';
import { GithubIcon } from '../components/BrandIcons';
import ProjectCard from '../components/ProjectCard';

export default function Projects({ lang }) {
  const t = translations[lang].projects;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', label: t.all },
    { id: 'fullstack', label: t.fullstack },
    { id: 'backend', label: t.backend },
    { id: 'frontend', label: t.frontend },
    { id: 'ai', label: t.ai },
  ];

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 py-6">
      
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Portfolio Projects
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Explore my open-source applications, API architecture microservices, and fullstack web platforms.
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

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelect={(p) => setSelectedProject(p)}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/20">
          <Layers className="h-10 w-10 mx-auto text-neutral-400 mb-3" />
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t.noProjects}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedProject.image && (
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-56 object-cover rounded-2xl"
              />
            )}

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold text-xs capitalize">
                {selectedProject.category}
              </span>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {selectedProject.title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {selectedProject.longDescription || selectedProject.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs sm:text-sm text-center hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Code</span>
              </a>

              {selectedProject.demo && selectedProject.demo !== '#' && (
                <a 
                  href={selectedProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm text-center hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
