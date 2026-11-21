#!/usr/bin/env python3
"""Extract a bounded, regular-file-only artifact without overlaying trusted source."""
from pathlib import Path, PurePosixPath
import shutil
import stat
import sys
import zipfile

archive, destination = map(Path, sys.argv[1:])
if destination.exists():
    raise ValueError("Destination must not exist")
if archive.stat().st_size > 100 * 1024 * 1024:
    raise ValueError("Artifact archive too large")
with zipfile.ZipFile(archive) as bundle:
    entries = bundle.infolist()
    if len(entries) > 2000 or sum(e.file_size for e in entries) > 100 * 1024 * 1024:
        raise ValueError("Artifact exceeds extraction budget")
    seen = set()
    # Validate the entire central directory before creating any output.
    for entry in entries:
        name = entry.filename
        parts = PurePosixPath(name).parts
        mode = entry.external_attr >> 16
        if (not parts or name.startswith("/") or "\\" in name
                or any(p in (".", "..") or ":" in p for p in parts)
                or name != "/".join(parts) + ("/" if entry.is_dir() else "")
                or (mode and stat.S_IFMT(mode) not in (0, stat.S_IFREG, stat.S_IFDIR))):
            raise ValueError(f"Unsafe artifact path/type: {name}")
        if name.rstrip("/") in seen:
            raise ValueError(f"Duplicate artifact path: {name}")
        seen.add(name.rstrip("/"))
        if entry.file_size > 25 * 1024 * 1024:
            raise ValueError("Artifact file too large")
    destination.mkdir(parents=True)
    for entry in entries:
        target = destination.joinpath(*PurePosixPath(entry.filename).parts)
        if entry.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            with bundle.open(entry) as source, target.open("xb") as output:
                shutil.copyfileobj(source, output)
print(f"Extracted {len(entries)} entries to isolated asset directory")
