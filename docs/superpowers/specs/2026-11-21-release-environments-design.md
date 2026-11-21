# Preview, staging and production releases

## Intent and approval

The developer approved adopting Masrexach's three-stage release model:
PR previews, staging from merged main, and production from approved versioned
releases, including retries and tagged rollbacks. Preserve this repository's
stronger separation between owner-authored builds and deployment credentials.

This supersedes the environment and production-scope decisions in
`2026-11-21-owner-staging-design.md`, not its website or owner-safety requirements.
Approval covers preparing the implementation, not merging, publishing, creating
releases, provisioning credentials, or deploying production.

## Agreed requirements

- Same-repository PRs, including drafts, receive separate preview URLs after Checks.
- Fork PRs run secret-free Checks only; vetted changes require a same-repository PR.
- Staging tracks successfully checked commits merged into main.
- Production changes only through a developer-approved release or an explicitly
  requested retry/rollback to an existing published release tag.
- PR builds never receive Cloudflare credentials.
- Deployment tooling and policy come from trusted main, never the PR artifact.
- Keep assets-only Astro, the existing cf CLI, pnpm, Spanish copy and visual identity.
- Keep exact-SHA metadata, deployed desktop/mobile tests, and developer notifications.
- Keep developer-only merges and draft PRs; agents never approve, merge or release.
- Do not change live GitHub/Cloudflare settings or deploy during implementation.

## Implementation decisions (recommendations, not additional user requirements)

### Two Workers, three delivery stages

Use `chispaconcalma-staging` and `chispaconcalma`, matching Masrexach's two-Worker
model. The developer explicitly approved sharing the staging Worker with previews.
Expose explicit `preview`, `staging`, and `production` configuration modes;
missing/unknown modes fail closed. No bindings, server entrypoint, runtime secrets
or new backend. Keep compatibility date `2026-11-21`.

Both `preview` and `staging` modes resolve to `chispaconcalma-staging`; `production`
resolves to `chispaconcalma`. Preview mode uploads versions only; staging mode deploys
the checked main build to live staging traffic.

PRs upload versions of the staging Worker with alias `pr-<number>`, without moving
its live traffic. Return both an immutable version URL and a mutable per-PR alias.
Test the immutable URL and identify the exact SHA; never imply an alias is immutable.
The developer provisions the staging Worker beforehand, enabling workers.dev and
version previews. No automatic bootstrap deploy or fallback that overwrites staging.
Closed-PR cleanup is deferred; closed previews
may remain publicly reachable and must never contain private data.

Use cf's installed `workers versions create <assets> --mode preview
--preview-alias pr-<number>` facility. CLI help confirms support; exact output parsing
and workers.dev preview enablement require dry-run/source inspection and a live trial.
Do not guess domains or silently install Wrangler.

### Build and deployment trust

Retain `Checks` on PRs and main pushes, using exact source SHAs, secret-free installs,
format/type/unit/build/browser checks, and validated static artifacts. Stamp and upload
assets on both event types. Keep `{ "sha": "<40 lowercase hex>" }` deployment metadata
and current archive/file-size, symlink, path and deployment-control restrictions.

Trusted `workflow_run` consumers independently verify workflow identity, repository,
event, successful conclusion, source SHA, artifact provenance and current PR/main
identity. Failed checks must invalidate existing preview readiness, including reruns.
Deploy credentials appear only in the upload/deploy step. Retain fresh-runner deployed
tests without Cloudflare secrets. Do not execute artifact-provided config/scripts.

Preview concurrency is per PR across upload, E2E and notification; never cancel an
active verification. Different PRs may proceed independently. Recheck PR identity
before upload and notification; stale/closed/fork/ambiguous inputs cannot gain readiness.
GitHub can supersede pending runs: report that explicitly, with bounded waits.

Staging concurrency covers deploy and E2E together, with no cancellation of running
verification. Deploy only a successful Checks push run on main whose SHA remains the
current main head before deployment. Report obsolete runs as skipped, not verified.
Require a matching SHA from the deployed site; failure leaves the candidate visible
for inspection, not silently rolled back.

### Releases and rollback

Release Please uses conventional commits to maintain a **draft** release PR with
package version, manifest and changelog. Start at `0.1.0` in the implementation;
bootstrap from the reviewed foundation commit, without manufacturing historical tags.
`feat` means minor, `fix`/`perf` patch, breaking changes major; internal-only changes
do not independently release. Configure pre-1.0 behavior explicitly to preserve those
bump rules. Humans review and mark release PRs ready, then the developer merges.

Use a repository-scoped GitHub App for release PR creation so CI runs. Its token/key
must not enter build/deploy jobs. Request only required permissions; new actions must
be SHA-pinned and explicitly allowed during later developer provisioning.
Store the App private key only in a main-restricted `release` Environment, never
as a repository secret that owner-edited PR workflows could read.

Initially run the normal Checks and preview gate for release PRs too. Do not copy
Masrexach's metadata-only CI optimization: avoiding a special required-check bypass
is worth the extra build here. Release Please's metadata is not a gate exemption.

After a release is published, the Release workflow calls the production workflow
with tag and expected SHA. Manual dispatch from main accepts an existing `vX.Y.Z`
tag for retries/rollbacks. Before building, resolve it via GitHub and Git and reject
malformed tags, absent/draft/prerelease releases, tag/ref mismatch, supplied-SHA
mismatch and commits outside main history. Never deploy arbitrary main HEAD instead.

Build the resolved release on a secret-free runner. Validate and transfer only
static assets to a production deployment job. Deployment policy/config/scripts come
from the main commit triggering the workflow, even on rollback; the release checkout
supplies the website and its dependencies only. Reject release artifacts that fail
current policy rather than weakening policy for old tags.

Serialize production deploy and verification without cancelling active runs.
Blocking production tests must verify the release SHA and homepage behavior.
Rollback rebuilds an older release; it is not a byte-for-byte historical artifact
restore and does not restore former external configuration. No automatic rollback.

### Environments and activation

Store Cloudflare credentials only in main-restricted GitHub Environments `preview`,
`staging`, and `production`. Keep preview/staging in a nonproduction account; production
in a separate account unless equivalent isolation is independently proven.
Never assume a token is Worker-name scoped. No repository-wide Cloudflare secret.

Production additionally requires a developer reviewer, prevents self-review where
supported, and a repository variable `PRODUCTION_DEPLOY_ENABLED` exactly `true`.
Default is disabled, before building or requesting production credentials.
Implementation does not set it. No production domain is assumed: provision the
approved HTTPS origin as environment variable `DEPLOY_URL` at activation.
Use the same variable name for each environment's origin; preview URLs come from the
validated version-upload result. No account IDs, domains or tokens in source.

Keep noindex in HTML and trusted HTTP headers for all environments initially.
Removing production noindex, canonical/SEO work, rights/consent/legal confirmation
and completing business content are a separate launch task. Disabled production
automation must not be presented as launch-ready.

### Required-check migration

Final main requirements are `Validate` and trusted `preview/e2e`. Developer-only
authority, strict up-to-date policy, resolved threads and no-bypass checks remain.
Do not make post-merge staging a merge prerequisite.

Roll out in two reviewed phases: first add Preview alongside legacy Staging, retaining
`staging/e2e`; verify both statuses on a harmless current PR. Only then, with separate
developer approval, switch the live required check to `preview/e2e`. After read-back,
remove legacy PR Staging and enable post-merge Staging. These phases are separate
PRs/operations; do not remove the old producer before switching the live requirement.
Keep the unconfigured release/production machinery disabled until developer activation.

### Documentation and owner behavior

Update setup, release, site-contract, owner workflow, agent rules, PR template and
publication skill to distinguish preview / staging / production. Owner publication
still requires explicit authorization and creates a draft PR; it reports preview
URL, exact SHA, Checks and Preview run links, and deployed E2E result.
Preserve the two-repair-cycle limit and 20-minute wait bound. Access/config failures
stop immediately. Instructions must support the transitional dual-workflow state.

Historical provisioning notes stay historical, with a pointer to the new model;
committed desired payloads must not be represented as applied live settings.

## Verification and outstanding operational work

Local evidence: regression tests for event/artifact/URL/release policies, workflow
contracts, mode selection and disabled production; existing full validation; trusted
headers and exact-SHA deployed assertions; cf dry-runs for all three modes.
No screenshot redesign is needed; inspect desktop/mobile after any site-file change.

Developer-only live trial later verifies draft PR previews, distinct concurrent PR
URLs, stale and failed run invalidation, unchanged staging during preview uploads,
preview-version availability across staging deployments, main-only
environment access, isolated accounts, merged-main staging, release App operation,
disabled production, and approved first release/retry/rollback with blocking tests.
Record exact commits and workflow links. Missing credentials or unsupported settings
are blockers, not authorization to broaden permissions.

Remaining choices intentionally left to the implementer: helper decomposition,
fixture layout, robust parsing of the pinned cf output, and action patch versions.
Provisioning choices (accounts, approved origins, reviewer and App identity) belong
to the developer at activation and must not be invented during implementation.
