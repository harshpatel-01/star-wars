let title;
let release_date;
let director;
let episode;
let characters;
let planets;

const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('h1#title');
  release = document.querySelector('span#release_date');
  director = document.querySelector('span#director');
  episode = document.querySelector('span#episode_id');
  characters = document.querySelector('span#charactersList');
  planets = document.querySelector('ul#planetsList');

  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getFilm(id);
});

async function fetchPlanets(id) {
  let planetUrl = `${baseUrl}/films/${id}/planets`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
  let charUrl = `${baseUrl}/films/${id}/characters`;
  return await fetch(charUrl)
    .then(res => res.json())
}


async function getFilm(id) {
  let film;
  let characters;
  let planets;
  try {
    film = await fetchFilm(id);
    characters = await fetchCharacters(id);
    planets = await fetchPlanets(id);
    renderFilm(film);
    renderCharacters(characters);
    renderPlanets(planets);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }

}

const renderFilm = film => {
  title.textContent = film?.title;
  release.textContent = film?.release_date;
  director.textContent = film?.director;
  episode.textContent = film?.episode_id;
}


const renderCharacters = character => {
  characters.innerHTML = '';

  character.forEach(character => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="/character.html?id=${character?.id}">${character?.name}</a>`;
    characters.appendChild(li);
  });
}


const renderPlanets = p => {
  planets.innerHTML = '';

  p.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="/planet.html?id=${p?.id}">${p?.name}</a>`;
    planets.appendChild(li);
  });
}
