// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

//Displays the fav and nah buttons
const showPreferBtns = () => {
    const preferBtns = document.getElementsByClassName('prefer');
    for (const preferBtn of preferBtns) {
        preferBtn.removeAttribute('hidden')
    }
}


// Clear the current movie from the screen
const clearCurrentMovie = () => {
    
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    
}

const likedMovies = [];
const dislikedMovies = [];

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = (movieInfo) => {
    if (!likedMovies.some(movie => movie.id === movieInfo.id)) {
        likedMovies.push(movieInfo)
    };
    showPreferBtns();
    clearCurrentMovie();
    showRandomMovie();
    
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = (movieInfo) => {
    if (!dislikedMovies.some(movie => movie.id === movieInfo.id)) {
        dislikedMovies.push(movieInfo)
    };
    showPreferBtns();
    clearCurrentMovie();
    showRandomMovie();
    
};

console.log(likedMovies);
console.log(dislikedMovies);

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

//create HTML for movie release date
const createReleasedate = (releaseDate) => {
  const releaseDateLine = document.createElement('p');
  releaseDateLine.setAttribute('id','movieRelease');
  releaseDateLine.innerHTML = releaseDate;

  return releaseDateLine;
  
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};



// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const releaseDate = createReleasedate(movieInfo.release_date);
    const overviewText = createMovieOverview(movieInfo.overview);
    
  
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(releaseDate);
    movieTextDiv.appendChild(overviewText);
  
    showBtns();
    likeBtn.onclick = () => likeMovie(movieInfo);
    dislikeBtn.onclick = () => dislikeMovie(movieInfo);
    

    
};


//clicking fav button displays liked movies

const displayFavs = () => {
    clearCurrentMovie();
    for (const movie of likedMovies) {
        displayMovie(movie);
    }
}

const favBtn = document.getElementById('favBtn')

favBtn.onclick = displayFavs;




//clicking nah button displays dislikedmovies 
const displayNahs = () => {
    clearCurrentMovie();
    for (const movie of dislikedMovies) {
        displayMovie(movie)
    }
}

const nahBtn = document.getElementById('nahBtn')

nahBtn.onclick = displayNahs;


    