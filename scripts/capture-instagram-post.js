async page => {
  // Local research helper: operates only on the already-open target post.
  const ids = ['DfMlKKMEeJ0', 'DcVhJJ2sEtU', 'DfkZ1_GRd5G', 'DfHolFHI5R8', 'DePrkXFEb5r', 'DeV9iNojNS7', 'DepZC3kEavk', 'DfDCprykU_E', 'DfScPKiRPK6', 'DdHnJ1HxWSp'];
  const id = new URL(page.url()).pathname.split('/').filter(Boolean).at(-1);
  const order = ids.indexOf(id) + 1;
  if (!order) throw new Error('Not one of the ten authorized research posts');
  const directory = `data/chispaconcalma/research/posts/${String(order).padStart(2, '0')}-${id}`;
  await page.waitForFunction(() => [...document.querySelectorAll('main video, main img')].some(m => {
    const r = m.getBoundingClientRect();
    return r.width > 250 && r.height > 250 && r.y >= 0 && r.y < innerHeight / 2;
  }), null, { timeout: 20000 });
  const anchor = await page.evaluate(() => {
    const m = [...document.querySelectorAll('main video, main img')].find(m => {
      const r = m.getBoundingClientRect();
      return r.width > 250 && r.height > 250 && r.y >= 0 && r.y < innerHeight / 2 && r.x >= 0 && r.right <= innerWidth;
    });
    if (!m) throw new Error('No visible primary media');
    const r = m.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  await page.mouse.move(1100, 800);
  const capture = async (index, targetTime) => {
    await page.waitForFunction(a => [...document.querySelectorAll('main video, main img')].some(m => {
      const r = m.getBoundingClientRect();
      return Math.abs(r.x - a.x) < 2 && Math.abs(r.y - a.y) < 2 && r.width > 250;
    }), anchor, { timeout: 15000 });
    const details = await page.evaluate(a => {
      const media = [...document.querySelectorAll('main video, main img')].filter(m => {
        const r = m.getBoundingClientRect();
        return Math.abs(r.x - a.x) < 2 && Math.abs(r.y - a.y) < 2 && r.width > 250;
      });
      const m = media.find(m => m.tagName === 'VIDEO') || media[0];
      return { type: m.tagName === 'VIDEO' ? 'video' : 'image', duration: Number.isFinite(m.duration) ? m.duration : null };
    }, anchor);
    if (details.type === 'video') {
      await page.evaluate(async ({a, t}) => {
        const v = [...document.querySelectorAll('main video')].find(v => Math.abs(v.getBoundingClientRect().x - a.x) < 2 && Math.abs(v.getBoundingClientRect().y - a.y) < 2);
        v.muted = true;
        if (Number.isFinite(v.duration)) v.currentTime = Math.min(t ?? 1, Math.max(0, v.duration - 1));
        await v.play();
      }, { a: anchor, t: targetTime });
      await page.waitForFunction(a => {
        const v = [...document.querySelectorAll('main video')].find(v => Math.abs(v.getBoundingClientRect().x - a.x) < 2 && Math.abs(v.getBoundingClientRect().y - a.y) < 2);
        return v && !v.paused && !v.seeking && v.readyState >= 2 && v.currentTime > 0.3;
      }, anchor, { timeout: 15000 });
      // Let playback, not a paused frame, dismiss the central player overlay.
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    }
    const suffix = targetTime === undefined ? `slide-${String(index).padStart(2, '0')}` : `frame-${String(index).padStart(2, '0')}`;
    const file = `${directory}/${suffix}.png`;
    await page.screenshot({ path: file, clip: anchor });
    const actualTime = details.type === 'video' ? await page.evaluate(a => [...document.querySelectorAll('main video')].find(v => Math.abs(v.getBoundingClientRect().x - a.x) < 2)?.currentTime, anchor) : null;
    return { index, type: details.type, file, requested_seconds: targetTime ?? null, actual_seconds: actualTime, capture: 'Rendered screenshot; mute/navigation badges may remain; not original media' };
  };
  const captures = [];
  const next = page.getByRole('button', { name: 'Next', exact: true });
  let carousel = await next.count() > 0 && await next.isVisible();
  let complete = true;
  if (carousel) {
    for (let n = 1; n <= 30; n++) {
      captures.push(await capture(n));
      if (await next.count() === 0 || !await next.isVisible()) break;
      if (n === 30) { complete = false; break; }
      await next.click();
      await page.waitForFunction(n => Number(new URL(location.href).searchParams.get('img_index')) === n, n + 1);
      // URL changes before the carousel finishes moving. Confirm that the
      // requested slide, not its departing neighbor, occupies the capture box.
      await page.waitForFunction(({ a, n }) => [...document.querySelectorAll('main ul > li')].some(li => {
        const r = li.getBoundingClientRect();
        const offset = new DOMMatrix(getComputedStyle(li).transform).m41;
        return r.width > 250 && Math.abs(r.x - a.x) < 1 && Math.abs(r.y - a.y) < 1 && Math.abs(offset - (n - 1) * a.width) < 2;
      }), { a: anchor, n: n + 1 }, { timeout: 15000 });
    }
  } else {
    const v = page.locator('main video').first();
    if (await v.count()) {
      await page.waitForFunction(() => Number.isFinite(document.querySelector('main video')?.duration), null, { timeout: 15000 });
      const duration = await v.evaluate(v => v.duration);
      const times = [...new Set([Math.min(2, duration / 4), duration * 0.25, duration * 0.5, duration * 0.75, Math.max(0, duration - 2)].map(t => Math.round(t * 10) / 10))];
      for (const t of times) captures.push(await capture(captures.length + 1, t));
    } else captures.push(await capture(1));
  }
  const metadata = await page.evaluate(() => ({ published_at: document.querySelector('main time')?.getAttribute('datetime'), main_text: document.querySelector('main')?.innerText.split('No comments yet.')[0] }));
  return { shortcode: id, order, carousel, complete, captures, ...metadata };
}
