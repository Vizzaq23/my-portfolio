"""Read-only GLB/manifest validation. Does not certify visual or motion quality."""
import hashlib,json,pathlib,struct,sys
ROOT=pathlib.Path(__file__).resolve().parents[2]
ASSETS=ROOT/'public/atlas/walk-preview/assets'
report=[]
for path in sorted(ASSETS.glob('*.glb')):
    raw=path.read_bytes();magic,version,length=struct.unpack_from('<III',raw)
    assert magic==0x46546c67 and version==2 and length==len(raw),path.name
    json_length,chunk=struct.unpack_from('<II',raw,12);assert chunk==0x4e4f534a
    doc=json.loads(raw[20:20+json_length]);assert doc['asset']['version']=='2.0'
    assert all('uri' not in b for b in doc.get('buffers',[])), 'external buffer'
    assert all('uri' not in im for im in doc.get('images',[])), 'external image'
    for view in doc.get('bufferViews',[]):
        assert view.get('byteOffset',0)+view['byteLength']<=doc['buffers'][view['buffer']]['byteLength']
    vertices=sum(doc['accessors'][p['attributes']['POSITION']]['count'] for m in doc['meshes'] for p in m['primitives'])
    assert vertices<30000 and len(raw)<1000000,(path.name,vertices)
    if path.stem=='hand':assert len([n for n in doc['nodes'] if n.get('name','').startswith('Finger')])==8
    report.append({'file':path.name,'vertices':vertices,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()})
manifest=ASSETS/'manifest.json'
if manifest.exists():
    for entry in json.loads(manifest.read_text())['files']:
        p=ASSETS/entry['file'];assert p.parent==ASSETS and p.is_file()
        assert hashlib.sha256(p.read_bytes()).hexdigest()==entry['sha256'],p.name
print(json.dumps({'status':'passed','glb':report},indent=2))
