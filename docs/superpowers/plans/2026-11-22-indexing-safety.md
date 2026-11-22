# Prelaunch Indexing Safety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make public review URLs crawlable enough to discover noindex, while keeping every environment non-indexable until a separately approved launch.

**Architecture:** Keep the existing unconditional HTML noindex and trusted deployment-injected wildcard HTTP noindex. Remove the robots.txt crawl block and add regression tests for source/build behavior and deployed responses. Do not introduce an indexing enable switch before the production domain and Worker exist.

**Tech Stack:** Existing static Astro, React, Node unit tests, Playwright and Cloudflare static asset deployment; pnpm only.

**Spec:** Approved conversation: public review URLs, no CMS/private draft requirement, crawl-readable noindex, future production disabled until launch. Audit: `.agents/discover/2026-11-22.md`.

## Global Constraints

- Intended production origin: `https://chispaconcalma.com`; not yet acquired.
- Production Worker does not exist; do not provision it.
- Preserve Spanish copy, visual identity, keyboard access and reduced motion.
- No dependencies, lockfile changes, access-control changes or deployment activation.
- Keep preview, staging and future production builds unconditionally noindex.
- Do not commit, push, open a PR, merge or deploy without separate authorization.
- Tests and deployment-related changes require developer review.
- Public noindex is a search directive, not privacy or an absolute exclusion guarantee.

## Review Focus

- JavaScript disabled: raw HTML must already contain noindex.
- Non-HTML assets: deployed image responses must also carry HTTP noindex.
- robots.txt itself: must be fetchable and must not block discovery of page directives.
- Production deployment: must retain the same trusted noindex header injection.
- Local Astro preview: does not emulate Cloudflare `_headers`; do not mistake local success for live header verification.

---

### Task 1: Make crawler access compatible with noindex

**Files:**
- Modify: `public/robots.txt`
- Create: `tests/unit/indexing.test.mjs`
- Modify: `tests/unit/headers.test.mjs`
- Modify: `docs/releases.md`

**Interfaces:**
- Consumes: existing robots file, header template and `scripts/staging/add-headers.mjs <asset-directory>`.
- Produces: `User-agent: *` and `Allow: /` in robots.txt, without any `Disallow` or `Sitemap` directives.
- No new runtime API or environment variable.

- [x] Write a unit test named `prelaunch robots allow discovery of noindex without advertising a sitemap`. Assert the exact two directives above, no `Disallow`, no `Sitemap`, and no unsupported robots.txt `Noindex` directive.
- [x] Run `node --test tests/unit/indexing.test.mjs`; confirm failure against the existing crawl block.
- [x] Replace the robots file with the two agreed directives.
- [x] Extend the existing header-generation test to assert `X-Robots-Tag: noindex, nofollow` inside the wildcard `/*` block, while retaining all CSP and cache assertions.
- [x] Add a source-wiring regression test named `all deployment paths retain trusted noindex injection`. Parse workflow YAML using the existing `yaml` dependency and assert preview, staging and production deploy jobs each run `scripts/staging/add-headers.mjs` against their actual deployment directory before the upload/deploy step. Do not change workflows to satisfy the test.
- [x] Document why public review URLs allow crawling, why all environments remain noindex, and why domain acquisition/production provisioning alone must not enable indexing.
- [x] Run `node --test tests/unit/indexing.test.mjs tests/unit/headers.test.mjs`; expect all tests to pass.

### Task 2: Prove build and deployed response behavior

**Files:**
- Modify: `tests/e2e/home.spec.ts`
- Update evidence only: `.agents/discover/2026-11-22.md`

**Interfaces:**
- Consumes: existing Playwright base URL and `EXPECTED_SHA` deployed-test indicator.
- Produces: tests that run locally and in existing deployed desktop/mobile jobs, without changing CI configuration.

- [x] Add a browser test named `prelaunch HTML is noindex before JavaScript`. Request `/` using the request fixture; require status 200. Load that response HTML into a JavaScript-disabled browser context, then assert exactly one `meta[name="robots"]` in `head` whose content contains the `noindex` and `nofollow` tokens. This checks delivered HTML, not tags injected during hydration.
- [x] Add a test named `robots allows reading prelaunch indexing directives`. Fetch `/robots.txt`; require 200, plain-text content type and the Task 1 directive contract.
- [x] Add a test named `deployed documents and assets carry HTTP noindex`. Skip only when `EXPECTED_SHA` is absent, with a reason explaining that local Astro preview does not apply Cloudflare headers. Fetch `/`, `/robots.txt` and `/assets/portrait.png`; require 200 and `x-robots-tag` containing `noindex` and `nofollow` for each. Keep exact-SHA assertions unchanged.
- [x] Run the new local tests against the old robots build and confirm the robots test fails; then rebuild and rerun, expecting success. Confirm the HTTP-header test explicitly skips locally rather than claiming deployed coverage. The first run reused an old checkout on port 4321; explicit-target validation on port 4323 verified the rebuilt worktree.
- [x] Run `pnpm format`, then `pnpm validate` on the pinned Node version if available. If the pinned runtime is unavailable, report the actual runtime warning and results rather than silently changing dependencies.
- [x] Inspect desktop/mobile locally; confirm no visible copy, layout or interaction changes. Record exact commands, pass/skip counts and limitations in the audit report.
- [x] Do not bypass the known staging 403/1010. Live verification belongs to an authorized publication and the existing deployed jobs. No deployment is part of this implementation.

## Deferred launch work

Production SEO metadata, canonical URLs, conditional sitemap generation, factual structured data, image optimization and measured Core Web Vitals remain separate implementation work. The eventual indexing change requires explicit approval and verified edge behavior: only the canonical production hostname may serve indexable content, with Worker/version aliases blocked, redirected or still noindex. A static build flag cannot establish that hostname boundary by itself.

## Completion checklist

- [x] Public crawl policy and unconditional noindex agree.
- [x] Regression tests cover raw HTML, robots, trusted header generation and all deployment wiring.
- [x] Local and deployed verification claims are kept separate.
- [x] No indexing switch, production provisioning or activation was introduced.
- [x] Changes remain uncommitted for developer review.
