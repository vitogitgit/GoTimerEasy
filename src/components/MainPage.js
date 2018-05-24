import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default class App extends Component {
  state = {
    someState: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Vito snippet</Text>
      </View>
    );
  }
}
