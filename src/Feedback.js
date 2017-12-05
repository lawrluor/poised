import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator, Image } from 'react-native';

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
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>{this.state.helpful}</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}></Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <View style={[styles.outline]}>
            <TouchableHighlight style={styles.circleContainer} onPress={() => this.navigateToPrevious(true)}>
              <Image
                source={require('../static/img/yes.png')}
              />
            </TouchableHighlight>
          </View>

          <View style={[styles.outline]}>
            <TouchableHighlight style={styles.circleContainer} onPress={() => this.navigateToPrevious(false)}>
              <Image
                source={require('../static/img/no.png')}
              />
            </TouchableHighlight>
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
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  titleWrapper: {
    flex: 3,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
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
