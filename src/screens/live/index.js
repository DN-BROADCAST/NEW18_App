import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Left,
  Right,
  Body,
  H1, H2, Spinner,
  Card,
  CardItem,
} from "native-base";
import { Image, View, RefreshControl, StyleSheet, Dimensions, TouchableOpacity, ScrollView, StatusBar, } from "react-native";
import Expo, { Video, FacebookAds, LinearGradient, ScreenOrientation } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdMini from "../index/AdMini";
import { Pulse } from 'react-native-loader';
import ImageLoad from 'react-native-image-placeholder';

import {FlatList} from 'react-native-gesture-handler';

import styles from "./styles";
var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);
const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

function incrementColor(color, step) {
  const intColor = parseInt(color.substr(1), 16);
  const newIntColor = (intColor + step).toString(16);
  return `#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`;
}

const Maikhao = ({ item, index }) => (

  <Card Style={{ width: width - 5, height: Math.round(width * 8 / 16)}}>
    <CardItem cardBody>
      <ImageLoad isShowActivity={false} source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/hqdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 8 / 16) }} />
    </CardItem>
    <CardItem>
      <Left>
        <Body>
          <Text style={{ fontFamily: 'DBRegular', fontSize: 22,}}>{item.snippet.title.substring(0, 50)}</Text>
        </Body>
      </Left>
    </CardItem>
  </Card>
);

const Khaocrasmid = ({ item, index }) => (

  <Card Style={{ width: width - 5, height: Math.round(width * 8 / 16) }}>
    <CardItem cardBody>
      <ImageLoad isShowActivity={false} source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/hqdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 8 / 16) }} />
    </CardItem>
    <CardItem Style={{backgroundColor: '#282828'}}>
      <Left>
        <Body>
          <Text style={{ fontFamily: 'DBRegular', fontSize: 22 }}>{item.snippet.title.substring(0, 50)}</Text>
        </Body>
      </Left>
    </CardItem>
  </Card>
);

const Khaocrasyen = ({ item, index }) => (

  <Card Style={{ width: width - 5, height: Math.round(width * 8 / 16) }}>
    <CardItem cardBody>
      <ImageLoad isShowActivity={false} source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/hqdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 8 / 16) }} />
    </CardItem>
    <CardItem Style={{backgroundColor: '#282828'}}>
      <Left>
        <Body>
          <Text style={{ fontFamily: 'DBRegular', fontSize: 22 }}>{item.snippet.title.substring(0, 50)}</Text>
        </Body>
      </Left>
    </CardItem>
  </Card>
);

class Live extends Component {
  constructor() {
    super()
    this.state = {
      page: "",
      count: 0,
      colorTop: '#616161',
      colorBottom: '#9bc5c3',
      isReady: false,
      refreshing: false,
      data: [],
      datanews: [],
      khaocrasyen: [],
      khaocrasmid: [],
      Maikhao: [],
      window: Dimensions.get("window"),
      url: 'http://newtv.cdn.byteark.com/live/playlist_576p/index.m3u8',
    }
  }
  handler = dims => this.setState(dims);

  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    Dimensions.addEventListener("change", this.handler);
    this.getMaikhao();
    this.getKhaocrasyen();
    this.getKhaocrasmid();
    this._interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
        colorTop: incrementColor(this.state.colorTop, 2),
        colorBottom: incrementColor(this.state.colorBottom, -2),
      });
    }, 100);
  }

  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    Dimensions.removeEventListener("change", this.handler);
    clearInterval(this._interval);
  }

  UriLive() {
    this.setState({ refreshing: false, url: 'http://newtv.cdn.byteark.com/live/playlist_576p/index.m3u8' })
  }

  _onOrientationChange(e) {
    width = Dimensions.get('window');
  }

  getMaikhao() {
    var page = this.state.page;
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&pageToken=';
    url = url.concat(page, "&playlistId=PLdxbNRnNTlZJPoxkCvfT0fdHnekXCULBI&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU");
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then((response) => {
        this.setState({ datanews: response.items, refreshing: false, Maikhao: response, });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getKhaocrasmid() {
    return fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLdxbNRnNTlZIhaHkmdmUoFeccho7W2XFQ&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ khaocrasmid: response.items, refreshing: false, isReady: true });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  getKhaocrasyen() {
    return fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLdxbNRnNTlZJfTJGWNlAxagzqNEXz5fne&key=AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU')
      .then(response => response.json())
      .then((response) => {
        this.setState({ khaocrasyen: response.items, refreshing: false, });
      }).catch((err) => {
        console.log('fetch', err)
      });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getMaikhao();
    this.getKhaocrasyen();
    this.UriLive();
    this.getKhaocrasmid();
  }

  handleLoadMoreMaikhao() {
    console.log(this.state.Maikhao.nextPageToke);
  }
  
  handleLoadYoutubePage(item) {
    const { navigate } = this.props.navigation;
    this.refs.LiveVideo.pauseAsync()
    navigate('YoutubeView', { itemId: item.contentDetails.videoId, itemTittle: item.snippet.title })
  }


  render() {

    const { width, height } = this.state.window;
    const mode = height > width ? "portrait" : "landscape";
    console.log(`New dimensions ${width}x${height} (${mode})`);

    const { navigate } = this.props.navigation;
    if (!this.state.isReady) {
      return (
        <Container style={styles.container}>
          <Header style={{ backgroundColor: "#282828", }}>
          <StatusBar
              barStyle="light-content"
            />
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" size={25} color="#fff" />
              </Button>
            </Left>
            <Body>
              <Image
                source={require("../../../assets/NEW18.png")}
                style={{ width: 150, height: 30 }}
              />
            </Body>
            <Right />
          </Header>

          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } >
            <Video
              source={{ uri: this.state.url }}
              resizeMode="contain"
              onFullscreenUpdate={this.test}
              style={{ width: width, height: Math.round(width * 9 / 16), }}
              shouldPlay
              useNativeControls
            />
            <View style={styles.liveHead} >
              <Text style={styles.texth}>NEW18 สถานีโทรทัศน์ดิจิตอล ช่อง 18</Text>
            </View>
            <AdMini adsManager={adsManager} />
            <Text style={styles.headerlive}>นิวหมายข่าว</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Card>
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: Math.round(width * 9 / 16) }}
                />
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: 40, marginTop: 5 }}
                />
              </Card>
            </View>
            <Text style={styles.headerlive}>ข่าวชนข่าวเที่ยง</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Card>
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: Math.round(width * 9 / 16) }}
                />
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: 40, marginTop: 5 }}
                />
              </Card>
            </View>
            <Text style={styles.headerlive}>ข่าวชนข่าวเย็น</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Card>
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: Math.round(width * 9 / 16) }}
                />
                <LinearGradient
                  start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                  colors={[this.state.colorTop, this.state.colorBottom]}
                  style={{ width: width - 5, height: 40, marginTop: 5 }}
                />
              </Card>
            </View>
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontFamily: 'DBRegular',
                textAlign: 'center',
                color: '#fff',
              }}>
                Copyright © 2561 | NEW18
               </Text>
            </View>
          </Content>
        </Container>
      );
    }
    else {
      clearInterval(this._interval);
      return (
        <Container style={styles.container}>
          <Header style={{ backgroundColor: "#282828", }}>
          <StatusBar
              barStyle="light-content"
            />
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" size={25} color="#fff" />
              </Button>
            </Left>
            <Body>
              <ImageLoad
                source={require("../../../assets/NEW18.png")}
                style={{ width: 150, height: 30 }}
              />
            </Body>
            <Right />
          </Header>

          <Content refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          } >
            <Video
              ref="LiveVideo"
              source={{ uri: this.state.url }}
              resizeMode="contain"
              onFullscreenUpdate={this.test}
              style={{ width: width, height: Math.round(width * 9 / 16), }}
              shouldPlay
              useNativeControls
            />
            <View style={styles.liveHead} >
              <Text style={styles.texth}>NEW18 สถานีโทรทัศน์ดิจิตอล ช่อง 18</Text>
            </View>
            <AdMini adsManager={adsManager} />
            <Text style={styles.headerlive}>นิวหมายข่าว</Text>
            <ScrollView
            >

              <FlatList
                horizontal
                pagingEnabled
                data={this.state.datanews}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => this.handleLoadYoutubePage(item)}><Maikhao item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
                onEndReached={this.handleLoadMoreMaikhao()}
                onEndThreshold={0}
              />

            </ScrollView>
            <Text style={styles.headerlive}>ข่าวชนข่าวเที่ยง</Text>
            <ScrollView
            >

              <FlatList
                horizontal
                pagingEnabled
                data={this.state.khaocrasmid}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => this.handleLoadYoutubePage(item)}><Khaocrasmid item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />

            </ScrollView>
            <Text style={styles.headerlive}>ข่าวชนข่าวเย็น</Text>
            <ScrollView
            >

              <FlatList
                horizontal
                pagingEnabled
                data={this.state.khaocrasyen}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView', { itemId: item.contentDetails.videoId, itemTittle: item.snippet.title })}><Khaocrasyen item={item} index={index} /></TouchableOpacity>}
                keyExtractor={(item, index) => index}
              />

            </ScrollView>
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>
              <Text style={{
                fontSize: 24,
                fontFamily: 'DBRegular',
                textAlign: 'center',
                color: '#fff',
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


const liveStyle = StyleSheet.create({
  live: {
    width: width,
    height: height,
  },
})
export default Live;
