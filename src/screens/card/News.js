import React from 'react';
import {  Share, Linking , } from 'react-native';
import { Card, CardItem, Image, Text, Button, Left, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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


export default News;
