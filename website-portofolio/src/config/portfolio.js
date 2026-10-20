/**
 * Single source of truth for personal content and project data.
 *
 * Text that appears in the interface is localised under `en` and `id`.
 * Technical names, repository links and stack lists are language-neutral.
 *
 * The summary and skills are taken from the owner's CV
 * (YussyafridaCR_CV.pdf) plus verified repository evidence. No employer
 * sections, education, invented metrics or proficiency scores are included.
 */

export const profile = {
  name: 'Yussyafrida C.R.',
  fullName: 'Yussyafrida Choiriizzati Rochmana',
  githubUsername: 'yussyafridayusfi',
  links: {
    github: 'https://github.com/yussyafridayusfi',
    linkedin: 'https://www.linkedin.com/in/yussyafridacr',
    email: 'cr.yussyafrida@gmail.com',
  },
  role: {
    en: 'Software Developer',
    id: 'Software Developer',
  },
  focus: {
    en: 'Backend Engineering',
    id: 'Backend Engineering',
  },
  location: {
    en: 'Sidoarjo, Indonesia',
    id: 'Sidoarjo, Indonesia',
  },
  intro: {
    en: 'Software developer based in Sidoarjo, Indonesia, building internal business applications since 2021. I work mainly in .NET/C#, Node.js, SQL and PostgreSQL, with a focus on backend APIs, data modelling and automation.',
    id: 'Software developer yang berbasis di Sidoarjo, Indonesia dan sejak 2021 membangun aplikasi bisnis internal. Keseharian saya banyak di .NET/C#, Node.js, SQL, dan PostgreSQL, dengan fokus pada API backend, pemodelan data, dan otomasi.',
  },
  about: {
    en: [
      'I am a software developer with a background in .NET/C#, Node.js, SQL and PostgreSQL. Most of my work sits behind the interface: backend modules and APIs, database modelling, and the validation that keeps bad data out of a system.',
      'I started in 2020 maintaining and extending Laravel applications for client projects, including feature work, fixes and User Acceptance Testing. Since 2021 I have been building internal business applications that support daily operational processes across departments.',
      'Alongside that, I continue to deepen my backend work in Node.js — API design, database schema and migrations, automated tests, and treating error handling as a feature rather than an afterthought. The projects below are the public evidence.',
    ],
    id: [
      'Saya software developer dengan latar belakang .NET/C#, Node.js, SQL, dan PostgreSQL. Sebagian besar pekerjaan saya berada di balik antarmuka: modul backend dan API, pemodelan database, serta validasi yang menjaga data buruk agar tidak masuk ke sistem.',
      'Saya mulai pada 2020 dengan memelihara dan mengembangkan aplikasi Laravel untuk proyek klien, termasuk pengembangan fitur, perbaikan bug, dan User Acceptance Testing. Sejak 2021 saya membangun aplikasi bisnis internal yang mendukung proses operasional harian lintas departemen.',
      'Saat ini saya terus memperdalam pekerjaan backend di Node.js — desain API, skema database dan migrasi, pengujian otomatis, serta memperlakukan error handling sebagai fitur, bukan tambahan. Proyek di bawah ini adalah bukti publiknya.',
    ],
  },
  // Kept out of the public About section, which should stay general. The printed
  // CV still includes it because it is relevant to a job application.
  cvAchievement: {
    en: 'In 2025 I received 1st place in an internal company innovation program for an automation workflow that digitised manual invoicing. That project summarises what I enjoy: removing a repetitive process and replacing it with something reliable.',
    id: 'Pada 2025 saya meraih juara 1 dalam program inovasi internal perusahaan untuk alur otomasi yang mendigitalkan proses invoicing manual. Proyek itu merangkum hal yang saya sukai: menghilangkan proses berulang dan menggantinya dengan sesuatu yang andal.',
  },
}

export const heroFacts = [
  {
    term: { en: 'Based in', id: 'Domisili' },
    detail: { en: 'Sidoarjo, Indonesia', id: 'Sidoarjo, Indonesia' },
  },
  {
    term: { en: 'Experience', id: 'Pengalaman' },
    detail: { en: 'Software developer since 2021', id: 'Software developer sejak 2021' },
  },
  {
    term: { en: 'Looking for', id: 'Sedang mencari' },
    detail: {
      en: 'Software and backend roles, including remote.',
      id: 'Peran software dan backend, termasuk remote.',
    },
  },
]

/**
 * Skills grouped by evidence, not by a score. Labels and notes are localised;
 * technology names stay as they are normally written.
 */
export const skillGroups = [
  {
    key: 'background',
    label: { en: 'Professional background', id: 'Latar belakang profesional' },
    description: {
      en: 'Technologies from day-to-day software development work. The site does not list employers or employment dates.',
      id: 'Teknologi dari pekerjaan pengembangan software sehari-hari. Situs ini tidak mencantumkan nama perusahaan atau tanggal kerja.',
    },
    items: [
      {
        name: 'C# / .NET (ASP.NET, .NET Core)',
        note: {
          en: 'Internal business applications and backend modules',
          id: 'Aplikasi bisnis internal dan modul backend',
        },
      },
      {
        name: 'Node.js',
        note: {
          en: 'Backend development and APIs',
          id: 'Pengembangan backend dan API',
        },
      },
      {
        name: 'SQL Server / PostgreSQL / MySQL',
        note: {
          en: 'Database modelling, queries and optimisation',
          id: 'Pemodelan database, query, dan optimasi',
        },
      },
      {
        name: 'Laravel / PHP',
        note: {
          en: 'Client web applications and feature development',
          id: 'Aplikasi web klien dan pengembangan fitur',
        },
      },
      {
        name: 'JavaScript / TypeScript',
        note: {
          en: 'Application and scripting work',
          id: 'Aplikasi dan scripting',
        },
      },
      {
        name: 'RESTful APIs',
        note: {
          en: 'Design, integration and maintenance',
          id: 'Desain, integrasi, dan pemeliharaan',
        },
      },
      {
        name: 'Git',
        note: {
          en: 'Version control in team workflows',
          id: 'Version control dalam kerja tim',
        },
      },
      {
        name: 'Business process automation',
        note: {
          en: 'Digitising manual operational workflows',
          id: 'Mendigitalkan alur operasional manual',
        },
      },
      {
        name: 'User Acceptance Testing',
        note: {
          en: 'Preparing and documenting acceptance testing',
          id: 'Menyiapkan dan mendokumentasikan pengujian penerimaan',
        },
      },
    ],
  },
  {
    key: 'demonstrated',
    label: { en: 'Demonstrated in public projects', id: 'Ditunjukkan di proyek publik' },
    description: {
      en: 'Implemented in the repositories featured on this site, where the code is readable.',
      id: 'Diimplementasikan di repositori yang ditampilkan di situs ini, dengan kode yang bisa dibaca.',
    },
    items: [
      {
        name: 'Express',
        note: { en: 'Routing, middleware and request validation', id: 'Routing, middleware, dan validasi request' },
      },
      {
        name: 'TypeScript',
        note: { en: 'Typed backend code, run with tsx or compiled', id: 'Kode backend bertipe, dijalankan dengan tsx atau dikompilasi' },
      },
      {
        name: 'Drizzle ORM',
        note: { en: 'Schema and migrations committed to the repository', id: 'Skema dan migrasi yang tersimpan di repositori' },
      },
      {
        name: 'SQLite',
        note: { en: 'Local persistence with indexes and upserts', id: 'Penyimpanan lokal dengan index dan upsert' },
      },
      {
        name: 'Vue 3',
        note: { en: 'Interfaces for full-stack projects', id: 'Antarmuka untuk proyek full-stack' },
      },
      {
        name: 'OpenAPI 3.1',
        note: { en: 'A testable API contract', id: 'Kontrak API yang bisa diuji' },
      },
      {
        name: 'Postman',
        note: { en: 'Request collections with assertions', id: 'Koleksi request dengan assertion' },
      },
      {
        name: 'node:test',
        note: { en: 'Unit tests for the message parser', id: 'Unit test untuk parser pesan' },
      },
      {
        name: 'Python / pandas',
        note: { en: 'Data cleaning and analysis in notebooks', id: 'Pembersihan dan analisis data di notebook' },
      },
    ],
  },
  {
    key: 'learning',
    label: { en: 'Currently developing', id: 'Sedang dikembangkan' },
    description: {
      en: 'Actively being learned or deepened. Not presented as expertise.',
      id: 'Sedang dipelajari atau diperdalam. Tidak disajikan sebagai keahlian.',
    },
    items: [
      {
        name: 'Node.js backend architecture',
        note: { en: 'Structure, layering and separation of concerns', id: 'Struktur, layering, dan pemisahan tanggung jawab' },
      },
      {
        name: 'Testing depth',
        note: { en: 'From a single test file toward broader coverage', id: 'Dari satu file test menuju cakupan yang lebih luas' },
      },
      {
        name: 'Python for data analysis',
        note: { en: 'pandas, matplotlib and seaborn notebooks', id: 'pandas, matplotlib, dan seaborn' },
      },
    ],
  },
]

/**
 * The five curated projects. Card copy is intentionally short; the full
 * technical narrative lives on /projects/<slug>.
 */
export const projects = [
  {
    slug: 'sembarang-budal',
    name: 'sembarang-budal',
    tech: ['Vue 3', 'Vite', 'Express', 'SQLite', 'Leaflet', 'OpenStreetMap', 'Vercel'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/sembarang-budal',
      demo: 'https://sembarang-budal.vercel.app',
    },
    image: 'projects/sembarang-budal.webp',
    en: {
      imageAlt:
        'Live demo of sembarang-budal: a map of Indonesia beside a searchable list of places and category filters.',
      summary: 'A place-search app that answers from a local cache, so it keeps working when free map APIs do not.',
      problem:
        'Free OpenStreetMap services are slow and unreliable: they rate-limit, time out, and sometimes answer “no places here” for an area that is not empty. Proxying them directly makes every search slow and gives wrong answers you cannot see.',
      solution:
        'A place-search app that answers from a local cache first and refreshes in the background, so a search keeps working while the upstream APIs are down.',
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
    id: {
      imageAlt:
        'Demo langsung sembarang-budal: peta Indonesia dengan daftar tempat yang bisa dicari dan filter kategori.',
      summary: 'Aplikasi pencarian tempat yang menjawab dari cache lokal, sehingga tetap berjalan saat API peta gratis bermasalah.',
      problem:
        'Layanan OpenStreetMap gratis lambat dan tidak selalu andal: mereka membatasi laju permintaan, timeout, dan kadang menjawab “tidak ada tempat di sini” untuk area yang sebenarnya tidak kosong. Mem-proxy langsung membuat setiap pencarian lambat dan memberi jawaban salah yang tidak terlihat.',
      solution:
        'Aplikasi pencarian tempat yang menjawab dari cache lokal terlebih dahulu dan memperbarui di latar belakang, sehingga pencarian tetap bekerja saat API upstream mati.',
      highlights: [
        'Pencarian cache-first menjawab dari SQLite dalam milidetik dan tetap bekerja saat API upstream tidak tersedia',
        'Coverage dicatat per kategori, sehingga kategori yang timeout akan dicoba lagi, bukan di-cache sebagai kosong',
        'Query upstream dibatasi dan berjalan di bawah deadline bersama, sehingga layanan yang hang menurunkan kualitas hasil, bukan menggagalkan request',
      ],
      detail: {
        how: [
          'Pencarian memeriksa SQLite untuk tempat di bounding box yang diminta dan apakah tile area sudah tercakup untuk kategori yang dipilih. Area yang sudah hangat dijawab secara lokal.',
          'Pada area dingin, server menjalankan query Nominatim terbatas di bawah deadline, mengembalikan apa pun yang masuk, dan mencatat coverage hanya untuk kategori yang query-nya benar-benar selesai.',
          'Pada host yang berjalan lama, server kemudian terus mengikis area di latar belakang — Overpass untuk cakupan penuh plus ekor panjang query tag — sehingga pencarian berikutnya instan.',
        ],
        decisions: [
          'SQLite melalui node:sqlite dipakai bila runtime menyediakannya, dengan fallback file JSON agar aplikasi tetap berjalan di Node versi lama tanpa dependensi native.',
          'Cooldown live-fetch mencegah satu instance mengambil ulang area pada setiap request ketika coverage tidak pernah mencapai ambang. Tanpa itu, selusin panggilan upstream per page load cukup untuk diblokir API publik gratis.',
          'Tempat digabung dari beberapa sumber dengan Overpass menang saat konflik karena membawa tag terlengkap, sementara sumber yang memberi alamat tetap dipertahankan.',
          'Cooldown sepuluh menit, masa percaya coverage 7 hari, dan ambang coverage 85% adalah konstanta bernama, sehingga trade-off antara kesegaran dan beban terlihat.',
        ],
        schema: [
          'places — satu baris per tempat OSM, dengan index lat/lng dan index kategori untuk query radius',
          'coverage — primary key (tile_key, category_id) yang mencatat tile mana sudah di-scrape untuk kategori mana',
          'geocodes — cache pencarian teks bebas berdasarkan query ternormalisasi agar endpoint tanpa kontrak rate-limit tidak dibanjiri',
          'routes — payload yang di-cache untuk pencarian rute berulang',
        ],
        challenges: [
          'Overpass menjawab HTTP 504 pada setiap request karena satu query gabungan berisi 15 sub-statement. Memecahnya per grup kategori mengembalikan 120–325 elemen dalam 2–7 detik. Overpass lalu dipindahkan sepenuhnya dari jalur request, karena 13 detik per kategori akan menghabiskan seluruh budget.',
          'Sebuah mirror regional melaporkan instance khusus Swiss sebagai sukses dengan daftar elemen kosong untuk koordinat Indonesia — tidak bisa dibedakan dari area yang memang kosong. Mirror itu dihapus dan respons tanpa array elements kini dianggap gagal.',
          'Coverage awalnya dicatat untuk kategori yang tidak pernah di-query, sehingga cache menyimpan false negative. Coverage kini hanya dicatat untuk query yang selesai.',
        ],
        limitations: [
          'Pada hosting serverless, filesystem bersifat sementara, sehingga cache berada di /tmp dan hilang saat cold start. Area di-scrape terlebih dahulu ke file seed yang dimuat saat startup.',
          'Background top-up dinonaktifkan di serverless karena proses dibekukan setelah respons dikirim.',
          'Repositori tidak menyertakan test suite otomatis; kebenaran dijelaskan melalui reproduksi bug yang didokumentasikan.',
        ],
      },
    },
  },
  {
    slug: 'HealthLogHistory',
    name: 'HealthLogHistory',
    tech: ['Node 22', 'TypeScript', 'Baileys', 'Google Sheets API', 'OpenAPI 3.1', 'Postman', 'node:test'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/HealthLogHistory',
    },
    image: '',
    en: {
      summary: 'A WhatsApp-to-spreadsheet pipeline that parses health readings deterministically and never logs the same message twice.',
      problem:
        'Manually retyping health readings into a spreadsheet is tedious and error-prone, but a misread blood-sugar value is a real problem — an LLM that hallucinates a number is worse than no automation at all.',
      solution:
        'A WhatsApp listener that parses a fixed message format deterministically, appends it to Google Sheets, and replies with a receipt so a wrong value is visible immediately.',
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
          'The header row and sheet tab are created on first live start, because a new spreadsheet ships with a single Sheet1 tab rather than the expected name.',
        ],
        challenges: [
          'Duplicate delivery is a certainty rather than an edge case: a reconnected WhatsApp socket replays recent history, which would silently duplicate a medical reading.',
          'Date and time are the hardest part of the format. Missing am/pm, dotted markers such as “a.m.”, a missing date, or the word “yesterday” all resolve through explicit rules with warnings, and each case is covered by a test.',
        ],
        limitations: [
          'The dedupe store is a single JSON file, which is correct for one process and would need SQLite or Redis if more than one ever ran.',
          'The transport is an unofficial WhatsApp client, which is why the README documents the migration path to the official API.',
          'The project runs locally; there is no hosted instance to demonstrate.',
        ],
      },
    },
    id: {
      summary: 'Pipeline WhatsApp ke spreadsheet yang mem-parsing bacaan kesehatan secara deterministik dan tidak mencatat pesan yang sama dua kali.',
      problem:
        'Mengetik ulang hasil pemeriksaan kesehatan ke spreadsheet membosankan dan rawan salah, tetapi nilai gula darah yang salah baca adalah masalah nyata — LLM yang berhalusinasi angka lebih buruk daripada tidak ada otomasi sama sekali.',
      solution:
        'Listener WhatsApp yang mem-parsing format pesan tetap secara deterministik, menambahkannya ke Google Sheets, dan membalas dengan tanda terima agar nilai yang salah langsung terlihat.',
      highlights: [
        'Parser baris deterministik dengan alias key; ambiguitas menghasilkan peringatan, bukan tebakan',
        'Idempotensi berdasarkan message id, dicatat hanya setelah append berhasil, sehingga gangguan Sheets membuat pesan bisa dicoba ulang',
        'Kontrak OpenAPI 3.1 plus koleksi Postman, sehingga jalur tulis bisa diuji tanpa sesi WhatsApp yang login',
      ],
      detail: {
        how: [
          'Lapisan transport (Baileys) mengubah pesan masuk menjadi event pesan kanonik. Semua komponen berikutnya — parse, dedupe, append — digerakkan oleh bentuk itu.',
          'Endpoint HTTP lokal menerima event yang sama, sehingga pipeline bisa diuji tanpa WhatsApp berjalan: koleksi Postman mengirim pesan tertangkap dan meng-assert hasilnya.',
          'Seluruh jalur tulis adalah satu fungsi: dedupe, parse, append, lalu ingat message id. Id disimpan terakhir, sehingga kegagalan di spreadsheet membuat pesan masih bisa dicoba ulang.',
        ],
        decisions: [
          'Kontraknya adalah event pesan, bukan payload WhatsApp, sehingga hanya satu modul kecil yang tahu tentang Baileys. Pindah ke Cloud API resmi berarti menulis satu mapping baru dan tidak ada yang lain.',
          'Parsing sengaja deterministik. Jika nilai ambigu, pengirim mendapat peringatan, bukan koreksi diam-diam.',
          'Dry-run adalah default: baris di-parse dan dicatat tetapi tidak ditulis sampai spreadsheet id dikonfigurasi dan diverifikasi.',
          'Kegagalan Google API ditulis ulang menjadi pesan yang bisa ditindaklanjuti — 403 setelah pembacaan berhasil berarti service account dibagikan sebagai Viewer, bukan Editor, dan pesan errornya menyebutkan itu.',
        ],
        schema: [
          'Baris append-only: received_at, measured_at, time_check_local, blood_sugar, unit, notes, sender_id, sender_name, wa_message_id, dan teks pesan mentah.',
          'Header row dan tab sheet dibuat saat start live pertama, karena spreadsheet baru hanya punya satu tab Sheet1, bukan nama yang diharapkan.',
        ],
        challenges: [
          'Pengiriman duplikat adalah kepastian, bukan edge case: socket WhatsApp yang terhubung ulang memutar ulang riwayat terbaru, yang akan menduplikasi bacaan medis secara diam-diam.',
          'Tanggal dan waktu adalah bagian tersulit dari format. am/pm yang hilang, penanda bertitik seperti “a.m.”, tanggal yang hilang, atau kata “yesterday” semuanya diselesaikan lewat aturan eksplisit dengan peringatan, dan setiap kasus tercakup dalam test.',
        ],
        limitations: [
          'Penyimpanan dedupe adalah satu file JSON, benar untuk satu proses dan perlu SQLite atau Redis jika lebih dari satu proses berjalan.',
          'Transportnya adalah klien WhatsApp tidak resmi, karena itu README mendokumentasikan jalur migrasi ke API resmi.',
          'Proyek berjalan lokal; tidak ada instance yang di-host untuk didemonstrasikan.',
        ],
      },
    },
  },
  {
    slug: 'summary-podcast',
    name: 'summary-podcast',
    tech: ['Node 24', 'Express 4', 'TypeScript', 'Drizzle ORM', 'PostgreSQL', 'Vue 3', 'Vite'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/summary-podcast',
    },
    image: '',
    en: {
      summary: 'Private podcast notes per visitor, with no sign-up.',
      problem:
        'Keeping personal notes about podcast episodes usually means either a public service that wants an account, or a local file you have to manage yourself.',
      solution:
        'A small full-stack app where the backend models and scopes notes per browser, and the Vue front end handles list, view, create and edit without an authentication flow to maintain.',
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
          'Backend and frontend types are checked on every build; the backend runs TypeScript directly through tsx with ESM import paths, so there is no separate build step in development.',
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
    id: {
      summary: 'Catatan podcast privat per pengunjung, tanpa pendaftaran akun.',
      problem:
        'Menyimpan catatan pribadi tentang episode podcast biasanya berarti memakai layanan publik yang meminta akun, atau file lokal yang harus dikelola sendiri.',
      solution:
        'Aplikasi full-stack kecil di mana backend memodelkan dan membatasi catatan per browser, dan front end Vue menangani list, view, create, serta edit tanpa alur autentikasi yang harus dipelihara.',
      highlights: [
        'Skema dengan primary key UUID dan timestamp sadar zona waktu, dibuat sebagai migrasi SQL yang di-commit',
        'Router CRUD generik dengan respons 400 / 404 / 201 / 204 eksplisit dan validasi input sebelum lapisan data',
        'Lapisan data bertipe yang memetakan baris database ke bentuk API publik di satu tempat',
      ],
      detail: {
        how: [
          'Setiap pengunjung mendapat UUID yang disimpan di localStorage. Wrapper fetch bertipe di front end menyisipkannya sebagai header x-user-id pada setiap request.',
          'Middleware Express memvalidasi header itu sebagai UUID dan melampirkannya ke request, sehingga setiap handler dijamin punya scope pengguna.',
          'Router menyediakan list, read, create, update (patch dan put), dan delete, dengan delegasi ke fungsi data-access yang semuanya menerima user id.',
        ],
        decisions: [
          'Drizzle ORM dengan migrasi yang dihasilkan dari skema dan di-commit ke repositori, sehingga bentuk database bisa ditinjau dalam diff.',
          'Tipe backend dan frontend diperiksa pada setiap build; backend menjalankan TypeScript langsung melalui tsx dengan jalur import ESM, sehingga tidak ada langkah build terpisah saat pengembangan.',
          'Vite dev server mem-proxy /api ke backend, sehingga front end tidak perlu tahu URL backend.',
        ],
        schema: [
          'summaries — id (uuid, generated), user_id (text, not null), podcast_name, session_title, url, content, created_at dan updated_at sebagai timestamptz, semuanya not null bila memang wajib.',
        ],
        challenges: [
          'Menjaga router CRUD generik tetap jujur: validasi dan status code berada di handler rute, sementara fungsi data-access bebas dari urusan HTTP.',
        ],
        limitations: [
          'Penting: header x-user-id membatasi catatan, bukan mengautentikasi siapa pun. Pengunjung yang mengetahui UUID lain bisa membaca catatan tersebut. Ini mekanisme pemisahan data, bukan batas keamanan.',
          'Proyek disiapkan untuk Postgres lokal dan tidak memiliki instance yang di-host.',
          'Tidak ada test suite otomatis; itu hal pertama yang perlu ditambahkan.',
        ],
      },
    },
  },
  {
    slug: 'Simple-Laravel-Api',
    name: 'Simple-Laravel-Api',
    tech: ['PHP', 'Laravel', 'Eloquent', 'Token authentication', 'SQL migrations'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/Simple-Laravel-Api',
    },
    image: '',
    en: {
      summary: 'A compact Laravel REST API with token authentication and a validated project resource.',
      problem:
        'A compact reference for the shape of a Laravel API: authentication, validated writes and a resource-shaped response, without the scaffolding of a full application.',
      solution:
        'Token auth with register and login, plus a resource controller covering the full CRUD range behind authentication.',
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
    id: {
      summary: 'REST API Laravel kecil dengan autentikasi token dan resource proyek yang tervalidasi.',
      problem:
        'Referensi ringkas untuk bentuk API Laravel: autentikasi, penulisan tervalidasi, dan respons berbentuk resource, tanpa scaffolding aplikasi penuh.',
      solution:
        'Token auth dengan register dan login, plus resource controller untuk seluruh rentang CRUD di balik autentikasi.',
      highlights: [
        'Register dan login dengan validasi request, password di-hash, dan penerbitan token saat berhasil',
        'Resource controller untuk list, create, read, update, dan delete, dilindungi middleware auth',
        'Lapisan API resource yang membentuk respons JSON alih-alih mengembalikan model mentah',
      ],
      detail: {
        how: [
          'Rute memisahkan endpoint autentikasi publik dari resource route yang memerlukan token valid.',
          'Validasi terjadi di lapisan request: field wajib, batas panjang, dan email unik sebelum apa pun disimpan.',
          'Penulisan database melalui model Eloquent, dengan migrasi yang mendefinisikan tabel projects.',
        ],
        decisions: [
          'Respons dibungkus melalui API resource agar bentuk publik bisa berubah tanpa mengubah model.',
          'Kegagalan validasi mengembalikan payload error terstruktur, bukan 500 generik.',
        ],
        limitations: [
          'Ini proyek awal berskala pembelajaran dari 2022 dan disajikan sebagai itu. Bukan sistem produksi.',
          'README hanya satu baris, dan satu-satunya test adalah bawaan Laravel; deskripsi di atas berasal dari membaca controller, route, dan migrasi.',
          'Validasi create merujuk field description sementara migrasi mendefinisikan name, introduction, location, dan cost — ketidakcocokan yang perlu diperbaiki sebelum endpoint berperilaku seperti yang didokumentasikan.',
        ],
      },
    },
  },
  {
    slug: 'Spotify-EDA-TaylorSwift',
    name: 'Spotify-EDA-TaylorSwift',
    tech: ['Python', 'pandas', 'NumPy', 'matplotlib', 'seaborn', 'NLTK', 'WordCloud', 'Jupyter'],
    links: {
      repo: 'https://github.com/yussyafridayusfi/Spotify-EDA-TaylorSwift',
    },
    image: '',
    en: {
      summary: 'A pandas notebook exploring how Spotify audio features change across release years.',
      problem:
        'A public audio-feature dataset is only useful once it is cleaned, typed and turned into comparisons someone can actually read.',
      solution:
        'A Jupyter notebook that cleans the dataset, then charts how acousticness, danceability, energy, valence and loudness move across release years.',
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
        decisions: [],
        schema: [],
        challenges: [],
        limitations: [
          'This is descriptive exploratory analysis, not modelling or prediction, and it is presented as evidence of data-handling skill rather than data science experience.',
          'The dataset is a public one, and the README for this repository is a single line.',
        ],
      },
    },
    id: {
      summary: 'Notebook pandas yang mengeksplorasi perubahan fitur audio Spotify sepanjang tahun rilis.',
      problem:
        'Dataset fitur audio publik baru berguna setelah dibersihkan, diberi tipe, dan diubah menjadi perbandingan yang benar-benar bisa dibaca.',
      solution:
        'Notebook Jupyter yang membersihkan dataset, lalu memvisualisasikan bagaimana acousticness, danceability, energy, valence, dan loudness bergerak sepanjang tahun rilis.',
      highlights: [
        'Persiapan data sebelum analisis: pengecekan null, parsing datetime, turunan tahun rilis, dan konversi milidetik ke detik',
        'Heatmap korelasi antar fitur audio, lalu line chart rata-rata fitur per tahun',
        'Lagu terpopuler per tahun dan per album, plus word cloud dari nama track dan album',
      ],
      detail: {
        how: [
          'Notebook memuat CSV data track Spotify dan memeriksa struktur serta missing value sebelum ada chart yang digambar.',
          'Chart dikelompokkan berdasarkan release_year menggunakan groupby pandas, sehingga setiap figure menjawab pertanyaan tertentu alih-alih memplot semua kolom.',
        ],
        decisions: [],
        schema: [],
        challenges: [],
        limitations: [
          'Ini analisis eksploratif deskriptif, bukan modelling atau prediksi, dan disajikan sebagai bukti kemampuan mengolah data, bukan pengalaman data science.',
          'Datasetnya publik, dan README repositori ini hanya satu baris.',
        ],
      },
    },
  },
]

export const featuredRepoSlugs = projects.map((project) => project.slug)

export const navItems = [
  { id: 'about' },
  { id: 'projects' },
  { id: 'skills' },
  { id: 'repositories' },
  { id: 'contact' },
]

export const githubApiUrl = `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`
