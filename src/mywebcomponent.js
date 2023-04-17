const template = document.createElement("template");
template.innerHTML = `
<style>
section {
  /* border: 1px solid red; */
  padding: 2rem;
  margin: 2rem;
}
:host {
  /* For the shadow root */
  display: block;
  background-color: lavender;
}
h2 {
  color: blue
}
</style>
<section class="section">
<h2 part="topper">My section</h2>
<slot name="description">Insert description here</slot>
</section>
`;

class MyWebComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);
  }

  // Define the allowed attributes
  static get observedAttributes() {
    return ["color", "section"];
  }

  // Sync attributes with properties
  get color() {
    console.log("get color");
    return this.getAttribute("color");
  }
  set color(newColor) {
    console.log("set color");
    this.setAttribute("color", newColor);
  }
  get section() {
    return this.getAttribute("section");
  }
  set section(newSection) {
    this.setAttribute("section", newSection);
  }

  // handle value changes
  attributeChangedCallback(attrName, oldVal, newVal) {
    const section = this.root.querySelector(".section");
    const h2 = section.querySelector("h2");
    if (attrName === "color") {
      h2.style.color = newVal;
    } else if (attrName === "section") {
      h2.textContent = newVal;
    }
  }
}

window.customElements.define("my-web-component", MyWebComponent);
