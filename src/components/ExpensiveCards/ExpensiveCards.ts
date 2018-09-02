import HyperHTMLElement from 'hyperhtml-element';
import style from './ExpensiveCards.css';
import { getMostExpensiveCards } from '../../services/cards';
import { CardPreview } from '../CardPreview/CardPreview';
import { getCardImage } from '../../domain/cards';
import { YGOCardPreview } from '../../domain/types';

export interface CardSelectionEvent extends CustomEvent {
  detail: CardPreview;
}

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

  handleCardClick = (event: MouseEvent) => {
    const cardEl = event.target as HTMLElement;

    if (cardEl instanceof CardPreview) {
      const dispatchedEvent: CardSelectionEvent = new CustomEvent('cardSelection', {
        detail: cardEl
      });
      this.dispatchEvent(dispatchedEvent);
    }
  };

  renderCards(cards: YGOCardPreview[]): HTMLElement[] {
    return cards.map(
      (card, index) => wire(card)`
        <ygo-card-preview
          name=${card.name}
          cover=${getCardImage(card.name)}
          price=${card.price}
          class="card"
          style=${`--theme: var(--${this.getPositionColor(index)})`}
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
        <ul class="cards" onclick=${this.handleCardClick}>
          ${cards ? renderContent`${this.renderCards(cards)}` : renderContent`<ygo-spinner />`}
        </ul>
      </div>
    `;
  }
}

ExpensiveCards.define('ygo-expensive-cards');
