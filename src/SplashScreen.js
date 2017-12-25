import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  ActivityIndicator,
  BackHandler,
  Platform
} from 'react-native';

import firebase from 'firebase';

import { defaultStyles } from './styles.js';

class SplashScreen extends Component {
  constructor() {
    super();

    this.state = {
      user: firebase.auth().currentUser,
      loading: true
    }

    this.backButtonListener = null;
  }

  static navigationOptions = {
    header: null
  }

  // Disables hardware back button on Android for duration of the app runtime
  // Based on: https://github.com/react-community/react-navigation/issues/1819
  disableBackButton() {
    if (Platform.OS === 'android') {
      this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', () => {
        ToastAndroid.show('Back button disabled for this action', ToastAndroid.SHORT);
        return true;
      });
    }
  }

  componentWillMount() {
    this.disableBackButton();

    let user = this.state.user;
    firebase.auth().onAuthStateChanged((user) => {
      // this.setState({
      //   loading: false
      // })

      // If user exists (through firebase persistence), skip login/signup
      if (user) {
        console.log("user logged in");
        this.props.navigation.navigate('Selections');
      } else {
        console.log("user not found");
        this.props.navigation.navigate('LoginPage');
      }
    });
  }

  render() {
    // If not loaded, show loading screen
    return (
      <View style={defaultStyles.container}>
        <ActivityIndicator
          animating={this.state.loading}
          color="#FFFFFF"
          style={styles.loader}
          size="large"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1.0
  }
});

export default SplashScreen
