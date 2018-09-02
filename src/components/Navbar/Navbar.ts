import HyperHTMLElement from 'hyperhtml-element';
import style from './Navbar.css';

export interface RouteChangeEvent extends CustomEvent {
  detail: { route: string };
}

export class Navbar extends HyperHTMLElement {
  static get observedAttributes() {
    return ['route'];
  }

  route?: string;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();

    const anchorEl = event.target! as HTMLAnchorElement;
    const dispatchedEvent: RouteChangeEvent = new CustomEvent('routeChange', {
      detail: { route: anchorEl.pathname } // `href` property includes the host
    });
    this.dispatchEvent(dispatchedEvent);
  };

  render() {
    const homeText = !this.route || this.route === '/' ? 'Yu-Gi-Oh!' : '← Back';

    return this.html`
      <style>${style}</style>

      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/" onclick=${this.handleClick} >
            ${homeText}
          </a>
        </div>
        <div class="navbar-menu">
        </div>
      </nav>
    `;
  }
}

Navbar.define('ygo-navbar');
