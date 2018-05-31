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
    const nextTimerStart = nextProps.timerStart;
    if (this.state.seconds > 0) {
      if (nextTimerStart && nextTimerStart !== this.props.timerStart) {
        // if (this.state.isCountdown) {
        //   this.setState({ seconds: this.props.countdownTime + 1 });
        // }
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

  componentWillUpdate(nextProps, nextState) {
    if (nextState.seconds === 0 && this.state.seconds) {
      if (nextState.numberOfCountdown === 0) {
        clearInterval(this.timer);
        this.props.onTimeOver();
      } else if (!nextState.isCountdown) {
        this.props.onCountdown();
        this.setState({ // eslint-disable-line react/no-will-update-set-state
          seconds: this.props.countdownTime,
          isCountdown: true,
        });
      } else {
        this.props.onTimeZero();
        this.setState({ // eslint-disable-line react/no-will-update-set-state
          seconds: this.props.countdownTime,
          numberOfCountdown: this.state.numberOfCountdown -= 1,
        });
      }
    }
  }

  render() {
    console.log(this.state);
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
