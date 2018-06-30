import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Picker } from 'react-native';
import PropTypes from 'prop-types';
import Strings from '../constant/Strings';
import { setLocalStorage } from '../LocalStorage';
import styles, { elseStyle } from './SettingStyle';
import * as Controller from './SettingController';

export default class Setting extends Component {
  static navigationOptions = {
    title: Strings.settingPage.SETTING_SCREEN_TITLE,
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
    const {
      INITIAL_TIME_TITLE,
      INITIAL_TIME_UNIT,
      COUNTDOWN_TIME_TITLE,
      NUMBER_OF_COUNTDOWN_TITLE,
    } = Strings.settingPage;
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
      let temp = 0;
      if (number === 0) {
        temp = 3;
        number += temp;
      }

      items.push( // eslint-disable-line function-paren-newline
        <Picker.Item
          key={number}
          label={(number / displayRatio).toString()}
          value={number}
        />);
      number -= temp;
    }
    return items;
  }

  renderPicker = (selectedValue, onValueChange, initial, increase, limit, displayRatio) => (
    <View style={styles.pickerContainer}>
      <Picker
        itemStyle={styles.pickerItemLabel}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {this.renderPickerItems(initial, increase, limit, displayRatio)}
      </Picker>
    </View>
  )

  renderSettingBlock = () => {
    const pickerData = Controller.getPickerData(this);
    const { initialTime, countdownTime, numberOfCountdown } = pickerData;
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderPicker(...initialTime)}
        {this.renderPicker(...countdownTime)}
        {this.renderPicker(...numberOfCountdown)}
      </View>
    );
  }

  renderPatternImage = () => {
    const pattern = Controller.setPatternType(this.state);
    return (
      <View style={styles.patternContainer}>
        <Text style={[styles.patternText, pattern.textColor]}>
          {pattern.text}
        </Text>
        <Image
          style={styles.patternIcon}
          source={pattern.icon}
        />
      </View>
    );
  }

  renderSettingButton = () => {
    const { LOCAL_STORAGE_KEY_RULES } = Strings.else;
    const settingData = {
      initialTime: this.state.initialTime,
      countdownTime: this.state.countdownTime,
      numberOfCountdown: this.state.numberOfCountdown,
    };
    return (
      <TouchableHighlight
        style={styles.settingButton}
        underlayColor={elseStyle.SETTING_BUTTON_UNDERLAY_COLOR}
        onPress={() => {
          setLocalStorage(LOCAL_STORAGE_KEY_RULES, settingData);
          const { navigation } = this.props;
          navigation.navigate('Home', settingData);
          navigation.state.params.resetGoTimer();
        }}
      >
        <Text style={styles.buttonText}>{Strings.settingPage.SETTING_BUTTON_TEXT}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRules()}
        {this.renderSettingBlock()}
        {this.renderPatternImage()}
        {this.renderSettingButton()}
      </View>
    );
  }
}

Setting.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
