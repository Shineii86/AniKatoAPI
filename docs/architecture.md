# Architecture

## Project Structure

```
AniKotoAPI/
├── server.js                          # Express entry point, port 4444
├── package.json                       # name: "AniKotoAPI"
├── vercel.json                        # Routes /api/* and /* to server.js
├── .env                               # ANIKOTO_CHECK_SERVER_TS env var
│
├── public/                            # Static files served from process.cwd()
│   ├── index.html                     # Premium landing page (56KB, SVG icons, live console)
│   ├── 404.html                       # Glitch animation error page
│   ├── manifest.json                  # PWA manifest (theme: #A855F7)
│   ├── robots.txt                     # Crawler directives
│   ├── sitemap.xml                    # 4 pages (/, /tos, /privacy, /api)
│   ├── og-image.svg                   # SVG Open Graph image
│   ├── privacy.html                   # Privacy policy (served at /privacy)
│   └── tos.html                       # Terms of service (served at /tos)
│
├── docs/                              # API documentation
│   ├── index.md                       # Overview, quick start, features
│   ├── endpoints.md                   # Full API reference (30 endpoints)
│   ├── streaming.md                   # Streaming flow guide (3-step)
│   ├── examples.md                    # cURL, JavaScript, Python, Node.js
│   └── architecture.md                # This file
│
├── src/
│   ├── configs/
│   │   ├── dataUrl.js                 # URL patterns, BASE_URL: https://anikototv.to
│   │   ├── header.config.js           # Request headers (User-Agent, Referer, etc.)
│   │   └── ids.config.js              # Genre/type/status ID mappings
│   │
│   ├── routes/
│   │   ├── apiRoutes.js               # All route definitions
│   │   └── category.route.js          # genre/:name, type/:name, status/:name
│   │
│   ├── controllers/
│   │   ├── homeInfo.controller.js         # Homepage data
│   │   ├── search.controller.js       # Anime search
│   │   ├── animeInfo.controller.js         # Anime info
│   │   ├── episodeList.controller.js     # Episode list
│   │   ├── servers.controller.js      # Server list
│   │   ├── stream.controller.js       # Stream URL
│   │   ├── suggestion.controller.js   # Anime suggestions
│   │   ├── spotlight.controller.js    # Spotlight anime
│   │   ├── trending.controller.js     # Trending anime
│   │   ├── topten.controller.js       # Top 10
│   │   ├── schedule.controller.js     # Schedule
│   │   ├── random.controller.js       # Random anime
│   │   ├── newRelease.controller.js   # New releases
│   │   ├── popular.controller.js  # Most popular
│   │   ├── category.controller.js        # Genre filter
│   │   ├── category.controller.js         # Type filter
│   │   ├── category.controller.js       # Status filter
│   │   └── filter.controller.js       # Advanced filter
│   │
│   ├── extractors/
│   │   ├── home.extractor.js          # Homepage extraction
│   │   ├── search.extractor.js        # Search results
│   │   ├── info.extractor.js          # Anime details
│   │   ├── episodeList.extractor.js   # Episode list + server_ids
│   │   ├── serverList.extractor.js    # Server list
│   │   ├── streamInfo.extractor.js    # Stream URL extraction
│   │   ├── spotlight.extractor.js     # Spotlight anime
│   │   ├── trending.extractor.js      # Trending anime
│   │   ├── topTen.extractor.js        # Top 10
│   │   ├── schedule.extractor.js      # Schedule
│   │   ├── random.extractor.js        # Random anime
│   │   ├── newRelease.extractor.js    # New releases
│   │   ├── mostPopular.extractor.js   # Most popular
│   │   ├── genre.extractor.js         # Genre filter
│   │   ├── type.extractor.js          # Type filter
│   │   ├── status.extractor.js        # Status filter
│   │   ├── filter.extractor.js        # Advanced filter
│   │   └── suggestion.extractor.js    # Suggestions
│   │
│   └── helper/
│       └── cache.helper.js            # In-memory Map cache, 5-min TTL
│
└── CHANGELOG.md                       # Version history
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Scraping | Cheerio + Axios |
| Deployment | Vercel (Serverless) |
| Caching | In-memory Map with 5-min TTL |
| Static Files | Express static middleware |

## Request Flow

```
Client Request
    ↓
Vercel Routes (/api/* → server.js)
    ↓
Express Router (apiRoutes.js)
    ↓
Controller (e.g., search.controller.js)
    ↓
Extractor (e.g., search.extractor.js)
    ↓
HTTP Request to anikototv.to (with headers)
    ↓
Cheerio parses HTML response
    ↓
Returns structured JSON
    ↓
Client Response
```

## Streaming Flow

```
/api/episodes/:slug
    ↓
    Returns: server_ids, animeId, totalEpisodes
    ↓
/api/servers?ids={server_ids}
    ↓
    Returns: link_id, type (sub/dub), name (HD-1, Vidstream-2, etc.)
    ↓
/api/stream?id={link_id}
    ↓
    Returns: url (stream link), skipData (intro/outro timestamps)
```

## Caching Strategy

- **Type:** In-memory Map
- **TTL:** 5 minutes (300,000ms)
- **Key:** Full request URL
- **Behavior:** First request fetches from source, subsequent requests served from cache
- **Reset:** TTL resets on each access
- **Eviction:** Automatic when TTL expires

## Anti-Bot Protection

The source site monitors AJAX responses for missing `data-ep-id` and `data-link-id` attributes. If these are missing in the `/ajax/server/list` response, it triggers a reCAPTCHA challenge.

**Solution:** The API properly passes `data-ids` to the server list endpoint and parses the JSON response to extract the required attributes.

## Vercel Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

- `/api/*` routes to Express for API handling
- `/*` routes to Express for static file serving
- Static files served from `process.cwd()` (Vercel serverless compatible)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANIKOTO_CHECK_SERVER_TS` | Anti-bot check timestamp from source site |

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "results": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.0 | Web framework |
| cheerio | ^1.0.0-rc.12 | HTML parsing |
| axios | ^1.8.0 | HTTP requests |
| cors | ^2.8.5 | CORS headers |
| cookie-parser | ^1.4.7 | Cookie parsing |
| dotenv | ^16.4.0 | Environment variables |
