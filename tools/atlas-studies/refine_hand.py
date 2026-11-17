"""Refined isolated Blender animation. Reuses approved room and camera blocking."""
import bpy, math, pathlib, sys
from mathutils import Vector, Euler
OUT=pathlib.Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(OUT/'walk-plug-study.blend'))
s=bpy.context.scene;s.frame_set(1)
old=bpy.data.objects['Animated right hand']
for o in list(old.children_recursive)+[old]:bpy.data.objects.remove(o,do_unlink=True)
def material(name,color,rough):
 m=bpy.data.materials.new(name);m.use_nodes=True;b=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');b.inputs['Base Color'].default_value=(*color,1);b.inputs['Roughness'].default_value=rough;return m
skin=material('Refined warm skin',(.46,.265,.185),.54)
b=next(n for n in skin.node_tree.nodes if n.type=='BSDF_PRINCIPLED');b.inputs['Subsurface Weight'].default_value=.065
n=skin.node_tree.nodes;lk=skin.node_tree.links;noise=n.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=360
bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.12;bump.inputs['Distance'].default_value=.00008;lk.new(noise.outputs['Fac'],bump.inputs['Height']);lk.new(bump.outputs[0],b.inputs['Normal'])
cloth=material('Soft charcoal cotton sleeve',(.019,.025,.032),.9)
nailmat=material('Natural matte fingernails',(.53,.345,.28),.36)
parts=[]
def oval(name,p,scale,mat=skin):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=p);o=bpy.context.object;o.name=name;o.scale=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(mat)
 for f in o.data.polygons:f.use_smooth=True
 return o
parts.append(oval('Palm foundation',(0,-.104,.005),(.035,.051,.017)))
parts.append(oval('Wrist foundation',(0,-.157,.003),(.025,.035,.017)))
parts.append(oval('Thenar pad',(.023,-.108,-.004),(.016,.026,.014)))
parts.append(oval('Little finger palm pad',(-.025,-.112,.002),(.014,.032,.016)))
specs=[]
for i,(x,y,lengths) in enumerate([(-.026,-.071,[.029,.020,.016]),(-.009,-.061,[.035,.024,.018]),(.009,-.059,[.036,.025,.018]),(.026,-.069,[.030,.021,.016])]):
 p=Vector((x,y,.010));parent='palm'
 for j,length in enumerate(lengths):
  q=p+Vector((0,length,0));name=f'finger{i}_{j}';r=(.0082 if i in [1,2] else .0072)*(1-j*.10)
  parts.append(oval(name+' flesh',(p+q)/2,(r,length*.66,r*.92)))
  parts.append(oval(name+' joint',p,(r,r,r*.94)))
  specs.append((name,p.copy(),q.copy(),parent));parent=name;p=q
 # Nails are weighted with their distal bone below.
 nail=oval(f'Nail {i}',p-Vector((0,.007,-.0058)),(.0045,.0065,.001),nailmat)
 nail['bone']=parent
# Thumb rests alongside palm and opposes across the plug when gripping.
p=Vector((.032,-.109,.003))
for j,q in enumerate([Vector((.052,-.086,.004)),Vector((.054,-.059,.006))]):
 name=f'thumb{j}';o=oval(name+' flesh',(p+q)/2,(.010,(q-p).length*.68,.010));o.rotation_euler=(q-p).to_track_quat('Y','Z').to_euler();parts.append(o);specs.append((name,p.copy(),q.copy(),'palm' if j==0 else 'thumb0'));p=q
thumb_nail=oval('Thumb nail',(.054,-.065,.014),(.006,.007,.001),nailmat);thumb_nail['bone']='thumb1'
# Union the overlapping forms into a continuous palm and fingers.
bpy.ops.object.select_all(action='DESELECT')
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();mesh=bpy.context.object;mesh.name='Continuous anatomical hand'
bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
rem=mesh.modifiers.new('Unified skin surface','REMESH');rem.mode='VOXEL';rem.voxel_size=.0015;bpy.ops.object.modifier_apply(modifier=rem.name)
sm=mesh.modifiers.new('Relax skin transitions','SMOOTH');sm.factor=.8;sm.iterations=4;bpy.ops.object.modifier_apply(modifier=sm.name)
for p in mesh.data.polygons:p.use_smooth=True
arm=bpy.data.armatures.new('Hand articulation');rig=bpy.data.objects.new('Refined right hand rig',arm);s.collection.objects.link(rig)
bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
root=arm.edit_bones.new('palm');root.head=(0,-.18,0);root.tail=(0,-.065,0)
for name,p,q,parent in specs:
 bone=arm.edit_bones.new(name);bone.head=p;bone.tail=q;bone.parent=arm.edit_bones[parent]
bpy.ops.object.mode_set(mode='OBJECT')
segments=[('palm',Vector((0,-.18,0)),Vector((0,-.065,0)),'')]+specs
groups={name:mesh.vertex_groups.new(name=name) for name,_,_,_ in segments}
def distance(p,a,b):
 d=b-a;t=max(0,min(1,(p-a).dot(d)/d.length_squared));return (p-(a+d*t)).length
for v in mesh.data.vertices:
 p=v.co;ds=sorted((distance(p,a,b),name) for name,a,b,_ in segments)
 # Restrict blending to nearby joints rather than unrelated neighboring digits.
 nearest=ds[0][1];family=nearest.split('_')[0]
 candidates=[(d,name) for d,name in ds if name=='palm' or name.split('_')[0]==family][:2]
 weights=[1/(d+.001)**4 for d,_ in candidates];total=sum(weights)
 for (_,name),w in zip(candidates,weights):groups[name].add([v.index],w/total,'REPLACE')
mesh.parent=rig;mod=mesh.modifiers.new('Finger articulation','ARMATURE');mod.object=rig
sub=mesh.modifiers.new('Smooth silhouette','SUBSURF');sub.levels=1;sub.render_levels=1
for nail in [o for o in bpy.data.objects if 'bone' in o]:
 bpy.context.view_layer.objects.active=nail;nail.select_set(True);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
 nail.vertex_groups.new(name=nail['bone']).add(list(range(len(nail.data.vertices))),1,'REPLACE');mod=nail.modifiers.new('Follow fingertip','ARMATURE');mod.object=rig;nail.parent=rig
# Forearm continuously connects wrist to a point below the viewer, avoiding a rigid floating tube.
bpy.ops.mesh.primitive_cone_add(vertices=48,radius1=.039,radius2=.031,depth=1)
sleeve=bpy.context.object;sleeve.name='Following tapered sleeve';sleeve.data.materials.append(cloth)
for p in sleeve.data.polygons:p.use_smooth=True
be=sleeve.modifiers.new('Soft cuff edge','BEVEL');be.width=.005;be.segments=3
def smooth(t):
 t=max(0,min(1,t));return t*t*t*(t*(t*6-15)+10)
def mix(a,b,t):return Vector(a).lerp(Vector(b),smooth(t))
plug=bpy.data.objects['Animated plug'];plug.animation_data_clear()
lead=bpy.data.objects['Animated flexible power lead'];lead.data.animation_data_clear();points=lead.data.splines[0].points
rest=Vector((-.93,-.23,.736));hover=Vector((-1.13,.25,1.03));seated=Vector((-1.13,.308,1.03))
for frame in range(1,289):
 s.frame_set(frame);t=(frame-1)/24
 lift=smooth((t-5.35)/1.25);align=smooth((t-6.55)/.3);insert=smooth((t-6.95)/.45)
 pp=rest.lerp(hover,lift);pp.x-=.045*math.sin(math.pi*lift);pp.z+=.035*math.sin(math.pi*lift)
 pp=pp.lerp(seated,insert)
 rot=Euler((-.12*math.sin(math.pi*lift)*(1-align),.10*math.sin(math.pi*lift)*(1-align),-.15*math.sin(math.pi*lift)*(1-align)))
 plug.location=pp;plug.rotation_euler=rot;plug.keyframe_insert('location',frame=frame);plug.keyframe_insert('rotation_euler',frame=frame)
 reach=smooth((t-3.7)/1.3);release=smooth((t-7.5)/.35);withdraw=smooth((t-7.9)/.65)
 offset=Vector((.28,-.48,.12))*(1-reach)+Vector((.22,-.55,-.30))*withdraw
 rig.location=pp+offset+Vector((0,0,.026));rig.rotation_euler=rot
 rig.rotation_euler.z+=.18*(1-reach)+.12*withdraw
 rig.keyframe_insert('location',frame=frame);rig.keyframe_insert('rotation_euler',frame=frame)
 for i in range(4):
  close=smooth((t-(4.88+i*.045))/.35)*(1-release)
  for j,angle in enumerate([.02,-.36,-1.05]):
   pb=rig.pose.bones[f'finger{i}_{j}'];pb.rotation_mode='XYZ';pb.rotation_euler.x=angle*close;pb.keyframe_insert('rotation_euler',frame=frame)
 for j in range(2):
  pb=rig.pose.bones[f'thumb{j}'];pb.rotation_mode='XYZ';pb.rotation_euler.z=(.48 if j==0 else .35)*smooth((t-5.0)/.3)*(1-release);pb.rotation_euler.x=-.3*smooth((t-5)/.3)*(1-release);pb.keyframe_insert('rotation_euler',frame=frame)
 wrist=rig.location+rig.rotation_euler.to_matrix()@Vector((0,-.174,0))
 end=s.camera.location+s.camera.rotation_euler.to_matrix()@Vector((.25,-.36,-.26))
 sleeve.location=(wrist+end)/2;sleeve.scale.z=(wrist-end).length;sleeve.rotation_euler=(wrist-end).to_track_quat('Z','Y').to_euler()
 for prop in ['location','scale','rotation_euler']:sleeve.keyframe_insert(prop,frame=frame)
 for o in [mesh,sleeve]+[o for o in rig.children if o!=mesh]:
  o.hide_render=t<3.7 or t>8.55;o.keyframe_insert('hide_render',frame=frame)
 sway=.009*math.sin((t-5.35)*7)*math.sin(math.pi*lift)
 pts=[(-.39,.20,.91),(-.67,.22,.72),(-.95,.18,.72),(-1.02+sway,.04,.72),tuple(pp+Vector((-.04,-.18,-.08))),tuple(pp+rot.to_matrix()@Vector((0,-.13,-.02))),tuple(pp+rot.to_matrix()@Vector((0,-.09,0)))]
 for bp,co in zip(points,pts):bp.co=(*co,1);bp.keyframe_insert('co',frame=frame)
# Restore fabric detail and use the detected AMD HIP device for the higher quality render.
for o in bpy.data.objects:
 if o.name.endswith('soft pile'):o.hide_render=False
prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='HIP';prefs.get_devices()
for d in prefs.devices:d.use=d.type=='HIP'
s.render.use_persistent_data=True;s.cycles.device='GPU';s.cycles.samples=64;s.cycles.use_denoising=True;s.cycles.adaptive_threshold=.03
s.render.resolution_x=1440;s.render.resolution_y=1080
s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'refined-frames/frame-')
s.frame_set(1);bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'refined-walk-study.blend'))
if '--stills' in sys.argv:
 for frame in [124,151,177,260]:
  s.frame_set(frame);s.render.filepath=str(OUT/f'refined-check-{frame}.png');bpy.ops.render.render(write_still=True)
elif '--save-only' not in sys.argv:bpy.ops.render.render(animation=True)


