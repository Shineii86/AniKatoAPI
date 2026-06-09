# API Endpoints Reference

Base URL: `https://anikototvapi.vercel.app/api`

---

## GET /

Returns homepage data: spotlight anime, trending, top-airing, and genres.

**Response:**

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
        "description": "",
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
    "topAiring": [
      {
        "slug": "wistoria-wand-and-sword-season-2-dua04",
        "poster": "https://cdn.anipixcdn.co/thumbnail/4739d8dbd05dddb73604f6240b83ea68.jpg",
        "title": "Wistoria: Wand and Sword Season 2",
        "sub": 9,
        "dub": 7,
        "type": ""
      }
    ],
    "genres": ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Historical", "Horror", "Isekai", "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shounen", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire"]
  }
}
```

---

## GET /search

Search for anime by keyword.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `keyword` | string | Yes | Search query |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto"
```

**Response:**

```json
{
  "success": true,
  "results": {
    "totalPages": 1,
    "data": [
      {
        "slug": "road-of-naruto-ggjw8/ep-1",
        "animeId": "7174",
        "poster": "https://cdn.anipixcdn.co/thumbnail/abfd676ad3a01f1e8860fecff9f5b8e0.jpg",
        "title": "Road of Naruto",
        "japaneseTitle": "Road of Naruto",
        "sub": 1,
        "dub": 0,
        "total": 0,
        "type": "ONA",
        "rating": "8.55",
        "genres": ["Action", "Fantasy", "Shounen"]
      }
    ]
  }
}
```

---

## GET /info

Get detailed info about an anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Anime slug (e.g., `road-of-naruto-ggjw8`) |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/info?id=road-of-naruto-ggjw8"
```

**Response:**

```json
{
  "success": true,
  "results": {
    "title": "Road of Naruto",
    "type": "ONA",
    "status": "Finished Airing",
    "totalEpisodes": null,
    "synopsis": "In celebration of 20 years of Naruto, Studio Pierrot posted an anniversary PV on their YouTube channel...",
    "malId": "53236",
    "genres": ["Action", "Fantasy", "Shounen"]
  }
}
```

---

## GET /episodes

Get episode list for an anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Anime slug |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/episodes/road-of-naruto-ggjw8"
```

**Response:**

```json
{
  "success": true,
  "results": {
    "animeId": "7174",
    "totalEpisodes": 1,
    "episodes": [
      {
        "id": "110289",
        "episode_no": 1,
        "slug": "1",
        "title": "",
        "active": true,
        "href": "#",
        "server_ids": "SlNVT25JaFlCMnZOeXZ2aG5takIxL2EybGl4TzJoNE1pN3JXdFNlODVocWtTckt1SFR0YUxrNzNhanQ2MEJoVG9UUEZNeWJOMm1uUThpYjNxejhhUEZWMitnNFFtTUNMYjBTc1FJZjZNNFZPNm5LMlVuTnpOU25ScUI1dHVGczM0UzluZ2xITG5qbExabnBDdGphY0VRPT0",
        "timestamp": "1729249503",
        "mal_id": "53236"
      }
    ]
  }
}
```

> **Important:** The `server_ids` field is needed to fetch servers. Pass it to the `/servers` endpoint.

---

## GET /servers

Get available servers for an episode.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `ids` | string | Yes | `server_ids` from `/episodes` response |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/servers?ids=SlNVT25JaFlCMnZOeXZ2aG5takIx..."
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZrOWdjeldjOERLaWNMMXFNbVB3WUJqOHZGS2FSWVgvbVJraVpIV1dQRjRoN01hOFUvYmxsWXFYNGtiR0h5OWdGQWc9PQ",
      "cmid": "animixplay-fqs",
      "sv_id": "1",
      "ep_id": "110289",
      "name": "HD-1"
    },
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZrOWdjeldjOERLaWNMMXFNbVB3WUJqOEZ4cFNpMDdQbnV1S3dNdklpRkhWbzRsVmgxSGx4YWx3LytPcnZXU0RCVHc9PQ",
      "cmid": "animixplay-fqs",
      "sv_id": "2",
      "ep_id": "110289",
      "name": "Vidstream-2"
    }
  ]
}
```

> **Note:** There are usually 3 servers: HD-1 (sub), Vidstream-2 (sub), VidCloud-1 (sub).

---

## GET /stream

Get streaming URL for a server.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | `link_id` from `/servers` response |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/stream?id=MTF1dkFtaW9BRTZPbzJJRElFZUZrOWdjeldjOERLaWNMMXFNbVB3WUJqOHZGS2FSWVgvbVJraVpIV1dQRjRoN01hOFUvYmxsWXFYNGtiR0h5OWdGQWc9PQ"
```

**Response:**

```json
{
  "success": true,
  "results": {
    "linkId": "MTF1dkFtaW9BRTZPbzJJRElFZUZrOWdjeldjOERLaWNMMXFNbVB3WUJqOHZGS2FSWVgvbVJraVpIV1dQRjRoN01hOFUvYmxsWXFYNGtiR0h5OWdGQWc9PQ",
    "url": "https://megaplay.buzz/stream/s-5/94736/sub",
    "skipData": {
      "intro": [0, 0],
      "outro": [0, 0]
    }
  }
}
```

> **Note:** The `url` is a direct stream link. Use it with a video player like HLS.js or Plyr.

---

## GET /suggestions

Get anime suggestions based on keyword.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `keyword` | string | Yes | Partial title for suggestions |

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/suggestions?keyword=naruto"
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "slug": "road-of-naruto-ggjw8/ep-1",
      "poster": "https://cdn.anipixcdn.co/thumbnail/abfd676ad3a01f1e8860fecff9f5b8e0.jpg",
      "title": "Road of Naruto",
      "japaneseTitle": "Road of Naruto"
    }
  ]
}
```

---

## GET /spotlight

Get spotlight (featured) anime.

```bash
curl "https://anikototvapi.vercel.app/api/spotlight"
```

Returns array of spotlight anime with posters, descriptions, ratings, and quality info.

---

## GET /trending

Get currently trending anime.

```bash
curl "https://anikototvapi.vercel.app/api/trending"
```

**Response:**

```json
{
  "success": true,
  "results": [
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
  ]
}
```

---

## GET /top-ten

Get top 10 anime for today, this week, and this month.

```bash
curl "https://anikototvapi.vercel.app/api/top-ten"
```

Returns `{ today: [...], week: [...], month: [...] }`.

---

## GET /schedule

Get anime schedule.

```bash
curl "https://anikototvapi.vercel.app/api/schedule"
```

Returns array of scheduled anime with air times.

---

## GET /random

Get a random anime.

```bash
curl "https://anikototvapi.vercel.app/api/random"
```

**Response:**

```json
{
  "success": true,
  "results": {
    "title": "Massara",
    "type": "ONA",
    "genres": ["Slice of Life", "Music"]
  }
}
```

---

## GET /new-release

Get latest released episodes.

```bash
curl "https://anikototvapi.vercel.app/api/new-release"
```

Returns paginated list of recently released anime episodes.

---

## GET /most-popular

Get most popular anime.

```bash
curl "https://anikototvapi.vercel.app/api/most-popular"
```

Returns paginated list with `totalPages` and `data` array.

---

## GET /genre/:name

Get anime by genre.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Genre name (e.g., `action`, `romance`) |
| `page` | number | No | Page number (default: 1) |

```bash
curl "https://anikototvapi.vercel.app/api/genre/action"
```

Returns paginated anime list filtered by genre.

---

## GET /type/:name

Get anime by type (TV, OVA, Movie, ONA, etc).

```bash
curl "https://anikototvapi.vercel.app/api/type/tv"
```

---

## GET /status/:name

Get anime by status (airing, completed, upcoming).

```bash
curl "https://anikototvapi.vercel.app/api/status/completed"
```

---

## GET /filter

Filter anime with multiple parameters.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `keyword` | string | No | Search keyword (pass empty string if not searching) |
| `genre[]` | number | No | Genre IDs |
| `type` | string | No | TV, OVA, Movie, etc. |
| `status` | string | No | aired, ongoing, upcoming |
| `sort` | string | No | Most watched, score, name, etc. |
| `page` | number | No | Page number |

> **Important:** The `keyword` parameter must be present (even empty) or the site returns a 500 error.

```bash
curl "https://anikototvapi.vercel.app/api/filter?keyword=&genre[]=1"
```

Returns filtered and paginated anime list.

---

## GET /watch

Get full watch page data including servers, trending, and recommended anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | Yes | Anime slug (e.g., `one-piece-100`) |
| `ep` | number | Yes | Episode number |

```bash
curl "https://anikototvapi.vercel.app/api/watch?slug=one-piece-100&ep=1"
```

Returns episode data with server list, trending sidebar, and recommended anime.

---

## GET /search/suggest

Get search autocomplete suggestions.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `keyword` | string | Yes | Search keyword |

```bash
curl "https://anikototvapi.vercel.app/api/search/suggest?keyword=naruto"
```

Returns array of suggestion objects with title, ID, and image.

---

## GET /episodes-ajax/:id

Get AJAX-loaded episode list for an anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Anime ID or slug |

```bash
curl "https://anikototvapi.vercel.app/api/episodes-ajax/one-piece-100"
```

Returns episode list with filters, ranges, and server IDs.

---

## GET /mapper-servers

Get cross-server mapping for gogoanime/anivibe servers.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `malId` | number | Yes | MyAnimeList ID |
| `slug` | string | Yes | Anime slug |
| `timestamp` | number | Yes | Timestamp |

```bash
curl "https://anikototvapi.vercel.app/api/mapper-servers?malId=21&slug=one-piece-100&timestamp=1234567890"
```

Returns mapped server URLs for gogoanime/anivibe.

---

## GET /newly-added

Get newly added anime series.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `page` | number | No | Page number (default: 1) |

```bash
curl "https://anikototvapi.vercel.app/api/newly-added"
```

Returns paginated list of newly added anime.

---

## GET /trending-sidebar

Get trending sidebar widget data.

```bash
curl "https://anikototvapi.vercel.app/api/trending-sidebar"
```

Returns trending anime for sidebar display.

---

## GET /seasons/:id

Get season information for an anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Anime slug |

```bash
curl "https://anikototvapi.vercel.app/api/seasons/one-piece-100"
```

Returns season data including related seasons.

---

## GET /watch-order/:id

Get recommended watch order for an anime.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Anime slug |

```bash
curl "https://anikototvapi.vercel.app/api/watch-order/one-piece-100"
```

Returns recommended watch order sequence.

---

## GET /az-list/:letter

Get anime alphabetically by letter.

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `letter` | string | Yes | Letter (a-z, or # for numbers) |
| `page` | number | No | Page number (default: 1) |

```bash
curl "https://anikototvapi.vercel.app/api/az-list/a"
```

Returns paginated list of anime starting with the specified letter.
