import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { demoProducts } from "../src/data/fixtures/products.ts";
import {
  normalizeFilters,
  filterProducts,
  catalogUrl,
  isDemoQuery,
} from "../src/lib/catalog.ts";
const materials = ["stainless-steel"];
test("all twelve supplied listings have unique URLs", () => {
  assert.equal(demoProducts.length, 12);
  assert.equal(new Set(demoProducts.map((p) => p.slug)).size, 12);
});
test("mixed function listings participate in both function filters", () => {
  const guiding = filterProducts(
    demoProducts,
    normalizeFilters({ fungsi: "guiding" }, materials),
  );
  const warning = filterProducts(
    demoProducts,
    normalizeFilters({ fungsi: "warning" }, materials),
  );
  assert.equal(guiding.length, 4);
  assert.equal(warning.length, 12);
  assert.ok(guiding.every((p) => p.functionTypes.includes("guiding")));
});
test("shape and function filters intersect correctly", () => {
  const matches = filterProducts(
    demoProducts,
    normalizeFilters({ fungsi: "guiding", bentuk: "studs" }, materials),
  );
  assert.equal(matches.length, 0);
  assert.equal(
    filterProducts(
      demoProducts,
      normalizeFilters({ bentuk: "studs" }, materials),
    ).length,
    8,
  );
  assert.equal(
    filterProducts(
      demoProducts,
      normalizeFilters({ bentuk: "tiles" }, materials),
    ).length,
    1,
  );
  assert.equal(
    filterProducts(
      demoProducts,
      normalizeFilters({ bentuk: "studs-strips" }, materials),
    ).length,
    3,
  );
});
test("search matches names and combines with shape", () => {
  assert.equal(
    filterProducts(
      demoProducts,
      normalizeFilters({ q: "BLACK", bentuk: "studs" }, materials),
    ).length,
    2,
  );
  assert.equal(
    filterProducts(
      demoProducts,
      normalizeFilters({ q: "does not exist" }, materials),
    ).length,
    0,
  );
});
test("invalid and repeated parameters are normalized consistently", () => {
  const f = normalizeFilters(
    {
      fungsi: ["bad", "guiding"],
      material: "beton",
      bentuk: "bad",
      q: "  BLACK  ",
    },
    materials,
  );
  assert.equal(f.fungsi, "");
  assert.equal(f.material, "");
  assert.equal(f.bentuk, "");
  assert.equal(f.q, "BLACK");
});
test("URLs preserve shape, unicode search, and explicit official mode", () => {
  const url = new URL(
    catalogUrl({ demo: true, bentuk: "studs", q: "hitam & perak ×" }),
    "http://localhost",
  );
  assert.equal(url.searchParams.get("q"), "hitam & perak ×");
  assert.equal(url.searchParams.get("bentuk"), "studs");
  assert.equal(catalogUrl({ demo: false }), "/produk?demo=0");
});
test("all catalogue images are generated local WebP with no vendor attribution", async () => {
  for (const p of demoProducts) {
    assert.equal(p.imageKind, "generated");
    assert.equal(p.approved, false);
    assert.ok(!p.source);
    assert.ok(p.image.src.startsWith("/images/products/catalog-v2/"));
    const data = await readFile(
      new URL("../public" + p.image.src, import.meta.url),
    );
    assert.equal(data.toString("ascii", 8, 12), "WEBP");
    assert.ok(data.length < 250000);
  }
});
test("unspecified listing grades and sizes are not invented", () => {
  for (const p of demoProducts.filter((p) => !p.name.includes("304"))) {
    assert.ok(!p.specs.some((s) => s.label.includes("Grade")));
  }
  assert.ok(
    demoProducts.every(
      (p) => !p.specs.some((s) => s.label.toLowerCase().includes("tinggi")),
    ),
  );
});

test("dummy data is available on direct category URLs without query flags", () => {
  assert.equal(isDemoQuery({}), true);
  assert.equal(normalizeFilters({}, materials).demo, true);
  assert.equal(isDemoQuery({ demo: "0" }), false);
  assert.equal(isDemoQuery({ demo: ["0", "1"] }), false);
});
