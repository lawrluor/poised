import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback, Navigator, Image } from 'react-native';

import { defaultStyles } from './styles.js';
import Center from '../src/Components/Center.js';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpful: "Was this routine helpful?"
    }
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={[styles.title, styles.baseText]}>{this.state.helpful}</Text>
        </View>

        <View style={[styles.bodyWrapper, defaultStyles.outline]}>
          <Text style={[defaultStyles.bodyText]}></Text>
        </View>

        <View style={[styles.circleWrapper, defaultStyles.outline]}>
          <View style={[defaultStyles.outline]}>
            <TouchableWithoutFeedback style={styles.circleContainer} onPress={() => this.navigateToPrevious(true)}>
              <Image source={require('../static/img/icons/thumbs_down.png')} style={defaultStyles.iconLarge}/>
            </TouchableWithoutFeedback>
          </View>

          <View style={[defaultStyles.outline]}>
            <TouchableWithoutFeedback style={styles.circleContainer} onPress={() => this.navigateToPrevious(false)}>
              <Image source={require('../static/img/icons/thumbs_up.png')} style={defaultStyles.iconLarge}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }

  navigateToPrevious(result) {
    if (result) {
      console.log("You're going to do great!");
      this.setState({helpful: "You're going to do great!"});
    } else {
      console.log("You're going to do great! But consider trying another routine.");
      this.setState({helpful: "You're going to do great! But consider trying another routine."});
    }

    this.timer = setInterval(() => {
      // after time period, clear timer and navigate to next screen
      clearTimeout(this.timer);
      this.props.navigation.navigate('Selections');
    }, 1000);
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Avenir',
    color: '#FFFFFF'
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  bodyWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  circleWrapper: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circleContainer: {
    // width: 104,
    // height: 104,
    // borderRadius: 52,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default Feedback
