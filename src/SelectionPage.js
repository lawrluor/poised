import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ListView, Navigator, FlatList } from 'react-native';

import ListItem from './ListItem.js';
import GridDisplay from './GridDisplay.js';
import RoutinePopup from './RoutinePopup.js';
import { routines } from './data';

import { defaultStyles } from './styles.js';

class SelectionPage extends Component {
  constructor(props) {
    super(props);
  }

  // Set default routine for popup as the first routine, before routine is opened
  // FAILS when there are no routines
  state = {
    popupIsOpen: false,
    routine: routines[0]
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
    title: 'Select a Routine',
    header: null
  };

  // pass in navigation prop to each listItem
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, defaultStyles.outline]}>
          <Text style={[defaultStyles.titleText]}>Select a Routine</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          // Hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#87AECF',
    flex: 20,
    padding: 20,
    alignItems: 'center', // center routine boxes
    justifyContent: 'center'
  },
  titleWrapper: {
    ...defaultStyles.headerWrapper,
  }
});

export default SelectionPage
