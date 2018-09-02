import HyperHTMLElement from 'hyperhtml-element';
import style from './Message.css';

export class Message extends HyperHTMLElement {
  static get observedAttributes() {
    return ['type', 'message'];
  }

  type: string | null = null;
  message: string | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'type') this.type = newValue;
    if (name === 'message') this.message = newValue;

    this.render();
  }

  render() {
    if (!this.message) {
      return this.html`The "message" attribute is required.`;
    }

    const className = `message ${this.type ? 'is-' + this.type : ''}`;

    return this.html`
      <style>${style}</style>

      <article class=${className}>
        <div class="message-body">${this.message}</div>
      </article>
    `;
  }
}

Message.define('ygo-message');
