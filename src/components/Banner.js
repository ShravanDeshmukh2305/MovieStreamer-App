
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner() {
  const [bannerImage, setBannerImage] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1'
        );
        const movieList = response.data.results;
        if (movieList.length > 0) {
          setMovies(movieList);
          setBannerImage(`https://image.tmdb.org/t/p/original${movieList[0].backdrop_path}`);
          setMovieTitle(movieList[0].title);
        }
      } catch (error) {
        console.error('Failed to fetch upcoming movies', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % movies.length;
        setBannerImage(`https://image.tmdb.org/t/p/original${movies[newIndex].backdrop_path}`);
        setMovieTitle(movies[newIndex].title);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [movies]);

  return (
    <div
      className='h-[20vh] md:h-[60vh] bg-center bg-no-repeat flex items-end'
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className='text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 text-white text-center w-full'>
        {movieTitle || 'Loading...'}
      </div>
    </div>
  );
}

export default Banner;
