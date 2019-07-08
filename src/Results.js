import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Animated,
  Alert
} from 'react-native';

import { defaultStyles } from './styles.js';
import firebase from 'firebase';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: this.props.navigation.state.params.result,
      commentsRef: firebase.database().ref('comments'),
      currentUser: firebase.auth().currentUser.uid,
      routineId: this.props.navigation.state.params.routineId,
      message: ""
    }

    this.bodyFlex = new Animated.Value(4);
    this.footerFlex = new Animated.Value(1);
    this.resultText = new Animated.Value(22);

    console.log("currentUser", this.state.currentUser);
    console.log("routineId", this.state.routineId);
    console.log("commentsRef", this.state.commentsRef);
  }

  // Load routines reference, get and store path, current rating, and ref to state
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    this.setState({
      commentsRef: firebase.database().ref('comments')
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

    // Hide result text
    this.setState({
      result: "hidden"
    });
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

    // Show result text
    this.setState({
      result: this.props.navigation.state.params.result
    });
  };

  // Sanitizes data from user-submitted feedback
  sanitizeData(text) {
    if (!text || text.length===0) {
      return [false, "Entry cannot be blank."];
    } else if (text.length > 2000) {
      // max length is covered by TextInput but this is a fallback
      return [false, "Entry cannot be over 2000 characters."]
    } else {
      return [true, "Success"];
    }
  }

  dismiss() {
    console.log("dismissing keyboard");
    Keyboard.dismiss();
  }

  // When user hits submit button, pushes comment to database
  submitComment() {
    Keyboard.dismiss();

    const validated = this.sanitizeData(this.state.message)[0];
    const alertMessage = this.sanitizeData(this.state.message)[1];

    if (validated) {
      this.state.commentsRef.push({
        user_id: this.state.currentUser,
        routine_id: this.state.routineId,
        message: this.state.message,
        timestamp: Date()
      });

      this.navigateToSelections();
    } else {
      return Alert.alert(
        "Error",
        alertMessage,
        [
          {text: "Ok", onPress: () => console.log('OK Pressed')},
        ]
      );
    }
  }

  navigateToSelections() {
    Keyboard.dismiss();
    Alert.alert(
      "Finished Routine",
      "Thank you for using Poise!",
      [
        {text: "Done", onPress: () => console.log('OK Pressed')},
      ]
    );
    this.props.navigation.navigate('Selections');
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => this.dismiss() }>
        <View style={[defaultStyles.container, defaultStyles.outline]}>
          <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} }>
            <View style={defaultStyles.backdrop}/>
          </TouchableWithoutFeedback>

          <View style={defaultStyles.headerWrapper}></View>

          <Animated.View style={[ {flex: this.bodyFlex}, defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
            <View style={[styles.feedbackWrapper, defaultStyles.outline]}>
              <Text style={[ {fontSize: this.resultText}, defaultStyles.actionText ]}>
                {this.showText(this.state.result)}
              </Text>

              <TextInput
                style={styles.input}
                autogrow={true}
                multiline={true}
                editable={true}
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={2000}
                underlineColorAndroid={'transparent'}
                placeholder="Being specific about what you liked, didn't like, and wish was in the app would be very much appreciated! Your feedback is crucial to help develop more useful routines and features."
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
      </TouchableWithoutFeedback>
    );
  }

  // Helper function to show text based on result
  showText(result) {
    if (result === true) {
      return "Great to hear that! Please consider leaving some feedback.";
    } else if (result === false) {
      return "Sorry to hear that. Please leave some feedback and try another routine!";
    } else {
      // Case where text should be hidden (when typing)
      return "";
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
    width: 320
  }
});

export default Results
