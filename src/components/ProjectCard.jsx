import React from 'react';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectCard({ project, onSelect, t, lang = 'en' }) {
  const title = typeof project.title === 'object' ? (project.title[lang] || project.title.en) : project.title;
  const description = typeof project.description === 'object' ? (project.description[lang] || project.description.en) : project.description;

  return (
    <div 
      onClick={() => onSelect(project)}
      className="group relative rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 p-6 sm:p-7 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      <div className="space-y-4">
        
        {/* Cover Image - Fully Visible Styling */}
        {project.image && (
          <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-200 dark:border-indigo-900/40">
            <img 
              src={project.image} 
              alt={title} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
            
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-indigo-300 font-bold text-[10px] uppercase tracking-wider border border-indigo-500/30">
              {project.category}
            </span>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
            {description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {Array.isArray(project.tech) ? project.tech.map((item, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-indigo-950/60 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-indigo-900/40"
            >
              {item}
            </span>
          )) : (
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-indigo-950/60 text-[10px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-indigo-900/40">
              {project.tech}
            </span>
          )}
        </div>

      </div>

      {/* Footer Action Links */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 dark:border-indigo-900/40">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          {t?.details || (lang === 'uz' ? "Batafsil" : "View Details")} <ArrowRight className="h-3.5 w-3.5" />
        </span>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-indigo-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all"
              title="Source Code"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}

          {project.demo && project.demo !== '#' && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-110 transition-all"
              title="Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
