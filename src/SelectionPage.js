import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
  ToastAndroid,
  Platform
 } from 'react-native';

import GridDisplay from './Components/GridDisplay.js';
import TabBar from './Components/TabBar.js';
import RoutinePopup from './RoutinePopup.js';

import { defaultStyles } from './styles.js';

// Redux
import { connect } from 'react-redux';

// Import Firebase app config
import firebaseApp from './Components/Firebase.js';

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
      loading: true
    }

    this.backButtonListener = null;
    this.routinesRef = this.getRef().child('routines');
  }

  componentWillMount() {
    this.getRoutines(this.routinesRef);
  }

  componentDidMount() {
    this.disableBackButton();
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

  getRoutines(routinesRef) {
    console.log("Retrieving routines...");
    routinesRef.on('value', (snap) => {
      let routines = [];
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

      // Change to get promise from snap
      console.log("Routines retrieved:", routines);
      this.setState({
        routines: routines,
        loading: false
      });
    });
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

          <View style={styles.scrollContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
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

          {!this.state.popupIsOpen ? <TabBar navigation={this.props.navigation} currentPage={this.props.navigation.state.routeName}></TabBar> : null }

          <View style={defaultStyles.footerWrapper}></View>
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
  scrollContainer: {
    ...defaultStyles.outline,
    flex: 10,
  },
  scrollContent: {
    paddingVertical: 10
  }
});

export default SelectionPage
