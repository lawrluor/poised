import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PercentageCircle from 'react-native-percentage-circle';
import Center from '../src/Center.js';

// change this to be imported as props from RoutineInfo
let routineDurations = [10000, 10000, 10000, 10000];
let routineActions = ['begin 10 second routines', 'measured breathing', 'shake out your limbs', 'visualize your performance'];

class RoutinePage extends Component {
  constructor(props) {
    super(props);

    let begin = 0; // To access first index (0) of item and times
    // let routineDurations = this.props.navigation.state.params.routineDurations;
    // let routineActions = this.props.navigation.state.params.routineActions;

    this.state = {
      counter: begin,
      duration: routineDurations[begin],
      percentage: 0
    }
  }

  // Begin counting on page load
  componentDidMount() {
    // Set interval so that every 5000 ms, increment counter by 1
    this.timer = setInterval(() => {
      let startTime = Date.now() // note start time of each interval

      if (!this.finished()) {

        let duration = this.state.duration; // the duration of routine at start

        this.initializeCountdown(startTime, duration);

        let next = this.state.counter + 1;

        this.setState({
          counter: next,
          duration: routineDurations[next],
        });

      } else {
        // move to final screen
        clearTimeout(this.timer);
        this.props.navigation.navigate('Feedback');
      }
    }, this.state.duration);
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  initializeCountdown(startTime, duration) {
    console.log("counting down");
    let interval = setInterval(() => {
      let currentTime = Date.now();
      elapsedTime = currentTime - startTime;

      if (elapsedTime > duration) {
        console.log("EXCEEDED");
        clearInterval(interval);

        this.setState({
          percentage: 0
        });

        return;
      } else {
        this.calculatePercentage(elapsedTime, duration);
      }
    }, 16);
  }

  calculatePercentage(timeElapsed, duration) {
    let percent = Math.trunc((timeElapsed / duration) * 100);

    this.setState({
      percentage: percent
    });

    console.log(timeElapsed.toString() + '/' + duration.toString() + '=' + percent.toString());
    return percent
  }

  finished() {
    if (this.state.counter === (routineActions.length - 1)) {
      return true;
    }
  }

  // App Title
  static navigationOptions = {
    title: 'Routine', // Access Routine name: {this.props.navigation.state.params.routineName}
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.baseText, styles.title]}></Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.baseText, styles.bodyText]}>
            {routineActions[this.state.counter]}
          </Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <PercentageCircle radius={50} percent={this.state.percentage} color={"blue"}>
            <View style={styles.button}><Text>test</Text></View>
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
  },
  button : {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RoutinePage
