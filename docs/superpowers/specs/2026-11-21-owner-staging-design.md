# Chispa con Calma: faithful Astro site and owner staging

## Intent

Build the actual website before inviting the owner to work through Claude Desktop's
Code section. The owner directs design; the developer owns engineering, review,
merges and eventual production releases. The exported homepage is the visual and
behavioral reference, not inspiration for a redesign.

## Agreed constraints

- Astro and Cloudflare Workers; pnpm; public repository under the developer's
  personal GitHub account.
- Preserve the export's appearance and interactions as closely as practical.
- A dedicated staging Worker has one permanent address; custom domain comes later.
- A future production Worker is separate. Production deployment is out of scope.
- Owner edits and previews the real files locally, not Claude artifacts.
- Publish changes through task branches and draft PRs; only the developer merges.
- CI validates code, deploys staging, runs E2E against it, and notifies the developer.
- Claude can fix ordinary failures, but must stop after bounded attempts.
- No additional discovery questions: remaining choices are developer decisions below.

## Implementation decisions

### Source and website

The repository has no commits or Git remote and contains uncommitted research
tooling. Preserve that work and implement on the existing `feature/bootstrap`
branch. Do not create an initial main commit or publish anything implicitly.

Extract the prototype's assets, copy, CSS and interactive source from its embedded
bundle. Astro generates the page; a React island is acceptable to preserve the
prototype's stateful interactions without maintaining its proprietary artifact
runtime. Keep reusable source and local assets, not an iframe or exported HTML as
the production implementation. Split sections where conversion permits safe,
faithful boundaries. Do not introduce Tailwind merely to rewrite working reference
CSS: fidelity takes precedence over a new styling system.

The page is Spanish. Preserve the reference's palette, original fonts, illustrations,
portrait, section order, desktop/mobile layouts, quiz, services, menu, breathing
exercise and motion. Respect reduced motion. Supply meaningful static HTML via SSR.
Preserve reference copy except for unsafe placeholders and false success claims.
Unconfigured resource delivery and WhatsApp must not pretend to work: offer an
honest email contact fallback and explicit staging-only resource unavailability.
No real email collection, booking, payment, analytics or backend is added.

### Staging flow

One task branch per change. Pushing a same-repository PR automatically requests
staging publication after validation. Fork PRs run unprivileged checks only.
The deployment workflow lives on the trusted default branch and does not execute
PR-provided build scripts with Cloudflare credentials. Build in an unprivileged
job, then transfer only validated static assets to the isolated deployment job.
Use separate runners, minimal permissions and pinned dependencies.

One global concurrency group covers deployment AND deployed E2E. Do not interrupt
an active verification run; re-check the PR head before deploying and before
announcing readiness. Include the commit SHA in a no-cache deployment metadata file
and assert it from E2E. PRs/CI records are immutable evidence for a SHA; the shared
staging address is mutable and may subsequently show another task.

Deploy only to `chispaconcalma-staging`. No production command, binding, credentials
or workflow is introduced. Use the Cloudflare `cf` CLI for this new project,
after validating available package/CLI support. Keep deploy config trusted, not
loaded from an owner's build artifact. Fail closed on unexpected artifact files,
Worker code, oversized archives or revision mismatch.

The publishing agent runs local validation, requests explicit "publish for review"
authorization, commits only intended files, pushes its task branch and opens a draft
PR. It watches the exact SHA's validation and staging runs, never mistakes an old
successful check for readiness, and attempts at most two automatic repair cycles.
CI failure, missing permissions, unavailable credentials or infrastructure changes
produce a clear blocked report instead of a false success.

### Permissions and notifications

Document GitHub rulesets restricting main updates to the developer, required checks,
PRs, resolved reviews, deletion/force-push restrictions and CODEOWNERS.
These settings are external provisioning, not enforcement by CLAUDE.md.
No owner access to production or repository administration. Review changes to
workflows, tests, dependencies, deployment config and agent instructions.

Provisioning refinement: formal required approval count is zero because the sole
developer cannot approve their own PR. Developer-only merge authority supplies the
human approval gate; CODEOWNERS is reviewer routing rather than an extra enforced
approval. Both required checks remain enforced with no bypass.

Cloudflare token isolation must be verified during provisioning: do not assume a
token is Worker-name scoped. Use a staging-only Cloudflare account if necessary to
prevent a staging token from modifying eventual production resources.

GitHub review requests/PR comments provide notification and a workflow summary
records SHA, URL and test results. Do not add Slack/email service secrets.
Staging is noindex; public source and deployed assets must contain no private data.

### Agent environment

Canonical shared rules in AGENTS.md; CLAUDE.md imports them. Document site map,
design contract, interaction contract, safe editing boundaries, local commands,
publish protocol, setup and incident recovery. A project-local publishing skill is
discoverable by Claude Code. Instructions are guidance; GitHub/CI are the boundary.

## Verification and acceptance

- Fresh pnpm install, Astro check, production build, source/unit checks and local
  Playwright tests pass.
- E2E covers desktop/mobile navigation, quiz/restart, services, breathing dismissal,
  reduced-motion reading, honest resource behavior, broken links/placeholders,
  page errors and missing assets.
- Deployment revision verification rejects stale SHA or malformed metadata.
- Deployment artifact validation rejects executable Worker uploads and unsafe paths.
- CI never makes secrets available while running PR-controlled source.
- Visual screenshots are inspected against the export; differences and unverified
  states are reported honestly.
- Remote setup is explicitly pending until repository, rulesets, Cloudflare account,
  staging token and staging URL are configured and a live trial passes.

## Non-goals

Production releases, custom domains, paid integrations, CMS, visual editor,
automatic merging and promises of perfect AI output.
