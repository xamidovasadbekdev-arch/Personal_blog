import { translations, skillsData, experienceTimeline, projectsData, articlesData } from './portfolioData';

const KEYS = {
  PROFILE: 'admin_profile_data',
  PROJECTS: 'admin_projects_data',
  ARTICLES: 'admin_articles_data',
  TIMELINE: 'admin_timeline_data',
  CREDS: 'admin_credentials_data',
};

// Default Credentials
export const DEFAULT_CREDS = {
  username: 'XamidovAsadbek',
  password: 'Asadbek3993',
};

// Initial Profile Settings
export const DEFAULT_PROFILE = {
  name: 'Xamidov Asadbek',
  headline: 'Backend Developer & AI/ML Engineer, Data Scientist',
  subtitleEN: 'Data Analyst at Mittivoy, Machine Learning Engineering Intern at FLyrank, & WIUT Scholarship Awardee. Specializing in Python, FastAPI, Machine Learning, and Data Science.',
  subtitleUZ: "Mittivoy kompaniyasida Data Analitik, FLyrank kompaniyasida ML Muhandis Stajyor va WIUT granti sohibi. Python, FastAPI, AI va Data Science bo'yicha mutaxassis.",
  bioEN1: 'I am Xamidov Asadbek, a Business Information System Scholarship Awardee at WIUT (Westminster International University in Tashkent). I currently work as a Data Analyst at Mittivoy company and a Machine Learning Engineering Intern at FLyrank.',
  bioEN2: 'My expertise spans backend software engineering with FastAPI & Python, data analysis, and machine learning models in the Uzcard Data Science program. I love dissecting complex data problems and building scalable software solutions.',
  bioUZ1: "Men Xamidov Asadbek, WIUT (Westminster International University in Tashkent) universitetining Business Information System yo'nalishi granti sohibiman. Hozirda Mittivoy kompaniyasida Data Analyst va FLyrank kompaniyasida Machine Learning Engineering Intern (ML Muhandis Stajyor) sifatida faoliyat yuritaman.",
  bioUZ2: "Uzcard Data Science dasturida machine learning va sun'iy intellect bo'yicha bilimlarimni oshirib kelmoqdaman. Backend (FastAPI, Python) hamda ma'lumotlar tahlili loyihalarini yaratishni yaxshi ko'raman.",
  email: 'xamidovasadbek.dev@gmail.com',
  telegram: '@homiidov',
  telegramUrl: 'https://t.me/homiidov',
  linkedin: 'https://www.linkedin.com/in/asadbekxamidov/',
  github: 'https://github.com/xamidovasadbekdev-arch',
  yearsExp: '2+ Years Exp.',
  projectsCount: '15+ Projects',
};

export const getStoredCredentials = () => {
  try {
    const data = localStorage.getItem(KEYS.CREDS);
    return data ? JSON.parse(data) : DEFAULT_CREDS;
  } catch (e) {
    return DEFAULT_CREDS;
  }
};

export const saveCredentials = (creds) => {
  localStorage.setItem(KEYS.CREDS, JSON.stringify(creds));
};

export const getStoredProfile = () => {
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (profile) => {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
};

export const getStoredTimeline = () => {
  try {
    const data = localStorage.getItem(KEYS.TIMELINE);
    return data ? JSON.parse(data) : experienceTimeline;
  } catch (e) {
    return experienceTimeline;
  }
};

export const saveTimeline = (timeline) => {
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify(timeline));
};

export const getStoredProjects = () => {
  try {
    const data = localStorage.getItem(KEYS.PROJECTS);
    return data ? JSON.parse(data) : projectsData;
  } catch (e) {
    return projectsData;
  }
};

export const saveProjects = (projects) => {
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
};

export const getStoredArticles = () => {
  try {
    const data = localStorage.getItem(KEYS.ARTICLES);
    return data ? JSON.parse(data) : articlesData;
  } catch (e) {
    return articlesData;
  }
};

export const saveArticles = (articles) => {
  localStorage.setItem(KEYS.ARTICLES, JSON.stringify(articles));
};
