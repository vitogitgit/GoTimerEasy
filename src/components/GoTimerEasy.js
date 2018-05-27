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
    timer: 'stop', // eslint-disable-line react/no-unused-state
    // stop black white
    gogo: false,
  };

  renderTouchArea = (block) => {
    let transformFlip = [];
    if (block === 'top') {
      transformFlip = [{ rotate: '180deg' }];
    }

    return (
      <TouchableHighlight
        style={styles.touchAreaContainer}
        onPress={() => this.setState({ timer: block === 'top' ? 'white' : 'black' })}
      >
        <View style={[styles.touchInnerContainer, { transform: transformFlip }]}>
          <Timer
            timerStart={this.state.gogo}
          />
          <View style={styles.stepContainer}>
            <Text>0</Text>
          </View>
          <View style={styles.countRulesContainer}>
            <Text>30s[2]</Text>
          </View>
          <View style={[
            styles.markContainer,
            { backgroundColor: block === 'top' ? 'black' : null }]}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTouchArea('top')}
        <View style={styles.settingAreaContainer}>
          <TouchableHighlight
            style={{ width: 50, height: 30, backgroundColor: 'red' }}
            onPress={() => {
              console.log('this.state', this.state);
              this.setState({ gogo: !this.state.gogo });
            }}
          >
            <View />
          </TouchableHighlight>
        </View>
        {this.renderTouchArea('bottom')}
      </View>
    );
  }
}
