import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator, Image } from 'react-native';

import Center from '../src/Center.js';

class RoutineInfo extends Component {
  constructor(props) {
    super(props);
  }

  // App Title
  static navigationOptions = {
    title: 'Routine Info'
  };

  render() {
    let routineName = this.props.navigation.state.params.routineName;
    console.log(routineName);
    let routineItems = this.queryRoutineItems(routineName);
    let routineDuration = this.extractDuration(Object.values(routineItems));
    let routineDurations = Object.values(routineItems);
    let routineActions = Object.keys(routineItems);
    console.log(routineItems);
    console.log(routineDuration);
    console.log(routineDurations);
    console.log(routineActions);

    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>Routine: {routineName}</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}>Length: {routineDuration} seconds </Text>
        </View>

        <View style={styles.circleWrapper}>
          <TouchableHighlight onPress={() => this.navigateToRoutine(this.props.routine, routineActions, routineDurations)}>
            <View ref={component => this._root = component}>
              <Center><Text>Begin {this.props.routine}</Text></Center>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  queryRoutineItems(routineName) {
    let routineItems = {
      'begin 10 second routines': 10000,
      'measured breathing' : 10000,
      'shake out your limbs' : 10000,
      'visualize your performance' : 10000
    };
    return routineItems
  }

  // Later, query from database given routine name
  // Return total duration in seconds of all the exercises
  extractDuration(durations) {
    let totalDuration = 0;

    for (let i in durations) {
      totalDuration += durations[i];
    }
    totalDuration /= 1000;

    return totalDuration
  }

  // Necessary to put navigation logic outside of render()
  // As this.props in render() doesn't refer to navigation object
  navigateToRoutine(routineName, routineActions, routineDurations) {
    this.props.navigation.navigate('Routine',
    {
      routineName: routineName, // from this.state.name
      routineActions: routineActions,
      routineDurations: routineDurations
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
  title: {
    fontSize: 48,
    textAlign: 'center',
    margin: 10,
  },
  titleWrapper: {
    flex: 3,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 2
  },
  circleWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    // borderWidth: 2
  }
});

export default RoutineInfo
