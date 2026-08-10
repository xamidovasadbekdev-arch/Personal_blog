import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Tag, Copy, Check, ThumbsUp } from 'lucide-react';
import { translations, blogTaxonomy } from '../data/portfolioData';
import { getStoredArticles } from '../data/dataStore';
import CommentsSection from '../components/CommentsSection';

export default function BlogPost({ articleId, onBack, onSelectArticle, lang }) {
  const t = translations[lang].blog;
  const articles = getStoredArticles();
  const article = articles.find(a => a.id === articleId) || articles[0];

  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  if (!article) return null;

  const catObj = blogTaxonomy[article.category] || { label: article.category };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  const renderFormattedContent = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let blockIdx = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.substring(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'bash',
        code: match[2].trim(),
        idx: blockIdx++
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex)
      });
    }

    return parts.map((part, index) => {
      if (part.type === 'code') {
        const isCopied = copiedCodeIdx === part.idx;
        return (
          <div key={index} className="my-6 rounded-2xl overflow-hidden border border-indigo-950 bg-[#070a16] shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/80 border-b border-indigo-900/50 text-xs font-mono">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">{part.language}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(part.code);
                  setCopiedCodeIdx(part.idx);
                  setTimeout(() => setCopiedCodeIdx(null), 2000);
                }}
                className="px-2.5 py-1 rounded-md bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isCopied ? (
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
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-indigo-100 leading-relaxed">
              <code>{part.code}</code>
            </pre>
          </div>
        );
      } else {
        return (
          <div key={index} className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-4">
            {part.value.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={pIdx} className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-indigo-900/40">{paragraph.replace('# ', '')}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={pIdx} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-3">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={pIdx} className="text-lg font-bold text-slate-900 dark:text-white pt-2">{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={pIdx}>{paragraph}</p>;
            })}
          </div>
        );
      }
    });
  };

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-6">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/60 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t.backToBlog}</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>{copied ? t.copied : t.share}</span>
        </button>
      </div>

      {/* Header */}
      <header className="space-y-4">
        
        {/* Category & Subcategory Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
            {catObj.label || article.category}
          </span>
          {article.subcategory && (
            <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider border border-purple-200 dark:border-purple-800">
              {article.subcategory}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {article.title}
        </h1>

        {/* Meta details */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-200 dark:border-indigo-900/40 py-3">
          <div className="flex items-center gap-2">
            <img 
              src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
              alt={article.author?.name || "Asadbek"} 
              className="w-7 h-7 rounded-full object-cover border border-indigo-500/40"
            />
            <span className="font-bold text-slate-900 dark:text-white">{article.author?.name || "Xamidov Asadbek"}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{article.date}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{article.readTime} {t.readTime}</span>
          </div>
        </div>

      </header>

      {/* Article Content */}
      <div className="pt-2">
        {renderFormattedContent(article.content)}
      </div>

      {/* Like Button & Tags */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-indigo-900/40">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-indigo-950/60 px-3 py-1 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            liked 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-slate-100 dark:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likes} Likes</span>
        </button>
      </div>

      {/* Working Interactive Comments Engine */}
      <CommentsSection articleId={article.id} lang={lang} />

    </article>
  );
}
