import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Timer from './Timer';
import {
  INITIAL_TIME,
  COUNTDOWN_TIME,
  NUMBER_OF_COUNTDOWN,
  RUNNER_BORDER_COLOR,
  STOPPER_BORDER_COLOR,
  TOUCH_AREA_UNDERLAY_COLOR,
} from './Constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    justifyContent: 'center',
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
});

export default class GoTimerEasy extends Component {
  state = {
    timerStart: false,
    timerPause: false,
    trunBlack: true,
    goSteps: 0,
    numberOfCountdownForBlack: NUMBER_OF_COUNTDOWN,
    numberOfCountdownForWhite: NUMBER_OF_COUNTDOWN,
  };

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

  renderNumberOfCountdown = (isBlack) => {
    const { numberOfCountdownForBlack, numberOfCountdownForWhite } = this.state;
    if (isBlack) {
      return numberOfCountdownForBlack;
    }
    return numberOfCountdownForWhite;
  }

  renderInnerObject = isBlack => (
    <View style={[styles.touchInnerContainer, { transform: this.transformFlip }]}>
      <Timer
        initialTime={INITIAL_TIME}
        countdownTime={COUNTDOWN_TIME}
        numberOfCountdown={NUMBER_OF_COUNTDOWN}
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
        <Text>{COUNTDOWN_TIME}s[{this.renderNumberOfCountdown(isBlack)}]</Text>
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
          this.setState({ timerStart: true });
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderTouchArea(true)}
        <View style={styles.settingAreaContainer}>
          <TouchableHighlight
            style={{ width: 50, height: 30, backgroundColor: 'red' }}
            onPress={() => this.setState({
              timerStart: !this.state.timerStart,
              timerPause: !this.state.timerPause,
            })}
          >
            <View />
          </TouchableHighlight>
        </View>
        {this.renderTouchArea(false)}
      </View>
    );
  }
}

/*

To:
  3. setting
  4. 外觀
  5. 聲音

bug:

*/
