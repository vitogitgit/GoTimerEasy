import React from 'react';
import { Modal, View, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles, underlayColor } from './DialogStyle';
import * as Constant from '../Constant';

const Dialog = props => (
  <Modal
    animationType="slide"
    transparent
  >
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.outsideContainer}
        onPress={() => props.closeDialog()}
      >
        <View />
      </TouchableHighlight>
      <View style={styles.dialogContainer}>
        <Text style={styles.title}>{Constant.IS_RESET}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={[styles.button, styles.cancelButton]}
            underlayColor={underlayColor.cancel}
            onPress={() => props.closeDialog()}
          >
            <Text style={[styles.buttonText, styles.cancelText]}>{Constant.CANCEL}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={underlayColor.confirm}
            onPress={() => {
              props.closeDialog();
              props.resetGoTimer();
            }}
          >
            <Text style={styles.buttonText}>{Constant.CONFIRM}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal >
);

Dialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  resetGoTimer: PropTypes.func.isRequired,
};

export default Dialog;
