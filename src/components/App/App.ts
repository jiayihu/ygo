import HyperHTMLElement from 'hyperhtml-element';
import hyperApp from 'hyperhtml-app';
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

  private configureRoutes() {
    this.router.get('/card/:name', ctx => {
      const cardName = ctx.params.name;

      this.renderRoute`<ygo-spinner />`;
      this.render();
      this.resetScroll();

      getCard(cardName)
        .then(card => {
          this.renderRoute`<ygo-card-details name=${cardName} />`;
          this.setState({ card });
        })
        .catch(error => {
          const message =
            error.status && error.status === 'fail'
              ? `No cards matching this name were found.\nDue to yugiohprices.com API limits, you must provide the exact case-insensitive name of the card.`
              : `There was an error with the server request. Please open an issue on Github if it persists.`;

          this.renderError(message);
          this.render();
        });
    });

    this.router.get('/', () => {
      this.renderRoute`
      <ygo-search-input onsearch=${this.handleCardSearch}></ygo-search-input>
      <ygo-expensive-cards oncardSelection=${this.handleCardSelection} />
      `;
      this.setState({ card: null });
      this.resetScroll();
    });
  }

  connectedCallback() {
    this.configureRoutes();

    // Trigger route handler for the current path
    this.router.navigate(window.location.pathname);
  }

  handleCardSearch = (event: SearchEvent): void => {
    const cardName = event.detail.query;

    if (!cardName) {
      this.router.navigate('/');
      return;
    }

    this.router.navigate(`/card/${cardName}`);
  };

  handleCardSelection = (event: CardSelectionEvent): void => {
    const cardName = event.detail.name;

    if (!cardName) return;

    this.router.navigate(`/card/${cardName}`);
  };

  handleRouteChange = (event: RouteChangeEvent): void => {
    const route: string = event.detail.route;
    this.router.navigate(route);
    this.render();
  };

  render() {
    const { card } = this.state;
    const bgColor = card ? darken(0.1, getCardColor(card)) : '#67412e';
    const activeRoute = window.location.pathname;

    return this.html`
      <style>${style}</style>

      <div style=${`background-color: ${bgColor}`}>
        <ygo-navbar
          route=${activeRoute}
          style=${`--hover: ${bgColor}`}
          onrouteChange=${this.handleRouteChange}
        ></ygo-navbar>

        <section class="app-section">
          <div class="container">
            ${this.routerOutletEl}
          </div>
        </section>

        <footer style=${`background-color: ${darken(0.1, bgColor)}`}>
          <p>Built by <a href="https://github.com/jiayihu" rel="noopener">jiayihu</a>, with the help of <a href="https://yugiohprices.com/"
              rel="noopener">yugiohprices.com</a> and <a href="https://www.pokedex.org/" rel="noopener">pokedex.org</a>.</p>
          <p>Yu-Gi-Oh! is a trademark of Kazuki Takahashi, Konami © 1996-2018. This website is in no way affiliated with Konami.</p>
        </footer>
      </div>

      <a href="https://github.com/jiayihu/ygo" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" fill=${bgColor} style="color:#fff; position: absolute; top: 0; border: 0; right: 0; z-index: 999;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
    `;
  }
}

App.define('ygo-app');
