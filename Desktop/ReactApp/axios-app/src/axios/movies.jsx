import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";
export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "http://www.omdbapi.com/?s=batman&apikey=2ba57b11";
  const getMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setMovies(response.data.Search);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!</h1>;
  if (!movies) return <p>검색된 데이터가 없음</p>;

  return (
    <div>
      <h1>my Movies List</h1>
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}
