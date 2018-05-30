import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Timer from './Timer';

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
    borderColor: '#d1ccc070',
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
  };

  runnerColor = (isBlack) => {
    const { timerStart, trunBlack } = this.state;
    if (timerStart && isBlack === trunBlack) {
      return '#e15f41';
    }
    return '#d1ccc070';
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
        initialTime={50}
        timerStart={this.playStatusTrunMyself(isBlack)}
      />
      <View style={styles.stepContainer}>
        <Text>0</Text>
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
          this.setState({ trunBlack: !trunBlack });
        }
        return null;
      }}
      underlayColor={this.playStatusTrunMyselfNot(isBlack) ? null : 'rgba(0, 0, 0, 0.05)'}
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
