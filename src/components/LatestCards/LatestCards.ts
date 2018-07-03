import template from './LatestCards.html';
import { getNewCards } from '../../services/cards';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

class LatestCards extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }

  connectedCallback() {
    getNewCards().then(cards => {
      console.log(cards);
      const cardsTemplate = cards
        .map(
          card => `
            <ygo-card-preview class="column is-one-third">
              ${card.name}
            </ygo-card-preview>
          `
        )
        .join('');
      const list = this.querySelector('ul') as HTMLUListElement;

      list.innerHTML = cardsTemplate;
    });
  }
}

customElements.define('ygo-latest-cards', LatestCards);
