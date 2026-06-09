/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — apiRoutes.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Central API router that maps all Express GET endpoints to their
 *   corresponding controller handlers. Each route wraps its controller
 *   in try/catch for consistent error handling.
 *
 * @exports
 *   createApiRoutes - Function that registers all API routes on the Express app
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");


import { getHomeInfo } from "../controllers/homeInfo.controller.js";
import { getAnimeInfo } from "../controllers/animeInfo.controller.js";
import { getSearchResults, getSearchSuggestions } from "../controllers/search.controller.js";
import { getEpisodeList } from "../controllers/episodeList.controller.js";
import { getEpisodeListAjax } from "../controllers/episodeListAjax.controller.js";
import { getStreamInfo, getServerList, getMapperServers } from "../controllers/streamInfo.controller.js";
import { getSchedule } from "../controllers/schedule.controller.js";
import { getSpotlight } from "../controllers/spotlight.controller.js";
import { getTrending } from "../controllers/trending.controller.js";
import { getTopTen } from "../controllers/topten.controller.js";
import { getSuggestions } from "../controllers/suggestion.controller.js";
import { getRandom } from "../controllers/random.controller.js";
import { getPopular } from "../controllers/popular.controller.js";
import { getFilter } from "../controllers/filter.controller.js";
import { getWatchPage } from "../controllers/watchPage.controller.js";
import { getAzList } from "../controllers/azList.controller.js";
import { getNewRelease, getNewlyAdded } from "../controllers/newRelease.controller.js";
import { getStatus } from "../controllers/status.controller.js";
import { getTrendingSidebar } from "../controllers/trendingSidebar.controller.js";
import { getSeasons } from "../controllers/seasons.controller.js";
import { getWatchOrder } from "../controllers/watchOrder.controller.js";
import { categoryRoutes } from "./category.route.js";

// ══════════════════════════════════════════════════════════════
// ROUTE REGISTRATION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Main API route registration function ----
/**
 * Registers all API routes on the Express app instance.
 * Each route delegates to a controller and uses the provided
 * jsonResponse/jsonError helpers for consistent output.
 *
 * @param {object} app - Express application instance
 * @param {Function} jsonResponse - Helper to wrap data in success JSON
 * @param {Function} jsonError - Helper to return error JSON
 *
 * @example
 *   createApiRoutes(app, jsonResponse, jsonError);
 */
const createApiRoutes = (app, jsonResponse, jsonError) => {
  // ══════════════════════════════════════════════════════════════
  // REQUEST COUNTER (must be before all routes)
  // ══════════════════════════════════════════════════════════════

const startTime = Date.now();
let requestCount = 0;
let errorCount = 0;

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    requestCount++;
    res.on("finish", () => {
      if (res.statusCode >= 400) errorCount++;
    });
  }
  next();
});

  // ══════════════════════════════════════════════════════════════
  // HOME
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Homepage data endpoint ----
  app.get("/api/", async (req, res, next) => {
    try {
      await getHomeInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // ANIME INFO
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Anime detail information by slug ----
  app.get("/api/info", async (req, res, next) => {
    try {
      await getAnimeInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // WATCH PAGE
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Watch page data for specific episode ----
  app.get("/api/watch", async (req, res, next) => {
    try {
      await getWatchPage(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // SEARCH
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Full search results with pagination ----
  app.get("/api/search", async (req, res, next) => {
    try {
      await getSearchResults(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Search autocomplete suggestions ----
  app.get("/api/search/suggest", async (req, res, next) => {
    try {
      await getSearchSuggestions(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // EPISODES
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Episode list for anime by ID ----
  app.get("/api/episodes/:id", async (req, res, next) => {
    try {
      await getEpisodeList(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: AJAX-loaded episode list (additional data) ----
  app.get("/api/episodes-ajax/:id", async (req, res, next) => {
    try {
      await getEpisodeListAjax(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // STREAMING
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Stream URL and metadata for episode ----
  app.get("/api/stream", async (req, res, next) => {
    try {
      await getStreamInfo(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Available streaming servers for episode ----
  app.get("/api/servers", async (req, res, next) => {
    try {
      await getServerList(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Mapped servers across multiple episodes ----
  app.get("/api/mapper-servers", async (req, res, next) => {
    try {
      await getMapperServers(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // SCHEDULE
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Anime airing schedule by date ----
  app.get("/api/schedule", async (req, res, next) => {
    try {
      await getSchedule(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // DISCOVERY / HOMEPAGE SECTIONS
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Spotlight/featured anime carousel ----
  app.get("/api/spotlight", async (req, res, next) => {
    try {
      await getSpotlight(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Currently trending anime ----
  app.get("/api/trending", async (req, res, next) => {
    try {
      await getTrending(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Top 10 ranked anime ----
  app.get("/api/top-ten", async (req, res, next) => {
    try {
      await getTopTen(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Auto-complete suggestions by keyword ----
  app.get("/api/suggestions", async (req, res, next) => {
    try {
      await getSuggestions(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Random anime recommendation ----
  app.get("/api/random", async (req, res, next) => {
    try {
      await getRandom(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Most popular anime list ----
  app.get("/api/most-popular", async (req, res, next) => {
    try {
      await getPopular(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Advanced filter/search by parameters ----
  app.get("/api/filter", async (req, res, next) => {
    try {
      await getFilter(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // RELEASE LISTS
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Recently released episodes ----
  app.get("/api/new-release", async (req, res, next) => {
    try {
      await getNewRelease(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Newly added anime series ----
  app.get("/api/newly-added", async (req, res, next) => {
    try {
      await getNewlyAdded(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // SIDEBAR
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Trending sidebar widget data ----
  app.get("/api/trending-sidebar", async (req, res, next) => {
    try {
      await getTrendingSidebar(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // SEASONS & WATCH ORDER
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Season information for anime ----
  app.get("/api/seasons/:id", async (req, res, next) => {
    try {
      await getSeasons(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ---- FEATURE: Recommended watch order for anime ----
  app.get("/api/watch-order/:id", async (req, res, next) => {
    try {
      await getWatchOrder(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

  // ══════════════════════════════════════════════════════════════
  // A-Z LIST
  // ══════════════════════════════════════════════════════════════

  // ---- FEATURE: Alphabetical anime listing ----
  app.get("/api/az-list/:letter", async (req, res, next) => {
    try {
      await getAzList(req, res, next);
    } catch (error) {
      jsonError(res, error.message);
    }
  });

// ══════════════════════════════════════════════════════════════
// CATEGORY ROUTES
// ══════════════════════════════════════════════════════════════

// NOTE: Category routes (genre, type, status) are registered separately
categoryRoutes(app, jsonResponse, jsonError);

// ══════════════════════════════════════════════════════════════
// HEALTH & STATS
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Health check endpoint ----
app.get("/api/health", (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;

  res.json({
    success: true,
    results: {
      status: "healthy",
      version: version,
      uptime: `${hours}h ${minutes}m ${seconds}s`,
      uptimeSeconds: uptime,
      timestamp: new Date().toISOString(),
      node: process.version,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB",
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + "MB",
      },
    },
  });
});

// ---- FEATURE: Cache & API statistics ----
app.get("/api/stats", (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);

  res.json({
    success: true,
    results: {
      uptime: uptime + "s",
      requests: {
        total: requestCount,
        errors: errorCount,
        successRate: requestCount > 0
          ? ((1 - errorCount / requestCount) * 100).toFixed(1) + "%"
          : "100%",
      },
      cache: {
        type: "in-memory",
        ttl: "5 minutes",
        description: "Map-based cache with TTL expiration",
      },
      endpoints: 30,
      timestamp: new Date().toISOString(),
    },
  });
});

// ---- FEATURE: OpenAPI specification ----
app.get("/api/openapi", (req, res) => {
  res.json({
    openapi: "3.0.3",
    info: {
      title: "AniKotoAPI",
      description: "Free REST API for anime data from anikototv.to",
      version: version,
      contact: {
        name: "Shinei Nouzen",
        url: "https://github.com/Shineii86/AniKotoAPI",
      },
    },
    servers: [
      { url: "https://anikototvapi.vercel.app/api", description: "Production" },
    ],
    paths: {
      "/": { get: { summary: "Homepage data", tags: ["Home"] } },
      "/search": { get: { summary: "Search anime", tags: ["Search"] } },
      "/info": { get: { summary: "Anime info", tags: ["Anime"] } },
      "/episodes/{id}": { get: { summary: "Episode list", tags: ["Episodes"] } },
      "/servers": { get: { summary: "Server list", tags: ["Streaming"] } },
      "/stream": { get: { summary: "Stream URL", tags: ["Streaming"] } },
      "/schedule": { get: { summary: "Anime schedule", tags: ["Schedule"] } },
      "/random": { get: { summary: "Random anime", tags: ["Discovery"] } },
      "/top-ten": { get: { summary: "Top 10 rankings", tags: ["Rankings"] } },
      "/trending": { get: { summary: "Trending anime", tags: ["Discovery"] } },
      "/spotlight": { get: { summary: "Spotlight anime", tags: ["Discovery"] } },
      "/most-popular": { get: { summary: "Most popular", tags: ["Rankings"] } },
      "/new-release": { get: { summary: "New releases", tags: ["Releases"] } },
      "/filter": { get: { summary: "Advanced filter", tags: ["Filter"] } },
      "/genre/{name}": { get: { summary: "By genre", tags: ["Categories"] } },
      "/type/{name}": { get: { summary: "By type", tags: ["Categories"] } },
      "/status/{name}": { get: { summary: "By status", tags: ["Categories"] } },
      "/health": { get: { summary: "Health check", tags: ["System"] } },
      "/stats": { get: { summary: "API statistics", tags: ["System"] } },
      "/openapi": { get: { summary: "OpenAPI spec", tags: ["System"] } },
      "/watch": { get: { summary: "Watch page data", tags: ["Streaming"] } },
      "/search/suggest": { get: { summary: "Search suggestions", tags: ["Search"] } },
      "/episodes-ajax/{id}": { get: { summary: "AJAX episode list", tags: ["Episodes"] } },
      "/mapper-servers": { get: { summary: "Mapper servers", tags: ["Streaming"] } },
      "/newly-added": { get: { summary: "Newly added", tags: ["Releases"] } },
      "/trending-sidebar": { get: { summary: "Trending sidebar", tags: ["Discovery"] } },
      "/seasons/{id}": { get: { summary: "Season data", tags: ["Anime"] } },
      "/watch-order/{id}": { get: { summary: "Watch order", tags: ["Anime"] } },
      "/az-list/{letter}": { get: { summary: "A-Z listing", tags: ["Discovery"] } },
      "/suggestions": { get: { summary: "Anime suggestions", tags: ["Search"] } },
    },
    tags: [
      { name: "Home", description: "Homepage data" },
      { name: "Search", description: "Search & suggestions" },
      { name: "Anime", description: "Anime details" },
      { name: "Episodes", description: "Episode lists" },
      { name: "Streaming", description: "Stream URLs & servers" },
      { name: "Schedule", description: "Airing schedule" },
      { name: "Discovery", description: "Random, trending, spotlight" },
      { name: "Rankings", description: "Top 10, most popular" },
      { name: "Releases", description: "New releases" },
      { name: "Filter", description: "Advanced filtering" },
      { name: "Categories", description: "Genre, type, status" },
      { name: "System", description: "Health, stats, OpenAPI" },
    ],
  });
});
};

export { createApiRoutes };

// ══════════════════════════════════════════════════════════════ END: apiRoutes.js