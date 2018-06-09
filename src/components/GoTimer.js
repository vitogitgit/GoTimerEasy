import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Timer from './Timer';
import Device from '../DeviceType';
import {
  INITIAL_TIME,
  COUNTDOWN_TIME,
  NUMBER_OF_COUNTDOWN,
  RUNNER_BORDER_COLOR,
  STOPPER_BORDER_COLOR,
  TOUCH_AREA_UNDERLAY_COLOR,
  SETTING_ICON,
  PLAY_ICON,
  PAUSE_ICON,
  RESET_ICON,
} from '../Constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Device.isIphoneX() ? 30 : 20,
    marginBottom: Device.isIphoneX() ? 15 : 0,
  },
  touchAreaContainer: {
    flex: 1,
    margin: 8,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignSelf: 'stretch',
    borderWidth: 10,
    borderColor: STOPPER_BORDER_COLOR,
    borderRadius: 1,
  },
  touchInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingAreaContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  stepContainer: {
    position: 'absolute',
    top: 20,
  },
  countRulesContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  markContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default class GoTimer extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      timerPause: false,
      trunBlack: true,
      goSteps: 0,
      numberOfCountdownForBlack: NUMBER_OF_COUNTDOWN,
      numberOfCountdownForWhite: NUMBER_OF_COUNTDOWN,
    };
    this.timerForBlack = React.createRef();
    this.timerForWhite = React.createRef();
  }

  onCountdown = (isBlack) => {
    const player = isBlack ? '黑方' : '白方';
    console.log(`onCountdown..${player}開始讀秒`);
  }

  onCountdownOver = (isBlack) => {
    const player = isBlack ? '黑方' : '白方';
    let { numberOfCountdownForBlack, numberOfCountdownForWhite } = this.state;
    if (isBlack) {
      this.setState({ numberOfCountdownForBlack: numberOfCountdownForBlack -= 1 });
      if (numberOfCountdownForBlack === 0) {
        console.log(`onTimeOver..${player}輸了`);
      } else {
        console.log(`onCountdownOver..${player} ${COUNTDOWN_TIME} 秒 ${numberOfCountdownForBlack} 次`);
      }
    } else {
      this.setState({ numberOfCountdownForWhite: numberOfCountdownForWhite -= 1 });
      if (numberOfCountdownForWhite === 0) {
        console.log(`onTimeOver..${player}輸了`);
      } else {
        console.log(`onCountdownOver..${player} ${COUNTDOWN_TIME} 秒 ${numberOfCountdownForWhite} 次`);
      }
    }
  }

  getInitialTime = () => {
    const { params } = this.props.navigation.state;
    if (typeof params === 'undefined') {
      return INITIAL_TIME;
    }
    return params.initialTime;
  }

  getCountdownTime = () => {
    const { params } = this.props.navigation.state;
    if (typeof params === 'undefined') {
      return COUNTDOWN_TIME;
    }
    return params.countdownTime;
  }

  getNumberOfCountdown = () => {
    const { params } = this.props.navigation.state;
    if (typeof params === 'undefined') {
      return NUMBER_OF_COUNTDOWN;
    }
    return params.numberOfCountdown;
  }

  currentNumberOfCountdown = (isBlack) => {
    const { numberOfCountdownForBlack, numberOfCountdownForWhite } = this.state;
    if (isBlack) {
      return numberOfCountdownForBlack;
    }
    return numberOfCountdownForWhite;
  }

  resetGoTimer = () => {
    this.timerForBlack.current.resetTimer();
    this.timerForWhite.current.resetTimer();
    setTimeout(() => {
      const numberOfCountdown = this.getNumberOfCountdown();
      this.setState({
        timerStart: false,
        timerPause: false,
        trunBlack: true,
        goSteps: 0,
        numberOfCountdownForBlack: numberOfCountdown,
        numberOfCountdownForWhite: numberOfCountdown,
      });
    }, 3);
  }

  runnerColor = (isBlack) => {
    const { timerStart, trunBlack } = this.state;
    if (timerStart && isBlack === trunBlack) {
      return RUNNER_BORDER_COLOR;
    }
    return STOPPER_BORDER_COLOR;
  }

  playStatusTrunMyself = isBlack => (
    this.state.timerStart && isBlack === this.state.trunBlack
  )

  playStatusTrunMyselfNot = isBlack => (
    this.state.timerStart && isBlack !== this.state.trunBlack
  )

  renderInnerObject = isBlack => (
    <View style={[styles.touchInnerContainer, { transform: this.transformFlip }]}>
      <Timer
        ref={isBlack ? this.timerForBlack : this.timerForWhite}
        initialTime={this.getInitialTime()}
        countdownTime={this.getCountdownTime()}
        numberOfCountdown={this.getNumberOfCountdown()}
        timerStart={this.playStatusTrunMyself(isBlack)}
        timerPause={this.state.timerPause}
        // onTimeZero={() => console.log('onTimeZero..')}
        onCountdown={() => this.onCountdown(isBlack)}
        onCountdownOver={() => this.onCountdownOver(isBlack)}
        onTimeOver={() => this.onCountdownOver(isBlack)}
      />
      <View style={styles.stepContainer}>
        <Text>{this.state.goSteps}</Text>
      </View>
      <View style={styles.countRulesContainer}>
        <Text>{this.getCountdownTime()}s[{this.currentNumberOfCountdown(isBlack)}]</Text>
      </View>
      <View style={[
          styles.markContainer,
          { backgroundColor: isBlack ? 'black' : null },
        ]}
      />
    </View>
  )

  renderTouchable = isBlack => (
    <TouchableHighlight
      style={[
        styles.touchAreaContainer,
        { borderColor: this.runnerColor(isBlack) },
      ]}
      onPress={() => {
        const { timerStart, trunBlack } = this.state;
        if (this.playStatusTrunMyselfNot(isBlack)) {
          return null;
        }
        if (!timerStart) {
          this.setState({
            timerStart: true,
            timerPause: false,
          });
        } else {
          this.setState({
            trunBlack: !trunBlack,
            goSteps: this.state.goSteps += 1,
          });
        }
        return null;
      }}
      underlayColor={this.playStatusTrunMyselfNot(isBlack) ? null : TOUCH_AREA_UNDERLAY_COLOR}
    >
      {this.renderInnerObject(isBlack)}
    </TouchableHighlight>
  )

  renderTouchArea = (isBlack) => {
    this.transformFlip = [];

    if (isBlack) {
      this.transformFlip = [{ rotate: '180deg' }];
    }

    return (this.renderTouchable(isBlack));
  }

  renderSettingArea = () => (
    <View style={styles.settingAreaContainer}>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => {
          this.setState({
            timerStart: false,
            timerPause: true,
          });
          this.props.navigation.navigate('Setting', {
            resetGoTimer: this.resetGoTimer,
            initialTime: this.getInitialTime(),
            countdownTime: this.getCountdownTime(),
            numberOfCountdown: this.getNumberOfCountdown(),
          });
        }}
      >
        <Image
          style={styles.icon}
          source={SETTING_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.resetGoTimer()}
      >
        <Image
          style={styles.icon}
          source={RESET_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.setState({
          timerStart: !this.state.timerStart,
          timerPause: this.state.timerStart,
        })}
      >
        <Image
          style={styles.icon}
          source={this.state.timerStart ? PAUSE_ICON : PLAY_ICON}
        />
      </TouchableHighlight>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        {this.renderTouchArea(true)}
        {this.renderSettingArea()}
        {this.renderTouchArea(false)}
      </View>
    );
  }
}

GoTimer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

/*

To:
  聲音
  resetButton觸發modalView
  外觀
bug:

*/
