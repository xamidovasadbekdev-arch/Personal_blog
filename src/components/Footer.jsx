import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { LogoMark } from './Navbar';
import { profile, pick } from '../data/portfolioData';

export function SocialLinks({ className = '' }) {
  const links = [
    { href: profile.github, label: 'GitHub', Icon: GithubIcon },
    { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: profile.telegramUrl, label: 'Telegram', Icon: Send },
    { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
  ];
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-full text-muted hover:text-ink transition-colors"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export default function Footer({ lang = 'en' }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <Link to="/" className="flex items-center gap-2 text-ink">
            <LogoMark className="h-4 w-4" />
            <span className="font-medium">{profile.name}</span>
          </Link>
          <span className="font-mono text-xs text-muted">© {new Date().getFullYear()} · {pick(profile.location, lang)}</span>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
