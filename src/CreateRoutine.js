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
const ACTION_LENGTH = 2000;
const ACTION_DURATION = 10;

class InfoPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      preview: "",
      description: "",
      music: "",
      actions: {},
      actionInputs: [],
      currentActionText: "Action Text",
      currentActionLength: "Action Length"
    }

    // Meta
    this.author = firebase.auth().currentUser.email; // change to displayName
    this.userid = firebase.auth().currentUser.uid;
    this.downvotes = 0;
    this.overallRating = 0;
    this.totalLength = 0;
    this.convertedLength = "0:00"; // TODO: change to convert totalLength to mm:ss format
    // routine_id pushed during creation in firebase

    this.ref = firebase.database().ref();
    this.handler = this.handler.bind(this); // bind reference to parent in this to pass to child component
  }
  // App Header
  static navigationOptions = {
    header: null
  };

  // dynamically assign key and value to state by "pre-creating" state dictionary
  handler(inputType, inputText, key) {
    let obj = {};

    // Case of editing Action input rather than Routine-level input
    if (key > -1) {
      let currentAction = this.state.actions[key];
      console.log("current", currentAction);
      if (currentAction===undefined || currentAction===null) {
        console.log("currentAction is undefined or null");
      } else {
        console.log("currentAction DEFINED")
        this.setState({
          currentActionText: this.state.actions[key].text,
          currentActionLength: this.state.actions[key].duration
        });
      }

      // Goal: this.setState({actions[key].text: 'test'})


      // TODO: when changing text, then length for action, text doesn't save to state
      // TODO: Reset/Clear action len and text when moving to next textbox
      if (inputType==="text") {
        // If editing action text, update action text key
        obj = {
                length: this.state.currentActionLength, // fetch directly from text input
                text: inputText
              }
        this.setState({currentActionText: inputText});
      } else {
        // Else, editing action length, update action length key
        obj = {
                length: inputText,
                text: this.state.currentActionText // fetch directly from text input
              }
        this.setState({currentActionLength: inputText});
      }

      // Grab existing actions from state and add key for new action
      // Then reassign updated actions dictionary to this.state.actions
      let actionObjs = this.state.actions;
      actionObjs[key] = obj
      this.setState({actions: actionObjs});
      console.log(this.state.actions);
    } else {
      // Editing Routine level input
      obj[inputType] = inputText;
      this.setState(obj)
    }
    console.log(obj);
  }

  componentWillMount() {
    console.log(firebase.auth().currentUser);
  }

  // key is the current length of this.state.actionInputs, which is +1 to last element
  // adapted from https://stackoverflow.com/questions/45407581/how-to-dynamically-add-a-text-input-in-react-native
  addTextInput(key) {
    let actionInputs = this.state.actionInputs;
    actionInputs.push(
      <View key={key}>
        <Text style={defaultStyles.bodyText}>Action {key + 1}</Text>
        <DefaultTextInput inputType="text" index={key} maxLength={ACTION_LENGTH} handler={this.handler}/>
        <DefaultTextInput inputType="length" index={key} maxLength={ACTION_DURATION} handler={this.handler}/>
      </View>
    );

    // Set states, reset action inputs to default values
    this.setState({
      actionInputs: actionInputs,
      currentActionText: "",
      currentActionLength: ""
    });
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
        {text: "Ok"},
      ]
    );
  }

  navigateToSelections() {
    Alert.alert(
      "Saved Routine",
      "Your routine has been saved.",
      [
        {text: "Done"},
      ]
    );
    this.props.navigation.navigate('Selections');
  }

  // Query to find potential duplicate routine with same name and author before creating.
  // Returns true if duplicate found, otherwise return false.
  findDuplicate() {
    this.ref.child('routines').orderByChild('name').equalTo(this.state.name).on('value', (snap) => {
      snap.forEach((routine) => {
        if (routine.val().user_id===this.userid) {
          console.log("Routine by this user with this name already exists.")
          this.inputAlert("Routine by this user with this name already exists.");
          return true;
        }
      });
    });
    return false;
  }

  // When user hits submit button, pushes comment to database
  async saveRoutine() {
    console.log(this.state.name, this.state.description, this.state.preview, this.state.music);

    let validated = await this.sanitizeAll();
    let duplicateFound = await this.findDuplicate(); // TODO: not awaiting properly function call
    console.log('validated', validated, 'dup', duplicateFound);

    console.log("Actions:", this.state.actions);

    if (validated && !duplicateFound) {
      // Pushes pre-processed values from constructor
      // this.ref.child('routines').push({
      //   name: this.state.name,
      //   preview: this.state.preview,
      //   description: this.state.description,
      //   music: this.state.music,
      //   author: this.author,
      //   user_id: this.userid,
      //   downvotes: this.downvotes,
      //   overallRating: this.overallRating,
      //   totalLength: this.totalLength,
      //   convertedLength: this.convertedLength,
      //   actions: this.state.actions
      // });
      //
      // this.navigateToSelections();
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

        <View style={styles.inputContainer}>
          <ScrollView style={[defaultStyles.textContainer, defaultStyles.outline]}>
            <DefaultTextInput inputType="name" maxLength={NAME_MAX_LENGTH} index={-1} handler={this.handler}/>
            <DefaultTextInput inputType="preview" maxLength={PREVIEW_MAX_LENGTH} index={-1} handler={this.handler}/>
            <DefaultTextInput inputType="description" maxLength={DESCRIPTION_MAX_LENGTH} index={-1} handler={this.handler}/>
            <DefaultTextInput inputType="music" maxLength={MUSIC_MAX_LENGTH} index={-1} handler={this.handler}/>

            {this.state.actionInputs.map((value, index) => {
              return value;
            })}
          </ScrollView>
        </View>

        <View style={[styles.buttonContainer, defaultStyles.outline]}>
          <TouchableHighlight style={defaultStyles.loginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.addTextInput(this.state.actionInputs.length)}>
            <Text style={[defaultStyles.bodyText]}>Add Action</Text>
          </TouchableHighlight>

          <TouchableHighlight style={defaultStyles.loginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.saveRoutine()}>
            <Text style={[defaultStyles.bodyText]}>Save Routine</Text>
          </TouchableHighlight>
        </View>

        <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default InfoPage;
