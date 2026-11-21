import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { selectPullRequest } from '../staging/policy.mjs';
import { selectArtifact, readBounded } from './artifact.mjs';

export function selectPreviewRun(
  run,
  prs,
  repository,
  workflowId,
  identifying = false,
) {
  return selectPullRequest(run, prs, repository, workflowId, {
    requireSuccess: !identifying,
  });
}

export function verifyTrigger(event, run) {
  const source = event.workflow_run;
  if (
    !Number.isSafeInteger(source?.id) ||
    source.id <= 0 ||
    run.id !== source.id ||
    run.head_sha !== source.head_sha ||
    run.run_attempt !== source.run_attempt
  ) {
    throw new Error('Checks trigger no longer matches the current run attempt');
  }
}

export function githubApi(repository, token) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository || ''))
    throw new Error('Invalid repository');
  return async (endpoint, raw = false) => {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    if (!response.ok)
      throw new Error(`GitHub API ${endpoint}: ${response.status}`);
    return raw ? response : response.json();
  };
}

export async function output(values) {
  if (process.env.GITHUB_OUTPUT) {
    for (const [key, value] of Object.entries(values)) {
      if (/[\r\n]/.test(String(value)))
        throw new Error('Unsafe workflow output');
      await appendFile(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
    }
  }
}

export async function sourceRun() {
  const event = JSON.parse(
    await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'),
  );
  const id = event.workflow_run?.id;
  if (!Number.isSafeInteger(id) || id <= 0)
    throw new Error('Expected workflow_run');
  const api = githubApi(process.env.GITHUB_REPOSITORY, process.env.GH_TOKEN);
  const [run, workflow] = await Promise.all([
    api(`actions/runs/${id}`),
    api('actions/workflows/checks.yml'),
  ]);
  verifyTrigger(event, run);
  if (process.env.EXPECTED_SHA && process.env.EXPECTED_SHA !== run.head_sha)
    throw new Error('Source revision changed');
  return { api, run, workflow };
}

export async function downloadArtifact(api, run, destination) {
  const result = await api(`actions/runs/${run.id}/artifacts?per_page=100`);
  const artifact = selectArtifact(result.artifacts, run);
  const response = await api(`actions/artifacts/${artifact.id}/zip`, true);
  await writeFile(destination, await readBounded(response), { flag: 'wx' });
}
