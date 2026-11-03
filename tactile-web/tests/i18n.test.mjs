import test from "node:test";
import assert from "node:assert/strict";
import {
  translateText,
  localeHref,
  stripLocalePath,
} from "../src/i18n/core.ts";
test("Indonesian content stays unchanged and English copy is translated", () => {
  assert.equal(translateText("Lihat produk", "id"), "Lihat produk");
  assert.equal(translateText("Lihat produk", "en"), "View products");
  assert.equal(translateText("PERMUKAAN KECIL.", "en"), "SMALL SURFACES.");
});
test("locale navigation preserves filters without duplicate prefixes", () => {
  const p = "/produk?fungsi=guiding&bentuk=tiles&demo=1";
  assert.equal(localeHref(p, "en"), "/en" + p);
  assert.equal(localeHref("/en" + p, "en"), "/en" + p);
  assert.equal(localeHref("/en" + p, "id"), p);
  assert.equal(localeHref("/", "en"), "/en");
  assert.equal(
    stripLocalePath("/en/panduan/apa-itu-tactile-indicator"),
    "/panduan/apa-itu-tactile-indicator",
  );
});
test("external links, image assets, and anchors are not rewritten", () => {
  for (const url of [
    "https://wa.me/6281222952857?text=Hello",
    "mailto:sales@example.com",
    "#fungsi",
    "/images/products/catalog-v2/tiles.webp",
  ])
    assert.equal(localeHref(url, "en"), url);
});
test("translation fragments respect word boundaries and leave names intact", () => {
  assert.equal(translateText("produksi", "en"), "produksi");
  assert.equal(
    translateText("Custom 304 Stainless Steel Tactile Studs & Strips", "en"),
    "Custom 304 Stainless Steel Tactile Studs & Strips",
  );
  const value = translateText(
    "Halo, saya ingin konsultasi produk Test (varian 30×30 cm). Detail: http://localhost:3000/en/produk/test",
    "en",
  );
  assert.ok(value.includes("Hello"));
  assert.ok(value.includes("variant 30×30 cm"));
  assert.ok(value.includes("http://localhost:3000/en/produk/test"));
});
