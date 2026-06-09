/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — filter.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Provides advanced anime filtering on anikototv.to — supports filtering
 *   by genre, type, status, language, rating, sort order, season, year,
 *   and keyword with full pagination support.
 *
 * @exports
 *   extractFilter
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { GENRE_IDS, TYPE_IDS, STATUS_IDS, RATING_IDS, SORT_IDS } from "../configs/ids.config.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

// ══════════════════════════════════════════════════════════════
// FILTER EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract paginated anime results with multi-criteria filtering ----
/**
 * Builds a filter URL from the given parameters and fetches matching anime
 * from anikototv.to. Supports keyword, genre, type, status, language,
 * rating, sort, season, and year filters — all combinable.
 *
 * @param {Object} params - Filter parameters object
 * @param {string} [params.keyword] - Search keyword to filter by name
 * @param {string} [params.genre] - Comma-separated genre names (e.g. "action,comedy")
 * @param {string} [params.type] - Comma-separated types (e.g. "tv,movie")
 * @param {string} [params.status] - Comma-separated statuses (e.g. "airing,completed")
 * @param {string} [params.language] - Comma-separated languages (e.g. "sub,dub")
 * @param {string} [params.rating] - Comma-separated ratings (e.g. "pg-13,r")
 * @param {string} [params.sort] - Sort order key (e.g. "score", "name")
 * @param {string} [params.season] - Comma-separated seasons (e.g. "winter,spring")
 * @param {string} [params.year] - Comma-separated years (e.g. "2024,2025")
 * @param {number} [params.page=1] - Page number for pagination
 * @returns {Promise<Object>} Object with totalPages count and data array of results
 *
 * @example
 *   const filtered = await extractFilter({ genre: "action", type: "tv", page: 1 });
 *   console.log(filtered.totalPages);
 *   console.log(filtered.data[0].title);
 */
const extractFilter = async (params) => {
  try {
    const queryParams = new URLSearchParams();

    // ---- FEATURE: Build keyword query parameter ----
    // WARNING: keyword param is always set — empty string if not provided (site requires it)
    if (params.keyword) {
      queryParams.set("keyword", params.keyword);
    } else {
      queryParams.set("keyword", "");
    }

    // ---- FEATURE: Map genre names to IDs and append ----
    // NOTE: GENRE_IDS config maps human-readable names to site-specific IDs
    if (params.genre) {
      const genres = params.genre.split(",").map(g => GENRE_IDS[g.trim().toLowerCase()] || g.trim());
      genres.forEach(g => queryParams.append("genre[]", g));
    }

    // ---- FEATURE: Map type names to IDs and append ----
    if (params.type) {
      const types = params.type.split(",").map(t => TYPE_IDS[t.trim().toLowerCase()] || t.trim());
      types.forEach(t => queryParams.append("term_type[]", t));
    }

    // ---- FEATURE: Map status names to IDs and append ----
    if (params.status) {
      const statuses = params.status.split(",").map(s => STATUS_IDS[s.trim().toLowerCase()] || s.trim());
      statuses.forEach(s => queryParams.append("status[]", s));
    }

    // ---- FEATURE: Append language filter ----
    // NOTE: Languages are passed directly without ID mapping
    if (params.language) {
      const langs = params.language.split(",");
      langs.forEach(l => queryParams.append("language[]", l.trim()));
    }

    // ---- FEATURE: Map rating names to IDs and append ----
    if (params.rating) {
      const ratings = params.rating.split(",").map(r => RATING_IDS[r.trim().toLowerCase()] || r.trim());
      ratings.forEach(r => queryParams.append("rating[]", r));
    }

    // ---- FEATURE: Map sort key to sort value ----
    if (params.sort) {
      const sort = SORT_IDS[params.sort.trim().toLowerCase()] ?? params.sort;
      if (sort) queryParams.set("sort", sort);
    }

    // ---- FEATURE: Append season filter ----
    if (params.season) {
      const seasons = params.season.split(",");
      seasons.forEach(s => queryParams.append("season[]", s.trim()));
    }

    // ---- FEATURE: Append year filter ----
    if (params.year) {
      const years = params.year.split(",");
      years.forEach(y => queryParams.append("year[]", y.trim()));
    }

    // NOTE: The filter URL is built by appending query params to the search base URL
    const filterUrl = `${URLS.search}?${queryParams.toString()}`;
    const $ = await extractPages(filterUrl, params.page || 1);
    const totalPages = countPages($);

    const results = [];
    $("#list-items > .item").each((i, el) => {
      const slug = $(el).find("a").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".ani.poster.tip > a > img").attr("src") || "";
      const title = $(el).find(".info .b1 a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find(".info .b1 a.name.d-title").attr("data-jp") || "";
      const animeId = $(el).find(".ani.poster.tip").attr("data-tip") || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".info .meta .m-item:nth-child(2) label").text().trim() || "";
      const rating = $(el).find(".info .meta .m-item.rated span").text().trim() || "";

      if (slug) {
        results.push({
          slug,
          animeId,
          poster,
          title,
          japaneseTitle,
          sub,
          dub,
          total,
          type,
          rating
        });
      }
    });

    return { totalPages, data: results };
  } catch (error) {
    throw error;
  }
};

export { extractFilter };

// ══════════════════════════════════════════════════════════════ END: filter.extractor.js
