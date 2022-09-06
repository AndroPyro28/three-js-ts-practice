import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"
import { GuiClass1 } from "./classes/gui";
import galaxyVibes from "/images/galaxyVibes.jpg";
import galaxyVibes2 from "/images/galaxyVibes2.jpg";
import { MOUSE, TextureLoader } from "three";
import nebula from "/images/nebula.png";

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0xFFFFFF, 0, 200)
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas')! as HTMLCanvasElement,
});

const textureLoader = new TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader().load([nebula,nebula,galaxyVibes,galaxyVibes,galaxyVibes,galaxyVibes])
scene.background = textureLoader.load(galaxyVibes)

renderer.shadowMap.enabled = true
renderer.setClearColor('lightblue')
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
camera.position.z = 30;

const toursGeometry = new THREE.TorusGeometry(10, 3, 10, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 'orange',
  wireframe:false
})
const torus = new THREE.Mesh(toursGeometry, torusMaterial)
torus.receiveShadow = true // you will receive a shadow
torus.castShadow = true 
scene.add(torus);

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

const gridHelper = new THREE.GridHelper(50, 20);
gridHelper.position.y = -10
scene.add(gridHelper)

const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({color:"white", side: THREE.DoubleSide, wireframe: false});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -10
plane.receiveShadow = true
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(4,10,10)
const sphereMaterial = new THREE.MeshStandardMaterial({color:'white',map:textureLoader.load(galaxyVibes2)});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-15, 10, 10)
sphere.castShadow = true 
scene.add(sphere);
 
const boxGeometry = new THREE.BoxGeometry(4,4,4);
const boxMaterial = new THREE.MeshStandardMaterial({
   map:textureLoader.load(nebula)
})

const arrBoxMaterial =[
  new THREE.MeshStandardMaterial({map:textureLoader.load(nebula)}),
  new THREE.MeshStandardMaterial({map:textureLoader.load(galaxyVibes)}),
  new THREE.MeshStandardMaterial({map:textureLoader.load(galaxyVibes2)}),
  new THREE.MeshStandardMaterial({map:textureLoader.load(nebula)}),
  new THREE.MeshStandardMaterial({map:textureLoader.load(galaxyVibes)}),
  new THREE.MeshStandardMaterial({map:textureLoader.load(galaxyVibes2)})
]
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.castShadow = true;
box.receiveShadow = true
scene.add(box)
// box.material.map = textureLoader.load(galaxyVibes2)
const gui = new dat.GUI();
const guiClass = new GuiClass1();

gui.add(guiClass, 'sphereColor').onChange(e => sphere.material.color.set(e));
gui.add(guiClass, 'wireframe').onChange(e => sphere.material.wireframe = e);
gui.add(guiClass, 'speed', 0, 0.1);
gui.add(guiClass, 'step');
gui.add(guiClass, 'angle', 0, 1);
gui.add(guiClass, 'penumbra', 0, 1);
gui.add(guiClass, 'intensity', 0, 1);

                                            /* Type of lights */

//directional light

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.castShadow = true // you emitting a shadow
// directionalLight.shadow.camera.bottom = -12;
// directionalLight.shadow.camera.top = 15;
// directionalLight.shadow.camera.right = 12;
// directionalLight.shadow.camera.left = -12; // x and y axis based

// scene.add(directionalLight);
// directionalLight.position.set(-50, 20, 30) // directional light

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 15);
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)

// spotlight

const spotLight = new THREE.SpotLight();
spotLight.position.set(-100, 100, 0)
spotLight.castShadow = true;
scene.add(spotLight)

const spotlightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotlightHelper);

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', (e:MouseEvent) => {
    mousePosition.x = (e.clientX);
    mousePosition.y = (e.clientY);
})
const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
const boxId = box.id;
const torusId = torus.id;

function animate (time: number) {
  // torus.rotation.x = time / 1000 ;
  // torus.rotation.y = time / 1000 ;
  // box.rotation.x = time / -1000 ;
  // box.rotation.y = time / -1000 ;
  // sphere.rotation.x = time / 500 ;
  // sphere.rotation.y = time / 500 ;
  

  guiClass.step += guiClass.speed;
  spotLight.angle = guiClass.angle
  spotLight.intensity = guiClass.intensity
  spotLight.penumbra = guiClass.penumbra
  spotlightHelper.update()

  sphere.position.y = -7 * Math.abs(Math.sin(guiClass.step));

  rayCaster.setFromCamera(mousePosition, camera)
  const intersects = rayCaster.intersectObjects(scene.children)

    for(let i = 0; i < intersects.length; i++) {
      if(intersects[i].object.id == sphereId) {
        sphere.material.color.set('white')
        console.log('sphere', sphereId)
        sphere.rotation.x = time / 500 ;
        sphere.rotation.y = time / 500 ;
        sphere.material
      }
      if(intersects[i].object.id == torusId) {
        torus.material.color.set('white')
        console.log('torus', torusId)
        torus.rotation.x = time / 500 ;
        torus.rotation.y = time / 500 ;
      }
      if(intersects[i].object.id == boxId) {
        box.material.color.set('white')
        console.log('box', boxId)
        box.rotation.x = time / 500 ;
        box.rotation.y = time / 500 ;
      }
  }
  
  renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate)
