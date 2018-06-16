import { AsyncStorage } from 'react-native';

export const setLocalStorage = (key, data) => { // eslint-disable-line import/prefer-default-export
  AsyncStorage.setItem(key, JSON.stringify(data));
};

/*

key => rules;

rules = {
  initialTime: type.number,
  countdownTime: type.number,
  numberOfCountdown: type.number,
};

*/
