import test from "node:test";
import assert from "node:assert/strict";
import {
  referenceProducts,
  normalizeReferenceSpecs,
} from "../src/data/reference-products.ts";
import { demoProducts } from "../src/data/fixtures/products.ts";

test("all 37 reference listings retain unique routes and original routes stay valid", () => {
  assert.equal(referenceProducts.length, 37);
  assert.equal(new Set(referenceProducts.map((p) => p.slug)).size, 37);
  assert.deepEqual(
    referenceProducts.slice(0, 12).map((p) => p.slug),
    demoProducts.map((p) => p.slug),
  );
  assert.ok(
    referenceProducts.every(
      (p) =>
        p.image.src.startsWith("/images/products/catalog-v2/") && !p.approved,
    ),
  );
});
test("model dimensions keep their column labels and distinct strip sizes", () => {
  const specs = referenceProducts[1].specs;
  assert.ok(
    specs.some(
      (s) => s.label === "Stud standar · Diameter" && s.value === "35mm",
    ),
  );
  assert.equal(
    specs.filter((s) => s.label === "Strip standar · Panjang").length,
    2,
  );
});
test("repeated source rows are deduplicated without creating local business promises", () => {
  const specs = referenceProducts[30].specs;
  assert.equal(specs.filter((s) => s.label === "Ukuran").length, 1);
  assert.ok(
    referenceProducts[28].specs.some(
      (s) => s.label === "Ukuran" && s.value.includes("3.50"),
    ),
  );
  assert.ok(
    referenceProducts.every(
      (p) =>
        !p.specs.some((s) =>
          /^(Certification|Delivery|MOQ|Lead Time)/i.test(s.label),
        ),
    ),
  );
  assert.deepEqual(
    normalizeReferenceSpecs([
      { label: "Size", values: ["35mm"] },
      { label: "Size", values: ["35mm"] },
    ]),
    [{ label: "Ukuran", value: "35mm" }],
  );
});
