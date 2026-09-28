import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { translations } from '../data/portfolioData';
import { API_URL } from '../lib/api';
import { formatDate } from '../lib/formatDate';

const EMPTY = { name: '', text: '' };

// Comments under an article. New comments are held until the owner approves
// them (by email or at /admin/comments); only approved ones are listed here.
export default function Comments({ slug, lang = 'en' }) {
  const t = translations[lang].comments;
  const [comments, setComments] = useState([]);
  const [loadState, setLoadState] = useState('loading'); // loading | ready | error
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    let cancelled = false;
    setLoadState('loading');
    fetch(`${API_URL}/comments/${slug}`)
      .then(response => (response.ok ? response.json() : Promise.reject(response.status)))
      .then(data => {
        if (!cancelled) {
          setComments(data.comments || []);
          setLoadState('ready');
        }
      })
      .catch(() => !cancelled && setLoadState('error'));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const update = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    // Hidden field: people leave it empty, bots fill it in. The backend drops those.
    const website = e.currentTarget.elements.website?.value || '';
    setStatus('sending');
    try {
      const response = await fetch(`${API_URL}/comments/${slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      });
      if (!response.ok) throw new Error(`Comments API responded ${response.status}`);
      setStatus('sent');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="mt-16 pt-10 border-t border-line space-y-8" aria-labelledby="comments-title">
      <h2 id="comments-title" className="text-xl font-semibold text-ink">
        {t.title}
        {comments.length > 0 && <span className="text-muted font-normal"> · {comments.length}</span>}
      </h2>

      {loadState === 'error' && <p className="text-sm text-muted">{t.loadError}</p>}
      {loadState === 'ready' && comments.length === 0 && <p className="text-sm text-muted">{t.empty}</p>}
      {comments.length > 0 && (
        <ol className="space-y-6">
          {comments.map(comment => (
            <li key={comment.id} className="space-y-1.5">
              <div className="flex items-baseline gap-3">
                <span className="font-medium text-ink">{comment.name}</span>
                <time dateTime={comment.created} className="font-mono text-xs text-muted">
                  {formatDate(comment.created.slice(0, 10), lang)}
                </time>
              </div>
              {/* Rendered as plain text: React escapes it, and line breaks are kept. */}
              <p className="text-body leading-relaxed whitespace-pre-line break-words">{comment.text}</p>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={handleSubmit} className="card p-5 sm:p-6 space-y-4">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label className="space-y-1.5 block">
          <span className="text-sm text-ink">{t.name}</span>
          <input required maxLength={60} autoComplete="name" value={form.name} onChange={update('name')} placeholder={t.namePlaceholder} className="field" />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-sm text-ink">{t.text}</span>
          <textarea required maxLength={2000} rows={4} value={form.text} onChange={update('text')} placeholder={t.textPlaceholder} className="field resize-y" />
        </label>

        <div aria-live="polite">
          {status === 'sent' && (
            <p className="flex items-start gap-2 text-sm text-ink">
              <Check className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {t.pending}
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-start gap-2 text-sm text-ink">
              <AlertCircle className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {t.error}
            </p>
          )}
        </div>

        <button type="submit" disabled={status === 'sending'} className="btn btn-primary">
          {status === 'sending' ? t.sending : t.send} <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
