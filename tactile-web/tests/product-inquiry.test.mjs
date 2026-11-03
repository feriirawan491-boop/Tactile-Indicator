import test from "node:test";
import assert from "node:assert/strict";
import {
  composeProductMessage,
  selectedVariant,
} from "../src/lib/product-inquiry.ts";
import { getWhatsAppUrl } from "../src/lib/whatsapp.ts";
const url = "http://localhost:3000/produk/contoh-beton-guiding";
test("inquiry includes only an explicitly selected valid variant", () => {
  const variants = [{ id: "30", label: "30×30 cm" }];
  const selected = selectedVariant(variants, "30");
  const message = composeProductMessage({
    name: "Guiding Beton",
    url,
    variantLabel: selected?.label,
  });
  assert.ok(message.includes("Guiding Beton (varian 30×30 cm)"));
  assert.ok(message.endsWith(url));
});
test("unselected and invalid variant never invent a choice", () => {
  for (const id of [undefined, "unknown"]) {
    const variant = selectedVariant([{ id: "30", label: "30×30 cm" }], id);
    const message = composeProductMessage({
      name: "Guiding Beton",
      url,
      variantLabel: variant?.label,
    });
    assert.ok(!message.includes("varian"));
    assert.ok(message.includes(url));
  }
});
test("WhatsApp encoding preserves product name, variant, and URL", () => {
  const message = composeProductMessage({
    name: "Guiding & Warning?",
    url,
    variantLabel: "30×30 cm / abu-abu",
  });
  const href = getWhatsAppUrl("628123456789", true, message);
  assert.equal(new URL(href).searchParams.get("text"), message);
  assert.equal(getWhatsAppUrl("", false, message), null);
});
