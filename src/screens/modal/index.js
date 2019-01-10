import React from 'react';
import { Modal, View, StyleSheet, Image, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Content,
    Button,
    Card,
    Text,
    Form,
    Item,
    Input,
    Label,
    Left,
    Body,
    Right,
    Title,
    Picker,
    Toast,
  } from "native-base";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Field,reduxForm } from 'redux-form';
import Touchable from 'react-native-platform-touchable';
import Expo from "expo";
import * as firebase from 'firebase';
import ImageLoad from 'react-native-image-placeholder';

import { Colors, Layout } from '../../constants';

var { width } = Dimensions.get('window');
const height = Math.round(width * 9 / 16);

const validate = values => {
    const error = {};
    error.email = '';
    error.fname = '';
    error.lname = '';
    error.age = '';
    error.address = '';
    error.phone = '';
    var ema = values.email;
    var fnm = values.fname;
    var lnm = values.lname;
    var age = values.age;
    var add = values.address;
    var ph = values.phone;
    if (values.email === undefined){
      ema = '';
    }
    if (values.fname === undefined){
      fnm = '';
    }
    if (values.lname === undefined){
      lnm = '';
    }
    if (values.age === undefined){
        age = '';
    }
    if (values.address === undefined){
        add = '';
    }
    if (values.phone === undefined){
        ph = '';
    }
    if (ema.length < 8 && ema !== ''){
      error.email = 'too short';
    }
    if (!ema.includes('@') && ema !== ''){
      error.email = '@ not included';
    }
    if (fnm.length > 30){
      error.fname = 'สามารถกรอกได้ไม่เกิน 30 ตัวอักษร';
    }
    if (lnm.length > 50){
        error.lname = 'สามารถกรอกได้ไม่เกิน 50 ตัวอักษร';
    }
    if (isNaN(age) && age !== '') {
        error.age = 'กรุณากรอกอายุเป็นตัวเลขเท่านั้น';
    }
    if (age.length > 3) {
        error.age = 'สามารถกรอกได้ไม่เกิน 3 ตัวอักษร';
    }
    if (add.length > 1000){
        error.address = 'สามารถกรอกได้ไม่เกิน 1000 ตัวอักษร';
    }
    if (isNaN(ph) && ph !== '') {
        error.phone = 'กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลขเท่านั้น';
    }
    if (ph.length > 10){
        error.phone = 'สามารถกรอกได้ไม่เกิน 10 ตัวอักษร';
    }

    return error;
  };

class ModalExample extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        text: 'test',
        selected1: undefined,
        selected2: undefined,
        modalVisible: false,
        animationType: 'none',
        formsumbit: 'กรุณากรอกข้อมูลของท่านให้ครบถ้วน',
        data: null,
    };
    this.renderInput = this.renderInput.bind(this);
  }

  componentWillMount() {
    var snap = '';
    var deviceid = Expo.Constants.deviceId;
    var firebaseRef = firebase.database().ref("/events/01/" + deviceid).orderByChild("openon");
    firebaseRef.once('value').then(function(snapshot) {
        snap = snapshot.val();
    }).then(response => {
        if (snap !== '' && snap !== null)
        {
            this.setState({formsumbit:'ท่านเคยลงทะเบียนแล้ว', data: snap});
        }
    });
}

  renderInput({ input, label, type, meta: { touched, error, warning } }){
    var hasError = false;
    if (error !== undefined){
      hasError = true;
    }
    return (
      <Item floatingLabel error= {hasError}>
      <Label> {label} {hasError ? <Text>{error}</Text> : <Text />}</Label>
        <Input {...input}/>
      </Item>
    );
  }
  submit = values => {
    if (values.age === undefined){
        values.age = '';
    }
    if (values.fname === undefined){
        values.fname = '';
    }
    if (values.lname === undefined){
        values.lname = '';
    }
    if (values.address === undefined){
        values.address = '';
    }
    if (values.fname === undefined && values.fname.length < 30) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (values.lname === undefined && values.lname.length < 50) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (values.age === undefined && values.age.length < 3 && !isNaN(values.age)) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (this.state.selected1 === undefined) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (this.state.selected2 === undefined) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (values.address === undefined && values.address.length < 1000) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else if (values.phone === undefined && !isNaN(values.phone)) {
        this.setState({formsumbit:'ท่านกรอกข้อมูลไม่ครบถ้วน'});
    } else {
        this.setState({formsumbit:'บันทึกข้อมูลเรียบร้อยแล้ว'});
        var deviceid = Expo.Constants.deviceId;
        var devicename = Expo.Constants.deviceName;
        var datetime = new Date().toString();
        firebase.database().ref("/events/01/" + deviceid).set({ devicename: devicename, readon: datetime, sex: this.state.selected1, information: this.state.selected2, data:values,});
        Toast.show({
          text: "บันทึกข้อมูลเรียบร้อยแล้ว",
          type: "success",
          buttonText: "Okay",
          duration: 5000
        });
        this.setState({ modalVisible: false });
    }
  };

  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  onValueChange1(value: string) {
    this.setState({
      selected1: value
    });
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.state.data === null) {
    return (
      <View style={styles.container}>
        <Modal
          visible={false}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View />
        </Modal>

        <Modal
          animationType={this.state.animationType}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <Container>
          <Header style={{ backgroundColor: "#C54B4E", }}>
            <Left>
              <Button transparent onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Icon name="close" size={25} style={{color: "#fff"}} />
              </Button>
            </Left>
            <Body>
              <Title style={{color:"#fff"}}>ลงทะเบียน</Title>
            </Body>
            <Right />
          </Header>

          <Content style={{backgroundColor: "#99384E"}}>
          <ImageLoad
          source={{uri : "https://firebasestorage.googleapis.com/v0/b/new18-1a1c2.appspot.com/o/event02.png?alt=media&token=6bc90e17-6875-4fee-b724-6f86595c7e94"}} style={styles.image2}/>
            <Card style={styles.mb}>
            <Button disabled success full><Text style={{color:"#fff"}}>{this.state.formsumbit}</Text></Button>
            <Form>
            <Field label="ชื่อ" name="fname" component={this.renderInput} />
            <Field label="นามสกุล" name="lname" component={this.renderInput} />
            <Field label="อายุ" name="age" component={this.renderInput} />
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down-drop-circle" size={20} />}
              placeholder="เพศ"
              placeholderStyle={{ color: "#5F5F5F" }}
              placeholderIconColor="#5F5F5F"
              headerStyle={{ backgroundColor: "#C54B4E" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              style={{ width: undefined, paddingTop:30 }}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange1.bind(this)}
            >
              <Picker.Item label="ชาย" value="0" />
              <Picker.Item label="หญิง" value="1" />
            </Picker>
            <Field label="ที่อยู่" name="address" component={this.renderInput} />
            <Field label="เบอร์โทรศัพท์" name="phone" component={this.renderInput} />
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down-drop-circle" size={20} />}
              placeholder="ทราบข้อมูลของกิจกรรมนี้จาก"
              placeholderStyle={{ color: "#5F5F5F" }}
              placeholderIconColor="#5F5F5F"
              headerStyle={{ backgroundColor: "#C54B4E" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              style={{ width: undefined , paddingTop:30 , paddingBottom:30 }}
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Picker.Item label="TV" value="0" />
              <Picker.Item label="Facebook" value="1" />
              <Picker.Item label="Application" value="2" />
              <Picker.Item label="Website" value="3" />
              <Picker.Item label="อื่นๆ" value="4" />
            </Picker>
          </Form>
            </Card>
            <Button large full danger onPress={handleSubmit(this.submit)}>
              <Icon name="cloud-download" size={25} style={{color:"#fff"}} />
              <Text>บันทึก</Text>
            </Button>
          </Content>
        </Container>
        </Modal>
        <Touchable
          onPress={() => {
            this.setState({ modalVisible: true, animationType: 'slide' });
          }}>
          <Image
          source={require("../../../assets/event01.png")} style={styles.image}/>
        </Touchable>

        {Layout.isSmallDevice && <View style={{ marginBottom: 10 }} />}
      </View>
    );}
    else {
        return (
          <View style={styles.container}>
            <Modal
              visible={false}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <View />
            </Modal>

            <Modal
              animationType={this.state.animationType}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert('Modal has been closed.');
              }}>
              <Container>
              <Header style={{ backgroundColor: "#C54B4E", }}>
                <Left>
                  <Button transparent onPress={() => {
                      this.setState({ modalVisible: false });
                    }}>
                    <Icon name="close" size={25} style={{color: "#fff"}} />
                  </Button>
                </Left>
                <Body>
                  <Title style={{color:"#fff"}}>ลงทะเบียน</Title>
                </Body>
                <Right />
              </Header>

              <Content style={{backgroundColor: "#99384E"}}>
              <ImageLoad
              source={{uri : "https://firebasestorage.googleapis.com/v0/b/new18-1a1c2.appspot.com/o/event02.png?alt=media&token=6bc90e17-6875-4fee-b724-6f86595c7e94"}} style={styles.image2}/>
                <Card style={styles.mb}>
                <Button disabled success full><Text style={{color:"#fff"}}>{this.state.formsumbit}</Text></Button>
                <Form>
                <Field label={this.state.data.data.fname} name="fname" component={this.renderInput} />
                <Field name="lname" label={this.state.data.data.lname} component={this.renderInput} />
                <Field name="age" label={this.state.data.data.age} component={this.renderInput} />
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down-drop-circle" size={20} />}
                  placeholder="เพศ"
                  placeholderStyle={{ color: "#5F5F5F" }}
                  placeholderIconColor="#5F5F5F"
                  headerStyle={{ backgroundColor: "#C54B4E" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  style={{ width: undefined, paddingTop:30 }}
                  selectedValue={this.state.data.sex}
                  onValueChange={this.onValueChange1.bind(this)}
                >
                  <Picker.Item label="ชาย" value="0" />
                  <Picker.Item label="หญิง" value="1" />
                </Picker>
                <Field name="address" label={this.state.data.data.address.substring(0, 30)} component={this.renderInput} />
                <Field name="phone" label={this.state.data.data.phone} component={this.renderInput} />
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down-drop-circle" size={20} />}
                  placeholder="ทราบข้อมูลของกิจกรรมนี้จาก"
                  placeholderStyle={{ color: "#5F5F5F" }}
                  placeholderIconColor="#5F5F5F"
                  headerStyle={{ backgroundColor: "#C54B4E" }}
                  headerBackButtonTextStyle={{ color: "#fff" }}
                  headerTitleStyle={{ color: "#fff" }}
                  style={{ width: undefined , paddingTop:30 , paddingBottom:30 }}
                  selectedValue={this.state.data.information}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="TV" value="0" />
                  <Picker.Item label="Facebook" value="1" />
                  <Picker.Item label="Application" value="2" />
                  <Picker.Item label="Website" value="3" />
                  <Picker.Item label="อื่นๆ" value="4" />
                </Picker>
              </Form>
                </Card>
                <Button large full danger onPress={handleSubmit(this.submit)}>
                  <Icon name="cloud-download" size={25} style={{color:"#fff"}} />
                  <Text>บันทึก</Text>
                </Button>
              </Content>
            </Container>
            </Modal>
            <Touchable
              onPress={() => {
                this.setState({ modalVisible: true, animationType: 'slide' });
              }}>
              <Image
              source={require("../../../assets/event01.png")} style={styles.image}/>
            </Touchable>

            {Layout.isSmallDevice && <View style={{ marginBottom: 10 }} />}
          </View>
        );}
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
    flexDirection: Layout.isSmallDevice ? 'column' : 'row',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width - 20,
    height: height - 80,
  },
  image2: {
    width: width,
    height: Math.round(width * 16 / 16),
  },
  button: {
    alignSelf: 'flex-start',
    flexGrow: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: Colors.tintColor,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default reduxForm({
    form: 'data',
    validate
  })(ModalExample);
