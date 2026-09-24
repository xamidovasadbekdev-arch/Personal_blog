// Returns the string for the current language from a { en, uz } value,
// falling back to English. Plain strings are returned as-is.
export const pick = (value, lang = 'en') =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value;

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      blog: "Writing",
      about: "About",
      contact: "Contact",
      letsTalk: "Let's talk",
    },
    hero: {
      eyebrow: "Assalomu alaykum.",
      titleTop: "I build backends",
      titleMark: "that learn",
      titleEnd: ".",
      viewProjects: "View projects",
      readBlog: "Read the blog",
      getInTouch: "Get in touch",
    },
    sections: {
      workEyebrow: "Selected work.",
      featuredProjects: "Things I've built",
      viewAllProjects: "All projects",
      toolboxEyebrow: "Toolbox.",
      skillsTitle: "What I work with",
      writingEyebrow: "Writing.",
      recentPosts: "Recent articles",
      readAllPosts: "All articles",
      aboutEyebrow: "About.",
      aboutSnippetTitle: "A little about me",
      readMoreAbout: "Read more",
      bannerTitle: "Have a backend or AI project in mind?",
      bannerSub: "I'm open to API design, data pipelines, ML work, and freelance backend projects. Tell me what you're building.",
    },
    projects: {
      eyebrow: "Projects.",
      title: "Things I've built",
      sub: "Backend services, data pipelines, and machine learning work.",
      all: "All",
      filterLabel: "Filter by category",
      categories: {
        backend: "Backend & API",
        ai: "AI / Data Science",
        fullstack: "Fullstack",
        frontend: "Frontend",
      },
      searchPlaceholder: "Search projects",
      viewCode: "Source code",
      liveDemo: "Live demo",
      noProjects: "No projects match your filter.",
      technologiesUsed: "Built with",
    },
    blog: {
      eyebrow: "Writing.",
      title: "Articles & notes",
      sub: "Machine learning walkthroughs, backend architecture, and the occasional personal milestone.",
      all: "All",
      topics: "Topics",
      filterLabel: "Filter by category",
      searchPlaceholder: "Search articles",
      readTime: "min read",
      share: "Share",
      copied: "Link copied",
      backToBlog: "All articles",
      noArticles: "No articles match your search.",
      comments: "Comments",
    },
    about: {
      eyebrow: "About.",
      title: "Hi, I'm Asadbek.",
      timelineEyebrow: "Timeline.",
      experienceTitle: "Education & experience",
      downloadResume: "Download résumé",
    },
    principles: [
      { title: "Clean architecture", text: "Self-documenting code, async REST APIs with FastAPI, and modular design." },
      { title: "Data first", text: "Pipelines with pandas and SQL, models with scikit-learn, and dashboards people actually use." },
      { title: "Always learning", text: "Scholarship student in Business Information Systems at WIUT, Tashkent." },
    ],
    contact: {
      eyebrow: "Contact.",
      title: "Let's talk",
      subtitle: "Send a message below, or reach me directly on Telegram or email. I usually reply within a day.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      optional: "optional",
      subjectPlaceholder: "Project, job, or question",
      message: "Message",
      messagePlaceholder: "Tell me a little about what you have in mind",
      send: "Send message",
      sending: "Sending…",
      success: "Thanks! Your message arrived. I'll get back to you soon.",
      error: "The message couldn't be sent. Please try again, or email me directly at",
      directContact: "Or reach me directly",
      locationLabel: "Based in",
      location: "Tashkent, Uzbekistan",
    },
    footer: {
      location: "Tashkent",
    },
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      projects: "Loyihalar",
      blog: "Maqolalar",
      about: "Men haqimda",
      contact: "Aloqa",
      letsTalk: "Bog'lanish",
    },
    hero: {
      eyebrow: "Assalomu alaykum.",
      titleTop: "Aqlli backend",
      titleMark: "tizimlar quraman",
      titleEnd: ".",
      viewProjects: "Loyihalarni ko'rish",
      readBlog: "Maqolalarni o'qish",
      getInTouch: "Bog'lanish",
    },
    sections: {
      workEyebrow: "Tanlangan ishlar.",
      featuredProjects: "Men yaratgan loyihalar",
      viewAllProjects: "Barcha loyihalar",
      toolboxEyebrow: "Asboblar.",
      skillsTitle: "Nimalar bilan ishlayman",
      writingEyebrow: "Maqolalar.",
      recentPosts: "So'nggi maqolalar",
      readAllPosts: "Barcha maqolalar",
      aboutEyebrow: "Men haqimda.",
      aboutSnippetTitle: "Qisqacha men haqimda",
      readMoreAbout: "Batafsil",
      bannerTitle: "Backend yoki AI loyihangiz bormi?",
      bannerSub: "API loyihalash, ma'lumotlar quvurlari, ML va frilans backend loyihalar uchun ochiqman. Nima qurayotganingizni yozing.",
    },
    projects: {
      eyebrow: "Loyihalar.",
      title: "Men yaratgan loyihalar",
      sub: "Backend xizmatlari, ma'lumotlar quvurlari va machine learning ishlari.",
      all: "Barchasi",
      filterLabel: "Kategoriya bo'yicha saralash",
      categories: {
        backend: "Backend & API",
        ai: "AI / Data Science",
        fullstack: "Fullstack",
        frontend: "Frontend",
      },
      searchPlaceholder: "Loyihalarni qidirish",
      viewCode: "Manba kodi",
      liveDemo: "Jonli demo",
      noProjects: "Filtrga mos loyiha topilmadi.",
      technologiesUsed: "Texnologiyalar",
    },
    blog: {
      eyebrow: "Maqolalar.",
      title: "Maqolalar va qaydlar",
      sub: "Machine learning qo'llanmalari, backend arxitekturasi va shaxsiy yutuqlar.",
      all: "Barchasi",
      topics: "Mavzular",
      filterLabel: "Kategoriya bo'yicha saralash",
      searchPlaceholder: "Maqolalarni qidirish",
      readTime: "daqiqa",
      share: "Ulashish",
      copied: "Havola nusxalandi",
      backToBlog: "Barcha maqolalar",
      noArticles: "Qidiruvga mos maqola topilmadi.",
      comments: "Izohlar",
    },
    about: {
      eyebrow: "Men haqimda.",
      title: "Salom, men Asadbek.",
      timelineEyebrow: "Yo'l.",
      experienceTitle: "Ta'lim va tajriba",
      downloadResume: "Rezyumeni yuklab olish",
    },
    principles: [
      { title: "Toza arxitektura", text: "O'qilishi oson kod, FastAPI'da asinxron REST API'lar va modulli loyihalash." },
      { title: "Avval ma'lumot", text: "pandas va SQL bilan quvurlar, scikit-learn modellari va foydali panellar." },
      { title: "Doimiy o'rganish", text: "Toshkentdagi WIUT'da Biznes Axborot Tizimlari yo'nalishi grant talabasi." },
    ],
    contact: {
      eyebrow: "Aloqa.",
      title: "Bog'lanish",
      subtitle: "Quyidagi forma orqali xabar yuboring yoki Telegram va e-mail orqali to'g'ridan-to'g'ri yozing. Odatda bir kun ichida javob beraman.",
      name: "Ism",
      namePlaceholder: "Ismingiz",
      email: "E-mail",
      emailPlaceholder: "siz@example.com",
      subject: "Mavzu",
      optional: "ixtiyoriy",
      subjectPlaceholder: "Loyiha, ish taklifi yoki savol",
      message: "Xabar",
      messagePlaceholder: "Nimani nazarda tutganingizni qisqacha yozing",
      send: "Yuborish",
      sending: "Yuborilmoqda…",
      success: "Rahmat! Xabaringiz yetib keldi. Tez orada javob beraman.",
      error: "Xabar yuborilmadi. Qaytadan urinib ko'ring yoki to'g'ridan-to'g'ri yozing:",
      directContact: "Yoki to'g'ridan-to'g'ri yozing",
      locationLabel: "Manzil",
      location: "Toshkent, O'zbekiston",
    },
    footer: {
      location: "Toshkent",
    },
  },
};

export const profile = {
  name: 'Xamidov Asadbek',
  headline: 'Backend Developer & AI/ML Engineer',
  subtitle: {
    en: "I'm Asadbek — a Data Analyst at Mittivoy and Machine Learning Engineering Intern at FLyrank. I build Python and FastAPI backends, data pipelines, and ML models.",
    uz: "Men Asadbek — Mittivoy kompaniyasida Data Analitik va FLyrank'da Machine Learning muhandis stajyori. Python va FastAPI'da backendlar, ma'lumotlar quvurlari va ML modellar yarataman.",
  },
  bio: [
    {
      en: 'I study Business Information Systems at WIUT (Westminster International University in Tashkent) on a scholarship. I currently work as a Data Analyst at Mittivoy and as a Machine Learning Engineering Intern at FLyrank.',
      uz: "Men WIUT (Westminster International University in Tashkent) universitetida Biznes Axborot Tizimlari yo'nalishida grant asosida o'qiyman. Hozirda Mittivoy kompaniyasida Data Analitik va FLyrank'da Machine Learning muhandis stajyori bo'lib ishlayman.",
    },
    {
      en: 'My work spans backend engineering with FastAPI and Python, data analysis, and machine learning, which I keep sharpening through the Uzcard Data Science program. I like taking messy data problems apart and turning them into software that scales.',
      uz: "Ishim FastAPI va Python bilan backend, ma'lumotlar tahlili va machine learningni qamrab oladi. Bu bilimlarimni Uzcard Data Science dasturida oshirib boryapman. Murakkab ma'lumotlar muammolarini tahlil qilib, kengayadigan dasturlarga aylantirishni yaxshi ko'raman.",
    },
  ],
  email: 'xamidovasadbek.dev@gmail.com',
  telegram: '@homiidov',
  telegramUrl: 'https://t.me/homiidov',
  linkedin: 'https://www.linkedin.com/in/asadbekxamidov/',
  github: 'https://github.com/xamidovasadbekdev-arch',
  resume: '/Asadbek_Xamidov_Resume.txt',
};

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
    longDescription: {
      en: "Data analytics solution designed to process raw transactional data, perform statistical analysis, and generate predictive sales reports.",
      uz: "Xom transaktsiya ma'lumotlarini qayta ishlash, statistik tahlil o'tkazish hamda bashoratli sotuv hisobotlarini shakllantirish uchun Data Science yechimi."
    }
  }
];
