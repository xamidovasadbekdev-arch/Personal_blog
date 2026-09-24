import React from 'react';
import { profile } from '../data/portfolioData';

// Always dark, like a real terminal, in both site themes.
export default function TerminalVisual({ lang = 'en' }) {
  const uz = lang === 'uz';

  const stack = [
    [uz ? 'tillar' : 'languages', 'Python · SQL · JavaScript'],
    [uz ? 'backend' : 'backend', 'FastAPI · PostgreSQL · Redis'],
    ['ml', 'scikit-learn · pandas · NumPy'],
    [uz ? 'asboblar' : 'tools', 'Docker · Git · Linux'],
  ];

  const Prompt = ({ cmd }) => (
    <div>
      <span className="text-[#e4ac48]">asadbek</span>
      <span className="text-[#8b8272]">@tashkent ~ $ </span>
      <span className="text-[#f2ebdf]">{cmd}</span>
    </div>
  );

  return (
    <div
      className="w-full rounded-2xl border border-[rgba(240,228,206,0.12)] bg-[#1b1814] font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/20 overflow-hidden"
      role="img"
      aria-label={`${profile.name}: ${profile.headline}`}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgba(240,228,206,0.08)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a342c]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a342c]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a342c]" />
        <span className="ml-3 text-[11px] text-[#8b8272]">zsh</span>
      </div>

      <div className="p-5 sm:p-6 space-y-4 text-[#c4baa9]">
        <div className="space-y-1.5">
          <Prompt cmd="whoami" />
          <div className="pl-4 space-y-0.5">
            <div className="text-[#f2ebdf]">{profile.name}</div>
            <div>{profile.headline}</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Prompt cmd="cat stack.txt" />
          <dl className="pl-4 space-y-0.5">
            {stack.map(([key, value]) => (
              <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-2">
                <dt className="text-[#8b8272]">{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-1.5">
          <Prompt cmd="status" />
          <div className="pl-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fb77e]" />
            <span>{uz ? 'takliflar uchun ochiq' : 'open to opportunities'}</span>
          </div>
        </div>

        <div>
          <span className="text-[#e4ac48]">asadbek</span>
          <span className="text-[#8b8272]">@tashkent ~ $ </span>
          <span className="inline-block w-2 h-4 align-middle bg-[#f2ebdf] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
