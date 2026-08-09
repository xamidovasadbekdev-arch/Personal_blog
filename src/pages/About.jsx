import React, { useState } from 'react';
import { User, Briefcase, GraduationCap, Download, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { translations } from '../data/portfolioData';
import { getStoredProfile, getStoredTimeline } from '../data/dataStore';

export default function About({ lang }) {
  const t = translations[lang].about;
  const profile = getStoredProfile();
  const timeline = getStoredTimeline();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-16 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <User className="h-3.5 w-3.5" />
          <span>Engineering Profile</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          About {profile.name}
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {profile.headline}
        </p>
      </div>

      {/* Bio Card */}
      <div className="p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-indigo-900/40 pb-3">
          {t.bioHeading}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {lang === 'en' ? profile.bioEN1 : profile.bioUZ1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {lang === 'en' ? profile.bioEN2 : profile.bioUZ2}
        </p>

        <div className="pt-2">
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
          >
            {downloaded ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Download className="h-4 w-4" />}
            <span>{downloaded ? "Resume Downloaded!" : t.downloadResume}</span>
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t.experienceTitle}
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-indigo-900/50 ml-4 pl-6 space-y-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-[#070b18] border-2 border-indigo-600 group-hover:scale-125 transition-transform"></div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono tracking-wider">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.role} <span className="text-slate-400 font-normal">at {item.company}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Philosophy Cards */}
      <div className="grid gap-6 sm:grid-cols-3 pt-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-slate-100/50 dark:bg-indigo-950/20 space-y-3">
          <Code2 className="h-6 w-6 text-indigo-500" />
          <h4 className="font-bold text-slate-900 dark:text-white">Clean Architecture</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Prioritizing self-documenting code, async REST APIs with FastAPI, and modular patterns.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-slate-100/50 dark:bg-indigo-950/20 space-y-3">
          <Sparkles className="h-6 w-6 text-purple-500" />
          <h4 className="font-bold text-slate-900 dark:text-white">AI & Data Analytics</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Building data pipelines with Pandas, machine learning models, and analytical dashboards.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-slate-100/50 dark:bg-indigo-950/20 space-y-3">
          <GraduationCap className="h-6 w-6 text-emerald-500" />
          <h4 className="font-bold text-slate-900 dark:text-white">WIUT Scholar</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Scholarship Awardee studying Business Information Systems at WIUT in Tashkent.
          </p>
        </div>
      </div>

    </div>
  );
}
