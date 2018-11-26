import HyperHTMLElement from 'hyperhtml-element';
import style from './Buttons.css';

export class Buttons extends HyperHTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  render() {
    return this.html`
      <style>${style}</style>
      <div class="buttons has-addons">
        <slot></slot>
      </div>
    `;
  }
}

Buttons.define('ygo-buttons');
