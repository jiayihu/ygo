import template from './CardDetails.html';
import style from './CardDetails.css';
import { getCard } from '../../services/cards';
import { getCardImage, getCardColor } from '../../domain/cards';
import { YGOCard, YGOCardType } from '../../domain/types';
import { darken } from 'polished';

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
    return ['name'];
  }

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

  connectedCallback() {
    if (!this.shadowRoot) return;

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
      if (!this.shadowRoot) return;

      const cardEl: HTMLElement | null = this.shadowRoot.querySelector('.card');

      if (cardEl) cardEl.style.backgroundColor = getCardColor(card);

      this.renderCard(card);
    });
  }

  private renderCard(card: YGOCard) {
    if (!this.shadowRoot) return;

    /**
     * Render common data
     */

    const coverEl: HTMLImageElement | null = this.shadowRoot.querySelector('.cover');
    const nameEl: HTMLElement | null = this.shadowRoot.querySelector('.name');
    const textEl: HTMLElement | null = this.shadowRoot.querySelector('.text');

    if (!coverEl || !nameEl || !textEl) return;

    coverEl.style.backgroundColor = darken(0.2, getCardColor(card));
    coverEl.src = getCardImage(card.name);
    nameEl.textContent = card.name;
    textEl.textContent = card.text;

    /**
     * Render cardType specific data
     */

    const { cardType } = card;

    if (cardType === YGOCardType.monster) this.renderMonster(card);
    else throw new Error(`Unknown card type ${card.cardType}`);
  }

  private renderMonster(card: YGOCard) {
    if (!this.shadowRoot) return;

    const familyEl: HTMLImageElement | null = this.shadowRoot.querySelector('.family');
    const typeEl: HTMLElement | null = this.shadowRoot.querySelector('.type');
    const levelEl: HTMLElement | null = this.shadowRoot.querySelector('.level');
    const atkEl: HTMLElement | null = this.shadowRoot.querySelector('.atk');
    const defEl: HTMLElement | null = this.shadowRoot.querySelector('.def');

    if (!familyEl || !typeEl || !levelEl || !atkEl || !defEl) return;

    familyEl.src = `assets/family/${card.family.toUpperCase()}.png`;
    typeEl.textContent = card.type;
    levelEl.textContent = String(card.level);
    atkEl.textContent = String(card.atk);
    defEl.textContent = String(card.def);
  }
}

customElements.define('ygo-card-details', CardDetails);
