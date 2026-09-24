import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Comments are stored as GitHub Discussions via giscus (https://giscus.app).
// To turn them on: enable Discussions on the repo, install the giscus app,
// then copy the two IDs giscus.app shows you into GISCUS below.
const GISCUS = {
  repo: 'xamidovasadbekdev-arch/Personal_blog',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
};

const giscusTheme = () => (document.documentElement.classList.contains('dark') ? 'noborder_dark' : 'noborder_light');

export default function GiscusComments({ lang = 'en', title }) {
  const containerRef = useRef(null);
  const { pathname } = useLocation();
  const enabled = Boolean(GISCUS.repoId && GISCUS.categoryId);

  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    const attrs = {
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': 'pathname',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': giscusTheme(),
      'data-lang': lang,
      'data-loading': 'lazy',
    };
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    script.crossOrigin = 'anonymous';
    script.async = true;
    container.appendChild(script);
  }, [enabled, lang, pathname]);

  // Follow the site's light/dark switch without reloading the widget.
  useEffect(() => {
    if (!enabled) return;
    const observer = new MutationObserver(() => {
      const iframe = document.querySelector('iframe.giscus-frame');
      iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme() } } }, 'https://giscus.app');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <section className="mt-16 pt-10 border-t border-line space-y-6">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div ref={containerRef} />
    </section>
  );
}
