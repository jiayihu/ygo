import HyperHTMLElement from 'hyperhtml-element';
import style from './Navbar.css';

export interface RouteChangeEvent extends CustomEvent {
  detail: string;
}

export class Navbar extends HyperHTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  handleClick = (event: MouseEvent) => {
    event.preventDefault();

    const anchorEl = event.target! as HTMLAnchorElement;
    const dispatchedEvent: RouteChangeEvent = new CustomEvent('routeChange', {
      detail: anchorEl.pathname // `href` property includes the host
    });
    this.dispatchEvent(dispatchedEvent);
  };

  render() {
    return this.html`
      <style>${style}</style>

      <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/" onclick=${this.handleClick} >
            Yu-Gi-Oh!
          </a>
        </div>
        <div class="navbar-menu">
        </div>
      </nav>
    `;
  }
}

Navbar.define('ygo-navbar');
