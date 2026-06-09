/*
 * ======= • ======= • ======= • ======= • =======• =======
 * AniKotoAPI — test.js
 * Repository: https://github.com/Shineii86/AniKotoAPI
 *
 * @description
 *   Integration test suite for AniKotoAPI endpoints.
 *   Tests all major endpoints for correct response format.
 *
 * @author  Shinei Nouzen
 * @license MIT
 * ======= • ======= • ======= • ======= • =======• =======
 */

const BASE = process.env.API_URL || "https://anikototvapi.vercel.app/api";

const tests = [
  { name: "Home", url: "/" },
  { name: "Search", url: "/search?keyword=naruto" },
  { name: "Info", url: "/info?id=road-of-naruto-ggjw8" },
  { name: "Episodes", url: "/episodes/road-of-naruto-ggjw8" },
  { name: "Suggestions", url: "/suggestions?keyword=naruto" },
  { name: "Spotlight", url: "/spotlight" },
  { name: "Trending", url: "/trending" },
  { name: "Top 10", url: "/top-ten" },
  { name: "Random", url: "/random" },
  { name: "Most Popular", url: "/most-popular" },
  { name: "New Release", url: "/new-release" },
  { name: "Schedule", url: "/schedule" },
  { name: "Genre", url: "/genre/action" },
  { name: "Type", url: "/type/tv" },
  { name: "Status", url: "/status/airing" },
  { name: "Health", url: "/health" },
  { name: "Stats", url: "/stats" },
  { name: "OpenAPI", url: "/openapi" },
  { name: "Watch", url: "/watch?slug=road-of-naruto-ggjw8&ep=1" },
  { name: "Search Suggest", url: "/search/suggest?keyword=naruto" },
  { name: "Episodes Ajax", url: "/episodes-ajax/road-of-naruto-ggjw8" },
  { name: "Newly Added", url: "/newly-added" },
  { name: "Trending Sidebar", url: "/trending-sidebar" },
  { name: "Seasons", url: "/seasons/road-of-naruto-ggjw8" },
  { name: "Watch Order", url: "/watch-order/road-of-naruto-ggjw8" },
  { name: "AZ List", url: "/az-list/a" },
  { name: "Filter", url: "/filter?keyword=&genre[]=1" },
  { name: "Episodes By ID", url: "/episodes/1" },
  { name: "Servers", url: "/servers?ids=1" },
  { name: "Mapper Servers", url: "/mapper-servers?malId=21&slug=one-piece-100&timestamp=1234567890" },
];

let passed = 0;
let failed = 0;

async function runTest(test) {
  try {
    const res = await fetch(`${BASE}${test.url}`);
    if (!res.ok) {
      console.log(`❌ ${test.name} - HTTP ${res.status}`);
      failed++;
      return;
    }
    const data = await res.json();
    if (data.success === true && data.results) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name} - Invalid response format`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${test.name} - ${error.message}`);
    failed++;
  }
}
    const data = await res.json();

    if (data.success === true && data.results) {
      console.log(`✅ ${test.name}`);
      passed++;
    } else {
      console.log(`❌ ${test.name} - Invalid response format`);
      failed++;
    }
  } catch (error) {
    console.log(`❌ ${test.name} - ${error.message}`);
    failed++;
  }
}

async function runAll() {
  console.log(`\n🧪 Running ${tests.length} tests...\n`);

  for (const test of tests) {
    await runTest(test);
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${tests.length} total\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runAll();
