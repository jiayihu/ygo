import HyperHTMLElement from 'hyperhtml-element';
import style from './MonsterCard.css';
import { YGOCard } from '../../domain/types';

export class MonsterCard extends HyperHTMLElement {
  data: YGOCard | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.data) this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const card = this.data;

    if (!card) return null;

    const attributeSrc = `/assets/attribute/${card.attribute.toLowerCase()}.png`;

    return this.html`
      <style>${style}</style>

      <div class="heading">
        <span>
          <span class="level">${card.level}</span>
          <img class="level-icon" src="/assets/star.png" alt="Level" />
        </span>
        <h3 class="name">${card.name}</h3>
        <span>
          <span class="type">${card.type}</span>
        </span>
      </div>

      <div class="cardtype-info">
        <span>
          <span class="info-name">ATK</span>
          <span class="atk">${card.atk}</span>
        </span>
        <span>
          <img
            src=${attributeSrc}
            title=${card.attribute}
            class="attribute"
            alt="Attribute"
            width="32"
            height="32"
          />
        </span>
        <span>
          <span class="info-name">DEF</span>
          <span class="def">${card.def}</span>
        </span>
      </div>

      <div class="text">${card.text}</div>
    `;
  }
}

MonsterCard.define('ygo-monster-card');
