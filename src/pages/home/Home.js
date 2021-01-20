import React, {useEffect, useState} from "react";
import {FilmList} from "../../components";
import {moviesService, genresService} from '../../services';
import  styles from './Home.module.css';
import {useHistory} from "react-router-dom";

const PaginationWrapper = ({children, currentPage, totalPages, onPrevClick,
                               onNextClick, handleLastPage, handleFirstPage}) => {

    const handleNextClick = () => {
        if (currentPage + 1 <= totalPages) {
            onNextClick && onNextClick(currentPage + 1)
        }
    }

    const handlePrevClick = () => {
        if (currentPage - 1 > 0) {
            onPrevClick && onPrevClick(currentPage - 1)
        }
    }

    const handleLastPageClick = () => {
        handleLastPage && handleLastPage(totalPages)
    }

    const handleFirstPageClick = () => {
        handleFirstPage && handleFirstPage(1)

    }


    return (
        <div>
            <button disabled={currentPage === 1} onClick={handleFirstPageClick}>first page</button>
            <button disabled = {currentPage - 1 === 0} onClick={handlePrevClick}>prev page</button>
            <span>{currentPage} of {totalPages}</span>
            <button disabled={currentPage + 1 > totalPages} onClick={handleNextClick}>next page</button>
            <button disabled={currentPage === totalPages} onClick={handleLastPageClick}>last page</button>


            {children}
        </div>
    )
}


export const Home = () => {
    const history = useHistory();
    const [moviesList, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [genresList, setGenresList]= useState([]);

    const fetchMovies = async (params) => {
        try {
            const {results, page, total_pages, total_results} = await moviesService.getMovies(params);
            setMovieData({ page, total_pages, total_results})

            return results;
        } catch (e) {
            console.error(e);

        }
    }

    const fetchGenres = async () => {

       try {
           const {genres} = await genresService.getGenres();

           return genres;
    } catch (e) {
           console.error(e)
       }
    }

    const fetchMoviesData = async (movieParams) => {
        const requests = genresList.length ? [fetchMovies(movieParams)] : [fetchMovies(movieParams), fetchGenres()];

        try {
            setIsLoading(true);
            const [movies, genres = genresList] = await Promise.all(requests)
            // console.log({movies, genres});

            const mergedWithGenresMovies = movies.map((movie) => {
                const {genre_ids} = movie;
                const movieGenresList = genre_ids.map(genreId => genres.find(el => el.id === genreId ))
                return {...movie, movieGenresList }
            })

            // console.log(mergedWithGenresMovies);
            setMoviesList(mergedWithGenresMovies);
            setGenresList(genres);

        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMoviesData()
    },[])

    const renderLoadingIndicator = () => (
        <div className={styles.loading}> Loading...</div>
    )

    const onFilmClick = (film) => {
        history.push(`/movie/${film.id}`)
    }


    const handlePageChange = (page) => {
        fetchMoviesData({page})
    }

    return(
        <div>
            {/*{ true ? renderLoadingIndicator() :  <FilmList/> }*/}

            { isLoading || isLoading === null ? renderLoadingIndicator() : (
               <PaginationWrapper
                   currentPage ={movieData.page}
                   totalPages = {movieData.total_pages}
                   onPrevClick = {handlePageChange}
                   onNextClick = {handlePageChange}
                   handleLastPage = {handlePageChange}
                   handleFirstPage = {handlePageChange}
               >
                   <FilmList
                       onFilmClick = {onFilmClick}
                       items={moviesList}  />
               </PaginationWrapper>
            )}
        </div>
    )
}