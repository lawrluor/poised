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
import SelectionPage from './src/SelectionPage.js';

class App extends Component<{}> {
  // Activate native props on Center view to allow returning multiple elements
  // https://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  // App Title
  static navigationOptions = {
    title: 'poised'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.baseText]}>
            poised
          </Text>
        </View>

        <View style={styles.centerWrapper}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Selections')}>
            <View ref={component => this._root = component}>
              <Center></Center>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.bodyWrapper}>
          <Text style={[styles.bodyText, styles.baseText]}>prime yourself for performance</Text>
        </View>
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
  Selections: {
    screen: SelectionPage
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  titleWrapper: {
    flex: 4,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  title: {
    fontSize: 60,
    margin: 10,
  },
  centerWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 3
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default RootNavigator
