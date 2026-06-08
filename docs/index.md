# AniKotoAPI Documentation

> Free REST API for anime data. Browse, search, stream — no API key required.

## Overview

AniKotoAPI is a free, open-source REST API that provides anime data scraped from [anikototv.to](https://anikototv.to). It's built with Node.js, Express, and Cheerio, and deployed on Vercel.

**Base URL:** `https://anikototvapi.vercel.app/api`

## Quick Start

```bash
# Get homepage data (spotlight, trending, top-airing, genres)
curl https://anikototvapi.vercel.app/api

# Search for anime
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto"

# Get anime info
curl "https://anikototvapi.vercel.app/api/info?id=road-of-naruto-ggjw8"
```

**Live Response — Homepage:**

```json
{
  "success": true,
  "results": {
    "spotlights": [
      {
        "slug": "wistoria-wand-and-sword-season-2-dua04",
        "poster": "https://cdn.anipixcdn.co/background/101f58336250ee0d_1779363645.webp",
        "title": "Wistoria: Wand and Sword Season 2",
        "japaneseTitle": "Tsue to Tsurugi no Wistoria Season 2",
        "rating": "PG-13",
        "quality": "HD"
      }
    ],
    "trending": [
      {
        "slug": "witch-hat-atelier-ikmut/ep-11",
        "poster": "https://cdn.anipixcdn.co/thumbnail/0412057393e8a45b3ba8b16874b6034d.jpg",
        "title": "Witch Hat Atelier",
        "japaneseTitle": "Tongari Boushi no Atelier",
        "sub": 11,
        "dub": 11,
        "total": 13,
        "type": "TV"
      }
    ],
    "topAiring": [...],
    "genres": ["Action", "Adventure", "Cars", "Comedy", ...]
  }
}
```

## Features

- **27 Endpoints** — Home, search, info, episodes, streaming, schedule, and more
- **No API Key** — Just make requests, no registration needed
- **In-Memory Cache** — 5-minute TTL for fast responses
- **CORS Enabled** — Access from any domain
- **JSON Responses** — Standardized `{success, results}` format

## Documentation

- [API Endpoints Reference](endpoints.md) — Complete endpoint documentation with real responses
- [Streaming Flow Guide](streaming.md) — How to get stream URLs step by step
- [Code Examples](examples.md) — cURL, JavaScript, Python (all tested and working)
- [Architecture](architecture.md) — Project structure and design decisions

## Response Format

All endpoints return JSON in this format:

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

## Rate Limiting

There are no explicit rate limits, but the API uses a 5-minute in-memory cache. Repeated requests for the same data will be served from cache.

## Disclaimer

This API is for **educational purposes only**. It scrapes publicly available data from anikototv.to. We are not affiliated with or endorsed by AniKoto. All content belongs to its respective owners.
