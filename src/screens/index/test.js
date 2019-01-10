import React, { Component } from 'react';
import { Image, ViewPagerAndroid, Platform, View, Text, StyleSheet, } from 'react-native';
import { Container, Header, Button, Left, Body, Right, Tab, Tabs  } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsList from './newslist';
import { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import {PagerTitleIndicator, IndicatorViewPager,} from 'rn-viewpager';

export default class Index extends React.Component {

  render() {
    const { navigate } = this.props.navigation;
    const navigation = this.props.navigation;
    if (Platform.OS == 'ios') {
    return (
        <Container>
       <Header hasTabs style={{backgroundColor: "#FFF",}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
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
        <Tabs tabBarActiveTextColor={'black'} style={{backgroundColor: "#FFF",}} renderTabBar={()=> <ScrollableTabBar/>}>
          <Tab heading="ข่าวล่าสุด">
            <NewsList navigation={navigation} />
          </Tab>
          <Tab heading="Tab1">
          </Tab>
          <Tab heading="Tab2">
          </Tab>
        </Tabs>
      </Container>
    );
  }
  else {
    var styles = {
      viewPager: {
        flex: 1
      },
      pageStyle: {
        alignItems: 'center',
        padding: 20,
      }
    }
    return (
      <Container>
     <Header hasTabs style={{backgroundColor: "#FFF",}}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
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
      <View style={{flex:1}}>
      <IndicatorViewPager
     style={{flex:1, paddingTop:20, backgroundColor:'white'}}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{position: 'absolute',paddingTop:20}}>
                    <NewsList navigation={navigation} />
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                        <Text>page two</Text>
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>
      </View>
    </Container>
  );
  }
  }

  _renderTitleIndicator() {
    return <PagerTitleIndicator style={styles.indicatorContainer}
    itemTextStyle={styles.indicatorText}
    selectedItemTextStyle={styles.indicatorSelectedText} titles={['ข่าวล่าสุด', 'two', 'three']} />;
  }
}
const styles = StyleSheet.create({
  indicatorContainer: {
    backgroundColor:'#FFF',
      height: 50,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
  },
  indicatorText: {color: 'green'},
  indicatorSelectedText: {
      color: 'orange'
  }
});