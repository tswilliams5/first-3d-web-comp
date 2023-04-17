class threeScene extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
<style>
:host {
	display: block;
	margin: 0;
	height: 100%;
}

#c {
	width: 100%;
	height: 100%;
	display: block;
	border:0px solid red;
}
</style>
<canvas id="c"></canvas>`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.host = this.shadowRoot.host; // use of host might be unnecessary
    this.canvas = this.shadowRoot.querySelector("#c");

    this.init();
  }

  connectedCallback() {
    // fires with constructor is done.
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.host.offsetWidth / this.host.offsetWidth,
      0.1,
      100
    );
    console.log("camera:", this.host.offsetWidth, this.host.offsetHeight);

    this.camera.position.z = 5;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.render(this.scene, this.camera);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    // const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.renderer.setSize(width, height, false);
  }
}

customElements.define("three-scene", threeScene);
