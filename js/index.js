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


sortBtn.addEventListener('click', () => {
    sortByRating();
});


function fetchAnimeData(query) {
    fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
        .then(response => response.json())
        .then(data => displayAnimeList(data.data))
        .catch(error => console.error('Error fetching anime data:', error));
}


function displayAnimeList(animeData) {
    animeList.innerHTML = '';  
    animeData.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>Rating: ${anime.score}</p>
            <button onclick="showDetails(${anime.mal_id})">View Details</button>
        `;
        animeList.appendChild(animeCard);
    });
}


function showDetails(animeId) {
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            const anime = data.data;

            animeList.innerHTML = '';

            animeDetails.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                <p><strong>Rating:</strong> ${anime.score}</p>
                <p><strong>Genres:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
                <button onclick="goBack()">Back to List</button>
            `;
        })
        .catch(error => console.error('Error fetching anime details:', error));
}


function filterByGenre(genre) {
    const filteredAnimes = Array.from(animeList.children).filter(animeCard => {
        const animeGenres = animeCard.querySelector('p').innerText.toLowerCase();
        return genre ? animeGenres.includes(genre.toLowerCase()) : true;
    });
    animeList.innerHTML = ''; 
    filteredAnimes.forEach(animeCard => {
        animeList.appendChild(animeCard);
    });
}


function sortByRating() {
    const sortedAnimes = Array.from(animeList.children).sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('p').innerText.split(':')[1].trim());
        const ratingB = parseFloat(b.querySelector('p').innerText.split(':')[1].trim());
        return ratingB - ratingA;
    });
    animeList.innerHTML = ''; 
    sortedAnimes.forEach(animeCard => {
        animeList.appendChild(animeCard);
    });
}


function goBack() {
    animeDetails.innerHTML = '';  
    fetchAnimeData(searchInput.value.trim()); 
}

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('anime-title');
    const text = title.textContent;
    title.textContent = '';  

    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        title.appendChild(span);
    }

    setTimeout(() => {
        const spans = title.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.classList.add('show');
            span.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});

