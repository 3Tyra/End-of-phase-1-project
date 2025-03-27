const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const sortBtn = document.getElementById('sort-btn');
const animeList = document.getElementById('anime-list');
const animeDetails = document.getElementById('anime-details');


searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchAnimeData(query);
    }
});


genreFilter.addEventListener('change', () => {
    const genre = genreFilter.value;
    filterByGenre(genre);
});


