import bpy, math, pathlib, random
from mathutils import Vector
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'tools/atlas-studies';random.seed(12)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.samples=64;scene.cycles.use_denoising=True
scene.render.resolution_x=1600;scene.render.resolution_y=1200;scene.render.resolution_percentage=100
scene.world.color=(.06,.06,.06)
scene.world.use_nodes=True
next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.13,.19,.28,1)
next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.22

def mat(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(name);m.use_nodes=True;b=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');b.inputs['Base Color'].default_value=(*color,1);b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal;return m

def relief(m,scale,strength,distance):
 n=m.node_tree.nodes;l=m.node_tree.links;b=next(n for n in n if n.type=='BSDF_PRINCIPLED');noise=n.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=scale;noise.inputs['Detail'].default_value=3;bump=n.new('ShaderNodeBump');bump.inputs['Strength'].default_value=strength;bump.inputs['Distance'].default_value=distance;l.new(noise.outputs['Fac'],bump.inputs['Height']);l.new(bump.outputs[0],b.inputs['Normal'])
wood=mat('Oiled walnut',(.15,.065,.027),.39)
n=wood.node_tree.nodes;l=wood.node_tree.links;b=next(n for n in n if n.type=='BSDF_PRINCIPLED');tex=n.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(ROOT/'tools/atlas-assets/sources/wood_planks.jpg'));tex.projection='BOX';tex.projection_blend=.2;coord=n.new('ShaderNodeTexCoord');l.new(coord.outputs['Generated'],tex.inputs['Vector']);mix=n.new('ShaderNodeMixRGB');mix.blend_type='MULTIPLY';mix.inputs[0].default_value=.65;mix.inputs[2].default_value=(.48,.26,.12,1);l.new(tex.outputs['Color'],mix.inputs[1]);l.new(mix.outputs[0],b.inputs['Base Color']);relief(wood,70,.17,.001)
wall=mat('Mineral teal paint',(.065,.105,.105),.94);relief(wall,95,.3,.002)
plastic=mat('Warm ivory ABS',(.55,.53,.44),.34);relief(plastic,190,.15,.00035)
navy=mat('Blue injection moulded ABS',(.018,.035,.065),.4);relief(navy,180,.12,.0003)
black=mat('Rubber and recess',(.009,.012,.016),.72)
brass=mat('Brushed aged brass',(.35,.22,.085),.33,.72)
paper=mat('Uncoated paper',(.62,.56,.41),.9)
rose=mat('Dusty red button',(.27,.035,.045),.38)

def cube(name,loc,size,m,bevel=.008):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(m)
 if bevel:
  mod=o.modifiers.new('Rounded joinery','BEVEL');mod.width=bevel;mod.segments=4
  mod=o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
 return o

def rod(name,a,b,r,m):
 a,b=Vector(a),Vector(b);bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=r,depth=(b-a).length,location=(a+b)/2);o=bpy.context.object;o.name=name;o.rotation_euler=(b-a).to_track_quat('Z','Y').to_euler();o.data.materials.append(m)
 for p in o.data.polygons:p.use_smooth=True
 return o

def cord(name,points,r=.004):
 c=bpy.data.curves.new(name,'CURVE');c.dimensions='3D';c.bevel_depth=r;c.bevel_resolution=4;s=c.splines.new('BEZIER');s.bezier_points.add(len(points)-1)
 for bp,p in zip(s.bezier_points,points):bp.co=p;bp.handle_left_type=bp.handle_right_type='AUTO'
 o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);o.data.materials.append(black)

def text(name,body,loc,size,m):
 c=bpy.data.curves.new(name,'FONT');c.body=body;c.size=size;c.extrude=.0002;c.align_x='CENTER';o=bpy.data.objects.new(name,c);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(math.pi/2,0,0);c.materials.append(m);return o

# Full-scale cabinet with separate doors, inset panels, brass pulls and visible joinery.
cube('Back wall',(0,.48,1.6),(5,.12,3.2),wall)
cube('Left return',(-2.0,-.8,1.6),(.12,2.5,3.2),wall)
for i in range(19):
 cube('Oak floorboard',(-2.15+i*.235,-1.0,-.025),(.23,4.2,.05),wood,.002)
cube('Skirting',(0,.395,.09),(4,.045,.16),wood,.005)
cube('Cabinet top',(0,0,.68),(1.95,.72,.065),wood,.014)
cube('Cabinet lower shelf',(0,.015,.19),(1.83,.61,.035),wood,.006)
for x in [-.88,.88]:
 for y in [-.24,.24]:cube('Tapered solid timber foot',(x,y,.135),(.075,.075,.26),wood,.01)
for x in [-.92,-.31,.31,.92]:cube('Cabinet upright',(x,.015,.44),(.035,.61,.46),wood,.004)
cube('Cabinet backing',(0,.3,.44),(1.84,.025,.46),wood,.003)
for x in [-.61,.61]:
 cube('Inset framed door',(x,-.307,.435),(.56,.035,.42),wood,.009)
 cube('Door centre recessed panel',(x,-.329,.435),(.46,.012,.32),wood,.004)
 for dx in [-.06,.06]:rod('Handle standoff',(x+dx,-.34,.50),(x+dx,-.37,.50),.007,brass)
 rod('Brass cabinet pull',(x-.06,-.37,.50),(x+.06,-.37,.50),.007,brass)
# A few books in the open bay.
for i,col in enumerate([navy,paper,rose]):
 cube('Book cover',(-.02,-.06,.235+i*.045),(.47,.38,.035),col,.002)
 cube('Page block',(-.02,-.075,.236+i*.045),(.44,.36,.023),paper,.001)
# Existing character and CRT keep the portfolio's personal identity.
for asset,position in [('crt',(-.04,.035,1.03)),('chopper',(.69,-.03,.714))]:
 before=set(bpy.data.objects);bpy.ops.import_scene.gltf(filepath=str(ROOT/f'public/atlas/walk-preview/assets/{asset}.glb'));added=set(bpy.data.objects)-before
 for o in added:
  if o.parent is None:o.location+=Vector(position)
  if o.type=='MESH':
   for poly in o.data.polygons:poly.use_smooth=True
   if asset=='chopper':
    for m in o.data.materials:
     bs=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
     if bs:bs.inputs['Roughness'].default_value=.94;bs.inputs['Sheen Weight'].default_value=.35
     if not m.get('study_fabric'):relief(m,230,.4,.0007);m['study_fabric']=True
   if 'screen backing' in o.name:
    glass=mat('Dark convex CRT glass',(.006,.014,.018),.13,.2);bs=next(n for n in glass.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Coat Weight'].default_value=.65;o.data.materials.clear();o.data.materials.append(glass)
   if asset=='crt':
    for m in o.data.materials:
     bs=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
     if bs and 'plastic' in m.name:bs.inputs['Roughness'].default_value=.34
# Fictional console, visibly manufactured edges and controls.
cube('Console lower seam',(-.66,-.03,.744),(.41,.29,.055),black,.018)
cube('Console body',(-.66,-.03,.778),(.42,.30,.065),navy,.018)
cube('Cartridge recess',(-.66,.005,.814),(.22,.075,.008),black,.006)
cube('Project cartridge',(-.66,.005,.87),(.16,.025,.13),plastic,.008)
cube('Cartridge label',(-.66,-.009,.872),(.12,.001,.081),paper,.002)
text('Cartridge print','Q / 01',(-.66,-.011,.87),.019,navy)
for i in range(10):cube('Console ventilation',(-.83+i*.009,.06,.812),(.004,.095,.002),black,.001)
rod('Console power',(-.8,-.182,.78),(-.8,-.19,.78),.009,brass)
text('Console branding','VOYAGER',(-.63,-.183,.768),.012,paper)
cube('Controller',(-.65,-.27,.744),(.26,.13,.042),plastic,.022)
cube('D-pad horizontal',(-.71,-.27,.769),(.06,.018,.009),black,.003)
cube('D-pad vertical',(-.71,-.27,.769),(.018,.06,.009),black,.003)
for x,y in [(-.59,-.25),(-.56,-.28)]:rod('Action button',(x,y,.762),(x,y,.778),.011,rose)
cord('Controller cable',[(-.65,-.2,.74),(-.86,-.18,.72),(-.99,-.33,.53),(-1.01,-.35,.31),(-.87,-.06,.73),(-.75,.11,.77)])
# Framed graphic and a warm practical, kept sparse.
cube('Poster frame',(.64,.385,1.68),(.38,.035,.51),wood,.006)
cube('Poster paper',(.64,.362,1.68),(.34,.003,.47),paper,.001)
text('Poster title','WANTED',(.64,.357,1.82),.038,black)
text('Poster subtitle','THE NEXT ADVENTURE',(.64,.357,1.49),.014,black)
text('Poster symbol','Q',(.64,.355,1.61),.13,navy)
# Lamp to the left of the TV: ceramic base, linen shade.
ceramic=mat('Glazed olive ceramic',(.12,.16,.11),.22)
rod('Lamp base',(-1.28,.08,.05),(-1.28,.08,.13),.15,ceramic)
rod('Lamp stem',(-1.28,.08,.12),(-1.28,.08,1.28),.013,brass)
linen=mat('Linen lampshade',(.65,.53,.35),.9);relief(linen,170,.25,.001)
bpy.ops.mesh.primitive_cone_add(vertices=64,radius1=.24,radius2=.15,depth=.32,location=(-1.28,.08,1.43));bpy.context.object.name='Linen shade';bpy.context.object.data.materials.append(linen)
# Lighting: a broad cool window reflection and amber practical.
def light(name,loc,power,color,size,target):
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.color=color;d.shape='DISK';d.size=size;o=bpy.data.objects.new(name,d);scene.collection.objects.link(o);o.location=loc;o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
light('Cool window',(-2,-1.4,2.5),180,(.63,.77,1),2.2,(0,0,.8))
light('Warm practical',(-1.25,-.04,1.24),35,(1,.57,.25),.4,(0,0,.7))
light('Soft room fill',(1,-2,2.5),60,(.85,.91,1),2,(0,0,1))
light('Amber lamp shade',(-1.27,-.35,1.45),12,(1,.65,.33),.3,(-1.28,.08,1.43))
bpy.ops.object.camera_add(location=(2.35,-3.65,2.05));cam=bpy.context.object;cam.name='Corner study camera';cam.rotation_euler=(Vector((-.12,0,1.0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.lens=53;scene.camera=cam
cam.data.dof.use_dof=True;cam.data.dof.focus_distance=(Vector((0,0,1))-cam.location).length;cam.data.dof.aperture_fstop=7.1
scene.render.image_settings.file_format='PNG';scene.render.filepath=str(OUT/'realistic-tv-corner.png')
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'realistic-tv-corner.blend'))
bpy.ops.render.render(write_still=True)
