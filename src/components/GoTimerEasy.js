import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Timer from './Timer';
import {
  INITIAL_TIME,
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
    trunBlack: true,
    goSteps: 0,
  };

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
        initialTime={INITIAL_TIME}
        timerStart={this.playStatusTrunMyself(isBlack)}
        onTimeZero={() => console.log('onTimeZero')}
      />
      <View style={styles.stepContainer}>
        <Text>{this.state.goSteps}</Text>
      </View>
      <View style={styles.countRulesContainer}>
        <Text>30s[2]</Text>
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
            onPress={() => this.setState({ timerStart: !this.state.timerStart })}
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
  2. 讀秒
  3. setting
  4. 外觀
  5. 聲音

*/
