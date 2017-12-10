import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TextInput,
  TouchableHighlight,
  Alert
 } from 'react-native';

import { defaultStyles } from './styles.js';
import Center from './Components/Center.js';

// Import Firebase app config
import firebaseApp from './Components/Firebase.js';

// Referenced from tutorial: https://medium.com/@jamesmarino/getting-started-with-react-native-and-firebase-ab1f396db549
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "Email",
      password: "Password"
    }
  }

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
        { cancelable: false }
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

  // App Header
  static navigationOptions = {
    header: null
  };

  render() {
    return(
      <View style={[defaultStyles.container, defaultStyles.outline]}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}></View>

        <View style={[styles.titleContainer, defaultStyles.outline]}>
          <Center></Center>
          <Text style={defaultStyles.jumboText}>Poise</Text>
        </View>

        <View style={[styles.inputContainer, defaultStyles.outline]}>
          <TextInput
            style={styles.input}
            keyboardType={'email-address'}
            editable={true}
            autoCapitalize={null}
            maxLength={40}
            placeholder={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />

          <TextInput
            style={styles.input}
            editable={true}
            autoCapitalize={null}
            maxLength={40}
            placeholder={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />

          <TouchableHighlight style={styles.loginButton} onPress={() => this.signup(this.state.email, this.state.password)}>
            <Text style={[defaultStyles.bodyText]}>Create Account</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.actionsContainer, defaultStyles.outline]}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(119, 136, 153, 0.5)'
  },
  actionsContainer: {
    flex: 1,
    alignItems: 'center'
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

export default SignUp;
