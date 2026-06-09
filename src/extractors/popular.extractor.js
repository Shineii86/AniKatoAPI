/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — popular.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts most viewed/popular anime with pagination support.
 *   Scrapes the most viewed section with page navigation.
 *
 * @exports
 *   extractPopular
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { countPages } from "../helper/countPages.helper.js";
import { extractPages } from "../helper/extractPages.helper.js";

// ══════════════════════════════════════════════════════════════
// POPULAR EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract most viewed/popular anime with pagination ----
/**
 * Fetches and parses the most viewed anime list with pagination.
 * Returns paginated results with total page count.
 *
 * @param {number} page - Page number to fetch (default: 1)
 * @returns {Promise<Object>} Object containing totalPages and data array
 * @returns {number} return.totalPages - Total number of pages available
 * @returns {Array<Object>} return.data - Array of popular anime objects
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
 *   const popular = await extractPopular(1);
 *   console.log(popular.totalPages); // Total pages available
 *   console.log(popular.data[0].title); // First anime title
 */
const extractPopular = async (page = 1) => {
  try {
    // NOTE: extractPages handles pagination and returns parsed Cheerio object
    const $ = await extractPages(URLS.mostViewed, page);
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

export { extractPopular };

// ══════════════════════════════════════════════════════════════ END: popular.extractor.js
