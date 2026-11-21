// Runs exclusively from trusted main, before deployment and again before readiness.
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { selectPullRequest, validateStagingUrl } from './policy.mjs';

const repository = process.env.GITHUB_REPOSITORY;
if (!/^[\w.-]+\/[\w.-]+$/.test(repository || ''))
  throw new Error('Invalid repository');
const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
const runId = event.workflow_run?.id;
if (!Number.isSafeInteger(runId))
  throw new Error('Expected workflow_run event');
const base = `https://api.github.com/repos/${repository}`;

async function api(endpoint) {
  const response = await fetch(`${base}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok)
    throw new Error(`GitHub API ${endpoint}: ${response.status}`);
  return response.json();
}

const [run, workflow] = await Promise.all([
  api(`actions/runs/${runId}`),
  api('actions/workflows/checks.yml'),
]);
const associated = await api(`commits/${run.head_sha}/pulls?per_page=100`);
// Commit association responses may be stale: fetch each current PR explicitly.
const prs = await Promise.all(
  associated.map((pr) => api(`pulls/${pr.number}`)),
);
const identifying = process.argv[2] === 'identify';
const pr = selectPullRequest(run, prs, repository, workflow.id, {
  requireSuccess: !identifying,
});
// Identification must survive failed checks, missing assets and missing URL setup.
// Only the download/deployment path requires a valid HTTPS staging origin.
const url = identifying ? '' : validateStagingUrl(process.env.STAGING_URL);
if (process.env.EXPECTED_SHA && run.head_sha !== process.env.EXPECTED_SHA) {
  throw new Error('Revision changed during staging verification');
}
if (process.env.EXPECTED_PR && pr.number !== Number(process.env.EXPECTED_PR)) {
  throw new Error('PR association changed during staging verification');
}

if (process.argv[2] === 'download') {
  const result = await api(`actions/runs/${runId}/artifacts?per_page=100`);
  const artifacts = result.artifacts.filter(
    (a) => a.name === 'staging-assets' && !a.expired,
  );
  if (
    artifacts.length !== 1 ||
    artifacts[0].size_in_bytes > 100 * 1024 * 1024 ||
    artifacts[0].workflow_run?.head_sha !== run.head_sha
  ) {
    throw new Error(
      'Missing, ambiguous, oversized or mismatched staging artifact',
    );
  }
  const response = await fetch(
    `${base}/actions/artifacts/${artifacts[0].id}/zip`,
    {
      headers: { Authorization: `Bearer ${process.env.GH_TOKEN}` },
    },
  );
  if (!response.ok)
    throw new Error(`Artifact download failed: ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length > 100 * 1024 * 1024)
    throw new Error('Downloaded archive exceeds limit');
  await writeFile('staging-artifact.zip', bytes, { flag: 'wx' });
}

if (process.env.GITHUB_OUTPUT) {
  await appendFile(
    process.env.GITHUB_OUTPUT,
    `sha=${run.head_sha}\npr=${pr.number}\nurl=${url}\n`,
  );
}
console.log(
  `Verified PR #${pr.number}, revision ${run.head_sha}, staging ${url}`,
);
