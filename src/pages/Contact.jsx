import React, { useState } from 'react';
import { Mail, Send, MapPin, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';
import { translations } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';

export default function Contact({ lang }) {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5 items-start">
        
        {/* Contact Info Side Cards (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {t.directContact}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Email</div>
                  <a href="mailto:asadbek.xamidov.dev@gmail.com" className="text-neutral-500 hover:text-blue-500 transition-colors">
                    asadbek.xamidov.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/70 text-sky-500">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Telegram</div>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-sky-500 transition-colors">
                    @asadbek_dev
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Location</div>
                  <span className="text-neutral-500">Tashkent, Uzbekistan (UTC+5)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-950 text-white space-y-3 border border-blue-800/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <Clock className="h-4 w-4" />
              <span>Response Time</span>
            </div>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              I usually reply to all inquiries within 24 hours. For urgent project discussions, Telegram is the fastest method.
            </p>
          </div>

        </div>

        {/* Contact Form (3 cols) */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs relative">
          
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Message Sent!</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto">
                {t.success}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {t.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {t.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {t.subject}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.subjectPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {t.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{status === 'submitting' ? t.sending : t.send}</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}
