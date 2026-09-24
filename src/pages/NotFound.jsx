import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { translations } from '../data/portfolioData';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound({ lang = 'en' }) {
  const t = translations[lang].notFound;
  usePageMeta({ title: t.title });

  return (
    <div className="py-32 max-w-md space-y-5">
      <p className="eyebrow">404.</p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{t.title}</h1>
      <p className="text-body">{t.text}</p>
      <Link to="/" className="btn btn-ghost">
        <ArrowLeft className="h-4 w-4" /> {t.back}
      </Link>
    </div>
  );
}
