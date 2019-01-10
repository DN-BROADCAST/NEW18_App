import React, { Component } from "react";
import { Image, Platform, Share, Linking, WebView, View, RefreshControl, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Left,
  Body,
  Spinner,
  Right,
  ActionSheet
} from "native-base";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AdComponent from "./Ads";
import TopNews from "./TopNews";
import AdMini from "./AdMini";
import Related from "./Related";
import Moment from 'react-moment';
import Loading from "../index/loading";

import { FacebookAds, Video, AppLoading } from "expo";
import VideoPlayer from '@expo/videoplayer';
import { FlatList, } from 'react-native-gesture-handler';

const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

var BUTTONS = ["720P", "480P", "360P", "240P", "ยกเลิก"];
var CANCEL_INDEX = 4;

class YoutubeView extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      data: [],
      Youtube: [],
      refreshing: false,
      reload: false,
      dataload: [{account_playback_token: null}],
      Video: [],
      window: Dimensions.get("window"),
      clicked: null,
      VQ: 0,
    };
  }

  handler = dims => this.setState(dims);

  getTOP() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?top=true')
      .then(response => response.json())
      .then((response) => {
        this.setState({ data: response.data, isReady: false });
        this.getYoutube();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getYoutube() {
    const { params } = this.props.navigation.state;
    var Id = params.itemId;
    if (this.state.reload === true) {
      Id = this.state.dataload.itemId;
    }
    if (this.state.dataload.itemId !== undefined) {
      Id = this.state.dataload.itemId;
    }
    var datenow = new Date();
    var daynext = new Date();
    daynext.setDate(daynext.getDate() - 7);
    return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCkqcPORjgyRMD-twNfuDlog&maxResults=30&order=viewCount&publishedAfter=' + daynext.toISOString() + '&publishedBefore=' + datenow.toISOString() + '&q=&regionCode=th&relevanceLanguage=th&fields=etag%2CeventId%2Citems%2Ckind%2CnextPageToken%2CpageInfo%2CprevPageToken%2CregionCode%2CtokenPagination%2CvisitorId&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ Youtube: response.items });
        this.getVideo();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getVideo() {
    const { params } = this.props.navigation.state;
    var Id = params.itemId;
    if (this.state.reload === true) {
      Id = this.state.dataload.itemId;
    }
    return fetch('http://newtv.co.th/api/youtube/?url=https://www.youtube.com/watch?v=' + Id)
      .then(response => response.json())
      .then((response) => {
        this.setState({ Video: response, refreshing: false, isReady: true, reload: false });
        console.log(this.state.Video.url)
        if (this.state.Video.length === 5) {
          BUTTONS = ["720P", "360P", "240P", "144P", "ยกเลิก"];
        }
        if (this.state.Video.length === 4) {
          BUTTONS = ["360P", "240P", "144P", "ยกเลิก"];
        }
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
    Dimensions.addEventListener("change", this.handler);
    this.getTOP();
  }

  componentWillUnmount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
    Dimensions.removeEventListener("change", this.handler);
  }

  _onRefresh(data) {
    if (data.itemId !== null && data.itemId !== undefined) {
      this.setState({ reload: true, dataload: data });
    }
    this.setState({ refreshing: true });
    this.getTOP();
  }

  onBannerAdPress = () => console.log('Ad clicked!');
  onBannerAdError = (event) => console.log('Ad error :(', event.nativeEvent);

  _onClicked() {
    if (this.state.Video.length === 5) {
      if (this.state.clicked === "720P" && this.state.Video[0].url !== undefined) {
        this.setState({ VQ: 0 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
      if (this.state.clicked === "360P" && this.state.Video[2].url !== undefined) {
        this.setState({ VQ: 2 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
      if (this.state.clicked === "240P" && this.state.Video[3].url !== undefined) {
        this.setState({ VQ: 3 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
      if (this.state.clicked === "144P" && this.state.Video[4].url !== undefined) {
        this.setState({ VQ: 4 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
    }
    else if (this.state.Video.length === 4) {
      if (this.state.clicked === "360P" && this.state.Video[1].url !== undefined) {
        this.setState({ VQ: 1 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
      if (this.state.clicked === "240P" && this.state.Video[2].url !== undefined) {
        this.setState({ VQ: 2 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
      if (this.state.clicked === "144P" && this.state.Video[3].url !== undefined) {
        this.setState({ VQ: 3 });
        console.log(this.state.VQ);
        this.setState({ refreshing: true });
        this.getTOP();
      }
    }
  }


  render() {
    var SubCount = this.state.Channel ? this.state.Channel.items[0].statistics.subscriberCount : null;
    SubCount = SubCount > 1000000000 ? (SubCount / 1000000000).toFixed(1) + 'B' : SubCount;
    SubCount = SubCount > 1000000 ? (SubCount / 1000000).toFixed(1) + 'M' : SubCount;
    SubCount = SubCount > 1000 ? (SubCount / 1000).toFixed(1) + 'K' : SubCount;
    const { navigate } = this.props.navigation;
    const { width, height } = this.state.window;
    const mode = height > width ? "portrait" : "landscape";
    console.log(`New dimensions ${width}x${height} (${mode})`);
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    var itemTittle = params ? params.itemTittle : null;
    if (this.state.dataload.itemTittle !== null && this.state.dataload.itemTittle !== undefined) {
      var itemTittle = this.state.dataload.itemTittle;
    }
    const videoyoutube = this.state.data.videoyoutube ? this.state.data.videoyoutube : null;
    const customStyle = "<style>* {max-width: 100%;}</style>";
    if (!this.state.isReady) {
      return (
        <Container style={{ backgroundColor: "#282828", }}>
          <Header style={{ backgroundColor: "#282828", }}>
            <StatusBar
              barStyle="light-content"
            />
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={25} color="#FFF" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => Share.share({
                message: itemTittle + ' http://www.youtube.com/watch?v=' + itemId,
                url: 'http://www.youtube.com/watch?v=' + itemId,
                title: itemTittle
              }, {
                  // Android only:
                  dialogTitle: itemTittle,
                  // iOS only:
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })} >
                <Icon name="share-variant" size={20} color="#FFF" />
              </Button>
              <Button transparent
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "คุณภาพ"
                    },
                    buttonIndex => {
                      this.setState({ clicked: BUTTONS[buttonIndex] });
                      if (buttonIndex !== "ยกเลิก") {
                        this._onClicked();
                      }
                    }
                  )}>
                <Icon name="settings" size={20} color="#FFF" />
              </Button>
            </Right>
          </Header>

          <View
            style={{ width: width, height: Math.round(width * 9 / 16), }}
          >
            <Spinner style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} color='#981A30' />
          </View>
          <View style={{
            backgroundColor: '#981A30',
          }} >
            <Text style={{
              color: '#fff',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5,
              fontFamily: 'DBRegular',
              fontSize: 24,
            }}
            >{itemTittle}</Text>
          </View>
          <Spinner style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} color='#981A30' />
        </Container>
      );
    }
    else if(this.state.Video[this.state.VQ].sp === undefined && this.state.Video[this.state.VQ].account_playback_token === undefined) {
      return (
        <Container style={{ backgroundColor: "#282828", }}>
          <Header style={{ backgroundColor: "#282828", }}>
            <StatusBar
              barStyle="light-content"
            />
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={25} color="#FFF" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => Share.share({
                message: itemTittle + ' http://www.youtube.com/watch?v=' + itemId,
                url: 'http://www.youtube.com/watch?v=' + itemId,
                title: itemTittle
              }, {
                  // Android only:
                  dialogTitle: itemTittle,
                  // iOS only:
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })} >
                <Icon name="share-variant" size={20} color="#FFF" />
              </Button>
              <Button transparent
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "คุณภาพ"
                    },
                    buttonIndex => {
                      this.setState({ clicked: BUTTONS[buttonIndex] });
                      if (buttonIndex !== "ยกเลิก") {
                        this._onClicked();
                      }
                    }
                  )}>
                <Icon name="settings" size={20} color="#FFF" />
              </Button>
            </Right>
          </Header>

          <Video
            source={{ uri: this.state.Video[this.state.VQ].url }}
            resizeMode="contain"
            onFullscreenUpdate={e => { this.setState({ fullscreen: true }); console.log(this.state.fullscreen); }}
            style={{ width: width, height: Math.round(width * 9 / 16), }}
            shouldPlay
            useNativeControls
          />
          <View style={{
            backgroundColor: '#981A30',
          }} >
            <Text style={{
              color: '#fff',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5,
              fontFamily: 'DBRegular',
              fontSize: 24,
            }}
            >{itemTittle}</Text>
          </View>

          <Content>
            <AdMini adsManager={adsManager} />
            <Text style={styles.header}>คลิปเพิ่มเติมจาก NEW18</Text>
            <View style={{ backgroundColor: "#464646", height: 1 }} />
            <View style={{ backgroundColor: "#282828" }}>
              <FlatList
                data={this.state.Youtube}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={this._onRefresh.bind(this, { itemId: item.id.videoId, itemTittle: item.snippet.title })}><Related item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdComponent adsManager={adsManager} />
            </View>
            <Text style={styles.header}>ข่าวเพิ่มเติมจาก NEW18</Text>
            <View style={{ backgroundColor: "#464646", height: 1 }} />
            <View style={{ backgroundColor: "#282828" }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('NHCardImage', { itemId: item.idnews, })}><TopNews item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdMini adsManager={adsManager} />
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
    else {
      return (
        <Container style={{ backgroundColor: "#282828", }}>
          <Header style={{ backgroundColor: "#282828", }}>
            <StatusBar
              barStyle="light-content"
            />
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={25} color="#FFF" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => Share.share({
                message: itemTittle + ' http://www.youtube.com/watch?v=' + itemId,
                url: 'http://www.youtube.com/watch?v=' + itemId,
                title: itemTittle
              }, {
                  // Android only:
                  dialogTitle: itemTittle,
                  // iOS only:
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })} >
                <Icon name="share-variant" size={20} color="#FFF" />
              </Button>
              <Button transparent
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "คุณภาพ"
                    },
                    buttonIndex => {
                      this.setState({ clicked: BUTTONS[buttonIndex] });
                      if (buttonIndex !== "ยกเลิก") {
                        this._onClicked();
                      }
                    }
                  )}>
                <Icon name="settings" size={20} color="#FFF" />
              </Button>
            </Right>
          </Header>

          <WebView
            style={{ width: null,}}
            javaScriptEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/' + itemId + '?rel=0&autoplay=1&showinfo=0&controls=1' }}
          />
          <View style={{
            backgroundColor: '#981A30',
          }} >
            <Text style={{
              color: '#fff',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
              marginBottom: 5,
              fontFamily: 'DBRegular',
              fontSize: 24,
            }}
            >{itemTittle}</Text>
          </View>

          <Content>
            <AdMini adsManager={adsManager} />
            <Text style={styles.header}>คลิปเพิ่มเติมจาก NEW18</Text>
            <View style={{ backgroundColor: "#464646", height: 1 }} />
            <View style={{ backgroundColor: "#282828" }}>
              <FlatList
                data={this.state.Youtube}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={this._onRefresh.bind(this, { itemId: item.id.videoId, itemTittle: item.snippet.title })}><Related item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdComponent adsManager={adsManager} />
            </View>
            <Text style={styles.header}>ข่าวเพิ่มเติมจาก NEW18</Text>
            <View style={{ backgroundColor: "#464646", height: 1 }} />
            <View style={{ backgroundColor: "#282828" }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('NHCardImage', { itemId: item.idnews, })}><TopNews item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdMini adsManager={adsManager} />
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

export default YoutubeView;
