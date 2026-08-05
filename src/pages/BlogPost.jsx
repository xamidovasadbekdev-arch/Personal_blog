import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Check, Bookmark, ThumbsUp, Tag } from 'lucide-react';
import { translations, articlesData } from '../data/portfolioData';

export default function BlogPost({ articleId, onBack, onSelectArticle, lang }) {
  const t = translations[lang].blog;
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(14);
  const [isLiked, setIsLiked] = useState(false);

  const article = articlesData.find(a => a.id === articleId) || articlesData[0];
  const relatedArticles = articlesData.filter(a => a.id !== article.id).slice(0, 2);

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

  // Convert raw text into nicely formatted paragraph / code blocks for demonstration
  const renderMarkdown = (text) => {
    const lines = text.trim().split('\n');
    let inCodeBlock = false;
    let codeContent = [];

    return lines.map((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeContent.join('\n');
          codeContent = [];
          return (
            <div key={idx} className="my-6 rounded-xl bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs sm:text-sm text-blue-300 overflow-x-auto shadow-lg relative">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800 text-[10px] text-neutral-400">
                <span>Code Snippet</span>
                <span className="text-blue-400">UTF-8</span>
              </div>
              <pre><code>{codeText}</code></pre>
            </div>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mt-8 mb-4 tracking-tight">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-8 mb-3 tracking-tight">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-lg font-bold text-neutral-900 dark:text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 list-disc text-sm sm:text-base text-neutral-700 dark:text-neutral-300 my-1">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '---') {
        return <hr key={idx} className="my-8 border-neutral-200 dark:border-neutral-800" />;
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-3"></div>;
      }

      return (
        <p key={idx} className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 my-2">
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
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t.backToBlog}</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/40 dark:border-blue-800/40 capitalize flex items-center gap-1">
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

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.2]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
          {article.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/40" 
            />
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white">{article.author.name}</div>
              <div className="text-xs text-neutral-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isLiked 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
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
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mr-2">Tags:</span>
        {article.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold">
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <div className="pt-12 space-y-6">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {t.relatedPosts}
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((rel) => (
              <div 
                key={rel.id}
                onClick={() => onSelectArticle(rel.id)}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 hover:border-blue-500/50 transition-all cursor-pointer space-y-2"
              >
                <span className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider">{rel.category}</span>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">{rel.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
}
