# Implementation ledger — 2026-11-21-owner-staging.md

- Spec and plan created before implementation.
- User authorized autonomous decisions and implementation; no further discovery gates.
- Ruling: preserve the existing unborn feature/bootstrap checkout. A linked worktree
  cannot safely start without an initial commit; do not commit the user's existing
  research or create main implicitly.
- Ruling: retain reference CSS rather than rewriting into Tailwind. Cost: a larger
  legacy stylesheet initially; benefit: substantially lower fidelity risk.
- Ruling: static Astro plus React island for migrated interactive source. Cost:
  React hydration payload; benefit: preserve the owner's existing interaction design.
- Ruling: remote setup remains pending, since the repository has no remote.
- Pre-flight: Task 1 output dist is Task 2 input; static files only, metadata added
  during CI. Task 2's workflow/check names are Task 3's documented contract.
- [x] Task 1: website migration — reference CSS, 15 sections and local assets;
  static SSR plus original interactive behavior; honest resource/contact fallbacks.
- [x] Task 2: staging tooling and workflows — unprivileged build, trusted
  static-only deployment, fresh-runner E2E and SHA-bound status/notification.
- [x] Task 3: owner handoff documentation, shared agent contract and publishing skill.
- Local verification complete; remote provisioning remains explicitly pending.

## Evidence and review

- Homepage test failed against the minimal Astro scaffold, then passed after migration.
- Keyboard dialog/menu regressions reproduced before focus/inert fixes.
- Narrow resource cards and reduced-motion compact navigation reproduced before fixes.
- Discovered an SSR/hydration timing issue in repeated tests; menu now disabled
  until hydration. No-JavaScript test reproduced the enabled/dead control before fix.
- Initial static/ZIP/metadata tests failed before implementation; now passing.
- Local comparison at 1440px: reference and migrated hero have identical measured
  bounds (x=88, y=89, width=1264, height=688.171875). Resource/contact differences
  are intentional and documented. Desktop/mobile screenshots inspected.
- Browser regression run repeated twice: 56 passed, 4 deployment-only skips.
- Cloudflare assets-only dry-run passed without credentials; Actions actionlint passed.
- Independent read-only design and final implementation reviews performed.
- Final review Important: publication failures could omit developer notifications.
  Fixed by identifying current PR before artifacts/check success, invalidating old
  readiness, and finalizing failure status even for failed Checks/download/deploy.
  Regression `failed Checks can identify the current PR for failure reporting, but
  cannot deploy it` observed RED before fix, then GREEN.
- Publishing skill pressure scenarios: stale SHA, superseded runs and two-cycle
  repair ceiling handled correctly by a fresh read-only evaluator. Baseline agent
  also handled these scenarios safely; no measured improvement is claimed.
- Final minor (deferred): remove unreachable resource-delivery strings and handlers
  in migrated Home.jsx; no form or submission UI invokes them.
- Final minor folded into notification fix: finalize commit status before posting
  the developer comment so comment-delivery failure cannot preserve stale readiness.

## Final local verification

- `pnpm install --frozen-lockfile`: passed.
- `pnpm validate`: passed (formatting, Astro check with no diagnostics, 29 unit tests,
  production build, 28 desktop/mobile browser tests).
- Two deployment-only assertions skip during ordinary local validation. Both were
  additionally executed and passed against local built output using the explicit
  synthetic fixture SHA `0000000000000000000000000000000000000000`. This is NOT a
  Git commit or evidence of a remote deployment.
- `actionlint .github/workflows/checks.yml .github/workflows/staging.yml`: passed.
- `pnpm peers check`: passed.
- Static build validation: 21 files / 1,763,809 bytes with fixture metadata.
- Trusted CSP headers generated; local HTTP/browser trial confirmed React hydration
  and working menu with the actual CSP, no browser/CSP errors.
- `pnpm staging:dry-run` with trusted headers: passed; assets-only Worker, no bindings,
  no API deployment.
- No commit, push, PR, GitHub permission change, Cloudflare deployment or production
  setup was performed. Existing research files and ignored archives were preserved.

## Subsequent GitHub initialization

- Created the public GitHub repository, configured the two main rulesets and the
  main-only staging Environment, hardened Actions permissions, enabled secret
  scanning/push protection and Dependabot. Verified settings by API read-back.
- Developer explicitly approved the one-time initial `main` publication; this is
  limited to initialization. All later development must go through task branches
  and draft PRs; future merges require their own explicit approval.
- Initial commit groups: research tooling/ignore rules; website, local staging
  tooling and tests; GitHub workflows/policies; owner-agent contract/skill; docs.
- Source/publication verification and remote Checks are tracked in the GitHub run,
  not inferred from local tests. No Cloudflare or production deployment is authorized
  by the main-bootstrap approval.
