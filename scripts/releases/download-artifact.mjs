// Download only the current production workflow's secret-free build artifact.
import { githubApi, downloadArtifact, output } from '../deployment/context.mjs';
import { validateOrigin } from '../deployment/targets.mjs';

const id = Number(process.env.GITHUB_RUN_ID);
if (
  !Number.isSafeInteger(id) ||
  id <= 0 ||
  !/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA || '')
) {
  throw new Error('Invalid production workflow identity');
}
const url = validateOrigin(process.env.DEPLOY_URL);
const api = githubApi(process.env.GITHUB_REPOSITORY, process.env.GH_TOKEN);
await downloadArtifact(
  api,
  { id, head_sha: process.env.GITHUB_SHA },
  'production-artifact.zip',
);
await output({ url });
