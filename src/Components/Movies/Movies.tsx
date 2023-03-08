import React from "react";
import Card from "../Card/Card";
import './Movies.css'

interface MovieObj {
    average_rating: number,
    backdrop_path: string,
    id: number,
    poster_path: string,
    release_date: string,
    title: string
}

type MyProps = {
    movies: MovieObj[]
}

const Movies: React.FC<MyProps> = ({ movies }) => {
    
    const sortedMovies = movies.map(movie => movie).sort((a, b) => a.title.localeCompare(b.title))    

    const moviePoster = sortedMovies.map(movie => {
        return (
            <Card
                image={movie.poster_path}
                title={movie.title}
                id={movie.id}
                key={movie.id}
            />
        )
    })

    return(
        <div className="movieContainer">
            {moviePoster}
        </div>
    )
}

export default Movies