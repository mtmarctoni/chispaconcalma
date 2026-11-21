import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { output } from './context.mjs';
import { validateOrigin, resolveTarget } from './targets.mjs';

export function parsePreviewOutput(text, { workerName, accountSubdomain, pr }) {
  if (
    !/^[a-z0-9-]+$/.test(accountSubdomain || '') ||
    !/^[a-z0-9-]+$/.test(workerName || '') ||
    !Number.isSafeInteger(pr) ||
    pr < 1
  )
    throw new Error('Invalid preview configuration');
  const clean = text.replace(/\x1b\[[0-9;]*m/g, '');
  const one = (label) => {
    const matches = [
      ...clean.matchAll(new RegExp(`^${label}: (\\S+)\\s*$`, 'gm')),
    ];
    if (matches.length !== 1)
      throw new Error(`Missing or ambiguous preview ${label}`);
    return matches[0][1];
  };
  const id = one('Worker Version ID');
  if (
    !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(id)
  )
    throw new Error('Invalid preview version ID');
  const versionUrl = one('Version Preview URL');
  const aliasUrl = one('Version Preview Alias URL');
  const suffix = `-${workerName}.${accountSubdomain}.workers.dev`;
  if (
    versionUrl !== `https://${id.slice(0, 8)}${suffix}` ||
    aliasUrl !== `https://pr-${pr}${suffix}`
  )
    throw new Error('Unexpected preview origin or alias');
  return {
    versionUrl: validateOrigin(versionUrl),
    aliasUrl: validateOrigin(aliasUrl),
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const result = parsePreviewOutput(await readFile(process.argv[2], 'utf8'), {
    workerName: resolveTarget('preview').name,
    accountSubdomain: process.env.PREVIEW_ACCOUNT_SUBDOMAIN,
    pr: Number(process.env.PR_NUMBER),
  });
  await output({ version_url: result.versionUrl, alias_url: result.aliasUrl });
}
