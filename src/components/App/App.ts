import { darken } from 'polished';

import template from './App.html';
import style from './App.css';
import { ExpensiveCards, CardSelectionEvent } from '../ExpensiveCards/ExpensiveCards';
import { EventHandler } from '../../domain/types';
import { CardDetails } from '../CardDetails/CardDetails';
import { getCard } from '../../services/cards';
import { getCardColor } from '../../domain/cards';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export class App extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  private sectionEl: HTMLElement | null = null;
  private expensiveCardsEl: ExpensiveCards | null = null;
  private cardDetailsEl: CardDetails | null = null;

  connectedCallback() {
    if (!this.shadowRoot) return;

    this.sectionEl = this.shadowRoot.querySelector('.app-section');
    this.expensiveCardsEl = this.shadowRoot.querySelector('ygo-expensive-cards');
    this.cardDetailsEl = this.shadowRoot.querySelector('ygo-card-details');

    if (this.expensiveCardsEl) {
      this.expensiveCardsEl.addEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }
  }

  disconnectedCallback() {
    if (this.expensiveCardsEl) {
      this.expensiveCardsEl.removeEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }
  }

  handleCardSelection = (event: CardSelectionEvent): void => {
    if (!event.detail.name) return;

    this.setActiveCard(event.detail.name);
  };

  private setActiveCard(cardName: string) {
    getCard(cardName).then(card => {
      if (!this.expensiveCardsEl || !this.cardDetailsEl || !this.sectionEl) {
        return;
      }

      this.expensiveCardsEl.classList.toggle('is-hidden');
      this.cardDetailsEl.classList.toggle('is-hidden');
      this.sectionEl.style.backgroundColor = darken(0.2, getCardColor(card));

      this.cardDetailsEl.name = card.name;
    });
  }
}

customElements.define('ygo-app', App);
