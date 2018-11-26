function getExchangeRate() {
  return fetch(`https://api.exchangeratesapi.io/latest?base=USD`, {
    mode: 'cors'
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    }

    return response.json().then(error => {
      throw error;
    });
  });
}

const symbols = {
  USD: '$',
  EUR: '€',
  GBP: '£'
};

function toCurrency(value: number, currency: 'USD' | 'EUR' | 'GBP'): string {
  return `${symbols[currency]}${value.toFixed(2)}`;
}

function createConverter() {
  let currency: 'USD' | 'EUR' | 'GBP' = 'USD';
  let rates: Record<string, number>;
  let reqCache: Promise<any>;

  const convert = function(value: number): Promise<string> {
    if (rates) return Promise.resolve(toCurrency(rates[currency] * value, currency));

    const request = reqCache || (reqCache = getExchangeRate());

    return request.then(response => {
      rates = response.rates;

      return toCurrency(rates[currency] * value, currency);
    });
  };
  const setCurrency = (newCurrency: 'USD' | 'EUR' | 'GBP') => (currency = newCurrency);

  return { convert, setCurrency };
}

export const { convert, setCurrency } = createConverter();
