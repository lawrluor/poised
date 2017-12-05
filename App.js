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
import SelectionPage from './src/SelectionPage.js';
import RoutinePage from './src/RoutinePage.js';
import Feedback from './src/Feedback.js';
import Results from './src/Results.js';
import Home from './src/Home.js';

import { defaultStyles } from './src/styles.js';

class App extends Component<{}> {
  // App Title
  static navigationOptions = {
    title: 'App',
    header: null
  }

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
