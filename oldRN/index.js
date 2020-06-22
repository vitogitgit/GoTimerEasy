import { AppRegistry, YellowBox } from 'react-native';
import App from './src/Navigator';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule',
]);
AppRegistry.registerComponent('GoTimerEasy', () => App);
