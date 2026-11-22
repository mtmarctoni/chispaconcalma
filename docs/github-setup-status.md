# GitHub provisioning status — 2026-11-21

Repository: https://github.com/mtmarctoni/chispaconcalma

## Preview provisioning update — 2026-11-22

PR #3 was merged at `838c30ca918520a622ee42b824e13b8d1fca2c8b`.
The developer approved preparing a follow-up PR and preview activation.
Applied and read back:

- GitHub Environment `preview` exists (28146568199), with custom deployment policies
  allowing only branch `main`, no tag rule, and admin bypass disabled.
- Repository variable `PREVIEW_ACCOUNT_SUBDOMAIN` is configured from the account
  subdomain in the existing `STAGING_URL`; no credentials were read or copied.
- The developer added `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` directly to
  the preview Environment. Both secret names were verified through GitHub; their
  values were not read, copied or printed. GitHub cannot reveal/copy encrypted
  values from staging; never paste them in chat or use repository-level secrets.
- The existing staging Environment has both secret names configured. This does not
  independently prove their scope or nonproduction-account isolation.
- No required-check migration or activation-flag change was performed.
  `Validate` and legacy `staging/e2e` remain required; main Staging, release
  maintenance and production remain disabled.

Preview is **configured, with credential names present**, not deployed or verified.
Credential validity, permissions and account isolation still require the live trial.
Use the follow-up draft PR for the first exact-SHA preview trial.
Do not rerun a closed PR to request a preview: the guard correctly
rejects it. Keep the legacy gate until successful live preview evidence and a
separate developer-approved migration.

## Approved merge-method update — 2026-11-22

The developer approved enabling rebase alongside squash. Applied and read back:

- Repository: squash and rebase enabled; merge commits remain disabled.
- `main-review-and-checks` (27800020): allowed methods are now `squash` and `rebase`.
- All other live ruleset fields were compared with the pre-update response and
  remained unchanged, including required checks, strict up-to-date policy, resolved
  threads, active enforcement and the empty bypass-actor list.
- `main-update-authority` (27800019) remains active with admin-role **PR-only bypass**.
  GitHub may label developer merges “bypass rules” because this authorizes updating
  main through a PR; it does not bypass the separate required-check/review ruleset.
- No PR was merged and no deployment was requested by this settings update.

The original provisioning snapshot below records the previous squash-only state.

**Prepared rollout, not applied settings:** `docs/releases.md` describes the new
two-Worker preview/staging/release model. The historical API read-back below remains
unchanged; new environments, flags, action allowlists and required-check migration
were not provisioned by PR #3. The dated update above records subsequent preview
Environment provisioning; the remaining rollout is not activated or verified.

## Applied and read back from GitHub

- Public repository owned by `mtmarctoni`, default branch name `main`.
- Local `origin` is `git@github.com:mtmarctoni/chispaconcalma.git`.
- Only current collaborator is `mtmarctoni` with admin role. No owner invitation
  has been sent because the owner's GitHub username has not been supplied.
- Ruleset `main-update-authority` (27800019) is active for `main` and the default
  branch. Creation, updates, deletion and force pushes are restricted; only the
  repository admin role has PR-only bypass.
- Ruleset `main-review-and-checks` (27800020) is active with NO bypass actors.
  Requires PRs, resolved threads, up-to-date branch, and `Validate` / `staging/e2e`
  from the GitHub Actions app (15368). Squash merges only.
- Formal approval count is zero: developer-only merge permission is the human gate,
  avoiding the impossible requirement to approve one's own PR.
- Auto-merge disabled. Merge commits and rebase merges disabled. Merged task branches
  are automatically deleted.
- Actions enabled, default token permissions read-only, Actions PR approval disabled.
- Actions require full-length SHA pins. GitHub-owned actions are allowed; the only
  additional allowed action is the pinned `pnpm/action-setup` used by our workflows.
- Secret scanning, secret push protection, Dependabot alerts and automated security
  fixes enabled.
- GitHub Environment `staging` exists. Its custom deployment policy allows ONLY
  branch `main`, with no tag rule. No deployment secrets have been uploaded.

## One-time initialization approval

The developer explicitly approved initial publication to `main` on 2026-11-21,
limited to project initialization. The foundation is committed on `feature/bootstrap`,
then published to the initially empty `main` in one bootstrap operation. Its two
rulesets are temporarily suspended only for that approved push and restored
immediately, including on failure.

The remote commit and workflow results are available at:
https://github.com/mtmarctoni/chispaconcalma/commits/main

All subsequent development uses task branches and draft PRs. This approval is not
ongoing permission to push directly to main, merge PRs, change protections or deploy
production. Agent instructions never grant themselves a new initialization exception.

## Cloudflare and owner handoff pending

Cloudflare CLI reports `authenticated: false`. No temporary account was created,
no browser login initiated, no existing credentials searched/copied, and no Worker
deployed. Staging credentials must come from a staging-only account (or equivalent
verified isolation), then be stored only in the main-restricted Environment.

Remaining:

- [x] Explicit approval for the one-time main bootstrap and initial source publication.
- [ ] Verify the remote bootstrap commits, restored rulesets and first GitHub checks.
- [ ] Cloudflare authentication/account isolation, staging Worker/token and STAGING_URL.
- [ ] Run the complete live PR -> staging -> E2E -> notification trial.
- [ ] Add the owner's GitHub account with write access and verify restrictions using it.

Settings were verified by API read-back, not by an owner-account permissions trial.
