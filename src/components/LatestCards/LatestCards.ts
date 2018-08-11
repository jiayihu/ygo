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
            <ygo-card-preview name="${
              card.name
            }" cover="https://ygohub.com/card_images/5b11b31ccffd5.jpg" class="column is-one-third">
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
