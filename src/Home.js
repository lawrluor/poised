import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import SelectionButton from './SelectionButton.js';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.titleWrapper, styles.outline]}>
          <Text style={[styles.title, styles.baseText]}>I have a...</Text>
        </View>

        <View style={[styles.bodyWrapper, styles.outline]}>
          <View style={[styles.buttonWrapper, styles.outline]}>
            <SelectionButton navigation={this.props.navigation} name={"Competition"}></SelectionButton>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Interview</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Test</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Networking Event</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Presentation</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Selections')}>
              <Text style={[styles.bodyText, styles.baseText]}>Date</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={[styles.bottomWrapper, styles.outline]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 20,
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
    fontSize: 24,
  },
  titleWrapper: {
    flex: 4,
    justifyContent: 'flex-end', // flush to bottom
  },
  bodyWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 14,
  },
  // span width of container
  buttonWrapper: {
    flex: 1,
    justifyContent: 'space-around' // spread vertically throughout container
  },
  bottomWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  button: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Black with 50% opacity
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outline: {
    // borderWidth: 2
  }
});

export default Home;
