import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import { translations, profile, experienceTimeline, skillsData, pick } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

export default function About({ lang }) {
  const t = translations[lang];
  usePageMeta({ title: t.about.title, description: pick(profile.bio[0], lang) });

  return (
    <div className="max-w-4xl pt-16 sm:pt-20 space-y-24">
      <header className="space-y-6">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">{t.about.title}</h1>
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-base sm:text-lg leading-relaxed text-body max-w-3xl">{pick(paragraph, lang)}</p>
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          <a href={profile.resume} download className="btn btn-primary">
            <Download className="h-4 w-4" /> {t.about.downloadResume}
          </a>
          <Link to="/contact" className="btn btn-ghost">
            {t.hero.getInTouch} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="space-y-8">
        <div className="space-y-2">
          <p className="eyebrow">{t.about.timelineEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">{t.about.experienceTitle}</h2>
        </div>
        <ol className="border-t border-line">
          {experienceTimeline.map(item => (
            <li key={`${item.company.en}-${item.role.en}`} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8 py-6 border-b border-line">
              <span className="font-mono text-xs text-muted pt-1">{pick(item.year, lang)}</span>
              <div className="space-y-1.5">
                <h3 className="text-lg font-medium text-ink">
                  {pick(item.role, lang)} <span className="text-muted font-normal">· {pick(item.company, lang)}</span>
                </h3>
                <p className="text-sm leading-relaxed text-body">{pick(item.description, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-8">
        <div className="space-y-2">
          <p className="eyebrow">{t.sections.toolboxEyebrow}</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">{t.sections.skillsTitle}</h2>
        </div>
        <dl className="border-t border-line">
          {skillsData.map(group => (
            <div key={group.category.en} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8 py-5 border-b border-line">
              <dt className="text-sm text-ink">{pick(group.category, lang)}</dt>
              <dd className="text-sm text-body">{group.skills.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-px sm:grid-cols-3 rounded-2xl overflow-hidden border border-line bg-line">
        {t.principles.map(item => (
          <div key={item.title} className="bg-surface p-6 space-y-2">
            <h3 className="font-medium text-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed text-body">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
