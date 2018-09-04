import HyperHTMLElement from 'hyperhtml-element';
import style from './Select.css';

export type Option = {
  value: string;
  label: string;
};

export interface ChoiceEvent extends CustomEvent {
  detail: Option;
}

const { wire } = HyperHTMLElement;

export class Select extends HyperHTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  static get booleanAttributes() {
    return ['loading'];
  }

  loading?: boolean;
  data?: Option[];
  selected?: string;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  handleChange = (event: Event) => {
    const target = event.target! as HTMLSelectElement;
    const value = target.value;
    const label = target.textContent!;

    const dispatchedEvent: ChoiceEvent = new CustomEvent('choice', {
      detail: { value, label }
    });
    this.dispatchEvent(dispatchedEvent);
  };

  render() {
    const options = this.data
      ? this.data.map(
          option =>
            wire(option)`
              <option
                value=${option.value}
                selected=${option.value === this.selected}
              >${option.label}</option>`
        )
      : null;

    return this.html`
      <style>${style}</style>

      <div class=${`select is-white ${this.loading ? 'is-loading' : ''}`}>
        <select onchange=${this.handleChange}>${options}</select>
      </div>
    `;
  }
}

Select.define('ygo-select');
