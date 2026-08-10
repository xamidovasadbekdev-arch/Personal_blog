import React from 'react';
import { Send, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { getStoredProfile } from '../data/dataStore';

export default function Footer({ setActiveTab, lang = 'en' }) {
  const profile = getStoredProfile();
  const isUzbek = lang === 'uz';

  return (
    <footer className="mt-20 relative z-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 dark:via-indigo-500/40 to-transparent"></div>
      <div className="bg-white dark:bg-[#070913] py-10 border-t border-slate-200 dark:border-indigo-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <button 
              onClick={() => setActiveTab('home')}
              className="text-base font-black tracking-tight text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {profile.name}
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              © {new Date().getFullYear()} · {isUzbek ? "Barcha huquqlar himoyalangan." : "All rights reserved."} {isUzbek ? "React & Tailwind bilan yaratilgan" : "Crafted with"} <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="p-2.5 rounded-xl border border-slate-200 dark:border-indigo-900/50 text-slate-500 dark:text-slate-400 transition-all duration-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-950 hover:scale-110"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a 
              href={profile.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="p-2.5 rounded-xl border border-slate-200 dark:border-indigo-900/50 text-slate-500 dark:text-slate-400 transition-all duration-200 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-indigo-950 hover:scale-110"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a 
              href={profile.telegramUrl || `https://t.me/${profile.telegram.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Telegram" 
              className="p-2.5 rounded-xl border border-slate-200 dark:border-indigo-900/50 text-slate-500 dark:text-slate-400 transition-all duration-200 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-indigo-950 hover:scale-110"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
