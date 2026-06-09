/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — episodeList.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts the full episode list for a given anime from anikototv.to.
 *   First resolves the anime ID from the watch page, then fetches the
 *   episode list via AJAX endpoint.
 *
 * @exports
 *   extractEpisodeList
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS, BASE_URL } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// EPISODE LIST EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract complete episode list for an anime by slug ----
/**
 * Fetches the anime watch page to resolve the internal anime ID, then
 * queries the AJAX episode list endpoint to get all episodes with their
 * metadata (ID, number, slug, title, active state, href).
 *
 * @param {string} slug - The anime slug identifier (e.g. "naruto-shippuden")
 * @returns {Promise<Object>} Object with animeId, slug, totalEpisodes, and episodes array
 *
 * @example
 *   const episodeData = await extractEpisodeList("one-piece");
 *   console.log(episodeData.totalEpisodes); // e.g. 1100+
 *   console.log(episodeData.episodes[0].episode_no); // 1
 */
const extractEpisodeList = async (slugOrId) => {
  try {
    let animeId = 0;
    let resolvedSlug = slugOrId;

    // NOTE: Accept either numeric anime ID or slug — if numeric, skip watch page fetch
    if (/^\d+$/.test(slugOrId)) {
      animeId = parseInt(slugOrId);
    } else {
      // NOTE: Fetch the watch page to extract the internal anime ID from the slug
      const infoUrl = URLS.watch(slugOrId);
      const { data: infoData } = await axios.get(infoUrl, { headers });
      const $ = cheerio.load(infoData);
      animeId = parseInt($("#watch-main").attr("data-id")) || 0;
    }

    if (!animeId) {
      return { animeId: 0, slug: slugOrId, totalEpisodes: 0, episodes: [] };
    }

    try {
      // NOTE: AJAX endpoint requires X-Requested-With header to return HTML fragment
      const ajaxUrl = `${BASE_URL}/ajax/episode/list/${animeId}`;
      const { data: ajaxRaw } = await axios.get(ajaxUrl, {
        headers: {
          ...headers,
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      // NOTE: AJAX response is JSON {status, result} where result is HTML
      const ajaxHtml = typeof ajaxRaw === "string" ? ajaxRaw : (ajaxRaw?.result || "");
      const $ep = cheerio.load(ajaxHtml);

      // ---- FEATURE: Parse episode list from AJAX response HTML ----
      // NOTE: Episode links have either data-num or data-ep-id attributes
      const episodes = [];
      $ep("a[data-num], a[data-ep-id], a[data-id]").each((i, el) => {
        const epId = $ep(el).attr("data-ep-id") || $ep(el).attr("data-id") || "";
        const epNum = parseInt($ep(el).attr("data-num")) || i + 1;
        const epSlug = $ep(el).attr("data-slug") || "";
        const href = $ep(el).attr("href") || "";
        const epTitle = $ep(el).find(".ep-title, .ep-name").text().trim() || "";
        const isActive = $ep(el).hasClass("active") || false;
        // NOTE: data-ids is the base64-encoded server ID string needed for /api/servers
        const serverIds = $ep(el).attr("data-ids") || "";
        // NOTE: data-timestamp used for mapper API
        const timestamp = $ep(el).attr("data-timestamp") || "";
        const malId = $ep(el).attr("data-mal") || "";

        episodes.push({
          id: epId,
          episode_no: epNum,
          slug: epSlug,
          title: epTitle,
          active: isActive,
          href,
          server_ids: serverIds,
          timestamp,
          mal_id: malId
        });
      });

      return {
        animeId,
        slug: slugOrId,
        totalEpisodes: episodes.length,
        episodes
      };
    } catch (ajaxError) {
      // NOTE: Gracefully return empty list if AJAX call fails (e.g. network issue)
      return {
        animeId,
        slug: slugOrId,
        totalEpisodes: 0,
        episodes: []
      };
    }
  } catch (error) {
    throw error;
  }
};

export { extractEpisodeList };

// ══════════════════════════════════════════════════════════════ END: episodeList.extractor.js
