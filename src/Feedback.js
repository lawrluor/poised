import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator, Image } from 'react-native';

import Center from '../src/Center.js';

class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  // App Title
  static navigationOptions = {
    title: 'poise'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>calmer?</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}>placeholder</Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <TouchableHighlight underlay="white" onPress={() => this.props.navigation.navigate('Selections')}>
            <Image
              source={require('../static/img/yes.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  navigateToResults(result) {
    console.log('result', result);
    this.props.navigation.navigate('Results',
    {
      result: result
    });
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
    flex: 3,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  bodyWrapper: {
    flex: 2
  },
  circleWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default Feedback
