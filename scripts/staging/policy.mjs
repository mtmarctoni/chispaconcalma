export function selectPullRequest(
  run,
  prs,
  repository,
  workflowId,
  { requireSuccess = true } = {},
) {
  if (
    run.event !== 'pull_request' ||
    run.status !== 'completed' ||
    (requireSuccess && run.conclusion !== 'success') ||
    run.path !== '.github/workflows/checks.yml' ||
    run.workflow_id !== workflowId ||
    run.repository?.full_name !== repository ||
    run.head_repository?.full_name !== repository ||
    !/^[a-f0-9]{40}$/.test(run.head_sha || '')
  ) {
    throw new Error('Untrusted workflow run; refusing staging deployment');
  }
  const candidates = prs.filter(
    (pr) =>
      pr.state === 'open' &&
      pr.head.sha === run.head_sha &&
      pr.head.repo?.full_name === repository &&
      pr.base.repo?.full_name === repository &&
      pr.base.ref === 'main' &&
      Number.isSafeInteger(pr.number) &&
      pr.number > 0,
  );
  if (candidates.length !== 1)
    throw new Error('Expected exactly one current open PR targeting main');
  return candidates[0];
}

export function validateStagingUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('STAGING_URL must be an HTTPS origin');
  }
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'STAGING_URL must be an HTTPS origin without credentials, path, query or fragment',
    );
  }
  return url.origin;
}
