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
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Animated
 } from 'react-native';

import { defaultStyles } from './styles.js';

// Import Firebase app config
import firebaseApp from './Components/Firebase.js';

// Referenced from tutorial: https://medium.com/@jamesmarino/getting-started-with-react-native-and-firebase-ab1f396db549
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "Email",
      password: "Password",
      signup: false
    }

    this.imageHeight = new Animated.Value(160);
    this.titleFlex = new Animated.Value(2);
    this.inputFlex = new Animated.Value(2);
  }

  // Keyboard functionality based on tutorial https://medium.freecodecamp.org/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    console.log("listeners added");
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    console.log("keyboard showing");
    // Hide Image
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 0,
    }).start();

    // Shrink title container
    Animated.timing(this.titleFlex, {
      duration: event.duration,
      toValue: 1,
    }).start();

    // Grow input container
    Animated.timing(this.inputFlex, {
      duration: event.duration,
      toValue: 5,
    }).start();
  };

  _keyboardDidHide = () => {
    console.log("keyboard hiding");
    // Show Image
    Animated.timing(this.imageHeight, {
      toValue: 160,
    }).start();

    // Return title container to normal size
    Animated.timing(this.titleFlex, {
      toValue: 2,
    }).start();

    // Shrink input container
    Animated.timing(this.inputFlex, {
      toValue: 2,
    }).start();
  };

  // Sign up method
  async signup(email, pass) {
    console.log(email, pass);
    try {
      await firebaseApp.auth()
        .createUserWithEmailAndPassword(email, pass);

      console.log("Account created");
      this.navigateToMain(email);
    } catch (error) {
      console.log(error.toString());
      Alert.alert(
        'Error',
        error.toString(),
        {text: "OK", onPress: () => console.log('OK Pressed')},
      )
    }
  }

  // Navigate to main app after login/signup
  navigateToMain(email) {
    console.log("navigating");
    this.props.navigation.navigate('Selections',
    {
      email: email
    });
  }

  // If user in the middle of typing, clears keyboard
  navigateToLogin() {
    this.componentWillMount();
    Keyboard.dismiss();
    this.props.navigation.navigate('LoginPage');
  }

  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <KeyboardAvoidingView style={[defaultStyles.container, defaultStyles.outline]}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}></View>

        <Animated.View style={[styles.titleContainer, defaultStyles.outline, {flex: this.titleFlex}]}>
            <Animated.Image source={require('../static/img/center.png')} style={{height:this.imageHeight}}></Animated.Image>
            <Text style={defaultStyles.jumboText}>Poise</Text>
        </Animated.View>

        <Animated.View style={[styles.inputContainer, defaultStyles.outline, {flex:this.inputFlex}]}>
          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            editable={true}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={40}
            placeholder={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />

          <TextInput
            style={styles.input}
            editable={true}
            autoCapitalize='none'
            autoCorrect={false}
            maxLength={40}
            placeholder={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />

          <TouchableHighlight style={styles.loginButton} onPress={() => this.signup(this.state.email, this.state.password)}>
            <Text style={[defaultStyles.bodyText]}>Create Account</Text>
          </TouchableHighlight>

          <TouchableOpacity onPress={() => this.navigateToLogin()}>
            <Text style={defaultStyles.paragraphText}><Text style={defaultStyles.linkText}>I have an account</Text></Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={[styles.footerContainer, defaultStyles.outline]}></View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  },
  footerContainer: {
    flex: 1
  },
  input: {
    ...defaultStyles.paragraphText,
    height: 40,
    width: 270,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'grey',
  },
  loginButton: {
    height: 40,
    width: 270,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(28, 56, 79, 1.0)', // #1C384F
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Signup;
