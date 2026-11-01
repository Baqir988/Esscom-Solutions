// Selected representative category references requested for the public preview.
// These images do not identify current stock, an ESSCOM model, client, or installation.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const items = [
  {key:'cctv-camera',sourceId:'profile-0365',category:'cctv',file:'camera',alt:'Bullet CCTV camera shown in the supplied historical company profile',caption:'Historical category reference from the supplied profile. Current ESSCOM models and availability require confirmation.',kind:'photograph'},
  {key:'cctv-recorder',sourceId:'profile-0340',category:'cctv',file:'video-recorder',alt:'Video recording unit pictured in the supplied company profile',caption:'Historical equipment example. Compatibility, current supply and specifications require confirmation.',kind:'photograph'},
  {key:'cctv-mounted-camera',sourceId:'profile-0367',category:'cctv',file:'mounted-camera',alt:'Bullet camera with mounting bracket shown in the supplied company profile',caption:'Historical category reference; this image does not specify a current ESSCOM model.',kind:'photograph'},
  {key:'biometric-terminal',sourceId:'profile-0208',category:'biometric',file:'attendance-terminal',alt:'Fingerprint attendance terminal pictured in the supplied company profile',caption:'Historical attendance-system category reference. Current ESSCOM supply and specifications require confirmation.',kind:'photograph'},
  {key:'rfid-reader',sourceId:'profile-0209',category:'access-control',file:'rfid-reader',alt:'RFID reader with access card shown in the supplied company profile',caption:'Historical access-control category reference. Model and availability require confirmation.',kind:'photograph'},
  {key:'electric-lock',sourceId:'profile-0225',category:'access-control',file:'electric-lock',alt:'Electric door strike shown in the supplied company profile',caption:'Historical equipment example; supported lock types require confirmation.',kind:'photograph'},
  {key:'queue-overview',sourceId:'profile-0321',category:'queue-management',file:'queue-overview',alt:'Queue management counter and display concept artwork in the supplied company profile',caption:'Profile illustration only; it does not identify a customer installation or project outcome.',kind:'illustration'},
  {key:'queue-kiosk',sourceId:'profile-0332',category:'queue-management',file:'ticket-kiosk',alt:'Tall ticket-issuing kiosk pictured in the supplied company profile',caption:'Historical queue-equipment category reference. Current models and availability require confirmation.',kind:'photograph'},
  {key:'queue-counter-display',sourceId:'profile-0329',category:'queue-management',file:'counter-display',alt:'Counter number display pictured in the supplied company profile',caption:'Historical display example. Its visible ticket number is illustrative and does not identify a client.',kind:'photograph'},
  {key:'queue-counter-keypad',sourceId:'profile-0331',category:'queue-management',file:'counter-keypad',alt:'Service-counter keypad pictured in the supplied company profile',caption:'Historical queue-equipment category reference; compatibility requires confirmation.',kind:'photograph'},
  {key:'pos-terminal',sourceId:'profile-0253',category:'pos',file:'pos-terminal',alt:'Touchscreen point-of-sale terminal pictured in the supplied company profile',caption:'Historical POS category reference. It is not a current product listing or stock claim.',kind:'photograph'},
  {key:'barcode-scanner',sourceId:'profile-0297',category:'pos',file:'barcode-scanner',alt:'Handheld barcode scanner pictured in the supplied company profile',caption:'Historical POS equipment example. Current model and availability require confirmation.',kind:'photograph'},
  {key:'cash-register',sourceId:'profile-0201',category:'pos',file:'cash-register',alt:'Electronic cash register pictured in the supplied company profile',caption:'Historical equipment example; current ESSCOM supply requires confirmation.',kind:'photograph'},
  {key:'led-cabinet',sourceId:'profile-0411',category:'digital-signage',file:'led-cabinet',alt:'LED display cabinet pictured in the supplied company profile',caption:'Historical display-category reference. No resolution or current model specification is implied.',kind:'photograph'},
  {key:'display-panel',sourceId:'profile-0410',category:'digital-signage',file:'display-panel',alt:'Digital display panel pictured in the supplied company profile',caption:'Historical display example; specifications and availability require confirmation.',kind:'photograph'},
  {key:'signage-screen',sourceId:'profile-0409',category:'digital-signage',file:'signage-screen',alt:'Digital signage screen pictured in the supplied company profile',caption:'Historical category reference; no installation, client or product specification is implied.',kind:'photograph'},
];

const manifestPath='src/data/media-manifest.json';
const manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
const byId=new Map(manifest.assets.map(asset=>[asset.id,asset]));
const publicRoot=path.resolve('public/images/company-profile');
const publicRecords={};
const placements={solutions:{},equipment:{}};
for(const item of items){
  const source=byId.get(item.sourceId);
  assert(source,`Missing source: ${item.sourceId}`);
  assert.equal(source.category,item.category,`${item.sourceId} category changed`);
  assert(!source.duplicateOf && !source.decodeError,`Source is duplicate or unreadable: ${item.sourceId}`);
  assert(source.optimized.length,`No prepared variants for ${item.sourceId}`);
  const choices=source.optimized.filter((variant,index,array)=>index===0||index===array.length-1||[320,640].includes(variant.width));
  const outputVariants=[];
  for(const variant of choices){
    const filename=`${item.file}-${variant.width}.webp`;
    const output=path.join(publicRoot,item.category,filename);
    assert(output.startsWith(publicRoot+path.sep),'Invalid output path');
    await fs.mkdir(path.dirname(output),{recursive:true});
    await fs.copyFile(variant.path,output);
    outputVariants.push({src:`/images/company-profile/${item.category}/${filename}`,width:variant.width,height:variant.height});
  }
  const largest=outputVariants.at(-1);
  publicRecords[item.key]={id:item.key,sourceAssetId:item.sourceId,src:largest.src,alt:item.alt,width:largest.width,height:largest.height,approved:true,kind:item.kind,sources:outputVariants,caption:item.caption,websitePlacement:`Homepage/Solutions category card; ${item.category} solution detail; equipment category catalog where mapped`,sourceReference:`Supplied Techno World International company profile; ${source.occurrences.map(o=>`section ${o.section}`).join(', ')}. Historical category reference only; attribution to current ESSCOM supply is unverified.`};
  const solutionSlug={cctv:'cctv-surveillance',biometric:'biometric-access-control','access-control':'biometric-access-control','queue-management':'queue-management',pos:'point-of-sale','digital-signage':'digital-signage'}[item.category];
  if(!placements.solutions[solutionSlug])placements.solutions[solutionSlug]=item.key;
  if(item.key==='queue-overview'||item.key==='pos-terminal'||item.key==='led-cabinet'||item.key==='cctv-camera'||item.key==='biometric-terminal') placements.solutions[solutionSlug]=item.key;
}
for(const keys of Object.values({
  'cctv-surveillance':{'cctv-cameras':'cctv-camera','video-recording':'cctv-recorder','camera-accessories':'cctv-mounted-camera'},
  'biometric-access-control':{'attendance-terminals':'biometric-terminal','rfid-readers':'rfid-reader','electronic-locks':'electric-lock'},
  'queue-management':{'ticket-equipment':'queue-kiosk','queue-displays':'queue-counter-display','counter-arrangement':'queue-counter-keypad'},
  'point-of-sale':{'pos-terminals':'pos-terminal','barcode-scanners':'barcode-scanner','receipts-registers':'cash-register'},
  'digital-signage':{'signage-screens':'led-cabinet','led-smd-displays':'display-panel','outdoor-displays':'signage-screen'},
})) for(const [equipmentId,key] of Object.entries(keys)) placements.equipment[equipmentId]=key;

// These records approve only display as historical category imagery at the listed placements.
// They do not approve current product claims, project attribution, or customer/partner publication.
const ts=`import type { MediaAsset } from "@/types/catalog";\n\n/** Approved historical profile references; see per-image captions/source references. */\nexport const approvedMedia: Record<string, MediaAsset> = ${JSON.stringify(publicRecords,null,2)};\n\n/** Shared placements for homepage, solution pages and category equipment cards. */\nexport const mediaPlacements: { solutions: Record<string,string>; equipment: Record<string,string> } = ${JSON.stringify(placements,null,2)};\n\nexport function getApprovedMedia(id?: string): MediaAsset | undefined {\n  const media = id ? approvedMedia[id] : undefined;\n  return media?.approved ? media : undefined;\n}\nexport function solutionMedia(slug: string) { return getApprovedMedia(mediaPlacements.solutions[slug]); }\nexport function equipmentMedia(id: string) { return getApprovedMedia(mediaPlacements.equipment[id]); }\n`;
await fs.writeFile('src/data/media.ts',ts);
const approvedIds=new Set(items.map(item=>item.sourceId));
const newlyApproved=manifest.assets.filter(asset=>approvedIds.has(asset.id)&&asset.publicationStatus!=='approved-historical-category-reference').length;
for(const asset of manifest.assets){
  if(!approvedIds.has(asset.id)||asset.duplicateOf)continue;
  asset.approved=true;asset.published=true;asset.verificationStatus='historical-reference';asset.publicationStatus='approved-historical-category-reference';
  asset.publicationReason='User explicitly requested public display of relevant source-profile imagery. Approved only as a historical category reference at the mapped placement; current ESSCOM supply, specifications, installation and client attribution are not approved.';
  asset.publicOptimizedOutputs=publicRecords[items.find(item=>item.sourceId===asset.id).key].sources;
  asset.websitePlacement=publicRecords[items.find(item=>item.sourceId===asset.id).key].websitePlacement;
}
manifest.statistics.integrated=items.length;
manifest.statistics.awaitingApproval=Math.max(0,manifest.statistics.awaitingApproval-newlyApproved);
manifest.reviewNote='Selected category images are approved only as historical references by explicit user instruction. Other profile assets retain their separate attribution gates. Do not import this private manifest into application code.';
await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(`Published ${items.length} historical category references with ${Object.values(publicRecords).reduce((n,record)=>n+record.sources.length,0)} local responsive WebP files.`);
