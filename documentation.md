# Screen Decoded: how the site is built

This document explains how the Screen Decoded website works and how its code is organised. It is written for readers who are new to programming and to JavaScript and TypeScript. You don't need to understand every line of code to follow it. The aim is to give you a map, so you know where things live and what to change when you want something different.

Reading time: about 13 minutes.

---

## 1. The big picture

Screen Decoded is a **website**: a TV buying guide with seven pages and a few interactive features (a label search, a checklist, and a viewing distance calculator).

Every website is made of three kinds of code that the web browser understands:

| Language | What it does | Example in this project |
|---|---|---|
| **HTML** | The *content and structure*: headings, paragraphs, buttons, images | "Labels decoded" heading, the checklist items |
| **CSS** | The *look*: colours, fonts, spacing, layout | The dark header, the amber Checklist button |
| **JavaScript** | The *behaviour*: what happens when you click, type or drag | Filtering the label table as you type |

This project doesn't write these three by hand in separate files the old-fashioned way. It uses a few tools that make building a website easier:

- **TypeScript**: JavaScript with *types* added. A type is a label that says what kind of value something is, for example "this is a number" or "this is text". If you accidentally put text where a number belongs, TypeScript warns you *before* the site runs. TypeScript files end in `.ts`, or `.tsx` when they also contain HTML-like code.
- **React**: a library for building a website out of reusable pieces called **components**. Think of components as LEGO bricks: a header brick, a footer brick, a "card" brick, and a page made by snapping bricks together.
- **Vite** (pronounced "veet"): the *build tool*. It takes all the TypeScript, React and CSS files and turns them into the plain HTML, CSS and JavaScript that browsers understand. While you work, it also runs a local preview of the site that updates instantly when you save a file.
- **npm**: the *package manager*. It downloads the tools above (React, Vite, TypeScript…) into the `node_modules` folder and runs the project's commands.

The site was first designed visually as a "Claude Design" canvas, a set of drawn pages. Each drawn page was then rebuilt as a React page in this project.

---

## 2. Running the project

You need **Node.js** installed (it includes npm). Open a terminal in the project folder and run:

| Command | What it does |
|---|---|
| `npm install` | Downloads the tools listed in `package.json`. Only needed once, or after the list changes. |
| `npm run dev` | Starts a local preview at an address like `http://localhost:5173`. Saving a file updates the browser instantly. |
| `npm run build` | Checks the code for type errors, then produces the finished site in the `dist/` folder. |
| `npm run lint` | Checks the code for common mistakes and bad patterns. |
| `npm run preview` | Serves the finished `dist/` site locally, so you can test exactly what would be published. |

**Important:** `npm run dev` does *not* check TypeScript types. Run `npm run build` before you consider a change finished. If it prints errors, something needs fixing.

There are no automated tests in this project. To check a change, look at it in the browser, including at phone size (most browsers have a "device mode" in their developer tools, opened with F12).

---

## 3. A map of the files

```
Screen Decoded/
├── index.html            ← the one real HTML file; React fills it in
├── package.json          ← project name, commands, and list of tools
├── vite.config.ts        ← Vite settings
├── public/
│   └── favicon.svg       ← the small icon in the browser tab
├── src/                  ← all the site's source code
│   ├── main.tsx          ← starting point: puts the app on the page
│   ├── App.tsx           ← decides which page to show
│   ├── router.ts         ← tracks the current web address
│   ├── site.ts           ← list of page addresses and menu items
│   ├── viewing.ts        ← maths for the viewing distance calculator
│   ├── index.css         ← colours, fonts and shared styles
│   ├── components/       ← reusable bricks (header, footer, drawings…)
│   ├── pages/            ← one file per page, plus its own CSS
│   └── data/
│       └── labels.tsx    ← the table of TV label names
├── dist/                 ← the finished site (created by npm run build)
└── node_modules/         ← downloaded tools (never edit by hand)
```

Some files are leftovers from the starter template and aren't used: `src/App.css`, `src/assets/` and `public/icons.svg`. You can delete them.

---

## 4. How a page gets onto the screen

Here is what happens, step by step, when someone visits the site.

**Step 1: `index.html` loads.** It is almost empty: it loads the fonts and contains one empty box, `<div id="root"></div>`, plus a line that loads `src/main.tsx`.

**Step 2: `main.tsx` starts React.** It finds that empty box and tells React to draw the `App` component inside it:

```tsx
createRoot(document.getElementById('root')!).render(<App />)
```

**Step 3: `App.tsx` picks the page.** It reads the current web address (for example `/labels`) and looks it up in a table:

```tsx
const routes = {
  [paths.home]: Home,
  [paths.labels]: Labels,
  // …one line per page
}
```

It then draws the header, the chosen page, and the footer. If the address isn't in the table, it shows the "Page not found" page instead. It also sets the text shown in the browser tab (taken from `pageMeta` in `src/site.ts`), and scrolls to the top (or to a `#section` if the link points to one).

**Step 4: clicking a link.** Normally clicking a link makes the browser download a whole new page. This site is a *single-page app*: the `Link` component (`src/components/Link.tsx`) catches the click, changes the address in the browser's address bar, and tells `App` to draw the new page. Nothing is downloaded again, so it feels instant. `router.ts` contains the small amount of code that keeps track of the address.

> **Note for publishing:** the site is hosted on GitHub Pages at `https://screendecoded.github.io`, which only serves files that exist. So the build makes a copy of `index.html` for every page, such as `labels.html`, which GitHub serves when someone opens `/labels`. Each copy gets that page's own title and description from `pageMeta` in `src/site.ts`, plus the tags search engines and link previews read. It also makes `404.html`, which GitHub serves for unknown addresses so the site can show its own "Page not found" page, and `sitemap.xml` and `robots.txt` for search engines. A new page added to `paths` and `pageMeta` gets all of this automatically. The file `.github/workflows/deploy.yml` tells GitHub to build and publish the site every time you push changes to the `master` branch.

---

## 5. Understanding a component

Components are the heart of React. Here is a simplified version of a real one, `PageNav.tsx`, which draws the "← Previous / Next →" links at the bottom of each chapter:

```tsx
export function PageNav({ prev, next }) {
  return (
    <nav className="pager">
      <Link href={prev.href} className="pager__prev">← {prev.label}</Link>
      <Link href={next.href} className="btn btn--dark">{next.label}</Link>
    </nav>
  )
}
```

What's going on:

- **A component is a function** whose name starts with a capital letter. It *returns* what should appear on screen.
- **The HTML-looking part is called JSX.** It looks like HTML but lives inside TypeScript. Two differences to know:
  - HTML's `class` is written `className` in JSX.
  - Curly braces `{ }` mean "insert a value here", e.g. `{next.label}` inserts the label text.
- **Props** are the inputs a component receives, like settings on a brick. Here `prev` and `next` are props. A page uses the component like this:

```tsx
<PageNav
  prev={{ href: paths.labels, label: 'Labels decoded' }}
  next={{ href: paths.smartTv, label: 'Next: Smart TV platforms →' }}
/>
```

### Lists: `.map()`

Many pages keep their content in a list and draw one card per item. For example the Home page has a list of chapters:

```tsx
const chapters = [
  { href: paths.technologies, title: 'Display technologies', desc: 'CRT to MicroLED…' },
  { href: paths.backlights, title: 'Backlights & panels', desc: 'Local dimming…' },
  // …
]
```

and draws them with `.map()`, which means "for each item, produce this":

```tsx
{chapters.map((chapter) => (
  <li key={chapter.href}>
    <Link href={chapter.href}>{chapter.title}</Link>
  </li>
))}
```

The `key` is a unique name React uses to keep track of each item. **To add, remove or reword a card, you usually just edit the list at the top of the page file.** You don't need to touch the drawing code below it.

### State: things that change

Some components need to *remember* something that changes while you use the page, such as which checkboxes are ticked or what you typed in the search box. React calls this **state**, created with `useState`:

```tsx
const [query, setQuery] = useState('')
```

This creates a value `query` (starting as empty text) and a function `setQuery` to change it. Whenever `setQuery` is called, React automatically redraws the component with the new value. You never update the screen by hand. You change the state, and React takes care of the rest.

---

## 6. The pages

Each page is a file in `src/pages/` with a matching `.css` file for its own styles.

| File | Address | What it contains |
|---|---|---|
| `Home.tsx` | `/` | Introduction, LCD vs OLED families, where to start, chapter map |
| `Technologies.tsx` | `/technologies` | Display technology history, how LCD and OLED work, comparison table |
| `Backlights.tsx` | `/backlights` | Local dimming diagrams, contrast comparison, panel types, glossy vs matte |
| `Labels.tsx` | `/labels` | Searchable, filterable table of marketing names |
| `Features.tsx` | `/features` | HDR formats and gaming features |
| `SmartTv.tsx` | `/smart-tv` | Smart TV platforms (webOS, Tizen, Google TV…) |
| `ViewingDistance.tsx` | `/viewing-distance` | The viewing distance calculator |
| `Checklist.tsx` | `/checklist` | Five-question buying checklist |
| `NotFound.tsx` | any other address | "This page is off the air" |

Shared building blocks live in `src/components/`:

| Component | What it draws |
|---|---|
| `SiteHeader.tsx` | The top bar with logo and menu, including the phone "Menu" button |
| `SiteFooter.tsx` | The bottom bar with the site description and links |
| `PageHero.tsx` | The dark title area at the top of each chapter |
| `PageNav.tsx` | Previous / next chapter links |
| `Link.tsx` | An internal link that switches pages without reloading |
| `Icons.tsx` | The logo mark and the arrow icon |
| `ContrastComparison.tsx` | The LCD vs OLED contrast cards and the "Why infinite contrast matters" editorial |
| `TopView.tsx`, `PerspectiveView.tsx` | The two calculator drawings |

---

## 7. Styling: how the site looks

All styling is plain CSS. It lives in three places:

1. **`src/index.css`**: the foundation. At the top are the **design tokens**: named colours and fonts taken from the design's brand sheet:

   ```css
   --ink: #0e1014;        /* near-black background */
   --paper: #f4f5f7;      /* light page background */
   --lcd: #2e5bff;        /* "LCD blue" */
   --oled: #f2a23a;       /* "OLED amber" */
   ```

   Anywhere else in the CSS, these are used as `var(--oled)` instead of repeating the colour code. **To change a brand colour across the whole site, change it here once.** Below the tokens are shared styles used on many pages: `.card`, `.btn`, `.container`, `.data-table` and so on.

2. **`src/components/layout.css`**: the header, footer, chapter titles and previous/next links, including the phone menu.

3. **One CSS file per page**, e.g. `src/pages/Labels.css`, for styles that only that page uses.

A few conventions:

- **Colour meanings are consistent:** blue = LCD, amber = OLED, teal = MicroLED/self-emissive, green = the calculator's "green zone".
- **Class names follow a pattern** called BEM: `block__part--variant`. For example `check-item` is a checklist row, `check-item__hint` is the hint text inside it, and `check-item--done` is a ticked row.
- **Phones are handled with media queries**, CSS rules that only apply below a certain screen width:

  ```css
  @media (max-width: 640px) {
    /* rules here only apply on screens 640px wide or narrower */
  }
  ```

  For example, the two big tables turn into stacked cards on phones, and the menu collapses behind a "Menu" button below 1200px.

---

## 8. The interactive features

### Label search (`Labels.tsx`)

The page remembers two pieces of state: the text in the search box and the selected family button (All, LCD, OLED, Self-emissive). Every time either changes, it filters the label list:

```tsx
const visible = tvLabels.filter(
  (label) =>
    (family === 'all' || label.family === family) &&
    (needle === '' || normalize(label.name + ...).includes(needle)),
)
```

In plain words: keep a label if it matches the chosen family *and* its name contains the search text. The `normalize` function ignores capital letters, spaces and hyphens, so typing "qd oled" still finds "QD-OLED". The table data itself lives in `src/data/labels.tsx`. **To add a new label, add one entry to that list.**

### Checklist (`Checklist.tsx`)

The ticked items are stored as state, and also saved in the browser's **localStorage**, a small storage area each website gets in the visitor's browser. This means ticks survive a page reload. The code that reads and writes localStorage is wrapped in `try { … } catch { … }` blocks. That's a safety net: some browsers (for example in private mode) block storage. If that happens the checklist still works; it just won't remember ticks.

The "Print checklist" button calls the browser's print function. Special print styles hide the header, footer and buttons.

### Phone menu (`SiteHeader.tsx`)

On narrow screens the menu is hidden behind a "Menu" button. The button flips a piece of state between open and closed, and CSS shows or hides the list accordingly. The menu closes when you pick a page or press the Esc key.

### Infinite contrast editorial (`ContrastComparison.tsx`)

The "Why infinite contrast matters" button flips an `open` state. The editorial text uses the HTML `hidden` attribute, so it is hidden until opened. The original text is also kept in `infinite-contrast.md`, but **the site shows the copy inside the component**, so edit both if you change the wording.

---

## 9. The viewing distance calculator

This is the most complex feature, split into three parts so each stays understandable.

### Part 1: the maths (`src/viewing.ts`)

This file contains only calculations, no visuals. The rule is: **the ideal seat is where the TV's width fills 46 degrees of your view.**

The steps:

1. A TV's size (for example 65") is measured diagonally. For a normal 16:9 screen, the width is about 0.87 × the diagonal. So a 65" TV is about 144 cm wide.
2. Using trigonometry (the `Math.tan` function), the ideal distance is the distance where that width spans 46°. For 65" that's about 1.70 m.
3. The same maths runs backwards: from a seat distance, it can work out the screen size that would be ideal.

Then each seat gets a rating by comparing it with the ideal distance:

| Distance compared with ideal | Rating |
|---|---|
| Within ±10% | "In the green zone" |
| 10–25% off | "A bit close" / "A bit far" |
| More than 25% off | "Too close" / "Too far" |

These numbers are named constants at the top of the file (`IDEAL_ANGLE_DEG`, `GREEN_ZONE`, `OUTER_ZONE`), so they are easy to adjust.

Distances are always stored in **centimetres** inside the code. They're only converted to metres or feet and inches when shown on screen. That's why switching units never changes the actual seat position.

### Part 2: the page (`src/pages/ViewingDistance.tsx`)

The page holds four pieces of state: the screen size, any custom size you typed, the seat distance, and the unit choice (metric or imperial). From those it calculates everything else on every redraw: the viewing angle, the rating, the suggested size. Nothing calculated is stored, so it can never get out of sync.

Your unit choice is saved in localStorage, the same way as the checklist ticks.

### Part 3: the drawings (`TopView.tsx` and `PerspectiveView.tsx`)

Both drawings are **SVG**, a way of describing pictures with shapes (lines, rectangles, circles) in code. The components compute the shape positions from the current size and distance, so the drawings update instantly as you move the slider.

- **Top view:** a floor plan. The scale zooms automatically so the TV, the green zone and your seat always fit inside the frame.
- **Perspective view:** what you'd see from the sofa. It uses the basic rule of perspective: things look smaller the farther away they are (size on screen = real size ÷ distance). The dashed amber outline shows how big the TV would look from the ideal seat.

---

## 10. Common changes and where to make them

| I want to… | Where to look |
|---|---|
| Fix a typo or reword text | The page file in `src/pages/`. Text is usually in a list at the top or directly in the JSX. |
| Change a brand colour | The tokens at the top of `src/index.css` |
| Add a TV label to the table | The list in `src/data/labels.tsx` |
| Change the 46° rule or green-zone size | The constants at the top of `src/viewing.ts` |
| Rename a menu item | `navItems` in `src/site.ts` |
| Change a page's search-result title or description | `pageMeta` in `src/site.ts` |
| Update the "Updated October 2026" date | `lastUpdated` in `src/site.ts` |

### Adding a new page

1. Create `src/pages/MyPage.tsx` (copy a simple page such as `SmartTv.tsx` as a starting point) and, if needed, `MyPage.css`.
2. In `src/site.ts`, add its address to `paths` and its title and description to `pageMeta` (the build fails until you do). Add it to `navItems` too if it should appear in the menu.
3. In `src/App.tsx`, import it and add a line to the `routes` table.
4. Update the previous/next links on neighbouring pages, and the chapter map on the Home page.
5. If you added a menu item, check that the desktop menu still fits on one row. The breakpoint where the menu collapses (`max-width: 1200px` in `layout.css`) was measured for the current seven items, and may need raising.

---

## 11. Rules the tools enforce

The project is set up with a few strict settings. If `npm run build` or `npm run lint` complains, it's usually one of these:

- **Unused code is an error.** If you create a variable or import something and never use it, the build fails. Delete it or use it.
- **Type-only imports need the word `type`**, e.g. `import { type ReactNode } from 'react'`.
- **No `enum`.** Use a list of allowed text values instead, like `type Units = 'metric' | 'imperial'`.
- **Hooks follow rules.** Functions starting with `use` (like `useState`) must be called at the top level of a component, never inside an `if` or a loop.
- **React Compiler is switched on.** It speeds up the site automatically, so you'll rarely need performance tricks like `useMemo`.
