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
import {Image, View, RefreshControl, StyleSheet, Dimensions, TouchableOpacity, ScrollView, } from "react-native";
import Expo, { Video, FacebookAds, FlatList } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdMini from "../index/AdMini";
import { Pulse } from 'react-native-loader';

import styles from "./styles";
var { width } = Dimensions.get('window');
const height = Math.round(width * 9/16);
const adsManager = new FacebookAds.NativeAdsManager('176150199676781_176150239676777');

const resizeMode = 'center';

const Maikhao = ({ item, index }) => (

  <Card Style={{width: width - 5, height: Math.round(width * 9/16)}}>
    <CardItem cardBody>
      <Image source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/maxresdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 9/16), flex: 1 }} />
    </CardItem>
    <CardItem>
      <Left>
        <Body>
        <Text style={{fontFamily: 'DBRegular',fontSize: 22}}>{item.snippet.title}</Text>
        </Body>
      </Left>
    </CardItem>
    </Card>
  );

  const Khaocrasmid = ({ item, index }) => (

    <Card Style={{width: width - 5, height: Math.round(width * 9/16)}}>
      <CardItem cardBody>
        <Image source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/maxresdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 9/16), flex: 1 }} />
      </CardItem>
      <CardItem>
        <Left>
          <Body>
          <Text style={{fontFamily: 'DBRegular',fontSize: 22}}>{item.snippet.title}</Text>
          </Body>
        </Left>
      </CardItem>
      </Card>
    );

    const Khaocrasyen = ({ item, index }) => (

      <Card Style={{width: width - 5, height: Math.round(width * 9/16)}}>
        <CardItem cardBody>
          <Image source={{ uri: 'https://i.ytimg.com/vi/' + item.contentDetails.videoId + '/maxresdefault.jpg' }} style={{ width: width - 5, height: Math.round(width * 9/16), flex: 1 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
            <Text style={{fontFamily: 'DBRegular',fontSize: 22}}>{item.snippet.title}</Text>
            </Body>
          </Left>
        </CardItem>
        </Card>
      );

class Programs extends Component {
    constructor(){
        super()
        this.state = {
          isReady: false,
          refreshing: false,
          data: [],
          datanews: [],
          khaocrasyen: [],
          khaocrasmid: [],
          window: Dimensions.get("window"),
          url: 'http://newtv.cdn.byteark.com/live/playlist_576p/index.m3u8',
        }
    }
    handler = dims => this.setState(dims);

    componentDidMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
        Dimensions.addEventListener("change", this.handler);
        this.getMaikhao();
        this.getKhaocrasyen();
        this.getKhaocrasmid();
    }

    componentWillUnmount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        Dimensions.removeEventListener("change", this.handler);
    }

    UriLive() {
      this.setState({refreshing: false, url: 'http://newtv.cdn.byteark.com/live/playlist_576p/index.m3u8'})
    }

    _onOrientationChange(e) {
      width = Dimensions.get('window');
    }

    getMaikhao(){
      return fetch('https://maikhao.herokuapp.com')
      .then(response => response.json())
      .then((response) => {
          this.setState({datanews: response, refreshing: false,});
      }).catch((err) => {
          console.log('fetch', err)
      });
    }

    getKhaocrasmid(){
      return fetch('https://khaocrasmid.herokuapp.com/')
      .then(response => response.json())
      .then((response) => {
          this.setState({khaocrasmid: response, refreshing: false, isReady: true});
      }).catch((err) => {
          console.log('fetch', err)
      });
    }

    getKhaocrasyen(){
      return fetch('https://khaocrasyen.herokuapp.com/')
      .then(response => response.json())
      .then((response) => {
          this.setState({khaocrasyen: response, refreshing: false,});
      }).catch((err) => {
          console.log('fetch', err)
      });
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.getMaikhao();
      this.getKhaocrasyen();
      this.UriLive();
      this.getKhaocrasmid();
    }


  render() {

    const {width, height} = this.state.window;
    const mode = height > width ? "portrait" : "landscape";
    console.log(`New dimensions ${width}x${height} (${mode})`);

    const { navigate } = this.props.navigation;
    if (!this.state.isReady) {
      return (
        <Container style={styles.container}>
        <Header style={{backgroundColor: "#fff",}}>
           <Left>
             <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
               <Icon name="menu" size={25} color="#757575" />
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
        <AdMini adsManager={adsManager} />
        <View style={styles.liveHead} >
            <Text style={styles.texth}>นิวหมายข่าว</Text>
        </View>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}>
            <Pulse size={30} color="#ec008c"  />
        </View>
        <View style={styles.liveHead} >
            <Text style={styles.texth}>ข่าวชนข่าวเที่ยง</Text>
        </View>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}>
            <Pulse size={30} color="#ec008c"  />
        </View>
        <View style={styles.liveHead} >
            <Text style={styles.texth}>ข่าวชนข่าวเย็น</Text>
        </View>
        <View style={{ flex:1,justifyContent:'center', alignItems:'center'}}>
            <Pulse size={30} color="#ec008c"  />
        </View>
           <View style={{marginTop:20,marginBottom:20,justifyContent:'center'}}>
               <Text style={{
                 fontSize: 24, 
                 fontFamily: 'DBRegular',
                 textAlign: 'center',
                 color:'#2f3542',
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
      <Container style={styles.container}>
        <Header style={{backgroundColor: "#fff",}}>
           <Left>
             <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
               <Icon name="menu" size={25} color="#757575" />
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
        <AdMini adsManager={adsManager} />
        <View style={styles.liveHead} >
            <Text style={styles.texth}>นิวหมายข่าว</Text>
        </View>
        <ScrollView
        >

            <FlatList
                horizontal
                pagingEnabled
                data={this.state.datanews}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView',{itemId: item.contentDetails.videoId, itemTittle: item.snippet.title})}><Maikhao item={item} index={index} /></TouchableOpacity> }
                keyExtractor={(item, index) => index}
              />

           </ScrollView>
           <View style={styles.liveHead} >
            <Text style={styles.texth}>ข่าวชนข่าวเที่ยง</Text>
           </View>
           <ScrollView
        >

            <FlatList
                horizontal
                pagingEnabled
                data={this.state.khaocrasmid}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView',{itemId: item.contentDetails.videoId, itemTittle: item.snippet.title})}><Khaocrasmid item={item} index={index} /></TouchableOpacity> }
                keyExtractor={(item, index) => index}
              />

           </ScrollView>
           <View style={styles.liveHead} >
            <Text style={styles.texth}>ข่าวชนข่าวเย็น</Text>
           </View>
           <ScrollView
        >

            <FlatList
                horizontal
                pagingEnabled
                data={this.state.khaocrasyen}
                renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('YoutubeView',{itemId: item.contentDetails.videoId, itemTittle: item.snippet.title})}><Khaocrasyen item={item} index={index} /></TouchableOpacity> }
                keyExtractor={(item, index) => index}
              />

           </ScrollView>
           <View style={{marginTop:20,marginBottom:20,justifyContent:'center'}}>
               <Text style={{
                 fontSize: 24, 
                 fontFamily: 'DBRegular',
                 textAlign: 'center',
                 color:'#2f3542',
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
export default Programs;
