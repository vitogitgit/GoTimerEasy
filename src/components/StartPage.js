import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Strings from '../constant/Strings';
import Numbers from '../constant/Numbers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a29bfe',
  },
});

export default class StartPage extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.settingRulesData();
  }

  settingRulesData = () => {
    const { LOCAL_STORAGE_KEY_RULES } = Strings.else;
    const { INITIAL_TIME, COUNTDOWN_TIME, NUMBER_OF_COUNTDOWN } = Numbers.defaultRules;

    AsyncStorage.getItem(LOCAL_STORAGE_KEY_RULES)
      .then((rulesData) => {
        if (!rulesData) {
          const defaultData = {
            initialTime: INITIAL_TIME,
            countdownTime: COUNTDOWN_TIME,
            numberOfCountdown: NUMBER_OF_COUNTDOWN,
          };
          return defaultData;
        }
        return JSON.parse(rulesData);
      })
      .then(data => (this.props.navigation.navigate('Home', data)));
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

StartPage.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
