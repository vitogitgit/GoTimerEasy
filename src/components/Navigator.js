import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import GoTimer from './GoTimer';
import Setting from './Setting';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() { return <GoTimer navigation={this.props.navigation} />; } // eslint-disable-line
}

class SettingScreen extends Component { // eslint-disable-line react/no-multi-comp
  static navigationOptions = {
    title: 'hi',
  };

  render() { return <Setting />; }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Setting: SettingScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default RootStack;
