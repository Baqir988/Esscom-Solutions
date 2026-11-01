import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {approvedMedia,mediaPlacements} from '../src/data/media.ts';
const manifest=JSON.parse(await fs.readFile('src/data/media-manifest.json','utf8'));
const ids=new Set();const canonical=new Map();const checked=new Set();
const approvedSourceIds=new Set(Object.values(approvedMedia).map(a=>a.sourceAssetId));
for(const a of manifest.assets){
  assert(!ids.has(a.id),`Duplicate ID ${a.id}`);ids.add(a.id);
  const raw=await fs.readFile(a.originalPath);
  assert.equal(raw.length,a.originalBytes);
  assert.equal(createHash('sha256').update(raw).digest('hex'),a.sha256);
  assert(a.occurrences.length,`Unmapped ${a.id}`);
  assert(a.description&&a.category&&a.publicationStatus&&a.intendedPlacement);
  if(approvedSourceIds.has(a.id)){assert.equal(a.approved,true,`Published reference missing explicit status ${a.id}`);assert.equal(a.publicationStatus,'approved-historical-category-reference');assert(a.publicationReason.includes('historical category reference'));}
  else assert.equal(a.approved,false,'Unselected source must remain unpublished');
  if(a.duplicateOf){assert.equal(canonical.get(a.duplicateOf),a.sha256);}else canonical.set(a.id,a.sha256);
  for(const output of a.optimized){
    if(checked.has(output.path))continue;checked.add(output.path);
    assert(output.path.startsWith('private/company-profile/optimized/'),'Unapproved derivative in public tree');
    const stat=await fs.stat(output.path);assert.equal(stat.size,output.bytes);
    const meta=await sharp(output.path).metadata();
    assert.equal(meta.format,'webp');assert.equal(meta.width,output.width);assert.equal(meta.height,output.height);
    assert(meta.width<=a.width&&meta.height<=a.height,`Upscaled ${a.id}`);
    assert(Math.abs(meta.height-meta.width*a.height/a.width)<=1,`Distorted ${a.id}`);
    if(a.hasAlpha&&!a.isOpaque) assert(meta.hasAlpha,`Alpha lost ${a.id}`);
    assert(!meta.exif&&!meta.xmp&&!meta.iptc,`Source metadata retained ${a.id}`);
  }
}
for(const [id,a] of Object.entries(approvedMedia)){
  assert(a.approved&&a.alt.trim()&&a.width>0&&a.height>0,`Invalid public asset ${id}`);
  for(const src of [a.src,...(a.sources??[]).map(s=>s.src)]){
    assert(/^\/images\/company-profile\/[a-zA-Z0-9/_-]+\.webp$/.test(src));
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
assert.equal(approvedSourceIds.size,16);
console.log(`PASS: ${ids.size} originals hash-verified, ${canonical.size} unique, ${checked.size} private derivatives checked; ${approvedSourceIds.size} explicitly approved historical category references and all public WebP files verified; no private-media export leaks.`);
