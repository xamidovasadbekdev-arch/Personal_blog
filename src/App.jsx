import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const readPref = (key, fallback, allowed) => {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

const writePref = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the preference just won't persist.
  }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [lang, setLang] = useState(() => readPref('lang', 'en', ['en', 'uz']));
  const [theme, setTheme] = useState(() => readPref('theme', 'dark', ['dark', 'light']));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    writePref('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    writePref('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      <div className="page-glow" aria-hidden="true" />

      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/projects" element={<Projects lang={lang} />} />
          <Route path="/blog" element={<Blog lang={lang} />} />
          <Route path="/blog/:slug" element={<BlogPost lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
