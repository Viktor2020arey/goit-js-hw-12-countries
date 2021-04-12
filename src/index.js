import './styles.css';

import pokemonCardTpl from './templates/pokemon-cards.hbs';
import API from './api-service';
import getRefs from './refs';

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchById(searchQuery)
    .then(renderPocemonCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderPocemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, мы не нашли твоего героя');
}
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
