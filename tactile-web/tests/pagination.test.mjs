import test from "node:test";
import assert from "node:assert/strict";
import { paginateProducts } from "../src/lib/pagination.ts";
const products = Array.from({ length: 37 }, (_, i) => i + 1);
test("37 products paginate into four full pages and one final product", () => {
  const pages = [1, 2, 3, 4, 5].map((n) =>
    paginateProducts(products, String(n)),
  );
  assert.deepEqual(
    pages.map((p) => p.items.length),
    [9, 9, 9, 9, 1],
  );
  assert.deepEqual(
    pages.flatMap((p) => p.items),
    products,
  );
  assert.equal(pages[4].from, 37);
  assert.equal(pages[4].to, 37);
});
test("invalid, out of range, repeated and empty pagination stay usable", () => {
  assert.equal(paginateProducts(products, "999").page, 5);
  for (const value of [
    "0",
    "-1",
    "abc",
    "1.5",
    "9999999999999999999999",
    undefined,
  ])
    assert.equal(paginateProducts(products, value).page, 1);
  assert.equal(paginateProducts(products, ["2", "3"]).page, 2);
  assert.deepEqual(paginateProducts([], "5").items, []);
  assert.equal(paginateProducts([1, 2], "5").page, 1);
});
