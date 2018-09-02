import HyperHTMLElement from 'hyperhtml-element';
import style from './CardPreview.css';

export class CardPreview extends HyperHTMLElement {
  static get observedAttributes() {
    return ['name', 'cover', 'price'];
  }

  name: string | null = null;
  cover: string | null = null;
  price: string | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name') this.name = newValue;
    if (name === 'cover') this.cover = newValue;
    if (name === 'price') this.price = newValue;

    this.render();
  }

  render() {
    if (!this.name || !this.cover || !this.price) {
      return this.html`<div>"name", "cover" and "price" are required.</div>`;
    }

    return this.html`
      <style>${style}</style>

      <div class="card">
        <div class="details">
          <img src=${this.cover} class="cover" alt="Cover" />
          <h3 class="name">${this.name}</h3>
          <div class="info">
            <span class="price">$${this.price}</span>
          </div>
        </div>
      </div>
    `;
  }
}

CardPreview.define('ygo-card-preview');
