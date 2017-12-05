import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Navigator } from 'react-native';

import GridDisplay from './Components/GridDisplay.js';
import TabBar from './Components/TabBar.js';
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
    header: null
  };

  // Last line: hide tab bar if popup is opened
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

        {!this.state.popupIsOpen ? <TabBar navigation={this.props.navigation}></TabBar> : null }
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
