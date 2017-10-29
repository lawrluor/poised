/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableHighlight
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Center from './src/Center.js';
import RoutinePage from './src/RoutinePage.js';

class App extends Component<{}> {
  // Activate native props on Center view to allow returning multiple elements
  // https://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          poised
        </Text>

        <TouchableHighlight style={styles.center} onPress={() => this.props.navigation.navigate('Routine')}>
          <View ref={component => this._root = component}>
            <Center></Center>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

// Navigation using StackNavigator
export const RootNavigator = StackNavigator({
  Home: {
    screen: App
  },
  Routine: {
    screen: RoutinePage
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  title: {
    flex: 3,
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  center: {
    flex: 7
  }
});

export default RootNavigator
