import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Picker } from 'react-native';
import PropTypes from 'prop-types';
import {
  SETTING_BUTTON_TEXT,
  INITIAL_TIME_LIMIT,
  COUNTDOWN_TIME_LIMIT,
  NUMBER_OF_COUNTDOWN_LIMIT,
  INITIAL_TIME_TITLE,
  INITIAL_TIME_UNIT,
  COUNTDOWN_TIME_TITLE,
  NUMBER_OF_COUNTDOWN_TITLE,
} from '../Constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rulesContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    marginTop: 70,
    marginBottom: 70,
  },
  pickerContainer: {
    height: 300,
    width: 100,
  },
  settingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '300',
    color: 'white',
  },
  rulesText: {
    fontSize: 18,
    fontWeight: '300',
  },
});

export default class Setting extends Component {
  static navigationOptions = {
    title: 'setting',
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      initialTime: params.initialTime,
      countdownTime: params.countdownTime,
      numberOfCountdown: params.numberOfCountdown,
    };
  }

  getPickerData = () => ({
    initialTime: [
      this.state.initialTime,
      this.updateInitialTime,
      0,
      300,
      INITIAL_TIME_LIMIT,
      60,
    ],
    countdownTime: [
      this.state.countdownTime,
      this.updateCountdownTime,
      10,
      5,
      COUNTDOWN_TIME_LIMIT,
    ],
    numberOfCountdown: [
      this.state.numberOfCountdown,
      this.updateNumberOfCountdown,
      1,
      1,
      NUMBER_OF_COUNTDOWN_LIMIT,
    ],
  })

  updateInitialTime = (time) => {
    this.setState({ initialTime: time });
  }

  updateCountdownTime = (time) => {
    this.setState({ countdownTime: time });
  }

  updateNumberOfCountdown = (number) => {
    this.setState({ numberOfCountdown: number });
  }

  renderRules = () => {
    const { initialTime, countdownTime, numberOfCountdown } = this.state;
    const basicTimeText = `${INITIAL_TIME_TITLE}: ${initialTime / 60}${INITIAL_TIME_UNIT}`;
    const countdownTimeText = `${COUNTDOWN_TIME_TITLE}: ${countdownTime}`;
    const numberOfCountdownText = `${NUMBER_OF_COUNTDOWN_TITLE}: ${numberOfCountdown}`;
    return (
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesText}>{basicTimeText}</Text>
        <Text style={styles.rulesText}>{countdownTimeText}</Text>
        <Text style={styles.rulesText}>{numberOfCountdownText}</Text>
      </View>
    );
  }

  renderPickerItems = (initial, increase, limit, displayRatio = 1) => {
    const items = [];
    for (let number = initial; number <= limit; number += increase) {
      items.push( // eslint-disable-line function-paren-newline
        <Picker.Item
          key={number}
          label={(number / displayRatio).toString()}
          value={number}
        />);
    }
    return items;
  }

  renderPicker = (selectedValue, onValueChange, initial, increase, limit, displayRatio) => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {this.renderPickerItems(initial, increase, limit, displayRatio)}
      </Picker>
    </View>
  )

  renderSettingBlock = () => {
    const pickerData = this.getPickerData();
    const { initialTime, countdownTime, numberOfCountdown } = pickerData;
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderPicker(...initialTime)}
        {this.renderPicker(...countdownTime)}
        {this.renderPicker(...numberOfCountdown)}
      </View>
    );
  }

  renderSettingButton = () => {
    const settingData = {
      initialTime: this.state.initialTime,
      countdownTime: this.state.countdownTime,
      numberOfCountdown: this.state.numberOfCountdown,
    };
    return (
      <TouchableHighlight
        style={styles.settingButton}
        onPress={() => {
          const { navigation } = this.props;
          navigation.navigate('Home', settingData);
          navigation.state.params.resetGoTimer();
        }}
      >
        <Text style={styles.buttonText}>{SETTING_BUTTON_TEXT}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRules()}
        {this.renderSettingBlock()}
        {this.renderSettingButton()}
      </View>
    );
  }
}

Setting.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
