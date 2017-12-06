import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Navigator } from 'react-native';

import GridDisplay from './Components/GridDisplay.js';
import TabBar from './Components/TabBar.js';
import RoutinePopup from './RoutinePopup.js';

import { defaultStyles } from './styles.js';

// Redux
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  RefreshControl,
  // ...others
} from 'react-native';

// Connect Redux storage and refresh actions
@connect(
  state => ({
    routines: state.routines,
    loading: state.loading
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_ROUTINE_DATA'}),
  })
)

class SelectionPage extends Component {
  // Set default routine for popup as the first routine, before routine is opened
  // FAILS when there are no routines
  state = {
    popupIsOpen: false,
    routine: "test"
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
    console.log("Props", this.props);
    const { routines, loading, refresh } = this.props;
    console.log("Routines", this.props.routines);
    // If not loaded, show loading screen
    if (loading) {
      // Currently bugged, not loading activityIndicator
      return (
        <View style={defaultStyles.container}>
          <ActivityIndicator
            animating={loading}
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
            <Text style={defaultStyles.examineText}>Guided exercises to prime yourself for a performance, created by users and curated by professionals.</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            // Hide all scroll indicators
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={refresh}
                tintColor="#FFFFFF"
              />
            }
          >
            {routines.map((routine, index) => <GridDisplay
              routine={routine}
              onOpen={this.openRoutine}
              key={index}
              navigation={this.props.navigation}
            />)}
          </ScrollView>

          <RoutinePopup
            routine={this.state.routine}
            isOpen={this.state.popupIsOpen}
            onClose={this.closeRoutine}
            navigation={this.props.navigation}
          />

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
  }
});

export default SelectionPage
