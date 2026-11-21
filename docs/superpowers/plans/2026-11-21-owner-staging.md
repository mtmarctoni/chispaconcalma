# Owner Staging Implementation Plan

> **For agentic workers:** Use executing-plans to implement this plan task-by-task.

**Goal:** Deliver a faithful Astro homepage and a safe, documented owner staging flow.

**Architecture:** Prerendered Astro page with local assets and a React interactive
island migrated from the export. Unprivileged PR builds feed a trusted, serialized
static-only staging deployment with SHA-bound deployed E2E.

**Tech Stack:** Astro, React, TypeScript, Playwright, Node test runner, Cloudflare cf,
GitHub Actions, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-21-owner-staging-design.md`

## Global Constraints

- Preserve all pre-existing uncommitted files and research.
- Work on existing feature/bootstrap; no commits, pushes or remote provisioning
  without separate authorization.
- pnpm only; local assets; Spanish reference copy; production out of scope.
- No Cloudflare credentials in jobs executing PR-controlled source.
- Deployed readiness is tied to an exact SHA, not just a permanent URL.

## Review Focus

- Concurrent PRs must not swap the site during deployed verification.
- Fork PRs and modified workflows must not receive staging deployment credentials.
- Prototype forms must not claim email delivery without an integration.
- Reduced motion must leave the whole page readable and interactive.
- Missing/stale deployment metadata must fail closed.

## Tasks

### Task 1: Website migration

Files: `astro.config.mjs`, `src/pages/index.astro`, `src/components/home/*`,
`src/styles/*`, `public/assets/*`, `scripts/import-prototype.py`,
`playwright.config.ts`, `tests/e2e/home.spec.ts`, `package.json`, `.nvmrc`.

Interfaces: `/` serves Spanish homepage; reference IDs remain stable; `pnpm dev`,
`pnpm check`, `pnpm build`, `pnpm test:e2e` are the owner commands.

- [x] Add behavioral tests for menu, quiz/restart, services, breathing and resources.
- [x] Run against minimal scaffold; confirm absent homepage content fails.
- [x] Extract source/assets into editable local files; preserve styling and logic.
- [x] Replace unsafe placeholders and simulated delivery with honest alternatives.
- [x] Run checks/build/E2E and inspect desktop/mobile reference screenshots.

### Task 2: Safe build and deployment tooling

Files: `scripts/staging/*.mjs`, `tests/unit/staging.test.mjs`,
`cloudflare.config.ts`, `.github/workflows/checks.yml`,
`.github/workflows/staging.yml`.

Interfaces: `dist/deployment.json` contains `{sha}`; validators accept only
40-character commit SHAs and static-only asset directories; E2E consumes
`PLAYWRIGHT_BASE_URL` and `EXPECTED_SHA`.

- [x] Write metadata and artifact rejection tests; run them red.
- [x] Implement validators, metadata generation and static staging upload.
- [x] Build unprivileged on PR; trusted default-branch workflow deploys verified
  artifacts and runs E2E without executing PR scripts with credentials.
- [x] Serialize deployment through deployed tests; gate fork, PR state/head,
  artifact provenance and exact revision; notify only after successful verification.
- [x] Run unit tests and local deployment checks; document remote-only checks.

### Task 3: Owner handoff and review

Files: `AGENTS.md`, `CLAUDE.md`, `.claude/skills/publish-for-review/SKILL.md`,
`docs/owner-workflow.md`, `docs/site-contract.md`, `docs/staging-setup.md`,
`.github/CODEOWNERS`, `.github/pull_request_template.md`, `README.md`.

Interfaces: one canonical shared agent contract; publish keyword authorizes a
branch push, never main merge; setup checklist distinguishes local from remote.

- [x] Write site/editing contract and publishing procedure with two repair cycles.
- [x] Add security setup, owner onboarding, notifications and rollback guidance.
- [x] Verify scripts, docs, links and instruction discoverability.
- [x] Run complete local suite and fresh-context read-only review; fix important
  findings with regression tests.
- [x] Record actual verification and pending infrastructure in the progress ledger.
