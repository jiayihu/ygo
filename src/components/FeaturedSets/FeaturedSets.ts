import template from './FeaturedSets.html';
import style from './FeaturedSets.css';
import { getFeaturedSets } from '../../services/sets';

const templateEl = document.createElement('template');
templateEl.innerHTML = `
  <style>${style}</style>
  ${template}
`;

export class FeaturedSets extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateEl.content.cloneNode(true));
  }

  connectedCallback() {
    getFeaturedSets().then(sets => {
      if (!this.shadowRoot) return;

      const setsTemplate = sets.map(set => `<li>${set.name}</li>`).join('');
      const list = this.shadowRoot.querySelector('ul') as HTMLUListElement;

      list.innerHTML = setsTemplate;
    });
  }
}

customElements.define('ygo-featured-sets', FeaturedSets);
