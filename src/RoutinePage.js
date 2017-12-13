import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator } from 'react-native';

import Sound from 'react-native-sound';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { defaultStyles } from './styles.js';

import Center from '../src/Components/Center.js';

// Enable playback in silence mode
Sound.setCategory('Playback');

class RoutinePage extends Component {
  constructor(props) {
    super(props);

    // Music begins once state is defined
    this.state = {
      counter: 0,
      routineName: this.props.navigation.state.params.routineName,
      currentAction: this.props.navigation.state.params.routineActions[0],
      currentDuration: this.props.navigation.state.params.routineDurations[0] * 10,
      routineActions: this.props.navigation.state.params.routineActions,
      routineDurations: this.props.navigation.state.params.routineDurations,
      routineRating: this.props.navigation.state.params.routineRating,
      routineKey: this.props.navigation.state.params.routineKey,
      finished: false,
      music: this.playAudio()
    }
  }

  // App Title
  static navigationOptions = {
    title: "Routine",
    header: null
  };

  // Begin counting on page load
  componentDidMount() {
    // Recursive function to "synchronously" cycle through actions
    let loopCountdown = (counter) => {
      if (counter < this.state.routineDurations.length) {
        console.log(counter, this.state.routineDurations.length);
        console.log(this.state.routineActions[counter])

        // Set the current action and duration for this iteration
        this.setState({
          currentAction: this.state.routineActions[counter],
          currentDuration: this.state.routineDurations[counter] * 10
        });

        // Begin timer animation for this iteration
        this.beginTimerAnimation(this.state.currentDuration);

        // Set timer on this iteration
        setTimeout( () => {
          clearTimeout(); // clear previous timeout
          loopCountdown(counter + 1); // Recursively start loop again with incremented index
        }, this.state.currentDuration)
      } else {
        // Move to next screen
        this.state.music.stop();
        clearTimeout();
        this.navigateToFeedback();
      }
    }

    // Call recursive function to begin routine
    loopCountdown(this.state.counter);
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    clearTimeout();
    this.state.music.stop();
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

  // Presence of AnimatedCircularProgress crashes Android app
  beginTimerAnimation(duration) {
    this.refs.circularProgress.performLinearAnimation(0, 0);
    this.refs.circularProgress.performLinearAnimation(100, duration); // Will fill the progress bar linearly in 8 seconds
  }

  navigateToFeedback(routine){
    this.props.navigation.navigate('Feedback', {
      routineName: this.state.routineName,
      routineRating: this.state.routineRating,
      routineKey: this.state.routineKey
    });
  }

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
        </View>

        <View style={[defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
          <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
            <Text style={defaultStyles.bodyText}>
              {this.state.currentAction}
            </Text>
          </View>

          <View style={[styles.circleWrapper, defaultStyles.outline]}>
            <AnimatedCircularProgress style={styles.countdown}
              ref='circularProgress'
              size={200}
              width={5}
              fill={0}
              tintColor="#3d5875"
              backgroundColor="#FFFFFF">
            </AnimatedCircularProgress>
            <Center style={styles.center}></Center>
          </View>

          <View style={[defaultStyles.graphicLayoutLowerText, defaultStyles.outline]}>
            <Text style={defaultStyles.bodyText}>
            </Text>
          </View>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circleWrapper: {
    // ...StyleSheet.absoluteFillObject,
    flex: 2,
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
