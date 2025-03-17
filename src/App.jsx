import Search from "./Components/Search.jsx";
import React, {useEffect, useState} from "react";
import Spinner from "./Components/Spinner.jsx";
import MovieCard from "./Components/MovieCard.jsx";
import {useDebounce} from "react-use";




const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
};



function App() {

  const [error, setError] = useState('');
  const [search, set_search] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
const [debounce, setDebounce] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);


  useDebounce(()=> setDebounce(search), 500 , [search])


  const Fetch_movie = async (query="") =>{

    setLoading(true);
    setError("")
    try {
      const endpoint = query ? `https://api.themoviedb.org/3/search/movie?query=${query}` : `${API_URL}/discover/movie?language=en-US&page=1&sort_by=popularity.desc `;
      const response = await fetch(endpoint, options );

      if (!response.ok) {
        throw new Error("Could not find movie?");
      }

      const movies_data = await response.json();
      console.log(movies_data);

   if(movies_data.Response === "Failed"){
     setError(movies_data.Error || 'Failed to fetch movies');
     setMovies([]);
     return;

   }

   setMovies(movies_data.results);

    }catch(err){
      console.error(`Error fetching movie: ${err}`);
      setError(`Error fetching movie: ${err}`);

    }finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    Fetch_movie(debounce);
  },[debounce]);

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

      setTrendingMovies(trend_data.results);  // ✅ Store in state

    } catch (err) {
      console.error(`Error fetching trending movies: ${err}`);
      setError(`Error fetching trending movies: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    TrendingMovies();
  }, []); // ✅ Runs once when component mounts



  return (
    <>
    <div className="pattern w-full">
      <div className="wrapper">
        <header className="header">
          <img src="src/assets/hero-img.png"/>
          <h1 className=""> Find <span className="text-gradient">Movies</span> . You'll Enjoy Without the Hassel </h1>
      <Search search={search} set_search={set_search} />
        </header>
        <section className="trending">
          <h2 className="mt-4">Trending Movies of this week</h2>
          {loading ? (
              <Spinner />
          ) : error ? (
              <p className="text-red-500">{error}</p>
          ) : (
              <ul>
                {trendingMovies.map((movie , index) => (
                    <li key={movie.id}  >
                     <p>{index+1}</p>
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` } />

                    </li>
                ))}
              </ul>
          )}


        </section>

        <section className="all-movies">
        <h2 className="mt-4">All Movies</h2>
          {loading ? (
              <Spinner />
          ):error ? (
              <p className="text-red-500">{error}</p>
          ):(
              <ul>
                {movies.map((movie) => (
                    <li>
                      <MovieCard key = {movie.id} movie={movie} />

                    </li>

                ))}

              </ul>
          )
          }

        </section>

      </div>
    </div>
    </>
  )
}

export default App
