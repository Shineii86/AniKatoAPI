/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — category.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts anime filtered by category (genre, type, status, etc.).
 *   Supports multiple category types with automatic URL detection.
 *
 * @exports
 *   extractCategory
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { URLS } from "../configs/dataUrl.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

// ══════════════════════════════════════════════════════════════
// CATEGORY FILTER EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract anime filtered by category with pagination ----
/**
 * Fetches and parses anime filtered by category.
 * Automatically detects category type (genre, type, status) from the input.
 *
 * @param {string} category - Category to filter by (e.g., "genre/action", "type/tv", "status/ongoing")
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages and data array
 * @returns {number} return.totalPages - Total number of pages available
 * @returns {Array<Object>} return.data - Array of anime objects
 * @returns {string} return.data[].slug - URL slug for the anime
 * @returns {string} return.data[].animeId - Internal anime ID
 * @returns {string} return.data[].poster - Poster image URL
 * @returns {string} return.data[].title - English title
 * @returns {string} return.data[].japaneseTitle - Japanese title
 * @returns {number} return.data[].sub - Subbed episode count
 * @returns {number} return.data[].dub - Dubbed episode count
 * @returns {number} return.data[].total - Total episode count
 * @returns {string} return.data[].type - Anime type (TV, Movie, etc.)
 * @returns {string} return.data[].rating - Anime rating
 *
 * @example
 *   const actionAnime = await extractCategory("genre/action", 1);
 *   console.log(actionAnime.data[0].title); // First action anime
 *
 *   const tvAnime = await extractCategory("type/tv", 1);
 *   console.log(tvAnime.data[0].title); // First TV anime
 */
const extractCategory = async (category, page = 1) => {
  try {
    // NOTE: Category type is determined by prefix in the category string
    let url;
    if (category.startsWith("genre/")) {
      url = URLS.genre(category.replace("genre/", ""));
    } else if (category.startsWith("type/")) {
      url = URLS.type(category.replace("type/", ""));
    } else if (category.startsWith("status/")) {
      url = URLS.status(category.replace("status/", ""));
    } else {
      // NOTE: Fallback to direct URL construction for unknown category types
      url = `${URLS.home}/${category}`;
    }

    const $ = await extractPages(url, page);
    const totalPages = countPages($);

    const results = [];

    // NOTE: The list items are contained in #list-items container
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

      // NOTE: Only include items with valid slugs
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

export { extractCategory };

// ══════════════════════════════════════════════════════════════ END: category.extractor.js
