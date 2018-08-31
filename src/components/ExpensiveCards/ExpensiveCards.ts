import template from './ExpensiveCards.html';
import style from './ExpensiveCards.css';
import { getMostExpensiveCards } from '../../services/cards';
import { CardPreview } from '../CardPreview/CardPreview';
import { getCardImage } from '../../domain/cards';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export interface CardSelectionEvent extends CustomEvent {
  detail: CardPreview;
}

export class ExpensiveCards extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  private listEl: HTMLUListElement | null = null;

  connectedCallback() {
    getMostExpensiveCards().then(cards => {
      if (!this.shadowRoot) return;
      const cardsTemplate = cards
        .map(
          (card, index) => `
            <ygo-card-preview
              name="${card.name}" 
              cover="${getCardImage(card.name)}" 
              price="${card.price}"
              class="card"
              style="--theme: var(--${this.getPositionColor(index)})"
            >
            </ygo-card-preview>
          `
        )
        .join('');
      this.listEl = this.shadowRoot.querySelector('ul') as HTMLUListElement;

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

  private getPositionColor(index: number) {
    return index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'primary';
  }
}

customElements.define('ygo-expensive-cards', ExpensiveCards);
