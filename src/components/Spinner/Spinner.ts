import style from './Spinner.css';

const templateEL = document.createElement('template');
templateEL.innerHTML = `
  <style>${style}</style>
  <div class="spinner">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
`;

class Spinner extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEL.content.cloneNode(true));
  }
}

customElements.define('ygo-spinner', Spinner);
