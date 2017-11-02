import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

import Sound from 'react-native-sound';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Center from '../src/Center.js';

// Enable playback in silence mode
Sound.setCategory('Playback');

// change this to be imported as props from RoutineInfo
let routineDurations = [5000, 5000, 5000, 5000];
let routineActions = ['routine beginning...', 'measured breathing', 'shake out your limbs', 'visualize your performance'];

class RoutinePage extends Component {
  constructor(props) {
    super(props);

    let begin = 0; // To access first index (0) of item and times

    this.state = {
      counter: begin,
      duration: routineDurations[begin],
      percentage: 0,
    }
  }

  // App Title
  static navigationOptions = {
    title: 'Routine', // Access Routine name: {this.props.navigation.state.params.routineName}
    header: null
  };

  // Begin counting on page load
  componentDidMount() {
    // Begin playing audio
    let music = this.playAudio();

    // start initial countdown (jank)
    this.restartCountdown(this.state.duration);

    // Set interval so that every set duration, increment counter by 1
    this.timer = setInterval(() => {
      if (!this.finished()) {
        let next = this.state.counter + 1;
        let nextDuration = routineDurations[next];

        this.restartCountdown(this.state.duration);

        console.log(next, nextDuration);
        this.setState({
          counter: next,
          duration: nextDuration,
        });
      } else {
        // move to final screen, and clear operations
        clearTimeout(this.timer);
        music.stop();
        this.props.navigation.navigate('Feedback');
      }
    }, routineDurations[this.state.counter]); // BUG: This is called once and will only use the first value od Durations
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // use react-native-sound to play audio
  playAudio() {
    // Load the sound file from the app bundle
    let music = new Sound('faure_pavane.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + music.getDuration() + 'number of channels: ' + music.getNumberOfChannels());
      music.setNumberOfLoops(-1); // loop indefinitely until stop() called
      music.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          music.reset();
        }
      });
    });

    return music;
  }

  restartCountdown(duration) {
    console.log("Countdown reset");
    this.refs.circularProgress.performLinearAnimation(0, 0);

    console.log("Countdown started");
    this.refs.circularProgress.performLinearAnimation(100, duration); // Will fill the progress bar linearly in 8 seconds
  }

  finished() {
    if (this.state.counter === (routineActions.length - 1)) {
      return true;
    } else {
      return false;
    }
  }

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
          <AnimatedCircularProgress style={[styles.countdown, styles.outline]}
            ref='circularProgress'
            size={200}
            width={5}
            fill={0}
            tintColor="#3d5875"
            backgroundColor="#FFFFFF">
          </AnimatedCircularProgress>
          <Center style={[styles.center, styles.outline]}></Center>
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
  button: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // allow for views to overlay
  countdown: {
    position: 'absolute'
  },
  center: {
    position: 'absolute'
  }
});

export default RoutinePage
