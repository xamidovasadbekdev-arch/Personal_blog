import React, { useState } from 'react';
import { Mail, Send, MapPin, CheckCircle2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { translations } from '../data/portfolioData';
import { getStoredProfile } from '../data/dataStore';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';

export default function Contact({ lang }) {
  const t = translations[lang].contact;
  const profile = getStoredProfile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const emailSubject = encodeURIComponent(formData.subject || `Portfolio Message from ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // 1. Direct Mailto dispatch (Opens email app pre-filled to xamidovasadbek.dev@gmail.com)
    window.location.href = `mailto:xamidovasadbek.dev@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // 2. Background HTTP POST dispatch via Web3Forms API to deliver email straight to inbox
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "4a88f7be-7696-4a4b-a7e8-e501d5dd578e", // Web3Forms direct key
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          to_email: "xamidovasadbek.dev@gmail.com"
        })
      });

      const res = await response.json();
      if (res.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-5 items-start">
        
        {/* Contact Form (3 cols) */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-white dark:bg-indigo-950/30 shadow-xl space-y-6">
          
          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>{t.success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t.email} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.subject}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t.subjectPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm font-semibold outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.message} *
              </label>
              <textarea
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.messagePlaceholder}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-indigo-950/60 border border-slate-300 dark:border-indigo-900/60 text-xs sm:text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? t.sending : t.send}</span>
            </button>

          </form>

        </div>

        {/* Direct Contact Info Sidebar (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-indigo-900/40 bg-slate-100/60 dark:bg-indigo-950/20 space-y-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t.directContact}
            </h3>

            <div className="space-y-4">
              <a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/40 hover:border-indigo-500 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Direct Email</div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">{profile.email}</div>
                </div>
              </a>

              <a 
                href={profile.telegramUrl || `https://t.me/${profile.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/40 hover:border-indigo-500 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-500">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Telegram</div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">{profile.telegram}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/40">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">Tashkent, Uzbekistan</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              >
                <GithubIcon className="h-5 w-5" />
              </a>

              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-indigo-950/60 border border-slate-200 dark:border-indigo-900/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
