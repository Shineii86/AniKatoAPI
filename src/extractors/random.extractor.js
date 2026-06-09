/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — random.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Fetches a random anime from anikototv.to by following the redirect
 *   chain from the random endpoint, then extracts the full anime detail
 *   page metadata from the resolved URL.
 *
 * @exports
 *   extractRandom
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";

// ══════════════════════════════════════════════════════════════
// RANDOM ANIME EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Fetch a random anime and extract its detail metadata ----
/**
 * Hits the random endpoint on anikototv.to which redirects to a random
 * anime page. Follows up to 5 redirects, extracts the final URL to get
 * the slug, then parses the full anime detail page for metadata.
 *
 * @returns {Promise<Object>} Random anime data with slug, title, poster, synopsis, etc.
 *
 * @example
 *   const random = await extractRandom();
 *   console.log(random.title); // random anime title
 *   console.log(random.url);   // full resolved URL
 */
const extractRandom = async () => {
  try {
    // NOTE: maxRedirects=5 ensures we follow the random redirect chain
    // NOTE: validateStatus allows any 2xx/3xx response without throwing
    const { data, request } = await axios.get(URLS.random, {
      headers,
      maxRedirects: 5,
      validateStatus: (status) => status < 400
    });

    // NOTE: responseURL on the request object gives us the final resolved URL after redirects
    const finalUrl = request?.responseURL || URLS.random;
    // NOTE: The slug is extracted from the /watch/{slug} path in the final URL
    const slug = finalUrl.split("/watch/").pop() || "";

    const $ = cheerio.load(data);

    // ---- FEATURE: Extract anime title and identification ----
    const title = $("h1[itemprop='name'].title.d-title").text().trim() || "";
    const japaneseTitle = $("h1[itemprop='name'].title.d-title").attr("data-jp") || "";
    const poster = $("img[itemprop='image']").attr("src") || "";

    // ---- FEATURE: Extract type, synopsis, rating, and anime ID ----
    const type = $(".bmeta .meta:first-child > div:nth-child(1) span").text().trim() || "";
    const synopsis = $(".synopsis .content").text().trim() || "";
    const rating = $("#w-rating .score .value").text().trim() || "";
    const animeId = parseInt($("#watch-main").attr("data-id")) || 0;

    // ---- FEATURE: Extract genres ----
    // NOTE: Genre links are identified by '/genre/' in their href attribute
    const genres = [];
    $(".bmeta .meta:first-child > div:nth-child(5) span a[href*='/genre/']").each((i, el) => {
      genres.push($(el).text().trim());
    });

    return {
      slug,
      animeId,
      title,
      japaneseTitle,
      poster,
      type,
      synopsis,
      rating,
      genres,
      url: finalUrl
    };
  } catch (error) {
    throw error;
  }
};

export { extractRandom };

// ══════════════════════════════════════════════════════════════ END: random.extractor.js
