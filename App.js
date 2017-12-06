import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

// Import Pages
import SelectionPage from './src/SelectionPage.js';
import RoutinePage from './src/RoutinePage.js';
import Feedback from './src/Feedback.js';
import Results from './src/Results.js';
import Search from './src/Search.js';
import InfoPage from './src/InfoPage.js';

class App extends Component<{}> {
  render() {
    <RootNavigator></RootNavigator>
  }
}

// Navigation using StackNavigator
export const RootNavigator = StackNavigator(
  {
    Selections: {
      screen: SelectionPage
    },
    Search: {
      screen: Search
    },
    Routine: {
      screen: RoutinePage
    },
    Feedback: {
      screen: Feedback
    },
    Results: {
      screen: Results
    },
    InfoPage: {
      screen: InfoPage
    }
  },
);

export default RootNavigator;
