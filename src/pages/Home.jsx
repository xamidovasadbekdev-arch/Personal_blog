import React from 'react';
import { ArrowRight, Send, Compass, Sparkles, Code2, Zap, Terminal, Flame } from 'lucide-react';
import { translations, projectsData, articlesData, skillsData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/BrandIcons';
import TerminalVisual from '../components/TerminalVisual';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import SkillCard from '../components/SkillCard';
import Typewriter from '../components/Typewriter';

export default function Home({ setActiveTab, setSelectArticleId, lang }) {
  const t = translations[lang];
  const featuredProjects = projectsData.filter(p => p.featured);
  const recentArticles = articlesData.slice(0, 2);

  const typewriterWords = [
    "FastAPI Microservices",
    "Scalable Backend Systems",
    "High-Performance APIs",
    "Modern Web Applications"
  ];

  return (
    <div className="space-y-24 py-6 md:py-10">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 pt-4 pb-12">
        
        {/* Animated Floating Orbs */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-indigo-600/15 blur-[130px] pointer-events-none animate-float-orb"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/15 blur-[100px] pointer-events-none animate-float-orb" style={{ animationDelay: '2s' }}></div>

        {/* Hero Left Column: Intro */}
        <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-600 dark:text-indigo-300 shadow-sm animate-badge-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline with Typewriter Typing Animation */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] min-h-[120px]">
            Architecting <br />
            <Typewriter words={typewriterWords} speed={100} delay={2000} />
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Hi, I'm <strong className="text-slate-900 dark:text-white font-bold">Asadbek Xamidov</strong> — a Software Engineer focused on high-throughput backend services, clean API architecture, and sharing technical guides.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => setActiveTab('projects')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className="px-6 py-3.5 rounded-xl bg-slate-200/80 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 hover:bg-slate-300/60 dark:hover:bg-indigo-900/60 text-slate-800 dark:text-slate-200 font-bold text-sm hover:scale-105 transition-all cursor-pointer"
            >
              {t.hero.readBlog}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-4">
            <a 
              href="https://github.com/xamidovasadbekdev-arch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-indigo-950 hover:scale-110 transition-all"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/50 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-indigo-950 hover:scale-110 transition-all"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/50 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:bg-slate-200 dark:hover:bg-indigo-950 hover:scale-110 transition-all"
            >
              <Send className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-indigo-950 hover:scale-110 transition-all"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Hero Right Column: Animated Studio Visual */}
        <div className="w-full lg:w-[480px] shrink-0 animate-levitate">
          <TerminalVisual />
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-indigo-900/40 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-6 w-6 text-indigo-500 animate-bounce" />
              <span>{t.sections.featuredProjects}</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.sections.featuredProjectsSub}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('projects')}
            className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
          >
            <span>{t.sections.viewAllProjects}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelect={() => setActiveTab('projects')}
              t={t.projects}
            />
          ))}
        </div>
      </section>

      {/* TECHNICAL TOOLBOX / SKILLS */}
      <section className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-slate-100/60 dark:bg-[#090e1f]/70 backdrop-blur-xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none rounded-full animate-pulse"></div>

        <div className="space-y-2 text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {t.sections.skillsTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t.sections.skillsSub}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillsData.map((item, idx) => (
            <SkillCard 
              key={idx}
              category={item.category}
              iconName={item.icon}
              skills={item.skills}
            />
          ))}
        </div>
      </section>

      {/* RECENT ARTICLES SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-indigo-900/40 pb-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="h-6 w-6 text-purple-500" />
              <span>{t.sections.recentPosts}</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.sections.recentPostsSub}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('blog')}
            className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer uppercase tracking-wider"
          >
            <span>{t.sections.readAllPosts}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recentArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onSelectArticle={(id) => {
                setSelectArticleId(id);
                setActiveTab('blog');
              }}
              t={t.blog}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SNIPPET & CONTACT CTA */}
      <section className="grid gap-8 md:grid-cols-2 items-center py-6 border-t border-slate-200 dark:border-indigo-900/40 pt-12">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.sections.aboutSnippetTitle}
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t.about.bioP1}
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t.about.bioP2}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('about')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/60 text-sm font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Compass className="h-4 w-4 text-indigo-500" />
              <span>{t.sections.readMoreAbout}</span>
            </button>
          </div>
        </div>

        {/* Contact Banner Card with Levitation */}
        <div className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-indigo-950 via-[#0d122b] to-purple-950 border border-indigo-800/40 text-white space-y-6 shadow-xl animate-levitate">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-indigo-200">
            <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Open for Opportunities</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight leading-snug">
              Have a backend or fullstack project in mind?
            </h3>
            <p className="text-xs text-indigo-200/80 leading-relaxed">
              I am available for API architecture consultations, system performance tuning, and fullstack contract development.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-indigo-800/50">
            <div>
              <div className="text-xl font-black text-white">{t.hero.yearsExp}</div>
            </div>
            <div>
              <div className="text-xl font-black text-white">{t.hero.projectsCount}</div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('contact')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black text-sm transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 cursor-pointer"
          >
            {t.hero.getInTouch}
          </button>
        </div>
      </section>

    </div>
  );
}
