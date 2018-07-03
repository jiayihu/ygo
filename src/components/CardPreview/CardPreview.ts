import template from './CardPreview.html';
import style from './CardPreview.css';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

class CardPreview extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('ygo-card-preview', CardPreview);
