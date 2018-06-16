import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Picker } from 'react-native';
import PropTypes from 'prop-types';
import * as Constant from '../Constant';
import { setLocalStorage } from '../LocalStorage';

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
  pickerItemLabel: {
    fontSize: 30,
  },
  patternContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  },
  patternText: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  patternIcon: {
    width: 120,
    height: 120,
  },
});

const scoreFromInitialTime = (initialTime) => {
  if (initialTime < 1200) {
    return 11;
  } else if (initialTime <= 2100) {
    return 5;
  } else if (initialTime <= 3000) {
    return -1;
  }
  return -10;
};

const scoreFromCountdownTime = (countdownTime, score) => {
  const movingValue = ((countdownTime / 5) - 6) * -2;
  return score + movingValue;
};

const scoreFromNumberOfCountdown = (numberOfCountdown, score) => {
  const movingValue = (numberOfCountdown - 3) * -2;
  return score + movingValue;
};

const getPatternParm = (score) => {
  const {
    PATTERN_SLOW_ICON,
    PATTERN_MEDIUN_ICON,
    PATTERN_FAST_ICON,
    PATTERN_SLOW_TEXT,
    PATTERN_MEDIUN_TEXT,
    PATTERN_FAST_TEXT,
    PATTERN_SLOW_COLOR,
    PATTERN_MEDIUN_COLOR,
    PATTERN_FAST_COLOR,
  } = Constant;
  let icon = PATTERN_FAST_ICON;
  let text = PATTERN_FAST_TEXT;
  let textColor = PATTERN_FAST_COLOR;
  if (score < 0) {
    icon = PATTERN_SLOW_ICON;
    text = PATTERN_SLOW_TEXT;
    textColor = PATTERN_SLOW_COLOR;
  } else if (score <= 10) {
    icon = PATTERN_MEDIUN_ICON;
    text = PATTERN_MEDIUN_TEXT;
    textColor = PATTERN_MEDIUN_COLOR;
  }
  return {
    icon,
    text,
    textColor: { color: textColor },
  };
};

const setPatternType = (state) => {
  const { initialTime, countdownTime, numberOfCountdown } = state;
  let score = scoreFromInitialTime(initialTime);
  score = scoreFromCountdownTime(countdownTime, score);
  score = scoreFromNumberOfCountdown(numberOfCountdown, score);
  return getPatternParm(score);
};

const getPickerData = component => ({
  initialTime: [
    component.state.initialTime,
    component.updateInitialTime,
    0,
    300,
    Constant.INITIAL_TIME_LIMIT,
    60,
  ],
  countdownTime: [
    component.state.countdownTime,
    component.updateCountdownTime,
    10,
    5,
    Constant.COUNTDOWN_TIME_LIMIT,
  ],
  numberOfCountdown: [
    component.state.numberOfCountdown,
    component.updateNumberOfCountdown,
    1,
    1,
    Constant.NUMBER_OF_COUNTDOWN_LIMIT,
  ],
});

export default class Setting extends Component {
  static navigationOptions = {
    title: Constant.SETTING_SCREEN_TITLE,
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
    const { initialTime, countdownTime, numberOfCountdown } = this.state;
    const basicTimeText = `${Constant.INITIAL_TIME_TITLE}: ${initialTime / 60}${Constant.INITIAL_TIME_UNIT}`;
    const countdownTimeText = `${Constant.COUNTDOWN_TIME_TITLE}: ${countdownTime}`;
    const numberOfCountdownText = `${Constant.NUMBER_OF_COUNTDOWN_TITLE}: ${numberOfCountdown}`;
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
        itemStyle={styles.pickerItemLabel}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {this.renderPickerItems(initial, increase, limit, displayRatio)}
      </Picker>
    </View>
  )

  renderSettingBlock = () => {
    const pickerData = getPickerData(this);
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
    const pattern = setPatternType(this.state);
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
    const settingData = {
      initialTime: this.state.initialTime,
      countdownTime: this.state.countdownTime,
      numberOfCountdown: this.state.numberOfCountdown,
    };
    return (
      <TouchableHighlight
        style={styles.settingButton}
        underlayColor={Constant.SETTING_BUTTON_UNDERLAY_COLOR}
        onPress={() => {
          setLocalStorage(Constant.LOCAL_STORAGE_KEY_RULES, settingData);
          const { navigation } = this.props;
          navigation.navigate('Home', settingData);
          navigation.state.params.resetGoTimer();
        }}
      >
        <Text style={styles.buttonText}>{Constant.SETTING_BUTTON_TEXT}</Text>
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
