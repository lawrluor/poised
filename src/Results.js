import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
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

    console.log("currentUser", this.state.currentUser);
    console.log("routineId", this.state.routineId);
    console.log("commentsRef", this.state.commentsRef);
  }

  // Load routines reference, get and store path, current rating, and ref to state
  componentWillMount() {
    this.setState({
      commentsRef: firebaseApp.database().ref('comments')
    });
  }

  // When user hits submit button, pushes comment to database
  submitComment() {
    this.state.commentsRef.push({
      user_id: this.state.currentUser,
      routine_id: this.state.routineId,
      message: this.state.message,
      timestamp: Date()
    });

    this.navigateToSelections();
  }

  navigateToSelections() {
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

        <View style={[defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
          <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
            <Text style={defaultStyles.bodyText}>
              Please leave any feedback aboxut this routine!
            </Text>
          </View>

          <View style={[styles.feedbackWrapper, defaultStyles.outline]}>
            <TextInput
              style={[defaultStyles.input, {height: 200}]}
              multiline={true}
              editable={true}
              autoCapitalize='none'
              autoCorrect={false}
              placeholder="Enter comment here"
              onChangeText={(message) => this.setState({message: message})}
            />

            <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={defaultStyles.loginButton} onPress={() => this.submitComment()}>
              <Text style={[defaultStyles.bodyText]}>Submit Feedback</Text>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='rgba(28, 56, 79, 0.7)' style={defaultStyles.Button} onPress={() => this.navigateToSelections()}>
              <Text style={[defaultStyles.bodyText]}>I have no feedback</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
        </View>
      </View>
    );
  }

  // Helper function to show text based on result
  showText(result) {
    if (result) {
      return "You're in good shape! Please consider favoriting the routine";
    } else {
      return "Sorry to hear that. Please try another routine!";
    }
  }
}

const styles = StyleSheet.create({
  feedbackWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Results
