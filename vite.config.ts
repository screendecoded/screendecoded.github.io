import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { notFoundMeta, pageMeta, paths, siteName, siteUrl, type PageMeta } from './src/site.ts'

const shareImage = { path: '/og-image.png', width: 1200, height: 630, alt: 'Screen Decoded — TV buying guide' }

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function replaceOnce(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`static-pages: ${pattern} not found in index.html`)
  // A function replacement is inserted literally, so a "$" in a description is safe.
  return html.replace(pattern, () => replacement)
}

/** The built index.html with this page's title, description and search/preview tags. */
function pageHtml(template: string, meta: PageMeta, url: string | null) {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const tags = url
    ? [
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${siteName}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${siteUrl}${shareImage.path}" />`,
        `<meta property="og:image:width" content="${shareImage.width}" />`,
        `<meta property="og:image:height" content="${shareImage.height}" />`,
        `<meta property="og:image:alt" content="${escapeHtml(shareImage.alt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
      ]
    : [`<meta name="robots" content="noindex" />`]

  let html = replaceOnce(template, /<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
  return replaceOnce(html, /\s*<\/head>/, `\n    ${tags.join('\n    ')}\n  </head>`)
}

// GitHub Pages only serves files that exist, so after building, write one HTML
// file per page (GitHub serves dist/labels.html for /labels), each with its own
// title, description, canonical address and link-preview tags. Also writes
// 404.html for unknown addresses (the app then shows its "Page not found" page),
// plus sitemap.xml and robots.txt for search engines.
function staticPages(): Plugin {
  let outDir = ''
  return {
    name: 'static-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const urls: string[] = []
      for (const path of Object.values(paths)) {
        const url = `${siteUrl}${path}`
        const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
        writeFileSync(resolve(outDir, file), pageHtml(template, pageMeta[path], url))
        urls.push(url)
      }
      writeFileSync(resolve(outDir, '404.html'), pageHtml(template, notFoundMeta, null))

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    staticPages(),
  ],
})
