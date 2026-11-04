"""Validate the local, self-contained copy before publishing it."""
from pathlib import Path, PurePosixPath
import hashlib, json
here = Path(__file__).resolve().parent
snapshot = json.loads((here / 'snapshot.json').read_text())
root = Path('site104')
expected = {r['path']: r for r in snapshot['files']}
# Keep the original imported snapshot intact; verify reviewed updates separately.
updates_path = here / 'approved-updates.json'
updates = json.loads(updates_path.read_text()) if updates_path.exists() else {}
assert set(updates) <= set(expected), 'Updates must name existing snapshot files'
expected.update(updates)
additions_path = here / 'approved-additions.json'
additions = json.loads(additions_path.read_text()) if additions_path.exists() else {}
assert not set(additions) & set(expected), 'Additions must name new files'
expected.update(additions)
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
print(f'PASS: Sites version {snapshot["version"]}; {len(actual)} verified files ({len(updates)} reviewed updates); archived media retained')


# Current Turkish pool: archived foreign assets remain intact for rollback.
turkish = json.loads((root / 'assets/family578/manifest.json').read_text())
assert turkish['clipCount'] == 30 and turkish['originalSourceCount'] == 3
assert len(turkish['clips']) == 30 and sum(len(c['questions']) for c in turkish['clips']) == 90
assert len({c['mediaKey571'] for c in turkish['clips']}) == 30
for c in turkish['clips']:
    assert c['language'] == 'tr' and c['duration'] == 30 and c['mediaStart578'] >= 0
    assert c['file'].startswith('https://upload.wikimedia.org/')
    assert len(c['questions']) == 3
print('PASS: archived Turkish pool — 30 source intervals / 3 original sources / 90 questions')

# Current variety pool: never count multiple cuts of the same original as new videos.
variety = json.loads((root / 'assets/family579/manifest.json').read_text())
clips = variety['clips']
assert len(clips) == 100 and variety['categoryCount'] == 100 and variety['questionCount'] == 100
assert len({c['originalKey579'] for c in clips}) == len(clips)
assert len({c['category579'].casefold() for c in clips}) == len(clips)
assert all(len(c['questions']) == 1 and c['language'] == 'tr' and c['duration'] == 30 for c in clips)
for c in clips:
    q = c['questions'][0]
    assert len(q['options']) == 4 and len(set(q['options'])) == 4 and 0 <= q['answer'] < 4
print('PASS: active family pool — 100 original videos / 100 different topics / 100 single questions')
