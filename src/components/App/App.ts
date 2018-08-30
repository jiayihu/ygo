import template from './App.html';
import style from './App.css';
import { LatestCards, CardSelectionEvent } from '../LatestCards/LatestCards';
import { EventHandler } from '../../domain/types';
import { CardDetails } from '../CardDetails/CardDetails';
import { getCard } from '../../services/cards';
import { getCardColor } from '../../domain/cards';

const templateEL = document.createElement('template');
templateEL.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export class App extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEL.content.cloneNode(true));
  }

  private sectionEl: HTMLElement | null = null;
  private latestCardsEl: LatestCards | null = null;
  private cardDetailsEl: CardDetails | null = null;

  connectedCallback() {
    this.sectionEl = this.querySelector('.app-section');
    this.latestCardsEl = this.querySelector('ygo-latest-cards');
    this.cardDetailsEl = this.querySelector('ygo-card-details');

    if (this.latestCardsEl) {
      this.latestCardsEl.addEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }

    // @TODO: remove later
    this.setActiveCard('Widget Kid');
  }

  disconnectedCallback() {
    if (this.latestCardsEl) {
      this.latestCardsEl.removeEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }
  }

  handleCardSelection = (event: CardSelectionEvent): void => {
    if (!event.detail.name) return;

    this.setActiveCard(event.detail.name);
  };

  private setActiveCard(cardName: string) {
    getCard(cardName).then(card => {
      if (!this.latestCardsEl || !this.cardDetailsEl || !this.sectionEl) {
        return;
      }

      this.latestCardsEl.classList.toggle('is-hidden');
      this.cardDetailsEl.classList.toggle('is-hidden');
      this.sectionEl.style.backgroundColor = getCardColor(card);

      this.cardDetailsEl.name = card.name;
    });
  }
}

customElements.define('ygo-app', App);
