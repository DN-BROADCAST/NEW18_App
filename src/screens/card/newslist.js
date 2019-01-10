import React, { Component } from 'react';
import { Image, TouchableOpacity, Alert, Share, View, Linking, RefreshControl, } from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import TopNews from "./TopNews";
import {FlatList} from 'expo';

var BUTTONS = ["ดูในหน้าเว็บ NEW18", "ยกเลิก"];
var CANCEL_INDEX = 2;

const News = ({ item, index }) => (
  <Card>
    <CardItem cardBody>
      <Image source={{ uri: 'http://www.newtv.co.th/images/thumbnail/l/' + item.news_thumbnail_big }} style={{ height: 200, width: null, flex: 1 }} />
    </CardItem>
    <CardItem>
      <Left>
        <Body>
        <Text>{item.news_title}</Text>
        <Text note>{item.category_name}</Text>
        </Body>
      </Left>
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
  </Card>
  );

class NewsList extends Component {

  constructor(){
    super()
    this.state = {
      isReady: false,
      refreshing: false,
      data: [],
      datanews: []
    };
}

  getTOP () {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php?top=true')

    .then(response => response.json())
    .then((response) => {
        this.setState({data: response.data, refreshing: false, isReady: true});
    }).catch((err) => {
        console.log('fetch', err)
    });
  }

  getNews () {
    return fetch('http://newtv.co.th/api/getNewsForMobile.php')
    .then(response => response.json())
    .then((response) => {
        this.setState({datanews: response.data, refreshing: false, isReady: true});
    }).catch((err) => {
        console.log('fetch', err)
    });
  }
  componentWillMount() {
    this.getTOP();
    this.getNews();
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.getTOP();
    this.getNews();
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    else {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
       <Header style={{backgroundColor: "#FFF",}}>
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
          <Card>
          <CardItem style={{backgroundColor: "rgba(0,0,0,0.05)"}} >
              <Left>
                <Body>
                  <Text style={{ fontSize: 30, fontFamily: 'DBRegular' }}>5 เรื่องเด่นสำหรับคุณในขณะนี้</Text>
                </Body>
              </Left>
            </CardItem>
            <FlatList
              data={this.state.data}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('NHCardImage',{itemId: item.idnews,})}><TopNews item={item} index={index} /></TouchableOpacity> }
              keyExtractor={(item, index) => index}
            />
          </Card>
          <Card>
          <FlatList
              data={this.state.datanews}
              renderItem={({ item, index }) => <TouchableOpacity activeOpacity={1} onPress={() => navigate('NHCardImage',{itemId: item.idnews,})}><News item={item} index={index} /></TouchableOpacity> }
              keyExtractor={(item, index) => index}
            />
            </Card>
        </Content>
      </Container>
    );
  }
  }
}
export default NewsList;
