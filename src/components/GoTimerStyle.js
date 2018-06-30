import { StyleSheet } from 'react-native';
import Device from '../DeviceType';

export const elseStyle = {
  RUNNER_BORDER_COLOR: '#e15f41',
  STOPPER_BORDER_COLOR: '#d1ccc070',
  TOUCH_AREA_UNDERLAY_COLOR: 'rgba(0, 0, 0, 0.05)',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Device.isIphoneX() ? 30 : 20,
    marginBottom: Device.isIphoneX() ? 15 : 0,
  },
  touchAreaContainer: {
    flex: 1,
    margin: 8,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignSelf: 'stretch',
    borderWidth: 10,
    borderColor: elseStyle.STOPPER_BORDER_COLOR,
    borderRadius: 1,
  },
  touchInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingAreaContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  stepContainer: {
    position: 'absolute',
    top: 20,
  },
  countRulesContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
  markContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
  rulesText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6c5ce7',
  },
});

export default styles;
