import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View
} from 'react-native';

import { defaultStyles } from './styles.js';

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
      this.animateClose();
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
    // process props to be used in render function
    const { routine, routine: { name, author, convertedLength, overallRating } } = this.props;

    // If not open, don't render
    if (!this.state.visible) {
      return null;
    }
    // Rating: {overallRating} | Length:

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={styles.backdrop}/>
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modal,
            styles.outline,
            {transform: [{ translateY: this.state.position }, { translateX: 0 }] },
          ]}
        >
          <View style={[styles.header, defaultStyles.outline]}>
            <View style={[styles.titleContainer, defaultStyles.outline]}>
              <Text style={defaultStyles.titleText}>{name}</Text>
              <Text style={defaultStyles.bodyText}>By: {author}</Text>
            </View>

            <View style={[styles.statsContainer, defaultStyles.outline]}>
              <Text style={[defaultStyles.paragraphText, defaultStyles.outline]}>{convertedLength}</Text>
              <Text style={[defaultStyles.paragraphText, defaultStyles.outline]}>
                <Image style={defaultStyles.iconSmaller} source={require('../static/img/icons/heart_white.png')}></Image>
                {overallRating}
              </Text>
            </View>
          </View>

          <View style={[styles.body, defaultStyles.outline]}>
            <Text style={defaultStyles.paragraphText}>You are receiving this email because you indicated you wanted to be informed of the latest news and specials from CVS Pharmacy® ExtraCare®. You can update your email preferences here. If you prefer not to receive future emails from CVS Pharmacy ExtraCare, you can unsubscribe here, call 1-800-746-7287 or mail us at CVS Health®, Customer Relations, One CVS Drive, Woonsocket, RI 02895. Please note: If you have opted in to receive other CVS Pharmacy email communications, you will continue to receive them unless you opt out specifically for those.</Text>
          </View>

          <View style={[styles.footer, defaultStyles.outline]}>
            <TouchableHighlight style={defaultStyles.button} onPress={() => this.navigateToRoutine(name)}>
              <Text style={[defaultStyles.bodyText]}>Begin Routine</Text>
            </TouchableHighlight>
          </View>

        </Animated.View>
      </View>
    );
  }

  navigateToRoutine(routineName) {
    this.props.navigation.navigate('Routine',
    {
      routineName: routineName, // from this.state.name
      // routineActions: routineActions,
      // routineDurations: routineDurations
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
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
    height: height * 0.66,             // take 66% of screen height
    padding: 15,
    backgroundColor: 'rgba(119, 136, 153, 0.9)',
  },
  // Header is divided horizontally into title and stats container
  header: {
    flex: 2,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  titleContainer: {
    flex: 5
  },
  statsContainer: {
    flex: 1
  },
  body: {
    flex: 8,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  footer: {
    flex: 2,
    justifyContent: 'center'
  }
});
