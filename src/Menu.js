import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, TouchableHighlight, Navigator } from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props);
    }

  // App Title
  static navigationOptions = {
    title: 'poise',
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>I have a...</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
            <Text style={[styles.bodyText, styles.baseText]}>Performance</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
            <Text style={[styles.bodyText, styles.baseText]}>Interview</Text>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'blue'} style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
            <Text style={[styles.bodyText, styles.baseText]}>Test</Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.bottomWrapper, styles.outline]}>
        </View>
      </View>
    );
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
    color: '#FFFFFF',
    textAlign: 'center'
  },
  title: {
    fontSize: 48,
    margin: 10,
  },
  bodyText: {
    fontSize: 24
  },
  titleWrapper: {
    flex: 2,
    justifyContent: 'flex-end', // flush to bottom
    alignItems: 'center'
  },
  bodyWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 6
  },
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  button: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "red",
    padding: 10
  },
  outline: {
    // borderWidth: 2
  }
});

export default Menu
