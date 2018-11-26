import HyperHTMLElement from 'hyperhtml-element';
import style from './Button.css';

export class Button extends HyperHTMLElement {
  static get observedAttributes() {
    return ['kind'];
  }

  kind?: string;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(attr: string) {
    this.render();
  }

  render() {
    return this.html`
      <style>${style}</style>
      <button class=${`button ${this.kind ? `is-${this.kind}` : ''}`}>
        <slot></slot>
      </button>
    `;
  }
}

Button.define('ygo-button');
