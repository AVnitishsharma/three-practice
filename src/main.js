import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//size of canvas
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// sence
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000,
);

//mesh (actor)

const texture = new THREE.TextureLoader().load("/src/texture.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

const top = new THREE.Mesh(
  new THREE.TorusGeometry(0.8, 0.04, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0xc0c0c0 }),
);
top.rotation.x = Math.PI / 2;
top.position.y = 1.84;

const topbottom = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 1, 0.3, 32),
  new THREE.MeshStandardMaterial({ color: 0xe70708 }),
);

topbottom.position.y = 1.65;

const body = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 3, 32),
  new THREE.MeshStandardMaterial({ map: texture }),
);

const base = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 0.9, 0.18, 32),
  new THREE.MeshStandardMaterial({ color: 0xc0c0c0 }),
);

base.position.y = -1.59;

const group = new THREE.Group();

group.add(base);
group.add(topbottom);
group.add(body);
group.add(top);

scene.add(group);
const objects = [base, topbottom, body, top];

camera.position.z = 5;

//canver(parda)
const canvas = document.querySelector("canvas");

//render
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth; //canvas width
  sizes.height = window.innerHeight; //canvas height
  camera.aspect = sizes.width / sizes.height; //camera aspect
  camera.updateProjectionMatrix(); //camera update
  renderer.setSize(sizes.width, sizes.height); //renderer size
});

//light
const light = new THREE.AmbientLight(0xffffff, 7); //point light
light.position.set(0, 2, 5); //light position
scene.add(light);

//background
scene.background = new THREE.Color(0x1f5fa0);

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//event
let intersects;
let isRotating = true;

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(objects);

  // Hovered object ka scale bada
  if (intersects.length > 0) {
    group.scale.set(1.2, 1.2, 1.2);
    isRotating = false;
  } else {
    group.scale.set(1, 1, 1);
    isRotating = true;
  }
});

//time
const clock = new THREE.Clock(); //time

//animate
const animate = () => {
  const delta = clock.getDelta();

  if (isRotating) {
    group.rotation.y += delta * 0.9;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
