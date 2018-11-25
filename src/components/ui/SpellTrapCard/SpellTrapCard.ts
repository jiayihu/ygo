import HyperHTMLElement from 'hyperhtml-element';
import style from './SpellTrapCard.css';
import { YGOCard } from '../../../domain/types';

export class SpellTrapCard extends HyperHTMLElement {
  data: YGOCard | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const card = this.data;

    if (!card) return null;

    const propertySrc = `/assets/property/${card.property.toLowerCase()}.png`;

    return this.html`
      <style>${style}</style>

      <div class="heading">
        <h3 class="name">${card.name}</h3>
      </div>

      <div class="cardtype-info">
        <span>
          <img
            src=${propertySrc}
            title=${card.property}
            class="property"
            alt="Attribute"
            width="32"
            height="32"
          />
        </span>
      </div>

      <div class="text">${card.text}</div>
    `;
  }
}

SpellTrapCard.define('ygo-spelltrap-card');
