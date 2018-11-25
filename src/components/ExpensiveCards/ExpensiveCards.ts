import HyperHTMLElement from 'hyperhtml-element';
import style from './ExpensiveCards.css';
import { getMostExpensiveCards } from '../../services/cards';
import { getCardImage } from '../../domain/cards';
import { YGOCardPreview } from '../../domain/types';

type State = {
  cards: YGOCardPreview[] | null;
};

const { wire } = HyperHTMLElement;

export class ExpensiveCards extends HyperHTMLElement<State> {
  get defaultState(): State {
    return {
      cards: null,
    };
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  private getPositionColor(index: number) {
    return index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'primary';
  }

  connectedCallback() {
    getMostExpensiveCards().then(cards => this.setState({ cards }));
  }

  renderTopCard(card: YGOCardPreview, index: number) {
    return wire(card)`
      <ygo-card-preview
        name=${card.name}
        cover=${getCardImage(card.name)}
        price=${card.price}
        rarity=${card.rarity}
        class="card"
        style=${{ '--card-preview-bg': `var(--${this.getPositionColor(index)})` }}
      >
      </ygo-card-preview>
    `;
  }

  renderCard(card: YGOCardPreview, index: number) {
    return wire(card)`
      <ygo-card-preview
        name=${card.name}
        cover=${getCardImage(card.name)}
        price=${card.price}
        rarity=${card.rarity}
        class="card"
      >
      </ygo-card-preview>
    `;
  }

  renderCards(cards: YGOCardPreview[]): HTMLElement[] {
    const top3 = cards.slice(0, 3).map((card, index) => this.renderTopCard(card, index));
    const rest = cards.slice(3).map((card, index) => this.renderCard(card, index));

    return [
      wire()`<div class="cards cards-top">${top3}</div>`,
      wire()`<div class="cards cards-rest">${rest}</div>`,
    ];
  }

  render() {
    const { cards } = this.state;
    const renderContent = wire(cards);

    return this.html`
      <style>${style}</style>

      <div class="container">
        <h2 class="title">Most expensive cards</h2>
        ${cards ? renderContent`${this.renderCards(cards)}` : renderContent`<ygo-spinner />`}
      </div>
    `;
  }
}

ExpensiveCards.define('ygo-expensive-cards');
