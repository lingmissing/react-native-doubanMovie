import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import StarRating from 'react-native-star-rating'

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: '#f9f9f9',
    marginBottom: -10,
  },
  movieBox: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingVertical: 10,
  },
  movieTitle: {
    height: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row'
  },
  movieTitleText: {
    flex: 1,
    lineHeight: 20
  },
  movieTitleBtn: {
    width: 40
  },
  movieTitleBtnText: {
    color: '#5dc2af',
    lineHeight: 20
  },
  movieContent: {
    height: 160,
    paddingHorizontal: 5,
  },
  movieItem: {
    width: 100,
    height: 160,
    marginHorizontal: 5
  },
  movieItemTitle: {
    width: 100,
    marginTop: 5,
    overflow: 'hidden',
    fontSize:10
  },
  movieAverage: {
    width: 100,
    marginTop: 5,
    flex: 1,
    flexDirection: 'row'
  },
  starRating: {
    flex: 1
  },
  movieAverageText: {
    width: 20,
    fontSize: 10
  },
  personLook: {
    fontSize: 10,
    marginTop: 5,
    color: '#ccc'
  },
  goodMovie: {
    width: 130,
    height:130,
    marginHorizontal:5,
    borderRadius:5
  },
  goodMovieTitle: {
    marginTop: 20,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  goodMovieSmallTitle: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  }
})

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowMovie: [],
      willMovie: [],
      loading: true
    }
  }
  fomatDate(now,subtractDay) {
    const nowMonth = (now.getMonth() + 1) >= 10?(now.getMonth() + 1):'0'+(now.getMonth() + 1)
    const nowDate = (now.getDate() >= 10)?now.getDate():('0' + now.getDate())
    const subtract = new Date(now.getTime() - subtractDay*24*60*60*1000)
    const subtractMonth = (subtract.getMonth() + 1) >= 10?(subtract.getMonth() + 1):'0'+(subtract.getMonth() + 1)
    const subtractDate = (subtract.getDate() >= 10)?subtract.getDate():('0' + subtract.getDate())
    const obj = {
      nowTime: `${nowMonth}月${nowDate}日`,
      subtractTime: `${subtractMonth}月${subtractDate}日`
    }
    return obj
  }
  
  componentWillMount() {
    fetch('https://api.douban.com/v2/movie/in_theaters')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          nowMovie: responseJson.subjects
        });
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://api.douban.com/v2/movie/coming_soon')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          willMovie: responseJson.subjects
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  goNext(component,type,title) {
    const props = this.props
    props.navigator.push({
      component: props[component],
      passProps: {type: type},
      title: title,
      tintColor: '#5dc2af'
    })
  }

  render() {
    return (
      <ScrollView style={styles.contentWrapper}>
          <View style={styles.movieBox}>
            <View style={styles.movieTitle}>
              <Text style={styles.movieTitleText}>影院热映</Text>
              <TouchableHighlight style={styles.movieTitleBtn} onPress={() => this.goNext('MovieListApp','in_theaters','正在热映')}>
                <Text style={styles.movieTitleBtnText}>更多 <Icon name="ios-arrow-forward" size={15}/> </Text>
              </TouchableHighlight>
            </View>
            <ScrollView style={styles.movieContent} horizontal={true}>
                {this.state.nowMovie.map((item,index) => {
                  if(index < 9) {
                    const average = item.rating.average / 2
                    return <TouchableHighlight key={item.title} style={styles.movieItem}
                    onPress={() => this.goNext('MovieDetailApp',item.id,item.title)}>
                              <View>
                                <Image source={{uri: item.images.medium}} style={{width: 100, height: 120}} />
                                <Text style={styles.movieItemTitle}>{item.title}</Text>
                                <View style={styles.movieAverage}>
                                  <StarRating 
                                    starColor='#f7bd4e'
                                    maxStars={5}
                                    starSize={10}
                                    rating={average}
                                    selectedStar={() => false}
                                    style={styles.starRating}
                                  />
                                  <Text style={styles.movieAverageText}>{item.rating.average}</Text>
                                </View>
                               </View>
                            </TouchableHighlight>
                  }
                })}
            </ScrollView>
          </View>
          <View style={styles.movieBox}>
            <View style={styles.movieTitle}>
              <Text style={styles.movieTitleText}>即将上映</Text>
              <TouchableHighlight style={styles.movieTitleBtn} onPress={() => this.goNext('MovieListApp','coming_soon','即将上映')}>
                <Text style={styles.movieTitleBtnText}>更多 <Icon name="ios-arrow-forward" size={15}/> </Text>
              </TouchableHighlight>
            </View>
            <ScrollView style={styles.movieContent} horizontal={true}>
                {this.state.willMovie.map((item,index) => {
                  if(index < 9) {
                    const average = item.rating.average / 2
                    return <TouchableHighlight key={item.title} style={styles.movieItem}
                    onPress={() => this.goNext('MovieDetailApp',item.id,item.title)}>
                              <View>
                                <Image source={{uri: item.images.medium}} style={{width: 100, height: 120}} />
                                <Text style={styles.movieItemTitle}>{item.title}</Text>
                                <Text style={styles.personLook}>{item.collect_count}人想看</Text>
                              </View>
                            </TouchableHighlight>
                  }
                })}
            </ScrollView>
          </View>
          <View style={styles.movieBox}>
            <View style={styles.movieTitle}>
              <Text style={styles.movieTitleText}>精选榜单</Text>
            </View>
            <ScrollView horizontal={true}  style={styles.movieContent}>
              <TouchableHighlight style={[styles.goodMovie,{backgroundColor:'#c0a30c'}]}
              onPress={() => this.goNext('GoodMovieApp','top250','豆瓣Top250')}>
                <View>
                  <Text style={styles.goodMovieTitle}>豆瓣Top250</Text>
                  <Text style={styles.goodMovieSmallTitle}>8分以上好电影</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.goodMovie,{backgroundColor:'#53aa66'}]}
              >
                <View>
                  <Text style={styles.goodMovieTitle}>本周口碑榜</Text>
                  <Text style={styles.goodMovieSmallTitle}>
                    {this.fomatDate(new Date(),7).subtractTime} - {this.fomatDate(new Date(),7).nowTime}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.goodMovie,{backgroundColor:'#9966be'}]}
              >
                <View>
                  <Text style={styles.goodMovieTitle}>新片榜</Text>
                  <Text style={styles.goodMovieSmallTitle}>
                    {this.fomatDate(new Date(),7).subtractTime} - {this.fomatDate(new Date(),7).nowTime}
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.goodMovie,{backgroundColor:'#c4668d'}]}
              >
                <View>
                  <Text style={styles.goodMovieTitle}>票房榜</Text>
                  <Text style={styles.goodMovieSmallTitle}>票房最高排名</Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
          </View>
      </ScrollView>
    );
  }
}

export default Home