import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles from './GoTimerStyle';
import Timer from './Timer';
import VideoPlayer from './VideoPlayer';
import * as Constant from '../Constant';

export default class GoTimer extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    const { numberOfCountdown } = props.navigation.state.params;
    this.state = {
      timerStart: false,
      timerPause: false,
      trunBlack: true,
      goSteps: 0,
      numberOfCountdownForBlack: numberOfCountdown,
      numberOfCountdownForWhite: numberOfCountdown,
    };
    this.gameOver = false;
    this.timerForBlack = React.createRef();
    this.timerForWhite = React.createRef();
    this.video = React.createRef();
    this.clickPlayer = React.createRef();
  }

  componentDidUpdate() {
    this.playVideoFromFisrtStart();
    this.playVideoFromLastCountdown();
  }

  onCountdown = (isBlack) => {
    const initialTime = this.getInitialTime();
    if (initialTime === 0) { return; }
    const srcBlack = Constant.REF_BLACK_COUNTDOWN_START;
    const srcWhite = Constant.REF_WHITE_COUNTDOWN_START;
    const src = isBlack ? srcBlack : srcWhite;
    this.video.current.play(src);
  }

  onTimeOver = (isBlack) => {
    const srcBlack = Constant.REF_BLACK_LOST;
    const srcWhite = Constant.REF_WHITE_LOST;
    const src = isBlack ? srcBlack : srcWhite;
    this.video.current.play(src);
    this.gameOver = true;
  }

  onCountdownOver = (isBlack) => {
    const {
      REF_BLACK_COUNTDOWN_DEC,
      REF_BLACK_COUNTDOWN_LAST,
      REF_WHITE_COUNTDOWN_DEC,
      REF_WHITE_COUNTDOWN_LAST,
    } = Constant;
    let { numberOfCountdownForBlack, numberOfCountdownForWhite } = this.state;
    let src;

    if (isBlack) {
      this.setState({ numberOfCountdownForBlack: numberOfCountdownForBlack -= 1 });
      src = (numberOfCountdownForBlack === 1) ? REF_BLACK_COUNTDOWN_LAST : REF_BLACK_COUNTDOWN_DEC;
    } else {
      this.setState({ numberOfCountdownForWhite: numberOfCountdownForWhite -= 1 });
      src = (numberOfCountdownForWhite === 1) ? REF_WHITE_COUNTDOWN_LAST : REF_WHITE_COUNTDOWN_DEC;
    }
    this.video.current.play(src);
  }

  onPressTouchArea = (isBlack) => {
    const { timerStart, trunBlack } = this.state;
    if (this.playStatusTrunYou(isBlack)) {
      return null;
    } else if (this.gameOver) {
      return this.clickPlayer.current.play(Constant.MINECRAFT_PIG_MP3);
    }

    if (!timerStart) {
      this.clickPlayer.current.play(Constant.CLICK_TIMER_MP3);
      this.setState({
        timerStart: true,
        timerPause: false,
      });
    } else {
      this.clickPlayer.current.play(Constant.CLICK_TIMER_MP3);
      this.setState({
        trunBlack: !trunBlack,
        goSteps: this.state.goSteps += 1,
      });
    }
    return null;
  }

  onPressSettingButton = () => {
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
  }

  onPressPlayButton = () => {
    if (this.gameOver) {
      this.clickPlayer.current.play(Constant.MINECRAFT_PIG_MP3);
      return;
    }
    this.clickPlayer.current.play(Constant.CLICK_TIMER_MP3);
    this.setState({
      timerStart: !this.state.timerStart,
      timerPause: this.state.timerStart,
    });
  }

  getInitialTime = () => this.props.navigation.state.params.initialTime
  getCountdownTime = () => this.props.navigation.state.params.countdownTime
  getNumberOfCountdown = () => this.props.navigation.state.params.numberOfCountdown

  playVideoFromFisrtStart = () => {
    const { REF_BLACK_START, REF_WHITE_START } = Constant;
    const { goSteps, timerStart } = this.state;
    if (!timerStart) { return; }
    if (goSteps === 0) {
      this.video.current.play(REF_BLACK_START);
    } else if (goSteps === 1) {
      this.video.current.play(REF_WHITE_START);
    }
  }

  playVideoFromLastCountdown = () => {
    const { play } = this.video.current;
    const isCountdownForBlack = this.timerForBlack.current.state.isCountdown;
    const isCountdownForWhite = this.timerForWhite.current.state.isCountdown;
    const {
      REF_BLACK_COUNTDOWN_LAST,
      REF_WHITE_COUNTDOWN_LAST,
      REF_BLACK_COUNTDOWN_TURN,
      REF_WHITE_COUNTDOWN_TURN,
    } = Constant;
    const {
      trunBlack,
      timerStart,
      numberOfCountdownForBlack,
      numberOfCountdownForWhite,
    } = this.state;
    if (!timerStart) { return; }
    if (trunBlack) {
      if (!isCountdownForBlack) { return; }
      if (numberOfCountdownForBlack === 1) {
        play(REF_BLACK_COUNTDOWN_LAST);
      } else {
        play(REF_BLACK_COUNTDOWN_TURN);
      }
    } else if (!trunBlack) {
      if (!isCountdownForWhite) { return; }
      if (numberOfCountdownForWhite === 1) {
        play(REF_WHITE_COUNTDOWN_LAST);
      } else {
        play(REF_WHITE_COUNTDOWN_TURN);
      }
    }
  }

  currentNumberOfCountdown = (isBlack) => {
    const { numberOfCountdownForBlack, numberOfCountdownForWhite } = this.state;
    return isBlack ? numberOfCountdownForBlack : numberOfCountdownForWhite;
  }

  resetGoTimer = () => {
    this.timerForBlack.current.resetTimer();
    this.timerForWhite.current.resetTimer();
    this.gameOver = false;
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
      return Constant.RUNNER_BORDER_COLOR;
    }
    return Constant.STOPPER_BORDER_COLOR;
  }

  playStatusTrunMe = isBlack => (
    this.state.timerStart && isBlack === this.state.trunBlack
  )

  playStatusTrunYou = isBlack => (
    this.state.timerStart && isBlack !== this.state.trunBlack
  )

  renderInnerObject = isBlack => (
    <View style={[styles.touchInnerContainer, { transform: this.transformFlip }]}>
      <Timer
        ref={isBlack ? this.timerForBlack : this.timerForWhite}
        initialTime={this.getInitialTime()}
        countdownTime={this.getCountdownTime()}
        numberOfCountdown={this.getNumberOfCountdown()}
        timerStart={this.playStatusTrunMe(isBlack)}
        timerPause={this.state.timerPause}
        onCountdown={() => this.onCountdown(isBlack)}
        onCountdownOver={() => this.onCountdownOver(isBlack)}
        onTimeOver={() => this.onTimeOver(isBlack)}
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
      onPress={() => this.onPressTouchArea(isBlack)}
      underlayColor={this.playStatusTrunYou(isBlack) ?
        null : Constant.TOUCH_AREA_UNDERLAY_COLOR}
    >
      {this.renderInnerObject(isBlack)}
    </TouchableHighlight>
  )

  renderTouchArea = (isBlack) => {
    this.transformFlip = isBlack ? [{ rotate: '180deg' }] : [];
    return (this.renderTouchable(isBlack));
  }

  renderSettingArea = () => (
    <View style={styles.settingAreaContainer}>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.onPressSettingButton()}
      >
        <Image
          style={styles.icon}
          source={Constant.SETTING_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.resetGoTimer()}
      >
        <Image
          style={styles.icon}
          source={Constant.RESET_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.onPressPlayButton()}
      >
        <Image
          style={styles.icon}
          source={this.state.timerStart ? Constant.PAUSE_ICON : Constant.PLAY_ICON}
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
        <VideoPlayer ref={this.video} />
        <VideoPlayer ref={this.clickPlayer} />
      </View>
    );
  }
}

GoTimer.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

/*

to do list:
  整理code
  resetButton觸發modalView
  README.md
  嗆聲綁於換對手時，才能使用，現次數不重複 => overMy 花兒謝了 烏龜你個蛋 科結語
  support Android
bugs:
  重設按鈕，於基本時限為零時，顯示尚有問題

*/
