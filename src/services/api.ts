const BASE_URL = 'https://www.ygohub.com/api';

export default function request(resource: string, options?: RequestInit) {
  return fetch(`${BASE_URL}/${resource}`, {
    mode: 'cors',
    ...options
  })
    .then(response => response.json())
    .then(response => {
      if (response.status !== 'success') {
        console.warn(response.error_msg || 'Error with API request');
      }

      return response;
    });
}
