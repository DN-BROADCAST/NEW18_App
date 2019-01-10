import React from "react";
import Setup from "./src/boot/setup";
import * as Expo from "expo";
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyATRR51UPyyfhjZPUXUVZ82fAA4QeVefMU",
    authDomain: "new18-1a1c2.firebaseapp.com",
    databaseURL: "https://new18-1a1c2.firebaseio.com",
    projectId: "new18-1a1c2",
    storageBucket: "new18-1a1c2.appspot.com",
    messagingSenderId: "1022947851739"
};

var gdata = null;

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  registerForPushNotificationsAsync = async () => {
    const { existingStatus } = await Expo.Permissions.getAsync(Expo.Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Expo.Permissions.askAsync(Expo.Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Expo.Notifications.getExpoPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    var deviceid = Expo.Constants.deviceId;
    var devicename = Expo.Constants.deviceName;
    var datetime = new Date().toString();
    var d = new Date();
    firebase.database().ref("/users/" + deviceid).set({ token:token, lastuse: datetime, devicename: devicename});
    firebase.database().ref("/actions/openapp/" + deviceid).push({ token:token, openon: datetime, devicename: devicename});
    firebase.database().ref("/actions/openapp_sort_by_date/" + (d.getMonth() + 1 ).toString() + "-" + d.getDate().toString() + "-" + d.getFullYear().toString() + "/" + deviceid).push({ token:token, openon: datetime, devicename: devicename});
    //call the push notification 
  }

  componentDidMount = async () => {
    firebase.auth().signInWithEmailAndPassword('new18_app_push@newtv.co.th', 'AIzaSyDqH7HGunYqHZbpPWf9WeCu4ZS9B21zJiM');
    this.registerForPushNotificationsAsync();
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Expo.Updates.fetchUpdateAsync();
        // ... notify user of update ...
        Expo.Updates.reloadFromCache();
      }
    } catch (e) {
      // handle or log error
    }
  }

  render() {
  return <Setup />;
  }
}

export class Pushnotification extends React.Component {
  gdata = '';
  componentWillMount() {
    this.listener = Expo.Notifications.addListener(this.listen);
    if (this.props.exp.notification) {
      this.listen(this.props.expo.notification);
    }
  }

  listen =({ origin, data }) => {
    gdata = data.idnews;
  }

  render(){
      return gdata;
  }
}

