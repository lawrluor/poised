import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Keyboard,
  Animated
} from 'react-native';

import { defaultStyles } from './styles.js';
import firebaseApp from './Components/Firebase.js';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentsRef: firebaseApp.database().ref('comments'),
      currentUser: firebaseApp.auth().currentUser.uid,
      routineId: this.props.navigation.state.params.routineId,
      message: ""
    }

    this.bodyFlex = new Animated.Value(4);
    this.footerFlex = new Animated.Value(1);

    console.log("currentUser", this.state.currentUser);
    console.log("routineId", this.state.routineId);
    console.log("commentsRef", this.state.commentsRef);
  }

  // Load routines reference, get and store path, current rating, and ref to state
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.setState({
      commentsRef: firebaseApp.database().ref('comments')
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    // Grow input container
    Animated.timing(this.bodyFlex, {
      duration: event.duration,
      toValue: 8,
    }).start();

    // Hide footer
    Animated.timing(this.footerFlex, {
      duration: event.duration,
      toValue: 0,
    }).start();
  };

  _keyboardDidHide = () => {
    // Shrink input container
    Animated.timing(this.bodyFlex, {
      toValue: 4,
    }).start();

    // Grow footer
    Animated.timing(this.footerFlex, {
      toValue: 1,
    }).start();
  };

  // When user hits submit button, pushes comment to database
  submitComment() {
    Keyboard.dismiss();
    this.state.commentsRef.push({
      user_id: this.state.currentUser,
      routine_id: this.state.routineId,
      message: this.state.message,
      timestamp: Date()
    });

    this.navigateToSelections();
  }

  navigateToSelections() {
    Keyboard.dismiss();
    this.props.navigation.navigate('Selections');
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  }

  render() {
    return (
      <View style={[defaultStyles.container, defaultStyles.outline]}>
        <View style={defaultStyles.headerWrapper}>
          <Text style={defaultStyles.titleText}>
            {this.showText(this.props.navigation.state.params.result)}
          </Text>
        </View>

        <Animated.View style={[{flex: this.bodyFlex}, defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
          <View style={[styles.feedbackWrapper, defaultStyles.outline]}>
            <TextInput
              style={styles.input}
              autogrow={true}
              multiline={true}
              editable={true}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder="Your feedback is very much appreciated and will help develop more useful routines!"
              onChangeText={(message) => this.setState({message: message})}
            />

            <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={defaultStyles.loginButton} onPress={() => this.submitComment()}>
              <Text style={[defaultStyles.bodyText]}>Submit Feedback</Text>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={styles.noFeedbackButton} onPress={() => this.navigateToSelections()}>
              <Text style={[defaultStyles.bodyText]}>I have no feedback</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>

        <Animated.View style={[defaultStyles.footerWrapper, defaultStyles.outline, {flex: this.footerFlex}]}></Animated.View>
      </View>
    );
  }

  // Helper function to show text based on result
  showText(result) {
    if (result) {
      return "You're in good shape! Please consider leaving some feedback";
    } else {
      return "Sorry to hear that. Please leave some feedback and try another routine!";
    }
  }
}

const styles = StyleSheet.create({
  feedbackWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noFeedbackButton: {
    ...defaultStyles.loginButton,
    backgroundColor: 'rgba(28, 56, 79, 0.0)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  input: {
    ...defaultStyles.input,
    height: 150,
    width: 350
  }
});

export default Results
