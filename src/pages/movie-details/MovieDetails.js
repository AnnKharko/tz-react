import React, {useEffect, useState} from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import {moviesService} from "../../services";
import styles from './MovieDetails.module.css'

export const MovieDetails = () => {
    // const {params: {id}} = useRouteMatch();
    const [filmDetails, setFilmDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {id, ...rest} = useParams();
    console.log(id, rest);

   const getMovieDetails = async() => {
       try {
           setIsLoading(true);
           const data = await moviesService.getMovieDetailById(id)
           setFilmDetails(data)
       } catch (e) {
           console.error(e)
       } finally {
           setIsLoading(false)
       }
    }

    useEffect(() => {
        getMovieDetails()
    },[])

    if ((isLoading && !filmDetails) || isLoading === null) {
        return <div>loading...</div>
    }

    return (
        <div className={styles.details}>
            <div className={styles.image}>
                <img src={`https://image.tmdb.org/t/p/w300${filmDetails.poster_path}`} alt={`${filmDetails.original_title} poster`}/>

            </div>
            <h1>{filmDetails.original_title}</h1>
            <h2>{filmDetails.genres.map(el => <span key={el.id}>{el.name} -</span>)}</h2>
            <h3>{filmDetails.tagline}</h3>
            <p>{filmDetails.overview}</p>
        </div>
    )
}