import React, { useState } from 'react';
import { ShieldAlert, Lock, User, KeyRound, ArrowRight } from 'lucide-react';
import { getStoredCredentials } from '../data/dataStore';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedCreds = getStoredCredentials();

    if (username.trim() === storedCreds.username && password.trim() === storedCreds.password) {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/50 bg-white dark:bg-[#070b18]/90 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow Orb Header */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-indigo-600/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Lock Icon */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shadow-inner">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Admin Studio Gateway
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Please enter your management credentials to access the portfolio CMS.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-indigo-500" />
              <span>Username</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. XamidovAsadbek"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-indigo-500" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Unlock Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>

        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-indigo-900/30">
          <span className="text-[11px] text-slate-400 font-mono">
            Secured Session Gateway v3.0
          </span>
        </div>

      </div>
    </div>
  );
}
