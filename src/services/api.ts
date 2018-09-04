export const BASE_URL = 'https://ygo-api.now.sh/https://yugiohprices.com/api/';

export default function request(resource: string, options?: RequestInit): Promise<any> {
  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    ...options
  })
    .then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json();
      }

      return response.json().then(error => {
        throw error;
      });
    })
    .then(response => {
      if (response.status !== 'success') {
        throw response;
      }

      return response.data;
    });
}
