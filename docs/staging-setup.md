# Developer staging setup and security checklist

## Current state

The repository initially had no commit or remote. The public GitHub repository and
security settings have since been provisioned:
https://github.com/mtmarctoni/chispaconcalma.

See `docs/github-setup-status.md` for verified live settings and remaining blockers.
The foundation's initial publication is covered by a single explicit developer
bootstrap approval. No Cloudflare Worker has been created/deployed and no deployment
secrets have been set. Production remains out of scope. All subsequent work uses PRs.

## 1. Establish the public repository

- Review all files before the first commit. Do not publish ignored research,
  authentication data, content archives or assets without publication permission.
- Create the repository under `mtmarctoni`, with default branch `main`. Bootstrap
  the initial reviewed tree through the developer's controlled initialization;
  subsequent changes go through feature branches and draft PRs.
- The trusted `main` branch must contain both workflows, scripts and tests before
  owner PRs can trigger staging. A `workflow_run` workflow is read from the default
  branch; merely placing it in the first PR does not activate it.
- Give the owner collaborator access, not administration. CODEOWNERS names
  `@mtmarctoni`; confirm that is the account retaining merge authority.

## 2. Enforce main protection

Use TWO active branch rulesets targeting main:

1. **Update authority:** restrict updates, deletion and force pushes. Only the
   developer/admin role may bypass this ruleset, preferably **PR-only bypass**.
   Never add the owner's write role as a bypass actor.
2. **Review/check gate:** require PRs, resolved review threads, and required
   `Validate` plus `staging/e2e` checks. No routine bypass
   on this second ruleset, including for the developer.

Separate rulesets prevent the developer's ability to update main from accidentally
bypassing tests/review as well. Verify GitHub's exact controls on the actual account.
If PR-only bypass is unavailable for the desired restriction, use the strongest
available update restriction plus the separate no-bypass PR/check ruleset.

**Two-person review decision:** GitHub cannot let a developer approve their own PR.
Formal required approvals are therefore zero, and CODEOWNER approval is not a
separate enforced gate. The authority ruleset still permits ONLY the developer/admin
to merge, and the check ruleset cannot be bypassed. The developer's explicit merge
is the human approval boundary; CODEOWNERS requests their review for owner changes.
This avoids blocking developer-authored work or training the owner to rubber-stamp it.
No agent may perform that merge without the developer's explicit confirmation.

Provisioned ruleset payloads are recorded in `ops/github/`. Committing those files
alone does not configure GitHub; the live API settings must match them.

`staging/e2e` is a commit status emitted by the trusted staging workflow, not the
ordinary PR workflow. A status is useful for accidents, not proof against a malicious
write collaborator forging statuses. Developer-only merges and review remain the
final boundary. Fork PRs never deploy automatically and cannot satisfy this staging
gate; the developer must vet them and publish through a same-repository task branch.

## 3. Isolate Cloudflare

- Create/use a **staging-only Cloudflare account** with no production resources.
  Do not assume a Workers token can be restricted to one Worker by name.
- Establish the assets-only Worker `chispaconcalma-staging` and enable its
  `workers.dev` address. The custom domain is deferred.
- Obtain a token with only the permissions required for staging static deployments.
  Check current Cloudflare permission requirements before issuing it; do not use a
  global API key. Document expiry/rotation and verify the account ID.
- Keep eventual production in a separate account or prove equivalent enforced
  isolation before placing it alongside staging. The fixed Worker name in config
  alone does not restrict what a stolen token could do.

## 4. Protect deployment credentials in GitHub

Create a GitHub Environment named **staging**:

- Deployment branch policy: **selected branch `main` only**, no matching tags.
  Do NOT choose "all protected branches".
- Put `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in this Environment's
  secrets. **Never repository-level secrets**: a writable PR workflow could read them.
- Do not add unrelated repository secrets readable by owner-edited workflows.
- Environment approval is optional for this automatic staging flow. Main-only
  environment access is mandatory. Explicitly test a workflow pushed on an owner
  branch cannot access this environment, and cannot read its secrets elsewhere.
- Set repository Actions variable `STAGING_URL` to the Worker's HTTPS origin:
  `https://chispaconcalma-staging.<account-subdomain>.workers.dev`.
- Permit Actions to create PR comments and commit statuses with the workflow's
  declared permissions. Enable GitHub notifications for mentions on the developer's
  account. No separate email provider is needed.
- Ensure owner account/agent has no developer token, Cloudflare credentials or
  pre-approved main-bypass credential cached on its machine.

No production environment, production secrets, release tags or deployment commands
are created by this implementation.

## 5. Understand the trust split

`Checks` checks out the exact PR head (not GitHub's synthetic merge commit), installs,
checks, builds, tests, stamps `deployment.json`, validates and uploads `staging-assets`.
This job has read-only repository permissions, no deployment secrets and no shared
cache with privileged jobs.

`Staging` is triggered by `workflow_run` and checks out trusted main:

1. Identify the run/workflow and current same-repository PR independently of check
   success or artifact availability; reject closed/stale/ambiguous PRs and non-main
   bases. Mark its readiness pending, including on re-runs of a previously green SHA.
2. Permit deployment only after successful Checks. Failed Checks or subsequent
   artifact/deployment failures go to the same failure-status/developer-notification
   path; identification does not require deployment credentials or URL configuration.
3. Download exactly one expected artifact by run ID, not by a PR-supplied URL.
4. Validate ZIP paths, duplicates, file types and expansion limits BEFORE extraction.
5. Extract into a new directory separate from source; validate static-only assets.
6. Reject artifact-provided `_worker.js`, `_headers`, `_redirects`, config and symlinks.
7. Inject trusted headers; recheck PR head, then deploy assets with the token exposed
   only to that CLI step.
8. A fresh runner with no Cloudflare secret runs trusted main's Playwright suite
   against the staging origin and checks exact revision metadata.
9. A separate runner rechecks PR currency, posts `staging/e2e` and mentions the dev.

Workflow-level concurrency spans all jobs. It never cancels a running verification,
but GitHub can replace a pending run with a newer pending run. An owner agent must
detect cancellation/supersession and report it, not wait forever or claim success.
The shared URL remains mutable after verification; the run records the tested SHA.
Never deploy outside this workflow while another staging verification is running.

Failure after deployment leaves the failing candidate visible for inspection.
There is no automatic rollback that might race a later PR. To restore a known-good
version, the developer re-runs its successful Checks run (while its PR is still
current), or submits a reviewed revert PR. Closed/stale PRs deliberately cannot
be replayed; restoring one requires a new current PR.

## 6. Required live trial before owner handoff

- [ ] Public repository and trusted default-branch workflows exist.
- [ ] Owner can push a task branch/open a draft PR, but cannot update/merge main,
  delete main, force-push it, bypass checks or alter protections.
- [ ] Owner-branch workflows cannot access the staging Environment or its secrets.
- [ ] A fork PR runs checks only, without staging publication.
- [ ] A harmless owner PR passes Checks, deploys and passes deployed desktop/mobile E2E.
- [ ] Staging reports the exact PR head in `/deployment.json` with no-store headers.
- [ ] A deliberately broken test prevents readiness; a repair publishes a new SHA.
- [ ] Two quick PR updates cannot announce stale success; concurrent PRs cannot
  overwrite staging during E2E. Check superseded queued-run behavior.
- [ ] Dev receives a GitHub mention with URL, SHA and run link; PR stays draft.
- [ ] Test Cloudflare credential scope cannot reach eventual production.
- [ ] Claude Desktop follows the publishing skill in an actual owner session.

Until these pass, call the handoff **prepared, not operational**.
