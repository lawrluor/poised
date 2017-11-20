import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Stylesheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class RoutinePopup extends Component {
  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // height: height / 2 when open, else height = 0 (hidden)
    visible: this.props.isOpen
  }

  // Open or Close popup
  componentWillReceiveProps(nextProps) {
    // isOpen prop changed from True to False (change from open before to close after)
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed from False to True (change from close before to open after)
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animatedClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first, then call function to animate sliding up
    this.setState({ visible: true }, () => {
      Animated.timing(
        this.state.position, { toValue: 0 } // to top of screen
      ).start();
    });
  }

  // Close popup
  animateClose() {
    Animated.timing(
      this.state.position, { toValue: height } //set to bottom of screen
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    // If not open, don't render
    if (!this.state.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={styles.backdrop}/>
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modal, {
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >
          <Text>Popup</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup to start at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
    opacity: 0.5,
  },
  // Popup
  modal: {
    height: height / 2,             // take half of screen height
    backgroundColor: 'white',
  },
});
