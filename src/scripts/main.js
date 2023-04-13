import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height, 
  0.1, 
  100
);
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
const controls = new OrbitControls(camera, canvas);
const tl = gsap.timeline({defaults: {duration: 1}});



const diceGeo = new THREE.DodecahedronGeometry(4, 0);
const diceMat = new THREE.MeshBasicMaterial({color: "steelblue"});
const diceMesh = new THREE.Mesh(diceGeo, diceMat);

controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
camera.position.z = 20;
scene.add(ambient);
scene.add(camera);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

tl.fromTo("h1", {y: "-100%"}, {y: "20%"});

const addDice = () => {
	diceMesh.position.set(0, 0, 0);
	scene.add(diceMesh);
	tl.fromTo(diceMesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
};

const loop = () => {
	controls.update();
  renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
});

addDice();
loop();