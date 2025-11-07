import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Your Favorite Movies</h2>
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="favorites-empty">
                <h2>Your favourites list is empty</h2>
                <p>Add some movies to your favourites to see them here.</p>
            </div>
        );
    }


}