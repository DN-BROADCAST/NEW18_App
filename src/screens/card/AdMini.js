import React from "react";
import { View, StyleSheet, Image, Dimensions, Platform, } from "react-native";
import {
  Body,
  CardItem,
  Text,
  Left,
  Thumbnail,
  Right
} from "native-base";

import { FacebookAds } from "expo";

var { width, } = Dimensions.get('window');
const imageHeight = Math.round(width * 9 / 16);

const AdComponent = FacebookAds.withNativeAd(({ nativeAd }) => (
  <View>{nativeAd.title && (
    <View style={{ backgroundColor: "#464646", height: 1 }} />
  )}
    {nativeAd.title && (<CardItem style={{ backgroundColor: "#282828" }} cardBody>
      <Left style={styles.NewsLeft} >
        <Body>
            <Text style={styles.title}>{nativeAd.title}</Text>
            <Text note style={styles.description}>{nativeAd.description}{imageHeight}</Text>
        </Body>
      </Left>
      <Right>
        <Thumbnail style={styles.NewsThumbnail} square large source={{ uri: nativeAd.coverImage }} />
      </Right>
    </CardItem>
  )}
    {nativeAd.icon && (<CardItem style={{ backgroundColor: "#282828" }}>
      <Left>
        <Thumbnail square small source={{ uri: nativeAd.icon }} />
        <Text note>ได้รับการสนับสนุน</Text>
      </Left>
      <View style={styles.button}>
        <Text>{nativeAd.callToActionText}</Text>
      </View>
    </CardItem>
  )}
  </View>
));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginTop: 5,
  },
  coverImage: {
    width: width - 5,
    ...Platform.select({
      ios: {
        height: imageHeight - 5,
      },
      android: {
        height: imageHeight - 5,
      },
    }),
  },
  button: {
    borderColor: '#CDCDCD',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  title: {
    color: "#FFF",
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    color: "#B0B0B0",
    fontSize: 12,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  NewsLeft: {
    width: 400
  },
  NewsText: {
    fontSize: 25,
    fontFamily: 'DBRegular',
    width: width
  },
  NewsThumbnail: {
    borderRadius: 5,
    width: 100,
    margin: 10,
  },
  NewsView: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    width: width - 20,
    margin: 5,
  },
});

export default AdComponent;

/*  <View>
    <CardItem cardBody>
          <Left style={styles.NewsLeft} >
          <Body>
                <Text style={styles.title}>{nativeAd.title}</Text>
                {nativeAd.subtitle && (
                <Text style={styles.subtitle}>{nativeAd.subtitle}</Text>
                )}
                {nativeAd.description && (
                <Text note style={styles.description}>{nativeAd.description}{imageHeight}</Text>
                )}
            </Body>
          </Left>
          <Right>
            <Thumbnail style={styles.NewsThumbnail} square source={{ uri: nativeAd.coverImage }} />
          </Right>
        </CardItem>
        <CardItem>
        <Left>
        <Thumbnail square small source={{ uri: nativeAd.icon }} />
        <Text note>Sponsor</Text>
        </Left>
        <View style={styles.button}>
          <Text>{nativeAd.callToActionText}</Text>
        </View>
      </CardItem>
      </View> */
