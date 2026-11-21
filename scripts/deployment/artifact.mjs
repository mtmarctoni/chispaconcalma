const limit = 100 * 1024 * 1024;

export function selectArtifact(artifacts, run) {
  const matches = artifacts.filter(
    (a) => a.name === 'staging-assets' && !a.expired,
  );
  const a = matches[0];
  if (
    matches.length !== 1 ||
    !Number.isSafeInteger(a.id) ||
    a.id <= 0 ||
    !Number.isSafeInteger(a.size_in_bytes) ||
    a.size_in_bytes < 1 ||
    a.size_in_bytes > limit ||
    a.workflow_run?.id !== run.id ||
    a.workflow_run?.head_sha !== run.head_sha
  ) {
    throw new Error('Missing, ambiguous, oversized or mismatched artifact');
  }
  return a;
}

export async function readBounded(response, max = limit) {
  if (!response.ok || !response.body)
    throw new Error('Artifact download failed');
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > max) throw new Error('Artifact download exceeds limit');
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  return new Uint8Array(Buffer.concat(chunks));
}
