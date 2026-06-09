# Streaming Flow Guide

This guide explains how to get streaming URLs from AniKotoAPI in 3 steps.

## Overview

```
Step 1: Get Episodes   →  /api/episodes/:slug
Step 2: Get Servers    →  /api/servers?ids={server_ids}
Step 3: Get Stream URL →  /api/stream?id={link_id}
```

---

## Step 1: Get Episodes

Each anime has multiple episodes. Fetch the episode list with the anime slug.

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

> **Key field:** `server_ids` — Pass this to the next step.

---

## Step 2: Get Servers

Each episode has multiple servers. Use the `server_ids` from Step 1.

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/servers?ids=SlNVT25JaFlCMnZOeXZ2aG5takIxL2EybGl4TzJoNE1pN3JXdFNlODVocWtTckt1SFR0YUxrNzNhanQ2MEJoVG9UUEZNeWJOMm1uUThpYjNxejhhUEZWMitnNFFtTUNMYjBTc1FJZjZNNFZPNm5LMlVuTnpOU25ScUI1dHVGczM0UzluZ2xITG5qbExabnBDdGphY0VRPT0"
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
      "name": "HD-1"
    },
    {
      "type": "sub",
      "ep_id": "110289",
      "link_id": "MTF1dkFtaW9BRTZPbzJJRElFZUZrOWdjeldjOERLaWNMMXFNbVB3WUJqOEZ4cFNpMDdQbnV1S3dNdklpRkhWbzRsVmgxSGx4YWx3LytPcnZXU0RCVHc9PQ",
      "cmid": "animixplay-fqs",
      "sv_id": "2",
      "name": "Vidstream-2"
    }
  ]
}
```

> **Key field:** `link_id` — Pick a server and pass its `link_id` to the next step.

---

## Step 3: Get Stream URL

Get the actual streaming URL using the `link_id` from Step 2.

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

> **Done!** Use `results.url` in your video player.

---

## JavaScript Example

```javascript
async function getStreamUrl(animeSlug) {
  // Step 1: Get episodes
  const episodesRes = await fetch(`https://anikototvapi.vercel.app/api/episodes/${animeSlug}`);
  const episodesData = await episodesRes.json();
  const episodes = episodesData.results.episodes;
  
  if (!episodes || episodes.length === 0) {
    throw new Error('No episodes found');
  }
  
  // Use first episode's server_ids
  const serverIds = episodes[0].server_ids;
  
  // Step 2: Get servers
  const serversRes = await fetch(`https://anikototvapi.vercel.app/api/servers?ids=${serverIds}`);
  const serversData = await serversRes.json();
  const servers = serversData.results;
  
  if (!servers || servers.length === 0) {
    throw new Error('No servers found');
  }
  
  // Pick first server (HD-1)
  const linkId = servers[0].link_id;
  
  // Step 3: Get stream URL
  const streamRes = await fetch(`https://anikototvapi.vercel.app/api/stream?id=${linkId}`);
  const streamData = await streamRes.json();
  
  return streamData.results.url; // "https://megaplay.buzz/stream/s-5/94736/sub"
}

// Usage
getStreamUrl('road-of-naruto-ggjw8')
  .then(url => console.log('Stream URL:', url))
  .catch(err => console.error('Error:', err));
```

---

## Python Example

```python
import requests

def get_stream_url(anime_slug):
    base = "https://anikototvapi.vercel.app/api"
    
    # Step 1: Get episodes
    episodes_res = requests.get(f"{base}/episodes/{anime_slug}")
    episodes_data = episodes_res.json()
    episodes = episodes_data['results']['episodes']
    
    if not episodes:
        raise Exception("No episodes found")
    
    server_ids = episodes[0]['server_ids']
    
    # Step 2: Get servers
    servers_res = requests.get(f"{base}/servers", params={"ids": server_ids})
    servers_data = servers_res.json()
    servers = servers_data['results']
    
    if not servers:
        raise Exception("No servers found")
    
    link_id = servers[0]['link_id']
    
    # Step 3: Get stream URL
    stream_res = requests.get(f"{base}/stream", params={"id": link_id})
    stream_data = stream_res.json()
    
    return stream_data['results']['url']

# Usage
url = get_stream_url('road-of-naruto-ggjw8')
print(f"Stream URL: {url}")
```

---

## Player Integration

### HLS.js (HLS Streams)

```html
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<video id="player" controls></video>

<script>
const url = 'https://megaplay.buzz/stream/s-5/94736/sub';
const video = document.getElementById('player');

if (Hls.isSupported()) {
  const hls = new Hls();
  hls.loadSource(url);
  hls.attachMedia(video);
}
</script>
```

### Plyr (MP4 Streams)

```html
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
<video id="player" controls></video>
<script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>

<script>
const player = new Plyr('#player');
player.source = {
  type: 'video',
  sources: [{ src: 'STREAM_URL_HERE' }]
};
</script>
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No episodes found" | Check the anime slug is correct (use `/api/search` first) |
| "No servers found" | The `server_ids` may be invalid, try another episode |
| Stream URL 403 | Some servers require specific referrer headers |
| CORS error | Use a proxy or access from server-side |

---

## Alternative: All-in-One /watch Endpoint

For a simpler approach, use the `/watch` endpoint which returns episode data, servers, and recommendations in a single call.

**Request:**

```bash
curl "https://anikototvapi.vercel.app/api/watch?slug=road-of-naruto-ggjw8&ep=1"
```

**Response includes:**
- Episode data with title, number, and description
- Server list (sub and dub)
- Trending sidebar anime
- Recommended anime
- Next episode schedule

This is useful when you need all watch page data at once instead of making 3 separate requests.
