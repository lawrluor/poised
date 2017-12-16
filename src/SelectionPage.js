import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Navigator,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  BackHandler,
  ToastAndroid,
  Platform
 } from 'react-native';

import { defaultStyles } from './styles.js';
import GridDisplay from './Components/GridDisplay.js';
import TabBar from './Components/TabBar.js';
import TagButton from './Components/TagButton.js';
import RoutinePopup from './RoutinePopup.js';

// Import Firebase app config
import firebaseApp from './Components/Firebase.js';

// Redux
// import { connect } from 'react-redux';

// Connect Redux storage and refresh actions,
// @connect(
//   state => ({
//     routines: state.routines,
//     loading: state.loading
//   }),
//   dispatch => ({
//     refresh: () => dispatch({type: 'GET_ROUTINE_DATA'}),
//   })
// )

class SelectionPage extends Component {
  constructor() {
    super();

    // Set default routine for popup as the first routine, before routine is opened
    // FAILS when there are no routines
    this.state = {
      popupIsOpen: false,
      routines: [],
      routine: "test",
      loading: true,
      selectedTag: ""
    }

    this.handler = this.handler.bind(this); // bind reference to parent in this to pass to child component
    this.backButtonListener = null;
    this.ref = this.getRef();
  }

  // Search tags
  handler(tagName) {
    console.log("setting state");
    this.setState({
      selectedTag: tagName
    });
    this.getData(tagName);
  }

  componentDidMount() {
    this.disableBackButton();
    this.getData(this.state.selectedTag);
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

  getRef() {
    return firebaseApp.database().ref();
  }

  // Helper function to query tag given tag name
  async getTag(tagName) {
    return new Promise(resolve => {
      this.ref.child("tags").orderByChild("name").equalTo(tagName).on('value', (snap) => {

        // Only one tag should match. If no match found, tag is null and breaks
        snap.forEach((child) => {
          let tag = {
            name: child.val().name,
            matching_routines: child.val().matching_routines,
            _key: child.key,
          }
          resolve(tag);
        });
      });
    });
  }

  // Queries routines that match tag
  async getData(tagName) {
    console.log("selectedTag:", tagName);

    // if no tag selected, simply return all Routines
    if (tagName === "") {
      this.ref.child("routines").orderByKey().on('value', (snap) => {
        let routines = [];
        snap.forEach((child) => {
          routines.push({
            name: child.val().name,
            author: child.val().author,
            convertedLength: child.val().convertedLength,
            description: child.val().description,
            overallRating: child.val().overallRating,
            downvotes: child.val().downvotes,
            preview: child.val().preview,
            actions: child.val().actions,
            _key: child.key,
            // routine_id: child.val().routine_id,
            // user_id: child.val().user_id,
          });
        });

        // Works because forEach() is synchronous
        this.setState({
          routines: routines,
          loading: false
        });
      });
    } else {
        // Query for Tag, and access list of matching routines ids
        let queriedTag = await this.getTag(tagName);

        // For each routine id, convert to string and query to get Routine object, then push to routines
        let routines = [];
        queriedTag["matching_routines"].forEach((child) => {
          this.ref.child("routines").orderByKey().equalTo(child.toString()).on('value', (snap) => {
            snap.forEach((child) => {
              routines.push({
                name: child.val().name,
                author: child.val().author,
                convertedLength: child.val().convertedLength,
                description: child.val().description,
                overallRating: child.val().overallRating,
                preview: child.val().preview,
                actions: child.val().actions,
                _key: child.key,
                // routine_id: child.val().routine_id,
                // user_id: child.val().user_id,
              });
            });
          });
      });

      console.log("Routines retrieved:", routines);
      this.setState({
        routines: routines,
        loading: false
      });

    }
  }

  openRoutine = (routine) => {
    // updates state with routine
    this.setState({
      popupIsOpen: true,
      routine
    });
  }

  closeRoutine = () => {
    this.setState({
      popupIsOpen: false
    });
  }

  // App Header
  static navigationOptions = {
    header: null
  };

  // Last line: hide tab bar if popup is opened
  render() {
    const { refresh } = this.props;
    // If not loaded, show loading screen
    if (this.state.loading) {
      // Currently bugged, not loading activityIndicator
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
    } else {
      return (
        <View style={defaultStyles.container}>
          <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
            <Text style={defaultStyles.titleText}>View Routines</Text>
            <Text style={defaultStyles.examineText}>Guided exercises to prime you for a performance or task, created by users and curated by professionals.</Text>
          </View>

          <View style={[styles.tagScrollWrapper, defaultStyles.outline]}>
            <ScrollView
              contentContainerStyle={styles.tagScrollContentContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Public Speaking"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Competition"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Interview"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Test"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Networking"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Presentation"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} name={"Date"}></TagButton>
            </ScrollView>
          </View>

          <View style={styles.scrollContainer}>
            <ScrollView
              paddingVertical={5}
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={refresh}
                  tintColor="#FFFFFF"
                />
              }
            >
              {this.state.routines.map((routine, index) => <GridDisplay
                routine={routine}
                onOpen={this.openRoutine}
                key={index}
                navigation={this.props.navigation}
              />)}
            </ScrollView>
          </View>

          <RoutinePopup
            routine={this.state.routine}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeRoutine}
            navigation={this.props.navigation}
          />

          {!this.state.popupIsOpen ? <TabBar style={{flex: 1}} navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar> : null }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1.0
  },
  // actual tag scroll content
  tagScrollWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  // Wraps tag scroll content
  tagScrollContentContainer: {
    marginRight: 15,
    marginLeft: 15
  },
  scrollContainer: {
    ...defaultStyles.outline,
    flex: 8,
  },
  selectionsButton: {
    ...defaultStyles.loginButton,
    marginTop: 10,
    width: (defaultStyles.screenDimensions.width / 1.13) // match gridDisplay
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  selectionsIconSmall: {
    ...defaultStyles.iconSmall,
    marginTop: 4,
    marginRight: 4
  }
});

export default SelectionPage
