const dependabot = 'dependabot[bot]';
const versionPart = '(0|[1-9][0-9]*)';
const release = `${versionPart}\\.${versionPart}\\.${versionPart}`;

export function isCurrentDependabotPull(pull, repository, sha) {
  return (
    pull.state === 'open' &&
    pull.draft === false &&
    pull.user?.login === dependabot &&
    pull.commits === 1 &&
    pull.base?.ref === 'main' &&
    pull.base.repo?.full_name === repository &&
    pull.head?.repo?.full_name === repository &&
    pull.head.sha === sha &&
    /^[0-9a-f]{40}$/.test(sha)
  );
}

export function eligibleBumpSubject(
  commit,
  sha,
  allowedActionRefs = '',
  locks,
) {
  if (
    commit.sha !== sha ||
    commit.author?.login !== dependabot ||
    commit.commit?.verification?.verified !== true ||
    commit.parents?.length !== 1 ||
    !commit.files?.length
  ) {
    return null;
  }

  // Use the signed commit subject, since a PR title or body can be edited.
  const subject = commit.commit.message.split('\n', 1)[0];
  const bump = new RegExp(
    `^chore\\(deps(?:-dev)?\\): (?:\\[[Ss]ecurity\\] )?[Bb]ump (@?[a-zA-Z0-9._/-]+) from (v?)${release} to (v?)${release}$`,
  );
  const match = subject.match(bump);
  if (!match) return null;

  const [
    ,
    name,
    oldPrefix,
    oldMajor,
    oldMinor,
    oldPatch,
    newPrefix,
    newMajor,
    newMinor,
    newPatch,
  ] = match;
  const minorOrPatch =
    oldMajor === newMajor &&
    (BigInt(newMinor) > BigInt(oldMinor) ||
      (newMinor === oldMinor && BigInt(newPatch) > BigInt(oldPatch)));
  if (!minorOrPatch) return null;

  const from = `${oldMajor}.${oldMinor}.${oldPatch}`;
  const to = `${newMajor}.${newMinor}.${newPatch}`;
  const files = new Map();
  for (const file of commit.files) {
    if (file.status !== 'modified' || !file.patch || files.has(file.filename))
      return null;
    const removed = [...file.patch.matchAll(/^-(.*)$/gm)].map(
      (line) => line[1],
    );
    const added = [...file.patch.matchAll(/^\+(.*)$/gm)].map((line) => line[1]);
    if (removed.length !== file.deletions || added.length !== file.additions)
      return null;
    files.set(file.filename, { patch: file.patch, removed, added });
  }

  if (files.size === 1 && files.has('requirements.txt')) {
    const { removed, added } = files.get('requirements.txt');
    return !oldPrefix &&
      !newPrefix &&
      /^[\w.-]+$/.test(name) &&
      removed.length === 1 &&
      added.length === 1 &&
      removed[0] === `${name}==${from}` &&
      added[0] === `${name}==${to}`
      ? subject
      : null;
  }
  if (files.has('pnpm-lock.yaml')) {
    return !oldPrefix && !newPrefix && isPnpmBump(files, name, from, to, locks)
      ? subject
      : null;
  }
  return isWorkflowBump(files, name, from, to, allowedActionRefs)
    ? subject
    : null;
}

function isPnpmBump(files, name, from, to, locks) {
  if (!/^(@[\w.-]+\/)?[\w.-]+$/.test(name)) return false;
  if (files.size > 1 && !(files.size === 2 && files.has('package.json')))
    return false;

  const manifest = files.get('package.json');
  if (!manifest) return matchesPnpmLockBump(locks, name, from, to);
  if (manifest.removed.length !== 1 || manifest.added.length !== 1)
    return false;

  // Dependabot can raise the range floor from a version older than the old lock pin.
  const declaration = new RegExp(
    `^(\\s+"${RegExp.escape(name)}": ")([~^]?)(${release})(",?)$`,
  );
  const current = manifest.removed[0].match(declaration);
  return (
    current?.[4] === from.split('.')[0] &&
    manifest.added[0] === `${current[1]}${current[2]}${to}${current[7]}` &&
    matchesPnpmLockBump(locks, name, from, to, {
      from: `${current[2]}${current[3]}`,
      to: `${current[2]}${to}`,
    })
  );
}

function isWorkflowBump(files, name, from, to, allowedActionRefs) {
  if (!/^[\w.-]+\/[\w.-]+(?:\/[\w.-]+)*$/.test(name)) return false;

  const pin = new RegExp(
    `^(\\s+(?:-\\s+)?uses:\\s+${RegExp.escape(name)}@)([0-9a-f]{40})(?:\\s+#\\s+v?([\\d.]+))?\\s*$`,
  );
  const matchesVersion = (comment, version) =>
    comment === undefined ||
    version === comment ||
    version.startsWith(`${comment}.`);
  let oldRef;
  let newRef;
  for (const [filename, { patch, removed, added }] of files) {
    if (!/^\.github\/workflows\/[\w.-]+\.ya?ml$/.test(filename)) return false;
    if (!removed.length || removed.length !== added.length) return false;

    // Match replacements in place, so a deletion and an insertion elsewhere
    // cannot be mistaken for a pin update.
    let replacements = 0;
    for (const [, deletions, additions] of patch.matchAll(
      /((?:^-.*\n)+)((?:^\+.*(?:\n|$))+)/gm,
    )) {
      const before = deletions.trimEnd().split('\n');
      const after = additions.trimEnd().split('\n');
      if (before.length !== after.length) return false;
      for (const [index, line] of before.entries()) {
        const oldPin = line.slice(1).match(pin);
        const newPin = after[index].slice(1).match(pin);
        if (!oldPin || !newPin || oldPin[1] !== newPin[1]) return false;
        if (
          !matchesVersion(oldPin[3], from) ||
          !matchesVersion(newPin[3], to) ||
          oldPin[2] === newPin[2]
        )
          return false;
        oldRef ??= oldPin[2];
        newRef ??= newPin[2];
        if (oldPin[2] !== oldRef || newPin[2] !== newRef) return false;
        replacements += 1;
      }
    }
    if (replacements !== removed.length) return false;
  }
  // GitHub's Actions policy allows first-party actions. Other refs need
  // explicit approval because the candidate pin may never run in PR checks.
  return (
    name.startsWith('actions/') ||
    allowedActionRefs.split(/\s+/).includes(`${name}@${newRef}`)
  );
}
import { matchesPnpmLockBump } from './dependabot-pnpm-lock.mjs';
