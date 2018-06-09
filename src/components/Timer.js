import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TIME_OVER_ICON } from '../Constant';

const styles = StyleSheet.create({
  secondText: {
    fontSize: 90,
    fontWeight: '300',
  },
  timeOverImage: {
    width: 140,
    height: 128,
  },
});

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.initialTime,
      isCountdown: false,
      numberOfCountdown: this.props.numberOfCountdown,
      isTimeOver: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      seconds,
      isCountdown,
      numberOfCountdown,
      isTimeOver,
    } = this.state;
    const {
      countdownTime,
      onCountdown,
    } = this.props;

    if (isTimeOver) {
      return;
    }

    if (!nextProps.timerStart) {
      clearInterval(this.timer);
      if (!isCountdown && seconds === 0) {
        onCountdown();
        this.setState({
          isCountdown: true,
          seconds: countdownTime,
        });
      } else if (isCountdown && numberOfCountdown > 0 && !nextProps.timerPause) {
        this.setState({ seconds: countdownTime });
      }
    } else if (numberOfCountdown > 0) {
      this.timer = setInterval(this.settingTimer, 1000);
    }
  }

  settingTimer = () => {
    const {
      seconds,
      isCountdown,
      numberOfCountdown,
    } = this.state;
    const {
      countdownTime,
      onCountdown,
      onTimeZero,
      onCountdownOver,
      onTimeOver,
    } = this.props;

    if (seconds === 0) {
      onTimeZero();
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

      clearInterval(this.timer);
      this.setState({
        numberOfCountdown: numberOfCountdown - 1,
        seconds: countdownTime,
      });
      return onCountdownOver();
    }
    return this.setState({ seconds: seconds - 1 });
  }

  resetTimer = () => {
    clearInterval(this.timer);
    setTimeout(() => {
      this.setState({
        seconds: this.props.initialTime,
        isCountdown: false,
        numberOfCountdown: this.props.numberOfCountdown,
        isTimeOver: false,
      });
    }, 3);
  }

  renderText = () => {
    const { seconds, isTimeOver } = this.state;
    if (isTimeOver) {
      return (
        <Image
          style={styles.timeOverImage}
          source={TIME_OVER_ICON}
        />
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
  timerPause: PropTypes.bool,
  onCountdown: PropTypes.func,
  onTimeZero: PropTypes.func,
  onCountdownOver: PropTypes.func,
  onTimeOver: PropTypes.func,
};

Timer.defaultProps = {
  initialTime: 10,
  countdownTime: 3,
  numberOfCountdown: 1,
  timerStart: false,
  timerPause: false,
  onCountdown: () => null,
  onTimeZero: () => null,
  onCountdownOver: () => null,
  onTimeOver: () => null,
};
