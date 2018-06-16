import { createStackNavigator } from 'react-navigation';
import initDateScreen from './components/StartPage';
import GoTimerScreen from './components/GoTimer';
import SettingScreen from './components/Setting';

const RootStack = createStackNavigator(
  {
    StartPage: initDateScreen,
    Home: GoTimerScreen,
    Setting: SettingScreen,
  },
  {
    initialRouteName: 'StartPage',
  },
);

export default RootStack;
