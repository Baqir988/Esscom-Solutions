// Private inventory tooling; never imported into the website bundle.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = path.resolve('private/company-profile');
const extraction = JSON.parse(await fs.readFile(path.join(root, 'extraction.json'), 'utf8'));
const seen = new Map();
const usedIds = new Set();
const assets = [];
for (const item of extraction.assets.sort((a,b) => a.originalName.localeCompare(b.originalName, undefined, {numeric:true}))) {
  const baseId = `profile-${item.originalName.match(/\d+/)?.[0].padStart(4,'0') ?? String(assets.length+1).padStart(4,'0')}`;
  const id = usedIds.has(baseId) ? `${baseId}-${path.extname(item.originalName).slice(1)}` : baseId;
  if (usedIds.has(id)) throw new Error(`Ambiguous image ID ${id}`);
  usedIds.add(id);
  const duplicateOf = seen.get(item.sha256) ?? null;
  if (!duplicateOf) seen.set(item.sha256,id);
  let metadata = {}, stats = {}, error = null;
  try {
    metadata = await sharp(item.originalPath).metadata();
    stats = await sharp(item.originalPath).stats();
  } catch (failure) { error = failure.message; }
  assets.push({...item, id, duplicateOf, format:metadata.format??null, width:metadata.width??null,
    height:metadata.height??null, hasAlpha:metadata.hasAlpha??null, isOpaque:stats.isOpaque??null,
    space:metadata.space??null, orientation:metadata.orientation??null,
    entropy:stats.entropy??null, sharpness:stats.sharpness??null, decodeError:error});
}
await fs.writeFile(path.join(root,'inspected.json'),JSON.stringify({...extraction, assets},null,2)+'\n');
const unique = assets.filter(a=>!a.duplicateOf);
const sheetDir = path.join(root,'contact-sheets');
await fs.mkdir(sheetDir,{recursive:true});
const escapeXml = s => s.replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
const perSheet=48, columns=6, cellW=240, cellH=170;
for(let start=0;start<unique.length;start+=perSheet){
  const slice=unique.slice(start,start+perSheet);
  const tiles=[];
  for(let i=0;i<slice.length;i++){
    const a=slice[i];const left=(i%columns)*cellW,top=Math.floor(i/columns)*cellH;
    if(!a.decodeError){
      const thumb=await sharp(a.originalPath).rotate().resize(224,128,{fit:'inside',withoutEnlargement:true}).png().toBuffer({resolveWithObject:true});
      tiles.push({input:thumb.data,left:left+Math.floor((cellW-thumb.info.width)/2),top:top+Math.floor((132-thumb.info.height)/2)});
    }
    const loc=[...new Set(a.occurrences.map(o=>'S'+o.section))].join(',');
    const label=`${a.id} ${a.width}x${a.height} ${loc}`;
    const svg=`<svg width="240" height="38"><rect width="240" height="38" fill="#e7edf3"/><text x="5" y="15" font-family="Arial" font-size="11">${escapeXml(label)}</text><text x="5" y="31" font-family="Arial" font-size="10">${a.format} · ${a.originalBytes} B · ${a.hasAlpha?'alpha':'opaque'}</text></svg>`;
    tiles.push({input:Buffer.from(svg),left,top:top+132});
  }
  await sharp({create:{width:columns*cellW,height:Math.ceil(slice.length/columns)*cellH,channels:3,background:'#ffffff'}}).composite(tiles).png().toFile(path.join(sheetDir,`sheet-${String(start/perSheet+1).padStart(2,'0')}.png`));
}
console.log(JSON.stringify({extracted:assets.length,unique:unique.length,duplicates:assets.length-unique.length,decodeErrors:assets.filter(a=>a.decodeError).length,sheets:Math.ceil(unique.length/perSheet)}));
