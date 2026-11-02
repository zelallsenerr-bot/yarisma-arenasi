"""Validate the local, self-contained copy before publishing it."""
from pathlib import Path, PurePosixPath
import hashlib, json
here = Path(__file__).resolve().parent
snapshot = json.loads((here / 'snapshot.json').read_text())
root = Path('site104')
expected = {r['path']: r for r in snapshot['files']}
actual = {p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file()}
assert actual == set(expected), 'Snapshot file list mismatch'
for name, row in expected.items():
    rel = PurePosixPath(name)
    assert not rel.is_absolute() and '..' not in rel.parts
    data = root.joinpath(*rel.parts).read_bytes()
    digest = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
    assert len(data) == row['size'] and digest == row['sha'], 'Snapshot mismatch: ' + name
bank = json.loads((root / 'assets/family573/manifest.json').read_text())
assert len(bank) == 100 and sum(len(c['questions']) for c in bank) == 300
print(f'PASS: Sites version {snapshot["version"]}; {len(actual)} exact files; 100 new videos / 300 new questions')
