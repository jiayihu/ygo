import template from './MonsterCard.html';
import style from './MonsterCard.css';
import { YGOCard } from '../../domain/types';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export class MonsterCard extends HTMLElement {
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

    if (value) this.renderMonster(value);
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const card = this._card;

    if (card) this.renderMonster(card);
  }

  private renderMonster(card: YGOCard) {
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

    const attributeEl: HTMLImageElement | null = this.shadowRoot.querySelector('.attribute');
    const typeEl: HTMLElement | null = this.shadowRoot.querySelector('.type');
    const levelEl: HTMLElement | null = this.shadowRoot.querySelector('.level');
    const atkEl: HTMLElement | null = this.shadowRoot.querySelector('.atk');
    const defEl: HTMLElement | null = this.shadowRoot.querySelector('.def');

    if (!attributeEl || !typeEl || !levelEl || !atkEl || !defEl) return;

    attributeEl.src = `assets/attribute/${card.attribute.toLowerCase()}.png`;
    typeEl.textContent = card.type;
    levelEl.textContent = String(card.level);
    atkEl.textContent = String(card.atk);
    defEl.textContent = String(card.def);
  }
}

customElements.define('ygo-monster-card', MonsterCard);
