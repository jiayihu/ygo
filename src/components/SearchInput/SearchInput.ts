import HyperHTMLElement from 'hyperhtml-element';
import style from './SearchInput.css';
import Autocomplete, { Awesomplete } from 'awesomplete';
import awesompleteStyle from 'awesomplete/awesomplete.css';
import { searchCard } from '../../services/cards';
import { debounce } from '../../utils';

export interface SearchEvent extends CustomEvent {
  detail: { query: string };
}

const { wire } = HyperHTMLElement;

type State = {
  isLoading: boolean;
};

export class SearchInput extends HyperHTMLElement<State> {
  get defaultState(): State {
    return { isLoading: false };
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  inputEl: HTMLInputElement | null = null;

  private search = debounce((query: string) => {
    this.setState({ isLoading: true });

    searchCard(query).then(names => {
      console.log(names);
      const instance = new Autocomplete(this.inputEl!, { list: names });
      (window as any)['instance'] = instance;
      instance.evaluate();

      this.inputEl!.focus();
      this.setState({ isLoading: false });
    });
  }, 400);

  connectedCallback() {
    this.inputEl = wire()`<input
      class="awesomplete input"
      placeholder="Search by card name (Enter)"
      aria-label="Search by card name"
      onkeydown=${this.handleInput}
    />`;

    /**
     * This stuff is completely undocumented, but "fortunately" the source code
     * is small and readable
     */
    this.inputEl!.addEventListener('awesomplete-selectcomplete', (event: any) => {
      const { value } = event.text;
      const dispatchedEvent: SearchEvent = new CustomEvent('search', { detail: { query: value } });

      this.dispatchEvent(dispatchedEvent);
    });

    this.render();
  }

  handleInput(event: KeyboardEvent) {
    const key = event.key;

    if (key === 'Enter') {
      const query: string = (event.target! as HTMLInputElement).value;
      this.search(query);
    }
  }

  render() {
    return this.html`
      <style>${awesompleteStyle}</style>
      <style>${style}</style>

      <div class=${`control ${this.state.isLoading ? 'is-loading' : ''}`}>
        ${this.inputEl}
        ${this.state.isLoading ? wire()`<span class="spinner" />` : null}
      </div>
    `;
  }
}

SearchInput.define('ygo-search-input');
