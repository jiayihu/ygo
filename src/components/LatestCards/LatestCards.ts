import template from './LatestCards.html';
import { getNewCards } from '../../services/cards';
import { CardPreview } from '../CardPreview/CardPreview';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export interface CardSelectionEvent extends CustomEvent {
  detail: CardPreview;
}

export class LatestCards extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }

  private listEl: HTMLUListElement | null = null;

  connectedCallback() {
    getNewCards().then(cards => {
      console.log(cards);
      const cardsTemplate = cards
        .map(
          card => `
            <ygo-card-preview
              name="${card.name}" 
              cover="${card.image_path}" 
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

customElements.define('ygo-latest-cards', LatestCards);
