import React, {Component} from 'react'
import GoodMovie from '../components/GoodMovie'
import MovieDetailApp from './movieDetailApp'

class GoodMovieApp extends Component {
  render() {
    console.log(this.props);
    const { navigator,type } = this.props
    return (
      <GoodMovie 
        navigator={navigator}
        type={type}
        MovieDetailApp={MovieDetailApp}
      />
    );
  }
}

export default GoodMovieApp