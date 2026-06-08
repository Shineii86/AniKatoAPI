# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.3] - 2026-06-08

### Fixed
- Health endpoint typo: `s` → `seconds` in uptime string formatting
- Request counter middleware moved before route registrations (was never executing)
- Request counter now properly tracks all API requests and errors

## [1.7.2] - 2026-06-08

### Added
- `docs/` folder with complete API documentation using real live API data
  - `docs/index.md` — Overview, quick start with real responses
  - `docs/endpoints.md` — Full API reference (27 endpoints with real data)
  - `docs/streaming.md` — Streaming flow guide (3-step with real data)
  - `docs/examples.md` — Code examples in cURL, JavaScript, Python, Node.js (all tested)
  - `docs/architecture.md` — Project structure, tech stack, design decisions
- `/api/health` — Health check endpoint (uptime, version, memory)
- `/api/stats` — Cache & API statistics (requests, errors, success rate)
- `/api/openapi` — OpenAPI 3.0.3 specification
- Security headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- Request counter middleware for statistics
- `CONTRIBUTING.md` — Contribution guidelines
- `test.js` — Integration test suite (18 endpoints)

### Fixed
- Clean URLs: `/tos` and `/privacy` instead of `/tos.html` and `/privacy.html`
- Added Express routes for clean URL serving
  - `docs/architecture.md` — Project structure, tech stack, design decisions

### Fixed
- `episodeList.extractor.js` — Parse AJAX JSON response, extract `server_ids`, `timestamp`, `mal_id`
- `streamInfo.extractor.js` — Parse server list HTML into structured objects
- `streamInfo.extractor.js` — Parse stream URL from JSON response properly
- Added cheerio import to streamInfo extractor for HTML parsing

## [1.7.1] - 2026-06-08

### Changed
- Updated all Vercel URLs from `anikoto.vercel.app` to `anikototvapi.vercel.app`
- Updated across 80 references in HTML, JS, MD, XML, SVG, JSON files

## [1.7.0] - 2026-06-08

### Changed
- **BREAKING**: Rebranded entire project from `AniKatoAPI` to `AniKotoAPI`
- Renamed all references across 66 files (controllers, extractors, configs, routes)
- Updated README.md, package.json, server.js, all public pages
- Updated GitHub repository URLs from `AniKatoAPI` to `AniKotoAPI`
- Updated Vercel URLs from `anikato.vercel.app` to `anikototvapi.vercel.app`
- Preserved `anikototv.to` domain references (source website, not project name)

## [1.6.0] - 2026-06-08

### Added
- `public/manifest.json` — PWA manifest with theme color, icons, display mode
- `public/robots.txt` — Crawler directives and sitemap reference
- `public/sitemap.xml` — XML sitemap with homepage, API, privacy, and terms pages
- `public/og-image.svg` — SVG Open Graph image with gradient design, title, and tagline
- `public/privacy.html` — Full privacy policy (data collection, third-party, DMCA, cookies)
- `public/tos.html` — Full terms of service (acceptable use, rate limits, liability, DMCA)

### Changed
- Completely rebuilt `public/index.html` from scratch (premium UI/UX)
- Replaced all emojis with inline SVG icons throughout the entire page
- Hero section now features a live interactive API console (fetch, run, see JSON response)
- Console has preset buttons (Home, Search, Stream, Random, Schedule) with one-click switching
- Added scroll-reveal animations via IntersectionObserver (no external libraries)
- Added animated particle system via canvas (60 particles, purple-tinted)
- Added glassmorphism sticky header with scroll-aware background blur
- Added stats section with animated counters (counts up on viewport entry)
- Added infinite scrolling marquee with feature highlights and SVG icons
- Added endpoint explorer with sidebar navigation, multi-language code tabs (cURL, JS, Python)
- Added playground section with 4 interactive cards (search, stream, random, schedule)
- Added CTA section with gradient background
- Added full footer with 4-column grid (brand, API links, resources, legal)
- Rebuilt `public/404.html` with glitch animation effect, scanlines, and SVG icons
- All CSS uses custom properties, no external frameworks

## [1.5.5] - 2026-06-08

### Changed
- Completely redesigned `public/index.html` landing page (AniNewsAPI style)
- Dark theme with ambient floating orb animations, glassmorphism cards, sticky header
- Hero section with terminal-style API preview and animated gradient text
- Stats ribbon (24+ endpoints, 0 API keys, 40+ genres, live data)
- Features grid with 6 cards (search, streaming, metadata, schedule, filters, caching)
- Interactive API endpoint documentation with expandable cards, parameter tables, code examples
- "Try It Live" playground with 4 interactive demos (search, stream, random, schedule)
- Responsive mobile design
- Redesigned `public/404.html` with animated 404 code, floating animation, action buttons

## [1.5.4] - 2026-06-08

### Changed
- Restructured API Endpoints section to match HiAnime-Api documentation style
- Added category headers with blockquote format: `> ## 🏠 GET Home Info`
- Each endpoint now has: Endpoint path, Parameters table, Example of request (curl + JS), Sample Response
- 19 documentation sections covering all API endpoints

## [1.5.3] - 2026-06-08

### Fixed
- Replaced ALL placeholder/example responses in README with real live API data
- Every endpoint now shows actual data from anikototv.to (One Piece, Solo Leveling, Digimon, etc.)
- No more dummy "Anime Title" or generic placeholder objects

## [1.5.2] - 2026-06-08

### Added
- Disclaimer section (educational purposes, 3rd party media, no affiliation)
- Render deploy button alongside Vercel
- JavaScript `import axios` code examples for all 25 API endpoints

## [1.5.1] - 2026-06-08

### Fixed
- Added missing example responses to README for 11 endpoints: episodes-ajax, stream, servers, mapper-servers, new-release, newly-added, schedule, filter, genre/:name, type/:name, status/:name
- All 24 API endpoints now have collapsible live example responses in documentation

## [1.5.0] - 2026-06-08

### Changed
- Complete documentation rewrite of ALL source files (50+ files)
- Added box-style header comments (Project, Author, License) to every file
- Added section headers using double-line box decorators (`═════`)
- Added feature markers (`// ---- FEATURE: XYZ ----`) before every major function
- Added JSDoc comments for EVERY function with @param, @returns, @example
- Added inline notes (NOTE, WARNING, TIP) for non-obvious logic
- Added footer END markers to every module/file
- Matched code style to AlisaReactionBot repository format
- All files now searchable by feature name via grep

## [1.4.0] - 2026-06-08

### Fixed
- Fixed ALL CSS selectors to match actual anikototv.to HTML structure
- Fixed search results (was returning empty data array)
- Fixed anime info page (was returning empty fields)
- Fixed episode list (was returning 0 episodes)
- Fixed most-popular (was returning empty data array)
- Fixed random endpoint (was returning 500 error)
- Fixed filter endpoint (was returning 500 error)
- Fixed suggestions (was returning empty array)
- Added /api/genre/:name, /api/type/:name routes (was returning 404)
- Fixed watch page server/episode extraction
- Fixed rating field to return clean value

## [1.3.0] - 2026-06-08

### Added
- Stream URL extraction via `/ajax/server?get={linkId}` endpoint
- Server list endpoint (`/api/servers?ids={episodeIds}`)
- Mapper API integration for gogoanime/anivibe servers (`/api/mapper-servers`)
- Seasons endpoint (`/api/seasons/:id`)
- Watch order endpoint (`/api/watch-order/:id`)
- Episode list AJAX endpoint (`/api/episodes-ajax/:id`)
- Genre ID mapping for correct filter parameters
- Type, Status, Rating, Sort ID mappings

### Fixed
- Stream extractor now properly extracts video embed URLs
- Filter endpoint now uses correct numeric IDs for genres/types/status
- Watch page extractor captures all data attributes (data-id, data-url, etc.)
- Server list extraction includes all data attributes (link-id, ep-id, cmid, sv-id)

## [1.2.0] - 2026-06-08

### Added
- Watch page endpoint (`/api/watch?slug={slug}&ep={ep}`)
- AZ List endpoint (`/api/az-list/:letter?page={page}`)
- New Release endpoint (`/api/new-release?page={page}`)
- Newly Added endpoint (`/api/newly-added?page={page}`)
- Status endpoint (`/api/status/:status?page={page}`)
- Trending Sidebar endpoint (`/api/trending-sidebar`)
- Complete episode navigation (prev/next)
- Related & recommended anime on watch page
- Server list for video playback
- Next episode schedule data

## [1.1.0] - 2026-06-08

### Fixed
- Corrected HTML selectors based on actual website analysis
- Updated episode list extraction
- Fixed stream info endpoint to use AJAX server list
- Improved error handling

## [1.0.0] - 2026-06-08

### Added
- Initial project setup
- Express.js server with Vercel deployment support
- Home page API endpoint (`/api/`)
- Anime info endpoint (`/api/info?id={anime-slug}`)
- Search endpoint (`/api/search?keyword={keyword}`)
- Search suggestions endpoint (`/api/search/suggest?keyword={keyword}`)
- Episode list endpoint (`/api/episodes/{anime-slug}`)
- Stream info endpoint (`/api/stream?id={episode-id}`)
- Schedule endpoint (`/api/schedule?date={YYYY-MM-DD}`)
- Spotlight endpoint (`/api/spotlight`)
- Trending endpoint (`/api/trending`)
- Top 10 endpoint (`/api/top-ten`)
- Suggestions endpoint (`/api/suggestions?keyword={keyword}`)
- Random anime endpoint (`/api/random`)
- Most popular endpoint (`/api/most-popular?page={page}`)
- Filter endpoint (`/api/filter?{params}`)
- Category endpoints (`/api/{category}?page={page}`)
- Caching system with 5-minute TTL
- CORS configuration with allowed origins
- Public HTML documentation page
- 404 error page
- Dockerfile for containerization
- Render.yaml for Render deployment
- MIT License
- README with API documentation

### Changed
- Updated all extractors to match actual anikototv.to HTML structure
- Changed ID-based lookups to slug-based lookups
- Updated URL patterns to match actual website structure
- Improved CSS selectors for better accuracy