import React from "react";
import { View, StyleSheet, Image, Dimensions, Platform, } from "react-native";
import {
  CardItem,
  Text,
  Left,
  Body,
  Right
} from "native-base";
var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);

import { FacebookAds } from "expo";

var { width, } = Dimensions.get('window');
const imageHeight = Math.round(width * 9 / 16);

const AdComponent = FacebookAds.withNativeAd(({ nativeAd }) => (
  <View>
    <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 5 }}>
      {nativeAd.title && (
        <CardItem cardBody>
          <Image style={{ height: height, width: null, flex: 1, borderRadius: 10, }} source={{ uri: nativeAd.coverImage }} />
        </CardItem>
      )}
      {nativeAd.title && (
        <CardItem>
          <Left>
            {nativeAd.icon && (
              <Image style={styles.icon} source={{ uri: nativeAd.icon }} />
            )}
            <Body>
              <Text style={styles.title}>{nativeAd.title}</Text>
              {nativeAd.description && (
                <Text style={styles.description}>{nativeAd.description}</Text>
              )}
            </Body>
          </Left>
        </CardItem>
      )}
      {nativeAd.subtitle && (
        <CardItem>
          <Left>
            {nativeAd.subtitle && (
              <Text note style={styles.subtitle}>ได้รับการสนับสนุน</Text>
            )}
          </Left>
          <Right>
            <View style={styles.button}>
              <Text>{nativeAd.callToActionText}</Text>
            </View>
          </Right>
        </CardItem>
      )}
    </View>{nativeAd.title && (
      <View style={{ backgroundColor: "#FAFAFA", height: 5 }} />
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
        height: 250,
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
});

export default AdComponent;

/* <Card>
      <CardItem cardBody>
        <Image style={styles.coverImage} source={{ uri: nativeAd.coverImage }} />
      </CardItem>
      <CardItem>
        <Left>
            {nativeAd.icon && (
                <Image style={styles.icon} source={{ uri: nativeAd.icon }} />
            )}
            <Body>
                <Text style={styles.title}>{nativeAd.title}</Text>
                {nativeAd.subtitle && (
                <Text style={styles.subtitle}>{nativeAd.subtitle}</Text>
                )}
                {nativeAd.description && (
                <Text note style={styles.description}>{nativeAd.description}</Text>
                )}
            </Body>
        </Left>
        <View style={styles.button}>
          <Text>{nativeAd.callToActionText}</Text>
        </View>
      </CardItem>
    </Card> */
