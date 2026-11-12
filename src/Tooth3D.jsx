import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Molar crown: squircle cross-section, flattened top with four cusps and cross-shaped fissures,
// tapering into a cervical neck below.
function crownGeometry() {
  const g = new THREE.SphereGeometry(1, 180, 140);
  const p = g.attributes.position;
  const cusps = [[.48, .38, 1], [-.48, .38, .9], [.5, -.38, .95], [-.46, -.4, .85]];
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const r = Math.hypot(x, z);
    if (r > 1e-6) { const k = 1 / Math.pow((x / r) ** 4 + (z / r) ** 4, .25); x *= k; z *= k; }
    x *= 1.08; z *= .96;
    if (y > 0) {
      y *= .64;
      const w = Math.max(0, (y / .64 - .25) / .75);
      const bump = cusps.reduce((s, [cx, cz, h]) => s + h * Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / .1), 0);
      const fissure = Math.exp(-(z * z) / .008) * Math.exp(-(x * x) / .45) + Math.exp(-(x * x) / .008) * Math.exp(-(z * z) / .35);
      y += w * (.34 * bump - .14 * fissure);
    } else {
      const taper = 1 - .2 * y * y;
      x *= taper; z *= taper; y *= .95;
    }
    p.setXYZ(i, x, y, z);
  }
  g.computeVertexNormals();
  return g;
}

// Root: lathe profile, flattened front-to-back and bent so the tip curves outward.
function rootGeometry(len, rad, bend) {
  const pts = [];
  for (let i = 0; i <= 32; i++) { const t = i / 32; pts.push(new THREE.Vector2(rad * Math.pow(1 - t, .5) * (1 - .12 * t) + .001, -len * t)); }
  const g = new THREE.LatheGeometry(pts, 64);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const t = -p.getY(i) / len; p.setX(i, p.getX(i) * .85 + bend * t * t); p.setZ(i, p.getZ(i) * 1.1); }
  g.computeVertexNormals();
  return g;
}

// u runs around the ring. The visible stroke ends at the head (u = time*speed + phase) and fades out
// along a tail whose length breathes, so the line looks like it is being drawn and erased.
const swooshVertex = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`;
const swooshFragment = `uniform float uTime, uSpeed, uPhase; uniform vec3 uA, uB; varying vec2 vUv;
void main(){
  float a = fract(vUv.x - uTime*uSpeed - uPhase + 1.);
  float len = .5 + .3*sin(uTime*.8 + uPhase*6.283);
  float s = clamp((a - (1. - len)) / len, 0., 1.);
  float hw = .5 * (.15 + .85 * s);              // band tapers toward the tail
  float edge = 1. - smoothstep(hw * .55, hw, abs(vUv.y - .5));
  float shine = .75 + .25 * (1. - abs(vUv.y - .5) * 2.); // brighter centre line
  gl_FragColor = vec4(mix(uA, uB, s * s) * shine + .12 * s, pow(s, 1.2) * edge * .92);
  #include <colorspace_fragment>
}`;

function sparkleTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const rad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  rad.addColorStop(0, 'rgba(255,255,255,1)'); rad.addColorStop(.18, 'rgba(160,235,255,.9)'); rad.addColorStop(.5, 'rgba(58,168,232,.25)'); rad.addColorStop(1, 'rgba(58,168,232,0)');
  g.fillStyle = rad; g.fillRect(0, 0, 128, 128);
  g.fillStyle = 'rgba(255,255,255,.95)';
  g.beginPath(); g.moveTo(64, 0); g.lineTo(67, 61); g.lineTo(128, 64); g.lineTo(67, 67); g.lineTo(64, 128); g.lineTo(61, 67); g.lineTo(0, 64); g.lineTo(61, 61); g.closePath(); g.fill();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function Tooth3D() {
  const mount = useRef(null);

  useEffect(() => {
    const el = mount.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, el.clientWidth / el.clientHeight, .1, 100);
    camera.position.set(0, .8, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    scene.environment = envTex;

    const enamel = new THREE.MeshPhysicalMaterial({ color: 0xfffcf4, roughness: .16, clearcoat: 1, clearcoatRoughness: .06, ior: 1.6, sheen: .7, sheenRoughness: .4, sheenColor: new THREE.Color(0xf6e7c8) });
    const rootMat = new THREE.MeshPhysicalMaterial({ color: 0xf6ecd8, roughness: .35, clearcoat: .4, sheen: .5, sheenColor: new THREE.Color(0xecd9b4) });

    const tooth = new THREE.Group();
    const crownGeo = crownGeometry();
    tooth.add(new THREE.Mesh(crownGeo, enamel));
    const roots = [
      { geo: rootGeometry(1.75, .42, -.28), pos: [-.42, -.4, .08], rot: [0, 0, 0] },
      { geo: rootGeometry(1.6, .4, .2), pos: [.42, -.4, .08], rot: [0, 0, 0] },
      { geo: rootGeometry(1.5, .32, 0), pos: [0, -.4, -.3], rot: [-.22, 0, 0] },
    ];
    roots.forEach(({ geo, pos, rot }) => { const m = new THREE.Mesh(geo, rootMat); m.position.set(...pos); m.rotation.set(...rot); tooth.add(m); });
    const baseY = .62;
    tooth.position.y = baseY;
    tooth.scale.setScalar(1.08);
    scene.add(tooth);

    // Protection swooshes: flat ribbons around the tooth neck, each drawn as a moving green→blue stroke with a sparkle at its tip.
    const ringGeo = new THREE.CylinderGeometry(1, 1, 1, 260, 1, true); // open band; u runs around it
    const sparkTex = sparkleTexture();
    const swooshes = [
      { r: 1.7, h: .16, y: .05, tilt: [.2, 0, .12], speed: .16, phase: 0 },
      { r: 1.9, h: .13, y: .2, tilt: [-.14, 0, -.16], speed: .12, phase: .35 },
      { r: 2.1, h: .1, y: .32, tilt: [.1, 0, .26], speed: .09, phase: .7 },
    ].map(({ r, h, y, tilt, speed, phase }) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uSpeed: { value: speed }, uPhase: { value: phase }, uA: { value: new THREE.Color(0x0fb38a) }, uB: { value: new THREE.Color(0x2f9be6) } },
        vertexShader: swooshVertex, fragmentShader: swooshFragment, transparent: true, depthWrite: false, side: THREE.DoubleSide,
      });
      const group = new THREE.Group();
      group.rotation.set(...tilt);
      group.position.y = y;
      const ribbon = new THREE.Mesh(ringGeo, mat);
      ribbon.scale.set(r, h, r);
      const spark = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false }));
      spark.scale.setScalar(.45);
      group.add(ribbon, spark);
      scene.add(group);
      return { mat, spark, r, speed, phase };
    });

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8c9a8, 1));
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 4, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fe3d6, 1.8); rim.position.set(-4, 2, -3); scene.add(rim);

    const controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(controls, { enableZoom: false, enablePan: false, enableDamping: true, dampingFactor: .06, autoRotate: !reduceMotion, autoRotateSpeed: 1.4, minPolarAngle: Math.PI * .25, maxPolarAngle: Math.PI * .72 });

    const clock = new THREE.Clock();
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!reduceMotion) tooth.position.y = baseY + Math.sin(t * 1.2) * .06;
      const time = reduceMotion ? 2 : t;
      swooshes.forEach(s => {
        s.mat.uniforms.uTime.value = time;
        const a = ((time * s.speed + s.phase) % 1) * Math.PI * 2; // stroke head, matches shader
        s.spark.position.set(Math.sin(a) * s.r, 0, Math.cos(a) * s.r); // CylinderGeometry: x=sin, z=cos
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); controls.dispose();
      [crownGeo, ringGeo, ...roots.map(r => r.geo)].forEach(g => g.dispose());
      [enamel, rootMat, ...swooshes.flatMap(s => [s.mat, s.spark.material])].forEach(m => m.dispose());
      sparkTex.dispose();
      envTex.dispose(); pmrem.dispose(); renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="tooth-mount" ref={mount} role="img" aria-label="3D tooth with protective rings. Drag to rotate." />;
}
