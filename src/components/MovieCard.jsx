import "../css/MovieCard.css";  
import {useMovieContext} from "../contexts/MovieContext";


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {

    const { addFavorite, removeFavorite, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);
  
    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    }

    return (
    <div className="movie-card">
        <div className="movie-poster">
            <img src={IMAGE_BASE_URL+`/${movie.poster_path}`} alt={movie.title} />    
            <div className="movie-overlay">
                <button className="favorite-btn" onClick={onFavoriteClick}>{favorite? "❤️" : "🤍"}</button>
            </div>
        </div> 
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>Year: {movie.release_date.split('-')[0]}</p>
            <p>Rating: {Math.round(movie.vote_average*10)}%</p>
        </div>   
    </div>
  );
}