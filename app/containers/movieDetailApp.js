import React, {Component} from 'react'
import MovieDetail from '../components/MovieDetail'

class MovieDetailApp extends Component {
  render() {
    const { type,navigator } = this.props
    return (
     <MovieDetail 
       navigator={navigator}
       type={type}
     />
    )
  }
}

export default MovieDetailApp