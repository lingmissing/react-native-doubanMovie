import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import StarRating from 'react-native-star-rating'

const styles = StyleSheet.create({
  detailBox: {
    backgroundColor: '#f9f9f9'
  },
  imgBox: {
    height: 200,
    backgroundColor: '#252222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleImage: {
    width: 140,
    height: 170
  },
  image: {
    width: 120,
    height: 150,
  },
  detailInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 20
  },
  leftDetailInfo: {
    flex: 1
  },
  leftTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  leftText: {
    fontSize: 12,
    color: '#ccc',
  },
  rightDetailInfo: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff'
  },
  rightAverage: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333'
  },
  movieDetailBox: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  movieSumary: {
    fontSize: 14,
    color: '#333',
    lineHeight: 15,
    marginTop: 5
  },
  castsBox: {
    marginRight: 5,
    marginTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center'
  }
})

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      movieDetail: {}
    }
  }
  
  componentWillMount() {
    const { type } = this.props
    fetch(`https://api.douban.com/v2/movie/subject/${type}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loaded: true,
          movieDetail: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const movieDetail = this.state.movieDetail
    const averageRating =  this.state.loaded ? (movieDetail.rating.average) / 2 : 0
    return (
      <ScrollView style={styles.detailBox}>
        {
          this.state.loaded ? (
            <ScrollView>
              <View style={styles.imgBox}>
                <Image source={{uri: movieDetail.images.medium}} style={styles.titleImage} />
              </View>
              <View style={styles.detailInfo}>
                <View style={styles.leftDetailInfo}>
                  <Text style={styles.leftTitle}>{movieDetail.title}</Text>
                  <Text style={styles.leftText}>{movieDetail.year}/{movieDetail.genres.join('/')}</Text>
                  <Text style={styles.leftText}>原名：{movieDetail.original_title}</Text>
                  {movieDetail.mainland_pubdate && <Text style={styles.leftText}>上映时间：{movieDetail.mainland_pubdate}</Text>}
                  {movieDetail.durations && <Text style={styles.leftText}>{movieDetail.durations}分钟</Text>}
                </View>
                <View style={styles.rightDetailInfo}>
                  <Text style={styles.rightAverage}>{movieDetail.rating.average}</Text>
                  <StarRating 
                    starColor='#f7bd4e'
                    maxStars={5}
                    starSize={10}
                    rating={averageRating}
                    selectedStar={() => false}
                    style={styles.starRating}
                  />
                  <Text style={[styles.leftText,{textAlign: 'center',fontSize: 10}]}>{movieDetail.collect_count}人</Text>
                </View>
              </View>
              <View style={styles.movieDetailBox}>
                <Text style={styles.leftText}>剧情简介</Text>
                <Text style={styles.movieSumary}>{movieDetail.summary}</Text>
              </View>
              <View style={styles.movieDetailBox}>
                <Text style={styles.leftText}>影人</Text>
                <ScrollView horizontal={true}>
                  {movieDetail.casts.map(item => {
                    return <View style={styles.castsBox}>
                              <Image source={{uri: item.avatars.medium}} style={styles.image} />
                              <Text style={[styles.leftText,{marginTop: 5}]}>{item.name}</Text>
                            </View>
                  })}
                </ScrollView>
              </View>
              { movieDetail.photos && 
              <View style={styles.movieDetailBox}>
                <Text style={styles.leftText}>剧照</Text>
                <ScrollView horizontal={true}>
                  {movieDetail.photos.map(item => 
                    <Image source={{uri: item}} style={[styles.image,{marginTop: 5,marginRight: 5}]} />)} 
                </ScrollView>
              </View> }
            </ScrollView>
          ) : (
            <Text style={styles.loading}>loading...</Text>
          )
        }
      </ScrollView>
    );
  }
}

export default MovieDetail