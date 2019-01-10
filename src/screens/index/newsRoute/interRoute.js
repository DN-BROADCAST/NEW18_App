import React from "react";
import Index from '../index';

export default class InterRoute extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return <Index navigation={navigation} initialPage={6} />;
  }
}

