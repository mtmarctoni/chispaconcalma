# Preview, staging and production

Preview has passed live exact-SHA trials and the developer-approved merge gate
has migrated to `Validate` + `preview/e2e`. This cutover removes legacy PR Staging.
Checked-main Staging must remain disabled until this change is merged by the human
developer. Production remains disabled; these files do not authorize a launch.

Current provisioning evidence and blockers are recorded in
[`github-setup-status.md`](github-setup-status.md). The preview Environment now has
a verified main-only branch policy and both Cloudflare secret names configured.
Successful version uploads and deployed E2E are recorded there with exact run links.
Do not confuse those results with checked-main Staging or production activation.

## Two Workers, three stages

| Stage | Source | Worker / operation |
| --- | --- | --- |
| Preview | Successful Checks for a current same-repository PR, including drafts | Version upload to `chispaconcalma-staging`; no traffic shift |
| Staging | Successful Checks for the current merged `main` commit | Deploy to `chispaconcalma-staging` |
| Production | Published stable release tag approved by the developer | Deploy to `chispaconcalma` |

Preview returns a version-specific URL plus a mutable `pr-<number>` alias.
Deployed browser tests use the version-specific URL and assert `/deployment.json`.
Neither an alias nor the staging URL proves which revision is currently served.
Previews remain public and may remain reachable after closing a PR; never include
private data. Uploading previews must not change live staging traffic.

All builds are secret-free. Trusted workflow-revision tooling validates archive
provenance, size, paths and static contents before injecting trusted security headers.
Only the final CLI step receives Cloudflare credentials. Preview, staging and
production each run deployed desktop/mobile tests on a fresh secret-free runner.

## Rollout: do not remove the existing merge gate early

1. **PR A:** add Preview, checked-main Staging (disabled), and release/production
   automation (disabled). Keep `.github/workflows/staging.yml` and the live
   `Validate` + `staging/e2e` requirements unchanged.
2. **Developer provisioning:** configure the environments below. Verify draft PR
   previews, exact SHA, failed/rerun/stale checks, separate concurrent PR aliases,
   and unchanged staging traffic. During transition both Preview and legacy Staging
   must pass before saying a publication is ready for review.
3. **Explicitly approved live migration:** require `Validate` + `preview/e2e`
   instead of `Validate` + `staging/e2e`. Retain developer-only updates, strict
   up-to-date policy, resolved threads and no-bypass checks. Read settings back.
4. **PR B, only after that evidence:** remove the legacy PR Staging workflow and
   update `ops/github/main-checks.json`. After merging, enable checked-main Staging.
5. Activate release maintenance separately. Production stays disabled until its
   own explicit developer activation and launch-readiness review.

`ops/github/main-checks.json` now describes `Validate` + `preview/e2e`.
The live gate was separately migrated and read back on 2026-11-22; committing a
payload alone does not apply it to GitHub.
Do not run both legacy PR Staging and main Staging: they share live staging traffic
but use different concurrency groups. Keep `MAIN_STAGING_ENABLED` unset until PR B.

## Developer-only provisioning

Use main-only deployment branch policies (not “all protected branches”) for every
Environment. Keep all Cloudflare credentials and the release App key out of
repository-level secrets, since an owner-edited PR workflow could read those.

| Environment | Secrets | Variables / policy |
| --- | --- | --- |
| `preview` | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Uses repository variable `PREVIEW_ACCOUNT_SUBDOMAIN` to validate uploaded URLs |
| `staging` | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Environment `DEPLOY_URL`; keep legacy repository `STAGING_URL` during transition |
| `release` | `RELEASE_APP_PRIVATE_KEY` | `RELEASE_APP_ID`; main-only access for release maintenance |
| `production` | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | Environment `DEPLOY_URL`; required developer reviewer, prevent self-review where supported |

Use a nonproduction Cloudflare account for preview/staging and a separate production
account unless equivalent enforced isolation has been verified. A fixed Worker name
does not scope a stolen account token. Provision the staging Worker first with
workers.dev and version previews enabled; missing Workers fail rather than triggering
an automatic bootstrap deployment. Configure approved origins/domains externally.

Production reviewer policy must be operable with the actual team: if preventing
self-review means the sole developer cannot approve a run they triggered, arrange a
separate authorized reviewer/operator; do not silently disable the safeguard.

Repository activation variables (unset means disabled):

- `MAIN_STAGING_ENABLED=true`: only after the legacy PR Staging workflow is removed.
- `RELEASE_AUTOMATION_ENABLED=true`: only after the release App and action allowlist trial.
- `PRODUCTION_DEPLOY_ENABLED=true`: only after explicit production activation approval.

The release App is installed on this repository only, with Contents, Pull requests
and Issues read/write (release labels), plus Metadata read. Tokens are repository
scoped and never passed to build/deploy workflows. Add pinned
`actions/create-github-app-token` and `googleapis/release-please-action` to the live
Actions allowlist before activation; committing workflow references is not approval.
The full `Validate` and preview gate apply to release PRs too; there is no special
metadata-only bypass.

### Dependabot automatic merges

Dependabot checks Python, pnpm and GitHub Actions weekly, with up to 10 open
version-update PRs per ecosystem. Major updates remain eligible for PRs.

The `merge-dependabot` job runs after successful Checks, version Preview E2E and
publication of the `preview/e2e` status. It considers open, non-draft, same-repo
Dependabot PRs targeting `main` with a single GitHub-verified Dependabot commit.
It reads the signed commit's standard `chore(deps): bump … from X.Y.Z to X.Y.Z`
subject, including `chore(deps-dev)` and security bumps. The diff must match one
of the following:

- Python: only the named pin in root `requirements.txt` changes.
- pnpm: the old and new root `pnpm-lock.yaml` must confirm the named transition.
  Other direct versions, lock settings and existing package metadata stay unchanged.
  Only packages in the affected dependency tree may be added or removed, and new
  packages must use registry integrity pins. If root `package.json` changes,
  only the named declaration changes.
- GitHub Actions: only SHA pins for the named action in workflow `uses:` lines
  change, with the same old and new refs across workflows.

Major, grouped, prerelease, unsigned and unrecognized bumps stay open for manual
review. GitHub receives the checked head SHA with the squash merge request and
enforces the current merge rules, including the up-to-date requirement.

Preview runs trusted workflows from `main`, so it may pass without exercising a
replacement action pin. The live Actions policy allows GitHub-owned actions and
allowlists third-party actions by exact SHA. For a third-party update, the
developer first adds the new `owner/action@<40-character-sha>` entry to the live
Actions allowlist, then adds it to the repository variable
`DEPENDABOT_AUTOMERGE_ALLOWED_ACTION_REFS` (whitespace-separated entries). The job
requires that exact entry for action updates outside `actions/`. After approval,
a fresh Checks run can evaluate the update again.

After developer review and merge of the workflow:

1. Create a dedicated GitHub App installed on this repository only, with Contents
   read/write and Pull requests read. To support GitHub Actions updates, grant
   Workflows write; the job requests it only for eligible workflow-file updates.
   Add its integration to `main-update-authority`
   as a PR-only bypass actor. Read back both live rulesets and verify that
   `main-review-and-checks` enforces `Validate` and `preview/e2e`, requires branches
   to be up to date, and has an empty bypass list, matching the checked-in policy.
2. Create the `dependabot-automerge` Environment with a main-only deployment
   branch policy. Set its `DEPENDABOT_AUTOMERGE_APP_CLIENT_ID` variable and
   `DEPENDABOT_AUTOMERGE_APP_PRIVATE_KEY` secret. Allow the pinned
   `actions/create-github-app-token` action if needed.
3. Set the repository variable `DEPENDABOT_AUTOMERGE_ENABLED=true` to turn on the
   job. Verify an eligible merge for each ecosystem and confirm a major update stays
   open even after its required checks pass. Remove the variable to disable future
   runs and cancel any in-flight run if an immediate stop is needed. If `main`
   advances first, GitHub can reject the merge. The PR needs a rebase and fresh
   checks on its new SHA.

This job uses GitHub's SHA-conditional merge API after verification. The repository
auto-merge setting can stay disabled. For an existing PR, a fresh Checks run can
trigger verification if its head is current.

## Versions and releases

Release Please maintains a **draft** release PR containing package version, manifest
and changelog. A human reviews and marks it ready; only the developer may merge.
The initial configuration is `0.1.0`, with the reviewed foundation commit as history
boundary. No baseline tag or past release is fabricated.

- `feat:` minor; `fix:` and `perf:` patch; `!` / `BREAKING CHANGE:` major.
- These bump rules apply below 1.0 too.
- Internal-only `ci:`, `build:`, `docs:`, `test:`, `chore:` etc. do not independently
  create a release; they ride with the next visitor-facing change.
- Both squash and rebase merge are allowed. Prefer rebase for clean, intentionally
  grouped commits; squash experimental branches with fixups.
- With squash, the PR title must be a conventional commit with the correct type.
  With rebase, every retained commit counts toward Release Please's version bump;
  check all commit messages, not only the PR title. Keep internal tooling changes
  under `ci:`, `build:`, `docs:` or another non-release type.
- Do not edit Release Please's version, manifest or changelog in ordinary work.

Merging the release PR lets Release Please tag and publish that release. If production
is enabled, it calls **Deploy (production)** with the exact tag and expected SHA;
otherwise no production deployment occurs. Agents must not merge or create releases.
Ordinary main merges never directly deploy production.

## Retry and rollback

With explicit developer authorization, dispatch **Deploy (production)** from `main`
with an existing published `vX.Y.Z` tag. Use the same tag for a retry, an earlier tag
for rollback. The workflow rejects absent/draft/prerelease releases, malformed tags,
Git/GitHub commit disagreements, expected-SHA mismatches and commits outside main.
It rechecks the tag immediately before deployment.

The old release is built on a secret-free runner; current triggering-main deployment
policy, config, headers and tests govern publication. Current policy may reject an
old release: investigate rather than weaken it. A rollback rebuild is not a historical
artifact restore and does not restore old external configuration. No automatic rollback.

Deploy and E2E are serialized without cancelling running verification. GitHub can
supersede pending runs; avoid overlapping releases and report cancellation honestly.
Production E2E is blocking; a failed test leaves the candidate visible for inspection.

## Evidence and launch boundary

### Prelaunch indexing policy

Preview and staging are public review URLs, not private publishing systems.
Their `robots.txt` deliberately allows crawling so search engines can read the
`noindex, nofollow` directive in both the initial HTML and the trusted deployment
HTTP headers. Blocking crawlers with `Disallow: /` would prevent discovery of
those directives and can leave externally linked URLs eligible to appear in
search results. No sitemap is advertised before launch.

The wildcard `X-Robots-Tag` also covers non-HTML assets. Preview, staging and
future production deployments all retain these protections; a production build,
domain purchase or Worker provisioning must not enable indexing. There is no
indexing enable switch. Launch indexing requires a separately approved change
and verification that only `https://chispaconcalma.com` serves indexable content,
not Worker origins, version URLs or preview aliases.

Public `noindex` is not access control or an absolute exclusion guarantee.
Local Astro preview does not apply Cloudflare response headers; deployed E2E
must independently verify HTML, robots.txt and asset headers alongside the exact
deployment SHA.

Cloudflare replaces `X-Robots-Tag` with `noindex` on immutable version-preview
URLs. Deployed E2E requires HTTP `noindex` there for documents and assets, and
still requires `noindex, nofollow` in HTML. Live staging/production origins and
PR aliases retain the full HTTP `noindex, nofollow` requirement. Trusted header
injection always writes both directives; the exception only describes the
platform's version-preview response.

Preview runs trusted tooling and tests from `github.workflow_sha` on `main`,
against the PR's built assets. Test or harness fixes in a PR therefore affect
local Checks immediately but only affect Preview after developer review and
merge to main. Rerunning an older workflow revision does not apply a pending fix.

Local Playwright uses its own foreground Astro preview on port 4322 and refuses
to reuse an existing server. Keep `pnpm dev` on its usual port 4321; a busy test
port is an error, not a reason to test another checkout. `--ignore-lock` keeps
Astro from auto-backgrounding under agents on macOS or Linux. An explicit
`PLAYWRIGHT_BASE_URL` intentionally selects an external server and bypasses this
managed server; use the exact version URL and `EXPECTED_SHA` for deployed checks.

On macOS and Ubuntu/WSL, use Node from `.nvmrc`, pnpm from `packageManager`,
and ensure `python3` is on PATH for the archive/security unit tests. On
Ubuntu/WSL, install Chromium's system libraries with
`pnpm exec playwright install --with-deps chromium` before validation; a browser
download alone does not install those libraries.

Record the exact SHA, release tag where applicable, source Checks run, deployment
run, version/origin URL and deployed test result. Local builds/dry-runs, CI success,
upload/deploy success and deployed E2E success are different claims.

All environments remain noindex in HTML and HTTP headers. Removing production
noindex, canonical/SEO work, legal notices, asset rights, testimonial permission
and business-content confirmation require a separate launch task.
