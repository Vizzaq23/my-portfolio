"""Twelve-second standalone Blender blocking study. No website writes."""
import bpy, math, pathlib, sys
from mathutils import Vector
OUT=pathlib.Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(OUT/'night-tv-corner.blend'))
s=bpy.context.scene;s.render.engine='CYCLES';s.cycles.samples=12;s.cycles.use_denoising=True
s.render.resolution_x=768;s.render.resolution_y=576;s.render.resolution_percentage=100
s.render.fps=24;s.frame_start=1;s.frame_end=288
s.camera.data.dof.use_dof=False;s.camera.data.lens=32
# Fine pile retained in source study, hidden only for this fast motion review.
for o in bpy.data.objects:
 if o.name.endswith('soft pile'):o.hide_render=True

def mat(name,col,rough=.5):
 m=bpy.data.materials.new(name);m.use_nodes=True;b=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');b.inputs['Base Color'].default_value=(*col,1);b.inputs['Roughness'].default_value=rough;return m
skin=mat('Animation hand skin',(.42,.23,.15),.6)
bs=next(n for n in skin.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Subsurface Weight'].default_value=.08
cloth=mat('Animation cuff navy',(.013,.022,.035),.94)
ivory=mat('Socket aged ivory',(.44,.42,.35),.42)
rubber=mat('Plug graphite rubber',(.017,.019,.022),.65)
brass=mat('Plug pins',(.35,.25,.12),.3)
def box(name,loc,dim,m,parent=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=dim;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(m);o.parent=parent
 mod=o.modifiers.new('Soft manufactured edge','BEVEL');mod.width=.006;mod.segments=3;o.modifiers.new('Normals','WEIGHTED_NORMAL');return o
def oval(name,loc,scale,m,parent):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=20,ring_count=12,location=loc);o=bpy.context.object;o.name=name;o.scale=scale;o.data.materials.append(m);o.parent=parent
 for p in o.data.polygons:p.use_smooth=True
 return o
def empty(name):
 o=bpy.data.objects.new(name,None);s.collection.objects.link(o);return o
socket=Vector((-1.13,.308,1.03))
box('Wall socket plate',(-1.13,.36,1.03),(.105,.022,.15),ivory)
box('Socket recessed face',(-1.13,.343,1.03),(.071,.012,.081),ivory)
for dx in [-.014,.014]:box('Socket blade slot',(-1.13+dx,.334,1.03),(.004,.003,.018),rubber)
for dz in [-.059,.059]:oval('Outlet screw',(-1.13,.345,1.03+dz),(.003,.002,.003),brass,None)
plug=empty('Animated plug')
box('Moulded plug body',(0,-.026,0),(.054,.055,.045),rubber,plug)
for dx in [-.014,.014]:box('Plug blade',(dx,.015,0),(.004,.033,.014),brass,plug)
for j in range(5):box('Strain relief',(0,-.065-j*.007,0),(.019-j*.001,.006,.019-j*.001),rubber,plug)
hand=empty('Animated right hand')
oval('Palm',(0,-.106,-.006),(.039,.058,.020),skin,hand)
oval('Wrist',(0,-.166,-.009),(.029,.035,.020),skin,hand)
bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=.041,radius2=.035,depth=.9,location=(0,-.635,-.013));sleeve=bpy.context.object;sleeve.name='Continuous forearm sleeve';sleeve.rotation_euler.x=math.pi/2;sleeve.parent=hand;sleeve.data.materials.append(cloth)
oval('Cuff',(0,-.185,-.013),(.035,.021,.026),cloth,hand)
fingers=[]
for i,x in enumerate([-.027,-.009,.009,.026]):
 f=empty('Finger joint '+str(i));f.parent=hand;f.location=(x,-.061,-.003);fingers.append(f)
 oval('Finger proximal',(0,.018,0),(.008,.025,.009),skin,f)
 oval('Curled fingertip',(0,.038,-.012),(.0075,.012,.015),skin,f)
oval('Thumb pad',(.032,-.102,.003),(.018,.029,.017),skin,hand)
thumb=oval('Thumb grip',(.032,-.056,.008),(.012,.029,.011),skin,hand);thumb.rotation_euler.z=-.48
# Editable cable centerline; keyed points preserve connection at both ends.
c=bpy.data.curves.new('TV power lead','CURVE');c.dimensions='3D';c.bevel_depth=.004;c.bevel_resolution=2
sp=c.splines.new('NURBS');sp.points.add(6);sp.order_u=4;sp.use_endpoint_u=True
lead=bpy.data.objects.new('Animated flexible power lead',c);s.collection.objects.link(lead);c.materials.append(rubber)
c.resolution_u=12
def smooth(t):
 t=max(0,min(1,t));return t*t*t*(t*(t*6-15)+10)
def blend(a,b,t):return Vector(a).lerp(Vector(b),smooth(t))
screen=bpy.data.objects['Curved illuminated CRT glass']
shader=next(n for n in screen.data.materials[0].node_tree.nodes if n.type=='BSDF_PRINCIPLED')
lights=[bpy.data.objects[n].data for n in ['CRT forward spill','CRT soft nearby bounce']]
rest=Vector((-.93,-.23,.736));raised=Vector((-1.13,.19,1.03))
for frame in range(1,289):
 t=(frame-1)/24
 # Walk, look down toward the plug, and settle into the reach.
 if t<3.5:
  p=blend((.8,-3.1,1.72),(-.58,-1.20,1.48),t/3.5);target=blend((0,0,1.04),(-.99,.15,.97),t/3.5)
  p.z+=math.sin(t*math.tau*1.55)*.012*math.sin(math.pi*t/3.5)
 elif t<8.0:p=Vector((-.58,-1.20,1.48));target=Vector((-.99,.15,.97))
 else:
  p=blend((-.58,-1.20,1.48),(.28,-1.85,1.52),(t-8)/2);target=blend((-.99,.15,.97),(-.02,0,1.02),(t-8)/2)
 cam=s.camera;cam.location=p;cam.rotation_euler=(target-p).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert('location',frame=frame);cam.keyframe_insert('rotation_euler',frame=frame)
 if t<5.2:pp=rest
 elif t<6.8:
  pp=blend(rest,raised,(t-5.2)/1.6);pp.x-=.05*math.sin(math.pi*smooth((t-5.2)/1.6))
 elif t<7.4:pp=blend(raised,socket,(t-6.8)/.6)
 else:pp=socket
 plug.location=pp;plug.keyframe_insert('location',frame=frame)
 reach=smooth((t-3.7)/1.3);withdraw=smooth((t-7.7)/.8)
 offset=Vector((.30,-.55,-.28))*(1-reach)+Vector((.30,-.6,-.32))*withdraw
 hand.location=pp+offset;hand.keyframe_insert('location',frame=frame)
 hand.hide_render=t<3.7 or t>8.5;hand.keyframe_insert('hide_render',frame=frame)
 for child in hand.children_recursive:
  child.hide_render=hand.hide_render;child.keyframe_insert('hide_render',frame=frame)
 for finger in fingers:
  finger.rotation_euler.x=-.45*smooth((t-4.8)/.4)*(1-withdraw);finger.keyframe_insert('rotation_euler',frame=frame)
 pts=[(-.39,.20,.91),(-.67,.22,.72),(-.95,.18,.72),(-1.02,.04,.72),tuple(pp+Vector((-.04,-.18,-.08))),tuple(pp+Vector((0,-.13,-.02))),tuple(pp+Vector((0,-.09,0)))]
 for bp,co in zip(sp.points,pts):bp.co=(*co,1);bp.keyframe_insert('co',frame=frame)
 # Power stays black until plug seats, followed by restrained flicker and warm-up.
 level=0 if t<7.5 else smooth((t-7.5)/1.0)
 if 7.6<t<8.35:level*=.55+.45*abs(math.sin((t-7.6)*37))
 shader.inputs['Emission Strength'].default_value=3.2*level;shader.inputs['Emission Strength'].keyframe_insert('default_value',frame=frame)
 for light,energy in zip(lights,[26,9]):light.energy=energy*level;light.keyframe_insert('energy',frame=frame)
s.frame_set(1)
s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'walk-frames'/'frame-')
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'walk-plug-study.blend'))
if '--stills' in sys.argv:
 for f in [1,135,177,260]:
  s.frame_set(f);s.render.filepath=str(OUT/f'walk-check-{f}.png');bpy.ops.render.render(write_still=True)
else:bpy.ops.render.render(animation=True)



