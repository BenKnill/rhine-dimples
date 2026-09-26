import puppeteer from 'puppeteer-core';
const [OUT, ...ids] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--hide-scrollbars'] });
const wait = ms => new Promise(r => setTimeout(r, ms)), p = await b.newPage(); await p.setViewport({ width: 1280, height: 900 });
p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto('file:///Users/boxer/ben-advice/rhine-dimples/docs/index.html', { waitUntil: 'networkidle0' });
for (const spec of ids) { const [id, ms] = spec.split('@'); const el = await p.$(`#${id}`); await el.evaluate(e => e.scrollIntoView({ block: 'center' })); await wait(+ms || 1500);
  const fig = await el.evaluateHandle(e => e.closest('figure')); await fig.screenshot({ path: `${OUT}/${id}_${ms || 0}.jpg`, type: 'jpeg', quality: 85 }); }
await b.close();
