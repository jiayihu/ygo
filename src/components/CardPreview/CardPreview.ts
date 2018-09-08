import HyperHTMLElement from 'hyperhtml-element';
import style from './CardPreview.css';

export interface CardSelectionEvent extends CustomEvent {
  detail: { name: string };
}

export class CardPreview extends HyperHTMLElement {
  static get observedAttributes() {
    return ['name', 'cover', 'price', 'rarity'];
  }

  name?: string;
  cover?: string;
  price?: string;
  rarity?: string;

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

  handleCardClick() {
    const dispatchedEvent: CardSelectionEvent = new CustomEvent('cardSelection', {
      detail: { name: this.name! },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(dispatchedEvent);
  }

  render() {
    if (!this.name || !this.cover || !this.price) {
      return this.html`<div>"name", "cover" and "price" are required.</div>`;
    }

    const nameSize = this.name.length > 32 ? '0.875rem' : '1rem';

    return this.html`
      <style>${style}</style>

      <div class="preview">
        <div class="details">
          <img
            src=${this.cover}
            class="cover"
            alt="Cover"
            crossorigin="anonymous"
            onclick=${this.handleCardClick}
          />
          <h3 class="name" style=${{ fontSize: nameSize }} onclick=${this.handleCardClick}>
            ${this.name}
          </h3>
          <div class="info">
            <span class="price">$${this.price}</span>
            <small>(${this.rarity})</small>
          </div>
        </div>
      </div>
    `;
  }
}

CardPreview.define('ygo-card-preview');
