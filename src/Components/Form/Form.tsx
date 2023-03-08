import React, { Component } from "react";
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

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

type MyState = {
    searched: string,
    error: string
}

class Form extends Component<MyProps, MyState> {
    state:MyState = {
        searched: '',
        error: ''
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const singleMovie = this.props.movies.find(movie => movie.title === e.target.value)
        this.setState({ searched: singleMovie === undefined ? '' : String(singleMovie.id) })
    }

    handleSubmit = () => {
        if(this.state.searched === '') {
            this.setState({ error: "Incorrect movie input"})
            swal('Movie Title Not Found', 'Please try again!', 'error');
        }
    }

    render() {
        const sortedMovies = this.props.movies.map(movie => movie).sort((a, b) => a.title.localeCompare(b.title))
        const movieTitles = sortedMovies.map(movie => {
            return (
                <option key ={movie.id}>{movie.title}</option>
            )
        })

        return (
            <form>
                <input 
                    type="text" 
                    list="titles" 
                    placeholder="Search.."  
                    name="search"
                    autoComplete="off" 
                    onChange={e => this.onChange(e)}
                    required
                />
                <datalist id="titles">
                    {movieTitles}
                </datalist>
                <Link to={`/${this.state.searched}`}>
                    <button onClick={this.handleSubmit} type="submit">Submit</button>
                </Link>
            </form>
        )
    }
}

export default Form