"""Render a saved refined scene on HIP; optional inclusive start/end after --."""
import bpy, pathlib, sys
out=pathlib.Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(out/'refined-walk-study.blend'))
p=bpy.context.preferences.addons['cycles'].preferences;p.compute_device_type='HIP';p.get_devices()
for d in p.devices:d.use=d.type=='HIP'
s=bpy.context.scene;s.cycles.device='GPU'
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
if args:s.frame_start=int(args[0]);s.frame_end=int(args[1])
bpy.ops.render.render(animation=True)
