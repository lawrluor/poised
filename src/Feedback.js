import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableHighlight, TouchableWithoutFeedback, Navigator, Image } from 'react-native';

import { defaultStyles } from './styles.js';
import Center from '../src/Components/Center.js';

class Feedback extends Component {
  static navigationOptions = {
    header: null,
    title: 'poise'
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={[defaultStyles.headerWrapper, defaultStyles.outline]}>
          <Text style={defaultStyles.titleText}>Was this routine helpful?</Text>
        </View>

        <View style={[styles.bodyWrapper, defaultStyles.outline]}>
          <Text style={[defaultStyles.bodyText]}></Text>
        </View>

        <View style={[styles.iconWrapper, defaultStyles.outline]}>
          <View style={[defaultStyles.outline]}>
            <TouchableWithoutFeedback onPress={() => this.navigateToResults(true)}>
              <Image source={require('../static/img/icons/thumbs_up_64.png')}/>
            </TouchableWithoutFeedback>
          </View>

          <View style={[defaultStyles.outline]}>
            <TouchableWithoutFeedback onPress={() => this.navigateToResults(false)}>
              <Image source={require('../static/img/icons/thumbs_down_64.png')}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }

  // Navigate to Results page with result of thumbs up or down
  navigateToResults(result) {
    this.props.navigation.navigate('Results', {result:result});
  }
}

const styles = StyleSheet.create({
  bodyWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  iconWrapper: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  bodyText: {
    fontSize: 32
  },
  outline: {
    borderWidth: 2
  }
});

export default Feedback
