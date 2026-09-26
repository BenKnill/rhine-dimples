import puppeteer from 'puppeteer-core';
const [url, out, w, h] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--hide-scrollbars','--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({width:+(w||1920),height:+(h||1080)});
p.on('pageerror', e => console.log('[pageerror]', e.message)); p.on('console', m => console.log('[page]', m.text()));
await p.goto(url, {waitUntil:'load'}); await p.waitForFunction(() => window.done === true, {timeout: 120000});
await p.screenshot({path: out, type: out.endsWith('.png') ? 'png' : 'jpeg', quality: out.endsWith('.png') ? undefined : 88});
await b.close(); console.log('ok', out);
