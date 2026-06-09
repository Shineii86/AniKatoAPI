/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — filter.controller.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Controller for advanced anime filtering. Accepts multiple query
 *   parameters to filter anime by genre, year, season, type, status,
 *   and more. All parameters are forwarded to the extractor.
 *
 * @exports
 *   getFilter - Express route handler for GET /api/filter
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { extractFilter } from "../extractors/filter.extractor.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// CONTROLLER: FILTER
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Advanced filter endpoint ----
/**
 * Handles GET /api/filter requests. Returns filtered anime list
 * based on provided query parameters.
 *
 * @param {object} req - Express request object
 * @param {string} req.query.genre - Genre filter (optional)
 * @param {string} req.query.year - Year filter (optional)
 * @param {string} req.query.season - Season filter (optional)
 * @param {string} req.query.type - Type filter (optional)
 * @param {string} req.query.status - Status filter (optional)
 * @param {number} req.query.page - Page number (optional, default: 1)
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with filtered anime list
 *
 * @example
 *   GET /api/filter?genre=action&year=2024&type=tv
 *   Response: { success: true, results: { anime, pagination, ... } }
 * NOTE: The cache key uses JSON.stringify of all params for unique caching
 */
const getFilter = async (req, res, next) => {
  try {
    const params = req.query;
    const cacheKey = `filter_${JSON.stringify(params, Object.keys(params).sort())}`;
    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ success: true, results: cached });
    }
    const data = await extractFilter(params);
    setCache(cacheKey, data);
    res.json({ success: true, results: data });
  } catch (error) {
    next(error);
  }
};

export { getFilter };

// ══════════════════════════════════════════════════════════════ END: filter.controller.js