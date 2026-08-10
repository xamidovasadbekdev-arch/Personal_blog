import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [dataRefreshKey, setDataRefreshKey] = useState(0);

  // Toggle dark/light theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleDataUpdated = () => {
    setDataRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            key={dataRefreshKey}
            setActiveTab={setActiveTab} 
            setSelectArticleId={(id) => {
              setSelectedArticleId(id);
              setActiveTab('blog');
            }} 
            lang={lang} 
          />
        );
      case 'projects':
        return <Projects key={dataRefreshKey} lang={lang} />;
      case 'blog':
        return (
          <Blog 
            key={dataRefreshKey}
            selectedArticleId={selectedArticleId} 
            setSelectArticleId={setSelectedArticleId} 
            lang={lang} 
          />
        );
      case 'about':
        return <About key={dataRefreshKey} lang={lang} />;
      case 'contact':
        return <Contact key={dataRefreshKey} lang={lang} />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminPanel 
            key={dataRefreshKey}
            onLogout={() => setIsAdminAuthenticated(false)}
            onDataUpdated={handleDataUpdated}
          />
        ) : (
          <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
        );
      default:
        return <Home key={dataRefreshKey} setActiveTab={setActiveTab} setSelectArticleId={setSelectedArticleId} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070913] text-slate-900 dark:text-slate-100 selection:bg-indigo-600 selection:text-white transition-colors duration-300 relative">
      
      {/* Background Interactive Particle Canvas */}
      <BackgroundCanvas />

      {/* Sticky Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'blog') setSelectedArticleId(null);
        }} 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} lang={lang} />
    </div>
  );
}
