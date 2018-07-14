import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Picker } from 'react-native';
import PropTypes from 'prop-types';
import Strings from '../constant/Strings';
import { setLocalStorage } from '../LocalStorage';
import styles, { elseStyle } from './SettingStyle';
import * as Methods from './SettingMethods';
import Images from '../constant/Images';
import Numbers from '../constant/Numbers';

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
      numberOfTaunt: params.numberOfTaunt,
    };
  }

  onPressCheckbox = (numberOfTaunt) => {
    if (numberOfTaunt === 0) {
      this.setState({ numberOfTaunt: Numbers.defaultRules.NUMBER_OF_TAUNT });
    } else {
      this.setState({ numberOfTaunt: 0 });
    }
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
    const {
      initialTime,
      countdownTime,
      numberOfCountdown,
    } = Methods.getPickerData(this);
    return (
      <View style={{ flexDirection: 'row' }}>
        {this.renderPicker(...initialTime)}
        {this.renderPicker(...countdownTime)}
        {this.renderPicker(...numberOfCountdown)}
      </View>
    );
  }

  renderPatternImage = () => {
    const pattern = Methods.setPatternType(this.state);
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

  renderCheckbox = () => {
    const { numberOfTaunt } = this.state;
    const { CHECKBOX_TRUE, CHECKBOX_FALSE } = Images.settingPage;
    return (
      <TouchableHighlight
        style={styles.checkboxPosition}
        onPress={() => this.onPressCheckbox(numberOfTaunt)}
        underlayColor={elseStyle.CHECKBOX_UNDERLAY_COLOR}
      >
        <View style={styles.checkboxContainer}>
          <Image
            style={styles.checkboxImage}
            source={numberOfTaunt === 0 ? CHECKBOX_FALSE : CHECKBOX_TRUE}
          />
          <Text style={styles.checkboxText}>
            {Strings.settingPage.CHECKBOX_TITLE}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderSettingButton = () => {
    const { LOCAL_STORAGE_KEY_RULES } = Strings.else;
    const settingData = {
      initialTime: this.state.initialTime,
      countdownTime: this.state.countdownTime,
      numberOfCountdown: this.state.numberOfCountdown,
      numberOfTaunt: this.state.numberOfTaunt,
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
        {this.renderCheckbox()}
        {this.renderSettingButton()}
      </View>
    );
  }
}

Setting.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
