# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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