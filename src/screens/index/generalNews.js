import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, Share, View, Linking, RefreshControl, Dimensions } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Spinner, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import { FacebookAds, AdMobBanner, WebBrowser, LinearGradient } from "expo";
import AdComponent from "./Ads";
import Slideshow from "react-native-slideshow";
import AdMini from "./AdMini";
import Moment from 'react-moment';
import BottomNews from "./BottomNews";
import News from "./News";

import {FlatList} from 'react-native-gesture-handler';

var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);

const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
}

export default class GNews extends Component {

  constructor() {
    super()
    this.state = {
      count: 0,
      colorTop: '#d66d75',
      colorBottom: '#e29587',
      isReady: false,
      refreshing: false,
      window: Dimensions.get("window"),
      data: [],
      datanews: [],
      datanews2: [],
      position: 1,
      interval: null,
      dataSource: [],
    };
  }

  getSlideshow() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?cat=7&silder=true&limit=5')
      .then(response => response.json())
      .then((response) => {
        this.setState({ dataSource: response.data, });
        this.getNews();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getNews() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?cat=7&limit=6')
      .then(response => response.json())
      .then((response) => {
        this.setState({ datanews: response.data, });
        this.getNews2();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getNews2() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?cat=7')
      .then(response => response.json())
      .then((response) => {
        this.setState({ datanews2: response.data, refreshing: false, isReady: true });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  componentWillMount() {
    //this.getTOP();
    this.getSlideshow();
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
        });
      }, 10000)
    });
    this._interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 2),
        colorBottom: incrementColor(this.state.colorBottom, -2),
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    clearInterval(this.state.interval);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    //this.getTOP();
    this.getSlideshow();
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  render() {
    if (!this.state.isReady) {
      return (
        <Container>
          <Spinner style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} color='#981A30' />
        </Container>
      );
    }
    else {
      const { navigate } = this.props.navigation;
      clearInterval(this._interval);
      return (
        <Container style={styles.container}>
          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } >
            <Slideshow style={{ marginBottom: 5 }}
              dataSource={this.state.dataSource}
              arrowSize={0}
              height={height}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })}
              overlay={true}
              onPress={() => navigate('NHCardImage', { itemId: this.state.dataSource[this.state.position].idnews, })}
            />
            <FlatList
              data={this.state.datanews}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('NHCardImage', { itemId: item.idnews, })}><News item={item} index={index} /></TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
            <AdMini adsManager={adsManager} />
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="largeBanner"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
            <AdComponent adsManager={adsManager} />

            <View style={{ backgroundColor: "#fff" }}>
              <FlatList
                data={this.state.datanews2}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('NHCardImage', { itemId: item.idnews, })}><BottomNews item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontFamily: 'DBRegular',
                textAlign: 'center',
                color: '#2f3542',
              }}>
                Copyright © 2561 | NEW18
               </Text>
            </View>
          </Content>
        </Container>
      );
    }
  }
}
//<AdComponent adsManager={adsManager} />
/*<View>
        <CardItem cardBody>
          <Left style={styles.NewsLeft} >
            <Text style={styles.NewsText}>{item.news_title}</Text>
          </Left>
          <Right>
            <Thumbnail style={styles.NewsThumbnail} square large source={{ uri: 'http://www.newtv.co.th/images/thumbnail/l/' + item.news_thumbnail_big }} />
          </Right>
        </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon name="clock" />
            <Text note>{item.news_public}</Text>
          </Button>
        </Left>
          <Button style={{marginRight:20}} transparent onPress={() => Share.share({
              message: item.news_title + 'http://www.newtv.co.th/news/' + item.idnews ,
              url: 'http://www.newtv.co.th/news/' + item.idnews,
              title: item.news_title
            }, {
              // Android only:
              dialogTitle: item.news_title,
              // iOS only:
              excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
              ]
            })} >
            <Icon name="share-variant" size={20} color="#757575" />
          </Button>
          <Button transparent
          onPress={ ()=>{ Linking.openURL('http://www.newtv.co.th/news/' + item.idnews)}}>
            <Icon name="web" size={20} color="#757575" />
          </Button>
      </CardItem>
      <View style={styles.NewsView} />
    </View>*/
