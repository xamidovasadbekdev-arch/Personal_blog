import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, readFileSync } from 'node:fs'

const SITE = 'https://xamidovasadbek.dev'

// Writes sitemap.xml at build time from the pages and the article folders,
// so new posts are listed without editing anything by hand.
function sitemap() {
  return {
    name: 'sitemap',
    generateBundle() {
      const posts = readdirSync('src/content/blog', { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => {
          const source = readFileSync(`src/content/blog/${entry.name}/en.md`, 'utf8')
          const date = source.match(/^date:\s*(\S+)/m)?.[1]
          return { path: `/blog/${entry.name}`, lastmod: date }
        })
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
  plugins: [react(), tailwindcss(), sitemap()],
  base: '/',
})
