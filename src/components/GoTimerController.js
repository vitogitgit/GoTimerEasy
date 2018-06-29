import * as Constant from '../Constant';

export const getInitialTime = component => component.props.navigation
  .state.params.initialTime;

export const getCountdownTime = component => component.props.navigation
  .state.params.countdownTime;

export const getNumberOfCountdown = component => component.props.navigation
  .state.params.numberOfCountdown;

export const onCountdown = (isBlack, component) => {
  const initialTime = getInitialTime(component);
  if (initialTime === 0) { return; }
  const srcBlack = Constant.REF_BLACK_COUNTDOWN_START;
  const srcWhite = Constant.REF_WHITE_COUNTDOWN_START;
  const src = isBlack ? srcBlack : srcWhite;
  component.video.current.play(src);
};

export const runnerColor = (isBlack, component) => {
  const { timerStart, trunBlack } = component.state;
  if (timerStart && isBlack === trunBlack) {
    return Constant.RUNNER_BORDER_COLOR;
  }
  return Constant.STOPPER_BORDER_COLOR;
};

export const currentNumberOfCountdown = (isBlack, component) => {
  const { numberOfCountdownForBlack, numberOfCountdownForWhite } = component.state;
  return isBlack ? numberOfCountdownForBlack : numberOfCountdownForWhite;
};

export const playStatusTrunMe = (isBlack, component) => (
  component.state.timerStart && isBlack === component.state.trunBlack
);

export const playStatusTrunYou = (isBlack, component) => (
  component.state.timerStart && isBlack !== component.state.trunBlack
);

export const playVideoFromFisrtStart = (component) => {
  const { REF_BLACK_START, REF_WHITE_START } = Constant;
  const { goSteps, timerStart } = component.state;
  if (!timerStart) { return; }
  if (goSteps === 0) {
    component.video.current.play(REF_BLACK_START);
  } else if (goSteps === 1) {
    component.video.current.play(REF_WHITE_START);
  }
};

export const playVideoFromLastCountdown = (component) => {
  const { play } = component.video.current;
  const isCountdownForBlack = component.timerForBlack.current.state.isCountdown;
  const isCountdownForWhite = component.timerForWhite.current.state.isCountdown;
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
  } = component.state;
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
};

