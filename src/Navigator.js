import { createStackNavigator } from 'react-navigation';

import GoTimerScreen from './components/GoTimer';
import SettingScreen from './components/Setting';

const RootStack = createStackNavigator(
  {
    Home: GoTimerScreen,
    Setting: SettingScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default RootStack;
