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
import * as Controller from './GoTimerController';
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
    Controller.playVideoFromFisrtStart(this);
    Controller.playVideoFromLastCountdown(this);
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
    if (Controller.playStatusTrunYou(isBlack, this)) {
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
      initialTime: Controller.getInitialTime(this),
      countdownTime: Controller.getCountdownTime(this),
      numberOfCountdown: Controller.getNumberOfCountdown(this),
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

  resetGoTimer = () => {
    this.timerForBlack.current.resetTimer();
    this.timerForWhite.current.resetTimer();
    this.gameOver = false;
    setTimeout(() => {
      const numberOfCountdown = Controller.getNumberOfCountdown(this);
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

  renderInnerObject = isBlack => (
    <View style={[styles.touchInnerContainer, { transform: this.transformFlip }]}>
      <Timer
        ref={isBlack ? this.timerForBlack : this.timerForWhite}
        initialTime={Controller.getInitialTime(this)}
        countdownTime={Controller.getCountdownTime(this)}
        numberOfCountdown={Controller.getNumberOfCountdown(this)}
        timerStart={Controller.playStatusTrunMe(isBlack, this)}
        timerPause={this.state.timerPause}
        onCountdown={() => Controller.onCountdown(isBlack, this)}
        onCountdownOver={() => this.onCountdownOver(isBlack)}
        onTimeOver={() => this.onTimeOver(isBlack)}
      />
      <View style={styles.stepContainer}>
        <Text>{this.state.goSteps}</Text>
      </View>
      <View style={styles.countRulesContainer}>
        <Text style={styles.rulesText}>
          {`${Controller.getCountdownTime(this)}s[${Controller.currentNumberOfCountdown(isBlack, this)}]`}
        </Text>
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
        { borderColor: Controller.runnerColor(isBlack, this) },
      ]}
      onPress={() => this.onPressTouchArea(isBlack)}
      underlayColor={Controller.playStatusTrunYou(isBlack, this) ?
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
  嗆聲綁於換對手時，才能使用，現次數不重複 => overMy 花兒謝了 烏龜你個蛋 科結語
  resetButton觸發modalView
  README.md
  support Android
bugs:
  重設按鈕，於基本時限為零時，顯示尚有問題

*/
