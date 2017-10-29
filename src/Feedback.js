import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, Navigator } from 'react-native';

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
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.baseText]}>calmer?</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight underlay="grey" style={styles.buttonNo} onPress={() => this.navigateToResults("No")}>
            <Text style={[styles.bodyText, styles.baseText]}>n</Text>
          </TouchableHighlight>

          <View style={styles.buffer}></View>

          <TouchableHighlight underlay="grey" style={styles.buttonYes} onPress={() => this.navigateToResults("Yes")}>
            <Text style={[styles.bodyText, styles.baseText]}>y</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.bodyWrapper}>
          <Text style={[styles.bodyText, styles.baseText]}></Text>
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
    flex: 4,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30
  },
  buttonYes: {
    flex: 2,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B6C9A3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonNo: {
    flex: 2,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B98888',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buffer: {
    flex: 2
  },
  bodyWrapper: {
    flex: 3
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default Feedback
