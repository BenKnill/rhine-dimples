import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist'] });
const p = await b.newPage(); await p.setViewport({width:1280,height:900});
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('response', r => { if (r.status() >= 400 && !r.url().endsWith('favicon.ico')) errs.push(r.status() + ' ' + r.url()); });
await p.goto('https://benknill.github.io/rhine-dimples/', {waitUntil:'networkidle0'});
await p.click('#oar'); await p.click('#dye'); await new Promise(r => setTimeout(r, 3000));
console.log('readout:', (await p.$eval('#readout', e => e.innerText)).replace(/\n/g, ' | '));
console.log('errors:', errs.length ? errs.join('; ') : 'none');
await b.close();
