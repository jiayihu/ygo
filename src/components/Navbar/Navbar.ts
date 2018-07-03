import template from './Navbar.html';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class Navbar extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('ygo-navbar', Navbar);
