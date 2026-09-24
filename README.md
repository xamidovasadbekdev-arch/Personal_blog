# xamidov.dev — portfolio & blog

Personal site of **Asadbek Xamidov**, backend developer and ML engineer in Tashkent.
Live at **[xamidovasadbek.dev](https://xamidovasadbek.dev)**.

A static React site: no server, no database. Content lives in the repo, and every push to `main` redeploys on Vercel.

## Stack

- React 19, Vite, Tailwind CSS v4, React Router
- Articles in Markdown, rendered with `react-markdown` + GFM
- Comments via [giscus](https://giscus.app) (GitHub Discussions)
- Contact form via [Web3Forms](https://web3forms.com)
- English and Uzbek, dark and light themes

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Editing content

| What | Where |
|---|---|
| Name, bio, links, résumé path | `src/data/portfolioData.js` → `profile` |
| Projects | `src/data/portfolioData.js` → `projectsData` |
| Experience timeline, skills | `src/data/portfolioData.js` → `experienceTimeline`, `skillsData` |
| UI text (EN/UZ) | `src/data/portfolioData.js` → `translations` |
| Blog categories | `src/data/portfolioData.js` → `blogTaxonomy` |
| Articles | `src/content/blog/<slug>/en.md` and `uz.md` |

### Adding an article

Create `src/content/blog/my-new-post/en.md`:

```markdown
---
title: "My new post"
excerpt: "One or two sentences shown in lists and link previews."
date: 2026-10-01
category: backend
subcategory: "FastAPI & Microservices"
tags: ["FastAPI", "Python"]
---

Write the article here in Markdown. Code blocks get a copy button.
```

Optionally add `uz.md` in the same folder with its own `title`, `excerpt` and body; without it the Uzbek site shows the English version. `category` must be a key of `blogTaxonomy`, and `subcategory` one of its English subcategory names. The URL becomes `/blog/my-new-post`, read time is calculated automatically, and the post is added to `sitemap.xml` at build time.

Then `git push`, and Vercel deploys it.

## Turning on comments

1. In the GitHub repo settings, enable **Discussions**.
2. Install the [giscus app](https://github.com/apps/giscus) on this repo.
3. On [giscus.app](https://giscus.app), enter the repo, choose the **Announcements** category, and copy `data-repo-id` and `data-category-id`.
4. Paste them into `GISCUS` in `src/components/GiscusComments.jsx`.

Until both IDs are set, the comments section stays hidden.

## Deploy

Vercel builds with `npm run build` and serves `dist/`. `vercel.json` rewrites every path to `index.html` so direct links like `/blog/<slug>` work.

## Contact

[xamidovasadbek.dev@gmail.com](mailto:xamidovasadbek.dev@gmail.com) · [Telegram](https://t.me/homiidov) · [LinkedIn](https://www.linkedin.com/in/asadbekxamidov/) · [GitHub](https://github.com/xamidovasadbekdev-arch)
