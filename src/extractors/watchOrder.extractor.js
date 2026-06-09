/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — watchOrder.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts watch order information for a specific anime via API.
 *   Returns recommended viewing order from the internal API endpoint.
 *
 * @exports
 *   extractWatchOrder
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import axios from "axios";
import { headers } from "../configs/header.config.js";
import { BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// WATCH ORDER API EXTRACTION
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract watch order data from internal API ----
/**
 * Fetches watch order information for a specific anime from the internal API.
 * Returns an array of watch order objects or empty array on error.
 *
 * @param {string} animeId - The anime ID to fetch watch order for
 * @returns {Promise<Array<Object>>} Array of watch order objects or empty array
 *
 * @example
 *   const watchOrder = await extractWatchOrder("12345");
 *   console.log(watchOrder[0].title); // First anime in watch order
 */
const extractWatchOrder = async (animeId) => {
  try {
    // NOTE: This is an internal API endpoint requiring X-Requested-With header
    const url = `${BASE_URL}/api/watch-order/${animeId}`;
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

export { extractWatchOrder };

// ══════════════════════════════════════════════════════════════ END: watchOrder.extractor.js
