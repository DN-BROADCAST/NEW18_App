import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, Share, View, Linking, RefreshControl, Dimensions, } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Spinner, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import TopNews from "./TopNews";
import { FacebookAds, AdMobBanner, WebBrowser, LinearGradient } from "expo";
import AdComponent from "./Ads";
import AdMini from "./AdMini";
import BottomNews from "./BottomNews";

import {FlatList} from 'react-native-gesture-handler';

var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);
import Moment from 'react-moment';
const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

var BUTTONS = ["ดูในหน้าเว็บ NEW18", "ยกเลิก"];
var CANCEL_INDEX = 2;

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
}

export default class NewsList extends Component {

  constructor() {
    super()
    this.state = {
      count: 0,
      colorTop: '#d66d75',
      colorBottom: '#e29587',
      isReady: false,
      refreshing: false,
      data: [],
      datanews: [],
      window: Dimensions.get("window"),
    };
  }

  getTOP() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?top=true')

      .then(response => response.json())
      .then((response) => {
        this.setState({ data: response.data, });
        this.getNews();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getNews() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php')
      .then(response => response.json())
      .then((response) => {
        this.setState({ datanews: response.data, refreshing: false, isReady: true });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 2),
        colorBottom: incrementColor(this.state.colorBottom, -2),
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentWillMount() {
    this.getTOP();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getTOP();
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
            <CardItem style={{ backgroundColor: "#fff" }} >
              <Left>
                <Body>
                  <Text style={{ fontSize: 30, fontFamily: 'DBRegular', color: 'rgba(97,97,97,0.88)' }}>5 เรื่องเด่นสำหรับคุณในขณะนี้</Text>
                </Body>
              </Left>
            </CardItem>
            <FlatList
              data={this.state.data}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('NHCardImage', { itemId: item.idnews, })}><TopNews item={item} index={index} /></TouchableOpacity>}
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
            <View style={{backgroundColor: "#fff"}}>
              <FlatList
                data={this.state.datanews}
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
