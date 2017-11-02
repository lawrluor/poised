import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Animated, Navigator } from 'react-native';

// Set Pulse Class
class PulseView extends Component {
  state = {
    animPulse: new Animated.Value(1), // set initial opacity to 1
  }

  // Function to generate values for opacity
  componentDidMount() {
    // Begin Animation Loop, which contains sequence of fade in and fade out
    // https://stackoverflow.com/a/44353789/6322172
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animPulse, {
          toValue: 0.5, // set opacity 1 (opaque)
          duration: 2000 // set duration
        }),
        Animated.timing(this.state.animPulse, {
          toValue: 1, // set opacity 1 (opaque)
          duration: 2000 // set duration
        })
      ]),
      // { iterations: 4 }
    ).start()
  }

  // Render Animation
  render() {
    let { animPulse } = this.state; // opposed to this.state.fadeAnim

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: animPulse,         // Bind opacity in style to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class Center extends Component {
  render() {
    return (
      <View style={styles.circleContainer}>
        <PulseView>
          <Image style={styles.image}
            source={require('../static/img/center.png')}
          />
        </PulseView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87AECF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 85,
    overflow: 'hidden'
  },
  // borderRadius expects number as a value, you can't use percentage
  // to make circular, set borderRadius to width/height divided by 2 (50%)
  // hide overflow in circle view
  image: {
    height: 170,
    width: 170
  }
})

export default Center
