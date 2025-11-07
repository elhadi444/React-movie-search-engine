import { createContext, useState, useEffect, useContext, use } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites, loaded]);

    const addFavorite = (movie) => {
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }

    const removeFavorite = (movieId) => {
        setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };

    return (        
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}