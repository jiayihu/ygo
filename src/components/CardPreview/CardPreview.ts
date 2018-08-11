import template from './CardPreview.html';
import style from './CardPreview.css';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

enum Attribute {
  name = 'name',
  cover = 'cover'
}

class CardPreview extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'cover'];
  }

  coverEl: HTMLImageElement | null = null;
  nameEl: HTMLHeadingElement | null = null;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    this.coverEl = this.shadowRoot.querySelector('.cover');
    this.nameEl = this.shadowRoot.querySelector('.name');

    const name = this.getAttribute('name');
    const cover = this.getAttribute('cover');

    if (this.nameEl && name) {
      this.nameEl.textContent = name;
    }

    if (this.coverEl && cover) {
      this.coverEl.src = cover;
    }
  }

  attributeChangedCallback(attr: Attribute, oldValue: string, newValue: string) {
    if (attr === 'name' && this.nameEl) {
      this.nameEl.textContent = newValue;
    }

    if (attr === 'cover' && this.coverEl) {
      this.coverEl.textContent = newValue;
    }
  }
}

customElements.define('ygo-card-preview', CardPreview);
