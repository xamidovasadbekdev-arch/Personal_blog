import React, { useState } from 'react';
import { Terminal as TerminalIcon, Code, Cpu, ShieldCheck, Copy, Check } from 'lucide-react';

export default function TerminalVisual() {
  const [activeTab, setActiveTab] = useState('shell'); // shell, json, log
  const [inputCmd, setInputCmd] = useState('');
  const [copied, setCopied] = useState(false);

  const [history, setHistory] = useState([
    { type: 'input', text: 'neofetch' },
    { type: 'output', text: 'OS: Arch Linux x86_64 | Kernel: 6.9.3-arch1-1' },
    { type: 'output', text: 'Uptime: 99.98% | Shell: zsh 5.9 | CPU: Ryzen 9 7950X' },
    { type: 'input', text: 'cat architecture.json' },
    { type: 'output', text: '{"stack": ["FastAPI", "React", "PostgreSQL", "Docker", "Go"], "status": "Available"}' }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cleanCmd = inputCmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let response = '';
    if (cleanCmd === 'help') {
      response = 'Commands: whoami, skills, projects, arch, contact, clear';
    } else if (cleanCmd === 'whoami') {
      response = 'Asadbek Xamidov — Software Engineer & Backend Architect';
    } else if (cleanCmd === 'skills') {
      response = 'Python, FastAPI, Go, TypeScript, React, Next.js, PostgreSQL, Redis, Docker, Kubernetes';
    } else if (cleanCmd === 'projects') {
      response = 'Personal Blog Engine, FastAPI Microservice, Analytics Portal, AI Prompt Suite';
    } else if (cleanCmd === 'arch') {
      response = 'Microservices architecture with FastAPI async handlers & Redis caching';
    } else if (cleanCmd === 'contact') {
      response = 'Email: asadbek.xamidov.dev@gmail.com | Telegram: @asadbek_dev';
    } else if (cleanCmd === 'clear') {
      setHistory([]);
      setInputCmd('');
      return;
    } else {
      response = `zsh: command not found: ${cleanCmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: inputCmd },
      { type: 'output', text: response }
    ]);
    setInputCmd('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`git clone https://github.com/xamidovasadbekdev-arch/Personal_blog.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden aspect-[4/3] rounded-3xl bg-[#090d1a] border border-indigo-500/30 shadow-2xl p-4 sm:p-5 flex flex-col justify-between group">
      
      {/* Ambient Radial Grids */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Terminal Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d1428] rounded-xl border border-indigo-900/50 relative z-10">
        
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs"></div>
        </div>

        {/* Console Tabs */}
        <div className="flex items-center gap-1 bg-[#070b15] p-1 rounded-lg border border-indigo-900/40 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('shell')}
            className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'shell' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            zsh ~ studio
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            stack.json
          </button>
        </div>

        <button
          onClick={handleCopy}
          title="Copy clone link"
          className="p-1 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>

      </div>

      {/* Terminal Content Views */}
      <div className="flex-1 p-3 sm:p-4 font-mono text-xs sm:text-sm text-indigo-100 overflow-y-auto relative z-10 my-2 rounded-xl bg-[#060a16]/90 border border-indigo-950/80">
        
        {activeTab === 'shell' ? (
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'input' ? (
                  <div className="flex items-center gap-2 text-indigo-300">
                    <span className="text-emerald-400 font-bold">asadbek@arch ➜</span>
                    <span className="text-purple-300 font-bold">{item.text}</span>
                  </div>
                ) : (
                  <div className="text-slate-300 pl-4 border-l-2 border-indigo-800/40 my-1 text-xs">
                    {item.text}
                  </div>
                )}
              </div>
            ))}

            <form onSubmit={handleCommand} className="flex items-center gap-2 text-indigo-300 pt-1">
              <span className="text-emerald-400 font-bold">asadbek@arch ➜</span>
              <input
                type="text"
                value={inputCmd}
                onChange={(e) => setInputCmd(e.target.value)}
                placeholder="Type 'help' or commands..."
                className="flex-1 bg-transparent border-none outline-none text-purple-200 placeholder-indigo-500/40 font-mono text-xs sm:text-sm"
              />
            </form>
          </div>
        ) : (
          <pre className="text-xs text-emerald-300 leading-relaxed overflow-x-auto">
{`{
  "engineer": "Asadbek Xamidov",
  "role": "Software & Backend Engineer",
  "location": "Tashkent, Uzbekistan",
  "specialties": [
    "FastAPI & Microservices Architecture",
    "High-throughput REST & GraphQL APIs",
    "PostgreSQL Async Pooling & Redis Caching",
    "React & Modern Frontend Performance"
  ],
  "availability": "Freelance / Full-Time"
}`}
          </pre>
        )}

      </div>

      {/* Footer Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-indigo-400/70 font-mono relative z-10 px-1">
        <span className="flex items-center gap-1">
          <Cpu className="h-3 w-3 text-indigo-400" /> Arch Linux Studio v3.2
        </span>
        <span className="text-emerald-400 flex items-center gap-1 font-bold">
          <ShieldCheck className="h-3.5 w-3.5 inline" /> 99.9% Uptime
        </span>
      </div>

    </div>
  );
}
