const API_KEY = '275e661ce4b538af3ebf583da4ba899f'
const API_BASE = 'https://api.themoviedb.org/3'

export const getPopularMovies = async () => {
    const response = await fetch(`${API_BASE}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}