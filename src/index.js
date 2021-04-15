import './styles.css';

import notify from './notify.js';
import debounce from 'lodash.debounce';

import fetchCountriesSearch from './fetchCountries.js';
import countryListTmpl from './templates/countryListItem.hbs';
import countryTmpl from './templates/countryList.hbs';

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
    } else {
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
// import pokemonCardTpl from './templates/pokemon-cards.hbs';
// import API from './api-service';
// import getRefs from './refs';

// const refs = getRefs();
// refs.searchForm.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const searchQuery = form.elements.query.value;

//   API.fetchById(searchQuery)
//     .then(renderPocemonCard)
//     .catch(onFetchError)
//     .finally(() => form.reset());
// }

// function renderPocemonCard(pokemon) {
//   const markup = pokemonCardTpl(pokemon);
//   refs.cardContainer.innerHTML = markup;
// }

// function onFetchError(error) {
//   alert('Упс, мы не нашли твоего героя');
// }
// =========================================================================
// const url = 'https://newsapi.org/v2/everything?q=cars';
// const options = {
//   headers: {
//     Authorization: '',
//   },
// };
// fetch(url, options)
//   .then(r => r.json())
//   .then(console.log);
