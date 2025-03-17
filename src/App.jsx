import Search from "./Components/Search.jsx";
import React, { useEffect, useState } from "react";
import Spinner from "./Components/Spinner.jsx";
import MovieCard from "./Components/MovieCard.jsx";
import { useDebounce } from "react-use";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const options2 = {
  method: "GET",
  headers: {
    'x-rapidapi-key': `${AI_API_KEY}`,
    'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com',
  },
};

function App() {
  const [error, setError] = useState('');
  const [search, set_search] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [debounce, setDebounce] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [aimovies, setAiMovies] = useState([]);
  const [errorAI, setErrorAI] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  useDebounce(() => setDebounce(search), 1000, [search]);

  // Fetch Movie Section
  const Fetch_movie = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const endpoint = query
          ? `https://api.themoviedb.org/3/search/movie?query=${query}`
          : `${API_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error("Could not find movie?");
      }

      const movies_data = await response.json();
      console.log(movies_data);

      if (movies_data.Response === "Failed") {
        setError(movies_data.Error || 'Failed to fetch movies');
        setMovies([]);
        return;
      }

      setMovies(movies_data.results);

    } catch (err) {
      console.error(`Error fetching movie: ${err}`);
      setError(`Error fetching movie: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Fetch_movie(debounce);
  }, [debounce]);

  // Trending Movie Section
  const TrendingMovies = async () => {
    setError("");
    setLoading(true);

    try {
      const trend_endpoint = `${API_URL}/trending/movie/day?language=en-US`;
      const trend_response = await fetch(trend_endpoint, options);

      if (!trend_response.ok) {
        throw new Error("Couldn't fetch trending movies.");
      }

      const trend_data = await trend_response.json();
      console.log("Trending Movies:", trend_data);

      setTrendingMovies(trend_data.results);

    } catch (err) {
      console.error(`Error fetching trending movies: ${err}`);
      setError(`Error fetching trending movies: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TrendingMovies();
  }, []); // Runs once when component mounts

  // AI Recommendation Section
  const Ai_recommendation = async (query = "") => {
    setErrorAI('');
    setLoadingAI(true);

    try {
      const Ai_recom_endpoint = `https://ai-movie-recommender.p.rapidapi.com/api/search?q=${query}`;
      const ai_response = await fetch(Ai_recom_endpoint, options2);

      if (!ai_response.ok) {
        throw new Error("Couldn't fetch AI movies.");
      }

      const ai_data = await ai_response.json();
      console.log('AI Recommendation Data:', ai_data);

      if (ai_data && ai_data.results) {
        setAiMovies(ai_data.results);
      } else {
        setAiMovies([]);
      }
    } catch (err) {
      console.error(`Error fetching AI movies: ${err}`);
      setErrorAI(`Error fetching AI movies: ${err}`);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    if (debounce.trim() !== "") {
      console.log('Debounced Search Query:', debounce);
      Ai_recommendation(debounce);
    }
  }, [debounce]);

  return (
      <>
        <div className="pattern w-full">
          <div className="wrapper">
            <header className="header">
              <img src="src/assets/hero-img.png" alt="Hero" />
              <h1>Find <span className="text-gradient">Movies</span>. You'll Enjoy Without the Hassle</h1>
              <Search search={search} set_search={set_search} />
            </header>

            {/* AI Recommendation Section */}
            <section className="trending">
              <h2 className="text-white">AI Recommendation</h2>
              {loadingAI ? (
                  <Spinner />
              ) : errorAI ? (
                  <p className="text-red-500">{errorAI}</p>
              ) : Array.isArray(aimovies) && aimovies.length > 0 ? (
                  <ul>
                    {aimovies.map((movie, index) => (
                        <li key={movie.id}>
                          <p>{index + 1}</p>
                          {movie.poster_path ? (
                              <img
                                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                  alt={movie.title}
                              />
                          ) : (
                              <p>No Image Available</p>
                          )}
                          <p>{movie.title}</p> {/* Display the movie title */}
                        </li>
                    ))}
                  </ul>
              ) : (
                  <p className="text-white">No AI recommendations found.</p>
              )}
            </section>

            {/* Trending Movies Section */}
            <section className="trending">
              <h2 className="text-white">Trending Movies of this Week</h2>
              {loading ? (
                  <Spinner />
              ) : error ? (
                  <p className="text-red-500">{error}</p>
              ) : (
                  <ul>
                    {trendingMovies.map((movie, index) => (
                        <li key={movie.id}>
                          <p>{index + 1}</p>
                          <img
                              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                              alt={movie.title}
                          />
                        </li>
                    ))}
                  </ul>
              )}
            </section>

            {/* All Movies Section */}
            <section className="all-movies">
              <h2 className="mt-4">All Movies</h2>
              {loading ? (
                  <Spinner />
              ) : error ? (
                  <p className="text-red-500">{error}</p>
              ) : (
                  <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                          <MovieCard movie={movie} />
                        </li>
                    ))}
                  </ul>
              )}
            </section>
          </div>
        </div>
      </>
  );
}

export default App;
