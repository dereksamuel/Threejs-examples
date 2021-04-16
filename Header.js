class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open", });

    this.upDown = false;
  }

  getTemplate() {
    const template = document.createElement("template");

    template.innerHTML = `
      <header class="Header">
        ${this.getStyles()}
        <nav>
          <a><h3>THREE . JS CODE</h3></a>
          <div class="flex">
            <a>Inicio</a>
            <a>Contacto</a>
            <div class="dropdown">
              <p>Figures ${this.upDown ? "🔺" : "🔻"}</p>
              <div>
                <slot></slot>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;

    return template;
  }

  getStyles() {
    return `
      <style>
        * {
          box-sizing: border-box;
        }
        :host {
          font-family: omniblack ,sans-serif;
        }
        .Header {
          padding: 1rem;
          background-color: #2f3a44;
        }
        .Header nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .flex {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .flex a {
          margin: 0 1rem;
          cursor: pointer;
        }
        .Header a {
          color: #b3ff3d;
        }
        ::slotted(a) {
          color: #b3ff3d;
          cursor: pointer;
          margin-top: 1rem !important;
        }
        .Header a h3 {
          color: #f5ff40;
        }
        .dropdown {
          position: relative;
        }
        .dropdown div {
          display: none;
          position: absolute;
          right: 10px;
          background-color: #2f3a44;
          border-radius: 20px;
          padding: 1rem;
          flex-direction: column;
        }
        .dropdown div a {
          margin-bottom: 1rem;
        }
        .dropdown p {
          color: #fff;
          font-weight: 100;
          margin: 0;
          cursor: pointer;
        }
      </style>
    `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    console.log(document.querySelector("the-header").shadowRoot);
  }

  addEvents() {
    const dropDown = this.shadowRoot.querySelector(".dropdown p");
    const divDropDown = this.shadowRoot.querySelector(".dropdown div");

    dropDown.addEventListener("click", () => {
      if (divDropDown.style.display) {
        divDropDown.style.display = "";
        this.upDown = true;
        return;
      }
      this.upDown = false;
      divDropDown.style.display = "flex";
    });
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }
}

customElements.define("the-header", Header);
