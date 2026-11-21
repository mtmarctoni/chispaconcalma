import { execFileSync, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { githubApi, output } from '../deployment/context.mjs';

const stableTag = /^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/;
const commit = /^[a-f0-9]{40}$/;

export function validateRelease({
  tag,
  release,
  tagSha,
  gitSha,
  expectedSha,
  isAncestor,
}) {
  if (!stableTag.test(tag || '')) throw new Error('Invalid stable release tag');
  if (
    !release ||
    release.tag_name !== tag ||
    release.draft !== false ||
    release.prerelease !== false ||
    !release.published_at
  ) {
    throw new Error('Expected a published stable release for this tag');
  }
  if (
    !commit.test(tagSha || '') ||
    gitSha !== tagSha ||
    (expectedSha && expectedSha !== tagSha) ||
    isAncestor !== true
  ) {
    throw new Error(
      'Release tag commit mismatch or commit outside main history',
    );
  }
  return { tag, sha: tagSha };
}

export async function resolveRelease(env = process.env) {
  if (env.PRODUCTION_DEPLOY_ENABLED !== 'true')
    throw new Error('Production deployment is disabled');
  if (env.GITHUB_REF !== 'refs/heads/main')
    throw new Error('Production deployment must run from main');
  const tag = env.RELEASE_TAG;
  if (!stableTag.test(tag || '')) throw new Error('Invalid stable release tag');
  const api = githubApi(env.GITHUB_REPOSITORY, env.GH_TOKEN);
  const release = await api(`releases/tags/${tag}`);
  // commits/<tag> peels annotated tags; explicit refs/tags avoids branch ambiguity.
  const tagged = await api(`commits/refs/tags/${tag}`);
  const gitSha = execFileSync(
    'git',
    ['rev-parse', '--verify', `refs/tags/${tag}^{commit}`],
    { encoding: 'utf8' },
  ).trim();
  const ancestor = spawnSync('git', [
    'merge-base',
    '--is-ancestor',
    gitSha,
    'origin/main',
  ]);
  return validateRelease({
    tag,
    release,
    tagSha: tagged.sha,
    gitSha,
    expectedSha: env.EXPECTED_SHA,
    isAncestor: ancestor.status === 0,
  });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const result = await resolveRelease();
  await output(result);
  console.log(`Resolved published release ${result.tag} to ${result.sha}`);
}
