// Xanadu quantum chip: drag to rotate; the panel edits material and light settings.
import * as THREE from 'three';
import GUI from 'lil-gui';
import bumpUrl from '../assets/sketches/xanadu-map.png?url';

// three.js r155+ uses physical light units; scale to match the original r125 look
const LIGHT_SCALE = Math.PI;

export default function xanadu(el: HTMLElement) {
  const canvas = document.createElement('canvas');
  el.append(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd2d6d6);
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
  camera.position.z = 5;

  const ambient = new THREE.AmbientLight(0xffffff, 0.35 * LIGHT_SCALE);
  const sun = new THREE.DirectionalLight(0xffffff, 1 * LIGHT_SCALE);
  sun.position.set(0, 1.5, 0.3);
  scene.add(ambient, sun, sun.target);

  const front = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    bumpMap: new THREE.TextureLoader().load(bumpUrl),
    bumpScale: 12,
    roughness: 0.8,
    metalness: 0.2,
  });
  const back = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.8, metalness: 0.2 });
  const chip = new THREE.Mesh(new THREE.BoxGeometry(1.99, 0.1, 4.97), [
    back,
    back,
    front,
    back,
    back,
    back,
  ]);
  chip.rotation.x = Math.PI / 2;
  scene.add(chip);

  const axes = new THREE.AxesHelper();
  (axes.material as THREE.Material).depthTest = false;
  axes.renderOrder = 1;
  chip.add(axes);
  const sunHelper = new THREE.DirectionalLightHelper(sun);
  sun.add(sunHelper); // child of the light, as in the original scene
  const updateLight = () => {
    sun.target.updateMatrixWorld();
    sunHelper.update();
  };
  updateLight();

  // GUI shows the original (pre-r155) intensity values
  const gui = new GUI({ container: el });
  const color = (target: { color: THREE.Color }, name: string) => {
    const proxy = { value: `#${target.color.getHexString()}` };
    gui
      .addColor(proxy, 'value')
      .name(name)
      .onChange((v: string) => target.color.set(v));
  };
  const intensity = (light: THREE.Light) => {
    const proxy = { intensity: light.intensity / LIGHT_SCALE };
    gui
      .add(proxy, 'intensity', 0, 2, 0.01)
      .onChange((v: number) => (light.intensity = v * LIGHT_SCALE));
  };
  color(back, 'Chip Color Back');
  color(front, 'Chip Color Front');
  color(ambient, 'Ambient Color');
  intensity(ambient);
  color(sun, 'Directional Color');
  intensity(sun);
  for (const [name, vector] of [
    ['position', sun.position],
    ['target', sun.target.position],
  ] as const) {
    const folder = gui.addFolder(name);
    folder.add(vector, 'x', -10, 10).onChange(updateLight);
    folder.add(vector, 'y', 0, 10).onChange(updateLight);
    folder.add(vector, 'z', -10, 10).onChange(updateLight);
  }

  let targetRotation = 0;
  let dragStart: { x: number; rotation: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    dragStart = { x: e.clientX, rotation: targetRotation };
  });
  canvas.addEventListener('pointermove', (e) => {
    if (dragStart) targetRotation = dragStart.rotation + (e.clientX - dragStart.x) * -0.02;
  });
  canvas.addEventListener('pointerup', () => (dragStart = null));

  new ResizeObserver(() => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }).observe(canvas);

  renderer.setAnimationLoop(() => {
    chip.rotation.z += (targetRotation - chip.rotation.z) * 0.05;
    renderer.render(scene, camera);
  });
}
