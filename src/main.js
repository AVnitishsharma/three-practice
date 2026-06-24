import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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
camera.position.set(0, 1, 9);

//mesh (actor)

const gltfLoader = new GLTFLoader();
let mixer;
let animations = [];

gltfLoader.load("./mobal.glb", (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0, -2, 0);

  mixer = new THREE.AnimationMixer(model);
  animations = gltf.animations;
  console.log(animations);
})

document.querySelector(".dance").addEventListener("click", dance);
document.querySelector(".deth").addEventListener("click", deth);
document.querySelector(".punch").addEventListener("click", punch);
document.querySelector(".jump").addEventListener("click", jump);
document.querySelector(".thumbsUp").addEventListener("click", thumbsUp);
function dance() {
   if (!mixer || animations.length === 0) return;

  const action = mixer.clipAction(
    animations[0]
  );

  action.reset();
  action.setLoop(THREE.LoopOnce); // LoopOnce
  action.play();
};

function deth() {
  if (!mixer || animations.length === 0) return;
  const action = mixer.clipAction(
    animations[1]
  );
  action.reset();
  action.setLoop(THREE.LoopOnce); // LoopOnce
  action.play();
};

function punch() {
  if (!mixer || animations.length === 0) return;
  const action = mixer.clipAction(
    animations[5]
  );
  action.reset();
  action.setLoop(THREE.LoopOnce); // LoopOnce
  action.play();
};

function jump() {
  if (!mixer || animations.length === 0) return;
  const action = mixer.clipAction(
    animations[3]
  );
  action.reset();
  action.setLoop(THREE.LoopOnce); // LoopOnce
  action.play();
};

function thumbsUp() {
  if (!mixer || animations.length === 0) return;
  const action = mixer.clipAction(
    animations[9]
  );
  action.reset();
  action.setLoop(THREE.LoopOnce); // LoopOnce
  action.play();
};

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
const light = new THREE.AmbientLight(0xffffff, 3); //point light
light.position.set(0, 2, 5); //light position
scene.add(light);

//background
scene.background = new THREE.Color(0x000000);

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//event
let intersects;
let isRotating = true;

// window.addEventListener("mousemove", (e) => {
//   mouse.x = (e.clientX / sizes.width) * 2 - 1;
//   mouse.y = -(e.clientY / sizes.height) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);
//   intersects = raycaster.intersectObjects(objects);

 
// });

//time
const clock = new THREE.Clock(); //time

//animate
const animate = () => {
  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
