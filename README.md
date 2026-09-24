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

## Editing content — xamidovasadbek.dev/admin

Every piece of text on the site is editable at **https://xamidovasadbek.dev/admin** (Sveltia CMS). Saving commits to `main` on GitHub, and Vercel redeploys in about a minute.

**First sign-in:** create a [fine-grained GitHub token](https://github.com/settings/personal-access-tokens/new) limited to this repository with **Contents: Read and write**, then choose **Sign In Using Access Token** on the admin page and paste it. The token stays in that browser only.

| In the admin | File in the repo |
|---|---|
| Articles (EN + UZ side by side, drafts, tags) | `src/content/blog/{en,uz}/<slug>.md` |
| Profile: name, headline, intro, bio, links, résumé, terminal card | `src/content/site/profile.json` |
| Projects | `src/content/site/projects.json` |
| Experience timeline | `src/content/site/experience.json` |
| Skills | `src/content/site/skills.json` |
| Blog categories and topics | `src/content/site/categories.json` |
| UI text: buttons, headings, labels | `src/content/site/ui.json` |

Uploaded files (résumé PDF, images) go to `public/uploads/`.

The admin config (`public/admin/config.yml`) is generated from `scripts/cms-config.mjs` on every dev start and build. New keys added to `ui.json` appear in the admin automatically.

You can still edit the files by hand and `git push`; an article is a Markdown file with YAML frontmatter (`title`, `excerpt`, `date`, `category`, `subcategory`, `tags`, optional `draft: true`). A missing Uzbek file falls back to English.

## Turning on comments

1. In the GitHub repo settings, enable **Discussions**.
2. Install the [giscus app](https://github.com/apps/giscus) on this repo.
3. On [giscus.app](https://giscus.app), enter the repo, choose the **Announcements** category, and copy `data-repo-id` and `data-category-id`.
4. Paste them into `GISCUS` in `src/components/GiscusComments.jsx`.

Until both IDs are set, the comments section stays hidden.

## Deploy

Vercel builds with `npm run build` and serves `dist/`. `vercel.json` sends `/admin` to the CMS and every other path to `index.html`, so direct links like `/blog/<slug>` work.

## Contact

[xamidovasadbek.dev@gmail.com](mailto:xamidovasadbek.dev@gmail.com) · [Telegram](https://t.me/homiidov) · [LinkedIn](https://www.linkedin.com/in/asadbekxamidov/) · [GitHub](https://github.com/xamidovasadbekdev-arch)
