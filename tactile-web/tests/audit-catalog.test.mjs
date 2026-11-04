import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  coreProducts,
  legacyProductRoutes,
} from "../src/data/core-products.ts";
import { referenceProducts } from "../src/data/reference-products.ts";
import { filterProducts, normalizeFilters } from "../src/lib/catalog.ts";
import { translateText } from "../src/i18n/core.ts";
import { execFileSync } from "node:child_process";

test("nine product families preserve all 37 source models exactly once", () => {
  assert.equal(coreProducts.length, 9);
  const variants = coreProducts.flatMap((p) => p.variants);
  assert.equal(variants.length, 37);
  assert.equal(new Set(variants.map((v) => v.id)).size, 37);
  for (const product of coreProducts) {
    assert.ok(product.name.length <= 50);
    assert.notEqual(translateText(product.name, "en"), product.name);
    assert.equal(product.approved, false);
    // Family-level specs must never attach a model-specific dimension to another model.
    assert.deepEqual(product.specs, [
      { label: "Material", value: "Stainless steel" },
    ]);
    for (const v of product.variants) {
      const index = Number(v.id.slice(-2)) - 1;
      assert.deepEqual(v.specs, referenceProducts[index].specs);
      assert.ok(
        v.sourceUrl.startsWith("https://www.ablinoxprecision.com/product/"),
      );
    }
  }
});
test("all legacy URLs map to an existing family and the original model", () => {
  assert.equal(legacyProductRoutes.length, 37);
  for (const route of legacyProductRoutes) {
    const product = coreProducts.find((p) => p.slug === route.target);
    assert.ok(product);
    assert.ok(product.variants.some((v) => v.id === route.model));
    assert.ok(referenceProducts.some((p) => p.slug === route.slug));
  }
});
test("grade and finish filters match the same model, sort does not mutate source order", () => {
  const p = {
    ...coreProducts[0],
    variants: [
      { id: "a", label: "a", grades: ["304"], finishes: [] },
      { id: "b", label: "b", grades: ["316"], finishes: ["black"] },
    ],
  };
  assert.equal(
    filterProducts(
      [p],
      normalizeFilters({ grade: "304", finishing: "black" }, []),
    ).length,
    0,
  );
  assert.equal(
    filterProducts(
      [p],
      normalizeFilters({ grade: "316", finishing: "black" }, []),
    ).length,
    1,
  );
  const order = coreProducts.map((p) => p.id);
  const sorted = filterProducts(
    coreProducts,
    normalizeFilters({ urutan: "az" }, []),
  );
  assert.deepEqual(
    sorted.map((p) => p.name),
    sorted.map((p) => p.name).sort((a, b) => a.localeCompare(b, "id")),
  );
  assert.deepEqual(
    coreProducts.map((p) => p.id),
    order,
  );
  assert.equal(
    filterProducts(
      coreProducts,
      normalizeFilters({ fungsi: "guiding", bentuk: "studs" }, []),
    ).length,
    0,
  );
});
test("source photographs are real local WebP images", async () => {
  for (const v of coreProducts.flatMap((p) => p.variants)) {
    const bytes = await readFile(
      new URL("../public" + v.image.src, import.meta.url),
    );
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  }
});
test("production ignores localhost origins and suppresses demo query flags", () => {
  const output = execFileSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "-e",
      `import {siteUrl,siteIndexable} from './src/config/site.ts'; import {catalogUrl,demoSuffix,isDemoQuery} from './src/lib/catalog.ts'; console.log(JSON.stringify({siteUrl,siteIndexable,url:catalogUrl({demo:true,grade:'304'}),suffix:demoSuffix(true),demo:isDemoQuery({demo:'0'})}));`,
    ],
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
        SITE_INDEXABLE: "true",
      },
    },
  );
  const result = JSON.parse(output);
  assert.equal(result.siteUrl, "https://tactile-indicator.vercel.app");
  assert.equal(result.siteIndexable, true);
  assert.equal(result.url, "/produk?grade=304");
  assert.equal(result.suffix, "");
  assert.equal(result.demo, true);
  const preview = execFileSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "-e",
      `import {siteIndexable} from './src/config/site.ts'; console.log(siteIndexable);`,
    ],
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        SITE_INDEXABLE: "true",
      },
    },
  );
  assert.equal(preview.toString().trim(), "false");
});
