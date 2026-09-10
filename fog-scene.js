import * as THREE from 'three';

export function initFogScene(stage) {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)').matches;
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, mobile ? 1.5 : 1.75));
  renderer.setClearColor(0x061c26, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-label','عمودان أسودان بإضاءة دافئة وضباب متحرك يخرج من الفوهات العلوية');
  canvas.setAttribute('role','img');
  stage.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38,1,.05,50);
  const target = new THREE.Vector3(0,1.35,0);
  let yaw=.42, pitch=1.34, distance=5.4;
  function updateCamera(){
    camera.position.set(distance*Math.sin(pitch)*Math.sin(yaw),1.35+distance*Math.cos(pitch),distance*Math.sin(pitch)*Math.cos(yaw));
    camera.lookAt(target);
  }
  updateCamera();
  scene.add(new THREE.HemisphereLight(0xd6f5ff,0x243b42,2.7));
  const key = new THREE.DirectionalLight(0xe4f7ff,4.5); key.position.set(3,5,3);scene.add(key);
  const rim = new THREE.DirectionalLight(0x66cfd9,4);rim.position.set(-3,3,-2);scene.add(rim);
  const warm = new THREE.PointLight(0xffc789,6,6,2);warm.position.set(.4,.8,1.2);scene.add(warm);

  const metal = new THREE.MeshStandardMaterial({color:0x26343b,metalness:.72,roughness:.32});
  const dark = new THREE.MeshStandardMaterial({color:0x0a141b,metalness:.6,roughness:.48});
  const chrome = new THREE.MeshStandardMaterial({color:0xb7d1d6,metalness:.87,roughness:.2});
  const brass = new THREE.MeshStandardMaterial({color:0xb69961,metalness:.75,roughness:.3});
  const lamp = new THREE.MeshStandardMaterial({color:0xffdeb0,emissive:0xffb85b,emissiveIntensity:3.4,roughness:.35});
  const world = new THREE.Group();scene.add(world);
  const emitters=[];
  const yAxis=new THREE.Vector3(0,1,0);
  function mesh(geometry,material,parent,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;}
  function rod(start,end,radius,material,parent){const delta=end.clone().sub(start);const m=mesh(new THREE.CylinderGeometry(radius,radius,delta.length(),12),material,parent);m.position.copy(start).add(end).multiplyScalar(.5);m.quaternion.setFromUnitVectors(yAxis,delta.normalize());return m;}

  // Product-inspired concept: powder-coated square columns, metal nozzles and inset LED strips.
  function column(x,z,scale,lit){
    const group=new THREE.Group();world.add(group);group.position.set(x,0,z);group.scale.setScalar(scale);
    mesh(new THREE.BoxGeometry(.34,.07,.34),dark,group,0,.035,0);
    mesh(new THREE.BoxGeometry(.18,2.27,.18),metal,group,0,1.2,0);
    mesh(new THREE.BoxGeometry(.205,.04,.205),chrome,group,0,2.34,0);
    mesh(new THREE.BoxGeometry(.19,.035,.19),dark,group,0,2.375,0);
    for(const sx of [-1,1])for(const sz of [-1,1])mesh(new THREE.CylinderGeometry(.015,.015,.009,8),chrome,group,sx*.125,.074,sz*.125);
    if(lit){
      for(let face=0;face<4;face++){
        const panel=new THREE.Group();panel.rotation.y=face*Math.PI/2;group.add(panel);
        mesh(new THREE.BoxGeometry(.084,1.64,.004),dark,panel,0,1.18,.092);
        mesh(new THREE.BoxGeometry(.022,1.55,.004),lamp,panel,0,1.18,.096);
        // Recessed diagonal slats create a physical perforated cover over the light.
        for(let j=0;j<11;j++){
          const slat=mesh(new THREE.BoxGeometry(.085,.014,.009),metal,panel,0,.43+j*.146,.103);
          slat.rotation.z=(j%2?1:-1)*.58;
        }
      }
    }
    for(let level=0;level<2;level++)for(let j=0;j<3;j++){
      const angle=j*Math.PI*2/3+level*Math.PI/3;
      const direction=new THREE.Vector3(Math.cos(angle),.14,Math.sin(angle)).normalize();
      const origin=new THREE.Vector3(0,2.13+level*.16,0);
      const end=origin.clone().addScaledVector(direction,.31);
      rod(origin,end,.013,chrome,group);
      const tip=end.clone().addScaledVector(direction,.024);
      rod(end,tip,.021,brass,group);
      rod(tip,tip.clone().addScaledVector(direction,.013),.008,dark,group);
      emitters.push({origin:tip.clone().addScaledVector(direction,.014).multiplyScalar(scale).add(group.position),direction});
    }
  }
  column(.35,.12,1,true);column(-.62,-.36,.79,false);
  const base=mesh(new THREE.CylinderGeometry(1.34,1.41,.08,80),new THREE.MeshStandardMaterial({color:0x142d38,metalness:.42,roughness:.55}),world,0,-.045,0);
  const ring=mesh(new THREE.TorusGeometry(1.33,.007,8,80),new THREE.MeshBasicMaterial({color:0x64b0b5,transparent:true,opacity:.38}),world,0,.001,0);ring.rotation.x=Math.PI/2;
  const floor=mesh(new THREE.CircleGeometry(1.3,80),new THREE.MeshStandardMaterial({color:0x183c47,metalness:.25,roughness:.64}),world,0,0,0);floor.rotation.x=-Math.PI/2;

  // GPU-based expanding jets: particles originate at each actual nozzle, then disperse and fade.
  const count=mobile?2100:4200;
  const origins=new Float32Array(count*3),directions=new Float32Array(count*3),seeds=new Float32Array(count*4);
  for(let i=0;i<count;i++){
    const emitter=emitters[i%emitters.length];emitter.origin.toArray(origins,i*3);emitter.direction.toArray(directions,i*3);
    for(let j=0;j<4;j++)seeds[i*4+j]=Math.random();
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.BufferAttribute(origins,3));
  geometry.setAttribute('aDirection',new THREE.BufferAttribute(directions,3));
  geometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,4));
  const mistMaterial=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0},uStrength:{value:1},uPixelRatio:{value:renderer.getPixelRatio()}},
    vertexShader:`
      attribute vec3 aDirection; attribute vec4 aSeed;
      uniform float uTime; uniform float uStrength; uniform float uPixelRatio;
      varying float vAlpha; varying float vSeed;
      void main(){
        float age=fract(aSeed.x + uTime/(2.8+aSeed.y*1.8));
        float travel=age*(1.0+aSeed.y*.8);
        vec3 side=normalize(cross(aDirection,vec3(0.,1.,0.)));
        vec3 up=normalize(cross(side,aDirection));
        float angle=aSeed.z*6.283185;
        float spread=pow(age,1.1)*(.08+aSeed.w*.34);
        vec3 p=position+aDirection*travel;
        p+=side*(cos(angle)*spread+sin(age*8.+aSeed.z*12.)*age*.055);
        p+=up*sin(angle)*spread;
        p.y+=age*age*.24;
        vec4 mv=modelViewMatrix*vec4(p,1.);
        gl_Position=projectionMatrix*mv;
        float size=.015+age*(.18+aSeed.w*.17);
        gl_PointSize=clamp(size*460.*uPixelRatio/max(.1,-mv.z),1.,100.);
        vAlpha=smoothstep(0.,.05,age)*pow(1.-age,1.3)*(.12+aSeed.w*.08)*uStrength;
        vSeed=aSeed.z;
      }`,
    fragmentShader:`
      varying float vAlpha; varying float vSeed;
      void main(){
        vec2 uv=gl_PointCoord*2.-1.;
        float r=dot(uv,uv);if(r>1.)discard;
        float soft=exp(-r*4.)*(1.-smoothstep(.65,1.,r));
        gl_FragColor=vec4(mix(vec3(.68,.85,.9),vec3(.91,.98,1.),vSeed),soft*vAlpha);
      }`,transparent:true,depthWrite:false,depthTest:true,blending:THREE.NormalBlending
  });
  const mist=new THREE.Points(geometry,mistMaterial);mist.frustumCulled=false;world.add(mist);
  let mistOn=true,lightsOn=true,moving=!reducedMotion.matches,visible=true,lost=false;
  let animation=0,last=0,elapsed=3.1,dragging=false,lastX=0,lastY=0;
  const ui={mist:document.getElementById('mistToggle'),light:document.getElementById('lightToggle'),motion:document.getElementById('motionToggle')};
  function refreshUI(){
    for(const [button,state,label] of [[ui.mist,mistOn,'يعمل'],[ui.light,lightsOn,'تعمل'],[ui.motion,moving,'تعمل']]){
      button.setAttribute('aria-pressed',String(state));button.querySelector('span').textContent=state?label:(button===ui.mist?'متوقف':'متوقفة');
    }
  }
  function draw(){
    if(lost)return;
    updateCamera();
    mistMaterial.uniforms.uTime.value=elapsed;
    mistMaterial.uniforms.uStrength.value=mistOn?1:0;
    lamp.emissiveIntensity=lightsOn?3.4:0;lamp.color.set(lightsOn?0xffdeb0:0x25353c);warm.intensity=lightsOn?6:0;
    renderer.render(scene,camera);
  }
  function tick(now){
    animation=0;
    if(!visible||document.hidden||!moving||lost){last=0;return;}
    if(now-last>1000/30){elapsed+=last?Math.min((now-last)/1000,.08):0;last=now;draw();}
    animation=requestAnimationFrame(tick);
  }
  function sync(){cancelAnimationFrame(animation);animation=0;last=0;draw();if(moving&&visible&&!document.hidden&&!lost)animation=requestAnimationFrame(tick);}
  function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
  const viewObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.03});viewObserver.observe(stage);
  document.addEventListener('visibilitychange',sync);
  reducedMotion.addEventListener('change',()=>{moving=!reducedMotion.matches;refreshUI();sync();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;cancelAnimationFrame(animation);document.getElementById('fogFallback').hidden=false;document.getElementById('fogLoadStatus').textContent='العرض ثلاثي الأبعاد متوقف مؤقتًا. يمكنك متابعة صور المنتجات.';canvas.hidden=true;document.getElementById('fogControls').hidden=true;});
  canvas.addEventListener('webglcontextrestored',()=>{lost=false;canvas.hidden=false;document.getElementById('fogFallback').hidden=true;document.getElementById('fogControls').hidden=false;sync();});
  ui.mist.addEventListener('click',()=>{mistOn=!mistOn;refreshUI();sync();});
  ui.light.addEventListener('click',()=>{lightsOn=!lightsOn;refreshUI();sync();});
  ui.motion.addEventListener('click',()=>{moving=!moving;refreshUI();sync();});
  document.getElementById('rotateLeft').addEventListener('click',()=>{yaw-=.3;sync();});
  document.getElementById('rotateRight').addEventListener('click',()=>{yaw+=.3;sync();});
  document.getElementById('zoomIn').addEventListener('click',()=>{distance=Math.max(3.8,distance-.4);sync();});
  document.getElementById('zoomOut').addEventListener('click',()=>{distance=Math.min(7.4,distance+.4);sync();});
  document.getElementById('resetView').addEventListener('click',()=>{yaw=.42;pitch=1.34;distance=5.4;sync();});
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;dragging=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!dragging)return;yaw-=(event.clientX-lastX)*.008;pitch=THREE.MathUtils.clamp(pitch+(event.clientY-lastY)*.003,1.08,1.65);lastX=event.clientX;lastY=event.clientY;sync();});
  const endDrag=()=>{dragging=false;};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
  refreshUI();resize();draw();
  document.getElementById('fogFallback').hidden=true;
  document.getElementById('fogControls').hidden=false;
  document.getElementById('fogHint').hidden=false;
  sync();
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(animation);},{once:true});
  window.addEventListener('pageshow',sync);
  return {scene,renderer,camera};
}
