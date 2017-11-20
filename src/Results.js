import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableHighlight
} from 'react-native';

import Center from '../src/Center.js';
import SelectionPage from '../src/SelectionPage.js';

class Results extends Component {
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
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, styles.baseText]}>
            {this.showText(this.props.navigation.state.params.result)}
          </Text>
        </View>

        <View style={styles.bodyWrapper}>
        </View>

        <View style={styles.circleWrapper}>
          
        </View>
      </View>
    );
  }

  // Helper function to show text based on result
  showText(result) {
    if (result==="Yes") {
      return "you're in good shape!";
    } else {
      return "you're almost there!";
    }
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    // borderWidth: 2
  },
  // matches size in Center.js
  circleContainer: {
    width: 104,
    height: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Results
