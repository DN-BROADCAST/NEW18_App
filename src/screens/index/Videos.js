import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, Share, View, Linking, RefreshControl, Dimensions, } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Spinner, } from 'native-base';
import styles from "./styles";
import { FacebookAds, AdMobBanner } from "expo";
import AdComponent from "../live/Ads";
import LoadingBack from "./LoadingBack";
import Youtube from "../live/Youtube";
import {FlatList} from 'react-native-gesture-handler';

const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');


export default class Videos extends Component {

  constructor() {
    super()
    this.state = {
      isReady: false,
      refreshing: false,
    };
  }

  getYoutube() {
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=date&channelId=UCkqcPORjgyRMD-twNfuDlog&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ Youtube: response.items });
        this.getYoutube2();
      }).catch((err) => {
        console.log('fetch', err);
      });
  }

  getYoutube2() {
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&pageToken=CBQQAA&maxResults=20&order=date&channelId=UCkqcPORjgyRMD-twNfuDlog&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ Youtube2: response.items });
        this.getTrendingList();
      }).catch((err) => {
        console.log('fetch', err);
      });
  }

  getTrendingList() {
    var datenow = new Date();
    var daynext = new Date();
    daynext.setDate(daynext.getDate() - 7);
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCkqcPORjgyRMD-twNfuDlog&maxResults=1&order=viewCount&publishedAfter=' + daynext.toISOString() + '&publishedBefore=' + datenow.toISOString() + '&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ TrendingList: response.items, refreshing: false, isReady: true });
      }).catch((err) => {
        console.log('fetch', err);
      });
  }

  componentWillMount() {
    this.getYoutube();
  }

  componentWillUnmount() {
  }

  _onRefresh() {
    this.setState({ refreshing: true, isReady: false });
    this.getYoutube();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <Container style={{ backgroundColor: "#282828", }}>
          <Spinner style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} color='#981A30' />
        </Container>
      );
    }
    else {
      const { navigate } = this.props.navigation;
      return (
        <Container style={{ backgroundColor: "#282828", }}>
          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } >
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
            <FlatList
              data={this.state.TrendingList}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView', { itemId: item.id.videoId, itemTittle: item.snippet.title })}><Youtube item={item} index={index} Trending={true} /></TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
            <FlatList
              data={this.state.Youtube}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView', { itemId: item.id.videoId, itemTittle: item.snippet.title })}><Youtube item={item} index={index} Trending={false} /></TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
            <AdComponent adsManager={adsManager} />
            <FlatList
              data={this.state.Youtube2}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView', { itemId: item.id.videoId, itemTittle: item.snippet.title })}><Youtube item={item} index={index} Trending={false} /></TouchableOpacity>}
              keyExtractor={(item, index) => index}
            />
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
                color: '#FFF',
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
