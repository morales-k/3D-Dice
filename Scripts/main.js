import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { PointLight } from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const scene = new THREE.Scene();
let lights = [];

const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height, 
  0.1, 
  100
);
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});

lights[0] = new THREE.AmbientLight(0xffffff, 0.5);
lights[1] = new THREE.PointLight(0xffffff, 2, 120);
lights[2] = new THREE.PointLight(0xffffff, 2, 120);
lights[3] = new THREE.PointLight(0xffffff, 2, 120);
lights[4] = new THREE.PointLight(0xffffff, 2, 120);
lights[5] = new THREE.PointLight(0xffffff, 2, 120);
lights[6] = new THREE.PointLight(0xffffff, 2, 120);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;

camera.position.z = 20;

// Front, back, top, bottom, left, right
lights[1].position.set(0, 0, 12);
lights[2].position.set(0, 0, -12);
lights[3].position.set(0, -6, 0);
lights[4].position.set(0, 6, 0);
lights[5].position.set(-6, 0, 0);
lights[6].position.set(6, 0, 0);

scene.add(camera);
scene.add(...lights);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
	controls.update();
    renderer.render(scene, camera);
	window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo("h1", {y: "-100%"}, {y: "20%"});

const sun = () => {
    const geometry = new THREE.SphereGeometry(3, 64, 64);
	const material = new THREE.MeshStandardMaterial({
		color: "#F2C230",
		roughness: 2,
	});
	const mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);
	scene.add(mesh);
	tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
};

sun();