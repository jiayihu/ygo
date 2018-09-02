import HyperHTMLElement from 'hyperhtml-element';
import style from './CardPreview.css';

export interface CardSelectionEvent extends CustomEvent {
  detail: { name: string };
}

export class CardPreview extends HyperHTMLElement {
  static get observedAttributes() {
    return ['name', 'cover', 'price'];
  }

  name?: string;
  cover?: string;
  price?: string;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  handleCardClick = () => {
    const dispatchedEvent: CardSelectionEvent = new CustomEvent('cardSelection', {
      detail: { name: this.name! },
      composed: true
    });
    this.dispatchEvent(dispatchedEvent);
  };

  render() {
    if (!this.name || !this.cover || !this.price) {
      return this.html`<div>"name", "cover" and "price" are required.</div>`;
    }

    return this.html`
      <style>${style}</style>

      <div class="card">
        <div class="details">
          <img src=${this.cover} class="cover" alt="Cover" onclick=${this.handleCardClick} />
          <h3 class="name" onclick=${this.handleCardClick}>${this.name}</h3>
          <div class="info">
            <span class="price">$${this.price}</span>
          </div>
        </div>
      </div>
    `;
  }
}

CardPreview.define('ygo-card-preview');
