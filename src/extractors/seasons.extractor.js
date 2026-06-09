/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — seasons.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts season information for a specific anime via API.
 *   Returns season data from the internal API endpoint.
 *
 * @exports
 *   extractSeasons
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// SEASONS API EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract season data from internal API ----
/**
 * Fetches season information for a specific anime from the internal API.
 * Returns an array of season objects or empty array on error.
 *
 * @param {string} animeId - The anime ID to fetch seasons for
 * @returns {Promise<Array<Object>>} Array of season objects or empty array
 *
 * @example
 *   const seasons = await extractSeasons("12345");
 *   console.log(seasons.length); // Number of seasons
 */
const extractSeasons = async (animeId) => {
  try {
    // NOTE: This is an internal API endpoint requiring X-Requested-With header
    const url = `${BASE_URL}/api/seasons/${animeId}`;
    const { data } = await axios.get(url, {
      headers: {
        ...headers,
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    return data || [];
  } catch (error) {
    // NOTE: Return empty array on error to maintain consistent API
    throw error;
  }
};

export { extractSeasons };

// ══════════════════════════════════════════════════════════════ END: seasons.extractor.js
