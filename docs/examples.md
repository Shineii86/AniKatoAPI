# Code Examples

All examples are tested and working with the live API.

---

## cURL

### Homepage

```bash
curl "https://anikototvapi.vercel.app/api"
```

### Search

```bash
curl "https://anikototvapi.vercel.app/api/search?keyword=naruto"
```

### Anime Info

```bash
curl "https://anikototvapi.vercel.app/api/info?id=road-of-naruto-ggjw8"
```

### Episodes

```bash
curl "https://anikototvapi.vercel.app/api/episodes/road-of-naruto-ggjw8"
```

### Servers

```bash
SERVER_IDS=$(curl -s "https://anikototvapi.vercel.app/api/episodes/road-of-naruto-ggjw8" | python3 -c "import sys,json; print(json.load(sys.stdin)['results']['episodes'][0]['server_ids'])")
curl "https://anikototvapi.vercel.app/api/servers?ids=$SERVER_IDS"
```

### Stream URL

```bash
LINK_ID=$(curl -s "https://anikototvapi.vercel.app/api/episodes/road-of-naruto-ggjw8" | python3 -c "import sys,json; print(json.load(sys.stdin)['results']['episodes'][0]['server_ids'])" | xargs -I{} curl -s "https://anikototvapi.vercel.app/api/servers?ids={}" | python3 -c "import sys,json; print(json.load(sys.stdin)['results'][0]['link_id'])")
curl "https://anikototvapi.vercel.app/api/stream?id=$LINK_ID"
```

### Random Anime

```bash
curl "https://anikototvapi.vercel.app/api/random"
```

### Schedule

```bash
curl "https://anikototvapi.vercel.app/api/schedule"
```

### Suggestions

```bash
curl "https://anikototvapi.vercel.app/api/suggestions?keyword=one+piece"
```

### Top 10

```bash
curl "https://anikototvapi.vercel.app/api/top-ten"
```

### Filter by Genre

```bash
curl "https://anikototvapi.vercel.app/api/genre/action"
```

### Filter with Parameters

```bash
curl "https://anikototvapi.vercel.app/api/filter?keyword=&genre[]=1&type=tv&status=aired"
```

---

## JavaScript (Browser)

### Homepage

```javascript
async function getHomepage() {
  const res = await fetch('https://anikototvapi.vercel.app/api');
  const data = await res.json();
  
  console.log('Spotlights:', data.results.spotlights.length);
  console.log('Trending:', data.results.trending.length);
  console.log('Top Airing:', data.results.topAiring.length);
  console.log('Genres:', data.results.genres.length);
  
  return data.results;
}

getHomepage();
```

### Search

```javascript
async function searchAnime(keyword) {
  const res = await fetch(`https://anikototvapi.vercel.app/api/search?keyword=${encodeURIComponent(keyword)}`);
  const data = await res.json();
  
  return data.results.data.map(anime => ({
    title: anime.title,
    slug: anime.slug,
    sub: anime.sub,
    dub: anime.dub,
    type: anime.type
  }));
}

searchAnime('naruto').then(results => {
  results.forEach(a => console.log(`${a.title} (${a.type}) — Sub: ${a.sub}, Dub: ${a.dub}`));
});
```

### Anime Info

```javascript
async function getAnimeInfo(slug) {
  const res = await fetch(`https://anikototvapi.vercel.app/api/info?id=${slug}`);
  const data = await res.json();
  
  const info = data.results;
  console.log(`Title: ${info.title}`);
  console.log(`Type: ${info.type}`);
  console.log(`Status: ${info.status}`);
  console.log(`Episodes: ${info.totalEpisodes || 'Unknown'}`);
  console.log(`MAL ID: ${info.malId}`);
  
  return info;
}

getAnimeInfo('road-of-naruto-ggjw8');
```

### Full Streaming Flow

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
  
  // Pick first server
  const linkId = servers[0].link_id;
  
  // Step 3: Get stream URL
  const streamRes = await fetch(`https://anikototvapi.vercel.app/api/stream?id=${linkId}`);
  const streamData = await streamRes.json();
  
  return streamData.results.url;
}

// Usage
getStreamUrl('road-of-naruto-ggjw8')
  .then(url => {
    console.log('Stream URL:', url);
    // Use with video player
  })
  .catch(err => console.error('Error:', err.message));
```

### Random Anime

```javascript
async function getRandomAnime() {
  const res = await fetch('https://anikototvapi.vercel.app/api/random');
  const data = await res.json();
  
  const anime = data.results;
  console.log(`Random: ${anime.title} (${anime.type})`);
  console.log('Genres:', anime.genres.join(', '));
  
  return anime;
}

getRandomAnime();
```

### Filter by Genre

```javascript
async function getAnimeByGenre(genre, page = 1) {
  const res = await fetch(`https://anikototvapi.vercel.app/api/genre/${genre}?page=${page}`);
  const data = await res.json();
  
  return data.results.data.map(anime => ({
    title: anime.title,
    sub: anime.sub,
    dub: anime.dub
  }));
}

getAnimeByGenre('action').then(anime => {
  console.log('Action Anime:');
  anime.forEach(a => console.log(`- ${a.title} (Sub: ${a.sub}, Dub: ${a.dub})`));
});
```

---

## Node.js (with axios)

### Homepage

```javascript
const axios = require('axios');

async function getHomepage() {
  const { data } = await axios.get('https://anikototvapi.vercel.app/api');
  
  console.log('Spotlights:', data.results.spotlights.length);
  console.log('Trending:', data.results.trending.length);
  
  return data.results;
}

getHomepage();
```

### Search

```javascript
const axios = require('axios');

async function searchAnime(keyword) {
  const { data } = await axios.get('https://anikototvapi.vercel.app/api/search', {
    params: { keyword }
  });
  
  return data.results.data;
}

searchAnime('naruto').then(results => {
  results.forEach(a => console.log(`${a.title} (${a.type})`));
});
```

### Full Streaming Flow

```javascript
const axios = require('axios');

async function getStreamUrl(animeSlug) {
  const BASE = 'https://anikototvapi.vercel.app/api';
  
  // Step 1: Get episodes
  const { data: episodesData } = await axios.get(`${BASE}/episodes/${animeSlug}`);
  const episodes = episodesData.results.episodes;
  
  if (!episodes || episodes.length === 0) {
    throw new Error('No episodes found');
  }
  
  const serverIds = episodes[0].server_ids;
  
  // Step 2: Get servers
  const { data: serversData } = await axios.get(`${BASE}/servers`, {
    params: { ids: serverIds }
  });
  const servers = serversData.results;
  
  if (!servers || servers.length === 0) {
    throw new Error('No servers found');
  }
  
  const linkId = servers[0].link_id;
  
  // Step 3: Get stream URL
  const { data: streamData } = await axios.get(`${BASE}/stream`, {
    params: { id: linkId }
  });
  
  return streamData.results.url;
}

// Usage
getStreamUrl('road-of-naruto-ggjw8')
  .then(url => console.log('Stream URL:', url))
  .catch(err => console.error('Error:', err.message));
```

### Episode List

```javascript
const axios = require('axios');

async function getEpisodeList(animeSlug) {
  const { data } = await axios.get(`https://anikototvapi.vercel.app/api/episodes/${animeSlug}`);
  
  const { animeId, totalEpisodes, episodes } = data.results;
  
  console.log(`Anime ID: ${animeId}`);
  console.log(`Total Episodes: ${totalEpisodes}`);
  console.log(`Episodes available: ${episodes.length}`);
  
  episodes.forEach(ep => {
    console.log(`  Episode ${ep.episode_no}: server_ids available = ${!!ep.server_ids}`);
  });
  
  return data.results;
}

getEpisodeList('road-of-naruto-ggjw8');
```

### Suggestions

```javascript
const axios = require('axios');

async function getSuggestions(keyword) {
  const { data } = await axios.get('https://anikototvapi.vercel.app/api/suggestions', {
    params: { keyword }
  });
  
  return data.results;
}

getSuggestions('one piece').then(suggestions => {
  suggestions.forEach(a => console.log(`${a.title} (${a.slug})`));
});
```

### Schedule

```javascript
const axios = require('axios');

async function getSchedule() {
  const { data } = await axios.get('https://anikototvapi.vercel.app/api/schedule');
  
  console.log('Scheduled anime:', data.results.length);
  return data.results;
}

getSchedule();
```
