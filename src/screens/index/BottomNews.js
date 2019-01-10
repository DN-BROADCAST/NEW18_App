import React from 'react';
import { Share, View, Dimensions } from 'react-native';
import { Body, CardItem, Text, Button, Left, Thumbnail, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebBrowser } from "expo";
import Moment from 'react-moment';
var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);

const BottomNews = ({ item, index }) => (
    <View>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}>
            <CardItem cardBody>
                <Thumbnail source={{ uri: 'http://www.newtv.co.th/images/thumbnail/l/' + item.news_thumbnail_big }} style={{ height: height, width: null, flex: 1, borderRadius: 10, }} />
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
                <Button transparent
                    onPress={() => { WebBrowser.openBrowserAsync('http://www.newtv.co.th/news/' + item.idnews) }}>
                    <Icon name="web" size={20} color="#757575" />
                </Button>
            </CardItem>
        </View>
        <View style={{ backgroundColor: "#FAFAFA", height: 5 }} />
    </View>
);

export default BottomNews;
