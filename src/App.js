import React, { Component, View, ActivityIndicator } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Import Pages
import LoginPage from './LoginPage.js';
import SelectionPage from './SelectionPage.js';
import RoutinePage from './RoutinePage.js';
import Feedback from './Feedback.js';
import Results from './Results.js';
import InfoPage from './InfoPage.js';
import SplashScreen from './SplashScreen.js';
import CreateRoutine from './CreateRoutine.js';
import firebaseConfig from './Components/firebaseConfig.js';

import * as firebase from 'firebase';

// Firebase Config
firebase.initializeApp(firebaseConfig);

// Redux (currently not being used)
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { apiMiddleware, reducer } from './redux';

// // Create Redux store
// const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));
//
// // Fetch routine data
// store.dispatch({type: 'GET_ROUTINE_DATA'});

class App extends Component<{}> {
  componentWillMount() {
    // Initialize Firebase
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  render() {
    return(
      <RootNavigator></RootNavigator>
    )

    // With Redux
    // <Provider store={store}>
    //   <RootNavigator></RootNavigator>
    // </Provider>
  }
}

// When user not signed in, start with Signup Page
export const RootNavigator = StackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
    },
    LoginPage: {
      screen: LoginPage,
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
    },
    InfoPage: {
      screen: InfoPage
    },
    CreateRoutine: {
      screen: CreateRoutine
    }
  }
);

export default App;
