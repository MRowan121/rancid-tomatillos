import React, { Component } from 'react';
import { getAllData } from '../../Utilities/apiCalls';
import CurrentMovie from '../CurrentMovie/CurrentMovie';
import Movies from '../Movies/Movies';
import Nav from '../Nav/Nav';
import { Route } from 'react-router-dom'
import './App.css';

interface MovieObj {
  average_rating: number,
  backdrop_path: string,
  id: number,
  poster_path: string,
  release_date: string,
  title: string
}

type MyState = {
  movies: MovieObj[],
  currentMovie: string,
  error: string
}

class App extends Component<{}, MyState> {
  state: MyState = {
    movies: [],
    currentMovie: '',
    error: ''
  }

  componentDidMount(): void {
    getAllData('/movies')
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error: `${error}`}))
  }

  render() {
    return(
      <main className='app'>
        <Route exact path='/' render={() => {
          return(
            <div>
              <Nav movies={this.state.movies} />
              <Movies movies={this.state.movies} />
            </div>
          )
        }}/>
        <Route exact path='/:movieId' render={({ match }) => {
          let id = parseInt(match.params.movieId)
          return <CurrentMovie currentMovieId={String(id)} />
        }}/>
      </main>
    )
  }
}

export default App;