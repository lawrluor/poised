import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

import Center from '../src/Center.js';

class RoutinePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Made it to Routine Page
        </Text>

        <Center></Center>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#87AECF'
  }
})

export default RoutinePage
