import React, { useState } from 'react';
import { PenTool, Save, Trash2, Eye, Plus, Sparkles, CheckCircle2, Tag, Calendar, Clock } from 'lucide-react';
import { articlesData } from '../data/portfolioData';

export default function AdminEditor({ onArticlePublished, lang }) {
  const [activeTab, setActiveTab] = useState('editor'); // editor or list
  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState('tutorials');
  const [tags, setTags] = useState('Python, FastAPI, Backend');
  const [readTime, setReadTime] = useState('5');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(`# New Article Title

Write your markdown content here...

## 1. Introduction

FastAPI and Data Science are powerful tools for modern software engineers.

\`\`\`python
def hello_world():
    print("Hello from Admin Studio!")
\`\`\`
`);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load existing posts from LocalStorage or default
  const getCustomPosts = () => {
    try {
      const stored = localStorage.getItem('custom_articles');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  const [customPosts, setCustomPosts] = useState(getCustomPosts());

  const handlePublish = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !content.trim()) return;

    const newPost = {
      id: `custom-${Date.now()}`,
      title: postTitle,
      slug: postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category,
      date: new Date().toISOString().split('T')[0],
      readTime: readTime || '5',
      excerpt: excerpt || content.substring(0, 120) + '...',
      author: {
        name: "Xamidov Asadbek",
        role: "Backend Developer & Data Scientist",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      tags: tags.split(',').map(t => t.trim()),
      content: content
    };

    const updated = [newPost, ...customPosts];
    setCustomPosts(updated);
    localStorage.setItem('custom_articles', JSON.stringify(updated));

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    if (onArticlePublished) onArticlePublished();

    // Reset form
    setPostTitle('');
    setExcerpt('');
  };

  const handleDelete = (id) => {
    const updated = customPosts.filter(p => p.id !== id);
    setCustomPosts(updated);
    localStorage.setItem('custom_articles', JSON.stringify(updated));
    if (onArticlePublished) onArticlePublished();
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Admin Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-indigo-900/40 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Studio</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Article Web Editor & CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Write, edit, and publish technical articles directly from your web browser without code changes.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-200 dark:bg-indigo-950/60 p-1 rounded-xl border border-slate-300 dark:border-indigo-900/50">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'editor' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            New Article
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'list' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            My Custom Posts ({customPosts.length})
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">Article published successfully! It is now live on your Blog tab.</span>
        </div>
      )}

      {activeTab === 'editor' ? (
        <form onSubmit={handlePublish} className="space-y-6">
          
          <div className="grid gap-4 md:grid-cols-3">
            
            {/* Title */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Article Title *</label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="e.g. Master FastAPI Asynchronous Database Connection Pools"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Topic Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              >
                <option value="tutorials">Tutorials</option>
                <option value="architecture">Architecture</option>
                <option value="webdev">Web Dev</option>
                <option value="career">Data Science & Engineering</option>
              </select>
            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Tags */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Python, FastAPI, Data Science"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Read Time (mins)</label>
              <input
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Excerpt / Preview Summary</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of what readers will learn in this post..."
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Markdown Content Editor */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Markdown Article Content *</label>
            <textarea
              rows="12"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white dark:bg-[#070b16] border border-slate-300 dark:border-indigo-900/60 font-mono text-xs sm:text-sm leading-relaxed text-slate-900 dark:text-indigo-200 outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Publish Article Now</span>
          </button>

        </form>
      ) : (
        <div className="space-y-4">
          {customPosts.length > 0 ? (
            customPosts.map((post) => (
              <div 
                key={post.id} 
                className="p-5 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/40 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{post.category}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{post.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{post.date}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-300 dark:border-indigo-900/40 rounded-2xl">
              <p className="text-sm text-slate-500">No custom posts written yet. Click 'New Article' above to write one!</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
