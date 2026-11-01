import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { staticMediaSourceSet } from "../src/lib/media";
import { approvedMedia, getApprovedMedia, mediaPlacements, solutionMedia, equipmentMedia } from "../src/data/media";
import { ApprovedImage } from "../src/components/ui/approved-image";
import type { MediaAsset } from "../src/types/catalog";

const fixture: MediaAsset = {
  src: "/images/test-equipment-640.webp", alt: "Synthetic equipment test fixture",
  width: 640, height: 480, approved: true, kind: "photograph",
  sources: [
    {src:"/images/test-equipment-640.webp",width:640,height:480},
    {src:"/images/test-equipment-320.webp",width:320,height:240},
  ],
};
test("static media sources are ordered, deduplicated, local and never upscaled", () => {
  assert.equal(staticMediaSourceSet({...fixture,sources:[...fixture.sources!,
    {src:"/images/test-equipment-320.webp",width:320,height:240},
    {src:"https://example.test/private.webp",width:160,height:120},
    {src:"/images/../private.webp",width:160,height:120},
    {src:"/images/too-large.webp",width:1280,height:960},
    {src:"/images/distorted.webp",width:160,height:160},
    {src:"/images/zero.webp",width:0,height:0},
  ]}), "/images/test-equipment-320.webp 320w, /images/test-equipment-640.webp 640w");
  assert.equal(staticMediaSourceSet({...fixture,approved:false}),undefined);
});
test("approved responsive images reserve dimensions and use native static sources", () => {
  const html=renderToStaticMarkup(createElement(ApprovedImage,{image:fixture,label:"Equipment",priority:true}));
  assert.match(html,/<picture/);
  assert.match(html,/type="image\/webp"/);
  assert.match(html,/width="640" height="480"/);
  assert.match(html,/loading="eager"/);
  assert.match(html,/fetchPriority="high"/);
  assert.match(html,/alt="Synthetic equipment test fixture"/);
  assert.doesNotMatch(html,/_next\/image/);
});
test("unapproved media cannot enter the registry selector or image output", () => {
  approvedMedia["test-unapproved"]={...fixture,approved:false};
  try {
    assert.equal(getApprovedMedia("test-unapproved"),undefined);
    assert.equal(getApprovedMedia("missing"),undefined);
    const html=renderToStaticMarkup(createElement(ApprovedImage,{image:{...fixture,approved:false},label:"Equipment",visual:"camera"}));
    assert.doesNotMatch(html,/test-equipment/);
    assert.match(html,/category illustration/);
  } finally {delete approvedMedia["test-unapproved"];}
});

test("published profile references cover all five solution categories with historical captions", () => {
  const slugs=["cctv-surveillance","biometric-access-control","queue-management","point-of-sale","digital-signage"];
  assert.equal(Object.keys(approvedMedia).length,16);
  for(const slug of slugs){
    const image=solutionMedia(slug);
    assert(image?.approved,`Missing approved category image for ${slug}`);
    assert(/historical|profile/i.test(image.caption??""));
    assert(image.sourceAssetId?.startsWith("profile-"));
  }
  const mappedEquipment=Object.values(mediaPlacements.equipment);
  assert(mappedEquipment.length>=15);
  for(const id of mappedEquipment){
    const image=equipmentMedia(Object.entries(mediaPlacements.equipment).find(([,mediaId])=>mediaId===id)![0]);
    assert(image?.approved&&/historical|profile/i.test(image.caption??""));
  }
});
