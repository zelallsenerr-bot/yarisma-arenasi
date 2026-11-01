"""Copy the public Sites 104 snapshot; verify every byte before publication."""
from pathlib import Path, PurePosixPath
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib, json, os, time, urllib.parse, urllib.request

here = Path(__file__).resolve().parent
manifest = json.loads((here / 'snapshot.json').read_text())
out = Path(os.environ.get('SITE104_OUTPUT', 'site104')).resolve()
out.mkdir(parents=True, exist_ok=True)
origin = manifest['origin']
assert origin == 'https://yarisma-arenasi-onizleme.zelallsenerr.chatgpt.site/'
rows = manifest['files']
assert len({r['path'] for r in rows}) == len(rows)

def fetch(row):
    rel = PurePosixPath(row['path'])
    if rel.is_absolute() or '..' in rel.parts:
        raise ValueError('Unsafe snapshot path')
    dest = out.joinpath(*rel.parts)
    if dest.exists():
        data = dest.read_bytes()
        digest = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
        if len(data) == row['size'] and digest == row['sha']:
            return row['size']
    url = origin + urllib.parse.quote(row['path'], safe='/')
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Yarisma-Atolyesi-Snapshot104', 'Accept-Encoding': 'identity'})
            with urllib.request.urlopen(req, timeout=90) as response:
                data = response.read(row['size'] + 1)
            digest = hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()
            if len(data) != row['size'] or digest != row['sha']:
                raise ValueError('Snapshot changed or invalid response: ' + row['path'])
            dest.parent.mkdir(parents=True, exist_ok=True)
            temp = dest.with_name(dest.name + '.partial104')
            temp.write_bytes(data)
            temp.replace(dest)
            return len(data)
        except Exception:
            if attempt == 2:
                raise
            time.sleep(1 + attempt * 2)

# Only generated output lives in this directory. Remove files no longer in the snapshot.
expected = {r['path'] for r in rows}
for p in out.rglob('*'):
    if p.is_file() and p.relative_to(out).as_posix() not in expected:
        p.unlink()

size = 0
with ThreadPoolExecutor(max_workers=6) as pool:
    futures = [pool.submit(fetch, row) for row in rows]
    for n, future in enumerate(as_completed(futures), 1):
        size += future.result()
        if n % 200 == 0 or n == len(rows):
            print(f'Verified {n}/{len(rows)} files', flush=True)
assert (out / 'index.html').is_file()
bank = json.loads((out / 'assets/family573/manifest.json').read_text())
assert len(bank) == 100
assert sum(len(c['questions']) for c in bank) == 300
print(f'PASS Sites104: {len(rows)} files, {size} bytes, 100 new videos / 300 new questions', flush=True)
