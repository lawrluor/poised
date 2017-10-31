import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PercentageCircle from 'react-native-percentage-circle';
import Center from '../src/Center.js';

const routineItems = ['begin 10 second routines', 'measured breathing', 'shake out your limbs', 'visualize your performance'];

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
    }, 5000);
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
    title: 'poise'
  };

  render() {
    // Access Routine name: {this.props.navigation.state.params.routineName}
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.baseText, styles.title]}></Text>
        </View>



        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.baseText, styles.bodyText]}>
            {routineItems[this.state.counter]}
          </Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <PercentageCircle radius={70} percent={50} color={"#3498db"}>
            <Center></Center>
          </PercentageCircle>
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
  circleWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 2
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default RoutinePage
