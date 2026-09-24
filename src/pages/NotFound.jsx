import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound({ lang = 'en' }) {
  const uz = lang === 'uz';
  usePageMeta({ title: uz ? 'Sahifa topilmadi' : 'Page not found' });

  return (
    <div className="py-32 max-w-md space-y-5">
      <p className="eyebrow">404.</p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">
        {uz ? 'Sahifa topilmadi' : 'Page not found'}
      </h1>
      <p className="text-body">
        {uz ? "Bu manzilda hech narsa yo'q." : 'There is nothing at this address.'}
      </p>
      <Link to="/" className="btn btn-ghost">
        <ArrowLeft className="h-4 w-4" /> {uz ? 'Bosh sahifa' : 'Back home'}
      </Link>
    </div>
  );
}
