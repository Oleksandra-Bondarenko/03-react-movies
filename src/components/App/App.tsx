import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import css from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    async function getMovies() {
      try {
        setMovies([]);
        setIsLoading(true);
        setHasError(false);

        const data = await fetchMovies(query);

        if (!data.length) {
          toast.error("No movies found for your request.");
          return;
        }

        setMovies(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query]);

  const handleSubmit = (value: string) => {
    setQuery(value);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {hasError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
