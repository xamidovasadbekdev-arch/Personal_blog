import React from 'react';
import { Send, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 relative">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 dark:via-blue-500/40 to-transparent"></div>
      <div className="bg-white dark:bg-neutral-950 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <button 
              onClick={() => setActiveTab('home')}
              className="text-base font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Asadbek Xamidov
            </button>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              © {new Date().getFullYear()} · All rights reserved. Crafted with <Heart className="h-3 w-3 text-red-500 fill-red-500 inline" /> & React.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/xamidovasadbekdev-arch" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 transition-all duration-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-110 hover:-translate-y-0.5"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 transition-all duration-200 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-110 hover:-translate-y-0.5"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Telegram" 
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 transition-all duration-200 hover:text-sky-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-110 hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter" 
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 transition-all duration-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-110 hover:-translate-y-0.5"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
