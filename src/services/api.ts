// const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://yugiohprices.com/api';
const BASE_URL = 'https://yugiohprices.com/api';

export default function request(resource: string, options?: RequestInit): Promise<any> {
  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    ...options
  })
    .then(response => response.json())
    .then(response => {
      if (response.status !== 'success') {
        console.warn(response.error_msg || 'Error with API request');
      }

      return response.data;
    });
}
