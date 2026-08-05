import React, { useEffect, useRef } from 'react';

export default function GiscusComments({ repo = "xamidovasadbekdev-arch/Personal_blog" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', 'R_kgDOG1234'); // Placeholder GitHub repo id
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOG1234');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    containerRef.current.appendChild(script);
  }, [repo]);

  return (
    <div className="pt-8 border-t border-slate-200 dark:border-indigo-900/40 space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span>Discussion & Comments</span>
      </h3>
      <div ref={containerRef} className="min-h-[160px] bg-slate-100/50 dark:bg-indigo-950/20 p-4 rounded-2xl border border-slate-200 dark:border-indigo-900/30"></div>
    </div>
  );
}
