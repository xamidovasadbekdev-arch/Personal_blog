import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Check, Bookmark, ThumbsUp, Tag, Copy, Code } from 'lucide-react';
import { translations, articlesData } from '../data/portfolioData';
import GiscusComments from '../components/GiscusComments';

function CodeBlock({ codeText, lang = 'python' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl bg-[#070b16] border border-indigo-900/50 p-4 font-mono text-xs sm:text-sm text-indigo-200 overflow-x-auto shadow-xl relative group">
      {/* Header bar with language badge and Copy Code button */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-indigo-900/50 text-xs text-indigo-400">
        <span className="px-2.5 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-800/40 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-900/50 hover:bg-indigo-800/60 text-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <pre className="leading-relaxed"><code>{codeText}</code></pre>
    </div>
  );
}

export default function BlogPost({ articleId, onBack, onSelectArticle, lang }) {
  const t = translations[lang].blog;
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(24);
  const [isLiked, setIsLiked] = useState(false);

  // Combine custom LocalStorage posts and default articles
  const getCustomPosts = () => {
    try {
      const stored = localStorage.getItem('custom_articles');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const allArticles = [...getCustomPosts(), ...articlesData];
  const article = allArticles.find(a => a.id === articleId) || allArticles[0];
  const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const renderMarkdown = (text) => {
    const lines = text.trim().split('\n');
    let inCodeBlock = false;
    let codeContent = [];
    let codeLang = 'python';

    return lines.map((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeContent.join('\n');
          codeContent = [];
          return <CodeBlock key={idx} codeText={codeText} lang={codeLang} />;
        } else {
          inCodeBlock = true;
          codeLang = line.replace('```', '').trim() || 'python';
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-8 mb-4 tracking-tight">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 tracking-tight">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-sm sm:text-base text-slate-700 dark:text-slate-300 my-1">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '---') {
        return <hr key={idx} className="my-8 border-slate-200 dark:border-indigo-900/40" />;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-3"></div>;
      }

      return (
        <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 my-2">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 py-6 animate-in fade-in duration-300">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t.backToBlog}</span>
      </button>

      {/* Header */}
      <div className="space-y-4 border-b border-slate-200 dark:border-indigo-900/40 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800/40 capitalize flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime} {t.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
          {article.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/40"
            />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLiked 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                  : 'bg-slate-100 dark:bg-indigo-950/60 border-slate-300 dark:border-indigo-900/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-indigo-900/60 bg-slate-100 dark:bg-indigo-950/60 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-indigo-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? t.copied : t.share}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Markdown Article Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
        {renderMarkdown(article.content)}
      </div>

      {/* Tags */}
      <div className="pt-8 border-t border-slate-200 dark:border-indigo-900/40 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Tags:</span>
        {article.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-indigo-950/60 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-indigo-900/40">
            #{tag}
          </span>
        ))}
      </div>

      {/* Giscus Comments Section */}
      <GiscusComments />

    </article>
  );
}
