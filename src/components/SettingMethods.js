import { elseStyle } from './SettingStyle';
import Strings from '../constant/Strings';
import Numbers from '../constant/Numbers';
import Images from '../constant/Images';

const scoreFromInitialTime = (initialTime) => {
  if (initialTime < 1200) {
    return 11;
  } else if (initialTime <= 2100) {
    return 5;
  } else if (initialTime <= 3000) {
    return -1;
  }
  return -10;
};

const scoreFromCountdownTime = (countdownTime, score) => {
  const movingValue = ((countdownTime / 5) - 6) * -2;
  return score + movingValue;
};

const scoreFromNumberOfCountdown = (numberOfCountdown, score) => {
  const movingValue = (numberOfCountdown - 3) * -2;
  return score + movingValue;
};

const getPatternParm = (score) => {
  const {
    PATTERN_SLOW_COLOR,
    PATTERN_MEDIUN_COLOR,
    PATTERN_FAST_COLOR,
  } = elseStyle;
  const { PATTERN_SLOW_ICON, PATTERN_MEDIUN_ICON, PATTERN_FAST_ICON } = Images.settingPage;
  const { PATTERN_FAST_TEXT, PATTERN_SLOW_TEXT, PATTERN_MEDIUN_TEXT } = Strings.settingPage;
  let icon = PATTERN_FAST_ICON;
  let text = PATTERN_FAST_TEXT;
  let textColor = PATTERN_FAST_COLOR;
  if (score < 0) {
    icon = PATTERN_SLOW_ICON;
    text = PATTERN_SLOW_TEXT;
    textColor = PATTERN_SLOW_COLOR;
  } else if (score <= 10) {
    icon = PATTERN_MEDIUN_ICON;
    text = PATTERN_MEDIUN_TEXT;
    textColor = PATTERN_MEDIUN_COLOR;
  }
  return {
    icon,
    text,
    textColor: { color: textColor },
  };
};

export const setPatternType = (state) => {
  const { initialTime, countdownTime, numberOfCountdown } = state;
  let score = scoreFromInitialTime(initialTime);
  score = scoreFromCountdownTime(countdownTime, score);
  score = scoreFromNumberOfCountdown(numberOfCountdown, score);
  return getPatternParm(score);
};

export const getPickerData = component => ({
  initialTime: [
    component.state.initialTime,
    component.updateInitialTime,
    0,
    300,
    Numbers.settingPage.INITIAL_TIME_LIMIT,
    60,
  ],
  countdownTime: [
    component.state.countdownTime,
    component.updateCountdownTime,
    10,
    5,
    Numbers.settingPage.COUNTDOWN_TIME_LIMIT,
  ],
  numberOfCountdown: [
    component.state.numberOfCountdown,
    component.updateNumberOfCountdown,
    1,
    1,
    Numbers.settingPage.NUMBER_OF_COUNTDOWN_LIMIT,
  ],
});
