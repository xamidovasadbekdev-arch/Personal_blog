import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { translations, skillsData, profile, projectsData, pick } from '../data/portfolioData';
import { articles } from '../content/articles';
import TerminalVisual from '../components/TerminalVisual';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import { SocialLinks } from '../components/Footer';
import usePageMeta from '../hooks/usePageMeta';

function SectionHeader({ eyebrow, title, linkTo, linkLabel }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div className="space-y-2">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      </div>
      {linkTo && (
        <Link to={linkTo} className="shrink-0 inline-flex items-center gap-1.5 text-sm text-body hover:text-ink transition-colors">
          {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export default function Home({ lang }) {
  const t = translations[lang];
  const navigate = useNavigate();
  usePageMeta({ description: pick(profile.subtitle, lang) });

  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 2);
  const recentArticles = articles.slice(0, 3);

  return (
    <div className="space-y-28 sm:space-y-32">
      {/* Hero */}
      <section className="grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-16 items-center pt-16 sm:pt-24">
        <div className="space-y-7">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink">
            {t.hero.titleTop}
            <br />
            <span className="underline-accent">{t.hero.titleMark}</span>
            {t.hero.titleEnd}
          </h1>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-body">
            {pick(profile.subtitle, lang)}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to="/projects" className="btn btn-primary">
              {t.hero.viewProjects} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/blog" className="btn btn-ghost">
              {t.hero.readBlog}
            </Link>
          </div>
          <SocialLinks className="-ml-2" />
        </div>

        <TerminalVisual lang={lang} />
      </section>

      {/* Selected work */}
      <section>
        <SectionHeader
          eyebrow={t.sections.workEyebrow}
          title={t.sections.featuredProjects}
          linkTo="/projects"
          linkLabel={t.sections.viewAllProjects}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={p => navigate(`/projects?open=${p.id}`)}
              t={t.projects}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* Toolbox */}
      <section>
        <SectionHeader eyebrow={t.sections.toolboxEyebrow} title={t.sections.skillsTitle} />
        <div className="grid gap-px sm:grid-cols-3 rounded-2xl overflow-hidden border border-line bg-line">
          {skillsData.map(group => (
            <div key={group.category.en} className="bg-surface p-6 space-y-4">
              <h3 className="text-sm font-medium text-ink">{pick(group.category, lang)}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map(skill => (
                  <li key={skill} className="chip">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Writing */}
      <section>
        <SectionHeader
          eyebrow={t.sections.writingEyebrow}
          title={t.sections.recentPosts}
          linkTo="/blog"
          linkLabel={t.sections.readAllPosts}
        />
        <div className="border-t border-line">
          {recentArticles.map(article => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>
      </section>

      {/* About + contact */}
      <section className="grid gap-10 md:grid-cols-2 items-start">
        <div className="space-y-5">
          <p className="eyebrow">{t.sections.aboutEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">{t.sections.aboutSnippetTitle}</h2>
          <p className="leading-relaxed text-body">{pick(profile.bio[0], lang)}</p>
          <Link to="/about" className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors">
            {t.sections.readMoreAbout} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="card p-8 space-y-5">
          <h3 className="text-xl font-semibold tracking-tight text-ink">{t.sections.bannerTitle}</h3>
          <p className="text-sm leading-relaxed text-body">{t.sections.bannerSub}</p>
          <Link to="/contact" className="btn btn-primary">
            {t.hero.getInTouch} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
