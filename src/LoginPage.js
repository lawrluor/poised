import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Modal
 } from 'react-native';

import firebase from 'firebase';
import { defaultStyles } from './styles.js';
import Center from './Components/Center.js';

// Referenced from tutorial: https://medium.com/@jamesmarino/getting-started-with-react-native-and-firebase-ab1f396db549
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      typing: false,
    }

    this.imageHeight = new Animated.Value(160);
    this.titleFlex = new Animated.Value(3);
    this.inputFlex = new Animated.Value(4);
    this.footerFlex = new Animated.Value(1);
  }

  // Keyboard functionality based on tutorial https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({ typing: true });
    // Hide Image
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();

    // Shrink title container
    Animated.timing(this.titleFlex, {
      duration: event.duration,
      toValue: 2,
    }).start();

    // Grow input container
    Animated.timing(this.inputFlex, {
      duration: event.duration,
      toValue: 5,
    }).start();

    // Hide footer container
    Animated.timing(this.footerFlex, {
      duration: event.duration,
      toValue: 0,
    }).start();
  };

  _keyboardDidHide = () => {
    this.setState({ typing: false });

    // Show Image
    Animated.timing(this.imageHeight, {
      toValue: 160,
    }).start();

    // Return title container to normal size
    Animated.timing(this.titleFlex, {
      toValue: 3,
    }).start();

    // Shrink input container
    Animated.timing(this.inputFlex, {
      toValue: 4,
    }).start();

    // Return footer container to normal size
    Animated.timing(this.footerFlex, {
      toValue: 1,
    }).start();
  };

  // Login method
  async login(email, pass) {
    try {
      Keyboard.dismiss();
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass)

      console.log("Logged In!");
      this.navigateToMain();
    } catch (error) {
      return Alert.alert(
        'Error',
        error.toString(),
        [
          {text: "OK", onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  }

  // Sign up method
  async signup(email, pass) {
    Keyboard.dismiss();
    console.log(email, pass);

    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(email, pass);

      console.log("Account created");
      this.navigateToMain();
    } catch (error) {
      console.log(error.toString());
      return Alert.alert(
        'Error',
        error.toString(),
        [
          {text: "OK", onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  }

  async resetPassword() {
    try {
      await firebase.auth()
        .sendPasswordResetEmail(this.state.email);

      console.log("Password reset email sent")
      Alert.alert(
        'Success',
        'Password reset instructions sent to: ' + this.state.email,
        [
          {text: "OK", onPress: () => console.log('OK Pressed')},
        ]
      );
    } catch(error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          'Error',
          'No user has been registered with this email',
          [
            {text: "OK", onPress: () => console.log('OK Pressed')},
          ]
        );

      } else {
        Alert.alert(
          'Error',
          'Make sure the address in the email field is spelled and formatted correctly.',
          [
            {text: "OK", onPress: () => console.log('OK Pressed')},
          ]
        );
      }
    }
  }

  dismiss() {
    Keyboard.dismiss();
  }

  // Automatically navigates due to listener onAuthStateChanged
  // Function wrapping dismiss for code readability
  navigateToMain() {
    this.dismiss();
  }

  // If user in the middle of typing, clears keyboard
  navigateToSignup(email) {
    this.componentWillMount();
    this.props.navigation.navigate('Signup');
  }

  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => this.dismiss() }>
        <KeyboardAvoidingView style={[defaultStyles.container, defaultStyles.outline]}>

          <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}></View>

          <Animated.View style={[styles.titleContainer, defaultStyles.outline, {flex: this.titleFlex}]}>
            <Animated.Image source={require('../static/img/center.png')} style={{height:this.imageHeight}}></Animated.Image>
            <Text style={defaultStyles.jumboText}>Poise</Text>
          </Animated.View>

          <Animated.View style={[styles.inputContainer, defaultStyles.outline, {flex:this.inputFlex}]}>
            <TextInput
              style={defaultStyles.input}
              keyboardType={'email-address'}
              editable={true}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={100}
              underlineColorAndroid={'transparent'}
              placeholder={"Email"}
              onChangeText={(email) => this.setState({email})}
            />

            <TextInput
              style={defaultStyles.input}
              editable={true}
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={100}
              underlineColorAndroid={'transparent'}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />

            <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={defaultStyles.loginButton} onPress={() => this.login(this.state.email, this.state.password)}>
              <Text style={[defaultStyles.bodyText]}>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight style={defaultStyles.loginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.signup(this.state.email, this.state.password)}>
              <Text style={[defaultStyles.bodyText]}>Sign Up</Text>
            </TouchableHighlight>

            {this.state.typing ? null :
              <View style={styles.hiddenContainer}>
                <TouchableOpacity onPress={() => this.resetPassword()}>
                  <Text style={defaultStyles.linkText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
             }
          </Animated.View>

          <Animated.View style={[defaultStyles.footerWrapper, defaultStyles.outline, {flex: this.footerFlex}]}></Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  },
  hiddenContainer: {
    alignItems: 'center'
  }
});

export default LoginPage;
