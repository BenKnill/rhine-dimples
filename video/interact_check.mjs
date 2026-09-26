// Drive the page: paddle stroke, tap, presets; report stats and grab frames.
import puppeteer from 'puppeteer-core';
const OUT = process.argv[2];
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--hide-scrollbars'] });
const wait = ms => new Promise(r => setTimeout(r, ms)), p = await b.newPage(); await p.setViewport({ width: 1280, height: 900 });
p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///Users/boxer/ben-advice/rhine-dimples/docs/index.html', { waitUntil: 'networkidle0' });
const stats = async () => (await p.$eval('#stats', e => e.innerText)).replace(/\n/g, ' ');
await p.click('#boils'); await wait(300); console.log('boils off:', await stats());
await p.click('#marks'); await p.evaluate(() => window.scrollTo(0, 0)); await wait(200);
const box = await (await p.$('#stage')).boundingBox();
await p.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.7); await p.mouse.down();
for (let k = 1; k <= 10; k++) { await p.mouse.move(box.x + box.width * (0.35 + 0.025 * k), box.y + box.height * (0.7 - 0.015 * k)); await wait(20); }
await (await p.$('#stage')).screenshot({ path: `${OUT}/stroke_preview.jpg`, type: 'jpeg', quality: 85 });
await p.mouse.up(); await wait(400); console.log('after stroke:', await stats());
await p.mouse.click(box.x + box.width * 0.7, box.y + box.height * 0.6); await wait(2500); console.log('after tap:', await stats());
await (await p.$('#stage')).screenshot({ path: `${OUT}/after_stroke.jpg`, type: 'jpeg', quality: 85 });
await p.evaluate(() => window.scrollTo(0, 0));
for (const id of ['leap', 'three', 'four']) { await p.click('#' + id); await wait(3000); console.log(id, await stats()); await (await p.$('#stage')).screenshot({ path: `${OUT}/preset_${id}.jpg`, type: 'jpeg', quality: 85 }); }
await p.click('#tSingle'); await p.evaluate(() => window.scrollTo(0, 0)); await wait(200); await p.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.6); await wait(300); console.log('single:', await stats(), '|', await p.$eval('#toolNote', e => e.innerText));
await p.click('#vTop'); await p.click('#leap'); await wait(3500); await (await p.$('#stage')).screenshot({ path: `${OUT}/top_leap.jpg`, type: 'jpeg', quality: 85 });
await b.close();
