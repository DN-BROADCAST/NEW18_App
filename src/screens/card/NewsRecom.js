import React from 'react';
import {  Share, View, Linking , } from 'react-native';
import { CardItem, Thumbnail, Text, Button, Left, Right, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles";

const NewsRecom = ({ item, index }) => (
    <View>
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
    </View>
);

export default NewsRecom;
