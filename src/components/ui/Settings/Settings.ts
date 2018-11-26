import HyperHTMLElement from 'hyperhtml-element';
import style from './Settings.css';

type State = {
  type: 'OPEN' | 'CLOSED';
  currency: 'USD' | 'EUR' | 'GBP';
};

const { wire } = HyperHTMLElement;

export class Settings extends HyperHTMLElement<State> {
  get defaultState(): State {
    return {
      type: 'OPEN',
      currency: 'USD'
    };
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  handleClick() {
    this.setState({
      type: this.state.type === 'OPEN' ? 'CLOSED' : 'OPEN'
    });
  }

  handleClose() {
    this.setState({ type: 'CLOSED' });
  }

  handleCurrencyChange(currency: 'USD' | 'EUR' | 'GBP') {
    this.setState({ currency });
  }

  render() {
    const content = wire(this.state, ':currency')`
      <p>Currency: </p>
      <ygo-buttons>
        <ygo-button
          onclick=${() => this.handleCurrencyChange('USD')}
          kind=${this.state.currency === 'USD' ? 'info' : null}
        >USD</ygo-button>
        <ygo-button
          onclick=${() => this.handleCurrencyChange('EUR')}
          kind=${this.state.currency === 'EUR' ? 'info' : null}
        >EUR</ygo-button>
        <ygo-button
          onclick=${() => this.handleCurrencyChange('GBP')}
          kind=${this.state.currency === 'GBP' ? 'info' : null}
        >GBP</ygo-button>
      </ygo-buttons>
    `;

    return this.html`
      <style>${style}</style>
      <ygo-icon name="settings" onclick=${this.handleClick} />
      <ygo-modal
        name="Settings"
        open=${this.state.type === 'OPEN'}
        onclose=${this.handleClose}
        data=${content}
      />
    `;
  }
}

Settings.define('ygo-settings');
