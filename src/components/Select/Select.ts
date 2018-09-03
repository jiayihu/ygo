import HyperHTMLElement from 'hyperhtml-element';
import style from './Select.css';

export type Option = {
  value: string;
  label: string;
};

export interface SelectEvent extends CustomEvent {
  detail: Option;
}

const { wire } = HyperHTMLElement;

export class Select extends HyperHTMLElement {
  data?: Option[];

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
    console.log((event.target! as HTMLSelectElement).value);
  };

  render() {
    const options = this.data
      ? this.data.map(
          option => wire(option)`<option value=${option.value}>${option.label}</option>`
        )
      : null;

    return this.html`
      <style>${style}</style>

      <div class="select">
        <select onchange=${this.handleChange}>${options}</select>
      </div>
    `;
  }
}

Select.define('ygo-select');
