import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { reviewedAsset, recommended } from './profile-review.mjs';

const root=path.resolve('private/company-profile');
const inspected=JSON.parse(await fs.readFile(path.join(root,'inspected.json'),'utf8'));
const canonical=new Map();
const assets=[];
const eligible=new Set(['biometric','access-control','pos','queue-management','cctv','digital-signage','projects','partners']);
const ranges={branding:'1–4 / closing artwork',biometric:'12–16','access-control':'12–16',pos:'19','queue-management':'20–21',cctv:'22–24','digital-signage':'28–29',projects:'30–31',fabrication:'32–46',partners:'47','other-division':'Other divisions; lockers around 18; solar/CNC around 25–27'};
for(const a of inspected.assets){
  if(a.duplicateOf){
    const original=canonical.get(a.duplicateOf);
    assets.push({...original,...a,optimized:original.optimized,duplicateOf:a.duplicateOf,publicationStatus:'duplicate-withheld',publicationReason:`Exact SHA-256 duplicate of ${a.duplicateOf}; originals preserved, derivatives shared.`});
    continue;
  }
  const number=Number(a.id.split('-')[1]);
  const review=reviewedAsset(number);
  const isCandidate=eligible.has(review.category)||[7,609].includes(number);
  const isFragment=['text','graphic'].includes(review.kind);
  const publicationStatus=isCandidate?'awaiting-approval':isFragment?'excluded-fragment':'withheld-other-context';
  const qualityFlags=[];
  if(a.width<640||a.height<240) qualityFlags.push('Insufficient source pixels for a large/retina card or hero; restrict CSS size or request higher resolution.');
  if(review.kind==='brochure') qualityFlags.push('Composite brochure artwork includes text/claims/third-party marks; do not use as an isolated product photo.');
  if(review.category==='projects') qualityFlags.push('Identifiable sites/logos/screens: require client consent, ESSCOM attribution and sensitivity review before publication.');
  if(review.category==='fabrication') qualityFlags.push('Facility ownership and ESSCOM engineering capability attribution are unverified.');
  if(review.kind==='logo') qualityFlags.push('Obtain current authorized vector/high-resolution logo; original raster proportions preserved.');
  if(isFragment) qualityFlags.push('Visually reviewed as text/decorative fragment; retained privately, not deleted because of size.');
  const optimized=[];
  if(!isFragment&&!a.decodeError){
    const dir=path.join(root,'optimized',review.category);
    await fs.mkdir(dir,{recursive:true});
    const maximum=Math.min(a.width,1280);
    const widths=[...new Set([160,320,640,960,1280].filter(w=>w<maximum).concat(maximum))];
    for(const width of widths){
      const filename=`${a.id}-${width}.webp`;
      const output=path.join(dir,filename);
      const result=await sharp(a.originalPath).rotate().resize({width,withoutEnlargement:true})
        .webp(review.kind==='logo'||review.kind==='diagram'?{lossless:true,effort:6}:{quality:86,alphaQuality:100,effort:6}).toFile(output);
      optimized.push({path:path.relative(process.cwd(),output).replaceAll('\\','/'),width:result.width,height:result.height,bytes:result.size,format:'webp'});
    }
  }
  const placement=recommended[number]?.placement??(isCandidate?`Potential ${review.category} media after specific rights and attribution approval`:'Private archive only; no current website placement');
  const entry={...a,...review,sourcePageRange:ranges[review.category]??null,sourcePageConfidence:'User-supplied approximate range; use XML section/cached segment for exact source location',
    visualReview:'Reviewed on labeled contact sheets; source color accuracy and legal rights cannot be independently established',qualityFlags,
    recommendation:recommended[number]?.note??null,publicationStatus,approved:false,published:false,
    publicationReason:isCandidate?'Profile presence does not establish current ESSCOM ownership, supply scope or publication rights.':isFragment?'Rasterized text/decorative fragment, unsuitable as standalone website media.':'Different division, stock context, group/manufacturer branding or fabrication scope; specific attribution/rights approval required.',
    intendedPlacement:placement,optimized,optimizedOutputPath:optimized.at(-1)?.path??null,optimizedBytes:optimized.reduce((sum,o)=>sum+o.bytes,0)};
  canonical.set(a.id,entry);assets.push(entry);
}
const unique=assets.filter(a=>!a.duplicateOf);
const prepared=unique.filter(a=>a.optimized.length);
const sum=(items,fn)=>items.reduce((s,a)=>s+fn(a),0);
const statistics={extracted:assets.length,unique:unique.length,exactDuplicates:assets.length-unique.length,
  decoded:assets.filter(a=>!a.decodeError).length,optimizedUnique:prepared.length,optimizedFiles:sum(prepared,a=>a.optimized.length),
  integrated:0,awaitingApproval:unique.filter(a=>a.publicationStatus==='awaiting-approval').length,
  withheldOtherContext:unique.filter(a=>a.publicationStatus==='withheld-other-context').length,
  excludedFragments:unique.filter(a=>a.publicationStatus==='excluded-fragment').length,
  originalAllBytes:sum(assets,a=>a.originalBytes),originalUniqueBytes:sum(unique,a=>a.originalBytes),
  preparedOriginalBytes:sum(prepared,a=>a.originalBytes),optimizedLargestBytes:sum(prepared,a=>a.optimized.at(-1).bytes),
  optimizedAllVariantsBytes:sum(prepared,a=>a.optimizedBytes),lowResolutionUnique:unique.filter(a=>a.qualityFlags.some(f=>f.startsWith('Insufficient'))).length};
statistics.largestReductionPercent=Number((100*(1-statistics.optimizedLargestBytes/statistics.preparedOriginalBytes)).toFixed(2));
statistics.allVariantsReductionPercent=Number((100*(1-statistics.optimizedAllVariantsBytes/statistics.preparedOriginalBytes)).toFixed(2));
const manifest={schemaVersion:1,sourceName:inspected.sourceName,sourceSha256:inspected.sourceSha256,sourceBytes:inspected.sourceBytes,
  documentReportedPages:inspected.documentReportedPages,paginationNote:inspected.paginationNote,
  reviewNote:'All 616 unique images visually reviewed; exact duplicates inherit review. No public image approval supplied. Do not import this private manifest into application code.',
  externalImages:inspected.externalImages,statistics,assets};
await fs.writeFile('src/data/media-manifest.json',JSON.stringify(manifest,null,2)+'\n');
const esc=s=>String(s??'—').replaceAll('|','\\|').replaceAll('\n',' ');
const lines=['# ESSCOM complete media inventory','',
  'Internal review artifact. Not approved for public GitHub or website publication. Every embedded candidate is listed below; raw files and derivatives are outside public/.','',
  `Source: ${inspected.sourceName}. SHA-256: ${inspected.sourceSha256}.`,
  '', '## Scope and counts','',...Object.entries(statistics).map(([k,v])=>`- ${k}: ${v}`),'',
  'The reduction compares optimized derivatives with the same prepared originals, not the full DOCX. All-variant bytes include every responsive size; largest-only bytes count one representation per image. Duplicate originals remain preserved. Pending media makes no change to public transfer size.','',
  '## Source locators and review','',
  'The package reports 43 pages and contains 62 cached page-break markers. C means cached segment and S means XML section, not a printed page. Approximate printed ranges come from the user brief and have not been verified against a fresh Word rendering. All 906 files were referenced by document relationships; no external image references were found. Thirteen labeled contact sheets cover all 616 unique files; exact duplicates inherit the same visual review.','',
  'Review package: [private review gallery](private/company-profile/review.html). Each image links to its unmodified original. WebP derivatives preserve full frames, alpha and aspect ratios; no AI edits, cropping, background removal or enlargement were performed. No clean vector assets were present. Physical color accuracy cannot be inferred from these compressed source files.','',
  '## Proposed selection requiring approval','',
  '| ID | Proposed location | Quality / approval note |','| --- | --- | --- |',
  ...unique.filter(a=>a.recommendation).map(a=>`| ${a.id} | ${esc(a.intendedPlacement)} | ${esc(a.recommendation)} |`),'',
  '## Complete inventory','',
  '| ID / original file | Format / dimensions / alpha | Source locator / approximate pages | Description / category | Duplicate | Publication / placement | Original bytes | Optimized outputs / bytes |','| --- | --- | --- | --- | --- | --- | ---: | --- |'];
for(const a of assets){
  const loc=[...new Set(a.occurrences.map(o=>`${o.part}: S${o.section}/C${o.cachedSegment}`))].join('; ');
  lines.push(`| ${a.id} / ${esc(a.originalName)} | ${a.format}; ${a.width}×${a.height}; alpha ${a.hasAlpha}, opaque ${a.isOpaque} | ${esc(loc)}; approx ${esc(a.sourcePageRange)} | ${esc(a.description)} / ${a.category} | ${a.duplicateOf??'unique'} | ${a.publicationStatus}; ${esc(a.intendedPlacement)} | ${a.originalBytes} | ${a.optimized.length?a.optimized.map(o=>`${o.path} (${o.bytes})`).join('<br>'):'None — preserved original only'} |`);
}
lines.push('','## Higher-resolution replacement / restricted display register','',
  'These are source limitations, not automatic deletion criteria. For crisp 2× presentation, do not exceed half the source pixel dimensions in CSS. Especially important: logo profile-0007 and low-resolution POS, queue-display and signage categories.','',
  '| ID | Source pixels | Assessment |','| --- | --- | --- |',
  ...unique.filter(a=>a.qualityFlags.length).map(a=>`| ${a.id} | ${a.width}×${a.height} | ${esc(a.qualityFlags.join(' '))} |`),'');
await fs.writeFile('MEDIA_INVENTORY.md',lines.join('\n'));
const htmlEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function figure(a){
  const original=path.relative(root,path.resolve(a.originalPath)).replaceAll('\\','/');
  const optimized=a.optimized.at(-1);
  const src=optimized?path.relative(root,path.resolve(optimized.path)).replaceAll('\\','/'):original;
  return `<article id="${a.id}"><h3>${a.id} · ${htmlEscape(a.category)}</h3><a href="${original}"><img loading="lazy" src="${src}" width="${a.width}" height="${a.height}" alt="${htmlEscape(a.description)}"></a><p>${htmlEscape(a.description)}</p><p>${a.width} × ${a.height} · ${a.originalBytes} original bytes · ${optimized?.bytes??0} largest WebP bytes</p><p><strong>${htmlEscape(a.publicationStatus)}</strong> · ${htmlEscape(a.intendedPlacement)}</p><p>${htmlEscape(a.recommendation??a.qualityFlags.join(' '))}</p><a href="${original}">Unmodified original</a>${optimized?` · <a href="${src}">Prepared WebP</a>`:''}</article>`;
}
const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' file:; style-src 'unsafe-inline'; base-uri 'none'"><title>ESSCOM private profile media review</title><style>body{font:16px/1.5 system-ui;margin:auto;padding:24px;max-width:1400px;color:#0b1f3a;background:#f8fafc}h1{font-size:2rem}a{color:#164dc5}section{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:20px}article{background:white;border:1px solid #cbd5e1;border-radius:12px;padding:16px;overflow-wrap:anywhere}article img{display:block;object-fit:contain;width:auto;height:auto;max-width:100%;max-height:240px;margin:auto}article h3{font-size:1rem}article p{font-size:.9rem}summary{padding:24px;font-weight:bold;cursor:pointer}:focus-visible{outline:3px solid #2563eb;outline-offset:4px}</style><h1>ESSCOM profile media review</h1><p>Private review only. No source asset is currently approved for publication. Click any image to inspect the untouched original. Candidate derivatives preserve framing and transparency; small originals have not been enlarged.</p><p>${statistics.extracted} files · ${statistics.unique} unique · ${statistics.exactDuplicates} exact duplicates · ${statistics.optimizedUnique} privately optimized · 0 published.</p><h2>Proposed representative selection</h2><p>Approve specific IDs and placements after confirming rights and ESSCOM category attribution. Product imagery approval does not approve current model availability or specifications. Installation/client/partner and factory publication require separate approval. Several candidates require larger source files before standard card use.</p><section>${unique.filter(a=>a.recommendation).map(figure).join('')}</section><details><summary>All ${unique.length} unique assets — internal source content</summary><section>${unique.map(figure).join('')}</section></details><p>Exact duplicate mappings and all 906 original records are in MEDIA_INVENTORY.md and src/data/media-manifest.json. Originals are preserved in private/company-profile/originals.</p></html>`;
await fs.writeFile(path.join(root,'review.html'),html);
console.log(JSON.stringify(statistics,null,2));
