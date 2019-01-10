import React from 'react';
import { View } from 'react-native';
import { CardItem, Text, Right, Left, Thumbnail, } from 'native-base';
import Moment from 'react-moment';
import styles from "./styles";

const News = ({ item, index }) => (
    <View>
        <CardItem cardBody>
            <Left style={styles.NewsLeft} >
                <Text style={styles.NewsText}>{item.news_title}{"\n"}
                    <Moment style={{ color: 'rgba(97,97,97,0.88)', fontSize: 13 }} element={Text} fromNow>{item.news_public}</Moment>
                </Text>
            </Left>
            <Right>
                <Thumbnail style={styles.NewsThumbnail} square large source={{ uri: 'http://www.newtv.co.th/images/thumbnail/l/' + item.news_thumbnail_big }} />
            </Right>
        </CardItem>
        <View style={{ backgroundColor: "#FAFAFA", height: 5 }} />
    </View>
);


export default News;
