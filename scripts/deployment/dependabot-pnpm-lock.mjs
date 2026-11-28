import { isDeepStrictEqual } from 'node:util';

const dependencyGroups = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
];
const snapshotGroups = ['dependencies', 'optionalDependencies'];
const isRecord = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const resolvedVersion = (ref) =>
  typeof ref === 'string' ? ref.split('(', 1)[0] : null;

function packageTree(snapshots, root) {
  const visited = new Set();
  const packages = new Set();
  const pending = Object.keys(snapshots).filter(
    (key) => resolvedVersion(key) === root,
  );
  while (pending.length) {
    const key = pending.pop();
    if (visited.has(key)) continue;
    visited.add(key);
    packages.add(resolvedVersion(key));
    const snapshot = snapshots[key];
    for (const group of snapshotGroups) {
      for (const [name, ref] of Object.entries(snapshot[group] ?? {})) {
        const dependencyKey = `${name}@${ref}`;
        if (Object.hasOwn(snapshots, dependencyKey))
          pending.push(dependencyKey);
      }
    }
  }
  return packages;
}

function otherSnapshots(snapshots, affectedPackages, name, from, to) {
  const result = new Map();
  for (const [key, snapshot] of Object.entries(snapshots)) {
    const pkg = resolvedVersion(key);
    if (affectedPackages.has(pkg)) continue;
    const normalized = { ...snapshot };
    for (const group of snapshotGroups) {
      if (!isRecord(snapshot[group])) continue;
      normalized[group] = Object.fromEntries(
        Object.entries(snapshot[group]).map(([dependency, ref]) => {
          const version = resolvedVersion(ref);
          return [
            dependency,
            dependency === name && version === from ? to : version,
          ];
        }),
      );
    }
    const variants = result.get(pkg) ?? [];
    if (!variants.some((variant) => isDeepStrictEqual(variant, normalized)))
      variants.push(normalized);
    result.set(pkg, variants);
  }
  return result;
}

export function matchesPnpmLockBump(locks, name, from, to, rangeChange) {
  if (!locks?.every(isRecord) || locks.length !== 2) return false;
  const [before, after] = locks;
  const layout = ({ importers, packages, snapshots, ...settings }) => settings;
  if (
    before.lockfileVersion !== '9.0' ||
    !isDeepStrictEqual(layout(before), layout(after)) ||
    !locks.every(
      ({ importers, packages, snapshots }) =>
        [importers, packages, snapshots].every(isRecord) &&
        Object.keys(importers).length === 1 &&
        isRecord(importers['.']) &&
        Object.values(snapshots).every(isRecord),
    )
  )
    return false;

  const oldKey = `${name}@${from}`;
  const newKey = `${name}@${to}`;
  const oldTree = packageTree(before.snapshots, oldKey);
  const newTree = packageTree(after.snapshots, newKey);
  if (
    !Object.hasOwn(before.packages, oldKey) ||
    !Object.hasOwn(after.packages, newKey) ||
    !oldTree.size ||
    !newTree.size
  )
    return false;
  for (const [key, details] of Object.entries(before.packages)) {
    if (!Object.hasOwn(after.packages, key)) {
      if (!oldTree.has(key)) return false;
    } else if (!isDeepStrictEqual(details, after.packages[key])) return false;
  }
  for (const [key, details] of Object.entries(after.packages)) {
    if (Object.hasOwn(before.packages, key)) continue;
    const resolution = details?.resolution;
    if (
      !newTree.has(key) ||
      !isRecord(resolution) ||
      Object.keys(resolution).length !== 1 ||
      typeof resolution.integrity !== 'string' ||
      !/^sha512-[A-Za-z0-9+/]+={0,2}$/.test(resolution.integrity)
    )
      return false;
  }

  // Peer suffixes may change outside the upgraded tree. Their actual
  // dependency versions must stay the same except for links to this bump.
  const affectedPackages = new Set([...oldTree, ...newTree]);
  const oldSnapshots = otherSnapshots(
    before.snapshots,
    affectedPackages,
    name,
    from,
    to,
  );
  const newSnapshots = otherSnapshots(
    after.snapshots,
    affectedPackages,
    name,
    from,
    to,
  );
  if (oldSnapshots.size !== newSnapshots.size) return false;
  for (const [pkg, beforeVariants] of oldSnapshots) {
    const afterVariants = newSnapshots.get(pkg);
    if (
      beforeVariants.length !== afterVariants?.length ||
      !beforeVariants.every((beforeVariant) =>
        afterVariants.some((afterVariant) =>
          isDeepStrictEqual(beforeVariant, afterVariant),
        ),
      )
    )
      return false;
  }

  const oldImporter = before.importers['.'];
  const newImporter = after.importers['.'];
  const isDependencyGroup = (key) => dependencyGroups.includes(key);
  const options = (importer) =>
    Object.fromEntries(
      Object.entries(importer).filter(([key]) => !isDependencyGroup(key)),
    );
  if (!isDeepStrictEqual(options(oldImporter), options(newImporter)))
    return false;

  let updatedDirectPin = false;
  for (const group of dependencyGroups) {
    const oldDeps = oldImporter[group] ?? {};
    const newDeps = newImporter[group] ?? {};
    if (
      !isRecord(oldDeps) ||
      !isRecord(newDeps) ||
      Object.keys(oldDeps).length !== Object.keys(newDeps).length
    )
      return false;
    for (const [dependency, oldPin] of Object.entries(oldDeps)) {
      const newPin = newDeps[dependency];
      if (!isRecord(oldPin) || !isRecord(newPin)) return false;
      const { version: oldRef, specifier: oldSpec, ...oldOptions } = oldPin;
      const { version: newRef, specifier: newSpec, ...newOptions } = newPin;
      if (!isDeepStrictEqual(oldOptions, newOptions)) return false;
      const oldVersion = resolvedVersion(oldRef);
      const newVersion = resolvedVersion(newRef);
      if (dependency === name && oldVersion === from && newVersion === to) {
        if (updatedDirectPin) return false;
        if (
          rangeChange
            ? oldSpec !== rangeChange.from || newSpec !== rangeChange.to
            : oldSpec !== newSpec
        )
          return false;
        updatedDirectPin = true;
      } else if (oldSpec !== newSpec || oldVersion !== newVersion) return false;
    }
  }
  return (
    updatedDirectPin ||
    (!rangeChange &&
      !Object.hasOwn(before.packages, newKey) &&
      !Object.hasOwn(after.packages, oldKey))
  );
}
