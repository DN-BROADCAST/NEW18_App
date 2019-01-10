import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge,
  Separator
} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/NEW18.png");
const datas = [
  {
    name: "รายการสด",
    route: "Live",
    icon: "television",
    bg: "#C5F442"
  },
  /*{
    name: "รายการย้อนหลัง",
    route: "Programs",
    icon: "television",
    bg: "#C5F442"
  },*/
  {
    name: "ข่าวล่าสุด",
    route: "Index",
    icon: "newspaper",
    bg: "#C5F442"
  },
  {
    name: "วิดีโอ",
    route: "Videos",
    icon: "youtube",
    bg: "#C5F442"
  },
  {
    name: "ข่าวทั่วไป",
    route: "GeneralRoute",
    icon: "book-open",
    bg: "#C5F442"
  },
  {
    name: "บันเทิงไทย",
    route: "ThaiEnterRoute",
    icon: "ticket",
    bg: "#C5F442",
  },
  {
    name: "บันเทิงต่างประเทศ",
    route: "EnterRoute",
    icon: "ticket-account",
    bg: "#C5F442",
  },
  {
    name: "อาชญากรรม",
    route: "CrimeRoute",
    icon: "account-off",
    bg: "#C5F442"
  },
  {
    name: "การเมือง-เศรษฐกิจ",
    route: "PoliticsRoute",
    icon: "bank",
    bg: "#C5F442"
  },
  {
    name: "ต่างประเทศ",
    route: "InterRoute",
    icon: "earth",
    bg: "#C5F442"
  },
  {
    name: "วันนี้มีอะไร",
    route: "TodayRoute",
    icon: "calendar-today",
    bg: "#C5F442"
  },
  /*{
    name: "Button",
    route: "NHButton",
    icon: "radio-button-off",
    bg: "#1EBC7C",
    types: "9"
  },
  {
    name: "Card",
    route: "NHCard",
    icon: "keypad",
    bg: "#B89EF5",
    types: "5"
  },
  {
    name: "Check Box",
    route: "NHCheckbox",
    icon: "checkmark-circle",
    bg: "#EB6B23"
  },
  {
    name: "Deck Swiper",
    route: "NHDeckSwiper",
    icon: "swap",
    bg: "#3591FA",
    types: "2"
  },
  {
    name: "Fab",
    route: "NHFab",
    icon: "help-buoy",
    bg: "#EF6092",
    types: "2"
  },
  {
    name: "Form & Inputs",
    route: "NHForm",
    icon: "call",
    bg: "#EFB406",
    types: "12"
  },
  {
    name: "Icon",
    route: "NHIcon",
    icon: "information-circle",
    bg: "#EF6092"
  },
  {
    name: "Layout",
    route: "NHLayout",
    icon: "grid",
    bg: "#9F897C",
    types: "5"
  },
  {
    name: "List",
    route: "NHList",
    icon: "lock",
    bg: "#5DCEE2",
    types: "7"
  },
  {
    name: "ListSwipe",
    route: "ListSwipe",
    icon: "swap",
    bg: "#C5F442",
    types: "2"
  },
  {
    name: "Picker",
    route: "NHPicker",
    icon: "arrow-dropdown",
    bg: "#F50C75"
  },
  {
    name: "Radio",
    route: "NHRadio",
    icon: "radio-button-on",
    bg: "#6FEA90"
  },
  {
    name: "SearchBar",
    route: "NHSearchbar",
    icon: "search",
    bg: "#29783B"
  },
  {
    name: "Segment",
    route: "Segment",
    icon: "menu",
    bg: "#0A2C6B",
    types: "2"
  },
  {
    name: "Spinner",
    route: "NHSpinner",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Tabs",
    route: "NHTab",
    icon: "home",
    bg: "#AB6AED",
    types: "3"
  },
  {
    name: "Thumbnail",
    route: "NHThumbnail",
    icon: "image",
    bg: "#cc0000",
    types: "2"
  },
  {
    name: "Toast",
    route: "Toast",
    icon: "albums",
    bg: "#C5F442"
  },
  {
    name: "Typography",
    route: "NHTypography",
    icon: "paper",
    bg: "#48525D"
  }*/
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
//<Image square style={styles.drawerImage} source={drawerImage} />

/*<List>
            <ListItem itemDivider>
              <Text>efwefw</Text>
            </ListItem>
          </List>*/
