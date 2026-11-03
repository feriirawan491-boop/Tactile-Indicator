import test from "node:test";
import assert from "node:assert/strict";
import { approvedEmail } from "../src/lib/contact.ts";
test("unapproved and missing email never becomes a contact link", () => {
  assert.equal(approvedEmail("sales@example.com", false), null);
  assert.equal(approvedEmail(null, true), null);
});
test("invalid or injected email never becomes a mailto link", () => {
  for (const email of [
    "wrong",
    "hello world@example.com",
    "a@example.com\nBcc:x@y.com",
  ])
    assert.equal(approvedEmail(email, true), null);
  assert.equal(approvedEmail("sales@example.com", true), "sales@example.com");
});
