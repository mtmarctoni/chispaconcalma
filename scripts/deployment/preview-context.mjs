// Invoked exclusively from the trusted workflow revision on main.
import {
  selectPreviewRun,
  sourceRun,
  downloadArtifact,
  output,
} from './context.mjs';

const { api, run, workflow } = await sourceRun();
const associated = await api(`commits/${run.head_sha}/pulls?per_page=100`);
const prs = await Promise.all(
  associated.map((pr) => api(`pulls/${pr.number}`)),
);
const identifying = process.argv[2] === 'identify';
const pr = selectPreviewRun(
  run,
  prs,
  process.env.GITHUB_REPOSITORY,
  workflow.id,
  identifying,
);
if (process.env.EXPECTED_PR && pr.number !== Number(process.env.EXPECTED_PR))
  throw new Error('PR association changed');
if (process.argv[2] === 'download')
  await downloadArtifact(api, run, 'preview-artifact.zip');
await output({ sha: run.head_sha, pr: pr.number });
console.log(
  `Verified current preview PR #${pr.number}, revision ${run.head_sha}`,
);
