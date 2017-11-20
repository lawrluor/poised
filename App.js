import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Center from './src/Center.js';
import SelectionPage from './src/SelectionPage.js';
import RoutineInfo from './src/RoutineInfo.js';
import RoutinePage from './src/RoutinePage.js';
import Feedback from './src/Feedback.js';
import Results from './src/Results.js';
import Home from './src/Home.js';

import { defaultStyles } from './src/styles.js';

class App extends Component<{}> {
  // Activate native props on Center view to allow returning multiple elements
  // https://stackoverflow.com/questions/31741705/error-invariant-violation-touchable-child-must-either-be-native-or-forward-set
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  // App Title
  static navigationOptions = {
    title: 'App',
    header: null
  }

  // Custom Header
  //   header: {
  //     style: {
  //       backgroundColor: 'rgba(119, 136, 153, 1)'
  //     }
  //   }
    // headerStyle: 'blue', // 'rgba(119, 136, 153, 1)'
  // };

  // Query database for tags, and pass tag name as a prop
  render() {
    <RootNavigator></RootNavigator>
  }
}

// Navigation using StackNavigator
export const RootNavigator = StackNavigator(
  {
    Home: {
    screen: Home
    },
    Selections: {
      screen: SelectionPage
    },
    RoutineInfo: {
      screen: RoutineInfo
    },
    Routine: {
      screen: RoutinePage
    },
    Feedback: {
      screen: Feedback
    },
    Results: {
      screen: Results
    }
  },
);

export default RootNavigator
