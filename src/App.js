import React, { Component, View, ActivityIndicator } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Import Pages
import LoginPage from './LoginPage.js';
import Signup from './SignUp.js';
import SelectionPage from './SelectionPage.js';
import RoutinePage from './RoutinePage.js';
import Feedback from './Feedback.js';
import Results from './Results.js';
import Search from './Search.js';
import InfoPage from './InfoPage.js';
import SplashScreen from './SplashScreen.js';

import * as firebase from 'firebase';

// Redux (currently not being used)
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB3gLva99xmyuUFWlm0aGSHD0OgD9TmV7I",
  authDomain: "poiseapp-a177f.firebaseapp.com",
  databaseURL: "https://poiseapp-a177f.firebaseio.com",
  serviceAccount: "./service-account.json",
  storageBucket: "",
  messagingSenderId: "786295975442"
};

firebase.initializeApp(firebaseConfig);

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch routine data
store.dispatch({type: 'GET_ROUTINE_DATA'});

class App extends Component<{}> {
  constructor() {
    super();
    this.state = {
      user: firebase.auth().currentUser,
    }
  }

  componentWillMount() {
    // Initialize Firebase
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  }

  render() {
    return(
      <Provider store={store}>
        <RootNavigator></RootNavigator>
      </Provider>
    )
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
    Signup: {
      screen: Signup,
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
  }
);

export default App;
