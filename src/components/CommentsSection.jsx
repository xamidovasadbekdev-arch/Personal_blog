import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Clock, CheckCircle2 } from 'lucide-react';
import { translations } from '../data/portfolioData';

export default function CommentsSection({ articleId, lang = 'en' }) {
  const storageKey = `comments_${articleId}`;
  const t = translations[lang]?.comments || translations.en.comments;

  const loadComments = () => {
    try {
      const data = localStorage.getItem(storageKey);
      return data ? JSON.parse(data) : [
        {
          id: 'default-1',
          name: lang === 'uz' ? 'Dasturchilar Hamjamiyati' : 'Developer Community',
          text: lang === 'uz' ? 'Ajoyib maqola! Backend va machine learning bo\'yicha yangi postlarni kutib qolamiz.' : 'Great article! Looking forward to more backend and machine learning posts.',
          date: '2026-08-05 14:30',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
        }
      ];
    } catch (e) {
      return [];
    }
  };

  const [comments, setComments] = useState(loadComments());
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  useEffect(() => {
    setComments(loadComments());
  }, [articleId, lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      name: name.trim(),
      text: text.trim(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name)}`
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setName('');
    setText('');
    setPostedSuccess(true);
    setTimeout(() => setPostedSuccess(false), 3000);
  };

  return (
    <div className="pt-8 border-t border-slate-200 dark:border-indigo-900/40 space-y-6">
      
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-500" />
          <span>{t.title} ({comments.length})</span>
        </h3>
      </div>

      {/* Comment Input Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-indigo-950/30 border border-slate-200 dark:border-indigo-900/40 space-y-4">
        
        {postedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.postedMsg}</span>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.yourName} *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={lang === 'uz' ? "Masalan: Ali Valiyev" : "e.g. Alex Johnson"}
            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.writeComment} *</label>
          <textarea
            rows="3"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Send className="h-3.5 w-3.5" />
          <span>{t.postBtn}</span>
        </button>
      </form>

      {/* Posted Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div 
            key={comment.id} 
            className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/20 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img 
                  src={comment.avatar} 
                  alt={comment.name} 
                  className="w-7 h-7 rounded-full object-cover border border-indigo-500/40"
                />
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {comment.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {comment.date}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
              {comment.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
