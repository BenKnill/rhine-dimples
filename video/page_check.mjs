// Screenshots of the page: stage (after dye), each figure, and a phone-width pass.
import puppeteer from 'puppeteer-core';
const OUT = process.argv[2] || '/tmp', URL = process.argv[3] || 'file:///Users/boxer/ben-advice/rhine-dimples/docs/index.html';
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--hide-scrollbars'] });
const wait = ms => new Promise(r => setTimeout(r, ms));
for (const [name, w, h, dpr] of [['desk', 1280, 900, 1], ['phone', 390, 844, 2]]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: dpr });
  p.on('pageerror', e => console.log(`[${name} pageerror]`, e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log(`[${name} ${m.type()}]`, m.text()); });
  await p.goto(URL, { waitUntil: 'networkidle0' });
  await wait(4000); const st0 = await p.$('#stage'); await st0.screenshot({ path: `${OUT}/${name}_boat.jpg`, type: 'jpeg', quality: 85 });
  await p.click('#vTop'); await wait(1500); await p.click('#dye'); await wait(5000);
  console.log(name, 'stats:', await p.$eval('#stats', e => e.innerText.replace(/\n/g, ' | ')));
  const st = await p.$('#stage'); await st.screenshot({ path: `${OUT}/${name}_stage.jpg`, type: 'jpeg', quality: 85 });
  const ctl = await p.$('.controls'); await ctl.screenshot({ path: `${OUT}/${name}_controls.jpg`, type: 'jpeg', quality: 85 });
  for (const id of ['figDip', 'figLoop', 'figLines', 'figRiver', 'figStretch', 'figFade', 'figHam']) {
    const el = await p.$(`#${id}`); await el.evaluate(e => e.scrollIntoView({ block: 'center' })); await wait(id === 'figRiver' ? 7500 : id === 'figHam' ? 6000 : 1600);
    const fig = await el.evaluateHandle(e => e.closest('figure')); await fig.screenshot({ path: `${OUT}/${name}_${id}.jpg`, type: 'jpeg', quality: 85 });
  }
  if (name === 'desk') { await p.click('[data-ham="river"]'); const el = await p.$('#figHam'); await wait(6000); const fig = await el.evaluateHandle(e => e.closest('figure')); await fig.screenshot({ path: `${OUT}/${name}_ham_river.jpg`, type: 'jpeg', quality: 85 }); }
  if (name === 'desk') for (const m of ['arch', 'end']) {
    await p.click(`[data-line="${m}"]`); const el = await p.$('#figLines'); await wait(m === 'end' ? 6800 : 1500);
    const fig = await el.evaluateHandle(e => e.closest('figure')); await fig.screenshot({ path: `${OUT}/${name}_lines_${m}.jpg`, type: 'jpeg', quality: 85 });
  }
  await p.close();
}
await b.close(); console.log('done');
