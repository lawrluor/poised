import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

import Center from '../src/Center.js';

const routineItems = ['your routine is beginning...', 'measured breathing', 'limb shake out', 'visualize your performance'];

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
      if (!this.finished()) {
        this.setState({
          counter: this.state.counter + 1
        });
      } else {
        // move to final screen
        clearTimeout(this.timer);
        this.props.navigation.navigate('Feedback');
      }
    }, 15000);
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  finished() {
    if (this.state.counter === (routineItems.length - 1)) {
      return true;
    }
  }

  // App Title
  static navigationOptions = {
    title: 'poised'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.baseText, styles.title]}>
            {this.props.navigation.state.params.routineName}
          </Text>
        </View>

        <View style={[styles.centerWrapper]}>
          <Center></Center>
        </View>

        <View style={[styles.bodyWrapper]}>
          <Text style={[styles.baseText, styles.bodyText]}>
            {routineItems[this.state.counter]}
          </Text>
        </View>
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
    flex: 4,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  centerWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 3
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default RoutinePage
