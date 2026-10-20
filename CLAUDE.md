# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Screen Decoded" is a static, content-driven TV buying guide (React 19 + TypeScript + Vite 8). It is a React port of the Claude Design canvas "Screen Decoded" (https://claude.ai/artifact/XDad2n8t9k1zytR6NnkXSR): each site artboard became one page in `src/pages/`; the "Brand sheet" artboard became the design tokens at the top of `src/index.css`. The README is still the stock template README; `src/App.css`, `src/assets/` and `public/icons.svg` are unused template leftovers.

## Architecture

- **Routing** is hand-rolled, no router library: [src/router.ts](src/router.ts) exposes `useLocation()` (History API via `useSyncExternalStore`) and `navigate()`; [src/components/Link.tsx](src/components/Link.tsx) is the `<a>` for internal links. [src/App.tsx](src/App.tsx) maps paths to pages and sets `document.title`, and handles scroll-to-top / scroll-to-`#hash` on navigation. Route paths and the header/footer nav live in [src/site.ts](src/site.ts) — add a page there and in `App.tsx`'s `routes`.
- **Hosting** is GitHub Pages as a user site (`username.github.io`, served from the root, so no Vite `base`). GitHub Pages has no SPA fallback, so the `staticPages` plugin in [vite.config.ts](vite.config.ts) writes `dist/<path>.html` for every entry in `paths` (GitHub serves `labels.html` for `/labels`), each with that page's `<title>`, meta description, canonical URL and Open Graph/Twitter tags; plus `404.html` (noindex), `sitemap.xml` and `robots.txt`. All of it comes from `siteUrl` and `pageMeta` in `site.ts`, which `App.tsx` also uses for the tab title — so a new page needs an entry in `paths` and `pageMeta` (TypeScript enforces the latter). The share image is `public/og-image.png` (1200×630). [.github/workflows/deploy.yml](.github/workflows/deploy.yml) lints, builds and publishes on every push to `master` (the repository's branch is `master`, not `main`).
- **Styling** is plain global CSS, no CSS modules: tokens, base styles and shared classes (`.container`, `.section`, `.grid--<min-width>`, `.card`, `.chip--<tone>`, `.btn--<variant>`, `.data-table`, `.callout`) in `src/index.css`; header/footer/hero/pager in `src/components/layout.css`; page-specific classes in a `Page.css` imported by each page, with BEM-style names prefixed per page. Use the CSS variables, not raw hex values. Color tones are consistently LCD = blue (`--lcd*`), OLED = amber (`--oled*`), self-emissive/MicroLED = teal (`--emissive*`).
- **Content** is mostly inline in each page as module-level arrays rendered with `.map()`; the Labels table data is in [src/data/labels.tsx](src/data/labels.tsx). Copy follows the brand voice: plain language, short sentences, no jargon without a translation.
- **Interactive bits**: Labels page search + family filter (`useState`), Checklist ticks persisted to `localStorage` (wrapped in try/catch) with print styles under `@media print` and `.no-print`.
- **Viewing distance calculator** (`/viewing-distance`): all maths lives in [src/viewing.ts](src/viewing.ts) — ideal seat is where a 16:9 screen's width fills exactly 46° (computed, never a lookup table); green zone ±10%, "a bit" ±25%. The two drawings are hand-built SVG components ([TopView.tsx](src/components/TopView.tsx), [PerspectiveView.tsx](src/components/PerspectiveView.tsx)); distances are held in cm and only formatted per metric/imperial unit choice. The green zone uses the `--zone-*` tokens, which are not on the brand sheet.
- **Header nav** collapses into a hamburger menu at `max-width: 1200px` (`layout.css`). That breakpoint is measured: the wordmark plus all nav items just fit one row in the 1200px container. Adding or renaming a nav item means re-measuring it.
- **Layout checks**: build and lint can't catch layout bugs. Headless Edge enforces a ~500px minimum window, so check phone widths by loading pages in a 375px-wide `<iframe>` from a throwaway HTML file in `dist/` served by `npm run preview`, and measuring `scrollWidth` vs `clientWidth`.
- Fonts (Bricolage Grotesque, Source Sans 3, JetBrains Mono) load from Google Fonts in `index.html`.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — type-check (`tsc -b`, project references) then `vite build` to `dist/`
- `npm run lint` — ESLint over the repo
- `npm run preview` — serve the production build

There is no test runner configured. Type errors only surface through `npm run build` (or `npx tsc -b`), not through `dev`.

## Toolchain notes

- **React Compiler is on** via `babel-plugin-react-compiler` wired through `@rolldown/plugin-babel` in [vite.config.ts](vite.config.ts). It auto-memoizes components, so manual `useMemo`/`useCallback`/`React.memo` are generally unnecessary. Components must follow the Rules of React for the compiler to optimize them; `eslint-plugin-react-hooks` (flat recommended) flags violations.
- **TypeScript config** ([tsconfig.app.json](tsconfig.app.json) for `src/`, [tsconfig.node.json](tsconfig.node.json) for `vite.config.ts`):
  - `verbatimModuleSyntax` — type-only imports must use `import type`.
  - `erasableSyntaxOnly` — no `enum`, `namespace`, or constructor parameter properties; use union types / `as const` objects instead.
  - `noUnusedLocals` / `noUnusedParameters` — unused code fails the build.
- `eslint-plugin-react-refresh` expects files that export components to export only components (keeps HMR working).
- Static assets in `public/` are served from `/` (e.g. `/icons.svg#id` sprite references); assets imported from `src/assets/` are bundled and hashed.

## Environment

Development happens on Windows (PowerShell). The directory is not a git repository.
