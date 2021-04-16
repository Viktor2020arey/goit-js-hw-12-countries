import fetchCountriesSearch from './fetchCountries.js';
import countryListTmpl from './templates/countryListItem.hbs';
import countryTmpl from './templates/countryList.hbs';

import './styles.css';
import notify from './notify.js';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('.js-input-search'),
  countryList: document.querySelector('.js-country-list'),
};

refs.input.addEventListener('input', debounce(searchCountries, 1000));

function searchCountries(e) {
  const searchValue = e.target.value;
  clearList();

  fetchCountriesSearch.fetchCountries(searchValue).then(data => {
    if (data.length > 10) {
      notify('Too many matches found. Please enter a more specific query!');
    } else if (data.length > 1) {
      const markuplist = buildListMarkupList(data);
      insertItemCountrie(markuplist);
    } else if (data.length === 1) {
      const markupItem = buildListMarkupItem(data);
      insertItemCountrie(markupItem);
    }
  });
}

function insertItemCountrie(items) {
  refs.countryList.insertAdjacentHTML('beforeend', items);
}

function buildListMarkupItem(items) {
  return countryListTmpl(items);
}

function buildListMarkupList(items) {
  return countryTmpl(items);
}

function clearList() {
  refs.countryList.innerHTML = '';
}
