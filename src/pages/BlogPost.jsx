import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Copy, Check, Link2 } from 'lucide-react';
import { translations, blogTaxonomy, profile, pick } from '../data/portfolioData';
import { getArticle } from '../content/articles';
import { formatDate } from '../lib/formatDate';
import GiscusComments from '../components/GiscusComments';
import NotFound from './NotFound';
import usePageMeta from '../hooks/usePageMeta';

function CodeBlock({ language, code, labels }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (insecure context); nothing else to do.
    }
  };

  return (
    <div className="not-prose rounded-xl overflow-hidden border border-[rgba(240,228,206,0.12)] bg-[#1b1814]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(240,228,206,0.08)] font-mono text-xs text-[#8b8272]">
        <span>{language || 'code'}</span>
        <button onClick={copy} className="flex items-center gap-1.5 hover:text-[#f2ebdf] transition-colors cursor-pointer">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? labels.codeCopied : labels.copyCode}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[#e9e1d3]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function BlogPost({ lang = 'en' }) {
  const { slug } = useParams();
  const t = translations[lang].blog;
  const article = getArticle(slug);
  const [linkCopied, setLinkCopied] = useState(false);

  usePageMeta(article ? { title: pick(article.title, lang), description: pick(article.excerpt, lang) } : {});

  if (!article) return <NotFound lang={lang} />;

  const category = blogTaxonomy[article.category];

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: pick(article.title, lang), url });
      } catch {
        // User closed the share sheet.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      // Clipboard unavailable.
    }
  };

  const markdownComponents = {
    pre: ({ children }) => {
      const codeEl = React.Children.only(children);
      const language = /language-(\w+)/.exec(codeEl.props.className || '')?.[1];
      return <CodeBlock language={language} code={String(codeEl.props.children).replace(/\n$/, '')} labels={t} />;
    },
    a: ({ href, children }) =>
      href?.startsWith('/') ? (
        <Link to={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
      ),
  };

  return (
    <article className="max-w-3xl mx-auto pt-12 sm:pt-16">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-body hover:text-ink transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> {t.backToBlog}
      </Link>

      <header className="mt-10 space-y-5 pb-8 border-b border-line">
        <p className="eyebrow">
          <Link to={`/blog?category=${article.category}`} className="hover:text-ink transition-colors">
            {category ? pick(category.label, lang) : article.category}
          </Link>
          {article.subcategory && <> · {article.subcategory}</>}
        </p>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-ink">
          {pick(article.title, lang)}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 rounded-full bg-surface-2 border border-line flex items-center justify-center font-mono text-[11px] text-ink">
              AX
            </span>
            <div className="leading-tight">
              <div className="text-ink">{profile.name}</div>
              <div className="font-mono text-xs text-muted">
                <time dateTime={article.date}>{formatDate(article.date, lang)}</time> · {pick(article.readTime, lang)} {t.readTime}
              </div>
            </div>
          </div>
          <button onClick={share} className="inline-flex items-center gap-1.5 text-sm text-body hover:text-ink transition-colors cursor-pointer">
            {linkCopied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {linkCopied ? t.copied : t.share}
          </button>
        </div>
      </header>

      <div className="prose-warm pt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {pick(article.content, lang)}
        </ReactMarkdown>
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-12">
          {article.tags.map(tag => (
            <span key={tag} className="chip">#{tag}</span>
          ))}
        </div>
      )}

      <GiscusComments lang={lang} title={t.comments} />
    </article>
  );
}
