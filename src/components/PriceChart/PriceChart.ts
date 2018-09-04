import HyperHTMLElement from 'hyperhtml-element';
import { Chart } from 'chart.js/dist/Chart.min.js';
import style from './PriceChart.css';
import { getCardPrices, getCardHistory } from '../../services/cards';
import { YGOCardPrice, Price } from '../../domain/types';
import { Option, ChoiceEvent } from '../Select/Select';

type State = {
  cardPrices: YGOCardPrice[] | null;
  options: Option[] | null;
  selected: YGOCardPrice | null;
  history: Price[] | null;
  isLoadingHistory: boolean;
};

const { wire } = HyperHTMLElement;

export class PriceChart extends HyperHTMLElement<State> {
  static get observedAttributes() {
    return ['name'];
  }

  get defaultState(): State {
    return {
      cardPrices: null,
      options: null,
      selected: null,
      history: null,
      isLoadingHistory: false
    };
  }

  name?: string;

  private canvasEl = document.createElement('canvas');
  private chart: Chart | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  private computeData(history: Price[]): Chart.ChartData {
    const labels = history.map(price => {
      const format = { month: 'numeric', day: 'numeric' };

      return new Date(price.updatedAt).toLocaleDateString(undefined, format);
    });
    const lowData = history.map(price => price.low);
    const averageData = history.map(price => price.average);

    return {
      labels,
      datasets: [
        {
          label: 'Price history (low)',
          backgroundColor: 'rgba(255, 255, 255, .3)',
          borderColor: '#fff',
          data: lowData
        },
        {
          label: 'Price history (average)',
          borderColor: '#fff',
          data: averageData
        }
      ]
    };
  }

  private createChart(history: Price[]) {
    const context = this.canvasEl.getContext('2d')!;

    Chart.defaults.global.defaultFontColor = '#fff';

    this.chart = new Chart(context, {
      type: 'line',
      data: this.computeData(history),
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: { color: 'rgba(255, 255, 255, .1)' },
              scaleLabel: { display: true, labelString: 'Day' }
            }
          ],
          yAxes: [
            {
              gridLines: { color: 'rgba(255, 255, 255, .1)' },
              scaleLabel: { display: true, labelString: 'Price ($)' }
            }
          ]
        }
      }
    });
  }

  private updateChart(history: Price[]) {
    if (!this.chart) return;

    this.chart.data = this.computeData(history);
    this.chart.update();
  }

  private updateHistory(printTag: string, rarity: string) {
    this.setState({ isLoadingHistory: true });

    getCardHistory(printTag, rarity).then(history => {
      this.chart ? this.updateChart(history) : this.createChart(history);
      this.setState({ history, isLoadingHistory: false });
    });
  }

  private updateCard(name: string) {
    getCardPrices(name).then(cardPrices => {
      const options: Option[] = cardPrices.map(cardPrice => {
        return { value: cardPrice.printTag, label: cardPrice.name };
      });
      const highest = cardPrices.reduce((max, cardPrice) => {
        if (cardPrice.price.low > max.price.low) {
          return cardPrice;
        }

        return max;
      }, cardPrices[0]);

      this.setState({
        cardPrices,
        options,
        selected: highest
      });

      this.updateHistory(highest.printTag, highest.rarity);
    });
  }

  connectedCallback() {
    this.render();

    if (!this.name) return;

    this.updateCard(this.name);
  }

  attributeChangedCallback(attr: string, prev: string, curr: string) {
    if (this.chart && attr === 'name') this.updateCard(curr);
  }

  handleChoice = (event: ChoiceEvent) => {
    if (!this.state.cardPrices) return;

    const printTag = event.detail.value;
    const cardPrice = this.state.cardPrices.find(cardPrice => cardPrice.printTag === printTag);

    if (!cardPrice) return;

    this.updateHistory(printTag, cardPrice.rarity);
  };

  render() {
    if (!this.state.selected) {
      return this.html`<ygo-spinner />`;
    }

    const updatedAt = new Date(this.state.selected.price.updatedAt).toLocaleString();

    return this.html`
      <style>${style}</style>
      <!-- Wrap the canvas in HTMLElement to allow ChartJS getting the size -->
      <h3 class="title">Price history</h3>

      ${wire(this.state.options)`
        <ygo-select
          loading=${this.state.isLoadingHistory}
          data=${this.state.options}
          onchoice=${this.handleChoice}
        />
      `}

      <p>Current: $${this.state.selected.price.low}</p>
      <p>Rarity: ${this.state.selected.rarity}</p>
      <p>Updated at: ${updatedAt}</p>

      <div>${this.canvasEl}</div>
      <ygo-spinner hidden=${!!this.state.history} />
    `;
  }
}

PriceChart.define('ygo-price-chart');
