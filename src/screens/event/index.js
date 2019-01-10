import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'; // 0.1.1
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog'; // 0.9.36
import Button from './Button';
import WeatherView from './WeatherView';

const scaleAnimation = new ScaleAnimation();

export default class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogShow: false,
    };

    this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
  }

  // eslint-disable-next-line
  configureScene() {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  showScaleAnimationDialog() {
    this.scaleAnimationDialog.show();
  }

  renderScene = () => (
    <View style={styles.container}>
      <Button
        text="Show Dialog - Scale Animation"
        onPress={this.showScaleAnimationDialog}
        color="#610D56"
        bgColor="#B9A8FF"
        borderColor="#610D56"
        style={{height: 300,width:150}}
      >
      <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?dpr=1&auto=compress,format&fit=crop&w=1576&h=&q=80&cs=tinysrgb&crop=',
          }}
          style={{height: 300,width:150}} />
          </Button>
    </View>
  );

  render() {
    return (
        <View style={styles.container}>
      <Button
        text="Show Dialog - Scale Animation"
        onPress={this.showScaleAnimationDialog}
        color="#610D56"
        bgColor="#B9A8FF"
        borderColor="#610D56"
        style={{height: 300,width:150}}
      >
      <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?dpr=1&auto=compress,format&fit=crop&w=1576&h=&q=80&cs=tinysrgb&crop=',
          }}
          style={{height: 300,width:150}} />
          </Button>

        <PopupDialog
          ref={popupDialog => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="HOW'S THE WEATHER TODAY?" />}
          actions={[
            <DialogButton
              text="DISMISS"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="button-1"
            />,
          ]}
          height={0.8}
          width={0.8}>
          <WeatherView />
        </PopupDialog>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigator: {
    flex: 1,
  },
});
