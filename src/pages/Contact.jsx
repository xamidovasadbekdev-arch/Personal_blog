import React, { useState } from 'react';
import { Mail, Send, MapPin, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { translations, profile, pick } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import usePageMeta from '../hooks/usePageMeta';
import { API_URL } from '../lib/api';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact({ lang }) {
  const t = translations[lang].contact;
  usePageMeta({ title: t.title, description: t.subtitle });

  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    // Hidden field: people leave it empty, bots fill it in. The backend drops those.
    const website = e.currentTarget.elements.website?.value || '';

    setStatus('sending');
    try {
      // Our own backend checks the message and emails it via Resend.
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          subject: form.subject || `${t.formSubjectPrefix} ${form.name}`,
          website,
        }),
      });
      if (!response.ok) throw new Error(`Contact API responded ${response.status}`);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Send, label: 'Telegram', value: profile.telegram, href: profile.telegramUrl },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'asadbekxamidov', href: profile.linkedin },
    { icon: GithubIcon, label: 'GitHub', value: 'xamidovasadbekdev-arch', href: profile.github },
  ];

  return (
    <div className="pt-16 sm:pt-20 space-y-12">
      <header className="space-y-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink">{t.title}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-body">{t.subtitle}</p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] items-start">
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-1.5 block">
              <span className="text-sm text-ink">{t.name}</span>
              <input required autoComplete="name" value={form.name} onChange={update('name')} placeholder={t.namePlaceholder} className="field" />
            </label>
            <label className="space-y-1.5 block">
              <span className="text-sm text-ink">{t.email}</span>
              <input required type="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder={t.emailPlaceholder} className="field" />
            </label>
          </div>

          <label className="space-y-1.5 block">
            <span className="text-sm text-ink">
              {t.subject} <span className="text-muted">({t.optional})</span>
            </span>
            <input value={form.subject} onChange={update('subject')} placeholder={t.subjectPlaceholder} className="field" />
          </label>

          <label className="space-y-1.5 block">
            <span className="text-sm text-ink">{t.message}</span>
            <textarea required rows={6} value={form.message} onChange={update('message')} placeholder={t.messagePlaceholder} className="field resize-y" />
          </label>

          <div aria-live="polite">
            {status === 'sent' && (
              <p className="flex items-start gap-2 text-sm text-ink">
                <Check className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {t.success}
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-start gap-2 text-sm text-ink">
                <AlertCircle className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>
                  {t.error}{' '}
                  <a href={`mailto:${profile.email}`} className="underline underline-offset-2">{profile.email}</a>
                </span>
              </p>
            )}
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full sm:w-auto">
            {status === 'sending' ? t.sending : t.send} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <aside className="space-y-6">
          <p className="eyebrow">{t.directContact}</p>
          <ul className="border-t border-line">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 border-b border-line min-w-0"
                >
                  <Icon className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
                  <span className="font-mono text-xs text-muted w-20">{label}</span>
                  <span className="text-sm text-ink truncate min-w-0">{value}</span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4 border-b border-line">
              <MapPin className="h-4 w-4 text-muted" />
              <span className="font-mono text-xs text-muted w-20">{t.locationLabel}</span>
              <span className="text-sm text-ink">{pick(profile.location, lang)}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
