import { useEffect } from 'react';

const SITE = 'Asadbek Xamidov';
const DEFAULT_TITLE = `${SITE} | Backend & AI/ML Engineer`;

function setMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Keeps the tab title and description in sync with the current page.
// Link previews (Telegram, LinkedIn) read the static tags in index.html,
// since their crawlers don't run JavaScript.
export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', window.location.href);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://xamidovasadbek.dev${window.location.pathname}`;
  }, [title, description]);
}
