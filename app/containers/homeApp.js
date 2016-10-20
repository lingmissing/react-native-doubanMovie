import React, {Component} from 'react';
import Home from '../components/Home'
import MovieListApp from './movieListApp'
import GoodMovieApp from './goodMovieApp'
import MovieDetailApp from './movieDetailApp'

class HomeApp extends Component {
  render() {
    return (
      <Home 
        navigator={this.props.navigator}
        MovieListApp={MovieListApp}
        GoodMovieApp={GoodMovieApp}
        MovieDetailApp={MovieDetailApp}
      />
    );
  }
}

export default HomeApp;