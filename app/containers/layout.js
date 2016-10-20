import React, { Component } from 'react'
import { View,StyleSheet,Text,TabBarIOS,NavigatorIOS } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import HomeApp from './homeApp'
import MovieListApp from './movieListApp'
import GoodMovieApp from './goodMovieApp'


const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
});

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home'
    } 
  }
 
  render() {
    return (
      <TabBarIOS
        translucent={true}
        tintColor="#5dc2af"
        barTintColor="#f9f9f9"
      >
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
        }}>
          <NavigatorIOS
            barTintColor='#f9f9f9'
            titleTextColor='#333'
            // 是否隐藏导航条
            // navigationBarHidden={true}
            style={styles.navigator}
            initialRoute={{
              component: HomeApp,
              passProps: {},
              title: '豆瓣电影'
            }}
            />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="影院热映"
          iconName="ios-videocam-outline"
          selectedIconName="ios-videocam"
          selected={this.state.selectedTab === 'nowMovie'}
          onPress={() => {
            this.setState({
              selectedTab: 'nowMovie',
            });
        }}>
          <NavigatorIOS
            barTintColor='#5dc2af'
            titleTextColor='#fff'
            // navigationBarHidden={true}
            style={styles.navigator}
            initialRoute={{
              component: MovieListApp,
              passProps: {type:'in_theaters'},
              title: '正在热映的电影',
            }}
            />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="即将上映"
          iconName="ios-glasses-outline"
          selectedIconName="ios-glasses"
          selected={this.state.selectedTab === 'willMovie'}
          onPress={() => {
            this.setState({
              selectedTab: 'willMovie',
            });
        }}>
          <NavigatorIOS
            barTintColor='#5dc2af'
            titleTextColor='#fff'
            style={styles.navigator}
            initialRoute={{
              component: MovieListApp,
              passProps: {type: 'coming_soon'},
              title: '即将上映的电影',
            }}
            />
        </Icon.TabBarItem>

        <Icon.TabBarItem
          title="精选榜单"
          iconName="ios-grid-outline"
          selectedIconName="ios-grid"
          selected={this.state.selectedTab === 'goodMovie'}
          onPress={() => {
            this.setState({
              selectedTab: 'goodMovie',
            });
        }}>
          <NavigatorIOS
            barTintColor='#5dc2af'
            titleTextColor='#fff'
            style={styles.navigator}
            initialRoute={{
              component: GoodMovieApp,
              passProps: {type: 'top250'},
              title: '精选榜单',
            }}
            />
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

export default Layout;