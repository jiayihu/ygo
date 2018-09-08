import HyperHTMLElement from 'hyperhtml-element';
import hyperApp, { Ctx } from 'hyperhtml-app';
import { darken } from 'polished';

import style from './App.css';
import { CardSelectionEvent } from '../CardPreview/CardPreview';
import { YGOCard } from '../../domain/types';
import { getCard } from '../../services/cards';
import { getCardColor } from '../../domain/cards';
import { RouteChangeEvent } from '../Navbar/Navbar';
import { SearchEvent } from '../SearchInput/SearchInput';

type State = {
  card: YGOCard | null;
};

const { bind } = HyperHTMLElement;

export class App extends HyperHTMLElement<State> {
  get defaultState(): State {
    return { card: null };
  }

  private routerOutletEl: HTMLElement = document.createElement('div');
  private router = new hyperApp();
  private renderRoute = bind(this.routerOutletEl);

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  private resetScroll() {
    window.scrollTo(0, 0);
  }

  private renderError(message: string) {
    return this.renderRoute`
      <ygo-search-input onsearch=${this.handleCardSearch}></ygo-search-input>
      <ygo-message type="warning" message=${message} />
    `;
  }

  private handleCardRoute(ctx: Ctx) {
    const cardName = ctx.params.name;

    // Avoid flash of spinner in case of cached card
    window.setTimeout(() => {
      if (this.state.card) return;
      this.renderRoute`<ygo-spinner />`;
      this.render();
      this.resetScroll();
    }, 400);

    getCard(cardName)
      .then(card => {
        this.renderRoute`<ygo-card-details name=${cardName} />`;
        this.setState({ card });
      })
      .catch(error => {
        const message =
          error.status && error.status === 'fail'
            ? `No cards matching this name were found.`
            : `There was an error with the server request. Please open an issue on Github if it persists.`;

        this.renderError(message);
        this.render();
      });
  }

  private handleHomeRoute() {
    this.renderRoute`
      <ygo-search-input onsearch=${this.handleCardSearch}></ygo-search-input>
      <ygo-expensive-cards oncardSelection=${this.handleCardSelection} />
    `;
    this.setState({ card: null });
    this.resetScroll();
  }

  private configureRoutes() {
    this.router.get('/card/:name', this.handleCardRoute);
    this.router.get('/', this.handleHomeRoute);
  }

  private getCurrentRoute(): string {
    return window.location.pathname.replace('index.html', '');
  }

  connectedCallback() {
    this.configureRoutes();

    // Trigger route handler for the current path
    this.router.navigate(this.getCurrentRoute());
  }

  handleCardSearch(event: SearchEvent): void {
    const cardName = event.detail.query;

    if (!cardName) {
      this.router.navigate('/');
      return;
    }

    this.router.navigate(`/card/${cardName}`);
  }

  handleCardSelection(event: CardSelectionEvent): void {
    const cardName = event.detail.name;

    if (!cardName) return;

    this.router.navigate(`/card/${cardName}`);
  }

  handleRouteChange(event: RouteChangeEvent): void {
    const route: string = event.detail.route;
    this.router.navigate(route);
    this.render();
  }

  render() {
    const { card } = this.state;
    const bgColor = card ? darken(0.1, getCardColor(card)) : '#67412e';
    const activeRoute = this.getCurrentRoute();

    return this.html`
      <style>${style}</style>

      <div style=${{ backgroundColor: bgColor }}>
        <ygo-navbar
          route=${activeRoute}
          style=${{ '--hover': bgColor }}
          onrouteChange=${this.handleRouteChange}
        ></ygo-navbar>

        <section class="app-section">
          <div class=${`container ${activeRoute === '/' ? 'home' : activeRoute}`}>
            ${this.routerOutletEl}
          </div>
        </section>

        <footer style=${{ backgroundColor: darken(0.1, bgColor) }}>
          <p>Built by <a href="https://github.com/jiayihu" rel="noopener">jiayihu</a>, with the help of <a href="https://yugiohprices.com/"
              rel="noopener">yugiohprices.com</a> and <a href="https://www.pokedex.org/" rel="noopener">pokedex.org</a>.</p>
          <p>Yu-Gi-Oh! is a trademark of Kazuki Takahashi, Konami © 1996-2018. This website is in no way affiliated with Konami.</p>
        </footer>
      </div>
    `;
  }
}

App.define('ygo-app');
