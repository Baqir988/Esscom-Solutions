import type { Product, CatalogItem, MediaAsset } from "@/types/catalog";
import { productCategories, getProductCategory } from "./product-categories";
import mediaData from "./profile-catalog-media";
import { quoteHref } from "../lib/contact";
import type { EquipmentVisual } from "@/types/solution";
type Seed=[string,string,string,string?,number?,string?,string?];
const seeds:Record<string,Seed[]>={
"biometric-access-control":[
["tf-70-biometric-terminal","TF-70 Biometric Attendance System","Fingerprint attendance terminal with attendance logs and management software references.","TF-70",208,"Identification: thumb impression, RFID and password; 3,000 templates; 100,000 logs; TCP/IP, USB Host, RS232/485; stated 4-hour lithium battery backup."],
["es-fa-1500-terminal","ES-FA 1500 Facial & Fingerprint Terminal","Facial and fingerprint terminal with optional RFID/password identification, display, camera, storage and access-control functions.","ES-FA 1500",234,"Multi-Bio 600 processor, 630 MHz; 4.3-inch TFT touchscreen; 256 MB Flash, 64 MB SDRAM; face capacity 700; fingerprint 3,000 expandable to 10,000; card 10,000; logs 100,000 (all profile-stated)."],
["es-400da-rfid-terminal","ES-400DA RFID Attendance System","RFID/password attendance terminal described with card/log capacity, management software and access-control connections.","ES-400DA",185,"RFID and password; 30,000 cards; 100,000 logs; Wiegand output. Exact connectivity mapping should be confirmed."],
["es-5000a-biometric-terminal","ES-5000A Biometric Access & Attendance System","Biometric access and attendance terminal described with fingerprint, RFID and password identification.","ES-5000A",208,"3,000 templates; 100,000 logs; TCP/IP, USB Host, RS232/485 (profile-stated)."],
["tf-150-portable-terminal","TF-150 Portable Biometric Attendance System","Portable attendance-system category identified in the profile; model details and current availability are not provided.","TF-150",208],
["facial-attendance-terminals","Facial Attendance Terminals","Facial attendance devices are listed; the exact model mapping for the nearby specification block is unclear.","",234],
["fingerprint-attendance-terminals","Fingerprint Attendance Terminals","Fingerprint-based attendance equipment is described across multiple biometric terminal entries.","",208],
["rfid-attendance-readers-cards","RFID Readers & Identification Cards","RFID readers and cards are shown for attendance and access identification.","",185],
["biometric-access-control-system","Biometric Access Control System","Combined access control category shown with fingerprint, RFID, password, door lock and exit control elements.","",220],
["magnetic-door-lock","Electric Magnetic Door Lock","Electric magnetic lock and armature plate shown as access-control equipment.","",182],
["electric-bolt-lock","Electric Bolt Lock","Electric bolt lock listed and illustrated in the access-control section.","",181],
["electric-cosey-lock","Electric Cosey Lock","An electric Cosey lock is named; exact type and model require confirmation.","",181],
["digital-exit-button","Digital Exit Button","Exit button shown as a supporting access-control component.","",181],
["hr-management-software","Complete HR Management Software","Complete HR management software mentioned with biometric attendance products; modules and compatibility are unspecified.","",208],
["walk-through-gate","Walk-Through Security Gate","A walk-through gate is listed in wider security equipment material; division ownership is unclear.","",185],
["gsm-panic-alarm","GSM Panic Alarm","A GSM panic-alarm category is listed alongside security equipment in the profile.","",185]],
"office-presentation":[
["multimedia-projector","Multimedia Projector","Multimedia projectors are listed among the profile's office automation and presentation equipment.","",186],
["projector-screens","Multimedia Projector Screens","Projection screens are listed with multimedia presentation equipment.","",187],
["paper-shredder","Paper Shredder","Paper shredders appear in the company introduction and office equipment references.","",196],
["fire-alarm-system","Fire Alarm System","A fire alarm system is listed among presentation and security equipment categories.","",189],
["photocopier","Photocopier","Photocopiers are named in the historical group introduction; models and current supply are unspecified."],
["computer-accessories","Computer Accessories","Computer accessories are explicitly listed in the profile introduction as a broad office-technology category."],
["laser-printer","Laser Printer","Laser printers are included in the historical group product list; no model is identified."],
["printer-scanner","Printers & Scanners","Printers and scanners are listed as broad office product categories."],
["typewriter","Typewriter","Typewriters are named in the historical company introduction as an office product category."],
["laminator","Laminator","Laminators appear in the historical group product list."],
["binding-machine","Binding Machine","Binding equipment is named in the historical product list; specific configuration is not provided."],
["label-machine","Label Machine","Label machines are named in the historical group product list."],
["bank-note-counter","Bank Note Counter","Bank note counters are listed as an office product category; model and capabilities are unspecified."],
["office-paper-products","Office Paper & Label Products","Barcode labels and label stickers are listed in the wider office/POS context."],
["portable-dvd-player","Portable DVD Players","Portable DVD players appear in the historical introduction; current models are not identified."],
["bluetooth-devices","Bluetooth Devices","Bluetooth devices are mentioned without model detail."],
["musical-instruments","Musical Instruments","Musical instruments appear in the broad historical product listing; range is unspecified."],
["water-dispenser","Water Dispenser","Water dispensers appear in the historical introduction; model information is unavailable."],
["office-automation-equipment","Office Automation Equipment","Broad historical group-level category covering products listed in this catalog."]],
"pos-retail":[
["pos-touch-system","POS Touch System","All-in-one touchscreen POS configuration shown with customer display, receipt printer, keyboard and cash drawer.","",253,"One configuration: five-wire resistive touch panel, Intel Atom 1.8 CPU, 2 GB RAM, 160 GB HDD."],
["pos-terminal","POS Terminal","POS terminal configuration described with display, thermal printer, keyboard and cash drawer.","",298,"One configuration: Intel Atom 1.8 CPU, 1 GB RAM, 80 GB HDD."],
["electronic-cash-register","Electronic Cash Register","Cash register shown with programmable keyboard, customer display and internal receipt printer.","",300,"PLU max 15,000; 58 mm internal receipt roll (profile-stated)."],
["es-1250-laser-scanner","ES-1250 Laser Barcode Scanner","The profile labels a laser scanner ES-1250; no complete specification block is clearly mapped to it.","ES-1250",250],
["laser-barcode-scanner","Laser Barcode Scanner","Laser barcode scanner category shown with scanner accessories and interface references.","",250,"Visible laser diode 650 nm ±10 nm appears in one nearby specification; exact model mapping is unclear."],
["wired-barcode-scanner","Wired Barcode Scanner","Wired barcode scanner shown with USB, serial, parallel and PS/2 interface references.","",250,"Scan distance 10–700 mm and scanning speed 60 (unit/conditions unclear in source)."],
["wireless-barcode-scanner","Wireless Barcode Scanner","Wireless scanner category shown; battery and USB receiver appear in the profile.","",250],
["omnidirectional-barcode-scanner","Omni Barcode Scanner","Omni barcode scanner named in the POS section.","",250],
["thermal-receipt-printer","Thermal Receipt Printer","Thermal receipt printers listed in multiple configurations, including 58 mm and 80 mm paper widths.","",252,"58 mm / 80 mm widths and speeds 70 mm/s / 250 mm/s occur for separate configurations; verify exact model."],
["dot-matrix-printer","Mini Dot Matrix Printer","Serial impact dot-matrix printer listed with bi-directional printing and 76 mm paper width.","",252,"76 mm paper; 4 LPS profile-stated."],
["pos-cash-drawer","POS Cash Drawer","Cash drawers shown with one configuration listing five bills, five coins and RJ11 connection.","",303],
["pos-paper-rolls","POS Paper Rolls","Thermal, carbon and plain paper rolls and label stickers are listed as POS consumables."],
["desktop-thermal-transfer-printer","Desktop Thermal Transfer Barcode Printer","Printer shown with speed, memory, resolution and media-size details.","",294,"4 ips; 203 DPI; 2 MB DRAM, 2 MB Flash; max width 104 mm; max length 1016 mm (profile-stated)."],
["label-printing-scale","Label Printing Scale","Label printing scale is identified in POS imagery; extracted text does not provide its specifications."],
["pos-software","POS Software","POS software is named in the product line; features and hardware compatibility are unspecified."]],
"queue-management":[
["ess-queue-management-system","ESS-Queue Management System","The profile explicitly names ESS-Queue Management and describes ticketing and service-counter use.","",332,"Ticket-based service flow is depicted; banks, utilities, healthcare and public agencies are listed as application contexts."],
["queue-ticket-kiosk","Queue Ticket Kiosk","Freestanding ticket-issuing kiosk shown in Queue Management section.","",332],
["queue-counter-display","Queue Counter Display","Counter displays shown presenting queue ticket identifiers.","",328],
["queue-operator-keypad","Queue Counter Operator Keypad","Counter operator keypad shown alongside queue display equipment.","",331]],
"cctv-surveillance":[
["outdoor-speed-dome-camera","Outdoor High-Speed Dome Camera","High-speed outdoor dome camera listed; exact mapping to the PTZ model descriptions needs confirmation.","",356],
["indoor-speed-dome-camera","Indoor Speed-Dome Camera","Indoor speed-dome camera category listed in CCTV product line.","",369],
["unmapped-es-camera-models","ES-0015 / ES-0018 / ES-0014 Camera References","Three camera model identifiers appear near the CCTV product list, but the profile does not reliably map each identifier to a camera type or specification.","ES-0015 / ES-0018 / ES-0014",365],
["es-0022-outdoor-dome","ES-0022 Outdoor High-Speed Dome Camera","The profile associates ES-0022 with an outdoor high-speed dome-camera listing; no dependable specifications are mapped to it.","ES-0022",356],
["es-1200sd-outdoor-dome","ES-1200SD Outdoor Dome Camera","Profile describes die-cast aluminum housing, presets, cruise tracks, privacy masking and alarm I/O.","ES-1200SD",356,"128 presets; 6 cruise tracks, 256 preset positions each; 6 privacy masks; RS485; 4 alarm inputs and 1 output (profile-stated)."],
["es-900p-weatherproof-camera","ES-900P Weatherproof Color IR Camera","Weatherproof color IR camera specification listed under ES-900P.","ES-900P",365,"1/3-inch Sony Super HAD CCD; 600 TVL; 36 IR LEDs; stated 60 m IR distance; DC12V/500mA (profile-stated)."],
["es-600p-weatherproof-camera","ES-600P Weatherproof Color IR Camera","Weatherproof color IR camera specification listed under ES-600P.","ES-600P",365,"1/3-inch Sony Super HAD CCD; 480 TVL; 36 IR LEDs; stated 60 m IR distance; DC12V/500mA (profile-stated)."],
["es-700p-camera","ES-700P Weatherproof Color IR Camera","Weatherproof color IR camera entry lists Sony CCD and infrared LEDs.","ES-700P",365,"1/4-inch Sony CCD; 420 TVL; 36 IR LEDs; stated 20–30 m IR distance (profile-stated)."],
["es-300p-dome-camera","ES-300P Indoor Color IR Dome Camera","Indoor color IR dome camera specification listed under ES-300P.","ES-300P",369,"1/3-inch Sony Super CCD; 420 TVL; 35 IR LEDs; stated 15 m IR distance; DC12V/500mA (profile-stated)."],
["es12-ptz-camera","ES12 High-Speed Outdoor PTZ Camera","Outdoor high-speed zoom dome described with pan/tilt/zoom, low-light rating and weatherproof housing.","ES12",356,"0.7 lux low-light rating (profile-stated)."],
["indoor-color-ccd-camera","Indoor Color CCD Camera","Indoor color CCD camera listed; model mapping is not confirmed.","",369],
["video-recording-system","Digital Video Recording System","Digital video recording system listed; formats and channel capacity are not supplied.","",340],
["camera-lenses-brackets","Camera Lenses & Brackets","Lenses and camera brackets listed as CCTV supporting equipment.","",365],
["cctv-monitoring-equipment","CCTV Monitoring Equipment","Monitoring screens and control equipment appear in imagery; exact models/functions unspecified.","",340]],
"digital-signage":[
["smd-digital-pole-streamer-p6","SMD Digital Pole Streamer Screen — Outdoor P6","Outdoor digital pole streamer screen named as Outdoor-P6.","Outdoor-P6",408],
["outdoor-p4-led-module","Outdoor P4.0 High-Refresh LED Display Module","Outdoor P4.0 high-refresh-rate LED display module named in the profile.","Outdoor P4.0",411,"High refresh rate is stated; no numeric rate supplied."],
["p3-outdoor-smd-screen","P3 Outdoor SMD Screen","P3 outdoor SMD screen listed; further specifications are not provided.","P3",408],
["led-smd-screens-gtp","LED SMD Screens / GTP","LED/SMD screens and a GTP designation are included; GTP meaning is unclear.","GTP",411]],
"it-communications":[
["telephone-exchange","Telephone Exchange / PABX","Telephone exchanges and PABX systems referenced in the introduction and historical projects.","",192],
["fax-machine","Facsimile / Fax Machine","Facsimile equipment appears in broad product list and equipment imagery.","",205],
["audio-conference-system","Audio Conference System","Audio conference and sound equipment mentioned in product categories and historical projects.","",206],
["computer-laptop-it","Laptop & IT Equipment","Laptops and IT equipment listed as a broad group-level category.","",203],
["networking-equipment","Networking Equipment","Networking referenced in project descriptions; models and current supply are not stated.","",204],
["walkie-talkie","Walkie-Talkie / Two-Way Radio","Walkie-talkies mentioned in a historical project equipment list; model details unavailable."],
["telecommunication-systems","Telecommunication Systems","Broad telecommunication systems category listed in company introduction."]],
"power-backup":[
["pure-sine-wave-ups","Pure Sine Wave UPS","Pure sine-wave UPS equipment appears in the product line; ratings and model mapping are unspecified.","",193],
["maintenance-free-battery","Maintenance-Free Battery","Maintenance-free batteries are listed in power equipment sections.","",194],
["generator","Generator","Generators named among power-source equipment categories.","",195],
["power-source-system","Power Source System","Power source systems listed; configuration is not described."],
["ups-6kva-reference","6 kVA UPS Reference","Historical project description mentions a 6 kVA UPS; this is a project reference, not a current model.","6 kVA"]],
"smart-lockers":[["techno-smart-lockers","Techno Smart Lockers","Secure storage lockers described with web application, integrations and reporting. Explicitly attributed to TECHNOVATION.","",243,"Web-based application; integration with existing systems; data analytics/reporting; workplace, education and healthcare applications."]],
"solar-products":[["solar-panels","Solar Panels","Solar panels shown in Techno Solar section.","",392],["solar-ups","Solar UPS (Pure Sine Wave)","Solar UPS listed in Techno Solar section."],["solar-charge-cart","Solar Charge Cart","Solar charge cart listed in Techno Solar section."],["solar-maintenance-free-battery","Solar Maintenance-Free Battery","Maintenance-free batteries listed alongside solar products."],["dc-home-solution","DC Home Solution","DC home-solution category listed in Techno Solar section."],["dc-fan","DC Fan","DC fan listed among solar-related products."],["dc-lights","DC Lights","DC lights listed among solar-related products."],["solar-street-light","Solar Street Light","Street light listed in solar product section."],["solar-water-pump","Solar Water Pump","Solar water pump listed in Techno Solar section."],["solar-accessories","Solar System Accessories","DC/AC breakers, arrester, ducting/piping, solar cables and DB boxes listed."],["solar-panel-mounting-structures","Solar Panel Structures & Stands","Solar panel structures/stands mentioned in factory text and shown in Techno Solar imagery.","",392]],
"cnc-fabrication":[["wallers-cnc-laser-cutting","Wallers CNC Laser Cutting Service","Precision cutting service is described under Wallers. This is a service, not an ESSCOM product.","Wallers",389,"Materials: mild steel up to 16 mm; stainless steel 8 mm; aluminum, copper and brass 3 mm; sheet size up to 1525 × 3050 mm (profile-stated)."]],
"physical-security":[["automatic-sliding-gates","Automatic / Motorized Sliding Gates","Automatic and motorized sliding gates mentioned in factory capability description.","",558],["hydraulic-gates","Hydraulic Gates","Hydraulic gates mentioned in factory capability description."],["road-blockers","Road Blockers","Road blockers described among factory-manufactured security equipment.","",576],["turnstile-gates","Turnstile Gates","Turnstile gates mentioned in factory capability and imagery.","",523],["access-control-gates","Access Control Gates","Access-control gates listed in factory description; details unspecified."],["ticket-dispensers-steel","Ticket Dispensers","Ticket dispensers listed among factory steel products, separate from ESS-Queue unless confirmed."],["steel-cabinets-racks","Steel Cabinets, Racks & Almirahs","Factory description names steel furniture including cabinets, racks and almirahs."],["automatic-doors-shutters","Automatic Doors & Shutters","Doors and shutters visible in factory/fabrication imagery; product scope and ownership unclear."],["parking-barriers-bollards","Parking Barriers & Bollards","Barrier and bollard equipment appears in fabrication imagery; range requires confirmation."]],
"household-electronics":[["television","Television","Television appears in Techno Solar illustrative electrical-load list; not evidence of current supply.","",382],["air-conditioner","Air Conditioner","Air-conditioning equipment appears in Techno Solar illustrative load list.","",383],["microwave-oven","Microwave Oven","Microwave appears in Techno Solar illustrative load list.","",384],["electric-motor","Electric Motor","Electric motor appears in Techno Solar illustrative load list.","",385],["water-heater","Water Heater","Water heater appears in Techno Solar illustrative load list.","",386],["refrigerator","Refrigerator","Refrigerator appears in Techno Solar illustrative load list.","",387],["washing-machine","Washing Machine","Washing machine appears in Techno Solar illustrative load list.","",388]]
};
const pages:Record<string,number[]>={"biometric-access-control":[12,13,14,15,16],"office-presentation":[4,12],"pos-retail":[19],"queue-management":[20,21,30,31],"cctv-surveillance":[22,23,24],"digital-signage":[28,29],"it-communications":[4,10,11,12],"power-backup":[12,25],"smart-lockers":[18],"solar-products":[25,27],"cnc-fabrication":[26,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"physical-security":[5,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46],"household-electronics":[4,25]};
const defaultImage:Record<string,number>={"biometric-access-control":208,"pos-retail":252,"queue-management":332,"cctv-surveillance":365,"digital-signage":408,"smart-lockers":243};
const mediaRecords=mediaData as {id:number;originalName:string;originalWidth:number;originalHeight:number;outputs:{src:string;width:number;height:number}[]}[];
function mediaFor(id:number|undefined,name:string):MediaAsset[]{if(!id)return[];const m=mediaRecords.find(x=>x.id===id);if(!m)return[];const largest=m.outputs[m.outputs.length-1];return [{id:"profile-"+String(id).padStart(4,"0"),sourceAssetId:"profile-"+String(id).padStart(4,"0"),src:largest.src,alt:name+" shown in supplied Techno World International profile; representative category image",width:m.originalWidth,height:m.originalHeight,approved:true,kind:"photograph",sources:m.outputs,caption:"Profile photograph · representative category image",sourceReference:"MEDIA_INVENTORY.md · "+m.originalName,websitePlacement:"Product category/detail representative image"}]}
const products:Product[]=[];
for(const [categoryId,records] of Object.entries(seeds)) for(const [slug,name,description,model,imageId,detail] of records){const cat=getProductCategory(categoryId)!;const image=mediaFor(imageId??defaultImage[categoryId],name);const detailText=detail??"";const parts=detailText.split(";").map(x=>x.trim()).filter(Boolean);const numericParts=parts.filter(x=>/[0-9]|DPI|MHz|mm|LPS|TCP|RS|USB|lux|TVL|Flash|RAM|HDD|ips|mA/i.test(x));const specs=numericParts.map(x=>{const j=x.indexOf(":");return j>0?[x.slice(0,j).trim(),x.slice(j+1).trim()] as [string,string]:["Profile-stated details",x] as [string,string]});const feats=parts.filter(x=>!numericParts.includes(x));products.push({id:slug,slug,name,categoryId,description,overview:description+" Source reference from the supplied company profile. Legacy product data is not confirmation of current model, ownership, compatibility or availability.",...(model?{model}:{}),keywords:[cat.title,cat.shortTitle,cat.divisionLabel,...cat.sourcePages.map(n=>"page "+n)],images:image,features:feats.map(text=>({text,verified:true})),specifications:specs.map(([label,value])=>({label,value,verified:true})),applications:categoryId==="queue-management"?["Banks","Utilities","Healthcare","Public agencies","Operating service counters"]:categoryId==="smart-lockers"?["Workplaces","Education and student services","Healthcare and medical supply management"]:[],relatedProductIds:[],published:true,verificationStatus:"profile-reference",divisionAttribution:cat.attribution==="esscom-confirmed"?"esscom-solutions":cat.attribution==="other-division"?"other-division":"unconfirmed",divisionLabel:cat.divisionLabel,sourcePages:pages[categoryId],sourceReference:"Supplied company profile, pages "+pages[categoryId].join(", ")});}
export { products };
export function selectPublishedProducts(records:Product[]){return records.filter(p=>p.published&&(p.verificationStatus==="profile-reference"||p.verificationStatus==="approved")&&!!getProductCategory(p.categoryId)).map(p=>({...p,images:p.images.filter(x=>x.approved),features:p.features.filter(x=>x.verified),specifications:p.specifications.filter(x=>x.verified)}));}
export const publishedProducts=selectPublishedProducts(products);
export const productHref=(slug:string)=>"/products/"+slug+"/";
export const getProduct=(slug:string)=>publishedProducts.find(p=>p.slug===slug);
export function relatedProducts(product:Product,candidates=publishedProducts){return candidates.filter(p=>p.id!==product.id&&(product.relatedProductIds.includes(p.id)||p.categoryId===product.categoryId)).slice(0,4);}
const visuals:Record<string,EquipmentVisual>={"biometric-access-control":"biometric","office-presentation":"pos","pos-retail":"pos","queue-management":"queue","cctv-surveillance":"camera","digital-signage":"display","it-communications":"pos","power-backup":"display","smart-lockers":"rfid","solar-products":"display","cnc-fabrication":"camera","physical-security":"rfid","household-electronics":"display"};
export function toProductCard(p:Product):CatalogItem{const c=getProductCategory(p.categoryId)!;return{id:p.id,name:p.name,description:p.description,categoryId:c.id,category:c.shortTitle,keywords:p.keywords,model:p.model,visual:visuals[c.id],image:p.images[0],kind:"product",href:productHref(p.slug),quoteHref:quoteHref(p.name),attributionLabel:p.divisionLabel};}
export const catalogItems=publishedProducts.map(toProductCard);
export const featuredCatalogItems=productCategories.map(category=>catalogItems.find(item=>item.categoryId===category.id&&item.image)).filter((item):item is CatalogItem=>!!item).slice(0,6);
export const productCountByCategory=productCategories.map(category=>({category,count:publishedProducts.filter(p=>p.categoryId===category.id).length}));
