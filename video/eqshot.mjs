import puppeteer from 'puppeteer-core';
const OUT = process.argv[2];
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--hide-scrollbars'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 900 });
await p.goto('file:///Users/boxer/ben-advice/rhine-dimples/docs/index.html', { waitUntil: 'networkidle0' });
const n = await p.$$eval('.eq.key', els => els.length);
for (let i = 0; i < n; i++) {
  const r = await p.evaluate(i => { const e = document.querySelectorAll('.eq.key')[i]; e.scrollIntoView({ block: 'center' }); const q = e.getBoundingClientRect(); return { x: q.x - 10, y: q.y + window.scrollY - 170, w: q.width + 20, h: q.height + 300 }; }, i);
  await new Promise(r => setTimeout(r, 300)); await p.screenshot({ path: `${OUT}/eq${i}.jpg`, type: 'jpeg', quality: 80, clip: { x: r.x, y: r.y, width: r.w, height: r.h } });
}
console.log(n); await b.close();
