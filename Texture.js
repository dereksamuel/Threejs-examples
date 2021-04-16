import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from '../../node_modules/three/examples/jsm/controls/FirstPersonControls.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let LineDk;
let mallaExtrusion;
const arrayExclude = [];
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const angulo = 45;
const aspect = 800 / innerHeight;
const near = 0.1;
const far = 100000;
let cube;

const camera = new THREE.PerspectiveCamera(angulo, aspect, near, far);
const controls = new OrbitControls( camera, renderer.domElement );

const texturePlane = new THREE.TextureLoader().load("./assets/images/lava.jpg");
const texturePlanes = new THREE.TextureLoader().load("./assets/images/lava.jpg");
const texturePlaneGeometric = new THREE.TextureLoader().load("./assets/images/lava.jpg");
const model3D = new GLTFLoader();
const abint = new THREE.AmbientLight(0x555500);
scene.add(abint);

model3D.load("assets/models/silla.glb", (gltf) => {
  const texturePlaneas = new THREE.TextureLoader().load("./assets/images/lava.jpg");
  texturePlaneas.wrapT = THREE.RepeatWrapping;
  texturePlaneas.wrapS = THREE.RepeatWrapping;
  texturePlaneas.repeat.set(4, 4);
  gltf.scene.traverse(node => {
    if (node.isMesh) {
      node.material.color = { r: 206, g: 138, b:2 };
    }
  });
  const groupHelemt = new THREE.Group();
  groupHelemt.scale.x = 4;
  groupHelemt.scale.y = 4;
  groupHelemt.scale.z = 4;
  groupHelemt.position.x = 200;
  groupHelemt.add(gltf.scene);
  scene.add(groupHelemt);
  renderer.render( scene, camera );
});

const controlsFirst = new FirstPersonControls(camera);
controlsFirst.lookSpeed = 0.1;
controlsFirst.movementSpeed = 100;
controlsFirst.lookVertical = false;
controlsFirst.activeLook = true;

scene.background = new THREE.Color(0x161616);
const windowRes = new THREExR.WindowResize(renderer, camera);
const keyboard = new THREEx.KeyboardState();

document.querySelector("#plane")?.addEventListener("click", () => {
  createPlane();
});

document.querySelector("#figure")?.addEventListener("click", () => {
  shapeFigureCreate();
});

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.y += ySpeed;
    } else if (keyCode == 83) {
        cube.position.y -= ySpeed;
    } else if (keyCode == 65) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 68) {
        cube.position.x += xSpeed;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
};

document.querySelector("#cube")?.addEventListener("click", () => {
  createCube();
});

document.querySelector("#cylinder")?.addEventListener("click", () => {
  createCylinder();
});

document.querySelector("#sphere")?.addEventListener("click", () => {
  createSphere();
});

function createPlane() {
  const geometryPlane = new THREE.PlaneGeometry(1000, 1000, 10, 10);

  texturePlanes.wrapT = THREE.RepeatWrapping;
  texturePlanes.wrapS = THREE.RepeatWrapping;
  texturePlanes.repeat.set(4, 4);
  
  const materialPlane = new THREE.MeshBasicMaterial({ map: texturePlanes, side: THREE.DoubleSide, });
  
  //TODO: Territorio
  const territorio = new THREE.Mesh(geometryPlane, materialPlane);
  territorio.rotation.y = -0.2;
  territorio.rotation.x = Math.PI / 1.8;
  scene.add(territorio);
  return territorio;
}

function animation() {
  requestAnimationFrame(animation);
  LineDk.rotation.y += 0.02;
  if (mallaExtrusion)
    mallaExtrusion.rotation.y += 0.02;
  renderer.render(scene, camera);
  let time = 0.001;
  const distance = 100;
  const allRecor = distance * time;
  // if (keyboard.pressed("up")) {
  //   camera.position.y += 1;
  // }
  // if (keyboard.pressed("down")) {
  //   camera.position.y -= 1;
  // }
  // if (keyboard.pressed("left")) {
  //   camera.position.x -= 1;
  // }
  // if (keyboard.pressed("right")) {
  //   camera.position.x += 1;
  // }
  if (cube) {
    // cube.rotation.x += Math.PI / 2;
    // cube.rotation.y += allRecor;
    // cube.rotation.z += allRecor;

    // cube.scale.x += allRecor * 0.5;
    // cube.scale.y += allRecor * 0.5;
    // cube.scale.z += allRecor * 0.5;
    if (keyboard.pressed("up")) {
      cube.rotation.x += allRecor;
      cube.position.y += 1;
      cube.position.z -= 1;
    }
    if (keyboard.pressed("down")) {
      cube.rotation.x += allRecor;
      cube.position.y -= 1;
      cube.position.z += 1;
    }
    if (keyboard.pressed("left")) {
      cube.rotation.y += allRecor;
      cube.position.x -= 1;
    }
    if (keyboard.pressed("right")) {
      cube.rotation.y += allRecor;
      cube.position.x += 1;
    }
    if (keyboard.pressed("a")) {
      cube.scale.x += allRecor;
    }
    if (keyboard.pressed("z")) {
      cube.scale.z += allRecor;
    }
    if (keyboard.pressed("y")) {
      cube.scale.y += allRecor;
    }
    controls.target.set(cube.position.x, cube.position.y, cube.position.z);
    controls.update();
  }
}

let clock = new THREE.Clock();

function loadModel(scene) {
  let delta = clock.getDelta();
  controlsFirst.update(delta);
  const geometry = new THREE.BufferGeometry();
  let vertices = new Float32Array( [
    2, 7, 0,
    7, 2, 0,
    12, 7, 0,
    12, 17, 0,
    7, 12, 0,
    2, 17, 0,
    2, 7, 0,
  ] );

  arrayExclude.concat(vertices);

  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );

  const materialLineDk = new THREE.LineBasicMaterial({ color: 0xF0Fdde, });
  LineDk = new THREE.Line(geometry, materialLineDk);

  scene.add(LineDk);
}

function shapeFigureCreate() {
  console.log(arrayExclude);
  const shapeGeometry = new THREE.Shape();
  texturePlane.wrapT = THREE.RepeatWrapping;
  texturePlane.wrapS = THREE.RepeatWrapping;
  texturePlane.repeat.set(10, 10);
  shapeGeometry.moveTo(15, 15);
  shapeGeometry.lineTo(0.5, 6);
  shapeGeometry.lineTo(-15, 15);

  shapeGeometry.lineTo(-14, 40);
  shapeGeometry.lineTo(0.7, 30);
  shapeGeometry.lineTo(15, 40);

  const dataExtrusion = {
    amount: 5,
    steps: 10,
    bevelEnabled: false,
    bevelThickness: 1,
    // bevelSize: 1,
    // bevelOffset: 0,
    // bevelSegments: 1
  };
  const extrude_geometry = new THREE.ExtrudeGeometry(shapeGeometry, dataExtrusion);
  const materialMalla = new THREE.MeshBasicMaterial( { color: 0xfff000, } );
  mallaExtrusion = new THREE.Mesh(extrude_geometry, materialMalla);
  mallaExtrusion.position.x = -50;
  mallaExtrusion.position.y = 25;

  scene.add(mallaExtrusion);
}

function createCube() {
  const geometryCube = new THREE.BoxGeometry(20, 20 , 20);
  const materialCube = new THREE.MeshBasicMaterial({ map: texturePlaneGeometric, wireframe: true, });
  cube = new THREE.Mesh(geometryCube, materialCube);
  cube.position.y = 15;
  cube.position.x = 50;

  scene.add(cube);
}

function createSphere() {
  const geometrySphere = new THREE.SphereGeometry(20, 20 , 20);
  const materialSphere = new THREE.MeshBasicMaterial({ color: 0xfffd, wireframe: true, });
  const Sphere = new THREE.Mesh(geometrySphere, materialSphere);
  Sphere.position.y = 15;
  Sphere.position.x = 150;

  scene.add(Sphere);
}


function createCylinder() {
  const geometryCylinder = new THREE.CylinderGeometry(10, 1, 20, 100, 100, false);
  const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xE05745, });
  const Cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
  Cylinder.position.y = 10;
  Cylinder.position.x = 80;

  scene.add(Cylinder);
}

class Texture extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.scene = null;
    this.renderer = null;
    this.camera = null;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div id="render"></div>
    `;
    return template;
  }

  rendererWebGL() {
    renderer.setSize(innerWidth - 120, innerHeight);
    this.shadowRoot.getElementById("render").appendChild(renderer.domElement);

    camera.position.z = 650;// el ojo
    camera.position.y = 0;// el ojo
    scene.add(camera);

    renderer.render(scene, camera);
    controls.update();
    windowRes.trigger();
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.rendererWebGL();
    loadModel(scene);
    animation();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-texture", Texture);
