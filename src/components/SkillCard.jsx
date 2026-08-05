import React from 'react';
import { Terminal, Cpu, Layers } from 'lucide-react';

const iconMap = {
  Terminal: Terminal,
  Cpu: Cpu,
  Layers: Layers,
};

export default function SkillCard({ category, iconName, skills }) {
  const IconComponent = iconMap[iconName] || Terminal;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#070b18] p-6 border border-slate-200 dark:border-indigo-900/40 shadow-xs hover:shadow-xl hover:border-indigo-500/50 transition-all duration-300">
      {/* Subtle Glow Overlay */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform pointer-events-none"></div>

      <div className="flex items-center gap-2.5 font-extrabold text-base text-slate-900 dark:text-white mb-4">
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
          <IconComponent className="h-5 w-5" />
        </div>
        <span>{category}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span 
            key={idx}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-indigo-950/50 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors cursor-default border border-slate-200 dark:border-indigo-900/40"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
