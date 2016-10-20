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
  movieItemBox: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  movieItemIndex: {
    color: '#d1ba0c',
    textAlign: 'center',
    marginBottom: 10
  },
  movieItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#f9f9f9'
  },
  movieItemDetail: {
    flex: 1,
    paddingLeft: 10
  },
  movieItemImg: {
    width: 70,
    height: 100
  },
  movieItemTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10
  },
  movieItemText: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 10
  },
  averageBox: {
    flex: 1,
    flexDirection: 'row',
  },
  starRating: {
    flex: 1,
  },
  average: {
    width: 20,
    fontSize: 12,
  }
})

let index = 0
class GoodMovie extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      movieList: ds.cloneWithRows([]),
      isRefreshing: false,
      loaded: false
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
          movieList: ds.cloneWithRows(responseJson.subjects),
          loaded: true
        });
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
    index ++
    const casts = []
    rowData.casts.map(item => casts.push(item.name))
    const averageRating = rowData.rating.average / 2

    return <View style={styles.movieItemBox} key={rowData.title}>
             <Text style={styles.movieItemIndex}>—— {index} —— </Text>
             <TouchableHighlight onPress={() => this.goDetail(rowData.id,rowData.title)}>
              <View style={styles.movieItem}>
                  <Image source={{uri: rowData.images.medium}} style={styles.movieItemImg} />
                  <View style={styles.movieItemDetail}>
                    <Text style={styles.movieItemTitle}>{rowData.title}</Text>
                    <View style={styles.averageBox} key={rowData.title}>
                      <StarRating 
                        starColor='#f7bd4e'
                        maxStars={5}
                        starSize={10}
                        rating={averageRating}
                        selectedStar={() => false}
                        style={styles.starRating}
                      />
                      <Text style={styles.average}>{rowData.rating.average}</Text>
                    </View>
                    <Text style={styles.movieItemText}>{casts.join('/')}/{rowData.genres.join('/')}/{rowData.year}</Text>
                  </View>
              </View>
             </TouchableHighlight>
           </View>
          
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

export default GoodMovie;