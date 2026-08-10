import React, { useState } from 'react';
import { Terminal, Check, Copy, Flame, Sparkles, Cpu, Layers } from 'lucide-react';
import { getStoredProfile } from '../data/dataStore';

export default function TerminalVisual({ lang = 'en' }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('shell');
  const profile = getStoredProfile();

  const handleCopy = () => {
    const text = `curl -s https://xamidovasadbek.dev/api/profile`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUzbek = lang === 'uz';

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-300 dark:border-indigo-900/60 bg-slate-900 text-slate-100 shadow-2xl font-mono text-xs sm:text-sm">
      
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="ml-2 text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            asadbek@arch:~ (zsh)
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('shell')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
              activeTab === 'shell' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Shell
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
              activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            JSON Spec
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-6 space-y-4 bg-[#070a14] min-h-[300px]">
        {activeTab === 'shell' ? (
          <div className="space-y-3">
            
            {/* Command 1 */}
            <div className="flex items-center gap-2 text-indigo-400">
              <span className="text-emerald-400 font-bold">asadbek@arch</span>
              <span className="text-slate-400">➜</span>
              <span className="text-amber-300 font-bold">whoami</span>
            </div>
            
            <div className="pl-4 text-slate-300 space-y-1">
              <p className="font-bold text-white text-sm sm:text-base">
                {profile.name}
              </p>
              <p className="text-indigo-300 font-semibold">
                {profile.headline}
              </p>
              <p className="text-slate-400 text-xs">
                {isUzbek 
                  ? "WIUT Granti Sohibi | Mittivoy Data Analitigi | FLyrank ML Stajyori" 
                  : "WIUT Scholar | Mittivoy Data Analyst | FLyrank ML Intern"}
              </p>
            </div>

            {/* Command 2 */}
            <div className="flex items-center gap-2 text-indigo-400 pt-2 border-t border-slate-900">
              <span className="text-emerald-400 font-bold">asadbek@arch</span>
              <span className="text-slate-400">➜</span>
              <span className="text-amber-300 font-bold">neofetch --stack</span>
            </div>

            <div className="pl-4 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>OS:</span>
                <span className="text-emerald-400 font-bold">Arch Linux x86_64</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isUzbek ? "Asosiy Tillar:" : "Core Language:"}</span>
                <span className="text-purple-400 font-bold">Python 3.12, SQL, JS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isUzbek ? "Freyomvork:" : "Framework:"}</span>
                <span className="text-sky-400 font-bold">FastAPI, Scikit-Learn, React</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isUzbek ? "Ma'lumotlar Bazasi:" : "Database & Tools:"}</span>
                <span className="text-amber-400 font-bold">PostgreSQL, Redis, Docker</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isUzbek ? "Status:" : "Status:"}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isUzbek ? "Takliflar uchun ochiq" : "Available for Hire"}
                </span>
              </div>
            </div>

            {/* Copy Command */}
            <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 truncate">
                $ curl -s https://xamidovasadbek.dev/api
              </span>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? (isUzbek ? "Nusxalandi!" : "Copied!") : (isUzbek ? "Nusxalash" : "Copy API")}</span>
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-2 text-xs font-mono text-indigo-200 leading-relaxed overflow-x-auto">
            <pre>{`{
  "developer": "${profile.name}",
  "title": "${profile.headline}",
  "scholarship": "WIUT BIS Awardee",
  "positions": [
    "Data Analyst at Mittivoy",
    "ML Engineering Intern at FLyrank",
    "Uzcard Data Science Program"
  ],
  "contacts": {
    "email": "${profile.email}",
    "telegram": "${profile.telegram}",
    "github": "${profile.github}"
  }
}`}</pre>
          </div>
        )}
      </div>

    </div>
  );
}
