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
import Feedback from './src/Feedback.js';
import Results from './src/Results.js';

class App extends Component<{}> {
  // Activate native props on Center view to allow returning multiple elements
  // https://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  // App Title
  static navigationOptions = {
    title: 'poise'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.baseText]}>
            poise
          </Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}>perform unhindered</Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Selections')}>
            <View ref={component => this._root = component}>
              <Center></Center>
            </View>
          </TouchableHighlight>
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
  },
  Feedback: {
    screen: Feedback
  },
  Results: {
    screen: Results
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
    flex: 3,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  title: {
    fontSize: 60,
    margin: 10,
  },
  circleWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 2
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default RootNavigator
