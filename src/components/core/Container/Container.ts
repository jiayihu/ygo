import HyperHTMLElement from 'hyperhtml-element';
import style from './Container.css';

export class Container extends HyperHTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  render() {
    return this.html`
      <style>${style}</style>
      <slot></slot>
    `;
  }
}

Container.define('ygo-container');
