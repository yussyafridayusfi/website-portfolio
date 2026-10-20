# website-portofolio

A full-screen, section-by-section portfolio for **Yussyafrida C.R.**, built with React and
Vite. The home page uses CSS Scroll Snap: six sections fill the viewport, with a fixed
header, a reading-progress line and a section rail. Longer sections scroll internally rather
than clipping their content. The site also presents five curated GitHub projects in a
responsive card grid, each with its own detail page, a skills section grouped by evidence, a
live repository explorer, a print-friendly CV, two languages (English and Indonesian), and a
light/dark theme.

Live site: `https://yussyafridayusfi.github.io/example-portfolio/`

---

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 (JavaScript) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) + a small set of CSS custom properties |
| Icons | Lucide React |
| Scrolling | CSS Scroll Snap (`y mandatory`), `100svh` sections, internal section scrolling |
| Routing | A ~60-line client-side router (home + one page per project) |
| Data | GitHub REST API, unauthenticated |
| Print | Dedicated print stylesheet, rendered from the same config |
| Deploy | GitHub Actions → GitHub Pages |

No backend, no database, no analytics, no tracking scripts, no web fonts.

---

## Local development

```bash
cd website-portofolio
npm install
npm run dev        # http://localhost:5173/example-portfolio/
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Node 20.19+ or 22.12+ is required by Vite 7.

> The dev server also serves under `/example-portfolio/` because `base` is set in
> `vite.config.js`. Open the URL printed by Vite, not bare `localhost:5173`.

---

## Project structure

```text
website-portofolio/
├── public/
│   ├── 404.html                 # SPA deep-link fallback for GitHub Pages
│   ├── projects/
│   │   └── sembarang-budal.webp # real screenshot of the live demo
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # fixed header, mobile menu, language + theme + print
│   │   ├── SectionProgress.jsx  # progress line, section rail, hash-scroll reset
│   │   ├── LanguageToggle.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx     # lead paragraphs + expandable full summary
│   │   ├── ProjectSection.jsx   # responsive card grid
│   │   ├── ProjectCard.jsx      # short description + clear links
│   │   ├── ProjectPage.jsx      # full project narrative on its own URL
│   │   ├── ProjectVisual.jsx    # real screenshot or an honest typographic cover
│   │   ├── SkillsSection.jsx    # accessible tabs, one group at a time
│   │   ├── GitHubExplorer.jsx   # search, filter, sort, show more, all states
│   │   ├── ContactSection.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── SiteFooter.jsx
│   │   └── CvDocument.jsx       # print-only CV
│   ├── config/
│   │   ├── portfolio.js         # profile, skills, five projects, featured slugs
│   │   └── ui.js                # all interface strings, in English and Indonesian
│   ├── i18n/
│   │   └── LanguageContext.jsx  # language state, persistence, document lang
│   ├── lib/
│   │   ├── router.jsx           # history-based routing and <Link>
│   │   └── useActiveSection.js  # scroll-spy for the active section and progress
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   └── github.js            # fetch, mapping, cache, error classification
│   ├── styles/
│   │   ├── index.css            # tokens, base, full-screen scroller, shared components
│   │   └── print.css            # A4 CV layout
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

### Editing content

Everything a visitor reads comes from two files:

- `src/config/portfolio.js`
  - `profile` — name, full name, role, location, links, intro, about paragraphs.
  - `profile.cvAchievement` — the 2025 internal innovation award, used only by the
    printed CV, not by the public About section.
  - `heroFacts` — the compact facts beside the introduction. The location fact is
    hidden below `sm` because the introduction already states the location.
  - `skillGroups` — professional background, demonstrated in public projects,
    currently developing. Every item has a localized note.
  - `projects` — the curated five. Neutral fields (`slug`, `name`, `tech`, `links`,
    `image`) sit beside localized text in `en` and `id`.
  - `featuredRepoSlugs` — repos excluded from the explorer.
- `src/config/ui.js` — navigation, buttons, section headings, explorer states,
  detail-page labels, CV headings, and empty/error messages.

The printed CV imports the same values, so a correction changes both the website and
the PDF. The exception is `profile.cvAchievement`, which is deliberately CV-only.

### Adding or removing a language

1. Add the language key to `ui` in `src/config/ui.js`.
2. Add the same key to every localized object in `portfolio.js` (`role`, `focus`,
   `intro`, `about`, `cvAchievement`, project text, skill labels/notes).
3. Add the option to `LanguageToggle.jsx` and `getInitialLanguage()`.
4. Add the language name to `ui.en.language` and `ui.id.language`.

The switch is not a translation widget: both languages are written content. Technical
names such as GitHub, Node.js and PostgreSQL stay unchanged.

---

## Languages

- The toggle in the header switches **EN / ID** and stores the choice in
  `localStorage` (`language`).
- On a first visit, the browser language decides: `id-*` → Indonesian, everything
  else → English.
- `<html lang>` is updated, and the printed CV follows the active language.
- Project detail pages keep the selected language across navigation.
- Relative dates in the repository explorer are localized too
  (`updated 3 months ago` / `diperbarui 3 bulan lalu`).

---

## Full-screen section navigation

- The home route has six snap sections: hero, About, Projects, Skills, Repositories and
  Contact.
- `#scroll-root` is the page’s outer scrolling element. It sits below the 4rem
  header and fills the remaining `100svh`; individual sections may scroll inside it.
- On `/`, the scroller uses `scroll-snap-type: y mandatory`. Every section is
  `calc(100svh - 4rem)` tall and has `scroll-snap-align: start`.
- Sections that fit are vertically centered with `justify-content: safe center`.
  When content is taller than the viewport — Projects at most widths, and Skills,
  Repositories and some shorter sections on small phones — the section scrolls
  internally. Content is never clipped.
- The footer is a final `scroll-snap-align: end` stop, so it remains reachable after
  Contact.
- Anchor links use native hash navigation and `scroll-behavior: smooth`.
  `prefers-reduced-motion` switches that to `auto`. Section links reset the target's
  internal scroll to the top, so a previously scrolled card grid reopens at its heading.
- A 2px progress line below the header tracks overall progress. At `xl` widths, a
  right-hand rail links to every section and labels the active one. The header nav also
  marks the current section with `aria-current`.
- Below `lg`, a small “Scroll for more” pill appears while the active section has
  content below the fold. It disappears at the end of that section and is hidden for
  sections that already fit.
- Sections are focusable. PageDown scrolls a tall section internally and continues to
  the next section once it reaches the end; wheel and touch scrolling chain the same way.
- Deep links such as `/#skills` are restored after React renders. Back/forward between
  section hashes realigns the scroller instead of trusting the browser's restored pixel
  position.
- Project detail pages opt out of snapping. They use the same container for normal
  vertical scrolling, with the rail and progress line hidden.
- The mobile menu is an absolute overlay, so opening it does not resize the section
  scroller.

---

## Project pages and routing

- `/` — the full-screen home page.
- `/projects/<slug>` — the full project narrative: problem, approach, what it does,
  how it works, implementation decisions, data model, challenges and limitations.
- The five project cards link to these pages. The cards themselves stay short; the
  length is moved behind one click.
- Page routes use the History API, so URLs stay clean. Hashes are reserved for in-page
  section links (`/#projects`, `/#contact`).
- GitHub Pages has no SPA fallback. `public/404.html` stores the intended path in
  `sessionStorage` and returns to the app, which restores it before React routes.
- **If the repository is renamed**, update the `/example-portfolio/` prefix in three
  places: `vite.config.js` (`base`), `public/404.html`, and the restore script in
  `index.html`.

The about summary and the repository list use progressive disclosure as well: the
first two paragraphs stay visible, the remaining public paragraph expands in place, and
the explorer shows six repositories with a clear “Show all” control.

---

## GitHub repository explorer

- Calls `https://api.github.com/users/yussyafridayusfi/repos?sort=updated&per_page=100`
  on first load, then reuses a 5-minute `sessionStorage` cache.
- Filters out forks and archived repositories.
- Excludes the five featured projects so nothing appears twice.
- Provides search, language filter (with counts), and sort by recent activity or name.
- Shows six repositories at a time; **Show all** expands the full list and **Show
  fewer** collapses it again. Changing search, language or sort keeps the current
  expanded/collapsed choice, so the control never moves unexpectedly.
- Handles loading, empty results, network failure, non-2xx responses, timeouts
  (12 s) and rate limiting. Rate-limit errors show the reset time and a link to the
  GitHub profile.
- Results are cached in `sessionStorage` for **5 minutes** under
  `github-repos-cache-v2`, so a repository removed on GitHub disappears after the
  next refresh rather than lingering for the rest of the day. Bumping the cache key
  is the deliberate way to invalidate existing sessions.
- **No token is used.** A personal access token in front-end code is public the
  moment the site ships, so the API is called anonymously. If the site ever needs
  more requests, the correct fix is a server-side proxy, not a browser token.

The explorer is the source of truth for repository membership. Static copy avoids a
hard-coded repository count so removals and additions do not make the page stale.

---

## Print CV

The **Print CV** buttons call `window.print()`. `src/styles/print.css` hides the web
page, shows `CvDocument`, and applies A4 margins. The printout contains:

- full name, role, location and contact links
- profile summary (the public paragraphs plus the 2025 internal innovation award,
  which is deliberately kept off the public About section)
- technical skills grouped by evidence
- five selected projects with stack and repository URL
- contact section

It deliberately contains **no education or employment history**, and no invented
dates, metrics or certifications. Projects use `break-inside: avoid` so a project
description is not split across pages. The current English CV renders as **two A4
pages**: summary, skills and two projects on page 1; three projects and contact on
page 2. The Indonesian CV uses the same layout.

To save as PDF: Print → Destination → *Save as PDF* → A4 → margins *Default*.
Background graphics are not required.

---

## Deployment

### 1. Repository

The site lives in a subfolder of the existing `example-portfolio` repository.
The Vite base path therefore matches that repository name:

```js
// vite.config.js
base: '/example-portfolio/'
```

If you rename the repository or move this folder into its own repository, change
`base` to the new repository name (including leading and trailing slashes) **and**
update the two `/example-portfolio/` references described under routing.

### 2. Workflow

`.github/workflows/deploy.yml` (at the **repository root**, because GitHub only
reads workflows from there):

- triggers on pushes to `master` or `main`, and on manual dispatch
- installs dependencies with `npm ci` in `website-portofolio/`
- builds with `npm run build`
- uploads `website-portofolio/dist` with `actions/upload-pages-artifact`
- deploys with `actions/deploy-pages`

### 3. Enable GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Run the workflow (push, or **Actions → Deploy portfolio to GitHub Pages → Run workflow**).
5. The first deployment prints the URL. It should be
   `https://yussyafridayusfi.github.io/example-portfolio/`.

No `gh-pages` branch and no manual `dist` commit are needed.

### 4. Deployment status

- Deployed from `master` through the workflow above.
- **Live:** `https://yussyafridayusfi.github.io/example-portfolio/`
- Deep links such as `/example-portfolio/projects/sembarang-budal` are served
  through `public/404.html` and restored before React renders.

---

## Why these five projects

All current public repositories were inspected, including READMEs, file trees and
source files. Selection favoured working code, backend logic, data modelling and
documentation over stars or commit counts. The profile currently has **27 public
repositories, none forked or archived**; after excluding the five featured projects,
**22 appear in the explorer**.

| Project | Evidence in the repository | Why it is featured |
|---|---|---|
| **sembarang-budal** | Vue 3 + Express + SQLite; 25 commits; `FEATURES.md` documents reproduced bugs; live demo returns 200 | Only complete full-stack system: cache strategy, upstream resilience, schema design, deployment |
| **HealthLogHistory** | Node 22 + TypeScript; OpenAPI 3.1; Postman collection; `node:test` parser suite; dedupe ordering | Strongest backend discipline: contract-first design, idempotency, deterministic parsing |
| **summary-podcast** | Express + Drizzle + Postgres + Vue 3; committed migrations; scoped CRUD | Clearest evidence of data modelling and API design around a real ORM |
| **Simple-Laravel-Api** | Laravel controllers, routes, migration, token auth | Direct evidence for the Laravel/PHP background; compact and readable |
| **Spotify-EDA-TaylorSwift** | 27 code cells: pandas, seaborn, NLTK, WordCloud | Supporting evidence of data cleaning and exploratory analysis |

### Deliberately not featured

- **booking-app** — clean-architecture folders exist, but use cases and controllers
  are empty and auth returns `501 "Database layer not configured"`. Incomplete.
- **api-express** — description claims a CRUD API with SQL Server, but `server.js`
  only returns a welcome message, and `node_modules` is committed. The claim is not
  supported by the code, so it is not presented.
- **nodejs-api-cleanarch**, **opencode-chat** — no usable source in the repository tree.
- **Netflix-EDA-part-1** — README credits a Kaggle notebook as its source.
- **Data-Analysis-HowTo** — self-described learning roadmap; appears in the explorer.
- **Testing-selenium** — one Behave feature, but a committed `venv/` and
  `chromedriver.exe`; not held up as a portfolio project.
- **LearnVue3, Learn-JS, Learn-React, Learn-Go, React-Playground, intro-nextjs-react,
  Learn-Tableau, Learn-Data-Analyst-365, ReadFileNodeProject,
  3-column-preview-card-component, VS-CodeExtension, this-is-pack,
  create-go-hello-module** — tutorials or exercises.
- **yussyafridayusfi** — GitHub profile configuration repository.

These still appear in the explorer (filtered by fork/archived status), because
hiding them would misrepresent the profile. They are simply not presented as
evidence of engineering ability. Repositories removed from GitHub disappear from the
explorer automatically.

### Accuracy notes

- `summary-podcast`'s `x-user-id` header **scopes** records per browser; it is not
  authentication, and the site says so in the project limitations.
- `Simple-Laravel-Api` is from 2022 and learning-scale. Its validation references a
  `description` field that the migration does not define; the site records this as a
  known limitation rather than describing the endpoint as complete.
- The `sembarang-budal` visual is a real screenshot of the live demo, captured on
  20 October 2026 and stored as a 1600 × 1000 WebP (about 96 KB). It is not a mockup.
  The other four projects have no hosted demo or screenshot, so their detail pages
  show a clearly labelled typographic cover instead of pretending to be one.
- The public About section is intentionally general. The 2025 1st-place internal
  innovation award appears only in the printed CV (`profile.cvAchievement`), not on the
  website.
- No user counts, performance metrics, named employer or certifications are claimed. The
  only dates are the 2020/2021 background and the 2025 award, all taken from the CV.
- The site and its printed CV use `cr.yussyafrida@gmail.com`, confirmed by the owner.
  The earlier `yussyafrida0299@gmail.com` address has been replaced. The phone number
  from the CV is deliberately not published.
- There is no education or employment section, by request.

---

## Verification performed

- `npm run build` succeeds (Vite 7, 1,603 modules; 309.1 kB JS / 97.1 kB gzip and
  30.6 kB CSS / 7.3 kB gzip).
- Full-screen home checked at 320×568, 320×800, 360×800, 390×844, 768×1024,
  834×1112, 1024×768, 1280×800 and 1440×1000. The scroller uses `y mandatory`; every
  section is exactly one scrollport tall (936 px at 1440×1000, 780 px at 390×844,
  504 px at 320×568).
- No horizontal overflow in the document, sections or header at any of those widths.
  Sections that exceed the viewport scroll internally to their last element; nothing is
  clipped.
- Nav links, rail links and `/#section` deep links land exactly on the section start.
  Back/forward between hashes realigns to the hash after the browser's restoration, and
  section links reset a previously scrolled card list to the top.
- Keyboard PageDown, wheel scrolling and wheel chaining past the end of a tall section
  were exercised. The footer is the final snap stop. The mobile menu overlays the page
  at 320 px without changing the scroller height. The “Scroll for more” hint appears
  only for overflowing sections and hides at their end. Reduced motion reports
  `scroll-behavior: auto`.
- Project detail pages disable snapping, scroll normally inside `#scroll-root`, hide the
  rail/progress line, and reach the footer. All five detail pages were checked at 320,
  390, 768 and 1440 px without horizontal overflow or clipped tables.
- The project grid renders **1 / 2 / 3 columns** at 390 / 768 / 1024 px.
- Skills tabs work with mouse and keyboard (Arrow keys, Home, End); the panel and
  `aria-selected` follow focus.
- About details expand in place; the explorer shows six rows, expands to 22, and
  collapses again.
- Explorer tested with live data (22 other repositories), search, language filter,
  empty state, network failure, 403 rate limit with reset time, timeout and retry.
- Language toggle updates visible copy, `<html lang>`, relative dates, the CV and
  `localStorage`; project pages keep the selected language. Indonesian hides the award
  on the site while the CV keeps it.
- Project detail page loads its screenshot (1600 × 1000, natural width confirmed) and
  falls back to the labelled cover for projects without one.
- Print CSS rendered with Playwright: 2 A4 pages in English and Indonesian; summary,
  award and skills on page 1, all five projects and contact across pages 1–2; no clipped
  text or broken entries.
- Lighthouse was not re-run after the full-screen refactor. Earlier compact-layout
  baseline: Accessibility 100, Best Practices 100, SEO 100.

## Remaining tasks for the owner

1. Confirm the repository name stays `example-portfolio`; otherwise update `base` and
   the `/example-portfolio/` prefixes in `index.html` and `public/404.html`.
2. Optionally add a custom domain (`public/CNAME` + DNS), then update `base` to `/`.
3. Keep `src/config/portfolio.js` and `src/config/ui.js` in sync as projects change.
4. Re-run Lighthouse on the deployed URL; the last baseline predates the full-screen
   scroller.
