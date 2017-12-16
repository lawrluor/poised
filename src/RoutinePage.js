import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image
} from 'react-native';

import Sound from 'react-native-sound';
Sound.setCategory('Playback'); // Enable playback in silence mode

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/FontAwesome';

import { defaultStyles } from './styles.js';

import Center from '../src/Components/Center.js';

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
      exited: false,
      music: this.playMusic(),
      notification: this.loadAudio('notification_direct.mp3', 0)
    }
  }

  // App Title
  static navigationOptions = {
    title: "Routine",
    header: null
  };

  componentDidMount() {
    // Change this to load and play music using respective load & play functions
    // let music = await this.loadAudio('faure_pavane.mp3', 0);
    // let notification = await this.loadAudio('notification_direct.mp3', 0)

    // console.log("music:", music);
    // console.log("notification", notification);
    //
    // this.setState({
    //   music: music,
    //   notification: notification
    // })
    //
    // playAudio(music);

    // Recursive function to "synchronously" cycle through actions
    let loopCountdown = (counter) => {
      // If user exits routine manually, this will be set to true and will break the recursion
      if (this.state.exited) {
        return
      }

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
          if (!this.state.exited) {
            let notification = this.state.notification.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
                notification.reset();
              }
            });

            clearTimeout(); // clear previous timeout
            loopCountdown(counter + 1); // Recursively start loop again with incremented index
          } else {
            console.log("attempted to start next iteration but user exited");
          }
        }, this.state.currentDuration)
      } else {
        // Move to next screen
        this.navigateToFeedback();
      }
    }

    // Call recursive function to begin routine
    loopCountdown(this.state.counter);
  }

  // In the case user closes screen before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  componentWillUnmount() {
    this.exit()
  }

  // load audio
  loadAudio(filename, loops) {
    // Load the sound file from the app bundle
    let audio = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + audio.getDuration() + 'number of channels: ' + audio.getNumberOfChannels());
    });
    audio.setNumberOfLoops(loops); // loop indefinitely until stop() called
    return audio;
  }

  playAudio(audio) {
    audio.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        audio.reset();
      }
    });
  }

  // use react-native-sound to play audio
  playMusic() {
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

  navigateToFeedback(routine) {
    this.exit();
    console.log("downvotes:",this.props.navigation.state.params.routineDownvotes)
    this.props.navigation.navigate('Feedback', {
      routineName: this.state.routineName,
      routineRating: this.state.routineRating,
      routineDownvotes: this.props.navigation.state.params.routineDownvotes,
      routineKey: this.state.routineKey
    });
  }

  exit() {
    console.log("exiting");
    this.setState({exited: true});
    clearTimeout();
    this.state.music.stop();
    this.state.music.release();
    this.state.notification.stop();
    this.state.notification.release();
  }

  navigateToSelections() {
    this.exit();
    this.props.navigation.navigate('Selections');
  }

  // consider adding slider or controls that will allow people to stop/slow down routine
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

            <TouchableOpacity onPress={() => this.navigateToSelections()}>
              <Icon style={styles.cancelIcon} name="times-circle" color="#FFFFFF"></Icon>
            </TouchableOpacity>
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
  },
  cancelIcon: {
    fontSize: 36
  }
});

export default RoutinePage
