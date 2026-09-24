import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { translations } from '../data/portfolioData';

export function LogoMark({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M16 4a12 12 0 0 1 0 24z" fill="var(--accent)" />
    </svg>
  );
}

export default function Navbar({ lang, setLang, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const t = translations[lang].nav;

  useEffect(() => setOpen(false), [pathname]);

  const navItems = [
    { to: '/projects', label: t.projects },
    { to: '/blog', label: t.blog },
    { to: '/about', label: t.about },
  ];

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-ink' : 'text-body hover:text-ink'}`;

  const langToggle = (
    <div className="flex items-center font-mono text-xs" role="group" aria-label="Language">
      {['en', 'uz'].map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <span className="text-muted px-1">/</span>}
          <button
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`uppercase cursor-pointer transition-colors ${lang === code ? 'text-ink' : 'text-muted hover:text-body'}`}
          >
            {code}
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-1.5 rounded-full text-body hover:text-ink transition-colors cursor-pointer"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 text-ink shrink-0">
          <LogoMark />
          <span className="font-semibold tracking-tight">xamidov.dev</span>
          <span className="hidden sm:inline font-mono text-xs text-muted">/ backend · ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {langToggle}
          {themeToggle}
          <Link to="/contact" className="btn btn-ghost !py-2 !px-4 text-sm">
            {t.letsTalk} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          {themeToggle}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-1.5 text-ink cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-bg px-4 pb-6 pt-2">
          <div className="flex flex-col">
            {[{ to: '/', label: t.home }, ...navItems, { to: '/contact', label: t.contact }].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `py-3 border-b border-line text-base ${isActive ? 'text-ink' : 'text-body'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-4">{langToggle}</div>
        </div>
      )}
    </header>
  );
}
