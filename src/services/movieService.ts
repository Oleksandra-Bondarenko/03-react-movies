import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
}

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<TMDBResponse>("/search/movie", {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  return data.results;
};
