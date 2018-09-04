import HyperHTMLElement from 'hyperhtml-element';
import style from './SearchInput.css';

export interface SearchEvent extends CustomEvent {
  detail: { query: string };
}

export class SearchInput extends HyperHTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  handleInput = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === 'Enter') {
      const query: string = (event.target! as HTMLInputElement).value;
      const dispatchedEvent: SearchEvent = new CustomEvent('search', { detail: { query } });

      this.dispatchEvent(dispatchedEvent);
    }
  };

  render() {
    return this.html`
      <style>${style}</style>

      <input
        class="input"
        placeholder="Search by card name"
        aria-label="Search by card name"
        onkeydown=${this.handleInput}
      />
    `;
  }
}

SearchInput.define('ygo-search-input');
