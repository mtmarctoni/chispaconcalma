export function selectMainRun(run, { repository, workflowId, currentMainSha }) {
  if (
    run.event !== 'push' ||
    run.status !== 'completed' ||
    run.conclusion !== 'success' ||
    run.path !== '.github/workflows/checks.yml' ||
    run.workflow_id !== workflowId ||
    run.head_branch !== 'main' ||
    run.repository?.full_name !== repository ||
    run.head_repository?.full_name !== repository ||
    !/^[a-f0-9]{40}$/.test(run.head_sha || '')
  ) {
    throw new Error('Untrusted main Checks run');
  }
  if (run.head_sha !== currentMainSha)
    throw new Error('Checks run is obsolete; main has advanced');
  return { sha: run.head_sha };
}
