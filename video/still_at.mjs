// Render one frame of a film page at ?t=: node still_at.mjs "file:///.../film6.html?t=12&warm=2" out.jpg
import puppeteer from 'puppeteer-core';
const [url, out] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-angle=metal','--ignore-gpu-blocklist','--allow-file-access-from-files'] });
const p = await b.newPage(); await p.setViewport({ width: 1280, height: 720 }); p.on('pageerror', e => console.log('[pageerror]', e.message));
await p.goto(url); await p.waitForFunction('window.done', { timeout: 120000 }); await p.screenshot({ path: out, type: 'jpeg', quality: 80 }); await b.close();
