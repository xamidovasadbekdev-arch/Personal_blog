import { translations, skillsData, experienceTimeline, projectsData, articlesData, blogTaxonomy } from './portfolioData';

const KEYS = {
  PROFILE: 'admin_profile_data',
  PROJECTS: 'admin_projects_data',
  ARTICLES: 'admin_articles_data',
  TIMELINE: 'admin_timeline_data',
  CREDS: 'admin_credentials_data',
  CATEGORIES: 'admin_categories_data',
};

// Default Credentials
export const DEFAULT_CREDS = {
  username: 'XamidovAsadbek',
  password: 'Asadbek3993',
};

// Default Profile Settings
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

export const DEFAULT_CATEGORIES = [
  {
    id: 'ml',
    title: 'Machine Learning & AI',
    description: 'Supervised Learning algorithms, Unsupervised clustering models, Neural Networks, and NLP.',
    subcategories: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning', 'NLP & LLMs'],
    icon: 'Cpu',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400'
  },
  {
    id: 'backend',
    title: 'Backend & Architecture',
    description: 'FastAPI microservices, PostgreSQL async sessions, REST API design, Redis caching, and Docker.',
    subcategories: ['FastAPI & Microservices', 'Databases & SQL', 'Distributed Systems', 'Caching & Performance'],
    icon: 'Layers',
    color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400'
  },
  {
    id: 'datascience',
    title: 'Data Science & Analytics',
    description: 'Exploratory data analysis, Pandas & NumPy data pipelines, statistical modeling, and insights.',
    subcategories: ['Exploratory Data Analysis', 'Pandas & Pipelines', 'Data Visualization'],
    icon: 'BarChart3',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'personal',
    title: 'Personal & Life',
    description: 'Personal achievements, football tournament gold medals, WIUT university life, and career milestones.',
    subcategories: ['Achievements & Medals', 'University & WIUT', 'Career Journey', 'Sports & Football'],
    icon: 'Heart',
    color: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400'
  }
];

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

export const getStoredCategories = () => {
  try {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
};

export const saveCategories = (categories) => {
  localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
};
