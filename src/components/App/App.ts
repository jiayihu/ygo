import template from './App.html';
import { LatestCards, CardSelectionEvent } from '../LatestCards/LatestCards';
import { EventHandler } from '../../types';

const templateEL = document.createElement('template');
templateEL.innerHTML = template;

export class App extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEL.content.cloneNode(true));
  }

  private latestCardsEl: LatestCards | null = null;

  connectedCallback() {
    this.latestCardsEl = this.querySelector('ygo-latest-cards');

    if (this.latestCardsEl) {
      this.latestCardsEl.addEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }
  }

  disconnectedCallback() {
    if (this.latestCardsEl) {
      this.latestCardsEl.removeEventListener('cardSelection', this
        .handleCardSelection as EventHandler);
    }
  }

  handleCardSelection = (event: CardSelectionEvent): void => {
    console.log(event.detail.name);
  };
}

customElements.define('ygo-app', App);
