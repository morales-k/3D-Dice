import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

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
lights[1] = new THREE.PointLight(0xffffff, 2, 100);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;

camera.position.z = 20;

lights[1].position.set(0, 0, 40);

// scene.add(allMesh);
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

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => mouseDown = true);
window.addEventListener("mouseup", () => mouseDown = false);

window.addEventListener("mousemove", (e) => {
	if (mouseDown) {
		rgb = [
			Math.round((e.pageX / sizes.width) * 255),
			Math.round((e.pageY / sizes.height) * 255),
			150
		];

		let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
		gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b});
	}
});

const sun = () => {
    const geometry = new THREE.SphereGeometry(3, 64, 64);
	const material = new THREE.MeshStandardMaterial({
		color: "#F2C230",
		roughness: 2,
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1});
};
sun();