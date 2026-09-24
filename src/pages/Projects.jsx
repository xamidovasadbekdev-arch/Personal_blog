import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { translations, projectsData, pick } from '../data/portfolioData';
import { GithubIcon } from '../components/BrandIcons';
import ProjectCard from '../components/ProjectCard';
import usePageMeta from '../hooks/usePageMeta';

function ProjectDialog({ project, t, lang, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const title = pick(project.title, lang);
  const hasDemo = project.demo && project.demo !== '#';

  // Portal to <body> so the overlay sits above the sticky header and footer.
  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-bg border border-line rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full text-muted hover:text-ink cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-3 pr-8">
          <p className="eyebrow">{t.categories[project.category] || project.category}</p>
          <h2 id="project-dialog-title" className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
          <p className="leading-relaxed text-body">{pick(project.longDescription || project.description, lang)}</p>
        </div>

        <div className="space-y-2">
          <p className="eyebrow">{t.technologiesUsed}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(item => (
              <span key={item} className="chip">{item}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GithubIcon className="h-4 w-4" /> {t.viewCode}
            </a>
          )}
          {hasDemo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.liveDemo} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects({ lang = 'en' }) {
  const t = translations[lang].projects;
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  usePageMeta({ title: t.title, description: t.sub });

  const openProject = projectsData.find(p => p.id === searchParams.get('open'));
  const setOpen = id => setSearchParams(id ? { open: id } : {}, { replace: !id });

  const presentCategories = new Set(projectsData.map(p => p.category));
  const categories = ['all', ...Object.keys(t.categories).filter(id => presentCategories.has(id))];

  const q = query.trim().toLowerCase();
  const filtered = projectsData.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const haystack = [pick(project.title, lang), pick(project.description, lang), ...project.tech].join(' ').toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });

  return (
    <div className="pt-16 sm:pt-20 space-y-10">
      <header className="space-y-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">{t.title}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-body">{t.sub}</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterLabel}>
          {categories.map(id => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              aria-pressed={activeCategory === id}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
                activeCategory === id ? 'bg-ink text-bg border-ink' : 'border-line-strong text-body hover:text-ink'
              }`}
            >
              {id === 'all' ? t.all : t.categories[id]}
            </button>
          ))}
        </div>

        <label className="relative w-full md:w-72">
          <span className="sr-only">{t.searchPlaceholder}</span>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="field !pl-10"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onSelect={p => setOpen(p.id)} t={t} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted border border-dashed border-line-strong rounded-2xl">{t.noProjects}</p>
      )}

      {openProject && <ProjectDialog project={openProject} t={t} lang={lang} onClose={() => setOpen(null)} />}
    </div>
  );
}
