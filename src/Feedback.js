import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator, Image } from 'react-native';

import Center from '../src/Center.js';

class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>calmer?</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <Text style={[styles.bodyText, styles.baseText]}></Text>
        </View>

        <View style={[styles.circleWrapper, styles.outline]}>
          <View style={[styles.outline]}>
            <TouchableHighlight style={styles.circleContainer} onPress={() => this.navigateToResults("Yes")}>
              <Image
                source={require('../static/img/yes.png')}
              />
            </TouchableHighlight>
          </View>

          <View style={[styles.outline]}>
            <TouchableHighlight style={styles.circleContainer} onPress={() => this.navigateToResults("No")}>
              <Image
                source={require('../static/img/no.png')}
              />
            </TouchableHighlight>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  circleWrapper: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    // borderWidth: 2
  }
});

export default Feedback
