import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

// Import Pages
import LoginPage from './LoginPage.js';
import SignUp from './SignUp.js';
import SelectionPage from './SelectionPage.js';
import RoutinePage from './RoutinePage.js';
import Feedback from './Feedback.js';
import Results from './Results.js';
import Search from './Search.js';
import InfoPage from './InfoPage.js';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch routine data
store.dispatch({type: 'GET_ROUTINE_DATA'});

class App extends Component<{}> {

}

// Navigation using StackNavigator
export const RootNavigator = StackNavigator(
  {
    LoginPage: {
      screen: LoginPage
    },
    SignUp: {
      screen: SignUp
    },
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

const Combined = () => (
  <Provider store={store}>
    <RootNavigator></RootNavigator>
  </Provider>
)

export default Combined;
