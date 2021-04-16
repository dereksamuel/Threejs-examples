class Line extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div id="render"></div>
    `;
    return template;
  }

  rendererWebGL() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    this.shadowRoot.getElementById("render").appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    camera.position.z = 100;// el ojo
    scene.add(camera);

    this.drawLine(scene);
    this.drawLineTwo(scene);
    renderer.render(scene, camera);
  }

  drawLine(scene) {
    // const a = new THREE.Vector2( 0, 8 );
    // //no arguments; will be initialised to (0, 0)
    // const b = new THREE.Vector2( );
    // const d = a.distanceTo( b );

    const geometry = new THREE.BufferGeometry();
    let vertices = new Float32Array( [
      0, 0,
      -1.0, 1.0,
      1.0, 1.0,
    ] );// igual a un array pero 32bites
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 2) );

    const materialPoint = new THREE.PointsMaterial({ color: 0xF00ddd, });
    const point = new THREE.Points(geometry, materialPoint);
    scene.add(point);
  }

  drawLineTwo(scene) {
    let x;
    let y;
    let z;
    const geometry = new THREE.BufferGeometry();
    let vertices = new Float32Array( [
      2, 7, 0,
      7, 2, 0,
      12, 7, 0,
      12, 17, 0,
      7, 12, 0,
      2, 17, 0,
      2, 7, 0,
      0, 0
    ] );// igual a un array pero 32bites

    for (let index = 0; index < vertices.length; index++) {
      x = vertices[index][0];
      y = vertices[index][1];
      z = vertices[index][2];
      const vector = new THREE.Vector3(x, y, z);
      vertices.set([vector.x, vector.y, vector.z], 20);
    }

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );

    const materialPoint = new THREE.LineBasicMaterial({ color: 0xF00ddd, });
    const point = new THREE.Line(geometry, materialPoint);

    scene.add(point);
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.rendererWebGL();
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("my-line", Line);
