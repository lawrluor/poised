import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { defaultStyles } from './styles.js';

class Results extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
    title: 'poise'
  };

  componentDidMount() {
    // Display result message for time period, then clear timer and navigate back to selections
    this.timer = setInterval(() => {
      clearTimeout(this.timer);
      this.props.navigation.navigate('Selections');
    }, 1000);
  }

  render() {
    return (
      <View style={[defaultStyles.container, defaultStyles.outline]}>
        <View style={defaultStyles.headerWrapper}>
          <Text style={defaultStyles.titleText}>
            {this.showText(this.props.navigation.state.params.result)}
          </Text>
        </View>
      </View>
    );
  }

  // Helper function to show text based on result
  showText(result) {
    if (result) {
      return "You're in good shape! Please consider favoriting the routine";
    } else {
      return "Sorry to hear that. Please try another routine!";
    }
  }
}

const styles = StyleSheet.create({
});

export default Results
