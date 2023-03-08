import React, { Component } from "react";
import { getAllData } from "../../Utilities/apiCalls";
import backBtn from '../../Assets/backbutton.png'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'
import './CurrentMovie.css'

interface MovieObj {
    id: number,
    title: string
    poster_path:string,
    backdrop_path: string,
    release_date: string,
    overview: string,
    genres: string[],
    budget: number,
    revenue: number,
    runtime: number,
    tagline: string,
    average_rating: number,
  }

interface VideoObj {
    id: number,
    movie_id: number,
    key: string,
    site: string,
    type: string
}

type MyProps = {
    currentMovieId: string,
}

type MyState = {
    currentMovie: MovieObj,
    movieTrailer: VideoObj,
    error: string,
}

class CurrentMovie extends Component<MyProps, MyState> {
    state:MyState = {
        currentMovie: {} as MovieObj,
        movieTrailer: {} as VideoObj,
        error: '',
    }

    componentDidMount(): void {
        getAllData(`/movies/${this.props.currentMovieId}`)
            .then(data => this.setState({ currentMovie: data.movie }))
            .catch(error => this.setState({ error: `${error} displaying this movie.` }))
        getAllData(`/movies/${this.props.currentMovieId}/videos`)
            .then(data => {
                let trailer = data.videos.find((video: VideoObj) => video.type === 'Trailer')
                this.setState({ movieTrailer: trailer === undefined ? '' : trailer })
            })
            .catch(error => this.setState({ error: `${error} displaying this trailer.` }))
    }

    render() {

        const currentMovieStyle = {
            backgroundImage: `url(${this.state.currentMovie.backdrop_path})`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }

        const toHoursAndMinutes = (totalMinutes: number) => {
            const minutes = totalMinutes % 60;
            const hours = Math.floor(totalMinutes / 60);
        
            return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
        }

        // getting weird error in dev tools when clicking on trailer button. Maybe look at embedding video instead
        const trailerPath = `https://www.youtube.com/watch?v=${this.state.movieTrailer.key}`

        const updatedRating = this.state.currentMovie.average_rating/2

        return (
            <div 
                className="current-movie" 
                style={currentMovieStyle}
            >
                <aside className="left-section">
                    <Link to='/' className='button-wrapper'>
                        <img className="back-button" src={backBtn} alt="backbutton" />
                    </Link>
                    <section>
                        <div className='movieDetails'>
                            <p>{String(this.state.currentMovie.genres).split(",").join(" | ")}</p>
                            <p>{toHoursAndMinutes(this.state.currentMovie.runtime)}</p>
                        </div>
                        <p className='title'>{this.state.currentMovie.title} ({String(this.state.currentMovie.release_date).slice(0,4)})</p>
                        <div className='star-ratings'>
                            <ReactStars
                                className='star-ratings'
                                count={5}
                                value={updatedRating}
                                half={true}
                                size={20}
                                color2={'#ffd700'}
                                edit={false}
                            />
                        </div>
                        <p className='overview'>{this.state.currentMovie.overview}</p>
                        <a href={trailerPath}>
                            <button className='trailer-btn'><span className="text">See Trailer</span></button>
                        </a>
                    </section>
                </aside>
            </div>
        )
    }
}

export default CurrentMovie