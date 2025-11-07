import MovieCard from "../components/MovieCard";
import { useState, useEffect, use } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";


export default function Home() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                console.log("Fetched popular movies:", popularMovies);
                setMovies(popularMovies);
            } catch (error) {
                setError(error);
                console.error("Error fetching popular movies:", error);
            } finally {
                setLoading(false);
                console.log("Finished fetching popular movies.");
            }
        }
        loadPopularMovies();
    }, [searchQuery === "" ]);


    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchQuery.trim() === "") return;
        if (loading) return;

        setLoading(true);

        try {    
            const searchedMovies = await searchMovies(searchQuery);
            console.log("Searched movies:", searchedMovies);
            setMovies(searchedMovies);
            setError(null);
        } catch (error) {
            setError(error);
            console.error("Error searching movies:", error);
        } finally {
            setLoading(false);
        }

        //setSearchQuery("");
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error">Error: {error.message}</div>}

            {loading ? <div className="loading">Loading movies...</div> :
                <div className="movies-grid">
                    {movies.map((movie) => (
                        movie.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) &&
                        movie.poster_path &&
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            }

        </div>
    );

}