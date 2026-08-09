import React, { useState } from 'react';
import { 
  User, Briefcase, Code2, BookOpen, KeyRound, Save, Plus, Trash2, Edit3, CheckCircle2, 
  X, Lock, LogOut, ExternalLink, Sparkles, Layers, ShieldCheck
} from 'lucide-react';
import { GithubIcon } from '../components/BrandIcons';
import { 
  getStoredProfile, saveProfile, 
  getStoredTimeline, saveTimeline,
  getStoredProjects, saveProjects,
  getStoredArticles, saveArticles,
  getStoredCredentials, saveCredentials
} from '../data/dataStore';

export default function AdminPanel({ onLogout, onDataUpdated }) {
  const [activeTab, setActiveTab] = useState('profile'); // profile, projects, articles, timeline, security
  const [saveAlert, setSaveAlert] = useState('');

  // 1. Profile State
  const [profile, setProfile] = useState(getStoredProfile());

  // 2. Timeline State
  const [timeline, setTimeline] = useState(getStoredTimeline());
  const [editingTimelineIdx, setEditingTimelineIdx] = useState(null);
  const [newTimeline, setNewTimeline] = useState({ year: '', role: '', company: '', description: '' });

  // 3. Projects State
  const [projects, setProjects] = useState(getStoredProjects());
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', category: 'backend', description: '', longDescription: '',
    tech: 'Python, FastAPI, PostgreSQL', github: '', demo: '', image: '', featured: true
  });

  // 4. Articles State
  const [articles, setArticles] = useState(getStoredArticles());
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState({
    title: '', category: 'tutorials', readTime: '5', excerpt: '', tags: 'Python, FastAPI', content: '# New Post Title\n\nWrite content here...'
  });

  // 5. Security Credentials State
  const [creds, setCreds] = useState(getStoredCredentials());
  const [newUsername, setNewUsername] = useState(creds.username);
  const [newPassword, setNewPassword] = useState(creds.password);

  const triggerSavedNotice = (msg) => {
    setSaveAlert(msg);
    if (onDataUpdated) onDataUpdated();
    setTimeout(() => setSaveAlert(''), 3000);
  };

  // --- SAVE HANDLERS ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveProfile(profile);
    triggerSavedNotice('Profile details saved successfully!');
  };

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) return;
    const updated = { username: newUsername.trim(), password: newPassword.trim() };
    saveCredentials(updated);
    setCreds(updated);
    triggerSavedNotice('Admin login credentials updated successfully!');
  };

  // --- TIMELINE HANDLERS ---
  const handleAddTimeline = (e) => {
    e.preventDefault();
    if (!newTimeline.year || !newTimeline.role || !newTimeline.company) return;
    const updated = [newTimeline, ...timeline];
    setTimeline(updated);
    saveTimeline(updated);
    setNewTimeline({ year: '', role: '', company: '', description: '' });
    triggerSavedNotice('New career experience added!');
  };

  const handleDeleteTimeline = (idx) => {
    const updated = timeline.filter((_, i) => i !== idx);
    setTimeline(updated);
    saveTimeline(updated);
    triggerSavedNotice('Career experience item deleted.');
  };

  // --- PROJECTS HANDLERS ---
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const techArray = typeof projectForm.tech === 'string' 
      ? projectForm.tech.split(',').map(t => t.trim()) 
      : projectForm.tech;

    if (editingProjectId) {
      // Edit existing
      const updated = projects.map(p => p.id === editingProjectId ? {
        ...projectForm,
        id: editingProjectId,
        tech: techArray,
      } : p);
      setProjects(updated);
      saveProjects(updated);
      setEditingProjectId(null);
      triggerSavedNotice('Project updated successfully!');
    } else {
      // Create new
      const newProj = {
        ...projectForm,
        id: `proj-${Date.now()}`,
        tech: techArray,
        image: projectForm.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
      };
      const updated = [newProj, ...projects];
      setProjects(updated);
      saveProjects(updated);
      triggerSavedNotice('New project added to portfolio!');
    }

    setProjectForm({
      title: '', category: 'backend', description: '', longDescription: '',
      tech: 'Python, FastAPI, PostgreSQL', github: '', demo: '', image: '', featured: true
    });
  };

  const handleEditProjectClick = (p) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      description: p.description,
      longDescription: p.longDescription || p.description,
      tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech,
      github: p.github || '',
      demo: p.demo || '',
      image: p.image || '',
      featured: p.featured || false,
    });
  };

  const handleDeleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
    triggerSavedNotice('Project deleted from portfolio.');
  };

  // --- ARTICLES HANDLERS ---
  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!articleForm.title.trim()) return;

    const tagsArray = typeof articleForm.tags === 'string' 
      ? articleForm.tags.split(',').map(t => t.trim()) 
      : articleForm.tags;

    if (editingArticleId) {
      // Edit existing
      const updated = articles.map(a => a.id === editingArticleId ? {
        ...a,
        title: articleForm.title,
        category: articleForm.category,
        readTime: articleForm.readTime || '5',
        excerpt: articleForm.excerpt || articleForm.content.substring(0, 120) + '...',
        tags: tagsArray,
        content: articleForm.content
      } : a);
      setArticles(updated);
      saveArticles(updated);
      setEditingArticleId(null);
      triggerSavedNotice('Blog article updated!');
    } else {
      // Add new
      const newArt = {
        id: `article-${Date.now()}`,
        title: articleForm.title,
        slug: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: articleForm.category,
        date: new Date().toISOString().split('T')[0],
        readTime: articleForm.readTime || '5',
        excerpt: articleForm.excerpt || articleForm.content.substring(0, 120) + '...',
        author: {
          name: profile.name,
          role: profile.headline,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        tags: tagsArray,
        content: articleForm.content
      };
      const updated = [newArt, ...articles];
      setArticles(updated);
      saveArticles(updated);
      triggerSavedNotice('New blog post published!');
    }

    setArticleForm({
      title: '', category: 'tutorials', readTime: '5', excerpt: '', tags: 'Python, FastAPI', content: '# New Post Title\n\nWrite content here...'
    });
  };

  const handleEditArticleClick = (a) => {
    setEditingArticleId(a.id);
    setArticleForm({
      title: a.title,
      category: a.category,
      readTime: a.readTime,
      excerpt: a.excerpt,
      tags: Array.isArray(a.tags) ? a.tags.join(', ') : a.tags,
      content: a.content
    });
  };

  const handleDeleteArticle = (id) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    saveArticles(updated);
    triggerSavedNotice('Blog article deleted.');
  };

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-indigo-900/40 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-extrabold border border-indigo-200 dark:border-indigo-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Management Studio</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Portfolio Admin Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your Profile info, Career timeline, Projects gallery, and Blog articles in one place.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-indigo-950 text-slate-800 dark:text-slate-200 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 font-bold text-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Admin</span>
        </button>
      </div>

      {saveAlert && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{saveAlert}</span>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-indigo-950/40 border border-slate-300 dark:border-indigo-900/40">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-indigo-900/40'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile & Bio</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-indigo-900/40'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'articles' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-indigo-900/40'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Blog Articles ({articles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-indigo-900/40'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Career Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'security' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-indigo-900/40'
          }`}
        >
          <KeyRound className="h-4 w-4" />
          <span>Password & Credentials</span>
        </button>
      </div>

      {/* ================= TAB 1: PROFILE & BIO ================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-indigo-900/40 pb-3">
            Edit Portfolio Personal Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Title / Headline</label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hero Subtitle (English)</label>
            <textarea
              rows="2"
              value={profile.subtitleEN}
              onChange={(e) => setProfile({ ...profile, subtitleEN: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-medium outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hero Subtitle (Uzbek)</label>
            <textarea
              rows="2"
              value={profile.subtitleUZ}
              onChange={(e) => setProfile({ ...profile, subtitleUZ: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-medium outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio Paragraph 1 (English)</label>
              <textarea
                rows="3"
                value={profile.bioEN1}
                onChange={(e) => setProfile({ ...profile, bioEN1: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              ></textarea>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bio Paragraph 2 (English)</label>
              <textarea
                rows="3"
                value={profile.bioEN2}
                onChange={(e) => setProfile({ ...profile, bioEN2: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Telegram Handle</label>
              <input
                type="text"
                value={profile.telegram}
                onChange={(e) => setProfile({ ...profile, telegram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub URL</label>
              <input
                type="text"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile Settings</span>
          </button>
        </form>
      )}

      {/* ================= TAB 2: PROJECTS MANAGEMENT (CRUD) ================= */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          
          {/* Add / Edit Form */}
          <form onSubmit={handleSaveProject} className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-indigo-900/40 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProjectId ? "Edit Project" : "Add New Project"}
              </h2>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectForm({
                      title: '', category: 'backend', description: '', longDescription: '',
                      tech: 'Python, FastAPI, PostgreSQL', github: '', demo: '', image: '', featured: true
                    });
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. AI Sales Forecast Pipeline"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="backend">Backend & API</option>
                  <option value="ai">AI / Data Science</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="frontend">Frontend</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tech Stack Badges (comma separated)</label>
              <input
                type="text"
                value={projectForm.tech}
                onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                placeholder="Python, FastAPI, PostgreSQL, Docker"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">GitHub Repo URL</label>
                <input
                  type="text"
                  value={projectForm.github}
                  onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-medium outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Demo URL</label>
                <input
                  type="text"
                  value={projectForm.demo}
                  onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-medium outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cover Image URL</label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-medium outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Description</label>
              <textarea
                rows="2"
                required
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm outline-none text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>{editingProjectId ? "Update Project" : "Add Project"}</span>
            </button>
          </form>

          {/* List of Existing Projects */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Existing Projects List</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{p.category}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{p.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-indigo-900/40">
                    <button
                      onClick={() => handleEditProjectClick(p)}
                      className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-500 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 3: ARTICLES MANAGEMENT (CRUD) ================= */}
      {activeTab === 'articles' && (
        <div className="space-y-8">
          
          {/* Article Form */}
          <form onSubmit={handleSaveArticle} className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-indigo-900/40 pb-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingArticleId ? "Edit Article" : "Write & Publish New Article"}
              </h2>
              {editingArticleId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticleId(null);
                    setArticleForm({ title: '', category: 'tutorials', readTime: '5', excerpt: '', tags: 'Python, FastAPI', content: '# New Post Title\n\nWrite content here...' });
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1 space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. Asynchronous SQLAlchemy Patterns"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                <select
                  value={articleForm.category}
                  onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value, subcategory: '' })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="ml">Machine Learning & AI</option>
                  <option value="backend">Backend & Architecture</option>
                  <option value="datascience">Data Science & Analytics</option>
                  <option value="personal">Personal & Life</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subcategory</label>
                <input
                  type="text"
                  value={articleForm.subcategory || ''}
                  onChange={(e) => setArticleForm({ ...articleForm, subcategory: e.target.value })}
                  placeholder="e.g. Supervised Learning, Sports & Football"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tags (comma separated)</label>
                <input
                  type="text"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm({ ...articleForm, tags: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Read Time (mins)</label>
                <input
                  type="number"
                  value={articleForm.readTime}
                  onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Excerpt Summary</label>
              <input
                type="text"
                value={articleForm.excerpt}
                onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                placeholder="A brief summary of what readers will learn..."
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Markdown Content *</label>
              <textarea
                rows="10"
                required
                value={articleForm.content}
                onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                className="w-full p-4 rounded-xl bg-[#070b16] border border-indigo-950 font-mono text-xs text-indigo-200 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{editingArticleId ? "Update Article" : "Publish Article"}</span>
            </button>
          </form>

          {/* List of Existing Articles */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Published Articles List</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {articles.map((a) => (
                <div key={a.id} className="p-5 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{a.category}</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">{a.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{a.excerpt}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-indigo-900/40">
                    <button
                      onClick={() => handleEditArticleClick(a)}
                      className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteArticle(a.id)}
                      className="px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-500 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 4: CAREER TIMELINE ================= */}
      {activeTab === 'timeline' && (
        <div className="space-y-8">
          
          <form onSubmit={handleAddTimeline} className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-indigo-900/40 pb-3">
              Add New Experience Item
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Year / Date Range *</label>
                <input
                  type="text"
                  required
                  value={newTimeline.year}
                  onChange={(e) => setNewTimeline({ ...newTimeline, year: e.target.value })}
                  placeholder="e.g. July 2026 - Present"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Role Title *</label>
                <input
                  type="text"
                  required
                  value={newTimeline.role}
                  onChange={(e) => setNewTimeline({ ...newTimeline, role: e.target.value })}
                  placeholder="e.g. Data Analyst"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company / Inst *</label>
                <input
                  type="text"
                  required
                  value={newTimeline.company}
                  onChange={(e) => setNewTimeline({ ...newTimeline, company: e.target.value })}
                  placeholder="e.g. Mittivoy Company"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
              <textarea
                rows="2"
                value={newTimeline.description}
                onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs outline-none text-slate-900 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Timeline Item</span>
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Current Timeline Items</h3>
            {timeline.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-indigo-500 font-mono">{item.year}</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{item.role} <span className="text-slate-400 font-normal">at {item.company}</span></div>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>

                <button
                  onClick={() => handleDeleteTimeline(idx)}
                  className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 hover:bg-rose-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 5: PASSWORD & SECURITY ================= */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveCredentials} className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 space-y-6 max-w-md">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-indigo-900/40 pb-3">
            Change Admin Gateway Credentials
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Admin Username</label>
            <input
              type="text"
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Admin Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Update Password</span>
          </button>
        </form>
      )}

    </div>
  );
}
