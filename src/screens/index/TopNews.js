import React from 'react';
import {  Share, View, Linking , } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Left, Right, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";
import {WebBrowser } from "expo";
import Moment from 'react-moment';

const TopNews = ({ item, index }) => (
  <View>
    <CardItem cardBody>
      <Left style={styles.NewsLeft} >
        <Text style={styles.NewsText}>{item.news_title}</Text>
      </Left>
      <Right>
        <Thumbnail style={styles.NewsThumbnail} square large source={{ uri: 'http://www.newtv.co.th/images/thumbnail/l/' + item.news_thumbnail_big }} />
      </Right>
    </CardItem>
    <CardItem cardBody>
      <Left>
        <Button transparent>
          <Moment style={{ color: 'rgba(97,97,97,0.88)' }} element={Text} fromNow>{item.news_public}</Moment>
        </Button>
      </Left>
      <Button style={{ marginRight: 20 }} transparent onPress={() => Share.share({
        message: item.news_title + 'http://www.newtv.co.th/news/' + item.idnews,
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
      <Button style={{ marginRight: 10 }} transparent
        onPress={() => { WebBrowser.openBrowserAsync('http://www.newtv.co.th/news/' + item.idnews) }}>
        <Icon name="web" size={20} color="#757575" />
      </Button>
    </CardItem>
    <View style={{ backgroundColor: "#FAFAFA", height: 5 }} />
  </View>
);

export default TopNews;
