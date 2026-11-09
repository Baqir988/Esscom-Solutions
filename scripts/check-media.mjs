import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {approvedMedia,mediaPlacements} from '../src/data/media.ts';
import {publishedProducts} from '../src/data/products.ts';
const manifest=JSON.parse(await fs.readFile('src/data/media-manifest.json','utf8'));
const ids=new Set();const canonical=new Map();const checked=new Set();
const approvedSourceIds=new Set(Object.values(approvedMedia).map(a=>a.sourceAssetId));
const catalogPhotoIds=new Set(publishedProducts.flatMap(p=>p.images.map(i=>i.sourceAssetId)));
for(const a of manifest.assets){
  assert(!ids.has(a.id),`Duplicate ID ${a.id}`);ids.add(a.id);
  const raw=await fs.readFile(a.originalPath);
  assert.equal(raw.length,a.originalBytes);
  assert.equal(createHash('sha256').update(raw).digest('hex'),a.sha256);
  assert(a.occurrences.length,`Unmapped ${a.id}`);
  assert(a.description&&a.category&&a.publicationStatus&&a.intendedPlacement);
  if(catalogPhotoIds.has(a.id)){assert.equal(a.approved,true,'User-requested product category photo must be approved for the stated use');assert.equal(a.published,true);assert(a.publicOptimizedOutputs.length>0);assert(a.publicationReason.includes('representative historical category imagery'));}
  else {assert.equal(a.approved,false,'Other profile images remain unpublished pending rights and attribution');assert.equal(a.published,false);assert.equal(a.publicOptimizedOutputs.length,0,'No unapproved profile image may retain a public output path');}
  if(a.duplicateOf){assert.equal(canonical.get(a.duplicateOf),a.sha256);}else canonical.set(a.id,a.sha256);
  for(const output of a.optimized){
    if(checked.has(output.path))continue;checked.add(output.path);
    assert(output.path.startsWith('private/company-profile/optimized/'),'Source archive derivative path changed');
    const stat=await fs.stat(output.path);assert.equal(stat.size,output.bytes);
    const meta=await sharp(output.path).metadata();
    assert.equal(meta.format,'webp');assert.equal(meta.width,output.width);assert.equal(meta.height,output.height);
    assert(meta.width<=a.width&&meta.height<=a.height,`Upscaled ${a.id}`);
    assert(Math.abs(meta.height-meta.width*a.height/a.width)<=1,`Distorted ${a.id}`);
    if(a.hasAlpha&&!a.isOpaque) assert(meta.hasAlpha,`Alpha lost ${a.id}`);
    assert(!meta.exif&&!meta.xmp&&!meta.iptc,`Source metadata retained ${a.id}`);
  }
}
const catalogImagePaths=new Set();
for(const product of publishedProducts) for(const image of product.images){
  assert(image.approved&&image.sourceAssetId&&image.alt.includes("representative category image"), 'Catalog source photograph must be identified as representative');
  assert(image.src.startsWith('/images/profile-catalog/'));
  const source=manifest.assets.find(a=>a.id===image.sourceAssetId);assert(source, 'Catalog photo must map to a DOCX media record');
  for(const variant of image.sources??[]){assert(variant.src.startsWith('/images/profile-catalog/'));const file=path.join('public',variant.src);await fs.access(file);const meta=await sharp(file).metadata();assert.equal(meta.format,'webp');assert.equal(meta.width,variant.width);assert.equal(meta.height,variant.height);assert(meta.width<=source.width&&meta.height<=source.height);catalogImagePaths.add(variant.src);}
}
for(const [id,a] of Object.entries(approvedMedia)){
  assert(a.approved&&a.alt.trim()&&a.width>0&&a.height>0,`Invalid public asset ${id}`);
  for(const src of [a.src,...(a.sources??[]).map(s=>s.src)]){
    assert(/^\/images\/[a-zA-Z0-9/_-]+\.webp$/.test(src));
    await fs.access(path.join('public',src));
    const meta=await sharp(path.join('public',src)).metadata();assert.equal(meta.format,'webp');
  }
}
for(const id of Object.values(mediaPlacements).flatMap(group=>Object.values(group)))assert(approvedMedia[id]?.approved,`Unapproved placement ${id}`);
async function walk(dir){let entries;try{entries=await fs.readdir(dir,{withFileTypes:true});}catch(e){if(e.code==='ENOENT')return [];throw e;}return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const publicFiles=await walk('public');
assert(!publicFiles.some(p=>/\.(docx|xml|json)$/i.test(p)||p.includes('originals')||p.includes('private')),'Private inventory/source in public directory');
const outputFiles=await walk('out');
for(const file of outputFiles){
  assert(!/media-manifest|MEDIA_INVENTORY|review\.html|\.docx$/i.test(file),'Private file exported');
  if(/\.(html|js|json|txt)$/.test(file)){
    const text=await fs.readFile(file,'utf8');
    assert(!text.includes('private/company-profile')&&!text.includes('media-manifest.json'),`Private reference leaked: ${file}`);
  }
}
assert.equal(manifest.statistics.extracted,manifest.assets.length);
assert.equal(manifest.statistics.unique,canonical.size);
assert.equal(approvedSourceIds.size,0);
assert.equal(catalogPhotoIds.size,45);
assert(catalogImagePaths.size>0);
console.log(`PASS: ${ids.size} originals hash-verified, ${canonical.size} unique, ${checked.size} private derivatives checked; ${catalogPhotoIds.size} profile photographs published as category references (${catalogImagePaths.size} WebP variants validated); remaining profile assets are unpublished; no private archive export leaks.`);
