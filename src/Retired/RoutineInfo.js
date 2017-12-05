import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator, Image } from 'react-native';

import Center from '../src/Center.js';

class RoutineInfo extends Component {
  constructor(props) {
    super(props);

    let routineName = this.props.navigation.state.params.routineName;
    let routineItems = this.queryRoutineItems(routineName);
    // console.log(routineItems);
    // console.log(routineDuration);
    // console.log(routineDurations);
    // console.log(routineActions);

    this.state = {
      routineName: routineName,
      routineItems: routineItems,
      routineDuration: this.extractDuration(Object.values(routineItems)),
      routineDurations: Object.values(routineItems),
      routineActions: Object.keys(routineItems),
    }
  }

  componentDidMount() {
    // After 5 seconds, move to routine screen
    // this.timer = setInterval(() => {
    //   this.navigateToRoutine(this.props.routine, this.state.routineActions, this.state.routineDurations);
    // }, 5000);
  }

  // App Title
  static navigationOptions = {
    title: 'routines',
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>{this.state.routineName}</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}>length: {this.state.routineDuration} seconds </Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <TouchableHighlight style={[styles.circleContainer, styles.outline]} onPress={() => this.navigateToRoutine(this.props.routine, this.state.routineActions, this.state.routineDurations)}>
            <View ref={component => this._root = component}>
              <Center></Center>
            </View>
          </TouchableHighlight>
        </View>

        <View style={[styles.bottomWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}>begin routine</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  circleWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // matches size in Center.js
  circleContainer: {
    width: 106,
    height: 106,
    borderRadius: 53,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: 32
  },
  bottomWrapper: {
    flex: 1
  },
  outline: {
    // borderWidth: 2
  }
});

export default RoutineInfo
