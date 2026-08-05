import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Award, Download, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { translations, experienceTimeline, skillsData } from '../data/portfolioData';

export default function About({ lang }) {
  const t = translations[lang].about;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-16 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/50 dark:border-blue-800/50 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <User className="h-3.5 w-3.5" />
          <span>Engineering Profile</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {t.title}
        </h1>
        
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Bio Card */}
      <div className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
          {t.bioHeading}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t.bioP1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          {t.bioP2}
        </p>

        <div className="pt-2">
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            {downloaded ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Download className="h-4 w-4" />}
            <span>{downloaded ? "Resume Downloaded!" : t.downloadResume}</span>
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {t.experienceTitle}
          </h2>
        </div>

        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 pl-6 space-y-10">
          {experienceTimeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-600 group-hover:scale-125 transition-transform"></div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono tracking-wider">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {item.role} <span className="text-neutral-400 font-normal">at {item.company}</span>
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy Cards */}
      <div className="grid gap-6 sm:grid-cols-3 pt-6">
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3">
          <Code2 className="h-6 w-6 text-blue-500" />
          <h4 className="font-bold text-neutral-900 dark:text-white">Clean Code</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Prioritizing self-documenting code, strict type definitions, and modular design patterns.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3">
          <Sparkles className="h-6 w-6 text-cyan-500" />
          <h4 className="font-bold text-neutral-900 dark:text-white">Async Performance</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Architecting non-blocking APIs with FastAPI and Redis caching for millisecond response speeds.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3">
          <GraduationCap className="h-6 w-6 text-purple-500" />
          <h4 className="font-bold text-neutral-900 dark:text-white">Continuous Growth</h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Writing technical articles and constantly expanding knowledge across the fullstack ecosystem.
          </p>
        </div>
      </div>

    </div>
  );
}
