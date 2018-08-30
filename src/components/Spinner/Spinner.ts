import style from './Spinner.css';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
`;

export class Spinner extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }
}

customElements.define('ygo-spinner', Spinner);
