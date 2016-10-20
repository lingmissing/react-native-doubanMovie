import React, {Component} from 'react'
import MovieList from '../components/MovieList'
import MovieDetailApp from './movieDetailApp'

class MovieListApp extends Component {
  render() {
    console.log(this.props);
    const { navigator,type } = this.props
    return (
      <MovieList 
        navigator={navigator}
        type={type}
        MovieDetailApp={MovieDetailApp}
      />
    );
  }
}

export default MovieListApp