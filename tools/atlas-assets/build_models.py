"""Build editable hero assets in Blender; coordinates authored in Three.js axes.
Run Blender --background --factory-startup --python tools/atlas-assets/build_models.py.
"""
import bpy, math, pathlib, json
from mathutils import Vector

ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'public/atlas/walk-preview/assets'
OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def co(p): return (p[0],-p[2],p[1])
def material(name,rgb,rough=.9):
    m=bpy.data.materials.new(name);m.diffuse_color=(*rgb,1);m.use_nodes=True
    bs=m.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(*rgb,1);bs.inputs['Roughness'].default_value=rough
    return m
fur=material('warm woven fur',(.34,.19,.10));face=material('honey felt',(.61,.40,.22));ivory=material('cream stitching',(.83,.76,.59));dark=material('embroidered dark',(.018,.024,.032));pink=material('faded rose felt',(.48,.13,.21));blue=material('blue nose',(.045,.17,.28));navy=material('navy shell',(.045,.07,.115),.65);trim=material('aged ivory plastic',(.48,.47,.39),.7);skin=material('hand warm skin',(.57,.35,.23));nail=material('nails',(.65,.45,.34));metal=material('dark metal',(.07,.08,.09),.5)
assets={}
def empty(name,pos=(0,0,0),parent=None):
    o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o);o.location=co(pos);o.parent=parent;return o
def finish(o,name,m,parent):
    o.name=name;o.data.materials.append(m);o.parent=parent;return o
def cube(name,p,size,m,parent,bevel=.005):
    bpy.ops.mesh.primitive_cube_add(size=1,location=co(p));o=bpy.context.object;o.scale=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if bevel:
        mod=o.modifiers.new('soft manufactured edges','BEVEL');mod.width=bevel;mod.segments=2
        bpy.ops.object.modifier_apply(modifier=mod.name)
        mod=o.modifiers.new('weighted corner normals','WEIGHTED_NORMAL');bpy.ops.object.modifier_apply(modifier=mod.name)
    return finish(o,name,m,parent)
def ellipsoid(name,p,size,m,parent):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=10,radius=1,location=co(p));o=bpy.context.object;o.scale=(size[0],size[2],size[1]);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    for f in o.data.polygons:f.use_smooth=True
    return finish(o,name,m,parent)
def rod(name,a,b,r,m,parent):
    a,b=Vector(co(a)),Vector(co(b));bpy.ops.mesh.primitive_cylinder_add(vertices=10,radius=r,depth=(b-a).length,location=(a+b)*.5);o=bpy.context.object;o.rotation_mode='QUATERNION';o.rotation_quaternion=(b-a).to_track_quat('Z','Y');return finish(o,name,m,parent)
def curve(name,points,r,m,parent):
    d=bpy.data.curves.new(name,'CURVE');d.dimensions='3D';d.resolution_u=4;d.bevel_depth=r;d.bevel_resolution=1
    sp=d.splines.new('BEZIER');sp.bezier_points.add(len(points)-1)
    for pt,p in zip(sp.bezier_points,points):pt.co=co(p);pt.handle_left_type='AUTO';pt.handle_right_type='AUTO'
    o=bpy.data.objects.new(name,d);bpy.context.collection.objects.link(o);o.parent=parent;o.data.materials.append(m)
    bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False);return o

plush=empty('ChopperPlush');assets['chopper']=plush
ellipsoid('seated bean body',(0,.15,0),(.10,.14,.078),fur,plush)
ellipsoid('belly patch',(0,.15,.065),(.065,.09,.022),face,plush)
for sign in [-1,1]:
    ellipsoid('soft seated foot',(sign*.073,.045,.052),(.058,.044,.077),fur,plush)
    ellipsoid('hoof',(sign*.073,.04,.103),(.043,.03,.026),dark,plush)
    ellipsoid('floppy arm',(sign*.105,.17,.012),(.04,.085,.045),fur,plush)
    ellipsoid('ear',(sign*.135,.32,-.004),(.055,.04,.022),fur,plush)
    ellipsoid('ear felt',(sign*.148,.322,.013),(.027,.023,.009),pink,plush)
ellipsoid('large plush head',(0,.315,.008),(.144,.13,.108),face,plush)
ellipsoid('muzzle',(0,.282,.102),(.074,.044,.022),ivory,plush)
for sign in [-1,1]:
    ellipsoid('embroidered eye',(sign*.049,.327,.106),(.021,.025,.009),dark,plush)
    ellipsoid('eye glint',(sign*.049-.006,.337,.115),(.006,.007,.003),ivory,plush)
    ellipsoid('cheek',(sign*.091,.29,.089),(.018,.011,.004),pink,plush)
ellipsoid('blue button nose',(0,.304,.125),(.014,.01,.009),blue,plush)
curve('smile',[(-.027,.278,.124),(0,.266,.126),(.027,.278,.124)],.002,dark,plush)
# Soft cylindrical hat with real volume and a crossed stitched emblem.
ellipsoid('hat crown',(0,.437,-.003),(.151,.106,.118),pink,plush)
ellipsoid('hat brim',(0,.381,.008),(.185,.021,.148),pink,plush)
for sign in [-1,1]:rod('hat cross',(-.033,.43-sign*.033,.108),(.033,.43+sign*.033,.108),.011,ivory,plush)
for sign in [-1,1]:
    x=sign*.16
    curve('antler main',[(x,.406,-.025),(x+sign*.027,.48,-.025),(x+sign*.023,.555,-.02)],.015,fur,plush)
    rod('antler branch',(x+sign*.026,.492,-.023),(x+sign*.079,.526,-.023),.012,fur,plush)
    rod('antler tip',(x+sign*.079,.526,-.023),(x+sign*.078,.556,-.023),.01,fur,plush)
for i in range(14):
    angle=i*math.pi/13;ellipsoid('brim stitch',(.174*math.cos(angle),.385,.137*math.sin(angle)),(.003,.003,.003),ivory,plush)
for i in range(7):cube('belly seam',(.004 if i%2 else -.004,.08+i*.021,.087),(.008,.002,.002),fur,plush,0)

crt=empty('VoyagerCRT');assets['crt']=crt
cube('rear shell',(0,0,-.025),(.7,.55,.43),navy,crt,.045)
cube('front fascia',(0,.005,.22),(.7,.55,.10),navy,crt,.035)
# Screen recess is bounded by four individual bevelled rails so the emissive display stays visible.
for name,p,s in [('top',(-.04,.25,.285),(.60,.035,.055)),('bottom',(-.04,-.165,.285),(.60,.035,.055)),('left',(-.328,.04,.285),(.035,.42,.055)),('right',(.248,.04,.285),(.035,.42,.055))]:cube('bezel '+name,p,s,trim,crt,.009)
cube('screen backing',(-.04,.04,.283),(.54,.385,.018),dark,crt,.025)
for i in range(9):cube('speaker slot',(.278,-.187+i*.013,.277),(.063,.004,.006),dark,crt,.001)
for x in [-.13,-.04]:rod('control knob',(x,-.232,.265),(x,-.232,.291),.02,trim,crt)
cube('power button',(-.26,-.232,.279),(.035,.025,.016),trim,crt,.005)
for x in [-.22,.22]:cube('rubber foot',(x,-.292,-.02),(.08,.04,.23),dark,crt,.005)
for i in range(9):cube('side ventilation',(.351,-.04+i*.018,-.06),(.003,.006,.20),dark,crt,0)
for x in [-.27,.27]:
    for y in [-.19,.19]:rod('case screw',(x,y,-.242),(x,y,-.247),.007,metal,crt)
cube('brand plaque',(-.035,-.2,.276),(.13,.021,.004),trim,crt,.001)
for i in range(7):cube('brand lettering',(-.085+i*.016,-.2,.28),(.006,.009,.001),navy,crt,0)

# Articulated low-poly hand. Named finger pivots are driven by the interaction timeline.
hand=empty('RightHand');assets['hand']=hand
ellipsoid('palm',(0,0,.073),(.048,.027,.065),skin,hand)
cube('sleeve cuff',(0,-.005,.16),(.09,.065,.055),navy,hand,.012)
cube('forearm',(0,-.014,.275),(.083,.07,.21),navy,hand,.018)
for i in range(4):
    x=-.034+i*.022;root=empty('Finger_'+str(i),(x,0,.023),hand)
    ellipsoid('finger proximal',(0,0,-.022),(.01,.011,.029),skin,root)
    tip=empty('FingerTip_'+str(i),(0,0,-.044),root)
    ellipsoid('finger distal',(0,0,-.018),(.009,.01,.024),skin,tip)
    ellipsoid('fingernail',(0,.009,-.028),(.006,.002,.009),nail,tip)
thumb=empty('Thumb',(.042,-.004,.077),hand)
ellipsoid('thumb',(0,0,-.027),(.014,.014,.035),skin,thumb)
ellipsoid('thumb nail',(.001,.012,-.044),(.008,.002,.011),nail,thumb)

manifest={}
for name,root in assets.items():
    bpy.ops.object.select_all(action='DESELECT');root.select_set(True)
    children=list(root.children_recursive)
    for o in children:o.select_set(True)
    bpy.context.view_layer.objects.active=root
    bpy.ops.export_scene.gltf(filepath=str(OUT/(name+'.glb')),export_format='GLB',use_selection=True,export_yup=True,export_animations=False)
    manifest[name]={'objects':len(children),'vertices':sum(len(o.data.vertices) for o in children if o.type=='MESH'),'file':name+'.glb'}
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'tools/atlas-assets/hero-assets.blend'))
(OUT/'model-stats.json').write_text(json.dumps(manifest,indent=2))
print('ASSET_EXPORT_COMPLETE',json.dumps(manifest))
