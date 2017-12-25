import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';

import { defaultStyles } from './styles.js';
import TabBar from './Components/TabBar.js';
import DefaultTextInput from './Components/DefaultTextInput.js';

import firebase from 'firebase';

const NAME_MAX_LENGTH = 40;
const PREVIEW_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 2000;
const MUSIC_MAX_LENGTH = 40;

class InfoPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      preview: "",
      description: "",
      music: "",
    }

    // Meta
    this.author = firebase.auth().currentUser.email; // change to displayName
    this.userid = firebase.auth().currentUser.uid;
    this.downvotes = 0;
    this.overallRating = 0;
    this.totalLength = 0;
    this.convertedLength = "0:00"; // TODO: change to convert totalLength to mm:ss format
    // routine_id pushed during creation in firebase

    this.routinesRef = firebase.database().ref().child('routines');
    this.handler = this.handler.bind(this); // bind reference to parent in this to pass to child component
  }
  // App Header
  static navigationOptions = {
    header: null
  };

  // dynamically assign key and value to state by "pre-creating" state dictionary
  handler(inputType, text) {
    let obj = {}
    obj[inputType] = text;
    this.setState(obj)
  }

  componentWillMount() {
    console.log(firebase.auth().currentUser);

  }

  // Helper method for sanitizeAll
  // TODO: Check if routine name already exists
  sanitizeText(inputType, text, maxLength) {
    if (text > maxLength) {
      this.inputAlert(inputType + ' length cannot exceed ' + str(maxLength) + ' characters.');
      return false;
    } else if (!text || text.length===0) {
      this.inputAlert(inputType + ' length must exceed 0 characters.');
      return false;
    }
    return true;
  }

  // Sanitizes data from user-submitted feedback.
  // Length is taken care of in TextInput itself, this is second in-depth check
  sanitizeAll() {
    // Execute all validation checks. Done because using && doesn't run all checks.
    let checks = [this.sanitizeText('Name', this.state.name, NAME_MAX_LENGTH),
                  this.sanitizeText('Preview', this.state.preview, PREVIEW_MAX_LENGTH),
                  this.sanitizeText('Description', this.state.description, DESCRIPTION_MAX_LENGTH),
                  this.sanitizeText('Music', this.state.music, MUSIC_MAX_LENGTH)]

    // If passed all the checks, return True
    if (checks.every((value) => value===true)) {
        return true;
      } else {
        return false;
      }
  }

  inputAlert(alertMessage) {
    return Alert.alert(
      "Error",
      alertMessage,
      [
        {text: "Ok", onPress: () => console.log('OK Pressed')},
      ]
    );
  }

  navigateToSelections() {
    Alert.alert(
      "Saved Routine",
      "Your routine has been saved.",
      [
        {text: "Done", onPress: () => console.log('OK Pressed')},
      ]
    );
    this.props.navigation.navigate('Selections');
  }

  // When user hits submit button, pushes comment to database
  saveRoutine() {
    console.log(this.state.name, this.state.description, this.state.preview, this.state.music);

    let validated = this.sanitizeAll();

    if (validated) {
      console.log("ready to push");

      // Pushes pre-processed values from constructor
      this.routinesRef.push({
        name: this.state.name,
        preview: this.state.preview,
        description: this.state.description,
        music: this.state.music,
        author: this.author,
        user_id: this.userid,
        downvotes: this.downvotes,
        overallRating: this.overallRating,
        totalLength: this.totalLength,
        convertedLength: this.convertedLength
      });

      this.navigateToSelections();
    } else {
      // Do nothing, alerts should already have been pushed during sanitize phase
      console.log("not ready");
    }
  }

  render() {
    return(
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>Create Routine</Text>
        </View>

        <View style={[defaultStyles.textContainer, defaultStyles.outline]}>
          <DefaultTextInput inputType="name" maxLength={NAME_MAX_LENGTH} handler={this.handler}/>
          <DefaultTextInput inputType="preview" maxLength={PREVIEW_MAX_LENGTH} handler={this.handler}/>
          <DefaultTextInput inputType="description" maxLength={DESCRIPTION_MAX_LENGTH} handler={this.handler}/>
          <DefaultTextInput inputType="music" maxLength={MUSIC_MAX_LENGTH} handler={this.handler}/>

          <TouchableHighlight style={defaultStyles.loginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.saveRoutine()}>
            <Text style={[defaultStyles.bodyText]}>Save Routine</Text>
          </TouchableHighlight>
        </View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

export default InfoPage;
