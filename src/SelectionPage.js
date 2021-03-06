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
  ToastAndroid,
 } from 'react-native';

import { defaultStyles } from './styles.js';
import GridDisplay from './Components/GridDisplay.js';
import TabBar from './Components/TabBar.js';
import TagButton from './Components/TagButton.js';
import RoutinePopup from './RoutinePopup.js';

// Import Firebase app config
import firebase from 'firebase';

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
      selectedTag: "All Routines"
    }

    this.handler = this.handler.bind(this); // bind reference to parent in this to pass to child component
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
    this.getData(this.state.selectedTag);
  }

  getRef() {
    return firebase.database().ref();
  }

  // Helper function to query tag given tag name
  async getTag(tagName) {
    return new Promise(resolve => {
      this.ref.child("tags").orderByChild("name").equalTo(tagName).on('value', (snap) => {

        // Only one tag should match. If no match found, tag is null and breaks
        snap.forEach((child) => {
          // Extract all matching routines, cast to list and return them in random order (https://www.w3schools.com/js/js_array_sort.asp)
          let matching_routines = Object.keys(child.val().matching_routines);
          matching_routines.sort((a, b) => {return 0.5 - Math.random()});
          let tag = {
            name: child.val().name,
            matching_routines: matching_routines,
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

    // if selections page is first loaded, supply tagName "All Routines." Other cases protect vs state bugs
    if (tagName==="All Routines" || tagName==="" || tagName===null) {
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
            music: child.val().music,
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
                downvotes: child.val().downvotes,
                preview: child.val().preview,
                actions: child.val().actions,
                music: child.val().music,
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
      // Change TagButton content to draw from firebase
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
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"All Routines"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Public Speaking"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Test"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Interview"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Performance"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Competition"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Presentation"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Networking"}></TagButton>
              <TagButton navigation={this.props.navigation} handler={this.handler} selectedTag={this.state.selectedTag} name={"Date"}></TagButton>
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

          <View style={styles.footer}></View>
          {!this.state.popupIsOpen ? <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar> : null }
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
  // flex 1, puts scrollview above tabBar. Assigning flex to TabBar comoponent doesn't work, nor does nesting it inside footer.
  // Using footerWrapper from defaultStyles makes it so that routinePopup begin routine button's clickbox is covered
  footer: {
    flex: 1
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
