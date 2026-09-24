import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { pick } from '../data/portfolioData';

export default function ProjectCard({ project, onSelect, t, lang = 'en' }) {
  const title = pick(project.title, lang);
  const description = pick(project.description, lang);
  const hasDemo = project.demo && project.demo !== '#';

  return (
    <article className="card card-link group relative p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{t.categories[project.category] || project.category}</span>
        <div className="relative z-10 flex items-center gap-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} — ${t.viewCode}`}
              className="p-1.5 rounded-full text-muted hover:text-ink transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} — ${t.liveDemo}`}
              className="p-1.5 rounded-full text-muted hover:text-ink transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold leading-snug text-ink">
          {/* Stretched button: the whole card opens the details, the icon links stay clickable above it. */}
          <button onClick={() => onSelect(project)} className="text-left cursor-pointer after:absolute after:inset-0 after:content-['']">
            {title}
          </button>
        </h3>
        <p className="text-sm leading-relaxed text-body line-clamp-3">{description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {project.tech.map(item => (
          <span key={item} className="chip">{item}</span>
        ))}
      </div>
    </article>
  );
}
