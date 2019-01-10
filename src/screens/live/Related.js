import React from 'react';
import { Share, View, Dimensions } from 'react-native';
import { Body, CardItem, Text, Button, Left, Thumbnail, Right, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebBrowser } from "expo";
import Moment from 'react-moment';
var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);
import ImageLoad from 'react-native-image-placeholder';

const Related = ({ item, index }) => (
    <View>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10 }}>
            <CardItem style={{ backgroundColor: "#282828" }} cardBody>
                <Left style={{width: width / 2.5}}>
                    <Thumbnail source={{ uri: 'https://i.ytimg.com/vi/' + item.id.videoId + '/hqdefault.jpg' }} style={{ height: height / 2.5, width: width / 2.5, borderRadius: 0, }} />
                </Left>
                <Body style={{width: width / 1.5}}>
                    <Text style={{ fontFamily: 'DBRegular', fontSize: 22, color: '#FFF', marginRight: 30, marginLeft: -15,}}>{item.snippet.title.length > 50 ? item.snippet.title.substring(0, 50) + '...' : item.snippet.title.substring(0, 50)}</Text>
                    <View style={{marginLeft: -15,}}>
                        <Moment style={{ color: '#B0B0B0', fontFamily: 'DBRegular', fontSize: 20, }} element={Text} fromNow>{item.snippet.publishedAt}</Moment>
                    </View>
                </Body>
                <Button style={{position: "absolute", right: 0,}} transparent onPress={() => Share.share({
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
                    <Icon name="dots-vertical" size={20} color="#B0B0B0" />
                </Button>
            </CardItem>
        </View>
    </View>
);

export default Related;
