import template from './CardDetails.html';
import style from './CardDetails.css';
import { getCard } from '../../services/cards';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

enum Attribute {
  name = 'name'
}

export class CardDetails extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'cover'];
  }

  private coverEl: HTMLImageElement | null = null;
  private nameEl: HTMLHeadingElement | null = null;

  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }

  get name(): string | null {
    return this.getAttribute('name');
  }
  set name(value: string | null) {
    value ? this.setAttribute('name', value) : this.removeAttribute('name');
  }

  connectedCallback() {
    this.coverEl = this.querySelector('.cover');
    this.nameEl = this.querySelector('.name');

    const name = this.getAttribute('name');

    if (name) this.updateCardDetails(name);
  }

  attributeChangedCallback(attr: Attribute, oldValue: string, newValue: string) {
    if (attr === 'name' && newValue) {
      this.updateCardDetails(newValue);
    }
  }

  private updateCardDetails(name: string) {
    getCard(name).then(card => {
      console.log(card);

      if (!this.nameEl || !this.coverEl) return;

      this.nameEl.textContent = card.name;
      this.coverEl.src = card.image_path;
    });
  }
}

customElements.define('ygo-card-details', CardDetails);
