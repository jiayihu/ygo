import template from './CardDetails.html';
import style from './CardDetails.css';
import { getCard } from '../../services/cards';
import { getCardImage, getCardColor, isMonster } from '../../domain/cards';
import { YGOCard } from '../../domain/types';
import { darken } from 'polished';
import { emptyEl } from '../../utils';
import { MonsterCard } from '../MonsterCard/MonsterCard';
import { SpellTrapCard } from '../SpellTrapCard/SpellTrapCard';

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

    const coverEl = this.shadowRoot.querySelector<HTMLImageElement>('.cover')!;

    coverEl.style.backgroundColor = darken(0.2, getCardColor(card));
    coverEl.src = getCardImage(card.name);

    /**
     * Render cardType specific data
     */

    const detailsEl = this.shadowRoot.querySelector<HTMLElement>('.details')!;
    const cardTypeEl = isMonster(card) ? new MonsterCard() : new SpellTrapCard();
    cardTypeEl.card = card;

    emptyEl(detailsEl);
    detailsEl.appendChild(cardTypeEl);
  }
}

customElements.define('ygo-card-details', CardDetails);
