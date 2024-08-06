import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=81f382d33088c6d52099a62eab51d967&language=en-US`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {/* Movie Banner */}
      <div className="card bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          alt={movie.title} 
          className="w-full h-auto max-h-96 object-cover rounded-lg" 
        />
        <div className="mt-4 text-center">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <button className="mt-2 bg-blue-500 text-white p-2 rounded">Play Now</button>
        </div>
      </div>

      {/* Movie Description */}
      <div className="card mt-4 bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p>{movie.overview}</p>
      </div>

      {/* Movie Info */}
      <div className="card mt-4 bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Info</h2>
        
        {/* Release Year */}
        <div className="flex flex-col mb-4">
          <p className="font-semibold">Release Year:</p>
          <p>{movie.release_date.split('-')[0]}</p>
        </div>

        {/* Available Languages */}
        <div className="flex flex-col mb-4">
          <p className="font-semibold">Available Languages:</p>
          <p className="flex flex-wrap gap-2">
            {movie.spoken_languages.map(lang => (
              <span key={lang.iso_639_1} className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                {lang.name}
              </span>
            ))}
          </p>
        </div>

        {/* Ratings */}
        <div className="flex flex-col mb-4">
          <p className="font-semibold">Ratings:</p>
          <div className="flex flex-col mt-2">
            <div className="flex items-center mb-2">
              <p className="mr-2"><strong>IMDb:</strong></p>
              <div className="flex">
                {/* Example Star Ratings - Adjust based on actual rating */}
                {[...Array(7)].map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21 16.54 14.69 22 10.27H14.81L12 4.55 9.19 10.27H2L7.46 14.69 5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-2"><strong>Streamvibe:</strong></p>
              <div className="flex">
                {/* Example Star Ratings - Adjust based on actual rating */}
                {[...Array(5)].map((_, index) => (
                  <svg key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21 16.54 14.69 22 10.27H14.81L12 4.55 9.19 10.27H2L7.46 14.69 5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-col">
          <p className="font-semibold">Genres:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres.map(genre => (
              <span key={genre.id} className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
