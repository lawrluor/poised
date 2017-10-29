import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

import Center from '../src/Center.js';

const routineItems = ['measured breathing', 'limb shake out', 'visualize your performance']

class RoutinePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  // Begin counting on page load
  componentDidMount() {
    // Set interval so that every 5000 ms, increment counter by 1
    this.timer = setInterval(() => {
      this.setState({
        counter: this.state.counter + 1
      });
    }, 5000);
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          audition routine
        </Text>

        <Center></Center>

        <Text style={styles.title}>
          {routineItems[this.state.counter]}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87AECF',
  },
  title: {
    flex: 3,
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  center: {
    flex: 7
  }
})

export default RoutinePage
