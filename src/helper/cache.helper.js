/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — cache.helper.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   In-memory caching utility for storing and retrieving API responses.
 *   Implements TTL-based cache invalidation to prevent stale data
 *   while reducing unnecessary requests to the source site.
 *
 * @exports
 *   getCache, setCache, clearCache
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

// ══════════════════════════════════════════════════════════════
// CACHE STORAGE & CONFIGURATION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: In-memory Map-based cache storage ----
/**
 * Internal cache storage using JavaScript Map object.
 * Stores data with timestamps for TTL-based expiration.
 *
 * @type {Map<string, {data: any, timestamp: number}>}
 */
const cache = new Map();

// ---- FEATURE: Cache time-to-live configuration (5 minutes) ----
/**
 * Cache TTL (Time-To-Live) in milliseconds.
 * Default: 5 minutes (300,000 ms).
 * After this duration, cached items are considered stale
 * and will be removed on next access.
 *
 * @type {number}
 * @default 300000
 */
const CACHE_TTL = 5 * 60 * 1000;

// ══════════════════════════════════════════════════════════════
// CACHE OPERATIONS
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Retrieve cached data by key with TTL validation ----
/**
 * Retrieves data from cache if it exists and hasn't expired.
 * Automatically removes stale entries on access.
 *
 * @param {string} key - The cache key to lookup
 * @returns {any|null} Cached data if valid, null if expired or missing
 *
 * @example
 *   // Get cached anime list
 *   const data = getCache("anime-list-action");
 *   if (data) {
 *     // Use cached data
 *   }
 */
const getCache = (key) => {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_TTL) {
    return item.data;
  }
  cache.delete(key);
  return null;
};

// ---- FEATURE: Store data in cache with current timestamp ----
/**
 * Stores data in cache with current timestamp for TTL tracking.
 * Overwrites any existing data for the same key.
 *
 * @param {string} key - The cache key to store under
 * @param {any} data - The data to cache (any serializable type)
 * @returns {void}
 *
 * @example
 *   // Cache anime search results
 *   setCache("search-one-piece", animeResults);
 */
const setCache = (key, data) => {
  // Evict oldest entries if cache is full
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = cache.keys().next().value;
    cache.delete(oldestKey);
  }
  cache.set(key, { data, timestamp: Date.now() });
};

// ---- FEATURE: Clear all cached entries from memory ----
/**
 * Clears all entries from the cache. Use when:
 * - Memory cleanup is needed
 * - Force-refreshing all data
 * - Application restart/reset
 *
 * @returns {void}
 *
 * @example
 *   // Force refresh all cached data
 *   clearCache();
 */
const clearCache = () => {
  cache.clear();
};

export { getCache, setCache, clearCache };
// ══════════════════════════════════════════════════════════════ END: cache.helper.js