import React, { useState } from 'react';
import { Mail, Send, MapPin, CheckCircle2, MessageSquare, Clock, Sparkles } from 'lucide-react';
import { translations } from '../data/portfolioData';

export default function Contact({ lang }) {
  const t = translations[lang].contact;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    try {
      // Direct mailto fallback or EmailJS payload trigger
      const mailtoUrl = `mailto:xamidovasadbek.dev@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      
      setTimeout(() => {
        window.open(mailtoUrl, '_blank');
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <div className="space-y-12 py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5 items-start">
        
        {/* Contact Info Side Cards */}
        <div className="md:col-span-2 space-y-4">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/40 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white border-b border-slate-200 dark:border-indigo-900/40 pb-3">
              {t.directContact}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Email Direct</div>
                  <a href="mailto:xamidovasadbek.dev@gmail.com" className="text-slate-500 hover:text-indigo-500 transition-colors font-mono text-xs">
                    xamidovasadbek.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-500">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Telegram Chat</div>
                  <a href="https://t.me/homiidov" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-500 transition-colors font-mono text-xs">
                    @homiidov
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Location</div>
                  <span className="text-slate-500 text-xs">Tashkent, Uzbekistan (UTC+5)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 to-purple-950 text-white space-y-3 border border-indigo-800/40">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-200">
              <Clock className="h-4 w-4" />
              <span>Direct Response SLA</span>
            </div>
            <p className="text-xs text-indigo-100/80 leading-relaxed">
              Emails go directly to <strong className="text-white font-mono">xamidovasadbek.dev@gmail.com</strong>. Telegram messages (@homiidov) receive the fastest response.
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/40 shadow-xs relative">
          
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                {t.success}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-indigo-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.name} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.email} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.subject}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.subjectPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.message} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 transition-colors resize-none font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer"
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
