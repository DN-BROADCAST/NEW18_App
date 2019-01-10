import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Right,
  List,
  ListItem
} from "native-base";
import styles from "./styles";

const datas = [
  {
    route: "BasicCard",
    text: "Basic Card"
  },
  {
    route: "NHCardList",
    text: "Card List"
  },
  {
    route: "NHCardImage",
    text: "Card Image"
  },
  {
    route: "NHCardShowcase",
    text: "Card Showcase"
  },
  {
    route: "NHCardHeaderAndFooter",
    text: "Card Header & Footer"
  },
  {
    route: "NewsList",
    text: "News List",
  }
];

class NHCard extends Component {
     constructor(){
        super()
        this.states = {
            title:"คลื่นมหาชนร่ำไห้เคลื่อนสังขารสรงน้ำหลวงเจ้าอาวาสวัดท่าซุง",
            id:11577,
            uri:"http://www.newtv.co.th/images/thumbnail/s/20180212114656_new18.jpg",
            detail:'<p><b>คลื่นมหาชนร่ำไห้อาลัยร่วมขบวนเคลื่อนย้ายสังขาร หลวงพ่อพระราชภาวนาโกศล เจ้าอาวาสวัดจันทรารามหรือวัดท่าซุง ที่ละสังขารด้วยอาการอาพาธมะเร็ง จากวิหารแก้ว 100 เมตร ไปยังมหาวิหาร 100 ปี หลวงพ่อพระพรหมยานหรือศาลา 12 ไร่  เพื่อเตรียมสถานที่ในพิธีพระราชทานน้ำหลวงสรงศพและพิธีสวดพระอภิธรรมในวันนี้ </b></p><p><img src=\"http://newtv.co.th/images/content/ct_20180212112306685.png\" style=\"width: 1240px;\"><br></p><p>เมื่อวันที่ 12 ก.พ. ที่ จ.อุทัยธานี คณะสงฆ์วัดท่าซุง ได้อัญเชิญสังขารของหลวงพ่อพระราชภาวนาโกศล เจ้าอาวาสวัดท่าซุง ที่ละสังขาร ด้วยอาการอาพาธ รวมอายุ 69 ปี 45 พรรษา ออกจากวิหารแก้ว 100 เมตร สู่ศาลา 12 ไร่ โดยมีวงโยธวาทิตของโรงเรียนพระสุธรรมยานเถระวิทยา ซึ่งอยู่ในความสงเคราะห์ของวัดจันทรารามหรือวัดท่าซุง นำขบวน ตามด้วยคณะสงฆ์จากวัดต่างๆ รวมทั้งคลื่นมหาชน คณะศิษยานุศิษย์และประชาชนจำนวนมาก ซึ่งได้พร้อมใจกันสวมชุดขาว เดินพนมมือไปตามถนนหน้าวัด เพื่อมุ่งสู่มหาวิหาร 100 ปี หลวงพ่อพระพรหมยานหรือศาลา 12 ไร่  โดยตลอดเส้นทางคลื่นมหาชนต่างร่ำไห้ด้วยความอาลัย ต่อจากนั้นทั้งหมดได้ร่วมกันสวดมนต์และปฏิบัติธรรมนั่งสมาธิ ตามคำสอนของหลวงพ่อที่เคยปฏิบัติมา </p><p><img src=\"http://newtv.co.th/images/content/ct_20180212112322820.png\" style=\"width: 1240px;\"><br></p><p><img src=\"http://newtv.co.th/images/content/ct_20180212112344157.png\" style=\"width: 1240px;\"><br></p><p>ทั้งนี้กำหนดการให้พุทธศาสนิกชนร่วมสรงน้ำศพ จะเริ่มในช่วงเวลา 13.00น. ส่วนเวลา 16.00 น.จัดให้มีพิธีพระราชทานน้ำหลวงสรงศพ จากนั้นก็จะมีการสวดพระอภิธรรมในช่วงเวลา 19.00 น. <br></p><p><img src=\"http://newtv.co.th/images/content/ct_20180212112359526.png\" style=\"width: 1240px;\"><br></p>'
        };
    }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Card</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route,{
                    itemId: this.states.id,
                    otherParam: this.states.title,
                    uri: this.states.uri,
                    detail: this.states.detail,
                      })}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: "#999" }} />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHCard;
