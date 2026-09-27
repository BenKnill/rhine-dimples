// Render one still per scene (a few seconds into it) to check the rough cut quickly.
import puppeteer from 'puppeteer-core';
const OUT = process.argv[2], only = process.argv[3];
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--hide-scrollbars','--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 });
p.on('pageerror', e => console.log('[pageerror]', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('[err]', m.text()); });
await p.goto('file:///Users/boxer/ben-advice/rhine-dimples/video/' + (process.env.FILM || 'film2.html'), { waitUntil: 'networkidle0' });
await p.evaluate(() => window.filmReady);
const scenes = await p.evaluate(() => window.SCENES); console.log(scenes.length, 'scenes; duration', await p.evaluate(() => window.DURATION));
for (const s of scenes) {
  if (only && !only.split(',').includes(s.id)) continue;
  const t = Math.min(s.end - 0.2, s.start + Math.min(6, (s.end - s.start) * 0.6));
  const t0 = Date.now(); await p.evaluate((a, b_) => { for (let x = a; x < b_; x += 1 / 24) window.renderAt(x); window.renderAt(b_); }, s.start, t);
  await p.screenshot({ path: `${OUT}/${s.id}.jpg`, type: 'jpeg', quality: 70 }); console.log(s.id, s.start.toFixed(1), '→', s.end.toFixed(1), `${((Date.now() - t0) / 1000 / ((t - s.start) * 24 + 1) * 1000).toFixed(0)} ms/frame`);
}
await b.close();
