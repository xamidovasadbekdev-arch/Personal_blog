import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import YAML from 'yaml'
import { buildCmsConfig } from './scripts/cms-config.mjs'

const SITE = 'https://xamidovasadbek.dev'

function parseMarkdown(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { meta: {}, body: source.trim() }
  // The YAML 1.2 core schema keeps dates like 2026-06-10 as plain strings.
  return { meta: YAML.parse(match[1]) || {}, body: match[2].trim() }
}

// Turns src/content/**/*.md into { meta, body } modules at build time,
// so no YAML parser ships to the browser.
function markdownContent() {
  return {
    name: 'markdown-content',
    enforce: 'pre',
    transform(code, id) {
      // The dev server appends queries like ?import to module ids.
      if (!/[\\/]src[\\/]content[\\/].*\.md$/.test(id.split('?')[0])) return null
      return { code: `export default ${JSON.stringify(parseMarkdown(code))}`, map: null }
    },
  }
}

// Regenerates public/admin/config.yml from the content files, so every text
// field on the site is editable in the CMS without maintaining the config by hand.
function cmsConfig() {
  const write = () => writeFileSync('public/admin/config.yml', buildCmsConfig())
  return {
    name: 'cms-config',
    buildStart: write,
  }
}

// Writes sitemap.xml at build time from the pages and the article files,
// so new posts are listed without editing anything by hand.
function sitemap() {
  return {
    name: 'sitemap',
    generateBundle() {
      const posts = readdirSync('src/content/blog/en')
        .filter(file => file.endsWith('.md'))
        .map(file => ({ file, ...parseMarkdown(readFileSync(`src/content/blog/en/${file}`, 'utf8')) }))
        .filter(post => !post.meta.draft)
        .map(post => ({ path: `/blog/${post.file.replace(/\.md$/, '')}`, lastmod: post.meta.date }))
      const pages = ['/', '/projects', '/blog', '/about', '/contact'].map(path => ({ path }))
      const urls = [...pages, ...posts]
        .map(({ path, lastmod }) =>
          `  <url><loc>${SITE}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [markdownContent(), react(), tailwindcss(), cmsConfig(), sitemap()],
  base: '/',
})
