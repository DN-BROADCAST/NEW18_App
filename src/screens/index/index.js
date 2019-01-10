import React, { Component } from 'react';
import { Image, Platform, StyleSheet, View, Text, } from 'react-native';
import { Container, Header, Button, Left, Body, Right, Tab, Tabs } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsList from './newslist';
import PoliticsNews from "./politicsNews";
import CrimeNews from "./crimeNews";
import GNews from "./generalNews";
import InEnterNews from "./EnterNews";
import ThaiEnterNews from "./thaiEnterNews";
import InterNews from "./interNews";
import TodayNews from './todayNews';
import Video from './Videos';
import { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { PagerTitleIndicator, IndicatorViewPager, } from 'rn-viewpager';
import * as Expo from "expo";
import { Pushnotification } from '../../../App';

export default class Index extends React.Component {

  componentWillMount() {
    this.listener = Expo.Notifications.addListener(this.listen);
  }

  componentDidMount() {
  }

  listen = ({ origin, data }) => {
    this.props.navigation.navigate('NHCardImage', { itemId: data.idnews, });
  }

  render() {
    const { navigate } = this.props.navigation;
    const navigation = this.props.navigation;
    const initialPage = this.props.initialPage ? this.props.initialPage : 0;
    if (Platform.OS == 'ios') {
      return (
        <Container>
          <Header hasTabs style={{ backgroundColor: "#FFF", }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
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
          <Tabs initialPage={initialPage} tabBarActiveTextColor={'#981A30'}
            tabBarUnderlineStyle={{ backgroundColor: '#981A30' }}
            style={{ backgroundColor: "#FFF", }} renderTabBar={() => <ScrollableTabBar />}>
            <Tab textStyle={{ fontFamily: 'DBRegular', fontSize: 22 }}
              heading="ข่าวล่าสุด">
              <NewsList navigation={navigation} />
            </Tab>
            <Tab heading="วิดีโอ">
              <Video navigation={navigation} />
            </Tab>
            <Tab heading="ข่าวทั่วไป">
              <GNews navigation={navigation} />
            </Tab>
            <Tab heading="บันเทิงไทย">
              <ThaiEnterNews navigation={navigation} />
            </Tab>
            <Tab heading="บันเทิงต่างประเทศ">
              <InEnterNews navigation={navigation} />
            </Tab>
            <Tab heading="อาชญากรรม">
              <CrimeNews navigation={navigation} />
            </Tab>
            <Tab heading="การเมือง-เศรษฐกิจ">
              <PoliticsNews navigation={navigation} />
            </Tab>
            <Tab heading="ต่างประเทศ">
              <InterNews navigation={navigation} />
            </Tab>
            <Tab heading="วันนี้มีอะไร">
              <TodayNews navigation={navigation} />
            </Tab>
          </Tabs>
        </Container>
      );

      if (Pushnotification !== null) {
        this.props.navigation.navigate('NHCardImage', { itemId: Pushnotification, });
      }
    }
    else {
      return (
        <Container>
          <Header hasTabs style={{ backgroundColor: "#FFF", }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
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
          <Tabs locked initialPage={initialPage} tabBarActiveTextColor={'#981A30'}
            tabBarUnderlineStyle={{ backgroundColor: '#981A30' }}
            style={{ backgroundColor: "#FFF", }} renderTabBar={() => <ScrollableTabBar />}>
            <Tab heading="ข่าวล่าสุด">
              <NewsList navigation={navigation} />
            </Tab>
            <Tab heading="วิดีโอ">
              <Video navigation={navigation} />
            </Tab>
            <Tab heading="ข่าวทั่วไป">
              <GNews navigation={navigation} />
            </Tab>
            <Tab heading="บันเทิงไทย">
              <ThaiEnterNews navigation={navigation} />
            </Tab>
            <Tab heading="บันเทิงต่างประเทศ">
              <InEnterNews navigation={navigation} />
            </Tab>
            <Tab heading="อาชญากรรม">
              <CrimeNews navigation={navigation} />
            </Tab>
            <Tab heading="การเมือง-เศรษฐกิจ">
              <PoliticsNews navigation={navigation} />
            </Tab>
            <Tab heading="ต่างประเทศ">
              <InterNews navigation={navigation} />
            </Tab>
            <Tab heading="วันนี้มีอะไร">
              <TodayNews navigation={navigation} />
            </Tab>
          </Tabs>
        </Container>
      );
      if (Pushnotification !== null) {
        this.props.navigation.navigate('NHCardImage', { itemId: Pushnotification, });
      }
    }
  }
}
