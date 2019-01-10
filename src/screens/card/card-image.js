import React, { Component } from "react";
import { Image, Share, Linking, WebView, View, TouchableOpacity, Dimensions } from "react-native";
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
  Right,
  Spinner
} from "native-base";
import AutoHeightWebView from "react-native-autoheight-webview";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AdComponent from "./Ads";
import TopNews from "./TopNews";
import AdMini from "./AdMini";
import ModalExample from "../modal";
import * as Expo from "expo";
import * as firebase from 'firebase';

import { FlatList } from 'react-native-gesture-handler';

import { FacebookAds, AdMobBanner, WebBrowser } from "expo";

var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);

const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

const Youtube = ({ videoyoutube }) => (
  <WebView
    style={{ flex: 1, height: 300 }}
    javaScriptEnabled={true}
    source={{ uri: videoyoutube + '?rel=0&autoplay=0&showinfo=0&controls=0' }}
  />
);



class NHCardImage extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      data: [],
      window: Dimensions.get("window"),
      datatop: [],
      openurl: true,
      realContentHeight: 0,
    };
  }

  onBannerAdPress = () => console.log('Ad clicked!');
  onBannerAdError = (event) => console.log('Ad error :(', event.nativeEvent);
  getTOP() {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?recom=true')

      .then(response => response.json())
      .then((response) => {
        this.setState({ datatop: response.data });
        this.getData();
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getData() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?id=' + itemId)
      .then(response => response.json())
      .then((response) => {
        this.setState({ data: response.data });
        this.getDetail();
        var deviceid = Expo.Constants.deviceId;
        var devicename = Expo.Constants.deviceName;
        var datetime = new Date().toString();
        var d = new Date();
        firebase.database().ref("/actions/readnews/" + deviceid).push({ devicename: devicename, readon: datetime, idnews: this.state.data.idnews, news_title: this.state.data.news_title, news_public: this.state.data.news_public, });
        firebase.database().ref("/actions/readnews_sort_by_date/" + (d.getMonth() + 1).toString() + "-" + d.getDate().toString() + "-" + d.getFullYear().toString() + "/" + deviceid).push({ devicename: devicename, readon: datetime, idnews: this.state.data.idnews, news_title: this.state.data.news_title, news_public: this.state.data.news_public, });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getDetail() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?id=' + itemId)
      .then(response => response.json())
      .then((response) => {
        this.setState({ detail: response.data.news_full_description, isReady: true });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }
  componentWillMount() {
    this.getTOP();
  }
  render() {
    const { navigate } = this.props.navigation;
    const itemId = this.state.data ? this.state.data.idnews : null;
    const videoyoutube = this.state.data.videoyoutube ? this.state.data.videoyoutube : null;
    const news_public = this.state.data ? this.state.data.news_public : null;
    const otherParam = this.state.data ? this.state.data.news_title : null;
    const uri = this.state.data ? "http://www.newtv.co.th/images/thumbnail/l/" + this.state.data.news_thumbnail_big : null;
    const detail = this.state.data ? this.state.data.news_full_description : null;
    const detail2 = detail ? detail : this.state.detail;
    const minHeight = 100;
    const customStyle = "* {max-width: 100%;} p {padding-left: 10px; padding-right: 10px;} img {padding-top: 10px; padding-bottom: 10px; padding-left:0px; padding-right: 0px; margin-left: -10px; min-width:106%;}";
    if (!this.state.data.news_full_description) {
      return (<Spinner style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }} color='#981A30' />);
    } else if (videoyoutube != null) {
      return (
        <Container style={styles.container}>
          <Header style={{ backgroundColor: "#FFF", }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={25} color="#757575" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => Share.share({
                message: otherParam + 'http://www.newtv.co.th/news/' + itemId,
                url: 'http://www.newtv.co.th/news/' + itemId,
                title: otherParam
              }, {
                  // Android only:
                  dialogTitle: otherParam,
                  // iOS only:
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })} >
                <Icon name="share-variant" size={20} color="#757575" />
              </Button>
              <Button transparent
                onPress={() => this._handlePressButtonAsync(itemId)}>
                <Icon name="web" size={20} color="#757575" />
              </Button>
            </Right>
          </Header>

          <Content>
            <View style={{ backgroundColor: "#fff" }}>
              <CardItem cardBody>
                <Image
                  style={{
                    resizeMode: "cover",
                    width: null,
                    height: height,
                    flex: 1
                  }}
                  source={{ uri: uri }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'DBRegular', fontSize: 30 }} >{otherParam}</Text>
                    <View style={{ alignSelf: 'center', backgroundColor: "#757575", height: 2, width: 150, marginTop: 10 }} />
                    <Text style={{ textAlign: 'center', color: "#757575", fontSize: 13 }}>{news_public}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <AutoHeightWebView ref={(ref) => { this.AutoHeightWebView = ref; }} customStyle={customStyle} source={{ html: detail2 }} width={width} startInLoadingState={true}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)} />
              </CardItem>
              <Youtube videoyoutube={videoyoutube} />
              <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
                <AdMobBanner
                  bannerSize="mediumRectangle"
                  adUnitID="ca-app-pub-7630454062211213/8130096417"
                  didFailToReceiveAdWithError={this.bannerError} />
              </View>
            </View>
            <AdComponent adsManager={adsManager} />
            <Text style={styles.header} >ข่าวที่น่าสนใจ</Text>
            <View style={{ backgroundColor: "#fff" }}>
              <FlatList
                data={this.state.datatop}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate({ routeName: 'NHCardImage', params: { itemId: item.idnews, }, key: 'Key:' + item.idnews })}><TopNews item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdMini adsManager={adsManager} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
          </Content>
        </Container>
      );
    }
    else {
      return (
        <Container style={styles.container}>
          <Header style={{ backgroundColor: "#FFF", }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-left" size={25} color="#757575" />
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => Share.share({
                message: otherParam + 'http://www.newtv.co.th/news/' + itemId,
                url: 'http://www.newtv.co.th/news/' + itemId,
                title: otherParam
              }, {
                  // Android only:
                  dialogTitle: otherParam,
                  // iOS only:
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })} >
                <Icon name="share-variant" size={20} color="#757575" />
              </Button>
              <Button transparent
                onPress={() => this._handlePressButtonAsync(itemId)}>
                <Icon name="web" size={20} color="#757575" />
              </Button>
            </Right>
          </Header>

          <Content>
            <View style={{ backgroundColor: "#fff" }}>
              <CardItem cardBody>
                <Image
                  style={{
                    resizeMode: "cover",
                    width: null,
                    height: height,
                    flex: 1
                  }}
                  source={{ uri: uri }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Body>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'DBRegular', fontSize: 30 }} >{otherParam}</Text>
                    <View style={{ alignSelf: 'center', backgroundColor: "#757575", height: 2, width: 150, marginTop: 10 }} />
                    <Text style={{ textAlign: 'center', color: "#757575", fontSize: 13 }}>{news_public}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <AutoHeightWebView ref={(ref) => { this.AutoHeightWebView = ref; }} customStyle={customStyle} source={{ html: detail2 }} width={width} startInLoadingState={true}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)} />
              </CardItem>
              <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
                <AdMobBanner
                  bannerSize="mediumRectangle"
                  adUnitID="ca-app-pub-7630454062211213/8130096417"
                  didFailToReceiveAdWithError={this.bannerError} />
              </View>
            </View>
            <AdComponent adsManager={adsManager} />
            <Text style={styles.header} >ข่าวที่น่าสนใจ</Text>
            <View style={{ backgroundColor: "#fff" }}>
              <FlatList
                data={this.state.datatop}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate({ routeName: 'NHCardImage', params: { itemId: item.idnews, }, key: 'Key:' + item.idnews })}><TopNews item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />
              <AdMini adsManager={adsManager} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", margin: 5, alignItems: "center", }}>
              <AdMobBanner
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-7630454062211213/8130096417"
                didFailToReceiveAdWithError={this.bannerError} />
            </View>
          </Content>
        </Container>
      );
    }
  }

  _onNavigationStateChange(req) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(req.url) && req.url.length < 100) {
      let result = WebBrowser.openBrowserAsync(req.url);
      this.AutoHeightWebView.stopLoading();
    }
  }

  _handlePressButtonAsync = async (itemId) => {
    let result = await WebBrowser.openBrowserAsync('http://www.newtv.co.th/news/' + itemId);
  };

  onPress = () => {
    console.log('onPress');
  }

}



export default NHCardImage;
