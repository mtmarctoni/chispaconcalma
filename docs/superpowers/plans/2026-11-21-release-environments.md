# Release Environments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate owner PR previews, merged-main staging and approved tagged production releases without exposing credentials to PR builds.

**Architecture:** Secret-free build jobs publish validated static artifacts; trusted main tooling consumes them and deploys through restricted Environments. Preview versions share the staging Worker without changing its live traffic; production uses a separate Worker and is disabled until an explicit developer activation.

**Tech Stack:** Astro static, React, Node per `.nvmrc`, pnpm, pinned cf 1.0.0-rc.2, GitHub Actions, Release Please, node:test, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-21-release-environments-design.md`

## Global Constraints

- PR builds never receive Cloudflare credentials.
- Deployment tooling and policy come from trusted main, never the PR artifact.
- Keep assets-only Astro, the existing cf CLI, pnpm, Spanish copy and visual identity.
- Keep developer-only merges and draft PRs; agents never approve, merge or release.
- Do not change live GitHub/Cloudflare settings or deploy during implementation.
- Production additionally requires a developer reviewer, prevents self-review where
  supported, and a repository variable `PRODUCTION_DEPLOY_ENABLED` exactly `true`.
- Keep noindex in HTML and trusted HTTP headers for all environments initially.
- Keep compatibility date `2026-11-21`.

## Review Focus

- Replayed or rerun Checks for a stale/closed PR must not restore preview readiness.
- Upload output with a foreign origin, malformed alias or missing version URL fails closed.
- Concurrent PR previews must not overwrite staging or test each other's mutable alias.
- A release tag naming another commit or outside main history must fail before build.
- Migration must never require a status whose producer has already been removed.

---

## Delivery boundaries

**Local execution status:** PR A implementation and documentation are prepared,
uncommitted. Independent review found one reusable-workflow permission issue; its
regression failed before the fix and passed afterward. Full local validation passed
42 unit tests and 28 browser tests (2 deployed-only checks skipped), actionlint passed,
and three cf mode dry-runs passed. Local Node was 26.13.0, not required 26.13.1.
No live provisioning, protection migration, release or deployment has been performed.
Task 6 remains blocked on the developer-only operations below.

Work on the existing isolated `build/ci-workers` branch if still clean and appropriate;
use `wt` for any new worktree/branch. Do not commit or push until separately authorized.
The commit checkpoints below describe intended grouping, not authorization.

**PR A:** Tasks 1–4 and transitional documentation; adds Preview alongside legacy PR
Staging, plus disabled release infrastructure.

**External operation:** Task 5's developer-approved provisioning and check migration.

**PR B:** Task 6 removes legacy PR Staging only after the external operation is verified.
Do not implement PR B as an immediately publishable replacement for PR A.

### Task 1: Explicit deployment targets and shared artifact policy

**Files:**
- Modify: `cloudflare.config.ts`, `package.json`
- Create: `scripts/deployment/targets.mjs`, `tests/unit/targets.test.mjs`
- Modify: `scripts/staging/policy.mjs`, `tests/unit/policy.test.mjs`
- Reuse unchanged unless tests demand extension: `scripts/staging/{metadata,validate-assets,add-headers}.mjs`, `extract-artifact.py`, `headers.txt`

**Interfaces:**
- Produces: `resolveTarget(mode: string) -> { name: string }`; accepts only `preview`, `staging`, `production`; preview and staging map to `chispaconcalma-staging`, production to `chispaconcalma`.
- Produces: `validateOrigin(value: string) -> string`; HTTPS origin without credentials/path/query/fragment, retaining current strict behavior.
- Consumes: current artifact policy and `{sha}` metadata; no schema loosening.

- [ ] Write tests asserting preview and staging resolve to the same staging Worker, production resolves to its separate Worker, throws for missing/unknown modes, and strict origin validation. Preserve existing policy and archive test cases.
- [ ] Run `node --test tests/unit/targets.test.mjs tests/unit/policy.test.mjs`; expect new cases to fail before implementation.
- [ ] Implement the pure target resolver and cf config mode callback, keeping config free of untrusted environment-selected Worker names. Legacy Staging must explicitly pass `--mode staging` in PR A.
- [ ] Expand formatting scripts to include `scripts/deployment` and later `scripts/releases`; retain current coverage.
- [ ] Run `pnpm test` and `pnpm format:check`; expect all tests/checks to pass after formatting.
- [ ] Checkpoint: `build: define isolated deployment targets` (commit only if authorized).

### Task 2: Trusted draft-PR preview publication

**Files:**
- Modify: `.github/workflows/checks.yml`
- Create: `.github/workflows/preview.yml`
- Create: `scripts/deployment/preview-context.mjs`, `preview-output.mjs`
- Create: `tests/unit/preview-context.test.mjs`, `preview-output.test.mjs`, `workflows.test.mjs`
- Reuse: existing archive extraction, static validation, trusted header injection and PR policy.

**Interfaces:**
- Produces: preview context CLI `identify` / `download`, mirroring current staging CLI outputs `sha`, `pr`; downloads only `staging-assets` from the verified Checks run (retain the legacy artifact name during transition).
- Produces: `parsePreviewOutput(text, { workerName, accountSubdomain, pr }) -> { versionUrl, aliasUrl }`; validates expected Worker, account domain, per-PR alias and HTTPS version URL.
- Produces: trusted commit status `preview/e2e` and PR comment containing SHA, immutable URL, alias, source Checks run and Preview run.
- Consumes: environment `preview` credentials; trusted repository variable `PREVIEW_ACCOUNT_SUBDOMAIN`; no guessed origin or untrusted artifact URL.

- [ ] Add tests for draft acceptance; forks, stale/closed/ambiguous PRs, invalid workflow/run provenance, absent/duplicate/mismatched/expired assets and oversized downloads rejected; failed-check identification still works.
- [ ] Add fixture-based output tests for real pinned-cf success format, missing URLs, wrong Worker/account, credential-bearing URL and wrong PR alias. Inspect installed cf source for its output instead of inventing a fixture.
- [ ] Add workflow-contract tests asserting secret-free Checks, trusted-main deployment checkouts, per-PR concurrency spanning E2E, no draft exclusion, and token exposure only in upload. Test that preview uses version upload on the staging Worker, cannot call `cf deploy`, cannot change staging traffic and cannot target production.
- [ ] Run the new node tests; confirm failures for missing preview implementation.
- [ ] Implement context/output helpers and Preview workflow. Identify and mark pending even on failed Checks; verify artifacts with existing safeguards; recheck before upload and report; upload via `cf workers versions create ./preview-assets --mode preview --preview-alias "pr-$PR_NUMBER"`; test immutable URL on a fresh secret-free runner; recheck before emitting success/failure.
- [ ] Keep legacy Staging active and its artifacts/status intact. Do not change live or desired required checks yet.
- [ ] Run `pnpm format` and `pnpm test`; verify all existing safety cases remain covered.
- [ ] Checkpoint: `ci: add isolated draft PR previews` (commit only if authorized).

### Task 3: Checked-main staging pipeline (add disabled during transition)

**Files:**
- Create: `.github/workflows/deploy-staging.yml`
- Create: `scripts/deployment/main-context.mjs`, `tests/unit/main-context.test.mjs`
- Modify: `.github/workflows/checks.yml`, `tests/unit/workflows.test.mjs`

**Interfaces:**
- Produces: `selectMainRun(run, { repository, workflowId, currentMainSha }) -> { sha }`, requiring successful completed Checks push on current main.
- Produces: main-context download CLI outputs `sha`; verifies and downloads `staging-assets` by triggering run ID with the same safety policy.
- Consumes: environment `staging` credentials and `DEPLOY_URL`; activation variable `MAIN_STAGING_ENABLED` exactly `true`.

- [ ] Test correct main push and reject PR/tag/fork/wrong-workflow/failed/stale/mismatched artifacts; test current-main recheck immediately before deployment.
- [ ] Add workflow tests that this new consumer stays disabled unless `MAIN_STAGING_ENABLED == 'true'`, and no preview or staging job targets production.
- [ ] Run new tests; expect failure before implementation.
- [ ] Stamp, validate and upload assets for successful main Checks as well as PR Checks. Add gated trusted-main consumer with extraction, validation, trusted headers, `cf deploy ./staging-assets --mode staging --no-provision`, full-run serialized E2E and exact-SHA report. Never cancel a running deploy/E2E.
- [ ] Run `pnpm test`; existing legacy Staging remains functional.
- [ ] Checkpoint: `ci: prepare checked-main staging deployment` (commit only if authorized).

### Task 4: Draft release PRs and disabled tagged production

**Files:**
- Create: `.github/workflows/release-please.yml`, `.github/workflows/deploy-production.yml`
- Create: `release-please-config.json`, `.release-please-manifest.json`, `CHANGELOG.md`
- Modify: `package.json`, `tests/unit/workflows.test.mjs`
- Create: `scripts/releases/resolve-release.mjs`, `tests/unit/releases.test.mjs`

**Interfaces:**
- Produces: `validateRelease({ tag, release, tagSha, expectedSha, isAncestor }) -> { tag, sha }`, accepting only published non-draft/non-prerelease `vX.Y.Z` releases on main and matching immutable resolved SHAs.
- Produces: resolver CLI outputs `tag`, `sha`; never interpolates raw tag input into shell commands.
- Produces: reusable/manual production workflow accepting `release_tag` and optional `release_sha`.
- Consumes: `PRODUCTION_DEPLOY_ENABLED`, environment `production` with `DEPLOY_URL`; release App credentials only in release maintenance job.

- [ ] Test release validation against malformed/injection-like tags, missing/draft/prerelease releases, GitHub tag/ref disagreement, expected-SHA mismatch, outside-main commits, and successful old-tag rollback.
- [ ] Test workflow contracts: disabled flag blocks resolve/build/deploy; main-only invocation; production build has no credentials/App key; deploy uses trusted triggering-main tools/config; serialization covers deployed verification; no secrets inheritance; same full PR/preview gates for release PRs.
- [ ] Run targeted node tests; confirm failures.
- [ ] Configure Release Please for draft PRs, initial `0.1.0`, explicit pre-1.0 bump behavior and the actual reviewed foundation SHA as bootstrap boundary. Verify configuration against pinned action/schema docs. Do not create a baseline tag.
- [ ] Gate release maintenance behind `RELEASE_AUTOMATION_ENABLED == 'true'` until App provisioning. Use repository-scoped short-lived App token and SHA-pinned actions. After publication call production with the released tag/SHA, never App credentials.
- [ ] Implement release resolution before installs/builds. Check out the release on a secret-free build runner, run the full validation, stamp exact resolved SHA, validate/upload static assets. A fresh production job checks out trusted triggering main, safely extracts/revalidates/injects headers, deploys with `--mode production --no-provision`, then runs blocking secret-free deployed E2E on another runner within the same serialization boundary.
- [ ] Run `pnpm format`, `pnpm test` and `pnpm validate`; verify noindex remains untouched. Reconcile `.nvmrc` locally before validation: earlier CLI invocation reported Node `26.13.0`, while package requires `>=26.13.1 <27`.
- [ ] Checkpoint: `ci: prepare approved tagged production releases` (commit only if authorized).

### Task 5: Transitional documentation and developer-only provisioning handoff

**Files:**
- Create: `docs/releases.md`
- Modify: `docs/staging-setup.md`, `docs/owner-workflow.md`, `docs/site-contract.md`, `README.md`, `.github/pull_request_template.md`
- Modify: `AGENTS.md`, `.agents/skills/publish-for-review/SKILL.md`
- Modify: `docs/github-setup-status.md` only to add a dated pointer, not rewrite historical evidence.

**Interfaces:**
- Produces: documented PR A / external operation / PR B rollout, required checks and exact-SHA evidence protocol.
- Consumes: all workflow/status/variable names from Tasks 1–4.

- [ ] Read shared agent-authoring rules and invoke writing-skills before changing the publication skill. Preserve explicit owner authorization, draft PRs, bounded waits, two repairs and immediate access-error stops.
- [ ] Document preview vs staging vs production, mutable aliases vs immutable versions, account isolation, environment main-only policies, action allowlists, App permissions, default-disabled flags and rollback caveats.
- [ ] Document PR A continues to require legacy `staging/e2e` while Preview is evaluated. Publication monitors both during transition; final state monitors `preview/e2e`.
- [ ] Run format/validation and the publication skill's available checks; review all contract/skill changes as developer-owned infrastructure.
- [ ] Record dry-run commands/results for all explicit modes using validated local static assets and trusted headers, with no credentials or network mutation. If modes/preview output cannot be verified locally, mark the live trial blocked rather than guessing.
- [ ] Hand off PR A for separately authorized publication/review. No push, merge or provisioning is authorized by this plan.
- [ ] **External developer operation, not agent implementation:** after PR A is merged, provision the staging Worker with workers.dev and version previews enabled, isolated nonproduction/production accounts, preview/staging Environments, origin/subdomain variables and allowlisted actions. Enable Preview and run exact-SHA live draft-PR, failure/stale/concurrency trials. Verify uploads leave staging traffic unchanged and staging deployments leave existing preview-version URLs usable.
- [ ] **External developer operation:** after both required statuses are proven, explicitly approve switching live `staging/e2e` to `preview/e2e`, retain `Validate`/no-bypass/strict rules, read back settings and save evidence. Leave new main Staging disabled until PR B. Production stays disabled.

### Task 6: Final cutover (PR B, blocked on Task 5 live evidence)

**Files:**
- Delete: `.github/workflows/staging.yml` only after required-check migration.
- Modify: `ops/github/main-checks.json`
- Modify: `docs/staging-setup.md`, `docs/owner-workflow.md`, `docs/github-setup-status.md`, `.agents/skills/publish-for-review/SKILL.md`
- Modify: `tests/unit/workflows.test.mjs`
- Retain shared helpers under `scripts/staging/` to avoid gratuitous renames.

**Interfaces:**
- Produces: final required-check desired payload `Validate` + `preview/e2e`; no PR Staging producer.
- Consumes: verified live migration evidence from Task 5; without it stop before deleting legacy workflow.

- [ ] Add workflow tests asserting final check payload and absence of a required post-merge check. Test that production remains opt-in and no release-PR bypass was added.
- [ ] Run tests; expect final-state assertions to fail before cutover.
- [ ] Remove legacy PR Staging, update desired payload, and simplify owner publication guidance to Preview. Record actual migration evidence separately from desired config.
- [ ] Run `pnpm format`, `pnpm validate` and all three cf dry-runs; inspect desktop/mobile if site source changed. Record exact local results and blockers.
- [ ] Request whole-branch infrastructure review before separately authorized PR B publication.
- [ ] **External developer operation after PR B merge:** enable `MAIN_STAGING_ENABLED`, verify merged-main staging + exact-SHA E2E; configure release App and enable release maintenance separately. Production activation, reviewer/domain/account checks and first release/retry/rollback each need explicit developer approval and recorded run links.
- [ ] Checkpoint: `ci: complete preview and staging separation` (commit only if authorized).

## Self-review

The plan preserves legacy gates until an externally verified migration, uses no
release-PR exemption, keeps production disabled and distinguishes local dry-runs
from deployed proof. All five Review Focus conditions are pinned to regression
tests in Tasks 2, 4 or 6. The live trials and branch protection changes cannot be
truthfully completed by local tests and remain explicit developer operations.
