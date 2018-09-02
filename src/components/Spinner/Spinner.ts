import HyperHTMLElement from 'hyperhtml-element';
import style from './Spinner.css';

export class Spinner extends HyperHTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  render() {
    return this.html`
      <style>${style}</style>
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
    `;
  }
}

Spinner.define('ygo-spinner');
