import * as THREE from "three";

class threeScene extends HTMLElement {
  /**
   * Constructor
   */
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

</style>
<canvas class="webgl"></canvas>`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.host = this.shadowRoot.host; // use of host might be unnecessary
    this.canvas = this.shadowRoot.querySelector("canvas.webgl");

    this.init();
    console.log("calling this.tick");
    this.tick();
  }

  /**
   * Web component logic
   */
  static get observedAttributes() {
    return ["color"];
  }
  // Sync attributes with properties
  get color() {
    return this.getAttribute("color");
  }
  set color(newColor) {
    this.setAttribute("color", newColor);
  }

  // handle value changes
  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log("attributeChangedCallback", attrName, oldVal, newVal);
  }

  init() {
    /**
     * Sizes
     */
    const sizes = {
      width: 800,
      height: 600,
    };

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    this.camera.position.z = 3;

    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.setSize(sizes.width, sizes.height, false);
    this.renderer.render(this.scene, this.camera);
  }

  tick() {
    console.log("tick");
    // TODO - figure out how to get this to work
    if (this) {
      // Render
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(this.tick);
    }
  }
}

customElements.define("three-scene", threeScene);
