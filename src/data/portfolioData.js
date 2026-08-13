export const blogTaxonomy = {
  ml: {
    label: {
      en: "Machine Learning & AI",
      uz: "Machine Learning va Sun'iy Intellekt"
    },
    description: {
      en: "Supervised Learning algorithms, Unsupervised clustering models, Neural Networks, and NLP.",
      uz: "Supervised Learning algoritmlari, Unsupervised klasterlash modellari, Neyron tarmoqlari va NLP."
    },
    subcategories: {
      en: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "NLP & LLMs"],
      uz: ["Supervised Learning", "Unsupervised Learning", "Chuqur O'rgatish", "NLP va LLMlar"]
    }
  },
  backend: {
    label: {
      en: "Backend & Architecture",
      uz: "Backend va Arxitektura"
    },
    description: {
      en: "FastAPI microservices, PostgreSQL async sessions, REST API design, Redis caching, and Docker.",
      uz: "FastAPI mikroxizmatlari, PostgreSQL asinxron seanslar, REST API loyihalash, Redis kesh va Docker."
    },
    subcategories: {
      en: ["FastAPI & Microservices", "Databases & SQL", "Distributed Systems", "Caching & Performance"],
      uz: ["FastAPI va Mikroxizmatlar", "Ma'lumotlar Bazasi va SQL", "Taqsimlangan Tizimlar", "Kesh va Unumdorlik"]
    }
  },
  datascience: {
    label: {
      en: "Data Science & Analytics",
      uz: "Data Science va Tahlil"
    },
    description: {
      en: "Exploratory data analysis, Pandas & NumPy data pipelines, statistical modeling, and insights.",
      uz: "Ma'lumotlarni tahlil qilish, Pandas va NumPy quvurlari, statistik modellashtirish va xulosalar."
    },
    subcategories: {
      en: ["Exploratory Data Analysis", "Pandas & Pipelines", "Data Visualization"],
      uz: ["Dastlabki Ma'lumot Tahlili", "Pandas va Pipeline'lar", "Ma'lumotlar Vizualizatsiyasi"]
    }
  },
  personal: {
    label: {
      en: "Personal & Life",
      uz: "Shaxsiy va Hayot"
    },
    description: {
      en: "Personal achievements, football tournament gold medals, WIUT university life, and career milestones.",
      uz: "Shaxsiy yutuqlar, futbol turniridagi oltin medallar, WIUT universiteti hayoti va karyera bosqichlari."
    },
    subcategories: {
      en: ["Achievements & Medals", "University & WIUT", "Career Journey", "Sports & Football"],
      uz: ["Yutuqlar va Medallar", "Universitet va WIUT", "Karyera Yo'li", "Sport va Futbol"]
    }
  }
};

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      admin: "Admin Studio",
      available: "👋 Available for Opportunities",
      letsTalk: "Let's Talk",
    },
    hero: {
      badge: "Available for Opportunities",
      title: "Hi, I'm Asadbek Xamidov",
      headline: "Backend Developer, AI/ML Engineer & Data Scientist",
      subtitle: "Data Analyst at Mittivoy, Machine Learning Engineering Intern at FLyrank, & WIUT Scholarship Awardee. Specializing in Python, FastAPI, Machine Learning, and Data Science.",
      viewProjects: "View Projects",
      readBlog: "Read Articles",
      getInTouch: "Get In Touch",
      yearsExp: "2+ Years Exp.",
      projectsCount: "15+ Projects",
      dedication: "100% Dedicated",
      typewriter: [
        "FastAPI Microservices",
        "Scalable Backend Systems",
        "Machine Learning Models",
        "Data Analytics Pipelines"
      ]
    },
    sections: {
      featuredProjects: "Featured Projects",
      featuredProjectsSub: "A hand-picked selection of things I've built recently.",
      viewAllProjects: "View All Projects",
      skillsTitle: "Technical Toolbox",
      skillsSub: "Technologies, frameworks, machine learning models, and data pipelines I work with.",
      recentPosts: "Recent Tech & Personal Articles",
      recentPostsSub: "Machine Learning breakdowns, backend architecture guides, and personal milestones.",
      readAllPosts: "Read All Articles",
      aboutSnippetTitle: "About Me",
      readMoreAbout: "Read Full Bio",
      contactTitle: "Let's Build Something Great Together",
      contactSub: "Have an exciting project idea, job opportunity, or AI/data query? Feel free to reach out anytime.",
      bannerTitle: "Have a backend or AI project in mind?",
      bannerSub: "I am available for API architecture consultations, system performance tuning, and fullstack contract development.",
      openBadge: "Open for Opportunities",
    },
    projects: {
      title: "Portfolio Projects",
      sub: "Explore my open-source applications, API architecture microservices, data science pipelines, and machine learning models.",
      all: "All Projects",
      fullstack: "Fullstack",
      backend: "Backend & API",
      frontend: "Frontend",
      ai: "AI / Data Science",
      searchPlaceholder: "Search projects by title or keyword...",
      viewCode: "Source Code",
      liveDemo: "Live Demo",
      details: "View Details",
      noProjects: "No projects match your filter.",
      technologiesUsed: "Technologies Used",
    },
    blog: {
      searchPlaceholder: "Search articles by title, tag, category, or subcategory...",
      allCategories: "All Categories",
      allSubcategories: "All Subcategories",
      readTime: "min read",
      publishedOn: "Published on",
      author: "Written by",
      tableOfContents: "Table of Contents",
      share: "Share Article",
      copied: "Link copied to clipboard!",
      relatedPosts: "Related Articles",
      backToBlog: "← Back to Categories",
      allFolders: "All Category Folders",
      articlesFound: "Articles Found",
      exploreCategory: "Explore Category Articles",
      noArticles: "No articles found in this category section.",
      clearFilters: "Clear all filters",
      kbTitle: "Knowledge Base & Article Categories",
      kbSub: "Select a category folder below to explore machine learning guides, backend architecture breakdowns, data science tutorials, and custom topics.",
    },
    about: {
      title: "About Xamidov Asadbek",
      subtitle: "Backend Developer, AI/ML Engineer & Data Scientist passionate about data pipelines, machine learning, and clean API design.",
      bioHeading: "Who I Am",
      bioP1: "I am Xamidov Asadbek, a Business Information System Scholarship Awardee at WIUT (Westminster International University in Tashkent). I currently work as a Data Analyst at Mittivoy company and a Machine Learning Engineering Intern at FLyrank.",
      bioP2: "My expertise spans backend software engineering with FastAPI & Python, data analysis, and machine learning models in the Uzcard Data Science program. I love dissecting complex data problems and building scalable software solutions.",
      experienceTitle: "Education & Career Timeline",
      skillsHeading: "Technical Proficiency",
      downloadResume: "Download Resume (PDF)",
      downloadingResume: "Downloading Resume File...",
      profileBadge: "Engineering Profile",
    },
    philosophy: {
      cleanArchTitle: "Clean Architecture",
      cleanArchSub: "Prioritizing self-documenting code, async REST APIs with FastAPI, and modular patterns.",
      aiDataTitle: "AI & Data Analytics",
      aiDataSub: "Building data pipelines with Pandas, machine learning models, and analytical dashboards.",
      wiutTitle: "WIUT Scholar",
      wiutSub: "Scholarship Awardee studying Business Information Systems at WIUT in Tashkent.",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Send a message using the form below or connect via Telegram / LinkedIn.",
      name: "Your Name",
      namePlaceholder: "John Doe",
      email: "Your Email",
      emailPlaceholder: "john@example.com",
      subject: "Subject",
      subjectPlaceholder: "Project inquiry / AI & Data Collaboration",
      message: "Message",
      messagePlaceholder: "Tell me about your project or inquiry...",
      send: "Send Message",
      sending: "Sending Email...",
      success: "Thank you! Your message has been sent directly to Asadbek.",
      directContact: "Direct Contacts",
    },
    footer: {
      tagline: "Backend Developer, AI/ML Engineer & Data Scientist.",
      rights: "All Rights Reserved.",
      quickLinks: "Quick Navigation",
    },
    comments: {
      title: "Article Comments",
      yourName: "Your Name",
      writeComment: "Write a Comment",
      placeholder: "Share your thoughts, questions, or feedback on this post...",
      postBtn: "Post Comment",
      postedMsg: "Your comment has been posted!",
    }
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      projects: "Loyihalar",
      blog: "Maqolalar",
      about: "Men haqimda",
      contact: "Aloqa",
      admin: "Admin Studiya",
      available: "👋 Takliflar va loyihalar uchun ochiq",
      letsTalk: "Bog'lanish",
    },
    hero: {
      badge: "Takliflar uchun ochiq",
      title: "Salom, men Asadbek Xamidov",
      headline: "Backend Dasturchi, AI/ML Muhandisi va Data Scientist",
      subtitle: "Mittivoy kompaniyasida Data Analitik, FLyrank kompaniyasida ML Muhandis Stajyor va WIUT granti sohibi. Python, FastAPI, AI va Data Science bo'yicha mutaxassis.",
      viewProjects: "Loyihalarni ko'rish",
      readBlog: "Maqolalarni o'qish",
      getInTouch: "Bog'lanish",
      yearsExp: "2+ Yillik tajriba",
      projectsCount: "15+ Loyihalar",
      dedication: "100% Bag'ishlangan",
      typewriter: [
        "FastAPI Mikroxizmatlari",
        "Yuqori Yuklamali Backend",
        "Machine Learning Modellar",
        "Data Analytics Quvurlari"
      ]
    },
    sections: {
      featuredProjects: "Saralangan Loyihalar",
      featuredProjectsSub: "Yaqinda yaratgan eng yaxshi loyihalarim va AI modellarim.",
      viewAllProjects: "Barcha loyihalar",
      skillsTitle: "Texnik Asboblar",
      skillsSub: "Backend, AI/ML modellar, ma'lumotlar bazasi va tahliliy vositalarim.",
      recentPosts: "So'nggi Maqolalar",
      recentPostsSub: "Machine Learning, FastAPI arxitekturasi va shaxsiy muvaffaqiyatlar bo'yicha maqolalar.",
      readAllPosts: "Barcha maqolalar",
      aboutSnippetTitle: "Men Haqimda",
      readMoreAbout: "Batafsil o'qish",
      contactTitle: "Birgalikda Loyiha Yaratamiz",
      contactSub: "Backend, Data Science yoki AI loyihangiz bo'lsa, istalgan vaqtda murojaat qiling.",
      bannerTitle: "Backend yoki AI loyihangiz bormi?",
      bannerSub: "API arxitekturasini loyihalash, tizim unumdorligini oshirish hamda shartnoma asosida fullstack loyihalar uchun ochiqman.",
      openBadge: "Takliflar uchun ochiq",
    },
    projects: {
      title: "Portfolio Loyihalari",
      sub: "Ochiq manbali ilovalarim, API mikroxizmatlarim, data science quvurlarim va AI modellarim bilan tanishing.",
      all: "Barchasi",
      fullstack: "Fullstack",
      backend: "Backend & API",
      frontend: "Frontend",
      ai: "AI / Data Science",
      searchPlaceholder: "Loyiha nomi yoki kalit so'z bo'yicha qidiruv...",
      viewCode: "Manba Kodi",
      liveDemo: "Jonli Namoyish",
      details: "Batafsil",
      noProjects: "Filtringizga mos loyihalar topilmadi.",
      technologiesUsed: "Ishlatilgan Texnologiyalar",
    },
    blog: {
      searchPlaceholder: "Maqolalarni sarlavha, teg, kategoriya va subkategoriya bo'yicha qidirish...",
      allCategories: "Barcha Kategoriyalar",
      allSubcategories: "Barcha Subkategoriyalar",
      readTime: "daqiqa o'qish",
      publishedOn: "Chop etilgan vaqti",
      author: "Muallif",
      tableOfContents: "Mundarija",
      share: "Ulashish",
      copied: "Nusxalandi!",
      relatedPosts: "O'xshash Maqolalar",
      backToBlog: "← Kategoriyalarga qaytish",
      allFolders: "Barcha Kategoriya Jildlari",
      articlesFound: "ta Maqola Topildi",
      exploreCategory: "Kategoriya Maqolalarini Ko'rish",
      noArticles: "Ushbu bo'limda maqolalar topilmadi.",
      clearFilters: "Barcha filtrlarni tozalash",
      kbTitle: "Bilimlar Bazasi va Maqola Kategoriyalari",
      kbSub: "Quyidagi jildlardan birini tanlab, machine learning qo'llanmalari, backend arxitekturasi va shaxsiy maqolalarni o'qing.",
    },
    about: {
      title: "Xamidov Asadbek Haqida",
      subtitle: "Backend Dasturchi, AI/ML Muhandisi va Data Scientist.",
      bioHeading: "Kimman?",
      bioP1: "Men Xamidov Asadbek, WIUT (Westminster International University in Tashkent) universitetining Business Information System yo'nalishi granti sohibiman. Hozirda Mittivoy kompaniyasida Data Analyst va FLyrank kompaniyasida Machine Learning Engineering Intern (ML Muhandis Stajyor) sifatida faoliyat yuritaman.",
      bioP2: "Uzcard Data Science dasturida machine learning va sun'iy intellect bo'yicha bilimlarimni oshirib kelmoqdaman. Backend (FastAPI, Python) hamda ma'lumotlar tahlili loyihalarini yaratishni yaxshi ko'raman.",
      experienceTitle: "Ta'lim va Ish Tajribasi Timeline",
      skillsHeading: "Texnik Ko'nikmalar",
      downloadResume: "Rezyumeni Yuklab Olish (PDF)",
      downloadingResume: "Rezyume Fayli Yuklanmoqda...",
      profileBadge: "Muhandislik Profili",
    },
    philosophy: {
      cleanArchTitle: "Taza Arxitektura",
      cleanArchSub: "FastAPI bilan asinxron REST API'lar, toza kod va modulli loyihalash tamoyillari.",
      aiDataTitle: "AI va Data Analitika",
      aiDataSub: "Pandas bilan ma'lumotlar quvuri, machine learning modellar hamda tahliliy panellar.",
      wiutTitle: "WIUT Granti Sohibi",
      wiutSub: "Toshkentdagi Xalqaro Vestminster Universitetining Biznes Axborot Tizimlari granti sohibi.",
    },
    contact: {
      title: "Bog'lanish",
      subtitle: "Quyidagi forma orqali Asadbekka to'g'ridan-to me-mail yuboring.",
      name: "Ismingiz",
      namePlaceholder: "Ali Valiyev",
      email: "E-mail manzilingiz",
      emailPlaceholder: "ali@example.com",
      subject: "Mavzu",
      subjectPlaceholder: "Loyiha taklifi / Data Science",
      message: "Xabar",
      messagePlaceholder: "Loyihangiz bo'yicha ma'lumot bering...",
      send: "Xabarni Yuborish",
      sending: "E-mail yuborilmoqda...",
      success: "Rahmat! Xabaringiz Asadbekning e-mailiga yuborildi.",
      directContact: "Doimiy Aloqa",
    },
    footer: {
      tagline: "Backend Dasturchi, AI/ML Muhandisi va Data Scientist.",
      rights: "Barcha huquqlar himoyalangan.",
      quickLinks: "Tezkor Navigatsiya",
    },
    comments: {
      title: "Maqola Izohlari",
      yourName: "Ismingiz",
      writeComment: "Izoh qoldirish",
      placeholder: "Ushbu maqola bo'yicha fikr va savollaringizni yozib qoldiring...",
      postBtn: "Izohni Yuborish",
      postedMsg: "Izohingiz muvaffaqiyatli joylashtirildi!",
    }
  }
};

export const skillsData = [
  {
    category: { en: "Backend & Languages", uz: "Backend va Dasturlash Tillar" },
    icon: "Terminal",
    skills: ["Python", "FastAPI", "SQL", "JavaScript", "Go (Basics)", "RESTful APIs"]
  },
  {
    category: { en: "Data Science & AI/ML", uz: "Data Science va AI/ML" },
    icon: "Cpu",
    skills: ["Supervised Learning", "Unsupervised Learning", "Pandas & NumPy", "Scikit-Learn", "Machine Learning", "Data Pipelines"]
  },
  {
    category: { en: "Databases & Tools", uz: "Ma'lumotlar Bazasi va Asboblar" },
    icon: "Layers",
    skills: ["PostgreSQL", "Docker", "Git / GitHub", "Linux", "VS Code", "Vercel"]
  }
];

export const experienceTimeline = [
  {
    year: { en: "July 2026 - Present", uz: "Iyul 2026 - Hozirgacha" },
    role: { en: "Data Analyst", uz: "Data Analitik" },
    company: { en: "Mittivoy Company", uz: "Mittivoy kompaniyasi" },
    description: {
      en: "Analyzing business metrics, building SQL data pipelines, and creating executive dashboards to drive data-driven decision making.",
      uz: "Biznes ko'rsatkichlarini tahlil qilish, SQL ma'lumotlar quvurlarini qurish hamda boshqaruv panellarini yaratish."
    }
  },
  {
    year: { en: "July 2026 - Present", uz: "Iyul 2026 - Hozirgacha" },
    role: { en: "Machine Learning Engineering Intern", uz: "Machine Learning Muhandis Stajyor" },
    company: { en: "FLyrank", uz: "FLyrank kompaniyasi" },
    description: {
      en: "Developing machine learning models, backend features, integrating REST APIs, and optimizing database queries in an agile engineering environment.",
      uz: "Machine learning modellarini yaratish, backend funksiyalarini ishlab chiqish hamda REST API funksiyalarini integratsiya qilish."
    }
  },
  {
    year: { en: "May 2026 - Present", uz: "May 2026 - Hozirgacha" },
    role: { en: "Data Science Scholar", uz: "Data Science Tinglovchisi" },
    company: { en: "Uzcard Data Science Program", uz: "Uzcard Data Science Dasturi" },
    description: {
      en: "Deep-diving into machine learning algorithms, predictive modeling, data cleaning, and statistical analysis.",
      uz: "Machine learning algoritmlari, bashoratli modellashtirish, ma'lumotlarni tozalash va statistik tahlil."
    }
  },
  {
    year: { en: "Jan 2026 - Apr 2026", uz: "Yan 2026 - Apr 2026" },
    role: { en: "Junior Backend Developer", uz: "Junior Backend Dasturchi" },
    company: { en: "Freelance", uz: "Frilans" },
    description: {
      en: "Architected REST APIs with FastAPI and PostgreSQL for clients, implemented JWT authentication, and containerized apps with Docker.",
      uz: "FastAPI va PostgreSQL texnologiyalarida REST API loyihalarini yaratish, JWT autentifikatsiyasi hamda Docker konteynerlashtirish."
    }
  },
  {
    year: { en: "Nov 2025 - Mar 2026", uz: "Noy 2025 - Mar 2026" },
    role: { en: "Backend Development Intensive", uz: "Backend Dasturlash Intensiv Dasturi" },
    company: { en: "Specialized Training", uz: "Maxsus Trening" },
    description: {
      en: "Mastered Python backend development, asynchronous database patterns, API design, and clean architecture principles.",
      uz: "Python backend dasturlash, asinxron ma'lumotlar bazasi namunalari hamda toza arxitektura tamoyillarini o'zlashtirish."
    }
  },
  {
    year: { en: "2024 - Present", uz: "2024 - Hozirgacha" },
    role: { en: "BSc Business Information Systems", uz: "Biznes Axborot Tizimlari Bakalavr" },
    company: { en: "WIUT (Scholarship Awardee)", uz: "WIUT (Grant Sohibi)" },
    description: {
      en: "Awarded full scholarship at Westminster International University in Tashkent. Studying software engineering, database management, and information systems.",
      uz: "Toshkentdagi Xalqaro Vestminster Universitetida to'liq grant asosida ta'lim olish. Dasturiy ta'minot muhandisligi va axborot tizimlarini o'rganish."
    }
  }
];

export const projectsData = [
  {
    id: "personal-blog",
    title: {
      en: "Personal Developer Portfolio & Engineering Blog",
      uz: "Shaxsiy Dasturchi Portfoliosi va Muhandislik Blogi"
    },
    category: "fullstack",
    description: {
      en: "High-performance portfolio and blog built with React, Vite, Tailwind CSS, bilingual support (EN/UZ), interactive terminal visuals, and markdown reader.",
      uz: "React, Vite va Tailwind CSS texnologiyalarida yaratilgan yuqori unumdorlikka ega shaxsiy portfolio va blog (EN/UZ tildagi qo'llab-quvvatlash bilan)."
    },
    tech: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/xamidovasadbekdev-arch/Personal_blog",
    demo: "https://xamidovasadbek.dev",
    featured: true,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    longDescription: {
      en: "A full-featured personal website built to display software engineering projects, publish technical articles, and showcase AI & Data Science skills.",
      uz: "Dasturiy muhandislik loyihalarini namoyish etish, texnik maqolalarni chop etish hamda AI va Data Science ko'nikmalarini ko'rsatish uchun yaratilgan to'liq shaxsiy veb-sayt."
    }
  },
  {
    id: "fastapi-microservice",
    title: {
      en: "Scalable FastAPI Backend & Authentication Service",
      uz: "Moslashuvchan FastAPI Backend va Autentifikatsiya Xizmati"
    },
    category: "backend",
    description: {
      en: "Async Python REST API microservice with JWT authentication, PostgreSQL integration, Redis caching, and Docker setup.",
      uz: "JWT autentifikatsiyasi, PostgreSQL, Redis kesh va Docker konfiguratsiyasiga ega asinxron Python REST API mikroxizmati."
    },
    tech: ["FastAPI", "Python", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/xamidovasadbekdev-arch",
    demo: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    longDescription: {
      en: "Enterprise async REST API microservice structure designed for high throughput, OpenAPI specs, and Pytest coverage.",
      uz: "Yuqori yuklama, OpenAPI hujjatlari hamda Pytest sinovlari uchun mo'ljallangan korporativ asinxron REST API mikroxizmati arxitekturasi."
    }
  },
  {
    id: "data-analytics-pipeline",
    title: {
      en: "Automated Data Analytics & Sales Insights Pipeline",
      uz: "Avtomatlashtirilgan Data Analitika va Sotuv Tahlili Quvuri"
    },
    category: "ai",
    description: {
      en: "Automated pandas/SQL data pipeline for extracting, cleaning, and visualizing core business performance metrics.",
      uz: "Asosiy biznes ko'rsatkichlarini ajratib olish, tozalash va vizualizatsiya qilish uchun avtomatlashtirilgan pandas/SQL ma'lumotlar quvuri."
    },
    tech: ["Python", "Pandas", "SQL", "Scikit-Learn", "Matplotlib"],
    github: "https://github.com/xamidovasadbekdev-arch",
    demo: "#",
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    longDescription: {
      en: "Data analytics solution designed to process raw transactional data, perform statistical analysis, and generate predictive sales reports.",
      uz: "Xom transaktsiya ma'lumotlarini qayta ishlash, statistik tahlil o'tkazish hamda bashoratli sotuv hisobotlarini shakllantirish uchun Data Science yechimi."
    }
  }
];

export const articlesData = [
  {
    id: "supervised-learning-classification-guide",
    title: {
      en: "Supervised Learning: Building Classifier Models with Scikit-Learn",
      uz: "Nazorat Qilinadigan O'rganish: Scikit-Learn Bilan Klassifikator Modellari"
    },
    slug: "supervised-learning-classification-guide",
    category: "ml",
    subcategory: "Supervised Learning",
    date: "2026-08-02",
    readTime: "6",
    excerpt: {
      en: "A practical guide to supervised machine learning algorithms, cross-validation, feature scaling, and model evaluation metrics.",
      uz: "Nazorat qilinadigan machine learning algoritmlari, kross-validatsiya, belgilarni masshtablash va modelni baholash bo'yicha amaliy qo'llanma."
    },
    author: {
      name: "Xamidov Asadbek",
      role: "Backend Developer & AI/ML Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Machine Learning", "Supervised Learning", "Python", "Scikit-Learn"],
    content: {
      en: `
# Supervised Learning: Building Classifier Models with Scikit-Learn

Supervised Machine Learning algorithms learn mappings from input features to target labels. In this article, we explore classification models using **Scikit-Learn**.

---

## 1. Data Preparation & Feature Scaling

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Split features and target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Classifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)
print(f"Accuracy Score: {model.score(X_test_scaled, y_test):.4f}")
\`\`\`
`,
      uz: `
# Nazorat Qilinadigan O'rganish: Scikit-Learn Bilan Klassifikator Modellari

Nazorat qilinadigan Machine Learning (Supervised Learning) algoritmlari kirish belgilaridan maqsadli belgilarga akslantirishni o'rganadi. Ushbu maqolada **Scikit-Learn** yordamida klassifikatsiya modellarini ko'rib chiqamiz.

---

## 1. Ma'lumotlarni Tayyorlash va Masshtablash

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Belgilar va maqsadli o'zgaruvchini bo'lish
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Masshtablash
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Modelni o'rgatish
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)
print(f"Akkuratlik Darajasi: {model.score(X_test_scaled, y_test):.4f}")
\`\`\`
`
    }
  },
  {
    id: "unsupervised-learning-clustering-guide",
    title: {
      en: "Unsupervised Learning: K-Means & Hierarchical Clustering Patterns",
      uz: "Nazoratsiz O'rganish: K-Means va Klasterlash Usullari"
    },
    slug: "unsupervised-learning-clustering-guide",
    category: "ml",
    subcategory: "Unsupervised Learning",
    date: "2026-07-20",
    readTime: "7",
    excerpt: {
      en: "Explore how unsupervised algorithms discover hidden structures in unlabelled dataset clusters using K-Means and PCA dimensionality reduction.",
      uz: "Belgilanmagan ma'lumotlar to'plamida K-Means va PCA o'lchamlarini qisqartirish yordamida yashirin tuzilmalarni aniqlashni o'rganing."
    },
    author: {
      name: "Xamidov Asadbek",
      role: "Backend Developer & AI/ML Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Unsupervised Learning", "Clustering", "K-Means", "PCA"],
    content: {
      en: `
# Unsupervised Learning: K-Means & Hierarchical Clustering Patterns

Unsupervised learning algorithms process data without explicit target labels to discover natural groupings and clusters.

---

## 1. K-Means Clustering Example

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# Reduce dimensions with PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# K-Means Clustering
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X_pca)
\`\`\`
`,
      uz: `
# Nazoratsiz O'rganish: K-Means va Klasterlash Usullari

Nazoratsiz o'rganish (Unsupervised Learning) algoritmlari aniq maqsadli belgilarsiz ma'lumotlarni qayta ishlab, ularning tabiiy guruhlanishlarini va klasterlarini aniqlaydi.

---

## 1. K-Means Klasterlash Misoli

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# PCA yordamida o'lchamlarni kamaytirish
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# K-Means Klasterlash
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X_pca)
\`\`\`
`
    }
  },
  {
    id: "football-tournament-medal-milestone",
    title: {
      en: "Personal Milestone: Winning 1st Place Gold Medal in University Football Tournament",
      uz: "Shaxsiy Yutuq: Universitet Futbol Turnirida 1-O'rin Oltin Medali 🏆⚽"
    },
    slug: "football-tournament-medal-milestone",
    category: "personal",
    subcategory: "Sports & Football",
    date: "2026-06-10",
    readTime: "4",
    excerpt: {
      en: "Sharing my personal achievement winning the football tournament gold medal, teamwork lessons, and balancing sports with software engineering.",
      uz: "Universitet futbol turnirida oltin medalni qo'lga kiritish, jamoaviy mehnat hamda sport va dasturlashni birga olib borish bo'yicha shaxsiy maqola."
    },
    author: {
      name: "Xamidov Asadbek",
      role: "Backend Developer & Data Scientist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Personal", "Football", "Medal", "Achievement", "Sports"],
    content: {
      en: `
# Personal Milestone: Winning 1st Place Gold Medal in University Football Tournament 🏆⚽

Outside of coding REST APIs and training Machine Learning models, playing football is one of my favorite passions for staying disciplined, focused, and healthy.

---

## ⚽ The Championship Journey

Our university team competed in a 16-team knockout tournament. Through intense training, tactical teamwork, and resilience, we made it to the final match and secured 1st place!
`,
      uz: `
# Shaxsiy Yutuq: Universitet Futbol Turnirida 1-O'rin Oltin Medali 🏆⚽

REST API'larni kodlash va Machine Learning modellarini o'rgatishdan tashqari, futbol o'ynash mening intizomli va diqqat-e'tiborli bo'lib qolishimdagi eng sevimli mashg'ulotlarimdan biridir.

---

## ⚽ Chempionlik Yo'li

Universitetimiz jamoasi 16 ta jamoa ishtirok etgan pley-off turnirida qatnashdi. Shiddatli mashg'ulotlar va jamoaviy mehnat evaziga biz finalga chiqdik va 1-o'rinni egalladik!
`
    }
  }
];
