import notify from './notify.js';

const baseUrl = 'https://restcountries.eu/rest/v2/name';

export default {
  fetchCountries(searchQuery) {
    return fetch(`${baseUrl}/${searchQuery}`).then(response => {
      if (searchQuery) {
        return response.json();
      }
      return Promise.reject(notify('404 Not found'));
    });
  },
};
