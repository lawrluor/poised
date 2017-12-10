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
        </View>

        <View style={[defaultStyles.graphicLayoutBodyContainer, defaultStyles.outline]}>
          <View style={[defaultStyles.graphicLayoutUpperText, defaultStyles.outline]}>
            <Text style={defaultStyles.titleText}>
              Was this routine helpful?
            </Text>
          </View>

          <View style={[styles.iconWrapper, defaultStyles.outline]}>
            <View style={[styles.leftContainer, defaultStyles.outline]}>
              <TouchableWithoutFeedback onPress={() => this.navigateToResults(false)}>
                <Image source={require('../static/img/icons/thumbs_down_64.png')} style={{marginTop: 16}}/>
              </TouchableWithoutFeedback>
            </View>

            <View style={[styles.rightContainer, defaultStyles.outline]}>
              <TouchableWithoutFeedback onPress={() => this.navigateToResults(true)}>
                <Image source={require('../static/img/icons/thumbs_up_64.png')} style={{marginBottom: 16}}/>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={[defaultStyles.graphicLayoutLowerText, defaultStyles.outline]}>
          </View>
        </View>

        <View style={[defaultStyles.footerWrapper, defaultStyles.outline]}>
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
  iconWrapper: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Feedback
