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
    isCountdown: false,
    numberOfCountdown: this.props.numberOfCountdown,
  };

  componentWillReceiveProps(nextProps) {
    const { seconds, isCountdown, numberOfCountdown } = this.state;
    const { countdownTime, onCountdown } = this.props;

    if (!nextProps.timerStart) {
      clearInterval(this.timer);
      if (!isCountdown && seconds === 0) {
        onCountdown();
        this.setState({
          isCountdown: true,
          seconds: countdownTime,
        });
      } else if (isCountdown && numberOfCountdown > 0) {
        this.setState({ seconds: countdownTime });
      }
    } else if (numberOfCountdown > 1) {
      this.timer = setInterval(this.settingTimer, 1000);
    }
  }

  settingTimer = () => {
    const { seconds, isCountdown, numberOfCountdown } = this.state;
    const {
      countdownTime,
      onTimeZero,
      onCountdown,
      onTimeOver,
    } = this.props;

    if (seconds === 0) {
      onTimeZero();

      if (!isCountdown) {
        if (numberOfCountdown === 0) {
          clearInterval(this.timer);
          return onTimeOver();
        }
        this.setState({
          isCountdown: true,
          seconds: countdownTime,
        });
        return onCountdown();
      }

      if (numberOfCountdown === 1) {
        clearInterval(this.timer);
        return onTimeOver();
      }

      return this.setState({
        numberOfCountdown: numberOfCountdown - 1,
        seconds: countdownTime,
      });
    }
    return this.setState({ seconds: seconds - 1 });
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
  countdownTime: PropTypes.number,
  numberOfCountdown: PropTypes.number,
  timerStart: PropTypes.bool,
  onCountdown: PropTypes.func,
  onTimeZero: PropTypes.func,
  onTimeOver: PropTypes.func,
};

Timer.defaultProps = {
  initialTime: 10,
  countdownTime: 3,
  numberOfCountdown: 1,
  timerStart: false,
  onCountdown: () => null,
  onTimeZero: () => null,
  onTimeOver: () => null,
};
