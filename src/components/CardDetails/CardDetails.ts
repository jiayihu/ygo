import HyperHTMLElement from 'hyperhtml-element';
import style from './CardDetails.css';
import { getCard } from '../../services/cards';
import { getCardImage, getCardColor, isMonster } from '../../domain/cards';
import { YGOCard } from '../../domain/types';
import { darken } from 'polished';

type State = {
  card: YGOCard | null;
};

const { wire } = HyperHTMLElement;

export class CardDetails extends HyperHTMLElement<State> {
  get defaultState() {
    return { card: null };
  }

  static get observedAttributes() {
    return ['name'];
  }

  name?: string;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    const name = this.name;

    if (name) getCard(name).then(card => this.setState({ card }));
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'name' && newValue) {
      getCard(newValue).then(card => this.setState({ card }));
    }
  }

  render() {
    const { card } = this.state;

    if (!card) return null;

    const cardColor = getCardColor(card);
    const coverColor = darken(0.2, cardColor);
    const renderCard = wire(card);

    return this.html`
      <style>${style}</style>

      <div class="card" style=${`background-color: ${cardColor}`}>
        <div class="cover-wrapper">
          <img 
            src=${getCardImage(card.name)}
            class="cover"
            alt="Cover"
            width="256"
            height="375"
            style=${`background-color: ${coverColor}`}
          />
        </div>
        <div class="details">
          ${
            isMonster(card)
              ? renderCard`<ygo-monster-card data=${card} />`
              : renderCard`<ygo-spelltrap-card data=${card} />`
          }
        </div>
      </div>
    `;
  }
}

CardDetails.define('ygo-card-details');
