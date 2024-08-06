import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Movies({ searchStr, searchHistory, handleSearchSubmit }) {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [watchList, setWatchList] = useState([]);
  const [hovered, setHovered] = useState('');
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(''); // Added state for selected genre
  const navigate = useNavigate();

  useEffect(() => {
    let moviesFromLS = localStorage.getItem('imdb');
    moviesFromLS = JSON.parse(moviesFromLS) || [];
    setWatchList(moviesFromLS);

    let searchHistoryFromLS = localStorage.getItem('searchHistory');
    searchHistoryFromLS = JSON.parse(searchHistoryFromLS) || [];

    // Fetch movies and genres
    fetchGenres();
    fetchMovies(pageNum);
  }, [pageNum]);

  const fetchGenres = () => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=81f382d33088c6d52099a62eab51d967&language=en-US`)
      .then(res => {
        setGenres(res.data.genres);
      });
  };

  const fetchMovies = (page) => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=${page}`)
      .then(res => {
        setMovies(prev => [...prev, ...res.data.results]);
        setLoading(false);
      });
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true);
      setPageNum(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const addToWatchList = (movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.setItem('imdb', JSON.stringify(newWatchList));
  };

  const removeFromWatchList = (movie) => {
    const filteredWatchList = watchList.filter((m) => m.id !== movie.id);
    setWatchList(filteredWatchList);
    localStorage.setItem('imdb', JSON.stringify(filteredWatchList));
  };

  const showButton = (id) => setHovered(id);
  const hideButton = () => setHovered('');

  const filteredMovies = movies
    .filter(movie =>
      (movie.title.toLowerCase().includes(searchStr.toLowerCase()) ||
      movie.overview.toLowerCase().includes(searchStr.toLowerCase())) &&
      (selectedGenre === '' || movie.genre_ids.includes(parseInt(selectedGenre)))
    );

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div>
      <div className="text-2xl mb-8 font-bold text-center">Trending Movies</div>
      
      {/* Genre Filter */}
      <div className="mb-4 text-center">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border p-2"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap">
        {filteredMovies.map((movie) => (
          <div
            onMouseOver={() => showButton(movie.id)}
            onMouseLeave={() => hideButton()}
            key={movie.id}
            className="w-[200px] h-[35vh] bg-center bg-cover rounded-xl m-4 md:h[40vh] md:w[200px] hover:scale-110 duration-300 relative flex items-end"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
            }}
            onClick={() => handleMovieClick(movie)}
          >
            <div className="text-2xl p-2 bg-gray-900 rounded-2xl absolute right-2 top-2"
              style={{ display: hovered === movie.id ? 'block' : 'none' }}>
              {!watchList.some(m => m.id === movie.id) ? (
                <div onClick={() => addToWatchList(movie)}> 😍 </div>
              ) : (
                <div onClick={() => removeFromWatchList(movie)}>❌</div>
              )}
            </div>
            <div className="text-white font-bold text-center w-full bg-gray-900 bg-opacity-60">
              {movie.title}
            </div>
            {hovered === movie.id && (
              <div className="w-full bg-gray-900 bg-opacity-75 text-white p-2">
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="loading">{loading && <>Loading...</>}</div>
    </div>
  );
}

export default Movies;

