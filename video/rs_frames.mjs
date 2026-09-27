import puppeteer from 'puppeteer-core';
const OUT = process.argv[2];
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///Users/boxer/ben-advice/rhine-dimples/video/film3.html', { waitUntil: 'networkidle0' }); await p.evaluate(() => window.filmReady);
const s = (await p.evaluate(() => window.SCENES)).find(x => x.id === 'ring-surface'); let k = 0;
for (const f of [0.25, 0.45, 0.62, 0.78, 0.9, 0.98]) { const t1 = s.start + f * (s.end - s.start); await p.evaluate((a, t1) => { for (let t = a; t < t1; t += 1 / 30) window.renderAt(t); window.renderAt(t1); }, k ? s.start + (f - 0.001) * (s.end - s.start) - 1 / 30 : s.start, t1); await p.screenshot({ path: `${OUT}/rs${k++}.jpg`, type: 'jpeg', quality: 70 }); }
await b.close();
