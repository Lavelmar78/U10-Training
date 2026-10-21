// Plays every drill animation through 3 loops in a headless browser and
// reports problems: script errors, non-ASCII SVG text (crashes some mobile
// browsers), NaN/undefined attributes, players drawn off the pitch, and
// players jumping more than JUMP units between frames, and text that runs off
// the diagram or overlaps other text.
//
// Usage: node tools/check-animations.js [--shots <dir>]
// Needs Playwright (npm i -g playwright). Exits 1 if any hard error is found.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const shotsIdx = process.argv.indexOf('--shots');
const SHOTS = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null;
const INDEX = path.resolve(__dirname, '..', 'index.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(String(e)));
  // Firebase is not needed to draw diagrams.
  await page.route(/gstatic|googleapis|firebase/, r => r.abort());
  await page.goto('file://' + INDEX);
  await page.waitForTimeout(300);

  const result = await page.evaluate((withShots) => {
    const NS = 'http://www.w3.org/2000/svg';
    const LOOPS = 3, STEPS = 400, JUMP = 25;
    const SAMPLES = [0.05, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95];
    const problems = [], warnings = [];
    if (typeof animSprintSlow !== 'function') problems.push('animSprintSlow is missing');

    // SVGs must be in the document for getBBox to measure text.
    const stage = document.createElement('div');
    stage.style.cssText = 'position:absolute;left:-5000px;top:0';
    document.body.appendChild(stage);
    function textIssues(svg, w, h) {
      const boxes = [...svg.querySelectorAll('text')].filter(t => t.textContent.trim()).map(t => {
        const b = t.getBBox(); return { s: t.textContent, x1: b.x, y1: b.y, x2: b.x + b.width, y2: b.y + b.height };
      });
      const out = [];
      boxes.forEach(b => { if (b.x1 < 0 || b.x2 > w || b.y1 < 0 || b.y2 > h) out.push('cut off: "' + b.s + '"'); });
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], b = boxes[j];
        if (a.s.length <= 3 && b.s.length <= 3) continue; // two player labels touching is normal
        const ox = Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1), oy = Math.min(a.y2, b.y2) - Math.max(a.y1, b.y1);
        if (ox > 2 && oy > 2) out.push('overlap: "' + a.s + '" / "' + b.s + '"');
      }
      return out;
    }

    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.style.cssText = 'position:absolute;left:0;top:0;background:#222;padding:4px;z-index:99999;font:11px sans-serif;color:#fff';
    document.body.appendChild(grid);

    function scan(svg) {
      const players = [], bad = [], text = [];
      svg.querySelectorAll('*').forEach(el => {
        for (const a of el.attributes) if (/NaN|undefined|Infinity/.test(a.value)) bad.push(el.tagName + '.' + a.name);
      });
      svg.querySelectorAll('text').forEach(t => { if (/[^\x00-\x7f]/.test(t.textContent)) text.push(t.textContent); });
      svg.querySelectorAll('g').forEach(g => {
        const c = g.querySelector(':scope > circle'), tx = g.querySelector(':scope > text');
        if (c && tx) players.push({ k: tx.textContent + '|' + c.getAttribute('fill'), x: +c.getAttribute('cx'), y: +c.getAttribute('cy') });
      });
      return { players, bad, text };
    }
    function maxJump(a, b) {
      let max = 0; const used = new Set();
      a.forEach(p => {
        let best = -1, bd = Infinity;
        b.forEach((q, i) => {
          if (used.has(i) || q.k !== p.k) return;
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < bd) { bd = d; best = i; }
        });
        if (best > -1) { used.add(best); max = Math.max(max, bd); }
      });
      return max;
    }

    for (const d of DRILLS) {
      const tag = d.id + ' ' + d.name;
      const fn = typeof d.anim === 'function' ? d.anim : window[d.anim];
      if (typeof fn !== 'function') { problems.push(tag + ': animation ' + d.anim + ' not found'); continue; }
      const [, , w, h] = d.viewBox.split(' ').map(Number);
      const mk = () => { const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', d.viewBox); s.setAttribute('width', w * 0.8); s.setAttribute('height', h * 0.8); return s; };
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;flex-wrap:wrap;width:1000px;gap:4px;margin-bottom:6px';
      const lab = document.createElement('div'); lab.style.width = '1000px'; lab.textContent = tag;
      row.appendChild(lab);
      const textBad = new Set(), layout = new Set(), attrIssues = new Set(), jumps = [], offPitch = new Set();

      const still = mk(); stage.appendChild(still);
      try { fn(still, 0, false, {}, w, h); } catch (e) { problems.push(tag + ': static diagram throws ' + e.message); }
      textIssues(still, w, h).forEach(x => layout.add('still ' + x));
      const s0 = scan(still); s0.text.forEach(x => textBad.add(x)); s0.bad.forEach(x => attrIssues.add(x));
      row.appendChild(still);

      const svg = mk(), state = {}; stage.appendChild(svg);
      let prev = null, errored = false;
      for (let i = 0; i <= STEPS * LOOPS && !errored; i++) {
        const loop = Math.floor(i / STEPS), t = (i % STEPS) / STEPS;
        try { fn(svg, t, true, state, w, h); }
        catch (e) { problems.push(tag + ': throws at loop ' + (loop + 1) + ' t=' + t.toFixed(2) + ': ' + e.message); errored = true; break; }
        const s = scan(svg);
        s.text.forEach(x => textBad.add(x));
        s.bad.forEach(x => attrIssues.add(x));
        if (loop === 0 && SAMPLES.some(x => Math.abs(x - t) < 1e-9)) textIssues(svg, w, h).forEach(x => layout.add(x));
        s.players.forEach(p => { if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) offPitch.add(p.k.split('|')[0]); });
        if (prev && t !== 0) {
          const j = maxJump(prev.players, s.players);
          if (j > JUMP && jumps.length < 5) jumps.push('t=' + t.toFixed(2) + ' (' + Math.round(j) + ')');
        }
        prev = s;
        if (withShots && loop === 0 && SAMPLES.some(x => Math.abs(x - t) < 1e-9)) row.appendChild(svg.cloneNode(true));
      }
      if (textBad.size) problems.push(tag + ': non-ASCII SVG text ' + JSON.stringify([...textBad]));
      if (layout.size) warnings.push(tag + ': text ' + [...layout].slice(0, 4).join('; '));
      if (attrIssues.size) problems.push(tag + ': bad attributes ' + [...attrIssues].slice(0, 4).join(', '));
      if (offPitch.size) warnings.push(tag + ': players off the pitch ' + [...offPitch].join(', '));
      if (jumps.length) warnings.push(tag + ': players jump at ' + jumps.join(', '));
      if (withShots) grid.appendChild(row);
      svg.remove();
    }
    return { problems, warnings, count: DRILLS.length };
  }, !!SHOTS);

  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    const rows = await page.$$('#grid > div');
    for (let i = 0; i < rows.length; i++) await rows[i].screenshot({ path: path.join(SHOTS, String(i).padStart(2, '0') + '.png') });
  }
  await browser.close();

  pageErrors.forEach(e => result.problems.push('page error: ' + e));
  console.log('Checked ' + result.count + ' drills.');
  result.warnings.forEach(w => console.log('WARN  ' + w));
  result.problems.forEach(p => console.log('ERROR ' + p));
  console.log(result.problems.length ? result.problems.length + ' error(s)' : 'No errors.');
  process.exit(result.problems.length ? 1 : 0);
})();
