import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

let LineDk;
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const controls = new OrbitControls( camera, renderer.domElement );

function loadModel(scene) {
  const geometry = new THREE.BufferGeometry();
  let vertices = new Float32Array( [
    2, 7, 0,
    7, 2, 0,
    12, 7, 0,
    12, 17, 0,
    7, 12, 0,
    2, 17, 0,
    2, 7, 0,

    2, 7, 3,
    7, 2, 3,
    12, 7, 3,
    12, 17, 3,
    7, 12, 3,
    2, 17, 3,
    2, 7, 3,

    -2, -7, 2,
    -7, -2, 2,
    -12, -7, 2,
    -12, -17, 2,
    -7, -12, 2,
    -2, -17, 2,
    -2, -7, 2,

    -2, -7, 0,
    -7, -2, 0,
    -12, -7, 0,
    -12, -17, 0,
    -7, -12, 0,
    -2, -17, 0,
    -2, -7, 0,
  ] );// igual a un array pero 32bites

  // for (let vertice of vertices) {
  //   const vector = new THREE.Vector3(vertice, vertice, vertice);
  //   vertices.set([
  //     vector.x, vector.y, vector.z,
  //   ], vertices.length / 1.75);
  // }

  geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );

  const materialLineDk = new THREE.LineBasicMaterial({ color: 0xF0Fdde, });
  LineDk = new THREE.Line(geometry, materialLineDk);

  scene.add(LineDk);
}

function animation() {
  requestAnimationFrame(animation);
  LineDk.rotation.y += 0.02;
  renderer.render(scene, camera);
}

class Line extends HTMLElement {
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
    renderer.setSize(800, 600);
    this.shadowRoot.getElementById("render").appendChild(renderer.domElement);

    camera.position.z = 100;// el ojo
    scene.add(camera);

    loadModel(scene);
    renderer.render(scene, camera);
    controls.update();
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.rendererWebGL();
    animation();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-model", Line);
