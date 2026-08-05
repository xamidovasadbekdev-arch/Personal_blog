import React from 'react';
import { ExternalLink, Code2, ArrowRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectCard({ project, onSelect, t }) {
  return (
    <div className="group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 sm:p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between overflow-hidden">
      {/* Glow Hover background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>

      <div className="space-y-4">
        {/* Project Thumbnail Image */}
        {project.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-xs font-semibold text-white bg-blue-600/90 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                {t?.details || "View Details"} <ArrowRight className="h-3 w-3 inline" />
              </span>
            </div>
          </div>
        )}

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 
            onClick={() => onSelect && onSelect(project)}
            className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
          >
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((item, idx) => (
            <span 
              key={idx} 
              className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 text-[11px] font-semibold border border-neutral-200/50 dark:border-neutral-700/50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer Links */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>{t?.viewCode || "Source"}</span>
        </a>

        {project.demo && project.demo !== '#' && (
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>{t?.liveDemo || "Live Demo"}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
