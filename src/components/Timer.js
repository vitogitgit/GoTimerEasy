import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  secondText: {
    fontSize: 106,
    fontWeight: '300',
  },
});

export default class Timer extends Component {
  state = {
    seconds: this.props.initialTime,
  };


  componentWillReceiveProps(nextProps) {
    const nextTimerStart = nextProps.timerStart;
    if (this.state.seconds > 0) {
      if (nextTimerStart && nextTimerStart !== this.props.timerStart) {
        this.setState({ seconds: this.state.seconds - 1 });
        this.timer = setInterval(
          () => this.setState({ seconds: this.state.seconds - 1 }),
          1000,
        );
      } else if (!nextTimerStart) {
        clearInterval(this.timer);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.seconds === 0) {
      clearInterval(this.timer);
    }
    return true;
  }

  render() {
    let minutes = parseInt(this.state.seconds / 60, 10);
    if (minutes < 10) {
      minutes = `0${minutes.toString()}`;
    }

    let seconds = this.state.seconds % 60;
    if (seconds < 10) {
      seconds = `0${seconds.toString()}`;
    }

    return (
      <Text style={styles.secondText}>{`${minutes}:${seconds}`}</Text>
    );
  }
}

Timer.propTypes = {
  initialTime: PropTypes.number,
  timerStart: PropTypes.bool,
};

Timer.defaultProps = {
  initialTime: 10,
  timerStart: false,
};
