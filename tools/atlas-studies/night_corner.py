"""Standalone night refinement; loads the approved study, never website assets."""
import bpy, math, pathlib, random
from mathutils import Vector
OUT = pathlib.Path(__file__).resolve().parent
bpy.ops.wm.open_mainfile(filepath=str(OUT/'realistic-tv-corner.blend'))
random.seed(23)
scene = bpy.context.scene
scene.cycles.samples = 128
scene.render.resolution_x = 1800
scene.render.resolution_y = 1350
scene.view_settings.exposure = -.45
bg = next(n for n in scene.world.node_tree.nodes if n.type == 'BACKGROUND')
bg.inputs[1].default_value = .025
for name, power in [('Cool window',20),('Warm practical',5),('Soft room fill',8),('Amber lamp shade',2)]:
    bpy.data.objects[name].data.energy = power

def material(name,color,rough=.5,metal=0):
    m=bpy.data.materials.new(name);m.use_nodes=True
    b=m.node_tree.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value=(*color,1)
    b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal
    return m

def curve(name,pts,r,mat):
    c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=r;c.bevel_resolution=2
    s=c.splines.new('POLY');s.points.add(len(pts)-1)
    for p,v in zip(s.points,pts):p.co=(*v,1)
    o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);c.materials.append(mat)
    return o

# Refine the molded casing: restrained microtexture, satin highlights and seams.
for name in ['navy shell','aged ivory plastic']:
    m=bpy.data.materials[name];ns=m.node_tree.nodes;links=m.node_tree.links;b=next(n for n in ns if n.type=='BSDF_PRINCIPLED')
    b.inputs['Roughness'].default_value=.28;b.inputs['Coat Weight'].default_value=.18
    noise=ns.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=260
    bump=ns.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.18;bump.inputs['Distance'].default_value=.00015
    links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs[0],b.inputs['Normal'])
rubber=material('Graphite gasket',(.008,.01,.015),.72)
metal=material('Nickel control markings',(.32,.37,.4),.3,.8)
for name in ['control knob','control knob.001']:
    o=bpy.data.objects[name];p=o.matrix_world.translation;radius=o.dimensions.x*.49
    for j in range(32):
        a=j*math.tau/32
        curve('Knob fluting',[(p.x+radius*math.cos(a),p.y-.011,p.z+radius*math.sin(a)),(p.x+radius*math.cos(a),p.y+.006,p.z+radius*math.sin(a))],.0007,rubber)
    curve('Knob indicator',[(p.x,p.y-.021,p.z+radius*.4),(p.x,p.y-.021,p.z+radius*.8)],.001,metal)

# A real convex surface, with a cool phosphor raster instead of a flat white card.
old=bpy.data.objects['screen backing'];old.hide_render=True
verts=[];faces=[];nx=96;nz=72
for j in range(nz+1):
    v=j/nz*2-1
    for i in range(nx+1):
        u=i/nx*2-1
        verts.append((-.08+u*.267,-.260-.023*(1-u*u)*(1-v*v),1.07+v*.189))
for j in range(nz):
    for i in range(nx):
        k=j*(nx+1)+i;faces.append((k,k+1,k+nx+2,k+nx+1))
mesh=bpy.data.meshes.new('Curved CRT phosphor mesh');mesh.from_pydata(verts,[],faces);mesh.update()
screen=bpy.data.objects.new('Curved illuminated CRT glass',mesh);scene.collection.objects.link(screen)
for p in mesh.polygons:p.use_smooth=True
m=material('Cool blue phosphor under glass',(.08,.22,.34),.16,.12)
ns=m.node_tree.nodes;lk=m.node_tree.links;b=ns.get('Principled BSDF');b.inputs['Coat Weight'].default_value=.8
coord=ns.new('ShaderNodeTexCoord');wave=ns.new('ShaderNodeTexWave');wave.bands_direction='Z';wave.inputs['Scale'].default_value=155;wave.inputs['Distortion'].default_value=.1
lk.new(coord.outputs['Generated'],wave.inputs['Vector'])
ramp=ns.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].color=(.06,.19,.32,1);ramp.color_ramp.elements[1].color=(.23,.48,.67,1)
lk.new(wave.outputs['Color'],ramp.inputs[0]);lk.new(ramp.outputs[0],b.inputs['Emission Color']);b.inputs['Emission Strength'].default_value=3.2
screen.data.materials.append(m)
for name,loc,power,size,target in [('CRT forward spill',(-.08,-.30,1.07),26,.48,(-.08,-1.3,.8)),('CRT soft nearby bounce',(-.03,-.58,1.09),9,.52,(.69,-.03,.99))]:
    d=bpy.data.lights.new(name,'AREA');d.energy=power;d.color=(.34,.65,1);d.shape='RECTANGLE';d.size=size;d.size_y=.35
    o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()

# Short geometric pile follows mesh normals. Color stays tied to each fabric panel.
fabric_names={'warm woven fur','honey felt','faded rose felt','cream stitching'}
sources=[o for o in bpy.data.objects if o.type=='MESH' and o.data.materials and o.data.materials[0].name in fabric_names and not any(x in o.name for x in ['stitch','cross','glint','seam'])]
for o in sources:
    m=o.data.materials[0];b=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');b.inputs['Sheen Weight'].default_value=.65
    mesh=o.data;mesh.calc_loop_triangles();tris=list(mesh.loop_triangles)
    if not tris:continue
    c=bpy.data.curves.new(o.name+' fabric pile','CURVE');c.dimensions='3D';c.bevel_depth=.00019;c.bevel_resolution=0;c.resolution_u=1
    count=6500 if o.name in ['large plush head','hat crown','seated bean body'] else 1600
    weights=[t.area for t in tris]
    normal_matrix=o.matrix_world.to_3x3().inverted().transposed()
    for t in random.choices(tris,weights=weights,k=count):
        a,bv,cv=[mesh.vertices[k] for k in t.vertices];r=math.sqrt(random.random());s=random.random();weights2=(1-r,r*(1-s),r*s)
        p=o.matrix_world @ (a.co*weights2[0]+bv.co*weights2[1]+cv.co*weights2[2])
        n=(normal_matrix @ (a.normal*weights2[0]+bv.normal*weights2[1]+cv.normal*weights2[2])).normalized()
        length=random.uniform(.001,.0032)
        tip=p+n*length+Vector((random.uniform(-.0006,.0006),0,-.0004))
        sp=c.splines.new('POLY');sp.points.add(1);sp.points[0].co=(*p,1);sp.points[1].co=(*tip,1);sp.points[1].radius=.3
    pile=bpy.data.objects.new(o.name+' soft pile',c);scene.collection.objects.link(pile);c.materials.append(m)

# Separate eyes from cloth and remove painted-on white glints; lights make reflections.
eye=material('Polished black safety eyes',(.004,.006,.008),.12)
eye.node_tree.nodes.get('Principled BSDF').inputs['Coat Weight'].default_value=.65
for o in bpy.data.objects:
    if o.name.startswith('embroidered eye'):
        o.data.materials.clear();o.data.materials.append(eye)
    if o.name.startswith('eye glint'):o.hide_render=True
thread=material('Rose seam thread',(.24,.075,.105),.95)
for j in range(74):
    a=j*math.tau/74
    curve('Hat brim lockstitch',[(.69+.17*math.cos(a),-.038+.135*math.sin(a),1.116),(.69+.164*math.cos(a+.008),-.038+.129*math.sin(a+.008),1.116)],.00065,thread)
scene.render.filepath=str(OUT/'night-tv-corner.png')
bpy.context.preferences.filepaths.save_version=0
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'night-tv-corner.blend'))
bpy.ops.render.render(write_still=True)
