const elForm = document.querySelector(".site-form");
const elInp = document.querySelector(".name-input");
const elSelect = document.querySelector(".type-select");
const elBtnSearch = document.querySelector(".search-btn");
const elList = document.querySelector(".movies-list");
const elTemplate = document.querySelector(".movie-template").content;

const movie_url = "https://www.omdbapi.com/?apikey=feac457b&s=";

elForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = elInp.value.trim();
    const selectType = elSelect.value;

    if (inputValue) {
        fetchMovies(inputValue, selectType);
    } else {
        alert("Please enter a movie name!");
    }
});

function fetchMovies(movieName, movieType) {
    const url = `${movie_url}${movieName}${movieType ? `&type=${movieType}` : ''}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                renderMovies(data.Search);
            } else {
                alert("No movies found.");
                elList.innerHTML = '';
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
}

function renderMovies(movies) {
    elList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = elTemplate.cloneNode(true);
        movieItem.querySelector(".movie-img").src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300";
        movieItem.querySelector(".movie-img").alt = movie.Title;
        movieItem.querySelector(".movie-title").textContent = movie.Title;
        movieItem.querySelector(".movie-year span").textContent = movie.Year;
        movieItem.querySelector(".movie-type").textContent = movie.Type;
        movieItem.querySelector(".link-imdb").href = `https://www.imdb.com/title/${movie.imdbID}`;
        movieItem.querySelector(".link-imdb").textContent = "IMDB link";

        elList.appendChild(movieItem);
    });
}
