import React from 'react';
import { Share, View, Dimensions } from 'react-native';
import { Body, CardItem, Text, Button, Left, Thumbnail, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebBrowser } from "expo";
import Moment from 'react-moment';
var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);
import ImageLoad from 'react-native-image-placeholder';

const Youtube = ({ item, index, Trending }) => (
    <View>
        <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 }}>
            <CardItem style={{ backgroundColor: "#282828" }} cardBody>
                <Thumbnail source={{ uri: 'https://i.ytimg.com/vi/' + item.id.videoId + '/hqdefault.jpg' }} style={{ height: height, width: null, flex: 1, borderRadius: 0, }} />
            </CardItem>
            <CardItem style={{ backgroundColor: "#282828", paddingTop: 5, paddingBottom: 0  }}>
                <Left>
                    <Body>
                        <Text style={{ fontFamily: 'DBRegular', fontSize: 23, color: '#FFF' }}>{item.snippet.title}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem style={{ backgroundColor: "#282828", paddingTop: 0, paddingBottom: 5  }}>
                <Left>
                    {Trending == false ?
                        <Button transparent>
                            <Moment style={{ color: '#B0B0B0' }} element={Text} fromNow>{item.snippet.publishedAt}</Moment>
                        </Button>
                        :
                        <Button transparent>
                            <Text style={{ color: '#B0B0B0' }}>มาแรง</Text>
                        </Button>
                    }
                </Left>
                <Button style={{ marginRight: 20 }} transparent onPress={() => Share.share({
                    message: item.snippet.title + ' http://www.youtube.com/watch?v=' + item.id.videoId,
                    url: 'http://www.youtube.com/watch?v=' + item.id.videoId,
                    title: item.snippet.title
                }, {
                        // Android only:
                        dialogTitle: item.snippet.title,
                        // iOS only:
                        excludedActivityTypes: [
                            'com.apple.UIKit.activity.PostToTwitter'
                        ]
                    })} >
                    <Icon name="share-variant" size={20} color="#FFF" />
                </Button>
            </CardItem>
        </View>
        <View style={{ backgroundColor: "#464646", height: 1 }} />
    </View>
);

export default Youtube;
