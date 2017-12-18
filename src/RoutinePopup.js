import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

import { defaultStyles } from './styles.js';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class RoutinePopup extends Component {
  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : defaultStyles.screenDimensions.height),
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
      this.state.position, { toValue: defaultStyles.screenDimensions.height } //set to bottom of screen
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    // process props to be used in render function
    const { routine, routine: { _key, name, author, description, convertedLength, overallRating } } = this.props;

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
              <TouchableOpacity onPress={this.props.onClose}>
                <Icon style={styles.cancelIcon} name="times-circle" color="#FFFFFF"></Icon>
              </TouchableOpacity>

              <View style={defaultStyles.outline}>
                <Text style={defaultStyles.paragraphText}></Text>
              </View>

              <View style={[styles.ratingsContainer, defaultStyles.outline]}>
                <View style={defaultStyles.outline}>
                  <Icon style={styles.iconSmaller} name="heart" color="#FFFFFF"></Icon>
                </View>

                <View style={defaultStyles.outline}>
                  <Text style={defaultStyles.paragraphText}>{overallRating}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.body, defaultStyles.outline]}>
            <ScrollView>
              <Text style={defaultStyles.largerParagraphText}>{description}</Text>
            </ScrollView>
          </View>

          <View style={[styles.footer, defaultStyles.outline]}>
            <TouchableHighlight style={styles.beginButton} underlayColor='rgba(28, 56, 79, 0.7)' onPress={() => this.navigateToRoutine(routine)}>
              <Text style={[defaultStyles.bodyText]}>Begin Routine ({convertedLength})</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>
    );
  }

  navigateToRoutine(routine) {
    console.log("Button Clicked");
    let routineActions = [];
    let routineDurations = [];
    for (let key in routine.actions) {
      routineActions.push(routine.actions[key].text);
      routineDurations.push(routine.actions[key].length);
    }

    this.props.navigation.navigate('Routine',
    {
      routineName: routine.name, // from this.state.name
      routineActions: routineActions,
      routineDurations: routineDurations,
      routineRating: routine.overallRating,
      routineDownvotes: routine.downvotes,
      routineKey: routine._key,
      routineMusic: routine.music
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
    height: (defaultStyles.screenDimensions.height * 0.66), // take 66% of screen height
    padding: 15,
    backgroundColor: 'rgba(119, 136, 153, 1.0)',
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
    flex: 1,
    alignItems: 'flex-end'
  },
  ratingsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  iconSmaller: {
    ...defaultStyles.iconSmaller,
    marginTop: 3,
    marginRight: 2,
  },
  cancelIcon: {
    fontSize: 20
  },
  body: {
    flex: 8,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  beginButton: {
    ...defaultStyles.loginButton,
    width: (defaultStyles.screenDimensions.width * 0.9)
  }
});
