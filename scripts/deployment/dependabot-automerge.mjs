const dependabot = 'dependabot[bot]';

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

export function eligibleBumpSubject(commit, sha) {
  if (
    commit.sha !== sha ||
    commit.author?.login !== dependabot ||
    commit.commit?.verification?.verified !== true ||
    commit.parents?.length !== 1 ||
    commit.files?.length !== 1
  ) {
    return null;
  }

  // Use the signed commit subject, since a PR title or body can be edited.
  const version = '(0|[1-9][0-9]*)';
  const release = `${version}\\.${version}\\.${version}`;
  const subject = commit.commit.message.split('\n', 1)[0];
  const bump = new RegExp(
    `^chore\\(deps(?:-dev)?\\): bump ([a-zA-Z0-9._-]+) from ${release} to ${release}$`,
  );
  const match = subject.match(bump);
  if (!match) return null;

  const [, name, oldMajor, oldMinor, oldPatch, newMajor, newMinor, newPatch] =
    match;
  const minorOrPatch =
    oldMajor === newMajor &&
    (BigInt(newMinor) > BigInt(oldMinor) ||
      (newMinor === oldMinor && BigInt(newPatch) > BigInt(oldPatch)));

  // Check the actual pin change so other changes cannot ride along with the bump.
  const [file] = commit.files;
  if (
    !minorOrPatch ||
    file.filename !== 'requirements.txt' ||
    file.status !== 'modified' ||
    file.additions !== 1 ||
    file.deletions !== 1
  ) {
    return null;
  }
  const changes = file.patch?.split('\n').filter((line) => /^[+-]/.test(line));
  const removed = `-${name}==${oldMajor}.${oldMinor}.${oldPatch}`;
  const added = `+${name}==${newMajor}.${newMinor}.${newPatch}`;
  return changes?.length === 2 && changes[0] === removed && changes[1] === added
    ? subject
    : null;
}
