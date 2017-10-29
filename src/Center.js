import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, Animated, Navigator } from 'react-native';

// Set FadeIn Class
class FadeInView extends Component {
  state = {
    fadeAnim: new Animated.Value(0) // set initial opacity to 0
  }

  // Function to generate values for opacity
  componentDidMount() {
    Animated.timing(       // animate over time
      this.state.fadeAnim, // animation type
      {
        toValue: 1, // set opacity 1 (opaque)
        duration: 3000 // set duration
      }
    ).start(); // start animation
  }

  // Render Animation
  render() {
    let { fadeAnim } = this.state; // opposed to this.state.fadeAnim

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity in style to animated value
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
      <View style={styles.container}>
        <FadeInView>
          <Image
            source={require('../static/img/center.png')}
          />
        </FadeInView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#87AECF'
  }
})

export default Center
