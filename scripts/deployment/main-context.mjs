import { selectMainRun } from './main-policy.mjs';
import { sourceRun, downloadArtifact, output } from './context.mjs';
import { validateOrigin } from './targets.mjs';

const { api, run, workflow } = await sourceRun();
const repository = process.env.GITHUB_REPOSITORY;
// Validate provenance even when deciding that an old successful run is obsolete.
selectMainRun(run, {
  repository,
  workflowId: workflow.id,
  currentMainSha: run.head_sha,
});
const main = await api('git/ref/heads/main');
if (process.argv[2] === 'identify') {
  const eligible = main.object.sha === run.head_sha;
  await output({ sha: run.head_sha, eligible });
  console.log(
    eligible
      ? `Current main ${run.head_sha}`
      : `Skipped obsolete main ${run.head_sha}`,
  );
} else {
  selectMainRun(run, {
    repository,
    workflowId: workflow.id,
    currentMainSha: main.object.sha,
  });
  const url = validateOrigin(process.env.DEPLOY_URL);
  if (process.argv[2] === 'download')
    await downloadArtifact(api, run, 'staging-artifact.zip');
  await output({ sha: run.head_sha, url });
}
