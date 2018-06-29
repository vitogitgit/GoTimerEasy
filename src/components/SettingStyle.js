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
});

export default styles;
