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

export class CardPreview extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'cover'];
  }

  private coverEl: HTMLImageElement | null = null;
  private nameEl: HTMLHeadingElement | null = null;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  get name(): string | null {
    return this.getAttribute('name');
  }
  set name(value: string | null) {
    value ? this.setAttribute('name', value) : this.removeAttribute('name');
  }

  get cover(): string | null {
    return this.getAttribute('cover');
  }
  set cover(value: string | null) {
    if (value) this.setAttribute('cover', value);
    else throw new Error(`"cover" attribute is required for <ygo-card-preview>`);
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
