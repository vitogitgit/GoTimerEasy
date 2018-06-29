import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  outsideContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dialogContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: 'white',
    height: 200,
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 60,
  },
  buttonsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    margin: 16,
  },
  button: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: '#43a047',
    backgroundColor: '#43a047',
    marginLeft: 16,
  },
  cancelButton: {
    backgroundColor: 'white',
    marginLeft: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
  },
  cancelText: {
    color: '#43a047',
  },
});

export const underlayColor = {
  cancel: '#ffbe76',
  confirm: '#f0932b',
};
