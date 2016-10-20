import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  RefreshControl
} from 'react-native'
import StarRating from 'react-native-star-rating'

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f9f9f9'
  },
  movieItemImg: {
    width: 70,
    height: 100
  },
  movieItemDetail: {
    flex: 1,
    paddingLeft: 10
  },
  averageBox: {
    paddingTop: 5,
    flex: 1,
    height: 20,
    flexDirection: 'row'
  },
  starRating: {
    flex: 1,
    height: 20
  },
  average: {
    width: 20,
    height: 20,
    fontSize: 12
  },
  movieItemTitle: {
    fontSize: 16,
    color: '#333'
  },
  movieItemText: {
    fontSize: 12,
    paddingTop: 5,
    color: '#ccc'
  }
})

class MovieList extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      isRefreshing: false,
      movieList: ds.cloneWithRows([])
    }
  }
   _onRefresh() {
     console.log('fresh');
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        isRefreshing: false,
      });
    }, 3000);
  }
  componentWillMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const { type } = this.props
    fetch(`https://api.douban.com/v2/movie/${type}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          movieList: ds.cloneWithRows(responseJson.subjects)
        });
        console.log(responseJson.subjects);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  goDetail(type,title) {
    const props = this.props
    props.navigator.push({
      component: this.props.MovieDetailApp,
      passProps: {type: type},
      title: title,
      tintColor: '#5dc2af'
    })
  }
  renderMovieItem(rowData) {
    const directors = []
    rowData.directors.map(item => directors.push(item.name))
    const casts = []
    rowData.casts.map(item => casts.push(item.name))
    const average = rowData.rating.average / 2
    let numberShow = <View style={styles.averageBox}>
                          <StarRating 
                            starColor='#f7bd4e'
                            maxStars={5}
                            starSize={10}
                            rating={average}
                            selectedStar={() => false}
                            style={styles.starRating}
                          />
                          <Text style={styles.average}>{rowData.rating.average}</Text>
                        </View>
    if(this.props.type !== 'in_theaters') {
      numberShow =  <Text style={styles.movieItemText}>{rowData.collect_count}人想看</Text>
    }
    console.log(numberShow);
    return <TouchableHighlight onPress={() => this.goDetail(rowData.id,rowData.title)}>
            <View style={styles.movieItem} key={rowData.title}>
                <Image source={{uri: rowData.images.medium}} style={styles.movieItemImg} />
                <View style={styles.movieItemDetail}>
                  <Text style={styles.movieItemTitle}>{rowData.title}</Text>
                  {numberShow}
                  <Text style={styles.movieItemText}>导演：{directors.join('/')}</Text>
                  <Text style={styles.movieItemText}>演员：{casts.join('/')}</Text> 
                </View>
              </View>
           </TouchableHighlight>
  }
  
  render() {
    return (
      <ListView
        dataSource={this.state.movieList}
        renderRow={(rowData) => this.renderMovieItem(rowData)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._onRefresh()}
            tintColor="#ccc"
            title="Loading..."
            titleColor="#ccc"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }
      />
    );
  }
}

export default MovieList