import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rulesContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    marginTop: 70,
    marginBottom: 70,
  },
  pickerContainer: {
    height: 300,
    width: 100,
  },
  settingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E8B57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '300',
    color: 'white',
  },
  rulesText: {
    fontSize: 18,
    fontWeight: '300',
  },
  pickerItemLabel: {
    fontSize: 30,
  },
  patternContainer: {
    position: 'absolute',
    bottom: 180,
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  },
  patternText: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  patternIcon: {
    width: 120,
    height: 120,
  },
  checkboxPosition: {
    position: 'absolute',
    bottom: 100,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  checkboxImage: {
    width: 64,
    height: 40,
    marginRight: 16,
  },
  checkboxText: {
    fontSize: 16,
  },
});

export default styles;

export const elseStyle = {
  SETTING_BUTTON_UNDERLAY_COLOR: '#9c88ff',
  PATTERN_FAST_COLOR: '#eb4d4b',
  PATTERN_MEDIUN_COLOR: '#686de0',
  PATTERN_SLOW_COLOR: '#6ab04c',
  CHECKBOX_UNDERLAY_COLOR: 'rgba(0,0,0,0.005)',
};
