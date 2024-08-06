import React, { useState, useEffect } from "react";

function WatchList() {
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [rating, setRating] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  const genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    const moviesFromLocalStorage = JSON.parse(localStorage.getItem("imdb")) || [];
    setFavourites(moviesFromLocalStorage);
  }, []);

  useEffect(() => {
    const temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    const uniqueGenres = ["All Genres", ...new Set(temp)];
    setGenres(uniqueGenres);
  }, [favourites]);

  const filteredArray = favourites
    .filter((movie) =>
      currGenre === "All Genres" ? true : genreids[movie.genre_ids[0]] === currGenre
    )
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchStr.toLowerCase())
    )
    .sort((a, b) => {
      if (rating === 1) return a.vote_average - b.vote_average;
      if (rating === -1) return b.vote_average - a.vote_average;
      return 0;
    });

  const handleDelete = (movie) => {
    const updatedFavourites = favourites.filter((m) => m.id !== movie.id);
    setFavourites(updatedFavourites);
    localStorage.setItem("imdb", JSON.stringify(updatedFavourites));
  };

  return (
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`m-2 text-lg p-1 px-2 ${currGenre === genre ? "bg-blue-400" : "bg-gray-400 hover:bg-blue-400"} text-white rounded-xl font-bold`}
            onClick={() => setCurrGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-center">
        <input
          type="text"
          className="border bg-gray-200 border-4 text-center p-1 m-2"
          placeholder="Search for Movies"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    className="mr-1 cursor-pointer"
                    onClick={() => setRating(rating === 1 ? 0 : 1)}
                    alt="Sort Up"
                  />
                  <div>Ratings</div>
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    className="ml-1 cursor-pointer"
                    onClick={() => setRating(rating === -1 ? 0 : -1)}
                    alt="Sort Down"
                  />
                </div>
              </th>
              <th className="px-6 py-4">Popularity</th>
              <th className="px-6 py-4">Genre</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {filteredArray.map((movie) => (
              <tr key={movie.id} className="hover:bg-gray-50">
                <td className="flex items-center px-6 py-4 font-normal text-gray-900 space-x-2">
                  <img
                    className="h-[6rem] w-[10rem] object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="font-medium text-gray-700 text-sm">
                    {movie.title}
                  </div>
                </td>
                <td className="pl-6 py-4">{movie.vote_average}</td>
                <td className="pl-6 py-4">{movie.popularity}</td>
                <td className="py-4">{genreids[movie.genre_ids[0]]}</td>
                <td className="py-4">
                  <button className="text-red-600" onClick={() => handleDelete(movie)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
