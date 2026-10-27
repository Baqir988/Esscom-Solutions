import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { contactActions, directionsHref, emailHref, inquiryMessage, normalizePhone, telephoneHref, whatsappHref } from "../src/lib/contact";
import { pageMetadata } from "../src/lib/metadata";
import { ContactContent } from "../src/components/contact/contact-content";
import type { SiteContact } from "../src/types/site";

// Synthetic contact fixtures are never included in src or public output.
const pending: SiteContact = { phone: null, whatsapp: null, email: null, address: null, mapsUrl: null };
const configured: SiteContact = {
  phone: "+1 (202) 555-0100", whatsapp: "001 202 555 0101",
  email: "inquiry@example.test", address: "Test office, for automated tests only",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Test",
};
test("international phone validation preserves digits and rejects local/unsafe inputs", () => {
  assert.equal(normalizePhone(configured.phone), "+12025550100");
  assert.equal(normalizePhone(configured.whatsapp), "+12025550101");
  assert.equal(telephoneHref(configured.phone), "tel:+12025550100");
  for (const number of [null, "", "03001234567", "123", "+0123456789", "+1;ext=12", "+12025550100?text=bad", "1+2025550100", "1".repeat(16)])
    assert.equal(normalizePhone(number), undefined, String(number));
});
test("inquiries preserve item names and encode Unicode, delimiters, and line breaks", () => {
  const name = "RFID & POS / Terminal #1 — A+B";
  for (const kind of ["product", "solution", "project"] as const) {
    const message = inquiryMessage({ kind, name });
    assert(message.includes(name));
    const actions = contactActions({ kind, name }, configured);
    assert.deepEqual(actions.map((action) => action.id), ["whatsapp", "email", "phone"]);
    const whatsapp = new URL(actions[0].href);
    assert.equal(whatsapp.pathname, "/12025550101");
    assert.equal(whatsapp.searchParams.get("text"), message);
    const mail = new URL(actions[1].href);
    assert(mail.searchParams.get("subject")?.includes(name));
    assert.equal(mail.searchParams.get("body"), message);
  }
  const email = new URL(emailHref("A&B?", "First line\nSecond line + café", configured.email)!);
  assert.equal(email.searchParams.get("subject"), "A&B?");
  assert.equal(email.searchParams.get("body"), "First line\nSecond line + café");
});
test("missing and malformed channels never produce actionable links", () => {
  assert.deepEqual(contactActions(undefined, pending), []);
  assert.equal(whatsappHref("Hello", null), undefined);
  for (const email of [null, "", "hello", "a@example.test?bcc=bad", "a@example.test\r\nBcc:bad", "javascript:alert(1)", "a&b@example.test", "a#b@example.test"])
    assert.equal(emailHref("Subject", "Body", email), undefined);
  assert.deepEqual(contactActions(undefined, { ...pending, email: "bad", phone: "123" }), []);
});
test("directions accept approved Google Maps hosts and reject misleading or unsafe URLs", () => {
  assert.equal(directionsHref(configured.mapsUrl), configured.mapsUrl);
  assert.equal(directionsHref("https://maps.app.goo.gl/Example"), "https://maps.app.goo.gl/Example");
  for (const url of [null, "javascript:alert(1)", "http://maps.google.com/", "https://google.com.evil.test/maps", "https://www.google.com/search", "https://user:password@maps.google.com/"])
    assert.equal(directionsHref(url), undefined);
});
test("contact pending state is useful without fake actions, forms, or locations", () => {
  const html = renderToStaticMarkup(createElement(ContactContent, { contact: pending }));
  assert(html.includes("does not yet accept business inquiries"));
  assert(/href="\/solutions\/?"/.test(html));
  assert.equal((html.match(/<details/g) ?? []).length, 4);
  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert(!/href="(?:mailto:|tel:|https:\/\/wa.me)/.test(html));
  assert(!html.includes("<form"));
  assert(!html.includes("<address"));
});
test("configured contact page renders working channels and safe map links", () => {
  const html = renderToStaticMarkup(createElement(ContactContent, { contact: configured }));
  for (const fragment of ["tel:+12025550100", "https://wa.me/12025550101", "mailto:inquiry@example.test", "Test office", 'rel="noopener noreferrer"']) assert(html.includes(fragment));
  assert(!html.includes("Not yet available"));
  assert(!html.includes("cannot currently be sent"));
  const addressOnly = renderToStaticMarkup(createElement(ContactContent, { contact: { ...pending, address: "Test office" } }));
  assert(addressOnly.includes("<address"));
  assert(!addressOnly.includes('href="https://www.google.com'));
});
test("page metadata avoids invented domains and supports future canonical URLs", () => {
  const metadata = pageMetadata("Products", "Equipment descriptions", "/products/", null);
  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph?.title, "Products | ESSCOM");
  assert.equal(metadata.twitter?.description, "Equipment descriptions");
  assert.equal(pageMetadata("Contact ESSCOM", "Contact", "/contact/", "https://example.test/").alternates?.canonical, "https://example.test/contact/");
  assert.equal(pageMetadata("Contact", "Contact", "/contact/", "javascript:alert(1)").alternates, undefined);
});
