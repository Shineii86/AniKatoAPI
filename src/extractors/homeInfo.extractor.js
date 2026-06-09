/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — homeInfo.extractor.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Extracts homepage data from anikototv.to including spotlight carousel,
 *   trending anime, top airing list, and available genre filters.
 *
 * @exports
 *   extractHomeInfo
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

import * as cheerio from "cheerio";
import axios from "axios";
import { headers } from "../configs/header.config.js";
import { URLS } from "../configs/dataUrl.js";
import { getCache, setCache } from "../helper/cache.helper.js";

// ══════════════════════════════════════════════════════════════
// HOME INFO EXTRACTOR
// ══════════════════════════════════════════════════════════════

// ---- FEATURE: Extract full homepage data (spotlights, trending, top airing, genres) ----
/**
 * Fetches and parses the anikototv.to homepage to extract spotlight carousel,
 * recently updated trending anime, top airing of the day, and genre list.
 *
 * @returns {Promise<Object>} Object containing spotlights, trending, topAiring, and genres arrays
 *
 * @example
 *   const home = await extractHomeInfo();
 *   console.log(home.spotlights.length); // number of spotlight items
 */
const extractHomeInfo = async () => {
  const cached = getCache("home");
  if (cached) return cached;
  try {
    const { data } = await axios.get(URLS.home, { headers });
    const $ = cheerio.load(data);

    // ---- FEATURE: Extract spotlight carousel items from #hotest section ----
    // NOTE: Swiper slides contain the hero carousel on the homepage
    const spotlights = [];
    $("#hotest .swiper-slide.item").each((i, el) => {
      // NOTE: The play button's href contains the /watch/{slug} path
      const slug = $(el).find("a.play").attr("href")?.split("/watch/").pop() || "";
      // NOTE: Poster is set as inline CSS background-image on a div inside .image
      const poster = $(el).find(".image div").attr("style")?.match(/url\(['"]?(.+?)['"]?\)/)?.[1] || "";
      const title = $(el).find("h2.title.d-title").text().trim() || "";
      // NOTE: data-jp attribute holds the Japanese/romaji title variant
      const japaneseTitle = $(el).find("h2.title.d-title").attr("data-jp") || "";
      const description = $(el).find(".desc").text().trim() || "";
      const rating = $(el).find("i.rating").text().trim() || "";
      const quality = $(el).find("i.quality").text().trim() || "";
      // NOTE: sub/dub counts are extracted as integers, defaulting to 0
      const sub = parseInt($(el).find("i.sub").text().trim()) || 0;
      const dub = parseInt($(el).find("i.dub").text().trim()) || 0;
      const date = $(el).find("i.date").text().trim() || "";

      if (slug) {
        spotlights.push({
          slug,
          poster,
          title,
          japaneseTitle,
          description,
          rating,
          quality,
          sub,
          dub,
          date
        });
      }
    });

    // ---- FEATURE: Extract trending/recently-updated anime list ----
    // NOTE: Combines both .section-updated and #recent-update containers for coverage
    const trending = [];
    $(".section-updated .item, #recent-update .item").each((i, el) => {
      const slug = $(el).find("a.name.d-title").attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const title = $(el).find("a.name.d-title").text().trim() || "";
      const japaneseTitle = $(el).find("a.name.d-title").attr("data-jp") || "";
      // NOTE: Episode counts are in .ep-status spans — sub, dub, and total
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const total = parseInt($(el).find(".ep-status.total span").text().trim()) || 0;
      const type = $(el).find(".meta .inner .right").text().trim() || "";

      if (slug) {
        trending.push({
          slug,
          poster,
          title,
          japaneseTitle,
          sub,
          dub,
          total,
          type
        });
      }
    });

    // ---- FEATURE: Extract top airing anime of the day ----
    // NOTE: Only the 'day' tab content is scraped from #top-anime
    const topAiring = [];
    $("#top-anime .tab-content[data-name='day'] a.item").each((i, el) => {
      const slug = $(el).attr("href")?.split("/watch/").pop() || "";
      const poster = $(el).find(".poster img").attr("src") || "";
      const title = $(el).find(".name").text().trim() || "";
      const sub = parseInt($(el).find(".ep-status.sub span").text().trim()) || 0;
      const dub = parseInt($(el).find(".ep-status.dub span").text().trim()) || 0;
      const type = $(el).find(".type").text().trim() || "";

      if (slug) {
        topAiring.push({ slug, poster, title, sub, dub, type });
      }
    });

    // ---- FEATURE: Extract genre filter list from navigation menu ----
    // NOTE: Only links containing /genre/ in href are considered valid genre entries
    const genres = [];
    $("#menu ul.c4 li a").each((i, el) => {
      const genre = $(el).text().trim();
      const href = $(el).attr("href") || "";
      if (genre && href.includes("/genre/")) {
        genres.push(genre);
      }
    });

    return {
      spotlights,
      trending,
      topAiring,
      genres
    };
  } catch (error) {
    throw error;
  }
};

export { extractHomeInfo };

// ══════════════════════════════════════════════════════════════ END: homeInfo.extractor.js
