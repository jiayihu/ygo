export function getExchangeRate() {
  return fetch(`https://api.exchangeratesapi.io/latest?base=USD`, {
    mode: 'cors',
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json();
    }

    return response.json().then(error => {
      throw error;
    });
  });
}
