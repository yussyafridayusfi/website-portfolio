/**
 * Single source of truth for every piece of personal or project content.
 *
 * The website and the printed CV both read from this file, so a fact only ever
 * has to be corrected in one place. Everything here is either confirmed by the
 * profile owner or verified against public repository source (see README).
 *
 * There are deliberately no skill ratings, no dates of employment, no metrics
 * and no education entries. If a value cannot be verified, it is not here.
 */

export const profile = {
  name: 'Yussyafrida C.R.',
  role: 'Software Developer',
  focus: 'Backend Engineering',
  githubUsername: 'yussyafridayusfi',
  links: {
    github: 'https://github.com/yussyafridayusfi',
    linkedin: 'https://www.linkedin.com/in/yussyafridacr',
    email: 'yussyafrida0299@gmail.com',
  },
  intro:
    'I build and maintain web applications, with most of my work sitting behind the interface: backend logic, API integration, database access and the validation that keeps bad data out.',
  about: [
    'I work across the stack, but the parts I keep coming back to are the ones a user never sees: how a request is validated, how data is modelled, how a failure in a third-party API is handled instead of crashing a request.',
    'My background is in PHP/Laravel, C# with ASP.NET Core, Vue.js and SQL databases, plus a fair amount of REST API integration between systems that were never designed to talk to each other.',
    'Right now I am deliberately deepening my backend work in Node.js: API design, database schema and migrations, automated tests, and treating error handling as a feature rather than an afterthought. The projects below are where that is happening, so they are also the most honest evidence of what I can currently do.',
    'I am looking for software development and backend engineering roles, including remote positions with international teams.',
  ],
}

/**
 * Skills are grouped by where the experience actually comes from, not by a
 * made-up proficiency score. `note` explains the evidence in one honest line.
 */
export const skillGroups = [
  {
    id: 'background',
    label: 'Professional background',
    description:
      'Technologies from day-to-day software development work. The site does not list employers or employment dates.',
    items: [
      { name: 'PHP / Laravel', note: 'Application and REST API development' },
      { name: 'C# / ASP.NET Core', note: 'Backend services and application logic' },
      { name: 'SQL databases', note: 'Schema design, queries and migrations' },
      { name: 'Vue.js', note: 'Front-end for web applications' },
      { name: 'JavaScript', note: 'Browser and server-side scripting' },
      { name: 'HTML / CSS', note: 'Markup and layout' },
      { name: 'REST API integration', note: 'Consuming and stabilising third-party APIs' },
    ],
  },
  {
    id: 'demonstrated',
    label: 'Demonstrated in public projects',
    description:
      'Implemented in the repositories featured on this page, where the code is readable.',
    items: [
      { name: 'Node.js', note: 'HTTP services, background work and CLI scripts' },
      { name: 'TypeScript', note: 'Typed backend code, run with tsx or compiled' },
      { name: 'Express', note: 'Routing, middleware and request validation' },
      { name: 'PostgreSQL', note: 'Schema design with Drizzle ORM and committed migrations' },
      { name: 'SQLite', note: 'Local persistence with indexes and upserts' },
      { name: 'REST API design', note: 'OpenAPI 3.1 contract and a Postman collection' },
      { name: 'Automated tests', note: 'Parser unit tests written with the built-in node:test runner' },
      { name: 'Git', note: 'Day-to-day version control' },
    ],
  },
  {
    id: 'learning',
    label: 'Currently developing',
    description: 'Actively being learned or deepened. Not presented as expertise.',
    items: [
      { name: 'Node.js backend architecture', note: 'Structure, layering and separation of concerns' },
      { name: 'Testing depth', note: 'Moving from a single test file toward broader coverage' },
      { name: 'Python for data analysis', note: 'pandas, matplotlib and seaborn notebooks' },
    ],
  },
]

/**
 * The five curated projects. Selection and evidence are documented in README.md.
 * `detail` renders only when a project has enough verified material for it.
 */
export const projects = [
  {
    slug: 'sembarang-budal',
    name: 'sembarang-budal',
    summary: 'Find somewhere to go inside a radius you choose.',
    problem:
      'Free OpenStreetMap services are slow and unreliable: they rate-limit, time out, and sometimes answer "no places here" for an area that is not empty. Proxying them directly makes every search slow and gives wrong answers you cannot see.',
    solution:
      'A place-search app that answers from a local cache first and refreshes in the background, so a search keeps working while the upstream APIs are down.',
    tech: [
      'Vue 3',
      'Vite',
      'Express',
      'SQLite (node:sqlite)',
      'Leaflet',
      'OpenStreetMap (Overpass, Nominatim, Photon)',
      'Vercel',
    ],
    links: {
      repo: 'https://github.com/yussyafridayusfi/sembarang-budal',
      demo: 'https://sembarang-budal.vercel.app',
    },
    highlights: [
      'Cache-first search answers from SQLite in milliseconds and keeps working while upstream APIs are unavailable',
      'Coverage is tracked per category, so a category that timed out is retried instead of cached as empty',
      'Bounded upstream queries run under a shared deadline, so a hung service degrades the result instead of failing the request',
    ],
    detail: {
      how: [
        'A search checks SQLite for places inside the requested bounding box and whether the area tiles are already covered for the chosen categories. A warm area is answered locally.',
        'On a cold area the server issues bounded Nominatim queries under a deadline, returns whatever came back, and records coverage only for the categories whose queries actually completed.',
        'On a long-running host it then keeps scraping the area in the background — Overpass for full coverage plus the long tail of tag queries — so the next search is instant.',
      ],
      decisions: [
        'SQLite via node:sqlite is used when the runtime provides it, with a JSON-file fallback so the app still runs on older Node versions without native dependencies.',
        'A live-fetch cooldown stops one instance from re-fetching an area on every request when coverage never reaches its threshold. Without it, a dozen upstream calls per page load is enough to get blocked by a free public API.',
        'Places are merged across sources with Overpass winning on conflicts, because it carries the fullest tag set, while any source contributing an address is kept.',
        'A ten-minute cooldown, a 7-day coverage trust window and an 85% coverage threshold are named constants rather than inline numbers, so the trade-off between freshness and load is visible.',
      ],
      schema: [
        'places — one row per OSM place, with lat/lng indexes and a category index for radius queries',
        'coverage — (tile_key, category_id) primary key recording which tiles have been scraped for which category',
        'geocodes — cached free-text lookups keyed by a normalised query so an unnamed endpoint is not hammered',
        'routes — cached payloads for repeated route lookups',
      ],
      challenges: [
        'Overpass answered HTTP 504 on every request because one generated query bundled 15 sub-statements. Splitting it per category group returned 120–325 elements in 2–7 seconds. Overpass was then moved off the request path entirely, since 13s per category would consume the whole budget.',
        'A regional mirror reported a Swiss-only instance as a success with an empty element list for Indonesian coordinates — indistinguishable from a legitimately empty area. The mirror was removed and a response without an elements array is now treated as a failure.',
        'Coverage was initially claimed for categories that were never queried, which cached a false negative. Coverage is now recorded only for queries that completed.',
      ],
      limitations: [
        'On serverless hosting the filesystem is ephemeral, so the cache lives in /tmp and is lost on a cold start. Areas are pre-scraped into a seed file that is loaded at startup instead.',
        'Background top-up is disabled on serverless, because the process is frozen once the response is sent.',
        'The repository does not include an automated test suite; correctness is argued through the documented bug reproductions.',
      ],
    },
  },
  {
    slug: 'HealthLogHistory',
    name: 'HealthLogHistory',
    summary: 'WhatsApp messages become rows in a spreadsheet, without an LLM guessing the numbers.',
    problem:
      'Manually retyping health readings into a spreadsheet is tedious and error-prone, but a misread blood-sugar value is a real problem — an LLM that hallucinates a number is worse than no automation at all.',
    solution:
      'A WhatsApp listener that parses a fixed message format deterministically, appends it to Google Sheets, and replies with a receipt so a wrong value is visible immediately.',
    tech: [
      'Node 22',
      'TypeScript',
      'Baileys',
      'Google Sheets API v4',
      'OpenAPI 3.1',
      'Postman',
      'node:test',
    ],
    links: {
      repo: 'https://github.com/yussyafridayusfi/HealthLogHistory',
    },
    highlights: [
      'Deterministic line parser with key aliases; ambiguity produces a warning rather than a guess',
      'Idempotency keyed by message id, recorded only after a successful append, so a Sheets outage leaves the message retryable',
      'OpenAPI 3.1 contract plus a Postman collection, so the write path can be exercised without a logged-in WhatsApp session',
    ],
    detail: {
      how: [
        'A transport layer (Baileys) converts an incoming message into a canonical message event. Everything downstream — parse, dedupe, append — is driven by that shape.',
        'A local HTTP endpoint accepts the same event, which is what makes the pipeline testable without WhatsApp running: the Postman collection posts a captured message and asserts on the outcome.',
        'The whole write path is one function: dedupe, parse, append, then remember the message id. The id is stored last, so a failure at the spreadsheet leaves the message eligible for retry.',
      ],
      decisions: [
        'The contract is the message event, not the WhatsApp payload, so only one small module knows about Baileys. Moving to the official Cloud API would mean writing one new mapping and nothing else.',
        'Parsing is deterministic on purpose. Where a value is ambiguous the sender gets a warning back rather than a silent correction.',
        'Dry-run is the default: rows are parsed and logged but not written until a spreadsheet id is configured and verified.',
        'Google API failures are rewritten into actionable messages — a 403 after a successful read means the service account was shared as Viewer instead of Editor, and the error says so.',
      ],
      schema: [
        'Append-only rows: received_at, measured_at, time_check_local, blood_sugar, unit, notes, sender_id, sender_name, wa_message_id and the raw message text.',
        'Header row and sheet tab are created on first live start, because a new spreadsheet ships with a single Sheet1 tab rather than the expected name.',
      ],
      challenges: [
        'Duplicate delivery is a certainty rather than an edge case: a reconnected WhatsApp socket replays recent history, which would silently duplicate a medical reading.',
        'Date and time are the hardest part of the format. Missing am/pm, dotted markers such as "a.m.", a missing date, or the word "yesterday" all resolve through explicit rules with warnings, and each case is covered by a test.',
      ],
      limitations: [
        'The dedupe store is a single JSON file, which is correct for one process and would need SQLite or Redis if more than one ever ran.',
        'The transport is an unofficial WhatsApp client, which is why the README documents the migration path to the official API.',
        'The project runs locally; there is no hosted instance to demonstrate.',
      ],
    },
  },
  {
    slug: 'summary-podcast',
    name: 'summary-podcast',
    summary: 'Private podcast notes per visitor, with no sign-up.',
    problem:
      'Keeping personal notes about podcast episodes usually means either a public service that wants an account, or a local file you have to manage yourself.',
    solution:
      'A small full-stack app where the backend models and scopes notes per browser, and the Vue front end does list, view, create and edit without an authentication flow to maintain.',
    tech: ['Node 24', 'Express 4', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Vue 3', 'Vite'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/summary-podcast',
    },
    highlights: [
      'Schema with a UUID primary key and time-zone-aware timestamps, generated as committed SQL migrations',
      'Generic CRUD router with explicit 400 / 404 / 201 / 204 responses and input validation before the data layer',
      'Typed data-access layer that maps database rows to the public API shape in one place',
    ],
    detail: {
      how: [
        'Each visitor gets a UUID stored in localStorage. A typed fetch wrapper on the front end injects it as an x-user-id header on every request.',
        'Express middleware validates that header as a UUID and attaches it to the request, so every handler is guaranteed a user scope.',
        'The router exposes list, read, create, update (patch and put) and delete, delegating to data-access functions that all take the user id.',
      ],
      decisions: [
        'Drizzle ORM with migrations generated from the schema and committed to the repository, so the database shape is reviewable in a diff.',
        'Backend types and frontend types are checked on every build; the backend runs TypeScript directly through tsx with ESM import paths, so there is no separate build step in development.',
        'The Vite dev server proxies /api to the backend, so the front end never needs to know the backend URL.',
      ],
      schema: [
        'summaries — id (uuid, generated), user_id (text, not null), podcast_name, session_title, url, content, created_at and updated_at as timestamptz, all not null where they must be.',
      ],
      challenges: [
        'Keeping a generic CRUD router honest: validation and status codes live in the route handlers while the data-access functions stay free of HTTP concerns.',
      ],
      limitations: [
        'Important: the x-user-id header scopes records, it does not authenticate anyone. A visitor who knows another UUID could read those records. It is a data-separation mechanism, not a security boundary.',
        'The project is set up for local Postgres and has no hosted instance.',
        'There is no automated test suite; it would be the first thing to add.',
      ],
    },
  },
  {
    slug: 'Simple-Laravel-Api',
    name: 'Simple-Laravel-Api',
    summary: 'A small token-authenticated REST API for managing projects.',
    problem:
      'A compact reference for the shape of a Laravel API: authentication, validated writes and a resource-shaped response, without the scaffolding of a full application.',
    solution:
      'Sanctum/Passport-style token auth with register and login, plus a resource controller covering the full CRUD range behind authentication.',
    tech: ['PHP', 'Laravel', 'Eloquent', 'Token authentication', 'SQL migrations'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/Simple-Laravel-Api',
    },
    highlights: [
      'Register and login with request validation, hashed passwords and token issuance on success',
      'Resource controller for list, create, read, update and delete, protected by auth middleware',
      'API resource layer that shapes the JSON response instead of returning the raw model',
    ],
    detail: {
      how: [
        'Routes split public authentication endpoints from a resource route that requires a valid token.',
        'Validation happens in the request layer: required fields, length limits and unique email checks before anything is persisted.',
        'Database writes go through Eloquent models, with a migration defining the projects table.',
      ],
      decisions: [
        'Responses are wrapped through an API resource so the public shape can change without altering the model.',
        'Validation failures return a structured error payload rather than a generic 500.',
      ],
      limitations: [
        'This is an early, learning-scale project from 2022 and is presented as such. It is not a production system.',
        'The README is a single line, and the only tests are the Laravel defaults; the description above comes from reading the controllers, routes and migration.',
        'The create validation references a description field while the migration defines name, introduction, location and cost — a mismatch that would need fixing before the endpoint behaved as documented.',
      ],
    },
  },
  {
    slug: 'Spotify-EDA-TaylorSwift',
    name: 'Spotify-EDA-TaylorSwift',
    summary: 'Exploratory analysis of audio features across a public Spotify dataset.',
    problem:
      'A public audio-feature dataset is only useful once it is cleaned, typed and turned into comparisons someone can actually read.',
    solution:
      'A Jupyter notebook that cleans the dataset, then charts how acousticness, danceability, energy, valence and loudness move across release years.',
    tech: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'NLTK', 'WordCloud', 'Jupyter'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/Spotify-EDA-TaylorSwift',
    },
    highlights: [
      'Data preparation before analysis: null checks, datetime parsing, a derived release year and milliseconds converted to seconds',
      'Correlation heatmap across audio features, then grouped line charts of feature averages per year',
      'Top songs per year and per album ranked by popularity, plus word clouds built from track and album names',
    ],
    detail: {
      how: [
        'The notebook loads a CSV of Spotify track data and inspects its structure and missing values before any chart is drawn.',
        'Charts are grouped over release_year using pandas groupby, so each figure answers a specific question rather than plotting every column.',
      ],
      limitations: [
        'This is descriptive exploratory analysis, not modelling or prediction, and it is presented as evidence of data-handling skill rather than data science experience.',
        'The dataset is a public one, and the README for this repository is a single line.',
      ],
    },
  },
]

/**
 * Repository names pinned to the "featured" treatment inside the explorer, and
 * excluded from the "other repositories" list to avoid showing the same project
 * twice.
 */
export const featuredRepoSlugs = [
  'sembarang-budal',
  'HealthLogHistory',
  'summary-podcast',
  'Simple-Laravel-Api',
  'Spotify-EDA-TaylorSwift',
]

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const githubApiUrl = `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`
