# Chispa con Calma

Website project for the Instagram account `chispaconcalma`.

## Website and staging

The website now uses Astro with a prerendered React island migrated from the owner's
homepage export. Fonts and portrait are local. Preview/staging/release automation is
prepared; production deployment remains disabled.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

Use Node **26.13.1 LTS** from `.nvmrc` (`nvm install && nvm use` if using nvm).
GitHub validation and staging jobs read this same file. The package engine range
accepts Node 26 LTS patch/minor updates but excludes the Node 27 alpha.
`pnpm validate` runs Astro checks, unit/security tests, build
and desktop/mobile browser tests. `pnpm format:check` checks formatting.

`pnpm install` also installs local Git hooks (`scripts/git-hooks/`) into the clone's
shared hooks folder, covering every worktree: they refuse commits, merge commits and
pushes targeting `main`. They are a local safety net; the GitHub rulesets remain the
authority. Existing hooks and a configured `core.hooksPath` are left untouched; CI skips it.

- [Owner workflow](docs/owner-workflow.md)
- [Website/design contract](docs/site-contract.md)
- [Staging provisioning and security checklist](docs/staging-setup.md)
- [Preview, staging, releases and rollback](docs/releases.md)
- [Design spec](docs/superpowers/specs/2026-11-21-owner-staging-design.md)
- [Implementation plan](docs/superpowers/plans/2026-11-21-owner-staging.md)

**Staging is not live yet.** The [public GitHub repository and protections are
configured](docs/github-setup-status.md); initial publication has explicit one-time
bootstrap approval. Subsequent work uses PRs. Cloudflare authentication, isolated staging credentials, Worker
URL and the live owner trial remain pending. See the setup checklist above.
The rollout retains the existing `staging/e2e` merge gate until preview verification
is proven and the developer approves the live migration. No production launch is implied.

Resource email/download integrations are intentionally unavailable; contact uses email
instead of the prototype's placeholder WhatsApp number.

## Earlier research direction

- Use the sibling `../masrexach` project as a reference for Astro, Cloudflare,
  and deployment conventions only.
- Develop an independent visual identity and user experience.
- Start with a small Instagram content-collection test before building the site.

## Local-only tooling and data

Keep JavaScript dependencies in this project's `node_modules` and Python tools
in `.venv`. Keep downloaded Instagram content in `data/` or `downloads/`, and
authentication sessions in `sessions/`. These paths are excluded from Git.

Never commit passwords, cookies, session files, or downloaded account archives.
Confirm content reuse permission before publishing collected material.

## Status

The organized ten-post research collection is in
[`data/chispaconcalma/research/README.md`](data/chispaconcalma/research/README.md).
It contains profile metadata, captions, 59 visual captures, contact sheets,
source references, and evidence-backed brand/business findings. It is local and
Git-ignored; earlier experiments remain separately in `data/chispaconcalma/test/`.

Instaloader is installed in `.venv`; pinned dependencies are in `requirements.txt`.
The research tooling predates the Astro website. No remote deployment has been performed.

The initial anonymous lookup returned `ProfileNotExistsException`. This does not
confirm that the account is absent; authenticated access remains to be tested.

The password-login test hit Instagram's security checkpoint. A subsequent
approved Brave cookie import loaded cookies, but Instagram redirected the login
validation GraphQL request to its homepage, so authentication could not be
verified and collection did not proceed. Do not repeatedly retry login. The
default Brave profile may differ from the profile used interactively; this has
not been checked. `browser-cookie3` is installed locally for the import test.

### Local authentication

Run from the project directory; enter your password only at the terminal prompt:

```sh
mkdir -p sessions
chmod 700 sessions
.venv/bin/instaloader --login mtmarctoni --sessionfile sessions/mtmarctoni.session --dirname-pattern 'data/{target}' --no-posts --no-compress-json --max-connection-attempts 1 chispaconcalma
```

This attempts to save a local session and download only the target's profile,
not its posts. Do not paste passwords, session contents, or authentication codes
into chat. If Instagram challenges the login, stop and resolve it in Instagram.

The current virtual environment uses the system Python 3.9.6, which emits a
LibreSSL compatibility warning from urllib3. Prefer a maintained Python with
OpenSSL when replacing this initial test environment.

## Technical reference findings

`../masrexach` uses Astro with prerendered content, the Cloudflare adapter and
build-time image processing, Tailwind through Vite, and pnpm. Its GitHub Actions
run checks, upload PR preview versions, deploy staging from main, and deploy
production from releases. Preview and staging are separate from production.

These are architecture references, not copied configuration: domain names,
Cloudflare resources, credentials, content, layouts, fonts, and UI must not be
inherited from that project.
