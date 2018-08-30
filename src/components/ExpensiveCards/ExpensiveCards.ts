import template from './ExpensiveCards.html';
import { getMostExpensiveCards } from '../../services/cards';
import { CardPreview } from '../CardPreview/CardPreview';
import { getCardImage } from '../../domain/cards';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export interface CardSelectionEvent extends CustomEvent {
  detail: CardPreview;
}

export class ExpensiveCards extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }

  private listEl: HTMLUListElement | null = null;

  connectedCallback() {
    getMostExpensiveCards().then(cardNames => {
      console.log(cardNames);
      const cardsTemplate = cardNames
        .map(
          cardName => `
            <ygo-card-preview
              name="${cardName}" 
              cover="${getCardImage(cardName)}" 
              class="column is-one-third is-one-quarter-desktop"
            >
            </ygo-card-preview>
          `
        )
        .join('');
      this.listEl = this.querySelector('ul') as HTMLUListElement;

      if (this.listEl) {
        this.listEl.innerHTML = cardsTemplate;
        this.listEl.addEventListener('click', this.handleCardClick);
      }
    });
  }

  disconnectedCallback() {
    if (this.listEl) this.listEl.removeEventListener('click', this.handleCardClick);
  }

  private handleCardClick = (event: MouseEvent) => {
    const cardEl = event.target as HTMLElement;

    if (cardEl instanceof CardPreview) {
      const event = new CustomEvent('cardSelection', { detail: cardEl });
      this.dispatchEvent(event);
    }
  };
}

customElements.define('ygo-expensive-cards', ExpensiveCards);
