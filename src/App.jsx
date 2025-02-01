import Search from './components/Search.jsx';
import { useEffect, useState } from "react";
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setLoading(true);
        setErrorMessage('');
        try {
            const endpoint = query ? 
                `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'No movies found matching your search');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <main>
            <div className='pattern' />
            <div className='wrapper'>
                <header>
                    <img src='../hero.png' alt='hero' />
                    <h1>Find <span className='text-gradient'>Movies</span>You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                <section className='all-movies'>
                    <h2 className='mt-[20px]'>All Movies</h2>
                    {loading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}

export default App;