import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"
import { SphereClass1 } from "./classes/Sphere";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas')! as HTMLCanvasElement,
});
renderer.shadowMap.enabled = true

renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
camera.position.z = 30;

const toursGeometry = new THREE.TorusGeometry(10, 3, 10, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 'orange',
  wireframe:false
})
const torus = new THREE.Mesh(toursGeometry, torusMaterial)
// const boxGeometry = new THREE.BoxGeometry(5, 5, 5, 10);
// const boxMaterial = new THREE.MeshStandardMaterial({
//   color:'violet',
//   wireframe: false
// });

// const box = new THREE.Mesh(boxGeometry, boxMaterial);

// scene.add(box)
scene.add(torus);
 torus.receiveShadow = true // you will receive a shadow
torus.castShadow = true 


const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

const gridHelper = new THREE.GridHelper(50, 20);
scene.add(gridHelper)

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({color:"white", side: THREE.DoubleSide, wireframe: false});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;
plane.receiveShadow = true
// plane.castShadow = true
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(4,10,10)
const sphereMaterial = new THREE.MeshStandardMaterial({color:"yellow", wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-15, 10, 10)
sphere.castShadow = true 

scene.add(sphere);
// sphere.receiveShadow = true

const gui = new dat.GUI();

const sphereClass = new SphereClass1();

gui.add(sphereClass, 'sphereColor').onChange(e => sphere.material.color.set(e));
gui.add(sphereClass, 'wireframe').onChange(e => sphere.material.wireframe = e);
gui.add(sphereClass, 'speed', 0, 0.1);
gui.add(sphereClass, 'step');

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.castShadow = true // you emitting a shadow
directionalLight.shadow.camera.bottom = -12;
directionalLight.shadow.camera.top = 15;
directionalLight.shadow.camera.right = 12;
directionalLight.shadow.camera.left = -12; // x and y axis based

scene.add(directionalLight);
directionalLight.position.set(-50, 20, 30) // directional light


const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 15);
scene.add(dLightHelper)

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(dLightShadowHelper)

function animate (time: number) {
  torus.rotation.x = time / 1000 ;
  torus.rotation.y = time / 1000 ;

  // box.rotation.x -=  0.01;
  // box.rotation.y -=  0.01;
  sphereClass.step += sphereClass.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(sphereClass.step));
  renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)
