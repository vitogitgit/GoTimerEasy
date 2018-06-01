import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TIME_OVER_TEXT } from './Constant';

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
    isTimeOver: false,
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
      if (!isCountdown) {
        if (numberOfCountdown === 0) {
          clearInterval(this.timer);
          this.setState({ isTimeOver: true });
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
        this.setState({ isTimeOver: true });
        return onTimeOver();
      }

      onTimeZero();
      return this.setState({
        numberOfCountdown: numberOfCountdown - 1,
        seconds: countdownTime,
      });
    }
    return this.setState({ seconds: seconds - 1 });
  }

  renderText = () => {
    const { seconds, isTimeOver } = this.state;
    if (isTimeOver) {
      return (
        <Text style={styles.secondText}>{TIME_OVER_TEXT}</Text>
      );
    }

    let minutes = parseInt(seconds / 60, 10);
    if (minutes < 10) {
      minutes = `0${minutes.toString()}`;
    }

    let second = seconds % 60;
    if (second < 10) {
      second = `0${second.toString()}`;
    }

    return (
      <Text style={styles.secondText}>{`${minutes}:${second}`}</Text>
    );
  }

  render() {
    return this.renderText();
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
