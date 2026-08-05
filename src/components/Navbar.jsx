import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Terminal, Code2 } from 'lucide-react';
import { translations } from '../data/portfolioData';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'projects', label: t.projects },
    { id: 'blog', label: t.blog },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-slate-50/80 dark:bg-[#070913]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-indigo-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Unique AX Monogram Logo & Name */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Glow Shield */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-xl blur-sm opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
              
              {/* Inner Monogram Badge */}
              <div className="relative z-10 w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center border border-indigo-400/40 shadow-md font-mono font-black text-sm tracking-tighter group-hover:rotate-3 transition-transform">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                  AX
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                Asadbek Xamidov
              </span>
              <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-mono tracking-widest uppercase -mt-1 hidden sm:block font-bold">
                Backend Architect
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-indigo-950/40 border border-slate-300/50 dark:border-indigo-900/40 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-indigo-900/30'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-[1px] bg-slate-300 dark:bg-indigo-900/50 mx-2"></div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-slate-300 dark:border-indigo-900/50 rounded-xl p-0.5 bg-slate-200/60 dark:bg-indigo-950/40">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('uz')}
                className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all cursor-pointer ${
                  lang === 'uz'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                UZ
              </button>
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-slate-300 dark:border-indigo-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-700" />}
            </button>

            {/* Hire Me CTA Button */}
            <button
              onClick={() => setActiveTab('contact')}
              className="ml-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 rounded-xl transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Let's Talk</span>
            </button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-800"
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-200 dark:bg-indigo-950 text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-200 dark:bg-indigo-950 text-slate-700 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-indigo-900/50 bg-slate-50/95 dark:bg-[#070913]/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-indigo-900/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
