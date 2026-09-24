import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound({ lang = 'en' }) {
  const uz = lang === 'uz';
  return (
    <div className="py-24 text-center space-y-4 max-w-md mx-auto">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-slate-500">404</p>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">
        {uz ? "Sahifa topilmadi" : "Page not found"}
      </h1>
      <p className="text-sm text-slate-500">
        {uz ? "Bu manzilda hech narsa yo'q." : "There is nothing at this address."}
      </p>
      <Link to="/" className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm">
        {uz ? "Bosh sahifaga qaytish" : "Back to home"}
      </Link>
    </div>
  );
}
