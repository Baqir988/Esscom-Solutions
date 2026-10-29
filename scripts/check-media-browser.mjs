// Private rendering checks. No fixture routes or source photos enter public/ or out/.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {chromium,webkit} from '@playwright/test';
import {ApprovedImage} from '../src/components/ui/approved-image.tsx';
const manifest=JSON.parse(await fs.readFile('src/data/media-manifest.json','utf8'));
const candidate=manifest.assets.find(a=>a.id==='profile-0365');
assert(candidate);
const sourceMap=new Map(candidate.optimized.map(o=>[`/images/company-profile/qa-${o.width}.webp`,o.path]));
const fixture={src:`/images/company-profile/qa-${candidate.width}.webp`,width:candidate.width,height:candidate.height,
  alt:'Private responsive-source rendering test',approved:true,kind:'photograph',
  sources:candidate.optimized.map(o=>({src:`/images/company-profile/qa-${o.width}.webp`,width:o.width,height:o.height}))};
const markup=renderToStaticMarkup(createElement(ApprovedImage,{image:fixture,label:'Private rendering test',sizes:'240px'}));
const html=`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Private media test</title><style>body{margin:0}.approved-image{display:block;width:240px;height:170px;object-fit:scale-down}.responsive-media{display:contents}</style></head><body>${markup}</body></html>`;
for(const [name,engine,options] of [['Chrome',chromium,{channel:'chrome'}],['WebKit',webkit,{}]]){
  const browser=await engine.launch({headless:true,...options});
  try{
    for(const dpr of [1,2]){
      const context=await browser.newContext({viewport:{width:390,height:800},deviceScaleFactor:dpr});
      const requests=[];
      await context.route('https://media.example.test/**',async route=>{
        const url=new URL(route.request().url());
        if(url.pathname==='/')return route.fulfill({contentType:'text/html',body:html});
        if(sourceMap.has(url.pathname)){
          requests.push(url.pathname);
          return route.fulfill({contentType:'image/webp',body:await fs.readFile(sourceMap.get(url.pathname))});
        }
        return route.fulfill({status:404});
      });
      const page=await context.newPage();await page.goto('https://media.example.test/');
      await page.locator('img').evaluate(image=>image.decode());
      const current=await page.locator('img').evaluate(image=>({src:image.currentSrc,width:image.getBoundingClientRect().width,height:image.getBoundingClientRect().height}));
      assert(current.src.endsWith(`qa-${dpr===1?320:640}.webp`),`${name} DPR ${dpr}: ${current.src}`);
      assert.equal(current.width,240);assert.equal(current.height,170);
      assert(!requests.some(src=>src.endsWith('648.webp')),'Full-size fallback downloaded unnecessarily');
      await context.close();
    }
    const page=await browser.newPage({viewport:{width:390,height:850}});
    await page.goto(pathToFileURL(path.resolve('private/company-profile/review.html')).href);
    await page.locator('details').evaluate(node=>{node.open=true;});
    const failures=await page.locator('img').evaluateAll(async images=>{
      for(const image of images)image.loading='eager';
      return (await Promise.all(images.map(async image=>{try{await image.decode();return null;}catch{return image.getAttribute('src');}}))).filter(Boolean);
    });
    assert.deepEqual(failures,[],`${name}: broken private gallery images`);
    assert.equal(await page.locator('img').count(),634);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
    console.log(`PASS ${name}: 1x/2x responsive selection, reserved dimensions, no largest-source overfetch, 634 private review image instances decoded, mobile review layout fits.`);
  }finally{await browser.close();}
}
