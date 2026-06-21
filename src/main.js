import "./style.css";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// sence
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//mesh (actor)

const texture = new THREE.TextureLoader().load('/src/texture.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const top = new THREE.Mesh(
  new THREE.TorusGeometry( 0.8, 0.04, 16, 100 ),
  new THREE.MeshBasicMaterial({ color: 0xc0c0c0 })
);
top.rotation.x = Math.PI / 2;
top.position.y = 1.84;

const topbottom = new THREE.Mesh(
  new THREE.CylinderGeometry(0.8, 1, 0.3, 32),
  new THREE.MeshBasicMaterial( { color: 0xE70708 } )
);

topbottom.position.y = 1.65;

const body = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 3, 32),
  new THREE.MeshBasicMaterial({ map: texture })
);

const base = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 0.9, 0.18, 32),
  new THREE.MeshBasicMaterial({ color: 0xc0c0c0 })
);

base.position.y = -1.59;

scene.add(base);
scene.add(topbottom);
scene.add(body);
scene.add(top);

camera.position.z = 5;

//canver(parda)
const canvas = document.querySelector("canvas");

//render
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


//animate
const animate = () => {
  body.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();