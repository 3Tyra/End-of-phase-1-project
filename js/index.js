const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');


const genreFilter = document.getElementById('genre-filter');


const sortBtn = document.getElementById('sort-btn');


const animeList = document.getElementById('anime-list');
const animeDetails = document.getElementById('anime-details');


searchBtn.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query !== "") {
        fetchAnimeData(query);
    }
});


function fetchAnimeData(query) {
    fetch(`https://api.jikan.moe/v4/anime?q=naruto`)
        .then(response => response.json())
        .then(data => {
            displayAnimeList(data.data);
        })
        .catch(function(error) {
            console.log('Error fetching anime data:', error);
        });
}


genreFilter.addEventListener('change', function() {
    const genre = genreFilter.value;
    filterByGenre(genre);
});


function filterByGenre(genre) {
    const allAnimeCards = document.querySelectorAll('.anime-card');
    allAnimeCards.forEach(function(card) {
        const cardGenres = card.dataset.genres;
        if (cardGenres.includes(genre) || genre === "All") {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}



sortBtn.addEventListener('click', function() {
    sortByRating();
});


function sortByRating() {
    const animeCards = Array.from(animeList.children);
    animeCards.sort(function(a, b) {
        const ratingA = parseFloat(a.querySelector('.rating').innerText);
        const ratingB = parseFloat(b.querySelector('.rating').innerText);
        return ratingB - ratingA;  
    });

    animeList.innerHTML = '';  
    animeCards.forEach(function(card) {
        animeList.appendChild(card);
    });
}


function displayAnimeList(animeData) {
    animeList.innerHTML = '';  
    animeData.forEach(function(anime) {
        const animeCard = document.createElement('div');
        animeCard.classList.add('anime-card');
        animeCard.dataset.genres = anime.genres.map(function(genre) {
            return genre.name;
        }).join(', '); 

        animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p class="rating">Rating: ${anime.score}</p>
            <button onclick="showDetails(${anime.mal_id})">View Details</button>
        `;
        animeList.appendChild(animeCard);
    });
}


function showDetails(animeId) {
    
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(function(data) {
            const anime = data.data;  
            animeDetails.innerHTML = `
                <h2>${anime.title}</h2>
                <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                <p><strong>Rating:</strong> ${anime.score}</p>
                <p><strong>Genres:</strong> ${anime.genres.map(function(genre) {
                    return genre.name;
                }).join(', ')}</p>
                <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
                <button onclick="goBack()">Back to List</button>
            `;
            animeList.innerHTML = '';  
        })
        .catch(function(error) {
            console.log('Error fetching anime details:', error);
        });
}



function goBack() {
    animeDetails.innerHTML = '';  
    fetchAnimeData(searchInput.value.trim()); 
}


