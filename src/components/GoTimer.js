import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import styles, { elseStyle } from './GoTimerStyle';
import Timer from './Timer';
import VideoPlayer from './VideoPlayer';
import Dialog from './Dialog';
import * as Controller from './GoTimerController';
import Sounds from '../constant/Sounds';
import Images from '../constant/Images';

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
      showDialog: false,
      goSteps: 0,
      numberOfCountdownForBlack: numberOfCountdown,
      numberOfCountdownForWhite: numberOfCountdown,
    };
    this.setInitialVar();
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
    const srcBlack = Sounds.referee.REF_BLACK_LOST;
    const srcWhite = Sounds.referee.REF_WHITE_LOST;
    const src = isBlack ? srcBlack : srcWhite;
    this.video.current.play(src);
    this.var.gameOver = true;
  }

  onCountdownOver = (isBlack) => {
    const {
      REF_BLACK_COUNTDOWN_DEC,
      REF_BLACK_COUNTDOWN_LAST,
      REF_WHITE_COUNTDOWN_DEC,
      REF_WHITE_COUNTDOWN_LAST,
    } = Sounds.referee;
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
    if (Controller.playStatusTrunOpponent(isBlack, this)) {
      return this.triggeringTauntEvent(isBlack);
    } else if (this.var.gameOver) {
      return this.clickPlayer.current.play(Sounds.click.MINECRAFT_PIG_MP3);
    }

    if (!timerStart) {
      this.clickPlayer.current.play(Sounds.click.CLICK_TIMER_MP3);
      this.setState({
        timerStart: true,
        timerPause: false,
      });
    } else {
      this.clickPlayer.current.play(Sounds.click.CLICK_TIMER_MP3);
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
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('Setting', {
      resetGoTimer: this.resetGoTimer,
      initialTime: params.initialTime,
      countdownTime: params.countdownTime,
      numberOfCountdown: params.numberOfCountdown,
      numberOfTaunt: params.numberOfTaunt,
    });
  }

  onPressPlayButton = () => {
    if (this.var.gameOver) {
      this.clickPlayer.current.play(Sounds.click.MINECRAFT_PIG_MP3);
      return;
    }
    this.clickPlayer.current.play(Sounds.click.CLICK_TIMER_MP3);
    this.setState({
      timerStart: !this.state.timerStart,
      timerPause: this.state.timerStart,
    });
  }

  setInitialVar = () => {
    const { numberOfTaunt } = this.props.navigation.state.params;
    this.var = {
      gameOver: false,
      numberOfTauntsForBlack: numberOfTaunt,
      numberOfTauntsForWhite: numberOfTaunt,
    };
  }

  setTauntSource = (numberOfTaunts) => {
    const {
      TAUNT_HINT_THREE,
      TAUNT_HINT_ZERO,
      TAUNT_HINT_STOP,
      random,
    } = Sounds.taunt;
    const randomBetweenArray = Math.floor(Math.random() * random.length);
    let src = random[randomBetweenArray];

    switch (numberOfTaunts) {
      case -1:
        this.var.numberOfTauntsForBlack = 0;
        this.var.numberOfTauntsForWhite = 0;
        src = TAUNT_HINT_STOP;
        break;
      case 1:
        src = TAUNT_HINT_ZERO;
        break;
      case 4:
        src = TAUNT_HINT_THREE;
        break;
      default:
        break;
    }
    return src;
  }

  openDialog = () => this.setState({
    showDialog: true,
    timerStart: false,
    timerPause: true,
  });

  triggeringTauntEvent = (isBlack) => {
    const { numberOfTauntsForBlack, numberOfTauntsForWhite } = this.var;
    let src;
    if (isBlack) {
      if (numberOfTauntsForBlack === 0) { return null; }
      this.var.numberOfTauntsForBlack -= 1;
      src = this.setTauntSource(numberOfTauntsForBlack);
    } else {
      if (numberOfTauntsForWhite === 0) { return null; }
      this.var.numberOfTauntsForWhite -= 1;
      src = this.setTauntSource(numberOfTauntsForWhite);
    }
    this.video.current.play(src);
    return null;
  }

  closeDialog = () => this.setState({ showDialog: false });

  resetGoTimer = () => {
    this.timerForBlack.current.resetTimer();
    this.timerForWhite.current.resetTimer();
    setTimeout(() => {
      const numberOfCountdown = Controller.getNumberOfCountdown(this);
      this.setInitialVar();
      this.setState({
        timerStart: false,
        timerPause: false,
        trunBlack: true,
        showDialog: false,
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
        onCountdown={() => {
          Controller.onCountdown(isBlack, this);
          this.var.numberOfTauntsForBlack = this.var.numberOfTauntsForBlack === 0 ? 0 : -1;
          this.var.numberOfTauntsForWhite = this.var.numberOfTauntsForWhite === 0 ? 0 : -1;
        }}
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
      underlayColor={Controller.playStatusTrunOpponent(isBlack, this) ?
        null : elseStyle.TOUCH_AREA_UNDERLAY_COLOR}
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
          source={Images.goTimer.SETTING_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.openDialog()}
      >
        <Image
          style={styles.icon}
          source={Images.goTimer.RESET_ICON}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={null}
        onPress={() => this.onPressPlayButton()}
      >
        <Image
          style={styles.icon}
          source={this.state.timerStart ? Images.goTimer.PAUSE_ICON : Images.goTimer.PLAY_ICON}
        />
      </TouchableHighlight>
    </View>
  )

  renderDialog = () => {
    const { showDialog } = this.state;
    if (!showDialog) { return null; }
    return (
      <Dialog
        closeDialog={this.closeDialog}
        resetGoTimer={this.resetGoTimer}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTouchArea(true)}
        {this.renderSettingArea()}
        {this.renderTouchArea(false)}
        {this.renderDialog()}
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
  README.md
  修改 constant 大寫英文到小寫
  react-native-i18n 多語系，支援英文、中文，聲音 & 字符串
  support ios 各個手機、平板
  support Android
bugs:

*/
