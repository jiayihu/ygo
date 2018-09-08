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
      cards: null
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
    this.render();

    getMostExpensiveCards().then(cards => this.setState({ cards }));
  }

  renderCards(cards: YGOCardPreview[]): HTMLElement[] {
    return cards.map(
      (card, index) => wire(card)`
        <ygo-card-preview
          name=${card.name}
          cover=${getCardImage(card.name)}
          price=${card.price}
          rarity=${card.rarity}
          class="card"
          style=${{ '--primary': `var(--${this.getPositionColor(index)})` }}
        >
        </ygo-card-preview>
      `
    );
  }

  render() {
    const { cards } = this.state;
    const renderContent = wire(cards);

    return this.html`
      <style>${style}</style>

      <div class="container">
        <h2 class="title">Most expensive cards</h2>
        <div class="cards">
          ${cards ? renderContent`${this.renderCards(cards)}` : renderContent`<ygo-spinner />`}
        </div>
      </div>
    `;
  }
}

ExpensiveCards.define('ygo-expensive-cards');
