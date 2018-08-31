import template from './SpellTrapCard.html';
import style from './SpellTrapCard.css';
import { YGOCard } from '../../domain/types';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export class SpellTrapCard extends HTMLElement {
  private _card: YGOCard | null = null;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  get card(): YGOCard | null {
    return this._card;
  }
  set card(value: YGOCard | null) {
    this._card = value;

    if (value) this.renderSpellTrap(value);
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const card = this._card;

    if (card) this.renderSpellTrap(card);
  }

  private renderSpellTrap(card: YGOCard) {
    if (!this.shadowRoot) return;

    /**
     * Common card info
     */

    const nameEl: HTMLElement | null = this.shadowRoot.querySelector('.name');
    const textEl: HTMLElement | null = this.shadowRoot.querySelector('.text');

    if (!nameEl || !textEl) return;

    nameEl.textContent = card.name;
    textEl.textContent = card.text;

    /**
     * Specific card type info
     */

    const propertyEl: HTMLImageElement | null = this.shadowRoot.querySelector('.property');

    if (!propertyEl) return;

    propertyEl.src = `assets/property/${card.property.toLowerCase()}.png`;
    propertyEl.title = card.property;
  }
}

customElements.define('ygo-spelltrap-card', SpellTrapCard);
