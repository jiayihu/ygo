import template from './FeaturedSets.html';
import { getFeaturedSets } from '../../services/sets';

const templateEl = document.createElement('template');
templateEl.innerHTML = template;

export class FeaturedSets extends HTMLElement {
  constructor() {
    super();

    this.appendChild(templateEl.content.cloneNode(true));
  }

  connectedCallback() {
    getFeaturedSets().then(sets => {
      const setsTemplate = sets.map(set => `<li>${set.name}</li>`).join('');
      const list = this.querySelector('ul') as HTMLUListElement;

      list.innerHTML = setsTemplate;
    });
  }
}

customElements.define('ygo-featured-sets', FeaturedSets);
