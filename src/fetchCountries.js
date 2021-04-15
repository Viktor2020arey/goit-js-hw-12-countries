import notify from './notify.js';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  fetchCountries(searchQuery) {
    const countryName = searchQuery;

    return fetch(baseUrl + countryName).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(notify('404 Not found'));
    });
  },
};
