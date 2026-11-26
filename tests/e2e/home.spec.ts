import { expect, test } from '@playwright/test';
import { assertDeployedRobots } from '../support/deployed-robots.mjs';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Interactions need the hydrated island; the no-JavaScript test has its own context.
  await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
});

test('homepage renders its real content without client errors or broken assets', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failed.push(response.url());
  });
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Dale calma',
  );
  await expect(page.locator('#contacto')).toBeVisible();
  await expect(page.locator('img').first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator('img')
      .evaluateAll((images) =>
        images.every(
          (image) =>
            image instanceof HTMLImageElement &&
            image.complete &&
            image.naturalWidth > 0,
        ),
      ),
  ).toBe(true);
  expect(errors).toEqual([]);
  expect(failed).toEqual([]);
});

test('menu opens, navigates and closes', async ({ page }) => {
  const menu = page.locator('button[aria-controls="menu-panel"]');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page
    .getByRole('navigation', { name: 'Menú', exact: true })
    .getByRole('link', { name: 'Servicios', exact: true })
    .click();
  await expect(page).toHaveURL(/#servicios$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('quiz produces a result and can restart', async ({ page }) => {
  const quiz = page.locator('#test');
  await quiz.scrollIntoViewIfNeeded();
  await quiz
    .getByRole('button', { name: 'La guardo en algún sitio', exact: false })
    .click();
  await quiz
    .getByRole('button', { name: 'Mil carpetas', exact: false })
    .click();
  await quiz
    .getByRole('button', { name: 'No encontrar', exact: false })
    .click();
  await expect(quiz).toContainText('El Coleccionista');
  await quiz.getByRole('button', { name: /repetir|volver|otra vez/i }).click();
  await expect(
    quiz.getByRole('button', {
      name: 'La guardo en algún sitio',
      exact: false,
    }),
  ).toBeVisible();
});

test('service details expand and collapse', async ({ page }) => {
  const service = page.locator('#servicios').getByRole('button', {
    name: /Organización y sistemas digitales/,
  });
  await service.click();
  await expect(service).toHaveAttribute('aria-expanded', 'true');
  await service.click();
  await expect(service).toHaveAttribute('aria-expanded', 'false');
});

test('breathing exercise opens and closes', async ({ page }) => {
  await page
    .getByRole('button', {
      name: /respirar|respira conmigo|pausa de un minuto/i,
    })
    .first()
    .click();
  const dialog = page.getByRole('dialog', { name: 'Respira conmigo' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Cerrar', exact: true }).click();
  await expect(dialog).toHaveCount(0);
});

test('breathing dialog traps keyboard focus and Escape restores its trigger', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Respirar ahora' }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Respira conmigo' });
  await expect(dialog.getByRole('button').first()).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('closed menu links are not keyboard-accessible', async ({ page }) => {
  const navigation = page.locator('#menu-panel');
  await expect(navigation).toHaveAttribute('inert', '');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await expect(navigation).not.toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeFocused();
});

test('no broken placeholder links or simulated resource delivery', async ({
  page,
}) => {
  expect(
    await page
      .locator('a[href]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute('href'))
          .filter((href) => href?.includes('[TU-') || href?.includes('{{')),
      ),
  ).toEqual([]);
  await expect(page.locator('#recursos')).toContainText('no están disponibles');
  expect(await page.locator('form input[type="email"]').count()).toBe(0);
});

test('mobile layout has no horizontal page overflow', async ({ page }) => {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
});

test('resource cards stay inside a narrow mobile viewport instead of being clipped', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const cards = page.locator('#recursos article');
  expect(await cards.count()).toBeGreaterThan(0);
  for (const card of await cards.all()) {
    const box = await card.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
});

test('reduced-motion users retain the compact navigation after scrolling', async ({
  page,
}) => {
  const header = page.locator('header');
  const initialHeight = (await header.boundingBox())!.height;
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await header.boundingBox())!.height)
    .toBeLessThan(initialHeight);
});

test('prelaunch HTML is noindex before JavaScript', async ({
  browser,
  request,
}) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.setContent(await response.text(), {
      waitUntil: 'domcontentloaded',
    });
    const robots = page.locator('head meta[name="robots"]');
    await expect(robots).toHaveCount(1);
    const directives = (await robots.getAttribute('content'))!
      .toLowerCase()
      .split(/\s*,\s*/);
    expect(directives).toEqual(expect.arrayContaining(['noindex', 'nofollow']));
    expect(directives).not.toContain('index');
    expect(directives).not.toContain('follow');
  } finally {
    await context.close();
  }
});

test('robots allows reading prelaunch indexing directives', async ({
  request,
}) => {
  const response = await request.get('/robots.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/^text\/plain\b/i);
  expect((await response.text()).trim().split(/\r?\n/)).toEqual([
    'User-agent: *',
    'Allow: /',
  ]);
});

test('deployed documents and assets carry HTTP noindex', async ({
  request,
}) => {
  test.skip(
    !process.env.EXPECTED_SHA,
    'Local Astro preview does not apply Cloudflare response headers',
  );
  for (const path of ['/', '/robots.txt', '/assets/portrait.png']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    assertDeployedRobots(response.url(), response.headers()['x-robots-tag']);
  }
});

test('deployed staging is the exact requested revision', async ({
  request,
}) => {
  test.skip(
    !process.env.EXPECTED_SHA,
    'Revision assertion only applies to deployed staging',
  );
  const response = await request.get(
    `/deployment.json?sha=${process.env.EXPECTED_SHA}`,
    {
      headers: { 'Cache-Control': 'no-cache' },
    },
  );
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({ sha: process.env.EXPECTED_SHA });
});

test('page remains meaningful before JavaScript hydration', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Dale calma',
  );
  await expect(page.locator('#servicios')).toContainText('Organización');
  await expect(page.locator('#contacto a[href^="mailto:"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeDisabled();
  await context.close();
});

test('internal links point to real sections', async ({ page }) => {
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href')!)
        .filter(
          (href) => href.length > 1 && !document.getElementById(href.slice(1)),
        ),
    );
  expect(missing).toEqual([]);
});

test.describe('original motion experience', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('intro settles and the chaos-to-calm scene can be replayed', async ({
    page,
  }) => {
    await expect(page.locator('#intro-chispa')).toHaveCount(0, {
      timeout: 7000,
    });
    const scene = page.locator('#chispa-calma');
    await scene.getByRole('button', { name: 'Chispa', exact: true }).click();
    const calm = scene.getByRole('button', { name: 'Volver a la calma' });
    const replay = scene.getByRole('button', { name: /Más chispa/ });
    await expect(calm).toBeVisible();
    // The reference ignores clicks during entrance. A click can also complete
    // before Playwright's post-click wait times out: check the resulting state
    // on retry instead of clicking a button that has already been removed.
    await expect(async () => {
      if (!(await replay.isVisible())) await calm.click({ timeout: 1000 });
      await expect(replay).toBeVisible({ timeout: 1200 });
    }).toPass({ timeout: 6000 });
    await expect(
      scene.getByRole('img', {
        name: 'Tus ideas ordenadas en un proyecto de Notion',
      }),
    ).toBeVisible();
  });
});
